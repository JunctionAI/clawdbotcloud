@echo off
REM Clawdbot Service Runner
REM This script runs clawdbot gateway with proper paths

set PATH=%PATH%;C:\Users\Nightgalem\AppData\Roaming\npm;C:\Program Files\nodejs
cd /d C:\Users\Nightgalem\clawd

echo Starting Clawdbot Gateway at %date% %time%
"C:\Users\Nightgalem\AppData\Roaming\npm\clawdbot.cmd" gateway start
