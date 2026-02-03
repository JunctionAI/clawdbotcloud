# Deployment Checklist

## ✅ Completed

- [x] GitHub repos created (backend + dashboard)
- [x] Railway backend deployed
- [x] Neon database provisioned
- [x] Stripe products created
- [x] Stripe webhook configured
- [x] Backend code pushed and live
- [x] Dashboard code pushed to GitHub

## ⏳ In Progress

- [ ] **Vercel dashboard deployment** - Tom deploying now

## 📝 Final Steps

### 1. Finish Vercel Deployment

**You're doing this now:**
1. Import `JunctionAI/clawdbot-dashboard` to Vercel
2. Framework: Next.js (auto-detected)
3. Add environment variables:
   ```
   NEXT_PUBLIC_API_URL=https://empathetic-dream-production-3f64.up.railway.app
   NEXT_PUBLIC_APP_URL=https://[YOUR-VERCEL-URL]
   STRIPE_SECRET_KEY=sk_live_xxxxx (use the key from Railway env vars)
   ```
4. Deploy!

**After deployment:**
1. Get your Vercel URL (e.g., `https://clawdbot-dashboard.vercel.app`)
2. Update `NEXT_PUBLIC_APP_URL` in Vercel env vars with the actual URL
3. Redeploy (Vercel → Deployments → Redeploy)

### 2. Test End-to-End Flow

**Test signup:**
1. Go to your Vercel URL
2. Click "Start Free Trial" on any plan
3. Use Stripe test card: `4242 4242 4242 4242` (test mode) OR real card (live mode)
4. Complete checkout
5. Verify redirect to success page
6. Check success page shows "provisioning..." then "ready"

**Verify backend:**
1. Check Railway logs - should see:
   ```
   ✅ Stripe event received: checkout.session.completed
   🎉 New customer checkout completed
   ✅ Customer stored in database
   🚀 Provisioning customer...
   ✅ Customer provisioned successfully
   📧 Sending welcome email
   ```

**Check database:**
1. Go to Neon dashboard
2. Query: `SELECT * FROM customers ORDER BY created_at DESC LIMIT 1`
3. Should see new customer with workspace_id, api_key, etc.

**Check email:**
- Welcome email should arrive (if Resend API key is set)
- If not set, check Railway logs for "Email would send"

### 3. Add Email Service (Optional but Recommended)

**Set up Resend:**
1. Go to https://resend.com (free tier: 100 emails/day)
2. Sign up
3. Get API key
4. Railway → Environment Variables → Add:
   ```
   RESEND_API_KEY=re_xxxxx
   ```
5. Verify domain (setupclaw.com) or use their test domain

**After adding:**
- Customers will receive actual welcome emails
- Payment failure notifications will work
- Trial ending reminders will work

### 4. Set Up Domain (Optional)

**Custom domain for dashboard:**
1. Vercel → Project Settings → Domains
2. Add `setupclaw.com` (or `app.setupclaw.com`)
3. Update DNS records as instructed
4. Update `NEXT_PUBLIC_APP_URL` to new domain

**Custom domain for backend (optional):**
1. Railway → Project → Settings → Domains
2. Add `api.setupclaw.com`
3. Update DNS records
4. Update `NEXT_PUBLIC_API_URL` in Vercel

---

## 🧪 Test Scenarios

### Happy Path
1. User clicks "Start Free Trial"
2. Enters card info
3. Checkout succeeds
4. Redirects to success page
5. Provisioning completes (~10-30 seconds)
6. Shows workspace credentials
7. Welcome email arrives
8. Customer can access dashboard (once built)

### Edge Cases to Test
- [ ] Stripe checkout canceled (should return to homepage)
- [ ] Payment declined (Stripe shows error, no provisioning)
- [ ] Provisioning fails (success page shows error message)
- [ ] Database connection fails (500 error, logged)
- [ ] Webhook signature invalid (400 error, logged)

---

## 🚨 Troubleshooting

### Success page stuck on "provisioning..."
**Check:**
1. Railway logs for errors
2. Database - does customer exist?
3. `/api/status?session=xxx` endpoint response

### Webhook not firing
**Check:**
1. Stripe Dashboard → Webhooks → Event logs
2. Railway logs for incoming POST /webhook/stripe
3. Webhook secret matches between Stripe & Railway

### Emails not sending
**Check:**
1. Railway env vars - is `RESEND_API_KEY` set?
2. Railway logs - does it say "Email would send" or actual API error?
3. Resend dashboard - any failures?

### Database errors
**Check:**
1. Neon dashboard - is database awake? (free tier sleeps)
2. Railway logs - connection error details
3. `DATABASE_URL` env var - correct format?

---

## 🎉 Launch Checklist

Before telling anyone:
- [ ] Dashboard live and accessible
- [ ] End-to-end signup works (tested with real card)
- [ ] Success page shows credentials
- [ ] Welcome email sends
- [ ] Railway backend stable (no crashes in logs)
- [ ] Stripe webhooks firing correctly

Before marketing:
- [ ] Custom domain configured
- [ ] Email service working
- [ ] Customer can actually access their workspace
- [ ] Billing cancellation works
- [ ] Support email setup (support@setupclaw.com)

---

**Current Status: 95% complete. Just need Vercel deployment! 🚀**
