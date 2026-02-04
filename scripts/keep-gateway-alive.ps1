# Keep Clawdbot Gateway Alive Forever
# Restarts gateway automatically if it crashes or stops

$logFile = "$PSScriptRoot\..\logs\gateway-keepalive.log"

# Determine the absolute path to clawdbot
# Prefer local node_modules path (more reliable), fallback to npm global
$localClawdbot = "$PSScriptRoot\..\node_modules\.bin\clawdbot.cmd"
$globalClawdbot = "$env:APPDATA\npm\clawdbot.cmd"

if (Test-Path $localClawdbot) {
    $clawdbotPath = (Resolve-Path $localClawdbot).Path
} elseif (Test-Path $globalClawdbot) {
    $clawdbotPath = $globalClawdbot
} else {
    Write-Error "ERROR: clawdbot not found at either location:"
    Write-Error "  Local:  $localClawdbot"
    Write-Error "  Global: $globalClawdbot"
    Write-Error "Please install clawdbot with 'npm install' or 'npm install -g clawdbot'"
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
Write-Log "Using clawdbot at: $clawdbotPath"
Write-Log "Process will restart gateway if it stops"
Write-Log "Logs: $logFile"
Write-Log "Press Ctrl+C to stop"

$restartCount = 0

while ($true) {
    try {
        Write-Log "Starting gateway (restart #$restartCount)..."
        
        # Start gateway in a new window and wait for it to exit
        $process = Start-Process -FilePath $clawdbotPath -ArgumentList "gateway", "run" -PassThru -Wait
        
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
