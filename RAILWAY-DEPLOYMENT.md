# Clawdbot Railway Deployment Guide

## Quick Overview

Railway can host your Clawdbot gateway 24/7, but there are some setup considerations.

---

## **Challenges with Railway**

| Feature | Railway Support | Notes |
|---------|----------------|-------|
| **Core Gateway** | ✅ Perfect | Runs great, always online |
| **Discord** | ✅ Easy | Just need bot token |
| **Telegram** | ✅ Easy | Just need bot token |
| **WhatsApp** | ⚠️ Tricky | Needs QR code scan (no terminal UI on Railway) |
| **Browser Control** | ❌ No | Railway doesn't have a browser (needs local PC) |
| **Memory/Files** | ✅ Works | Persistent storage via Railway volumes |

---

## **Recommended Setup**

### **Option A: Railway + Local Hybrid (Best for You)**

**Railway (Cloud):**
- Core gateway running 24/7
- Discord bot
- Telegram bot
- Memory/cron jobs
- Always online

**Your PC (Local):**
- WhatsApp (linked locally, can proxy to Railway)
- Browser control
- File access when needed

**How they connect:**
- Railway gateway URL: `https://your-app.railway.app`
- Your PC connects to Railway gateway via WebSocket
- Messages go to Railway → Railway can trigger local browser tasks

---

## **Option B: Full Railway (No WhatsApp/Browser)**

**Use if:**
- You only need Discord/Telegram
- No browser automation needed
- Simplest setup

**Deploy:**
1. Push code to GitHub
2. Connect Railway to GitHub repo
3. Add environment variables
4. Deploy

---

## **Option C: Hetzner VPS (Full Control)**

**Use if:**
- You need WhatsApp QR login
- You need full control
- SSH access is fine

**Advantage:** Terminal access for WhatsApp QR code

---

## **Railway Deployment Steps (Option A)**

### **Step 1: Prepare Repository**

Create a GitHub repo with:
```
clawd/
├── Dockerfile
├── railway.json
├── AGENTS.md
├── SOUL.md
├── USER.md
├── IDENTITY.md
├── TOOLS.md
├── HEARTBEAT.md
├── MEMORY.md
└── memory/
```

### **Step 2: Create Railway Project**

1. Go to railway.app
2. **New Project** → **Deploy from GitHub**
3. Select your `clawd` repository
4. Railway auto-detects Dockerfile

### **Step 3: Add Environment Variables**

In Railway dashboard → Variables:

```bash
# Anthropic API
ANTHROPIC_API_KEY=sk-ant-...

# OpenAI for Memory
OPENAI_API_KEY=sk-...

# Discord Bot
DISCORD_BOT_TOKEN=YOUR_DISCORD_TOKEN

# Telegram Bot
TELEGRAM_BOT_TOKEN=YOUR_TELEGRAM_TOKEN

# Workspace
CLAWDBOT_WORKSPACE=/root/clawd

# Port
PORT=18789
```

### **Step 4: Configure Clawdbot**

Railway needs a `clawdbot.json` config. We'll bake it into the Dockerfile:

```dockerfile
# In Dockerfile, add:
COPY clawdbot.json /root/.clawdbot/clawdbot.json
COPY auth-profiles.json /root/.clawdbot/agents/main/agent/auth-profiles.json
```

### **Step 5: Deploy**

```bash
git add .
git commit -m "Railway deployment"
git push origin main
```

Railway auto-deploys. Check logs for:
```
[gateway] listening on ws://0.0.0.0:18789
[discord] logged in to discord
[telegram] starting provider
```

### **Step 6: Connect Your PC**

On your local PC, configure to point to Railway:

```bash
# Set Railway gateway URL
export CLAWDBOT_GATEWAY_URL=https://your-app.railway.app

# Start local browser relay
clawdbot browser relay start
```

Now your local browser can receive commands from Railway.

---

## **WhatsApp on Railway (Advanced)**

WhatsApp QR login is tricky without a terminal. Two options:

### **Option 1: Link Locally First**
1. Run `clawdbot channels login` on your PC
2. Scan QR code with your phone
3. Copy `~/.clawdbot/whatsapp-session/` to Railway (via Dockerfile or volume)
4. Railway uses the existing session

### **Option 2: Use WhatsApp API (Costs Money)**
- Sign up for WhatsApp Business API (Meta)
- Use official API instead of QR link
- More reliable but requires business verification

---

## **Cost Estimate**

**Railway:**
- Free tier: 500 hours/month (enough for testing)
- Paid: $5/month (unlimited)

**Always-on setup:** $5/month

---

## **Next Steps**

**What do you want to do?**

1. **Deploy to Railway now** (Discord/Telegram only, no WhatsApp yet)
2. **Set up Hetzner VPS instead** (full WhatsApp support, €5/month)
3. **Hybrid:** Railway + keep WhatsApp on your PC

Let me know and I'll guide you through the exact steps.

---

*Created: 2026-01-29*
