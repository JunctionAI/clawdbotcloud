# 🚀 Nexus Landing Page

A stunning, $50M startup-quality landing page built with Next.js 14, Tailwind CSS, and Framer Motion.

## ✨ Features

### Visual Effects
- **Particle System** - Interactive canvas-based particle field with connecting lines
- **Floating Orbs** - Animated gradient orbs for depth and atmosphere
- **Gradient Text** - Animated gradient text with smooth color transitions
- **3D Card Transforms** - Mouse-following 3D perspective cards
- **Glassmorphism** - Modern frosted glass UI components
- **Scroll Animations** - Smooth reveal animations on scroll

### Interactive Elements
- **Magnetic Buttons** - Buttons that follow your cursor with spring physics
- **Typing Animation** - Rotating headline with typewriter effect
- **Animated Counters** - Numbers that count up when scrolling into view
- **Testimonial Typing** - Character-by-character testimonial reveal
- **Scroll Progress** - Gradient progress bar at the top

### Sections
1. **Hero** - Bold headline with typing animation, CTAs, social proof, and product preview
2. **Logos** - Infinite scrolling logo carousel
3. **Features** - 6 feature cards with 3D hover effects
4. **Stats** - Key metrics with animated counters
5. **Testimonials** - 3 testimonial cards with typing animation and 5-star ratings
6. **Pricing** - 3-tier pricing cards with popular highlight
7. **CTA** - Final conversion section with animated gradient background
8. **Footer** - Full sitemap with social links

## 🛠 Installation

### Prerequisites
- Node.js 18+
- Next.js 14+

### Dependencies

```bash
npm install framer-motion
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Tailwind Configuration

Update `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'gradient': 'gradient 8s linear infinite',
        'gradient-shift': 'gradient-shift 10s ease infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%', filter: 'hue-rotate(0deg)' },
          '50%': { backgroundPosition: '100% 50%', filter: 'hue-rotate(30deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}
```

### Usage

1. Copy `page.tsx` to `app/page.tsx`
2. Copy `globals.css` to `app/globals.css`
3. Import globals.css in your layout

```tsx
// app/layout.tsx
import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

4. Run the development server:

```bash
npm run dev
```

## 🎨 Customization

### Colors
The color scheme uses Tailwind's violet, fuchsia, and cyan palette. To change:
- Search for `violet-500`, `fuchsia-500`, `cyan-500` and replace with your brand colors
- Update gradient definitions in the components

### Content
- **Hero**: Edit headline, subheadline, and typing animations in `HeroSection`
- **Features**: Modify the `features` array in `FeaturesSection`
- **Testimonials**: Update `testimonials` array in `TestimonialsSection`
- **Pricing**: Change `plans` array in `PricingSection`

### Animations
- Adjust Framer Motion `transition` props for timing
- Modify particle count in `ParticleField` (line ~30)
- Change orb animation duration in `FloatingOrbs`

## 📊 Conversion Optimization

This page is designed for maximum conversion:

1. **Strong Value Prop** - Clear, benefit-focused headline
2. **Social Proof** - User avatars, review ratings, company logos
3. **Trust Signals** - Security badges, uptime stats
4. **Multiple CTAs** - Strategic placement throughout
5. **Urgency** - "Start Free Trial" language
6. **Risk Reversal** - "No credit card required" messaging
7. **Progressive Disclosure** - Information revealed as user scrolls
8. **Visual Hierarchy** - Clear path to conversion

## 🔧 Performance Tips

1. **Reduce particles** on mobile for better performance
2. **Lazy load** sections below the fold
3. **Preload fonts** for faster text rendering
4. **Optimize images** if adding product screenshots

## 📱 Responsive

Fully responsive design:
- Mobile: Single column, reduced animations
- Tablet: 2-column layouts
- Desktop: Full experience with all effects

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 License

MIT License - Use freely for commercial projects.

---

Built with 💜 for maximum conversions.
