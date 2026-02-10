# Chat API

Send messages to AI agents and receive intelligent responses. Supports streaming, conversation history, and attachments.

---

## Overview

The Chat API is the primary way to interact with Clawdbot agents. Key features:

- **Conversational context** - Agents remember previous messages
- **Streaming responses** - Real-time text generation via SSE
- **Multi-channel** - Works across API, WhatsApp, Telegram, Slack
- **Attachments** - Support for images and files
- **Skills integration** - Automatic skill invocation based on requests

---

## Send a Message

Send a message to an agent and receive a response.

```http
POST /v1/chat/messages
```

### Request

```bash
curl -X POST https://api.clawdbot.com/v1/chat/messages \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "agent_id": "agent_abc123",
    "message": "What meetings do I have today?",
    "user_id": "user_123",
    "context": {
      "channel": "api"
    }
  }'
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `agent_id` | string | Yes | Target agent identifier |
| `message` | string | Yes | Message content (max 10,000 chars) |
| `user_id` | string | No | User identifier for context |
| `conversation_id` | string | No | Continue existing conversation |
| `context` | object | No | Additional context metadata |
| `context.channel` | string | No | Source channel: `api`, `whatsapp`, `telegram`, `slack`, `discord`, `web` |
| `context.metadata` | object | No | Custom metadata |
| `attachments` | array | No | Files or images to include |

### Response

```json
{
  "success": true,
  "data": {
    "id": "msg_xyz789",
    "agent_id": "agent_abc123",
    "conversation_id": "conv_abc123",
    "response": "Based on your calendar, you have 3 meetings today:\n\n1. **9:00 AM** - Team Standup (15 min)\n2. **11:00 AM** - Product Review with Sarah (1 hour)\n3. **3:00 PM** - Client Call - Acme Corp (30 min)\n\nWould you like me to send you reminders?",
    "created_at": "2026-01-27T10:30:00Z",
    "tokens_used": 187,
    "metadata": {
      "model": "claude-opus-4-5",
      "latency_ms": 1250,
      "skills_used": ["calendar"]
    }
  },
  "meta": {
    "request_id": "req_abc123",
    "timestamp": "2026-01-27T10:30:01Z"
  }
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique message identifier |
| `agent_id` | string | Agent that responded |
| `conversation_id` | string | Conversation identifier (use to continue) |
| `response` | string | Agent's response text |
| `created_at` | string | ISO 8601 timestamp |
| `tokens_used` | integer | Tokens consumed |
| `metadata.model` | string | Model used for response |
| `metadata.latency_ms` | integer | Response time in milliseconds |
| `metadata.skills_used` | array | Skills invoked for this message |

---

## Stream a Response

Receive the response in real-time as it's being generated.

```http
POST /v1/chat/stream
```

### Request

```bash
curl -X POST https://api.clawdbot.com/v1/chat/stream \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -H "Accept: text/event-stream" \
  -d '{
    "agent_id": "agent_abc123",
    "message": "Write a summary of our Q4 performance",
    "user_id": "user_123"
  }'
```

### Response (Server-Sent Events)

```
event: message
data: {"delta": "Based on", "finish_reason": null}

event: message
data: {"delta": " the Q4", "finish_reason": null}

event: message
data: {"delta": " report,", "finish_reason": null}

...

event: done
data: {"finish_reason": "stop", "usage": {"input_tokens": 50, "output_tokens": 450}, "id": "msg_xyz789"}
```

### Handling Streams (JavaScript)

```javascript
const response = await fetch('https://api.clawdbot.com/v1/chat/stream', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    agent_id: 'agent_abc123',
    message: 'Summarize the report',
  }),
});

const reader = response.body.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  
  const chunk = decoder.decode(value);
  const lines = chunk.split('\n');
  
  for (const line of lines) {
    if (line.startsWith('data: ')) {
      const data = JSON.parse(line.slice(6));
      if (data.delta) {
        process.stdout.write(data.delta);
      }
    }
  }
}
```

### Handling Streams (Python)

```python
import httpx

with httpx.stream(
    "POST",
    "https://api.clawdbot.com/v1/chat/stream",
    headers={"Authorization": f"Bearer {API_KEY}"},
    json={"agent_id": "agent_abc123", "message": "Summarize the report"},
) as response:
    for line in response.iter_lines():
        if line.startswith("data: "):
            data = json.loads(line[6:])
            if data.get("delta"):
                print(data["delta"], end="", flush=True)
```

---

## Get Conversation History

Retrieve past messages in a conversation.

```http
GET /v1/chat/history
```

### Request

```bash
curl -X GET "https://api.clawdbot.com/v1/chat/history?agent_id=agent_abc123&user_id=user_123&limit=20" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `agent_id` | string | Yes | Agent identifier |
| `user_id` | string | Yes | User identifier |
| `conversation_id` | string | No | Specific conversation |
| `limit` | integer | No | Number of messages (default: 50, max: 100) |
| `before` | string | No | Return messages before this timestamp |

### Response

```json
{
  "success": true,
  "data": {
    "messages": [
      {
        "id": "msg_001",
        "type": "user",
        "content": "What's on my calendar today?",
        "created_at": "2026-01-27T09:00:00Z"
      },
      {
        "id": "msg_002",
        "type": "assistant",
        "content": "You have 3 meetings today...",
        "created_at": "2026-01-27T09:00:02Z",
        "metadata": {
          "skills_used": ["calendar"]
        }
      },
      {
        "id": "msg_003",
        "type": "user",
        "content": "Cancel the 3pm meeting",
        "created_at": "2026-01-27T09:05:00Z"
      },
      {
        "id": "msg_004",
        "type": "assistant",
        "content": "I've cancelled the 3pm meeting with Acme Corp. I'll send them a notification email. Would you like me to suggest alternative times?",
        "created_at": "2026-01-27T09:05:03Z",
        "metadata": {
          "skills_used": ["calendar", "email"]
        }
      }
    ],
    "has_more": true,
    "cursor": "msg_001"
  }
}
```

---

## Delete a Message

Remove a specific message from history.

```http
DELETE /v1/chat/messages/{message_id}
```

### Request

```bash
curl -X DELETE https://api.clawdbot.com/v1/chat/messages/msg_xyz789 \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Response

```
HTTP/1.1 204 No Content
```

---

## Attachments

Send files and images with messages.

### Supported Types

| Type | Extensions | Max Size |
|------|------------|----------|
| `image` | jpg, png, gif, webp | 10 MB |
| `file` | pdf, doc, docx, txt, csv | 25 MB |
| `audio` | mp3, wav, m4a | 50 MB |

### Request with Attachment

```bash
curl -X POST https://api.clawdbot.com/v1/chat/messages \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "agent_id": "agent_abc123",
    "message": "What does this document say?",
    "user_id": "user_123",
    "attachments": [
      {
        "type": "file",
        "url": "https://storage.clawdbot.com/uploads/doc_abc.pdf",
        "name": "Q4_Report.pdf"
      }
    ]
  }'
```

### Upload Files First

To attach files, upload them first:

```bash
curl -X POST https://api.clawdbot.com/v1/files/upload \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -F "file=@/path/to/document.pdf"
```

**Response:**

```json
{
  "url": "https://storage.clawdbot.com/uploads/doc_abc.pdf",
  "name": "document.pdf",
  "size": 1048576,
  "type": "application/pdf"
}
```

---

## Conversation Management

### Starting a New Conversation

Omit `conversation_id` to start fresh:

```json
{
  "agent_id": "agent_abc123",
  "message": "Let's plan the product launch",
  "user_id": "user_123"
}
```

### Continuing a Conversation

Include the `conversation_id` from a previous response:

```json
{
  "agent_id": "agent_abc123",
  "message": "What about the marketing timeline?",
  "user_id": "user_123",
  "conversation_id": "conv_abc123"
}
```

### Conversation Context Window

The agent maintains context from the last ~20 messages or 8,000 tokens, whichever is smaller. For longer conversations, older messages are summarized.

---

## System Messages

Inject system-level instructions for special behavior:

```json
{
  "agent_id": "agent_abc123",
  "message": "Generate a weekly report",
  "user_id": "user_123",
  "context": {
    "system_prompt": "Respond in bullet points. Be concise.",
    "format": "markdown"
  }
}
```

---

## Examples

### Research Request

```json
{
  "agent_id": "agent_abc123",
  "message": "Research the top 5 competitors in the AI assistant market and create a comparison table",
  "user_id": "user_123"
}
```

**Response:**

```json
{
  "response": "I've researched the AI assistant market. Here's a comparison:\n\n| Company | Product | Pricing | Key Features |\n|---------|---------|---------|---------------|\n| OpenAI | ChatGPT | $20/mo | GPT-4, plugins |\n| Anthropic | Claude | $20/mo | Long context, safety |\n| Google | Gemini | $20/mo | Multimodal, search |\n| Microsoft | Copilot | $30/mo | Office integration |\n| Perplexity | Perplexity Pro | $20/mo | Citations, search |\n\nWould you like me to dive deeper into any of these?",
  "metadata": {
    "skills_used": ["research", "web_search"]
  }
}
```

### Email Draft

```json
{
  "agent_id": "agent_abc123",
  "message": "Draft an email to the team about the delayed product launch",
  "user_id": "user_123"
}
```

**Response:**

```json
{
  "response": "Here's a draft email:\n\n---\n\n**Subject:** Update on Product Launch Timeline\n\nHi team,\n\nI wanted to share an important update regarding our product launch...\n\n---\n\nWould you like me to make any changes before sending?",
  "metadata": {
    "skills_used": ["email"]
  }
}
```

---

## Error Handling

### Rate Limited

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "You've exceeded the message limit for this hour",
    "details": {
      "limit": 100,
      "remaining": 0,
      "reset_at": "2026-01-27T11:00:00Z"
    }
  }
}
```

### Agent Unavailable

```json
{
  "success": false,
  "error": {
    "code": "AGENT_UNAVAILABLE",
    "message": "The agent is currently unavailable",
    "details": {
      "status": "provisioning",
      "estimated_ready": "2026-01-27T10:35:00Z"
    }
  }
}
```

### Message Too Long

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Message exceeds maximum length",
    "details": {
      "field": "message",
      "max_length": 10000,
      "actual_length": 12500
    }
  }
}
```
