# Register Clawdbot Watchdog as a Scheduled Task (no admin needed)

# Remove old task if exists
Unregister-ScheduledTask -TaskName 'ClawdbotWatchdog' -Confirm:$false -ErrorAction SilentlyContinue

# Create the action
$taskAction = New-ScheduledTaskAction -Execute 'powershell.exe' -Argument '-ExecutionPolicy Bypass -WindowStyle Hidden -File "C:\Users\Nightgalem\clawd\scripts\gateway-watchdog.ps1"'

# Trigger 1: At logon
$triggerLogon = New-ScheduledTaskTrigger -AtLogOn

# Trigger 2: Repeating every 5 minutes (safety net if watchdog crashes)
$triggerRepeat = New-ScheduledTaskTrigger -Once -At (Get-Date) -RepetitionInterval (New-TimeSpan -Minutes 5)

# Settings
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable -RestartCount 999 -RestartInterval (New-TimeSpan -Minutes 1) -ExecutionTimeLimit (New-TimeSpan -Days 365) -MultipleInstances IgnoreNew

# Register
Register-ScheduledTask -TaskName 'ClawdbotWatchdog' -Action $taskAction -Trigger @($triggerLogon, $triggerRepeat) -Settings $settings -Description 'Keeps Clawdbot Gateway running 24/7. Checks every 30s, restarts if down.'

Write-Host "Task registered. Starting now..."
Start-ScheduledTask -TaskName 'ClawdbotWatchdog'
Start-Sleep -Seconds 2
Get-ScheduledTask -TaskName 'ClawdbotWatchdog' | Select-Object TaskName, State
