# Start Clawdbot Gateway if not running
# This script is designed to run at user login via Startup folder

$gatewayPort = 18789
$nodePath = "C:\Program Files\nodejs\node.exe"
$clawdbotScript = "C:\Users\Nightgalem\AppData\Roaming\npm\node_modules\clawdbot\dist\entry.js"
$logFile = "C:\Users\Nightgalem\clawd\logs\gateway-startup.log"

# Ensure log directory exists
$logDir = Split-Path $logFile -Parent
if (-not (Test-Path $logDir)) {
    New-Item -ItemType Directory -Path $logDir -Force | Out-Null
}

function Write-Log {
    param($Message)
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    "$timestamp - $Message" | Tee-Object -FilePath $logFile -Append
}

function Test-GatewayRunning {
    $conn = Get-NetTCPConnection -LocalPort $gatewayPort -ErrorAction SilentlyContinue | Where-Object { $_.State -eq 'Listen' }
    return $null -ne $conn
}

Write-Log "=== Gateway Startup Check ==="

if (Test-GatewayRunning) {
    Write-Log "Gateway already running on port $gatewayPort - no action needed"
    exit 0
}

Write-Log "Gateway not running - starting..."

# Verify files exist
if (-not (Test-Path $nodePath)) {
    Write-Log "ERROR: Node.js not found at $nodePath"
    exit 1
}
if (-not (Test-Path $clawdbotScript)) {
    Write-Log "ERROR: Clawdbot not found at $clawdbotScript"
    exit 1
}

# Start gateway
try {
    Start-Process -FilePath $nodePath -ArgumentList "`"$clawdbotScript`" gateway run" -WindowStyle Normal
    Write-Log "Gateway started successfully"

    # Wait a moment and verify
    Start-Sleep -Seconds 5
    if (Test-GatewayRunning) {
        Write-Log "Gateway confirmed running on port $gatewayPort"
    } else {
        Write-Log "WARNING: Gateway process started but not listening yet"
    }
} catch {
    Write-Log "ERROR: Failed to start gateway - $($_.Exception.Message)"
    exit 1
}

Write-Log "Startup check complete"
