import { useEffect, useState } from 'react';

interface UseExitIntentOptions {
  enabled?: boolean;
  sensitivity?: number;
  delay?: number;
  showOnce?: boolean;
  cookieName?: string;
  cookieExpireDays?: number;
}

export const useExitIntent = (options: UseExitIntentOptions = {}) => {
  const {
    enabled = true,
    sensitivity = 20,
    delay = 0,
    showOnce = true,
    cookieName = 'exit-intent-shown',
    cookieExpireDays = 7,
  } = options;

  const [showExitIntent, setShowExitIntent] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    // Check if already shown
    if (showOnce && document.cookie.includes(cookieName)) {
      return;
    }

    let timeout: NodeJS.Timeout;
    let hasShown = false;

    const handleMouseLeave = (e: MouseEvent) => {
      if (hasShown) return;

      // Detect mouse leaving from top of viewport
      if (e.clientY < sensitivity) {
        timeout = setTimeout(() => {
          setShowExitIntent(true);
          hasShown = true;

          // Set cookie
          if (showOnce) {
            const expires = new Date();
            expires.setDate(expires.getDate() + cookieExpireDays);
            document.cookie = `${cookieName}=true; expires=${expires.toUTCString()}; path=/`;
          }
        }, delay);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (timeout) clearTimeout(timeout);
    };
  }, [enabled, sensitivity, delay, showOnce, cookieName, cookieExpireDays]);

  const hideExitIntent = () => setShowExitIntent(false);

  return { showExitIntent, hideExitIntent };
};
