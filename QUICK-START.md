# Stripe Setup - Quick Start Card

**⏱️ Total time: 30 seconds**

---

## Step 1: Get Your API Key (10 seconds)

1. Go to: **https://dashboard.stripe.com/apikeys**
2. Click **"Create secret key"** or copy existing key
3. Copy the key (starts with `sk_test_...` or `sk_live_...`)

💡 **Tip:** Use test key first (`sk_test_...`) to avoid mistakes!

---

## Step 2: Install Dependencies (10 seconds)

```bash
npm install
```

---

## Step 3: Run The Script (10 seconds)

```bash
node stripe-setup-automation.js
```

Paste your API key when prompted.

---

## ✅ Done!

You'll see output like:

```
✓ Created product: Starter Setup Fee
✓ Created price: $299
✓ Created payment link: https://buy.stripe.com/test_xxxxx
...

📋 PAYMENT LINKS:

Setup Fees (One-time):
  • Starter Setup Fee
    https://buy.stripe.com/test_xxxxx
...
```

**Save these links!** Copy/paste to a spreadsheet or document.

---

## 🔄 Re-run for Live Mode

1. Get **live** API key: `sk_live_...`
2. Run script again with live key
3. Save the new live payment links

---

## 🆘 Troubleshooting

| Issue | Fix |
|-------|-----|
| "Module not found" | Run `npm install stripe` |
| "Invalid API key" | Check key starts with `sk_` |
| Windows won't run | Use: `.\stripe-setup.ps1` instead |
| Mac permission error | Run: `chmod +x stripe-setup.sh` then `./stripe-setup.sh` |

---

## 📚 Need More Help?

- Full docs: **README-STRIPE-SETUP.md**
- Manual process: **STRIPE-MANUAL-SETUP.md**
- Summary: **STRIPE-AUTOMATION-SUMMARY.md**

---

## 🎯 What You Get

- ✅ 3 setup fee products ($299, $599, $999)
- ✅ 3 subscription products ($199/mo, $499/mo, $999/mo)
- ✅ 6 payment links ready to share

**Go to Stripe dashboard to verify:**
- Products: https://dashboard.stripe.com/products
- Payment links: https://dashboard.stripe.com/payment-links
