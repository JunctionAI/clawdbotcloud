' Clawdbot Gateway Watchdog Launcher
' Runs the watchdog PowerShell script silently in the background
' Place a copy in: %APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup\

Set objShell = CreateObject("WScript.Shell")
objShell.Run "powershell.exe -ExecutionPolicy Bypass -WindowStyle Hidden -File ""C:\Users\Nightgalem\clawd\scripts\gateway-watchdog.ps1""", 0, False
