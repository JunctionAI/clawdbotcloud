# 06 - Performance Optimization

Complete guide to achieving Lighthouse score 95+ across all metrics.

## Target Metrics (Lighthouse 95+)

- **Performance**: 95+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 95+

### Core Web Vitals Targets

- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **FCP** (First Contentful Paint): < 1.8s
- **TTI** (Time to Interactive): < 3.8s
- **TBT** (Total Blocking Time): < 200ms

## 1. Next.js Configuration

Create optimized `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Experimental features
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@mui/material', 'lodash'],
  },
  
  // Compression
  compress: true,
  
  // Production optimization
  productionBrowserSourceMaps: false,
  
  // Headers for caching
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

## 2. Image Optimization

### Use Next.js Image Component

```typescript
import Image from 'next/image';

// ✅ GOOD
<Image
  src="/images/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  priority // For above-fold images
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..." // Or use automatic
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>

// ❌ BAD
<img src="/images/hero.jpg" alt="Hero" />
```

### Optimize Image Assets

```bash
# Install image optimization tools
npm install -D sharp imagemin imagemin-mozjpeg imagemin-pngquant

# Create optimization script
# scripts/optimize-images.js
```

Create `scripts/optimize-images.js`:

```javascript
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');

(async () => {
  await imagemin(['public/images/*.{jpg,png}'], {
    destination: 'public/images/optimized',
    plugins: [
      imageminMozjpeg({ quality: 80 }),
      imageminPngquant({ quality: [0.6, 0.8] }),
    ],
  });
  console.log('Images optimized!');
})();
```

### Lazy Load Images

```typescript
<Image
  src="/images/below-fold.jpg"
  alt="Below fold image"
  width={800}
  height={400}
  loading="lazy" // Default for non-priority images
/>
```

## 3. Font Optimization

### Use next/font

```typescript
// app/layout.tsx or pages/_app.tsx
import { Inter, Roboto_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
```

### Self-Host Fonts

```css
/* public/fonts/fonts.css */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/inter-v12-latin-regular.woff2') format('woff2');
}

@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('/fonts/inter-v12-latin-700.woff2') format('woff2');
}
```

Preload critical fonts:

```tsx
// pages/_document.tsx
<Head>
  <link
    rel="preload"
    href="/fonts/inter-v12-latin-regular.woff2"
    as="font"
    type="font/woff2"
    crossOrigin="anonymous"
  />
</Head>
```

## 4. Code Splitting & Lazy Loading

### Dynamic Imports

```typescript
import dynamic from 'next/dynamic';

// Lazy load components
const HeavyComponent = dynamic(() => import('@/components/HeavyComponent'), {
  loading: () => <Spinner />,
  ssr: false, // Disable SSR if not needed
});

// Lazy load with named export
const Chart = dynamic(
  () => import('@/components/Chart').then((mod) => mod.Chart),
  { ssr: false }
);
```

### Route-based Code Splitting

Next.js does this automatically, but optimize further:

```typescript
// Prefetch critical routes
import Link from 'next/link';

<Link href="/important-page" prefetch>
  Important Page
</Link>

// Don't prefetch less important routes
<Link href="/rarely-used" prefetch={false}>
  Rarely Used Page
</Link>
```

## 5. Bundle Size Optimization

### Analyze Bundle

```bash
# Install bundle analyzer
npm install -D @next/bundle-analyzer

# Enable in next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);

# Run analysis
ANALYZE=true npm run build
```

### Reduce Bundle Size

```typescript
// ✅ Import only what you need
import { debounce } from 'lodash-es';

// ❌ Don't import entire library
import _ from 'lodash';

// ✅ Use tree-shakeable libraries
import { format } from 'date-fns';

// ❌ Large moment.js
import moment from 'moment';
```

### Remove Unused Dependencies

```bash
# Find unused dependencies
npx depcheck

# Remove them
npm uninstall [package-name]
```

## 6. CSS Optimization

### Critical CSS

```typescript
// pages/_document.tsx
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Inline critical CSS */}
          <style dangerouslySetInnerHTML={{ __html: criticalCss }} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
```

### CSS Modules for Component Styles

```typescript
// ✅ CSS Modules (auto code-split)
import styles from './Button.module.css';

<button className={styles.primary}>Click</button>

// Avoid global CSS imports in components
```

### Tailwind CSS Optimization

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // Remove unused styles
  purge: {
    enabled: process.env.NODE_ENV === 'production',
  },
};
```

## 7. JavaScript Optimization

### Minimize Third-Party Scripts

```typescript
// Load analytics after page load
import { useEffect } from 'react';
import Script from 'next/script';

export default function Home() {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js"
        strategy="lazyOnload" // or "afterInteractive"
      />
      {/* ... */}
    </>
  );
}
```

### Debounce/Throttle Event Handlers

```typescript
import { useMemo } from 'react';
import { debounce } from 'lodash-es';

export default function SearchInput() {
  const debouncedSearch = useMemo(
    () => debounce((value) => {
      // API call
    }, 300),
    []
  );

  return <input onChange={(e) => debouncedSearch(e.target.value)} />;
}
```

## 8. API & Data Fetching Optimization

### Static Generation (Best Performance)

```typescript
// pages/blog/[slug].tsx
export async function getStaticProps({ params }) {
  const post = await fetchPost(params.slug);
  
  return {
    props: { post },
    revalidate: 3600, // ISR: Revalidate every hour
  };
}

export async function getStaticPaths() {
  const posts = await fetchAllPosts();
  
  return {
    paths: posts.map((post) => ({
      params: { slug: post.slug },
    })),
    fallback: 'blocking', // or true for instant fallback
  };
}
```

### Parallel Data Fetching

```typescript
// ✅ Fetch in parallel
const [user, posts, comments] = await Promise.all([
  fetchUser(),
  fetchPosts(),
  fetchComments(),
]);

// ❌ Sequential (slow)
const user = await fetchUser();
const posts = await fetchPosts();
const comments = await fetchComments();
```

### API Response Caching

```typescript
// pages/api/data.ts
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
  
  const data = await fetchData();
  res.json(data);
}
```

## 9. Resource Hints

```tsx
// pages/_document.tsx
<Head>
  {/* DNS Prefetch */}
  <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
  
  {/* Preconnect */}
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
  
  {/* Prefetch next page */}
  <link rel="prefetch" href="/about" />
  
  {/* Preload critical resources */}
  <link
    rel="preload"
    href="/fonts/inter.woff2"
    as="font"
    type="font/woff2"
    crossOrigin="anonymous"
  />
  
  {/* Preload critical images */}
  <link rel="preload" as="image" href="/images/hero.jpg" />
</Head>
```

## 10. Service Worker & PWA

```bash
npm install next-pwa
```

Configure in `next.config.js`:

```javascript
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

module.exports = withPWA(nextConfig);
```

Create `public/manifest.json`:

```json
{
  "name": "Style Swap",
  "short_name": "StyleSwap",
  "description": "Style swapping platform",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "icons": [
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

## 11. Database Optimization

### Connection Pooling

```typescript
// lib/db.ts
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export default pool;
```

### Query Optimization

```sql
-- ✅ Use indexes
CREATE INDEX idx_user_email ON users(email);

-- ✅ Limit results
SELECT * FROM posts ORDER BY created_at DESC LIMIT 10;

-- ✅ Use specific columns
SELECT id, title, created_at FROM posts;

-- ❌ Don't use SELECT *
SELECT * FROM posts;
```

## 12. Accessibility Optimization

```tsx
// ✅ Semantic HTML
<nav>
  <ul>
    <li><a href="/">Home</a></li>
  </ul>
</nav>

// ✅ Alt text for images
<Image src="/logo.png" alt="Style Swap Logo" />

// ✅ ARIA labels
<button aria-label="Close menu" onClick={closeMenu}>
  <XIcon />
</button>

// ✅ Focus management
<input ref={inputRef} />

// ✅ Keyboard navigation
<div
  role="button"
  tabIndex={0}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
  onClick={handleClick}
>
  Click me
</div>
```

## 13. Monitoring Performance

### Lighthouse CI

Create `lighthouse-budget.json`:

```json
{
  "performance": 95,
  "accessibility": 95,
  "best-practices": 95,
  "seo": 95,
  "pwa": 90
}
```

### Web Vitals Tracking

```typescript
// pages/_app.tsx
export function reportWebVitals(metric) {
  console.log(metric);
  
  // Send to analytics
  if (metric.label === 'web-vital') {
    gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_label: metric.id,
      non_interaction: true,
    });
  }
}
```

## 14. Performance Checklist

Before launch:

- [ ] Lighthouse score 95+ on all pages
- [ ] Images optimized (WebP/AVIF)
- [ ] Fonts optimized (next/font or preloaded)
- [ ] Bundle size < 200KB (gzipped)
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] API responses cached
- [ ] Database queries optimized
- [ ] Service worker configured
- [ ] Resource hints added
- [ ] Third-party scripts lazy loaded
- [ ] Accessibility score 95+

## Troubleshooting

### High LCP
- Optimize above-fold images
- Preload hero image
- Use CDN
- Enable image optimization

### High CLS
- Set width/height on images
- Reserve space for ads/embeds
- Avoid inserting content above existing content
- Use font-display: swap

### Large Bundle
- Analyze with bundle analyzer
- Remove unused dependencies
- Use dynamic imports
- Tree-shake libraries

## Next Steps

✅ Performance optimized to 95+  
➡️ **Next**: SEO setup in `07-seo-setup.md`
