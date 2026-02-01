# 🚀 Style Swap - Deployment Guide (Vercel)

**Version**: 1.0.0  
**Last Updated**: January 28, 2026  
**Platform**: Vercel

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Quick Deploy](#quick-deploy)
3. [Manual Deployment](#manual-deployment)
4. [Environment Configuration](#environment-configuration)
5. [Custom Domain Setup](#custom-domain-setup)
6. [Performance Optimization](#performance-optimization)
7. [Monitoring & Analytics](#monitoring--analytics)
8. [Troubleshooting](#troubleshooting)
9. [Rollback & Recovery](#rollback--recovery)
10. [Production Checklist](#production-checklist)

---

## Prerequisites

### Required Accounts

- **GitHub/GitLab/Bitbucket**: Source control
- **Vercel**: Hosting platform ([vercel.com](https://vercel.com))
- **Google Cloud**: Gemini API access

### Required Tools

```bash
# Node.js (v18+)
node --version  # Should be >= 18.0.0

# npm or yarn
npm --version

# Vercel CLI (optional but recommended)
npm i -g vercel
```

### Required API Keys

- Gemini API Key from [Google AI Studio](https://makersuite.google.com/app/apikey)

---

## Quick Deploy

### Option 1: Deploy Button (Fastest)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/style-swap)

1. Click the button above
2. Sign in to Vercel
3. Clone repository to your account
4. Add environment variable: `NEXT_PUBLIC_GEMINI_API_KEY`
5. Click "Deploy"
6. Wait 2-3 minutes
7. Done! 🎉

---

## Manual Deployment

### Step 1: Prepare Repository

```bash
# Clone your repository
git clone https://github.com/your-username/style-swap.git
cd style-swap

# Install dependencies
npm install

# Test build locally
npm run build

# Test production mode
npm run start
```

**Verify**:
- Build completes without errors
- App runs at http://localhost:3000
- All features work correctly

### Step 2: Push to Git

```bash
# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - ready for deployment"

# Add remote (GitHub example)
git remote add origin https://github.com/your-username/style-swap.git

# Push
git push -u origin main
```

### Step 3: Connect to Vercel

**Via Vercel Dashboard:**

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Import your Git repository
4. Select "style-swap" repository
5. Click "Import"

**Via Vercel CLI:**

```bash
# Login to Vercel
vercel login

# Deploy (follow prompts)
vercel

# Deploy to production
vercel --prod
```

### Step 4: Configure Project

**Framework Preset**: Next.js (auto-detected)

**Build Settings**:
```
Build Command: npm run build
Output Directory: .next
Install Command: npm install
Development Command: npm run dev
```

**Node Version**: 18.x (recommended)

### Step 5: Add Environment Variables

**In Vercel Dashboard:**

1. Go to Project → Settings → Environment Variables
2. Add variable:
   - **Name**: `NEXT_PUBLIC_GEMINI_API_KEY`
   - **Value**: Your Gemini API key
   - **Environment**: Production, Preview, Development (select all)
3. Click "Save"

**Via CLI:**

```bash
vercel env add NEXT_PUBLIC_GEMINI_API_KEY production
# Paste your API key when prompted
```

### Step 6: Deploy

**Automatic Deployment** (recommended):
- Every push to `main` branch triggers deployment
- Pull requests create preview deployments

**Manual Deployment**:

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Step 7: Verify Deployment

1. Open the deployment URL (e.g., `https://style-swap.vercel.app`)
2. Test all features:
   - Upload image
   - Browse catalog
   - Try-on processing
   - Comparison slider
3. Check browser console for errors
4. Test on mobile device

---

## Environment Configuration

### Environment Variables

**Required:**

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_GEMINI_API_KEY` | Gemini API key | `AIzaSy...` |

**Optional:**

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Custom API endpoint | `/api` |
| `NEXT_PUBLIC_MAX_FILE_SIZE` | Max upload size (bytes) | `10485760` |
| `NEXT_PUBLIC_ENABLE_ANALYTICS` | Enable analytics | `false` |

### Environment-Specific Configuration

**Development (.env.local)**:
```env
NEXT_PUBLIC_GEMINI_API_KEY=your_dev_key_here
NEXT_PUBLIC_API_URL=/api
NEXT_PUBLIC_ENABLE_ANALYTICS=false
```

**Production (Vercel)**:
```env
NEXT_PUBLIC_GEMINI_API_KEY=your_prod_key_here
NEXT_PUBLIC_API_URL=/api
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

**Preview (Vercel)**:
- Inherits from Production by default
- Can override specific variables for testing

---

## Custom Domain Setup

### Step 1: Add Domain in Vercel

1. Go to Project → Settings → Domains
2. Enter your domain (e.g., `styleswap.com`)
3. Click "Add"

### Step 2: Configure DNS

**Option A: Vercel Nameservers (Recommended)**

Point your domain's nameservers to:
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

**Option B: Custom DNS (A/CNAME Records)**

Add these records in your DNS provider:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Step 3: Verify & Wait

- Verification can take 24-48 hours
- Vercel automatically provisions SSL certificate
- Force HTTPS redirect is enabled by default

### Subdomain Setup

```
Type: CNAME
Name: app
Value: cname.vercel-dns.com
```

Accesses your app at: `app.styleswap.com`

---

## Performance Optimization

### Next.js Configuration

**File**: `next.config.js`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable SWC minification
  swcMinify: true,
  
  // Image optimization
  images: {
    domains: ['your-cdn-domain.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Compression
  compress: true,
  
  // Strict mode
  reactStrictMode: true,
  
  // Headers for security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

### Vercel Configuration

**File**: `vercel.json`

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "regions": ["sfo1"],
  "functions": {
    "app/api/**/*.ts": {
      "memory": 1024,
      "maxDuration": 10
    }
  },
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "s-maxage=1, stale-while-revalidate"
        }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

### Caching Strategy

```typescript
// API Route with caching
export const revalidate = 60; // Revalidate every 60 seconds

export async function GET() {
  // Your API logic
}
```

### Image Optimization

```tsx
// Use Next.js Image component
import Image from 'next/image';

<Image
  src="/images/clothing-item.jpg"
  alt="Clothing item"
  width={300}
  height={400}
  quality={85}
  priority={false}
  loading="lazy"
/>
```

---

## Monitoring & Analytics

### Vercel Analytics

**Enable in Dashboard:**
1. Project → Analytics
2. Enable "Web Analytics"
3. Add snippet (auto-configured for Next.js)

**In Code** (`app/layout.tsx`):

```tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Vercel Speed Insights

```bash
npm install @vercel/speed-insights
```

```tsx
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
```

### Error Tracking (Sentry)

```bash
npm install @sentry/nextjs
```

```javascript
// sentry.client.config.js
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
});
```

### Custom Logging

```typescript
// app/lib/logger.ts
export const logger = {
  info: (message: string, meta?: any) => {
    console.log(`[INFO] ${message}`, meta);
  },
  error: (message: string, error?: any) => {
    console.error(`[ERROR] ${message}`, error);
    // Send to external service (e.g., Sentry)
  },
  warn: (message: string, meta?: any) => {
    console.warn(`[WARN] ${message}`, meta);
  },
};
```

---

## Troubleshooting

### Build Failures

**Issue**: Build fails with module not found

```bash
Error: Cannot find module 'framer-motion'
```

**Solution**:
```bash
# Clear cache
rm -rf .next node_modules package-lock.json

# Reinstall
npm install

# Try build again
npm run build
```

**Issue**: TypeScript errors during build

```bash
Type error: Property 'xyz' does not exist
```

**Solution**:
```bash
# Check TypeScript config
npx tsc --noEmit

# Fix errors in code
# Or temporarily disable strict mode in tsconfig.json (not recommended)
```

---

### Deployment Failures

**Issue**: Environment variables not working

**Solution**:
1. Verify variable name matches exactly (case-sensitive)
2. Check all environments are selected
3. Redeploy after adding variables
4. Use `NEXT_PUBLIC_` prefix for client-side variables

---

**Issue**: API routes returning 404

**Solution**:
1. Check file is in `app/api/` directory
2. Verify file named `route.ts` (not `index.ts`)
3. Ensure proper export: `export async function POST()`
4. Clear build cache and redeploy

---

### Runtime Errors

**Issue**: Gemini API errors (401 Unauthorized)

```
Error: API key not configured or invalid
```

**Solution**:
1. Verify API key in Vercel environment variables
2. Check API key is valid in Google AI Studio
3. Ensure billing is enabled on Google Cloud
4. Check API quota limits

---

**Issue**: Image upload failures

```
Error: File too large
```

**Solution**:
1. Check Vercel function size limits (default: 4.5 MB body)
2. Increase in `vercel.json`:
   ```json
   {
     "functions": {
       "app/api/try-on/route.ts": {
         "maxDuration": 30,
         "memory": 3008
       }
     }
   }
   ```
3. Implement client-side image compression

---

**Issue**: Slow API response times

**Solution**:
1. Check Gemini API response times
2. Implement caching for repeated requests
3. Optimize image sizes before sending
4. Consider edge functions for faster routing

---

### Performance Issues

**Issue**: Slow page loads

**Diagnosis**:
```bash
# Test with Lighthouse
npx lighthouse https://your-app.vercel.app --view

# Check Core Web Vitals in Vercel Dashboard
```

**Solutions**:
- Enable image optimization
- Lazy load components
- Reduce bundle size
- Use edge caching
- Optimize fonts

---

**Issue**: High memory usage

**Solution**:
```json
// vercel.json
{
  "functions": {
    "app/api/**/*.ts": {
      "memory": 3008
    }
  }
}
```

---

## Rollback & Recovery

### Instant Rollback

**Via Dashboard:**
1. Go to Deployments
2. Find previous working deployment
3. Click "..." → "Promote to Production"

**Via CLI:**
```bash
# List deployments
vercel ls

# Promote specific deployment
vercel promote [deployment-url]
```

### Rollback with Git

```bash
# Revert last commit
git revert HEAD

# Push to trigger new deployment
git push origin main
```

### Database Rollback (Future)

When database is added:
```bash
# Backup before deployment
vercel env pull .env.production

# Restore from backup
vercel env add DB_URL production < backup.env
```

---

## Production Checklist

### Pre-Deployment

- [ ] All tests passing
- [ ] TypeScript errors resolved
- [ ] Linting passes
- [ ] Build succeeds locally
- [ ] Environment variables configured
- [ ] API keys valid and tested
- [ ] Images optimized
- [ ] No console.log statements
- [ ] Error handling implemented
- [ ] Loading states added

### Deployment

- [ ] Code pushed to main branch
- [ ] Vercel build successful
- [ ] No build warnings
- [ ] All routes accessible
- [ ] API endpoints responding
- [ ] Images loading correctly
- [ ] Styles rendering properly

### Post-Deployment

- [ ] Smoke test all features
- [ ] Test on multiple browsers
- [ ] Test on mobile devices
- [ ] Check performance metrics
- [ ] Monitor error logs
- [ ] Verify analytics tracking
- [ ] Test custom domain (if configured)
- [ ] SSL certificate valid
- [ ] SEO meta tags present

### Monitoring (First 24 Hours)

- [ ] Check error rates
- [ ] Monitor API usage
- [ ] Review user analytics
- [ ] Check performance scores
- [ ] Monitor uptime
- [ ] Review deployment logs

---

## Advanced Configuration

### Edge Functions

```typescript
// app/api/edge-route/route.ts
export const runtime = 'edge';

export async function GET(request: Request) {
  // This runs at the edge for faster responses
  return new Response('Hello from the edge!');
}
```

### Middleware

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Add custom headers
  const response = NextResponse.next();
  response.headers.set('x-custom-header', 'value');
  return response;
}

export const config = {
  matcher: '/api/:path*',
};
```

### Incremental Static Regeneration

```typescript
// For static pages that need periodic updates
export const revalidate = 3600; // Revalidate every hour

export default function Page() {
  return <div>This page regenerates every hour</div>;
}
```

---

## Cost Optimization

### Vercel Pricing Tiers

| Tier | Price | Bandwidth | Build Minutes |
|------|-------|-----------|---------------|
| Hobby | Free | 100 GB | 100 min |
| Pro | $20/mo | 1 TB | 400 min |
| Enterprise | Custom | Custom | Custom |

### Reduce Costs

1. **Optimize images**: Use WebP/AVIF formats
2. **Enable caching**: Reduce API calls
3. **Edge caching**: Faster + cheaper
4. **Lazy loading**: Reduce initial bandwidth
5. **Code splitting**: Smaller bundles

### Monitor Usage

```bash
# Check Vercel usage
vercel teams ls
vercel inspect [deployment-url]
```

---

## Security Best Practices

### Environment Variables

- ✅ Never commit `.env` files
- ✅ Use `NEXT_PUBLIC_` only for client-safe variables
- ✅ Rotate API keys regularly
- ❌ Don't expose sensitive keys client-side

### Headers

```javascript
// next.config.js
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        { key: 'X-DNS-Prefetch-Control', value: 'on' },
        { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
      ],
    },
  ];
}
```

### Rate Limiting

```typescript
// Implement in API routes
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '1 m'),
});

export async function POST(request: Request) {
  const identifier = request.headers.get('x-forwarded-for') || 'anonymous';
  const { success } = await ratelimit.limit(identifier);
  
  if (!success) {
    return new Response('Rate limit exceeded', { status: 429 });
  }
  
  // Process request
}
```

---

## Support & Resources

### Official Documentation

- [Vercel Docs](https://vercel.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Vercel CLI Reference](https://vercel.com/docs/cli)

### Community

- [Vercel Discord](https://vercel.com/discord)
- [Next.js GitHub Discussions](https://github.com/vercel/next.js/discussions)

### Get Help

- Email: support@vercel.com
- Twitter: @vercel
- Status: [vercel-status.com](https://www.vercel-status.com)

---

**Deployment Guide v1.0.0**  
**Platform**: Vercel  
**Framework**: Next.js 16+

*Last Updated: January 28, 2026*
