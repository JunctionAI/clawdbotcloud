// ============================================
// PREMIUM ANIMATION SYSTEM
// Junction V3
// ============================================

// Core Animation Library
export * from '@/lib/animations';

// Animation Hooks
export * from '@/hooks/useAnimations';

// Scroll Reveal Animations
export { 
  default as ScrollReveal,
  StaggerReveal,
  StaggerItem,
  ParallaxReveal,
  BlurReveal,
  ClipReveal,
  CounterReveal,
} from './ScrollReveal';

// Text Animations
export {
  SplitText,
  WordReveal,
  LineRevealText,
  Typewriter,
  GradientText,
  CountingText,
  ScrambleText,
  HighlightText,
} from './TextAnimations';

// Custom Cursor
export { 
  default as CustomCursor,
  CursorHover,
  MagneticCursor,
} from './CustomCursor';

// SVG Animations
export {
  SVGDraw,
  AnimatedPath,
  AnimatedCircle,
  AnimatedLine,
  AnimatedIcon,
  AnimatedCheckIcon,
  AnimatedArrowIcon,
  AnimatedStarIcon,
  JunctionLogoDraw,
} from './SVGAnimations';

// Loading States
export {
  Skeleton,
  SkeletonText,
  SkeletonCard,
  Shimmer,
  Spinner,
  GradientSpinner,
  DotsLoader,
  PulseLoader,
  ProgressBar,
  LoadingOverlay,
  ContentPlaceholder,
} from './LoadingStates';

// Micro Interactions
export {
  MagneticButton,
  TiltCard,
  HoverScale,
  HoverLift,
  RippleButton,
  GlowOnHover,
  AnimatedBorder,
  ShineEffect,
  BounceOnClick,
  WiggleOnHover,
  Float,
  Pulse,
  AttentionSeeker,
} from './MicroInteractions';

// Page Transitions
export {
  PageTransition,
  SlideTransition,
  FadeScaleTransition,
  RevealTransition,
  StaggeredTransition,
  MorphTransition,
  SectionTransition,
  HeroTransition,
  SmoothScrollLink,
  AnimatedPresenceWrapper,
} from './PageTransitions';

// Parallax Effects
export {
  ParallaxContainer,
  ParallaxLayer,
  ParallaxBackground,
  ParallaxText,
  ScaleOnScroll,
  RotateOnScroll,
  HorizontalParallax,
  DepthLayer,
  StickyParallax,
} from './Parallax';
