# 03 - Environment Variables Configuration

Complete guide to managing environment variables for Style Swap across all environments.

## Environment Strategy

- **Development**: Local `.env.local` file
- **Preview**: Vercel preview deployments (PR/branch)
- **Production**: Vercel production environment

## Environment Variables Structure

### Public vs Private Variables

**Public Variables** (exposed to browser):
- Prefix with `NEXT_PUBLIC_`
- Example: `NEXT_PUBLIC_API_URL`
- ⚠️ Never put secrets here

**Private Variables** (server-only):
- No prefix needed
- Example: `DATABASE_URL`, `API_SECRET_KEY`
- Only accessible in API routes and server-side code

## Required Environment Variables

Create `.env.example` in your project root:

```env
# ======================
# SITE CONFIGURATION
# ======================
NEXT_PUBLIC_SITE_URL=https://styleswap.com
NEXT_PUBLIC_SITE_NAME=Style Swap
NEXT_PUBLIC_API_URL=https://styleswap.com/api

# ======================
# DATABASE
# ======================
DATABASE_URL=postgresql://user:password@host:5432/dbname
DATABASE_POOL_MAX=10

# ======================
# AUTHENTICATION
# ======================
NEXTAUTH_URL=https://styleswap.com
NEXTAUTH_SECRET=your-super-secret-key-min-32-chars
JWT_SECRET=another-super-secret-key-min-32-chars

# ======================
# THIRD-PARTY SERVICES
# ======================

# Sentry (Error Tracking)
NEXT_PUBLIC_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
SENTRY_AUTH_TOKEN=your-sentry-auth-token
SENTRY_ORG=your-org-name
SENTRY_PROJECT=style-swap

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Image Upload (Cloudinary/S3)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
# OR for AWS S3:
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_S3_BUCKET=your-bucket-name
AWS_REGION=us-east-1

# Email Service (SendGrid/Resend)
SENDGRID_API_KEY=SG.xxx
FROM_EMAIL=noreply@styleswap.com
# OR for Resend:
RESEND_API_KEY=re_xxx

# Payment Processing (Stripe)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# AI/ML Services (if using)
OPENAI_API_KEY=sk-xxx
REPLICATE_API_TOKEN=r8_xxx

# ======================
# FEATURE FLAGS
# ======================
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_ERROR_TRACKING=true
NEXT_PUBLIC_MAINTENANCE_MODE=false

# ======================
# SECURITY
# ======================
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW_MS=900000
ALLOWED_ORIGINS=https://styleswap.com,https://www.styleswap.com

# ======================
# BUILD & DEPLOYMENT
# ======================
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

## Setting Up Environment Variables

### 1. Local Development

Create `.env.local` in project root:

```bash
# Copy example file
cp .env.example .env.local
```

Then fill in your development values. **Never commit this file!**

Add to `.gitignore`:
```
.env.local
.env.production
.env*.local
```

### 2. Vercel (Production & Preview)

#### Via Vercel CLI

```bash
# Add production variable
vercel env add VARIABLE_NAME production

# Add preview variable
vercel env add VARIABLE_NAME preview

# Add development variable
vercel env add VARIABLE_NAME development

# Pull environment variables to local
vercel env pull .env.local
```

#### Via Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Select your project
3. **Settings** → **Environment Variables**
4. Click **Add** for each variable:
   - **Key**: Variable name
   - **Value**: Variable value
   - **Environments**: Select Production, Preview, or Development

#### Bulk Import

Create a file `vercel-env.txt`:
```
NEXT_PUBLIC_SITE_URL=https://styleswap.com
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
```

Import via CLI:
```bash
cat vercel-env.txt | while read line; do
  KEY=$(echo $line | cut -d'=' -f1)
  VALUE=$(echo $line | cut -d'=' -f2-)
  vercel env add $KEY production <<< "$VALUE"
done
```

### 3. GitHub Actions (CI/CD)

Add secrets in GitHub repository:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add each variable

Access in workflows:
```yaml
env:
  DATABASE_URL: ${{ secrets.DATABASE_URL }}
  NEXT_PUBLIC_SITE_URL: ${{ secrets.NEXT_PUBLIC_SITE_URL }}
```

## Generating Secure Secrets

### NEXTAUTH_SECRET and JWT_SECRET

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Using OpenSSL
openssl rand -hex 32

# Using online generator (use trusted sources only)
# https://generate-secret.vercel.app/32
```

### Strong Passwords

```bash
# Using OpenSSL
openssl rand -base64 32
```

## Environment-Specific Configuration

### development.env
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
DATABASE_URL=postgresql://localhost:5432/styleswap_dev
NODE_ENV=development
NEXT_PUBLIC_ENABLE_ANALYTICS=false
```

### preview.env (Staging)
```env
NEXT_PUBLIC_SITE_URL=https://style-swap-git-develop.vercel.app
NEXT_PUBLIC_API_URL=https://style-swap-git-develop.vercel.app/api
DATABASE_URL=postgresql://staging-db-url
NODE_ENV=production
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

### production.env
```env
NEXT_PUBLIC_SITE_URL=https://styleswap.com
NEXT_PUBLIC_API_URL=https://styleswap.com/api
DATABASE_URL=postgresql://production-db-url
NODE_ENV=production
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_ERROR_TRACKING=true
```

## Using Environment Variables in Code

### Client-Side (Browser)

```typescript
// ✅ CORRECT - Public variable
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

// ❌ WRONG - Private variable won't work in browser
const dbUrl = process.env.DATABASE_URL; // undefined in browser
```

### Server-Side (API Routes, getServerSideProps)

```typescript
// ✅ Both work on server
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const dbUrl = process.env.DATABASE_URL;
```

### Example Usage

```typescript
// lib/config.ts
export const config = {
  site: {
    url: process.env.NEXT_PUBLIC_SITE_URL!,
    name: process.env.NEXT_PUBLIC_SITE_NAME!,
  },
  features: {
    analytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
    errorTracking: process.env.NEXT_PUBLIC_ENABLE_ERROR_TRACKING === 'true',
  },
  // Server-only config
  ...(typeof window === 'undefined' && {
    database: {
      url: process.env.DATABASE_URL!,
      poolMax: parseInt(process.env.DATABASE_POOL_MAX || '10'),
    },
    auth: {
      secret: process.env.NEXTAUTH_SECRET!,
    },
  }),
};
```

## Validation

Create `lib/env.ts` to validate environment variables at build time:

```typescript
const requiredEnvVars = [
  'NEXT_PUBLIC_SITE_URL',
  'DATABASE_URL',
  'NEXTAUTH_SECRET',
  'NEXTAUTH_URL',
] as const;

const optionalEnvVars = [
  'NEXT_PUBLIC_GA_MEASUREMENT_ID',
  'SENTRY_DSN',
] as const;

export function validateEnv() {
  const missing: string[] = [];
  
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      missing.push(envVar);
    }
  }
  
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables:\n${missing.join('\n')}`
    );
  }
  
  console.log('✅ All required environment variables are set');
}

// Call in next.config.js
```

Add to `next.config.js`:
```javascript
const { validateEnv } = require('./lib/env');

if (process.env.NODE_ENV === 'production') {
  validateEnv();
}
```

## Security Best Practices

### ✅ DO:
- Use different secrets for dev/staging/production
- Rotate secrets regularly (every 90 days)
- Use strong, randomly generated secrets
- Restrict access to production variables
- Audit who has access to secrets
- Use `.env.local` for local development
- Add `.env*.local` to `.gitignore`

### ❌ DON'T:
- Commit `.env` files to version control
- Share secrets in Slack/Discord/Email
- Use the same secret across environments
- Hardcode secrets in source code
- Expose private keys to the browser
- Use weak or guessable secrets

## Managing Secrets Rotation

When rotating secrets:

1. **Generate new secret**
2. **Add new secret** alongside old one (with different name)
3. **Update application** to use new secret
4. **Deploy and verify** everything works
5. **Remove old secret** after 24-48 hours
6. **Update documentation**

Example rotation:
```bash
# Add new secret
vercel env add NEXTAUTH_SECRET_V2 production

# Update code to use NEXTAUTH_SECRET_V2
# Deploy
# After verification, remove old secret
vercel env rm NEXTAUTH_SECRET production

# Rename new secret
vercel env add NEXTAUTH_SECRET production
vercel env rm NEXTAUTH_SECRET_V2 production
```

## Troubleshooting

### Variables Not Updating
- Redeploy after adding/changing variables
- Clear browser cache for public variables
- Check variable name spelling (case-sensitive)

### Undefined Variables
- Ensure `NEXT_PUBLIC_` prefix for client-side vars
- Check variable exists in correct environment
- Verify build logs show variable is set

### Build Fails Due to Missing Variables
- Add required variables to Vercel
- Check `next.config.js` validation
- Review build logs for specific missing variables

## Environment Variable Checklist

Before going to production:

- [ ] All required variables set in Vercel production
- [ ] Secrets are strong and randomly generated
- [ ] Different secrets for dev/staging/production
- [ ] Public variables use `NEXT_PUBLIC_` prefix
- [ ] `.env.local` added to `.gitignore`
- [ ] No hardcoded secrets in codebase
- [ ] Environment validation runs in `next.config.js`
- [ ] Documented all variables in `.env.example`
- [ ] Team members know how to access secrets securely

## Next Steps

✅ Environment variables configured  
➡️ **Next**: Set up CI/CD pipeline in `04-cicd-pipeline.md`
