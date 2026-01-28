# Deploy Clawdbot to Railway - Step by Step

## What You'll Get

- ✅ Clawdbot running 24/7 in the cloud
- ✅ Discord bot always online
- ✅ Memory/heartbeat/cron jobs working
- ✅ No more timeouts
- ✅ $5/month (or free tier for testing)

---

## Step 1: Create GitHub Repository

1. Go to github.com
2. Create new repository: `clawdbot-railway` (private recommended)
3. Don't initialize with README (we'll push existing files)

---

## Step 2: Push Your Workspace to GitHub

Open terminal in `C:\Users\Nightgalem\clawd`:

```powershell
# Initialize git
git init

# Add files
git add AGENTS.md SOUL.md USER.md IDENTITY.md TOOLS.md HEARTBEAT.md MEMORY.md
git add memory/
git add package.json start.js railway.json .gitignore

# Commit
git commit -m "Initial Clawdbot Railway deployment"

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/clawdbot-railway.git

# Push
git branch -M main
git push -u origin main
```

---

## Step 3: Create Railway Project

1. Go to railway.app
2. Click **New Project**
3. Select **Deploy from GitHub repo**
4. Authorize Railway to access your GitHub
5. Select `clawdbot-railway` repository
6. Railway will auto-detect Node.js and start deploying

---

## Step 4: Add Environment Variables

In Railway dashboard, click on your service → **Variables** tab.

Add these variables:

```bash
# Anthropic API Key (for Claude)
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# OpenAI API Key (for memory/embeddings)
OPENAI_API_KEY=your_openai_api_key_here

# Discord Bot Token
DISCORD_BOT_TOKEN=your_discord_bot_token_here

# Workspace directory (Railway default)
CLAWDBOT_WORKSPACE=/app/workspace

# Port (Railway provides this automatically, but we'll set default)
PORT=18789

# Gateway mode
CLAWDBOT_GATEWAY_MODE=cloud
```

**Note:** Replace the placeholder values above with your actual keys from your local `.clawdbot` config.

After adding variables, Railway will automatically redeploy.

---

## Step 5: Create Clawdbot Config on Railway

We need to inject the config after first deploy. Create a new file in your repo:

`railway-config.json`:

```json
{
  "meta": {
    "lastTouchedVersion": "2026.1.24-3"
  },
  "auth": {
    "profiles": {
      "openai:manual": {
        "provider": "openai",
        "mode": "token"
      },
      "anthropic:manual": {
        "provider": "anthropic",
        "mode": "token"
      }
    }
  },
  "agents": {
    "defaults": {
      "workspace": "/app/workspace",
      "maxConcurrent": 4,
      "model": {
        "primary": "anthropic/claude-sonnet-4-5"
      }
    }
  },
  "hooks": {
    "internal": {
      "enabled": true,
      "entries": {
        "session-memory": {
          "enabled": true
        }
      }
    }
  },
  "channels": {
    "discord": {
      "enabled": true,
      "token": "${DISCORD_BOT_TOKEN}"
    }
  },
  "gateway": {
    "port": 18789,
    "mode": "cloud",
    "bind": "0.0.0.0",
    "auth": {
      "mode": "token",
      "token": "39acef75057b2fa3c59410e155c49bb3526f831ee31ea5f0"
    }
  },
  "plugins": {
    "entries": {
      "discord": {
        "enabled": true
      }
    }
  }
}
```

**Update start.js** to load this config:

```javascript
// ... existing code ...

// Create config directory if it doesn't exist
const fs = require('fs');
const configDir = path.join('/app', '.clawdbot');
const configPath = path.join(configDir, 'clawdbot.json');

if (!fs.existsSync(configDir)) {
  fs.mkdirSync(configDir, { recursive: true });
}

// Copy railway-config.json to clawdbot config location
const railwayConfig = require('./railway-config.json');
fs.writeFileSync(configPath, JSON.stringify(railwayConfig, null, 2));

// ... rest of existing code ...
```

---

## Step 6: Verify Deployment

After Railway finishes deploying:

1. Click on your service → **Deployments** tab
2. Click the latest deployment → **View Logs**

**Look for:**
```
[gateway] listening on ws://0.0.0.0:18789
[discord] logged in to discord as <@YOUR_BOT_ID>
```

If you see errors, check the logs and verify environment variables are set correctly.

---

## Step 7: Test Discord Bot

1. Open Discord
2. Send a message to your bot (or @mention it in a server)
3. It should respond!

**Your Clawdbot is now running 24/7 on Railway** ✅

---

## Step 8: Connect Browser Relay (Optional)

If you want browser automation to work:

**On your local PC:**

```powershell
# Set Railway gateway URL (find this in Railway dashboard → Settings → Domains)
$env:CLAWDBOT_GATEWAY_URL="https://clawdbot-railway-production.up.railway.app"

# Start browser relay
clawdbot browser relay start
```

Now browser automation commands from Railway will execute on your PC.

---

## Troubleshooting

### Deployment fails
- Check logs in Railway dashboard
- Verify all environment variables are set
- Make sure Node.js 22+ is being used

### Discord bot not responding
- Verify `DISCORD_BOT_TOKEN` is correct
- Check bot has proper permissions in Discord server
- Check Railway logs for connection errors

### Memory not working
- Verify `OPENAI_API_KEY` is set
- Check Railway logs for embedding errors

### Gateway not accessible
- Railway assigns a public URL automatically
- Check **Settings** → **Networking** → **Public Networking**
- Enable if not already enabled

---

## Cost

**Free Tier:**
- 500 hours/month (enough for ~20 days)
- Good for testing

**Hobby Plan:**
- $5/month
- Unlimited hours
- Recommended for 24/7 operation

---

## Updating

When you make changes to workspace files:

```powershell
cd C:\Users\Nightgalem\clawd
git add .
git commit -m "Update workspace files"
git push origin main
```

Railway auto-deploys on push.

---

## Next Steps

- [ ] Deploy to Railway
- [ ] Test Discord bot
- [ ] Set up browser relay (if needed)
- [ ] Monitor for 24 hours to verify stability
- [ ] Upgrade to Hobby plan ($5/month) for 24/7

---

*Created: 2026-01-29*
*Total setup time: ~15-20 minutes*
