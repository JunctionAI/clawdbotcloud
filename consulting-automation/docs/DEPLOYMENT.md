# Deployment Guide

Complete guide to deploying your consulting automation system to production.

---

## 🚀 Quick Deploy (Recommended)

### Backend: Railway.app (Free tier available)

1. **Create Railway account**: https://railway.app
2. **Create new project** → "Deploy from GitHub repo"
3. **Connect your repo** or upload `backend/` folder
4. **Add environment variables** (from `.env.example`)
5. **Deploy!** Railway will auto-detect Node.js and run

**Cost:** Free for starter, ~$5-10/month for production

---

### Frontend: Vercel (Free)

1. **Create Vercel account**: https://vercel.com
2. **New Project** → Upload `frontend/` folder
3. **Deploy** → Get instant domain (e.g., `consulting-automation.vercel.app`)
4. **Custom domain** (optional): Add your domain in settings

**Cost:** Free

---

## 📋 Alternative Deployment Options

### Backend Options

#### **1. Render.com** (Similar to Railway)
- Free tier available
- Auto-deploys from GitHub
- Built-in database backups
- ~$7/month for production

#### **2. Fly.io**
- Free tier: 3 shared-cpu VMs
- Global edge deployment
- Great for NZ/AU latency

#### **3. DigitalOcean App Platform**
- $5/month starter tier
- More control than Railway
- Managed databases available

#### **4. VPS (Advanced)**
- DigitalOcean Droplet: $6/month
- Linode: $5/month
- Requires manual setup (Docker recommended)

### Frontend Options

#### **1. Netlify** (Alternative to Vercel)
- Free tier
- Forms + serverless functions included
- Great for static sites

#### **2. Cloudflare Pages**
- Free unlimited sites
- Fast global CDN
- Custom domains free

#### **3. GitHub Pages**
- Free for public repos
- Simple setup
- Good for testing

---

## 🔧 Detailed Setup

### 1. Prepare Backend

```bash
cd consulting-automation/backend

# Install dependencies
npm install

# Create production .env
cp .env.example .env
nano .env  # Fill in your values

# Initialize database
npm run init-db

# Test locally
npm start
# Should see: "🚀 Consulting Automation API running on port 3001"
```

### 2. Configure Environment Variables

**Required:**
```env
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com
```

**Email (choose one):**
```env
# SendGrid (recommended)
EMAIL_PROVIDER=sendgrid
EMAIL_API_KEY=SG.xxx  # Get from sendgrid.com
EMAIL_FROM=tom@junctionmedia.ai

# OR Mailgun
EMAIL_PROVIDER=mailgun
EMAIL_API_KEY=key-xxx
EMAIL_DOMAIN=mg.yourdomain.com
EMAIL_FROM=tom@junctionmedia.ai
```

**Payments:**
```env
# Stripe (get from stripe.com/dashboard)
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_PUBLISHABLE_KEY=pk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

**Notifications (optional but recommended):**
```env
# Discord webhook for high-value leads
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/xxx

# Telegram for mobile alerts
TELEGRAM_BOT_TOKEN=xxx  # Get from @BotFather
TELEGRAM_CHAT_ID=xxx    # Your chat ID
```

### 3. Deploy Backend to Railway

```bash
# Option A: CLI
npm install -g @railway/cli
railway login
railway init
railway up

# Option B: GitHub
# Push to GitHub, then connect Railway to your repo
```

### 4. Deploy Frontend to Vercel

```bash
# Option A: CLI
npm install -g vercel
cd ../frontend
vercel

# Option B: Web UI
# Drag & drop frontend/ folder to vercel.com
```

### 5. Update Frontend URLs

In each `landing-*.html` file, update the API URL:

```javascript
// Change this:
const response = await fetch('http://localhost:3001/api/leads', {

// To this:
const response = await fetch('https://your-backend-url.railway.app/api/leads', {
```

### 6. Configure CORS

In `backend/server.js`, update CORS settings:

```javascript
app.use(cors({
  origin: [
    'https://your-frontend-domain.vercel.app',
    'https://yourdomain.com'  // If using custom domain
  ]
}));
```

---

## 🔒 Security Checklist

- [ ] Environment variables are set (never commit `.env`)
- [ ] CORS configured to only allow your frontend domain
- [ ] Rate limiting enabled (default: 100 req/15min)
- [ ] Helmet.js security headers enabled
- [ ] Database file has proper permissions
- [ ] Email API keys are production keys (not test)
- [ ] Stripe webhook secret configured
- [ ] HTTPS enabled (automatic on Railway/Vercel)

---

## 📧 Email Setup

### SendGrid (Recommended)

1. **Create account**: https://sendgrid.com (free tier: 100 emails/day)
2. **Verify sender email**: Settings → Sender Authentication
3. **Create API key**: Settings → API Keys → Create
4. **Add to `.env`**: `EMAIL_API_KEY=SG.xxx`

**Upgrade:** $15/month for 40k emails, $90/month for 100k emails

### Mailgun (Alternative)

1. **Create account**: https://mailgun.com (free tier: 5k emails/month)
2. **Verify domain**: Domains → Add Domain
3. **Get API key**: Settings → API Keys
4. **Add to `.env`**: `EMAIL_API_KEY=key-xxx`

---

## 💳 Stripe Setup

1. **Create account**: https://stripe.com
2. **Get API keys**: Developers → API Keys
3. **Test mode first**: Use `sk_test_` keys for testing
4. **Production**: Switch to `sk_live_` when ready
5. **Webhooks**: 
   - Add endpoint: `https://your-backend-url.railway.app/api/webhooks/stripe`
   - Listen for: `payment_intent.succeeded`, `payment_intent.failed`
   - Copy webhook secret to `.env`

**Pricing:** 2.9% + 30¢ per transaction (NZ)

---

## 📊 Monitoring & Analytics

### Google Analytics

Add to each landing page (before `</head>`):

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Backend Monitoring

**Option 1: Railway Built-in**
- Metrics tab shows CPU, memory, requests
- Logs tab for debugging

**Option 2: Sentry (Error tracking)**
```bash
npm install @sentry/node
```

Add to `server.js`:
```javascript
const Sentry = require('@sentry/node');
Sentry.init({ dsn: 'https://xxx@sentry.io/xxx' });
```

---

## 🔄 CI/CD (Auto-Deploy)

### GitHub Actions (Automatic)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Railway
        run: |
          npm install -g @railway/cli
          railway up
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
```

**Railway auto-deploys** from GitHub by default (no config needed).

---

## 🧪 Testing Before Launch

### Backend Health Check

```bash
curl https://your-backend-url.railway.app/health
# Should return: {"status":"ok","timestamp":"..."}
```

### Lead Submission Test

```bash
curl -X POST https://your-backend-url.railway.app/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Lead",
    "email": "test@example.com",
    "company": "Test Co",
    "budget_range": "5k-10k",
    "urgency": "immediate",
    "service_interest": "clawdbot",
    "source": "test"
  }'
```

### Frontend Test

1. Open landing page in browser
2. Fill out form
3. Submit
4. Check backend logs for new lead
5. Check database: `SELECT * FROM leads ORDER BY created_at DESC LIMIT 1`

---

## 🚨 Troubleshooting

### "Cannot connect to backend"
- Check CORS settings in `server.js`
- Verify `FRONTEND_URL` in backend `.env`
- Check Railway logs for errors

### "Database locked"
- SQLite doesn't handle concurrent writes well
- Consider PostgreSQL for production:
  ```bash
  railway add -p your-project-name
  railway add plugin postgresql
  ```

### "Email not sending"
- Check `EMAIL_API_KEY` is correct
- Verify sender email is authenticated
- Check SendGrid/Mailgun logs

### "Form submission fails"
- Open browser console (F12) for error details
- Check API URL is correct in landing page
- Verify backend is running

---

## 💰 Monthly Costs (Estimated)

| Service | Tier | Cost |
|---------|------|------|
| **Railway** (backend) | Starter | $5-10/month |
| **Vercel** (frontend) | Free | $0 |
| **SendGrid** | Free → Essentials | $0 → $15/month |
| **Stripe** | Pay-as-you-go | 2.9% per transaction |
| **Domain** | Namecheap/Cloudflare | $10-15/year |
| **Total** | | ~$20-30/month |

**ROI:** First Clawdbot setup ($1k-2.5k) covers ~2-5 years of hosting 🚀

---

## 🎯 Post-Launch Checklist

- [ ] Backend deployed & health check passes
- [ ] Frontend deployed & form submission works
- [ ] Test lead → proposal → acceptance flow
- [ ] Email sequences configured
- [ ] Stripe payments tested
- [ ] Google Analytics installed
- [ ] Meta ads campaigns created
- [ ] SEO meta tags added
- [ ] LinkedIn post announcing launch
- [ ] Reach out to 10 warm leads

---

## 📞 Support

Issues? Contact:
- **Tom Hall-Taylor**
- Email: tom@junctionmedia.ai
- Discord: (your handle)

---

**You're ready to launch. Let's get to $20k/month! 🚀**
