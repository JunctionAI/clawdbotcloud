@echo off
title Clawdbot Gateway - Keep Running
cd /d C:\Users\Nightgalem\clawd

:loop
echo.
echo ========================================
echo Starting Clawdbot Gateway...
echo Time: %date% %time%
echo ========================================
echo.

clawdbot gateway start

echo.
echo ========================================
echo Clawdbot stopped. Restarting in 5 seconds...
echo Time: %date% %time%
echo ========================================
echo.

timeout /t 5 /nobreak
goto loop
