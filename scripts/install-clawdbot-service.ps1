# =============================================================================
# Clawdbot Windows Service Installer (NSSM)
# Run this ONCE as Administrator
# =============================================================================

#Requires -RunAsAdministrator

$serviceName = "ClawdbotGateway"
$nodeExe = "C:\Program Files\nodejs\node.exe"
$entryJs = "C:\Users\Nightgalem\AppData\Roaming\npm\node_modules\clawdbot\dist\entry.js"
$workDir = "C:\Users\Nightgalem\clawd"
$nssmPath = "C:\Program Files\nssm\nssm.exe"

# Check if NSSM exists
if (-not (Test-Path $nssmPath)) {
    Write-Host "[ERROR] NSSM not found at $nssmPath" -ForegroundColor Red
    Write-Host "Download from: https://nssm.cc/download"
    exit 1
}

# Check if node exists
if (-not (Test-Path $nodeExe)) {
    # Try alternative location
    $nodeExe = (Get-Command node.exe -ErrorAction SilentlyContinue).Source
    if (-not $nodeExe) {
        Write-Host "[ERROR] node.exe not found" -ForegroundColor Red
        exit 1
    }
}

Write-Host "=== Clawdbot Service Installer ===" -ForegroundColor Cyan
Write-Host "Service Name: $serviceName"
Write-Host "Node: $nodeExe"
Write-Host "Entry: $entryJs"
Write-Host "WorkDir: $workDir"
Write-Host ""

# Remove existing service if present
$existing = Get-Service -Name $serviceName -ErrorAction SilentlyContinue
if ($existing) {
    Write-Host "[INFO] Removing existing service..." -ForegroundColor Yellow
    & $nssmPath stop $serviceName 2>$null
    & $nssmPath remove $serviceName confirm
    Start-Sleep -Seconds 2
}

# Install service
Write-Host "[INFO] Installing service..." -ForegroundColor Green
& $nssmPath install $serviceName $nodeExe "$entryJs gateway run"

# Configure service
Write-Host "[INFO] Configuring service..." -ForegroundColor Green

# Set working directory
& $nssmPath set $serviceName AppDirectory $workDir

# Set display name and description
& $nssmPath set $serviceName DisplayName "Clawdbot Gateway"
& $nssmPath set $serviceName Description "Clawdbot AI Assistant Gateway - 24/7 daemon"

# Auto-start on boot
& $nssmPath set $serviceName Start SERVICE_AUTO_START

# Restart on failure (restart after 10 seconds, up to 3 times)
& $nssmPath set $serviceName AppExit Default Restart
& $nssmPath set $serviceName AppRestartDelay 10000

# Stdout/stderr logging
$logDir = "$workDir\logs"
if (-not (Test-Path $logDir)) { New-Item -ItemType Directory -Path $logDir -Force | Out-Null }
& $nssmPath set $serviceName AppStdout "$logDir\gateway-stdout.log"
& $nssmPath set $serviceName AppStderr "$logDir\gateway-stderr.log"
& $nssmPath set $serviceName AppStdoutCreationDisposition 4
& $nssmPath set $serviceName AppStderrCreationDisposition 4
& $nssmPath set $serviceName AppRotateFiles 1
& $nssmPath set $serviceName AppRotateBytes 10485760

# Environment variables (inherit user's PATH)
$userPath = [Environment]::GetEnvironmentVariable("PATH", "User")
$machinePath = [Environment]::GetEnvironmentVariable("PATH", "Machine")
& $nssmPath set $serviceName AppEnvironmentExtra "PATH=$userPath;$machinePath"

# Start service
Write-Host "[INFO] Starting service..." -ForegroundColor Green
& $nssmPath start $serviceName

Start-Sleep -Seconds 3

# Verify
$svc = Get-Service -Name $serviceName -ErrorAction SilentlyContinue
if ($svc -and $svc.Status -eq "Running") {
    Write-Host ""
    Write-Host "=== SUCCESS ===" -ForegroundColor Green
    Write-Host "Clawdbot Gateway is now running as a Windows Service!"
    Write-Host ""
    Write-Host "Commands:"
    Write-Host "  Check status:  Get-Service ClawdbotGateway"
    Write-Host "  Stop:          Stop-Service ClawdbotGateway"
    Write-Host "  Start:         Start-Service ClawdbotGateway"
    Write-Host "  Restart:       Restart-Service ClawdbotGateway"
    Write-Host "  Logs:          $logDir\gateway-*.log"
    Write-Host ""
    Write-Host "The gateway will now:"
    Write-Host "  - Start automatically on boot"
    Write-Host "  - Restart automatically if it crashes"
    Write-Host "  - Survive sleep/wake cycles"
    Write-Host "  - Run without any user logged in"
} else {
    Write-Host ""
    Write-Host "=== WARNING ===" -ForegroundColor Yellow
    Write-Host "Service installed but may not be running. Check manually:"
    Write-Host "  Get-Service ClawdbotGateway"
    Write-Host "  $nssmPath status $serviceName"
}
