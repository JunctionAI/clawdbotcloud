# Clawdbot/Ally API Documentation

> **Version:** 1.0.0  
> **Base URL:** `https://api.clawdbot.com/v1`  
> **Status:** Production Ready

---

## Overview

The Clawdbot/Ally API enables developers to integrate AI-powered personal assistants into their applications. Build conversational experiences, manage user context with persistent memory, and extend functionality through the skills system.

## Quick Links

| Resource | Description |
|----------|-------------|
| [Authentication](./authentication.md) | API keys, JWT tokens, OAuth2 |
| [Chat API](./chat-api.md) | Send messages, get responses, streaming |
| [Memory API](./memory-api.md) | Store/retrieve user context |
| [Skills API](./skills-api.md) | List, enable, configure skills |
| [Webhooks](./webhooks.md) | Events, callbacks, integrations |
| [Rate Limits](./rate-limits.md) | Quotas by plan |
| [OpenAPI Spec](./openapi.yaml) | Machine-readable API specification |

---

## Getting Started

### 1. Get Your API Key

```bash
# Sign up at https://dashboard.clawdbot.com
# Navigate to Settings → API Keys → Create New Key
```

### 2. Make Your First Request

```bash
curl -X POST https://api.clawdbot.com/v1/chat/messages \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "agent_id": "agent_abc123",
    "message": "Hello, what can you help me with today?",
    "user_id": "user_123"
  }'
```

### 3. Handle the Response

```json
{
  "id": "msg_xyz789",
  "agent_id": "agent_abc123",
  "response": "Hello! I'm your AI assistant. I can help you with:\n\n• Email management\n• Calendar scheduling\n• Research tasks\n• Document analysis\n\nWhat would you like to start with?",
  "created_at": "2026-01-27T10:30:00Z",
  "tokens_used": 142,
  "metadata": {
    "model": "claude-opus-4-5",
    "latency_ms": 1250
  }
}
```

---

## Authentication Methods

| Method | Use Case | Header |
|--------|----------|--------|
| **API Key** | Server-to-server | `Authorization: Bearer <key>` |
| **JWT Token** | User sessions | `Authorization: Bearer <jwt>` |
| **OAuth2** | Third-party integrations | Standard OAuth2 flow |

See [Authentication](./authentication.md) for full details.

---

## Core Concepts

### Agents

An **Agent** is a deployed Clawdbot instance configured for a specific user or organization.

```json
{
  "id": "agent_abc123",
  "name": "My Assistant",
  "tier": "professional",
  "status": "active",
  "skills": ["email", "calendar", "research"],
  "created_at": "2026-01-15T00:00:00Z"
}
```

### Messages

**Messages** are the primary way to interact with agents. Support streaming and attachments.

```json
{
  "id": "msg_xyz789",
  "type": "user",
  "content": "Research the latest AI trends",
  "attachments": [],
  "context": {
    "channel": "api",
    "user_id": "user_123"
  }
}
```

### Memory

**Memory** provides persistent context across conversations. Stores facts, preferences, and entity information.

```json
{
  "user_id": "user_123",
  "facts": [
    "Prefers email notifications",
    "Works at Acme Corp as CTO",
    "Meeting-free Fridays"
  ],
  "entities": {
    "people": ["John Smith", "Jane Doe"],
    "projects": ["Q1 Launch", "Platform Migration"]
  }
}
```

### Skills

**Skills** are modular capabilities that extend agent functionality.

```json
{
  "id": "skill_email",
  "name": "Email Management",
  "description": "Read, send, and organize emails",
  "enabled": true,
  "config": {
    "provider": "gmail",
    "auto_categorize": true
  }
}
```

---

## API Endpoints Summary

### Chat API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/chat/messages` | Send a message |
| `POST` | `/chat/stream` | Stream response (SSE) |
| `GET` | `/chat/history` | Get conversation history |
| `DELETE` | `/chat/messages/:id` | Delete a message |

### Memory API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/memory` | Get all memory |
| `POST` | `/memory/facts` | Add a fact |
| `DELETE` | `/memory/facts/:id` | Remove a fact |
| `GET` | `/memory/entities` | List entities |
| `PUT` | `/memory/entities/:id` | Update entity |
| `POST` | `/memory/search` | Search memory |

### Skills API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/skills` | List available skills |
| `GET` | `/skills/:id` | Get skill details |
| `POST` | `/skills/:id/enable` | Enable a skill |
| `POST` | `/skills/:id/disable` | Disable a skill |
| `PUT` | `/skills/:id/config` | Update skill config |

### Agent API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/agents` | List agents |
| `GET` | `/agents/:id` | Get agent details |
| `POST` | `/agents` | Create agent |
| `PUT` | `/agents/:id` | Update agent |
| `DELETE` | `/agents/:id` | Delete agent |
| `GET` | `/agents/:id/status` | Get agent health |

### Provisioning API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/provision` | Provision new agent |
| `GET` | `/provision/status/:id` | Get provision status |
| `GET` | `/provision/list` | List deployments |

---

## Response Format

All API responses follow a consistent format:

### Success Response

```json
{
  "success": true,
  "data": { ... },
  "meta": {
    "request_id": "req_abc123",
    "timestamp": "2026-01-27T10:30:00Z"
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Please try again in 60 seconds.",
    "details": {
      "limit": 100,
      "remaining": 0,
      "reset_at": "2026-01-27T10:31:00Z"
    }
  },
  "meta": {
    "request_id": "req_abc123",
    "timestamp": "2026-01-27T10:30:00Z"
  }
}
```

---

## Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `UNAUTHORIZED` | 401 | Invalid or missing authentication |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `VALIDATION_ERROR` | 400 | Invalid request body |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |
| `SERVICE_UNAVAILABLE` | 503 | Service temporarily unavailable |

---

## SDKs & Libraries

### Official SDKs

- **JavaScript/TypeScript:** `npm install @clawdbot/sdk`
- **Python:** `pip install clawdbot`
- **Go:** `go get github.com/clawdbot/clawdbot-go`

### Example: JavaScript SDK

```javascript
import { Clawdbot } from '@clawdbot/sdk';

const client = new Clawdbot({
  apiKey: process.env.CLAWDBOT_API_KEY,
});

// Send a message
const response = await client.chat.send({
  agentId: 'agent_abc123',
  message: 'What meetings do I have today?',
  userId: 'user_123',
});

console.log(response.content);

// Stream a response
const stream = await client.chat.stream({
  agentId: 'agent_abc123',
  message: 'Write me a summary of the Q4 report',
});

for await (const chunk of stream) {
  process.stdout.write(chunk.delta);
}
```

### Example: Python SDK

```python
from clawdbot import Clawdbot

client = Clawdbot(api_key="your-api-key")

# Send a message
response = client.chat.send(
    agent_id="agent_abc123",
    message="Schedule a meeting with John for tomorrow at 2pm",
    user_id="user_123"
)

print(response.content)

# Store memory
client.memory.add_fact(
    user_id="user_123",
    fact="Prefers afternoon meetings"
)
```

---

## Changelog

### v1.0.0 (2026-01-27)
- Initial API release
- Chat, Memory, Skills, and Agent APIs
- Webhook support for events
- Rate limiting by tier

---

## Support

- **Documentation:** https://docs.clawdbot.com
- **API Status:** https://status.clawdbot.com
- **Email:** api-support@clawdbot.com
- **Discord:** https://discord.gg/clawdbot
