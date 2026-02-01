#!/usr/bin/env pwsh
# Setup Clawdbot Gateway as Windows Scheduled Task (24/7 auto-start)

Write-Host "Setting up Clawdbot Gateway as Windows Service" -ForegroundColor Cyan

# Task name
$taskName = "ClawdbotGateway"

# Check if task already exists
$existingTask = Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue

if ($existingTask) {
    Write-Host "Removing existing task..." -ForegroundColor Yellow
    Unregister-ScheduledTask -TaskName $taskName -Confirm:$false
}

# Create action (what to run)
$action = New-ScheduledTaskAction `
    -Execute "clawdbot" `
    -Argument "gateway start" `
    -WorkingDirectory "C:\Users\Nightgalem\clawd"

# Create trigger (when to run - at startup + keep running)
$trigger = New-ScheduledTaskTrigger -AtStartup

# Create settings (run indefinitely, restart on failure)
$settings = New-ScheduledTaskSettingsSet `
    -AllowStartIfOnBatteries `
    -DontStopIfGoingOnBatteries `
    -StartWhenAvailable `
    -RestartCount 3 `
    -RestartInterval (New-TimeSpan -Minutes 1) `
    -ExecutionTimeLimit (New-TimeSpan -Days 365)

# Create principal (run as current user, highest privileges)
$principal = New-ScheduledTaskPrincipal `
    -UserId "$env:USERDOMAIN\$env:USERNAME" `
    -LogonType Interactive `
    -RunLevel Highest

# Register the task
Write-Host "Registering scheduled task..." -ForegroundColor Cyan
Register-ScheduledTask `
    -TaskName $taskName `
    -Action $action `
    -Trigger $trigger `
    -Settings $settings `
    -Principal $principal `
    -Description "Clawdbot Gateway - 24/7 AI Assistant Service"

Write-Host ""
Write-Host "Task registered successfully!" -ForegroundColor Green

# Start the task now
Write-Host "Starting gateway now..." -ForegroundColor Cyan
Start-ScheduledTask -TaskName $taskName

Start-Sleep -Seconds 2

# Check status
Write-Host ""
Write-Host "Task Status:" -ForegroundColor Cyan
Get-ScheduledTask -TaskName $taskName | Format-List TaskName, State, LastRunTime

Write-Host ""
Write-Host "Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Useful commands:"
Write-Host "  Get-ScheduledTask -TaskName ClawdbotGateway"
Write-Host "  Start-ScheduledTask -TaskName ClawdbotGateway"
Write-Host "  Stop-ScheduledTask -TaskName ClawdbotGateway"
Write-Host "  Unregister-ScheduledTask -TaskName ClawdbotGateway"
Write-Host ""
