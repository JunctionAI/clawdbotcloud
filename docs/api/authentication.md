# Authentication

The Clawdbot API supports multiple authentication methods to accommodate different integration patterns.

---

## Overview

| Method | Use Case | Format |
|--------|----------|--------|
| **API Key** | Server-to-server | `Authorization: Bearer <api_key>` or `X-API-Key: <api_key>` |
| **JWT Token** | User sessions, Dashboard | `Authorization: Bearer <jwt>` |
| **OAuth2** | Third-party integrations | Standard OAuth2 bearer token |

---

## API Keys

API keys are the simplest way to authenticate server-to-server requests.

### Creating an API Key

1. Log in to your [Clawdbot Dashboard](https://dashboard.clawdbot.com)
2. Navigate to **Settings → API Keys**
3. Click **Create New Key**
4. Select permissions (read, write, admin)
5. Copy the key immediately (shown only once)

### Using API Keys

```bash
# Option 1: Authorization header (recommended)
curl -X POST https://api.clawdbot.com/v1/chat/messages \
  -H "Authorization: Bearer cb_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{"agent_id": "agent_abc", "message": "Hello"}'

# Option 2: X-API-Key header
curl -X POST https://api.clawdbot.com/v1/chat/messages \
  -H "X-API-Key: cb_live_abc123..." \
  -H "Content-Type: application/json" \
  -d '{"agent_id": "agent_abc", "message": "Hello"}'
```

### API Key Types

| Prefix | Environment | Use |
|--------|-------------|-----|
| `cb_live_` | Production | Real data, charged usage |
| `cb_test_` | Sandbox | Testing, no charges |

### Key Permissions

When creating keys, you can restrict permissions:

- **Read:** View agents, memory, skills
- **Write:** Send messages, update memory, configure skills
- **Admin:** Full access including provisioning, billing

### Security Best Practices

1. **Never expose keys client-side** - Use server-side calls only
2. **Rotate keys regularly** - Generate new keys every 90 days
3. **Use environment variables** - Don't hardcode keys
4. **Restrict permissions** - Give keys only the access they need
5. **Monitor usage** - Set up alerts for unusual activity

```javascript
// ❌ BAD: Key in client-side code
const client = new Clawdbot({ apiKey: 'cb_live_abc123' }); // Exposed!

// ✅ GOOD: Key in environment variable
const client = new Clawdbot({ apiKey: process.env.CLAWDBOT_API_KEY });
```

---

## JWT Authentication

JWT (JSON Web Tokens) are used for user sessions, typically with the Dashboard or custom frontends.

### Obtaining a JWT

```bash
POST /v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "your_password"
}
```

**Response:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "Bearer",
  "expires_in": 86400
}
```

### Using JWTs

```bash
curl -X GET https://api.clawdbot.com/v1/agents \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."
```

### JWT Structure

```json
{
  "sub": "user_abc123",
  "email": "user@example.com",
  "role": "admin",
  "tier": "professional",
  "iat": 1706349600,
  "exp": 1706436000
}
```

### Refreshing Tokens

Access tokens expire after 24 hours. Use the refresh token to get a new one:

```bash
POST /v1/auth/refresh
Content-Type: application/json

{
  "refresh_token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "expires_in": 86400
}
```

---

## OAuth2 Integration

For third-party integrations, we support OAuth2 authorization code flow.

### OAuth2 Endpoints

| Endpoint | URL |
|----------|-----|
| Authorization | `https://auth.clawdbot.com/oauth/authorize` |
| Token | `https://auth.clawdbot.com/oauth/token` |
| Revoke | `https://auth.clawdbot.com/oauth/revoke` |

### Authorization Flow

**Step 1: Redirect to Authorization**

```
https://auth.clawdbot.com/oauth/authorize
  ?client_id=YOUR_CLIENT_ID
  &redirect_uri=https://yourapp.com/callback
  &response_type=code
  &scope=read write
  &state=random_state_string
```

**Step 2: Exchange Code for Token**

```bash
POST https://auth.clawdbot.com/oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code
&code=AUTH_CODE_FROM_CALLBACK
&redirect_uri=https://yourapp.com/callback
&client_id=YOUR_CLIENT_ID
&client_secret=YOUR_CLIENT_SECRET
```

**Step 3: Use Access Token**

```bash
curl -X GET https://api.clawdbot.com/v1/agents \
  -H "Authorization: Bearer OAUTH_ACCESS_TOKEN"
```

### Available Scopes

| Scope | Description |
|-------|-------------|
| `read` | Read agents, memory, skills |
| `write` | Send messages, update data |
| `admin` | Full access |
| `chat` | Chat operations only |
| `memory` | Memory operations only |
| `skills` | Skills management only |

---

## Webhook Signature Verification

When receiving webhooks, verify the signature to ensure authenticity.

### Signature Header

All webhooks include a `X-Clawdbot-Signature` header:

```
X-Clawdbot-Signature: sha256=abc123...
```

### Verification (Node.js)

```javascript
const crypto = require('crypto');

function verifyWebhookSignature(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  const providedSignature = signature.replace('sha256=', '');
  
  return crypto.timingSafeEqual(
    Buffer.from(expectedSignature),
    Buffer.from(providedSignature)
  );
}

// Usage
app.post('/webhook', (req, res) => {
  const signature = req.headers['x-clawdbot-signature'];
  const isValid = verifyWebhookSignature(
    req.rawBody,
    signature,
    process.env.WEBHOOK_SECRET
  );
  
  if (!isValid) {
    return res.status(401).send('Invalid signature');
  }
  
  // Process webhook...
});
```

### Verification (Python)

```python
import hmac
import hashlib

def verify_webhook_signature(payload: bytes, signature: str, secret: str) -> bool:
    expected = hmac.new(
        secret.encode(),
        payload,
        hashlib.sha256
    ).hexdigest()
    
    provided = signature.replace('sha256=', '')
    
    return hmac.compare_digest(expected, provided)
```

---

## Error Responses

### 401 Unauthorized

```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or missing authentication"
  }
}
```

**Common causes:**
- Missing `Authorization` header
- Expired token
- Invalid API key

### 403 Forbidden

```json
{
  "success": false,
  "error": {
    "code": "FORBIDDEN",
    "message": "Insufficient permissions for this action"
  }
}
```

**Common causes:**
- API key lacks required permission
- Trying to access another account's resources
- Admin-only endpoint with non-admin key

---

## IP Allowlisting

For enhanced security, you can restrict API access to specific IPs:

1. Go to **Dashboard → Settings → Security**
2. Enable **IP Allowlisting**
3. Add your server IP addresses
4. Save changes

Requests from non-allowlisted IPs will receive a `403 Forbidden` response.

---

## Rate Limiting Headers

All authenticated requests include rate limit information:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1706350000
```

See [Rate Limits](./rate-limits.md) for tier-specific limits.
