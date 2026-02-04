# Launch Checklist - Feb 14, 2026

**Goal:** Ship Clawdbot Premium SaaS in 10 days  
**Target:** Valentine's Day Launch 🚀  
**Tagline:** "Fall in love with your AI agent"

---

## DAY 1: Tuesday Feb 4 - Infrastructure ⚙️

### Morning (4 hours)
- [ ] **Create Neon PostgreSQL database** (30 min)
  - Sign up: neon.tech
  - Create project: "clawdbot-production"
  - Copy connection string
  - Save to password manager

- [ ] **Run database migration** (15 min)
  ```bash
  psql "postgresql://..." < automation-system/db/schema.sql
  ```
  - Verify tables created: `customers`, `agents`, `deployments`, `subscriptions`, `usage_analytics`

- [ ] **Configure Stripe products** (1 hour)
  - Login: stripe.com
  - Switch to TEST MODE
  - Create products:
    - Clawdbot Starter: $199/mo + $299 setup
    - Clawdbot Professional: $499/mo + $599 setup  
    - Clawdbot Enterprise: $999/mo + $999 setup
  - Copy price IDs to `.env`

- [ ] **Setup Railway account** (1 hour)
  - Sign up: railway.app
  - Create team account
  - Create project: "clawdbot-provisioning-api"
  - Connect GitHub repo (automation-system/)
  - Add environment variables (from .env.example)
  - Deploy API server
  - Test health endpoint: `https://your-app.railway.app/health`

- [ ] **Configure Resend** (30 min)
  - Sign up: resend.com
  - Verify domain: setupclaw.com
  - Get API key
  - Test email:
    ```bash
    curl -X POST https://api.resend.com/emails \
      -H "Authorization: Bearer YOUR_KEY" \
      -H "Content-Type: application/json" \
      -d '{"from":"onboarding@setupclaw.com","to":"tom@example.com","subject":"Test","text":"Works!"}'
    ```

### Afternoon (4 hours)
- [ ] **Integrate Railway API** (2 hours)
  - Get Railway API token (Settings → Tokens)
  - Update `provision/deployer.js`:
    - Replace stub with real Railway API calls
    - Use `@railway/cli` or fetch API
  - Test container deployment:
    ```bash
    npm run provision:test starter
    ```
  - Verify container created in Railway dashboard

- [ ] **End-to-end test** (2 hours)
  - Install Stripe CLI: `brew install stripe/stripe-cli/stripe`
  - Forward webhooks: `stripe listen --forward-to localhost:3001/api/webhooks/stripe`
  - Create test checkout session (Stripe dashboard)
  - Complete checkout with test card: `4242 4242 4242 4242`
  - Watch provisioning logs
  - Verify:
    - ✅ Database record created
    - ✅ Container deployed to Railway
    - ✅ Welcome email received
    - ✅ Agent health check passes

### End of Day Status
- [ ] Backend working end-to-end
- [ ] Can manually trigger provisioning
- [ ] Ready to build dashboard

---

## DAY 2: Wednesday Feb 5 - Dashboard 📊

### Morning (4 hours)
- [ ] **Initialize Next.js project** (1 hour)
  ```bash
  cd automation-system/dashboard
  npx create-next-app@latest . --typescript --tailwind --app
  npm install next-auth@beta prisma @prisma/client stripe resend axios swr recharts
  npx prisma init
  ```

- [ ] **Setup NextAuth** (1.5 hours)
  - Create `app/api/auth/[...nextauth]/route.ts`
  - Configure Resend email provider
  - Create login page: `app/login/page.tsx`
  - Test magic link flow:
    1. Enter email → link sent
    2. Click link → redirected to dashboard
    3. Session stored (check cookies)

- [ ] **Build agent status page** (1.5 hours)
  - Create `app/dashboard/page.tsx`
  - Fetch agent status from API:
    ```typescript
    const { data } = useSWR('/api/agent/status', fetcher);
    ```
  - Display:
    - Status badge (🟢 Ready / 🟡 Provisioning / 🔴 Error)
    - Tier (Starter/Pro/Enterprise)
    - Deployment URL
    - Uptime (mock for now)
  - Add buttons:
    - "View Logs" → opens Railway logs
    - "Restart Agent" → calls `/api/agent/restart`

### Afternoon (4 hours)
- [ ] **Build billing page** (2 hours)
  - Create `app/dashboard/billing/page.tsx`
  - Show current plan:
    - Tier name
    - Price per month
    - Next billing date
    - Payment method (last 4 digits)
  - Embed Stripe Customer Portal:
    ```typescript
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: 'https://dashboard.setupclaw.com/billing',
    });
    ```
  - Add upgrade CTA (if not Enterprise)

- [ ] **Deploy dashboard** (1 hour)
  - Push to GitHub
  - Connect to Vercel
  - Configure environment variables
  - Deploy: `vercel --prod`
  - Test production deployment

- [ ] **Create welcome flow** (1 hour)
  - Create `app/welcome/page.tsx`
  - Show provisioning status:
    - "Your agent is being deployed... ⏱️"
    - Progress bar (fake animation for now)
    - Refresh every 10s to check status
  - When ready:
    - "Your agent is ready! 🎉"
    - Link to setup guides
    - "Connect WhatsApp" CTA
  - Update welcome email to link to `/welcome`

### End of Day Status
- [ ] Dashboard live and functional
- [ ] Users can login and see agent status
- [ ] Billing management works
- [ ] MVP complete 🎉

---

## DAY 3: Thursday Feb 6 - Analytics & Settings 📈

### Morning (4 hours)
- [ ] **Build analytics dashboard** (3 hours)
  - Create `app/dashboard/analytics/page.tsx`
  - Mock data for now (real metrics later):
    ```typescript
    const usage = {
      messages_sent: 234,
      tasks_completed: 42,
      time_saved_hours: 18.5,
      skills_used: { email: 45, research: 28, calendar: 19 }
    };
    ```
  - Build charts:
    - Messages over time (line chart)
    - Skills usage (bar chart)
    - Time saved (big number + trend)
  - Use `recharts` library

- [ ] **Add quick stats to main dashboard** (1 hour)
  - Update `app/dashboard/page.tsx`
  - Add stats cards:
    - "42 tasks completed this week"
    - "18.5 hours saved"
    - "234 messages exchanged"

### Afternoon (4 hours)
- [ ] **Build settings page** (2 hours)
  - Create `app/dashboard/settings/page.tsx`
  - Channel configuration:
    - WhatsApp: Connected ✅ / Setup →
    - Telegram: Connected ✅ / Setup →
    - Slack: Connected ✅ / Setup → (Pro/Enterprise only)
  - Notification preferences:
    - Email me when agent is down
    - Weekly usage reports
    - Monthly ROI summaries
  - Danger zone:
    - "Pause Agent" (suspend billing)
    - "Delete Agent" (confirmation modal)

- [ ] **UI/UX polish** (2 hours)
  - Add loading skeletons
  - Error states (friendly messages)
  - Success toasts (on actions)
  - Mobile responsive (test on phone)
  - Dark mode toggle (optional)

### End of Day Status
- [ ] Dashboard feels professional
- [ ] Analytics show usage
- [ ] Settings allow customization

---

## DAY 4: Friday Feb 7 - Marketing Site 🌐

### Morning (4 hours)
- [ ] **Build landing page** (4 hours)
  - Create new Next.js project: `setupclaw-marketing/`
  - Pages:
    - `/` - Hero + Features + Pricing + CTA
    - `/pricing` - Tier comparison table
    - `/setup` - Integration guides
  - Sections:
    - **Hero:** "Your Personal AI Agent, Fully Managed"
    - **Problem:** "Hiring a VA costs $2k/mo. Clawdbot is $199/mo."
    - **Features:** List 8-10 key capabilities
    - **Pricing:** 3-column comparison (Starter/Pro/Enterprise)
    - **Testimonials:** Mock for now (real ones post-launch)
    - **CTA:** Big "Get Started" button → Stripe checkout
  - Use Tailwind UI components (free)

### Afternoon (4 hours)
- [ ] **Build setup guides** (2 hours)
  - Create `/setup/whatsapp` page:
    - Step-by-step with screenshots
    - QR code for WhatsApp Business API
    - Expected time: 5 minutes
  - Create `/setup/telegram` page:
    - How to create bot token
    - Add bot to group
    - Configure permissions
  - Create `/setup/slack` page:
    - OAuth flow
    - Channel permissions
    - Bot setup

- [ ] **Deploy marketing site** (1 hour)
  - Push to GitHub
  - Deploy to Vercel
  - Configure domain: setupclaw.com
  - Point A record to Vercel
  - Wait for SSL cert (auto)

- [ ] **Test checkout flow** (1 hour)
  - Click "Get Started" on homepage
  - Goes to Stripe checkout
  - Complete test purchase
  - Redirected to `/welcome`
  - Watch provisioning happen
  - Receive welcome email
  - Login to dashboard

### End of Day Status
- [ ] Marketing site live
- [ ] Setup guides published
- [ ] End-to-end flow working

---

## DAY 5-6: Weekend - Testing & Beta 🧪

### Saturday Feb 8 (4-6 hours)
- [ ] **Write unit tests** (2 hours)
  ```bash
  cd automation-system
  npm install --save-dev jest @testing-library/react
  ```
  - Test provisioning orchestrator
  - Test config generator (all 3 tiers)
  - Test skills installer
  - Run: `npm test`

- [ ] **Write integration tests** (2 hours)
  - Test Stripe webhook → database
  - Test provisioning → Railway deployment
  - Test email sending
  - Mock external APIs

- [ ] **Setup monitoring** (1 hour)
  - Sentry for error tracking
  - UptimeRobot for health checks
  - Stripe webhook monitoring
  - Alert rules:
    - Email Tom if provisioning fails
    - Email Tom if agent down >5 min

### Sunday Feb 9 (4-6 hours)
- [ ] **Invite 3 beta testers** (1 hour)
  - Email 3 friends/colleagues
  - Give them test Stripe cards
  - Ask them to sign up live (screenshare)

- [ ] **Watch beta signups** (2 hours)
  - Observe where they get confused
  - Note any bugs or errors
  - Ask for verbal feedback

- [ ] **Fix critical issues** (2 hours)
  - Prioritize: P0 (blocks signup) > P1 (annoying) > P2 (minor)
  - Fix P0 and P1 issues immediately
  - Document P2 for post-launch

- [ ] **Collect feedback** (1 hour)
  - What was confusing?
  - What surprised you (good or bad)?
  - Would you pay for this?
  - What's missing?

### End of Weekend Status
- [ ] Beta-tested with 3 real users
- [ ] Critical bugs fixed
- [ ] Monitoring enabled

---

## DAY 7: Monday Feb 10 - Documentation 📖

### All Day (6-8 hours)
- [ ] **Write user onboarding guide** (2 hours)
  - "Welcome to Clawdbot" video (Loom)
  - Quick-start checklist:
    - ✅ Connect WhatsApp/Telegram
    - ✅ Send your first message
    - ✅ Try 3 core skills
    - ✅ Review daily summary
  - Common tasks guide:
    - How to check email
    - How to schedule calendar events
    - How to research topics
    - How to track finances

- [ ] **Write troubleshooting FAQ** (2 hours)
  - "My agent isn't responding"
  - "How do I connect WhatsApp?"
  - "How do I upgrade my plan?"
  - "How do I pause my subscription?"
  - "How do I delete my account?"
  - "Who do I contact for support?"

- [ ] **Create support ticket templates** (1 hour)
  - Auto-responses for common issues
  - Escalation rules (when to alert Tom)
  - SLA by tier:
    - Starter: 24 hours
    - Pro: 4 hours
    - Enterprise: 1 hour

- [ ] **Write admin runbook** (2 hours)
  - How to manually provision an agent
  - How to restart an agent
  - How to refund a customer
  - How to upgrade/downgrade a tier
  - How to investigate provisioning failures
  - Emergency contacts (Railway, Stripe support)

- [ ] **Setup support email** (30 min)
  - Create support@setupclaw.com
  - Forward to Tom's inbox
  - Add auto-reply: "We received your ticket"

### End of Day Status
- [ ] Documentation complete
- [ ] Support system ready
- [ ] Tom can handle edge cases

---

## DAY 8: Tuesday Feb 11 - Buffer Day 🛠️

### Purpose
Catch up on anything that's behind schedule or needs polish.

### Tasks (as needed)
- [ ] **Finish incomplete features**
- [ ] **Fix remaining bugs** (P1 and P2)
- [ ] **Polish UI/UX**
- [ ] **Add missing documentation**
- [ ] **Test edge cases**:
  - What if provisioning fails?
  - What if payment fails?
  - What if user deletes agent immediately?
- [ ] **Rehearse launch**:
  - Tweet draft ready
  - Email copy written
  - Launch checklist prepared

### End of Day Status
- [ ] Everything ready to launch
- [ ] No critical issues
- [ ] Marketing materials prepared

---

## DAY 9: Wednesday Feb 12 - Pre-Launch Prep 📣

### Morning (4 hours)
- [ ] **Write launch announcement** (1 hour)
  - Twitter thread (10 tweets):
    1. Hook: "I spent $2k/mo on a VA. Now I spend $199/mo on Clawdbot."
    2. Problem: VAs are expensive, slow to onboard, hard to manage
    3. Solution: AI agent, fully managed, ready in 1 hour
    4. How it works: Signup → Pay → Agent deployed (automated)
    5. Use cases: Email, calendar, research, social media
    6. Pricing: 3 tiers with comparison
    7. Testimonial: (beta tester quote)
    8. Launch offer: First 50 customers get $100 off setup fee
    9. CTA: setupclaw.com
    10. Follow-up: Will share customer stories this week
  - Email copy for warm leads
  - Reddit post for r/entrepreneur, r/SaaS
  - Product Hunt draft

- [ ] **Prepare marketing assets** (2 hours)
  - Screenshots of dashboard
  - Demo video (Loom, 2 minutes):
    - Signup flow
    - Agent deployed
    - Send first message
    - Check dashboard
  - Social media images (Canva)
  - Launch checklist

- [ ] **Email warmup list** (1 hour)
  - List of 50 warm leads (friends, colleagues, Twitter followers)
  - Personalized email:
    > "Hey [Name], I'm launching Clawdbot tomorrow - your personal AI agent, fully managed for $199/mo. I'd love for you to be one of the first 10 customers. Here's a $100 discount code: EARLY100. Check it out: setupclaw.com"

### Afternoon (4 hours)
- [ ] **Setup analytics** (1 hour)
  - Plausible or Fathom (privacy-friendly)
  - Track:
    - Homepage visits
    - Pricing page visits
    - Checkout starts
    - Checkout completions
    - Dashboard logins
  - Setup conversion funnel

- [ ] **Final testing** (2 hours)
  - Full customer journey (fresh browser):
    1. Land on setupclaw.com
    2. Click "Get Started"
    3. Stripe checkout
    4. Welcome page
    5. Email received
    6. Login to dashboard
    7. Agent ready
    8. Connect WhatsApp
    9. Send message
  - Test on mobile
  - Test on different browsers
  - Fix any issues

- [ ] **Switch Stripe to LIVE mode** (30 min)
  - Stripe dashboard → toggle to LIVE
  - Update environment variables (LIVE keys)
  - Create LIVE products (same as TEST)
  - Update webhook to LIVE endpoint
  - Test with real $1 charge (refund immediately)

- [ ] **Pre-launch checklist** (30 min)
  - [ ] All tests passing
  - [ ] Monitoring enabled
  - [ ] Support email working
  - [ ] Marketing site live
  - [ ] Dashboard live
  - [ ] Stripe LIVE mode
  - [ ] Social media posts scheduled
  - [ ] Email drafts ready

### End of Day Status
- [ ] Ready to launch tomorrow
- [ ] Marketing materials ready
- [ ] Everything tested

---

## DAY 10: Thursday Feb 13 - Soft Launch 🚀

### Morning (4 hours)
- [ ] **Launch to inner circle** (9am)
  - Send emails to 50 warm leads
  - Tweet launch announcement
  - Post in relevant Slack/Discord communities
  - Post in r/entrepreneur (be helpful, not spammy)

- [ ] **Monitor closely** (10am-1pm)
  - Watch for signups in Stripe dashboard
  - Check provisioning logs (Railway)
  - Respond to questions on Twitter
  - Reply to support emails immediately

### Afternoon (4 hours)
- [ ] **First customer support** (2pm-6pm)
  - Help customers set up WhatsApp/Telegram
  - Answer questions about features
  - Fix any urgent bugs
  - Collect feedback

### Evening
- [ ] **Review Day 1 metrics** (6pm)
  - Signups: Target 5-10
  - Conversions: Target 50% (5 paid customers)
  - Provisioning success rate: Target >90%
  - Support tickets: Target <3 per customer

### End of Day Status
- [ ] First 5 paying customers ✅
- [ ] No critical issues
- [ ] Ready for public launch tomorrow

---

## DAY 11: Friday Feb 14 - PUBLIC LAUNCH 💘

### Morning (9am)
- [ ] **Launch tweet** (Valentine's Day theme)
  > "💘 LAUNCHING TODAY: Fall in love with your AI agent. Clawdbot manages your email, calendar, research - everything a $2k/mo VA does, for $199/mo. Fully managed, ready in 1 hour. Special Valentine's offer: First 100 customers get $100 off setup. setupclaw.com"

- [ ] **Submit to Product Hunt** (9:30am)
  - Launch post with demo video
  - Ask friends to upvote/comment
  - Respond to every comment

- [ ] **Email broader list** (10am)
  - Newsletter subscribers
  - Twitter DM to followers who might be interested
  - LinkedIn post

### All Day
- [ ] **Monitor provisioning dashboard**
  - Watch for failures
  - Fix issues immediately
  - Support new customers

- [ ] **Engage with launch traffic**
  - Reply to tweets
  - Answer Reddit questions
  - Respond to Product Hunt comments
  - Update launch metrics

### Evening (6pm)
- [ ] **Review launch metrics**
  - Signups: Target 20-30
  - Paid customers: Target 10-15
  - Revenue: Target $2,000-$4,000
  - Provisioning success rate: Target >90%
  - Product Hunt ranking: Target Top 10
  - Support tickets: Target <5 per customer

- [ ] **Celebrate! 🎉**
  - Tweet Day 1 metrics
  - Thank beta testers
  - Plan Week 2 improvements

---

## Post-Launch: Week 2 Priorities

### Days 12-14 (Feb 15-17)
- [ ] Fix bugs reported by customers
- [ ] Improve onboarding based on feedback
- [ ] Add missing documentation
- [ ] Optimize dashboard performance

### Days 15-18 (Feb 18-21)
- [ ] Build advanced analytics
- [ ] Add more setup guides
- [ ] Create video tutorials
- [ ] Plan first feature updates

---

## Success Metrics

### Week 1 (Feb 14-21)
- ✅ 10+ paying customers
- ✅ $2,000+ revenue
- ✅ >90% provisioning success rate
- ✅ <10% customer churn
- ✅ Product Hunt Top 10

### Month 1 (Feb 14-Mar 14)
- ✅ 50+ paying customers
- ✅ $15,000+ revenue
- ✅ >95% provisioning success rate
- ✅ <5% customer churn
- ✅ 5-star reviews from beta testers

---

## Emergency Contacts

**Railway Support:**
- Dashboard: railway.app/help
- Discord: railway.app/discord

**Stripe Support:**
- Dashboard: dashboard.stripe.com/support
- Phone: 1-888-926-2289

**Neon Support:**
- Email: support@neon.tech
- Discord: neon.tech/discord

**Vercel Support:**
- Dashboard: vercel.com/help
- Email: support@vercel.com

---

**Last Updated:** 2026-02-04  
**Owner:** Tom (main agent orchestrates)  
**Status:** Ready to execute ✅

---

**Let's ship this! 🚀**
