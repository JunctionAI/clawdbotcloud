# Stripe Setup Automation

**One-command setup for all Stripe products and payment links.**

Creates 6 products and 6 payment links in seconds:
- ✅ 3 setup fee products ($299, $599, $999)
- ✅ 3 subscription products ($199/mo, $499/mo, $999/mo)
- ✅ 6 payment links (one for each)

---

## 🚀 Quick Start (Recommended: Node.js)

### Prerequisites
- Node.js installed ([download here](https://nodejs.org/))
- Stripe account with API access

### Setup (30 seconds)

1. **Get your Stripe API key:**
   - Go to https://dashboard.stripe.com/apikeys
   - Click "Create secret key" or copy existing test key
   - Key format: `sk_test_...` (test) or `sk_live_...` (live)

2. **Run the setup:**
   ```bash
   # Install dependencies
   npm install

   # Run automation (will prompt for API key)
   node stripe-setup-automation.js
   ```

3. **Or use environment variable:**
   ```bash
   # Windows PowerShell
   $env:STRIPE_SECRET_KEY="sk_test_your_key_here"
   node stripe-setup-automation.js

   # Mac/Linux
   export STRIPE_SECRET_KEY="sk_test_your_key_here"
   node stripe-setup-automation.js
   ```

---

## 🪟 Windows PowerShell Alternative

**No Node.js? Use PowerShell (Windows only):**

```powershell
# Option 1: Set API key as environment variable
$env:STRIPE_SECRET_KEY="sk_test_your_key_here"
.\stripe-setup.ps1

# Option 2: Script will prompt for key
.\stripe-setup.ps1
```

---

## 📋 What Gets Created

### Setup Fees (One-time payments)
| Product | Price | Description |
|---------|-------|-------------|
| Starter Setup Fee | $299 | One-time setup fee for Starter plan |
| Professional Setup Fee | $599 | One-time setup fee for Professional plan |
| Enterprise Setup Fee | $999 | One-time setup fee for Enterprise plan |

### Subscriptions (Monthly recurring)
| Product | Price | Description |
|---------|-------|-------------|
| Starter Subscription | $199/mo | Monthly subscription for Starter plan |
| Professional Subscription | $499/mo | Monthly subscription for Professional plan |
| Enterprise Subscription | $999/mo | Monthly subscription for Enterprise plan |

### Payment Links
Each product gets its own shareable payment link that you can send to customers or embed on your website.

---

## 🔧 Customization

Want to change prices or names? Edit the configuration in the script:

### Node.js version (`stripe-setup-automation.js`)
```javascript
// Around line 60-70
const setupFees = [
  { name: 'Starter Setup Fee', amount: 29900, description: '...' },
  // amount is in cents: 29900 = $299.00
];

const subscriptions = [
  { name: 'Starter Subscription', amount: 19900, description: '...' },
  // amount is in cents: 19900 = $199.00
];
```

### PowerShell version (`stripe-setup.ps1`)
```powershell
# Around line 20-30
$setupFees = @(
    @{ name = "Starter Setup Fee"; amount = 29900; description = "..." },
    # amount is in cents: 29900 = $299.00
)
```

---

## 🛡️ Test vs Live Mode

**Always test first!**

1. **Test mode** (recommended for first run):
   - Use API key starting with `sk_test_...`
   - Creates test products you can safely delete
   - Go to https://dashboard.stripe.com/test/products

2. **Live mode** (production):
   - Use API key starting with `sk_live_...`
   - Creates real products for real customers
   - Go to https://dashboard.stripe.com/products

Toggle between test/live using the switch in Stripe dashboard (top right).

---

## 📊 After Setup

**Script output includes all payment links:**
```
Setup Fees (One-time):
  • Starter Setup Fee
    https://buy.stripe.com/test_xxxxx

  • Professional Setup Fee
    https://buy.stripe.com/test_xxxxx

Subscriptions (Monthly):
  • Starter Subscription
    https://buy.stripe.com/test_xxxxx
  ...
```

**Next steps:**
1. Save the payment links somewhere safe (notion, spreadsheet, etc.)
2. View products: https://dashboard.stripe.com/products
3. View payment links: https://dashboard.stripe.com/payment-links
4. Test a payment link by clicking it (use test card: `4242 4242 4242 4242`)

---

## 🔄 Re-running the Script

**Script will create duplicates if run multiple times.**

To avoid duplicates:
- Delete old products in Stripe dashboard before re-running, OR
- Edit the script to update existing products instead of creating new ones

---

## ❓ Troubleshooting

### "Failed to load Stripe SDK"
```bash
npm install stripe
```

### "Invalid API key"
- Check you copied the full key (starts with `sk_test_` or `sk_live_`)
- Make sure you're using a **Secret key**, not a **Publishable key**
- Get keys at: https://dashboard.stripe.com/apikeys

### "Permission denied" (Mac/Linux)
```bash
chmod +x stripe-setup-automation.js
./stripe-setup-automation.js
```

### PowerShell execution policy error
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## 📱 Manual Fallback

If automation fails, see **STRIPE-MANUAL-SETUP.md** for a step-by-step visual guide (takes ~5 minutes manually).

---

## 🎯 Support

- Stripe API docs: https://stripe.com/docs/api
- Stripe CLI: https://stripe.com/docs/stripe-cli
- Payment links guide: https://stripe.com/docs/payment-links

**Questions?** Check the Stripe dashboard or run the script in test mode first!
