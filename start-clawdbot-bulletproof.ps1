# Bulletproof Clawdbot Gateway Starter
# This script will automatically restart the gateway if it crashes

$logFile = "C:\Users\Nightgalem\clawd\clawdbot-autorestart.log"
$maxRetries = 999
$retryCount = 0
$nodeExe = "C:\Program Files\nodejs\node.exe"
$clawdbotEntry = "C:\Users\Nightgalem\AppData\Roaming\npm\node_modules\clawdbot\dist\entry.js"

function Write-Log {
    param($message)
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $logMessage = "[$timestamp] $message"
    Write-Host $logMessage
    Add-Content -Path $logFile -Value $logMessage
}

Write-Log "=== Clawdbot Bulletproof Starter ==="
Write-Log "Max retries: $maxRetries"
Write-Log "Node: $nodeExe"
Write-Log "Entry: $clawdbotEntry"

while ($retryCount -lt $maxRetries) {
    $retryCount++
    Write-Log "Starting gateway (attempt $retryCount/$maxRetries)..."

    try {
        $process = Start-Process -FilePath $nodeExe -ArgumentList "`"$clawdbotEntry`" gateway --port 18789" -NoNewWindow -PassThru -Wait
        $exitCode = $process.ExitCode

        if ($exitCode -eq 0) {
            Write-Log "Gateway exited gracefully (code 0)"
            break
        } else {
            Write-Log "Gateway crashed with exit code $exitCode"
            Write-Log "Waiting 5 seconds before restart..."
            Start-Sleep -Seconds 5
        }
    } catch {
        Write-Log "ERROR: Failed to start gateway: $_"
        Write-Log "Waiting 10 seconds before retry..."
        Start-Sleep -Seconds 10
    }
}

if ($retryCount -ge $maxRetries) {
    Write-Log "FATAL: Max retries reached. Giving up."
    exit 1
} else {
    Write-Log "Gateway stopped gracefully."
    exit 0
}
