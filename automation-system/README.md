# Clawdbot One-Click Setup Automation System

**Status:** Under Construction  
**Goal:** Zero-touch provisioning from signup → deployed agent

---

## Architecture Overview

```
User Signup (Stripe)
    ↓
Webhook → Provisioning API
    ↓
Agent Deployment (Docker/VM)
    ↓
Configuration (Skills + Memory + Heartbeat)
    ↓
User Dashboard Access
    ↓
Onboarding Email + Training
```

---

## Components

### 1. **Signup Flow** (`/signup`)
- Stripe Checkout integration
- Tier selection (Starter/Pro/Enterprise)
- Customer info collection
- Payment processing
- Setup fee + first month charge

### 2. **Provisioning API** (`/api`)
- Stripe webhook handler
- Agent provisioning orchestrator
- Configuration generator
- Status tracking

### 3. **Agent Deployment** (`/deploy`)
- Docker container provisioning OR
- VM provisioning (Railway/Fly.io) OR
- Serverless (Convex + workers)
- Environment setup
- Clawdbot installation

### 4. **Configuration System** (`/config`)
- Skills library auto-install (tier-specific)
- Memory system setup (MEMORY.md, daily logs)
- Heartbeat configuration (tier-specific schedule)
- Security protocols enabled
- Channel integrations (WhatsApp/Telegram/Slack)

### 5. **User Dashboard** (`/dashboard`)
- Login/authentication
- Agent status and health
- Usage analytics (time saved, tasks completed)
- Billing management
- Support ticket system
- Configuration UI (customize after setup)

### 6. **Onboarding System** (`/onboarding`)
- Welcome email with credentials
- Training video links (tier-specific)
- Scheduled check-in emails (Day 3, 7, 14, 30)
- Support channel invitations

---

## Tech Stack Recommendations

### Option A: Docker + Railway (Fastest)
**Pros:**
- Already familiar with Railway
- Clawdbot runs in Docker
- Easy scaling
- ~$10/customer/month cost

**Cons:**
- Need Railway team plan for multiple projects
- Potential cold starts

### Option B: VM Provisioning (Most Control)
**Pros:**
- Full control
- Can use cheap VPS providers
- No vendor lock-in

**Cons:**
- More complex provisioning
- Need to manage VMs

### Option C: Serverless (Convex + Workers) (Most Scalable)
**Pros:**
- Zero infrastructure management
- Pay-per-use
- Instant scaling

**Cons:**
- Clawdbot architecture needs adaptation
- More complex setup

**RECOMMENDATION:** Start with **Option A (Docker + Railway)** for MVP speed.

---

## Implementation Plan

### Week 1: Foundation
- [x] Strategy defined (SimpleClaw analysis complete)
- [ ] Setup automation-system/ folder structure
- [ ] Stripe account setup + product configuration
- [ ] Basic webhook handler (Stripe → log event)
- [ ] Database schema (customers, agents, deployments)

### Week 2: Core Provisioning
- [ ] Docker deployment automation
- [ ] Railway API integration
- [ ] Agent configuration generator
- [ ] Skills auto-installer
- [ ] Memory system template

### Week 3: User Dashboard
- [ ] Authentication system (NextAuth.js)
- [ ] Dashboard UI (Next.js + Tailwind)
- [ ] Agent status monitoring
- [ ] Billing portal (Stripe Customer Portal)
- [ ] Support ticket system

### Week 4: Onboarding & Polish
- [ ] Email automation (Resend/SendGrid)
- [ ] Training video recording
- [ ] Onboarding sequence (6 emails)
- [ ] Testing with 3 beta customers
- [ ] Documentation

---

## Customer Journey (Automated)

### Step 1: Signup (5 minutes)
1. User visits setupclaw.com
2. Selects tier (Starter/Pro/Enterprise)
3. Stripe checkout
4. Payment processed
5. **Webhook triggered**

### Step 2: Provisioning (10-15 minutes, automated)
1. Provisioning API receives webhook
2. Creates database entry (customer record)
3. Deploys Docker container on Railway
4. Generates environment config (.env)
5. Installs Clawdbot + dependencies
6. Configures skills (tier-specific)
7. Sets up memory system (MEMORY.md template)
8. Configures Heartbeat schedule
9. Enables security protocols
10. Generates dashboard credentials
11. **Status: Ready**

### Step 3: Onboarding (Immediate)
1. Welcome email sent
   - Dashboard login link
   - WhatsApp/Telegram setup instructions
   - Training video link (tier-specific)
   - First-week quick-start guide
2. Slack/Discord support channel invite
3. Calendar event: "Clawdbot Day 7 Check-in" (Pro/Enterprise)

### Step 4: First Use (Day 1)
1. User logs into dashboard
2. Sees agent status: READY
3. Follows WhatsApp connection guide
4. Sends first message
5. Agent responds with personality + skills intro
6. **User is productive in 1 hour**

### Step 5: Ongoing (Automated)
- Day 3: Check-in email ("How's it going?")
- Day 7: Quick win email ("Try these 3 skills")
- Day 14: ROI email ("Track your time saved")
- Day 30: Success survey + upgrade opportunity

---

## Tier-Specific Auto-Configuration

### Starter ($199/mo)
**Skills Enabled:**
- Email management
- Calendar coordination
- Research & web automation
- Document summarization
- Social media management
- Basic financial tracking

**Memory:**
- MEMORY.md (up to 50KB)
- Daily logs (30 days retained)

**Heartbeat:**
- Disabled (manual polling only)

**Channels:**
- WhatsApp OR Telegram (user chooses)
- Email support

**Support:**
- Email only (24-hour response)
- Documentation access

---

### Professional ($499/mo)
**All Starter features, PLUS:**

**Skills Enabled:**
- CRM automation
- Advanced financial analysis
- Competitive intelligence
- Custom reporting
- [2 custom skills/month budget]

**Memory:**
- MEMORY.md (up to 100KB)
- Entity tracking (people/, projects/, business/)
- Daily logs (90 days retained)

**Mission Control:**
- 5 subagents enabled
- Parallel execution

**Heartbeat:**
- 2x daily (8am, 6pm)
- Email + calendar monitoring
- Proactive alerts

**Channels:**
- WhatsApp + Telegram + Slack
- Priority support channel

**Support:**
- Slack/Discord (4-hour response)
- Monthly strategy call (30 min)
- 2 hours onboarding

---

### Enterprise ($999/mo)
**All Professional features, PLUS:**

**Skills Enabled:**
- Unlimited custom skills
- API integrations
- Database connections
- Custom tool development

**Memory:**
- MEMORY.md (unlimited)
- Full entity graph
- Daily logs (1 year retained)
- Compliance-ready audit logs

**Mission Control:**
- 10 subagents enabled
- Department-level orchestration

**Heartbeat:**
- 24/7 continuous monitoring
- Custom schedule
- Advanced alert rules

**Security:**
- SSO/SAML integration
- Role-based access control
- Audit logging
- Data residency options

**Channels:**
- All channels
- Dedicated Slack workspace

**Support:**
- Dedicated support agent
- 1-hour response SLA
- Weekly strategy calls
- 5 hours onboarding
- Quarterly business reviews

---

## Database Schema

### `customers` table
```sql
CREATE TABLE customers (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  stripe_customer_id VARCHAR(255) UNIQUE NOT NULL,
  tier VARCHAR(50) NOT NULL, -- starter, professional, enterprise
  status VARCHAR(50) NOT NULL, -- active, suspended, cancelled
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### `agents` table
```sql
CREATE TABLE agents (
  id UUID PRIMARY KEY,
  customer_id UUID REFERENCES customers(id),
  deployment_id VARCHAR(255), -- Railway project ID
  deployment_url VARCHAR(255), -- Agent API endpoint
  status VARCHAR(50) NOT NULL, -- provisioning, ready, error, stopped
  tier VARCHAR(50) NOT NULL,
  config JSONB, -- Agent configuration
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### `deployments` table
```sql
CREATE TABLE deployments (
  id UUID PRIMARY KEY,
  agent_id UUID REFERENCES agents(id),
  status VARCHAR(50) NOT NULL, -- pending, in_progress, completed, failed
  logs TEXT, -- Deployment logs
  error TEXT, -- Error message if failed
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### `subscriptions` table
```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY,
  customer_id UUID REFERENCES customers(id),
  stripe_subscription_id VARCHAR(255) UNIQUE NOT NULL,
  tier VARCHAR(50) NOT NULL,
  status VARCHAR(50) NOT NULL, -- active, past_due, cancelled
  current_period_start TIMESTAMP,
  current_period_end TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### `usage_analytics` table
```sql
CREATE TABLE usage_analytics (
  id UUID PRIMARY KEY,
  agent_id UUID REFERENCES agents(id),
  date DATE NOT NULL,
  messages_sent INT DEFAULT 0,
  messages_received INT DEFAULT 0,
  tasks_completed INT DEFAULT 0,
  time_saved_minutes INT DEFAULT 0, -- Self-reported or estimated
  skills_used JSONB, -- {"email": 15, "research": 8}
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## Environment Variables (Auto-Generated)

Each deployed agent gets:

```env
# Core
AGENT_ID=<uuid>
CUSTOMER_ID=<uuid>
TIER=starter|professional|enterprise

# Clawdbot
ANTHROPIC_API_KEY=<from_vault>
CLAWDBOT_TOKEN=<generated>
GATEWAY_URL=<agent_url>

# Skills (tier-specific)
SKILLS_ENABLED=email,calendar,research,...
MEMORY_ENABLED=true
MEMORY_MAX_SIZE=50000  # Starter: 50KB, Pro: 100KB, Enterprise: unlimited
HEARTBEAT_ENABLED=false  # Starter: false, Pro/Enterprise: true
HEARTBEAT_SCHEDULE=0 8,18 * * *  # Pro: 2x daily, Enterprise: custom

# Mission Control (Pro/Enterprise only)
MISSION_CONTROL_ENABLED=false  # Starter: false, Pro/Enterprise: true
MAX_SUBAGENTS=1  # Starter: 1, Pro: 5, Enterprise: 10

# Channels (tier-specific)
WHATSAPP_ENABLED=true
TELEGRAM_ENABLED=false  # Pro/Enterprise: true
SLACK_ENABLED=false  # Pro/Enterprise: true
DISCORD_ENABLED=false  # Enterprise: true

# Security
EMAIL_PROTECTION_ENABLED=true
RISK_SCORING_ENABLED=true
CONFIRMATION_REQUIRED=true

# Support
SUPPORT_EMAIL=support@setupclaw.com
SUPPORT_SLACK_CHANNEL=<tier_specific>
```

---

## API Endpoints

### Provisioning API

**POST `/api/webhooks/stripe`**
- Handles Stripe events
- `checkout.session.completed` → provision agent
- `customer.subscription.updated` → update tier
- `customer.subscription.deleted` → suspend agent

**POST `/api/provision`**
- Manual provisioning trigger (admin only)
- Input: `{ customer_id, tier }`
- Output: `{ deployment_id, status }`

**GET `/api/provision/status/:deployment_id`**
- Check provisioning status
- Returns: `{ status, logs, progress_pct }`

---

### Dashboard API

**GET `/api/dashboard/agent`**
- Get agent status and config
- Auth: JWT token
- Returns: `{ status, tier, skills, usage }`

**POST `/api/dashboard/agent/restart`**
- Restart agent (if error)

**GET `/api/dashboard/usage`**
- Get usage analytics
- Query params: `?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD`
- Returns: `{ messages, tasks, time_saved, skills }`

**POST `/api/dashboard/support/ticket`**
- Create support ticket
- Input: `{ subject, message, priority }`

---

## Monitoring & Alerts

### Agent Health Checks
- **Heartbeat:** Every 5 minutes, ping agent `/health` endpoint
- **If down:** Auto-restart attempt (3 retries)
- **If still down:** Alert customer + support team

### Deployment Monitoring
- Track provisioning time (target: <15 min)
- Alert if >30 min
- Log all errors for debugging

### Usage Monitoring
- Track daily active users
- Identify inactive agents (>7 days no activity)
- Send re-engagement email

---

## Pricing Configuration (Stripe)

### Products

**Starter:**
- Monthly subscription: $199/month
- One-time setup fee: $299
- Stripe Product ID: `prod_starter_monthly`

**Professional:**
- Monthly subscription: $499/month
- One-time setup fee: $599
- Stripe Product ID: `prod_pro_monthly`

**Enterprise:**
- Monthly subscription: $999/month
- One-time setup fee: $999
- Stripe Product ID: `prod_enterprise_monthly`

### Checkout Session Creation

```javascript
const session = await stripe.checkout.sessions.create({
  mode: 'subscription',
  line_items: [
    {
      price: tier_price_id, // Monthly subscription
      quantity: 1,
    },
    {
      price: setup_fee_price_id, // One-time setup
      quantity: 1,
    },
  ],
  success_url: 'https://dashboard.setupclaw.com/welcome',
  cancel_url: 'https://setupclaw.com/pricing',
  metadata: {
    tier: 'starter' | 'professional' | 'enterprise',
  },
});
```

---

## Testing Plan

### Unit Tests
- Stripe webhook handler
- Configuration generator
- Skills installer
- Memory system setup

### Integration Tests
- Full provisioning flow (mock Stripe)
- Agent deployment (test environment)
- Dashboard authentication
- Support ticket creation

### End-to-End Tests
- Complete customer journey (test account)
- Stripe test mode checkout
- Agent provisioning
- First message sent/received
- Dashboard access

### Beta Testing
- 3 beta customers (1 per tier)
- Free access for 3 months
- Weekly feedback calls
- Iterate based on issues

---

## Security Considerations

### Secrets Management
- **Stripe keys:** Environment variables (prod vs test)
- **Anthropic API keys:** Key vault (rotate monthly)
- **Agent tokens:** Generated per-customer, hashed in DB
- **Database credentials:** Managed by platform (Vercel/Railway)

### Data Protection
- **Customer PII:** Encrypted at rest
- **Agent logs:** Anonymized, 90-day retention
- **Billing data:** Stripe handles (PCI compliant)

### Access Control
- **Dashboard:** JWT authentication
- **API:** API key + CORS restrictions
- **Agents:** Isolated environments (no cross-customer access)

---

## Cost Analysis

### Per-Customer Costs (Starter Tier)

| Item | Cost/Month | Notes |
|------|------------|-------|
| Railway hosting | $10 | Docker container + DB |
| Anthropic API | $20 | ~1M tokens/month avg |
| Stripe fees | $6 | 2.9% + $0.30 per transaction |
| Email (Resend) | $1 | 1,000 emails/month |
| Support | $50 | Blended support cost |
| **Total** | **$87** | |
| **Revenue** | $199 | |
| **Gross Margin** | **$112 (56%)** | |

### Per-Customer Costs (Professional Tier)

| Item | Cost/Month | Notes |
|------|------------|-------|
| Railway hosting | $15 | Larger container (Mission Control) |
| Anthropic API | $40 | ~2M tokens/month (5 subagents) |
| Stripe fees | $15 | 2.9% + $0.30 |
| Email (Resend) | $2 | More emails (Heartbeat) |
| Support | $100 | Higher touch (Slack, calls) |
| **Total** | **$172** | |
| **Revenue** | $499 | |
| **Gross Margin** | **$327 (66%)** | |

### Per-Customer Costs (Enterprise Tier)

| Item | Cost/Month | Notes |
|------|------------|-------|
| Railway hosting | $25 | XL container (10 subagents) |
| Anthropic API | $80 | ~4M tokens/month |
| Stripe fees | $30 | 2.9% + $0.30 |
| Email (Resend) | $5 | High volume |
| Support | $200 | Dedicated support agent |
| **Total** | **$340** | |
| **Revenue** | $999 | |
| **Gross Margin** | **$659 (66%)** | |

### Profitability Analysis

**At 50 customers (60% Starter, 30% Pro, 10% Enterprise):**
- 30 Starter: $3,360 gross margin
- 15 Pro: $4,905 gross margin
- 5 Enterprise: $3,295 gross margin
- **Total: $11,560/month profit**

**At 200 customers:**
- 120 Starter: $13,440 gross margin
- 60 Pro: $19,620 gross margin
- 20 Enterprise: $13,180 gross margin
- **Total: $46,240/month profit = $554,880/year**

---

## Next Steps (Immediate)

1. **Today:** Create folder structure, initialize repo
2. **This Week:** Stripe integration + webhook handler
3. **Next Week:** Provisioning API + Docker deployment
4. **Week 3:** User dashboard MVP
5. **Week 4:** Beta testing with 3 customers

---

**Status:** Ready to build  
**Estimated Time:** 4 weeks to MVP  
**Target Launch:** March 1, 2026
