# 🎯 Service Delivery Playbook

**Purpose:** Internal guide for delivering Clawdbot services consistently and excellently.  
**Audience:** PREP, Mission Control agents, and anyone delivering client setups.  
**Goal:** Every client gets a smooth, high-quality experience that leads to testimonials and referrals.

---

## 📋 Overview

**What we deliver:**
- Fully configured AI assistant for the client's specific workflow
- Integrated with their tools (calendar, email, Slack, etc.)
- Custom skills for their industry/use case
- Training session so they know how to delegate effectively
- Ongoing support (tier-dependent)

**Timeline:**
- **Starter:** 3-5 business days from payment to handoff
- **Professional:** 7-10 business days
- **Enterprise:** 10-14 business days

**Quality bar:**
- Client can delegate real work on Day 1 of handoff
- Zero technical friction (everything works out of the box)
- Clear documentation (they know what to do)
- Confidence builder (early wins to prove value)

---

## 🚀 The 5-Phase Delivery Process

```
Phase 1: PAYMENT RECEIVED → Kickoff (Day 0)
Phase 2: DISCOVERY → Understand their needs (Day 1-2)
Phase 3: BUILD → Configure assistant (Day 2-5)
Phase 4: TRAINING → Teach them how to use it (Day 5-6)
Phase 5: SUPPORT → Ensure success (Day 7-30+)
```

---

## Phase 1: Payment Received → Kickoff (Day 0)

**Triggered by:** Stripe webhook (checkout.session.completed)

### Immediate Actions (Within 1 Hour)

**1.1 - Send Welcome Email**
```
To: {customer_email}
Subject: ✅ Welcome to Clawdbot! Next Steps Inside

Hi {customer_name},

Thank you for choosing Clawdbot! Your payment is confirmed and we're excited to build your custom AI assistant.

Here's what happens next:

📅 Step 1: Book Your Discovery Call (30 min)
We'll discuss your workflow, tools, and goals to build the perfect setup for you.

👉 Book here: {calendly_link}

📋 Step 2: Complete Pre-Work Form (5 min)
Help us understand your needs before the call so we can hit the ground running.

👉 Form: {typeform_link}

⏱️ Timeline:
- Discovery call: Within 48 hours
- Assistant build: {X} business days
- Training session: {X+1} business days
- Go-live: {X+2} business days

Questions? Reply to this email anytime.

Looking forward to working with you!

Best,
{Tom or PREP}
Clawdbot Services

---
P.S. Check your spam folder for emails from @junctionmedia.ai to make sure you don't miss updates!
```

**1.2 - Log Client in CRM**
```
Add to tracking sheet (Google Sheets, Airtable, Notion):

Fields:
- Customer name
- Email
- Phone (if provided)
- Plan: Starter / Professional / Enterprise
- Setup fee paid: $XXX
- Monthly subscription: $XXX/mo
- Payment date
- Status: "Awaiting Discovery Call"
- Discovery call booked: Yes/No
- Assigned to: {Agent name}
- Target completion date: {Payment date + X days}
```

**1.3 - Assign to Mission Control Agent**
```
If using Mission Control:
- Starter clients → Assign to Jarvis or Wong (simple setups)
- Professional clients → Assign to Friday (technical builds)
- Enterprise clients → PREP handles directly (high-touch)

Post in Discord/Slack:
"New client: {Name}, {Plan}. Discovery call by {Date}. {Agent}, you're on it."
```

**1.4 - Prepare Discovery Call Questions**
```
Create doc: {Client_Name}_Discovery_Notes.md

Pre-populate with:
- Client info (name, email, plan)
- Pre-work form answers (if submitted)
- Industry/business type (from Stripe metadata)
- Questions to ask (see Phase 2)
```

---

## Phase 2: Discovery Call (Day 1-2)

**Goal:** Understand their workflow, pain points, and desired outcomes.

### Pre-Call Preparation

**2.1 - Research the Client**
```
Before the call, spend 15 minutes learning about them:
- LinkedIn profile (job title, company size)
- Company website (what they do, who they serve)
- Industry (common pain points, tools used)
- Social media (get a sense of their communication style)

Note insights in discovery doc.
```

**2.2 - Review Pre-Work Form**
```
If they submitted the form, read it carefully:
- Current tools they use
- Biggest time-wasters
- What they want the assistant to handle
- Success metrics (how they'll measure value)

Flag any red flags (unrealistic expectations, tool limitations).
```

### During the Call (30 Minutes)

**2.3 - Agenda**
```
Minute 0-5: Intro & Rapport
- Thank them for joining
- Quick overview of what we'll cover
- Set expectations (this is about understanding, not selling)

Minute 5-15: Understanding Their Workflow
Q: Walk me through a typical day. What takes up most of your time?
Q: What tasks do you wish you could delegate but can't?
Q: What tools do you use daily? (Calendar, email, Slack, CRM, etc.)
Q: What information do you need to access frequently?

Minute 15-25: Pain Points & Goals
Q: What's the #1 thing you want the AI assistant to handle?
Q: What would success look like 30 days from now?
Q: Are there any tasks you've tried to automate that didn't work?
Q: What's a "quick win" we can deliver in the first week?

Minute 25-30: Next Steps & Timeline
- Recap what we heard
- Confirm plan tier matches their needs (or suggest upgrade/downgrade)
- Share timeline (when they'll get access, training, etc.)
- Answer questions
- Set training call date (Day 5-6)
```

**2.4 - Take Detailed Notes**
```
Capture in discovery doc:
- Key tasks to automate (prioritized)
- Tools to integrate (calendar, email, Slack, etc.)
- Industry-specific needs (templates, workflows)
- Constraints (budget, data privacy, compliance)
- Success metrics (what "good" looks like)
- Quick win (deliver this first to build trust)
```

**2.5 - Send Follow-Up Email (Within 2 Hours)**
```
Subject: Discovery Call Recap - Next Steps

Hi {Name},

Great talking with you today! Here's a quick recap:

✅ What we heard:
- Your #1 priority: {Task}
- Tools to integrate: {Calendar, Email, Slack, etc.}
- Quick win: {Specific deliverable}

📅 Next steps:
- We'll build your assistant by {Date}
- Training call scheduled: {Date/Time}
- You'll receive login credentials 24 hours before training

🔧 Action items for you:
- [ ] Grant API access to {Tool 1} (instructions attached)
- [ ] Share sample workflows (if applicable)
- [ ] Confirm training call time

Questions? Hit reply anytime.

Talk soon!
{Your Name}

---
Attached:
- API access guide for {Tool}
- Sample workflows template
```

---

## Phase 3: Build (Day 2-5)

**Goal:** Configure the assistant so it's ready to use on Day 1 of handoff.

### Build Checklist

**3.1 - Core Setup**
```
For ALL tiers:
- [ ] Create Clawdbot instance (agent session)
- [ ] Configure SOUL.md (agent personality/purpose)
- [ ] Configure USER.md (client context)
- [ ] Set up memory system (MEMORY.md, daily files)
- [ ] Configure AGENTS.md (operational rules)
- [ ] Test basic functionality (agent responds, remembers context)
```

**3.2 - Tool Integrations**
```
Based on discovery call, integrate:

Calendar (Google Calendar, Outlook):
- [ ] Connect via API
- [ ] Test: Schedule event, retrieve upcoming meetings
- [ ] Grant permissions (read/write)

Email (Gmail, Outlook):
- [ ] Connect via API (OAuth2)
- [ ] Test: Send email, read inbox, reply to thread
- [ ] Set up filters (important vs. noise)

Messaging (Slack, Discord, WhatsApp):
- [ ] Connect via API/webhook
- [ ] Test: Send message, receive notification
- [ ] Configure channels/groups

Other tools (CRM, project management, etc.):
- [ ] API integration (Zapier if no native support)
- [ ] Test: Create record, retrieve data
- [ ] Document any limitations
```

**3.3 - Custom Skills**
```
Build industry-specific or client-specific skills:

Examples:
- Real estate: Property listing generator, showing scheduler
- E-commerce: Inventory sync, customer service templates
- Consulting: Proposal generator, meeting prep assistant
- Marketing: Content calendar, campaign tracker

Process:
1. Identify high-value skill from discovery notes
2. Build skill (create SKILL.md, test locally)
3. Deploy to client's agent
4. Test with sample data
5. Document how to use it

Store in: skills/{client_name}/{skill_name}/
```

**3.4 - Quick Win Setup**
```
Remember the "quick win" from discovery?
Build that FIRST and test it thoroughly.

Examples:
- "Schedule my weekly team meeting every Monday at 9am"
- "Summarize my unread emails every morning at 8am"
- "Draft LinkedIn posts from my notes"

Make sure this works perfectly before training call.
```

**3.5 - Quality Assurance**
```
Before handoff, test EVERYTHING:

Tier: Starter
- [ ] Agent responds to basic requests
- [ ] Calendar integration works (schedule, retrieve)
- [ ] Email integration works (read, send)
- [ ] Memory persists across sessions
- [ ] Quick win deliverable works perfectly

Tier: Professional
- [ ] All Starter items ✓
- [ ] Multi-agent coordination (if applicable)
- [ ] Custom skills work as expected
- [ ] Advanced integrations tested (CRM, etc.)
- [ ] Error handling graceful (doesn't crash)

Tier: Enterprise
- [ ] All Professional items ✓
- [ ] Full Mission Control squad deployed
- [ ] Industry-specific workflows tested
- [ ] Compliance requirements met (data privacy, etc.)
- [ ] Backup/redundancy configured
```

**3.6 - Documentation**
```
Create client-facing docs:

1. Quick Start Guide ({Client_Name}_QuickStart.md)
   - How to access the assistant
   - Basic commands (examples)
   - What it can do (capabilities list)
   - What it can't do (limitations)

2. Integration Guide ({Client_Name}_Integrations.md)
   - Tools connected
   - How to grant/revoke access
   - Troubleshooting common issues

3. Skills Library ({Client_Name}_Skills.md)
   - List of custom skills
   - How to use each one (examples)
   - How to request new skills

Store in: clients/{client_name}/docs/
```

---

## Phase 4: Training (Day 5-6)

**Goal:** Client knows how to delegate effectively and sees immediate value.

### Pre-Training

**4.1 - Send Credentials (24 Hours Before)**
```
Subject: Your Clawdbot Assistant is Ready! Training Tomorrow

Hi {Name},

Your AI assistant is ready to go! Here's what you need for tomorrow's training:

🔑 Login credentials:
- URL: {agent_url or access method}
- Username: {email}
- Password: {temp_password}

👉 Please log in and test access before our call.

📅 Training call:
- Date/Time: {Scheduled time}
- Duration: 60 minutes
- Zoom link: {link}

📋 What we'll cover:
- How to delegate tasks effectively
- Core capabilities & integrations
- Custom skills walkthrough
- Live demo of your "quick win"
- Q&A

See you tomorrow!
{Your Name}

---
Attached:
- Quick Start Guide
- Integration Guide
- Skills Library
```

**4.2 - Prepare Training Agenda**
```
Create doc: {Client_Name}_Training_Agenda.md

Outline:
- Minute 0-10: Overview & login walkthrough
- Minute 10-20: Core capabilities demo
- Minute 20-30: Integrations demo (calendar, email, etc.)
- Minute 30-40: Custom skills demo
- Minute 40-50: Live "quick win" demo
- Minute 50-60: Q&A & next steps
```

### During Training (60 Minutes)

**4.3 - Session Flow**
```
Minute 0-10: Introduction
- "Let's make sure you're logged in..."
- "Here's what we built for you..."
- "Today you'll learn how to delegate to your assistant like a pro."

Minute 10-20: Core Capabilities
- Show how to ask questions
- Demonstrate memory (it remembers context)
- Show how to give multi-step instructions
- Explain when to use it vs. when not to

Minute 20-30: Integrations Demo
- Calendar: "Schedule a meeting for me next Tuesday at 2pm"
- Email: "Summarize my unread emails from the last 24 hours"
- Slack: "Send a message to #team channel"
- Show how to grant/revoke access if needed

Minute 30-40: Custom Skills Demo
- Walk through each custom skill
- Show real examples (use their data if possible)
- Let them try one (guided practice)

Minute 40-50: Quick Win Demo
- "Remember you wanted help with {Task}?"
- Show it working live
- Let them try it themselves
- Celebrate the win!

Minute 50-60: Q&A & Next Steps
- Answer any questions
- Share support contact (email, Slack, Discord)
- Set expectations for ongoing support (tier-dependent)
- Ask: "What's the first task you'll delegate today?"
```

**4.4 - Record the Session (Optional)**
```
If client agrees:
- Record training call
- Share recording + transcript within 24 hours
- Useful for onboarding their team later
```

**4.5 - Post-Training Email**
```
Subject: Training Recap - You're Live! 🚀

Hi {Name},

Great session today! Your assistant is live and ready to help.

✅ What we covered:
- Core capabilities (memory, multi-step tasks)
- Integrations ({Calendar, Email, Slack})
- Custom skills ({Skill 1, Skill 2})
- Quick win: {Delivered task}

📚 Resources:
- Quick Start Guide (attached)
- Integration Guide (attached)
- Skills Library (attached)
- Training recording: {link} (if recorded)

🆘 Support:
- Questions? Email: {support_email}
- Urgent issues? Slack: {slack_channel}
- Office hours: {Mon-Fri 9am-5pm NZDT}

🎯 Your first task:
You said you'd delegate: "{Task}"
Try it today and let me know how it goes!

Excited to see what you build together.

{Your Name}
```

---

## Phase 5: Ongoing Support (Day 7-30+)

**Goal:** Ensure client success, gather feedback, prevent churn.

### Week 1: High-Touch Support

**5.1 - Daily Check-Ins (Day 1-7)**
```
Send quick check-in emails:

Day 1 (post-training):
Subject: How's it going?
"Did you try delegating {Task} yet? Any questions?"

Day 3:
Subject: Quick check-in
"How's the assistant working out? Any hiccups?"

Day 7:
Subject: One week in!
"What's working well? What could be better?"

Response time target: <2 hours for all support requests.
```

**5.2 - Monitor Usage**
```
Check agent logs daily:
- Are they using it? (# of sessions)
- What tasks are they delegating? (most common requests)
- Any errors or failed tasks? (fix immediately)
- Are they using custom skills? (or do they need training?)

Flag low usage (<3 sessions in first week):
- Reach out proactively: "Haven't seen much activity, need help?"
```

### Week 2-4: Transition to Self-Service

**5.3 - Weekly Check-Ins**
```
Week 2:
Subject: Week 2 update
"What's the biggest win so far? Any new needs?"

Week 3:
Subject: 3-week check-in
"Is the assistant meeting your expectations? Anything we should add?"

Week 4:
Subject: 30-day review
"Let's schedule a quick call to review progress and plan next steps."
```

**5.4 - 30-Day Review Call (30 min)**
```
Agenda:
- What's working well?
- What's not working?
- What new capabilities do they need?
- Are they getting ROI? (time saved, revenue impact)
- Testimonial request (if they're happy)
- Referral request (if they're thrilled)

Outcome:
- Decide if they stay on current tier or upgrade
- Document new feature requests
- Schedule next review (60 days out for ongoing clients)
```

### Ongoing Support (Month 2+)

**5.5 - Support Channels**
```
Tier-specific response times:

Starter:
- Email support: <24 hours
- Monthly check-ins
- Feature requests: Quarterly

Professional:
- Email + Slack support: <12 hours
- Bi-weekly check-ins
- Feature requests: Monthly

Enterprise:
- Email + Slack + Phone: <4 hours
- Weekly check-ins
- Dedicated account manager (PREP or Tom)
- Feature requests: On-demand
```

**5.6 - Proactive Optimization**
```
Monthly (for all tiers):
- Review usage logs (what's being used, what's not)
- Identify optimization opportunities
- Suggest new skills or integrations
- Send optimization report:

Example:
"Hi {Name}, I noticed you're asking about {Topic} a lot. 
We could build a custom skill to automate that. Interested?"
```

**5.7 - Handling Issues**
```
When something breaks:
1. Acknowledge within 1 hour: "We're on it, will update you in {X} hours."
2. Investigate and fix (prioritize based on tier)
3. Test fix thoroughly
4. Deploy and notify client: "Fixed! Please test and let me know."
5. Post-mortem (if major): Document what happened, how we fixed it, how we'll prevent it.

Severity levels:
- Critical (assistant completely down): Fix within 2 hours
- High (major feature broken): Fix within 24 hours
- Medium (minor bug): Fix within 3 days
- Low (enhancement request): Plan for next update cycle
```

---

## 📊 Success Metrics

Track these for every client:

**Delivery Metrics:**
- [ ] Time from payment to go-live (target: <7 days for Starter)
- [ ] Training session completion rate (target: 100%)
- [ ] Client satisfaction score (1-10, target: 8+)

**Usage Metrics:**
- [ ] Sessions per week (target: 5+ for active clients)
- [ ] Tasks delegated per week (target: 10+)
- [ ] Custom skills usage rate (target: 50%+)

**Retention Metrics:**
- [ ] Churn rate (target: <5% per month)
- [ ] Upgrade rate (Starter → Professional: 20%+)
- [ ] Referral rate (target: 1 referral per 5 clients)

**Quality Metrics:**
- [ ] Support ticket volume (target: <2 per client per month)
- [ ] Bug reports (target: <1 per client per month)
- [ ] Feature request backlog (target: <10 pending)

---

## 🎯 Client Success Playbook

**How to ensure every client succeeds:**

### Week 1: Activation
- [ ] Client completes training
- [ ] Client delegates at least 1 task
- [ ] Quick win delivered and celebrated
- [ ] No technical blockers

### Week 4: Habit Formation
- [ ] Client using assistant 3+ times per week
- [ ] At least 1 custom skill in regular use
- [ ] Client can articulate ROI (time saved, revenue impact)
- [ ] No unresolved support tickets

### Month 3: Evangelism
- [ ] Client is thrilled (NPS 9-10)
- [ ] Client provides testimonial
- [ ] Client refers at least 1 new customer
- [ ] Client upgrades tier or renews confidently

---

## 🚨 Churn Prevention

**Red flags (act immediately):**
- Low usage (<2 sessions per week)
- Multiple support tickets in short time
- Negative feedback or complaints
- Non-responsive to check-ins
- Subscription payment failed

**Recovery playbook:**
1. Reach out within 24 hours: "I noticed {Issue}. Can we jump on a quick call?"
2. Diagnose root cause (not valuable, too complex, competitor, budget)
3. Offer solution:
   - Not valuable → Identify new use cases, build new skills
   - Too complex → Simplify, provide more training
   - Competitor → Highlight differentiation, match/beat features
   - Budget → Offer downgrade or payment plan
4. Set 7-day follow-up: "Let's check in next week to see if this is working better."
5. If still churning, exit gracefully:
   - Refund last month (goodwill)
   - Ask for honest feedback
   - Leave door open: "If things change, we'd love to work together again."

---

## 🎁 Delight Moments

**Go beyond expectations:**

### Surprise Upgrades
- Client on Starter hitting limits? Gift them a free Professional feature for 1 month.
- Client crushes a big goal using the assistant? Send a handwritten thank-you note.

### Proactive Value-Adds
- Spot an industry trend? Send them a custom skill before they ask.
- Notice they're doing something manually? Build automation and surprise them.

### Community Building
- Invite top clients to exclusive Slack/Discord community
- Host monthly "AI Assistant Power Users" calls (share tips, network)
- Feature client success stories on website/social media (with permission)

**Goal:** Make clients feel like VIPs, not just customers.

---

## ✅ Delivery Checklist (Per Client)

**Phase 1: Kickoff**
- [ ] Welcome email sent
- [ ] CRM updated
- [ ] Agent assigned
- [ ] Discovery call booked

**Phase 2: Discovery**
- [ ] Pre-call research done
- [ ] Discovery call completed
- [ ] Notes documented
- [ ] Follow-up email sent

**Phase 3: Build**
- [ ] Core setup complete
- [ ] Integrations tested
- [ ] Custom skills built
- [ ] Quick win ready
- [ ] QA passed
- [ ] Documentation created

**Phase 4: Training**
- [ ] Credentials sent (24h before)
- [ ] Training completed
- [ ] Recording shared (if applicable)
- [ ] Post-training email sent

**Phase 5: Support**
- [ ] Week 1 check-ins done
- [ ] 30-day review scheduled
- [ ] Usage monitored
- [ ] Issues resolved

---

## 🔄 Continuous Improvement

**After every 10 clients, review:**
- What went well? (do more of this)
- What went poorly? (fix immediately)
- What can be automated? (reduce manual work)
- What new skills are commonly requested? (build once, deploy to all)

**Update this playbook quarterly** with lessons learned.

---

## 📞 Escalation Protocol

**When to involve Tom:**
- Client threatening to churn (Tier: Professional or Enterprise)
- Legal/compliance issue
- Major technical failure affecting multiple clients
- Client requests feature outside standard offering
- Payment dispute or refund request >$1,000

**When PREP handles solo:**
- Routine support requests
- Standard feature requests
- Bug fixes
- Tier upgrades/downgrades
- Minor payment issues

---

## 🚀 Ready to Deliver

This playbook gives you everything needed to deliver world-class Clawdbot services.

**Remember:**
- Speed matters (deliver fast)
- Quality matters more (deliver right)
- Client success is our success (they win, we win)

**Now go make customers successful.** 🎯

---

*Last updated: 2026-02-04*  
*Maintained by: PREP (Clawdbot CEO)*
