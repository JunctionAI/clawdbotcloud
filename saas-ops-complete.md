# SaaS Operations Manual: Hands-Off $1M ARR Playbook

**Goal:** Run a profitable SaaS business without Tom being involved in day-to-day operations.

**Core Principle:** Everything is automated first, delegated second, escalated last.

---

## 1. Customer Journey (Signup → Productive)

### Signup Flow (100% Automated)
**No human touches required from prospect → paying customer.**

#### 1.1 Pre-Signup
- **Landing page** with clear value prop, pricing, FAQ
- **Product demos:** Embedded video walkthroughs (Loom/Wistia)
- **Free trial:** 14-day, no credit card required (reduces friction)
- **Live chat widget:** Intercom/Crisp with chatbot for FAQ (90% deflection target)

#### 1.2 Account Creation
```
User clicks "Start Free Trial" →
├─ Email/password OR Google/GitHub OAuth
├─ Email verification (automated, resend link available)
├─ Account provisioned in <5 seconds
└─ Redirect to onboarding wizard
```

**Technical Requirements:**
- Email verification with Postmark/SendGrid
- OAuth via Auth0/Clerk/Supabase Auth
- Account provisioning: Docker container or database namespace created automatically
- Welcome email sent immediately (Mailchimp/Customer.io drip campaign triggered)

#### 1.3 Onboarding Wizard (In-App)
**Goal: First value in <5 minutes.**

```
Step 1: "What do you want to accomplish?" (personalizes experience)
Step 2: Import data OR connect integration OR create first project
Step 3: Quick win (e.g., "Your first X is ready!")
Step 4: "Invite your team" (optional, can skip)
```

**Tools:**
- Appcues/Pendo/Userflow for interactive product tours
- Progress bar showing "80% complete" to encourage finish
- Skip buttons (don't force every step)

#### 1.4 Trial → Paid Conversion
**Automated conversion nudges:**

| Day | Trigger | Action |
|-----|---------|--------|
| Day 1 | Signup | Welcome email with "Quick Start Guide" |
| Day 3 | Low usage | Email: "Need help getting started?" + calendar link to success engineer |
| Day 7 | Active usage | Email: "You're crushing it! Upgrade to unlock X" |
| Day 10 | Trial ending | Email: "3 days left" + discount code (10% off first 3 months) |
| Day 13 | Still on trial | Final email: "Last chance" + upgrade CTA |
| Day 14 | Trial expires | Account locked (read-only), upgrade prompt on login |

**Conversion Boosters:**
- Annual plan discount (2 months free = 17% off)
- Live usage metrics: "You've saved 47 hours this week"
- Social proof: "Join 2,431 teams using [Product]"

### Success Metrics
- **Time to First Value:** <5 minutes (90th percentile)
- **Trial → Paid Conversion:** >25%
- **Activation Rate:** >60% (defined as completing core action 3+ times)

---

## 2. Support Model (Automated First)

### Support Tiers (Escalation Ladder)

```
Tier 0: Self-Service (Knowledge Base)        → 70% of queries
Tier 1: Chatbot (AI-powered)                 → 20% of queries
Tier 2: Support Engineer (Ticket System)     → 9% of queries
Tier 3: Technical Lead (Complex/Escalated)   → 1% of queries
Tom: NEVER (unless company-ending crisis)
```

### 2.1 Tier 0: Self-Service
**Tools:** Help Scout Docs, Notion Public Pages, or Gitbook

**Structure:**
```
Knowledge Base
├─ Getting Started (5 articles max)
├─ How-To Guides (organized by use case)
├─ Integrations (one doc per integration)
├─ Troubleshooting (common errors + fixes)
├─ API Documentation (if applicable)
└─ FAQ (updated monthly based on support tickets)
```

**Content Strategy:**
- Video walkthroughs for complex features (Loom)
- Screenshots with annotations (Markup.io/CloudApp)
- Search-optimized titles: "How to [exact user language]"
- "Was this helpful?" thumbs up/down on every article

**Maintenance:**
- Review analytics monthly: Which articles have high traffic + low helpfulness?
- Update docs whenever product changes (deploy checklist item)
- Support team adds to KB when same question asked 3+ times

### 2.2 Tier 1: AI Chatbot
**Tool:** Intercom with Fin AI, Zendesk Answer Bot, or Ada

**Setup:**
- Trained on your entire knowledge base
- Integrated with your app (can see user's account details)
- Can perform simple actions: "reset password", "resend invoice", "upgrade plan"

**Chatbot Capabilities:**
- Answer product questions from KB
- Check order status
- Update billing info
- Escalate to human: "This is complex, I'll connect you with Sarah (typically replies in 2 hours)"

**Success Metrics:**
- Resolution rate >60% (without human handoff)
- Customer satisfaction >4.0/5 for bot interactions

### 2.3 Tier 2: Support Engineers (Delegated)

**Hiring:**
- 1 support engineer per 200-300 customers (adjust based on product complexity)
- Location: Philippines/India/LatAm (cost-effective, excellent English)
- Rate: $15-25/hr for experienced support (via Upwork/Remote.com)

**Ticket System:** Help Scout, Zendesk, or Front

**SLAs:**
| Plan | First Response | Resolution |
|------|---------------|------------|
| Free/Trial | 24 hours | 72 hours |
| Starter | 12 hours | 48 hours |
| Pro | 4 hours | 24 hours |
| Enterprise | 1 hour | 8 hours |

**Shift Coverage:**
- If US-focused: Hire across timezones (1 support in Manila = 12hr coverage)
- 24/7 not needed until 500+ customers
- After-hours: "We'll reply within X hours" auto-responder

**Support Engineer Playbook:**
- Decision tree for common issues (Notion doc or Confluence)
- Canned responses for FAQs (Help Scout has Saved Replies)
- Escalation criteria: "If customer mentions refund, legal, or bug affecting >10 users, escalate to Tier 3"

### 2.4 Tier 3: Technical Lead (Rare)
**Role:** Senior engineer or technical co-founder (NOT Tom unless critical)

**Handles:**
- Complex bugs requiring code investigation
- Security incidents
- Data migration requests
- Enterprise customer onboarding

**Hours:** 5-10 hours/week avg, paid contract ($100-150/hr)

### Support Metrics (Track Weekly)
- **Ticket Volume:** Trending up = product issue or docs gap
- **Resolution Time:** By tier and plan
- **CSAT Score:** Survey after ticket closed (target >4.5/5)
- **Top 10 Issues:** If same issue appears repeatedly = product/docs fix needed

---

## 3. Infrastructure (Servers, Costs, Scaling)

### 3.1 Hosting Architecture

**Recommended Stack (Scales 10 → 10,000 users):**

```
Frontend: Vercel (Next.js/React)
Backend: Railway/Fly.io/Render (Docker containers)
Database: Supabase (Postgres) or PlanetScale (MySQL)
Storage: AWS S3 or Cloudflare R2
CDN: Cloudflare
Email: Postmark (transactional) + Mailchimp/Customer.io (marketing)
```

**Why This Stack:**
- **Vercel:** Auto-scaling, zero config, $20/mo (Pro plan sufficient until 1M page views)
- **Railway/Fly.io:** Simple deploy, auto-scaling, ~$50-200/mo
- **Supabase/PlanetScale:** Managed Postgres/MySQL, auto-backups, connection pooling
- **Cloudflare:** Free tier covers most needs (DDoS protection, caching)

### 3.2 Cost Breakdown (Monthly)

**0-50 Customers:**
| Service | Cost |
|---------|------|
| Hosting (Railway) | $50 |
| Database (Supabase Pro) | $25 |
| Frontend (Vercel Pro) | $20 |
| Email (Postmark) | $15 |
| Support (Help Scout) | $50 |
| Monitoring (Sentry + Uptime) | $30 |
| **Total** | **$190/mo** |

**50-200 Customers:**
| Service | Cost |
|---------|------|
| Hosting | $150 |
| Database | $50 |
| Frontend | $20 |
| Email | $30 |
| Support + Chat | $100 |
| Monitoring | $50 |
| Support Engineer (20hr/wk) | $1,600 |
| **Total** | **$2,000/mo** |

**200-1000 Customers:**
| Service | Cost |
|---------|------|
| Hosting | $500 |
| Database | $200 |
| Frontend | $100 |
| Email | $100 |
| Support Tools | $300 |
| Monitoring | $100 |
| Support Engineers (2 FT) | $6,000 |
| Tech Lead (10hr/wk) | $500 |
| **Total** | **$7,800/mo** |

**Rule of Thumb:** Infrastructure costs should be <15% of MRR.

### 3.3 Auto-Scaling Strategy

**Horizontal Scaling (Add More Servers):**
- Railway/Fly.io: Auto-scale based on CPU/memory metrics
- Trigger: If avg CPU >70% for 5 minutes, spin up another instance
- Scale down: If CPU <30% for 20 minutes, remove instance
- Cost: ~$50/instance/month

**Database Scaling:**
- Supabase: Upgrade plan as you grow (Pro → Team → Enterprise)
- Connection pooling (PgBouncer) handles 1000s of connections with 1 DB
- Read replicas when >1000 customers (split read/write traffic)

**CDN Caching:**
- Cache static assets (JS/CSS/images) for 1 year
- Cache API responses where appropriate (5-60 seconds)
- Reduces origin load by 60-80%

### 3.4 Backup & Disaster Recovery

**Automated Backups:**
- **Database:** Daily snapshots, retained 30 days (Supabase/PlanetScale auto-handles)
- **Files:** S3 versioning enabled (recovers accidental deletes)
- **Code:** Git + GitHub (obviously)

**Disaster Recovery Plan:**
1. Database corruption: Restore from latest snapshot (<15 min downtime)
2. Hosting outage: Fly.io auto-deploys to different region
3. Data breach: Incident response doc (see Security section)

**Recovery Time Objective (RTO):** <1 hour for critical services  
**Recovery Point Objective (RPO):** <24 hours of data loss max

---

## 4. Monitoring (Know When Things Break)

### 4.1 Uptime Monitoring

**Tools:** UptimeRobot (free) or BetterUptime ($20/mo)

**What to Monitor:**
- Homepage (every 5 minutes)
- API health endpoint (every 5 minutes)
- Login flow (every 15 minutes)
- Critical user actions (e.g., "create project" endpoint)

**Alert Channels:**
- **Slack:** #alerts channel (all monitors)
- **SMS:** Tech lead phone (only if down >10 minutes)
- **PagerDuty:** For 24/7 coverage when you have on-call rotation

### 4.2 Error Tracking

**Tool:** Sentry (free for 5k events/month, then $26/mo)

**Setup:**
- Frontend: Track JS errors, network failures
- Backend: Track API errors, database connection issues
- Group similar errors (don't spam)
- Auto-create GitHub issues for new errors affecting >10 users

**Alert Rules:**
- New error type: Slack notification immediately
- Error spike (10x normal): SMS to tech lead
- Critical path error (signup/checkout): Wake everyone up

### 4.3 Performance Monitoring

**Tool:** Vercel Analytics + Railway Metrics (built-in)

**Key Metrics:**
| Metric | Target | Alert If |
|--------|--------|----------|
| Page Load Time | <2s (p95) | >4s |
| API Response Time | <200ms (p95) | >1s |
| Database Query Time | <50ms (p95) | >500ms |
| Error Rate | <0.1% | >1% |

**Weekly Review:**
- Slowest endpoints (optimize top 5)
- Most common errors (fix top 3)
- Uptime report (aim for 99.9%)

### 4.4 Business Metrics Dashboard

**Tool:** Stripe Dashboard + Metabase/Grafana/Retool

**Track Daily:**
- MRR (Monthly Recurring Revenue)
- New signups
- Trial → Paid conversions
- Churn rate
- Active users (DAU/WAU/MAU)

**Weekly Metrics:**
- Customer Acquisition Cost (CAC)
- Lifetime Value (LTV)
- LTV:CAC ratio (target >3:1)
- Net Revenue Retention (target >100%)

**Dashboard Access:**
- Tom: Weekly email summary (automated)
- Team: Live dashboard (Metabase)

---

## 5. Onboarding (Automated Emails & Tutorials)

### 5.1 Email Drip Campaign

**Tool:** Customer.io, Mailchimp, or Loops

**Signup Drip (14-day trial):**

**Day 0 (Immediate):**
- Subject: "Welcome to [Product]! Here's how to get started"
- Content: Quick start guide (3 steps), link to first tutorial video
- CTA: "Complete Your First [Action]"

**Day 1:**
- Subject: "Quick question: What made you sign up?"
- Content: 1-question survey (personalizes future emails)
- CTA: Survey link (Typeform)

**Day 3:**
- Subject: "Here's how [similar company] uses [Product]"
- Content: Customer story, specific use case
- CTA: "Try this workflow"

**Day 5:**
- Subject: "Unlock [premium feature] (50% of users love this)"
- Content: Feature highlight, video demo
- CTA: "Enable in settings"

**Day 7 (Midpoint Check-In):**
- Subject: "You're halfway through your trial!"
- Content: Usage stats ("You've done X, Y, Z"), upgrade benefits
- CTA: "Upgrade now and save 20%"

**Day 10 (Urgency):**
- Subject: "Your trial ends in 3 days 🚨"
- Content: What happens when trial ends, testimonials
- CTA: "Choose your plan"

**Day 12:**
- Subject: "Last chance: Save 20% on your first 3 months"
- Content: Limited-time discount code
- CTA: "Upgrade now"

**Day 14 (Trial Expired):**
- Subject: "Your trial has ended"
- Content: Account is read-only, data preserved for 30 days
- CTA: "Reactivate your account"

**Day 21 (Winback):**
- Subject: "We miss you! Here's 30% off to come back"
- Content: Aggressive discount, "What can we improve?" survey
- CTA: "Restart with discount"

### 5.2 In-App Tutorials

**Tool:** Appcues, Pendo, or Userflow

**Progressive Disclosure Strategy:**
Don't teach everything upfront. Introduce features as users need them.

**Tutorial Triggers:**
- First login: Core workflow (3 steps max)
- Feature discovery: Tooltip when user hovers near unused feature
- Advanced features: Unlock tutorial after basic proficiency ("You're ready for X!")

**Tutorial Best Practices:**
- Dismiss button always visible
- "Don't show again" option
- Track completion rates (iterate on low-completion tutorials)

### 5.3 Webinars & Live Onboarding (Scalable)

**Weekly Group Onboarding Webinar:**
- Calendly link in welcome email
- 30-minute session: product walkthrough + Q&A
- Recorded and added to knowledge base
- Hosted by support engineer (not Tom)

**Enterprise Tier:**
- 1:1 onboarding call (once per customer, 1 hour)
- Custom implementation plan
- Handled by Tech Lead or hired success engineer

---

## 6. Troubleshooting (Self-Service + Escalation)

### 6.1 Knowledge Base Structure

**Help Scout Docs / Gitbook:**

```
📘 Getting Started
   └─ Account Setup
   └─ First Steps
   └─ Quick Start Video

📗 Features
   └─ [Feature A]
   └─ [Feature B]
   └─ [Feature C]

📙 Integrations
   └─ Zapier
   └─ Slack
   └─ API

📕 Troubleshooting
   └─ "I can't log in"
   └─ "My data isn't syncing"
   └─ "Payment failed"
   └─ Error Messages (by code)

📔 Billing & Account
   └─ Upgrading/Downgrading
   └─ Cancellation
   └─ Refunds

📓 API Documentation
   └─ Authentication
   └─ Endpoints
   └─ Rate Limits
```

### 6.2 Common Issues → Self-Service Fixes

**Login Issues:**
- "Forgot Password" flow (automated)
- "Check your email" reminder
- "Still can't log in?" → Opens support ticket automatically with error logs attached

**Billing Issues:**
- "Update payment method" link in app
- Stripe Customer Portal (self-service billing management)
- "Retry payment" button for failed charges

**Data Sync Issues:**
- "Sync status" dashboard (shows last sync time, errors)
- "Force re-sync" button (most sync issues are timing)
- If sync fails 3+ times → Auto-creates support ticket with diagnostic data

### 6.3 Error Messages (User-Friendly)

**Bad:**
```
Error 500: Internal Server Error
```

**Good:**
```
Something went wrong on our end.
We've been notified and are looking into it.

In the meantime, try refreshing the page.

Need help? Contact support: support@yourproduct.com
[Copy error ID: 3a7f2b1c]
```

**Include in Every Error:**
- Plain English explanation
- What the user can do (if anything)
- Error ID (for support reference)
- Contact link

### 6.4 Escalation Decision Tree

**Support Engineer Decision Tree:**

```
Customer contacts support
↓
Is this in the Knowledge Base?
├─ YES → Send KB link, mark resolved
└─ NO → Continue

Is this a known bug?
├─ YES → Add to bug thread, notify customer of ETA
└─ NO → Continue

Can I fix this in <15 minutes?
├─ YES → Fix, document solution, update KB
└─ NO → Continue

Does this affect multiple customers?
├─ YES → Escalate to Tech Lead immediately
└─ NO → Continue

Is customer on Enterprise plan?
├─ YES → Escalate to Tech Lead within SLA
└─ NO → Troubleshoot, escalate if stuck after 1 hour
```

**Escalation to Tom:** NEVER, unless:
- Security breach affecting customer data
- Legal threat (lawsuit, regulatory)
- Infrastructure bill >$10k unexpected
- Major investor/customer relationship issue

---

## 7. Billing (Stripe Automation)

### 7.1 Stripe Setup (Fully Automated)

**Products:**
- Free Trial (14 days, no card required)
- Starter ($29/month or $290/year)
- Pro ($99/month or $990/year)
- Enterprise (Custom pricing)

**Stripe Features to Enable:**

**1. Subscription Management:**
- Auto-charges on renewal date
- Prorated upgrades/downgrades (automatic)
- Tax calculation (Stripe Tax - handles global VAT/GST)

**2. Dunning (Failed Payment Recovery):**

| Day | Action |
|-----|--------|
| Day 0 | Payment fails → Email "Payment failed, please update card" |
| Day 3 | Retry payment automatically |
| Day 7 | Email "Final notice, account will be suspended" |
| Day 10 | Suspend account (read-only mode) |
| Day 30 | Cancel subscription, delete data |

**Stripe Smart Retries:** Automatically retries failed payments at optimal times (increases recovery by 30%)

**3. Customer Portal:**
- Self-service link: customers can update card, download invoices, cancel subscription
- Embedded in your app: Settings → Billing → "Manage Subscription"
- Reduces support tickets by 50%

**4. Checkout Sessions:**
- Hosted checkout page (Stripe handles PCI compliance)
- Or embedded checkout (Stripe Elements)
- Supports: Credit card, Apple Pay, Google Pay, ACH, SEPA

### 7.2 Refund Policy (Automated Where Possible)

**Policy:**
- 30-day money-back guarantee (monthly plans)
- Annual plans: Prorated refund if cancelled within 60 days

**Refund Process:**
- Customer requests refund via support ticket
- Support engineer checks: How long have they been a customer?
  - <30 days: Full refund, auto-approved (Stripe API call)
  - 30-60 days (annual): Prorated refund, auto-approved
  - >60 days: Tech Lead approval required (rare)
- Support engineer clicks "Issue Refund" button (Zendesk integration with Stripe)
- Customer receives refund email automatically
- Account downgraded to free tier (data retained)

**Refund Tracking:**
- Monthly refund rate (target <2% of revenue)
- Refund reasons (categorize: "too expensive", "missing feature", "didn't use", etc.)
- If same reason appears 10+ times → Product/pricing fix needed

### 7.3 Upgrades & Downgrades (Self-Service)

**Upgrade Flow:**
- User clicks "Upgrade" in app
- Redirect to Stripe Checkout (or modal)
- Instant upgrade (prorated charge)
- Features unlocked immediately

**Downgrade Flow:**
- User clicks "Downgrade" in settings
- Confirmation modal: "You'll lose access to X, Y, Z features"
- Downgrade happens immediately (prorated credit applied to next bill)
- Email confirmation sent

**Cancellation Flow:**
- User clicks "Cancel Subscription"
- Retention offer: "Stay for 50% off next 3 months" (one-time offer)
- If declined: "Sorry to see you go, here's a survey" (Typeform)
- Cancellation effective end of billing period (not immediate)
- Export data button shown (CSV/JSON download)

### 7.4 Billing Edge Cases

**Failed Renewals:**
- Handled by Stripe Dunning (see 7.1)

**Chargebacks:**
- Stripe notifies via webhook
- Support engineer investigates: Was this fraud or legitimate dispute?
- If legitimate: Refund and apologize
- If fraud: Stripe Radar handles (auto-blocks suspicious charges)

**International Payments:**
- Stripe automatically handles currency conversion
- Display prices in customer's currency (Stripe API provides rates)
- Taxes calculated per region (Stripe Tax)

**Enterprise Custom Pricing:**
- Invoice sent manually (Stripe Invoicing)
- NET 30 payment terms
- Tech Lead handles negotiation (not Tom)

---

## 8. Growth (Scaling 10 → 100 → 1000 Customers)

### 8.1 Growth Loops (Self-Perpetuating)

**Loop 1: Content → SEO → Signups**
- Publish weekly blog posts (hire content writer, $200/post)
- Topics: "[Your niche] guide", "How to [job to be done]", "[competitor] alternative"
- SEO optimized (Ahrefs/Semrush)
- Each post links to signup page
- Goal: 1,000 organic visitors/month → 50 signups/month

**Loop 2: Users Invite Users**
- Team features (invite teammates)
- Incentive: "Invite 3 people, get 1 month free"
- Viral coefficient target: >0.5 (each user invites 0.5 more users)

**Loop 3: Affiliates/Referrals**
- Affiliate program: 20% recurring commission (Rewardful/PartnerStack)
- Recruit: YouTubers, bloggers, course creators in your niche
- Provide: Swipe copy, banners, demo access

### 8.2 Marketing Automation

**Tools:**
- Email: Customer.io (lifecycle emails)
- Ads: Google Ads + Facebook/LinkedIn (managed by agency or VA)
- CRM: Notion or HubSpot (track leads)

**Ad Strategy (Once Product-Market Fit Confirmed):**
- Budget: 20% of MRR
- Channels: Google Search (high intent), Facebook/LinkedIn (retargeting)
- Agency: Hire performance marketing agency ($1k/mo + ad spend)
- KPI: CAC < $150, LTV:CAC > 3:1

**Conversion Optimization:**
- A/B test landing page (Unbounce/VWO)
- Test: Headlines, pricing, CTAs
- Goal: Improve signup rate by 1% per month (compounds to +12% yearly)

### 8.3 Scaling Operations

**10 → 100 Customers (Year 1):**
- Team: Just Tom + 1 contract support engineer
- Support: <5 tickets/day, manageable with part-time support
- Focus: Product iteration, nail onboarding

**100 → 500 Customers (Year 2):**
- Hire: 1 full-time support engineer + 1 part-time tech lead
- Support: ~20 tickets/day
- Infrastructure: Upgrade hosting tier (~$500/mo)
- New role: "Customer Success Manager" (proactive outreach to high-value customers)

**500 → 1000 Customers (Year 3):**
- Team: 2-3 support engineers, 1 tech lead, 1 CSM
- Support: ~50 tickets/day
- Infrastructure: Dedicated database, load balancer (~$2k/mo)
- Consider: Hire Head of Ops (takes over this entire playbook)

### 8.4 Churn Reduction (Retention = Revenue)

**Why Customers Churn:**
1. Didn't onboard successfully (never got value)
2. Price too high (didn't see ROI)
3. Missing key feature
4. Competitor lured them away
5. Business shut down (unavoidable)

**Churn Prevention:**

**Red Flag Monitoring:**
- Usage dropped >50% week-over-week → Auto-email: "We noticed you're not using X anymore, need help?"
- Failed to complete onboarding → Phone call (support engineer)
- Support ticket unresolved >7 days → Manager escalation

**Win-Back Campaign (Cancelled Users):**
- Day 7: "We miss you! Here's what's new" (product updates)
- Day 30: "Come back for 50% off" (discount)
- Day 90: "Final offer: 3 months free" (aggressive)

**Churn Acceptable Rate:**
- Monthly churn: <5% is good, <3% is great
- Annual churn: <30% is good, <20% is great

**Net Revenue Retention (NRR):**
- Formula: (MRR at start of month + expansions - churn) / MRR at start
- Target: >100% (expansions exceed churn)
- This is how you get to $1M ARR

---

## 9. Tom's Role (Minimum Viable Involvement)

### 9.1 Weekly Commitment (2-4 hours)

**Monday (30 minutes):**
- Review dashboard: MRR, signups, churn
- Read support team summary: Top issues this week
- Check Slack: Any escalations?

**Wednesday (1 hour):**
- Product roadmap review: What's shipping next?
- Review top feature requests (from customers)
- Decide: Build, buy (integration), or ignore

**Friday (1 hour):**
- Financial review: Profit/loss, burn rate
- Approve any non-recurring expenses >$500
- Team check-in: Support engineer + Tech Lead (async Slack check-in)

**Ad-Hoc (1-2 hours):**
- Customer calls (optional): High-value prospects ($10k+ deals)
- Investor updates (if applicable)
- Strategic partnerships

### 9.2 What Tom Does NOT Do

❌ Answer support tickets  
❌ Fix bugs (unless Tom is the sole engineer)  
❌ Onboard customers manually  
❌ Process refunds  
❌ Write documentation  
❌ Monitor uptime at 3am  

### 9.3 Delegation Checklist

**Before Tom goes hands-off:**
- [ ] Support engineer hired and trained (has playbook)
- [ ] Tech lead on retainer (5-10 hr/week)
- [ ] All automations tested (email drips, billing, monitoring)
- [ ] Knowledge base has 20+ articles
- [ ] Runbooks written for common issues
- [ ] Emergency contact list (Tom's phone number is last resort)

---

## 10. Runbooks (Step-by-Step Response Plans)

### 10.1 Service Outage

**If: Website/API is down**

1. **Detect** (within 5 minutes via UptimeRobot)
2. **Alert** Tech Lead via SMS
3. **Investigate** (check Railway/Fly.io status, database connection)
4. **Fix** (restart server, rollback deploy, scale up)
5. **Communicate** (status page update: "We're investigating", then "Resolved")
6. **Post-Mortem** (write what happened, how we'll prevent it)

**Estimated Resolution Time:** 15-60 minutes

### 10.2 Payment Processing Failure

**If: Stripe webhook failing, customers not getting charged**

1. **Detect** (Stripe dashboard shows failed webhooks)
2. **Alert** Tech Lead
3. **Investigate** (check endpoint logs, Stripe webhook logs)
4. **Fix** (often: webhook URL misconfigured or server blocking Stripe IPs)
5. **Backfill** (manually trigger missed charges via Stripe API)
6. **Notify** affected customers (apologize, confirm they weren't double-charged)

**Estimated Resolution Time:** 1-4 hours

### 10.3 Data Loss/Corruption

**If: Customer reports missing data**

1. **Verify** (check database, is data actually gone?)
2. **Restore** (from most recent backup)
3. **Investigate** (how did this happen? Bug? User error?)
4. **Fix** (patch bug, add safeguards)
5. **Compensate** customer (refund 1 month, apologize profusely)

**Estimated Resolution Time:** 2-8 hours

### 10.4 Security Incident

**If: Breach suspected (unauthorized access, leaked credentials)**

1. **Contain** (revoke compromised credentials, block attacker IP)
2. **Investigate** (how did they get in? What data was accessed?)
3. **Notify** (email affected customers within 72 hours - GDPR requirement)
4. **Remediate** (patch vulnerability, force password resets)
5. **Report** (file breach report with relevant authorities if required)
6. **Post-Mortem** (update security practices)

**Estimated Resolution Time:** 4-48 hours

**Tom's Involvement:** Yes, for major breaches.

---

## 11. Key Metrics Dashboard (What to Track)

### 11.1 North Star Metric
**Active Paying Customers** - The single number that matters most.

### 11.2 Financial Metrics (Weekly)
- **MRR** (Monthly Recurring Revenue)
- **ARR** (Annual Recurring Revenue) = MRR × 12
- **New MRR** (from new customers)
- **Expansion MRR** (from upgrades)
- **Churned MRR** (from cancellations)
- **Net New MRR** = New + Expansion - Churned

**Profitability:**
- Gross Margin (aim for >80% for SaaS)
- Burn Rate (expenses per month)
- Runway (months until cash runs out)

### 11.3 Growth Metrics (Daily/Weekly)
- Signups (free trials started)
- Activations (completed onboarding)
- Trials → Paid Conversion Rate
- Customer Acquisition Cost (CAC)
- Customer Lifetime Value (LTV)
- LTV:CAC Ratio (target >3:1)

### 11.4 Product Metrics (Daily)
- Daily Active Users (DAU)
- Weekly Active Users (WAU)
- Monthly Active Users (MAU)
- Feature Usage (which features are used most?)
- Retention Curve (% of users still active after N days)

### 11.5 Support Metrics (Weekly)
- Ticket Volume
- First Response Time
- Resolution Time
- Customer Satisfaction Score (CSAT)
- Repeat Contact Rate (same customer, same issue = bad)

---

## 12. When to Hire (Scaling the Team)

### Hiring Triggers

**First Support Engineer:**
- When: >5 support tickets/day consistently
- Cost: $2k-3k/month (contract, 20-30 hr/week)

**Second Support Engineer:**
- When: First engineer is at capacity (>30 tickets/day)
- Cost: $2k-3k/month

**Technical Lead:**
- When: >2 production bugs per week or complex feature requests piling up
- Cost: $500-1k/month (10hr/week contract)

**Customer Success Manager:**
- When: >50 paying customers on annual plans
- Role: Proactive outreach, reduce churn, upsell
- Cost: $3k-5k/month (full-time)

**Head of Operations:**
- When: Tom is spending >10 hours/week on ops
- Role: Owns this entire playbook, manages support team
- Cost: $80k-120k/year (full-time)

**Marketing/Growth Lead:**
- When: Product-market fit proven, ready to scale ads
- Cost: $60k-100k/year + 20% of ad spend for agency

---

## 13. Emergency Contacts

**Always Available (24/7):**
- Hosting: Railway/Fly.io support (support@railway.app)
- Payment: Stripe support (stripe.com/support)
- Email: Postmark support

**Business Hours (9-5 local time):**
- Tech Lead: [Name] - [Phone] - [Email]
- Support Engineer: [Name] - [Email]

**Tom (Last Resort Only):**
- [Tom's Phone]
- Criteria: Service down >1 hour, data breach, legal issue

---

## 14. Quarterly Review (Continuous Improvement)

**Every 3 months, review:**

1. **Top 10 Support Issues:** Can these be eliminated via product/docs?
2. **Churn Interviews:** Call 5 churned customers, ask why they left
3. **Onboarding Funnel:** Where are people dropping off?
4. **Pricing Analysis:** Are we leaving money on the table?
5. **Infrastructure Costs:** Can we optimize/reduce spend?

**Update this playbook based on learnings.**

---

## Appendix: Tools Stack Summary

| Category | Tool | Cost | Why |
|----------|------|------|-----|
| **Hosting** | Railway/Fly.io | $50-500/mo | Easy deploys, auto-scaling |
| **Database** | Supabase/PlanetScale | $25-200/mo | Managed Postgres/MySQL |
| **Frontend** | Vercel | $20-100/mo | Zero-config, fast deploys |
| **Email (Transactional)** | Postmark | $15-100/mo | Reliable, great deliverability |
| **Email (Marketing)** | Customer.io | $150/mo | Drip campaigns, segmentation |
| **Support** | Help Scout | $50-200/mo | Clean UI, loved by support teams |
| **Chat** | Intercom | $74/mo | AI chatbot + human handoff |
| **Monitoring** | Sentry | $26/mo | Error tracking |
| **Uptime** | BetterUptime | $20/mo | Alerts, status page |
| **Payments** | Stripe | 2.9%+30¢/txn | Industry standard |
| **Onboarding** | Appcues | $249/mo | Product tours |
| **Docs** | Gitbook | $0-100/mo | Beautiful knowledge base |
| **Analytics** | Stripe + Metabase | $0 | Business metrics |

**Total: ~$800-1500/mo for 100-500 customers**

---

## Final Checklist: Ready for Hands-Off?

- [ ] Trial signup takes <2 minutes, no human needed
- [ ] Onboarding email sequence is live (7 emails)
- [ ] Knowledge base has 20+ articles covering 80% of questions
- [ ] AI chatbot resolves >50% of queries
- [ ] Support engineer hired and has playbook
- [ ] Tech lead on retainer for escalations
- [ ] Stripe billing is fully automated (including dunning)
- [ ] Monitoring alerts go to Slack + SMS (not just Tom)
- [ ] All runbooks tested (simulate outage, payment failure, etc.)
- [ ] Dashboard shows key metrics (Tom checks weekly)
- [ ] Tom has not answered a support ticket in 30 days

**If all boxes checked: Tom is successfully hands-off. The business runs itself.**

---

**Last Updated:** 2026-01-26  
**Owner:** Tom  
**Maintained By:** Head of Operations (future hire) or Tech Lead  
**Review Cadence:** Quarterly

---

*This is a living document. Update it as you learn what works. Share it with your team. This is how you build a business that doesn't need you.*