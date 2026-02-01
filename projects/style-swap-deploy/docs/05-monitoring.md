# 05 - Monitoring Setup (Sentry & Analytics)

Complete monitoring and analytics setup for production observability.

## Overview

This guide covers:
- ✅ Sentry error tracking
- ✅ Google Analytics 4
- ✅ Vercel Analytics
- ✅ Performance monitoring
- ✅ Uptime monitoring
- ✅ Log aggregation

## 1. Sentry Error Tracking

### Step 1: Create Sentry Account

1. Sign up at https://sentry.io
2. Create new organization
3. Create new project:
   - Platform: **Next.js**
   - Project name: **style-swap**

### Step 2: Install Sentry SDK

```bash
npm install --save @sentry/nextjs
```

### Step 3: Initialize Sentry

Run the setup wizard:

```bash
npx @sentry/wizard@latest -i nextjs
```

This creates:
- `sentry.client.config.ts`
- `sentry.server.config.ts`
- `sentry.edge.config.ts`
- Updates `next.config.js`

### Step 4: Configure Sentry

Create `sentry.client.config.ts`:

```typescript
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  
  // Set tracesSampleRate to 1.0 to capture 100% of transactions
  // Reduce in production to save quota
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  
  // Session Replay
  replaysOnErrorSampleRate: 1.0, // 100% of errors
  replaysSessionSampleRate: 0.1, // 10% of sessions
  
  // Performance monitoring
  profilesSampleRate: 1.0,
  
  integrations: [
    new Sentry.BrowserTracing({
      tracePropagationTargets: [
        'localhost',
        /^https:\/\/styleswap\.com/,
      ],
    }),
    new Sentry.Replay({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
  
  environment: process.env.NODE_ENV,
  
  // Filter out noise
  ignoreErrors: [
    'ResizeObserver loop limit exceeded',
    'Non-Error promise rejection captured',
    /Loading chunk [\d]+ failed/,
  ],
  
  beforeSend(event, hint) {
    // Filter out localhost errors in production
    if (event.request?.url?.includes('localhost')) {
      return null;
    }
    return event;
  },
});
```

Create `sentry.server.config.ts`:

```typescript
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  environment: process.env.NODE_ENV,
  
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
  ],
});
```

### Step 5: Add Sentry to Environment Variables

```bash
# Vercel
vercel env add NEXT_PUBLIC_SENTRY_DSN production
vercel env add SENTRY_AUTH_TOKEN production
vercel env add SENTRY_ORG production
vercel env add SENTRY_PROJECT production
```

Values:
- `NEXT_PUBLIC_SENTRY_DSN`: From Sentry project settings
- `SENTRY_AUTH_TOKEN`: From https://sentry.io/settings/account/api/auth-tokens/
- `SENTRY_ORG`: Your organization slug
- `SENTRY_PROJECT`: `style-swap`

### Step 6: Test Sentry

Create a test error:

```typescript
// pages/api/sentry-test.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  throw new Error('Sentry test error!');
}
```

Visit `/api/sentry-test` and check Sentry dashboard for the error.

### Step 7: Source Maps Upload

Configured automatically by `@sentry/nextjs`. Verify in `next.config.js`:

```javascript
const { withSentryConfig } = require('@sentry/nextjs');

module.exports = withSentryConfig(
  nextConfig,
  {
    silent: true,
    org: process.env.SENTRY_ORG,
    project: process.env.SENTRY_PROJECT,
  },
  {
    widenClientFileUpload: true,
    transpileClientSDK: true,
    tunnelRoute: '/monitoring',
    hideSourceMaps: true,
    disableLogger: true,
  }
);
```

## 2. Google Analytics 4

### Step 1: Create GA4 Property

1. Go to https://analytics.google.com
2. Create account → Create property
3. Property name: **Style Swap**
4. Set timezone and currency
5. Get **Measurement ID** (format: G-XXXXXXXXXX)

### Step 2: Install GA4

Create `lib/gtag.ts`:

```typescript
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Track page views
export const pageview = (url: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', GA_MEASUREMENT_ID!, {
      page_path: url,
    });
  }
};

// Track events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value?: number;
}) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Extend window type
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}
```

### Step 3: Add GA4 Script

Create `components/Analytics.tsx`:

```typescript
import Script from 'next/script';
import { GA_MEASUREMENT_ID } from '@/lib/gtag';

export default function Analytics() {
  if (!GA_MEASUREMENT_ID || process.env.NODE_ENV !== 'production') {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
```

### Step 4: Add to App

In `pages/_app.tsx`:

```typescript
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Analytics from '@/components/Analytics';
import * as gtag from '@/lib/gtag';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Analytics />
      <Component {...pageProps} />
    </>
  );
}
```

### Step 5: Track Custom Events

```typescript
import * as gtag from '@/lib/gtag';

// Example: Track button click
const handleClick = () => {
  gtag.event({
    action: 'click',
    category: 'engagement',
    label: 'cta_button',
    value: 1,
  });
};

// Example: Track form submission
const handleSubmit = () => {
  gtag.event({
    action: 'submit',
    category: 'form',
    label: 'contact_form',
  });
};
```

## 3. Vercel Analytics

### Step 1: Enable in Vercel Dashboard

1. Go to project → **Analytics** tab
2. Click **Enable Analytics**
3. Choose plan (Hobby is free)

### Step 2: Install Vercel Analytics

```bash
npm install @vercel/analytics
```

### Step 3: Add to App

In `pages/_app.tsx`:

```typescript
import { Analytics } from '@vercel/analytics/react';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
```

### Features Included

- ✅ Page views
- ✅ Top pages
- ✅ Top referrers
- ✅ Geographic data
- ✅ Device breakdown

## 4. Vercel Speed Insights

Track real user performance metrics:

```bash
npm install @vercel/speed-insights
```

Add to `pages/_app.tsx`:

```typescript
import { SpeedInsights } from '@vercel/speed-insights/next';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <SpeedInsights />
    </>
  );
}
```

## 5. Uptime Monitoring

### Option A: Vercel Monitoring (Built-in)

Automatically monitors:
- Deployment success/failure
- Build duration
- Response times

### Option B: UptimeRobot (Free)

1. Sign up at https://uptimerobot.com
2. Add new monitor:
   - Type: **HTTP(s)**
   - URL: `https://styleswap.com`
   - Interval: **5 minutes**
3. Add alert contacts (email, Slack)
4. Set up status page (optional, public)

### Option C: BetterStack (Recommended)

1. Sign up at https://betterstack.com
2. Create uptime check:
   - URL: `https://styleswap.com`
   - Interval: **30 seconds**
   - Regions: Multiple locations
3. Set up incident notifications
4. Create public status page

```bash
# Add health check endpoint
# pages/api/health.ts
export default function handler(req, res) {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
}
```

## 6. Log Aggregation

### Vercel Log Drains

Stream logs to external service:

1. **Vercel Dashboard** → **Settings** → **Log Drains**
2. Choose service:
   - Datadog
   - Logtail
   - Axiom
   - Custom HTTP endpoint

### Example: Axiom Integration

```bash
# Install Axiom CLI
npm install -g @axiomhq/cli

# Create dataset
axiom dataset create style-swap-logs

# Add log drain in Vercel dashboard
# Endpoint: https://api.axiom.co/v1/datasets/style-swap-logs/ingest
# Token: Your Axiom API token
```

## 7. Performance Monitoring Dashboard

### Create Custom Dashboard

Use Sentry Performance or create custom with Vercel API:

```typescript
// lib/monitoring.ts
export async function trackPerformance(metric: {
  name: string;
  value: number;
  label?: string;
}) {
  if (process.env.NODE_ENV === 'production') {
    // Send to analytics
    gtag.event({
      action: 'performance',
      category: 'web_vitals',
      label: metric.name,
      value: Math.round(metric.value),
    });
    
    // Send to Sentry
    Sentry.captureMessage(`Performance: ${metric.name}`, {
      level: 'info',
      tags: { metric: metric.name },
      extra: { value: metric.value },
    });
  }
}

// Track Web Vitals
export function reportWebVitals(metric: any) {
  trackPerformance({
    name: metric.name,
    value: metric.value,
    label: metric.id,
  });
}
```

Add to `pages/_app.tsx`:

```typescript
export { reportWebVitals } from '@/lib/monitoring';
```

## 8. Alert Configuration

### Sentry Alerts

1. **Settings** → **Alerts** → **Create Alert Rule**
2. Configure:
   - **Type**: Issues
   - **Condition**: First seen issue
   - **Action**: Send notification to Slack/email
3. Create additional alerts:
   - Error rate threshold (e.g., >10 errors/minute)
   - Performance degradation
   - New release issues

### Uptime Alerts

Configure in BetterStack/UptimeRobot:
- Down for > 1 minute → Immediate alert
- Response time > 3s → Warning
- SSL certificate expiring < 7 days → Alert

## 9. Monitoring Checklist

Before going live:

- [ ] Sentry error tracking active
- [ ] Google Analytics 4 configured
- [ ] Vercel Analytics enabled
- [ ] Speed Insights tracking
- [ ] Uptime monitoring configured
- [ ] Health check endpoint working
- [ ] Alert channels tested
- [ ] Team has access to dashboards
- [ ] Error notification channels work
- [ ] Performance baselines established

## 10. Dashboard Access

Team member setup:

**Sentry**:
1. Settings → Members → Invite
2. Assign role (Admin/Member/Billing)

**Google Analytics**:
1. Admin → Property access management
2. Add user → Assign role

**Vercel**:
1. Team settings → Members
2. Invite → Assign role

## Troubleshooting

### Sentry Not Capturing Errors

- Check DSN is set correctly
- Verify environment is not filtered
- Check network tab for Sentry requests
- Test with manual error: `throw new Error('test')`

### Analytics Not Tracking

- Verify Measurement ID is correct
- Check console for GA errors
- Use GA Debug extension
- Check Content Security Policy allows GA scripts

### Missing Source Maps in Sentry

- Verify `SENTRY_AUTH_TOKEN` is set
- Check build logs for upload confirmation
- Ensure `next.config.js` has Sentry config

## Best Practices

### ✅ DO:
- Set up alerts before launch
- Monitor error rate trends
- Review dashboards weekly
- Set performance budgets
- Track business metrics
- Test monitoring before launch

### ❌ DON'T:
- Ignore error spikes
- Track unnecessary events
- Set noise alerts (too sensitive)
- Share monitoring access publicly
- Forget to rotate API tokens

## Next Steps

✅ Monitoring and analytics configured  
➡️ **Next**: Performance optimization in `06-performance.md`
