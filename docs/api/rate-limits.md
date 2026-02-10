# Rate Limits & Quotas

Understand request limits and usage quotas for each API endpoint and subscription tier.

---

## Overview

Rate limits protect the API from abuse and ensure fair usage for all customers. Limits are applied at multiple levels:

- **Per-endpoint** - Different limits for different actions
- **Per-tier** - Higher limits for higher subscription tiers
- **Per-IP** - Additional protection against abuse

---

## Rate Limit Headers

All API responses include rate limit information:

```http
HTTP/1.1 200 OK
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1706350000
```

| Header | Description |
|--------|-------------|
| `X-RateLimit-Limit` | Max requests per window |
| `X-RateLimit-Remaining` | Requests remaining in current window |
| `X-RateLimit-Reset` | Unix timestamp when window resets |

---

## Limits by Tier

### Starter ($199/mo)

| Endpoint | Limit | Window |
|----------|-------|--------|
| **Chat API** | 100 | per hour |
| Message send | 60 | per hour |
| Message stream | 40 | per hour |
| History retrieval | 200 | per hour |
| **Memory API** | 200 | per hour |
| Get/search memory | 150 | per hour |
| Write operations | 50 | per hour |
| **Skills API** | 100 | per hour |
| Config updates | 20 | per hour |
| **General API** | 300 | per 15 min |

**Monthly Quotas:**
- Messages: 10,000
- Tokens: 1,000,000
- Memory storage: 50 KB
- Skills: 6 (base skills)

---

### Professional ($499/mo)

| Endpoint | Limit | Window |
|----------|-------|--------|
| **Chat API** | 500 | per hour |
| Message send | 300 | per hour |
| Message stream | 200 | per hour |
| History retrieval | 500 | per hour |
| **Memory API** | 500 | per hour |
| Get/search memory | 400 | per hour |
| Write operations | 100 | per hour |
| **Skills API** | 300 | per hour |
| Config updates | 50 | per hour |
| **General API** | 1,000 | per 15 min |

**Monthly Quotas:**
- Messages: 50,000
- Tokens: 5,000,000
- Memory storage: 100 KB
- Skills: 10 (base + professional)
- Sub-agents: 5 (Mission Control)

---

### Enterprise ($999/mo)

| Endpoint | Limit | Window |
|----------|-------|--------|
| **Chat API** | 2,000 | per hour |
| Message send | 1,200 | per hour |
| Message stream | 800 | per hour |
| History retrieval | 2,000 | per hour |
| **Memory API** | 2,000 | per hour |
| Get/search memory | 1,500 | per hour |
| Write operations | 500 | per hour |
| **Skills API** | 1,000 | per hour |
| Config updates | 200 | per hour |
| **General API** | 5,000 | per 15 min |

**Monthly Quotas:**
- Messages: Unlimited (fair use)
- Tokens: 20,000,000
- Memory storage: Unlimited
- Skills: Unlimited
- Sub-agents: 10 (Mission Control XL)
- Custom skills: Unlimited

---

## Endpoint-Specific Limits

### Authentication

| Endpoint | Limit | Window | Notes |
|----------|-------|--------|-------|
| `/auth/login` | 5 | per 15 min | Per IP, stricter for security |
| `/auth/refresh` | 20 | per hour | Per user |
| `/auth/password-reset` | 3 | per hour | Per IP |

### Chat API

| Endpoint | Starter | Pro | Enterprise | Window |
|----------|---------|-----|------------|--------|
| `POST /chat/messages` | 60 | 300 | 1,200 | per hour |
| `POST /chat/stream` | 40 | 200 | 800 | per hour |
| `GET /chat/history` | 200 | 500 | 2,000 | per hour |
| `DELETE /chat/messages/:id` | 30 | 100 | 500 | per hour |

### Memory API

| Endpoint | Starter | Pro | Enterprise | Window |
|----------|---------|-----|------------|--------|
| `GET /memory` | 100 | 300 | 1,000 | per hour |
| `POST /memory/facts` | 30 | 75 | 300 | per hour |
| `POST /memory/search` | 50 | 150 | 500 | per hour |
| `PUT /memory/entities/:id` | 20 | 50 | 200 | per hour |

### Skills API

| Endpoint | Starter | Pro | Enterprise | Window |
|----------|---------|-----|------------|--------|
| `GET /skills` | 100 | 300 | 1,000 | per hour |
| `POST /skills/:id/enable` | 10 | 30 | 100 | per hour |
| `PUT /skills/:id/config` | 20 | 50 | 200 | per hour |

### Provisioning API

| Endpoint | Limit | Window | Notes |
|----------|-------|--------|-------|
| `POST /provision` | 3 | per hour | Per API key |
| `GET /provision/status/:id` | 60 | per hour | |
| `GET /provision/list` | 30 | per hour | |

### Webhooks

| Endpoint | Limit | Window | Notes |
|----------|-------|--------|-------|
| `POST /webhooks/stripe` | 1,000 | per hour | Stripe events |
| Custom webhook delivery | 100 | per minute | Per endpoint |

---

## Token Limits

In addition to request rate limits, token usage is tracked:

### Monthly Token Quotas

| Tier | Input Tokens | Output Tokens | Total |
|------|-------------|---------------|-------|
| Starter | 500,000 | 500,000 | 1,000,000 |
| Professional | 2,500,000 | 2,500,000 | 5,000,000 |
| Enterprise | 10,000,000 | 10,000,000 | 20,000,000 |

### Token Overage

When you exceed your token quota:
- **Starter/Professional:** Messages are blocked until quota resets
- **Enterprise:** Overage is billed at $0.01 per 1,000 tokens

Check token usage:

```bash
curl -X GET "https://api.clawdbot.com/v1/usage/tokens?period=month" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Response:**

```json
{
  "success": true,
  "data": {
    "period": "2026-01",
    "input_tokens": 450000,
    "output_tokens": 380000,
    "total_tokens": 830000,
    "quota": 1000000,
    "remaining": 170000,
    "percentage_used": 83
  }
}
```

---

## Handling Rate Limits

### 429 Response

When rate limited, you'll receive:

```http
HTTP/1.1 429 Too Many Requests
Retry-After: 60
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1706350000
Content-Type: application/json

{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Rate limit exceeded. Please try again in 60 seconds.",
    "details": {
      "limit": 100,
      "remaining": 0,
      "reset_at": "2026-01-27T10:30:00Z",
      "retry_after": 60
    }
  }
}
```

### Retry Strategy

Implement exponential backoff:

```javascript
async function apiCallWithRetry(fn, maxRetries = 3) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (error.status === 429 && attempt < maxRetries - 1) {
        const retryAfter = error.headers.get('Retry-After') || 60;
        const delay = Math.min(retryAfter * 1000 * Math.pow(2, attempt), 300000);
        console.log(`Rate limited. Retrying in ${delay/1000}s...`);
        await sleep(delay);
      } else {
        throw error;
      }
    }
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
```

### Python Example

```python
import time
import httpx

def api_call_with_retry(client, method, url, max_retries=3, **kwargs):
    for attempt in range(max_retries):
        response = client.request(method, url, **kwargs)
        
        if response.status_code == 429:
            if attempt < max_retries - 1:
                retry_after = int(response.headers.get('Retry-After', 60))
                delay = min(retry_after * (2 ** attempt), 300)
                print(f"Rate limited. Retrying in {delay}s...")
                time.sleep(delay)
                continue
        
        response.raise_for_status()
        return response.json()
    
    raise Exception("Max retries exceeded")
```

---

## Best Practices

### 1. Cache Responses

Reduce API calls by caching where appropriate:

```javascript
const cache = new Map();
const CACHE_TTL = 60000; // 1 minute

async function getMemory(userId) {
  const cacheKey = `memory:${userId}`;
  const cached = cache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  
  const data = await api.getMemory(userId);
  cache.set(cacheKey, { data, timestamp: Date.now() });
  return data;
}
```

### 2. Batch Operations

Combine multiple operations when possible:

```javascript
// ❌ Bad: Multiple requests
for (const fact of facts) {
  await api.addFact(fact);
}

// ✅ Good: Single batch request
await api.addFacts(facts); // If batch endpoint available
```

### 3. Use Webhooks

Instead of polling, use webhooks for real-time updates:

```javascript
// ❌ Bad: Polling
setInterval(async () => {
  const status = await api.getAgentStatus(agentId);
}, 5000);

// ✅ Good: Webhook
// Register webhook for agent.status_changed
// Handle updates as they arrive
```

### 4. Monitor Usage

Track your usage to avoid surprises:

```bash
# Get current usage
curl -X GET "https://api.clawdbot.com/v1/usage" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Response:**

```json
{
  "success": true,
  "data": {
    "period": "2026-01-27",
    "requests": {
      "total": 4521,
      "by_endpoint": {
        "chat/messages": 2100,
        "memory": 1500,
        "skills": 421,
        "other": 500
      }
    },
    "tokens": {
      "input": 450000,
      "output": 380000,
      "total": 830000
    },
    "rate_limits": {
      "remaining": {
        "chat": 40,
        "memory": 150,
        "general": 500
      },
      "reset_at": "2026-01-27T11:00:00Z"
    }
  }
}
```

---

## Speed Limiting

In addition to hard rate limits, the API implements progressive slowdowns:

| Requests in 15 min | Additional Delay |
|--------------------|------------------|
| 0-50 | No delay |
| 51-75 | 100ms |
| 76-90 | 500ms |
| 91-99 | 2s |
| 100+ | Blocked (429) |

This prevents sudden rate limit hits while still allowing burst traffic.

---

## IP-Based Limits

Additional limits apply per IP address to prevent abuse:

| Limit Type | Limit | Window |
|------------|-------|--------|
| Anonymous requests | 10 | per minute |
| Failed auth attempts | 5 | per 15 min |
| All requests | 1,000 | per hour |

### IP Allowlisting

Enterprise customers can allowlist IPs to bypass IP-based limits:

```bash
curl -X POST https://api.clawdbot.com/v1/security/ip-allowlist \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "ip": "203.0.113.50",
    "description": "Production server"
  }'
```

---

## Requesting Higher Limits

If you need higher limits:

1. **Upgrade tier** - Higher tiers have higher limits
2. **Contact sales** - Enterprise customers can request custom limits
3. **Optimize usage** - Implement caching and batching

```bash
# Contact support about limits
curl -X POST https://api.clawdbot.com/v1/support/limit-request \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "current_tier": "professional",
    "requested_limit": "chat_messages",
    "desired_value": 1000,
    "reason": "High-volume customer support integration"
  }'
```

---

## Fair Use Policy

All tiers are subject to fair use:

- No automated scraping
- No synthetic load testing (use sandbox)
- No abuse of trial/free tier
- Reasonable burst patterns only

Violations may result in temporary or permanent API access restrictions.
