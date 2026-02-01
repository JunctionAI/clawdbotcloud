# Create startup shortcut for Clawdbot
$WshShell = New-Object -comObject WScript.Shell
$Startup = [System.Environment]::GetFolderPath('Startup')
$Shortcut = $WshShell.CreateShortcut("$Startup\Clawdbot Gateway.lnk")
$Shortcut.TargetPath = "C:\Users\Nightgalem\clawd\start-clawdbot.vbs"
$Shortcut.WorkingDirectory = "C:\Users\Nightgalem\clawd"
$Shortcut.WindowStyle = 1  # Normal window
$Shortcut.Description = "Clawdbot Gateway - Auto Restart"
$Shortcut.Save()

Write-Host "✅ Startup shortcut created!" -ForegroundColor Green
Write-Host "Location: $Startup\Clawdbot Gateway.lnk" -ForegroundColor Cyan
Write-Host ""
Write-Host "Clawdbot will now start automatically when you log in to Windows." -ForegroundColor Yellow
