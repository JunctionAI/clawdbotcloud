# Consulting Automation System

**Complete freelance/consulting automation platform to turn Tom's expertise into high-ticket sales.**

**Goal:** $10k-20k/month from consulting without lifting a finger (after initial automation).

---

## 📦 What's Included

### 1. **Backend API (Node.js + Express + SQLite)**
- Lead management & scoring
- Automated proposal generation
- Pricing calculator (value-based + hourly)
- Client onboarding automation
- Payment tracking (Stripe-ready)
- Testimonial collection system
- Referral program automation
- Upsell/cross-sell triggers
- Email sequence automation

### 2. **Landing Pages (HTML/CSS/JS)**
- `landing-clawdbot.html` - Clawdbot Setup Services ($1k-5k)
- `landing-marketing.html` - Marketing Consulting ($2k-10k) [TODO]
- `landing-ai-automation.html` - AI Automation ($3k-15k) [TODO]

### 3. **Database (SQLite)**
- Leads, clients, projects, proposals
- Payments, testimonials, referrals
- Email sequences, analytics
- Complete CRM functionality

### 4. **Automation Scripts**
- Email sequence triggers
- Proposal generation
- Testimonial requests
- Referral tracking
- Upsell detection

---

## 🚀 Quick Start

### Installation

```bash
cd consulting-automation/backend

# Install dependencies
npm install

# Initialize database
npm run init-db

# Start server
npm start
# OR for development with auto-reload:
npm run dev
```

Server runs on **http://localhost:3001**

### Frontend

Landing pages are static HTML - can be hosted anywhere:
- Vercel/Netlify (free hosting)
- GitHub Pages
- Your own domain

Just update `FRONTEND_URL` in `.env` file.

---

## 📋 Environment Setup

Create `backend/.env`:

```env
# Server
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://yourdomain.com

# Email (SendGrid or Mailgun)
EMAIL_API_KEY=your_sendgrid_api_key
EMAIL_FROM=tom@junctionmedia.ai
EMAIL_FROM_NAME=Tom Hall-Taylor

# Stripe (payments)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...

# Notifications
DISCORD_WEBHOOK=https://discord.com/api/webhooks/...
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

---

## 🎯 Service Pricing

### **Clawdbot Setup** ($1k-5k per client)
- **Basic:** $1,000 (4 hours)
- **Standard:** $2,500 (8 hours) - MOST POPULAR
- **Enterprise:** $5,000 (16 hours)

### **Marketing Consulting** ($2k-10k per project)
- **Strategy Audit:** $2,000 (8 hours)
- **Email Marketing Setup:** $3,000 (12 hours)
- **Full Marketing System:** $6,500+
- **Monthly Retainers:** $2k-6k/month

### **AI Automation** ($3k-15k per system)
- **Process Audit:** $2,500 (8 hours)
- **Workflow Automation:** $5,000+ (16 hours)
- **AI Agent System:** $12,000+ (40 hours)

---

## 📊 Lead Scoring System

Leads are automatically scored 0-100 based on:

| Factor | Points |
|--------|--------|
| **Budget Range** |
| $10k+ | 40 |
| $5k-10k | 30 |
| $1k-5k | 20 |
| **Urgency** |
| Immediate | 30 |
| This month | 20 |
| Exploring | 10 |
| **Service Type** |
| AI Automation | 20 |
| Marketing | 15 |
| Clawdbot | 10 |
| **Has Company** | +10 |

**Leads scoring 70+ trigger immediate notification.**

---

## 🤖 Automated Workflows

### **Lead Capture → Proposal**
1. Lead fills form on landing page
2. Lead auto-scored and saved to database
3. If score > 70: Instant notification to Tom via Discord/Telegram
4. Email sequence triggered ("lead-nurture")
5. Tom reviews lead, generates proposal with pricing calculator
6. Proposal auto-generated as beautiful HTML
7. Proposal sent via email with tracking
8. System tracks: viewed, accepted, rejected

### **Proposal Accepted → Onboarding**
1. Lead accepts proposal
2. Auto-converted to Client
3. Project created in database
4. Payment link sent (Stripe)
5. Onboarding email sequence triggered
6. Kickoff call scheduled (calendar integration)
7. Service delivery begins

### **Project Completion → Testimonial + Referral**
1. Project marked complete
2. Testimonial request sent (3 days later)
3. Referral request sent (7 days later)
4. Upsell triggers evaluated (based on service history)

---

## 📧 Email Sequences

### **1. Lead Nurture**
- **Day 0:** Welcome + case study
- **Day 2:** Value proposition + testimonials
- **Day 5:** Free consultation offer
- **Day 10:** Last chance + urgency

### **2. Onboarding**
- **Day 0:** Welcome + what to expect
- **Day 1:** Access credentials + kickoff call
- **Day 3:** Check-in + progress update
- **Day 7:** Mid-project update

### **3. Testimonial Request**
- **Day 0 (after project):** Thank you + request
- **Day 7:** Gentle reminder
- **Day 14:** Final follow-up

### **4. Referral Ask**
- **Day 0 (after project):** Referral program intro
- **Day 14:** Success story + referral link
- **Day 30:** Bonus incentive

---

## 💰 Revenue Tracking

### Monthly Goals
- **Month 1-2:** 2-4 Clawdbot setups = $5k-10k
- **Month 3-6:** 4+ setups + 1-2 marketing projects = $10k-15k
- **Month 6+:** 6+ setups + 2-3 marketing/AI = $20k-30k

### Metrics to Track
- Lead conversion rate (target: 30%+)
- Average project value (target: $3,500+)
- Time to close (target: <7 days)
- Client LTV (target: $10k+)
- Referral rate (target: 20%+)

---

## 🔧 API Endpoints

### **Leads**
- `POST /api/leads` - Create lead from form
- `GET /api/leads` - List leads (with filters)
- `GET /api/leads/:id` - Get lead details
- `PATCH /api/leads/:id` - Update lead status
- `DELETE /api/leads/:id` - Mark as closed-lost

### **Pricing**
- `POST /api/pricing/calculate` - Calculate project pricing
- `POST /api/pricing/estimate` - Quick estimate for lead forms
- `GET /api/pricing/services` - Get all service pricing

### **Proposals**
- `POST /api/proposals` - Generate proposal
- `GET /api/proposals/:id` - Get proposal
- `GET /api/proposals/:id/html` - Get proposal HTML
- `POST /api/proposals/:id/send` - Send to lead
- `POST /api/proposals/:id/accept` - Accept proposal

### **Automation**
- `POST /api/automation/email-sequences/trigger` - Trigger email sequence
- `POST /api/automation/testimonials/request` - Request testimonial
- `POST /api/automation/referrals/submit` - Submit referral
- `POST /api/automation/upsells/check` - Check for upsell opportunities
- `POST /api/automation/onboarding/start` - Start client onboarding

### **Analytics**
- `GET /api/analytics/dashboard` - Main dashboard stats
- `GET /api/analytics/revenue` - Revenue breakdown

---

## 🎨 Frontend Customization

### Landing Pages
Each landing page has:
- Hero section with CTA
- Features/benefits
- Pricing tiers
- Testimonials
- Lead capture form

**To customize:**
1. Edit HTML files in `frontend/`
2. Update colors, copy, pricing in `<style>` section
3. Update form submission URL if using different backend

### Client Dashboard (TODO)
- Project status
- Payment history
- Testimonial submission
- Referral tracking

---

## 📈 Marketing Strategy

### **SEO Keywords**
- "Clawdbot setup"
- "AI automation consultant"
- "AI assistant setup"
- "marketing automation Auckland"
- "AI chatbot development NZ"

### **Meta Ads**
- **Campaign 1:** Clawdbot setup ($10-20/day)
  - Target: Tech entrepreneurs, agencies, consultants
  - Age: 25-45
  - Locations: NZ, AU, US, UK
  
- **Campaign 2:** Marketing consulting ($15-25/day)
  - Target: Small business owners, ecommerce
  - Age: 30-55
  - Interests: Digital marketing, business growth

- **Campaign 3:** AI automation ($20-30/day)
  - Target: Mid-size companies, CTOs, operations managers
  - Age: 35-55
  - Interests: Business automation, AI/ML

### **Content Marketing**
- Blog posts on Clawdbot use cases
- YouTube tutorials
- Case studies
- LinkedIn posts

---

## 🔄 Upsell/Cross-Sell Strategy

### After Clawdbot Setup:
- **→ Marketing Consulting** (drive traffic to your new AI)
- **→ AI Automation** (expand to other workflows)
- **→ Monthly Support** ($600/month for ongoing optimization)

### After Marketing Consulting:
- **→ AI Automation** (automate your marketing workflows)
- **→ Clawdbot** (AI-powered customer support)
- **→ Monthly Retainer** ($2k-6k/month)

### After Any Project:
- **→ Training Session** ($300)
- **→ Check-in/Optimization** ($500 quarterly)

---

## 🚦 Next Steps

### **Phase 1: Launch (Week 1-2)**
1. ✅ Backend API complete
2. ✅ Database schema complete
3. ✅ Clawdbot landing page complete
4. ⏳ Create marketing & AI automation landing pages
5. ⏳ Set up hosting (Vercel for frontend, Railway/Render for backend)
6. ⏳ Configure environment variables
7. ⏳ Test lead capture → proposal flow

### **Phase 2: Marketing (Week 3-4)**
1. Set up Google Analytics
2. Launch Meta ads ($50/day total across 3 campaigns)
3. SEO optimization (meta tags, sitemap, robots.txt)
4. Post on LinkedIn/Twitter announcing services
5. Reach out to 20 warm leads personally

### **Phase 3: Automation (Week 5-8)**
1. Integrate SendGrid for email sequences
2. Connect Stripe for payments
3. Build client dashboard
4. Automate testimonial requests
5. Set up referral tracking links
6. Add analytics dashboard for Tom

### **Phase 4: Scale (Month 3+)**
1. A/B test landing pages
2. Optimize ad campaigns
3. Build case study library
4. Launch affiliate program
5. Scale to $20k-30k/month

---

## 📞 Support

For questions or issues:
- **Tom Hall-Taylor**
- Email: tom@junctionmedia.ai
- Discord: (your Discord handle)
- GitHub: (your GitHub repo)

---

## 📝 License

Copyright © 2026 Junction Media. All rights reserved.

---

**Built to turn expertise into revenue. Let's get to $20k/month.** 🚀
