# Style Swap - Quick Start Guide

**Get from zero to production in under 2 hours** ⚡

## 🎯 Prerequisites (5 minutes)

- [ ] GitHub repository with Next.js app
- [ ] Vercel account (free tier works)
- [ ] Domain name (optional but recommended)
- [ ] Node.js 18+ installed
- [ ] Git installed

## ⚡ Speed Run (30 minutes minimum viable deployment)

### Step 1: Vercel Setup (10 minutes)

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Link your project
cd /path/to/your/style-swap-app
vercel link

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

✅ **Checkpoint**: Your site is now live at `your-app.vercel.app`

### Step 2: Environment Variables (5 minutes)

```bash
# Copy the template
cp configs/.env.example .env.local

# Edit with your values
# At minimum, set:
# - NEXT_PUBLIC_SITE_URL
# - DATABASE_URL
# - NEXTAUTH_SECRET (generate with: openssl rand -hex 32)

# Add to Vercel
vercel env add NEXT_PUBLIC_SITE_URL production
vercel env add DATABASE_URL production
vercel env add NEXTAUTH_SECRET production
# ... add others as needed

# Redeploy
vercel --prod
```

✅ **Checkpoint**: App has access to environment variables

### Step 3: Custom Domain (10 minutes)

1. **Vercel Dashboard** → Your Project → **Settings** → **Domains**
2. Add your domain: `styleswap.com`
3. Follow DNS instructions (use Vercel nameservers for easiest setup)
4. Wait for SSL (5-15 minutes)

✅ **Checkpoint**: Site accessible at your custom domain with HTTPS

### Step 4: Basic Monitoring (5 minutes)

```bash
# Sign up for Sentry (free tier)
# https://sentry.io

# Install Sentry
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs

# Add Sentry DSN to Vercel
vercel env add NEXT_PUBLIC_SENTRY_DSN production

# Redeploy
vercel --prod
```

✅ **Checkpoint**: Error tracking is active

---

## 🚀 Full Production Setup (2 hours)

### Phase 1: Infrastructure (30 minutes)

1. **Complete Vercel setup** → `docs/01-vercel-setup.md`
   - Copy `configs/vercel.json` to your project root
   - Configure deployment settings

2. **Custom domain + SSL** → `docs/02-domain-dns.md`
   - Point domain to Vercel
   - Enable SSL (automatic)
   - Set up www redirect

3. **Environment variables** → `docs/03-environment-vars.md`
   - Copy all required variables to Vercel
   - Set up different values for preview/production
   - Generate secure secrets

### Phase 2: CI/CD (30 minutes)

1. **GitHub Actions** → `docs/04-cicd-pipeline.md`
   - Copy workflow files from `configs/` to `.github/workflows/`
   - Add required GitHub secrets
   - Test with a PR

2. **Scripts** → `scripts/README.md`
   - Copy scripts to your project
   - Make executable: `chmod +x scripts/*.sh`
   - Test deployment script

### Phase 3: Monitoring & Performance (30 minutes)

1. **Monitoring** → `docs/05-monitoring.md`
   - Set up Sentry (if not already done)
   - Set up Google Analytics 4
   - Enable Vercel Analytics
   - Configure uptime monitoring

2. **Performance** → `docs/06-performance.md`
   - Copy `configs/next.config.js` (merge with existing)
   - Optimize images
   - Set up fonts
   - Run Lighthouse test

### Phase 4: SEO & Launch (30 minutes)

1. **SEO Setup** → `docs/07-seo-setup.md`
   - Install next-sitemap: `npm install next-sitemap`
   - Copy `configs/next-sitemap.config.js`
   - Add SEO component to pages
   - Generate sitemap

2. **Pre-Launch** → `docs/08-launch-checklist.md`
   - Go through full checklist
   - Test all critical functionality
   - Verify monitoring is working

3. **Launch!** 🎉
   - Deploy to production
   - Monitor for first 30 minutes
   - Celebrate success

---

## 📋 15-Minute Health Check

Run this after any deployment:

```bash
# 1. Health check
node scripts/health-check.js

# 2. Check Lighthouse score
npx lighthouse https://styleswap.com --view

# 3. Check Sentry
# Visit https://sentry.io → Check for new errors

# 4. Check Analytics
# Visit Vercel dashboard → Analytics tab

# 5. Manual smoke test
# - Visit homepage
# - Test login
# - Test critical feature
# - Check mobile view
```

---

## 🆘 Emergency Procedures

### Site is Down

```bash
# 1. Check Vercel status
open https://vercel-status.com

# 2. Check deployment logs
vercel logs

# 3. Rollback if needed
./scripts/rollback.sh [previous-deployment-url]
```

### High Error Rate

```bash
# 1. Check Sentry for errors
open https://sentry.io

# 2. View recent deployments
vercel ls

# 3. Rollback if critical
./scripts/rollback.sh [last-good-deployment]
```

---

## 🎓 Common Tasks

### Deploy New Version

```bash
# Option 1: Auto-deploy (recommended)
git push origin main  # Triggers GitHub Actions

# Option 2: Manual deploy
./scripts/deploy.sh production
```

### Add Environment Variable

```bash
vercel env add VARIABLE_NAME production
# Enter value when prompted
vercel --prod  # Redeploy to apply
```

### View Logs

```bash
vercel logs  # Interactive selection
vercel logs [deployment-url]  # Specific deployment
```

### Run Tests Locally

```bash
npm run test
npm run lint
npm run type-check
npm run build
```

---

## 📊 Success Criteria

Your deployment is successful when:

- ✅ Site loads at custom domain with HTTPS
- ✅ Environment variables configured
- ✅ CI/CD pipeline runs on PRs
- ✅ Monitoring captures errors
- ✅ Lighthouse score > 90 (aim for 95+)
- ✅ Rollback procedure tested
- ✅ Team knows emergency procedures

---

## 🔄 Daily Operations

### Morning Check (5 minutes)

```bash
# 1. Check error rate in Sentry
# 2. Review analytics in Vercel
# 3. Check uptime monitor
# 4. Review support tickets
```

### Before Every Deploy (10 minutes)

```bash
# 1. Run tests
npm run test:ci

# 2. Check build
npm run build

# 3. Review changes
git log --oneline -10

# 4. Deploy to preview first
vercel

# 5. Test preview deployment

# 6. Deploy to production
./scripts/deploy.sh production
```

### After Deploy (15 minutes)

```bash
# 1. Health check
node scripts/health-check.js

# 2. Monitor errors (first 15 min)
# Watch Sentry dashboard

# 3. Check key metrics
# - Response times
# - Error rate
# - User activity

# 4. Test critical paths
# - Login
# - Checkout
# - Key features
```

---

## 🎯 Next Steps After Quick Start

1. **Read full documentation** → `docs/` folder
2. **Optimize performance** → `docs/06-performance.md`
3. **Implement full SEO** → `docs/07-seo-setup.md`
4. **Set up database backups**
5. **Configure staging environment**
6. **Train team on procedures**

---

## 📚 Key Files Reference

| File | Purpose | Location |
|------|---------|----------|
| `vercel.json` | Deployment config | Project root |
| `next.config.js` | Next.js config | Project root |
| `.env.local` | Local env vars | Project root (gitignored) |
| `next-sitemap.config.js` | Sitemap config | Project root |
| CI/CD workflows | GitHub Actions | `.github/workflows/` |
| Deployment scripts | Automation | `scripts/` |

---

## ⚡ Speed Tips

### Fastest Path to Production

1. ✅ Vercel CLI deploy (5 min)
2. ✅ Set 3 critical env vars (5 min)
3. ✅ Add domain (10 min)
4. ✅ Basic monitoring (5 min)
5. ✅ Deploy! (1 min)

**Total**: ~26 minutes to live site

### Fastest Rollback

```bash
vercel ls  # Find previous deployment
vercel promote [url] --prod  # Promote it
# Total: ~30 seconds
```

### Fastest Health Check

```bash
node scripts/health-check.js
# Total: ~5 seconds
```

---

## 🎉 You're Ready!

You now have:
- ✅ Live production site
- ✅ Automated deployments
- ✅ Error monitoring
- ✅ Rollback capability
- ✅ Performance optimization
- ✅ SEO foundation

**Keep this guide bookmarked for reference!**

For detailed information on any topic, see the full documentation in `docs/`.

---

**Questions?** Check `DEPLOYMENT-SUMMARY.md` or specific docs in `docs/` folder.

**Good luck with your launch!** 🚀
