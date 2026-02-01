#!/usr/bin/env pwsh
# Clawdbot Windows Service Setup (NSSM - Non-Sucking Service Manager)
# This creates a proper Windows service that auto-starts and auto-restarts

Write-Host "=== Clawdbot 24/7 Service Setup ===" -ForegroundColor Cyan
Write-Host ""

# Check if running as admin
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-Host "ERROR: This script requires administrator privileges" -ForegroundColor Red
    Write-Host ""
    Write-Host "Right-click PowerShell and select 'Run as Administrator', then run this script again." -ForegroundColor Yellow
    exit 1
}

# Variables
$serviceName = "Clawdbot"
$nssmDir = "C:\Program Files\nssm"
$nssmExe = "$nssmDir\nssm.exe"
$clawdbotPath = (Get-Command clawdbot -ErrorAction SilentlyContinue).Source

if (-not $clawdbotPath) {
    Write-Host "ERROR: clawdbot command not found in PATH" -ForegroundColor Red
    exit 1
}

Write-Host "Found clawdbot at: $clawdbotPath" -ForegroundColor Green

# Download and install NSSM if not present
if (-not (Test-Path $nssmExe)) {
    Write-Host "Downloading NSSM (Non-Sucking Service Manager)..." -ForegroundColor Yellow
    
    $nssmZip = "$env:TEMP\nssm.zip"
    $nssmUrl = "https://nssm.cc/release/nssm-2.24.zip"
    
    try {
        Invoke-WebRequest -Uri $nssmUrl -OutFile $nssmZip -UseBasicParsing
        
        Write-Host "Extracting NSSM..." -ForegroundColor Yellow
        Expand-Archive -Path $nssmZip -DestinationPath $env:TEMP -Force
        
        # Copy appropriate architecture version to Program Files
        $arch = if ([Environment]::Is64BitOperatingSystem) { "win64" } else { "win32" }
        $nssmSource = "$env:TEMP\nssm-2.24\$arch\nssm.exe"
        
        New-Item -ItemType Directory -Force -Path $nssmDir | Out-Null
        Copy-Item -Path $nssmSource -Destination $nssmExe -Force
        
        Write-Host "NSSM installed successfully" -ForegroundColor Green
        
        # Cleanup
        Remove-Item -Path $nssmZip -Force -ErrorAction SilentlyContinue
        Remove-Item -Path "$env:TEMP\nssm-2.24" -Recurse -Force -ErrorAction SilentlyContinue
    }
    catch {
        Write-Host "ERROR: Failed to download/install NSSM: $_" -ForegroundColor Red
        exit 1
    }
}

# Stop and remove existing service if it exists
$existingService = Get-Service -Name $serviceName -ErrorAction SilentlyContinue
if ($existingService) {
    Write-Host "Removing existing Clawdbot service..." -ForegroundColor Yellow
    
    if ($existingService.Status -eq 'Running') {
        Stop-Service -Name $serviceName -Force
    }
    
    & $nssmExe remove $serviceName confirm
    Start-Sleep -Seconds 2
}

# Stop any running clawdbot gateway processes
Write-Host "Stopping any running Clawdbot gateway processes..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | Where-Object {
    $_.CommandLine -like "*clawdbot*gateway*"
} | Stop-Process -Force -ErrorAction SilentlyContinue

# Install the service
Write-Host "Installing Clawdbot as Windows service..." -ForegroundColor Cyan
& $nssmExe install $serviceName $clawdbotPath gateway start

# Configure service parameters
Write-Host "Configuring service..." -ForegroundColor Cyan

# Set working directory
& $nssmExe set $serviceName AppDirectory "C:\Users\Nightgalem\clawd"

# Set display name and description
& $nssmExe set $serviceName DisplayName "Clawdbot Gateway"
& $nssmExe set $serviceName Description "Clawdbot AI Assistant Gateway - 24/7 Service"

# Configure auto-restart on failure
& $nssmExe set $serviceName AppThrottle 1500
& $nssmExe set $serviceName AppExit Default Restart
& $nssmExe set $serviceName AppRestartDelay 5000

# Set startup type to automatic
& $nssmExe set $serviceName Start SERVICE_AUTO_START

# Configure stdout/stderr logging
$logDir = "C:\Users\Nightgalem\clawd\logs"
New-Item -ItemType Directory -Force -Path $logDir | Out-Null

& $nssmExe set $serviceName AppStdout "$logDir\clawdbot-service-out.log"
& $nssmExe set $serviceName AppStderr "$logDir\clawdbot-service-err.log"

# Rotate logs at 10MB
& $nssmExe set $serviceName AppRotateFiles 1
& $nssmExe set $serviceName AppRotateBytes 10485760

Write-Host ""
Write-Host "Starting Clawdbot service..." -ForegroundColor Cyan
Start-Service -Name $serviceName

Start-Sleep -Seconds 3

# Check service status
$service = Get-Service -Name $serviceName
if ($service.Status -eq 'Running') {
    Write-Host ""
    Write-Host "SUCCESS! Clawdbot is now running as a Windows service" -ForegroundColor Green
    Write-Host ""
    Write-Host "Service Details:" -ForegroundColor Cyan
    Write-Host "  Name: $serviceName"
    Write-Host "  Status: $($service.Status)"
    Write-Host "  Startup Type: Automatic"
    Write-Host "  Auto-restart: Enabled (5 second delay)"
    Write-Host ""
    Write-Host "Logs:" -ForegroundColor Cyan
    Write-Host "  Output: $logDir\clawdbot-service-out.log"
    Write-Host "  Errors: $logDir\clawdbot-service-err.log"
    Write-Host ""
    Write-Host "Useful Commands:" -ForegroundColor Cyan
    Write-Host "  Check status:    Get-Service Clawdbot"
    Write-Host "  Stop service:    Stop-Service Clawdbot"
    Write-Host "  Start service:   Start-Service Clawdbot"
    Write-Host "  Restart service: Restart-Service Clawdbot"
    Write-Host "  View logs:       Get-Content $logDir\clawdbot-service-out.log -Tail 50"
    Write-Host "  Remove service:  nssm remove Clawdbot confirm"
    Write-Host ""
    Write-Host "The service will now:" -ForegroundColor Green
    Write-Host "  - Start automatically on boot"
    Write-Host "  - Restart automatically if it crashes"
    Write-Host "  - Run 24/7 in the background"
    Write-Host ""
}
else {
    Write-Host ""
    Write-Host "WARNING: Service installed but not running" -ForegroundColor Yellow
    Write-Host "Check logs at: $logDir" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Try starting manually: Start-Service Clawdbot" -ForegroundColor Yellow
}
