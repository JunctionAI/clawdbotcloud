---
name: ally-launch
description: Launch Ally - AI personal assistant that does things, not just answers questions
status: backlog
created: 2026-02-04T20:44:57Z
---

# PRD: Ally - AI Personal Assistant Launch

## Executive Summary

**Ally** is a consumer AI personal assistant positioned as "the AI that does things." Unlike ChatGPT and other conversational AI that only answer questions, Ally takes action on behalf of users — managing calendars, sending emails, controlling smart home devices, and handling life's daily tasks.

**Tagline:** "Life, handled."

**Core Value Proposition:** Turn intentions into actions. Tell Ally what you want done, and it does it — across your entire digital life.

## Problem Statement

### Current Market Gap
1. **ChatGPT/Gemini limitation:** Great at answering questions, terrible at taking action
2. **Siri/Alexa limitation:** Can take actions, but limited intelligence and context
3. **Assistant fatigue:** Users have 5+ AI tools but none that truly handle tasks end-to-end
4. **Context fragmentation:** No assistant knows your whole life — calendar, email, preferences, family

### Why Now?
- LLM action capabilities have matured (tool use, function calling)
- Users frustrated by ChatGPT's "I can't actually do that"
- Voice assistants have plateaued — ripe for disruption
- Privacy-conscious users want alternatives to Big Tech assistants

## User Stories

### Persona 1: Busy Professional (Primary)
**Sarah, 34, Marketing Director**
- Juggles work meetings, kids' activities, personal appointments
- Uses 10+ apps daily (calendar, email, Slack, Asana, etc.)
- Pain: "I spend more time managing my tools than doing my work"

**User Journey:**
1. Wakes up → "Ally, what's my day look like?"
2. Ally summarizes: 3 meetings, school pickup at 3pm, dinner reservation at 7
3. "Reschedule my 2pm to tomorrow" → Done, attendees notified
4. "Order flowers for mom's birthday" → Ally handles it, confirms budget
5. "Remind me to call the dentist when I'm free after lunch" → Smart reminder set

### Persona 2: Family Coordinator
**Mike, 42, Works from home with partner and 2 kids**
- Manages family calendar, meal planning, household tasks
- Partner also needs access to shared context
- Pain: "Nobody knows who's doing what"

**User Journey:**
1. "Ally, did anyone schedule soccer practice this week?"
2. "Add Emma to the dentist appointment on Thursday"
3. "What groceries do we need?" → Ally checks meal plan, current inventory
4. Partner asks: "Is Mike picking up the kids?" → Ally knows, confirms

### Persona 3: Solopreneur
**Jordan, 28, Freelance Designer**
- Manages clients, invoicing, scheduling, personal tasks
- Needs professional appearance despite one-person operation
- Pain: "I'm my own assistant but I hate admin work"

**User Journey:**
1. "Schedule a call with the new client for next week"
2. "Send the invoice for the logo project"
3. "Block off Friday afternoon for deep work"
4. "Remind me to follow up with prospects I haven't heard from in 2 weeks"

## Requirements

### Functional Requirements

#### Core Platform
- **Multi-channel access:** Web app, iOS, Android, Discord, Telegram, WhatsApp, voice
- **Conversation continuity:** Pick up where you left off on any device
- **Action execution:** Real integrations with calendars, email, tasks, etc.
- **Memory system:** Long-term memory of preferences, context, and history
- **Proactive suggestions:** Ally notices patterns and suggests improvements

#### Action Capabilities (MVP)
- Calendar management (Google, Outlook, Apple)
- Email drafting and sending (Gmail, Outlook)
- Task/reminder management (Todoist, Apple Reminders, native)
- Basic smart home control (if integrated)
- Web search and research
- Simple purchases (with confirmation)

#### Memory System
- **Facts:** "I'm allergic to shellfish," "My mom's birthday is March 15"
- **Preferences:** "I prefer morning meetings," "I like window seats"
- **Relationships:** "Sarah is my wife," "Dr. Chen is my dentist"
- **History:** Past conversations, completed tasks, established patterns

#### Family Plan Features
- Shared family calendar awareness
- Per-person preferences within household
- Permission levels (kids can ask questions, adults can take actions)
- Family-wide context ("Ally, is anyone home?")

### Non-Functional Requirements

#### Performance
- Response time: <2 seconds for simple queries
- Action execution: <5 seconds for standard integrations
- Uptime: 99.9% availability
- Concurrent users: Scale to 100k+ active users at launch

#### Security
- End-to-end encryption for messages
- OAuth for all integrations (no stored passwords)
- SOC 2 compliance roadmap
- Data residency options (US, EU, AU/NZ)
- Clear data retention policies

#### Privacy
- Users own their data
- Transparent about what's stored
- Easy data export and deletion
- No selling data to third parties
- No training on user data without consent

## Pricing Strategy

### Tier Structure (Official - Feb 2026)

| Tier | Price | Target User | Key Features |
|------|-------|-------------|--------------|
| **Free** | $0 | Trial users | 50 msg/day, 5 skills, 7-day memory |
| **Personal** | $9/mo | Individuals | Unlimited, 15 skills, full memory |
| **Plus** | $19/mo | Power users | Unlimited skills, Gmail/Calendar, voice |
| **Pro** | $39/mo | Professionals | API, custom workflows, priority |
| **Family** | $19/mo | Households | 5 members, individual memories |

### Pricing Rationale
- **Free:** Low barrier to try, generous limits to see value
- **$9 Personal:** Undercuts ChatGPT Plus ($20), emphasizes "does more for less"
- **$19 Plus:** Matches ChatGPT Plus price, but delivers action not just conversation
- **$19 Family:** Same as Plus — massive value (5 people = $3.80/person)
- **$39 Pro:** Professional tier for business deduction, API access

## Success Criteria

### Launch Metrics (90-day targets)
- **Users:** 10,000 registered, 2,000 paying
- **Retention:** 40% day-7 retention, 25% day-30
- **NPS:** 40+
- **Actions taken:** Average 5+ actions per active user per day

### Long-term KPIs
- Monthly Recurring Revenue (MRR)
- Customer Acquisition Cost (CAC)
- Lifetime Value (LTV)
- Daily/Monthly Active Users (DAU/MAU)
- Actions per user per session
- Time saved per user (survey metric)

## Constraints & Assumptions

### Technical Constraints
- Depends on third-party API availability (Google, Microsoft, etc.)
- LLM costs scale with usage — need efficient prompt strategies
- Mobile apps require native development or React Native
- Voice requires speech-to-text infrastructure

### Business Constraints
- Bootstrap budget — need to prioritize ruthlessly
- Small team — can't build everything at once
- Must demonstrate value before users grant integrations

### Assumptions
- Users will trust a new AI assistant with integrations
- "AI that does things" messaging resonates over "better chatbot"
- Memory is a key differentiator users will pay for
- Family plan is underserved market opportunity

## Out of Scope (v1.0)

- **Enterprise/Team features:** Focus on consumer first
- **Custom AI training:** Use base models initially
- **Hardware integration:** No Ally-branded devices
- **Financial transactions:** No trading, banking actions
- **Healthcare decisions:** Informational only, no medical advice
- **Real-time voice calls:** Async voice messages OK, live calls later

## Dependencies

### External Dependencies
- **LLM Provider:** Claude (Anthropic) primary, GPT fallback
- **Auth:** OAuth providers (Google, Microsoft, Apple)
- **Payments:** Stripe for subscriptions
- **Infrastructure:** Cloud hosting (AWS/Vercel)
- **Mobile:** App store approvals (Apple/Google)

### Internal Dependencies
- Clawdbot core platform (foundation)
- Memory system architecture
- Integration framework
- Mobile app development capacity

## Competitive Positioning

### Competitive Landscape

| Competitor | Strength | Weakness | Ally's Advantage |
|------------|----------|----------|------------------|
| ChatGPT | Brand awareness, quality | No actions | We do things |
| Gemini | Google integration | Privacy concerns | Independent, private |
| Siri | Apple ecosystem | Limited intelligence | Smarter, more capable |
| Alexa | Smart home | Privacy, ads | No ads, user-first |

### Key Differentiators
1. **Actions, not answers:** The only AI that actually does things
2. **Memory that matters:** Remembers your life, learns preferences
3. **Multi-platform:** One assistant across all your devices and apps
4. **Family plan:** First AI assistant designed for households
5. **Privacy-first:** You own your data, period

## Go-to-Market Strategy

### Launch Phases

**Phase 1: Private Beta (Weeks 1-4)**
- 500 hand-selected users
- Discord community for feedback
- Iterate rapidly on core features

**Phase 2: Public Beta (Weeks 5-8)**
- Open waitlist, controlled rollout
- Focus on viral mechanics (referrals)
- Gather testimonials and case studies

**Phase 3: General Availability (Week 9+)**
- Full public launch
- PR push, influencer partnerships
- Paid acquisition testing

### Marketing Messages
- "Your AI that does things."
- "Life, handled."
- "Like having a personal assistant who never sleeps."
- "The last app you'll need to manage the rest."

## Technical Architecture Overview

### Core Components
- **Conversation Engine:** Multi-turn, context-aware dialogue
- **Action Layer:** Integration framework for external services
- **Memory Store:** Vector DB for semantic recall + structured facts
- **User Management:** Auth, subscriptions, preferences
- **Channel Adapters:** Web, mobile, messaging platforms

### Integration Strategy
- OAuth-first: Never store user credentials
- Webhook support: Real-time updates from services
- Graceful degradation: Work even if some integrations fail
- Permission boundaries: Users control what Ally can access

## Risk Mitigation

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| LLM API costs spike | Medium | High | Usage caps, caching, prompt optimization |
| Integration breaks | High | Medium | Monitoring, fallbacks, user notification |
| Privacy breach | Low | Critical | Security audit, encryption, minimal data |
| Low adoption | Medium | High | Strong value prop, freemium, referrals |
| Competitor response | Medium | Medium | Speed, differentiation, community |

## Appendix

### User Research Insights
- 73% of users surveyed want AI to "do more than just chat"
- #1 frustration with voice assistants: "It can't actually do that"
- Family coordination is consistently underserved pain point
- Users willing to pay for AI that saves them 30+ min/day

### Technical Spikes Needed
- Integration with major calendar providers
- Memory architecture benchmarking
- Mobile app framework decision
- Voice interface options

---

*PRD Version: 1.0*
*Last Updated: 2026-02-04*
*Author: Clawdbot AI*
*Status: Ready for Epic Creation*
