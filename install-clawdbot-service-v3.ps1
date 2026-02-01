# Clawdbot Windows Service Installer v3
# Uses a batch file wrapper to ensure proper PATH

$serviceName = "Clawdbot"
$nssmPath = "C:\Users\Nightgalem\clawd\nssm\win64\nssm.exe"
$runnerScript = "C:\Users\Nightgalem\clawd\clawdbot-service-runner.cmd"
$logDir = "C:\Users\Nightgalem\clawd\logs"

Write-Host "=== Clawdbot Service Installer v3 ===" -ForegroundColor Cyan

# Ensure logs directory exists
if (!(Test-Path $logDir)) {
    New-Item -ItemType Directory -Path $logDir -Force | Out-Null
}

# Check if service exists and remove it
$existingService = Get-Service -Name $serviceName -ErrorAction SilentlyContinue
if ($existingService) {
    Write-Host "Removing existing service..."
    & $nssmPath stop $serviceName 2>$null
    & $nssmPath remove $serviceName confirm
    Start-Sleep -Seconds 2
}

Write-Host "Installing Clawdbot service..."
& $nssmPath install $serviceName $runnerScript

Write-Host "Configuring service..."
& $nssmPath set $serviceName AppDirectory "C:\Users\Nightgalem\clawd"
& $nssmPath set $serviceName DisplayName "Clawdbot Gateway"
& $nssmPath set $serviceName Description "Clawdbot Discord Gateway - 24/7 AI Assistant"
& $nssmPath set $serviceName Start SERVICE_AUTO_START
& $nssmPath set $serviceName AppRestartDelay 5000
& $nssmPath set $serviceName AppExit Default Restart
& $nssmPath set $serviceName AppStdout "$logDir\clawdbot-service-out.log"
& $nssmPath set $serviceName AppStderr "$logDir\clawdbot-service-err.log"
& $nssmPath set $serviceName AppRotateFiles 1
& $nssmPath set $serviceName AppRotateBytes 10485760

Write-Host ""
Write-Host "Starting service..." -ForegroundColor Yellow
Start-Service -Name $serviceName
Start-Sleep -Seconds 3

$service = Get-Service -Name $serviceName
Write-Host ""
Write-Host "Service status: $($service.Status)" -ForegroundColor $(if ($service.Status -eq 'Running') { 'Green' } else { 'Red' })

if ($service.Status -eq 'Running') {
    Write-Host ""
    Write-Host "SUCCESS! Clawdbot is now running as a Windows service." -ForegroundColor Green
    Write-Host ""
    Write-Host "Useful commands:" -ForegroundColor Cyan
    Write-Host "  Get-Service Clawdbot          # Check status"
    Write-Host "  Restart-Service Clawdbot      # Restart"
    Write-Host "  Stop-Service Clawdbot         # Stop"
    Write-Host "  Get-Content '$logDir\clawdbot-service-out.log' -Tail 20   # View logs"
} else {
    Write-Host ""
    Write-Host "Service didn't start. Check error log:" -ForegroundColor Red
    Write-Host "  Get-Content '$logDir\clawdbot-service-err.log'"
}
