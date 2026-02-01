# Setup Clawdbot to auto-start on Windows boot
# Run this script as Administrator

$taskName = "Clawdbot Gateway"
$clawdbotPath = "C:\Users\Nightgalem\AppData\Roaming\npm\node_modules\clawdbot\dist\entry.js"
$workingDir = "C:\Users\Nightgalem\clawd"

Write-Host "Setting up Clawdbot auto-start..." -ForegroundColor Green

# Remove existing task if it exists
Unregister-ScheduledTask -TaskName $taskName -Confirm:$false -ErrorAction SilentlyContinue

# Create scheduled task action
$action = New-ScheduledTaskAction `
    -Execute "node.exe" `
    -Argument "`"$clawdbotPath`" gateway start" `
    -WorkingDirectory $workingDir

# Create trigger (at startup)
$trigger = New-ScheduledTaskTrigger -AtStartup

# Create settings
$settings = New-ScheduledTaskSettingsSet `
    -AllowStartIfOnBatteries `
    -DontStopIfGoingOnBatteries `
    -StartWhenAvailable `
    -RestartCount 3 `
    -RestartInterval (New-TimeSpan -Minutes 1)

# Create principal (run as current user)
$principal = New-ScheduledTaskPrincipal `
    -UserId $env:USERNAME `
    -LogonType Interactive `
    -RunLevel Limited

# Register the task
Register-ScheduledTask `
    -TaskName $taskName `
    -Action $action `
    -Trigger $trigger `
    -Settings $settings `
    -Principal $principal `
    -Description "Starts Clawdbot Gateway automatically on Windows startup"

Write-Host ""
Write-Host "✅ Task created successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Clawdbot will now start automatically when Windows boots." -ForegroundColor Cyan
Write-Host ""
Write-Host "To manually start now:" -ForegroundColor Yellow
Write-Host "  Start-ScheduledTask -TaskName '$taskName'" -ForegroundColor White
Write-Host ""
Write-Host "To stop:" -ForegroundColor Yellow
Write-Host "  Stop-ScheduledTask -TaskName '$taskName'" -ForegroundColor White
Write-Host ""
Write-Host "To remove auto-start:" -ForegroundColor Yellow
Write-Host "  Unregister-ScheduledTask -TaskName '$taskName' -Confirm:`$false" -ForegroundColor White
