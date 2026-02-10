# Fix scheduled task settings to prevent stopping on idle
$taskName = 'ClawdbotGatewayKeepAlive'

# Get current task
$task = Get-ScheduledTask -TaskName $taskName

# Update settings to prevent stopping
$task.Settings.StopIfGoingOnBatteries = $false
$task.Settings.IdleSettings.StopOnIdleEnd = $false

# Apply changes
Set-ScheduledTask -InputObject $task

Write-Host "Task settings updated:"
Write-Host "  StopIfGoingOnBatteries: $($task.Settings.StopIfGoingOnBatteries)"
Write-Host "  StopOnIdleEnd: $($task.Settings.IdleSettings.StopOnIdleEnd)"
