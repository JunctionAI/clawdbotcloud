# Clawdbot Gateway Service Installer
# RUN THIS AS ADMINISTRATOR
# Right-click PowerShell -> "Run as Administrator" -> Run this script

$ErrorActionPreference = "Stop"
$serviceName = "ClawdbotGateway"
$nssmPath = "C:\Program Files\nssm\nssm.exe"
$gatewayScript = "C:\Users\Nightgalem\clawd\scripts\gateway-service.bat"
$logDir = "C:\Users\Nightgalem\clawd\logs"

# Check admin
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-Host "ERROR: This script must be run as Administrator!" -ForegroundColor Red
    Write-Host "Right-click PowerShell and select 'Run as Administrator'" -ForegroundColor Yellow
    exit 1
}

# Ensure log directory exists
if (-not (Test-Path $logDir)) {
    New-Item -ItemType Directory -Path $logDir -Force | Out-Null
}

# Check if service already exists
$existingService = Get-Service -Name $serviceName -ErrorAction SilentlyContinue
if ($existingService) {
    Write-Host "Service '$serviceName' already exists. Removing it first..." -ForegroundColor Yellow
    & $nssmPath stop $serviceName 2>&1 | Out-Null
    & $nssmPath remove $serviceName confirm 2>&1 | Out-Null
    Start-Sleep -Seconds 2
}

Write-Host "Installing Clawdbot Gateway as Windows Service..." -ForegroundColor Cyan

# Install the service
& $nssmPath install $serviceName $gatewayScript
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Failed to install service" -ForegroundColor Red
    exit 1
}

# Configure service settings
Write-Host "Configuring service settings..." -ForegroundColor Cyan

# Set display name and description
& $nssmPath set $serviceName DisplayName "Clawdbot Gateway"
& $nssmPath set $serviceName Description "Clawdbot messaging gateway for Discord, Telegram, and WhatsApp"

# Set startup type to automatic
& $nssmPath set $serviceName Start SERVICE_AUTO_START

# Set restart behavior on failure
& $nssmPath set $serviceName AppExit Default Restart
& $nssmPath set $serviceName AppRestartDelay 5000

# Set stdout/stderr logging
& $nssmPath set $serviceName AppStdout "$logDir\gateway-service.log"
& $nssmPath set $serviceName AppStderr "$logDir\gateway-service-error.log"
& $nssmPath set $serviceName AppRotateFiles 1
& $nssmPath set $serviceName AppRotateBytes 5242880

# Set working directory
& $nssmPath set $serviceName AppDirectory "C:\Users\Nightgalem"

# Set to run as current user (important for tokens/credentials)
$currentUser = [System.Security.Principal.WindowsIdentity]::GetCurrent().Name
Write-Host "Service will run as: $currentUser" -ForegroundColor Yellow
Write-Host "You will be prompted for your Windows password..." -ForegroundColor Yellow
& $nssmPath set $serviceName ObjectName $currentUser

Write-Host "`nService installed successfully!" -ForegroundColor Green
Write-Host "`nTo start the service:" -ForegroundColor Cyan
Write-Host "  & '$nssmPath' start $serviceName"
Write-Host "`nOr use Services app (services.msc) to start 'Clawdbot Gateway'"
Write-Host "`nThe service will now:" -ForegroundColor Green
Write-Host "  - Start automatically on Windows boot"
Write-Host "  - Restart automatically if it crashes"
Write-Host "  - Run as your user account (with access to tokens)"
Write-Host "`nLogs are at: $logDir\gateway-service*.log" -ForegroundColor Yellow

# Prompt to start now
$startNow = Read-Host "`nStart the service now? (y/n)"
if ($startNow -eq "y" -or $startNow -eq "Y") {
    Write-Host "Starting service..." -ForegroundColor Cyan
    & $nssmPath start $serviceName
    Start-Sleep -Seconds 5

    # Check if running
    $service = Get-Service -Name $serviceName
    if ($service.Status -eq "Running") {
        Write-Host "Service is running!" -ForegroundColor Green

        # Check if gateway is listening
        $conn = Get-NetTCPConnection -LocalPort 18789 -ErrorAction SilentlyContinue
        if ($conn) {
            Write-Host "Gateway is listening on port 18789" -ForegroundColor Green
        } else {
            Write-Host "Warning: Gateway not yet listening on port 18789. Check logs." -ForegroundColor Yellow
        }
    } else {
        Write-Host "Service status: $($service.Status)" -ForegroundColor Yellow
        Write-Host "Check logs for errors: $logDir\gateway-service*.log" -ForegroundColor Yellow
    }
}
