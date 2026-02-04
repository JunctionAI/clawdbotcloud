# Payment Setup - DEPLOYMENT GUIDE

## ✅ FASTEST OPTION: NOWPayments (5 minutes)

**Why:** No wallet needed, instant setup, auto-confirms, gives you payment links immediately.

### Steps:
1. Go to https://nowpayments.io/
2. Click "Get Started" → Sign up with email
3. Skip verification (not needed for payment links)
4. Go to "Payment Links" section
5. Create new link:
   - Amount: $97 USD
   - Currency: USDT, USDC, BTC (customer chooses)
   - Description: "AI Quick Win Audit"
6. **DONE** - Copy the payment link (looks like: `https://nowpayments.io/payment/?iid=xxxxx`)

**Test:** Click the link, it should show payment options immediately.

**Confirmation:** NOWPayments sends webhook + email when paid. Customer gets instant confirmation.

---

## Option 2: Direct Crypto (10 minutes) - Using the HTML page

**What you need:**
1. A crypto wallet address (create one below)
2. Host the `payment-page.html` file

### Create Wallet (2 minutes):
**Option A - Trust Wallet (Recommended):**
- Download Trust Wallet app (iOS/Android)
- Create new wallet → Save recovery phrase
- Go to USDT → Select TRC-20 network
- Copy your address (starts with 'T...')

**Option B - Binance:**
- Login to Binance
- Wallet → Fiat and Spot
- Find USDT → Deposit
- Select TRC-20 network
- Copy deposit address

### Update HTML File:
Replace `REPLACE_WITH_TRON_WALLET_ADDRESS` in `payment-page.html` line 221 with your wallet address.

### Host the Page (Pick one):
1. **GitHub Pages** (Free, 2 min):
   ```bash
   # Create repo, push payment-page.html
   # Enable GitHub Pages in settings
   # URL: https://username.github.io/repo/payment-page.html
   ```

2. **Netlify Drop** (Fastest):
   - Go to https://app.netlify.com/drop
   - Drag & drop the HTML file
   - Get instant URL

3. **Vercel** (Professional):
   - `npx vercel payment-page.html`
   - Get instant URL

### Verify Payment:
When customer submits transaction hash:
1. Go to https://tronscan.org/
2. Paste transaction hash
3. Verify: $97 USDT sent to your address
4. Send booking link to customer email

---

## Option 3: Gumroad (10 minutes)

1. Go to https://gumroad.com/
2. Sign up → Verify email
3. Create Product:
   - Name: "AI Quick Win Audit"
   - Price: $97
   - Type: "Service"
   - Description: "Personalized AI implementation audit"
4. Publish → Get payment link
5. **DONE**

**Pros:** Handles payment, confirmation, receipts automatically.  
**Cons:** Takes 10% fee ($9.70). Payout in 1-2 weeks.

---

## ⚡ MY RECOMMENDATION

**If you have 5 minutes:** NOWPayments (instant, professional, no wallet needed)  
**If you have 10 minutes:** Gumroad (easiest, handles everything, worth the 10% fee)  
**If you want 0% fees:** Direct crypto (requires wallet + manual verification)

---

## 🔥 GO LIVE CHECKLIST

- [ ] Choose option above
- [ ] Create payment link/page
- [ ] Test payment flow (send $1 test)
- [ ] Set up confirmation email/webhook
- [ ] Update booking form to require payment proof
- [ ] Add payment link to sales materials

**Payment link ready in:** 5-10 minutes ⏱️
