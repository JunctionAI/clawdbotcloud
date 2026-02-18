import type { Config } from "tailwindcss";

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * JUNCTION PREMIUM DESIGN SYSTEM
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Inspired by Linear + Stripe's design language
 * 
 * DESIGN TOKENS DOCUMENTATION:
 * 
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │ TYPOGRAPHY                                                                  │
 * │ ─────────────────────────────────────────────────────────────────────────── │
 * │ Uses fluid typography with clamp() for seamless responsive scaling          │
 * │                                                                             │
 * │ display-2xl: Hero headlines (72-96px)                                       │
 * │ display-xl:  Section titles (60-72px)                                       │
 * │ display-lg:  Large headings (48-60px)                                       │
 * │ display:     Standard headings (36-48px)                                    │
 * │ heading-xl:  H1 equivalent (30-36px)                                        │
 * │ heading-lg:  H2 equivalent (24-30px)                                        │
 * │ heading:     H3 equivalent (20-24px)                                        │
 * │ heading-sm:  H4 equivalent (18-20px)                                        │
 * │ body-lg:     Large body text (18px)                                         │
 * │ body:        Standard body (16px)                                           │
 * │ body-sm:     Small body (14px)                                              │
 * │ caption:     Captions/labels (12px)                                         │
 * │ micro:       Tiny text (10px)                                               │
 * │                                                                             │
 * │ Line heights optimized per size for maximum readability                     │
 * └─────────────────────────────────────────────────────────────────────────────┘
 * 
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │ SPACING (GOLDEN RATIO BASED)                                               │
 * │ ─────────────────────────────────────────────────────────────────────────── │
 * │ Base unit: 4px, scaled by φ (1.618) for harmonic proportions               │
 * │                                                                             │
 * │ golden-xs:   4px   (base)                                                  │
 * │ golden-sm:   6px   (base × 1.618)                                          │
 * │ golden:      10px  (6 × 1.618)                                             │
 * │ golden-md:   16px  (10 × 1.618)                                            │
 * │ golden-lg:   26px  (16 × 1.618)                                            │
 * │ golden-xl:   42px  (26 × 1.618)                                            │
 * │ golden-2xl:  68px  (42 × 1.618)                                            │
 * │ golden-3xl:  110px (68 × 1.618)                                            │
 * │ golden-4xl:  178px (110 × 1.618)                                           │
 * └─────────────────────────────────────────────────────────────────────────────┘
 * 
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │ SHADOWS (LAYERED, REALISTIC)                                               │
 * │ ─────────────────────────────────────────────────────────────────────────── │
 * │ Multi-layer shadows for depth and realism                                  │
 * │                                                                             │
 * │ elevation-1:  Subtle lift (cards, buttons)                                 │
 * │ elevation-2:  Medium lift (dropdowns, popovers)                            │
 * │ elevation-3:  High lift (modals, dialogs)                                  │
 * │ elevation-4:  Maximum lift (floating elements)                             │
 * │                                                                             │
 * │ glow-*:       Colored glows for emphasis                                   │
 * │ inner-*:      Inner shadows for depth                                      │
 * └─────────────────────────────────────────────────────────────────────────────┘
 * 
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │ BORDER RADIUS                                                              │
 * │ ─────────────────────────────────────────────────────────────────────────── │
 * │ Consistent, modern curves                                                  │
 * │                                                                             │
 * │ radius-xs:   4px  (subtle rounding)                                        │
 * │ radius-sm:   6px  (small elements)                                         │
 * │ radius:      8px  (buttons, inputs)                                        │
 * │ radius-md:   12px (cards, small containers)                                │
 * │ radius-lg:   16px (large cards)                                            │
 * │ radius-xl:   20px (panels, modals)                                         │
 * │ radius-2xl:  24px (hero sections)                                          │
 * │ radius-3xl:  32px (premium containers)                                     │
 * └─────────────────────────────────────────────────────────────────────────────┘
 * 
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │ ANIMATION TIMING                                                           │
 * │ ─────────────────────────────────────────────────────────────────────────── │
 * │ Premium easing functions for polished interactions                         │
 * │                                                                             │
 * │ ease-smooth:      Smooth deceleration (UI transitions)                     │
 * │ ease-spring:      Bouncy, playful (buttons, modals)                        │
 * │ ease-expo-out:    Sharp deceleration (page transitions)                    │
 * │ ease-expo-in-out: Dramatic (hero animations)                               │
 * │ ease-back-out:    Overshoot (attention-grabbing)                           │
 * │ ease-elastic:     Elastic bounce (delightful micro-interactions)           │
 * │ ease-linear:      Linear for continuous animations                         │
 * └─────────────────────────────────────────────────────────────────────────────┘
 * 
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │ BLUR / GLASS EFFECTS                                                       │
 * │ ─────────────────────────────────────────────────────────────────────────── │
 * │ Modern glassmorphism with varying intensity                                │
 * │                                                                             │
 * │ blur-xs:     4px  (subtle softening)                                       │
 * │ blur-sm:     8px  (light frost)                                            │
 * │ blur:        12px (standard glass)                                         │
 * │ blur-md:     16px (medium glass)                                           │
 * │ blur-lg:     24px (frosted glass)                                          │
 * │ blur-xl:     40px (heavy frost)                                            │
 * │ blur-2xl:    64px (extreme blur)                                           │
 * │ blur-3xl:    80px (background diffusion)                                   │
 * │ blur-4xl:    96px (ambient glow)                                           │
 * │ blur-5xl:    128px(atmospheric)                                            │
 * └─────────────────────────────────────────────────────────────────────────────┘
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ═══════════════════════════════════════════════════════════════════════
      // COLORS - Refined palette with semantic naming
      // ═══════════════════════════════════════════════════════════════════════
      colors: {
        // Brand Core
        brand: {
          blue: '#3B82F6',
          purple: '#8B5CF6',
          pink: '#EC4899',
        },
        
        // Neutral Scale (Linear-inspired cool grays)
        neutral: {
          0: '#FFFFFF',
          50: '#FAFBFC',
          100: '#F4F5F7',
          150: '#EBEDF0',
          200: '#DFE1E6',
          300: '#C1C7D0',
          400: '#A5ADBA',
          500: '#7A869A',
          600: '#5E6C84',
          700: '#42526E',
          800: '#253858',
          900: '#172B4D',
          950: '#0D1B2A',
          1000: '#091020',
        },
        
        // Primary (Blue spectrum)
        primary: {
          25: '#F5F9FF',
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
          950: '#172554',
        },
        
        // Accent (Purple spectrum)
        accent: {
          25: '#FAFAFF',
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
          950: '#2E1065',
        },
        
        // Rose (for CTAs and highlights)
        rose: {
          25: '#FFF5F7',
          50: '#FFF1F3',
          100: '#FFE4E8',
          200: '#FECDD6',
          300: '#FDA4B4',
          400: '#FB7193',
          500: '#EC4899',
          600: '#DB2777',
          700: '#BE185D',
          800: '#9D174D',
          900: '#831843',
          950: '#500724',
        },
        
        // Success
        success: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },
        
        // Warning
        warning: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        
        // Error
        error: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#EF4444',
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D',
        },
        
        // Glass colors (for overlays)
        glass: {
          white: 'rgba(255, 255, 255, 0.8)',
          'white-soft': 'rgba(255, 255, 255, 0.6)',
          'white-subtle': 'rgba(255, 255, 255, 0.4)',
          dark: 'rgba(13, 27, 42, 0.8)',
          'dark-soft': 'rgba(13, 27, 42, 0.6)',
          'dark-subtle': 'rgba(13, 27, 42, 0.4)',
        },
      },

      // ═══════════════════════════════════════════════════════════════════════
      // TYPOGRAPHY - Fluid sizing with optimal line heights
      // ═══════════════════════════════════════════════════════════════════════
      fontSize: {
        // Display sizes (fluid)
        'display-2xl': ['clamp(4.5rem, 8vw, 6rem)', { lineHeight: '1', letterSpacing: '-0.04em', fontWeight: '800' }],
        'display-xl': ['clamp(3.75rem, 6vw, 4.5rem)', { lineHeight: '1', letterSpacing: '-0.035em', fontWeight: '800' }],
        'display-lg': ['clamp(3rem, 5vw, 3.75rem)', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '700' }],
        'display': ['clamp(2.25rem, 4vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.025em', fontWeight: '700' }],
        
        // Heading sizes
        'heading-xl': ['clamp(1.875rem, 3vw, 2.25rem)', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],
        'heading-lg': ['clamp(1.5rem, 2.5vw, 1.875rem)', { lineHeight: '1.25', letterSpacing: '-0.015em', fontWeight: '600' }],
        'heading': ['clamp(1.25rem, 2vw, 1.5rem)', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
        'heading-sm': ['clamp(1.125rem, 1.5vw, 1.25rem)', { lineHeight: '1.35', letterSpacing: '-0.005em', fontWeight: '600' }],
        
        // Body sizes
        'body-xl': ['1.25rem', { lineHeight: '1.6', letterSpacing: '0' }],
        'body-lg': ['1.125rem', { lineHeight: '1.65', letterSpacing: '0' }],
        'body': ['1rem', { lineHeight: '1.7', letterSpacing: '0' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6', letterSpacing: '0.01em' }],
        
        // Small sizes
        'caption': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.02em' }],
        'micro': ['0.625rem', { lineHeight: '1.4', letterSpacing: '0.03em' }],
        
        // Label sizes
        'label-lg': ['0.875rem', { lineHeight: '1.2', letterSpacing: '0.05em', fontWeight: '600' }],
        'label': ['0.75rem', { lineHeight: '1.2', letterSpacing: '0.08em', fontWeight: '600' }],
        'label-sm': ['0.625rem', { lineHeight: '1.2', letterSpacing: '0.1em', fontWeight: '600' }],
      },

      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['var(--font-inter)', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', 'monospace'],
      },

      // ═══════════════════════════════════════════════════════════════════════
      // SPACING - Golden ratio based (φ = 1.618)
      // ═══════════════════════════════════════════════════════════════════════
      spacing: {
        // Golden ratio scale
        'golden-xs': '0.25rem',   // 4px
        'golden-sm': '0.375rem',  // 6px
        'golden': '0.625rem',     // 10px
        'golden-md': '1rem',      // 16px
        'golden-lg': '1.625rem',  // 26px
        'golden-xl': '2.625rem',  // 42px
        'golden-2xl': '4.25rem',  // 68px
        'golden-3xl': '6.875rem', // 110px
        'golden-4xl': '11.125rem', // 178px
        
        // Section spacing
        'section-xs': '3rem',     // 48px
        'section-sm': '4rem',     // 64px
        'section': '6rem',        // 96px
        'section-md': '8rem',     // 128px
        'section-lg': '10rem',    // 160px
        'section-xl': '12rem',    // 192px
        
        // Container max-widths
        'container-xs': '20rem',  // 320px
        'container-sm': '24rem',  // 384px
        'container': '32rem',     // 512px
        'container-md': '42rem',  // 672px
        'container-lg': '56rem',  // 896px
        'container-xl': '72rem',  // 1152px
        'container-2xl': '84rem', // 1344px
      },

      // ═══════════════════════════════════════════════════════════════════════
      // BORDER RADIUS - Consistent curves
      // ═══════════════════════════════════════════════════════════════════════
      borderRadius: {
        'radius-xs': '0.25rem',   // 4px
        'radius-sm': '0.375rem',  // 6px
        'radius': '0.5rem',       // 8px
        'radius-md': '0.75rem',   // 12px
        'radius-lg': '1rem',      // 16px
        'radius-xl': '1.25rem',   // 20px
        'radius-2xl': '1.5rem',   // 24px
        'radius-3xl': '2rem',     // 32px
        'radius-4xl': '2.5rem',   // 40px
        'pill': '9999px',
      },

      // ═══════════════════════════════════════════════════════════════════════
      // SHADOWS - Layered, realistic elevation
      // ═══════════════════════════════════════════════════════════════════════
      boxShadow: {
        // Elevation system (layered for realism)
        'elevation-1': `
          0 1px 2px rgba(0, 0, 0, 0.04),
          0 2px 4px rgba(0, 0, 0, 0.04),
          0 4px 8px rgba(0, 0, 0, 0.03)
        `,
        'elevation-2': `
          0 2px 4px rgba(0, 0, 0, 0.04),
          0 4px 8px rgba(0, 0, 0, 0.04),
          0 8px 16px rgba(0, 0, 0, 0.03),
          0 16px 24px rgba(0, 0, 0, 0.02)
        `,
        'elevation-3': `
          0 4px 8px rgba(0, 0, 0, 0.04),
          0 8px 16px rgba(0, 0, 0, 0.04),
          0 16px 32px rgba(0, 0, 0, 0.04),
          0 32px 48px rgba(0, 0, 0, 0.03)
        `,
        'elevation-4': `
          0 8px 16px rgba(0, 0, 0, 0.05),
          0 16px 32px rgba(0, 0, 0, 0.05),
          0 32px 64px rgba(0, 0, 0, 0.05),
          0 64px 96px rgba(0, 0, 0, 0.04)
        `,
        
        // Colored glows
        'glow-primary': '0 0 24px -4px rgba(59, 130, 246, 0.4)',
        'glow-primary-lg': '0 0 48px -8px rgba(59, 130, 246, 0.5)',
        'glow-accent': '0 0 24px -4px rgba(139, 92, 246, 0.4)',
        'glow-accent-lg': '0 0 48px -8px rgba(139, 92, 246, 0.5)',
        'glow-rose': '0 0 24px -4px rgba(236, 72, 153, 0.4)',
        'glow-rose-lg': '0 0 48px -8px rgba(236, 72, 153, 0.5)',
        'glow-white': '0 0 32px -4px rgba(255, 255, 255, 0.5)',
        
        // Gradient glows (for buttons/CTAs)
        'glow-gradient': `
          0 0 20px -4px rgba(59, 130, 246, 0.3),
          0 0 40px -8px rgba(139, 92, 246, 0.2),
          0 0 60px -12px rgba(236, 72, 153, 0.15)
        `,
        'glow-gradient-lg': `
          0 0 32px -4px rgba(59, 130, 246, 0.4),
          0 0 64px -8px rgba(139, 92, 246, 0.3),
          0 0 96px -12px rgba(236, 72, 153, 0.2)
        `,
        
        // Inner shadows
        'inner-sm': 'inset 0 1px 2px rgba(0, 0, 0, 0.06)',
        'inner': 'inset 0 2px 4px rgba(0, 0, 0, 0.08)',
        'inner-lg': 'inset 0 4px 8px rgba(0, 0, 0, 0.1)',
        'inner-glow': 'inset 0 0 16px rgba(59, 130, 246, 0.1)',
        
        // Card shadows
        'card': `
          0 1px 3px rgba(0, 0, 0, 0.05),
          0 4px 12px rgba(0, 0, 0, 0.05)
        `,
        'card-hover': `
          0 4px 12px rgba(0, 0, 0, 0.08),
          0 12px 32px rgba(0, 0, 0, 0.08)
        `,
        'card-premium': `
          0 2px 8px rgba(0, 0, 0, 0.04),
          0 8px 24px rgba(0, 0, 0, 0.06),
          0 0 0 1px rgba(0, 0, 0, 0.02)
        `,
        
        // Glass shadows
        'glass': `
          0 8px 32px rgba(0, 0, 0, 0.08),
          inset 0 0 0 1px rgba(255, 255, 255, 0.1)
        `,
        'glass-lg': `
          0 16px 64px rgba(0, 0, 0, 0.1),
          inset 0 0 0 1px rgba(255, 255, 255, 0.15)
        `,
      },

      // ═══════════════════════════════════════════════════════════════════════
      // BLUR - Glass effects
      // ═══════════════════════════════════════════════════════════════════════
      blur: {
        xs: '4px',
        sm: '8px',
        DEFAULT: '12px',
        md: '16px',
        lg: '24px',
        xl: '40px',
        '2xl': '64px',
        '3xl': '80px',
        '4xl': '96px',
        '5xl': '128px',
      },

      backdropBlur: {
        xs: '4px',
        sm: '8px',
        DEFAULT: '12px',
        md: '16px',
        lg: '24px',
        xl: '40px',
        '2xl': '64px',
        '3xl': '80px',
      },

      // ═══════════════════════════════════════════════════════════════════════
      // ANIMATION TIMING - Premium easing
      // ═══════════════════════════════════════════════════════════════════════
      transitionTimingFunction: {
        // Standard easing
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        
        // Premium easing (Linear/Stripe style)
        'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'spring-soft': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        
        // Expo curves (dramatic)
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'expo-in': 'cubic-bezier(0.7, 0, 0.84, 0)',
        'expo-in-out': 'cubic-bezier(0.87, 0, 0.13, 1)',
        
        // Back curves (overshoot)
        'back-out': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'back-in': 'cubic-bezier(0.36, 0, 0.66, -0.56)',
        'back-in-out': 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
        
        // Elastic (playful)
        'elastic': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        
        // Circ curves (smooth acceleration)
        'circ-out': 'cubic-bezier(0, 0.55, 0.45, 1)',
        'circ-in': 'cubic-bezier(0.55, 0, 1, 0.45)',
        'circ-in-out': 'cubic-bezier(0.85, 0, 0.15, 1)',
        
        // Quint curves (subtle)
        'quint-out': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'quint-in': 'cubic-bezier(0.64, 0, 0.78, 0)',
        'quint-in-out': 'cubic-bezier(0.83, 0, 0.17, 1)',
      },

      transitionDuration: {
        '0': '0ms',
        '50': '50ms',
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '250': '250ms',
        '300': '300ms',
        '400': '400ms',
        '500': '500ms',
        '600': '600ms',
        '700': '700ms',
        '800': '800ms',
        '1000': '1000ms',
        '1200': '1200ms',
        '1500': '1500ms',
        '2000': '2000ms',
      },

      // ═══════════════════════════════════════════════════════════════════════
      // ANIMATIONS - Premium keyframe animations
      // ═══════════════════════════════════════════════════════════════════════
      animation: {
        // Fade animations
        'fade-in': 'fadeIn 0.5s ease-expo-out',
        'fade-in-up': 'fadeInUp 0.6s ease-expo-out',
        'fade-in-down': 'fadeInDown 0.6s ease-expo-out',
        'fade-in-left': 'fadeInLeft 0.6s ease-expo-out',
        'fade-in-right': 'fadeInRight 0.6s ease-expo-out',
        
        // Slide animations
        'slide-up': 'slideUp 0.5s ease-expo-out',
        'slide-down': 'slideDown 0.5s ease-expo-out',
        'slide-left': 'slideLeft 0.5s ease-expo-out',
        'slide-right': 'slideRight 0.5s ease-expo-out',
        
        // Scale animations
        'scale-in': 'scaleIn 0.4s ease-spring',
        'scale-out': 'scaleOut 0.3s ease-expo-out',
        'pop': 'pop 0.3s ease-spring',
        
        // Float animations
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-fast': 'float 4s ease-in-out infinite',
        
        // Glow animations
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'pulse-glow-fast': 'pulseGlow 1.5s ease-in-out infinite',
        'breathe': 'breathe 4s ease-in-out infinite',
        
        // Gradient animations
        'gradient': 'gradient 8s linear infinite',
        'gradient-fast': 'gradient 4s linear infinite',
        'gradient-slow': 'gradient 12s linear infinite',
        'gradient-x': 'gradientX 3s ease infinite',
        
        // Shimmer/loading
        'shimmer': 'shimmer 2s linear infinite',
        'shine': 'shine 1.5s ease-in-out infinite',
        
        // Spin variations
        'spin-slow': 'spin 8s linear infinite',
        'spin-slower': 'spin 12s linear infinite',
        
        // Bounce variations
        'bounce-slow': 'bounce 3s ease-in-out infinite',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
        
        // Morph animations
        'morph': 'morph 8s ease-in-out infinite',
        'morph-fast': 'morph 4s ease-in-out infinite',
        
        // Entrance animations
        'enter': 'enter 0.4s ease-expo-out',
        'enter-scale': 'enterScale 0.4s ease-spring',
        
        // Text reveal
        'text-reveal': 'textReveal 0.8s ease-expo-out',
        'char-reveal': 'charReveal 0.5s ease-expo-out forwards',
        
        // Rotate
        'rotate-in': 'rotateIn 0.5s ease-spring',
        'rotate-out': 'rotateOut 0.3s ease-expo-out',
        
        // Border
        'border-rotate': 'borderRotate 4s linear infinite',
      },

      keyframes: {
        // Fade animations
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(-24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        
        // Slide animations
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        
        // Scale animations
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        scaleOut: {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.9)' },
        },
        pop: {
          '0%': { transform: 'scale(0.95)' },
          '40%': { transform: 'scale(1.03)' },
          '100%': { transform: 'scale(1)' },
        },
        
        // Float animations
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        
        // Glow animations
        pulseGlow: {
          '0%, 100%': {
            opacity: '1',
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
          },
          '50%': {
            opacity: '0.85',
            boxShadow: '0 0 40px rgba(139, 92, 246, 0.5)',
          },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.02)', opacity: '0.9' },
        },
        
        // Gradient animations
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        
        // Shimmer animations
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        shine: {
          '0%': { left: '-100%', opacity: '0' },
          '50%': { opacity: '0.5' },
          '100%': { left: '100%', opacity: '0' },
        },
        
        // Bounce
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        
        // Morph
        morph: {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '25%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
          '50%': { borderRadius: '50% 60% 30% 60% / 30% 60% 70% 40%' },
          '75%': { borderRadius: '60% 40% 60% 30% / 70% 30% 50% 60%' },
        },
        
        // Entrance
        enter: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        enterScale: {
          '0%': { opacity: '0', transform: 'scale(0.96) translateY(8px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        
        // Text reveal
        textReveal: {
          '0%': { 
            opacity: '0', 
            transform: 'translateY(100%)',
            clipPath: 'inset(0 0 100% 0)',
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateY(0)',
            clipPath: 'inset(0 0 0% 0)',
          },
        },
        charReveal: {
          '0%': { opacity: '0', transform: 'translateY(50%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        
        // Rotate
        rotateIn: {
          '0%': { opacity: '0', transform: 'rotate(-10deg) scale(0.9)' },
          '100%': { opacity: '1', transform: 'rotate(0) scale(1)' },
        },
        rotateOut: {
          '0%': { opacity: '1', transform: 'rotate(0) scale(1)' },
          '100%': { opacity: '0', transform: 'rotate(10deg) scale(0.9)' },
        },
        
        // Border rotation
        borderRotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },

      // ═══════════════════════════════════════════════════════════════════════
      // BACKGROUND IMAGES - Gradients
      // ═══════════════════════════════════════════════════════════════════════
      backgroundImage: {
        // Radial gradients
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-radial-at-t': 'radial-gradient(at top, var(--tw-gradient-stops))',
        'gradient-radial-at-b': 'radial-gradient(at bottom, var(--tw-gradient-stops))',
        'gradient-radial-at-l': 'radial-gradient(at left, var(--tw-gradient-stops))',
        'gradient-radial-at-r': 'radial-gradient(at right, var(--tw-gradient-stops))',
        
        // Conic gradients
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        
        // Brand gradients
        'gradient-brand': 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #EC4899 100%)',
        'gradient-brand-vivid': 'linear-gradient(135deg, #2563EB 0%, #7C3AED 50%, #DB2777 100%)',
        'gradient-brand-soft': 'linear-gradient(135deg, #60A5FA 0%, #A78BFA 50%, #FB7193 100%)',
        
        // Subtle gradients
        'gradient-subtle': 'linear-gradient(180deg, #FFFFFF 0%, #FAFBFC 100%)',
        'gradient-subtle-reverse': 'linear-gradient(0deg, #FFFFFF 0%, #FAFBFC 100%)',
        'gradient-page': 'linear-gradient(180deg, #FFFFFF 0%, #F4F5F7 50%, #EBEDF0 100%)',
        
        // Mesh gradients
        'mesh-light': `
          radial-gradient(ellipse at 0% 0%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
          radial-gradient(ellipse at 100% 0%, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
          radial-gradient(ellipse at 100% 100%, rgba(236, 72, 153, 0.06) 0%, transparent 50%),
          radial-gradient(ellipse at 0% 100%, rgba(59, 130, 246, 0.06) 0%, transparent 50%)
        `,
        'mesh-dark': `
          radial-gradient(ellipse at 0% 0%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse at 100% 0%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
          radial-gradient(ellipse at 100% 100%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
          radial-gradient(ellipse at 0% 100%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)
        `,
        
        // Noise texture (CSS-based)
        'noise': `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        
        // Dot grid
        'dots': `radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)`,
        'dots-light': `radial-gradient(circle, rgba(0,0,0,0.05) 1px, transparent 1px)`,
      },

      backgroundSize: {
        'dots-sm': '16px 16px',
        'dots': '24px 24px',
        'dots-lg': '32px 32px',
        '200%': '200%',
        '300%': '300%',
        '400%': '400%',
      },

      // ═══════════════════════════════════════════════════════════════════════
      // SCREENS - Responsive breakpoints
      // ═══════════════════════════════════════════════════════════════════════
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
      },

      // ═══════════════════════════════════════════════════════════════════════
      // Z-INDEX - Layer system
      // ═══════════════════════════════════════════════════════════════════════
      zIndex: {
        'behind': '-1',
        '0': '0',
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
        'dropdown': '100',
        'sticky': '200',
        'fixed': '300',
        'modal-backdrop': '400',
        'modal': '500',
        'popover': '600',
        'tooltip': '700',
        'toast': '800',
        'top': '999',
      },

      // ═══════════════════════════════════════════════════════════════════════
      // ASPECT RATIO
      // ═══════════════════════════════════════════════════════════════════════
      aspectRatio: {
        'golden': '1.618 / 1',
        'golden-v': '1 / 1.618',
        '4/3': '4 / 3',
        '3/4': '3 / 4',
        '16/9': '16 / 9',
        '9/16': '9 / 16',
        '21/9': '21 / 9',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
