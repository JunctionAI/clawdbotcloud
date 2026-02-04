# Zero-Touch SaaS Model for Clawdbot

**Last Updated:** 2026-01-26  
**Status:** Research - Brutally Honest Assessment

---

## Tom's Constraint

**NO manual integrations.** Jakob's setup (manual Gmail/Slack/Calendar OAuth) is too slow, too hands-on, doesn't scale. We need zero-touch or it's not SaaS.

---

## The Core Question

**Can Clawdbot deliver value WITHOUT Gmail/Slack/Calendar integrations?**

Short answer: **Yes, but it's a different product.**

---

## What Works Out-of-Box (Zero Setup)

These features require ZERO platform integrations and work immediately:

### 1. **Chat Interface (Primary Value)**
- Discord bot (user joins server, talks to bot)
- WhatsApp bot (user saves number, starts chat)
- Telegram bot (user adds bot, starts chat)
- Web chat widget (embed on site)

**Value proposition:** Your AI assistant in your existing chat app. No OAuth, no setup.

### 2. **File Operations (Workspace)**
- Read/write/edit files in user's workspace
- Code generation and editing
- Documentation management
- Project organization

**Limitation:** Workspace is in Clawdbot's infrastructure (not user's local machine). User uploads files or works in cloud workspace.

### 3. **Web Capabilities**
- Web search (Brave API - we configure, not user)
- Web scraping/fetching
- Browser automation
- Research and data gathering

**Value:** Agent can research, fetch info, automate web tasks without user setting anything up.

### 4. **Memory & Context**
- Long-term memory (MEMORY.md)
- Daily logs
- Project tracking
- Learning from interactions

**This is huge.** ChatGPT doesn't remember you across sessions properly. Clawdbot does.

### 5. **Subagents (Parallel Work)**
- Spawn parallel workers for complex tasks
- Multi-tasking research/implementation
- Background processing

**Unique differentiator:** Not just chat, but a team of agents working for you.

### 6. **Proactive Heartbeats**
- Periodic check-ins
- Proactive suggestions
- Background maintenance

**Limitation:** Without Gmail/Calendar integrations, proactive = "hey I'm here" not "you have a meeting in 30min"

---

## What Users Configure THEMSELVES (Self-Service)

The key to zero-touch: **user-initiated OAuth flows, not manual setup by us.**

### Tier 2: Self-Service Integrations (Optional)

**Pattern:** User clicks "Connect Gmail" → OAuth flow → done. No human involvement from Clawdbot team.

#### **A. Email (Gmail, Outlook)**
- **Setup:** User clicks "Connect Gmail" in dashboard
- **Flow:** Standard OAuth 2.0 (Google handles auth)
- **Storage:** We store refresh token (encrypted)
- **Scope:** Read, send, organize email

**Technical feasibility:** HIGH - Standard OAuth flow, well-documented APIs

#### **B. Calendar (Google Calendar, Outlook)**
- **Setup:** User clicks "Connect Calendar"
- **Flow:** OAuth 2.0
- **Scope:** Read events, create events, send invites

**Technical feasibility:** HIGH - Same OAuth pattern

#### **C. Slack/Discord (Workspace Integration)**
- **Setup:** User installs Clawdbot app to their workspace
- **Flow:** Slack/Discord OAuth
- **Scope:** Read channels, post messages, file uploads

**Technical feasibility:** HIGH - Both have mature OAuth flows

#### **D. Cloud Storage (Gdrive, Dropbox, OneDrive)**
- **Setup:** User clicks "Connect Drive"
- **Flow:** OAuth 2.0
- **Scope:** Read/write files

**Technical feasibility:** HIGH - Standard OAuth

#### **E. API Keys (Manual but User-Driven)**
User pastes API keys for:
- OpenAI, Anthropic (if they want their own keys)
- ElevenLabs (TTS)
- Home Assistant
- Custom APIs

**Technical feasibility:** TRIVIAL - Just secure storage

---

## SimpleClaw Analysis (Best Guess)

**Hypothesis:** SimpleClaw likely works similar to:
1. **Chat-first interface** (Discord/Telegram/Web)
2. **Workspace in cloud** (not local file access)
3. **Self-service OAuth** for integrations
4. **Web capabilities** out-of-box
5. **No manual setup** by their team

**Their value prop (guessing):** "AI assistant you chat with, optionally connect your tools"

**We can do the same.**

---

## The Zero-Touch Architecture

```
┌─────────────────────────────────────────────────────┐
│ USER EXPERIENCE                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  1. Sign up (email, Discord auth, etc.)            │
│  2. Choose plan (Starter/Pro/Team)                 │
│  3. Get invite to Discord server OR WhatsApp bot   │
│  4. Start chatting immediately ← ZERO SETUP         │
│                                                     │
│  Optional (self-service):                          │
│  5. Go to dashboard.clawdbot.com                   │
│  6. Click "Connect Gmail" → OAuth → done           │
│  7. Click "Connect Calendar" → OAuth → done        │
│  8. Paste API keys if wanted                       │
│                                                     │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ BACKEND ARCHITECTURE                                │
├─────────────────────────────────────────────────────┤
│                                                     │
│  • Multi-tenant Gateway (one per user or team)     │
│  • Workspace storage (S3/R2)                       │
│  • OAuth token storage (encrypted, per user)       │
│  • Rate limiting, billing, usage tracking          │
│  • Chat routing (Discord/WhatsApp/Telegram/Web)    │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## What Requires Manual Setup (Avoid These)

**Things we CANNOT do zero-touch:**

1. **Local machine access** (files, processes, SSH)
   - **Solution:** User installs local node (optional premium feature)
   - **Or:** Work in cloud workspace only (like Replit)

2. **Home Assistant integration** (requires local network)
   - **Solution:** User provides API key + public URL OR installs local node

3. **Private APIs/services** (corporate tools)
   - **Solution:** User provides API keys/webhooks

4. **Custom hardware** (cameras, sensors)
   - **Solution:** User installs local node with access

---

## How We Avoid "Jakob Integration Hell"

**Jakob's problem:** Manual OAuth setup for every new integration per user.

**Our solution:**

### **1. Chat-First Core (No Integrations)**
- Base product works without ANY integrations
- Value = AI assistant you talk to + memory + research + coding

### **2. Self-Service OAuth Dashboard**
```
dashboard.clawdbot.com/integrations
├── Gmail (Connect) ← User clicks, OAuth flow starts
├── Calendar (Connect)
├── Slack (Connect)
├── Dropbox (Connect)
└── API Keys (Paste)
```

**We build the OAuth flows ONCE.** Users click buttons. We never touch their accounts.

### **3. Progressive Enhancement**
- **Free tier:** Chat + basic features (no integrations)
- **Pro tier:** Chat + self-service integrations
- **Enterprise:** Chat + integrations + local node + SSO

### **4. Integration Template System**
```javascript
// We build generic OAuth handlers
class OAuthIntegration {
  async connect(provider) {
    // Generic OAuth flow
    // Works for Gmail, Outlook, Slack, etc.
  }
}
```

**One codebase, many providers.** User initiates, we don't touch it.

---

## What Makes Clawdbot Valuable WITHOUT Integrations?

**The brutal truth:** Most AI assistants are single-turn chatbots. Clawdbot's value is elsewhere:

### **1. Memory (Huge Differentiator)**
- ChatGPT forgets you every session
- Clawdbot remembers everything (MEMORY.md, daily logs)
- Learns your preferences, projects, context

**Value:** "My AI assistant that actually knows me"

### **2. Proactive Agent (Not Just Chat)**
- Heartbeats (periodic check-ins)
- Background tasks (research, file organization)
- Multi-tasking (subagents)

**Value:** "My AI doesn't just respond, it works for me"

### **3. Workspace (Code + Files)**
- Write code, documentation, content
- Organize projects
- Version control (git integration)

**Value:** "My AI can build and maintain projects"

### **4. Research & Web Automation**
- Deep research with citations
- Web scraping
- Browser automation (book flights, fill forms)

**Value:** "My AI can do things on the web"

### **5. Personality & Customization**
- SOUL.md (define agent personality)
- AGENTS.md (custom instructions)
- Learning and improving over time

**Value:** "My AI is uniquely mine"

---

## Pricing Model (Self-Service)

### **Starter ($19/mo)**
- Chat interface (Discord OR WhatsApp OR Telegram)
- Memory (MEMORY.md + 30 days logs)
- Web research
- Basic file workspace (10GB)
- 100 AI messages/day

**No integrations.** Core value = chat + memory + research.

### **Pro ($49/mo)**
- Everything in Starter
- Self-service OAuth integrations:
  - Gmail (unlimited)
  - Google Calendar
  - Slack (1 workspace)
  - Dropbox/Drive (50GB)
- API key management
- Proactive heartbeats
- 500 AI messages/day
- Priority support

### **Team ($199/mo, up to 10 users)**
- Everything in Pro (per user)
- Shared workspace
- Team memory
- Admin dashboard
- SSO support
- 5,000 AI messages/day (pooled)

### **Enterprise (Custom)**
- Everything in Team
- Local node deployment (on-prem)
- Private APIs/integrations
- Custom LLM models
- SLA + dedicated support

---

## Technical Implementation: Self-Service OAuth

**How users connect Gmail (example):**

```javascript
// User clicks "Connect Gmail" in dashboard
// Backend generates OAuth URL
GET /integrations/gmail/connect
→ Redirects to Google OAuth consent screen

// User approves
// Google redirects back with auth code
GET /integrations/gmail/callback?code=ABC123

// Backend exchanges code for tokens
POST https://oauth2.googleapis.com/token
{
  "code": "ABC123",
  "client_id": "our-app-id",
  "client_secret": "our-secret",
  "redirect_uri": "https://dashboard.clawdbot.com/integrations/gmail/callback"
}

// Google returns access + refresh tokens
// Backend stores tokens (encrypted) in user's profile
{
  "userId": "user-123",
  "provider": "gmail",
  "accessToken": "encrypted-access-token",
  "refreshToken": "encrypted-refresh-token",
  "expiresAt": "2026-01-27T12:00:00Z"
}

// Now agent can use Gmail on behalf of user
// No manual setup by Clawdbot team
```

**We build this flow ONCE per provider.** Users self-serve infinitely.

---

## What's NOT Possible (Be Honest)

### **1. Local File Access (Without Local Node)**
- Can't read files from user's laptop
- **Solution:** Cloud workspace OR optional local node ($99/mo extra)

### **2. Private Network Services (Home Assistant, local APIs)**
- Can't access devices behind firewall
- **Solution:** Public endpoints OR local node

### **3. Real-Time Desktop Automation**
- Can't control user's mouse/keyboard (that's RPA territory)
- **Solution:** Browser automation only OR local node

### **4. Corporate SSO (Okta, Azure AD) - Without Custom Setup**
- Standard OAuth works
- Corporate SSO requires per-company config
- **Solution:** Enterprise tier only

---

## Competitive Landscape

### **What Others Do:**

**ChatGPT:**
- Chat-first, no integrations (plugins are dead)
- Memory = broken (pretends to remember, doesn't really)
- Value = best model

**Google AI Studio / Gemini:**
- Chat-first, Google ecosystem integrations
- Memory = nonexistent
- Value = deep Google integration

**Replit Agent:**
- Code-first, no external integrations
- Cloud workspace only
- Value = coding + deployment

**Zapier AI:**
- Automation-first, 5000+ integrations (all OAuth)
- Not a chat agent
- Value = connect everything

### **Clawdbot's Position:**

**Chat-first + Memory + Workspace + OPTIONAL self-service integrations**

Not as smart as ChatGPT (yet), but:
- Actually remembers you
- Works proactively
- Can do things (web, files, code)
- Optionally connects to your tools (you setup, not us)

---

## Go-to-Market: Zero-Touch Strategy

### **Phase 1: Chat-First MVP (Zero Integrations)**
**Ship:** Discord bot + WhatsApp bot + Memory + Web research  
**Pricing:** $19/mo  
**Target:** Early adopters who want "ChatGPT but it remembers me"  
**Timeline:** 2-4 weeks

### **Phase 2: Self-Service OAuth (Gmail + Calendar)**
**Ship:** Dashboard with "Connect Gmail" and "Connect Calendar" buttons  
**Pricing:** $49/mo Pro tier  
**Target:** Power users who want email/calendar automation  
**Timeline:** 4-8 weeks

### **Phase 3: More Integrations (Slack, Dropbox, etc.)**
**Ship:** 5-10 more OAuth integrations (all self-service)  
**Pricing:** Same $49/mo Pro tier (more value, same price)  
**Timeline:** 8-16 weeks

### **Phase 4: Local Node (Optional Premium)**
**Ship:** Installable agent for local file access, home automation  
**Pricing:** +$99/mo add-on  
**Target:** Power users with home labs  
**Timeline:** 16+ weeks

---

## Key Decisions

### **1. Cloud Workspace vs Local Files?**

**Option A: Cloud-Only (Replit Model)**
- Pros: Zero setup, works everywhere, easy to backup
- Cons: No local file access, users must upload

**Option B: Local Node Optional**
- Pros: Best of both worlds
- Cons: More complex, fragmented experience

**Recommendation:** Start with Cloud-Only (Phase 1), add Local Node later (Phase 4)

### **2. Which Chat Platform First?**

**Discord:**
- Pros: Easy to build, good for early adopters, community feel
- Cons: Not mainstream, requires Discord account

**WhatsApp:**
- Pros: 2B+ users, mainstream, works globally
- Cons: Business API limitations, rate limits, harder to build

**Recommendation:** Start with Discord (easier), add WhatsApp in parallel

### **3. Free Tier or Paid-Only?**

**Free Tier:**
- Pros: Growth, viral potential, wider funnel
- Cons: Abuse, support burden, LLM costs

**Paid-Only:**
- Pros: Qualified users, sustainable, less abuse
- Cons: Slower growth, higher barrier

**Recommendation:** 7-day free trial, then paid. No forever-free tier (LLM costs too high)

---

## Bottom Line: Is Zero-Touch Possible?

**YES, with caveats:**

1. **Base product (chat + memory + web) = truly zero-touch**
   - User signs up, starts chatting, done
   - This alone has value (ChatGPT competitor)

2. **Integrations = self-service OAuth, not manual setup**
   - User clicks buttons, approves OAuth, done
   - We build flows once, users self-serve infinitely

3. **Advanced features (local files, home automation) = optional paid add-on**
   - Requires user to install local node
   - Not core product, premium feature

**The "Jakob problem" goes away because:**
- We don't manually setup OAuth for users (they do it)
- We build OAuth flows once (code scales infinitely)
- Core product works without ANY integrations

**The trick:** Position base product (no integrations) as valuable enough that people pay $19/mo. Then upsell Pro ($49/mo) with self-service integrations.

---

## Next Steps

1. **Validate chat-first value prop** (can people pay $19/mo for chat + memory + web?)
2. **Build self-service OAuth dashboard** (generic OAuth handler)
3. **Test with 10 beta users** (Discord bot + optional Gmail connect)
4. **Iterate based on what people actually use**

**Don't build all integrations upfront.** Start with zero, add 1-2 self-service ones, see what sticks.

---

## Appendix: Feature Matrix

| Feature | Zero-Touch | Self-Service OAuth | Manual Setup | Not Possible |
|---------|------------|-------------------|--------------|--------------|
| Chat (Discord/WhatsApp/Telegram) | ✅ | | | |
| Memory (MEMORY.md, daily logs) | ✅ | | | |
| Web search & scraping | ✅ | | | |
| Browser automation | ✅ | | | |
| Cloud workspace (files) | ✅ | | | |
| Subagents (parallel work) | ✅ | | | |
| Gmail read/send | | ✅ | | |
| Google Calendar | | ✅ | | |
| Slack integration | | ✅ | | |
| Dropbox/Drive | | ✅ | | |
| API keys (OpenAI, etc.) | | ✅ (user pastes) | | |
| Local file access | | | | ❌ (needs local node) |
| Home Assistant | | | ✅ (API key + URL) | ❌ (needs local network) |
| Corporate SSO | | | ✅ (per-company) | |
| Desktop automation (RPA) | | | | ❌ (out of scope) |

---

**End of Document**

*This is a living document. Update as we learn more about what users actually want vs what we THINK they want.*
