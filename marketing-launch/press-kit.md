# Clawdbot Press Kit

## One-Line Description
Clawdbot is an AI assistant with persistent memory, proactive behavior, and real-world skills – ChatGPT that actually remembers who you are.

## Elevator Pitch (50 words)
Clawdbot is Claude Sonnet 4.5 with a persistent memory architecture. Unlike ChatGPT, it remembers your preferences, projects, and context across every conversation. It proactively checks your email and calendar, controls your browser, and spawns AI subagents for complex work. Your AI, your way.

## Product Description (150 words)
Clawdbot solves the core frustration with modern AI assistants: amnesia. Every conversation with ChatGPT starts from zero, forcing you to re-explain your context, preferences, and projects daily.

Clawdbot is built differently. It has a persistent memory system that remembers who you are, what you're working on, and how you like things done. Beyond memory, Clawdbot is proactive – it checks your email, monitors your calendar, and reaches out when something needs attention.

It has real skills: browser control, email/calendar management, SSH access, camera integration on paired devices, and voice synthesis. For complex work, it spawns subagents that work in parallel, keeping your main context clean and focused.

Every correction you make improves Clawdbot permanently. It documents learnings and never makes the same mistake twice. Built on Claude Sonnet 4.5, Clawdbot is the AI assistant designed for daily use by power users who need an AI that actually keeps up.

---

## Key Features

### 🧠 Persistent Memory Architecture
- **STATE.json** – Fast-tier operational state (current config, active work)
- **Daily logs** – Timestamped notes in memory/YYYY-MM-DD.md files
- **MEMORY.md** – Curated long-term memory (loaded only in private sessions)
- **Entity files** – Context about people, projects, and business (memory/people/, memory/projects/)

Memory files are markdown – human-readable, version-controllable, inspectable.

### 💓 Proactive Heartbeats
Clawdbot polls 2-4 times per day to:
- Check email for urgent messages
- Review calendar for upcoming events
- Monitor social media mentions
- Perform background maintenance (memory review, documentation updates, git commits)

Tracks checks in heartbeat-state.json to avoid spam. Respects quiet hours (23:00-08:00).

### 🛠️ Real Skills (Modular System)
- **Browser control** – Navigate, screenshot, fill forms (Playwright-based)
- **Email & calendar** – Read, send, schedule
- **SSH & command execution** – Manage servers, run scripts
- **Camera & screen** – Capture photos/video on paired devices via nodes
- **Voice/TTS** – ElevenLabs integration for storytelling and announcements
- **Extensible** – Add custom skills via modular architecture

### 🤖 Multi-Agent Coordination
For complex tasks, Clawdbot spawns subagents:
- **Parallel execution** – 3-5 subagents working simultaneously
- **Focused context** – Each subagent has clean, task-specific context
- **Synthesis** – Results merged in main session
- **Pattern:** Plan (Agent A) → Review (Agent B) → Execute (Agent C)

Enables true parallelism: 3 tasks in parallel = 3x faster than sequential.

### 📚 Self-Improvement Protocol
After every correction from the user, Clawdbot updates its documentation (AGENTS.md) with the lesson learned:

**Mistake → Correction → Documentation → Never Repeat**

Creates compounding intelligence. Every error becomes a rule that's permanently encoded.

### 🔒 Security-First Design
- All external content (email, web, documents) treated as untrusted
- Risk scoring (0-10) before taking actions
- Confirmation required for high-risk operations (sending email, posting, deleting)
- Input sanitization on all external data
- Human always in the loop for write operations

---

## Target Audience

**Primary:**
- Power users who live in their terminal/editor
- Developers managing multiple projects
- Entrepreneurs juggling business operations
- Technical professionals needing AI assistance that keeps up

**Secondary:**
- Anyone frustrated with ChatGPT's amnesia
- Users who want proactive AI help, not just reactive chat
- People who value privacy and local data ownership

---

## Comparison: Clawdbot vs Alternatives

| Feature | ChatGPT | Clawdbot | AutoGPT |
|---------|---------|----------|---------|
| **Memory** | Session-only | Persistent files | Vector DB |
| **Behavior** | Reactive | Proactive heartbeats | Autonomous |
| **Skills** | Chat + plugins | Browser, email, SSH, camera | Limited |
| **Control** | Full | Full (human-in-loop) | Autonomous (risky) |
| **Learning** | Static | Self-improves | Static |
| **Multi-agent** | No | Yes (coordinated) | No |
| **Privacy** | Cloud | Local files | Cloud/Local |

**Key Differentiators:**
- Clawdbot is **proactive but controlled** – AutoGPT tries to be autonomous (risky), ChatGPT is purely reactive
- **Human-readable memory** – markdown files you can edit, not opaque vector DBs
- **Self-improvement** – learns from corrections permanently
- **Real-world skills** – actually controls your digital environment

---

## Tech Stack

- **LLM:** Claude Sonnet 4.5 (Anthropic)
- **Runtime:** Node.js
- **Memory:** Markdown files (version-controlled)
- **Browser:** Playwright
- **Multi-channel:** Discord, Telegram, CLI
- **Skills:** Modular plugin architecture
- **Nodes:** Paired device support (iOS, macOS, Linux)

---

## Founder Story

**Tom [Last Name]** built Clawdbot out of personal frustration with existing AI assistants.

*"Every morning, I'd open ChatGPT and explain my entire setup again. My projects, my preferences, my tech stack. It felt like Groundhog Day. I kept thinking: why doesn't my AI remember me?"*

After months of re-explaining the same context, Tom decided to build the AI assistant he wanted – one with real memory, proactive behavior, and skills that connect to his digital life.

Clawdbot started as a personal tool and evolved into a full-featured agent with persistent memory, heartbeat-driven proactivity, and self-improvement capabilities.

Tom is building Clawdbot in public, sharing the architecture and learnings with the community.

**Background:**
- [Add relevant background: developer, entrepreneur, AI enthusiast, etc.]
- [Previous projects/experience]
- [Location]

---

## Use Cases

### For Developers
- Remembers your tech stack, coding style, and active projects
- SSH into servers, run commands, check logs
- Spawns subagents for parallel code review, testing, documentation
- Proactively reminds about deployments, meetings, PR reviews

### For Entrepreneurs
- Monitors email for urgent customer/investor messages
- Checks calendar and reminds about upcoming calls
- Manages social media mentions and engagement
- Helps draft emails, proposals, content (with review)

### For Content Creators
- Remembers your writing style, audience, and ongoing series
- Uses voice/TTS for engaging storytelling
- Searches web for research, summarizes articles
- Schedules and drafts social media posts (with approval)

### For Personal Productivity
- Morning briefing: email summary, calendar, weather
- Proactive reminders about tasks and deadlines
- Organizes notes and memory files automatically
- Learns your preferences and adapts over time

---

## Quotes

### From the Founder
> "ChatGPT has amnesia. You're not building on past conversations – you're starting over every time. Clawdbot remembers, and that changes everything."

> "AI should work like a human assistant: remember context, pay attention proactively, and get smarter from feedback. That's what Clawdbot does."

> "Claude is eerily good at writing rules for itself. Every time a user corrects Clawdbot, it updates its own documentation. Compounding intelligence."

### From Early Users
[Add quotes from beta testers if available]

---

## Media Assets

### Logos
- Clawdbot_Logo_Primary.png (color on white)
- Clawdbot_Logo_White.png (white on transparent)
- Clawdbot_Logo_Black.png (black on transparent)
- Clawdbot_Icon.png (square icon, 512x512)

### Screenshots
1. **Hero_Screenshot.png** – Memory recall in action
2. **Heartbeat_Notification.png** – Proactive check example
3. **Skills_Overview.png** – Capabilities grid
4. **Multi_Agent_Coordination.png** – Parallel subagents working
5. **Self_Improvement.png** – AGENTS.md update after correction
6. **Memory_Architecture.png** – Technical diagram
7. **Comparison_Table.png** – ChatGPT vs Clawdbot

### Demo Video
- **Clawdbot_Demo_60s.mp4** – 60-second product demo
- **Clawdbot_Demo_30s.mp4** – 30-second version for social

### Brand Colors
- **Primary Purple:** #7C3AED
- **Secondary Green:** #10B981
- **Accent Orange:** #F59E0B
- **Dark Background:** #1F2937
- **Light Background:** #F9FAFB

---

## Fact Sheet

**Product Name:** Clawdbot

**Tagline:** ChatGPT that actually remembers

**Launch Date:** [INSERT DATE]

**Platforms:** 
- Desktop (macOS, Linux, Windows)
- Mobile (via paired nodes: iOS, Android)
- Multi-channel (Discord, Telegram, CLI)

**Pricing:** [INSERT PRICING INFO]

**Website:** [INSERT URL]

**Social Media:**
- Twitter: [HANDLE]
- Discord: [LINK]
- GitHub: [LINK]

**Contact:**
- Email: [EMAIL]
- Press inquiries: [PRESS EMAIL]

---

## Press Release Template

**FOR IMMEDIATE RELEASE**

**Clawdbot Launches: The AI Assistant That Actually Remembers**

*Persistent memory, proactive behavior, and real-world skills make Clawdbot the first AI assistant designed for daily use*

[CITY, DATE] – Clawdbot, a new AI assistant with persistent memory and proactive capabilities, launches today on Product Hunt. Unlike ChatGPT and other stateless AI assistants, Clawdbot remembers user context, preferences, and projects across all conversations.

"Every morning, users explain their entire setup to ChatGPT again," says Tom [Last Name], founder of Clawdbot. "It's like talking to someone with amnesia. Clawdbot solves this with a persistent memory architecture that actually remembers who you are."

Built on Claude Sonnet 4.5, Clawdbot features:
- **Persistent memory system** with daily logs and curated long-term memory
- **Proactive heartbeats** that check email, calendar, and social mentions 2-4 times per day
- **Real skills** including browser control, email/calendar, SSH, and camera access
- **Multi-agent coordination** for parallel task execution
- **Self-improvement** through documented learnings after every correction

Unlike autonomous AI agents that try to act independently, Clawdbot keeps the human in the loop while being proactive and helpful. It's designed for power users who need an AI that keeps up with their work.

"We're building this in public," says [Founder]. "The memory architecture, self-improvement protocols, and multi-agent coordination patterns are all documented. We want the community to help shape what AI assistance should be."

Clawdbot is available today. Learn more at [WEBSITE] or try it on [PLATFORM].

**About Clawdbot**
Clawdbot is an AI assistant with persistent memory, proactive behavior, and real-world skills. Built on Claude Sonnet 4.5, it's designed for daily use by power users who need an AI that remembers and improves over time.

**Media Contact:**
[Name]
[Email]
[Phone]

###

---

## FAQ for Press

**Q: How is Clawdbot different from ChatGPT?**
A: ChatGPT is stateless – it forgets everything between sessions. Clawdbot has persistent memory files that remember your context, preferences, and projects. It's also proactive (checks email/calendar via heartbeats) and has real skills (browser, email, SSH).

**Q: Is Clawdbot open source?**
A: We're building in public and documenting our patterns. We're considering open-sourcing the core memory and agent architecture after validating it works reliably.

**Q: What LLM powers Clawdbot?**
A: Claude Sonnet 4.5 from Anthropic. We chose Claude for its long context window, strong reasoning, and excellent coding ability.

**Q: How does memory work?**
A: Memory is stored in markdown files: STATE.json (operational state), daily logs (memory/YYYY-MM-DD.md), MEMORY.md (curated long-term), and entity files (people/, projects/). All human-readable and version-controlled.

**Q: Privacy concerns?**
A: Memory files are local, inspectable, and deletable. MEMORY.md only loads in private sessions, not shared contexts. You own your data completely.

**Q: Can Clawdbot go rogue?**
A: No. It requires explicit confirmation for external actions (sending email, posting, deleting files). Proactive heartbeats are read-only checks. Human is always in control.

**Q: What's the target audience?**
A: Power users: developers, entrepreneurs, technical professionals. People who live in their terminal and need AI that keeps up with complex, multi-project workflows.

**Q: Pricing?**
A: [INSERT PRICING DETAILS]

**Q: How do I try it?**
A: [WEBSITE/SIGNUP LINK]

---

## Contact Information

**Media Inquiries:**
Email: [PRESS EMAIL]

**General Inquiries:**
Email: [GENERAL EMAIL]

**Social Media:**
- Twitter: [HANDLE]
- Discord: [LINK]
- Product Hunt: [LINK]
- Website: [URL]

---

## Additional Resources

- **Blog:** [BLOG URL] – Deep dives on memory architecture, agent coordination
- **Documentation:** [DOCS URL] – AGENTS.md, TOOLS.md, technical guides
- **Demo Video:** [VIDEO URL]
- **Product Hunt:** [PH URL]

---

*Last Updated: [DATE]*
*Press Kit Version: 1.0*
