# 🚀 QUICK START - 12 Minutes to Live

## Path 1: Netlify Drop (FASTEST - 5 min total)

```
1. Go to: https://app.netlify.com/drop
2. Drag the ai-quick-win-audit folder
3. Get live URL instantly
4. Update Stripe + Calendly links (see below)
5. Re-drag folder to update
```

**DONE. You're live.**

---

## Path 2: GitHub Pages (10 min total)

```bash
cd ai-quick-win-audit
git init
git add .
git commit -m "Landing page"
git branch -M main
# Create repo on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/ai-quick-win-audit.git
git push -u origin main
```

Then: GitHub repo → Settings → Pages → Deploy from main branch → Save

**URL:** `https://YOUR_USERNAME.github.io/ai-quick-win-audit/`

---

## Required Edits (Do These BEFORE Deploy)

### 1. Stripe Payment Link (2 min)

1. Stripe Dashboard → Payment Links → Create
2. Product: "AI Quick Win Audit" | Price: $97
3. Copy link: `https://buy.stripe.com/XXXXXXX`
4. **Edit index.html:**
   - Find: `YOUR_PAYMENT_LINK` (appears 2 times)
   - Replace with your link

### 2. Calendly Link (2 min)

1. Calendly → Create event → "AI Quick Win Audit" → 60 min
2. Copy link: `https://calendly.com/YOUR_USERNAME/60min`
3. **Edit index.html:**
   - Find: `YOUR_CALENDLY_USERNAME`
   - Replace with your username

### 3. Contact Email (30 sec)

- Find: `your-email@example.com`
- Replace with your email

---

## Test Checklist

- [ ] Payment link goes to Stripe checkout
- [ ] Calendly shows available times
- [ ] Mobile view looks good (test on phone)
- [ ] Email is correct

---

## You're Live! Now What?

1. **Share with warm traffic:**
   - Email your list
   - Post in your community
   - DM interested prospects
   - Share on social media

2. **Track in Stripe dashboard:**
   - Watch payment confirmations
   - See conversion rate

3. **Iterate:**
   - Change headline if needed
   - Adjust price based on response
   - Add testimonials as you get them

---

**Time check: You should be live in under 15 minutes.**

**Stuck? Check DEPLOY.md for detailed troubleshooting.**
