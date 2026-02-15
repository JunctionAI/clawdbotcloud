# Design Queue Workflow

> How design briefs flow from request → queue → execution → delivery

---

## 🔄 The Design Queue Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           DESIGN QUEUE WORKFLOW                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌────────┐ │
│  │ REQUEST  │───▶│  QUEUED  │───▶│ DESIGN   │───▶│  REVIEW  │───▶│ DELIVER│ │
│  └──────────┘    └──────────┘    └──────────┘    └──────────┘    └────────┘ │
│       │              │               │               │               │       │
│       │              │               │               │               │       │
│    AI Agent      Priority         Designer       Requestor        Assets    │
│    generates     assigned         pulls &        approves         stored    │
│    brief         by FURY         executes        or revises      & shared   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📍 Stage Definitions

### 1. REQUEST (`request`)
**Trigger:** AI agent identifies design need during content/campaign work

**Who:** Any AI agent or human team member

**Actions:**
1. Fill out design brief template
2. Add all required specifications
3. Include reference materials
4. Set initial priority estimate

**Output:** Completed brief saved to `/design-queue/briefs/`

---

### 2. QUEUED (`queued`)
**Trigger:** New brief submitted

**Who:** FURY (Queue Manager)

**Actions:**
1. Review brief for completeness
2. Assign official priority (🔴🟠🟡🟢)
3. Set realistic due date
4. Add to queue in priority order
5. Notify designer of new work

**Output:** Brief prioritized and ready for pickup

**Priority Criteria:**
| Priority | Criteria | Typical Turnaround |
|----------|----------|-------------------|
| 🔴 Urgent | Blocking launch/live campaign | Same day |
| 🟠 High | Client-facing, time-sensitive | 1-2 days |
| 🟡 Medium | Important but flexible | 3-5 days |
| 🟢 Low | Nice-to-have, internal | 1 week+ |

---

### 3. DESIGN (`in-progress`)
**Trigger:** Designer picks up brief from queue

**Who:** Human Designer

**Actions:**
1. Review brief thoroughly
2. Ask clarifying questions (if needed)
3. Create design following specifications
4. Self-review against brand guidelines
5. Submit for review

**Output:** Draft design(s) ready for review

**Designer Guidelines:**
- Always work highest priority first (unless blocked)
- Mark brief as `in-progress` when starting
- Keep AI updated on progress/blockers
- Aim for 80% on first pass — don't over-polish

---

### 4. REVIEW (`review`)
**Trigger:** Designer submits draft

**Who:** Requestor (AI agent or human)

**Actions:**
1. Review against original brief requirements
2. Check brand compliance
3. Evaluate effectiveness for intended use
4. Provide specific, actionable feedback

**Outcomes:**
- **Approved** → Move to `approved`
- **Minor Revisions** → Move to `revision` with notes
- **Major Issues** → Back to `in-progress` with detailed feedback

**Review Checklist:**
- [ ] Matches requested dimensions/format
- [ ] All required elements present
- [ ] Brand colors correct
- [ ] Typography correct
- [ ] Messaging clear and accurate
- [ ] Suitable for intended platform
- [ ] No spelling/grammar errors

---

### 5. REVISION (`revision`)
**Trigger:** Review requests changes

**Who:** Human Designer

**Actions:**
1. Review feedback carefully
2. Make requested changes
3. Resubmit for review

**Rules:**
- First revision included in scope
- Multiple rounds = priority discussion
- If unclear on feedback, ask before doing

---

### 6. APPROVED (`approved`)
**Trigger:** Design passes review

**Who:** FURY / Requestor

**Actions:**
1. Final sign-off recorded
2. Prepare for delivery
3. Update brief status

---

### 7. DELIVERED (`delivered`)
**Trigger:** Approved design finalized

**Who:** Designer / FURY

**Actions:**
1. Export all required formats
2. Name files according to convention
3. Upload to asset library
4. Update brief with delivery locations
5. Notify requestor of completion
6. Archive brief

**File Naming Convention:**
```
{project}_{asset-type}_{descriptor}_{version}.{ext}

Examples:
junction_social_linkedin-post_ai-curve_v1.png
junction_blog_header_seo-strategy_v2.webp
junction_email_banner_welcome-series_final.png
```

**Asset Storage:**
```
/projects/junction/assets/
├── social/
├── blog/
├── email/
├── website/
├── presentations/
└── archive/
```

---

## 📊 Queue Dashboard

### Active Queue View
```markdown
## 🎨 Design Queue — Active Briefs

| ID | Title | Priority | Designer | Status | Due |
|----|-------|----------|----------|--------|-----|
| DB-2026-02-11-001 | SEO Blog Headers | 🟠 High | Unassigned | queued | Feb 12 |
| DB-2026-02-11-002 | Social Templates | 🟡 Medium | Jake | in-progress | Feb 14 |
| DB-2026-02-11-003 | Email Banners | 🟢 Low | — | queued | Feb 18 |
```

### Metrics to Track
- **Queue Depth:** How many briefs waiting?
- **Avg. Turnaround:** Request → Delivered time
- **Revision Rate:** % of briefs needing revisions
- **On-Time Delivery:** % delivered by due date

---

## 🔔 Notifications & Communication

### When to Notify Designer
- New 🔴 Urgent brief added
- Daily: Queue summary (if items waiting)
- Priority change on their assigned work

### When to Notify Requestor
- Brief picked up (in-progress)
- Draft ready for review
- Questions from designer
- Final delivery complete

### Communication Channels
- **Primary:** Slack/Discord #design-queue channel
- **Urgent:** Direct message
- **Updates:** Brief file comments

---

## ⚡ Quick Reference

### For AI Agents (Requestors)
1. Use the brief template — fill it out completely
2. Provide references and context
3. Be specific about dimensions and formats
4. Respond promptly to review requests

### For Designers
1. Check queue daily
2. Work in priority order
3. Update status as you go
4. Ask questions early, not late

### For FURY (Queue Manager)
1. Review new briefs same day
2. Prioritize based on business impact
3. Balance designer workload
4. Escalate blockers immediately

---

## 📁 File Structure

```
/projects/junction/design-queue/
├── design-brief-template.md    # Master template
├── queue-workflow.md           # This document
├── briefs/                     # All briefs
│   ├── active/                 # Briefs in progress
│   │   ├── DB-2026-02-11-001.md
│   │   └── DB-2026-02-11-002.md
│   ├── completed/              # Delivered briefs (archive)
│   │   └── DB-2026-02-10-001.md
│   └── templates/              # Pre-filled templates for common requests
│       ├── social-post-brief.md
│       └── blog-header-brief.md
└── README.md                   # Quick start guide
```

---

## 📈 Continuous Improvement

### Weekly Review
Every Friday:
1. Review completed briefs
2. Identify patterns in revisions
3. Update templates if needed
4. Celebrate wins 🎉

### Template Updates
When you see repeated:
- Missing information in briefs
- Same questions from designer
- Similar feedback in reviews

→ Update the template to prevent it.

---

*Workflow Version: 1.0 | Last Updated: 2026-02-11*
