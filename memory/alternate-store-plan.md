# ALTERNATE Store Setup Plan

*Created: February 21, 2026*
*Purpose: E-commerce store for ALTERNATE film merch + documentable content*

---

## OVERVIEW

Build an ALTERNATE merch store that:
1. Sells film merchandise (posters, apparel, collectibles)
2. Generates backend revenue for the creative business
3. **Documents the entire process as teaching content** (build in public)
4. Creates a template Tom can teach others to replicate

**Key insight from vision:** Zach handles merch/products creative direction, Tom handles marketing/content/teaching. This store build is content gold.

---

## 1. E-COMMERCE PLATFORM RECOMMENDATION

### 🏆 Winner: **Shopify Basic** ($39/month)

**Why Shopify:**
- **Documentable:** Most widely recognized platform — teaching content applies to largest audience
- **POD integrations:** Native apps for Printful, Printify, etc.
- **Simple setup:** Can film entire build in one sitting
- **Scales well:** Handles growth without migration pain
- **Creator-friendly:** Built-in blogging, email capture, socials
- **AI tools:** Shopify Magic for product descriptions, images

**Alternatives considered:**

| Platform | Pros | Cons | Verdict |
|----------|------|------|---------|
| **Shopify** | Industry standard, best POD integration, most documentable | $39/mo cost | ✅ **RECOMMENDED** |
| **WooCommerce** | Free (self-hosted), flexible | Hosting complexity, harder to document for beginners | ❌ Too technical for content |
| **Squarespace** | Beautiful templates | Weaker POD integrations, less scalable | ❌ Not e-commerce focused |
| **Big Cartel** | Free tier, artist-focused | Limited features, looks amateur | ❌ Too small |
| **Fourthwall** | Creator-focused, built for merch | Less known, smaller audience for teaching | ⚠️ Good alternative |

**Shopify setup = teaching content that helps the most people.**

---

## 2. PRINT-ON-DEMAND PARTNERS

### Primary: **Printful**

**Why Printful:**
- Best Shopify integration (seamless)
- Highest quality prints
- Good product range (posters, apparel, accessories)
- US + EU + AU fulfillment (fast shipping)
- Mockup generator (great for content creation)
- Embroidery options for premium apparel

**Secondary (for specific products):** 

| Service | Best For | Notes |
|---------|----------|-------|
| **Printify** | Cheaper basics, t-shirts | Multiple print providers, price comparison |
| **Gooten** | Home goods, unique items | Different catalog than Printful |
| **SPOD** | Fast US shipping | Spreadshirt's POD arm |
| **Gelato** | Global fulfillment | 100+ production partners worldwide |

### Collectibles Strategy (Non-POD)

For limited edition items (numbered prints, physical collectibles):
- **Self-fulfill initially** — small batches, signed by Tom/Zach
- **Local NZ printers** — for premium posters, art prints
- **Alibaba/custom manufacturers** — for figurines, props (later phase)

**Content angle:** Document sourcing manufacturers, negotiating, quality testing.

---

## 3. DOMAIN OPTIONS

### Recommended: **alternatefilm.com** or **alternate.store**

| Domain | Pros | Cons | Price Est |
|--------|------|------|-----------|
| **alternatefilm.com** | Clear purpose, brandable, .com trust | "film" in domain | ~$15/yr |
| **alternate.store** | Modern, matches product focus | Newer TLD, less trusted | ~$30/yr |
| **alternateworld.com** | Expansive, fits "own worlds" vision | Vague | ~$15/yr |
| **thealternate.co** | Clean, short | .co less recognized | ~$25/yr |
| **alternate.shop** | Direct, product-focused | Newer TLD | ~$35/yr |

**Recommendation:** 
1. Buy **alternatefilm.com** as primary store
2. Buy **alternate.store** to protect (redirect to main)
3. Later: **alternate.film** when budget allows (premium TLD)

**Check availability:** Namecheap, Porkbun, or Cloudflare Registrar

---

## 4. INITIAL PRODUCT IDEAS

### Tier 1: Launch Products (POD, Low Risk)

| Product | Description | Price Point | Margin |
|---------|-------------|-------------|--------|
| **Movie Posters** | Key art, scene stills, AI aesthetic | $25-45 | High |
| **T-Shirts** | Iconic quotes, logo, minimal designs | $30-40 | Medium |
| **Hoodies** | Premium feel, embroidered logo | $55-75 | Medium |
| **Stickers** | Die-cut, scene packs, logo | $5-12 | High |
| **Art Prints** | Gallery-quality scene reproductions | $35-75 | High |

### Tier 2: Premium Products (Limited Editions)

| Product | Description | Price Point | Notes |
|---------|-------------|-------------|-------|
| **Signed Posters** | Numbered edition, Tom + Zach signed | $75-150 | Manual fulfillment |
| **Screenplay Book** | Physical script, behind-scenes notes | $40-60 | Self-publish (Lulu/Blurb) |
| **Making-Of Book** | Coffee table book, AI film journey | $50-80 | High content value |
| **Film Cell Display** | Framed "film cells" (printed frames) | $45-80 | Nostalgic, collectors love |

### Tier 3: Collectibles (Future Phase)

| Product | Description | Price Point | Notes |
|---------|-------------|-------------|-------|
| **Character Figurines** | Mini sculptures of key characters | $35-75 | Custom manufactured |
| **Prop Replicas** | Items from the film | $50-200 | Depends on film |
| **VHS/Retro Release** | Physical media, limited edition | $30-50 | Cult appeal |
| **Film Premiere Tickets** | Bundled with merch | $75-150 | Event tie-in |

### AI Film-Specific Ideas

The "AI-made film" angle is marketing gold:

- **"Made by AI" merch** — shirts celebrating the tech angle
- **Prompt-to-poster prints** — show the actual prompts that made scenes
- **Behind-the-prompt book** — the AI workflow documented
- **AI art evolution prints** — iterations from prompt to final frame
- **Digital assets** — wallpapers, phone backgrounds, desktop scenes

---

## 5. TECH STACK RECOMMENDATION

### Simple, Documentable Stack

```
┌─────────────────────────────────────────────────┐
│                   STOREFRONT                     │
│                    Shopify                       │
│           (hosting, payments, analytics)         │
└─────────────────────────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        ▼               ▼               ▼
   ┌─────────┐    ┌─────────┐    ┌─────────┐
   │ Printful│    │  Email  │    │ Reviews │
   │  (POD)  │    │ Klaviyo │    │ Judge.me│
   └─────────┘    └─────────┘    └─────────┘
        │
        ▼
┌─────────────────────────────────────────────────┐
│              FULFILLMENT & SHIPPING              │
│      Printful auto-fulfills → Customer          │
└─────────────────────────────────────────────────┘
```

### Apps/Integrations

| Tool | Purpose | Cost |
|------|---------|------|
| **Shopify** | Store platform | $39/mo |
| **Printful** | POD fulfillment | Free (margin on products) |
| **Klaviyo** | Email marketing | Free up to 250 contacts |
| **Judge.me** | Reviews | Free tier |
| **Canva Pro** | Graphics/mockups | $22/mo or existing |
| **Google Analytics** | Traffic tracking | Free |
| **Meta Pixel** | Ad tracking | Free |

### Content Creation Stack

| Tool | Purpose | For Content |
|------|---------|-------------|
| **Screen recording** | Loom or OBS | Document builds |
| **Figma** | Design mockups | Show design process |
| **Canva** | Quick graphics | Social content |
| **Higgsfield** | AI video | Mentioned in vision |
| **ChatGPT/Claude** | Copy, descriptions | Show AI assistance |

---

## 6. BUILD-IN-PUBLIC CONTENT PLAN

### Episode Structure (Document Each Step)

| Episode | Topic | Content |
|---------|-------|---------|
| 1 | **Why we're building this** | Vision, ALTERNATE brand, the plan |
| 2 | **Choosing the platform** | Shopify vs alternatives (this research) |
| 3 | **Domain hunting** | Finding and buying the domain |
| 4 | **Store setup (Part 1)** | Shopify account, theme selection |
| 5 | **Store setup (Part 2)** | Navigation, pages, branding |
| 6 | **Print-on-demand setup** | Connecting Printful, first products |
| 7 | **Product design** | Creating merch designs in Canva/Figma |
| 8 | **Product listings** | Photography, descriptions, pricing |
| 9 | **Email marketing** | Klaviyo setup, welcome sequence |
| 10 | **Launch preparation** | Final checks, soft launch |
| 11 | **Meta ads setup** | Pixel, first campaign |
| 12 | **SEO basics** | Product SEO, blog strategy |
| 13 | **First sale celebration** | Document the moment |
| 14+ | **Optimization** | A/B tests, new products, scaling |

### Content Formats

- **Long-form YouTube:** Full tutorials (10-20 min)
- **Reels/Shorts:** Quick tips, behind-scenes moments
- **Twitter/X threads:** Step-by-step text guides
- **Blog posts:** Written versions for SEO
- **Newsletter:** Build list, share journey

---

## 7. BUDGET ESTIMATE

### Initial Setup (Month 1)

| Item | Cost |
|------|------|
| Shopify Basic (annual = $29/mo) | $348/yr or $39 first month |
| Domain (alternatefilm.com) | ~$15 |
| Canva Pro (if not owned) | $22/mo |
| Sample products from Printful | ~$50-100 |
| **Total Month 1** | **~$125-175** |

### Ongoing Monthly

| Item | Cost |
|------|------|
| Shopify | $29-39/mo |
| Canva (optional) | $22/mo |
| Email (Klaviyo free tier) | $0 |
| Ads (when ready) | $100-500/mo (variable) |
| **Total Monthly** | **~$50-560** |

### Revenue Model

- **Average order value:** $40-60
- **Margin on POD:** 30-50%
- **Break-even:** ~10-15 orders/month covers costs
- **Profit phase:** 20+ orders/month = real revenue

---

## 8. LAUNCH TIMELINE

### Week 1: Foundation
- [ ] Purchase domain (alternatefilm.com)
- [ ] Create Shopify account
- [ ] Document decision process (content)

### Week 2: Store Build
- [ ] Choose and customize theme
- [ ] Set up pages (About, Contact, Shipping)
- [ ] Connect Printful
- [ ] Film store setup process

### Week 3: Products
- [ ] Design first 5 products with Zach
- [ ] Create mockups
- [ ] Write descriptions (use AI, document it)
- [ ] Set pricing strategy

### Week 4: Launch Prep
- [ ] Set up email capture
- [ ] Install analytics (GA, Meta Pixel)
- [ ] Create launch content
- [ ] Soft launch to friends/community

### Week 5+: Go Live
- [ ] Official launch announcement
- [ ] First content drops
- [ ] Begin teaching series
- [ ] Iterate based on feedback

---

## 9. SUCCESS METRICS

### Month 1 Goals
- Store live and functional
- 5+ products listed
- Email list started (50+ signups)
- 3+ content pieces published

### Month 3 Goals
- First 10 sales
- 100+ email subscribers
- Content series gaining traction
- Learning what sells

### Month 6 Goals
- Consistent monthly revenue ($500+)
- 15+ products
- Community building
- Event tie-ins planned

---

## 10. ZACH COLLABORATION POINTS

Per the vision doc — Zach handles creative direction for merch:

### Zach's Domain
- Product designs and aesthetics
- Visual branding for ALTERNATE merch
- Creative concepts for collectibles
- Art direction for photos/mockups

### Tom's Domain
- Store setup and tech
- Marketing and content
- Teaching the process
- Ads and conversion

### Sync Points
- Weekly merch design reviews
- Joint decisions on pricing
- Co-branded launch content
- Shared wins (document together)

---

## NEXT STEPS (IMMEDIATE)

1. **Sync with Zach** — Align on initial product concepts
2. **Buy domain** — alternatefilm.com (or agreed alternative)
3. **Start Shopify** — Use free trial to begin
4. **Film Episode 1** — "Why we're building the ALTERNATE store"
5. **Design first 3 products** — Poster, t-shirt, sticker pack

---

*This store isn't just revenue — it's the content engine that teaches, builds authority, and creates the ALTERNATE universe. Build it in public, own the process.*

---

## RESOURCES

- Shopify: https://shopify.com
- Printful: https://printful.com
- Klaviyo: https://klaviyo.com
- Canva: https://canva.com
- Namecheap (domains): https://namecheap.com

---

*Last updated: 2026-02-21*
