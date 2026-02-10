# Windows Gateway Keepalive Skill

## Problem
Clawdbot gateway crashes or stops randomly, requiring manual restarts.

## Solution
Use NSSM (Non-Sucking Service Manager) to run the gateway as a Windows Service with automatic restart on failure.

## Why This Works
- **Windows Services** run independently of user login sessions
- **NSSM** wraps any executable into a proper Windows service
- **Auto-restart on crash** ensures 24/7 uptime
- **Runs as your user** so tokens and credentials are accessible

## Installation Steps

### Prerequisites
1. NSSM must be installed at `C:\Program Files\nssm\nssm.exe`
2. Clawdbot must be installed via npm

### One-Time Setup (Run as Administrator)

1. Open PowerShell **as Administrator**:
   - Right-click Start Menu → "Windows PowerShell (Admin)"
   - Or search "PowerShell", right-click → "Run as administrator"

2. Run the installer script:
   ```powershell
   & "C:\Users\Nightgalem\clawd\scripts\install-gateway-service.ps1"
   ```

3. Enter your Windows password when prompted (for service to run as your user)

4. Choose "y" to start the service immediately

### Service Management

**Start service:**
```powershell
& "C:\Program Files\nssm\nssm.exe" start ClawdbotGateway
```

**Stop service:**
```powershell
& "C:\Program Files\nssm\nssm.exe" stop ClawdbotGateway
```

**Restart service:**
```powershell
& "C:\Program Files\nssm\nssm.exe" restart ClawdbotGateway
```

**Check status:**
```powershell
Get-Service ClawdbotGateway
```

**View in Services app:**
- Press `Win+R`, type `services.msc`, press Enter
- Find "Clawdbot Gateway" in the list

### Logs

Service logs are at:
- `C:\Users\Nightgalem\clawd\logs\gateway-service.log` (stdout)
- `C:\Users\Nightgalem\clawd\logs\gateway-service-error.log` (stderr)

Logs auto-rotate at 5MB.

### Uninstall Service

```powershell
# Run as Administrator
& "C:\Program Files\nssm\nssm.exe" stop ClawdbotGateway
& "C:\Program Files\nssm\nssm.exe" remove ClawdbotGateway confirm
```

## How It Works

1. **NSSM** monitors the gateway process
2. If process crashes → NSSM restarts it after 5 seconds
3. Service starts automatically at Windows boot
4. Runs as your user account (not SYSTEM) to access credentials
5. No console window required - runs in background

## Troubleshooting

### Service won't start
- Check logs at `C:\Users\Nightgalem\clawd\logs\`
- Verify Node.js is in PATH
- Check clawdbot config is valid

### Port already in use
- Stop any existing gateway processes: `Stop-Process -Name node -Force`
- Then start the service

### Need to update config
- Edit `C:\Users\Nightgalem\.clawdbot\clawdbot.json`
- Restart service: `& "C:\Program Files\nssm\nssm.exe" restart ClawdbotGateway`

## Files

- `C:\Users\Nightgalem\clawd\scripts\gateway-service.bat` - Wrapper script
- `C:\Users\Nightgalem\clawd\scripts\install-gateway-service.ps1` - Installer
- `C:\Users\Nightgalem\clawd\skills\windows-gateway-keepalive.md` - This doc

## Sources

- [NSSM Documentation](https://nssm.cc/)
- [Run PM2 as Windows Service](https://medium.com/@gzthomasliang/run-pm2-as-service-on-windows-server-in-modern-way-286b9f4b8228)
- [Node.js as Windows Service](https://dev.to/petereysermans/installing-a-node-js-application-as-a-windows-service-28j7)
