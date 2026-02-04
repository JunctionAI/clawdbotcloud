# 🚀 Pre-Launch Checklist

## Before You Deploy

### 1. Payment Setup (REQUIRED)
- [ ] Create Stripe payment link for $997 Premium Setup
- [ ] Update line 408 in `index.html` with your Stripe link
- [ ] Test the payment flow in Stripe test mode

### 2. Booking Setup (REQUIRED)
- [ ] Create Calendly event (30-min consultation)
- [ ] Update line 449 in `index.html` with your Calendly link
- [ ] Test the booking widget

### 3. Links & Assets (OPTIONAL)
- [ ] Update GitHub repo link (lines 190, 476)
- [ ] Add documentation link (line 477)
- [ ] Replace emoji logo with real logo image (optional)
- [ ] Add real Mission Control screenshots (optional)

### 4. Content Review
- [ ] Review pricing tiers - confirm $997 is the right price point
- [ ] Review testimonial - Jakob's quote accurate?
- [ ] Review FAQ - any missing objections?
- [ ] Proofread all copy for typos

### 5. Testing
- [ ] Open `index.html` in multiple browsers (Chrome, Firefox, Safari)
- [ ] Test on mobile device (responsive design)
- [ ] Check all anchor links work (#pricing, #features, etc.)
- [ ] Click all CTA buttons
- [ ] Test Calendly popup
- [ ] Verify Stripe link opens correctly

### 6. Deploy
- [ ] Go to [https://app.netlify.com/drop](https://app.netlify.com/drop)
- [ ] Drag and drop the `sales-page` folder
- [ ] Get your live URL (e.g., `random-name-123.netlify.app`)
- [ ] Test the live site thoroughly

### 7. Custom Domain (OPTIONAL)
- [ ] Buy domain (e.g., `clawdbot.io`, `getclawdbot.com`)
- [ ] Point DNS to Netlify
- [ ] Add custom domain in Netlify settings
- [ ] Enable HTTPS (automatic with Netlify)

### 8. Analytics & Monitoring
- [ ] Add Google Analytics or Plausible
- [ ] Set up conversion tracking
- [ ] Monitor page performance
- [ ] Track Stripe conversions

### 9. Marketing
- [ ] Share on Twitter
- [ ] Post in relevant communities
- [ ] Email your existing users
- [ ] Add link to GitHub README

## Quick Deploy (No Customization)

If you want to launch NOW and customize later:

1. Deploy to Netlify Drop (1 min)
2. Update payment link when you're ready to accept orders
3. Use email consultation initially (update to Calendly later)

**Ship fast, iterate faster!** 🚀

## Support

Questions? Open an issue or ping in Discord.
