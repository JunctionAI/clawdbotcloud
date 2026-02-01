# Meta Ads Campaign Setup Guide for Style Swap
## Complete Campaign Strategy & Technical Specifications

---

## Table of Contents
1. [Campaign Structure Overview](#campaign-structure)
2. [Account Setup & Pixel Configuration](#account-setup)
3. [Campaign 1: Cold Traffic Acquisition](#campaign-1-cold-traffic)
4. [Campaign 2: Retargeting](#campaign-2-retargeting)
5. [Campaign 3: Lookalike Scaling](#campaign-3-lookalike)
6. [Creative Specifications](#creative-specs)
7. [Targeting Deep Dive](#targeting-details)
8. [Budget Allocation & Scaling](#budget-strategy)
9. [Optimization & Testing](#optimization)
10. [Tracking & Analytics](#tracking)

---

<a name="campaign-structure"></a>
## 1. Campaign Structure Overview

### Three-Tier Funnel Approach

**Tier 1: Awareness (Cold Traffic)**
- Objective: Reach + Video Views
- Audience: Broad, interest-based
- Budget: 40% of total ad spend
- Goal: Introduce Style Swap to new users

**Tier 2: Consideration (Warm Traffic)**
- Objective: Traffic + Engagement
- Audience: Engaged with content, website visitors
- Budget: 35% of total ad spend
- Goal: Drive app installs and trials

**Tier 3: Conversion (Hot Traffic)**
- Objective: Conversions (App Installs + Purchases)
- Audience: Trial users, cart abandoners
- Budget: 25% of total ad spend
- Goal: Convert free trials to paid subscribers

---

<a name="account-setup"></a>
## 2. Account Setup & Pixel Configuration

### Meta Business Manager Setup

**Step 1: Create Business Manager**
1. Go to business.facebook.com
2. Click "Create Account"
3. Enter business name: "Style Swap Inc."
4. Enter your name and business email
5. Verify email address

**Step 2: Add Ad Account**
1. Business Settings → Accounts → Ad Accounts
2. Click "Add" → "Create a New Ad Account"
3. Ad Account Name: "Style Swap - Main"
4. Time Zone: Your local timezone
5. Currency: USD (or local currency)
6. Payment Method: Add credit card

**Step 3: Add Facebook Page & Instagram Account**
1. Business Settings → Accounts → Pages
2. Add existing page or create new: "Style Swap"
3. Connect Instagram account
4. Ensure both are claimed by Business Manager

---

### Meta Pixel Installation

**Pixel Setup (Critical for Tracking)**

```html
<!-- Meta Pixel Base Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR_PIXEL_ID');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1"
/></noscript>
<!-- End Meta Pixel Code -->
```

**Event Tracking Implementation**

```javascript
// Homepage
fbq('track', 'PageView');

// App Download Initiated
fbq('track', 'InitiateCheckout');

// Free Trial Signup
fbq('track', 'CompleteRegistration', {
  value: 0,
  currency: 'USD',
  content_name: 'Free Trial'
});

// Photo Upload (First Action)
fbq('track', 'AddToCart', {
  content_name: 'First Photo Upload'
});

// First Try-On Complete
fbq('trackCustom', 'FirstTryOn', {
  content_name: 'AI Try-On Completed'
});

// Premium Upgrade
fbq('track', 'Purchase', {
  value: 9.99, // or subscription price
  currency: 'USD',
  content_name: 'Premium Subscription'
});
```

---

<a name="campaign-1-cold-traffic"></a>
## 3. Campaign 1: Cold Traffic Acquisition

### Campaign Settings

**Campaign Level**
- **Objective:** App Installs (iOS + Android)
- **Campaign Name:** "Style Swap - Cold - App Installs - [Month/Year]"
- **Special Ad Category:** None (unless restricted)
- **Campaign Objective:** App Installs
- **Buying Type:** Auction

**Budget & Schedule**
- **Campaign Budget Optimization (CBO):** ON
- **Daily Budget:** $200/day (starting point)
- **Schedule:** Continuous (ongoing)
- **Bid Strategy:** Lowest cost (initially), transition to Cost Cap after data

---

### Ad Set 1.1: Interest-Based Targeting (Women 22-35)

**Ad Set Name:** "Cold - Women 22-35 - Fashion Interests - US"

**Optimization & Delivery**
- **Optimization Event:** App Installs
- **Cost Control:** None (initially), set Cost Cap at $5-7 per install after 50+ conversions
- **When You Get Charged:** Impressions
- **Delivery Type:** Standard

**Budget**
- **Ad Set Budget:** Let CBO distribute (estimated $80/day)

**Audience Targeting**

**Location:**
- United States (Tier 1)
- Detailed Options:
  - Include: People living in this location
  - Exclude: People traveling in this location

**Age:** 22-35 years old

**Gender:** Women (primary audience)

**Detailed Targeting:**
```
INTERESTS (Broad - Layer 1):
- Online shopping
- Fashion
- ASOS
- Zara
- H&M
- Nordstrom
- Revolve
- Fast fashion
- Sustainable fashion

BEHAVIORS:
- Engaged shoppers
- Online purchasers
- Technology early adopters
- Mobile app users

DEMOGRAPHICS:
- Household Income: Top 25-50% (for premium conversion)
- Education Level: Some college or higher
```

**Connections:**
- Exclude: People who like your Page (avoid existing fans)

**Placements:**
- **Automatic Placements** (recommended for cold traffic testing)
- After 7 days, analyze and switch to Manual:
  - Facebook Feed
  - Instagram Feed
  - Instagram Stories
  - Facebook Stories
  - Instagram Reels
  - Audience Network (optional - test separately)

---

### Ad Set 1.2: Lookalike - Website Visitors (1%)

**Ad Set Name:** "Cold - LAL 1% Website Visitors - US"

**Custom Audience Creation:**
1. Audiences → Create Audience → Custom Audience
2. Source: Website
3. Events: All website visitors
4. Retention: 30 days
5. Name: "Website Visitors - 30 Days"

**Lookalike Audience:**
1. Create Lookalike Audience
2. Source: "Website Visitors - 30 Days"
3. Location: United States
4. Audience Size: 1% (most similar, ~2.3M people)
5. Name: "LAL 1% - Website Visitors - US"

**Ad Set Settings:**
- Same as Ad Set 1.1
- Budget: Let CBO distribute (estimated $60/day)
- Targeting: LAL 1% - Website Visitors - US (no additional layers)

---

### Ad Set 1.3: Competitor Interest Targeting

**Ad Set Name:** "Cold - Competitor Interests - US"

**Detailed Targeting (Competitors & Related Apps):**
```
INTERESTS:
- Poshmark
- Depop
- ThredUp
- Rent the Runway
- Stitch Fix
- Virtual fitting room
- Personal stylist services
- Fashion subscription boxes

BEHAVIORS:
- Mobile app users
- Early technology adopters
- Heavy online shoppers
```

**Settings:**
- Same as Ad Set 1.1
- Budget: CBO distribution (estimated $60/day)

---

### Creative for Campaign 1 (Cold Traffic)

**Ad 1.1: Problem-Solution Video**
- **Format:** 15-second vertical video (9:16)
- **Hook:** "Tired of ordering 5 sizes and keeping none?"
- **Solution:** Show app demo (upload → try on → perfect fit)
- **CTA:** "Download free"
- **Creative File:** `ad-01-problem-solution.mp4`

**Ad 1.2: User Testimonial**
- **Format:** User-generated content style (authentic)
- **Content:** Real user showing before/after try-on
- **Hook:** "This app saved me $500 this month"
- **CTA:** "Install now"
- **Creative File:** `ad-02-user-testimonial.mp4`

**Ad 1.3: Carousel - "How It Works"**
- **Format:** Carousel (4 cards)
- **Card 1:** Upload photo
- **Card 2:** Choose outfit
- **Card 3:** See AI result
- **Card 4:** Buy with confidence
- **CTA:** "Learn more"
- **Creative Files:** `ad-03-carousel-01.jpg` through `ad-03-carousel-04.jpg`

**Copy Template:**
```
Headline: "Try on clothes before you buy—virtually!"
Primary Text: "Upload a photo. Choose from 10,000+ brands. See yourself wearing it. Only buy what works. Zero returns, zero waste. Get 10 FREE try-ons."
Description: "AI-powered virtual try-on app"
Call to Action: "Download" or "Install Now"
```

---

<a name="campaign-2-retargeting"></a>
## 4. Campaign 2: Retargeting (Warm Traffic)

### Campaign Settings

**Campaign Level**
- **Objective:** Conversions (App Installs + Complete Registration)
- **Campaign Name:** "Style Swap - Retargeting - Conversions - [Month/Year]"
- **Campaign Budget Optimization:** ON
- **Daily Budget:** $150/day

---

### Ad Set 2.1: Website Visitors (Didn't Install)

**Ad Set Name:** "Retarget - Website Visitors No Install - 14D"

**Custom Audience:**
1. Create Custom Audience → Website
2. Include: All website visitors (last 14 days)
3. Exclude: App installs (last 30 days)
4. Name: "Website Visitors - No Install - 14D"

**Ad Set Settings:**
- **Optimization Event:** App Installs
- **Budget:** CBO (~$60/day)
- **Placements:** Manual
  - Facebook Feed
  - Instagram Feed
  - Instagram Stories
  - Messenger (optional test)

**Creative Strategy:**
- Reminder ads: "You checked us out—ready to try?"
- Social proof: "Join 2M+ users"
- Urgency: "10 FREE try-ons (limited time)"

---

### Ad Set 2.2: Video Viewers (75%+ Watched)

**Ad Set Name:** "Retarget - Video 75% - 14D"

**Custom Audience:**
1. Create Custom Audience → Engagement → Video
2. Include: People who watched 75% of any video (last 14 days)
3. Name: "Video Viewers 75% - 14D"

**Ad Set Settings:**
- **Optimization:** App Installs
- **Budget:** CBO (~$50/day)
- **Creative:** Different angle than what they watched
  - If they watched problem/solution → show testimonial
  - If they watched testimonial → show how-it-works

---

### Ad Set 2.3: App Users - Trial Not Activated

**Ad Set Name:** "Retarget - App Install No Trial - 7D"

**Custom Audience:**
1. App Events → Installed app
2. Exclude: Started trial
3. Retention: 7 days
4. Name: "Installed No Trial - 7D"

**Ad Set Settings:**
- **Optimization Event:** Complete Registration (trial signup)
- **Budget:** CBO (~$40/day)
- **Creative Focus:**
  - Onboarding education: "Here's how to get started"
  - First try-on incentive: "Your first try-on is FREE"
  - Tutorial video: Quick walkthrough

---

<a name="campaign-3-lookalike"></a>
## 5. Campaign 3: Lookalike Scaling

### Campaign Settings

**Campaign Level**
- **Objective:** Conversions (Purchase/Subscribe)
- **Campaign Name:** "Style Swap - Lookalike Scale - Conversions - [Month/Year]"
- **Campaign Budget Optimization:** ON
- **Daily Budget:** $300/day (scale budget)

---

### Ad Set 3.1: Lookalike - Premium Subscribers (1%)

**Custom Audience:** Create from premium subscriber list
**Lookalike:** 1% US

**Ad Set Settings:**
- **Optimization:** Purchase
- **Budget:** CBO (~$120/day)
- **Targeting:** LAL 1% Premium Subscribers
- **Placements:** Manual (top performers only)

---

### Ad Set 3.2: Lookalike - Engaged Users (3%)

**Custom Audience:** Users who completed 10+ try-ons
**Lookalike:** 3% US (broader, scaling)

**Ad Set Settings:**
- **Optimization:** Purchase
- **Budget:** CBO (~$100/day)
- **Creative:** High-intent messaging ("Upgrade to premium for unlimited try-ons")

---

### Ad Set 3.3: Lookalike - High LTV Users (1%)

**Custom Audience:** Users with 3+ months of premium subscription
**Lookalike:** 1% US

**Ad Set Settings:**
- **Optimization:** Value (optimize for highest-value users)
- **Budget:** CBO (~$80/day)
- **Creative:** Premium feature benefits

---

<a name="creative-specs"></a>
## 6. Creative Specifications

### Video Ads (Feed & Stories)

**Technical Specs:**
- **Aspect Ratio:** 9:16 (vertical), 4:5 (feed), 1:1 (square)
- **Resolution:** Minimum 1080x1920 (vertical), 1080x1350 (4:5)
- **File Size:** Max 4GB
- **Length:** 15-30 seconds (optimal engagement)
- **File Type:** MP4 or MOV
- **Captions:** Required (85% watch without sound)

**Best Practices:**
- Hook in first 3 seconds
- Show app interface/demo
- Include before/after transformations
- Add text overlays (readable without sound)
- Include strong CTA

---

### Image Ads

**Technical Specs:**
- **Aspect Ratio:** 1:1 (square) or 4:5 (vertical)
- **Resolution:** Minimum 1080x1080 or 1080x1350
- **File Size:** Max 30MB
- **File Type:** JPG or PNG
- **Text Overlay:** <20% of image (Facebook guideline)

**Best Practices:**
- High contrast, bold colors
- Clear focal point
- Minimal text (let caption tell story)
- Before/after split screens perform well

---

### Carousel Ads

**Technical Specs:**
- **Cards:** 2-10 images
- **Aspect Ratio:** 1:1 (square)
- **Resolution:** 1080x1080 minimum per card
- **File Size:** Max 30MB per card
- **File Type:** JPG or PNG

**Best Practices:**
- Tell a story across cards (sequential)
- Consistent design theme
- Each card should work standalone
- Last card: Strong CTA

---

<a name="targeting-details"></a>
## 7. Targeting Deep Dive

### Detailed Targeting Combinations

**Combo 1: Fashion Enthusiasts**
```
INTERESTS:
- Fashion design
- Vogue (magazine)
- Fashion week
- Runway fashion
AND
- Online shopping
- E-commerce
```

**Combo 2: Sustainable Shoppers**
```
INTERESTS:
- Sustainable fashion
- Ethical fashion
- Conscious consumer
- Thrift shopping
AND
- Environmental protection
```

**Combo 3: Tech-Forward Women**
```
INTERESTS:
- Technology
- Mobile applications
- Artificial intelligence
AND
- Fashion
- Online shopping
```

**Combo 4: Deal Seekers**
```
BEHAVIORS:
- Engaged shoppers
- Frequent online purchasers
INTERESTS:
- Coupons
- Sale shopping
- Discount stores
AND
- Fashion
```

---

### Geographic Targeting Priority

**Tier 1 (Launch Focus - US):**
- United States (all states)
- Focus cities (optional refinement):
  - New York, NY
  - Los Angeles, CA
  - San Francisco, CA
  - Chicago, IL
  - Miami, FL
  - Austin, TX

**Tier 2 (International Expansion):**
- United Kingdom
- Canada
- Australia
- Germany
- France

---

<a name="budget-strategy"></a>
## 8. Budget Allocation & Scaling

### Monthly Budget Roadmap

**Month 1: Testing Phase**
- **Total Budget:** $10,000
- Cold Traffic: $4,000 (40%)
- Retargeting: $3,500 (35%)
- Lookalike: $2,500 (25%)

**Week 1-2: Learning Phase**
- Run all ad sets
- Gather data (minimum 50 conversions per ad set for optimization)
- Don't make changes for 7 days (let algorithm learn)

**Week 3-4: Optimization Phase**
- Pause underperforming ad sets (CPA >$10)
- Increase budget on winners by 20%
- Launch new creative variations

---

**Month 2-3: Scaling Phase**
- **Total Budget:** $20,000-30,000
- Increase winning ad sets by 20-30% weekly
- Expand to new audiences (lookalikes 2-5%)
- Test international markets

---

### Scaling Rules

**When to Scale:**
- ✅ CPA is below target ($5-7 for app install, $20-30 for purchase)
- ✅ ROAS is above 3:1
- ✅ Ad set has 7+ days of stable performance
- ✅ Delivery is "Active" (not in learning)

**How to Scale:**
- Increase budget by 20% every 3-4 days (avoid shocking algorithm)
- Duplicate winning ad sets to new audiences
- Expand placements (add Audience Network if excluded)
- Increase bid cap by 10-15%

**When to Pause:**
- ❌ CPA is 2x target for 3+ days
- ❌ No conversions in 7 days
- ❌ Frequency >3 (audience fatigue)
- ❌ Engagement rate <2%

---

<a name="optimization"></a>
## 9. Optimization & A/B Testing

### Creative Testing Framework

**Test Variables (One at a Time):**
1. **Hook** (first 3 seconds)
   - Problem-focused vs. Solution-focused
   - Question vs. Statement
   - Testimonial vs. Demo
2. **Video Length**
   - 15 seconds vs. 30 seconds vs. 60 seconds
3. **CTA**
   - "Download" vs. "Install Now" vs. "Try Free"
4. **Copy Length**
   - Short (1-2 sentences) vs. Long (5-7 sentences)
5. **Visual Style**
   - UGC (user-generated) vs. Polished/Professional

---

### Audience Testing

**Split Testing Structure:**
- Create Campaign Experiment (Meta's built-in A/B test)
- Test 2 audiences simultaneously
- Equal budget distribution
- Run for minimum 14 days
- Winner: Lowest CPA or highest ROAS

**Audience Tests to Run:**
1. Broad Interest vs. Narrow Interest
2. Lookalike 1% vs. Lookalike 3%
3. Women 22-35 vs. Women 25-45 (age expansion)
4. Single interest vs. Stacked interests
5. US-only vs. US + Canada + UK

---

### Daily Optimization Checklist

**Morning Review (9-10 AM):**
- [ ] Check spend pacing (on track for daily budget?)
- [ ] Review CPA (any major spikes?)
- [ ] Check frequency (any ad sets >3?)
- [ ] Review new comments (respond + hide negative)

**Mid-Day Check (2-3 PM):**
- [ ] Check delivery status (any in learning limited?)
- [ ] Review link clicks vs. conversions (tracking working?)
- [ ] Analyze creative performance (CTR, video views)

**Evening Review (6-7 PM):**
- [ ] End-of-day budget check
- [ ] Prepare next-day adjustments
- [ ] Export daily report for tracking

---

<a name="tracking"></a>
## 10. Tracking & Analytics

### Key Metrics to Monitor

**Acquisition Metrics:**
- **CPM** (Cost Per 1000 Impressions): Target <$15
- **CPC** (Cost Per Click): Target <$1.50
- **CTR** (Click-Through Rate): Target >2%
- **CPA** (Cost Per App Install): Target $5-7
- **Frequency:** Keep <2.5 (avoid fatigue)

**Engagement Metrics:**
- **Video Views** (3-second, 10-second, 75%)
- **Video Completion Rate:** Target >50%
- **Post Engagement:** Likes, comments, shares
- **Landing Page View Rate:** >80% of link clicks

**Conversion Metrics:**
- **App Install Rate:** % of clicks that install
- **Trial Signup Rate:** % of installs that start trial
- **Purchase Conversion Rate:** % of trials that convert to paid
- **ROAS** (Return on Ad Spend): Target 3:1 minimum
- **LTV:CAC Ratio:** Target 3:1 (Lifetime Value : Customer Acquisition Cost)

---

### Attribution Window Settings

**Recommended Settings:**
- **Click-Through Attribution:** 7-day click
- **View-Through Attribution:** 1-day view
- **Rationale:** Longer windows capture full customer journey

---

### Reporting Dashboard Setup

**Weekly Report (Every Monday):**
```
Campaign Performance:
- Total Spend: $X
- Total App Installs: X
- Average CPA: $X
- Total Trials Started: X
- Trial Conversion Rate: X%
- Total Revenue: $X
- ROAS: X:1

Top Performing:
- Best Ad Set: [Name] - CPA $X
- Best Creative: [Name] - CTR X%
- Best Audience: [Name] - Conversion Rate X%

Action Items:
- Pause: [List underperforming ad sets]
- Scale: [List winning ad sets + increase amount]
- Test: [New creative/audience to launch]
```

---

## Summary: Quick Start Checklist

### Week 1 Setup
- [ ] Create Meta Business Manager
- [ ] Install Meta Pixel on website & app
- [ ] Set up conversion events
- [ ] Create custom audiences (website visitors)
- [ ] Create lookalike audiences (1%, 3%, 5%)
- [ ] Upload creatives (videos + images)
- [ ] Write ad copy variations (5+ versions)
- [ ] Launch Campaign 1 (Cold Traffic) - $200/day
- [ ] Monitor daily, no changes for 7 days

### Week 2-3: Optimization
- [ ] Analyze performance data
- [ ] Pause CPA >$10 ad sets
- [ ] Increase budget 20% on winners
- [ ] Launch Campaign 2 (Retargeting) - $150/day
- [ ] Test new creative variations
- [ ] Respond to all comments/messages

### Week 4+: Scaling
- [ ] Launch Campaign 3 (Lookalikes) - $300/day
- [ ] Expand to international markets
- [ ] Increase total budget to $30K/month
- [ ] Build automated reporting dashboard
- [ ] Hire media buyer or agency for scaling

---

## Support Resources

**Meta Help Center:** business.facebook.com/help
**Meta Blueprint (Free Training):** facebook.com/business/learn
**Ad Library (Competitor Research):** facebook.com/ads/library
**Pixel Helper (Chrome Extension):** Test pixel firing

---

**Document Version:** 1.0
**Last Updated:** January 2026
**Next Review:** Monthly
