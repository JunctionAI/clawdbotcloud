# SimpleClaw Implementation Checklist

## Quick Reference: How to Build SimpleClaw Clone

### Prerequisites
- [ ] DigitalOcean/Hetzner account
- [ ] Google OAuth app credentials
- [ ] Telegram Bot API token
- [ ] Stripe account (for billing)
- [ ] Domain name

---

## Phase 1: Infrastructure (Week 1)

### 1.1 Base OpenClaw Docker Image
```bash
# Create Dockerfile
FROM node:22-alpine

# Install OpenClaw
RUN npm install -g openclaw@latest

# Pre-install dependencies
RUN openclaw onboard --skip-interactive

# Setup entrypoint
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
```

- [ ] Build base image
- [ ] Test OpenClaw runs correctly
- [ ] Push to Docker Hub

### 1.2 Instance Provisioning Script
```bash
#!/bin/bash
# provision-instance.sh

# Create droplet
doctl compute droplet create \
  openclaw-$(date +%s) \
  --image docker-20-04 \
  --size s-1vcpu-2gb \
  --region nyc1 \
  --ssh-keys $SSH_KEY_ID \
  --wait

# Get IP
IP=$(doctl compute droplet list --format Name,PublicIPv4 --no-header | tail -1 | awk '{print $2}')

# SSH and setup
ssh root@$IP << 'EOF'
  # Pull and run OpenClaw container
  docker run -d --name openclaw \
    --restart unless-stopped \
    -v /data:/root/clawd \
    ghcr.io/your-org/openclaw:latest
EOF

echo "Instance ready: $IP"
```

- [ ] Test provisioning script
- [ ] Verify OpenClaw starts
- [ ] Document setup steps

### 1.3 Pool Manager Service
```typescript
// pool-manager.ts
import cron from 'node-cron';
import { db } from './db';
import { provisionInstance } from './provision';

const POOL_SIZE = 10;

cron.schedule('*/5 * * * *', async () => {
  const available = await db.instance.count({
    where: { status: 'available' }
  });
  
  if (available < POOL_SIZE) {
    const needed = POOL_SIZE - available;
    console.log(`Provisioning ${needed} instances`);
    
    for (let i = 0; i < needed; i++) {
      await provisionInstance();
    }
  }
});
```

- [ ] Setup cron job
- [ ] Monitor pool size
- [ ] Test auto-provisioning

---

## Phase 2: Backend API (Week 1-2)

### 2.1 Database Schema
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  google_id VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE instances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address VARCHAR(45) NOT NULL,
  status VARCHAR(20) CHECK (status IN ('available', 'assigned', 'stopped')),
  user_id UUID REFERENCES users(id),
  telegram_bot_token VARCHAR(255),
  assigned_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_instances_status ON instances(status);
```

- [ ] Setup PostgreSQL
- [ ] Run migrations
- [ ] Create test data

### 2.2 Core API Endpoints
```typescript
// routes/auth.ts
app.post('/api/auth/google', async (req, res) => {
  const { code } = req.body;
  
  // Exchange code for tokens
  const tokens = await oauth2Client.getToken(code);
  const ticket = await oauth2Client.verifyIdToken({
    idToken: tokens.id_token,
    audience: CLIENT_ID,
  });
  
  const payload = ticket.getPayload();
  
  // Create or get user
  const user = await db.user.upsert({
    where: { google_id: payload.sub },
    create: {
      email: payload.email,
      google_id: payload.sub,
    },
    update: {},
  });
  
  // Create session
  const session = await createSession(user.id);
  
  res.json({ sessionToken: session.token });
});

// routes/deploy.ts
app.post('/api/deploy', requireAuth, async (req, res) => {
  const { model, channel } = req.body;
  const userId = req.user.id;
  
  // Claim instance
  const instance = await db.$transaction(async (tx) => {
    const available = await tx.instance.findFirst({
      where: { status: 'available' }
    });
    
    if (!available) throw new Error('No instances available');
    
    return tx.instance.update({
      where: { id: available.id },
      data: {
        status: 'assigned',
        user_id: userId,
        assigned_at: new Date(),
      }
    });
  });
  
  // Configure instance
  const botToken = await createTelegramBot();
  await configureInstance(instance.ip_address, {
    userId,
    model,
    telegram_token: botToken,
  });
  
  res.json({
    instanceId: instance.id,
    telegramBotToken: botToken,
  });
});
```

- [ ] Implement auth endpoints
- [ ] Implement deploy endpoint
- [ ] Test with Postman

### 2.3 Instance Configuration
```typescript
// lib/configure-instance.ts
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function configureInstance(
  ip: string,
  config: { userId: string; model: string; telegram_token: string }
) {
  const sshCmd = `ssh root@${ip}`;
  
  // Write config
  await execAsync(`${sshCmd} "cat > /data/config.json << 'EOF'
{
  "user_id": "${config.userId}",
  "model": "${config.model}",
  "telegram_token": "${config.telegram_token}"
}
EOF"`);
  
  // Restart OpenClaw gateway
  await execAsync(`${sshCmd} "docker exec openclaw clawdbot gateway restart"`);
  
  // Wait for healthy
  await waitForHealthy(ip);
}
```

- [ ] Test SSH commands
- [ ] Verify config injection
- [ ] Test gateway restart

---

## Phase 3: Frontend (Week 2)

### 3.1 Landing Page
```tsx
// app/page.tsx
'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function Home() {
  const [model, setModel] = useState('claude-opus-4.5');
  const [channel, setChannel] = useState('telegram');
  
  const handleDeploy = async () => {
    // Sign in with Google
    await signIn('google', {
      callbackUrl: '/deploy',
    });
  };
  
  return (
    <div>
      <h1>Deploy OpenClaw under 1 minute</h1>
      
      <div>
        <h2>Choose Model</h2>
        <button onClick={() => setModel('claude-opus-4.5')}>
          Claude Opus 4.5
        </button>
        <button onClick={() => setModel('gpt-5.2')}>
          GPT-5.2
        </button>
      </div>
      
      <div>
        <h2>Choose Channel</h2>
        <button onClick={() => setChannel('telegram')}>
          Telegram
        </button>
      </div>
      
      <button onClick={handleDeploy}>
        Sign in with Google
      </button>
    </div>
  );
}
```

- [ ] Build landing page
- [ ] Add model selection
- [ ] Add channel selection
- [ ] Style with Tailwind

### 3.2 Deployment Flow
```tsx
// app/deploy/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function Deploy() {
  const { data: session } = useSession();
  const [status, setStatus] = useState('deploying');
  const [botToken, setBotToken] = useState('');
  
  useEffect(() => {
    if (!session) return;
    
    // Trigger deployment
    fetch('/api/deploy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: sessionStorage.getItem('model'),
        channel: 'telegram',
      }),
    })
      .then(res => res.json())
      .then(data => {
        setStatus('ready');
        setBotToken(data.telegramBotToken);
      });
  }, [session]);
  
  if (status === 'deploying') {
    return <div>Deploying your OpenClaw instance...</div>;
  }
  
  return (
    <div>
      <h1>Your agent is ready!</h1>
      <p>Telegram Bot: @YourBot</p>
      <p>Token: {botToken}</p>
      <a href={`https://t.me/YourBot`}>Start chatting</a>
    </div>
  );
}
```

- [ ] Build deployment page
- [ ] Show loading state
- [ ] Display bot token
- [ ] Add Telegram link

### 3.3 Dashboard
```tsx
// app/dashboard/page.tsx
export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <h2>Your Instance</h2>
        <p>Status: Running</p>
        <p>Model: Claude Opus 4.5</p>
        <p>Messages today: 42</p>
      </div>
      
      <div>
        <h2>Settings</h2>
        <button>Change Model</button>
        <button>Add Channel</button>
        <button>View Logs</button>
      </div>
    </div>
  );
}
```

- [ ] Build dashboard
- [ ] Show instance stats
- [ ] Add settings panel

---

## Phase 4: Integrations (Week 3)

### 4.1 Telegram Bot Creation
```typescript
// lib/telegram.ts
import axios from 'axios';

const TELEGRAM_API = 'https://api.telegram.org';

export async function createTelegramBot() {
  // Use BotFather API (requires master bot)
  // Or: pre-generate tokens and assign
  
  const response = await axios.post(`${TELEGRAM_API}/bot${MASTER_BOT_TOKEN}/createBot`, {
    name: `OpenClaw-${Date.now()}`,
    username: `openclaw_${generateRandomString()}_bot`,
  });
  
  return response.data.result.token;
}

export async function setWebhook(botToken: string, url: string) {
  await axios.post(`${TELEGRAM_API}/bot${botToken}/setWebhook`, {
    url,
  });
}
```

- [ ] Research Telegram bot creation API
- [ ] Implement bot provisioning
- [ ] Test webhook setup

### 4.2 Billing Integration
```typescript
// lib/stripe.ts
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function createSubscription(userId: string, planId: string) {
  const customer = await stripe.customers.create({
    metadata: { userId },
  });
  
  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [{ price: planId }],
  });
  
  return subscription;
}
```

- [ ] Setup Stripe account
- [ ] Create pricing plans
- [ ] Implement subscription flow
- [ ] Add billing portal

---

## Phase 5: Monitoring & Operations (Week 4)

### 5.1 Health Checks
```typescript
// lib/health.ts
export async function checkInstanceHealth(ip: string): Promise<boolean> {
  try {
    const response = await fetch(`http://${ip}:18790/health`, {
      timeout: 5000,
    });
    return response.ok;
  } catch (error) {
    return false;
  }
}

// Cron job
cron.schedule('*/5 * * * *', async () => {
  const instances = await db.instance.findMany({
    where: { status: 'assigned' }
  });
  
  for (const instance of instances) {
    const healthy = await checkInstanceHealth(instance.ip_address);
    
    if (!healthy) {
      // Alert + attempt restart
      await restartInstance(instance.id);
      await sendAlert(`Instance ${instance.id} is unhealthy`);
    }
  }
});
```

- [ ] Implement health checks
- [ ] Setup monitoring dashboard
- [ ] Configure alerts

### 5.2 Logging
```typescript
// lib/logging.ts
import winston from 'winston';

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});
```

- [ ] Setup centralized logging
- [ ] Add log aggregation (Datadog/LogRocket)
- [ ] Create error tracking (Sentry)

---

## Launch Checklist

### Pre-launch
- [ ] Test full signup flow
- [ ] Verify billing works
- [ ] Check instance isolation
- [ ] Review security (secrets, SSH)
- [ ] Load test (10 concurrent signups)
- [ ] Setup domain + SSL
- [ ] Create support email
- [ ] Write documentation

### Launch Day
- [ ] Deploy frontend
- [ ] Start pool manager
- [ ] Provision initial pool (10 instances)
- [ ] Monitor signup flow
- [ ] Be ready for support requests

### Post-launch
- [ ] Monitor costs
- [ ] Track conversion rate
- [ ] Gather user feedback
- [ ] Fix bugs
- [ ] Plan v2 features

---

## Cost Estimates

### Infrastructure (Monthly)
- 10 instances @ $6/mo = $60
- Database (Supabase) = $25
- Frontend (Vercel) = $20
- Backend (Railway) = $20
- Domain + SSL = $10
- **Total: ~$135/mo**

### Break-even
- If charging $15/mo per user
- Break-even: 9 users
- At 50 users: $750/mo revenue - $135/mo cost = **$615/mo profit**

---

## Success Metrics

### Week 1-2
- [ ] 5 test signups
- [ ] <1 minute deployment time
- [ ] 0 critical bugs

### Month 1
- [ ] 50 paying users
- [ ] 95% uptime
- [ ] <5% churn

### Month 3
- [ ] 200 paying users
- [ ] Auto-scaling working
- [ ] Profitability

---

## Next Steps

1. **Today:** Setup DigitalOcean account + SSH keys
2. **Tomorrow:** Build Docker image + test provisioning
3. **Day 3-5:** Build backend API
4. **Day 6-8:** Build frontend
5. **Day 9-10:** Integration testing
6. **Day 11-12:** Polish + documentation
7. **Day 13-14:** Launch!

---

**Total Time: 2-3 weeks**  
**Total Cost: ~$135/mo infrastructure**  
**Break-even: 9 users @ $15/mo**

Good luck! 🚀
