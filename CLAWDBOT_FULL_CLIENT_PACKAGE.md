# Clawdbot Full Client Setup Package
## Premium Configuration Guide

---

# Table of Contents
1. [Core Setup](#core-setup)
2. [Identity & Personality](#identity--personality)
3. [Channel Configuration](#channel-configuration)
4. [Memory & Intelligence](#memory--intelligence)
5. [Web Search & Research](#web-search--research)
6. [Skills & Capabilities](#skills--capabilities)
7. [Tool Permissions & Security](#tool-permissions--security)
8. [Automation & Scheduling](#automation--scheduling)
9. [Hooks & Triggers](#hooks--triggers)
10. [Mobile Apps & Nodes](#mobile-apps--nodes)
11. [Backup & Maintenance](#backup--maintenance)
12. [Client Handoff Package](#client-handoff-package)

---

# Core Setup

## Installation
```powershell
npm install -g clawdbot@latest
clawdbot onboard --install-daemon
```

## Authentication

### Anthropic (Required)
```powershell
claude setup-token
clawdbot models auth setup-token --provider anthropic
```

### OpenAI for Memory (Recommended)
```powershell
clawdbot models auth add
# Select: openai → paste token → paste API key
```

### Verify
```powershell
clawdbot models status
```

---

# Identity & Personality

## Set Custom Agent Identity

Edit via dashboard (Config) or CLI:

```powershell
clawdbot config set agents.defaults.identity.name "ClientBot"
clawdbot config set agents.defaults.identity.description "Personal AI assistant for [Client Name]"
```

## Custom System Prompt

Create file: `~/clawd/CLAUDE.md`

```markdown
# Identity

You are [Bot Name], a personal AI assistant for [Client Name].

## Personality
- Friendly but professional
- Concise responses unless detail requested
- Use emojis sparingly
- Remember context from previous conversations

## Knowledge
- [Client's business/interests]
- [Specific tools or workflows they use]
- [Key contacts and relationships]

## Rules
- Never share sensitive information externally
- Always confirm before taking major actions
- Escalate urgent matters appropriately
```

## Response Prefix (Optional)

Add a prefix to all responses:

```powershell
clawdbot config set messages.responsePrefix "[Bot] "
```

Or with model info:
```powershell
clawdbot config set messages.responsePrefix "[{model}] "
```

---

# Channel Configuration

## WhatsApp

### Setup
```powershell
clawdbot channels login
# Scan QR with phone
```

### Configure Allowed Contacts
```json
{
  "channels": {
    "whatsapp": {
      "dmPolicy": "allowlist",
      "allowFrom": [
        "+1234567890",
        "+0987654321"
      ],
      "groupPolicy": "allowlist",
      "allowGroups": [
        "Family Group",
        "Work Team"
      ],
      "selfChatMode": true,
      "mediaMaxMb": 50
    }
  }
}
```

### CLI Commands
```powershell
# Add allowed number
clawdbot config set channels.whatsapp.allowFrom "['+1234567890', '+0987654321']"

# Enable self-chat (message yourself to control bot)
clawdbot config set channels.whatsapp.selfChatMode true
```

## Telegram

### Setup
```powershell
clawdbot channels add
# Select Telegram, paste bot token from @BotFather
```

### Configure
```json
{
  "channels": {
    "telegram": {
      "enabled": true,
      "dmPolicy": "pairing",
      "groupPolicy": "allowlist",
      "streamMode": "partial"
    }
  }
}
```

## Discord

### Setup
1. Create bot at https://discord.com/developers/applications
2. Get bot token
3. Add bot to server with proper permissions

```powershell
clawdbot channels add
# Select Discord, paste bot token
```

### Configure
```json
{
  "channels": {
    "discord": {
      "enabled": true,
      "dmPolicy": "pairing",
      "guilds": {
        "SERVER_ID": {
          "channels": {
            "general": { "allow": true },
            "bot-commands": { "allow": true }
          }
        }
      }
    }
  }
}
```

## Slack

### Setup
1. Create Slack app at https://api.slack.com/apps
2. Enable Socket Mode
3. Get bot token + app token

```powershell
clawdbot channels add
# Select Slack, enter tokens
```

---

# Memory & Intelligence

## Semantic Search Setup

### Verify Status
```powershell
clawdbot memory status
```

### Build Index
```powershell
clawdbot memory index
```

### Memory Configuration
```json
{
  "agents": {
    "defaults": {
      "memorySearch": {
        "provider": "openai",
        "model": "text-embedding-3-small"
      }
    }
  }
}
```

## Memory Files

Store important context in `~/clawd/memory/`:

```
~/clawd/memory/
├── contacts.md       # Key people and relationships
├── projects.md       # Current projects and status
├── preferences.md    # Client preferences
├── procedures.md     # Standard procedures
└── history.md        # Important past events
```

### Example: contacts.md
```markdown
# Key Contacts

## Family
- Sarah (wife) - prefers text over calls
- Tom (son) - university student, studying engineering

## Work
- Mike (business partner) - handles operations
- Lisa (accountant) - monthly reports due 15th

## Services
- Dr. Smith - GP, appointments via receptionist
- John (mechanic) - call for car issues
```

After adding files:
```powershell
clawdbot memory index
```

---

# Web Search & Research

## Setup Brave Search API

1. Get API key from https://brave.com/search/api/
2. Configure:

```powershell
clawdbot configure --section web
# Enable web_search
# Paste Brave API key
```

### Or via CLI:
```powershell
clawdbot config set tools.web.search.enabled true
clawdbot config set tools.web.search.apiKey "YOUR_BRAVE_API_KEY"
```

## Alternative: Environment Variable
```powershell
# Add to system environment
$env:BRAVE_API_KEY = "your_key"
```

## Verify
```powershell
clawdbot status --all
# Should show web search: enabled
```

---

# Skills & Capabilities

## View Available Skills
```powershell
clawdbot skills list
clawdbot skills check --verbose
```

## Configure Skills
```powershell
clawdbot configure --section skills
```

## Recommended Skills by Client Type

### Business Professional
- calendar management
- email drafting
- meeting notes
- task tracking

### Developer
- code review
- git operations
- documentation
- debugging assistance

### Personal Assistant
- reminders
- research
- scheduling
- travel planning

## Enable/Disable Specific Skills
```json
{
  "skills": {
    "entries": {
      "calendar": { "enabled": true },
      "email": { "enabled": true },
      "code-execution": { "enabled": false }
    }
  }
}
```

---

# Tool Permissions & Security

## Tool Profiles

| Profile | Capabilities |
|---------|--------------|
| `minimal` | Session status only |
| `coding` | File system, runtime, sessions, memory |
| `messaging` | Messaging + session management |
| `full` | Everything (default) |

### Set Profile
```powershell
clawdbot config set tools.profile "messaging"
```

## Granular Permissions

### Allow Specific Tools
```json
{
  "tools": {
    "profile": "minimal",
    "allow": [
      "web_search",
      "memory_search",
      "message"
    ]
  }
}
```

### Deny Specific Tools
```json
{
  "tools": {
    "profile": "full",
    "deny": [
      "exec",
      "bash",
      "write"
    ]
  }
}
```

## Elevated Access (Host Commands)

Disable for security:
```powershell
clawdbot config set tools.elevated.enabled false
```

## Sandbox Mode

For untrusted/group sessions:
```json
{
  "agents": {
    "defaults": {
      "sandbox": {
        "mode": "non-main",
        "workspaceAccess": "ro"
      }
    }
  }
}
```

---

# Automation & Scheduling

## Cron Jobs

### Via Dashboard
1. Go to **Cron Jobs** in sidebar
2. Click **Add Job**
3. Configure schedule and action

### Via CLI
```powershell
clawdbot cron list
clawdbot cron add
```

## Example Cron Jobs

### Daily Summary (9 AM)
```json
{
  "id": "daily-summary",
  "schedule": "0 9 * * *",
  "action": {
    "type": "message",
    "target": "whatsapp:+1234567890",
    "message": "Good morning! Here's your daily briefing..."
  }
}
```

### Weekly Review (Friday 5 PM)
```json
{
  "id": "weekly-review",
  "schedule": "0 17 * * 5",
  "action": {
    "type": "agent",
    "prompt": "Summarize this week's conversations and key action items"
  }
}
```

### Reminder Check (Every Hour)
```json
{
  "id": "reminder-check",
  "schedule": "0 * * * *",
  "action": {
    "type": "agent",
    "prompt": "Check for any pending reminders due in the next hour"
  }
}
```

---

# Hooks & Triggers

## Available Hooks

| Hook | Trigger | Purpose |
|------|---------|---------|
| `boot-md` | Gateway startup | Run startup tasks |
| `command-logger` | Any command | Log all commands |
| `session-memory` | `/new` command | Save session to memory |

## View Hooks
```powershell
clawdbot hooks list
```

## Enable/Disable Hooks
```powershell
clawdbot hooks enable session-memory
clawdbot hooks disable command-logger
```

## Configuration
```json
{
  "hooks": {
    "internal": {
      "enabled": true,
      "entries": {
        "session-memory": { "enabled": true },
        "command-logger": { "enabled": true },
        "boot-md": { "enabled": false }
      }
    }
  }
}
```

---

# Mobile Apps & Nodes

## Available Apps

| Platform | Features |
|----------|----------|
| macOS | Menu bar, notifications, voice wake |
| iOS | Camera, canvas, location |
| Android | Camera, canvas, chat, location |

## Setup Nodes

### List Connected Nodes
```powershell
clawdbot nodes list
```

### Approve Pending Node
```powershell
clawdbot nodes pending
clawdbot nodes approve <node-id>
```

## Node Capabilities

Once connected, agent can:
- Take photos via phone camera
- Get device location
- Display canvas/presentations
- Send system notifications

---

# Backup & Maintenance

## Important Files to Backup

```
~/.clawdbot/
├── clawdbot.json              # Main config
├── agents/main/agent/
│   └── auth-profiles.json     # Auth tokens (SENSITIVE)
├── agents/main/sessions/
│   └── sessions.json          # Conversation sessions
└── memory/
    └── main.sqlite            # Memory database

~/clawd/
├── CLAUDE.md                  # System prompt
├── memory/                    # Memory files
└── canvas/                    # Canvas files
```

## Backup Commands
```powershell
# Create backup
$date = Get-Date -Format "yyyy-MM-dd"
Copy-Item -Recurse "$env:USERPROFILE\.clawdbot" "$env:USERPROFILE\clawdbot-backup-$date"
Copy-Item -Recurse "$env:USERPROFILE\clawd" "$env:USERPROFILE\clawd-backup-$date"
```

## OAuth Token Refresh

Tokens expire every ~7 hours. Refresh:
```powershell
claude setup-token
clawdbot models auth setup-token --provider anthropic
clawdbot gateway restart
```

## Health Monitoring
```powershell
# Quick check
clawdbot health

# Full status
clawdbot status --all

# Security audit
clawdbot security audit --deep

# Live logs
clawdbot logs --follow
```

## Common Maintenance Tasks

### Restart Gateway
```powershell
clawdbot gateway restart
```

### Clear Old Sessions
```powershell
clawdbot sessions clear
```

### Rebuild Memory Index
```powershell
clawdbot memory index
```

### Update Clawdbot
```powershell
npm update -g clawdbot@latest
clawdbot gateway restart
```

---

# Client Handoff Package

## Deliverables Checklist

- [ ] Gateway running as background service
- [ ] All channels connected (WhatsApp/Telegram/etc.)
- [ ] Auth configured (Anthropic + OpenAI)
- [ ] Memory/semantic search working
- [ ] Custom identity/system prompt set
- [ ] Allowed contacts configured
- [ ] Tool permissions appropriate for client
- [ ] Web search enabled (if needed)
- [ ] Cron jobs set up (if needed)
- [ ] Backup procedure documented

## Client Quick Reference Card

```
═══════════════════════════════════════════════════
           CLAWDBOT QUICK REFERENCE
═══════════════════════════════════════════════════

DASHBOARD
  http://127.0.0.1:18789/?token=YOUR_TOKEN

COMMON COMMANDS
  clawdbot status          Check everything
  clawdbot health          Quick health check
  clawdbot gateway restart Restart if issues
  clawdbot logs --follow   View live logs

IF BOT STOPS RESPONDING
  1. clawdbot gateway restart
  2. If still broken: clawdbot gateway --verbose
  3. Look for errors, contact support

IF AUTH EXPIRES
  1. claude setup-token
  2. clawdbot models auth setup-token --provider anthropic
  3. clawdbot gateway restart

SUPPORT
  [Your contact info]

═══════════════════════════════════════════════════
```

## Training Topics for Client

1. **Dashboard Navigation**
   - Chat interface
   - Viewing sessions
   - Checking health status

2. **Basic Troubleshooting**
   - Restarting gateway
   - Checking logs
   - Refreshing auth

3. **Security**
   - Not sharing tokens
   - Pairing approvals
   - What the bot can/can't access

4. **Best Practices**
   - Clear commands work best
   - Use `/new` to start fresh context
   - Check memory files are up to date

---

# Pricing Tiers (Suggested)

## Basic Setup
- Installation & configuration
- 1 channel (WhatsApp OR Telegram)
- Basic memory
- 30-min training call

## Standard Setup
- Everything in Basic
- 2 channels
- Web search enabled
- Custom system prompt
- 1 hour training

## Premium Setup
- Everything in Standard
- All channels
- Full skill configuration
- Cron jobs & automation
- Mobile app setup
- 2 hours training
- 30 days support

## Enterprise
- Multi-user setup
- Cloud deployment (Railway/VPS)
- Custom integrations
- Ongoing support contract

---

# Appendix: Full Configuration Template

```json
{
  "auth": {
    "profiles": {
      "anthropic:claude-cli": {
        "provider": "anthropic",
        "mode": "oauth"
      },
      "openai:manual": {
        "provider": "openai",
        "mode": "token"
      }
    }
  },
  "agents": {
    "defaults": {
      "workspace": "~/clawd",
      "identity": {
        "name": "Assistant",
        "description": "Personal AI assistant"
      },
      "memorySearch": {
        "provider": "openai",
        "model": "text-embedding-3-small"
      },
      "maxConcurrent": 4
    }
  },
  "channels": {
    "whatsapp": {
      "enabled": true,
      "dmPolicy": "allowlist",
      "allowFrom": ["+1234567890"],
      "selfChatMode": true,
      "mediaMaxMb": 50
    },
    "telegram": {
      "enabled": true,
      "dmPolicy": "pairing",
      "botToken": "YOUR_BOT_TOKEN"
    }
  },
  "tools": {
    "profile": "full",
    "elevated": {
      "enabled": false
    },
    "web": {
      "search": {
        "enabled": true,
        "apiKey": "YOUR_BRAVE_API_KEY"
      }
    }
  },
  "hooks": {
    "internal": {
      "enabled": true,
      "entries": {
        "session-memory": { "enabled": true }
      }
    }
  },
  "messages": {
    "ackReactionScope": "group-mentions"
  },
  "gateway": {
    "port": 18789,
    "mode": "local",
    "bind": "loopback",
    "auth": {
      "mode": "token",
      "token": "GENERATED_TOKEN"
    }
  }
}
```

---

*Document Version: 1.0*
*Created: January 27, 2026*
*Clawdbot Version: 2026.1.24-3*
