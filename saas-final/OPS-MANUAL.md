# Operations Manual - Running Clawdbot SaaS Hands-Off

**Owner:** Tom  
**Last Updated:** February 4, 2026  
**Status:** Production-Ready

---

## Philosophy: Zero-Touch Operations

**Goal:** Tom wakes up to revenue, not problems.

**How:**
- Automated provisioning (no manual setups)
- Automated billing (Stripe handles everything)
- Automated support (docs + chatbot + community)
- Automated monitoring (alerts only if critical)
- Automated scaling (Convex + Railway auto-scale)

**Tom's role:** Strategic decisions, partnerships, content. Not operations.

---

## System Architecture

### Customer Lifecycle (Automated)

```
1. Sign Up → Stripe Checkout → Webhook
2. Payment Success → Convex Function → Provision Instance
3. Instance Ready (2 min) → SendGrid → Welcome Email
4. Customer Logs In → Dashboard → Connect Integrations (Self-Service)
5. Agent Activated → Mission Control → Heartbeat Monitoring Starts
6. Monthly Billing → Stripe → Auto-Charge (Retry 3x if fails)
7. Churn → Stripe → Suspend Account (Keep data 30 days)
```

**Tom's involvement:** ZERO (unless customer emails support)

---

## Daily Operations (10 Minutes/Day)

### Morning Check (5 min) - 08:00 NZDT

**Dashboard Review:**
- [ ] Open: dashboard.clawdbot.com/admin
- [ ] Check: Signups overnight (green = 2+, yellow = 1, red = 0)
- [ ] Check: MRR growth (green = +5%, yellow = flat, red = negative)
- [ ] Check: System health (green = 99%+ uptime)
- [ ] Check: Support tickets (red flag if >5 pending)

**Action Required Only If:**
- 🔴 System down (uptime <95%) → Check status.clawdbot.com, escalate to Railway
- 🔴 Payment failures >10% → Check Stripe logs, email Stripe support
- 🔴 Customer complaints in Discord → Respond personally (VIP treatment)
- 🟢 Everything else → Automated systems handle it

### Evening Check (5 min) - 20:00 NZDT

**Metrics Review:**
- [ ] Stripe dashboard: Today's revenue (celebrate if >$200)
- [ ] Analytics: Traffic trends (Google Analytics)
- [ ] Social mentions: Twitter/LinkedIn (reply to @mentions)
- [ ] Community: Discord activity (no response needed unless tagged)

**Action Required Only If:**
- 🔴 Negative social sentiment (complaints going viral) → Public response
- 🔴 Major bug reported by >3 customers → Emergency fix
- 🟢 Everything else → Let it run

---

## Weekly Operations (1 Hour/Week)

### Monday Morning (30 min) - Strategic Review

**Revenue Check:**
- [ ] Open: Stripe dashboard
- [ ] Calculate: Week-over-week MRR growth
- [ ] Identify: Top customer tier (optimize for that segment)
- [ ] Analyze: Churn rate (if >10%, dig into reasons)

**Customer Success:**
- [ ] Review: NPS scores (from automated surveys)
- [ ] Read: Top 3 feature requests (convex.dev/admin → feature_requests table)
- [ ] Decide: Which 1 feature to build this week (max 1, stay focused)

**Content Planning:**
- [ ] Draft: 1 LinkedIn post for this week (results, lessons, story)
- [ ] Schedule: 3 Twitter threads (Hootsuite/Buffer)
- [ ] Plan: 1 blog post topic (write or delegate to VA)

### Friday Evening (30 min) - Week Wrap

**Wins Celebration:**
- [ ] Count: New customers this week
- [ ] Calculate: Total MRR (vs last week)
- [ ] Screenshot: Growth graphs (share on social)
- [ ] Post: "Week X results" to LinkedIn (transparency builds trust)

**Lessons Learned:**
- [ ] Log: What worked this week (traffic sources, content, outreach)
- [ ] Log: What didn't work (failed experiments, bad ads)
- [ ] Update: OPS-MANUAL.md with new learnings (compound knowledge)

---

## Monthly Operations (2 Hours/Month)

### First Monday of Month (1 hour)

**Financial Review:**
- [ ] Stripe: Total MRR, churn %, new customers
- [ ] Expenses: Convex ($X), Railway ($Y), SendGrid ($Z), ads ($W)
- [ ] Profit: MRR - Expenses = Net Profit
- [ ] Trend: Month-over-month growth (goal: +20%)

**Roadmap Planning:**
- [ ] Review: Top 10 feature requests (by vote count)
- [ ] Choose: 1-2 features to build this month
- [ ] Delegate: Spec to developer or build yourself
- [ ] Announce: "February roadmap" in Discord (transparency)

**Content Calendar:**
- [ ] Plan: 4 blog posts for this month
- [ ] Plan: 12 LinkedIn posts (3/week)
- [ ] Plan: 20 Twitter threads (5/week)
- [ ] Schedule: Everything in Hootsuite/Buffer (batch work)

### Last Friday of Month (1 hour)

**Case Study Creation:**
- [ ] Pick: 2 happiest customers (highest engagement)
- [ ] Interview: 30-minute calls (record + transcribe)
- [ ] Write: Case studies (before/after, ROI, testimonial)
- [ ] Publish: blog.clawdbot.com + share on social

**Investor Update (Optional):**
- [ ] Metrics: MRR, customers, churn, CAC, LTV
- [ ] Milestones: This month's wins
- [ ] Challenges: What's hard right now
- [ ] Asks: Intros, advice, capital (if raising)

---

## Automated Systems (Zero Tom Time)

### 1. Provisioning (Convex Functions)

**Trigger:** Stripe webhook (`checkout.session.completed`)  
**Process:**
1. Create Convex user account (email, tier, billing info)
2. Deploy Mission Control instance (Railway API)
3. Configure default skills (email, calendar, research)
4. Enable Heartbeat (2x daily cron)
5. Generate API keys (for customer integrations)
6. Send welcome email (SendGrid template)

**Failure Handling:**
- Retry 3x (exponential backoff)
- If still fails → Refund customer + email Tom
- Log error to Sentry

**Tom's involvement:** Zero (unless 3 retries fail)

### 2. Billing (Stripe Subscriptions)

**Monthly Cycle:**
1. Stripe attempts charge (day of month they signed up)
2. Success → Invoice sent, subscription continues
3. Failure → Retry in 3 days
4. Failure again → Retry in 7 days (total 3 attempts)
5. Third failure → Suspend account, email customer

**Dunning Management:**
- Email 1 (Day 0): "Payment failed, please update card"
- Email 2 (Day 3): "Second attempt in 3 days, update card to avoid suspension"
- Email 3 (Day 7): "Final attempt tomorrow, update card now"
- Email 4 (Day 10): "Account suspended, update card to reactivate"

**Tom's involvement:** Zero (Stripe automation handles everything)

### 3. Customer Support (Tiered)

**Tier 1: Knowledge Base (Self-Service)**
- docs.clawdbot.com (searchable)
- 50+ articles covering common questions
- Video tutorials for each integration
- Troubleshooting guides

**Tier 2: Chatbot (Intercom/Crisp)**
- AI-powered chatbot (trained on docs)
- Answers 80% of questions instantly
- Collects context, escalates to human if needed

**Tier 3: Community (Discord)**
- Other customers help each other
- Tom/team chime in occasionally
- FAQ bot auto-responds to common questions

**Tier 4: Email Support (support@clawdbot.com)**
- Automated triage (urgent vs non-urgent)
- Response SLA: 24 hours (or less)
- Tom handles personally (for now) or delegates to VA

**Tom's involvement:** Only Tier 4 emails that need technical expertise

### 4. Monitoring (Automated Alerts)

**What Gets Monitored:**
- Uptime (status.clawdbot.com via UptimeRobot)
- Error rates (Sentry)
- Payment success rate (Stripe)
- Provisioning success rate (Convex logs)
- API response times (Railway metrics)

**Alert Thresholds:**
- 🔴 Critical: Uptime <95%, error rate >10%, payment success <85%
- 🟡 Warning: Uptime 95-98%, error rate 5-10%, payment success 85-90%
- 🟢 Healthy: Uptime >98%, error rate <5%, payment success >90%

**Alert Channels:**
- Critical → Tom's phone (SMS via Twilio)
- Warning → Tom's email
- Healthy → No alerts (silence is golden)

**Tom's involvement:** Only if critical alert (rare)

### 5. Scaling (Auto-Managed)

**Convex:**
- Auto-scales to handle traffic
- No config needed
- Pay for usage (transparent pricing)

**Railway:**
- Auto-scales based on CPU/memory
- Set max instances (e.g., 10) to cap costs
- Alerts if approaching limit

**SendGrid:**
- 100k emails/month (free tier)
- Upgrade if needed (automated)

**Tom's involvement:** Zero (unless hitting scale limits, then upgrade plan)

---

## Emergency Procedures

### Severity 1: System Down (Uptime <90%)

**Symptoms:**
- status.clawdbot.com shows red
- Multiple customers reporting issues
- Convex/Railway dashboard shows errors

**Response Protocol:**
1. Check status pages: Convex, Railway, Stripe
2. If third-party outage → Post to Discord ("We're monitoring [PROVIDER] outage")
3. If our code → Check Sentry errors, roll back recent deploy
4. If database → Check Convex logs, contact support
5. Keep customers updated every 30 min

**Resolution Time:** <2 hours (critical)

### Severity 2: Payment Issues (Success <85%)

**Symptoms:**
- Stripe dashboard shows high failure rate
- Multiple "payment failed" support tickets

**Response Protocol:**
1. Check Stripe logs (error codes)
2. If fraud flags → Contact Stripe risk team
3. If billing errors → Fix code, retry failed charges
4. If card issues → Email affected customers

**Resolution Time:** <24 hours

### Severity 3: Provisioning Failures (Success <90%)

**Symptoms:**
- Customers report "signup successful but can't log in"
- Convex logs show provisioning errors

**Response Protocol:**
1. Check Railway API status
2. Check Convex function logs
3. Manually provision failed accounts (temporary fix)
4. Fix root cause, redeploy
5. Refund affected customers (goodwill)

**Resolution Time:** <4 hours

### Severity 4: Security Breach

**Symptoms:**
- Unusual API activity
- Customer reports unauthorized access
- Security researcher reports vulnerability

**Response Protocol:**
1. IMMEDIATE: Rotate all API keys
2. IMMEDIATE: Force password reset for all users
3. Investigate breach (logs, Sentry)
4. Patch vulnerability
5. Public disclosure (transparency)
6. Offer affected customers: Free month + credit monitoring

**Resolution Time:** <1 hour (containment), <24 hours (full response)

---

## Metrics Dashboard (What Tom Tracks)

### Daily Metrics (Quick Glance)
- **New Signups:** Goal >2/day
- **MRR:** Goal +$200/day (first month), +$500/day (after 3 months)
- **Churn:** Goal <5%/month
- **Uptime:** Goal >99%

### Weekly Metrics (Strategic)
- **Customer Count:** Track total active subscriptions
- **Revenue Growth:** Week-over-week % change
- **CAC:** Cost to acquire customer (ads + time)
- **LTV:CAC Ratio:** Goal >3:1 (sustainable)

### Monthly Metrics (Business Health)
- **MRR:** Total monthly recurring revenue
- **Churn Rate:** % customers who cancel
- **Net MRR Growth:** New MRR - Churned MRR
- **Runway:** Cash in bank / Monthly burn rate

---

## Delegation Strategy (When to Hire)

### First Hire: Virtual Assistant ($5-10/hour, 20 hours/week)
**Trigger:** When support tickets >10/day OR Tom spending >5 hours/week on support

**Responsibilities:**
- Answer Tier 4 support emails (non-technical)
- Onboard new customers (welcome calls)
- Create knowledge base articles
- Moderate Discord community

**Hire From:** Upwork, OnlineJobs.ph (Philippines)  
**Cost:** $800-1,600/month

### Second Hire: Developer ($30-50/hour, Part-Time)
**Trigger:** When feature backlog >10 items OR revenue >$15k MRR

**Responsibilities:**
- Build new features (based on roadmap)
- Fix bugs (non-critical)
- Write tests
- Document code

**Hire From:** Upwork, Toptal (vetted)  
**Cost:** $2,400-4,000/month (20 hours/week)

### Third Hire: Marketing VA ($10-15/hour, 20 hours/week)
**Trigger:** When revenue >$25k MRR OR Tom spending >10 hours/week on content

**Responsibilities:**
- Write blog posts (Tom provides outlines)
- Create social media content
- Manage communities (Reddit, Discord)
- Outreach to partnerships

**Hire From:** Upwork, Contra  
**Cost:** $1,600-2,400/month

---

## Financial Targets

### Month 1 (February)
- **Goal:** $5,000 MRR
- **Customers:** 10-15
- **Churn:** <10% (expected for early product)
- **Expenses:** $500 (infra + ads)
- **Profit:** $4,500

### Month 3 (April)
- **Goal:** $15,000 MRR
- **Customers:** 30-40
- **Churn:** <5%
- **Expenses:** $2,000 (infra + ads + VA)
- **Profit:** $13,000

### Month 6 (July)
- **Goal:** $30,000 MRR
- **Customers:** 60-80
- **Churn:** <5%
- **Expenses:** $5,000 (infra + ads + team)
- **Profit:** $25,000

### Month 12 (January 2027)
- **Goal:** $60,000 MRR
- **Customers:** 120-150
- **Churn:** <3%
- **Expenses:** $15,000 (team + infra + marketing)
- **Profit:** $45,000

---

## Exit Strategy (Optional)

### When to Consider Selling

**Triggers:**
- MRR >$50k consistently (6+ months)
- Churn <3% (healthy business)
- Growing >10% MoM (momentum)
- Profitable (not burning cash)

**Valuation Multiples:**
- SaaS industry standard: 5-10x ARR
- Example: $60k MRR = $720k ARR → $3.6M-7.2M valuation

**Platforms:**
- Acquire.com (SaaS marketplace)
- MicroAcquire (smaller exits)
- Empire Flippers (established)
- Direct outreach (strategic buyers)

### When to Keep Building

**Keep building if:**
- Having fun
- Growing fast
- Profitable
- Still learning

**No rush to exit. Build, learn, scale, enjoy.**

---

## Tom's Weekly Schedule (10 Hours/Week)

### Monday (2 hours)
- 08:00-09:00: Dashboard review + metrics
- 09:00-10:00: Strategic planning (what to focus on this week)

### Tuesday (2 hours)
- 14:00-15:00: Customer calls (happy customers, case studies)
- 15:00-16:00: Support emails (anything VA couldn't handle)

### Wednesday (2 hours)
- 10:00-11:00: Content creation (LinkedIn post, Twitter thread)
- 11:00-12:00: Community engagement (Discord, Reddit)

### Thursday (2 hours)
- 14:00-15:00: Partnerships (outreach, negotiations)
- 15:00-16:00: Product decisions (roadmap, features)

### Friday (2 hours)
- 16:00-17:00: Week wrap (review wins, lessons)
- 17:00-18:00: Content scheduling (next week's posts)

**Weekend:** OFF (unless emergency)

**Total:** 10 hours/week = Tom's hands-off goal achieved ✅

---

## Troubleshooting Common Issues

### Issue: Low Conversion (Visitors → Customers <2%)

**Diagnosis:**
- Check: Sales page clarity (is value clear?)
- Check: Pricing page (too expensive? confusing?)
- Check: Social proof (any testimonials?)
- Check: Trust signals (secure badges, guarantees?)

**Fixes:**
- Add video demo to homepage
- Add 14-day money-back guarantee
- Add live chat support
- A/B test pricing (lower Starter tier?)

### Issue: High Churn (>10%/month)

**Diagnosis:**
- Survey: Why are customers leaving? (automated exit survey)
- Analyze: Which customers churn (tier, usage, tenure)
- Check: Are they using the product? (engagement metrics)

**Fixes:**
- Improve onboarding (reduce time to first value)
- Add customer success check-ins (proactive support)
- Build requested features (listen to feedback)
- Offer annual plans (12-month commitment = less churn)

### Issue: Slow Growth (<10 Customers/Month)

**Diagnosis:**
- Check: Traffic (are people visiting?)
- Check: Conversion (are visitors signing up?)
- Check: Channels (which sources work?)

**Fixes:**
- Double down on top channel (Reddit? LinkedIn? Ads?)
- Launch affiliate program (customers refer friends)
- Create viral content (controversial takes, transparency)
- Partner with complementary tools (cross-promote)

---

## Key Learnings (Update Regularly)

### What Works
- **Transparency:** Posting revenue publicly builds trust
- **Community:** Discord keeps customers engaged
- **Self-Service:** Docs + chatbot reduce support burden
- **Automation:** Convex + Stripe = zero manual work

### What Doesn't Work
- **Cold outreach:** Low conversion, high effort
- **Generic content:** Doesn't go viral, wastes time
- **Over-building:** Ship fast, iterate based on feedback

### Biggest Surprises
- (Update after Week 1)
- (Update after Month 1)
- (Update after Month 3)

---

## Resources & Links

**Customer-Facing:**
- Sales Page: https://clawdbot.com
- Pricing: https://clawdbot.com/pricing
- Docs: https://docs.clawdbot.com
- Status: https://status.clawdbot.com
- Community: https://discord.gg/clawdbot

**Admin:**
- Stripe: https://dashboard.stripe.com
- Convex: https://convex.dev/admin
- Railway: https://railway.app/dashboard
- Analytics: https://analytics.google.com
- Sentry: https://sentry.io/clawdbot

**Support:**
- Email: support@clawdbot.com
- Discord: https://discord.gg/clawdbot
- Knowledge Base: https://docs.clawdbot.com

---

## Final Notes

**Remember:**
- Automate everything you can
- Delegate everything else
- Only do what only you can do (strategy, vision, big decisions)
- Celebrate wins (revenue, customers, learning)
- Rest (burnout kills businesses)

**This is a marathon, not a sprint.**

Build sustainably. Enjoy the journey. Make it profitable AND fun.

You got this, Tom. 🚀

---

**Built by:** Subagent (saas-final-build)  
**For:** Tom (Clawdbot CEO)  
**Status:** Ready to Use ✅
