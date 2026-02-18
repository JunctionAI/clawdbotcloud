'use client';

import Script from 'next/script';

// ─── Google Analytics 4 ──────────────────────────────────────────────────────
// Set NEXT_PUBLIC_GA4_ID in Vercel environment variables to activate.
// e.g. NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
// Inactive in development unless NEXT_PUBLIC_GA4_ID is set.

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;

export function GoogleAnalytics() {
  if (!GA4_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA4_ID}', {
            page_path: window.location.pathname,
            send_page_view: true,
          });
        `}
      </Script>
    </>
  );
}

// ─── Track Events ─────────────────────────────────────────────────────────────
// Usage: trackEvent('apply_form_submit', { business: 'Acme Co' })

export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window === 'undefined') return;
  if (!(window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag) return;
  (window as typeof window & { gtag: (...args: unknown[]) => void }).gtag(
    'event',
    eventName,
    params
  );
}
