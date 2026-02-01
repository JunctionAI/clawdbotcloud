@echo off
:loop
echo [%date% %time%] Starting Clawdbot Gateway >> "C:\Users\Nightgalem\clawd\logs\clawdbot-task.log"
cd /d "C:\Users\Nightgalem\clawd"
"C:\Users\Nightgalem\AppData\Roaming\npm\clawdbot.cmd" gateway start
echo [%date% %time%] Gateway exited, restarting in 10 seconds... >> "C:\Users\Nightgalem\clawd\logs\clawdbot-task.log"
timeout /t 10 /nobreak
goto loop
