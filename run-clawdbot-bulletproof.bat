@echo off
title Clawdbot Gateway - Bulletproof Mode
cd /d C:\Users\Nightgalem\clawd

:: Create log file
set LOGFILE=clawdbot-autorestart.log

echo ======================================== >> %LOGFILE%
echo Bulletproof wrapper started >> %LOGFILE%
echo Date: %date% %time% >> %LOGFILE%
echo ======================================== >> %LOGFILE%

:loop
echo.
echo ========================================
echo Starting Clawdbot Gateway...
echo Time: %date% %time%
echo ========================================
echo.

echo [%date% %time%] Starting Clawdbot >> %LOGFILE%

clawdbot gateway start

echo.
echo ========================================
echo Clawdbot stopped (exit code: %ERRORLEVEL%)
echo Time: %date% %time%
echo Restarting in 5 seconds...
echo ========================================
echo.

echo [%date% %time%] Clawdbot stopped (exit code: %ERRORLEVEL%) >> %LOGFILE%

timeout /t 5 /nobreak
goto loop
