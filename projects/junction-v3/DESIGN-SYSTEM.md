# Junction Premium Design System

> Inspired by Linear + Stripe's design language

This document outlines the complete design system for Junction, including all tokens, utilities, and usage guidelines.

---

## Table of Contents

1. [Typography](#typography)
2. [Colors](#colors)
3. [Spacing](#spacing)
4. [Shadows](#shadows)
5. [Border Radius](#border-radius)
6. [Animations](#animations)
7. [Glassmorphism](#glassmorphism)
8. [Components](#components)
9. [Utilities](#utilities)

---

## Typography

### Fluid Type Scale

Uses `clamp()` for seamless responsive scaling. All sizes include optimized line-heights and letter-spacing.

| Token | Size Range | Use Case |
|-------|------------|----------|
| `text-display-2xl` | 72px → 96px | Hero headlines |
| `text-display-xl` | 60px → 72px | Section titles |
| `text-display-lg` | 48px → 60px | Large headings |
| `text-display` | 36px → 48px | Standard headings |
| `text-heading-xl` | 30px → 36px | H1 equivalent |
| `text-heading-lg` | 24px → 30px | H2 equivalent |
| `text-heading` | 20px → 24px | H3 equivalent |
| `text-heading-sm` | 18px → 20px | H4 equivalent |
| `text-body-xl` | 20px | Large body |
| `text-body-lg` | 18px | Featured body |
| `text-body` | 16px | Standard body |
| `text-body-sm` | 14px | Small body |
| `text-caption` | 12px | Captions |
| `text-micro` | 10px | Tiny text |

### Usage Example

```jsx
<h1 className="text-display-2xl gradient-text">
  Premium Headline
</h1>
<p className="text-body-lg text-neutral-600">
  Body text with optimal readability.
</p>
```

### Font Weights

| CSS Variable | Value | Tailwind |
|-------------|-------|----------|
| `--font-weight-light` | 300 | `font-light` |
| `--font-weight-regular` | 400 | `font-normal` |
| `--font-weight-book` | 450 | - |
| `--font-weight-medium` | 500 | `font-medium` |
| `--font-weight-semibold` | 600 | `font-semibold` |
| `--font-weight-bold` | 700 | `font-bold` |
| `--font-weight-extrabold` | 800 | `font-extrabold` |
| `--font-weight-black` | 900 | `font-black` |

---

## Colors

### Brand Colors

```css
--color-brand-blue: #3B82F6;
--color-brand-purple: #8B5CF6;
--color-brand-pink: #EC4899;
```

| Tailwind Class | Color |
|----------------|-------|
| `text-brand-blue` | #3B82F6 |
| `text-brand-purple` | #8B5CF6 |
| `text-brand-pink` | #EC4899 |

### Neutral Scale

Cool grays inspired by Linear's palette.

| Token | Hex | Usage |
|-------|-----|-------|
| `neutral-0` | #FFFFFF | Backgrounds |
| `neutral-50` | #FAFBFC | Subtle backgrounds |
| `neutral-100` | #F4F5F7 | Cards, inputs |
| `neutral-150` | #EBEDF0 | Dividers |
| `neutral-200` | #DFE1E6 | Borders |
| `neutral-300` | #C1C7D0 | Disabled |
| `neutral-400` | #A5ADBA | Placeholders |
| `neutral-500` | #7A869A | Secondary text |
| `neutral-600` | #5E6C84 | Body text |
| `neutral-700` | #42526E | Headings |
| `neutral-800` | #253858 | Primary text |
| `neutral-900` | #172B4D | Headlines |
| `neutral-950` | #0D1B2A | Near black |
| `neutral-1000` | #091020 | Pure dark |

### Primary (Blue)

Full spectrum from 25 to 950.

```jsx
<button className="bg-primary-500 hover:bg-primary-600">
  Primary Button
</button>
```

### Accent (Purple)

Full spectrum from 25 to 950.

```jsx
<span className="text-accent-500">
  Accent text
</span>
```

### Semantic Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `success-500` | #10B981 | Success states |
| `warning-500` | #F59E0B | Warnings |
| `error-500` | #EF4444 | Errors |

---

## Spacing

### Golden Ratio Scale (φ = 1.618)

Harmonious spacing based on the golden ratio.

| Token | Size | Pixels |
|-------|------|--------|
| `golden-xs` | 0.25rem | 4px |
| `golden-sm` | 0.375rem | 6px |
| `golden` | 0.625rem | 10px |
| `golden-md` | 1rem | 16px |
| `golden-lg` | 1.625rem | 26px |
| `golden-xl` | 2.625rem | 42px |
| `golden-2xl` | 4.25rem | 68px |
| `golden-3xl` | 6.875rem | 110px |
| `golden-4xl` | 11.125rem | 178px |

### Section Spacing

| Token | Size | Usage |
|-------|------|-------|
| `section-xs` | 3rem | Compact sections |
| `section-sm` | 4rem | Small gaps |
| `section` | 6rem | Standard |
| `section-md` | 8rem | Medium |
| `section-lg` | 10rem | Large |
| `section-xl` | 12rem | Extra large |

### Usage

```jsx
<section className="py-section">
  <div className="space-y-golden-lg">
    <h2>...</h2>
    <p>...</p>
  </div>
</section>
```

---

## Shadows

### Elevation System

Multi-layered shadows for realistic depth perception.

| Token | Usage |
|-------|-------|
| `shadow-elevation-1` | Subtle lift (cards, buttons) |
| `shadow-elevation-2` | Medium lift (dropdowns) |
| `shadow-elevation-3` | High lift (modals) |
| `shadow-elevation-4` | Maximum lift (floating) |

### Glow Effects

| Token | Color |
|-------|-------|
| `shadow-glow-primary` | Blue glow |
| `shadow-glow-primary-lg` | Large blue glow |
| `shadow-glow-accent` | Purple glow |
| `shadow-glow-accent-lg` | Large purple glow |
| `shadow-glow-rose` | Pink glow |
| `shadow-glow-gradient` | Multi-color glow |

### Card Shadows

| Token | Usage |
|-------|-------|
| `shadow-card` | Default card |
| `shadow-card-hover` | Hover state |
| `shadow-card-premium` | Premium cards |
| `shadow-glass` | Glass elements |

### Usage

```jsx
<div className="shadow-elevation-2 hover:shadow-elevation-3 transition-shadow">
  Card content
</div>

<button className="shadow-glow-primary hover:shadow-glow-gradient">
  Glowing button
</button>
```

---

## Border Radius

| Token | Size | Usage |
|-------|------|-------|
| `rounded-radius-xs` | 4px | Subtle rounding |
| `rounded-radius-sm` | 6px | Small elements |
| `rounded-radius` | 8px | Buttons, inputs |
| `rounded-radius-md` | 12px | Cards (small) |
| `rounded-radius-lg` | 16px | Cards (large) |
| `rounded-radius-xl` | 20px | Panels |
| `rounded-radius-2xl` | 24px | Hero sections |
| `rounded-radius-3xl` | 32px | Premium containers |
| `rounded-pill` | 9999px | Pills, tags |

---

## Animations

### Timing Functions

Premium easing curves for polished interactions.

| Token | Bezier | Usage |
|-------|--------|-------|
| `ease-smooth` | (0.4, 0, 0.2, 1) | UI transitions |
| `ease-spring` | (0.175, 0.885, 0.32, 1.275) | Bouncy, playful |
| `ease-expo-out` | (0.16, 1, 0.3, 1) | Page transitions |
| `ease-expo-in-out` | (0.87, 0, 0.13, 1) | Hero animations |
| `ease-back-out` | (0.34, 1.56, 0.64, 1) | Attention-grabbing |
| `ease-elastic` | (0.68, -0.55, 0.265, 1.55) | Micro-interactions |
| `ease-circ-out` | (0, 0.55, 0.45, 1) | Smooth acceleration |
| `ease-quint-out` | (0.22, 1, 0.36, 1) | Subtle deceleration |

### Animation Presets

```jsx
// Fade animations
<div className="animate-fade-in">...</div>
<div className="animate-fade-in-up">...</div>
<div className="animate-fade-in-down">...</div>

// Slide animations
<div className="animate-slide-up">...</div>
<div className="animate-slide-down">...</div>

// Scale animations
<div className="animate-scale-in">...</div>
<div className="animate-pop">...</div>

// Float animations
<div className="animate-float">...</div>
<div className="animate-float-slow">...</div>

// Glow animations
<div className="animate-pulse-glow">...</div>
<div className="animate-breathe">...</div>

// Gradient animations
<div className="animate-gradient">...</div>
<div className="animate-gradient-x">...</div>
```

### Duration Tokens

| Token | Duration |
|-------|----------|
| `duration-50` | 50ms |
| `duration-100` | 100ms |
| `duration-150` | 150ms |
| `duration-200` | 200ms |
| `duration-300` | 300ms |
| `duration-400` | 400ms |
| `duration-500` | 500ms |
| `duration-700` | 700ms |
| `duration-1000` | 1000ms |

### Usage

```jsx
<button className="transition-all duration-300 ease-spring hover:scale-105">
  Spring Button
</button>

<div className="transition-transform duration-500 ease-expo-out">
  Smooth Transform
</div>
```

---

## Glassmorphism

### Glass Variants

| Class | Description |
|-------|-------------|
| `.glass` | Standard glass (24px blur) |
| `.glass-soft` | Lighter glass (16px blur) |
| `.glass-subtle` | Minimal glass (8px blur) |
| `.glass-premium` | Heavy glass (40px blur) |
| `.glass-dark` | Dark glass |
| `.glass-frosted` | iOS-style frost (64px blur) |

### Usage

```jsx
<div className="glass rounded-radius-lg p-golden-lg">
  Glass card content
</div>

<nav className="glass-frosted fixed top-0 inset-x-0">
  Navigation
</nav>

<div className="glass-premium shadow-glass">
  Premium glass panel
</div>
```

### Blur Utilities

| Token | Size |
|-------|------|
| `blur-xs` | 4px |
| `blur-sm` | 8px |
| `blur` | 12px |
| `blur-md` | 16px |
| `blur-lg` | 24px |
| `blur-xl` | 40px |
| `blur-2xl` | 64px |
| `blur-3xl` | 80px |
| `blur-4xl` | 96px |
| `blur-5xl` | 128px |

---

## Components

### Buttons

```jsx
// Primary (gradient)
<button className="btn btn-primary">Primary</button>

// Secondary (outlined)
<button className="btn btn-secondary">Secondary</button>

// Ghost (text only)
<button className="btn btn-ghost">Ghost</button>

// Glass
<button className="btn btn-glass">Glass</button>

// Sizes
<button className="btn btn-primary btn-sm">Small</button>
<button className="btn btn-primary btn-lg">Large</button>
<button className="btn btn-primary btn-xl">Extra Large</button>
```

### Cards

```jsx
// Standard card
<div className="card p-golden-lg">
  Card content
</div>

// Interactive card
<div className="card card-interactive p-golden-lg">
  Clickable card
</div>

// Glowing card
<div className="card card-glow p-golden-lg">
  Card with hover glow
</div>
```

### Inputs

```jsx
<input className="input" placeholder="Standard input" />
<input className="input-glass" placeholder="Glass input" />
```

### Gradient Text

```jsx
<h1 className="gradient-text">Gradient Headline</h1>
<h1 className="gradient-text-vivid">Vivid Gradient</h1>
<h1 className="gradient-text-subtle">Subtle Gradient</h1>
```

### Borders

```jsx
// Gradient border
<div className="border-gradient p-6">
  Content with gradient border
</div>

// Animated border
<div className="border-animated rounded-radius-lg p-6">
  Content with rotating border
</div>
```

---

## Utilities

### Reveal on Scroll

```jsx
<div className="reveal">
  Fades in when scrolled into view
</div>

<div className="reveal-scale">
  Scales in when scrolled into view
</div>
```

### Stagger Children

```jsx
<div className="stagger">
  <div>First (0ms delay)</div>
  <div>Second (100ms delay)</div>
  <div>Third (200ms delay)</div>
</div>
```

### Link Animations

```jsx
<a className="link-underline">Animated underline</a>
<a className="link-gradient">Gradient underline</a>
```

### Interactive Effects

```jsx
// Magnetic hover
<button className="magnetic">Magnetic</button>

// Lift on hover
<div className="lift">Lifts up</div>

// Glow effects
<div className="glow">Blue glow</div>
<div className="glow-accent">Purple glow</div>
<div className="glow-gradient">Multi-color glow</div>
<div className="glow-pulse">Pulsing glow</div>
```

### Mesh Gradients

```jsx
<section className="mesh-gradient">
  Subtle colored orbs
</section>

<section className="mesh-gradient-subtle">
  Very subtle orbs
</section>

<section className="mesh-gradient-vivid">
  Vibrant orbs
</section>
```

### Skeleton Loading

```jsx
<div className="skeleton h-4 w-full" />
<div className="skeleton h-8 w-3/4" />
```

### Text Utilities

```jsx
<p className="text-balance">Balanced text wrapping</p>
<p className="text-pretty">Pretty text wrapping</p>
<h1 className="text-stroke">Outlined text</h1>
```

---

## Z-Index Scale

| Token | Value | Usage |
|-------|-------|-------|
| `z-behind` | -1 | Behind content |
| `z-0` to `z-5` | 0-5 | Standard layering |
| `z-dropdown` | 100 | Dropdowns |
| `z-sticky` | 200 | Sticky headers |
| `z-fixed` | 300 | Fixed elements |
| `z-modal-backdrop` | 400 | Modal overlays |
| `z-modal` | 500 | Modal content |
| `z-popover` | 600 | Popovers |
| `z-tooltip` | 700 | Tooltips |
| `z-toast` | 800 | Toast notifications |
| `z-top` | 999 | Always on top |

---

## Accessibility

### Focus States

All interactive elements have visible focus rings:

```css
:focus-visible {
  box-shadow: 
    0 0 0 2px var(--color-neutral-0),
    0 0 0 4px var(--color-primary-500);
}
```

### Reduced Motion

Animations are disabled for users who prefer reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Quick Reference

### Common Patterns

```jsx
// Premium hero section
<section className="mesh-gradient py-section-lg">
  <div className="max-w-container-xl mx-auto px-golden-lg">
    <h1 className="text-display-2xl gradient-text text-center animate-fade-in-up">
      Hero Headline
    </h1>
    <p className="text-body-xl text-neutral-600 text-center mt-golden-lg max-w-container-md mx-auto">
      Supporting text
    </p>
    <div className="flex gap-golden-md justify-center mt-golden-xl">
      <button className="btn btn-primary btn-lg">Get Started</button>
      <button className="btn btn-secondary btn-lg">Learn More</button>
    </div>
  </div>
</section>

// Premium card grid
<div className="grid grid-cols-1 md:grid-cols-3 gap-golden-lg stagger">
  <div className="card card-interactive card-glow p-golden-lg">
    <h3 className="text-heading-lg">Feature One</h3>
    <p className="text-body text-neutral-600 mt-golden">Description</p>
  </div>
  ...
</div>

// Glass navbar
<nav className="glass-frosted fixed inset-x-0 top-0 z-fixed py-golden-md px-golden-lg">
  <div className="flex items-center justify-between max-w-container-2xl mx-auto">
    ...
  </div>
</nav>
```

---

## File Structure

```
src/
├── app/
│   └── globals.css       # Global styles & CSS variables
├── tailwind.config.ts    # Tailwind configuration
└── DESIGN-SYSTEM.md      # This documentation
```

---

*Last updated: January 2025*
