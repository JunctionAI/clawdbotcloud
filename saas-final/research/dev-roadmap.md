# Development Roadmap - Technical Implementation Plan

**Timeline:** 4 weeks to production launch  
**Goal:** Zero-touch SaaS, fully operational  
**Status:** Ready to Execute

---

## Week 1: Core Infrastructure (Feb 4-10)

### Day 1-2: Convex Setup
**Tasks:**
- [ ] Create Convex project (`npx convex init`)
- [ ] Define schema (customers, agents, integrations, usage)
- [ ] Write CRUD functions (create, read, update, delete)
- [ ] Setup authentication (Convex Auth)
- [ ] Test database operations

**Schema Design:**
```typescript
// customers table
{
  _id: Id<"customers">,
  email: string,
  name: string,
  plan: "starter" | "professional" | "enterprise",
  stripeCustomerId: string,
  stripeSubscriptionId: string,
  status: "active" | "suspended" | "cancelled",
  createdAt: number,
  updatedAt: number
}

// agents table
{
  _id: Id<"agents">,
  customerId: Id<"customers">,
  name: string,
  type: "email" | "calendar" | "research",
  status: "active" | "idle" | "error",
  lastActive: number,
  config: object
}

// integrations table
{
  _id: Id<"integrations">,
  customerId: Id<"customers">,
  provider: "gmail" | "slack" | "discord",
  accessToken: string, // encrypted
  refreshToken: string, // encrypted
  expiresAt: number,
  status: "connected" | "disconnected",
  lastSync: number
}
```

**Testing:**
```bash
# Create test customer
npx convex run customers:create --email test@example.com --plan starter

# Verify
npx convex query customers:list
```

---

### Day 3-4: Stripe Integration
**Tasks:**
- [ ] Create Stripe account (or use existing)
- [ ] Setup products (Starter, Professional, Enterprise)
- [ ] Configure webhooks (checkout.session.completed, subscription events)
- [ ] Write webhook handler (api/stripe-webhook.js)
- [ ] Test payment flow end-to-end

**Stripe Products:**
```bash
# Create products via Stripe CLI
stripe products create --name "Clawdbot Starter" --description "1 AI Agent"
stripe prices create --product prod_xxx --unit-amount 19900 --currency usd --recurring interval=month

stripe products create --name "Clawdbot Professional" --description "5 AI Agents"
stripe prices create --product prod_xxx --unit-amount 49900 --currency usd --recurring interval=month

stripe products create --name "Clawdbot Enterprise" --description "Unlimited Agents"
stripe prices create --product prod_xxx --unit-amount 99900 --currency usd --recurring interval=month
```

**Webhook Handler:**
```javascript
// api/stripe-webhook.js
import Stripe from 'stripe';
import { api } from '../convex/_generated/api';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handleWebhook(req, res) {
  const sig = req.headers['stripe-signature'];
  let event;
  
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  
  switch (event.type) {
    case 'checkout.session.completed':
      await handleCheckoutComplete(event.data.object);
      break;
    case 'customer.subscription.deleted':
      await handleSubscriptionCancelled(event.data.object);
      break;
  }
  
  res.json({ received: true });
}
```

---

### Day 5-7: Provisioning System
**Tasks:**
- [ ] Railway account setup
- [ ] Create Mission Control template (Dockerfile)
- [ ] Write provisioning function (auto-deploy instances)
- [ ] Write deprovisioning function (cleanup)
- [ ] Test full flow (Stripe → Convex → Railway → Email)

**Provisioning Function:**
```javascript
// api/provision-customer.js
export async function provisionCustomer(customerData) {
  // 1. Create Convex customer
  const customerId = await convex.mutation(api.customers.create, customerData);
  
  // 2. Deploy to Railway
  const instance = await railway.deployService({
    name: `clawdbot-${customerId}`,
    source: {
      image: 'ghcr.io/clawdbot/mission-control:latest'
    },
    env: {
      CUSTOMER_ID: customerId,
      CONVEX_URL: process.env.CONVEX_URL,
      PLAN: customerData.plan
    }
  });
  
  // 3. Create default agents
  await convex.mutation(api.agents.createDefaults, {
    customerId,
    skills: ['email', 'calendar']
  });
  
  // 4. Send welcome email
  await sendgrid.send({
    to: customerData.email,
    templateId: 'welcome',
    dynamicData: {
      name: customerData.name,
      dashboardUrl: 'https://app.clawdbot.com',
      instanceUrl: instance.url
    }
  });
  
  return { customerId, instanceUrl: instance.url };
}
```

---

## Week 2: Customer Dashboard (Feb 11-17)

### Day 1-2: Setup & Authentication
**Tasks:**
- [ ] Create React app (Vite)
- [ ] Install dependencies (Tailwind, Convex, React Router)
- [ ] Setup Convex Auth (OAuth providers)
- [ ] Build login/signup pages
- [ ] Protected routes

**Tech Stack:**
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "convex": "^1.7.0",
    "@clerk/clerk-react": "^4.28.0",
    "@headlessui/react": "^1.7.17",
    "@heroicons/react": "^2.0.18",
    "tailwindcss": "^3.3.5"
  }
}
```

---

### Day 3-4: Core Pages
**Tasks:**
- [ ] Dashboard overview (stats, activity feed, agents)
- [ ] Integrations page (connect/disconnect)
- [ ] Agents page (manage, configure)
- [ ] Billing page (plan, usage, invoices)
- [ ] Settings page (profile, security)

**Components:**
```
src/
├── components/
│   ├── Dashboard/
│   │   ├── StatsCards.jsx
│   │   ├── ActivityFeed.jsx
│   │   └── AgentCards.jsx
│   ├── Integrations/
│   │   ├── IntegrationCard.jsx
│   │   └── OAuthButton.jsx
│   ├── Agents/
│   │   ├── AgentCard.jsx
│   │   └── AgentLogs.jsx
│   └── Billing/
│       ├── PlanCard.jsx
│       ├── UsageChart.jsx
│       └── InvoiceList.jsx
├── pages/
│   ├── Dashboard.jsx
│   ├── Integrations.jsx
│   ├── Agents.jsx
│   ├── Billing.jsx
│   └── Settings.jsx
└── App.jsx
```

---

### Day 5-7: OAuth & Integrations
**Tasks:**
- [ ] Gmail OAuth flow
- [ ] Google Calendar OAuth
- [ ] Slack OAuth
- [ ] Discord OAuth
- [ ] Token storage (encrypted in Convex)
- [ ] Token refresh logic

**OAuth Implementation:**
```javascript
// Gmail OAuth
export async function connectGmail() {
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?
    client_id=${GOOGLE_CLIENT_ID}&
    redirect_uri=${REDIRECT_URI}&
    response_type=code&
    scope=https://www.googleapis.com/auth/gmail.modify&
    access_type=offline`;
  
  window.location.href = authUrl;
}

// Callback handler
export async function handleOAuthCallback(code) {
  // Exchange code for tokens
  const tokens = await getGoogleTokens(code);
  
  // Store in Convex (encrypted)
  await convex.mutation(api.integrations.create, {
    provider: 'gmail',
    accessToken: encrypt(tokens.access_token),
    refreshToken: encrypt(tokens.refresh_token),
    expiresAt: Date.now() + tokens.expires_in * 1000
  });
}
```

---

## Week 3: Agent System & Docs (Feb 18-24)

### Day 1-3: Agent Implementation
**Tasks:**
- [ ] Email Intelligence Agent (Gmail integration)
- [ ] Calendar Optimizer Agent (Google Calendar)
- [ ] Research Assistant Agent (web scraping)
- [ ] Heartbeat system (monitoring)
- [ ] Agent logging (activity feed)

**Email Agent Logic:**
```javascript
// agents/email-intelligence.js
export async function emailAgent(customerId) {
  // 1. Get integration tokens
  const integration = await getIntegration(customerId, 'gmail');
  
  // 2. Fetch unread emails
  const emails = await gmail.messages.list({
    userId: 'me',
    q: 'is:unread',
    maxResults: 50
  });
  
  // 3. Analyze each email
  for (const email of emails) {
    const analysis = await analyzeEmail(email);
    
    if (analysis.urgent) {
      await sendAlert(customerId, email);
    }
    
    if (analysis.needsResponse) {
      const draft = await draftResponse(email);
      await saveDraft(customerId, draft);
    }
    
    if (analysis.canArchive) {
      await archiveEmail(email.id);
    }
  }
  
  // 4. Log activity
  await logActivity(customerId, {
    type: 'email_triage',
    count: emails.length,
    timestamp: Date.now()
  });
}
```

---

### Day 4-7: Documentation
**Tasks:**
- [ ] Setup Docsify (static site generator)
- [ ] Write Quick Start guide
- [ ] Write integration guides (Gmail, Slack, etc.)
- [ ] Write troubleshooting guide
- [ ] Record video tutorials (Loom)
- [ ] Deploy docs to docs.clawdbot.com

**Doc Structure:**
```
docs/
├── index.html (Docsify config)
├── README.md (homepage)
├── quickstart.md
├── integrations/
│   ├── gmail.md
│   ├── slack.md
│   └── discord.md
├── agents/
│   ├── email.md
│   └── calendar.md
├── troubleshooting.md
└── api.md
```

---

## Week 4: Testing & Launch (Feb 25 - Mar 3)

### Day 1-2: End-to-End Testing
**Tasks:**
- [ ] Test signup flow (Stripe test mode)
- [ ] Test provisioning (create test customer)
- [ ] Test OAuth integrations (all providers)
- [ ] Test agent execution (run manually)
- [ ] Test billing (subscription lifecycle)
- [ ] Load testing (simulate 100 customers)

**Test Checklist:**
```
Signup Flow:
- [ ] Can create account
- [ ] Receives welcome email
- [ ] Can log into dashboard
- [ ] Instance deployed to Railway
- [ ] Agents created in Convex

OAuth Integrations:
- [ ] Gmail connects successfully
- [ ] Tokens stored encrypted
- [ ] Tokens refresh automatically
- [ ] Can disconnect integration

Agent Execution:
- [ ] Email agent triages inbox
- [ ] Calendar agent schedules meetings
- [ ] Activity logs in dashboard
- [ ] Alerts sent for urgent items

Billing:
- [ ] Can upgrade plan
- [ ] Can downgrade plan
- [ ] Can update payment method
- [ ] Failed payments retry correctly
```

---

### Day 3-4: Production Deployment
**Tasks:**
- [ ] Deploy dashboard to Vercel
- [ ] Deploy API to Railway
- [ ] Deploy docs to docs.clawdbot.com
- [ ] Configure DNS (app.clawdbot.com, docs.clawdbot.com)
- [ ] Setup SSL certificates
- [ ] Stripe live mode (switch from test)
- [ ] Monitoring (Sentry, LogRocket, UptimeRobot)

**Deployment Commands:**
```bash
# Dashboard (Vercel)
cd dashboard
vercel --prod

# API (Railway)
cd api
railway up

# Docs (Vercel)
cd docs
vercel --prod
```

---

### Day 5-7: Soft Launch
**Tasks:**
- [ ] Invite 10 beta testers
- [ ] Monitor for issues
- [ ] Fix critical bugs
- [ ] Gather feedback
- [ ] Iterate based on feedback

**Beta Tester Outreach:**
```
Subject: You're Invited to Clawdbot Beta 🤖

Hi [NAME],

I'm launching Clawdbot (AI automation SaaS) next week and I'd love your feedback.

What you get:
- Free Pro account for 3 months ($1,497 value)
- Early access to all features
- Direct line to me (Slack channel)

What I need:
- Use it for 2 weeks
- Report bugs/issues
- Share honest feedback

Interested? Reply "YES" and I'll send your invite.

— Tom
```

---

## Post-Launch Roadmap (Month 2-6)

### Month 2 (March): Polish & Growth
- [ ] Fix all beta feedback
- [ ] A/B test pricing page
- [ ] Launch affiliate program
- [ ] Create comparison pages (vs Zapier, vs SimpleClaw)
- [ ] SEO optimization

### Month 3 (April): Feature Expansion
- [ ] Add 10 more integrations
- [ ] Custom workflow builder (visual UI)
- [ ] Team collaboration features
- [ ] Mobile app (React Native)

### Month 4-6 (May-July): Scale
- [ ] API rate limiting (prevent abuse)
- [ ] Usage analytics dashboard
- [ ] White-label customization UI
- [ ] Enterprise SSO (SAML)
- [ ] SOC 2 compliance

---

## Technical Debt to Avoid

### Anti-Patterns
❌ Building before validating (ship MVP first)  
❌ Over-engineering (keep it simple)  
❌ No tests (write tests from day 1)  
❌ Manual deployments (automate everything)  
❌ Ignoring errors (monitor Sentry daily)

### Best Practices
✅ Write tests for critical paths (signup, billing, provisioning)  
✅ Use TypeScript (catch errors at compile time)  
✅ Document as you build (future-you will thank you)  
✅ Review code before merging (even solo projects)  
✅ Ship small, ship often (daily deploys)

---

## Success Metrics

### Week 1
- [ ] Provisioning works end-to-end
- [ ] 0 manual steps (fully automated)
- [ ] <2 min provision time

### Week 2
- [ ] Dashboard loads <2 seconds
- [ ] OAuth success rate >95%
- [ ] 0 critical bugs

### Week 3
- [ ] Agents execute correctly
- [ ] Activity logs real-time
- [ ] Docs cover 80% of questions

### Week 4
- [ ] 10 beta customers signed up
- [ ] 0 provisioning failures
- [ ] 0 payment issues

---

## Team & Resources

### Solo Build (Tom)
- **Week 1:** 40 hours (infrastructure)
- **Week 2:** 40 hours (dashboard)
- **Week 3:** 40 hours (agents + docs)
- **Week 4:** 20 hours (testing + launch)

**Total:** 140 hours (3.5 weeks full-time)

### With Developer Help
- **Week 1-2:** Developer builds dashboard
- **Week 1-2:** Tom builds infrastructure
- **Week 3:** Both build agents
- **Week 4:** Both test

**Total:** 80 hours each (2 weeks full-time)

---

## Contingency Plans

### If Behind Schedule
- Cut Starter tier (launch Professional + Enterprise only)
- Cut video tutorials (docs only)
- Cut some integrations (Gmail + Calendar only)

### If Provisioning Fails
- Manual provisioning (temporary)
- Refund affected customers
- Fix root cause within 24 hours

### If Billing Breaks
- Stop new signups (temporarily)
- Manual invoicing (temporary)
- Fix Stripe integration ASAP

---

## Conclusion

**Timeline:** 4 weeks (140 hours solo)  
**Outcome:** Production-ready SaaS, zero-touch onboarding  
**Risk:** Low (proven tech stack, simple architecture)  
**Confidence:** High (all components validated)

**Ready to build. Let's ship.**

---

**Roadmap by:** Subagent (saas-final-build)  
**Date:** February 4, 2026  
**Status:** Ready to Execute ✅
