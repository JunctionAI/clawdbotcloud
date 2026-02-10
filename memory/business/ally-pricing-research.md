# Ally AI Assistant - Deep Pricing Research Report

**Date:** 2026-02-04
**Purpose:** Comprehensive pricing model analysis for Ally AI personal assistant

---

## 1. Skills/Features Pricing Models - Competitive Analysis

### Zapier Model: Task-Based + Tiered Features
| Tier | Price | Key Limits |
|------|-------|------------|
| Free | $0 | 100 tasks/mo, 2-step Zaps only, unlimited Zaps |
| Professional | $19.99/mo | Multi-step Zaps, webhooks, AI fields |
| Team | $69/mo | 25 users, shared workspace, SSO |
| Enterprise | Custom | Unlimited users, advanced admin |

**Key Insight:** Zapier bundles ALL integrations (7,000+ apps) at every tier. They monetize on **usage volume** (tasks), not feature gates. This creates smooth adoption - users never hit "this integration requires premium."

### IFTTT Model: Applet Limits (Friction-Heavy)
| Tier | Price | Applets |
|------|-------|---------|
| Free | $0 | 2 applets |
| Pro | $2.99/mo | 20 applets |
| Pro+ | $8.99/mo | Unlimited |

**Key Insight:** IFTTT's model creates immediate friction. Users hit the 2-applet wall fast, creating frustration rather than value demonstration. Multi-action requires paid. **This model LOSES to Zapier for a reason.**

### Notion Model: All Features, Per-Seat Scaling
| Tier | Price | Key Limits |
|------|-------|------------|
| Free | $0 | Unlimited blocks (solo), limited history |
| Plus | ~$10/seat | 30-day history, 100 guests |
| Business | ~$18/seat | 90-day history, SAML SSO |
| Enterprise | Custom | Unlimited history, advanced security |

**Key Insight:** Notion gives ALL features to everyone - the difference is **capacity, history, and collaboration**. No feature gating. Extremely smooth expansion path.

### Slack Model: Features + History Limits
| Tier | Price | Key Limits |
|------|-------|------------|
| Free | $0 | 90-day history, 10 apps, 1:1 only |
| Pro | $8.75/user | Unlimited history, unlimited apps |
| Business+ | $18/user | Advanced AI, SSO, SCIM |
| Enterprise+ | Custom | Enterprise search, DLP |

**Key Insight:** Slack's 10-app limit on free creates mild friction, but the 90-day history limit is the REAL upgrade driver. Users upgrade when they need to find old messages, not for more apps.

---

## 2. Integration Setup Models Analysis

### Model A: Self-Serve with Docs (Zapier/IFTTT)
- **Pros:** Scales infinitely, no support cost, tech-savvy users love it
- **Cons:** Abandonment at friction points, support tickets from confused users
- **Best for:** $0-15/mo price points

### Model B: Concierge/White-Glove (Enterprise)
- **Pros:** High close rates, builds relationships, justifies premium pricing
- **Cons:** Doesn't scale, expensive, requires sales team
- **Best for:** $100+/mo or enterprise deals

### Model C: Hybrid (Self-Serve + Paid Setup Calls)
- **Pros:** Options for both user types, additional revenue stream
- **Cons:** Complexity, users may feel "nickel-and-dimed"
- **Used by:** Notion (CSM for enterprise), Slack (onboarding for 101+)

### Consumer Expectations by Price Point
| Price Point | Expectation |
|-------------|-------------|
| Free | Self-serve only, community help acceptable |
| $5-15/mo | Self-serve with good docs, email support |
| $15-30/mo | Self-serve + chat support, video tutorials |
| $30-100/mo | Expectation of help if stuck, onboarding call welcome |
| $100+/mo | White-glove setup expected |

### Recommendation for Ally
**Hybrid-Lite Model:**
- Free-$15: Self-serve with excellent docs + video tutorials
- $29 Pro: Optional 30-min setup call (free, but scheduled)
- Consider "AI-guided setup" where Ally herself helps configure integrations

---

## 3. Team vs Personal Pricing Deep Dive

### Notion
- **Personal:** Free (solo), Plus at $10/seat
- **Team:** Same pricing, but "workspace" model
- **Family:** No explicit family plan - just add members

### Slack
- **Personal:** Technically possible, but designed for teams
- **Team:** Per-seat from the start
- **Family:** No family plan

### 1Password
- **Individual:** $2.99/mo
- **Families:** $4.99/mo (up to 5 members) - **66% discount vs 5 individuals**
- **Teams:** $7.99/seat
- **Business:** $7.99/seat + free Families account for each user

**Key Insight:** 1Password's "free Families for Business users" is brilliant - it ensures employees USE the product at home, creating stickiness.

### Todoist
- **Personal Free/Pro:** Individual pricing
- **Business:** $6/user/mo - adds team workspace, shared templates

### Claude/ChatGPT
- **Individual:** $17-20/mo
- **Team:** $20-25/seat (Claude), Business tier (ChatGPT)
- **Family:** Neither offers this

### Key Patterns
1. **Family plans work at $5-15/mo price points** (value-conscious consumers)
2. **Team plans appear at $15-30/mo+** (justifiable business expense)
3. **Per-seat is standard** - flat team pricing is rare
4. **Family discounts are typically 40-60%** vs individual pricing

---

## 4. Upgrade Triggers & Psychology

### What Makes People Upgrade (Ranked by Effectiveness)

1. **Usage limits hit** (Zapier tasks, IFTTT applets)
   - Most effective when limit is hit DURING active use
   - Frustrating if limit blocks critical workflow

2. **Feature unlocks for discovered needs**
   - "I want to do X" → "That's in the Pro plan"
   - Works when feature is genuinely valuable

3. **Team/sharing needs**
   - "My partner wants this too"
   - Natural expansion revenue

4. **History/storage limits**
   - Slack's 90-day history is perfect example
   - Creates "oh no" moment when searching for old content

5. **Support access**
   - "I'm stuck, I need help"
   - Works for complex products

6. **FOMO/early access**
   - ChatGPT Pro's "research preview features"
   - Works for power users/enthusiasts

### What Causes Churn

1. **Perceived complexity** → "I'm paying but not using this"
2. **Hidden costs** → "Wait, this costs extra too?"
3. **Feature gates on basics** → "I can't even do X without paying?"
4. **Poor onboarding** → Never got value, never engaged
5. **Price shock at renewal** → Especially annual plans
6. **Better alternatives emerge** → Competitive switching

### Smooth Expansion Revenue Design
1. **Land with value** - Free tier must be genuinely useful
2. **Expand with usage** - Limits should correlate with value received
3. **Upgrade with need** - Don't push, let users pull
4. **Retain with habit** - Daily engagement prevents churn

---

## 5. Competitive Pricing Deep Dive

### AI Assistants (Direct Competitors)

| Product | Free | Mid | High | Team |
|---------|------|-----|------|------|
| ChatGPT | Free (limited) | Plus $20/mo | Pro $200/mo | Business $25/seat |
| Claude | Free (limited) | Pro $17-20/mo | Max $100+/mo | Team $20-25/seat |
| Grammarly | Free (100 AI prompts) | Pro $12/mo | - | Enterprise |

### Productivity Tools (Adjacent)

| Product | Free | Personal | Business |
|---------|------|----------|----------|
| Notion | Free | Plus $10/seat | Business $18/seat |
| Todoist | Free | Pro ~$5/mo | Business $6/seat |
| 1Password | - | $2.99/mo | Teams $7.99/seat |

### Automation Tools

| Product | Free | Personal | Team |
|---------|------|----------|------|
| Zapier | Free (100 tasks) | Pro $19.99/mo | Team $69/mo |
| IFTTT | Free (2 applets) | Pro $2.99/mo | Pro+ $8.99/mo |

### Price Positioning Analysis

**Ally's proposed $7 Personal sits between:**
- IFTTT Pro ($2.99) - too cheap, perceived as simple
- Todoist Pro (~$5) - task management only
- Notion Plus ($10) - workspace tool
- Grammarly Pro ($12) - writing only
- Claude Pro ($17) - raw AI access

**$7 signals:** "More than a simple tool, less than premium AI"

This is a **value positioning problem**. At $7, Ally risks being seen as "cheaper ChatGPT" rather than "AI assistant that handles your life."

---

## 6. OFFICIAL ALLY PRICING (Feb 2026)

### Tier Structure

| Tier | Price | Target User |
|------|-------|-------------|
| **Free** | $0 | 50 msg/day, 5 skills, 7-day memory |
| **Personal** | $9/mo | Unlimited, 15 skills, full memory |
| **Plus** | $19/mo | Unlimited skills, Gmail/Calendar, voice |
| **Pro** | $39/mo | API, custom workflows, priority |
| **Family** | $19/mo | 5 members, individual memories |

### Rationale for Pricing Changes

**$9 Personal (up from $7):**
- $7 signals "cheap" - $9 signals "value"
- Psychologically past the $5 "impulse buy" threshold but accessible
- Room for discounts (annual = $7.50/mo effective)

**$19 Plus (up from $15):**
- Matches Claude Pro's value perception
- Clear upgrade path from Personal
- Power user positioning

**$39 Pro (up from $29):**
- Positions as professional tool
- Comparable to business tool pricing
- Includes "everything unlimited"

**$19 Family (new):**
- 5 members for price of 2 Personal accounts
- Family assistant use case is HUGE
- Competitors don't offer this

### What's Included at Each Tier

#### Free
- 5 skills (user choice)
- 50 AI tasks/day
- 7-day memory
- Self-serve setup
- Community support
- Basic integrations (calendar, reminders, notes)

#### Personal ($9/mo)
- 15 skills
- 200 AI tasks/day
- 30-day memory
- Email support
- All basic integrations
- 1 premium integration (choose: email, smart home, etc.)

#### Plus ($19/mo)
- Unlimited skills
- Unlimited AI tasks
- 90-day memory
- Priority support
- All integrations
- Extended thinking for complex tasks
- Proactive suggestions

#### Pro ($39/mo)
- Everything in Plus
- Unlimited memory
- Phone/video support
- White-glove setup call
- API access
- Custom skill development
- Priority access to new features

#### Family ($19/mo)
- Up to 5 members
- Each gets Personal-level access
- Shared family calendar/tasks
- Individual privacy controls
- Family-wide memory for shared context

#### Team ($29/seat/mo)
- Everything in Plus per user
- Shared workspace
- Team admin controls
- Centralized billing
- SSO support
- Usage analytics

### Skills Handling: BUNDLED (Not À La Carte)

**Recommendation: Bundle all skills, limit by tier count**

**Why NOT per-skill pricing:**
1. Creates purchasing friction at every new use case
2. Users don't know what they need upfront
3. Competitors bundle (Zapier, Notion, Claude)
4. Admin/billing complexity
5. Churn risk when skill isn't used

**Why NOT unlimited at all tiers:**
1. No upgrade reason
2. Overwhelms free users
3. Can't demonstrate value progression

**Why tiered skill counts work:**
1. Natural expansion path (want more → upgrade)
2. Users choose their priorities
3. Simple to understand
4. Forces focus on core use cases first

### Integration Approach: Self-Serve + AI-Assisted

**Model: "Ally helps you set up"**

1. **Self-serve portal** for all integrations
2. **Ally-guided setup** - Ally walks users through OAuth, configuration
3. **Video tutorials** for complex integrations
4. **Pro tier**: 30-min human setup call included

**Key insight:** Ally IS the setup assistant. This is a competitive advantage over Zapier's pure self-serve.

Example flow:
> User: "Connect my email"
> Ally: "I'd love to help with that! I can work with Gmail, Outlook, or other providers. Which do you use?"
> [Guides through OAuth]
> Ally: "Perfect! I can now read your emails. Want me to summarize your unread messages each morning, or would you prefer I only alert you to important ones?"

### Upgrade Path Design

```
FREE → Personal: "Get more skills + longer memory"
         ↓
Personal → Plus: "Unlimited everything + priority support"
         ↓
Plus → Pro: "Professional features + API + concierge"

FREE → Family: "Share with your household"

Personal (x3) → Team: "Work together, save money"
```

**Upgrade triggers by tier:**

| From | To | Trigger |
|------|----|---------|
| Free | Personal | Hit 5-skill limit, want 30-day memory |
| Personal | Plus | Hit 15-skill limit, want unlimited AI |
| Plus | Pro | Need API, want phone support |
| Personal | Family | "My partner wants this" |
| Multiple Personal | Team | "We need shared workspace" |

---

## 7. Implementation Recommendations

### Phase 1: Launch (MVP)
- Free + Personal ($9) only
- 10 core skills
- Self-serve setup with Ally guidance
- Email support

### Phase 2: Expansion (Month 3-6)
- Add Plus ($19) tier
- 20+ skills
- Add Family plan ($19)
- Add proactive features to Plus

### Phase 3: Professional (Month 6-12)
- Add Pro ($39) tier
- Team tier ($29/seat)
- API access
- Phone support for Pro
- White-glove setup

### Metrics to Track
1. **Free → Paid conversion rate** (target: 5-10%)
2. **Time to first upgrade** (target: <14 days)
3. **Tier upgrade rate** (Personal → Plus)
4. **Churn by tier** (target: <5% monthly)
5. **Family/Team expansion rate**
6. **Skills activated per user**
7. **Daily active usage**

---

## 8. OFFICIAL ALLY PRICING (Feb 2026)

| Tier | Monthly | Annual | Key Value |
|------|---------|--------|-----------|
| Free | $0 | $0 | 50 msg/day, 5 skills, 7-day memory |
| Personal | $9 | $90 ($7.50/mo) | Unlimited, 15 skills, full memory |
| Plus | $19 | $190 ($15.83/mo) | Unlimited skills, Gmail/Calendar, voice |
| Pro | $39 | $390 ($32.50/mo) | API, custom workflows, priority |
| Family | $19 | $190 | 5 members, individual memories |

**Key Differentiators:**
1. **AI-assisted setup** (Ally guides you)
2. **Family plan** (competitors don't have this at $19!)
3. **Bundled skills** (no nickel-and-diming)
4. **Memory tiers** (value increases with usage history)
5. **Personal assistant positioning** (not "AI chatbot")

**Tagline:**
- "Life, handled"

---

*Research compiled from: Zapier, IFTTT, Notion, Slack, ChatGPT, Claude, Grammarly, Todoist, 1Password pricing pages - February 2026*
