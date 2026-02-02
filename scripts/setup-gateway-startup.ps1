# Setup Clawdbot Gateway to Start at Windows Boot
# Run this script ONCE as Administrator

# Check if running as admin
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "ERROR: This script must be run as Administrator" -ForegroundColor Red
    Write-Host "Right-click PowerShell and choose 'Run as Administrator'" -ForegroundColor Yellow
    exit 1
}

$scriptPath = "$PSScriptRoot\keep-gateway-alive.ps1"
$taskName = "ClawdbotGatewayKeepAlive"

# Check if task already exists
$existingTask = Get-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue

if ($existingTask) {
    Write-Host "Task '$taskName' already exists. Removing old task..." -ForegroundColor Yellow
    Unregister-ScheduledTask -TaskName $taskName -Confirm:$false
}

# Create scheduled task
$action = New-ScheduledTaskAction -Execute "PowerShell.exe" -Argument "-NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File `"$scriptPath`""

$trigger = New-ScheduledTaskTrigger -AtStartup

$settings = New-ScheduledTaskSettingsSet `
    -AllowStartIfOnBatteries `
    -DontStopIfGoingOnBatteries `
    -StartWhenAvailable `
    -RestartCount 999 `
    -RestartInterval (New-TimeSpan -Minutes 1)

$principal = New-ScheduledTaskPrincipal -UserId "$env:USERDOMAIN\$env:USERNAME" -LogonType S4U -RunLevel Highest

# Register the task
Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger -Settings $settings -Principal $principal -Description "Keeps Clawdbot Gateway running 24/7, auto-restarts if it crashes"

Write-Host "`n=== SUCCESS ===" -ForegroundColor Green
Write-Host "Scheduled task '$taskName' created successfully" -ForegroundColor Green
Write-Host "`nThe gateway will now:" -ForegroundColor Cyan
Write-Host "  1. Start automatically when Windows boots" -ForegroundColor Cyan
Write-Host "  2. Restart automatically if it crashes" -ForegroundColor Cyan
Write-Host "  3. Keep running 24/7" -ForegroundColor Cyan

Write-Host "`nTo start it NOW without rebooting:" -ForegroundColor Yellow
Write-Host "  Start-ScheduledTask -TaskName '$taskName'" -ForegroundColor White

Write-Host "`nTo stop it:" -ForegroundColor Yellow
Write-Host "  Stop-ScheduledTask -TaskName '$taskName'" -ForegroundColor White

Write-Host "`nTo remove it:" -ForegroundColor Yellow
Write-Host "  Unregister-ScheduledTask -TaskName '$taskName'" -ForegroundColor White

Write-Host "`nLogs will be saved to:" -ForegroundColor Yellow
Write-Host "  $PSScriptRoot\..\logs\gateway-keepalive.log" -ForegroundColor White

Write-Host "`n"
