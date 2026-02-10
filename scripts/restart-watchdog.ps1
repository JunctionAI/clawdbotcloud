# Kill ALL powershell processes except this one, then start fresh watchdog
$myPid = $PID
Get-Process -Name powershell -ErrorAction SilentlyContinue | Where-Object { $_.Id -ne $myPid } | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 3

# Start the watchdog fresh
Start-Process -FilePath "powershell.exe" -ArgumentList "-ExecutionPolicy Bypass -WindowStyle Hidden -File `"C:\Users\Nightgalem\clawd\scripts\gateway-watchdog.ps1`"" -WindowStyle Hidden
Write-Host "Watchdog restarted"
