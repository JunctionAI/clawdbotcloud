#!/usr/bin/env pwsh
# Fix Clawdbot Service - Use full path to clawdbot

# Check if running as admin
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-Host "ERROR: This script requires administrator privileges" -ForegroundColor Red
    Write-Host "Right-click PowerShell and select 'Run as Administrator'" -ForegroundColor Yellow
    exit 1
}

$nssmExe = "C:\Program Files\nssm\nssm.exe"
$serviceName = "Clawdbot"

Write-Host "Fixing Clawdbot service with full path..." -ForegroundColor Cyan

# Find the full path to clawdbot
$clawdbotPath = "C:\Users\Nightgalem\AppData\Roaming\npm\clawdbot.ps1"

if (-not (Test-Path $clawdbotPath)) {
    Write-Host "ERROR: Could not find clawdbot at expected path" -ForegroundColor Red
    Write-Host "Expected: $clawdbotPath" -ForegroundColor Yellow
    exit 1
}

Write-Host "Found clawdbot at: $clawdbotPath" -ForegroundColor Green

# Stop service if running
$service = Get-Service -Name $serviceName -ErrorAction SilentlyContinue
if ($service -and $service.Status -ne 'Stopped') {
    Write-Host "Stopping service..." -ForegroundColor Yellow
    Stop-Service -Name $serviceName -Force
    Start-Sleep -Seconds 2
}

# Remove the service
Write-Host "Removing old service..." -ForegroundColor Yellow
& $nssmExe remove $serviceName confirm
Start-Sleep -Seconds 2

# Install with full path to clawdbot script
Write-Host "Installing service with full PowerShell path..." -ForegroundColor Cyan

$pwshPath = "C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe"
$clawdbotArgs = "-NoProfile -ExecutionPolicy Bypass -File `"$clawdbotPath`" gateway start"

& $nssmExe install $serviceName $pwshPath $clawdbotArgs

# Configure service
& $nssmExe set $serviceName AppDirectory "C:\Users\Nightgalem\clawd"
& $nssmExe set $serviceName DisplayName "Clawdbot Gateway"
& $nssmExe set $serviceName Description "Clawdbot AI Assistant Gateway - 24/7 Service"
& $nssmExe set $serviceName Start SERVICE_AUTO_START
& $nssmExe set $serviceName AppRestartDelay 5000
& $nssmExe set $serviceName AppExit Default Restart

# Logging
$logDir = "C:\Users\Nightgalem\clawd\logs"
New-Item -ItemType Directory -Force -Path $logDir | Out-Null

& $nssmExe set $serviceName AppStdout "$logDir\clawdbot-service-out.log"
& $nssmExe set $serviceName AppStderr "$logDir\clawdbot-service-err.log"
& $nssmExe set $serviceName AppRotateFiles 1
& $nssmExe set $serviceName AppRotateBytes 10485760

Write-Host ""
Write-Host "Starting service..." -ForegroundColor Cyan
Start-Service -Name $serviceName

Start-Sleep -Seconds 5

$service = Get-Service -Name $serviceName
Write-Host ""
Write-Host "Service status: $($service.Status)" -ForegroundColor $(if ($service.Status -eq 'Running') { 'Green' } else { 'Yellow' })

if ($service.Status -eq 'Running') {
    Write-Host ""
    Write-Host "SUCCESS! Clawdbot is running as a Windows service" -ForegroundColor Green
    Write-Host ""
    Write-Host "It will now:" -ForegroundColor Cyan
    Write-Host "  - Start automatically on boot"
    Write-Host "  - Restart automatically if it crashes (5 second delay)"
    Write-Host "  - Run 24/7 in the background"
    Write-Host ""
    Write-Host "Logs: $logDir\clawdbot-service-out.log" -ForegroundColor Cyan
}
else {
    Write-Host ""
    Write-Host "Service installed but not running. Checking logs..." -ForegroundColor Yellow
    Write-Host ""
    
    if (Test-Path "$logDir\clawdbot-service-err.log") {
        Write-Host "Last 10 lines of error log:" -ForegroundColor Red
        Get-Content "$logDir\clawdbot-service-err.log" -Tail 10
    }
    
    Write-Host ""
    Write-Host "Try manually starting: Start-Service Clawdbot" -ForegroundColor Yellow
}
