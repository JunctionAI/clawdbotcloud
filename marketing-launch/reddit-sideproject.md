# Reddit r/SideProject Post

## Title
I built an AI assistant that actually remembers who you are (and proactively helps)

## Post Body

**TL;DR:** ChatGPT forgets everything between sessions. I got tired of re-explaining my entire life every day, so I built Clawdbot – an AI with real memory, proactive heartbeats, and skills that connect to your digital life.

---

### The Problem

You know this dance, right?

Open ChatGPT.
"Hey, I'm working on [project X]..."
"My tech stack is [Y]..."
"I prefer [Z] style..."

Every. Single. Day.

It's like talking to someone with amnesia. You're not building on past conversations – you're starting over.

### What I Built

**Clawdbot** is Claude Sonnet 4.5 with a persistent memory architecture:

**🧠 Real Memory System**
- STATE.json – operational state (what's connected, last checks)
- Daily logs (memory/YYYY-MM-DD.md) – raw notes of what happened
- MEMORY.md – curated long-term memory (like a human brain)
- Entity files (people/, projects/, business/) – context about important things

On every session, Clawdbot loads relevant memory. It knows you.

**💓 Proactive Heartbeats**

This is my favorite part.

Most AI waits for you to ask. Clawdbot checks in 2-4 times per day:
- Scans your email for urgent stuff
- Checks calendar for upcoming events
- Monitors social mentions
- Does background maintenance work

It's like having an assistant who actually pays attention.

**🛠️ Modular Skills**

Browser control, email/calendar, SSH, camera access on paired devices, TTS for storytelling, and more.

Skills are modular – add your own.

**🤖 Smart Coordination**

For complex work, Clawdbot spawns subagents that work in parallel.

Instead of sequential (Task 1 → Task 2 → Task 3 = 90 min)
It does parallel (Tasks 1, 2, 3 simultaneously = 30 min)

Keeps main context clean and focused.

**📚 Self-Improvement**

After every correction, Clawdbot updates its own documentation (AGENTS.md) with the lesson learned.

Mistake → Correction → Update → Never Repeat

It gets smarter every day.

---

### Why I Built This

I wanted an AI that:
1. Remembers who I am and what I'm working on
2. Proactively helps instead of just reacting
3. Can actually DO things (not just chat)
4. Gets better over time

ChatGPT couldn't do that. So I built Clawdbot.

### Tech Stack

- Claude Sonnet 4.5 (LLM)
- Node.js runtime
- Markdown-based memory files
- Modular skill architecture
- Multi-agent coordination system

Building in public – most patterns are documented in the memory system.

### Demo

[INSERT DEMO VIDEO OR GIF]

### Try It / Learn More

Launching on Product Hunt today: [LINK]

Happy to answer questions about the architecture, memory system, or how it works!

---

### What's Next?

Working on:
- More skills (what would YOU want your AI to do?)
- Better memory compression (so it scales long-term)
- Improved subagent coordination
- Community skill sharing

---

Feedback welcome! Especially from folks who've tried building AI agents before.

What features would make this actually useful for you?
