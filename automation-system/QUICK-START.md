# Quick Start Guide - Clawdbot Automation System

**Goal:** Get the automation system running locally in 30 minutes

---

## Prerequisites

Install these first:
- Node.js 18+ ([download](https://nodejs.org/))
- PostgreSQL ([download](https://www.postgresql.org/download/) or use [Neon](https://neon.tech))
- Redis ([download](https://redis.io/download) or use [Upstash](https://upstash.com))

---

## Step 1: Setup Database (5 min)

### Option A: Local PostgreSQL
```bash
# Create database
createdb clawdbot_automation

# Run schema
psql clawdbot_automation < automation-system/db/schema.sql
```

### Option B: Neon (Cloud PostgreSQL)
1. Sign up at [neon.tech](https://neon.tech)
2. Create new project
3. Copy connection string
4. Run schema:
```bash
psql "your_neon_connection_string" < automation-system/db/schema.sql
```

---

## Step 2: Setup Stripe Test Mode (10 min)

1. **Create Stripe Account:** [stripe.com](https://stripe.com)

2. **Create Products:**
```
Clawdbot Starter
- Monthly: $199
- Setup fee: $299

Clawdbot Professional
- Monthly: $499
- Setup fee: $599

Clawdbot Enterprise
- Monthly: $999
- Setup fee: $999
```

3. **Get API Keys:**
- Dashboard → Developers → API keys
- Copy "Test mode" secret key

4. **Create Webhook:**
- Dashboard → Developers → Webhooks
- Add endpoint: `http://localhost:3001/api/webhooks/stripe`
- Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
- Copy webhook secret

---

## Step 3: Configure Environment (5 min)

```bash
cd automation-system
cp .env.example .env
```

Edit `.env`:
```env
# Stripe (Test Mode)
STRIPE_SECRET_KEY=sk_test_YOUR_KEY
STRIPE_WEBHOOK_SECRET=whsec_YOUR_SECRET
STRIPE_STARTER_PRICE_ID=price_YOUR_ID
STRIPE_PRO_PRICE_ID=price_YOUR_ID
STRIPE_ENTERPRISE_PRICE_ID=price_YOUR_ID

# Database
DATABASE_URL=postgresql://localhost/clawdbot_automation

# Deployment (Use "local" for testing)
DEPLOY_METHOD=local

# Anthropic (for actual agent deployment)
ANTHROPIC_API_KEY=sk-ant-YOUR_KEY

# Resend (for emails)
RESEND_API_KEY=re_YOUR_KEY

# Dashboard
DASHBOARD_URL=http://localhost:3000
```

---

## Step 4: Install Dependencies (2 min)

```bash
npm install
```

---

## Step 5: Start API Server (1 min)

```bash
npm run dev
```

You should see:
```
🚀 Clawdbot Automation API running on port 3001
📍 Health check: http://localhost:3001/health
🔔 Webhook endpoint: http://localhost:3001/api/webhooks/stripe
```

---

## Step 6: Test Provisioning (5 min)

Open new terminal:

```bash
# Test Starter tier
npm run provision:test starter

# Test Professional tier
npm run provision:test professional

# Test Enterprise tier
npm run provision:test enterprise
```

Watch logs to see provisioning flow:
1. Agent created ✓
2. Configuration generated ✓
3. Container deployed (mocked in local mode) ✓
4. Skills installed ✓
5. Memory setup ✓
6. Welcome email sent ✓

---

## Step 7: Test Stripe Checkout (Optional)

1. **Use Stripe CLI to forward webhooks:**
```bash
stripe listen --forward-to localhost:3001/api/webhooks/stripe
```

2. **Create test checkout:**
```bash
curl -X POST http://localhost:3001/api/provision \
  -H "Content-Type: application/json" \
  -d '{
    "customerId": "test-123",
    "tier": "starter",
    "email": "test@example.com"
  }'
```

3. **Check logs:**
Watch provisioning flow complete.

---

## Common Issues

### Database connection fails
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```
**Fix:** Start PostgreSQL service
```bash
# macOS
brew services start postgresql

# Linux
sudo systemctl start postgresql

# Windows
# Start via Services app
```

### Stripe webhook signature verification fails
```
Error: No signatures found matching the expected signature
```
**Fix:** 
- Make sure `STRIPE_WEBHOOK_SECRET` is correct
- Use Stripe CLI for local testing: `stripe listen --forward-to localhost:3001/api/webhooks/stripe`

### Module not found
```
Error: Cannot find module 'express'
```
**Fix:** Run `npm install`

---

## Next Steps

### For Local Development:
1. ✓ API server running
2. Build dashboard: `cd dashboard && npx create-next-app@latest .`
3. Test end-to-end flow
4. Iterate on features

### For Production Deployment:
1. Read `DEPLOYMENT.md`
2. Setup Railway account
3. Deploy provisioning API
4. Deploy dashboard to Vercel
5. Switch Stripe to live mode
6. Launch!

---

## Architecture Diagram (Local)

```
┌────────────────────────────────────┐
│   Stripe Test Mode Checkout       │
│   (Manual trigger or CLI)          │
└────────────┬───────────────────────┘
             │
             │ webhook
             ▼
┌────────────────────────────────────┐
│   API Server (localhost:3001)      │
│   • Webhook handler                │
│   • Provisioning orchestrator      │
│   • Local deployment (mocked)      │
└────────────┬───────────────────────┘
             │
             │ writes to
             ▼
┌────────────────────────────────────┐
│   PostgreSQL (localhost:5432)      │
│   • customers                      │
│   • agents                         │
│   • deployments                    │
└────────────────────────────────────┘
```

---

## Testing Checklist

- [ ] API server starts without errors
- [ ] Health check endpoint responds (http://localhost:3001/health)
- [ ] Database connection works
- [ ] Test provisioning script runs successfully
- [ ] Logs show all provisioning steps
- [ ] Stripe webhook receives events (with CLI)
- [ ] Email templates render correctly

---

## Help & Resources

- **Full Documentation:** `README.md`
- **Deployment Guide:** `DEPLOYMENT.md`
- **Implementation Details:** `IMPLEMENTATION-SUMMARY.md`
- **Stripe Docs:** https://stripe.com/docs/webhooks
- **Railway Docs:** https://docs.railway.app

---

**Status:** Ready to run ✅  
**Estimated Setup Time:** 30 minutes  
**Difficulty:** Medium (requires some config)

**Questions?** Check `IMPLEMENTATION-SUMMARY.md` for detailed explanations.
