# 💳 Stripe Payment Setup Guide

**Status:** Ready to implement  
**Time to complete:** 15-20 minutes  
**Outcome:** 3 live payment links for Clawdbot services

---

## 🎯 What We're Setting Up

**3 Service Tiers:**
- **Starter:** $199/mo + $499 setup fee
- **Professional:** $499/mo + $1,499 setup fee  
- **Enterprise:** $999/mo + $2,999 setup fee

**Payment Flow:**
1. Customer clicks payment link
2. Pays setup fee (one-time) + first month (recurring)
3. Gets confirmation email
4. We receive notification → start onboarding
5. Monthly billing happens automatically

---

## 📋 Prerequisites

Before starting, make sure Tom has:
- [ ] Stripe account created (https://stripe.com)
- [ ] Business bank account connected to Stripe
- [ ] Business email verified
- [ ] 2FA enabled on Stripe account

**If not set up yet:**
1. Go to https://dashboard.stripe.com/register
2. Use: tom@junctionmedia.ai (or business email)
3. Complete identity verification (takes 1-2 days)
4. Connect bank account for payouts

---

## 🚀 Step-by-Step Setup

### Step 1: Create Products in Stripe

**For each tier, we need to create TWO products:**
1. Setup fee (one-time)
2. Monthly subscription

#### Tier 1: Starter ($199/mo + $499 setup)

**1.1 - Create Setup Fee Product**
```
Navigate to: Products → + Add product

Product name: Clawdbot Starter - Setup Fee
Description: One-time setup and configuration for Clawdbot Starter plan
Pricing model: Standard pricing
Price: $499 USD
Billing period: One time
Tax behavior: Taxable (if applicable in NZ)

Click: Save product
```

**1.2 - Create Monthly Subscription Product**
```
Navigate to: Products → + Add product

Product name: Clawdbot Starter - Monthly
Description: Monthly subscription for Clawdbot Starter (custom AI assistant + basic integrations)
Pricing model: Standard pricing
Price: $199 USD
Billing period: Monthly
Tax behavior: Taxable (if applicable in NZ)

Click: Save product
```

#### Tier 2: Professional ($499/mo + $1,499 setup)

**2.1 - Create Setup Fee Product**
```
Product name: Clawdbot Professional - Setup Fee
Description: One-time setup and configuration for Clawdbot Professional plan
Price: $1,499 USD
Billing period: One time

Click: Save product
```

**2.2 - Create Monthly Subscription Product**
```
Product name: Clawdbot Professional - Monthly
Description: Monthly subscription for Clawdbot Professional (multi-agent system + advanced integrations)
Price: $499 USD
Billing period: Monthly

Click: Save product
```

#### Tier 3: Enterprise ($999/mo + $2,999 setup)

**3.1 - Create Setup Fee Product**
```
Product name: Clawdbot Enterprise - Setup Fee
Description: One-time setup and configuration for Clawdbot Enterprise plan
Price: $2,999 USD
Billing period: One time

Click: Save product
```

**3.2 - Create Monthly Subscription Product**
```
Product name: Clawdbot Enterprise - Monthly
Description: Monthly subscription for Clawdbot Enterprise (full Mission Control + priority support)
Price: $999 USD
Billing period: Monthly

Click: Save product
```

---

### Step 2: Create Payment Links

Stripe doesn't natively support "setup fee + subscription" in a single checkout, so we'll use **two approaches:**

#### **Option A: Simple (Recommended for MVP)**
Create separate payment links, customer pays setup first, then subscription.

**For Starter Tier:**
```
1. Navigate to: Payment links → + New

2. Setup Fee Link:
   - Product: Clawdbot Starter - Setup Fee ($499)
   - After payment: Redirect to booking page (URL TBD)
   - Click: Create link
   - Copy URL → Save as "Starter_Setup_Link"

3. Subscription Link:
   - Product: Clawdbot Starter - Monthly ($199)
   - Free trial: 0 days (they already paid setup)
   - After payment: Redirect to confirmation page
   - Click: Create link
   - Copy URL → Save as "Starter_Subscription_Link"
```

**Repeat for Professional and Enterprise tiers.**

**Customer Journey (Option A):**
1. Customer pays setup fee → gets email: "Thank you! Next: Subscribe to monthly plan"
2. Customer subscribes → onboarding starts

---

#### **Option B: Advanced (Better UX, requires custom Checkout)**

Use Stripe Checkout Sessions with both items in one cart.

**Implementation (if you want single checkout):**
```javascript
// This requires a backend/webhook setup
// Code example for single checkout with setup + subscription:

const session = await stripe.checkout.sessions.create({
  mode: 'subscription',
  line_items: [
    {
      price: 'price_StarterSetup', // One-time setup fee
      quantity: 1,
    },
    {
      price: 'price_StarterMonthly', // Recurring subscription
      quantity: 1,
    },
  ],
  success_url: 'https://yoursite.com/success?session_id={CHECKOUT_SESSION_ID}',
  cancel_url: 'https://yoursite.com/cancel',
});
```

**For MVP: Use Option A (separate links). For scale: Implement Option B.**

---

### Step 3: Configure Webhooks (Critical!)

You need to know when payments happen so you can start onboarding.

**3.1 - Set up webhook endpoint**
```
Navigate to: Developers → Webhooks → + Add endpoint

Endpoint URL: https://yoursite.com/stripe/webhook
(or use Zapier webhook if no backend)

Events to listen for:
✓ checkout.session.completed
✓ invoice.payment_succeeded
✓ customer.subscription.created
✓ customer.subscription.deleted

Click: Add endpoint
```

**3.2 - Save webhook signing secret**
```
After creating webhook:
- Copy "Signing secret" (starts with whsec_...)
- Store securely in .env file or password manager
- You'll need this to verify webhook authenticity
```

**3.3 - What to do when webhook fires:**

When `checkout.session.completed` arrives:
1. Extract customer email, name, product purchased
2. Send to your CRM or email (Airtable, Notion, Google Sheets)
3. Trigger onboarding email (see service-delivery-playbook.md)

**Simple webhook handler (if using Zapier):**
```
Zap Flow:
1. Trigger: Webhook by Zapier (catch webhook from Stripe)
2. Filter: Event type = checkout.session.completed
3. Action: Send email to tom@junctionmedia.ai
   Subject: "New Clawdbot Customer: {customer_name}"
   Body: "Plan: {plan}, Email: {email}, Start onboarding!"
4. Action: Add row to Google Sheet (customer tracking)
```

---

### Step 4: Test the Flow

**Before going live, test with Stripe test mode:**

```
1. Toggle: Test mode ON (top-right in Stripe dashboard)

2. Create test products (same as above, but in test mode)

3. Use test payment link

4. Use test card: 4242 4242 4242 4242
   - Expiry: Any future date
   - CVC: Any 3 digits
   - ZIP: Any 5 digits

5. Complete checkout

6. Verify:
   - Payment succeeded in Stripe dashboard
   - Webhook fired (check webhook logs)
   - You received notification email
   - Customer redirected correctly

7. If all ✓ → Switch to Live mode and repeat product creation
```

---

### Step 5: Go Live

**5.1 - Switch to Live Mode**
```
Toggle: Test mode OFF
Re-create all 6 products (3 setup fees + 3 subscriptions)
Re-create payment links
Update webhook endpoint to production URL
```

**5.2 - Document Payment Links**
```
Save these URLs somewhere secure (password manager, Notion):

Starter:
- Setup: https://buy.stripe.com/xxxxx (Starter Setup)
- Subscribe: https://buy.stripe.com/xxxxx (Starter Monthly)

Professional:
- Setup: https://buy.stripe.com/xxxxx (Professional Setup)
- Subscribe: https://buy.stripe.com/xxxxx (Professional Monthly)

Enterprise:
- Setup: https://buy.stripe.com/xxxxx (Enterprise Setup)
- Subscribe: https://buy.stripe.com/xxxxx (Enterprise Monthly)
```

**5.3 - Share Links**
```
Add to:
- Landing page pricing section
- Sales emails
- Social media bios
- Anywhere customers might pay
```

---

## 📊 Stripe Configuration Checklist

Before launching, verify these settings:

### Business Settings
- [ ] Business name matches legal entity
- [ ] Tax ID added (if applicable in NZ)
- [ ] Payout schedule configured (daily, weekly, or monthly)
- [ ] Bank account verified and ready for payouts
- [ ] Statement descriptor set (appears on customer's credit card)

### Email Notifications
- [ ] Customer receipt emails enabled
- [ ] Payment failed notifications ON
- [ ] Refund notifications ON
- [ ] Dispute notifications ON (go to tom@junctionmedia.ai)

### Security
- [ ] 2FA enabled on Stripe account
- [ ] Restricted API keys created (not using secret key directly)
- [ ] Webhook signing secret stored securely
- [ ] Access limited to necessary team members

### Subscription Settings
- [ ] Grace period set (optional: give 3 days for failed payments before canceling)
- [ ] Retry logic enabled (Stripe auto-retries failed payments)
- [ ] Cancellation policy documented (refund/no refund)

---

## 💡 Pro Tips

### Tip 1: Use Stripe Billing Portal
Enable self-service for customers:
```
Navigate to: Settings → Billing → Customer portal

Enable:
✓ Update payment method
✓ View invoices
✓ Cancel subscription (with confirmation)

This lets customers manage their own billing without emailing you.
```

### Tip 2: Set Up Coupons (For Launch Discounts)
```
Navigate to: Products → Coupons → + New

Example: "LAUNCH50" for 50% off first month
Duration: Once (first month only)
Applies to: Clawdbot Starter/Professional/Enterprise Monthly

Share code with early adopters.
```

### Tip 3: Track MRR Automatically
```
Stripe automatically calculates MRR in:
Dashboard → Home → Revenue overview

No manual tracking needed. Check this daily.
```

### Tip 4: Handle Refunds Gracefully
```
If customer requests refund within 7 days:
1. Go to Payments → Find payment
2. Click "Refund"
3. Select amount (full or partial)
4. Add reason (for your records)
5. Confirm

Stripe handles the reversal automatically.
```

---

## ⚠️ Common Issues & Fixes

### Issue 1: Payment Declined
**Cause:** Customer's bank blocks transaction  
**Fix:** Ask customer to:
- Contact their bank to approve transaction
- Try different card
- Use PayPal (if you enable it in Stripe)

### Issue 2: Webhook Not Firing
**Cause:** Incorrect endpoint URL or server down  
**Fix:**
- Check webhook logs in Stripe dashboard
- Test endpoint with Stripe CLI: `stripe listen --forward-to localhost:3000/webhook`
- Verify endpoint is publicly accessible (not localhost)

### Issue 3: Subscription Not Starting
**Cause:** Customer only paid setup fee, didn't subscribe  
**Fix:**
- Send follow-up email with subscription link
- Automate this with Zapier (if setup paid → send subscription link email)

### Issue 4: Customer Wants to Upgrade/Downgrade
**Stripe doesn't auto-handle tier changes.**  
**Fix:**
1. Cancel current subscription
2. Customer subscribes to new tier
3. Prorate difference manually (or offer smooth transition)

**Better: Use Stripe Billing API to handle upgrades programmatically (future enhancement).**

---

## 🎯 Success Metrics to Track

Once live, monitor these in Stripe dashboard:

**Weekly:**
- [ ] New subscriptions created
- [ ] MRR (Monthly Recurring Revenue)
- [ ] Churn rate (canceled subscriptions)
- [ ] Failed payment rate

**Monthly:**
- [ ] Total revenue (setup fees + subscriptions)
- [ ] Average revenue per customer
- [ ] Customer lifetime value (LTV)
- [ ] Payment success rate

**Set up alerts:**
```
Navigate to: Settings → Notifications

Enable alerts for:
- Payment failures
- Disputes/chargebacks
- Subscription cancellations
```

---

## 📞 Next Steps After Setup

1. **Test end-to-end** (test mode first, then live with small transaction)
2. **Document payment links** (save URLs in password manager)
3. **Set up webhook handler** (Zapier or custom backend)
4. **Configure email notifications** (customer receipts, your alerts)
5. **Add links to landing page** (pricing section)
6. **Create first invoice** (test with friendly customer)
7. **Monitor Stripe dashboard daily** (first week, then weekly)

---

## 🔗 Resources

- **Stripe Dashboard:** https://dashboard.stripe.com
- **Stripe Docs - Payment Links:** https://stripe.com/docs/payment-links
- **Stripe Docs - Subscriptions:** https://stripe.com/docs/billing/subscriptions
- **Stripe Docs - Webhooks:** https://stripe.com/docs/webhooks
- **Zapier Stripe Integration:** https://zapier.com/apps/stripe/integrations

---

## ✅ Ready to Launch

Once this setup is complete:
- ✅ 3 service tiers configured
- ✅ Payment links ready to share
- ✅ Webhooks firing on transactions
- ✅ Notifications going to Tom
- ✅ Customers can pay and subscribe instantly

**Time to launch: 15-20 minutes.**

**Go make money.** 🚀

---

*Last updated: 2026-02-04*  
*Maintained by: PREP (Clawdbot CEO)*
