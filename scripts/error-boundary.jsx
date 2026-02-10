/**
 * Client-Side Error Boundary & Reporter
 * 
 * Features:
 * - React Error Boundary component
 * - Global error/unhandledrejection handlers
 * - Batched error reporting to server
 * - Deduplication to avoid spam
 * 
 * Usage:
 *   import { ErrorBoundary, initErrorReporting } from './error-boundary';
 *   
 *   // Initialize global handlers (call once)
 *   initErrorReporting({ endpoint: '/api/errors/report' });
 *   
 *   // Wrap your app
 *   <ErrorBoundary fallback={<ErrorPage />}>
 *     <App />
 *   </ErrorBoundary>
 */

import React from 'react';

// ============================================================
// ERROR REPORTER (Vanilla JS - works without React)
// ============================================================

const reporterState = {
  endpoint: '/api/errors/report',
  userId: null,
  queue: [],
  reported: new Set(), // fingerprints already reported (dedup)
  flushTimeout: null,
  maxQueueSize: 10,
  flushIntervalMs: 5000,
  enabled: true,
};

/**
 * Initialize error reporting
 */
export function initErrorReporting(options = {}) {
  reporterState.endpoint = options.endpoint || '/api/errors/report';
  reporterState.userId = options.userId || null;
  reporterState.enabled = options.enabled !== false;
  reporterState.maxQueueSize = options.maxQueueSize || 10;
  reporterState.flushIntervalMs = options.flushIntervalMs || 5000;
  
  if (!reporterState.enabled) return;
  
  // Global error handler
  window.addEventListener('error', (event) => {
    reportError({
      message: event.message,
      stack: event.error?.stack || `${event.filename}:${event.lineno}:${event.colno}`,
      type: 'uncaught',
    });
  });
  
  // Unhandled promise rejection handler
  window.addEventListener('unhandledrejection', (event) => {
    const error = event.reason;
    reportError({
      message: error?.message || String(error),
      stack: error?.stack || 'No stack trace',
      type: 'unhandledrejection',
    });
  });
  
  // Flush queue on page unload
  window.addEventListener('beforeunload', () => {
    flushQueue(true);
  });
  
  console.log('[ErrorReporter] Initialized');
}

/**
 * Set the current user ID
 */
export function setErrorReportingUser(userId) {
  reporterState.userId = userId;
}

/**
 * Generate fingerprint for deduplication
 */
function getFingerprint(errorInfo) {
  const msg = errorInfo.message || '';
  const stack = (errorInfo.stack || '').split('\n')[1] || '';
  return `${msg}::${stack}`.substring(0, 200);
}

/**
 * Report an error to the server
 */
export function reportError(errorInfo) {
  if (!reporterState.enabled) return;
  
  const fingerprint = getFingerprint(errorInfo);
  
  // Skip if already reported in this session
  if (reporterState.reported.has(fingerprint)) {
    return;
  }
  reporterState.reported.add(fingerprint);
  
  const entry = {
    message: errorInfo.message,
    stack: errorInfo.stack,
    url: window.location.href,
    userAgent: navigator.userAgent,
    userId: reporterState.userId,
    extra: {
      type: errorInfo.type || 'manual',
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    },
  };
  
  reporterState.queue.push(entry);
  
  // Flush if queue is full
  if (reporterState.queue.length >= reporterState.maxQueueSize) {
    flushQueue();
  } else {
    // Schedule flush
    scheduleFlush();
  }
}

/**
 * Schedule queue flush
 */
function scheduleFlush() {
  if (reporterState.flushTimeout) return;
  
  reporterState.flushTimeout = setTimeout(() => {
    reporterState.flushTimeout = null;
    flushQueue();
  }, reporterState.flushIntervalMs);
}

/**
 * Flush the error queue to the server
 */
async function flushQueue(sync = false) {
  if (reporterState.queue.length === 0) return;
  
  const errors = [...reporterState.queue];
  reporterState.queue = [];
  
  for (const error of errors) {
    try {
      if (sync && navigator.sendBeacon) {
        // Use sendBeacon for page unload (doesn't block)
        navigator.sendBeacon(
          reporterState.endpoint,
          JSON.stringify(error)
        );
      } else {
        await fetch(reporterState.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(error),
        });
      }
    } catch (e) {
      // Silently fail - don't cause more errors
      console.warn('[ErrorReporter] Failed to send:', e.message);
    }
  }
}

// ============================================================
// REACT ERROR BOUNDARY
// ============================================================

/**
 * Error Boundary component
 * 
 * Props:
 * - fallback: React element or function (error, reset) => element
 * - onError: callback (error, errorInfo) => void
 * - children: React children
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    // Report to server
    reportError({
      message: error.message,
      stack: error.stack,
      type: 'react_boundary',
      componentStack: errorInfo.componentStack,
    });
    
    // Call onError prop if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('[ErrorBoundary] Caught error:', error);
      console.error('[ErrorBoundary] Component stack:', errorInfo.componentStack);
    }
  }
  
  reset = () => {
    this.setState({ hasError: false, error: null });
  };
  
  render() {
    if (this.state.hasError) {
      const { fallback } = this.props;
      
      // Function fallback: (error, reset) => element
      if (typeof fallback === 'function') {
        return fallback(this.state.error, this.reset);
      }
      
      // Element fallback
      if (fallback) {
        return fallback;
      }
      
      // Default fallback
      return (
        <div style={{
          padding: '20px',
          textAlign: 'center',
          fontFamily: 'system-ui, sans-serif',
        }}>
          <h2>Something went wrong</h2>
          <p style={{ color: '#666' }}>
            An error occurred. Please try refreshing the page.
          </p>
          <button
            onClick={this.reset}
            style={{
              padding: '10px 20px',
              fontSize: '14px',
              cursor: 'pointer',
              backgroundColor: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
            }}
          >
            Try Again
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}

// ============================================================
// REACT HOOKS
// ============================================================

/**
 * Hook to report errors manually
 */
export function useErrorReporter() {
  return {
    reportError,
    setUser: setErrorReportingUser,
  };
}

/**
 * Hook for async error handling
 */
export function useAsyncError() {
  const [, setError] = React.useState();
  
  return React.useCallback((error) => {
    // Report the error
    reportError({
      message: error.message,
      stack: error.stack,
      type: 'async',
    });
    
    // Re-throw to trigger error boundary
    setError(() => {
      throw error;
    });
  }, []);
}

// ============================================================
// DEFAULT EXPORT
// ============================================================

export default {
  ErrorBoundary,
  initErrorReporting,
  setErrorReportingUser,
  reportError,
  useErrorReporter,
  useAsyncError,
};
