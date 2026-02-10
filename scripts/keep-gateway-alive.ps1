# Keep Clawdbot Gateway Alive Forever
# Restarts gateway automatically if it crashes or stops

$logFile = "$PSScriptRoot\..\logs\gateway-keepalive.log"

# Determine the absolute paths to node and clawdbot
# IMPORTANT: Use absolute hardcoded paths for scheduled task reliability
# Scheduled tasks don't get the user's PATH or environment variables
$nodePath = "C:\Program Files\nodejs\node.exe"
$clawdbotScript = "C:\Users\Nightgalem\AppData\Roaming\npm\node_modules\clawdbot\dist\entry.js"

if (-not (Test-Path $nodePath)) {
    Write-Error "ERROR: Node.js not found at: $nodePath"
    exit 1
}

if (-not (Test-Path $clawdbotScript)) {
    Write-Error "ERROR: Clawdbot not found at: $clawdbotScript"
    Write-Error "Please install clawdbot with 'npm install -g clawdbot'"
    exit 1
}

# Create logs directory if it doesn't exist
$logsDir = Split-Path $logFile -Parent
if (-not (Test-Path $logsDir)) {
    New-Item -ItemType Directory -Path $logsDir -Force | Out-Null
}

function Write-Log {
    param($Message)
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    "$timestamp - $Message" | Tee-Object -FilePath $logFile -Append
}

Write-Log "=== Gateway Keep-Alive Started ==="
Write-Log "Using node at: $nodePath"
Write-Log "Using clawdbot at: $clawdbotScript"
Write-Log "Process will restart gateway if it stops"
Write-Log "Logs: $logFile"
Write-Log "Press Ctrl+C to stop"

$restartCount = 0
$gatewayPort = 18789

# Function to check if gateway is running
function Test-GatewayRunning {
    $conn = Get-NetTCPConnection -LocalPort $gatewayPort -ErrorAction SilentlyContinue | Where-Object { $_.State -eq 'Listen' }
    return $null -ne $conn
}

while ($true) {
    try {
        # Check if gateway is already running
        if (Test-GatewayRunning) {
            Write-Log "Gateway already running on port $gatewayPort - monitoring..."
            # Wait and check again in 30 seconds
            Start-Sleep -Seconds 30
            continue
        }

        Write-Log "Starting gateway (restart #$restartCount)..."

        # Start gateway using node.exe directly (more reliable than .cmd in scheduled tasks)
        # Use -WorkingDirectory to ensure valid working directory in scheduled task context
        $workingDir = "C:\Users\Nightgalem\clawd"
        $args = "`"$clawdbotScript`" gateway run"
        Write-Log "  Command: $nodePath $args"
        Write-Log "  Working dir: $workingDir"
        $process = Start-Process -FilePath $nodePath -ArgumentList $args -WorkingDirectory $workingDir -PassThru -Wait
        
        $exitCode = $process.ExitCode
        Write-Log "Gateway exited with code $exitCode"
        
        # If exit code is 0, it was a clean shutdown (user stopped it)
        if ($exitCode -eq 0) {
            Write-Log "Clean shutdown detected. Waiting 10 seconds before restart..."
            Start-Sleep -Seconds 10
        } else {
            Write-Log "Unexpected exit. Restarting immediately..."
            Start-Sleep -Seconds 5
        }
        
        $restartCount++
        
    } catch {
        Write-Log "ERROR: $($_.Exception.Message)"
        Write-Log "Waiting 10 seconds before retry..."
        Start-Sleep -Seconds 10
    }
}
