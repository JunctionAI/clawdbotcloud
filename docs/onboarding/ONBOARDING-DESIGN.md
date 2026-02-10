# Clawdbot Onboarding Flow Design
## Goal: User feels value within 60 seconds

---

## Overview

**The 60-Second Promise:**
```
0-10s  → Welcome + Excitement
10-30s → Quick Quiz (3 questions)
30-50s → Personalized Setup
50-60s → First "Aha Moment" ✨
```

**Core Principle:** Don't explain what Clawdbot CAN do. Show what it WILL do for THEM.

---

## Phase 1: Welcome Screen (0-10 seconds)

### Wireframe
```
┌─────────────────────────────────────────────────────┐
│                                                     │
│                    🤖 ✨                            │
│                                                     │
│            Hey, I'm your Clawdbot.                  │
│                                                     │
│     I'm an AI that actually DOES things —           │
│     not just talks about them.                      │
│                                                     │
│     ┌─────────────────────────────────────────┐    │
│     │  📧 Manages your inbox                   │    │
│     │  🌐 Browses & researches for you        │    │
│     │  📱 Controls your devices               │    │
│     │  📝 Remembers everything                │    │
│     └─────────────────────────────────────────┘    │
│                                                     │
│          ┌──────────────────────────┐              │
│          │   Let's set me up! →     │              │
│          └──────────────────────────┘              │
│                                                     │
│          ○ ○ ○ ○  (progress dots)                  │
└─────────────────────────────────────────────────────┘
```

### Copy Options

**Version A (Warm & Personal)**
> Hey, I'm your Clawdbot. 👋
> 
> I'm not like other AI assistants that just chat. I actually DO things for you — browse the web, send messages, manage files, and remember everything we talk about.
> 
> Let's spend 30 seconds getting to know each other.

**Version B (Bold & Direct)**
> Meet your new superpower.
> 
> Clawdbot doesn't just answer questions. It takes action — controlling browsers, managing your inbox, and working while you sleep.
> 
> Quick setup. Real results. Let's go.

**Version C (Curiosity-Driven)**
> What if your AI could actually DO things?
> 
> Not just write — but send. Not just plan — but execute. Not just remember — but act on it.
> 
> That's me. Let's see what we can do together.

### Design Notes
- Animation: Subtle bounce on the robot emoji
- Background: Gradient from brand color to softer tone
- CTA button: High contrast, slightly pulsing
- Skip option: Small "I'll explore on my own" link at bottom (don't hide it)

---

## Phase 2: Personality Quiz (10-30 seconds)

### Design Philosophy
- **3 questions maximum** (respect their time)
- **Multi-select allowed** (people have multiple needs)
- **Visual cards > radio buttons** (faster parsing)
- **Progressive reveal** (one question at a time, smooth transition)

---

### Question 1: Primary Use Case

#### Wireframe
```
┌─────────────────────────────────────────────────────┐
│                                                     │
│         What do you need help with most?            │
│              (pick as many as you like)             │
│                                                     │
│    ┌────────────────┐  ┌────────────────┐          │
│    │  📧            │  │  🔍            │          │
│    │  Email &       │  │  Research &    │          │
│    │  Messages      │  │  Learning      │          │
│    │                │  │                │          │
│    │  ☐ selected    │  │  ☐ selected    │          │
│    └────────────────┘  └────────────────┘          │
│                                                     │
│    ┌────────────────┐  ┌────────────────┐          │
│    │  📋            │  │  🏠            │          │
│    │  Tasks &       │  │  Smart Home    │          │
│    │  Productivity  │  │  & Devices     │          │
│    │                │  │                │          │
│    │  ☐ selected    │  │  ☐ selected    │          │
│    └────────────────┘  └────────────────┘          │
│                                                     │
│    ┌────────────────┐  ┌────────────────┐          │
│    │  💼            │  │  🎨            │          │
│    │  Work &        │  │  Creative      │          │
│    │  Business      │  │  Projects      │          │
│    │                │  │                │          │
│    │  ☐ selected    │  │  ☐ selected    │          │
│    └────────────────┘  └────────────────┘          │
│                                                     │
│              ● ○ ○  [Continue →]                    │
│                                                     │
└─────────────────────────────────────────────────────┘
```

#### Options Detail

| Option | Icon | Description | Maps to Skills |
|--------|------|-------------|----------------|
| Email & Messages | 📧 | Inbox management, drafting, sending | email, message, contacts |
| Research & Learning | 🔍 | Web search, summarizing, fact-finding | web_search, web_fetch, browser |
| Tasks & Productivity | 📋 | Reminders, scheduling, organization | calendar, todos, memory |
| Smart Home & Devices | 🏠 | Control lights, cameras, automation | nodes, home automation |
| Work & Business | 💼 | Reports, data, professional tasks | spreadsheets, docs, analytics |
| Creative Projects | 🎨 | Writing, images, brainstorming | tts, image gen, creative writing |

---

### Question 2: Working Style

#### Wireframe
```
┌─────────────────────────────────────────────────────┐
│                                                     │
│           How do you like to work?                  │
│                                                     │
│    ┌─────────────────────────────────────────┐     │
│    │  🚀  "Just do it"                        │     │
│    │      I trust you to handle things        │     │
│    │      and tell me when it's done.         │     │
│    └─────────────────────────────────────────┘     │
│                                                     │
│    ┌─────────────────────────────────────────┐     │
│    │  🤝  "Let's collaborate"                 │     │
│    │      Show me what you're thinking,       │     │
│    │      and we'll decide together.          │     │
│    └─────────────────────────────────────────┘     │
│                                                     │
│    ┌─────────────────────────────────────────┐     │
│    │  🎯  "Keep me in control"                │     │
│    │      Always ask before taking action.    │     │
│    │      I like to approve everything.       │     │
│    └─────────────────────────────────────────┘     │
│                                                     │
│              ○ ● ○  [Continue →]                    │
│                                                     │
└─────────────────────────────────────────────────────┘
```

#### Mapping
| Choice | Autonomy Level | Confirmation Behavior |
|--------|---------------|----------------------|
| Just do it | High | Only confirm destructive/external actions |
| Let's collaborate | Medium | Show drafts, explain reasoning |
| Keep me in control | Low | Ask before every action |

---

### Question 3: First Win

#### Wireframe
```
┌─────────────────────────────────────────────────────┐
│                                                     │
│      What would make today a win? 🎯                │
│         (Let's do this first)                       │
│                                                     │
│    ┌─────────────────────────────────────────┐     │
│    │  📧  Clear my inbox clutter              │     │
│    └─────────────────────────────────────────┘     │
│                                                     │
│    ┌─────────────────────────────────────────┐     │
│    │  🔍  Research something for me           │     │
│    └─────────────────────────────────────────┘     │
│                                                     │
│    ┌─────────────────────────────────────────┐     │
│    │  📅  Get my schedule organized           │     │
│    └─────────────────────────────────────────┘     │
│                                                     │
│    ┌─────────────────────────────────────────┐     │
│    │  💡  Surprise me with something cool     │     │
│    └─────────────────────────────────────────┘     │
│                                                     │
│    ┌─────────────────────────────────────────┐     │
│    │  ⏭️  I'll figure it out — skip this      │     │
│    └─────────────────────────────────────────┘     │
│                                                     │
│              ○ ○ ●  [Let's go! →]                   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## Phase 3: Personalized Setup (30-50 seconds)

### Wireframe - Processing Animation
```
┌─────────────────────────────────────────────────────┐
│                                                     │
│              Setting up your Clawdbot...            │
│                                                     │
│                   ⚙️ → 🔧 → ✨                       │
│                                                     │
│    ┌─────────────────────────────────────────┐     │
│    │ ✓ Configuring for research & learning    │     │
│    │ ✓ Setting collaboration mode             │     │
│    │ ● Loading recommended skills...          │     │
│    │ ○ Preparing your first task              │     │
│    └─────────────────────────────────────────┘     │
│                                                     │
│        "A good assistant remembers.                 │
│         A great one anticipates." ✨                │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Wireframe - Skill Recommendations
```
┌─────────────────────────────────────────────────────┐
│                                                     │
│       Based on your answers, I recommend:           │
│                                                     │
│    ╔═════════════════════════════════════════╗     │
│    ║  🌐 Web Research Pro           [Enable] ║     │
│    ║  Deep search, summarize, compare        ║     │
│    ╚═════════════════════════════════════════╝     │
│                                                     │
│    ╔═════════════════════════════════════════╗     │
│    ║  🧠 Memory & Context           [Enable] ║     │
│    ║  I remember our conversations           ║     │
│    ╚═════════════════════════════════════════╝     │
│                                                     │
│    ╔═════════════════════════════════════════╗     │
│    ║  📧 Email Assistant           [Connect] ║     │
│    ║  Read, draft, send on your behalf       ║     │
│    ╚═════════════════════════════════════════╝     │
│                                                     │
│         ┌──────────────────────────────┐           │
│         │    All set! Show me around →  │           │
│         └──────────────────────────────┘           │
│                                                     │
│    + Show me all 12 available skills               │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Skill Recommendation Matrix

Based on Q1 (Use Cases) + Q2 (Working Style):

| If they selected... | Recommend these skills | Priority |
|---------------------|----------------------|----------|
| Email & Messages | email, message, contacts | ⭐⭐⭐ |
| Research & Learning | web_search, web_fetch, browser | ⭐⭐⭐ |
| Tasks & Productivity | calendar, memory, reminders | ⭐⭐⭐ |
| Smart Home | nodes, automation | ⭐⭐ |
| Work & Business | docs, spreadsheets, browser | ⭐⭐ |
| Creative | tts, image, creative templates | ⭐⭐ |

**Always recommend:** Memory & Context (core value prop)

---

## Phase 4: First Conversation Prompts (50-60 seconds)

### Wireframe - Chat Interface with Prompts
```
┌─────────────────────────────────────────────────────┐
│  Clawdbot                                     ✕    │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │ 🤖 Hey! I'm all set up and ready to help.   │   │
│  │                                              │   │
│  │ Based on what you told me, here are some    │   │
│  │ things I can do for you RIGHT NOW:          │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  Quick actions (tap to start):                      │
│                                                     │
│  ┌─────────────────────────────────────────┐       │
│  │ 🔍 "Research the best productivity apps  │       │
│  │     for 2024 and summarize the top 5"    │       │
│  └─────────────────────────────────────────┘       │
│                                                     │
│  ┌─────────────────────────────────────────┐       │
│  │ 📧 "Check my inbox and summarize         │       │
│  │     what needs my attention"             │       │
│  └─────────────────────────────────────────┘       │
│                                                     │
│  ┌─────────────────────────────────────────┐       │
│  │ 💡 "Surprise me — show me something      │       │
│  │     cool you can do"                     │       │
│  └─────────────────────────────────────────┘       │
│                                                     │
├─────────────────────────────────────────────────────┤
│  [Type a message...]                          [→]  │
└─────────────────────────────────────────────────────┘
```

### Personalized Prompt Templates

**For Research Users:**
```
🔍 "Research [topic] and give me the key takeaways"
📊 "Compare [A] vs [B] — pros and cons"
📚 "Summarize this article: [paste URL]"
🧠 "Explain [concept] like I'm 10 years old"
```

**For Email/Message Users:**
```
📧 "Check my inbox and tell me what's urgent"
✉️ "Draft a reply to [person] about [topic]"
📬 "Unsubscribe me from all newsletters"
🔔 "Set up daily email summaries"
```

**For Productivity Users:**
```
📋 "What's on my schedule today?"
⏰ "Remind me to [task] at [time]"
🎯 "Help me plan my week"
📝 "Create a to-do list for [project]"
```

**For Smart Home Users:**
```
🏠 "Show me my connected devices"
💡 "Turn on the living room lights"
📷 "Show me the front door camera"
🌡️ "What's the temperature at home?"
```

**For Creative Users:**
```
🎨 "Help me brainstorm ideas for [project]"
✍️ "Write a short story about [topic]"
🎤 "Read this aloud in a dramatic voice"
🖼️ "Describe an image I could create for [purpose]"
```

**Universal "Surprise Me" Responses:**
```
[Pick based on time of day and available integrations]

Morning: "Here's your day at a glance — you have 3 meetings, 
         12 unread emails (2 seem urgent), and it's going to 
         be sunny. Want me to dig into any of these?"

Afternoon: "I just searched for something interesting based on 
           your interests — here's a 2-minute summary of [topic 
           from their selections]."

Evening: "I organized some thoughts from our previous chats 
         into a note. Also, your calendar is clear tomorrow 
         morning if you want to block time for [their goal]."
```

---

## Phase 5: "Aha Moment" Triggers ✨

### The Psychology of "Aha"

The "aha moment" isn't when they understand what you do.
It's when they **feel** the value personally.

**Key insight:** Different users have different aha triggers.

### Trigger Map

| User Type | Aha Trigger | How to Deliver |
|-----------|-------------|----------------|
| Research | "It found something I couldn't" | Deep search + synthesis |
| Email | "It actually sent that for me" | Draft → send with 1 click |
| Productivity | "It remembered what I forgot" | Proactive reminder |
| Smart Home | "It controlled my stuff" | Instant device response |
| Creative | "It made something cool" | TTS voice or generated content |
| Skeptic | "It understood my messy request" | Parse ambiguous input correctly |

### Aha Moment Scripts

#### Research Aha (Most Common)
```
User taps: "Research the best productivity apps"

[2 seconds of typing indicator]

🤖 I'm searching across multiple sources...

[5 seconds — show real-time progress]

✓ Scanned 15 articles
✓ Checked recent reviews  
✓ Compared feature lists

Here's what I found:

**Top 5 Productivity Apps (2024)**

1. **Notion** — Best for all-in-one workspace
   - Pros: Flexible, great templates
   - Cons: Learning curve
   
2. **Todoist** — Best for pure task management
   [...]

Want me to go deeper on any of these, or compare 
specific features?
```

**Why it works:** They see WORK happening. Not just an answer — a visible process that would have taken them 20 minutes.

#### Email Aha
```
User taps: "Check my inbox"

🤖 Connecting to your email...

[Shows real inbox summary]

You have 23 unread emails. Here's the breakdown:

🔴 **Urgent (2)**
- Boss wants project update by EOD
- Payment confirmation needed

🟡 **Action needed (5)**  
- 3 meeting invites
- 2 questions from team

🟢 **FYI / Can wait (16)**
- Newsletters, notifications, promotions

Want me to draft a reply to any of these?
```

**Why it works:** Instant triage of something overwhelming.

#### Memory Aha
```
[After a few exchanges, later in conversation]

User: "What was that thing you mentioned earlier?"

🤖 You're probably thinking of [exact thing], which 
    we talked about 10 minutes ago when you asked 
    about [context].

    Here's the full detail: [...]
```

**Why it works:** Proof that this AI actually REMEMBERS.

#### Proactive Aha (Strongest)
```
[User hasn't said anything, but Clawdbot notices something]

🤖 Hey — I noticed you have a meeting in 30 minutes 
    with [Person], and you mentioned wanting to 
    prepare talking points. Want me to draft some 
    based on your last conversation with them?
```

**Why it works:** It anticipated a need before they asked.

---

## Implementation Details

### Data Model

```typescript
interface OnboardingState {
  step: 'welcome' | 'quiz-1' | 'quiz-2' | 'quiz-3' | 'setup' | 'chat';
  useCases: string[];           // From Q1
  workingStyle: 'autonomous' | 'collaborative' | 'controlled';
  firstWin: string;             // From Q3
  recommendedSkills: string[];  // Computed
  completedAt?: Date;
  firstAhaTriggered?: boolean;
}

interface UserPreferences {
  autonomyLevel: number;        // 1-10
  primaryUseCases: string[];
  enabledSkills: string[];
  onboardingComplete: boolean;
}
```

### Analytics Events to Track

```
onboarding_started
onboarding_step_completed { step, time_spent }
onboarding_quiz_answered { question, answers }
onboarding_skill_enabled { skill }
onboarding_skill_skipped { skill }
onboarding_completed { total_time }
onboarding_abandoned { last_step }
first_message_sent { was_prompt, prompt_type }
first_aha_triggered { aha_type, time_to_aha }
```

### A/B Test Opportunities

1. **Welcome copy:** Warm vs Bold vs Curiosity
2. **Quiz length:** 3 questions vs 2 questions vs 1 question
3. **Skill presentation:** Cards vs List vs Auto-enable
4. **First prompts:** 3 options vs 5 options vs Free text only
5. **Aha delivery:** Immediate action vs "Watch me work" animation

---

## Copy Library

### Headers

| Context | Copy Option A | Copy Option B |
|---------|---------------|---------------|
| Welcome | "Meet your new superpower" | "I'm not like other AIs" |
| Quiz start | "Quick question..." | "Let's personalize this" |
| Setup | "Setting things up..." | "Configuring your assistant" |
| Ready | "All set! Let's go" | "Ready when you are" |

### Microcopy

| Context | Copy |
|---------|------|
| Skip option | "I'll explore on my own" |
| Multi-select | "Pick as many as you like" |
| Loading | "Good things coming..." |
| Error | "Hmm, that didn't work. Let's try again." |
| Success | "Done! ✨" |

### Personality Moments

Inject personality without being annoying:

```
✓ "Let me dig into that..." (shows effort)
✓ "Found something interesting!" (shares excitement)
✓ "Quick update:" (respects their time)

✗ "I'm SO happy to help you today!!!" (too eager)
✗ "As an AI language model..." (breaks immersion)
✗ "I don't have feelings but..." (unnecessary)
```

---

## Edge Cases

### User Skips Everything
→ Show chat immediately with broader prompts
→ Learn preferences from actual usage
→ Offer "Want me to set things up?" after first success

### User Selects Everything in Q1
→ Start with most universal skill (research)
→ Introduce others gradually
→ "I see you want to do it all — let's start here"

### User Abandons Mid-Quiz
→ Save progress
→ On return: "Welcome back! Pick up where you left off?"
→ Option to restart fresh

### User Has No Integrations Connected
→ Focus on standalone capabilities (search, memory, chat)
→ Surface integration prompts contextually, not upfront
→ "This would be even better with your calendar connected"

---

## Success Metrics

### Primary (60-Second Goal)
- **Time to first meaningful action:** < 60s
- **First-session aha rate:** > 70%
- **Onboarding completion rate:** > 80%

### Secondary
- **Day-1 return rate:** > 50%
- **Day-7 return rate:** > 30%
- **Messages in first session:** > 5
- **Skills enabled:** > 2

### Qualitative
- User says "wow" or "cool" in first session
- User shares or tells someone about it
- User asks "can you also do X?"

---

## Next Steps

1. [ ] Build welcome screen (React/HTML component)
2. [ ] Implement quiz state machine
3. [ ] Create skill recommendation engine
4. [ ] Design prompt suggestion system
5. [ ] Instrument analytics
6. [ ] A/B test copy variants
7. [ ] Optimize based on data

---

*Last updated: Design phase*
*Author: Onboarding Subagent*
