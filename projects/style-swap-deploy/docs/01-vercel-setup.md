# 01 - Vercel Project Setup

Complete guide to setting up Style Swap on Vercel.

## Prerequisites

- GitHub repository with your Next.js app
- Vercel account (free tier works)
- Git installed locally

## Step 1: Install Vercel CLI

```bash
npm install -g vercel
# or
yarn global add vercel
```

## Step 2: Login to Vercel

```bash
vercel login
```

Follow the email verification process.

## Step 3: Link Your Project

From your project root:

```bash
cd /path/to/style-swap
vercel link
```

Answer the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Your personal account or team
- **Link to existing project?** → No (first time) / Yes (if exists)
- **What's your project's name?** → `style-swap`
- **In which directory is your code located?** → `./`

## Step 4: Configure Vercel Project

### A. Via Vercel Dashboard (Recommended for first-time)

1. Go to https://vercel.com/dashboard
2. Click **Add New** → **Project**
3. Import your GitHub repository
4. Configure build settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (or your app directory)
   - **Build Command**: `npm run build` or `yarn build`
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `npm install` or `yarn install`

### B. Via vercel.json (Configuration as Code)

Create `vercel.json` in your project root (see `../configs/vercel.json`):

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "outputDirectory": ".next",
  "regions": ["syd1"],
  "env": {
    "NODE_ENV": "production"
  },
  "build": {
    "env": {
      "NEXT_PUBLIC_SITE_URL": "@site_url"
    }
  },
  "headers": [
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
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        }
      ]
    },
    {
      "source": "/fonts/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/_next/static/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/api/:path*"
    }
  ]
}
```

## Step 5: Deploy to Production

### Manual Deployment

```bash
vercel --prod
```

### Automatic Deployment (GitHub Integration)

Once connected to GitHub:
- **Push to `main`** → Automatic production deployment
- **Push to other branches** → Preview deployment
- **Pull requests** → Preview deployment with unique URL

## Step 6: Verify Deployment

After deployment:

1. **Check build logs** in Vercel dashboard
2. **Visit deployment URL** (e.g., `style-swap.vercel.app`)
3. **Test functionality** - Click through key features
4. **Check console** for errors (F12 in browser)

## Step 7: Configure Production Domain

See `02-domain-dns.md` for custom domain setup.

## Deployment Commands Reference

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# List deployments
vercel ls

# View deployment logs
vercel logs [deployment-url]

# Remove deployment
vercel rm [deployment-url]

# Get deployment info
vercel inspect [deployment-url]
```

## Environment-Specific Settings

### Development
```bash
vercel env add NEXT_PUBLIC_API_URL development
```

### Preview (Staging)
```bash
vercel env add NEXT_PUBLIC_API_URL preview
```

### Production
```bash
vercel env add NEXT_PUBLIC_API_URL production
```

## Troubleshooting

### Build Fails
- Check Node.js version matches your local environment
- Verify all dependencies are in `package.json`
- Check build logs for specific errors

### Environment Variables Not Working
- Prefix client-side vars with `NEXT_PUBLIC_`
- Redeploy after adding new env vars
- Check variable names match exactly

### 404 Errors
- Ensure `vercel.json` rewrites are configured
- Check your Next.js routing setup
- Verify build output directory is correct

## Next Steps

✅ Vercel project configured  
➡️ **Next**: Set up custom domain in `02-domain-dns.md`
