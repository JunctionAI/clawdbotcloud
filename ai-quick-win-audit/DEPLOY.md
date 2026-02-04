# AI Quick Win Audit Landing Page - Deployment Guide

## 🚀 Quick Deploy (5 minutes)

### Option 1: GitHub Pages (Recommended - FREE)

1. **Create GitHub repo:**
   ```bash
   cd ai-quick-win-audit
   git init
   git add .
   git commit -m "Initial landing page"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/ai-quick-win-audit.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repo on GitHub
   - Settings → Pages
   - Source: Deploy from branch `main`, folder `/ (root)`
   - Save
   - Your site will be live at: `https://YOUR_USERNAME.github.io/ai-quick-win-audit/`

### Option 2: Netlify Drop (Even Faster - FREE)

1. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag and drop the `ai-quick-win-audit` folder
3. Get instant live URL (e.g., `https://random-name-123.netlify.app`)
4. Optional: Change to custom domain in Netlify settings

### Option 3: Vercel (FREE)

1. Install Vercel CLI: `npm i -g vercel`
2. In the `ai-quick-win-audit` folder: `vercel`
3. Follow prompts → Get live URL instantly

---

## 💳 Setup Stripe Payment Link (2 minutes)

1. **Log into Stripe Dashboard** → [https://dashboard.stripe.com](https://dashboard.stripe.com)

2. **Create Payment Link:**
   - Click "Payment links" in left sidebar
   - Click "Create payment link"
   - Product name: "AI Quick Win Audit"
   - Price: $97 USD (one-time payment)
   - Click "Create link"

3. **Get the URL:**
   - Copy the payment link (looks like: `https://buy.stripe.com/XXXXXXXX`)

4. **Update index.html:**
   - Find: `https://buy.stripe.com/YOUR_PAYMENT_LINK` (appears twice)
   - Replace with your actual Stripe payment link
   - Save and redeploy

---

## 📅 Setup Calendly Embed (2 minutes)

1. **Log into Calendly** → [https://calendly.com](https://calendly.com)

2. **Create Event Type:**
   - Click "Create" → "Event Type"
   - Name: "AI Quick Win Audit"
   - Duration: 60 minutes
   - Set your availability
   - Save

3. **Get Scheduling Link:**
   - Click on your event
   - Copy the link (looks like: `https://calendly.com/YOUR_USERNAME/60min`)

4. **Update index.html:**
   - Find: `https://calendly.com/YOUR_CALENDLY_USERNAME/60min`
   - Replace with your actual Calendly link
   - Save and redeploy

**Advanced (Optional):** Use Calendly's embed widget customizer at [https://help.calendly.com/hc/en-us/articles/223147027](https://help.calendly.com/hc/en-us/articles/223147027) for more styling options.

---

## ✏️ Customize Your Page

Edit `index.html` to personalize:

- **Line 151:** Update the testimonial quote to match your voice
- **Line 187:** Replace `your-email@example.com` with your actual email
- **Line 188:** Update year/copyright info

Optional additions:
- Add your photo/headshot in the social proof section
- Include specific case studies if you have them
- Add live chat widget (e.g., Intercom, Drift) for questions

---

## 📱 Test Mobile Responsiveness

Before going live:
1. Open the page on your phone
2. Or use Chrome DevTools (F12 → Toggle device toolbar)
3. Test on iPhone SE, iPhone 14, iPad, and Android sizes

---

## 🎯 Final Checklist

- [ ] Stripe payment link working (test with a $0.50 test charge)
- [ ] Calendly embed showing available times
- [ ] Email address updated
- [ ] Mobile-friendly (tested on phone)
- [ ] All links working
- [ ] Page loads fast (<2 seconds)

---

## 📊 Optional: Add Analytics

### Google Analytics (Free):
1. Create GA4 property at [https://analytics.google.com](https://analytics.google.com)
2. Get tracking code
3. Add before `</head>` in index.html

### Facebook Pixel (if running ads):
1. Get pixel code from Facebook Ads Manager
2. Add before `</head>` in index.html

---

## 🚨 Troubleshooting

**Calendly not showing?**
- Make sure the Calendly script loads (check browser console)
- Try the direct link method instead of embed

**Stripe link not working?**
- Verify you're using the payment link (not checkout session)
- Make sure Stripe account is activated

**Page not loading on GitHub Pages?**
- Wait 2-3 minutes after enabling Pages
- Check repo is public (or have GitHub Pro for private repos)

---

## ⏱️ Time Investment

- **Creating page:** ✅ Done (you're reading this!)
- **Setting up Stripe:** 2 minutes
- **Setting up Calendly:** 2 minutes
- **Deploying to Netlify/GitHub:** 5 minutes
- **Testing:** 3 minutes

**Total: ~12 minutes from now to live!**

---

## 💡 Next Steps After Launch

1. **Share the link** with warm traffic (email list, social media, DMs)
2. **Track conversions** in Stripe dashboard
3. **Iterate based on feedback** (A/B test headline, adjust price, etc.)
4. **Scale with ads** once it's converting well organically

---

**Questions? Issues? Let me know and I'll help troubleshoot!**
