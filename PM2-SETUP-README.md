# PM2 Setup for Clawdbot - Keep Running 24/7

**Problem:** Running `clawdbot gateway start` in a terminal works, but stops when you close the terminal or after timeouts.

**Solution:** PM2 keeps Clawdbot running in the background 24/7.

---

## Quick Setup (One Command)

### Mac/Linux:
```bash
cd ~/clawd
chmod +x setup-pm2.sh
./setup-pm2.sh
```

### Windows (PowerShell):
```powershell
cd C:\Users\[YOUR_USERNAME]\clawd
.\setup-pm2.ps1
```

**That's it!** Clawdbot is now running in the background.

---

## What PM2 Does

- **Runs Clawdbot in background** (no terminal needed)
- **Auto-restarts on crash** (keeps running even if something breaks)
- **Survives terminal closes** (you can close your terminal)
- **Auto-starts on boot** (after running `pm2 startup`)

---

## Make It Start on Boot (Optional but Recommended)

```bash
pm2 startup
# Follow the command PM2 gives you (requires sudo/admin)
```

Now Clawdbot will start automatically when your computer reboots.

---

## Useful Commands

```bash
# Check if Clawdbot is running
pm2 status

# View live logs (what Clawdbot is doing)
pm2 logs clawdbot-gateway

# Restart Clawdbot
pm2 restart clawdbot-gateway

# Stop Clawdbot
pm2 stop clawdbot-gateway

# Start Clawdbot (if stopped)
pm2 start clawdbot-gateway
```

---

## How to Verify It's Working

After running the setup script:

1. **Check status:**
   ```bash
   pm2 status
   ```
   
   Should show:
   ```
   ┌─────┬──────────────────┬─────────┬─────────┬──────────┐
   │ id  │ name             │ mode    │ status  │ memory   │
   ├─────┼──────────────────┼─────────┼─────────┼──────────┤
   │ 0   │ clawdbot-gateway │ fork    │ online  │ 200mb    │
   └─────┴──────────────────┴─────────┴─────────┴──────────┘
   ```

2. **Test messaging:**
   - Send a message to your Clawdbot (WhatsApp/Telegram)
   - It should respond even though you're not in a terminal

3. **Close all terminals:**
   - Clawdbot should still be running
   - Check with `pm2 status` in a new terminal

---

## What Files Were Created

- `~/clawd/ecosystem.config.js` (or `C:\Users\[USER]\clawd\ecosystem.config.js`)
  - PM2 configuration file
  - Tells PM2 how to run Clawdbot
  - You can edit this if needed (but usually don't need to)

---

## Troubleshooting

### PM2 shows "stopped" status
```bash
pm2 logs clawdbot-gateway
# Look for errors in the logs
```

### Clawdbot not responding
```bash
pm2 restart clawdbot-gateway
```

### Want to go back to manual mode
```bash
pm2 delete clawdbot-gateway
clawdbot gateway start  # Run manually again
```

### PM2 not found after restart
```bash
pm2 startup  # Run this and follow instructions
```

---

## Why PM2 Instead of `clawdbot gateway install`?

- **Cross-platform** (works same on Mac, Linux, Windows)
- **Better logging** (`pm2 logs` shows everything)
- **More reliable** (battle-tested process manager)
- **Easier to debug** (clear status, logs, restart commands)
- **Industry standard** (used by millions of Node.js apps)

---

## Summary

**Before PM2:**
- Start: `clawdbot gateway start`
- Stops when: terminal closes, timeouts, crashes
- Always-on: No ❌

**After PM2:**
- Start: Automatic (runs in background)
- Stops when: You tell it to (`pm2 stop`)
- Always-on: Yes ✅

**Setup time:** 2 minutes
**Maintenance:** Zero (just works)

---

*Created: January 29, 2026*
*For Clawdbot Client Setups*
