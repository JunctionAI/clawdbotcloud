# Webhooks

Receive real-time notifications when events occur in your Clawdbot agents.

---

## Overview

Webhooks allow your application to receive HTTP callbacks when specific events happen:

- **Messages** - New messages, completed responses
- **Memory** - Facts/entities added or updated
- **Agents** - Status changes, errors
- **Skills** - Enabled, disabled, configured
- **Billing** - Subscription changes

---

## Webhook Endpoints

### Stripe Webhooks (Built-in)

Clawdbot automatically handles Stripe webhooks for subscription management.

```
POST /api/webhooks/stripe
```

**Handled Events:**
- `checkout.session.completed` → Provision new agent
- `customer.subscription.updated` → Update tier
- `customer.subscription.deleted` → Suspend agent
- `invoice.payment_failed` → Handle payment failure

### Custom Webhooks

Register your own endpoints to receive events.

---

## Register a Webhook

Create a new webhook endpoint.

```http
POST /v1/webhooks
```

### Request

```bash
curl -X POST https://api.clawdbot.com/v1/webhooks \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://yourapp.com/webhooks/clawdbot",
    "events": [
      "message.completed",
      "memory.updated",
      "agent.status_changed"
    ],
    "description": "Production webhook endpoint"
  }'
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | string | Yes | HTTPS URL to receive events |
| `events` | array | Yes | Events to subscribe to |
| `description` | string | No | Description for reference |
| `secret` | string | No | Custom signing secret (auto-generated if not provided) |

### Response

```json
{
  "success": true,
  "data": {
    "id": "wh_abc123",
    "url": "https://yourapp.com/webhooks/clawdbot",
    "events": [
      "message.completed",
      "memory.updated",
      "agent.status_changed"
    ],
    "description": "Production webhook endpoint",
    "secret": "whsec_abc123xyz...",
    "enabled": true,
    "created_at": "2026-01-27T10:30:00Z"
  }
}
```

> ⚠️ **Important:** Store the `secret` securely. It's only shown once.

---

## Available Events

### Message Events

| Event | Description |
|-------|-------------|
| `message.created` | User sent a message |
| `message.completed` | Agent completed response |
| `message.failed` | Response generation failed |

### Memory Events

| Event | Description |
|-------|-------------|
| `memory.fact_added` | New fact stored |
| `memory.fact_deleted` | Fact removed |
| `memory.entity_created` | New entity added |
| `memory.entity_updated` | Entity modified |
| `memory.entity_deleted` | Entity removed |
| `memory.updated` | Any memory change |

### Agent Events

| Event | Description |
|-------|-------------|
| `agent.created` | New agent provisioned |
| `agent.status_changed` | Agent status updated |
| `agent.error` | Agent encountered error |
| `agent.restarted` | Agent was restarted |
| `agent.deleted` | Agent was deleted |

### Skill Events

| Event | Description |
|-------|-------------|
| `skill.enabled` | Skill was enabled |
| `skill.disabled` | Skill was disabled |
| `skill.config_updated` | Skill config changed |
| `skill.error` | Skill encountered error |

### Billing Events

| Event | Description |
|-------|-------------|
| `subscription.created` | New subscription |
| `subscription.updated` | Tier or status changed |
| `subscription.cancelled` | Subscription cancelled |
| `payment.failed` | Payment failed |

---

## Webhook Payload Format

All webhooks follow this format:

```json
{
  "id": "evt_abc123",
  "type": "message.completed",
  "created": "2026-01-27T10:30:00Z",
  "data": {
    "object": {
      // Event-specific data
    }
  },
  "metadata": {
    "agent_id": "agent_abc123",
    "user_id": "user_123"
  }
}
```

---

## Event Payload Examples

### message.completed

```json
{
  "id": "evt_msg_001",
  "type": "message.completed",
  "created": "2026-01-27T10:30:00Z",
  "data": {
    "object": {
      "id": "msg_xyz789",
      "agent_id": "agent_abc123",
      "user_id": "user_123",
      "conversation_id": "conv_abc123",
      "user_message": "What's on my calendar today?",
      "response": "You have 3 meetings today...",
      "tokens_used": 187,
      "latency_ms": 1250,
      "skills_used": ["calendar"],
      "created_at": "2026-01-27T10:30:00Z"
    }
  }
}
```

### memory.updated

```json
{
  "id": "evt_mem_001",
  "type": "memory.updated",
  "created": "2026-01-27T10:35:00Z",
  "data": {
    "object": {
      "change_type": "fact_added",
      "fact": {
        "id": "fact_123",
        "content": "Prefers afternoon meetings",
        "category": "preference",
        "source": "conversation"
      },
      "agent_id": "agent_abc123",
      "user_id": "user_123"
    }
  }
}
```

### agent.status_changed

```json
{
  "id": "evt_agent_001",
  "type": "agent.status_changed",
  "created": "2026-01-27T10:40:00Z",
  "data": {
    "object": {
      "agent_id": "agent_abc123",
      "previous_status": "active",
      "new_status": "error",
      "reason": "API rate limit exceeded",
      "changed_at": "2026-01-27T10:40:00Z"
    }
  }
}
```

### skill.enabled

```json
{
  "id": "evt_skill_001",
  "type": "skill.enabled",
  "created": "2026-01-27T10:45:00Z",
  "data": {
    "object": {
      "skill_id": "crm",
      "skill_name": "CRM Automation",
      "agent_id": "agent_abc123",
      "config": {
        "provider": "hubspot",
        "sync_contacts": true
      },
      "enabled_at": "2026-01-27T10:45:00Z"
    }
  }
}
```

---

## Signature Verification

All webhooks include a signature header for verification:

```
X-Clawdbot-Signature: t=1706349600,v1=abc123...
```

### Verification Steps

1. Extract timestamp (`t`) and signature (`v1`) from header
2. Prepare signed payload: `{timestamp}.{body}`
3. Compute HMAC-SHA256 using your webhook secret
4. Compare computed signature with `v1`
5. Verify timestamp is within tolerance (5 minutes)

### Node.js Example

```javascript
const crypto = require('crypto');

function verifyWebhook(payload, signature, secret) {
  const elements = signature.split(',');
  const timestamp = elements.find(e => e.startsWith('t=')).slice(2);
  const providedSig = elements.find(e => e.startsWith('v1=')).slice(3);
  
  // Check timestamp (within 5 minutes)
  const tolerance = 300; // 5 minutes
  const now = Math.floor(Date.now() / 1000);
  if (now - parseInt(timestamp) > tolerance) {
    throw new Error('Webhook timestamp too old');
  }
  
  // Compute signature
  const signedPayload = `${timestamp}.${payload}`;
  const expectedSig = crypto
    .createHmac('sha256', secret)
    .update(signedPayload)
    .digest('hex');
  
  // Compare
  if (!crypto.timingSafeEqual(
    Buffer.from(expectedSig),
    Buffer.from(providedSig)
  )) {
    throw new Error('Invalid signature');
  }
  
  return JSON.parse(payload);
}

// Express middleware
app.post('/webhooks/clawdbot', express.raw({type: 'application/json'}), (req, res) => {
  const signature = req.headers['x-clawdbot-signature'];
  
  try {
    const event = verifyWebhook(req.body.toString(), signature, WEBHOOK_SECRET);
    
    switch (event.type) {
      case 'message.completed':
        handleMessageCompleted(event.data.object);
        break;
      case 'agent.status_changed':
        handleStatusChange(event.data.object);
        break;
      // ... handle other events
    }
    
    res.json({ received: true });
  } catch (err) {
    console.error('Webhook error:', err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});
```

### Python Example

```python
import hmac
import hashlib
import time
import json

def verify_webhook(payload: bytes, signature: str, secret: str) -> dict:
    elements = dict(el.split('=') for el in signature.split(','))
    timestamp = elements['t']
    provided_sig = elements['v1']
    
    # Check timestamp
    tolerance = 300  # 5 minutes
    if int(time.time()) - int(timestamp) > tolerance:
        raise ValueError('Webhook timestamp too old')
    
    # Compute signature
    signed_payload = f"{timestamp}.{payload.decode()}"
    expected_sig = hmac.new(
        secret.encode(),
        signed_payload.encode(),
        hashlib.sha256
    ).hexdigest()
    
    # Compare
    if not hmac.compare_digest(expected_sig, provided_sig):
        raise ValueError('Invalid signature')
    
    return json.loads(payload)

# Flask route
@app.route('/webhooks/clawdbot', methods=['POST'])
def handle_webhook():
    signature = request.headers.get('X-Clawdbot-Signature')
    
    try:
        event = verify_webhook(request.data, signature, WEBHOOK_SECRET)
        
        if event['type'] == 'message.completed':
            handle_message_completed(event['data']['object'])
        elif event['type'] == 'agent.status_changed':
            handle_status_change(event['data']['object'])
        
        return jsonify({'received': True})
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
```

---

## List Webhooks

Get all configured webhooks.

```http
GET /v1/webhooks
```

### Response

```json
{
  "success": true,
  "data": {
    "webhooks": [
      {
        "id": "wh_abc123",
        "url": "https://yourapp.com/webhooks/clawdbot",
        "events": ["message.completed", "memory.updated"],
        "enabled": true,
        "created_at": "2026-01-27T10:30:00Z",
        "last_triggered_at": "2026-01-27T12:45:00Z",
        "success_rate": 0.99
      }
    ]
  }
}
```

---

## Update Webhook

Modify webhook configuration.

```http
PUT /v1/webhooks/{webhook_id}
```

### Request

```bash
curl -X PUT https://api.clawdbot.com/v1/webhooks/wh_abc123 \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "events": ["message.completed", "memory.updated", "skill.enabled"],
    "enabled": true
  }'
```

---

## Delete Webhook

Remove a webhook endpoint.

```http
DELETE /v1/webhooks/{webhook_id}
```

### Request

```bash
curl -X DELETE https://api.clawdbot.com/v1/webhooks/wh_abc123 \
  -H "Authorization: Bearer YOUR_API_KEY"
```

---

## Webhook Logs

View recent webhook deliveries.

```http
GET /v1/webhooks/{webhook_id}/logs
```

### Response

```json
{
  "success": true,
  "data": {
    "logs": [
      {
        "id": "log_001",
        "event_type": "message.completed",
        "status": "success",
        "status_code": 200,
        "latency_ms": 150,
        "triggered_at": "2026-01-27T12:45:00Z"
      },
      {
        "id": "log_002",
        "event_type": "memory.updated",
        "status": "failed",
        "status_code": 500,
        "error": "Internal server error",
        "latency_ms": 3000,
        "triggered_at": "2026-01-27T12:30:00Z",
        "retry_count": 3
      }
    ]
  }
}
```

---

## Retry Logic

Failed webhooks are automatically retried with exponential backoff:

| Attempt | Delay |
|---------|-------|
| 1 | Immediate |
| 2 | 1 minute |
| 3 | 5 minutes |
| 4 | 30 minutes |
| 5 | 2 hours |

After 5 failed attempts, the webhook is marked as failed and the endpoint is disabled.

---

## Best Practices

### 1. Respond Quickly

Return a `2xx` status within 30 seconds:

```javascript
app.post('/webhooks', async (req, res) => {
  // Acknowledge immediately
  res.json({ received: true });
  
  // Process asynchronously
  processWebhookAsync(req.body);
});
```

### 2. Handle Duplicates

Events may be delivered multiple times. Use `event.id` for idempotency:

```javascript
const processedEvents = new Set();

function handleEvent(event) {
  if (processedEvents.has(event.id)) {
    return; // Already processed
  }
  processedEvents.add(event.id);
  // Process event...
}
```

### 3. Secure Your Endpoint

- Always use HTTPS
- Verify signatures
- Validate IP ranges (if applicable)
- Use webhook secrets

### 4. Monitor Failures

Set up alerts for webhook failures:

```bash
# Check webhook health
curl -X GET "https://api.clawdbot.com/v1/webhooks/wh_abc123/health" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

---

## Testing Webhooks

### Test Endpoint

Send a test event to your webhook:

```bash
curl -X POST https://api.clawdbot.com/v1/webhooks/wh_abc123/test \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "event_type": "message.completed"
  }'
```

### Response

```json
{
  "success": true,
  "data": {
    "delivered": true,
    "status_code": 200,
    "latency_ms": 145,
    "response_body": "{\"received\":true}"
  }
}
```

### Local Development

Use tools like [ngrok](https://ngrok.com) for local testing:

```bash
ngrok http 3000
# Copy the HTTPS URL and use as webhook endpoint
```
