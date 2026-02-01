#!/usr/bin/env pwsh
# Fix Clawdbot Service - Make it run through PowerShell

# Check if running as admin
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-Host "ERROR: This script requires administrator privileges" -ForegroundColor Red
    Write-Host "Right-click PowerShell and select 'Run as Administrator'" -ForegroundColor Yellow
    exit 1
}

$nssmExe = "C:\Program Files\nssm\nssm.exe"
$serviceName = "Clawdbot"

Write-Host "Fixing Clawdbot service configuration..." -ForegroundColor Cyan

# Remove the broken service
Write-Host "Removing old service..." -ForegroundColor Yellow
& $nssmExe remove $serviceName confirm
Start-Sleep -Seconds 2

# Install with correct configuration
Write-Host "Installing service with PowerShell wrapper..." -ForegroundColor Cyan

# Use PowerShell to run clawdbot
$pwshPath = "C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe"
$clawdbotArgs = "-NoProfile -ExecutionPolicy Bypass -Command `"& { clawdbot gateway start }`""

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
& $nssmExe set $serviceName AppStdout "$logDir\clawdbot-service-out.log"
& $nssmExe set $serviceName AppStderr "$logDir\clawdbot-service-err.log"
& $nssmExe set $serviceName AppRotateFiles 1
& $nssmExe set $serviceName AppRotateBytes 10485760

Write-Host ""
Write-Host "Starting service..." -ForegroundColor Cyan
Start-Service -Name $serviceName

Start-Sleep -Seconds 5

$service = Get-Service -Name $serviceName
if ($service.Status -eq 'Running') {
    Write-Host ""
    Write-Host "SUCCESS! Clawdbot service is running" -ForegroundColor Green
    Write-Host ""
    Write-Host "Check logs at: $logDir\clawdbot-service-out.log" -ForegroundColor Cyan
}
else {
    Write-Host ""
    Write-Host "Service status: $($service.Status)" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Check error log:" -ForegroundColor Yellow
    Write-Host "  Get-Content $logDir\clawdbot-service-err.log"
}
