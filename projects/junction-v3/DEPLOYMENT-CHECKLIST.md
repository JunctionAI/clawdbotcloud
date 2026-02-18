# Junction Media — Deployment Checklist

## Status: Site is built. Waiting on 2 blockers to go live.

---

## 🔴 CRITICAL BLOCKERS (Do These First)

### 1. GitHub Push (5 min)
The site has 109+ commits that aren't on GitHub yet.

```bash
# Option A: Simple push (may trigger browser auth)
git push origin main

# Option B: If that hangs, generate a PAT:
# 1. Go to github.com/settings/tokens
# 2. Generate new token (classic) with 'repo' scope
# 3. Run:
git remote set-url origin https://YOUR_PAT@github.com/JunctionAI/clawdbotcloud.git
git push origin main
```

### 2. GoDaddy DNS (5 min)
Point the domain to Vercel.

1. Log in to GoDaddy > DNS Management for `junctionmedia.ai`
2. Add/Edit **A record**:
   - Name: `@`
   - Value: `76.76.21.21`
   - TTL: 600
3. Add **CNAME record**:
   - Name: `www`
   - Value: `cname.vercel-dns.com`
   - TTL: 600
4. DNS propagates in 5-60 minutes

---

## 🟡 HIGH PRIORITY (Same Day as Launch)

### 3. Vercel Environment Variables
In Vercel Dashboard > Settings > Environment Variables:
- `NEXT_PUBLIC_GA4_ID` = your GA4 Measurement ID (from analytics.google.com)
- See `.env.example` for all variables

### 4. Google Analytics 4 Setup (15 min)
1. Go to analytics.google.com
2. Create property for `junctionmedia.ai`
3. Get Measurement ID (format: `G-XXXXXXXXXX`)
4. Add to Vercel env vars as `NEXT_PUBLIC_GA4_ID`
5. Redeploy (auto-triggers on new push)

### 5. Google Search Console (10 min)
1. Go to search.google.com/search-console
2. Add property: `https://www.junctionmedia.ai`
3. Verify via DNS TXT record (GoDaddy DNS > Add TXT record)
4. Submit sitemap: `https://www.junctionmedia.ai/sitemap.xml`

---

## 🟢 IMPORTANT (First Week)

### 6. Google Business Profile (15 min — BIG local SEO win)
1. Go to business.google.com
2. Create profile for "Junction Media"
3. Category: "Marketing Agency"
4. Address: Auckland, NZ (service area based)
5. Website: junctionmedia.ai
6. Verify by phone or postcard

### 7. Verify Hero Stat
- Current: "15+ Years Experience" — confirm this is accurate
- If not: update in `src/app/page.tsx` (search "Years Experience")

### 8. LinkedIn + X Handles
Update in `src/app/page.tsx` and relevant pages:
- LinkedIn: confirm exact URL (linkedin.com/in/YOUR_HANDLE)
- X: confirm exact handle

### 9. DBH Testimonial
- Get written permission from Christy to use the "30% sales record" result
- Once confirmed, can upgrade from "Case studies on request" to named testimonial

---

## 🔵 NICE TO HAVE (First Month)

### 10. Resend Integration (Apply Form) ✅ BUILT
The `/api/apply` route is live with mailto fallback.
To activate email delivery:
1. Sign up at resend.com (free tier: 100 emails/day)
2. Go to resend.com > API Keys > Create API Key
3. Copy the key (starts with `re_`)
4. In Vercel Dashboard > Settings > Environment Variables
5. Add: `RESEND_API_KEY` = your key
6. Redeploy — applications will now arrive directly in tom@junctionmedia.ai

### 11. LinkedIn Content
`LINKEDIN-CONTENT-READY.md` has 7 ready-to-post pieces.
Post #1 (DBH result) can go live TODAY — no site needed.

### 12. Client Acquisition
`CLIENT-ACQUISITION-PLAYBOOK.md` has full LinkedIn DM sequences.
Start Day 1 outreach immediately — don't wait for site traffic.

---

## 📊 Post-Launch Tracking

Once live, check weekly:
- GA4: traffic sources, pages, conversions
- Search Console: impressions, clicks, keywords
- Apply form submissions (check tom@junctionmedia.ai)

**Goal: First organic lead within 30 days of launch.**

---

*Last updated: 2026-02-19 by Junction Media Agent*
