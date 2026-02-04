# Stripe Manual Setup Guide

**Fallback if automation script fails. Time: ~5 minutes.**

This guide walks you through creating products and payment links manually in the Stripe dashboard.

---

## Prerequisites

1. Log in to Stripe: https://dashboard.stripe.com/
2. Switch to **Test mode** (toggle in top right) for your first run
3. Have this guide open in a separate window

---

## Setup Fees (One-time Products)

### Product 1: Starter Setup Fee

1. **Navigate to Products:**
   - Click **"Products"** in left sidebar
   - Click **"+ Add product"** button (top right)

2. **Fill in details:**
   ```
   Name: Starter Setup Fee
   Description: One-time setup fee for Starter plan
   
   Pricing model: Standard pricing
   Price: 299.00 USD
   Billing period: One time
   
   [Optional] Upload an image or logo
   ```

3. **Click "Save product"**

4. **Create Payment Link:**
   - After saving, click **"Create payment link"** on the product page
   - Or go to **Payment links** in sidebar → **"+ New"**
   - Select the product you just created
   - Click **"Create link"**
   - **Copy the link** (looks like: `https://buy.stripe.com/test_xxxxx`)
   - Save it somewhere (spreadsheet, doc, etc.)

### Product 2: Professional Setup Fee

Repeat the above steps with:
```
Name: Professional Setup Fee
Description: One-time setup fee for Professional plan
Price: 599.00 USD
Billing period: One time
```

### Product 3: Enterprise Setup Fee

Repeat with:
```
Name: Enterprise Setup Fee
Description: One-time setup fee for Enterprise plan
Price: 999.00 USD
Billing period: One time
```

---

## Subscriptions (Recurring Products)

### Product 4: Starter Subscription

1. **Navigate to Products → "+ Add product"**

2. **Fill in details:**
   ```
   Name: Starter Subscription
   Description: Monthly subscription for Starter plan
   
   Pricing model: Standard pricing
   Price: 199.00 USD
   Billing period: Monthly ← IMPORTANT!
   
   Recurring: ✓ (make sure this is checked)
   ```

3. **Click "Save product"**

4. **Create Payment Link:**
   - Click **"Create payment link"**
   - Select the product
   - Click **"Create link"**
   - **Copy and save the link**

### Product 5: Professional Subscription

Repeat with:
```
Name: Professional Subscription
Description: Monthly subscription for Professional plan
Price: 499.00 USD
Billing period: Monthly
```

### Product 6: Enterprise Subscription

Repeat with:
```
Name: Enterprise Subscription
Description: Monthly subscription for Enterprise plan
Price: 999.00 USD
Billing period: Monthly
```

---

## ✅ Verification Checklist

After setup, you should have:

- [ ] 6 products visible at https://dashboard.stripe.com/test/products
- [ ] 6 payment links at https://dashboard.stripe.com/test/payment-links
- [ ] All payment links saved/documented somewhere

---

## 📋 Payment Links Organization

**Create a spreadsheet or document like this:**

| Product | Type | Price | Payment Link |
|---------|------|-------|--------------|
| Starter Setup Fee | One-time | $299 | https://buy.stripe.com/test_xxxxx |
| Professional Setup Fee | One-time | $599 | https://buy.stripe.com/test_xxxxx |
| Enterprise Setup Fee | One-time | $999 | https://buy.stripe.com/test_xxxxx |
| Starter Subscription | Monthly | $199/mo | https://buy.stripe.com/test_xxxxx |
| Professional Subscription | Monthly | $499/mo | https://buy.stripe.com/test_xxxxx |
| Enterprise Subscription | Monthly | $999/mo | https://buy.stripe.com/test_xxxxx |

---

## 🧪 Testing Payment Links

Before going live, test each link:

1. Click a payment link
2. Enter test card: `4242 4242 4242 4242`
3. Expiry: any future date (e.g., `12/34`)
4. CVC: any 3 digits (e.g., `123`)
5. Complete the checkout

You should see the payment in your Stripe dashboard under **Payments** (test mode).

---

## 🚀 Going Live

Once everything works in test mode:

1. **Switch to Live mode** (toggle in top right)
2. **Repeat all steps above** in live mode
3. Update your saved payment links to the live versions
4. **Delete test products** if you want (optional)

**Important:** Test and live modes are completely separate. Products created in test mode won't appear in live mode.

---

## 💡 Tips & Best Practices

### Product Organization
- Use **metadata** to tag products (e.g., `plan_tier: starter`)
- Add product images for better-looking payment pages
- Use clear, customer-friendly descriptions

### Payment Link Customization
When creating payment links, you can:
- Customize the button text
- Add custom fields (ask for company name, phone, etc.)
- Set quantity limits
- Allow promotion codes
- Collect shipping addresses (if needed)

**To customize:**
1. Go to **Payment links** → click a link
2. Click **"⋮ More"** → **"Edit payment link"**
3. Adjust settings
4. Save

### Archiving Products
Don't delete products with existing customers. Instead:
1. Go to the product page
2. Click **"⋮ More"** → **"Archive product"**
3. This hides it from new customers but keeps existing subscriptions active

---

## 🔄 Bulk Operations

If you need to create many products:

1. **Export template:**
   - Go to Products → "⋮ More" → "Import products"
   - Download the CSV template

2. **Fill in spreadsheet:**
   - Add all your products
   - Include prices, descriptions, etc.

3. **Import:**
   - Upload the CSV
   - Review and confirm

This is faster than clicking through the UI 6+ times.

---

## 📊 Viewing Analytics

After setup, monitor your products:

- **Dashboard home:** Revenue overview
- **Products:** Individual product performance
- **Payment links:** Click-through rates, conversions
- **Customers:** Who's buying what

---

## 🆘 Common Issues

### "Payment link not working"
- Check if you're in test vs live mode
- Make sure the product isn't archived
- Try creating a new payment link for the product

### "Can't edit price"
- Stripe prices are immutable once created
- Create a new price for the product instead
- Archive the old price

### "Subscription not recurring"
- When creating the product, ensure **"Billing period"** is set to **Monthly** (not "One time")
- Check the product details page to verify

---

## ⏱️ Time Saved

- **Manual setup:** ~5 minutes
- **With automation script:** ~30 seconds
- **Time saved:** 90% faster with automation

---

## 🔗 Useful Stripe Dashboard Links

- Products: https://dashboard.stripe.com/products
- Payment Links: https://dashboard.stripe.com/payment-links
- API Keys: https://dashboard.stripe.com/apikeys
- Payments: https://dashboard.stripe.com/payments
- Customers: https://dashboard.stripe.com/customers
- Settings: https://dashboard.stripe.com/settings

---

## Next Steps

After manual setup:
1. ✅ Save all payment links in a secure location
2. ✅ Test each payment link with test card
3. ✅ Share links with customers or embed on website
4. ✅ Set up webhooks for payment notifications (optional)
5. ✅ Consider running the automation script next time to save time!

**Questions?** Check [Stripe's documentation](https://stripe.com/docs) or support.
