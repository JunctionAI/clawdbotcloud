# Skill Upsell System - Implementation Spec

## Quick Reference

### Pricing Summary (Official Ally Feb 2026)

| Tier | Price | Key Features |
|------|-------|--------------|
| **Free** | $0/mo | 50 msg/day, 5 skills, 7-day memory |
| **Personal** | $9/mo | Unlimited, 15 skills, full memory |
| **Plus** | $19/mo | Unlimited skills, Gmail/Calendar, voice |
| **Pro** | $39/mo | API, custom workflows, priority |
| **Family** | $19/mo | 5 members, individual memories |

### Revenue Math

```
Personal user:                   $9/mo
Plus user:                       $19/mo
Pro user:                        $39/mo
Family user:                     $19/mo

Avg revenue per paid user:       $16/mo
1,000 paying users × $16 = $16,000 MRR = $192,000 ARR
```

---

## Upsell Trigger Matrix

### Immediate Triggers (In-Chat)

| User Says | Trigger Skill | Upsell Copy |
|-----------|---------------|-------------|
| "email", "inbox", "gmail", "send email" | Gmail | "I can read and send emails for you with Gmail Integration" |
| "calendar", "schedule", "meeting", "event" | Calendar | "I can manage your calendar with Calendar Sync" |
| "scrape", "website", "automate", "fill form" | Browser | "I can automate that with Browser Automation" |
| "voice", "speak", "call", "audio" | Voice | "I can talk and listen with Voice Assistant" |
| "parallel", "multiple agents", "team" | Multi-Agent | "I can run parallel workers with Multi-Agent Teams" |

### Proactive Triggers (After Pattern Detection)

| Pattern | Days | Action |
|---------|------|--------|
| Mentioned skill-related topic 5+ times | 7 | Soft upsell in chat |
| High usage (>50 msgs/day) | 14 | Suggest Pro upgrade |
| Tried to use skill 3+ times | 3 | Direct upsell |
| Active trial ending | 2 before | Conversion reminder |

---

## Upsell Message Templates

### Template 1: Contextual (Blocking)
```
I'd love to help with that! This needs **[SKILL NAME]**.

🔓 **What you'll get:**
• [Feature 1]
• [Feature 2]
• [Feature 3]

**$X/mo** • 7-day free trial • [ADD SKILL] [MAYBE LATER]

In the meantime, I can [ALTERNATIVE ACTION].
```

### Template 2: Proactive (Non-Blocking)
```
Hey! I noticed you've asked about [TOPIC] a few times.

With **[SKILL NAME]**, I could actually [DO THE THING] instead of 
just talking about it.

**Try free for 7 days?** [YES] [NOT NOW] [DON'T ASK AGAIN]
```

### Template 3: Bundle Suggestion (At Checkout)
```
Smart choice! 🎉

73% of [SKILL A] users also add [SKILL B].
**Bundle both for $X/mo** (save $Y).

[ADD BOTH] [JUST [SKILL A]]
```

---

## Rate Limiting Rules

| Rule | Value |
|------|-------|
| Max upsells per conversation | 1 |
| Cooldown after "Not now" | 7 days for that skill |
| "Don't ask again" | Permanent snooze |
| Max upsells per day | 2 |
| No upsells during hours | 22:00-08:00 local |
| First session | No upsells (let them experience value) |

---

## Database Schema

```sql
-- User subscriptions
CREATE TABLE subscriptions (
  user_id TEXT PRIMARY KEY,
  plan TEXT DEFAULT 'free', -- free, personal, plus, pro, family
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- Active skills per user
CREATE TABLE user_skills (
  user_id TEXT,
  skill_id TEXT,
  status TEXT, -- trial, active, cancelled
  trial_ends_at TIMESTAMP,
  started_at TIMESTAMP,
  cancelled_at TIMESTAMP,
  PRIMARY KEY (user_id, skill_id)
);

-- Upsell tracking
CREATE TABLE upsell_events (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  skill_id TEXT,
  trigger_type TEXT, -- contextual, proactive, checkout
  action TEXT, -- shown, clicked, dismissed, snoozed
  created_at TIMESTAMP
);

-- Skill snoozes
CREATE TABLE skill_snoozes (
  user_id TEXT,
  skill_id TEXT,
  snooze_until TIMESTAMP, -- NULL = permanent
  PRIMARY KEY (user_id, skill_id)
);
```

---

## Stripe Integration

### Price IDs (To Create)
```
# Official Ally Tiers (Feb 2026)
price_free               = $0/mo
price_personal_monthly   = $9/mo
price_plus_monthly       = $19/mo
price_pro_monthly        = $39/mo
price_family_monthly     = $19/mo

# Skills included by tier:
# Free: 5 skills, 50 msg/day, 7-day memory
# Personal: 15 skills, unlimited, full memory
# Plus: Unlimited skills, Gmail/Calendar, voice
# Pro: API, custom workflows, priority
# Family: 5 members, individual memories
```

### Adding a Skill
```typescript
async function addSkill(userId: string, skillId: string) {
  const user = await db.subscriptions.get(userId);
  const skill = SKILLS[skillId];
  
  // Add to Stripe subscription
  await stripe.subscriptionItems.create({
    subscription: user.stripe_subscription_id,
    price: skill.stripe_price_id,
    trial_end: Math.floor(Date.now()/1000) + (7 * 24 * 60 * 60) // 7-day trial
  });
  
  // Track in DB
  await db.user_skills.insert({
    user_id: userId,
    skill_id: skillId,
    status: 'trial',
    trial_ends_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    started_at: new Date()
  });
  
  // Analytics
  await analytics.track('skill_added', { userId, skillId });
}
```

---

## Success Metrics

| Metric | Target | How to Measure |
|--------|--------|----------------|
| Skill attach rate | 40% of paying users | user_skills / subscriptions |
| Avg skills per user | 1.8 | COUNT(user_skills) / COUNT(users) |
| Upsell click rate | 15% | clicked / shown |
| Upsell conversion | 25% | purchased / clicked |
| Trial → Paid | 60% | converted / trials started |
| Revenue per user | $28/mo | MRR / active users |

---

## Launch Checklist

### Phase 1: MVP (Week 1-2)
- [ ] Stripe products and prices created
- [ ] Database schema deployed
- [ ] Skill gating middleware
- [ ] Basic "you need X skill" message
- [ ] Gmail skill working end-to-end

### Phase 2: Polish (Week 3-4)
- [ ] Full marketplace UI
- [ ] Checkout flow
- [ ] Trial system
- [ ] Upsell rate limiting
- [ ] Calendar skill

### Phase 3: Optimization (Week 5-8)
- [ ] A/B testing framework
- [ ] Bundle pricing logic
- [ ] Remaining skills (Browser, Voice, Multi-Agent)
- [ ] Analytics dashboard
- [ ] Proactive upsell triggers
