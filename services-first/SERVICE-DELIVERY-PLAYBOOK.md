# Clawdbot Setup Services - Delivery Playbook

**Purpose:** Step-by-step guide to deliver professional Clawdbot setup  
**Audience:** Tom + future delivery contractors  
**Goal:** Consistent, repeatable, high-quality delivery

---

## Overview

**Service Model:** White-glove setup + ongoing support  
**Timeline:** 48 hours (Starter) to 2 weeks (Enterprise)  
**Quality Standard:** Customer productive in first session

---

## Phase 1: Discovery Call (30 min)

### Pre-Call Preparation
- [ ] Review customer's website/LinkedIn
- [ ] Note their industry and role
- [ ] Prepare tier recommendation based on company size

### Call Structure

**Minutes 0-5: Rapport**
- "Thanks for booking! Tell me about your business."
- Listen actively, take notes on pain points

**Minutes 5-15: Needs Assessment**

Ask these questions:
1. **"What's your biggest time-waster right now?"**
   - Listen for: email overload, calendar chaos, research tasks, admin busywork

2. **"How many hours per week do you spend on email/admin/busywork?"**
   - <5 hours = May not be a good fit
   - 5-10 hours = Starter
   - 10-20 hours = Professional
   - 20+ hours (team-wide) = Enterprise

3. **"What tools do you use daily?"**
   - Email: Gmail or Outlook?
   - Calendar: Google Calendar or Outlook?
   - Messaging: WhatsApp, Telegram, Slack?
   - CRM: Salesforce, HubSpot, Pipedrive?
   - Project management: Asana, Monday, ClickUp?

4. **"Have you tried AI tools before? What worked/didn't work?"**
   - Understand their AI literacy
   - Address past frustrations

5. **"What would getting 10+ hours back per week unlock for you?"**
   - Emotional hook: focus on opportunity, not just time savings

6. **"What's your team size?"**
   - Solo = Starter
   - 5-20 = Professional
   - 20+ = Enterprise

7. **"Any compliance or security requirements?"**
   - HIPAA, SOC2, etc. = Enterprise tier

**Minutes 15-25: Solution Recommendation**
- "Based on what you've told me, I recommend [TIER]"
- Walk through what's included
- Calculate ROI specifically for them:
  - "You're spending 12 hours/week on this. At your rate of $150/hour, that's $93,600/year in time. Our Professional tier costs $14k/year. That's a $79k net value."

**Minutes 25-30: Next Steps**
- "I'll send you a custom proposal within 24 hours"
- "It'll include the full scope, timeline, and pricing"
- "Any questions before we wrap up?"

### Post-Call Actions
- [ ] Send thank-you email within 1 hour
- [ ] Create custom proposal (use template)
- [ ] Send proposal within 24 hours

---

## Phase 2: Proposal & Contract (24 hours)

### Proposal Creation

**Use template:** `PROPOSAL-TEMPLATE.md`

**Customize these sections:**
1. **Executive Summary**
   - Recap their pain points from discovery call
   - Mirror their language ("email overwhelm", "calendar chaos", etc.)

2. **Recommended Solution**
   - Tier recommendation + justification
   - Specific skills relevant to their business

3. **ROI Calculation**
   - Use their actual numbers from discovery call
   - Show concrete savings

4. **Timeline**
   - Be specific: "Setup complete by [DATE], training on [DATE]"

5. **Investment**
   - Clear pricing breakdown
   - Setup fee + monthly retainer

**Deliverables:**
- [ ] Custom proposal PDF (branded)
- [ ] Service agreement (DocuSign link)
- [ ] Invoice for setup fee (Stripe link)

### Follow-Up Schedule
- **Day 1:** Send proposal
- **Day 2:** Check-in email ("Any questions?")
- **Day 3:** Follow-up call if no response
- **Day 5:** Final follow-up (if still no response, mark as "cold")

---

## Phase 3: Kickoff & Setup

### 3A: Kickoff Call (1 hour)

**Purpose:** Gather credentials, confirm scope, set expectations

**Agenda:**

**Minutes 0-10: Welcome & Alignment**
- "Excited to get you set up! Today we'll gather everything I need to configure your Clawdbot."
- Review timeline: "Setup complete in 48-72 hours, then we'll schedule training"

**Minutes 10-30: Credential Gathering**

Collect these (securely via password manager or encrypted link):

1. **Email**
   - Gmail: App-specific password or OAuth
   - Outlook: OAuth or app password

2. **Calendar**
   - Google Calendar: OAuth
   - Outlook Calendar: OAuth

3. **Messaging App**
   - WhatsApp: Phone number (will send QR code)
   - Telegram: Username (will send bot link)
   - Slack: Workspace URL (will create app)

4. **CRM (Pro/Enterprise)**
   - API keys or OAuth
   - List of fields to sync

5. **Other Integrations (Enterprise)**
   - Project management tools
   - Database connections
   - Custom APIs

**Minutes 30-45: Workflow Deep Dive**
- "Walk me through a typical day. What do you do first thing?"
- Identify top 5 use cases to prioritize
- Sample emails: "Can you forward me 3-5 typical emails you receive? I'll use these to train the AI on your communication style."

**Minutes 45-60: Expectations & Timeline**
- "I'll have this set up within 48-72 hours"
- "I'll send you a test message when it's ready"
- "Then we'll schedule your training session"
- "Any questions?"

**Post-Call Actions:**
- [ ] Create secure shared folder (Google Drive or Notion)
- [ ] Document all credentials (DO NOT store in plain text)
- [ ] Create project timeline (share with customer)

---

### 3B: Technical Setup (Our Work - 5-30 hours)

#### Starter Tier (5-8 hours)

**Step 1: Infrastructure Setup (1 hour)**
- [ ] Create Railway project
- [ ] Deploy Docker container (clawdbot/agent:latest)
- [ ] Configure environment variables (use config generator from automation-system)

**Step 2: Email Integration (1 hour)**
- [ ] Configure Gmail or Outlook OAuth
- [ ] Test email fetching
- [ ] Verify email sending works

**Step 3: Calendar Integration (0.5 hour)**
- [ ] Configure Google Calendar or Outlook Calendar
- [ ] Test event creation
- [ ] Verify event reading

**Step 4: Messaging App Setup (0.5 hour)**
- [ ] WhatsApp: Generate QR code, send to customer, wait for scan
- [ ] Telegram: Create bot, send link to customer
- [ ] Test message sending/receiving

**Step 5: Skills Installation (1 hour)**
- [ ] Install 8 core skills (from skills library):
  - email-management
  - calendar-coordination
  - research-web
  - document-summarization
  - social-media
  - finance-tracking
  - task-management
  - contact-management
- [ ] Test each skill with sample commands

**Step 6: Memory System Setup (0.5 hour)**
- [ ] Create MEMORY.md (use template from automation-system)
- [ ] Create memory/ directory
- [ ] Create today's daily log
- [ ] Configure memory size limit (50KB for Starter)

**Step 7: Security Configuration (0.5 hour)**
- [ ] Enable email protection (all emails = untrusted)
- [ ] Enable risk scoring (0-10 scale)
- [ ] Enable confirmation protocols (high-risk actions)

**Step 8: Communication Style Training (1 hour)**
- [ ] Review sample emails customer provided
- [ ] Create communication style guide (tone, formality, preferences)
- [ ] Test with draft responses

**Step 9: Testing & QA (1 hour)**
- [ ] Send test messages, verify responses
- [ ] Test top 5 use cases identified in kickoff
- [ ] Check all integrations working
- [ ] Verify memory system writing correctly

**Step 10: Documentation (1 hour)**
- [ ] Create custom quick-start guide (Google Doc)
- [ ] Screenshot key workflows
- [ ] Document customer-specific commands
- [ ] Create FAQ for their setup

---

#### Professional Tier (10-15 hours)

**All Starter steps, PLUS:**

**Step 11: Mission Control Setup (2 hours)**
- [ ] Configure Mission Control (5 subagents)
- [ ] Test parallel execution
- [ ] Create example workflows using Mission Control

**Step 12: Heartbeat Configuration (1 hour)**
- [ ] Set cron schedule (8am, 6pm in customer's timezone)
- [ ] Configure email monitoring
- [ ] Configure calendar monitoring
- [ ] Test proactive alerts

**Step 13: Advanced Skills (2 hours)**
- [ ] Install 6 additional skills:
  - crm-automation
  - financial-analysis
  - competitive-intelligence
  - reporting-dashboards
  - advanced-research
  - email-sentiment-analysis
- [ ] Test each skill

**Step 14: Slack Integration (1 hour)**
- [ ] Create Slack app in customer's workspace
- [ ] Configure bot permissions
- [ ] Test message sending/receiving
- [ ] Create support channel

**Step 15: Enhanced Memory (1 hour)**
- [ ] Configure entity tracking (people/, projects/, business/)
- [ ] Create entity templates
- [ ] Increase memory limit to 100KB

**Step 16: Custom Skills (2-4 hours)**
- [ ] Develop 2 custom skills based on discovery call
- [ ] Test thoroughly
- [ ] Document usage

---

#### Enterprise Tier (20-30 hours)

**All Professional steps, PLUS:**

**Step 17: Full Mission Control (3 hours)**
- [ ] Configure 10 subagents
- [ ] Setup department-level orchestration patterns
- [ ] Create complex multi-agent workflows

**Step 18: 24/7 Heartbeat (2 hours)**
- [ ] Configure continuous monitoring
- [ ] Setup advanced alert rules
- [ ] Integrate with monitoring tools (if applicable)

**Step 19: Enterprise Security (3 hours)**
- [ ] SSO/SAML integration (if required)
- [ ] Audit logging setup
- [ ] Role-based access control
- [ ] Data residency configuration

**Step 20: Advanced Integrations (5-10 hours)**
- [ ] CRM integration (Salesforce, HubSpot, etc.)
- [ ] Project management integration
- [ ] Database connections
- [ ] Custom API development

**Step 21: Team Onboarding (3 hours)**
- [ ] Create user accounts (up to 10 users)
- [ ] Configure permissions per user
- [ ] Create team documentation

**Step 22: Custom Skill Development (5-10 hours)**
- [ ] Build unlimited custom skills based on requirements
- [ ] Test with real data
- [ ] Document thoroughly

---

### 3C: Pre-Training QA Checklist

**Before scheduling training, verify:**
- [ ] All integrations working (email, calendar, messaging)
- [ ] Skills responding correctly (test top 5 use cases)
- [ ] Memory system writing to files
- [ ] Security protocols enabled
- [ ] Documentation complete
- [ ] Test message: "What can you help me with?" gets good response

**If any items fail, fix before training.**

---

## Phase 4: Training & Handoff

### 4A: Training Session 1 (Starter: 1 hour, Pro: 1.5 hours)

**Pre-Training:**
- [ ] Record session (get permission first)
- [ ] Share screen + enable participant screen sharing
- [ ] Have documentation open in browser tab

**Training Agenda:**

**Minutes 0-10: Introduction**
- "Welcome! Today I'll show you how to use your new AI assistant."
- "We'll walk through the top use cases, then practice together."
- "Questions anytime—this is hands-on, not a lecture."

**Minutes 10-30: Core Skills Demo**
Walk through these use cases live:
1. **Email management:** "Let's draft a response to one of your recent emails"
2. **Calendar coordination:** "Find a time for a 1-hour meeting this week"
3. **Research:** "Research [topic relevant to their business]"
4. **Task management:** "Add a reminder to follow up with [contact] in 3 days"

**Minutes 30-50: Hands-On Practice**
- Have customer practice sending commands
- Correct mistakes gently
- Reinforce good patterns ("Great! That's exactly how to phrase it.")

**Minutes 50-60: Q&A + Next Steps**
- "What questions do you have?"
- "For the next week, I encourage you to use it daily. Try different things."
- "I'll check in with you in 7 days to see how it's going."
- "If you get stuck, email me or message me anytime."

**Post-Training:**
- [ ] Send recording link
- [ ] Send documentation link
- [ ] Schedule 7-day check-in
- [ ] Add to ongoing support schedule

---

### 4B: Training Session 2 (Pro/Enterprise Only, 1 hour)

**Advanced Features:**
- Mission Control demo (parallel execution)
- Heartbeat system (proactive monitoring)
- Custom skills walkthrough
- Advanced workflows
- Team usage (Enterprise)

---

## Phase 5: Ongoing Support

### Monthly Check-Ins

#### Starter (15 min monthly)
**Agenda:**
- "How's it going? Are you using Clawdbot daily?"
- "What's working well?"
- "What could be better?"
- "Any new use cases you'd like to explore?"
- Usage metrics: "You saved X hours this month"

#### Professional (30 min monthly)
**Agenda:**
- All Starter items, PLUS:
- "Let's review your Mission Control usage"
- "How's Heartbeat working? Any missed alerts?"
- "What 2 custom skills should we build this month?"
- Proactive recommendations based on usage data

#### Enterprise (30 min weekly)
**Agenda:**
- Weekly check-in (not monthly)
- Ongoing custom skill development status
- Team usage review
- Advanced optimization opportunities
- Quarterly business review (every 3 months, 1 hour)

---

### Support Ticket Process

**Response SLAs:**
- Starter: 24 hours (email)
- Professional: 4 hours (Slack)
- Enterprise: 1 hour (dedicated channel)

**Ticket Triage:**
1. **Critical** (system down, can't send messages):
   - Respond immediately
   - Fix within 2 hours
   - Follow up after fix

2. **High** (feature not working, integration broken):
   - Respond within SLA
   - Fix within 24 hours
   - Test thoroughly

3. **Medium** (question, feature request, optimization):
   - Respond within SLA
   - Resolve within 3-5 days
   - Add to roadmap if feature request

4. **Low** (nice-to-have, curiosity):
   - Respond within SLA
   - Provide answer or workaround
   - Log for future consideration

---

## Quality Standards

### Setup Quality Checklist
- [ ] All integrations working correctly
- [ ] Skills respond appropriately (no errors)
- [ ] Memory system writing to files
- [ ] Documentation is clear and customer-specific
- [ ] Training session recorded
- [ ] Customer can send/receive messages independently

### Customer Success Metrics
- **30-day:** >90% still using daily
- **90-day:** >80% retention
- **Time saved:** >5 hours/week (customer-reported)
- **Satisfaction:** >8/10 score

### Red Flags (Address Immediately)
- Customer hasn't used Clawdbot in 7+ days
- Support tickets going unanswered
- Customer expressing frustration
- Churn signals ("How do I cancel?")

**If any red flag appears:**
1. Reach out proactively (don't wait for check-in)
2. Understand the issue
3. Fix immediately or offer refund
4. Learn and improve process

---

## Common Issues & Solutions

### Issue: Email integration not working
**Solution:**
- Check OAuth token hasn't expired
- Verify permissions granted correctly
- Re-authenticate if needed
- Test with simple email

### Issue: Calendar events not syncing
**Solution:**
- Check calendar permissions
- Verify timezone configured correctly
- Test event creation manually
- Re-sync calendar

### Issue: Skills not responding
**Solution:**
- Check skill files installed correctly
- Verify environment variables set
- Test skill in isolation
- Check logs for errors

### Issue: Customer not using Clawdbot
**Solution:**
- Reach out: "Noticed you haven't used it much—everything okay?"
- Identify blockers (too complex? missing feature?)
- Offer additional training
- Simplify if needed

---

## Tools & Resources

### Required Tools
- Railway account (infrastructure)
- Anthropic API key (for Claude)
- Stripe account (billing)
- Calendly (discovery calls)
- DocuSign (contracts)
- Google Drive or Notion (documentation)
- Slack workspace (support for Pro/Enterprise)

### Templates
- Proposal template (`PROPOSAL-TEMPLATE.md`)
- Service agreement template
- Training documentation template
- Check-in call agenda template

### Automation Opportunities
- Calendly → Google Calendar (automatic booking)
- DocuSign → Stripe (automatic invoice after signing)
- Setup scripts (automate infrastructure deployment)
- Training video library (reduce live training time)

---

## Scaling the Delivery Process

### At 10 customers (current):
- Tom does everything (sales + delivery + support)
- 20 hours/week total

### At 30 customers:
- Tom: Sales + strategy (10 hours/week)
- Contractor: Setup + training (30 hours/week, $3k/month)
- Tom: Support (10 hours/week)

### At 75 customers:
- Tom: Strategy only (5 hours/week)
- Sales person: Discovery calls + proposals (40 hours/week)
- 2x Delivery contractors: Setup + training (60 hours/week, $6k/month)
- Support person: Ongoing support (20 hours/week, $2k/month)

**Key to scaling: Document everything, create repeatable playbooks, hire good people.**

---

## Continuous Improvement

### After Every Setup:
- [ ] Note what went well
- [ ] Note what could be improved
- [ ] Update this playbook with learnings
- [ ] Refine templates based on feedback

### Monthly Review:
- [ ] Review all customer satisfaction scores
- [ ] Identify patterns in issues
- [ ] Update playbook with solutions
- [ ] Share learnings with team (when you have one)

---

**Status:** Living document (update as you learn)  
**Owner:** Tom (until hire)  
**Version:** 1.0 (Services-First Model)
