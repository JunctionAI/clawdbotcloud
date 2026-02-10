# Onboarding Implementation Plan
## From Design to Launch

---

## Quick Reference

| Document | Purpose |
|----------|---------|
| `ONBOARDING-DESIGN.md` | Full strategy, psychology, flow design |
| `WIREFRAMES.md` | Visual specs, component library, animations |
| `COPY-DECK.md` | All copy, A/B variants, microcopy |
| `IMPLEMENTATION-PLAN.md` | This file — build order and metrics |

---

## The 60-Second Promise

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│    0-10s   Welcome + Hook                                │
│   10-30s   Quick Quiz (3 questions)                      │
│   30-50s   Personalized Setup                            │
│   50-60s   First "Aha Moment" ✨                         │
│                                                          │
│   GOAL: User feels value within 60 seconds               │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

---

## Implementation Phases

### Phase 1: Core Flow (MVP)
**Timeline: 1-2 days**

Build:
- [ ] Welcome screen with single CTA
- [ ] 3-question quiz flow
- [ ] Basic setup animation
- [ ] Chat interface with starter prompts
- [ ] One "aha" demo (research)

Skip for now:
- A/B testing infrastructure
- Advanced skill recommendations
- All prompt variations
- Analytics beyond basic

**Success criteria:** User can complete flow in <60s

---

### Phase 2: Personalization
**Timeline: 2-3 days**

Build:
- [ ] Skill recommendation engine based on quiz answers
- [ ] Personalized prompt suggestions
- [ ] Working style configuration (autonomy levels)
- [ ] Multiple "aha" demos (email, productivity, creative)

Add:
- [ ] Skip flow option
- [ ] "Show all skills" expansion
- [ ] Resume incomplete onboarding

**Success criteria:** Prompts feel relevant to user selections

---

### Phase 3: Polish & Optimization
**Timeline: 3-5 days**

Build:
- [ ] Full animation suite
- [ ] A/B testing framework
- [ ] Analytics events
- [ ] Error states and edge cases
- [ ] Responsive design (mobile + desktop)

Add:
- [ ] Progress persistence
- [ ] Re-onboarding option
- [ ] Onboarding analytics dashboard

**Success criteria:** 80%+ completion rate

---

### Phase 4: Iteration
**Timeline: Ongoing**

Based on data:
- [ ] A/B test copy variants
- [ ] Optimize question order
- [ ] Test 2-question vs 3-question
- [ ] Refine skill recommendations
- [ ] Improve aha moment timing

---

## Technical Architecture

### State Management

```typescript
interface OnboardingState {
  // Flow tracking
  currentStep: 'welcome' | 'quiz-1' | 'quiz-2' | 'quiz-3' | 'setup' | 'chat';
  startedAt: Date;
  completedAt?: Date;
  
  // Quiz answers
  useCases: string[];       // Q1: multi-select
  workingStyle: string;     // Q2: single select
  firstWin: string;         // Q3: single select
  
  // Computed
  recommendedSkills: string[];
  suggestedPrompts: string[];
  autonomyLevel: number;    // 1-10 based on Q2
  
  // Tracking
  skippedSteps: string[];
  timePerStep: Record<string, number>;
}
```

### Skill Recommendation Logic

```typescript
const SKILL_MATRIX = {
  'email-messages': ['email', 'message', 'contacts'],
  'research-learning': ['web_search', 'web_fetch', 'browser'],
  'tasks-productivity': ['calendar', 'memory', 'reminders'],
  'smart-home': ['nodes', 'automation'],
  'work-business': ['docs', 'spreadsheets', 'analytics'],
  'creative': ['tts', 'image', 'creative'],
};

function recommendSkills(useCases: string[]): string[] {
  const skills = new Set<string>();
  
  // Always recommend memory
  skills.add('memory');
  
  // Add based on selections
  useCases.forEach(useCase => {
    SKILL_MATRIX[useCase]?.forEach(skill => skills.add(skill));
  });
  
  // Prioritize by frequency across selections
  return Array.from(skills).slice(0, 5);
}
```

### Prompt Selection Logic

```typescript
const PROMPT_LIBRARY = {
  'research-learning': [
    'Research the best productivity apps for 2024',
    'Compare [A] vs [B] — pros and cons',
    'Summarize this article: [paste URL]',
  ],
  'email-messages': [
    'Check my inbox and tell me what\'s urgent',
    'Draft a follow-up email to [person]',
    'Find all unread emails this week',
  ],
  // ... etc
};

function selectPrompts(useCases: string[], firstWin: string): string[] {
  const prompts = [];
  
  // Primary use case prompts
  const primary = useCases[0];
  prompts.push(...(PROMPT_LIBRARY[primary] || []).slice(0, 2));
  
  // First win specific prompt
  if (firstWin === 'surprise') {
    prompts.push('Surprise me — show me something cool');
  }
  
  return prompts.slice(0, 3);
}
```

---

## Analytics Events

### Required Events (MVP)

```typescript
// Flow tracking
'onboarding_started'
'onboarding_step_viewed' { step }
'onboarding_step_completed' { step, timeMs }
'onboarding_completed' { totalTimeMs }
'onboarding_abandoned' { lastStep, timeMs }
'onboarding_skipped' { fromStep }

// Quiz events
'quiz_answered' { question, answers }

// Engagement
'prompt_tapped' { promptText, promptType }
'first_message_sent' { wasPrompt, promptType }
'aha_moment_triggered' { ahaType, timeMs }
```

### Nice-to-Have Events

```typescript
// Skill engagement
'skill_enabled' { skill }
'skill_skipped' { skill }
'skill_connect_clicked' { skill }

// Retention
'returned_day_1'
'returned_day_7'
'first_week_messages' { count }
```

---

## Success Metrics

### Primary KPIs

| Metric | Target | Measurement |
|--------|--------|-------------|
| Onboarding completion rate | >80% | completed / started |
| Time to completion | <60s | median time |
| First aha triggered | >70% | aha events in first session |
| First message sent | >90% | message sent in onboarding session |

### Secondary KPIs

| Metric | Target | Measurement |
|--------|--------|-------------|
| Day-1 return rate | >50% | returned within 24h |
| Day-7 return rate | >30% | returned within 7 days |
| Skills enabled | >2 avg | average skills enabled |
| Quiz completion | >90% | finished all 3 questions |

### Qualitative Signals

- User sends >5 messages in first session
- User tries multiple prompt types
- User asks "can you also do X?"
- User shares/refers someone

---

## A/B Test Plan

### Test 1: Welcome Copy
**Hypothesis:** Bold/direct copy converts better than warm/personal
**Variants:**
- A: Warm & Personal ("Hey, I'm your Clawdbot...")
- B: Bold & Direct ("Meet your new superpower...")
**Metric:** Click-through to quiz

### Test 2: Quiz Length
**Hypothesis:** 2 questions = higher completion, but 3 questions = better personalization
**Variants:**
- A: 3 questions (current)
- B: 2 questions (skip Q2 or Q3)
**Metric:** Completion rate + day-7 retention

### Test 3: Aha Delivery
**Hypothesis:** Showing work-in-progress increases perceived value
**Variants:**
- A: Progress animation (current)
- B: Instant response
**Metric:** First-session engagement + "wow" proxy

### Test 4: Skill Presentation
**Hypothesis:** Auto-enabling skills increases usage
**Variants:**
- A: Recommend + ask to enable (current)
- B: Auto-enable top 3, option to disable
**Metric:** Features used in first week

---

## Edge Cases

### User Skips Onboarding
```
→ Go directly to chat
→ Show generic prompts
→ Surface "Want me to personalize?" after first success
→ Track as separate cohort for analysis
```

### User Selects Nothing in Q1
```
→ Show "No worries — what do you want to try first?"
→ Present all prompt categories
→ Learn from first interactions
```

### User Selects Everything in Q1
```
→ "You want to do it all! Let's start with research."
→ Recommend research + memory (most universal)
→ Introduce others progressively
```

### User Abandons Mid-Flow
```
→ Save state to localStorage
→ On return: "Welcome back! Pick up where you left off?"
→ Option: "Start fresh"
```

### User Returns After Completing
```
→ Don't show onboarding again
→ Check for new skills available
→ Surface via "New: [skill]" badges in settings
```

---

## Checklist

### Pre-Launch
- [ ] All screens implemented
- [ ] Mobile responsive
- [ ] Analytics events firing
- [ ] Error states handled
- [ ] Loading states smooth
- [ ] Accessibility checked (keyboard nav, screen readers)

### Launch
- [ ] Feature flag enabled for % rollout
- [ ] A/B test infrastructure ready
- [ ] Dashboard monitoring completion rate
- [ ] Feedback collection mechanism

### Post-Launch (Week 1)
- [ ] Review completion rate
- [ ] Check abandonment points
- [ ] Analyze quiz answer distribution
- [ ] Review aha trigger rates
- [ ] Plan first A/B test

---

*Implementation plan complete. Ship it.*
