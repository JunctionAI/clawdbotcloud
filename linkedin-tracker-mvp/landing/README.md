# LinkedIn Tracker - Landing Page

Modern Next.js landing page with Stripe integration for LinkedIn Tracker Chrome extension.

## Features

✅ **Modern Design** - Gradient hero, feature cards, pricing table
✅ **Stripe Integration** - Checkout flow with 7-day free trial
✅ **Email Capture** - Newsletter signup form
✅ **SEO Optimized** - Meta tags, OpenGraph, Twitter cards
✅ **Analytics Ready** - Plausible Analytics integration
✅ **Responsive** - Mobile-first design with Tailwind CSS

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create `.env.local` file:

```bash
# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Stripe Price IDs (create these in Stripe Dashboard)
NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY=price_...

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Analytics (optional)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=linkedintracker.app
```

### 3. Set Up Stripe

1. Go to https://dashboard.stripe.com/
2. Create a new product: "LinkedIn Tracker Pro"
3. Add price: $19/month (recurring)
4. Copy the Price ID to `.env.local`
5. Set up webhook endpoint: `/api/webhook` (for production)

### 4. Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000

## Deployment to Vercel

### Option 1: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/linkedin-tracker)

### Option 2: Manual Deploy

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Set environment variables in Vercel dashboard

4. Deploy to production:
```bash
vercel --prod
```

## Stripe Configuration

### Create Products & Prices

```bash
# Monthly Pro Plan
stripe prices create \
  --unit-amount=1900 \
  --currency=usd \
  --recurring-interval=month \
  --product-data-name="LinkedIn Tracker Pro" \
  --product-data-description="Unlimited lead tracking"
```

### Enable 7-Day Free Trial

In Stripe Dashboard:
- Go to Product > Pricing
- Edit price > Trial period > 7 days

### Webhook Setup (Production)

1. Go to Stripe Dashboard > Webhooks
2. Add endpoint: `https://yourdomain.com/api/webhook`
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Copy webhook secret to `.env.local`

## Email Newsletter Integration

Current implementation logs emails to console (MVP).

To integrate with email service:

### Mailchimp

```typescript
// app/api/newsletter/route.ts
const response = await fetch(
  `https://us1.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members`,
  {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.MAILCHIMP_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email_address: email,
      status: 'subscribed',
    }),
  }
)
```

### ConvertKit

```typescript
const response = await fetch(
  'https://api.convertkit.com/v3/forms/YOUR_FORM_ID/subscribe',
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      api_key: process.env.CONVERTKIT_API_KEY,
      email: email,
    }),
  }
)
```

## Analytics Setup

### Plausible (Recommended)

1. Sign up at https://plausible.io/
2. Add your domain
3. Set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` in `.env.local`
4. Script is auto-included in layout.tsx

### Google Analytics

```tsx
// app/layout.tsx
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_ID}');
  `}
</Script>
```

## SEO Optimization

### Generate Sitemap

Create `app/sitemap.ts`:

```typescript
export default function sitemap() {
  return [
    {
      url: 'https://linkedintracker.app',
      lastModified: new Date(),
    },
    {
      url: 'https://linkedintracker.app/privacy',
      lastModified: new Date(),
    },
    // Add more pages
  ]
}
```

### Robots.txt

Create `app/robots.ts`:

```typescript
export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://linkedintracker.app/sitemap.xml',
  }
}
```

## Page Structure

```
app/
├── layout.tsx          # Root layout with metadata
├── page.tsx            # Homepage
├── success/
│   └── page.tsx       # Post-checkout success page
├── api/
│   ├── checkout/
│   │   └── route.ts   # Stripe checkout session
│   └── newsletter/
│       └── route.ts   # Email capture
└── globals.css        # Global styles

components/
├── Hero.tsx           # Hero section
├── Features.tsx       # Feature cards
├── Pricing.tsx        # Pricing table + Stripe
├── Newsletter.tsx     # Email capture form
├── FAQ.tsx           # Accordion FAQ
└── Footer.tsx        # Footer with links
```

## Customization

### Colors

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#667eea',    // Change brand color
      secondary: '#764ba2',
    },
  },
}
```

### Copy/Content

All text is in components. Edit directly:
- Hero headline: `components/Hero.tsx`
- Features: `components/Features.tsx`
- Pricing plans: `components/Pricing.tsx`
- FAQ: `components/FAQ.tsx`

## Performance

- **Lighthouse Score Target**: 95+
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s

### Optimizations Applied:
- Next.js Image optimization
- Font optimization (next/font)
- CSS-in-JS avoided (Tailwind only)
- Minimal JavaScript
- Code splitting

## Security

- Environment variables for all secrets
- HTTPS only (Vercel default)
- CSP headers (TODO: add next.config.js)
- Rate limiting on API routes (TODO: add)

## TODO Before Launch

- [ ] Create demo video/screenshots
- [ ] Replace placeholder icons/images
- [ ] Set up Stripe products in production mode
- [ ] Configure custom domain in Vercel
- [ ] Add privacy policy page
- [ ] Add terms of service page
- [ ] Set up email service (Mailchimp/ConvertKit)
- [ ] Enable Plausible Analytics
- [ ] Add CSP headers
- [ ] Test checkout flow end-to-end
- [ ] Create Meta/Google ads assets

## Support

- Email: support@linkedintracker.app
- Twitter: @linkedintracker
- Discord: (coming soon)

---

Built with Next.js 14, Tailwind CSS, and Stripe.
