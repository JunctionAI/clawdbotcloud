# Clawdbot Client Setup SOP
## Standard Operating Procedure for Client Deployments

---

## Prerequisites

| Requirement | Details |
|-------------|---------|
| Node.js | v22 or higher |
| OS | Windows (with terminal) / macOS / Linux |
| Anthropic Account | Max subscription OR API key |
| OpenAI API Key | For memory/semantic search (optional but recommended) |
| Telegram Bot Token | From @BotFather (if using Telegram) |
| WhatsApp | Phone with WhatsApp for QR linking |

---

## Phase 1: Installation (5 min)

### Step 1.1: Install Clawdbot
```powershell
npm install -g clawdbot@latest
```

### Step 1.2: Run Onboarding Wizard
```powershell
clawdbot onboard --install-daemon
```

**Wizard choices:**
- Security warning: **Yes** (accept)
- Mode: **QuickStart**
- Config: **Reset** (for fresh setup)
- Reset scope: **Config + creds + sessions**
- Auth: **Anthropic token (Claude Code CLI)** for Max subscription
- Skills: **No** (configure later)
- Hooks: Enable **session-memory**
- Channels: Select as needed (WhatsApp, Telegram, etc.)

---

## Phase 2: Authentication (5 min)

### Step 2.1: Anthropic Max Subscription
```powershell
# Generate setup token from Claude Code
claude setup-token

# Add to Clawdbot
clawdbot models auth setup-token --provider anthropic

# Verify
clawdbot models status
```

**Expected output:** `anthropic: OAuth` with usage stats showing

### Step 2.2: OpenAI for Memory (Optional but Recommended)
```powershell
clawdbot models auth add
```
- Provider: `openai`
- Method: `paste token`
- Paste your OpenAI API key (sk-...)

---

## Phase 3: Channels (5-10 min)

### Step 3.1: WhatsApp
```powershell
clawdbot channels login
```
- QR code appears
- On phone: WhatsApp → Settings → Linked Devices → Scan QR

### Step 3.2: Telegram
```powershell
clawdbot channels add
```
- Select: **Telegram (Bot API)**
- Enter bot token from @BotFather

### Step 3.3: Verify Channels
```powershell
clawdbot channels list
```

---

## Phase 4: Start Gateway & Keep Running 24/7 (3 min)

### Step 4.1: Test Gateway (Foreground - Optional)
```bash
clawdbot gateway --verbose
```

**Look for:**
- `[whatsapp] Listening for personal WhatsApp inbound messages`
- `[telegram] starting provider (@YourBot)`

Press `Ctrl+C` to stop once verified.

### Step 4.2: Install PM2 (Process Manager - One Time)
```bash
npm install -g pm2
```

### Step 4.3: Create PM2 Config File
Create `~/clawd/ecosystem.config.js` (or `C:\Users\[USER]\clawd\ecosystem.config.js` on Windows):

**For Mac/Linux:**
```javascript
module.exports = {
  apps: [{
    name: 'clawdbot-gateway',
    script: 'clawdbot',
    args: 'gateway start',
    cwd: process.env.HOME + '/clawd',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
```

**For Windows:**
```javascript
const os = require('os');
const path = require('path');

module.exports = {
  apps: [{
    name: 'clawdbot-gateway',
    script: path.join(os.homedir(), 'AppData', 'Roaming', 'npm', 'node_modules', 'clawdbot', 'dist', 'entry.js'),
    args: 'gateway start',
    cwd: path.join(os.homedir(), 'clawd'),
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
```

### Step 4.4: Start Clawdbot with PM2
```bash
# Navigate to workspace
cd ~/clawd  # Mac/Linux
cd C:\Users\[USER]\clawd  # Windows

# Start Clawdbot
pm2 start ecosystem.config.js

# Save process list
pm2 save

# Configure auto-start on boot
pm2 startup
# Follow the command PM2 gives you (usually requires sudo/admin)
```

### Step 4.5: Verify Running
```bash
pm2 status
```

**Expected output:**
```
┌─────┬──────────────────┬─────────┬─────────┬──────────┬────────┐
│ id  │ name             │ mode    │ status  │ cpu      │ memory │
├─────┼──────────────────┼─────────┼─────────┼──────────┼────────┤
│ 0   │ clawdbot-gateway │ fork    │ online  │ 0%       │ 200mb  │
└─────┴──────────────────┴─────────┴─────────┴──────────┴────────┘
```

### Step 4.6: Useful PM2 Commands
```bash
pm2 status                    # Check if running
pm2 logs clawdbot-gateway     # View live logs
pm2 restart clawdbot-gateway  # Restart Clawdbot
pm2 stop clawdbot-gateway     # Stop Clawdbot
pm2 start clawdbot-gateway    # Start Clawdbot
```

**✅ Clawdbot is now running 24/7 in the background** and will auto-restart if it crashes or the computer reboots.

---

## Phase 5: Verification (5 min)

### Step 5.1: Health Checks
```powershell
clawdbot status --all
clawdbot health
clawdbot security audit --deep
```

### Step 5.2: Test Messaging
```powershell
# Via CLI
clawdbot message send --target +PHONENUMBER --message "Test from Clawdbot"

# Or via Dashboard
# Open: http://127.0.0.1:18789/?token=YOUR_TOKEN
# Go to Chat and send a message
```

### Step 5.3: Test from External Device
- Message the bot from another phone (WhatsApp/Telegram)
- First message generates pairing code
- Approve: `clawdbot pairing approve whatsapp <code>`

---

## Phase 6: Memory Setup (5 min)

### Step 6.1: Verify Memory Status
```powershell
clawdbot memory status
```

**Should show:**
- Provider: openai
- Model: text-embedding-3-small
- Vector: ready

### Step 6.2: Build Index
```powershell
clawdbot memory index
```

---

## Phase 7: Client Handoff

### Provide to Client:

1. **Dashboard URL:**
   ```
   http://127.0.0.1:18789/?token=THEIR_TOKEN
   ```

2. **Gateway Token** (for reconnecting)

3. **Quick Reference Commands:**
   ```
   clawdbot status          # Check status
   clawdbot health          # Quick health check
   clawdbot gateway restart # Restart if issues
   clawdbot logs --follow   # View live logs
   ```

4. **Important Files:**
   - Config: `~/.clawdbot/clawdbot.json`
   - Auth: `~/.clawdbot/agents/main/agent/auth-profiles.json`
   - Logs: `/tmp/clawdbot/clawdbot-YYYY-MM-DD.log`

---

## Troubleshooting Quick Reference

| Problem | Solution |
|---------|----------|
| Gateway won't start | `clawdbot doctor --fix` |
| Port in use | `clawdbot gateway --force` |
| Auth expired | Re-run `claude setup-token` flow |
| WhatsApp disconnected | `clawdbot channels login` |
| Memory not working | Check OpenAI key, run `clawdbot memory index` |
| Config invalid | `clawdbot doctor` |
| Full reset | `clawdbot gateway stop && rm -rf ~/.clawdbot && clawdbot onboard --install-daemon` |

---

## What's Left to Configure (Optional)

| Feature | Command | Purpose |
|---------|---------|---------|
| Web Search | `clawdbot configure --section web` | Let agent search internet (needs Brave API key) |
| Skills | `clawdbot configure --section skills` | Enable/disable agent capabilities |
| More Channels | `clawdbot channels add` | Discord, Slack, Signal, etc. |
| Cron Jobs | Dashboard → Cron Jobs | Scheduled tasks |
| Tool Permissions | Dashboard → Config | Restrict what agent can do |

---

## OAuth Token Refresh

Anthropic OAuth tokens expire (~7 hours). When expired:

```powershell
claude setup-token
clawdbot models auth setup-token --provider anthropic
clawdbot gateway restart
```

**For long-term use:** Consider API key instead of OAuth (costs money but doesn't expire)

---

## Deployment Options

| Option | Best For | Notes |
|--------|----------|-------|
| **Local (this guide)** | Personal use, testing | PC must stay on |
| **Railway/Cloud** | Always-online clients | Requires API key (not Max) |
| **VPS (Hetzner, etc.)** | Production clients | More control, SSH access |

---

## Total Setup Time: ~30-45 minutes

---

*Document created: January 27, 2026*
*Clawdbot version: 2026.1.24-3*
