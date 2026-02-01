# Start Clawdbot and auto-restart if it crashes
# This keeps Clawdbot running forever with auto-recovery

$clawdbotPath = "C:\Users\Nightgalem\AppData\Roaming\npm\node_modules\clawdbot\dist\entry.js"
$workingDir = "C:\Users\Nightgalem\clawd"
$logFile = "$workingDir\clawdbot-wrapper.log"

Set-Location $workingDir

Write-Host "🚀 Starting Clawdbot in auto-restart mode..." -ForegroundColor Green
Write-Host "Working directory: $workingDir" -ForegroundColor Cyan
Write-Host "Log file: $logFile" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop" -ForegroundColor Yellow
Write-Host ""

# Log function
function Log {
    param($message)
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $logLine = "[$timestamp] $message"
    Write-Host $logLine
    Add-Content -Path $logFile -Value $logLine
}

# Main loop
$restartCount = 0
while ($true) {
    try {
        Log "Starting Clawdbot... (restart #$restartCount)"
        
        # Start Clawdbot
        $process = Start-Process -FilePath "node.exe" `
            -ArgumentList "`"$clawdbotPath`" gateway start" `
            -WorkingDirectory $workingDir `
            -PassThru `
            -NoNewWindow
        
        Log "Clawdbot started (PID: $($process.Id))"
        
        # Wait for process to exit
        $process.WaitForExit()
        
        $exitCode = $process.ExitCode
        Log "Clawdbot stopped (exit code: $exitCode)"
        
        # If clean exit (code 0), don't restart
        if ($exitCode -eq 0) {
            Log "Clean exit detected. Stopping auto-restart."
            break
        }
        
        # Otherwise, wait a bit and restart
        $restartCount++
        Log "Restarting in 5 seconds..."
        Start-Sleep -Seconds 5
        
    } catch {
        Log "ERROR: $($_.Exception.Message)"
        Log "Restarting in 10 seconds..."
        Start-Sleep -Seconds 10
        $restartCount++
    }
}

Log "Wrapper stopped."
