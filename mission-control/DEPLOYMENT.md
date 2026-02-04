# 🚀 Mission Control Deployment Checklist

Follow these steps **in order** to get Mission Control running tonight.

## Prerequisites

- [x] Clawdbot installed and gateway running
- [x] Node.js installed
- [x] Mission Control code in `C:\Users\Nightgalem\clawd\mission-control`

## Step 1: Initialize Convex (5 minutes)

```powershell
cd C:\Users\Nightgalem\clawd\mission-control
npm install
npx convex dev
```

This will:
1. Prompt you to login to Convex (create account if needed)
2. Create a new deployment
3. Give you a `NEXT_PUBLIC_CONVEX_URL`
4. Deploy the schema

**Copy the URL** - you'll need it next.

## Step 2: Configure Environment (1 minute)

Create `.env.local`:

```bash
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
```

Replace with your actual Convex URL from Step 1.

## Step 3: Register Agents (1 minute)

```powershell
node scripts\setup-agents.js
```

This creates 3 agents in Convex:
- Jarvis (Squad Lead)
- Shuri (Product Analyst)
- Fury (Customer Researcher)

## Step 4: Set Up Heartbeats (2 minutes)

```powershell
.\scripts\setup-heartbeats.ps1
```

This configures cron jobs for each agent to wake every 15 minutes (staggered).

**Verify:**
```powershell
clawdbot cron list
```

You should see:
- jarvis-heartbeat
- shuri-heartbeat
- fury-heartbeat

## Step 5: Start the UI (1 minute)

Open a new terminal:

```powershell
cd C:\Users\Nightgalem\clawd\mission-control
npm run dev
```

Visit: **http://localhost:3000**

You should see:
- 3 agent cards (Jarvis, Shuri, Fury)
- Empty activity feed
- Empty task board

## Step 6: Start Notification Daemon (1 minute)

Open another terminal:

```powershell
cd C:\Users\Nightgalem\clawd\mission-control\daemon
$env:CONVEX_URL = "https://your-deployment.convex.cloud"
node notification-daemon.js
```

You should see:
```
🚀 Notification Daemon Starting...
📡 Convex URL: https://...
👥 Monitoring agents: Jarvis, Shuri, Fury
⏰ Polling every 2 seconds
```

## Step 7: Create Test Task (1 minute)

Open another terminal:

```powershell
cd C:\Users\Nightgalem\clawd\mission-control
node scripts\create-test-task.js
```

This creates a test task with @mentions for all agents.

## Step 8: Verify Everything Works (5 minutes)

### Check the UI (http://localhost:3000)

- [ ] Task appears in "Assigned" column
- [ ] Activity feed shows "Task created: Test Mission Control Setup"
- [ ] Agent cards show "Last seen: Just now"

### Wait for Next Heartbeat Cycle

Heartbeats run every 15 minutes. Next cycles:
- Jarvis: :00, :15, :30, :45
- Shuri: :02, :17, :32, :47
- Fury: :04, :19, :34, :49

Within 15 minutes you should see:

1. **Notification daemon logs:**
   ```
   📬 Found 3 undelivered notification(s)
   📤 Delivering to Jarvis (agent:main:main)
   ✅ Delivered notification to Jarvis
   ```

2. **Activity feed updates:**
   - "Jarvis commented on Test Mission Control Setup"
   - "Shuri commented on Test Mission Control Setup"
   - "Fury commented on Test Mission Control Setup"

3. **Agent cards update:**
   - Status changes to "active" when working
   - "Last seen" updates

## Troubleshooting

### No agents in UI

**Problem:** Agent cards are empty

**Fix:**
```powershell
node scripts\setup-agents.js
```

Refresh UI.

### Notifications not delivering

**Problem:** Daemon shows "Could not deliver"

**Fixes:**
1. Check Gateway is running: `clawdbot gateway status`
2. Check session keys exist: `clawdbot sessions list`
3. Wait for next heartbeat (agents might be asleep)

### Heartbeats not firing

**Problem:** No activity after 15 minutes

**Fix:**
```powershell
# Check crons exist
clawdbot cron list

# Check Gateway is running
clawdbot gateway status

# Restart Gateway if needed
clawdbot gateway restart
```

### UI shows "Cannot connect to Convex"

**Problem:** .env.local misconfigured

**Fix:**
1. Check `.env.local` exists
2. Verify `NEXT_PUBLIC_CONVEX_URL` is correct
3. Restart dev server: `npm run dev`

## Success Criteria ✅

By morning, you should have:

- [x] Mission Control UI running at localhost:3000
- [x] 3 agents registered and showing in UI
- [x] Heartbeats running every 15 minutes
- [x] Notification daemon delivering @mentions
- [x] Test task visible with agent comments
- [x] Activity feed showing real-time updates

## What's Running

You should have these terminals open:

1. **Convex Dev:** `npx convex dev` (can Ctrl+C after initial setup)
2. **Next.js UI:** `npm run dev`
3. **Notification Daemon:** `node daemon/notification-daemon.js`
4. **Clawdbot Gateway:** Running in background (check with `clawdbot gateway status`)

## Next Steps (Tomorrow)

Once basic setup works:

1. **Create real tasks** - Use the UI or Convex functions
2. **Add more agents** - Loki (writer), Vision (SEO), Pepper (email)
3. **Build task creation form** - UI to create tasks
4. **Add daily standup** - Cron that summarizes daily activity
5. **Enhance UI** - Task detail view, document viewer

## Need Help?

Check logs:
- Convex: https://dashboard.convex.dev
- Clawdbot: Check session logs
- Daemon: Terminal output

---

**Timeline:** ~15 minutes for initial setup + 15 minutes to verify heartbeats  
**Goal:** Agents operational and visible by morning ✨
