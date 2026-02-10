# Skills API

Skills are modular capabilities that extend agent functionality. Manage which skills are available and configure their behavior.

---

## Overview

Skills enable agents to perform specific tasks like:

- **Email Management** - Read, compose, and organize emails
- **Calendar** - Schedule meetings, check availability
- **Research** - Web searches, data gathering
- **Automation** - Workflow triggers, integrations
- **Custom** - User-built capabilities

---

## Skills by Tier

### Starter Skills ($199/mo)

| Skill | Description |
|-------|-------------|
| `email` | Email management (read/compose/organize) |
| `calendar` | Calendar & scheduling |
| `research` | Web research & data gathering |
| `documents` | Document summarization & analysis |
| `social_media` | Social media management |
| `financial_basic` | Basic financial tracking |

### Professional Skills ($499/mo)

All Starter skills, plus:

| Skill | Description |
|-------|-------------|
| `crm` | CRM automation & management |
| `financial_advanced` | Advanced financial analysis |
| `competitive_intel` | Competitive intelligence |
| `custom_reports` | Custom reporting & dashboards |
| `mission_control` | Sub-agent orchestration (5 max) |

### Enterprise Skills ($999/mo)

All Professional skills, plus:

| Skill | Description |
|-------|-------------|
| `api_integrations` | Custom API integrations |
| `database` | Database connections |
| `custom_tools` | Custom tool development |
| `mission_control_xl` | Sub-agent orchestration (10 max) |
| `audit_logging` | Compliance-ready audit logs |

---

## List Available Skills

Get all skills available for an agent based on their tier.

```http
GET /v1/skills
```

### Request

```bash
curl -X GET "https://api.clawdbot.com/v1/skills?agent_id=agent_abc123" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `agent_id` | string | Yes | Agent identifier |
| `status` | string | No | Filter: `enabled`, `disabled`, `all` |
| `category` | string | No | Filter: `productivity`, `communication`, `research`, `automation`, `custom` |

### Response

```json
{
  "success": true,
  "data": {
    "skills": [
      {
        "id": "email",
        "name": "Email Management",
        "description": "Read, compose, and organize emails across multiple providers",
        "category": "communication",
        "enabled": true,
        "tier_required": "starter",
        "config": {
          "provider": "gmail",
          "auto_categorize": true,
          "summary_enabled": true
        }
      },
      {
        "id": "calendar",
        "name": "Calendar & Scheduling",
        "description": "Manage calendar events, schedule meetings, check availability",
        "category": "productivity",
        "enabled": true,
        "tier_required": "starter",
        "config": {
          "provider": "google",
          "default_duration": 30,
          "buffer_time": 15
        }
      },
      {
        "id": "research",
        "name": "Web Research",
        "description": "Search the web, gather data, summarize findings",
        "category": "research",
        "enabled": true,
        "tier_required": "starter",
        "config": {
          "max_sources": 10,
          "include_citations": true
        }
      },
      {
        "id": "crm",
        "name": "CRM Automation",
        "description": "Manage contacts, deals, and pipelines",
        "category": "automation",
        "enabled": false,
        "tier_required": "professional",
        "config": null
      },
      {
        "id": "mission_control",
        "name": "Mission Control",
        "description": "Orchestrate multiple sub-agents for complex tasks",
        "category": "automation",
        "enabled": false,
        "tier_required": "professional",
        "config": null
      }
    ],
    "total": 5,
    "enabled_count": 3
  }
}
```

---

## Get Skill Details

Get detailed information about a specific skill including documentation and configuration schema.

```http
GET /v1/skills/{skill_id}
```

### Request

```bash
curl -X GET https://api.clawdbot.com/v1/skills/email \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Response

```json
{
  "success": true,
  "data": {
    "id": "email",
    "name": "Email Management",
    "description": "Read, compose, and organize emails across multiple providers",
    "category": "communication",
    "tier_required": "starter",
    "documentation": "## Email Management Skill\n\nThis skill enables your agent to:\n\n- **Read emails** - Summarize inbox, find specific messages\n- **Compose emails** - Draft and send messages\n- **Organize** - Categorize, archive, delete\n- **Search** - Find emails by sender, subject, date\n\n### Supported Providers\n\n- Gmail\n- Outlook/Microsoft 365\n- Yahoo Mail\n\n### Example Prompts\n\n- \"What's in my inbox today?\"\n- \"Draft an email to John about the meeting\"\n- \"Find all emails from Sarah last week\"",
    "config_schema": {
      "type": "object",
      "properties": {
        "provider": {
          "type": "string",
          "enum": ["gmail", "outlook", "yahoo"],
          "description": "Email provider to connect"
        },
        "auto_categorize": {
          "type": "boolean",
          "default": true,
          "description": "Automatically categorize incoming emails"
        },
        "summary_enabled": {
          "type": "boolean",
          "default": true,
          "description": "Generate daily inbox summaries"
        },
        "summary_time": {
          "type": "string",
          "pattern": "^([01]\\d|2[0-3]):([0-5]\\d)$",
          "default": "09:00",
          "description": "Time to send daily summary (HH:MM)"
        },
        "max_emails_per_summary": {
          "type": "integer",
          "minimum": 5,
          "maximum": 50,
          "default": 20,
          "description": "Maximum emails to include in summary"
        }
      },
      "required": ["provider"]
    },
    "examples": [
      {
        "prompt": "What's in my inbox?",
        "response": "You have 12 unread emails:\n\n**Priority:**\n- John Smith: Q4 Review Meeting (2h ago)\n- Sarah: Project Update Needed (4h ago)\n\n**Updates:**\n- 3 newsletters\n- 2 promotional emails\n\nWould you like me to summarize any of these?"
      },
      {
        "prompt": "Draft an email to the team about the launch delay",
        "response": "Here's a draft:\n\n---\n**Subject:** Update on Product Launch Timeline\n\nHi team,\n\nI wanted to share an important update...\n\n---\n\nShould I send this now or make changes?"
      }
    ],
    "enabled": true,
    "config": {
      "provider": "gmail",
      "auto_categorize": true,
      "summary_enabled": true
    }
  }
}
```

---

## Enable a Skill

Enable a skill for an agent.

```http
POST /v1/skills/{skill_id}/enable
```

### Request

```bash
curl -X POST https://api.clawdbot.com/v1/skills/crm/enable \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "agent_id": "agent_abc123",
    "config": {
      "provider": "hubspot",
      "sync_contacts": true,
      "auto_log_emails": true
    }
  }'
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `agent_id` | string | Yes | Agent identifier |
| `config` | object | No | Initial skill configuration |

### Response

```json
{
  "success": true,
  "data": {
    "id": "crm",
    "name": "CRM Automation",
    "enabled": true,
    "config": {
      "provider": "hubspot",
      "sync_contacts": true,
      "auto_log_emails": true
    },
    "activated_at": "2026-01-27T10:30:00Z"
  }
}
```

### Errors

**Skill not available for tier:**

```json
{
  "success": false,
  "error": {
    "code": "SKILL_TIER_REQUIRED",
    "message": "This skill requires Professional tier or higher",
    "details": {
      "skill": "crm",
      "required_tier": "professional",
      "current_tier": "starter",
      "upgrade_url": "https://dashboard.clawdbot.com/upgrade"
    }
  }
}
```

---

## Disable a Skill

Disable a skill for an agent.

```http
POST /v1/skills/{skill_id}/disable
```

### Request

```bash
curl -X POST https://api.clawdbot.com/v1/skills/crm/disable \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "agent_id": "agent_abc123"
  }'
```

### Response

```json
{
  "success": true,
  "data": {
    "id": "crm",
    "name": "CRM Automation",
    "enabled": false,
    "disabled_at": "2026-01-27T10:35:00Z"
  }
}
```

---

## Update Skill Configuration

Update the configuration for an enabled skill.

```http
PUT /v1/skills/{skill_id}/config
```

### Request

```bash
curl -X PUT https://api.clawdbot.com/v1/skills/email/config \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "agent_id": "agent_abc123",
    "config": {
      "provider": "gmail",
      "auto_categorize": true,
      "summary_enabled": true,
      "summary_time": "08:00",
      "max_emails_per_summary": 30
    }
  }'
```

### Response

```json
{
  "success": true,
  "data": {
    "id": "email",
    "name": "Email Management",
    "enabled": true,
    "config": {
      "provider": "gmail",
      "auto_categorize": true,
      "summary_enabled": true,
      "summary_time": "08:00",
      "max_emails_per_summary": 30
    },
    "updated_at": "2026-01-27T10:40:00Z"
  }
}
```

---

## Skill Configuration Reference

### Email Management

```json
{
  "provider": "gmail",          // gmail, outlook, yahoo
  "auto_categorize": true,      // Auto-categorize emails
  "summary_enabled": true,      // Daily inbox summary
  "summary_time": "09:00",      // Summary time (HH:MM)
  "max_emails_per_summary": 20, // Max emails in summary
  "signature": "Best,\nYour Name" // Email signature
}
```

### Calendar

```json
{
  "provider": "google",         // google, outlook
  "default_duration": 30,       // Default meeting duration (min)
  "buffer_time": 15,            // Buffer between meetings (min)
  "working_hours_start": "09:00",
  "working_hours_end": "17:00",
  "working_days": [1, 2, 3, 4, 5], // 0=Sun, 6=Sat
  "timezone": "America/New_York"
}
```

### Research

```json
{
  "max_sources": 10,            // Max sources to search
  "include_citations": true,    // Include source citations
  "prefer_recent": true,        // Prioritize recent results
  "search_providers": ["google", "bing", "brave"],
  "content_types": ["articles", "papers", "news"]
}
```

### CRM (Professional+)

```json
{
  "provider": "hubspot",        // hubspot, salesforce, pipedrive
  "sync_contacts": true,        // Sync contacts automatically
  "auto_log_emails": true,      // Log emails to CRM
  "auto_create_tasks": true,    // Create tasks from conversations
  "default_pipeline": "sales"   // Default deal pipeline
}
```

### Mission Control (Professional+)

```json
{
  "max_subagents": 5,           // Max concurrent sub-agents
  "allowed_skills": ["research", "email", "documents"],
  "timeout_minutes": 30,        // Task timeout
  "parallel_execution": true    // Run tasks in parallel
}
```

---

## Custom Skills

Enterprise tier supports custom skill development.

### List Custom Skills

```bash
curl -X GET "https://api.clawdbot.com/v1/skills/custom?agent_id=agent_abc123" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Create Custom Skill

```bash
curl -X POST https://api.clawdbot.com/v1/skills/custom \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "agent_id": "agent_abc123",
    "name": "Inventory Check",
    "description": "Check product inventory levels",
    "trigger_phrases": ["check inventory", "stock levels", "how many in stock"],
    "action": {
      "type": "api_call",
      "endpoint": "https://api.yourcompany.com/inventory",
      "method": "GET",
      "headers": {
        "Authorization": "Bearer ${INVENTORY_API_KEY}"
      },
      "params": {
        "product_id": "${extract.product_id}"
      }
    },
    "response_template": "The current stock level for {{product_name}} is {{quantity}} units."
  }'
```

### Response

```json
{
  "success": true,
  "data": {
    "id": "custom_inventory_check",
    "name": "Inventory Check",
    "description": "Check product inventory levels",
    "enabled": true,
    "created_at": "2026-01-27T10:45:00Z"
  }
}
```

---

## Skill Usage Analytics

Get skill usage statistics.

```http
GET /v1/skills/analytics
```

### Request

```bash
curl -X GET "https://api.clawdbot.com/v1/skills/analytics?agent_id=agent_abc123&period=7d" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Response

```json
{
  "success": true,
  "data": {
    "period": "7d",
    "skills": [
      {
        "skill_id": "email",
        "name": "Email Management",
        "invocations": 156,
        "success_rate": 0.98,
        "avg_latency_ms": 1250,
        "top_actions": ["read_inbox", "compose", "search"]
      },
      {
        "skill_id": "calendar",
        "name": "Calendar",
        "invocations": 89,
        "success_rate": 0.99,
        "avg_latency_ms": 850,
        "top_actions": ["check_schedule", "create_event", "find_availability"]
      },
      {
        "skill_id": "research",
        "name": "Web Research",
        "invocations": 42,
        "success_rate": 0.95,
        "avg_latency_ms": 3500,
        "top_actions": ["web_search", "summarize", "compare"]
      }
    ],
    "total_invocations": 287
  }
}
```

---

## OAuth Connections

Many skills require OAuth connections to third-party services.

### Initiate OAuth Flow

```bash
curl -X POST https://api.clawdbot.com/v1/skills/email/oauth/connect \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "agent_id": "agent_abc123",
    "provider": "gmail",
    "redirect_uri": "https://yourapp.com/oauth/callback"
  }'
```

### Response

```json
{
  "success": true,
  "data": {
    "auth_url": "https://accounts.google.com/oauth/authorize?...",
    "state": "oauth_state_abc123",
    "expires_in": 600
  }
}
```

### Check Connection Status

```bash
curl -X GET "https://api.clawdbot.com/v1/skills/email/oauth/status?agent_id=agent_abc123" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Response

```json
{
  "success": true,
  "data": {
    "connected": true,
    "provider": "gmail",
    "email": "user@example.com",
    "scopes": ["read", "send", "labels"],
    "connected_at": "2026-01-15T10:00:00Z",
    "expires_at": "2026-07-15T10:00:00Z"
  }
}
```

### Disconnect OAuth

```bash
curl -X DELETE "https://api.clawdbot.com/v1/skills/email/oauth?agent_id=agent_abc123" \
  -H "Authorization: Bearer YOUR_API_KEY"
```
