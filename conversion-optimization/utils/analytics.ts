/**
 * Analytics utility for tracking conversion events
 * Integrate with your analytics provider (Google Analytics, Mixpanel, etc.)
 */

export const trackEvent = (
  eventName: string,
  properties?: Record<string, any>
) => {
  // Google Analytics 4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, properties);
  }

  // Facebook Pixel
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', eventName, properties);
  }

  // Console log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Analytics Event:', eventName, properties);
  }
};

export const trackConversion = (value: number, currency = 'USD') => {
  trackEvent('purchase', {
    value,
    currency,
    timestamp: new Date().toISOString(),
  });
};

export const trackExitIntent = (action: 'shown' | 'dismissed' | 'converted') => {
  trackEvent('exit_intent', { action });
};

export const trackPageView = (pageName: string) => {
  trackEvent('page_view', { page: pageName });
};

export const trackTimerExpired = (timerType: string) => {
  trackEvent('timer_expired', { timer_type: timerType });
};

export const trackSocialProofClick = (proofType: string) => {
  trackEvent('social_proof_click', { proof_type: proofType });
};
