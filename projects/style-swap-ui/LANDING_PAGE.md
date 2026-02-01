# Style Swap Landing Page

## Overview
A stunning, conversion-optimized landing page for Style Swap that matches the Gemini UI aesthetic with dark mode, glassmorphism, and purple/pink gradients.

## Routes
- `/` - Landing page (home)
- `/app` - Try-on application
- All other routes redirect to `/`

## Features

### Design
- **Dark Mode Theme**: Deep blacks with purple/pink gradient accents
- **Glassmorphism**: Frosted glass effect on cards and UI elements
- **Responsive**: Fully mobile-optimized with breakpoints at 1024px, 768px, and 480px
- **Animations**: Smooth transitions, hover effects, and scroll animations

### Sections

1. **Hero Section**
   - Eye-catching headline with gradient text
   - Dual CTAs (Try Free / See Demo)
   - Trust badges (2M+ users, 50M+ try-ons)
   - Demo video placeholder with animated glow
   - Social proof ticker

2. **Features Grid**
   - 6 feature cards with icons
   - Glassmorphic card design
   - Hover animations
   - Benefit badges

3. **How It Works** (3 Steps)
   - Step cards with numbers and icons
   - Time estimates for each step
   - Old Way vs. New Way comparison table
   - Total time callout

4. **Testimonials**
   - 4 customer testimonials with ratings
   - Stats for each testimonial
   - Social proof statistics bar
   - Conversion-focused copy

5. **Pricing**
   - 3 tiers (Free, Style Lover, Fashion Pro)
   - Monthly/Yearly toggle with savings badge
   - Popular plan highlight
   - 30-day money-back guarantee

6. **FAQ**
   - 6 common questions
   - Accordion-style interaction
   - Smooth animations

7. **Final CTA**
   - Email capture form
   - Trust bar with security badges
   - Direct navigation to app

## Marketing Copy
All content is based on the marketing copy from:
- `~/clawd/projects/style-swap-marketing/landing-page/hero-section.md`
- `~/clawd/projects/style-swap-marketing/landing-page/features-section.md`
- `~/clawd/projects/style-swap-marketing/landing-page/how-it-works.md`
- `~/clawd/projects/style-swap-marketing/landing-page/testimonials.md`
- `~/clawd/projects/style-swap-marketing/landing-page/pricing-cta.md`

## Conversion Optimization

### Psychological Triggers
- Social proof (user counts, ratings, testimonials)
- Scarcity (limited time offers in exit intent)
- Authority (featured in Vogue, TechCrunch)
- Trust (bank-level encryption, GDPR compliant)

### CTAs Throughout Page
- Hero: 2 CTAs (primary action + learn more)
- Features: 1 CTA
- How It Works: 1 CTA
- Testimonials: 1 CTA
- Pricing: 3 CTAs (one per plan)
- Final: Email capture CTA
- **Total: 9+ conversion points**

### Mobile Optimization
- Touch-friendly buttons (min 44px)
- Readable font sizes (clamp() for fluid typography)
- Optimized images and animations
- Simplified navigation
- Full-width CTAs on mobile

## Technical Details

### File Structure
```
src/
├── pages/
│   ├── Landing.jsx       # React component
│   └── Landing.css       # Styles
├── App.jsx               # Router setup
├── TryOnApp.jsx          # Main try-on application
└── main.jsx              # Entry point
```

### CSS Features
- CSS Custom Properties for theming
- Responsive grid layouts
- Glassmorphism with backdrop-filter
- Gradient backgrounds and text
- Accessibility (focus styles, reduced motion)
- Mobile-first responsive design

### Performance
- Optimized animations (GPU-accelerated)
- Lazy loading ready
- Minimal dependencies
- Efficient CSS selectors

## User Flow
1. Land on `/` (landing page)
2. Click any CTA → Navigate to `/app`
3. Start trying on outfits immediately
4. Email capture stores to localStorage for tracking

## Future Enhancements
- [ ] Add video integration for demo placeholder
- [ ] Integrate actual testimonial videos
- [ ] Add exit-intent popup
- [ ] Implement A/B testing for headlines
- [ ] Add analytics tracking
- [ ] Backend integration for email capture
- [ ] Add Stripe integration for pricing
- [ ] Implement actual brand catalog

## Development

### Run Development Server
```bash
cd ~/clawd/projects/style-swap-ui
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Design System

### Colors
- Primary Purple: `#8b5cf6`
- Primary Pink: `#ec4899`
- Accent Blue: `#3b82f6`
- Accent Cyan: `#06b6d4`
- Dark BG: `#0a0a0f`
- Glass BG: `rgba(255, 255, 255, 0.05)`

### Typography
- System font stack for performance
- Fluid typography with clamp()
- Weight hierarchy: 400, 600, 700, 800

### Spacing
- Section padding: `120px 20px` (desktop), `60px 16px` (mobile)
- Card padding: `32px` (desktop), `20px` (mobile)
- Border radius: `24px` (desktop), `16px` (mobile)

---

Built with ❤️ for Style Swap
