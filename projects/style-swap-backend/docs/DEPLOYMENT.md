# Deployment Guide

Step-by-step guide to deploy Style Swap to production.

## Overview

- **Database:** Supabase (already cloud-hosted)
- **API:** Deploy to Vercel, Railway, or Heroku
- **Admin Panel:** Deploy to Vercel or Netlify

---

## Database (Supabase)

Your Supabase database is already production-ready! Just a few optimizations:

### 1. Enable Point-in-Time Recovery

In Supabase Dashboard:
1. Go to Settings → Database
2. Enable "Point in Time Recovery" (requires Pro plan)
3. This allows you to restore to any point in the last 7 days

### 2. Set Up Automated Backups

Supabase automatically backs up your database daily, but you can:
1. Download manual backups: Settings → Database → Download Backup
2. Store backups in S3 for extra safety

### 3. Review RLS Policies

Make sure Row Level Security policies are correct:
```sql
-- Check policies
SELECT * FROM pg_policies;

-- Make sure admin access is properly restricted
-- Public should only read active, published products
```

### 4. Connection Pooling

For high traffic:
1. Settings → Database → Connection Pooling
2. Note the pooler connection string
3. Use this in production for better performance

---

## API Deployment

### Option 1: Vercel (Recommended)

**Step 1:** Install Vercel CLI
```bash
npm i -g vercel
```

**Step 2:** Create `vercel.json` in the `api/` folder:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ]
}
```

**Step 3:** Deploy
```bash
cd api
vercel
```

**Step 4:** Set Environment Variables
```bash
vercel env add SUPABASE_URL
vercel env add SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add ALLOWED_ORIGINS
```

Or set in Vercel dashboard: Settings → Environment Variables

**Step 5:** Deploy to production
```bash
vercel --prod
```

Your API is now live at `https://your-api.vercel.app`!

### Option 2: Railway

**Step 1:** Create account at https://railway.app

**Step 2:** Install Railway CLI
```bash
npm i -g @railway/cli
railway login
```

**Step 3:** Initialize project
```bash
cd api
railway init
```

**Step 4:** Set environment variables
```bash
railway variables set SUPABASE_URL=your-url
railway variables set SUPABASE_ANON_KEY=your-key
railway variables set SUPABASE_SERVICE_ROLE_KEY=your-key
railway variables set ALLOWED_ORIGINS=https://admin.yoursite.com
```

**Step 5:** Deploy
```bash
railway up
```

Railway will automatically:
- Detect Node.js
- Install dependencies
- Run `npm start`
- Provide a public URL

### Option 3: Heroku

**Step 1:** Install Heroku CLI
```bash
npm i -g heroku
heroku login
```

**Step 2:** Create app
```bash
cd api
heroku create your-app-name
```

**Step 3:** Set environment variables
```bash
heroku config:set SUPABASE_URL=your-url
heroku config:set SUPABASE_ANON_KEY=your-key
heroku config:set SUPABASE_SERVICE_ROLE_KEY=your-key
heroku config:set ALLOWED_ORIGINS=https://admin.yoursite.com
```

**Step 4:** Deploy
```bash
git init
git add .
git commit -m "Initial commit"
git push heroku main
```

---

## Admin Panel Deployment

### Option 1: Vercel (Recommended)

**Step 1:** Update API URL in `admin/src/config.js`:
```javascript
export const API_URL = process.env.VITE_API_URL || 'https://your-api.vercel.app';
```

**Step 2:** Update axios base URL in components:
```javascript
import axios from 'axios';
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'https://your-api.vercel.app/api';
```

**Step 3:** Build the admin panel
```bash
cd admin
npm run build
```

**Step 4:** Deploy to Vercel
```bash
vercel
```

**Step 5:** Set environment variable
```bash
vercel env add VITE_API_URL
# Enter: https://your-api.vercel.app
```

**Step 6:** Deploy to production
```bash
vercel --prod
```

### Option 2: Netlify

**Step 1:** Build the admin panel
```bash
cd admin
npm run build
```

**Step 2:** Install Netlify CLI
```bash
npm i -g netlify-cli
netlify login
```

**Step 3:** Deploy
```bash
netlify deploy --prod --dir=dist
```

**Step 4:** Set environment variables
In Netlify Dashboard:
- Site Settings → Environment Variables
- Add `VITE_API_URL` = `https://your-api.vercel.app`

**Step 5:** Redeploy to apply env vars

### Option 3: Custom VPS

**Requirements:**
- Nginx or Apache
- Node.js (for build only)
- SSL certificate

**Step 1:** Build locally
```bash
cd admin
npm run build
```

**Step 2:** Upload `dist/` folder to server
```bash
scp -r dist/* user@yourserver:/var/www/admin
```

**Step 3:** Configure Nginx
```nginx
server {
    listen 80;
    server_name admin.yoursite.com;

    root /var/www/admin;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # API proxy (optional)
    location /api/ {
        proxy_pass https://your-api.vercel.app/api/;
    }
}
```

**Step 4:** Enable HTTPS with Let's Encrypt
```bash
sudo certbot --nginx -d admin.yoursite.com
```

---

## Custom Domain Setup

### Vercel
1. Go to project settings
2. Domains → Add Domain
3. Follow DNS setup instructions
4. Add CNAME or A record to your DNS

### Railway
1. Settings → Domains
2. Add custom domain
3. Update DNS with provided CNAME

---

## Environment Variables Checklist

### API
- ✅ `SUPABASE_URL`
- ✅ `SUPABASE_ANON_KEY`
- ✅ `SUPABASE_SERVICE_ROLE_KEY`
- ✅ `NODE_ENV=production`
- ✅ `ALLOWED_ORIGINS` (comma-separated)
- ✅ `RATE_LIMIT_WINDOW_MS` (optional)
- ✅ `RATE_LIMIT_MAX_REQUESTS` (optional)

### Admin Panel
- ✅ `VITE_API_URL`

---

## Post-Deployment Checklist

### API
- [ ] Test all endpoints with production URL
- [ ] Verify CORS settings
- [ ] Check rate limiting works
- [ ] Monitor error logs
- [ ] Set up uptime monitoring (e.g., UptimeRobot)

### Admin Panel
- [ ] Test all CRUD operations
- [ ] Verify images load correctly
- [ ] Check analytics dashboard
- [ ] Test on mobile devices
- [ ] Set up Google Analytics (optional)

### Database
- [ ] Verify RLS policies are active
- [ ] Check indexes for performance
- [ ] Monitor query performance in Supabase
- [ ] Set up alerts for high usage

---

## Monitoring & Logging

### Vercel
- Built-in analytics and logging
- View logs: `vercel logs`

### Railway
- Built-in observability dashboard
- Real-time logs in dashboard

### Supabase
- Database logs in dashboard
- API logs for debugging queries
- Set up alerts for errors

### Recommended Tools
- **Uptime:** UptimeRobot, Pingdom
- **APM:** Sentry for error tracking
- **Analytics:** Google Analytics, Plausible

---

## Scaling Tips

### Database
1. **Indexes:** Already created in schema
2. **Caching:** Use Redis for frequently accessed data
3. **Read Replicas:** Available on Supabase Pro plan

### API
1. **Caching:** Implement Redis or in-memory cache
2. **Rate Limiting:** Already configured
3. **Horizontal Scaling:** Vercel/Railway handle automatically

### Admin Panel
1. **Static Files:** Already optimized with Vite
2. **CDN:** Vercel/Netlify provide CDN automatically
3. **Lazy Loading:** Already implemented with React Router

---

## Rollback Strategy

### Vercel
```bash
# List deployments
vercel ls

# Rollback to previous
vercel rollback [deployment-url]
```

### Railway
- Use the dashboard to rollback to previous deployment
- Or redeploy a previous commit

### Database
- Use Supabase backups to restore
- Or use Point-in-Time Recovery

---

## Security Checklist

- [ ] HTTPS enabled on all domains
- [ ] Environment variables secured (not in code)
- [ ] RLS policies tested and verified
- [ ] Service role key only used server-side
- [ ] CORS restricted to your domains
- [ ] Rate limiting enabled
- [ ] Regular security updates (npm audit)
- [ ] Secrets rotated periodically

---

## CI/CD Setup (Optional)

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy-api:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: cd api && npm install
      - run: cd api && vercel --prod --token=${{ secrets.VERCEL_TOKEN }}

  deploy-admin:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: cd admin && npm install
      - run: cd admin && npm run build
      - run: cd admin && vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

---

## Support

Need help with deployment?
- Check platform documentation (Vercel, Railway, etc.)
- Review error logs
- Ensure all environment variables are set
- Test locally first with production-like settings

Happy deploying! 🚀
