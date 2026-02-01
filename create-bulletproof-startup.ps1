# Create bulletproof startup task for Clawdbot
# Run as Administrator

$taskName = "Clawdbot Gateway Bulletproof"
$batFile = "C:\Users\Nightgalem\clawd\run-clawdbot-bulletproof.bat"
$workingDir = "C:\Users\Nightgalem\clawd"

Write-Host "Creating bulletproof Clawdbot startup task..." -ForegroundColor Green

# Remove existing task if present
Unregister-ScheduledTask -TaskName $taskName -Confirm:$false -ErrorAction SilentlyContinue

# Create action
$action = New-ScheduledTaskAction `
    -Execute "cmd.exe" `
    -Argument "/c `"$batFile`"" `
    -WorkingDirectory $workingDir

# Create trigger (at startup + at logon)
$triggerStartup = New-ScheduledTaskTrigger -AtStartup
$triggerLogon = New-ScheduledTaskTrigger -AtLogOn -User $env:USERNAME

# Create settings (keep running, restart on failure)
$settings = New-ScheduledTaskSettingsSet `
    -AllowStartIfOnBatteries `
    -DontStopIfGoingOnBatteries `
    -DontStopOnIdleEnd `
    -StartWhenAvailable `
    -RestartCount 999 `
    -RestartInterval (New-TimeSpan -Minutes 1) `
    -ExecutionTimeLimit (New-TimeSpan -Days 0)

# Create principal (run as current user, highest privileges)
$principal = New-ScheduledTaskPrincipal `
    -UserId $env:USERNAME `
    -LogonType Interactive `
    -RunLevel Highest

# Register task with BOTH triggers
$task = Register-ScheduledTask `
    -TaskName $taskName `
    -Action $action `
    -Trigger $triggerStartup,$triggerLogon `
    -Settings $settings `
    -Principal $principal `
    -Description "Clawdbot Gateway - Auto-restart on crash, survives reboots"

Write-Host ""
Write-Host "✅ Bulletproof task created!" -ForegroundColor Green
Write-Host ""
Write-Host "Task will:" -ForegroundColor Cyan
Write-Host "  - Start at Windows boot" -ForegroundColor White
Write-Host "  - Start when you log in" -ForegroundColor White
Write-Host "  - Auto-restart on crash (up to 999 times)" -ForegroundColor White
Write-Host "  - Never timeout" -ForegroundColor White
Write-Host "  - Log everything to clawdbot-autorestart.log" -ForegroundColor White
Write-Host ""
Write-Host "To start now:" -ForegroundColor Yellow
Write-Host "  Start-ScheduledTask -TaskName '$taskName'" -ForegroundColor White
Write-Host ""
Write-Host "To view logs:" -ForegroundColor Yellow
Write-Host "  Get-Content C:\Users\Nightgalem\clawd\clawdbot-autorestart.log -Tail 50" -ForegroundColor White
