/**
 * Client-Side Error Reporter (Vanilla JS)
 * 
 * Lightweight error reporting for any frontend - no React required.
 * 
 * Usage:
 *   <script src="/scripts/error-reporter-client.js"></script>
 *   <script>
 *     ErrorReporter.init({ endpoint: '/api/errors/report' });
 *   </script>
 * 
 * Or as ES module:
 *   import ErrorReporter from './error-reporter-client.js';
 *   ErrorReporter.init({ endpoint: '/api/errors/report' });
 */

(function(global) {
  'use strict';
  
  const state = {
    endpoint: '/api/errors/report',
    userId: null,
    queue: [],
    reported: new Set(),
    flushTimeout: null,
    maxQueueSize: 10,
    flushIntervalMs: 5000,
    enabled: true,
    initialized: false,
  };
  
  /**
   * Generate fingerprint for deduplication
   */
  function getFingerprint(message, stack) {
    const stackLine = (stack || '').split('\n')[1] || '';
    return `${message || ''}::${stackLine}`.substring(0, 200);
  }
  
  /**
   * Schedule queue flush
   */
  function scheduleFlush() {
    if (state.flushTimeout) return;
    
    state.flushTimeout = setTimeout(function() {
      state.flushTimeout = null;
      flush();
    }, state.flushIntervalMs);
  }
  
  /**
   * Flush error queue to server
   */
  function flush(sync) {
    if (state.queue.length === 0) return;
    
    var errors = state.queue.slice();
    state.queue = [];
    
    errors.forEach(function(error) {
      try {
        if (sync && navigator.sendBeacon) {
          navigator.sendBeacon(state.endpoint, JSON.stringify(error));
        } else {
          var xhr = new XMLHttpRequest();
          xhr.open('POST', state.endpoint, true);
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.send(JSON.stringify(error));
        }
      } catch (e) {
        // Silently fail
      }
    });
  }
  
  /**
   * Report an error
   */
  function report(message, stack, extra) {
    if (!state.enabled) return;
    
    var fingerprint = getFingerprint(message, stack);
    
    // Skip duplicates
    if (state.reported.has(fingerprint)) return;
    state.reported.add(fingerprint);
    
    var entry = {
      message: message,
      stack: stack || 'No stack trace',
      url: window.location.href,
      userAgent: navigator.userAgent,
      userId: state.userId,
      extra: Object.assign({
        timestamp: new Date().toISOString(),
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight,
        },
      }, extra || {}),
    };
    
    state.queue.push(entry);
    
    if (state.queue.length >= state.maxQueueSize) {
      flush();
    } else {
      scheduleFlush();
    }
  }
  
  /**
   * Initialize error reporting
   */
  function init(options) {
    options = options || {};
    
    state.endpoint = options.endpoint || '/api/errors/report';
    state.userId = options.userId || null;
    state.enabled = options.enabled !== false;
    state.maxQueueSize = options.maxQueueSize || 10;
    state.flushIntervalMs = options.flushIntervalMs || 5000;
    
    if (state.initialized || !state.enabled) return;
    state.initialized = true;
    
    // Global error handler
    window.addEventListener('error', function(event) {
      report(
        event.message,
        event.error ? event.error.stack : event.filename + ':' + event.lineno + ':' + event.colno,
        { type: 'uncaught' }
      );
    });
    
    // Unhandled promise rejection
    window.addEventListener('unhandledrejection', function(event) {
      var error = event.reason;
      report(
        error && error.message ? error.message : String(error),
        error && error.stack ? error.stack : null,
        { type: 'unhandledrejection' }
      );
    });
    
    // Console error override (optional)
    if (options.captureConsoleErrors) {
      var originalConsoleError = console.error;
      console.error = function() {
        var args = Array.prototype.slice.call(arguments);
        var message = args.map(function(a) {
          return typeof a === 'object' ? JSON.stringify(a) : String(a);
        }).join(' ');
        
        report(message, null, { type: 'console.error' });
        originalConsoleError.apply(console, arguments);
      };
    }
    
    // Flush on page unload
    window.addEventListener('beforeunload', function() {
      flush(true);
    });
    
    console.log('[ErrorReporter] Initialized');
  }
  
  /**
   * Set current user
   */
  function setUser(userId) {
    state.userId = userId;
  }
  
  /**
   * Manual error reporting
   */
  function captureError(error, extra) {
    if (error instanceof Error) {
      report(error.message, error.stack, extra);
    } else {
      report(String(error), null, extra);
    }
  }
  
  /**
   * Capture a message (not an error)
   */
  function captureMessage(message, extra) {
    report(message, null, Object.assign({ type: 'message' }, extra || {}));
  }
  
  /**
   * Wrap a function to catch errors
   */
  function wrap(fn, extra) {
    return function() {
      try {
        return fn.apply(this, arguments);
      } catch (e) {
        captureError(e, extra);
        throw e;
      }
    };
  }
  
  /**
   * Wrap an async function to catch errors
   */
  function wrapAsync(fn, extra) {
    return function() {
      var args = arguments;
      var self = this;
      return Promise.resolve().then(function() {
        return fn.apply(self, args);
      }).catch(function(e) {
        captureError(e, extra);
        throw e;
      });
    };
  }
  
  // Public API
  var ErrorReporter = {
    init: init,
    setUser: setUser,
    captureError: captureError,
    captureMessage: captureMessage,
    wrap: wrap,
    wrapAsync: wrapAsync,
    flush: function() { flush(); },
  };
  
  // Export for different module systems
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = ErrorReporter;
  } else if (typeof define === 'function' && define.amd) {
    define(function() { return ErrorReporter; });
  } else {
    global.ErrorReporter = ErrorReporter;
  }
  
})(typeof window !== 'undefined' ? window : this);
