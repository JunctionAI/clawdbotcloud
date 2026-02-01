# Tonight's Prep for Jakob Setup Tomorrow

**Meeting:** 2026-01-29 6:45pm  
**Time to prep:** ~3 hours tonight

---

## Critical Tasks (DO THESE)

### 1. Send Jakob Pre-Meeting Email (30 min)
**Subject:** "Clawdbot Setup Tomorrow - Quick Prep"

**Body:**
```
Hi Jakob,

Looking forward to getting your Clawdbot set up tomorrow at 6:45pm!

To make the setup smooth, could you have these ready:

1. **Anthropic API Key**
   - Sign up at console.anthropic.com
   - Add $20-$50 credit (more if you want)
   - Copy your API key

2. **Email Account**
   - Which email do you want Clawdbot to access?
   - If Gmail: We'll need to set up Google Cloud OAuth (I can walk you through it)
   - If Outlook: We'll need Azure app credentials

3. **Mac Mini Ready**
   - Updated macOS
   - Admin access
   - Stable internet

4. **Messaging Channels** (optional for day 1)
   - Do you want Telegram/Discord/SMS connected?
   - Or just start with CLI/direct chat?

See you tomorrow!

Tom
```

**Send this NOW so he has time to prep.**

---

### 2. Create Template Files (45 min)

Make template versions of:
- [ ] `AGENTS.md` (generic version)
- [ ] `SOUL.md` (template with blanks to fill)
- [ ] `USER.md` (template structure)
- [ ] `TOOLS.md` (empty template)

**Store these in:** `~/clawd/client-templates/`

---

### 3. Test Fresh Install (1 hour)

If possible, spin up a clean VM or container and run through:
- [ ] Fresh Clawdbot install
- [ ] Gateway config from scratch
- [ ] gog install + auth (mock it)
- [ ] Time each step

**Goal:** Know exactly where slowdowns/issues will hit.

---

### 4. Prepare Credentials Template (15 min)

Create `client-credentials-template.txt`:
```
# Clawdbot Setup - Credentials Checklist

## Anthropic
- API Key: _______________
- Credit added: $________

## Gmail (if using)
- Email: _______________
- OAuth Client ID: _______________
- OAuth Client Secret: _______________

## Outlook (if using)
- Email: _______________
- Azure Client ID: _______________
- Azure Client Secret: _______________
- Azure Tenant ID: _______________

## Other
- Telegram username: _______________
- Discord ID: _______________
```

---

### 5. Build Quick Setup Script (30 min)

Create `quick-setup.sh`:
```bash
#!/bin/bash
# Clawdbot Quick Setup Script

echo "=== Clawdbot Setup Script ==="
echo ""

# Check Node
echo "Checking Node.js..."
node --version || { echo "Node.js not found!"; exit 1; }

# Install Clawdbot
echo "Installing Clawdbot..."
npm install -g clawdbot

# Create workspace
echo "Creating workspace..."
mkdir -p ~/clawd/memory
cd ~/clawd

# Copy templates
echo "Setting up files..."
cp ~/clawd/client-templates/AGENTS.md ~/clawd/
cp ~/clawd/client-templates/SOUL.md ~/clawd/
cp ~/clawd/client-templates/USER.md ~/clawd/
cp ~/clawd/client-templates/TOOLS.md ~/clawd/
cp ~/clawd/client-templates/HEARTBEAT.md ~/clawd/

echo ""
echo "✅ Basic setup complete!"
echo "Next: Configure gateway with API key"
```

**This will save 15-20 minutes tomorrow.**

---

### 6. Review Clawdbot Docs (30 min)

Refresh yourself on:
- [ ] Gateway config options
- [ ] Common OAuth issues
- [ ] Skill installation process
- [ ] Channel connection setup

**Focus on:** Things that went wrong in your setup.

---

## Nice-to-Have (if time)

- [ ] Record a quick Loom walkthrough of your own setup
- [ ] Write troubleshooting doc for common errors
- [ ] Prepare screen sharing setup (in case remote help needed)
- [ ] Test your own Clawdbot to make sure it's working perfectly

---

## Tomorrow's Game Plan

**6:45pm** — Start meeting
**6:45-7:00** — Context gathering (his needs, priorities)
**7:00-8:00** — Core installation + config
**8:00-9:00** — Email integration (will take longest)
**9:00-9:30** — Skills + testing
**9:30-10:00** — Training + handoff

**Target end time:** 10:00pm (3hr 15min total)

---

## After Tomorrow

- [ ] Document everything that went wrong
- [ ] Update `JAKOB-SETUP-CHECKLIST.md` with lessons
- [ ] Build automation for next client
- [ ] Ask Jakob for testimonial (1 week after)
- [ ] Use his setup as template for scaling

---

**This $300 client is your PROCESS CLIENT. Optimize for learning, not profit.**
