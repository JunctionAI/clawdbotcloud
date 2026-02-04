# Deployment Guide - Clawdbot Automation System

**Goal:** Get the automation system running in production

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                   setupclaw.com                     │
│              (Marketing + Pricing Page)             │
│                  Hosted on Vercel                   │
└──────────────┬──────────────────────────────────────┘
               │
               │ (User clicks "Get Started")
               ▼
┌─────────────────────────────────────────────────────┐
│              Stripe Checkout Session                │
│           (Payment + Subscription Setup)            │
└──────────────┬──────────────────────────────────────┘
               │
               │ (checkout.session.completed webhook)
               ▼
┌─────────────────────────────────────────────────────┐
│            Provisioning API (Express.js)            │
│         api.setupclaw.com (Railway/Fly.io)         │
│                                                     │
│  • Stripe webhook handler                          │
│  • Provisioning orchestrator                       │
│  • Agent deployment (Railway API)                  │
│  • Configuration generator                         │
│  • Skills installer                                │
│  • Memory setup                                    │
│  • Onboarding emails (Resend)                     │
└──────────────┬──────────────────────────────────────┘
               │
               │ (deploys to)
               ▼
┌─────────────────────────────────────────────────────┐
│          Individual Agent Containers                │
│   agent-abc123.up.railway.app (per customer)       │
│                                                     │
│  • Clawdbot instance                               │
│  • Skills library (tier-specific)                  │
│  • Memory system (MEMORY.md + daily logs)          │
│  • Heartbeat (if Pro/Enterprise)                   │
│  • Mission Control (if Pro/Enterprise)             │
└──────────────┬──────────────────────────────────────┘
               │
               │ (user manages via)
               ▼
┌─────────────────────────────────────────────────────┐
│          User Dashboard (Next.js)                   │
│        dashboard.setupclaw.com (Vercel)            │
│                                                     │
│  • Authentication (NextAuth magic links)            │
│  • Agent status monitoring                         │
│  • Usage analytics                                 │
│  • Billing (Stripe Customer Portal)                │
│  • Support ticket system                           │
└─────────────────────────────────────────────────────┘
```

---

## Prerequisites

### 1. Stripe Account
- Create products for Starter, Pro, Enterprise
- Create recurring prices (monthly)
- Create one-time setup fee prices
- Get API keys (test + live)
- Create webhook endpoint

### 2. Railway Account (or Fly.io)
- Team plan (for multiple projects)
- API key
- Project created

### 3. Domain Names
- `setupclaw.com` (marketing site)
- `api.setupclaw.com` (provisioning API)
- `dashboard.setupclaw.com` (user dashboard)
- `*.agents.setupclaw.com` (wildcard for agent instances)

### 4. Database
- PostgreSQL (Neon, Supabase, or Railway)
- Redis (Upstash or Railway) for job queue

### 5. Email Service
- Resend account + API key
- Verified domain (setupclaw.com)

---

## Step-by-Step Deployment

### Phase 1: Setup Infrastructure (Day 1)

#### 1.1 Create Stripe Products

```bash
# Via Stripe Dashboard or CLI
stripe products create --name "Clawdbot Starter" --description "Solo entrepreneurs"
stripe prices create --product <product_id> --unit-amount 19900 --currency usd --recurring '{"interval":"month"}'

# Repeat for Pro ($499) and Enterprise ($999)
# Also create setup fee prices (one-time)
```

Save price IDs to `.env`:
```
STRIPE_STARTER_PRICE_ID=price_xxx
STRIPE_STARTER_SETUP_PRICE_ID=price_xxx
...
```

#### 1.2 Setup Database

```bash
# Create PostgreSQL database (Neon recommended)
# Run schema migrations
psql $DATABASE_URL < schema.sql
```

#### 1.3 Deploy Provisioning API to Railway

```bash
cd automation-system
railway login
railway init
railway up
```

Configure environment variables in Railway dashboard.

#### 1.4 Create Stripe Webhook

```bash
# In Stripe Dashboard:
# Webhooks → Add endpoint
# URL: https://api.setupclaw.com/api/webhooks/stripe
# Events: checkout.session.completed, customer.subscription.updated, customer.subscription.deleted
```

Save webhook secret to `.env`:
```
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

---

### Phase 2: Deploy Dashboard (Day 2)

#### 2.1 Initialize Next.js Dashboard

```bash
cd automation-system/dashboard
npm install
```

#### 2.2 Deploy to Vercel

```bash
vercel login
vercel --prod
```

Configure environment variables via Vercel dashboard.

#### 2.3 Setup Custom Domain

In Vercel: Settings → Domains → Add `dashboard.setupclaw.com`

---

### Phase 3: Test End-to-End (Day 3)

#### 3.1 Test Stripe Checkout

1. Create test checkout session
2. Complete payment (Stripe test mode)
3. Verify webhook received
4. Check provisioning logs

#### 3.2 Test Agent Deployment

1. Monitor Railway for new project creation
2. Check agent health endpoint
3. Verify skills installed
4. Test first message

#### 3.3 Test Dashboard Login

1. Magic link email sent
2. Login successful
3. Agent status displayed
4. Usage analytics working

---

### Phase 4: Go Live (Day 4)

#### 4.1 Switch Stripe to Live Mode

- Update all price IDs
- Update webhook endpoint
- Test with real card (then refund)

#### 4.2 Configure DNS

```
setupclaw.com → Vercel (marketing site)
api.setupclaw.com → Railway (provisioning API)
dashboard.setupclaw.com → Vercel (user dashboard)
*.agents.setupclaw.com → Railway (wildcard for agents)
```

#### 4.3 Setup Monitoring

- Sentry (error tracking)
- LogRocket (session replay)
- UptimeRobot (health checks)

#### 4.4 Launch Checklist

- [ ] All environment variables in production
- [ ] Stripe live mode enabled
- [ ] Webhooks working
- [ ] Database backups configured
- [ ] Monitoring alerts setup
- [ ] Support email configured
- [ ] Legal pages (Terms, Privacy)
- [ ] First beta customer signup

---

## Environment Variables (Production)

### Provisioning API (`api.setupclaw.com`)

```env
# Stripe (LIVE)
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# Database
DATABASE_URL=postgresql://xxx

# Railway
RAILWAY_API_KEY=xxx
RAILWAY_PROJECT_ID=xxx
RAILWAY_ENVIRONMENT_ID=xxx

# Agent Config
ANTHROPIC_API_KEY=sk-ant-xxx
AGENT_BASE_URL=https://agents.setupclaw.com

# Onboarding
RESEND_API_KEY=re_xxx

# Dashboard
DASHBOARD_URL=https://dashboard.setupclaw.com

# Redis
REDIS_URL=redis://xxx

# Environment
NODE_ENV=production
PORT=3001
```

### Dashboard (`dashboard.setupclaw.com`)

```env
# NextAuth
NEXTAUTH_URL=https://dashboard.setupclaw.com
NEXTAUTH_SECRET=xxx

# Database
DATABASE_URL=postgresql://xxx

# Stripe (for Customer Portal)
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_PUBLISHABLE_KEY=pk_live_xxx

# Resend (magic links)
RESEND_API_KEY=re_xxx

# API
API_URL=https://api.setupclaw.com
API_KEY=xxx

# Environment
NODE_ENV=production
```

---

## Monitoring & Alerts

### Health Checks

**Provisioning API:**
- Endpoint: `https://api.setupclaw.com/health`
- Check every 5 minutes
- Alert if down >5 minutes

**Agent Instances:**
- Health check each agent every 15 minutes
- Auto-restart if unhealthy (3 retries)
- Alert customer + support if still down

### Error Tracking

**Sentry:**
- Track all API errors
- Alert on high error rate (>5% of requests)
- Track provisioning failures

### Usage Monitoring

- Daily active agents
- Provisioning success rate (target: >95%)
- Average provisioning time (target: <15 min)
- Customer churn (track cancellations)

---

## Scaling Considerations

### 0-100 Customers
- **Current architecture is sufficient**
- Single Railway project for API
- Individual agent containers
- Cost: ~$10-20/customer/month

### 100-500 Customers
- **Optimize agent hosting**
- Consider multi-tenant containers (5-10 agents per container)
- Shared Redis for job queue
- Cost: ~$5-10/customer/month

### 500+ Customers
- **Platform architecture**
- Kubernetes for agent orchestration
- Dedicated infrastructure
- Cost: ~$3-5/customer/month

---

## Cost Breakdown (100 Customers)

| Item | Cost/Month |
|------|------------|
| Railway (API + Agents) | $1,500 |
| Database (Neon Pro) | $200 |
| Redis (Upstash) | $50 |
| Anthropic API | $2,000 |
| Stripe fees | $1,800 |
| Resend | $100 |
| Monitoring | $100 |
| **Total** | **$5,750** |

**Revenue (100 customers, 60/30/10 split):**
- 60 Starter × $199 = $11,940
- 30 Pro × $499 = $14,970
- 10 Enterprise × $999 = $9,990
- **Total MRR: $36,900**

**Gross Profit: $31,150 (84% margin)**

---

## Support & Maintenance

### Daily Tasks
- Monitor provisioning queue
- Respond to support tickets
- Check error logs

### Weekly Tasks
- Review usage analytics
- Identify inactive agents (re-engagement)
- Billing issue resolution

### Monthly Tasks
- Infrastructure cost optimization
- Feature usage analysis
- Customer success check-ins
- Roadmap planning

---

## Next Steps

1. **This Week:** Deploy to staging environment
2. **Next Week:** Beta test with 3 customers
3. **Week 3:** Iterate based on feedback
4. **Week 4:** Public launch

---

**Status:** Ready for implementation  
**Estimated Setup Time:** 4 days (following this guide)  
**First Customer Target:** 1 week after deployment
