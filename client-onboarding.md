# ✅ Client Onboarding Checklist

**Purpose:** Simple checklist to ensure every client gets a consistent, high-quality onboarding experience.  
**Use:** Copy this for each new client. Check off items as you complete them.

---

## 📋 Client Information

```
Client Name: _________________________________
Email: _______________________________________
Phone: _______________________________________
Plan: ☐ Starter  ☐ Professional  ☐ Enterprise
Payment Date: ________________________________
Setup Fee: $ _________________________________
Monthly: $ ___________________________________
Target Go-Live Date: _________________________
Assigned To: _________________________________
```

---

## Phase 1: Payment Received (Day 0) ⚡

**Timeline: Within 1 hour of payment**

- [ ] Payment confirmed in Stripe
- [ ] Client added to CRM/tracking sheet
- [ ] Welcome email sent (template: Welcome_Email.md)
- [ ] Calendly link shared (for discovery call)
- [ ] Pre-work form sent (Typeform/Google Form)
- [ ] Agent assigned (Jarvis/Friday/PREP)
- [ ] Internal kickoff posted (Discord/Slack)
- [ ] Discovery doc created ({Client_Name}_Discovery_Notes.md)

**Owner:** _______________  
**Completed:** ☐

---

## Phase 2: Discovery (Day 1-2) 🔍

**Timeline: Within 48 hours of payment**

### Pre-Call (Do This First)
- [ ] Pre-work form reviewed (if submitted)
- [ ] LinkedIn profile researched
- [ ] Company website reviewed
- [ ] Industry research done (common tools, pain points)
- [ ] Discovery questions prepared
- [ ] Calendar invite sent with Zoom link

**Owner:** _______________  
**Completed:** ☐

### Discovery Call (30 min)
- [ ] Call completed (Date: __________, Time: __________)
- [ ] Notes captured in discovery doc:
  - [ ] Key tasks to automate (prioritized)
  - [ ] Tools to integrate (calendar, email, Slack, etc.)
  - [ ] Industry-specific needs
  - [ ] Success metrics (what "good" looks like)
  - [ ] Quick win identified (deliver this first!)
- [ ] Training call scheduled (Date: __________, Time: __________)

**Owner:** _______________  
**Completed:** ☐

### Post-Call (Within 2 Hours)
- [ ] Follow-up email sent (template: Discovery_Recap.md)
- [ ] Action items listed for client (API access, sample data, etc.)
- [ ] Build plan documented (what we'll build and by when)
- [ ] Quick win confirmed and documented

**Owner:** _______________  
**Completed:** ☐

---

## Phase 3: Build (Day 2-5) 🔧

**Timeline: Starter (3-5 days), Professional (7-10 days), Enterprise (10-14 days)**

### Core Setup
- [ ] Clawdbot instance created (agent session ID: _____________)
- [ ] SOUL.md configured (agent personality/purpose)
- [ ] USER.md configured (client context)
- [ ] AGENTS.md configured (operational rules)
- [ ] MEMORY.md initialized
- [ ] Memory system tested (agent remembers context)

**Owner:** _______________  
**Completed:** ☐

### Tool Integrations

**Calendar Integration**
- [ ] API connected (Google Calendar / Outlook)
- [ ] Permissions granted (read/write)
- [ ] Test: Schedule event ✓
- [ ] Test: Retrieve upcoming meetings ✓

**Email Integration**
- [ ] API connected (Gmail / Outlook)
- [ ] OAuth2 configured
- [ ] Test: Read inbox ✓
- [ ] Test: Send email ✓
- [ ] Test: Reply to thread ✓

**Messaging Integration** (if applicable)
- [ ] API connected (Slack / Discord / WhatsApp)
- [ ] Channels/groups configured
- [ ] Test: Send message ✓
- [ ] Test: Receive notification ✓

**Other Integrations** (list below)
- [ ] _________________ (Tool: _____________)
- [ ] _________________ (Tool: _____________)
- [ ] _________________ (Tool: _____________)

**Owner:** _______________  
**Completed:** ☐

### Custom Skills

**Skill 1: _________________ (Priority: High/Med/Low)**
- [ ] Skill designed (SKILL.md created)
- [ ] Skill built and deployed
- [ ] Test cases passed ✓
- [ ] Documentation written
- [ ] Example usage documented

**Skill 2: _________________ (Priority: High/Med/Low)**
- [ ] Skill designed (SKILL.md created)
- [ ] Skill built and deployed
- [ ] Test cases passed ✓
- [ ] Documentation written
- [ ] Example usage documented

**Skill 3: _________________ (Priority: High/Med/Low)**
- [ ] Skill designed (SKILL.md created)
- [ ] Skill built and deployed
- [ ] Test cases passed ✓
- [ ] Documentation written
- [ ] Example usage documented

**Owner:** _______________  
**Completed:** ☐

### Quick Win Setup
**Quick Win Task:** _________________________________

- [ ] Quick win capability built
- [ ] Tested with sample data ✓
- [ ] Works perfectly (zero friction)
- [ ] Demo prepared for training call

**Owner:** _______________  
**Completed:** ☐

### Quality Assurance

**Starter Tier (Check All)**
- [ ] Agent responds to basic requests
- [ ] Memory persists across sessions
- [ ] Calendar integration works
- [ ] Email integration works
- [ ] Quick win deliverable works perfectly
- [ ] No errors in logs

**Professional Tier (Check All - Includes Starter)**
- [ ] All Starter items ✓
- [ ] Multi-agent coordination works (if applicable)
- [ ] All custom skills work as expected
- [ ] Advanced integrations tested
- [ ] Error handling graceful (no crashes)

**Enterprise Tier (Check All - Includes Professional)**
- [ ] All Professional items ✓
- [ ] Full Mission Control squad deployed
- [ ] Industry-specific workflows tested
- [ ] Compliance requirements met (data privacy, security)
- [ ] Backup/redundancy configured
- [ ] Performance tested (handles load)

**Owner:** _______________  
**Completed:** ☐

### Documentation

- [ ] Quick Start Guide created ({Client_Name}_QuickStart.md)
- [ ] Integration Guide created ({Client_Name}_Integrations.md)
- [ ] Skills Library created ({Client_Name}_Skills.md)
- [ ] All docs reviewed for accuracy
- [ ] Docs saved in: clients/{client_name}/docs/

**Owner:** _______________  
**Completed:** ☐

---

## Phase 4: Training (Day 5-6) 🎓

**Timeline: 24 hours before go-live**

### Pre-Training (24 Hours Before)
- [ ] Credentials created (username/password)
- [ ] Access tested (login works)
- [ ] Credentials email sent (template: Credentials_Email.md)
- [ ] Training agenda prepared ({Client_Name}_Training_Agenda.md)
- [ ] Zoom link confirmed
- [ ] Client confirmed attendance
- [ ] Screen sharing tested
- [ ] Demo script ready

**Owner:** _______________  
**Completed:** ☐

### Training Session (60 min)

**Agenda:**
- [ ] 0-10 min: Introduction & login walkthrough
- [ ] 10-20 min: Core capabilities demo
- [ ] 20-30 min: Integrations demo (calendar, email, etc.)
- [ ] 30-40 min: Custom skills demo
- [ ] 40-50 min: Live "quick win" demo
- [ ] 50-60 min: Q&A & next steps

**Session Details:**
- [ ] Call completed (Date: __________, Time: __________)
- [ ] Client successfully logged in ✓
- [ ] Quick win demonstrated live ✓
- [ ] Client tried it themselves ✓
- [ ] All questions answered
- [ ] Recording saved (if recorded): _______________

**Owner:** _______________  
**Completed:** ☐

### Post-Training (Within 2 Hours)
- [ ] Training recap email sent (template: Training_Recap.md)
- [ ] All documentation attached (Quick Start, Integrations, Skills)
- [ ] Recording shared (if recorded)
- [ ] Support contact info shared (email, Slack, phone)
- [ ] First task suggested ("What's the first thing you'll delegate?")
- [ ] Client status updated to "LIVE" in CRM

**Owner:** _______________  
**Completed:** ☐

---

## Phase 5: Ongoing Support (Day 7-30+) 💬

**Timeline: Continuous**

### Week 1: High-Touch Support

**Day 1 (Post-Training)**
- [ ] Check-in email sent: "How's it going?"
- [ ] Response received (if applicable)
- [ ] Usage monitored (# of sessions: _______)
- [ ] Any issues flagged and resolved

**Day 3**
- [ ] Check-in email sent: "Quick check-in"
- [ ] Response received (if applicable)
- [ ] Usage monitored (# of sessions: _______)
- [ ] Any issues flagged and resolved

**Day 7**
- [ ] Week 1 check-in email sent: "One week in!"
- [ ] Client feedback collected
- [ ] Usage report generated (sessions: _____, tasks: _____)
- [ ] Issues resolved or escalated

**Week 1 Summary:**
- Sessions this week: _______
- Tasks delegated: _______
- Support tickets: _______
- Client satisfaction (1-10): _______
- Issues: _______________________________

**Owner:** _______________  
**Completed:** ☐

---

### Week 2-4: Transition to Self-Service

**Week 2**
- [ ] Check-in email sent: "What's the biggest win so far?"
- [ ] Usage monitored (sessions: _____, tasks: _____)
- [ ] Feature requests logged (if any)

**Week 3**
- [ ] Check-in email sent: "3-week check-in"
- [ ] Usage monitored (sessions: _____, tasks: _____)
- [ ] Optimization opportunities identified

**Week 4**
- [ ] 30-day review scheduled (Date: __________, Time: __________)
- [ ] Usage report prepared (sessions: _____, tasks: _____, ROI: _____)
- [ ] Testimonial request sent (if client is happy)

**Owner:** _______________  
**Completed:** ☐

---

### 30-Day Review Call (30 min)

**Agenda:**
- [ ] What's working well?
- [ ] What's not working?
- [ ] New capabilities needed?
- [ ] ROI discussion (time saved, revenue impact)
- [ ] Tier review (stay, upgrade, downgrade?)

**Outcome:**
- [ ] Client satisfaction score (1-10): _______
- [ ] Testimonial collected: ☐ Yes  ☐ No  ☐ Later
- [ ] Referrals requested: ☐ Yes  ☐ No
- [ ] Tier decision: ☐ Stay  ☐ Upgrade  ☐ Downgrade
- [ ] Feature requests logged: _______________________________
- [ ] Next review scheduled (60 days): __________

**Owner:** _______________  
**Completed:** ☐

---

## 🎯 Success Metrics (Track Monthly)

**Delivery Performance:**
- Time from payment to go-live: _____ days (Target: <7 for Starter)
- Training completion: ☐ Yes  ☐ No (Target: 100%)
- Client satisfaction: _____ / 10 (Target: 8+)

**Usage Metrics:**
- Sessions per week (Avg): _____ (Target: 5+)
- Tasks delegated per week (Avg): _____ (Target: 10+)
- Custom skills usage rate: _____% (Target: 50%+)

**Retention Signals:**
- Support tickets per month: _____ (Target: <2)
- Bug reports: _____ (Target: <1)
- Referrals generated: _____ (Target: 1 per 5 clients)
- Churn risk: ☐ Low  ☐ Medium  ☐ High

---

## 🚨 Red Flags (Act Immediately)

**Mark any that apply:**
- [ ] Low usage (<2 sessions per week)
- [ ] Multiple support tickets in short time
- [ ] Negative feedback or complaints
- [ ] Non-responsive to check-ins
- [ ] Subscription payment failed
- [ ] Competitor mentioned
- [ ] Requested cancellation

**If ANY red flags, follow Churn Prevention Playbook (service-delivery-playbook.md)**

**Action Taken:** _______________________________  
**Outcome:** _______________________________

---

## ✅ Onboarding Complete

**Final Checklist:**
- [ ] All phases completed (1-5)
- [ ] Client is actively using the assistant
- [ ] No unresolved support tickets
- [ ] Client satisfaction ≥ 8/10
- [ ] Usage metrics meet targets
- [ ] Documentation complete and accessible
- [ ] Next review scheduled

**Go-Live Date:** _______________________________  
**Status:** ☐ Active  ☐ At Risk  ☐ Churned  
**Notes:** _______________________________

---

**Completed by:** _______________  
**Date:** _______________  
**Sign-off:** _______________

---

## 📎 Templates & Resources

**Email Templates:**
- `templates/Welcome_Email.md`
- `templates/Discovery_Recap.md`
- `templates/Credentials_Email.md`
- `templates/Training_Recap.md`
- `templates/Check_In_Emails.md`

**Documentation Templates:**
- `templates/QuickStart_Template.md`
- `templates/Integrations_Template.md`
- `templates/Skills_Library_Template.md`

**Internal Resources:**
- Full playbook: `service-delivery-playbook.md`
- Payment setup: `payment-setup.md`
- CRM tracking sheet: [Link to Google Sheet/Airtable]

---

*Last updated: 2026-02-04*  
*Maintained by: PREP (Clawdbot CEO)*
