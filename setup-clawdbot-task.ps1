# Clawdbot Task Scheduler Setup
# Simpler and more reliable than NSSM on Windows

$taskName = "ClawdbotGateway"
$clawdbotCmd = "C:\Users\Nightgalem\AppData\Roaming\npm\clawdbot.cmd"
$workingDir = "C:\Users\Nightgalem\clawd"
$logFile = "C:\Users\Nightgalem\clawd\logs\clawdbot-task.log"

Write-Host "=== Clawdbot Task Scheduler Setup ===" -ForegroundColor Cyan

# Remove old NSSM service if exists
Write-Host "Cleaning up old services..."
Stop-Service Clawdbot -Force -ErrorAction SilentlyContinue
sc.exe delete Clawdbot 2>$null

# Remove old task if exists
Unregister-ScheduledTask -TaskName $taskName -Confirm:$false -ErrorAction SilentlyContinue

# Create logs folder
if (!(Test-Path "C:\Users\Nightgalem\clawd\logs")) {
    New-Item -ItemType Directory -Path "C:\Users\Nightgalem\clawd\logs" -Force | Out-Null
}

# Create a wrapper script that restarts on failure
$wrapperScript = @'
@echo off
:loop
echo [%date% %time%] Starting Clawdbot Gateway >> "C:\Users\Nightgalem\clawd\logs\clawdbot-task.log"
cd /d "C:\Users\Nightgalem\clawd"
"C:\Users\Nightgalem\AppData\Roaming\npm\clawdbot.cmd" gateway start
echo [%date% %time%] Gateway exited, restarting in 10 seconds... >> "C:\Users\Nightgalem\clawd\logs\clawdbot-task.log"
timeout /t 10 /nobreak
goto loop
'@

$wrapperPath = "C:\Users\Nightgalem\clawd\clawdbot-runner.cmd"
$wrapperScript | Out-File -FilePath $wrapperPath -Encoding ASCII
Write-Host "Created runner script: $wrapperPath"

# Create scheduled task
Write-Host "Creating scheduled task..."

$action = New-ScheduledTaskAction -Execute $wrapperPath -WorkingDirectory $workingDir
$trigger = New-ScheduledTaskTrigger -AtLogon
$principal = New-ScheduledTaskPrincipal -UserId $env:USERNAME -LogonType Interactive -RunLevel Highest
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable -RestartCount 3 -RestartInterval (New-TimeSpan -Minutes 1)

Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger -Principal $principal -Settings $settings -Force | Out-Null

Write-Host "Task created successfully!" -ForegroundColor Green

# Start the task now
Write-Host "Starting Clawdbot..."
Start-ScheduledTask -TaskName $taskName

Start-Sleep -Seconds 3

# Check if running
$task = Get-ScheduledTask -TaskName $taskName
Write-Host ""
Write-Host "Task Status: $($task.State)" -ForegroundColor $(if ($task.State -eq 'Running') { 'Green' } else { 'Yellow' })

Write-Host ""
Write-Host "=== Setup Complete ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Clawdbot will now:"
Write-Host "  - Start automatically when you log in"
Write-Host "  - Restart automatically if it crashes"
Write-Host "  - Run in a minimized window"
Write-Host ""
Write-Host "Useful commands:" -ForegroundColor Yellow
Write-Host "  Start-ScheduledTask -TaskName ClawdbotGateway    # Start"
Write-Host "  Stop-ScheduledTask -TaskName ClawdbotGateway     # Stop"
Write-Host "  Get-ScheduledTask -TaskName ClawdbotGateway      # Check status"
Write-Host ""
Write-Host "Logs at: C:\Users\Nightgalem\clawd\logs\clawdbot-task.log"
