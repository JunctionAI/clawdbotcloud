# 07 - SEO Setup

Complete SEO configuration for maximum search visibility.

## Target

- **SEO Lighthouse Score**: 95+
- **Google Search Console**: Green checkmarks
- **Rich Snippets**: Properly structured
- **Mobile-Friendly**: 100%

## 1. Meta Tags Configuration

### Create SEO Component

```typescript
// components/SEO.tsx
import Head from 'next/head';
import { useRouter } from 'next/router';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  article?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  keywords?: string[];
}

export default function SEO({
  title = 'Style Swap - Your Fashion Marketplace',
  description = 'Buy, sell, and swap fashion items with Style Swap. Sustainable fashion made easy.',
  image = '/images/og-default.jpg',
  article = false,
  publishedTime,
  modifiedTime,
  author,
  keywords = ['fashion', 'marketplace', 'sustainable', 'swap', 'buy', 'sell'],
}: SEOProps) {
  const router = useRouter();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://styleswap.com';
  const canonicalUrl = `${siteUrl}${router.asPath}`;
  const imageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Style Swap" />
      <meta property="og:locale" content="en_US" />
      
      {article && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {article && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {article && author && (
        <meta property="article:author" content={author} />
      )}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:creator" content="@styleswap" />
      <meta name="twitter:site" content="@styleswap" />
      
      {/* Additional Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="author" content="Style Swap" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
    </Head>
  );
}
```

### Use in Pages

```typescript
// pages/index.tsx
import SEO from '@/components/SEO';

export default function Home() {
  return (
    <>
      <SEO
        title="Style Swap - Sustainable Fashion Marketplace"
        description="Buy, sell, and swap pre-loved fashion. Join thousands in the sustainable fashion movement."
        keywords={['fashion marketplace', 'sustainable fashion', 'buy sell clothes']}
      />
      {/* Page content */}
    </>
  );
}

// pages/blog/[slug].tsx
export default function BlogPost({ post }) {
  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        image={post.coverImage}
        article
        publishedTime={post.publishedAt}
        modifiedTime={post.updatedAt}
        author={post.author.name}
        keywords={post.tags}
      />
      {/* Post content */}
    </>
  );
}
```

## 2. Sitemap Generation

### Install Dependencies

```bash
npm install next-sitemap
```

### Configure Sitemap

Create `next-sitemap.config.js`:

```javascript
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://styleswap.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  
  // Exclude paths
  exclude: [
    '/admin/*',
    '/api/*',
    '/404',
    '/500',
    '/server-sitemap.xml',
  ],
  
  // Robots.txt configuration
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://styleswap.com/server-sitemap.xml', // Dynamic sitemap
    ],
  },
  
  // Default priority
  priority: 0.7,
  changefreq: 'daily',
  
  // Custom transform for specific pages
  transform: async (config, path) => {
    // Custom priority for different pages
    const priorities = {
      '/': 1.0,
      '/shop': 0.9,
      '/about': 0.8,
      '/blog': 0.8,
    };
    
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: priorities[path] || config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};
```

### Add Build Script

In `package.json`:

```json
{
  "scripts": {
    "postbuild": "next-sitemap"
  }
}
```

### Dynamic Sitemap for Products/Blog

Create `pages/server-sitemap.xml/index.tsx`:

```typescript
import { getServerSideSitemapLegacy } from 'next-sitemap';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://styleswap.com';
  
  // Fetch dynamic data
  const products = await fetchAllProducts();
  const blogPosts = await fetchAllBlogPosts();
  
  const productUrls = products.map((product) => ({
    loc: `${siteUrl}/products/${product.slug}`,
    lastmod: new Date(product.updatedAt).toISOString(),
    changefreq: 'weekly',
    priority: 0.8,
  }));
  
  const blogUrls = blogPosts.map((post) => ({
    loc: `${siteUrl}/blog/${post.slug}`,
    lastmod: new Date(post.updatedAt).toISOString(),
    changefreq: 'monthly',
    priority: 0.7,
  }));
  
  const fields = [...productUrls, ...blogUrls];
  
  return getServerSideSitemapLegacy(ctx, fields);
};

export default function Sitemap() {
  // getServerSideProps will do the heavy lifting
}
```

## 3. Robots.txt

Created automatically by `next-sitemap`, but you can also create manually:

`public/robots.txt`:

```txt
# Allow all crawlers
User-agent: *
Allow: /

# Disallow admin and API routes
Disallow: /admin/
Disallow: /api/

# Disallow user-specific pages
Disallow: /account/
Disallow: /checkout/

# Sitemap
Sitemap: https://styleswap.com/sitemap.xml
Sitemap: https://styleswap.com/server-sitemap.xml

# Crawl delay (optional, for aggressive bots)
Crawl-delay: 1
```

## 4. Structured Data (JSON-LD)

### Organization Schema

```typescript
// components/schemas/OrganizationSchema.tsx
export default function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Style Swap',
    url: 'https://styleswap.com',
    logo: 'https://styleswap.com/images/logo.png',
    description: 'Sustainable fashion marketplace for buying, selling, and swapping clothes.',
    sameAs: [
      'https://twitter.com/styleswap',
      'https://facebook.com/styleswap',
      'https://instagram.com/styleswap',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-555-123-4567',
      contactType: 'Customer Service',
      email: 'support@styleswap.com',
      areaServed: 'US',
      availableLanguage: ['English'],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

### Product Schema

```typescript
// components/schemas/ProductSchema.tsx
interface ProductSchemaProps {
  product: {
    name: string;
    description: string;
    image: string;
    price: number;
    currency: string;
    availability: string;
    condition: string;
    brand?: string;
    sku?: string;
  };
}

export default function ProductSchema({ product }: ProductSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    brand: product.brand ? { '@type': 'Brand', name: product.brand } : undefined,
    sku: product.sku,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency,
      availability: `https://schema.org/${product.availability}`,
      itemCondition: `https://schema.org/${product.condition}`,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

### Article Schema

```typescript
// components/schemas/ArticleSchema.tsx
interface ArticleSchemaProps {
  article: {
    title: string;
    description: string;
    image: string;
    publishedAt: string;
    updatedAt: string;
    author: string;
  };
}

export default function ArticleSchema({ article }: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Style Swap',
      logo: {
        '@type': 'ImageObject',
        url: 'https://styleswap.com/images/logo.png',
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

### Breadcrumb Schema

```typescript
// components/schemas/BreadcrumbSchema.tsx
interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export default function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

## 5. Mobile Optimization

### Viewport Configuration

```tsx
// pages/_document.tsx
<Head>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
  <meta name="mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
</Head>
```

### Touch Icons

```tsx
<Head>
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
  <link rel="manifest" href="/manifest.json" />
  <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
  <meta name="msapplication-TileColor" content="#000000" />
  <meta name="theme-color" content="#ffffff" />
</Head>
```

## 6. Page Speed Optimization

### HTML Lang Attribute

```tsx
// pages/_document.tsx
<Html lang="en">
```

### Favicon

```tsx
<Head>
  <link rel="icon" href="/favicon.ico" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
</Head>
```

## 7. Social Media Integration

### Create Open Graph Images

Optimal sizes:
- **Facebook/LinkedIn**: 1200 × 630 px
- **Twitter**: 1200 × 675 px (16:9)
- **Instagram**: 1080 × 1080 px (1:1)

### Dynamic OG Images

Create `pages/api/og-image.tsx`:

```typescript
import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title = searchParams.get('title') || 'Style Swap';
  const description = searchParams.get('description') || 'Sustainable Fashion Marketplace';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000',
          color: '#fff',
          fontSize: 60,
          fontWeight: 'bold',
          padding: '40px',
        }}
      >
        <div>{title}</div>
        <div style={{ fontSize: 30, marginTop: 20, color: '#888' }}>
          {description}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
```

Usage:
```typescript
<meta property="og:image" content="/api/og-image?title=My Product&description=Great item" />
```

## 8. XML Sitemap Submission

### Google Search Console

1. Go to https://search.google.com/search-console
2. Add property → **styleswap.com**
3. Verify ownership (DNS TXT record or HTML file)
4. Submit sitemap: **Settings** → **Sitemaps** → Add `https://styleswap.com/sitemap.xml`

### Bing Webmaster Tools

1. Go to https://www.bing.com/webmasters
2. Add site
3. Verify ownership
4. Submit sitemap

## 9. Analytics & Monitoring

### Google Analytics 4 Events

```typescript
// Track SEO-important events
gtag('event', 'page_view', {
  page_title: 'Product Page',
  page_location: window.location.href,
  page_path: window.location.pathname,
});

gtag('event', 'search', {
  search_term: 'blue dress',
});
```

### Search Console API

Monitor SEO performance programmatically:

```typescript
// lib/search-console.ts
export async function getSearchAnalytics(startDate: string, endDate: string) {
  const response = await fetch(
    `https://www.googleapis.com/webmasters/v3/sites/${siteUrl}/searchAnalytics/query`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        startDate,
        endDate,
        dimensions: ['query', 'page'],
        rowLimit: 1000,
      }),
    }
  );
  
  return response.json();
}
```

## 10. Content Optimization

### Heading Hierarchy

```tsx
// ✅ GOOD - Proper hierarchy
<h1>Main Title</h1>
<h2>Section Title</h2>
<h3>Subsection</h3>

// ❌ BAD - Skipping levels
<h1>Main Title</h1>
<h3>Subsection</h3>
```

### Alt Text for Images

```tsx
// ✅ GOOD - Descriptive
<Image src="/dress.jpg" alt="Blue summer dress with floral pattern, size M" />

// ❌ BAD - Generic or missing
<Image src="/dress.jpg" alt="image" />
<Image src="/dress.jpg" alt="" />
```

### Internal Linking

```tsx
// Good internal link structure
<Link href="/category/dresses">
  <a>Browse Dresses</a>
</Link>

// Use descriptive anchor text
<Link href="/blog/sustainable-fashion">
  <a>Learn about sustainable fashion practices</a>
</Link>
```

## 11. International SEO (Optional)

### Hreflang Tags

```tsx
// pages/_document.tsx
<Head>
  <link rel="alternate" hrefLang="en" href="https://styleswap.com/en" />
  <link rel="alternate" hrefLang="es" href="https://styleswap.com/es" />
  <link rel="alternate" hrefLang="fr" href="https://styleswap.com/fr" />
  <link rel="alternate" hrefLang="x-default" href="https://styleswap.com" />
</Head>
```

## 12. SEO Checklist

Before launch:

- [ ] All pages have unique title tags
- [ ] All pages have meta descriptions (150-160 chars)
- [ ] Canonical URLs set on all pages
- [ ] Sitemap.xml generated and submitted
- [ ] Robots.txt configured
- [ ] Structured data (JSON-LD) on key pages
- [ ] Open Graph tags on all pages
- [ ] Twitter Card tags on all pages
- [ ] All images have alt text
- [ ] Heading hierarchy is correct (H1 → H2 → H3)
- [ ] Mobile-friendly (viewport meta tag)
- [ ] HTTPS enabled
- [ ] Google Search Console verified
- [ ] Bing Webmaster Tools verified
- [ ] 404 page exists and is helpful
- [ ] Internal linking structure optimized

## 13. Testing Tools

### Automated Testing

```bash
# Run Lighthouse
npx lighthouse https://styleswap.com --view

# Check structured data
curl "https://validator.schema.org/validate?url=https://styleswap.com"
```

### Manual Testing

- **Google Rich Results Test**: https://search.google.com/test/rich-results
- **Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly
- **PageSpeed Insights**: https://pagespeed.web.dev
- **Meta Tags Checker**: https://metatags.io
- **Structured Data Testing**: https://validator.schema.org

## Troubleshooting

### Sitemap Not Indexing

- Check robots.txt allows crawling
- Verify sitemap URL is correct
- Check for XML errors
- Resubmit in Search Console

### Low SEO Score

- Check meta tags are present
- Verify heading hierarchy
- Add alt text to images
- Improve page speed

### Structured Data Errors

- Test with Google Rich Results Test
- Validate JSON syntax
- Check required properties are present

## Next Steps

✅ SEO fully configured  
➡️ **Next**: Pre-launch checklist in `08-launch-checklist.md`
