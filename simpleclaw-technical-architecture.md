# SimpleClaw Technical Architecture Breakdown

## Executive Summary

SimpleClaw achieves **one-click OpenClaw deployment in <1 minute** by using a **pre-provisioned server pool** + **zero-config templating**. Users pick a model (Claude/GPT/Gemini), select Telegram, sign in with Google OAuth, and get assigned a running instance instantly.

**Core Innovation:** Move ALL setup complexity to infrastructure provisioning time, not user signup time.

---

## 1. Deployment Architecture

### The Pre-Provisioned Pool Model

SimpleClaw doesn't provision servers on-demand. They maintain a **warm pool of ready-to-go OpenClaw instances**.

**How it works:**
```
┌─────────────────────────────────────┐
│   POOL: Pre-provisioned Instances   │
│                                     │
│  [OpenClaw 1] [OpenClaw 2] ... [n]  │
│  - Node.js installed                │
│  - OpenClaw installed               │
│  - Dependencies cached              │
│  - Gateway running                  │
│  - Waiting for assignment           │
└─────────────────────────────────────┘
          ↓ User signs up
┌─────────────────────────────────────┐
│   ASSIGNMENT: User → Instance        │
│                                     │
│  1. Google OAuth (identity)         │
│  2. Pick instance from pool         │
│  3. Inject user config              │
│  4. Connect Telegram bot            │
│  5. Start agent                     │
│  Duration: <30 seconds              │
└─────────────────────────────────────┘
```

**Evidence from website:**
> "Servers, SSH and OpenClaw Environment are already setuped waiting to get assigned."

This is the **key architectural decision** that enables instant deployment.

---

## 2. Infrastructure Stack

### Likely Stack (based on industry patterns + clues)

**Compute:**
- **VPS Provider:** Digital Ocean, Hetzner, or Vultr
  - Why: Cost-effective for many small instances
  - ~$5-10/mo per user instance
  - Easy API for programmatic provisioning
  
- **Container Strategy:** Likely Docker containers on VMs
  - Pre-built OpenClaw image
  - Fast spawn time (<10s)
  - Resource isolation per user
  
**Alternative (less likely):**
- **Serverless:** Too slow for "always-on" assistant
- **Kubernetes:** Overkill for early stage, but possible at scale

### Instance Provisioning Flow

**Behind the scenes (automated):**
```bash
# Pre-provisioning script (runs in background, maintains pool)
while true; do
  available_count=$(check_pool_size)
  
  if [ $available_count -lt 10 ]; then
    # Spin up new instance
    vultr create droplet \
      --image openclaw-base-v1.2 \
      --size 2gb-ram \
      --region nyc1
    
    # Wait for ready
    wait_for_ssh $instance_id
    
    # Mark as available
    db.instances.update({
      id: $instance_id,
      status: 'available',
      created_at: now()
    })
  fi
  
  sleep 60
done
```

**The "Limited servers" message:**
> "Limited cloud servers — only 9 left"

This is likely:
1. **Real scarcity** (small pool to control costs)
2. **Marketing tactic** (creates urgency)
3. **Both** (intentionally small pool + scarcity messaging)

---

## 3. User Onboarding Flow

### Step-by-Step Technical Implementation

**Frontend (simpleclaw.com):**
```
User lands on site
  ↓
1. Select model (Claude Opus 4.5 / GPT-5.2 / Gemini 3 Flash)
   - Stored in session state
   
2. Select channel (Telegram only, Discord/WhatsApp "coming soon")
   - Validates Telegram available
   
3. Click "Sign in with Google"
   ↓
   OAuth flow:
   - Redirect to Google OAuth consent screen
   - User approves
   - Callback with user profile + email
   
4. Backend receives OAuth token
   ↓
   Assignment logic:
   - Check pool for available instance
   - If none: queue user or fail gracefully
   - If available: claim instance
   
5. Configure instance
   - Inject user email
   - Set default model (from step 1)
   - Generate Telegram bot token OR
   - Provide QR code for Telegram connection
   
6. Start OpenClaw gateway
   - `clawdbot gateway start`
   - Connect Telegram channel
   - Agent is LIVE
   
7. Redirect user to dashboard
   - Show "Your agent is ready!"
   - Telegram connection instructions
   - Usage stats
```

### Backend API (inferred)

**Likely endpoints:**

```typescript
POST /api/auth/google
  - Exchange OAuth code for user profile
  - Create user account
  - Return session token

POST /api/deploy
  - Claim instance from pool
  - Configure with user settings
  - Return instance details (endpoint, Telegram bot token)

GET /api/status
  - Check agent status
  - Return health + usage stats

POST /api/telegram/connect
  - Generate Telegram bot token
  - Configure webhook
  - Link to user instance
```

---

## 4. Configuration & Customization

### How Users Customize Their Agent

**At Signup:**
- Model selection (Claude/GPT/Gemini)
- Channel (Telegram)

**Post-Signup:**
- Users likely access a dashboard:
  - Add more channels
  - Switch models
  - Configure skills
  - View logs
  
**OpenClaw Config Injection:**

When an instance is assigned, SimpleClaw injects a `config.json`:

```json
{
  "user_id": "google_oauth_12345",
  "email": "user@example.com",
  "model": "anthropic/claude-opus-4.5",
  "channels": {
    "telegram": {
      "bot_token": "ABC123...",
      "webhook_url": "https://api.simpleclaw.com/webhook/user123"
    }
  },
  "workspace": "/home/openclaw/users/user123",
  "memory_enabled": true
}
```

This config is auto-generated and injected at assignment time.

---

## 5. Secrets & API Keys

### How SimpleClaw Handles Sensitive Data

**User API Keys (Anthropic/OpenAI):**

**Option A: Managed Proxy (Most likely)**
- SimpleClaw maintains master API keys
- Routes requests through proxy
- Meters usage per user
- Charges users (subscription model)

```
User Agent → SimpleClaw Proxy → Anthropic/OpenAI
               ↓
          (meters usage)
               ↓
          (bills user)
```

**Option B: User-provided keys**
- Users paste their own API keys
- SimpleClaw stores encrypted
- Decrypts at runtime
- More complex onboarding

**Option A is more likely** because:
1. Simpler onboarding (no API key required)
2. Revenue model (charge for usage)
3. Better UX (no technical knowledge needed)

**Telegram Bot Tokens:**
- Generated by SimpleClaw backend
- Stored in database
- Injected into instance config

**Database:**
```sql
CREATE TABLE instances (
  id UUID PRIMARY KEY,
  user_id VARCHAR(255),
  status ENUM('available', 'assigned', 'stopped'),
  ip_address VARCHAR(45),
  ssh_key TEXT,
  config JSONB,
  created_at TIMESTAMP,
  assigned_at TIMESTAMP
);

CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  google_id VARCHAR(255) UNIQUE,
  telegram_bot_token VARCHAR(255),
  model VARCHAR(100),
  subscription_tier VARCHAR(50),
  created_at TIMESTAMP
);
```

---

## 6. User Journey: Signup → Working Agent

### Timeline Breakdown

**Traditional OpenClaw Setup: ~30 minutes**
```
1. Purchase VPS (10 min)
2. SSH key setup (3 min)
3. SSH connection (3 min)
4. Install Node.js (5 min)
5. Install OpenClaw (2 min)
6. Configure OpenClaw (5 min)
7. Connect Telegram (2 min)
───────────────────────────
Total: 30 minutes
```

**SimpleClaw Flow: <1 minute**
```
1. Pick model (5 sec)
2. Pick channel (5 sec)
3. Google OAuth (10 sec)
4. Backend assigns instance (15 sec)
   - Claim from pool
   - Inject config
   - Start gateway
   - Connect Telegram
5. Redirect to dashboard (5 sec)
───────────────────────────
Total: 40 seconds
```

**The Magic:** All the heavy work (steps 1-6 from traditional) happens **before the user signs up**.

---

## 7. Technical Advantages & Trade-offs

### Why This Model Works

**Advantages:**
1. **Instant gratification** → Higher conversion
2. **No technical knowledge required** → Wider audience
3. **Predictable costs** → Easy to price
4. **Simple to scale** → Add more instances as needed

**Trade-offs:**
1. **Idle cost** → Instances sit unused in pool
2. **Resource overhead** → One instance per user (vs shared)
3. **Limited customization** → Can't access underlying server
4. **Vendor lock-in** → Users depend on SimpleClaw

---

## 8. Scaling Strategy

### How SimpleClaw Scales

**Phase 1: Small pool (current state)**
- 10-20 pre-provisioned instances
- Manual provisioning
- Simple pool management

**Phase 2: Auto-scaling pool**
- Monitor pool size
- Auto-provision when below threshold
- Use IaC (Terraform/Pulumi)

```python
# Pool manager
def maintain_pool():
    target_available = 10
    current_available = db.query("SELECT COUNT(*) FROM instances WHERE status='available'")
    
    if current_available < target_available:
        needed = target_available - current_available
        for _ in range(needed):
            provision_instance()
```

**Phase 3: Multi-region**
- Deploy pools in US, EU, Asia
- Route users to nearest region
- Lower latency

**Phase 4: Multi-tenancy (cost optimization)**
- Run multiple users per VM
- Docker containers for isolation
- Reduce idle cost

---

## 9. Revenue Model (inferred)

**Likely Pricing:**

**Option A: Subscription**
- $10/mo - Basic (Claude Sonnet)
- $20/mo - Pro (Claude Opus)
- $50/mo - Max (unlimited usage)

**Option B: Usage-based**
- Pay per API call
- Metered through proxy

**Most likely: Subscription** (simpler, predictable)

---

## 10. Competitive Moat

### What Makes SimpleClaw Hard to Replicate

1. **OpenClaw expertise** → They understand the codebase deeply
2. **Pre-provisioning infrastructure** → Cost to maintain pool
3. **Telegram integration** → Smooth bot setup
4. **Brand trust** → First mover in "managed OpenClaw"

**Replication cost:**
- ~$50-100/mo for 10-instance pool
- Backend dev time: ~1-2 weeks
- Frontend: ~1 week
- **Total: ~$500 + 3-4 weeks**

**This is very replicable.** The moat is execution speed + brand.

---

## 11. Implementation Roadmap (To Copy This Model)

### Phase 1: MVP (Week 1-2)
1. Fork OpenClaw
2. Create base Docker image
3. Provision 5 test instances (Digital Ocean)
4. Build frontend (React)
   - Model picker
   - Google OAuth
   - Dashboard
5. Build backend (Node.js/Python)
   - `/auth/google`
   - `/deploy`
   - Pool manager

### Phase 2: Polish (Week 3)
1. Telegram bot auto-setup
2. User dashboard
3. Billing integration (Stripe)

### Phase 3: Scale (Week 4+)
1. Auto-scaling pool
2. Multi-region support
3. Advanced customization

---

## 12. Key Technical Insights

### The Breakthrough

**Traditional thinking:** "Provision on-demand to save costs"
**SimpleClaw thinking:** "Pre-provision to save TIME (which converts better)"

**The bet:** Higher conversion from instant deployment > cost of idle instances

**Math:**
```
Conversion improvement: 3% → 10% (3.3x increase)
Idle cost per month: $50 (10 instances @ $5/mo)
Break-even: 5 extra customers @ $10/mo
Result: Worth it if improvement is real
```

---

## 13. Security Considerations

**Potential vulnerabilities:**

1. **Instance isolation**
   - If Docker, properly configured namespaces?
   - User A shouldn't access User B's data

2. **API key storage**
   - Encrypted at rest?
   - Secure key management (Vault/AWS Secrets)?

3. **SSH access**
   - Do users get SSH? (Likely no)
   - If yes, proper key rotation?

4. **Telegram bot tokens**
   - Stored securely?
   - Revocable?

---

## 14. Competitive Analysis

### SimpleClaw vs Alternatives

| Feature | SimpleClaw | Self-hosted OpenClaw | Bolt/Replit AI |
|---------|-----------|---------------------|----------------|
| Setup time | <1 min | 30 min | Instant (web) |
| Technical skill | None | Intermediate | None |
| Cost | ~$10-20/mo | $5/mo (VPS) | $20/mo |
| Customization | Limited | Full | Limited |
| Always-on | Yes | Yes | Session-based |

**SimpleClaw wins on:** Ease of setup + Always-on agent
**Self-hosted wins on:** Cost + Control
**Web AI wins on:** Instant access (but not always-on)

---

## 15. Open Questions

**Things we don't know (would need to test signup):**

1. **Exact infrastructure provider** (DO? Hetzner? Custom?)
2. **Container vs VM** (Docker? LXC? Full VMs?)
3. **API key management** (Proxy? User-provided?)
4. **Pricing model** (Subscription? Usage? Free tier?)
5. **Multi-tenancy** (One user per instance? Shared?)
6. **Auto-scaling logic** (Manual? Automated? Threshold?)

**To learn more:** Sign up, inspect network requests, analyze dashboard

---

## 16. Recommended Implementation

**If copying this model:**

### Minimal Viable Architecture

**Stack:**
- **Compute:** Digital Ocean Droplets ($6/mo)
- **Container:** Docker (OpenClaw image)
- **Frontend:** Next.js (Vercel)
- **Backend:** Node.js + Express (Railway/Fly.io)
- **Database:** PostgreSQL (Supabase)
- **Auth:** Google OAuth (NextAuth.js)
- **Payment:** Stripe

**Pool Manager:**
```typescript
// pool-manager.ts
import { createDroplet } from '@digitalocean/api';
import { db } from './db';

const POOL_TARGET = 10;

export async function maintainPool() {
  const available = await db.instance.count({
    where: { status: 'available' }
  });
  
  if (available < POOL_TARGET) {
    const needed = POOL_TARGET - available;
    console.log(`Provisioning ${needed} instances...`);
    
    for (let i = 0; i < needed; i++) {
      await provisionInstance();
    }
  }
}

async function provisionInstance() {
  // Create droplet
  const droplet = await createDroplet({
    name: `openclaw-${Date.now()}`,
    region: 'nyc1',
    size: 's-1vcpu-2gb',
    image: 'docker-20-04', // or custom OpenClaw snapshot
    ssh_keys: [process.env.SSH_KEY_ID],
  });
  
  // Wait for ready
  await waitForSSH(droplet.networks.v4[0].ip_address);
  
  // Install OpenClaw
  await ssh(droplet.ip, 'bash setup-openclaw.sh');
  
  // Mark available
  await db.instance.create({
    data: {
      id: droplet.id,
      ip: droplet.ip,
      status: 'available',
      region: 'nyc1',
    }
  });
}
```

**Deployment Endpoint:**
```typescript
// api/deploy.ts
export async function POST(req: Request) {
  const { userId, model, channel } = await req.json();
  
  // Claim instance
  const instance = await db.instance.findFirst({
    where: { status: 'available' }
  });
  
  if (!instance) {
    return Response.json({ error: 'No instances available' }, { status: 503 });
  }
  
  // Update status
  await db.instance.update({
    where: { id: instance.id },
    data: {
      status: 'assigned',
      userId,
      assignedAt: new Date(),
    }
  });
  
  // Generate Telegram bot token
  const botToken = await createTelegramBot(userId);
  
  // Inject config
  await ssh(instance.ip, `
    cat > /home/openclaw/config.json <<EOF
    {
      "user_id": "${userId}",
      "model": "${model}",
      "telegram_token": "${botToken}"
    }
    EOF
    
    # Start gateway
    clawdbot gateway start
  `);
  
  return Response.json({
    success: true,
    instanceId: instance.id,
    telegramBotToken: botToken,
  });
}
```

---

## Final Verdict

**SimpleClaw's architecture is elegantly simple:**

1. **Pre-provision** a pool of OpenClaw instances
2. **Assign** instances to users on signup
3. **Configure** via automated SSH + config injection
4. **Bill** via subscription or usage proxy

**The innovation isn't technical complexity—it's eliminating wait time.**

**Copying this is straightforward:**
- ~$50-100/mo infrastructure cost (10 instances)
- ~3-4 weeks dev time
- Core value: UX speed, not technical novelty

**Recommendation:** If building a similar product, this is the correct architecture for early-stage. Optimize for conversion speed, not cost efficiency.

---

**Document Version:** 1.0  
**Date:** 2026-02-04  
**Author:** Research Agent  
**Status:** Complete
