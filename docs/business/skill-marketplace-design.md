# Clawdbot Skill Marketplace Design

## Executive Summary

The Skill Marketplace transforms Clawdbot from a flat subscription into a modular, pay-for-what-you-need platform. Users start with a capable base product and unlock premium capabilities as their needs grow—creating sticky recurring revenue and natural expansion paths.

---

## 1. Pricing Architecture

### Base Subscription Tiers

| Tier | Price | Included | Target User |
|------|-------|----------|-------------|
| **Free** | $0/mo | 5 skills, 50 msg/day, 7-day memory | Tire-kickers, students |
| **Personal** | $9/mo | 15 skills, unlimited, full memory | Individual users |
| **Plus** | $19/mo | Unlimited skills, Gmail/Calendar, voice | Power users |
| **Pro** | $39/mo | API, custom workflows, priority | Professionals |
| **Family** | $19/mo | 5 members, individual memories | Households |

### Premium Skills (À La Carte)

| Skill | Price | Monthly Cost | What It Unlocks |
|-------|-------|--------------|-----------------|
| 📧 **Gmail Integration** | $5/mo | $5 | Read/send emails, draft management, smart filters |
| 📅 **Calendar Sync** | $5/mo | $5 | Google/Outlook sync, scheduling, reminders |
| 🌐 **Browser Automation** | $10/mo | $10 | Web scraping, form filling, automated workflows |
| 🎙️ **Voice Assistant** | $15/mo | $15 | Voice input/output, phone calls, voice notes |
| 👥 **Multi-Agent Teams** | $20/mo | $20 | Parallel agents, specialized workers, orchestration |

### Skill Bundles (Discounted)

| Bundle | Skills Included | Individual Price | Bundle Price | Savings |
|--------|-----------------|------------------|--------------|---------|
| **Productivity Pack** | Gmail + Calendar | $10/mo | $8/mo | 20% |
| **Automation Suite** | Browser + Voice | $25/mo | $20/mo | 20% |
| **Power User Pack** | All 5 skills | $55/mo | $39/mo | 29% |
| **Business Complete** | All skills + Priority support | $55/mo | $49/mo | 11% + support |

---

## 2. Revenue Model Projections

### Per-User Economics

```
Base Personal User:    $9/mo
Average Skill Attach:  1.8 skills @ avg $9/mo = $16.20
Average Revenue:       $25.20/mo per active user

Target breakdown:
- 40% stay Personal only ($9) 
- 30% upgrade to Plus ($19)
- 20% upgrade to Pro ($39)
- 10% Family plan ($19 for 5)
```

### Monthly Revenue @ 1,000 Users

```
Base subscriptions:    $15,000 (avg $15/user)
Upgrade revenue:       $8,000 (avg $8/user)
Total MRR:             $23,000
Annual Run Rate:       $276,000
```

---

## 3. UI Mockups

### 3.1 Marketplace Dashboard

```
┌─────────────────────────────────────────────────────────────────────────┐
│  🏪 SKILL MARKETPLACE                                    [Your Plan: Personal]
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ⚡ RECOMMENDED FOR YOU                                                 │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  📧 Gmail Integration                                            │   │
│  │  "You mentioned emails 12 times this week"           $5/mo [ADD] │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                         │
│  📦 YOUR ACTIVE SKILLS                                                  │
│  ┌──────────────┐                                                       │
│  │ (none yet)   │  → Start with Gmail or Calendar to 10x productivity  │
│  └──────────────┘                                                       │
│                                                                         │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                         │
│  🛒 AVAILABLE SKILLS                                                    │
│                                                                         │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐         │
│  │  📧 GMAIL       │  │  📅 CALENDAR    │  │  🌐 BROWSER     │         │
│  │                 │  │                 │  │                 │         │
│  │  Read & send    │  │  Sync Google/   │  │  Automate any   │         │
│  │  emails, drafts │  │  Outlook, smart │  │  website, forms │         │
│  │  & filters      │  │  scheduling     │  │  & scraping     │         │
│  │                 │  │                 │  │                 │         │
│  │  ⭐⭐⭐⭐⭐ (142)   │  │  ⭐⭐⭐⭐⭐ (98)    │  │  ⭐⭐⭐⭐½ (67)    │         │
│  │  $5/mo    [ADD] │  │  $5/mo    [ADD] │  │  $10/mo   [ADD] │         │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘         │
│                                                                         │
│  ┌─────────────────┐  ┌─────────────────┐                              │
│  │  🎙️ VOICE       │  │  👥 MULTI-AGENT │                              │
│  │                 │  │                 │                              │
│  │  Voice input/   │  │  Parallel AI    │                              │
│  │  output, calls  │  │  workers, team  │                              │
│  │  & voice notes  │  │  orchestration  │                              │
│  │                 │  │                 │                              │
│  │  ⭐⭐⭐⭐⭐ (54)    │  │  ⭐⭐⭐⭐⭐ (31)    │                              │
│  │  $15/mo   [ADD] │  │  $20/mo   [ADD] │                              │
│  └─────────────────┘  └─────────────────┘                              │
│                                                                         │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                         │
│  💎 BUNDLES - SAVE UP TO 29%                                            │
│                                                                         │
│  ┌─────────────────────────────────────────┐                           │
│  │  🎯 POWER USER PACK                     │                           │
│  │  All 5 skills • $39/mo (was $55)        │                           │
│  │  ████████████████░░░░ 71% claimed       │    [GET BUNDLE]           │
│  └─────────────────────────────────────────┘                           │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Skill Detail Page

```
┌─────────────────────────────────────────────────────────────────────────┐
│  ← Back to Marketplace                                                  │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  📧 GMAIL INTEGRATION                                                   │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                         │
│  $5/month                                    ⭐⭐⭐⭐⭐ 4.9 (142 reviews)  │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                    [  ADD TO MY SKILLS - $5/mo  ]                │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  💡 Bundle with Calendar for $8/mo (save $2)                            │
│                                                                         │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                         │
│  ✨ WHAT YOU CAN DO                                                     │
│                                                                         │
│  ✓ "Read my unread emails"                                              │
│  ✓ "Draft a reply to Sarah's email"                                     │
│  ✓ "Send the meeting notes to the team"                                 │
│  ✓ "Find all emails from Amazon this month"                             │
│  ✓ "Summarize my inbox"                                                 │
│  ✓ "Set up a filter for newsletters"                                    │
│                                                                         │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                         │
│  🎬 SEE IT IN ACTION                                                    │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  [VIDEO THUMBNAIL]                                               │   │
│  │                                                                   │   │
│  │  "Check my email and draft replies"                              │   │
│  │  ▶ Watch 45-second demo                                          │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                         │
│  💬 WHAT USERS SAY                                                      │
│                                                                         │
│  "Saves me 30 minutes every morning"                    - @productivePM │
│  "Finally an AI that actually handles my email"         - @startupfounder│
│  "The draft feature is incredible"                      - @remoteworker │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 3.3 In-Chat Upsell (Contextual)

```
┌─────────────────────────────────────────────────────────────────────────┐
│  YOU: Can you check my email for anything urgent?                       │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  CLAWDBOT:                                                              │
│                                                                         │
│  I'd love to help with your email! 📧                                   │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  🔓 UNLOCK GMAIL INTEGRATION                                     │   │
│  │                                                                   │   │
│  │  • Read and summarize your inbox                                 │   │
│  │  • Draft and send emails                                         │   │
│  │  • Smart filters and search                                      │   │
│  │                                                                   │   │
│  │  $5/month  •  Cancel anytime  •  2-minute setup                  │   │
│  │                                                                   │   │
│  │  [ ADD GMAIL SKILL ]     [ MAYBE LATER ]                         │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  In the meantime, I can help you compose emails that you copy/paste,   │
│  or set reminders to check your inbox manually.                         │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### 3.4 Checkout Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│  🛒 ADD SKILL                                          Step 1 of 2      │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  📧 Gmail Integration                                           $5/mo   │
│                                                                         │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                         │
│  💡 COMPLETE YOUR SETUP                                                 │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │  ☐ Add Calendar Sync too                              +$3/mo    │   │
│  │    (Bundle price: $8/mo instead of $10)                         │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│                                                                         │
│  ORDER SUMMARY                                                          │
│                                                                         │
│  Current plan (Personal)                                         $9/mo  │
│  Gmail Integration                                              + $5/mo │
│  ─────────────────────────────────────────────────────────────────────  │
│  New monthly total                                              $17/mo  │
│                                                                         │
│  ✓ 7-day free trial included                                            │
│  ✓ Cancel anytime, no questions asked                                   │
│  ✓ Prorated billing (pay only for days used)                            │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │              [ CONFIRM & START FREE TRIAL ]                      │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  By confirming, you agree to our Terms of Service.                      │
│  Billing starts after 7-day trial unless cancelled.                     │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Upsell Flow Design

### 4.1 Trigger Points (When to Upsell)

| Trigger | Skill to Suggest | Timing |
|---------|------------------|--------|
| User mentions "email" | Gmail Integration | Immediate, contextual |
| User asks about schedule/meetings | Calendar Sync | Immediate, contextual |
| User wants to scrape a website | Browser Automation | Immediate, contextual |
| User asks for voice/audio | Voice Assistant | Immediate, contextual |
| User wants parallel tasks | Multi-Agent Teams | After explaining limitation |
| 7 days of active use | Any unused skill | Proactive suggestion |
| User completes onboarding | Productivity Pack | Welcome email |
| User's trial ending | Current skill or bundle | 2 days before |

### 4.2 Upsell Message Templates

**Contextual (In-Chat):**
```
I can help with that! This needs [SKILL NAME] which unlocks:
• [Benefit 1]
• [Benefit 2]  
• [Benefit 3]

$X/month • 7-day free trial • [ADD SKILL] or [MAYBE LATER]

For now, here's what I can do without it: [alternative]
```

**Proactive (After Usage Patterns):**
```
Hey! I noticed you've asked about [TOPIC] 8 times this week.

With [SKILL NAME], I could actually [DO THE THING] instead of 
just talking about it. Want to try it free for 7 days?

[YES, ADD IT] • [NOT NOW] • [DON'T ASK AGAIN]
```

**Bundle Suggestion (At Checkout):**
```
Smart choice! 🎉

Quick thought: 73% of Gmail users also get Calendar Sync.
Bundle both for $8/mo (save $2/mo).

[ADD CALENDAR TOO +$3] • [JUST GMAIL]
```

### 4.3 Anti-Annoyance Rules

1. **Max 1 upsell per conversation** - Never double-tap
2. **Respect "Not now"** - Don't mention same skill for 7 days
3. **Respect "Don't ask again"** - Permanent snooze for that skill
4. **Value first** - Always provide alternative help, don't dead-end
5. **No upsells after 10pm** - Respect user's time
6. **No upsells in first session** - Let them experience value first

---

## 5. Technical Implementation

### 5.1 Skill Gating Architecture

```typescript
// skills/registry.ts
interface Skill {
  id: string;
  name: string;
  price: number;
  features: string[];
  requiredScopes: string[];
  trialDays: number;
}

const SKILLS: Skill[] = [
  {
    id: 'gmail',
    name: 'Gmail Integration',
    price: 500, // cents
    features: ['email.read', 'email.send', 'email.draft'],
    requiredScopes: ['https://www.googleapis.com/auth/gmail.modify'],
    trialDays: 7
  },
  // ... other skills
];

// Check if user has skill
async function hasSkill(userId: string, skillId: string): Promise<boolean> {
  const subscription = await getSubscription(userId);
  return subscription.activeSkills.includes(skillId) ||
         subscription.trialSkills.includes(skillId);
}

// Skill gate decorator
function requiresSkill(skillId: string) {
  return function(target: any, key: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    descriptor.value = async function(...args: any[]) {
      const userId = args[0].userId;
      if (!await hasSkill(userId, skillId)) {
        return createUpsellResponse(skillId);
      }
      return original.apply(this, args);
    };
  };
}
```

### 5.2 Billing Integration (Stripe)

```typescript
// billing/stripe.ts
async function addSkill(userId: string, skillId: string, withTrial: boolean) {
  const skill = SKILLS.find(s => s.id === skillId);
  const customer = await stripe.customers.retrieve(userId);
  
  await stripe.subscriptionItems.create({
    subscription: customer.subscriptionId,
    price: skill.stripePriceId,
    trial_end: withTrial ? Math.floor(Date.now()/1000) + (7*24*60*60) : undefined
  });
  
  // Update user's active skills
  await db.users.update(userId, {
    activeSkills: [...user.activeSkills, skillId]
  });
  
  // Track for analytics
  await analytics.track('skill_added', { userId, skillId, withTrial });
}
```

### 5.3 Upsell Tracking

```typescript
// upsell/tracker.ts
interface UpsellEvent {
  userId: string;
  skillId: string;
  trigger: 'contextual' | 'proactive' | 'checkout';
  action: 'shown' | 'clicked' | 'dismissed' | 'snoozed';
  timestamp: Date;
}

// Rate limiting
async function canShowUpsell(userId: string, skillId: string): Promise<boolean> {
  const recentUpsells = await getRecentUpsells(userId, skillId, 7); // 7 days
  const snoozed = await isSkillSnoozed(userId, skillId);
  const todayCount = await getTodayUpsellCount(userId);
  
  return !snoozed && recentUpsells.length === 0 && todayCount < 2;
}
```

---

## 6. Onboarding & Activation

### 6.1 New User Journey

```
Day 0: Sign up
├── Welcome email with "What can Clawdbot do?" video
├── First chat session (no upsells)
└── End of session: "Want to explore premium skills?" (soft)

Day 1-3: Getting comfortable
├── Learn usage patterns
├── Note skill-relevant requests
└── No active upselling

Day 4-7: First upsell window
├── If user requested skill-related help 3+ times:
│   └── Contextual upsell with free trial
├── If power user behavior detected:
│   └── Suggest Power User Pack
└── Otherwise: Continue observing

Day 7+: Ongoing optimization
├── Contextual upsells when relevant
├── Monthly "unlock more" email
└── Usage-based recommendations
```

### 6.2 Skill Activation Flow

```
User adds skill
    ↓
OAuth/Setup required?
    ├── Yes → Guide through connection (Gmail, Calendar)
    └── No → Immediate activation
    ↓
Confirmation message:
"✅ Gmail Integration is now active! Try saying:
 • 'Read my unread emails'
 • 'Draft a reply to the last email'
 • 'Find emails from [person]'"
    ↓
First use celebration:
"🎉 You just read your first email through me! 
 This is going to save you so much time."
```

---

## 7. Metrics & Success Criteria

### Key Metrics to Track

| Metric | Target | Current |
|--------|--------|---------|
| Skill attach rate | 40% | - |
| Avg skills per paying user | 1.8 | - |
| Trial → Paid conversion | 60% | - |
| Upsell click rate | 15% | - |
| Upsell → Purchase rate | 25% | - |
| Churn (with skills) | <5%/mo | - |
| Revenue per user | $28/mo | - |

### A/B Tests to Run

1. **Free trial length**: 7 days vs 14 days
2. **Bundle discount**: 20% vs 30%
3. **Upsell timing**: Immediate vs end-of-session
4. **Pricing**: Current vs $1 higher each
5. **Checkout friction**: 1-click vs confirmation step

---

## 8. Competitive Positioning

### How We Compare

| Feature | Clawdbot | ChatGPT Plus | Claude Pro | Notion AI |
|---------|----------|--------------|------------|-----------|
| Base price | $12 | $20 | $20 | $10 |
| Email integration | $5 add-on | ❌ | ❌ | ❌ |
| Calendar sync | $5 add-on | ❌ | ❌ | ❌ |
| Browser automation | $10 add-on | ❌ | ❌ | ❌ |
| Voice | $15 add-on | $20 included | ❌ | ❌ |
| Multi-agent | $20 add-on | ❌ | ❌ | ❌ |
| **Max capability** | **$51** | **$20** | **$20** | **$10** |

**Our advantage**: Pay for what you use. Don't need voice? Don't pay for it. Need everything? Still competitive.

---

## 9. Launch Plan

### Phase 1: MVP (Week 1-2)
- [ ] Skill gating infrastructure
- [ ] Basic marketplace UI
- [ ] Stripe integration for skill billing
- [ ] Gmail skill (first skill to launch)

### Phase 2: Polish (Week 3-4)
- [ ] Contextual upsell system
- [ ] Bundle pricing
- [ ] Calendar skill
- [ ] Trial system

### Phase 3: Scale (Week 5-8)
- [ ] Browser automation skill
- [ ] Voice skill
- [ ] Multi-agent skill
- [ ] A/B testing framework
- [ ] Advanced analytics

---

## 10. Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Users feel nickel-and-dimed | Generous free tier, always provide alternatives |
| Low skill attach rate | Better contextual triggers, compelling demos |
| High trial churn | Onboarding optimization, activation emails |
| Complex billing issues | Clear prorating, easy cancellation |
| Feature parity pressure | Focus on unique integrations competitors can't match |

---

## Summary

The Skill Marketplace transforms Clawdbot's revenue model from "one subscription fits all" to "grow with your needs." 

**Key principles:**
1. **Value first** - Always help, then upsell
2. **Clear pricing** - No surprises, easy to understand
3. **Frictionless** - One click to add, instant activation
4. **Respectful** - Smart rate limiting, easy opt-out
5. **Compelling** - Real value, not arbitrary paywalls

**Expected impact:**
- 2.3x revenue per user ($12 → $28 average)
- Higher retention (invested users churn less)
- Natural expansion revenue (users grow into more skills)
- Competitive differentiation (modularity vs monolithic)
