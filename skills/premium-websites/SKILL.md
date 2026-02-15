# Premium Website Design - Reference Guide

> Patterns from the world's best agency and SaaS websites: Linear, Vercel, Stripe, Apple, Framer, Raycast, Loom, Notion

This guide documents what makes these sites "best in class" and provides actionable patterns for building premium web experiences.

---

## 1. Common Patterns That Make Them "Best in Class"

### 1.1 Ruthless Simplicity
**Every site shares this:** One clear message per section. No clutter.

| Site | Hero Message |
|------|--------------|
| Linear | "Plan and build products" |
| Vercel | "Build and deploy on the AI Cloud" |
| Stripe | "Financial infrastructure to grow your revenue" |
| Raycast | "Your shortcut to everything" |
| Notion | "Your AI everything app" |
| Loom | "One video is worth a thousand words" |
| Framer | "Build better sites, faster" |

**Pattern:** 4-8 words that capture the entire value proposition.

### 1.2 Product-Led Storytelling
Instead of telling you features, they **show the product working**:
- **Linear:** Live UI mockups showing issue triage, AI suggestions
- **Vercel:** Real deployment animations and code samples
- **Stripe:** Interactive payment flow demos with actual currencies
- **Raycast:** Animated keyboard shortcuts and command palette demos
- **Framer:** The homepage IS a demo of Framer's capabilities

**Principle:** The website is the product demo.

### 1.3 Progressive Disclosure
Information architecture follows a strict hierarchy:
1. **Hero:** One value prop, one CTA
2. **Social proof:** Logos or stats (immediate trust)
3. **Core features:** 3-5 maximum, each with its own section
4. **Deep dive:** Expandable details for those who want more
5. **Final CTA:** Repeat the action

**Never front-load complexity.** Let users discover depth.

### 1.4 Speed as a Feature
All these sites mention or demonstrate speed:
- **Linear:** "Optimized for speed and efficiency"
- **Raycast:** "Think in milliseconds"
- **Vercel:** Performance metrics visible
- **Stripe:** "99.999% historical uptime"

**Pattern:** If your product is fast, make your website feel fast too. Sub-second load times are mandatory.

---

## 2. Typography Choices

### 2.1 The Modern SaaS Stack

| Site | Primary Font | Mono Font | Style |
|------|-------------|-----------|-------|
| Vercel | Geist Sans | Geist Mono | Custom, geometric |
| Linear | Inter | SF Mono | Clean, neutral |
| Stripe | Custom serif + sans | Consolas | Editorial, trustworthy |
| Apple | SF Pro | SF Mono | System, native |
| Raycast | SF Pro | SF Mono | macOS native |
| Notion | Inter | Roboto Mono | Friendly, readable |
| Loom | Inter/custom | — | Warm, approachable |
| Framer | Inter/custom | — | Playful, modern |

### 2.2 Typography Principles

**Heading Sizes (Desktop):**
```
Hero:        48-80px (clamp for responsiveness)
Section:     36-48px
Subsection:  24-32px
Body:        16-18px
Caption:     12-14px
```

**Line Heights:**
- Headlines: 1.1-1.2 (tight)
- Body: 1.5-1.7 (readable)
- Long form: 1.8 (comfortable)

**Letter Spacing:**
- Headlines: -0.02em to -0.03em (tighter)
- Body: 0 to 0.01em
- All caps: 0.1em to 0.15em (looser)

### 2.3 Font Weight Strategy
```
Hero headline:     600-700 (bold but not heavy)
Section headline:  500-600
Body:              400
Emphasis:          500 (medium, not bold)
Caption/meta:      400-500
```

**Key insight:** Premium sites rarely use 700+ weight for body text. Bold is reserved for headlines.

### 2.4 Typography Anti-Patterns
❌ More than 2 font families  
❌ Inconsistent line heights  
❌ Justified text  
❌ Line lengths >75 characters  
❌ Thin fonts (<400 weight) for body  

---

## 3. Animation Patterns

### 3.1 The Animation Hierarchy

**Entry Animations (on scroll/load):**
```css
/* Subtle fade-up - the standard */
opacity: 0 → 1
transform: translateY(20px) → translateY(0)
duration: 400-600ms
easing: cubic-bezier(0.4, 0, 0.2, 1)
```

**Interaction Animations:**
```css
/* Hover states */
duration: 150-200ms
transform: scale(1.02) or translateY(-2px)

/* Buttons */
duration: 100-150ms (instant feel)
```

### 3.2 Premium Animation Patterns by Site

**Linear:**
- Smooth parallax on product screenshots
- UI elements animate in sequence (staggered)
- Hover states on cards reveal additional info

**Vercel:**
- Grid/mesh background animations (signature look)
- Code typing animations
- Deployment progress animations

**Stripe:**
- 3D card tilts following mouse
- Animated gradients
- Currency/payment method transitions

**Framer:**
- Everything is animated (their core value prop)
- Scroll-triggered transformations
- Interactive hover states on every element

**Raycast:**
- Keyboard animations (actual key presses)
- Window/UI transitions
- Smooth command palette animations

### 3.3 Animation Timing Functions

| Use Case | Easing | CSS |
|----------|--------|-----|
| Entrance | Decelerate | `cubic-bezier(0, 0, 0.2, 1)` |
| Exit | Accelerate | `cubic-bezier(0.4, 0, 1, 1)` |
| Standard | Ease-in-out | `cubic-bezier(0.4, 0, 0.2, 1)` |
| Bounce | Overshoot | `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| Smooth | Linear | `linear` (for looping) |

### 3.4 Animation Rules

✅ **Do:**
- Stagger group animations (50-100ms delay between items)
- Use hardware-accelerated properties (transform, opacity)
- Match animation to brand personality
- Animate purpose, not decoration

❌ **Don't:**
- Animate layout properties (width, height, margin)
- Use durations >800ms for UI interactions
- Animate without purpose
- Block user interaction during animations

---

## 4. Color Strategies

### 4.1 The Dark Mode Default

Premium SaaS sites default to dark mode:
- **Linear:** Dark (#0D0D0D)
- **Vercel:** Dark (#000000)
- **Raycast:** Dark (#1A1A1A)
- **Framer:** Dark (#0D0D0D)

**Why?** Dark backgrounds:
- Make product UI screenshots pop
- Feel more "premium" and focused
- Reduce eye strain for developers
- Create dramatic contrast for CTAs

### 4.2 Color Palette Architecture (Vercel's Geist System)

**Background Layers:**
```
Background 1: Primary page background
Background 2: Subtle differentiation (cards, sections)
```

**Component Colors (1-10 scale):**
```
1-3: Component backgrounds (default → hover → active)
4-6: Borders (default → hover → active)
7-8: High contrast backgrounds
9-10: Text (secondary → primary)
```

### 4.3 Accent Color Strategy

| Site | Primary Accent | Usage |
|------|---------------|-------|
| Linear | Purple (#5E6AD2) | CTAs, active states |
| Vercel | White on black | Stark contrast |
| Stripe | Purple (#635BFF) | Brand, CTAs |
| Raycast | Pink/Purple gradient | CTAs, brand moments |
| Notion | Black/White | Minimal, content-focused |
| Loom | Purple (#625DF5) | CTAs, brand |
| Apple | Blue (#0066CC) | Links, CTAs |

**Pattern:** One strong accent color, used sparingly.

### 4.4 Gradient Strategy

**Premium gradients:**
```css
/* Subtle: Use for backgrounds */
background: linear-gradient(180deg, #0D0D0D 0%, #1A1A1A 100%);

/* Bold: Use for CTAs or brand moments */
background: linear-gradient(135deg, #FF7A00 0%, #FF0080 50%, #7928CA 100%);

/* Glass effect */
background: rgba(255, 255, 255, 0.05);
backdrop-filter: blur(10px);
```

### 4.5 Color Anti-Patterns
❌ More than 3 colors (excluding grays)  
❌ Saturated backgrounds behind text  
❌ Pure white (#FFF) on pure black (#000) — too harsh  
❌ Gradients on text (accessibility issues)  

---

## 5. Layout Principles

### 5.1 The Section Rhythm

Every section follows this pattern:
```
[Pill/Label]         ← Small uppercase category
[Headline]           ← 2-6 words, bold statement
[Subheadline]        ← 1-2 sentences of context
[Visual/Demo]        ← Product screenshot or animation
[Supporting Points]  ← 3-4 bullet points or cards
```

### 5.2 Grid Systems

**Standard widths:**
```css
--max-content: 1200px;    /* Main content */
--max-prose: 680px;       /* Text-heavy sections */
--max-wide: 1400px;       /* Full-bleed sections */
```

**Column structures:**
- Hero: Single column, centered
- Features: 2-3 column grid
- Testimonials: 3 column or carousel
- Footer: 4-5 column

### 5.3 Spacing Scale

Use a consistent scale (8px base):
```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 24px;
--space-6: 32px;
--space-7: 48px;
--space-8: 64px;
--space-9: 96px;
--space-10: 128px;
```

**Section padding:** 96-128px vertical (desktop)  
**Card padding:** 24-32px  
**Button padding:** 12-16px vertical, 24-32px horizontal  

### 5.4 The "Breathing Room" Principle

Premium sites have **generous whitespace**:
- Sections never feel cramped
- Headlines have 48-64px margin-bottom
- Cards have 24-32px internal padding
- Nothing touches edges

**Rule:** When in doubt, add more space.

### 5.5 Visual Hierarchy Patterns

**The Z-Pattern (for scanning):**
```
[Logo]                    [Navigation]
          [Hero Content]
[Feature 1]  [Feature 2]  [Feature 3]
          [Final CTA]
```

**The F-Pattern (for reading):**
```
[Headline across full width]
[Body text starting left, scanning right]
[Sub-section starting left]
```

---

## 6. Trust Signals

### 6.1 Logo Bars

**Placement:** Immediately after hero  
**Format:** Grayscale logos, evenly spaced  
**Quantity:** 5-8 logos  

**Copy patterns:**
- "Trusted by teams at..." (Linear)
- "Powering the world's best..." (Linear)
- "62% of Fortune 100" (Notion)
- No copy, just logos (Vercel)

### 6.2 Stats That Build Trust

| Site | Stats |
|------|-------|
| Stripe | "135+ currencies", "US$1.4tn processed", "99.999% uptime" |
| Linear | "2x increase in filed issues", "1.6x faster resolution" |
| Notion | "100M+ users", "#1 knowledge base 3 years" |
| Loom | "93M videos recorded" |
| Raycast | "99.8% crash-free rate" |

**Pattern:** Specific numbers > vague claims. Always.

### 6.3 Social Proof Hierarchy

**Strongest to weakest:**
1. Enterprise logos (Fortune 500)
2. Recognizable startup logos
3. Specific customer quotes with photos
4. Aggregate stats
5. Review platform badges (G2, Capterra)

### 6.4 Security & Compliance

Enterprise-focused sites display:
- SOC 2 badge
- GDPR compliance
- HIPAA (if relevant)
- Uptime SLA
- Security certifications

**Placement:** Footer or dedicated section, not hero.

### 6.5 Testimonial Best Practices

**Format:**
```
"Quote that focuses on specific outcome..."
— Name, Title, Company [Photo] [Logo]
```

**Key elements:**
- Real photo (not stock)
- Specific title and company
- Outcome-focused quote
- Company logo nearby

---

## 7. CTA Strategies

### 7.1 The Dual-CTA Pattern

Every site uses two CTAs in the hero:

| Site | Primary CTA | Secondary CTA |
|------|-------------|---------------|
| Linear | "Get started" | "Contact sales" |
| Vercel | "Start Deploying" | "Get a Demo" |
| Stripe | "Start now" | "Contact sales" |
| Notion | "Get Notion free" | "Request a demo" |
| Loom | "Get Loom for Free" | "Get a demo" |
| Raycast | "Download" | — |

**Pattern:**  
- Primary: High-contrast button (white on dark, or accent color)
- Secondary: Ghost button or text link

### 7.2 CTA Button Design

**Primary button:**
```css
background: white;           /* or accent color */
color: black;
padding: 12px 24px;
border-radius: 6-8px;
font-weight: 500-600;
font-size: 14-16px;
```

**Secondary button:**
```css
background: transparent;
border: 1px solid rgba(255,255,255,0.2);
color: white;
```

### 7.3 CTA Copy That Converts

**High-performing patterns:**
- "Start [action]ing" — implies immediate progress
- "Get [product] free" — removes risk
- "Try for free" — low commitment
- "Request a demo" — enterprise signal

**Avoid:**
- "Submit"
- "Sign up"
- "Learn more" (as primary)
- "Click here"

### 7.4 CTA Placement Strategy

1. **Hero:** Primary + Secondary
2. **After logo bar:** Often skipped (let trust build)
3. **After each major section:** Contextual CTA
4. **Sticky header:** Appears on scroll
5. **Footer:** Final CTA (often larger)

### 7.5 The Free Tier Strategy

Nearly all premium SaaS sites lead with free:
- **Linear:** Free for small teams
- **Notion:** Free with limits
- **Loom:** Starter free plan
- **Raycast:** Free download
- **Vercel:** Free hobby tier

**Pattern:** Get users in, then convert.

---

## 8. Mobile Excellence

### 8.1 Mobile-First Realities

**Content changes:**
- Hero text: Shorter (4-6 words max)
- Feature grids: Stack vertically
- Logo bars: Horizontal scroll or fewer logos
- Animations: Reduced or removed
- CTAs: Full-width buttons

### 8.2 Mobile Typography

```css
/* Mobile adjustments */
h1 { font-size: clamp(32px, 8vw, 64px); }
h2 { font-size: clamp(24px, 6vw, 48px); }
body { font-size: 16px; }  /* Never smaller */
```

### 8.3 Touch Targets

**Minimum sizes:**
- Buttons: 44x44px minimum
- Links: 44px touch area (even if text is smaller)
- Spacing between interactive elements: 8px minimum

### 8.4 Mobile Navigation

**Pattern:** Hamburger menu with:
- Full-screen overlay
- Large, tappable links
- Clear hierarchy
- Prominent CTA

**Don't:** Hide the primary CTA in mobile nav.

### 8.5 Performance on Mobile

**Targets:**
- First Contentful Paint: <1.8s
- Largest Contentful Paint: <2.5s
- Time to Interactive: <3.8s

**Techniques:**
- Lazy load below-fold images
- Reduce/remove complex animations
- Serve WebP/AVIF images
- Use system fonts as fallback

---

## 9. Quick Reference: Design Tokens

### 9.1 Suggested Starting Tokens

```css
:root {
  /* Colors */
  --color-bg-primary: #0D0D0D;
  --color-bg-secondary: #1A1A1A;
  --color-bg-tertiary: #262626;
  --color-text-primary: #FAFAFA;
  --color-text-secondary: #A1A1A1;
  --color-accent: #635BFF;
  --color-border: rgba(255,255,255,0.1);
  
  /* Typography */
  --font-sans: 'Inter', -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', 'SF Mono', monospace;
  --font-size-xs: 12px;
  --font-size-sm: 14px;
  --font-size-base: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 24px;
  --font-size-2xl: 32px;
  --font-size-3xl: 48px;
  --font-size-4xl: 64px;
  
  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
  --space-4xl: 96px;
  --space-5xl: 128px;
  
  /* Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;
  
  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 300ms ease;
  --transition-slow: 500ms ease;
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
}
```

---

## 10. Implementation Checklist

### Before Launch
- [ ] Hero: Single clear message, 4-8 words
- [ ] Dual CTA in hero (primary + secondary)
- [ ] Logo bar with 5-8 recognizable brands
- [ ] 3-5 feature sections maximum
- [ ] Consistent spacing scale throughout
- [ ] Dark mode polished (if applicable)
- [ ] Mobile responsive at all breakpoints
- [ ] Animations enhance, not distract
- [ ] Page load <3 seconds
- [ ] All images optimized (WebP/AVIF)
- [ ] Typography hierarchy clear
- [ ] Trust signals visible without scrolling
- [ ] Final CTA before footer

### Quality Bar
Ask yourself:
1. Would this look at home next to Linear or Stripe?
2. Is every pixel intentional?
3. Could I remove anything without losing value?
4. Does it feel fast?
5. Is the mobile experience equally premium?

---

## 11. Site-Specific Lessons

### Linear (Product Design)
- **Lesson:** UI IS the marketing. Show the actual product working.
- **Steal:** Issue cards, project timelines as marketing visuals

### Vercel (Developer Marketing)
- **Lesson:** Technical audiences want to see code.
- **Steal:** Geist design system, grid backgrounds, deployment animations

### Stripe (Enterprise Trust)
- **Lesson:** Specificity builds trust. Real numbers, real customers.
- **Steal:** Stats-as-headlines pattern, customer quote formatting

### Apple (Premium Feel)
- **Lesson:** Whitespace is confidence. Let the product breathe.
- **Steal:** Generous margins, product photography standards

### Framer (Animations)
- **Lesson:** The website IS the demo of the product's capabilities.
- **Steal:** Scroll-triggered animations, interactive hover states

### Raycast (Modern SaaS)
- **Lesson:** Speed and keyboard-first design resonate with developers.
- **Steal:** Keyboard animation patterns, testimonial wall layout

### Loom (Video SaaS)
- **Lesson:** Show the product in action with real use cases.
- **Steal:** Use case segmentation, video-first hero

### Notion (Productivity)
- **Lesson:** Simplicity + versatility. One tool, many uses.
- **Steal:** Calculator/ROI widgets, customer success stories

---

## 12. Common Mistakes to Avoid

1. **Too many fonts** — Stick to 1-2 max
2. **Weak CTAs** — "Learn more" isn't a CTA
3. **No social proof** — Logos matter more than you think
4. **Slow animations** — >500ms feels sluggish
5. **Cramped layouts** — Premium = breathing room
6. **Feature overload** — 3-5 features, not 15
7. **Stock photos** — Use real product screenshots
8. **Ignoring mobile** — 50%+ of traffic is mobile
9. **Light mode only** — Dark mode is expected for dev/SaaS
10. **No specificity** — "Fast" means nothing. "150ms" means something.

---

*Last updated: 2026-02-10*
*Sources: Direct analysis of Linear, Vercel, Stripe, Apple, Framer, Raycast, Loom, Notion*
