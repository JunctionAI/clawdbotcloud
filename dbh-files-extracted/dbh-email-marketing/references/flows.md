# Klaviyo Email Flows

## Welcome Series

**Trigger:** New subscriber or first purchase
**Goal:** Build trust, educate, convert

### Email 1: Welcome (Immediate)
**Subject:** Welcome to Deep Blue Health 🌿
**Content:**
- Warm welcome
- Brand story in 2-3 sentences
- What to expect from emails
- First-purchase discount (10-15%)

```
Hey {{ first_name|default:"there" }},

Welcome to Deep Blue Health!

We're a small team in Auckland obsessed with one thing: bringing you the best of New Zealand's natural health.

Our supplements aren't made in a lab overseas. They're sourced from the pristine waters of Marlborough Sounds, the high country farms of Wanaka, and the hives of Nelson.

Here's 10% off your first order: [CODE]

[SHOP NOW]

To your health,
Deep Blue Health
```

### Email 2: Our Story (Day 2)
**Subject:** Why we started Deep Blue Health
**Content:**
- Founder story / brand origin
- Transparency message
- Product highlight

### Email 3: Best Sellers (Day 4)
**Subject:** Our customers' favourites
**Content:**
- Top 3 products with brief descriptions
- Social proof / review snippets
- CTA to shop

### Email 4: Education (Day 7)
**Subject:** What makes NZ ingredients different?
**Content:**
- Educational content about NZ sourcing
- Specific ingredient story
- Soft CTA

---

## Abandoned Cart

**Trigger:** Cart abandoned, no purchase within 1 hour
**Goal:** Recover sale

### Email 1: Reminder (1 hour)
**Subject:** You left something behind
**Preview:** Your cart is waiting

```
Hey {{ first_name }},

Looks like you left some goodies in your cart.

{{ cart_items }}

No pressure – but if you have any questions about the products, just reply to this email. We're happy to help.

[COMPLETE YOUR ORDER]

Warm regards,
Deep Blue Health
```

### Email 2: Objection Handler (24 hours)
**Subject:** Still thinking it over?
**Content:**
- Address common objections
- Social proof / reviews
- Free shipping reminder if applicable

### Email 3: Final Reminder (48 hours)
**Subject:** Your cart expires soon
**Content:**
- Urgency (cart items may sell out)
- Small discount if needed (5-10%)
- Final CTA

---

## Post-Purchase

**Trigger:** Order placed
**Goal:** Reduce buyer's remorse, encourage repeat purchase

### Email 1: Thank You (Immediate)
**Subject:** Thanks for your order! 🎉
**Content:**
- Genuine thanks
- Order confirmation
- What to expect (shipping timeline)
- How to get in touch if needed

### Email 2: Shipping Confirmation (When shipped)
**Subject:** Your order is on its way!
**Content:**
- Tracking information
- Estimated delivery
- Usage tips for products ordered

### Email 3: Check-In (7 days after delivery)
**Subject:** How's it going with your {{ product_name }}?
**Content:**
- Ask how they're finding the product
- Usage tips
- Invite to reply with questions

### Email 4: Review Request (14 days)
**Subject:** Quick favour?
**Content:**
- Request a review
- Make it easy (direct link)
- Mention it helps other customers

---

## Browse Abandonment

**Trigger:** Viewed product, didn't add to cart
**Goal:** Re-engage browser

### Email 1: Still Interested? (4 hours)
**Subject:** Still looking at {{ product_name }}?
**Content:**
- Product they viewed
- Key benefits
- Social proof
- CTA to view again

---

## Winback

**Trigger:** No purchase in 60-90 days
**Goal:** Re-engage lapsed customer

### Email 1: We Miss You (60 days)
**Subject:** It's been a while, {{ first_name }}
**Content:**
- Acknowledge absence
- What's new
- Incentive to return (10-15% off)

### Email 2: Last Chance (90 days)
**Subject:** Is this goodbye?
**Content:**
- Final attempt
- Stronger incentive
- Option to update preferences or unsubscribe

---

## Replenishment

**Trigger:** X days after purchase (based on product consumption rate)
**Goal:** Drive repeat purchase

**Timing by product:**
- 30-day supply → Email at day 25
- 60-day supply → Email at day 50
- 90-day supply → Email at day 80

**Subject:** Time for a refill?
**Content:**
- Reminder their supply is running low
- One-click reorder
- Bundle/subscribe option

---

## VIP / Loyalty

**Trigger:** Customer reaches spend threshold or order count
**Goal:** Reward and retain best customers

### Email 1: VIP Welcome
**Subject:** You're officially a VIP 🌟
**Content:**
- Recognition of loyalty
- Exclusive perks (early access, special discounts)
- Genuine thanks

---

## Flow Best Practices

1. **Always test** - A/B test subject lines and send times
2. **Segment smartly** - Don't send abandoned cart to first-time visitors who were just browsing
3. **Respect frequency** - Don't overwhelm; set suppressions between flows
4. **Mobile first** - 60%+ open on mobile
5. **Track revenue** - Attribute revenue to flows to understand ROI
