Set WshShell = CreateObject("WScript.Shell")
WshShell.Run "powershell.exe -ExecutionPolicy Bypass -WindowStyle Hidden -File ""C:\Users\Nightgalem\clawd\start-clawdbot-bulletproof.ps1""", 0, False
