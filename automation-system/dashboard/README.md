# Clawdbot User Dashboard

**Tech Stack:** Next.js 14 + Tailwind CSS + NextAuth.js

---

## Features

### 1. Authentication
- Magic link login (email)
- JWT session management
- Role-based access (customer, admin)

### 2. Agent Status
- Real-time health monitoring
- Usage analytics (messages, tasks, time saved)
- Skill usage breakdown
- Uptime status

### 3. Configuration
- Channel management (WhatsApp, Telegram, Slack)
- Tier display with upgrade path
- Custom skills (Pro/Enterprise)
- Heartbeat schedule (Pro/Enterprise)

### 4. Billing
- Current subscription info
- Usage-based metrics
- Stripe Customer Portal integration
- Upgrade/downgrade options

### 5. Support
- Ticket creation
- Knowledge base access
- Community forum link
- Tier-specific support channels

---

## Pages

### `/login`
- Magic link authentication
- Email input → send link → verify → redirect to dashboard

### `/dashboard`
- Agent status overview
- Quick stats (time saved, tasks completed)
- Recent activity feed
- Quick actions (restart agent, view logs)

### `/dashboard/analytics`
- Detailed usage charts
- Time saved calculator
- Skills usage breakdown
- Week-over-week comparison

### `/dashboard/settings`
- Channel configuration
- Notification preferences
- API keys (for custom integrations)
- Danger zone (pause/delete agent)

### `/dashboard/billing`
- Current plan details
- Stripe Customer Portal iframe
- Upgrade CTA (if applicable)
- Invoice history

### `/dashboard/support`
- Create support ticket
- View ticket history
- Knowledge base search
- Community forum link

---

## Setup Instructions

### 1. Initialize Next.js Project

\`\`\`bash
cd automation-system/dashboard
npx create-next-app@latest . --typescript --tailwind --app
npm install next-auth@beta stripe resend axios swr
\`\`\`

### 2. Configure Environment Variables

\`\`\`env
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<generate_with_openssl_rand_base64_32>

# Database
DATABASE_URL=postgresql://...

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...

# Resend (for magic links)
RESEND_API_KEY=re_...

# API
API_URL=https://api.setupclaw.com
API_KEY=<internal_api_key>
\`\`\`

### 3. Setup Database Schema (Prisma)

\`\`\`prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  customerId    String    @unique
  emailVerified DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  sessions      Session[]
  agents        Agent[]
}

model Agent {
  id            String   @id @default(cuid())
  userId        String
  user          User     @relation(fields: [userId], references: [id])
  tier          String
  status        String
  deploymentUrl String?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id])
}
\`\`\`

### 4. Create API Routes

- `/api/auth/[...nextauth].ts` - NextAuth configuration
- `/api/agent/status.ts` - Get agent status
- `/api/agent/restart.ts` - Restart agent
- `/api/analytics/usage.ts` - Get usage data
- `/api/support/ticket.ts` - Create support ticket

### 5. Build UI Components

- `<AgentStatusCard />` - Real-time status indicator
- `<UsageChart />` - Time saved visualization
- `<SkillsTable />` - Skills usage breakdown
- `<SupportForm />` - Ticket creation form

---

## Deployment

### Vercel (Recommended)

\`\`\`bash
vercel login
vercel --prod
\`\`\`

Environment variables configured via Vercel dashboard.

---

## Security

- **Authentication:** NextAuth magic links (no passwords)
- **Authorization:** JWT tokens with customer ID
- **API Access:** All API calls include customer ID in JWT
- **CORS:** Restrict to dashboard domain only
- **Rate Limiting:** Prevent abuse of API endpoints

---

**Status:** Scaffold ready, implementation needed  
**Estimated Time:** 1 week full-time
