'use client';

import { ReactNode } from 'react';

interface SmoothScrollProps {
  children: ReactNode;
}

// Simplified - removed Lenis as it was conflicting with scroll-triggered animations
// and causing glitchy scrolling. Using native smooth scroll via CSS instead.
export default function SmoothScroll({ children }: SmoothScrollProps) {
  return <>{children}</>;
}
