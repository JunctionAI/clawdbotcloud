@echo off
REM Clawdbot Gateway Service Wrapper
REM This script is run by NSSM to start the gateway as a Windows service

cd /d C:\Users\Nightgalem
set PATH=%PATH%;C:\Program Files\nodejs;C:\Users\Nightgalem\AppData\Roaming\npm

REM Run the gateway (foreground mode - NSSM handles the process)
call "C:\Users\Nightgalem\AppData\Roaming\npm\clawdbot.cmd" gateway run
