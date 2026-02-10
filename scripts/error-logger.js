/**
 * Error Logger - Lightweight self-hosted error logging & alerting
 * 
 * Features:
 * - Express/Next.js middleware
 * - Daily log rotation
 * - Discord webhook alerts on error spikes
 * - Query API for ops dashboard
 * 
 * No external dependencies (no Sentry, etc.)
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Configuration
const config = {
  logDir: process.env.ERROR_LOG_DIR || path.join(process.cwd(), 'logs', 'errors'),
  discordWebhook: process.env.DISCORD_ERROR_WEBHOOK || null,
  alertThreshold: parseInt(process.env.ERROR_ALERT_THRESHOLD) || 10, // errors per window
  alertWindowMs: parseInt(process.env.ERROR_ALERT_WINDOW_MS) || 60000, // 1 minute
  alertCooldownMs: parseInt(process.env.ERROR_ALERT_COOLDOWN_MS) || 300000, // 5 minutes
  maxLogSizeMb: parseInt(process.env.ERROR_LOG_MAX_SIZE_MB) || 50,
  retentionDays: parseInt(process.env.ERROR_LOG_RETENTION_DAYS) || 30,
  environment: process.env.NODE_ENV || 'development',
  serviceName: process.env.SERVICE_NAME || 'clawdbot',
};

// State for spike detection
const state = {
  recentErrors: [], // timestamps of recent errors
  lastAlertTime: 0,
  errorCounts: new Map(), // error fingerprint -> count
};

// Ensure log directory exists
function ensureLogDir() {
  if (!fs.existsSync(config.logDir)) {
    fs.mkdirSync(config.logDir, { recursive: true });
  }
}

// Get today's log filename
function getLogFilename(date = new Date()) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return path.join(config.logDir, `errors-${yyyy}-${mm}-${dd}.json`);
}

// Generate error fingerprint for deduplication
function getErrorFingerprint(error) {
  const message = error.message || String(error);
  const stack = error.stack || '';
  // Use first line of stack trace for fingerprinting
  const stackLine = stack.split('\n')[1] || '';
  return `${message}::${stackLine}`.substring(0, 200);
}

// Format error for logging
function formatError(error, request = null, userId = null, extra = {}) {
  const now = new Date();
  
  const entry = {
    timestamp: now.toISOString(),
    epochMs: now.getTime(),
    level: 'error',
    service: config.serviceName,
    environment: config.environment,
    
    // Error details
    error: {
      name: error.name || 'Error',
      message: error.message || String(error),
      stack: error.stack || null,
      code: error.code || null,
      fingerprint: getErrorFingerprint(error),
    },
    
    // Request context (if available)
    request: request ? {
      method: request.method,
      url: request.url || request.originalUrl,
      path: request.path,
      query: sanitizeQuery(request.query),
      headers: sanitizeHeaders(request.headers),
      ip: request.ip || request.connection?.remoteAddress,
      userAgent: request.headers?.['user-agent'],
    } : null,
    
    // User context
    userId: userId || request?.user?.id || request?.userId || null,
    
    // System info
    system: {
      hostname: require('os').hostname(),
      pid: process.pid,
      nodeVersion: process.version,
      platform: process.platform,
      memoryUsage: process.memoryUsage().heapUsed,
    },
    
    // Extra context
    ...extra,
  };
  
  return entry;
}

// Sanitize headers (remove sensitive data)
function sanitizeHeaders(headers) {
  if (!headers) return null;
  const sanitized = { ...headers };
  const sensitiveKeys = ['authorization', 'cookie', 'x-api-key', 'x-auth-token'];
  for (const key of sensitiveKeys) {
    if (sanitized[key]) {
      sanitized[key] = '[REDACTED]';
    }
  }
  return sanitized;
}

// Sanitize query params (remove sensitive data)
function sanitizeQuery(query) {
  if (!query) return null;
  const sanitized = { ...query };
  const sensitiveKeys = ['token', 'key', 'password', 'secret', 'apiKey', 'api_key'];
  for (const key of sensitiveKeys) {
    if (sanitized[key]) {
      sanitized[key] = '[REDACTED]';
    }
  }
  return sanitized;
}

// Write error to log file
function writeToLog(entry) {
  ensureLogDir();
  const filename = getLogFilename();
  const line = JSON.stringify(entry) + '\n';
  
  try {
    fs.appendFileSync(filename, line);
  } catch (err) {
    console.error('[ErrorLogger] Failed to write to log:', err.message);
  }
}

// Check for error spike and send alert
async function checkAndAlert(entry) {
  const now = Date.now();
  
  // Track recent errors
  state.recentErrors.push(now);
  
  // Clean old entries outside window
  state.recentErrors = state.recentErrors.filter(
    t => now - t < config.alertWindowMs
  );
  
  // Track error counts by fingerprint
  const fp = entry.error.fingerprint;
  state.errorCounts.set(fp, (state.errorCounts.get(fp) || 0) + 1);
  
  // Check if we should alert
  const errorCount = state.recentErrors.length;
  const shouldAlert = errorCount >= config.alertThreshold;
  const cooldownPassed = now - state.lastAlertTime > config.alertCooldownMs;
  
  if (shouldAlert && cooldownPassed && config.discordWebhook) {
    state.lastAlertTime = now;
    await sendDiscordAlert(entry, errorCount);
  }
}

// Send Discord webhook alert
async function sendDiscordAlert(entry, errorCount) {
  if (!config.discordWebhook) return;
  
  const embed = {
    title: '🚨 Error Spike Detected',
    color: 0xff0000,
    fields: [
      { name: 'Service', value: config.serviceName, inline: true },
      { name: 'Environment', value: config.environment, inline: true },
      { name: 'Errors in Window', value: String(errorCount), inline: true },
      { name: 'Latest Error', value: `\`\`\`${entry.error.message.substring(0, 500)}\`\`\`` },
    ],
    timestamp: entry.timestamp,
    footer: { text: `Threshold: ${config.alertThreshold} errors/${config.alertWindowMs/1000}s` },
  };
  
  if (entry.request?.url) {
    embed.fields.push({ name: 'URL', value: `${entry.request.method} ${entry.request.url}`, inline: false });
  }
  
  const payload = JSON.stringify({ embeds: [embed] });
  
  return new Promise((resolve) => {
    try {
      const url = new URL(config.discordWebhook);
      const options = {
        hostname: url.hostname,
        port: url.port || 443,
        path: url.pathname + url.search,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(payload),
        },
      };
      
      const req = https.request(options, (res) => {
        resolve(res.statusCode < 400);
      });
      
      req.on('error', (err) => {
        console.error('[ErrorLogger] Discord webhook failed:', err.message);
        resolve(false);
      });
      
      req.write(payload);
      req.end();
    } catch (err) {
      console.error('[ErrorLogger] Discord webhook error:', err.message);
      resolve(false);
    }
  });
}

// Clean up old log files
function cleanOldLogs() {
  ensureLogDir();
  const cutoff = Date.now() - (config.retentionDays * 24 * 60 * 60 * 1000);
  
  try {
    const files = fs.readdirSync(config.logDir);
    for (const file of files) {
      if (!file.startsWith('errors-') || !file.endsWith('.json')) continue;
      
      const filePath = path.join(config.logDir, file);
      const stats = fs.statSync(filePath);
      
      if (stats.mtimeMs < cutoff) {
        fs.unlinkSync(filePath);
        console.log(`[ErrorLogger] Cleaned old log: ${file}`);
      }
    }
  } catch (err) {
    console.error('[ErrorLogger] Cleanup failed:', err.message);
  }
}

// ============================================================
// PUBLIC API
// ============================================================

/**
 * Log an error manually
 */
function logError(error, request = null, userId = null, extra = {}) {
  const entry = formatError(error, request, userId, extra);
  writeToLog(entry);
  checkAndAlert(entry);
  return entry;
}

/**
 * Express/Connect error middleware
 * Usage: app.use(errorLogger.middleware())
 */
function middleware(options = {}) {
  return (err, req, res, next) => {
    const userId = options.getUserId ? options.getUserId(req) : null;
    logError(err, req, userId, { middleware: true });
    
    // Pass to next error handler
    if (next) next(err);
  };
}

/**
 * Express request logging middleware (for all requests, not just errors)
 * Usage: app.use(errorLogger.requestLogger())
 */
function requestLogger() {
  return (req, res, next) => {
    const start = Date.now();
    
    res.on('finish', () => {
      if (res.statusCode >= 400) {
        const entry = formatError(
          new Error(`HTTP ${res.statusCode}`),
          req,
          null,
          {
            type: 'http_error',
            statusCode: res.statusCode,
            durationMs: Date.now() - start,
          }
        );
        entry.level = res.statusCode >= 500 ? 'error' : 'warn';
        writeToLog(entry);
        
        if (res.statusCode >= 500) {
          checkAndAlert(entry);
        }
      }
    });
    
    next();
  };
}

/**
 * Next.js API route error wrapper
 * Usage: export default errorLogger.wrapNextApi(handler)
 */
function wrapNextApi(handler) {
  return async (req, res) => {
    try {
      return await handler(req, res);
    } catch (error) {
      logError(error, req, null, { type: 'next_api' });
      
      // Send error response if not already sent
      if (!res.headersSent) {
        res.status(500).json({
          error: 'Internal Server Error',
          message: config.environment === 'development' ? error.message : undefined,
        });
      }
    }
  };
}

/**
 * Query logs for ops dashboard
 */
function queryLogs(options = {}) {
  const {
    startDate = new Date(Date.now() - 24 * 60 * 60 * 1000), // default: last 24h
    endDate = new Date(),
    level = null,
    search = null,
    limit = 100,
    offset = 0,
  } = options;
  
  ensureLogDir();
  const results = [];
  
  // Get all log files in date range
  const current = new Date(startDate);
  const end = new Date(endDate);
  
  while (current <= end) {
    const filename = getLogFilename(current);
    
    if (fs.existsSync(filename)) {
      try {
        const content = fs.readFileSync(filename, 'utf8');
        const lines = content.trim().split('\n').filter(Boolean);
        
        for (const line of lines) {
          try {
            const entry = JSON.parse(line);
            
            // Filter by date range
            const entryDate = new Date(entry.timestamp);
            if (entryDate < startDate || entryDate > endDate) continue;
            
            // Filter by level
            if (level && entry.level !== level) continue;
            
            // Filter by search term
            if (search) {
              const searchLower = search.toLowerCase();
              const matchMessage = entry.error?.message?.toLowerCase().includes(searchLower);
              const matchUrl = entry.request?.url?.toLowerCase().includes(searchLower);
              if (!matchMessage && !matchUrl) continue;
            }
            
            results.push(entry);
          } catch (e) {
            // Skip malformed lines
          }
        }
      } catch (err) {
        console.error(`[ErrorLogger] Failed to read ${filename}:`, err.message);
      }
    }
    
    current.setDate(current.getDate() + 1);
  }
  
  // Sort by timestamp descending (newest first)
  results.sort((a, b) => b.epochMs - a.epochMs);
  
  // Apply pagination
  const total = results.length;
  const paginated = results.slice(offset, offset + limit);
  
  return {
    logs: paginated,
    total,
    offset,
    limit,
    hasMore: offset + limit < total,
  };
}

/**
 * Get error statistics
 */
function getStats(hours = 24) {
  const startDate = new Date(Date.now() - hours * 60 * 60 * 1000);
  const { logs } = queryLogs({ startDate, limit: 10000 });
  
  // Count by hour
  const byHour = {};
  // Count by error type
  const byError = {};
  // Count by endpoint
  const byEndpoint = {};
  
  for (const log of logs) {
    // By hour
    const hour = log.timestamp.substring(0, 13); // YYYY-MM-DDTHH
    byHour[hour] = (byHour[hour] || 0) + 1;
    
    // By error fingerprint
    const fp = log.error?.fingerprint || 'unknown';
    byError[fp] = byError[fp] || { count: 0, message: log.error?.message };
    byError[fp].count++;
    
    // By endpoint
    if (log.request?.url) {
      const endpoint = `${log.request.method} ${log.request.path || log.request.url}`;
      byEndpoint[endpoint] = (byEndpoint[endpoint] || 0) + 1;
    }
  }
  
  // Sort errors by count
  const topErrors = Object.entries(byError)
    .map(([fp, data]) => ({ fingerprint: fp, ...data }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
  
  // Sort endpoints by count
  const topEndpoints = Object.entries(byEndpoint)
    .map(([endpoint, count]) => ({ endpoint, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
  
  return {
    totalErrors: logs.length,
    timeRange: { start: startDate.toISOString(), end: new Date().toISOString() },
    byHour,
    topErrors,
    topEndpoints,
    currentSpike: {
      errorsInWindow: state.recentErrors.length,
      threshold: config.alertThreshold,
      windowMs: config.alertWindowMs,
    },
  };
}

/**
 * Express router for ops dashboard API
 * Usage: app.use('/api/errors', errorLogger.router())
 */
function router() {
  const express = require('express');
  const r = express.Router();
  
  // GET /api/errors - Query logs
  r.get('/', (req, res) => {
    try {
      const options = {
        startDate: req.query.start ? new Date(req.query.start) : undefined,
        endDate: req.query.end ? new Date(req.query.end) : undefined,
        level: req.query.level,
        search: req.query.search,
        limit: parseInt(req.query.limit) || 100,
        offset: parseInt(req.query.offset) || 0,
      };
      
      const result = queryLogs(options);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // GET /api/errors/stats - Get statistics
  r.get('/stats', (req, res) => {
    try {
      const hours = parseInt(req.query.hours) || 24;
      const stats = getStats(hours);
      res.json(stats);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // POST /api/errors/report - Report client-side error
  r.post('/report', express.json(), (req, res) => {
    try {
      const { message, stack, url, userAgent, userId, extra } = req.body;
      
      const error = new Error(message);
      error.stack = stack;
      error.name = 'ClientError';
      
      const entry = logError(error, {
        url,
        method: 'CLIENT',
        headers: { 'user-agent': userAgent },
      }, userId, { type: 'client_error', ...extra });
      
      res.json({ logged: true, id: entry.epochMs });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // POST /api/errors/test - Test alert (development only)
  r.post('/test', (req, res) => {
    if (config.environment === 'production') {
      return res.status(403).json({ error: 'Not allowed in production' });
    }
    
    const testError = new Error('Test error from error logger');
    logError(testError, req, null, { type: 'test' });
    res.json({ logged: true });
  });
  
  return r;
}

/**
 * Standalone HTTP server for the API (no Express dependency)
 * Usage: errorLogger.startServer(3001)
 */
function startServer(port = 3001) {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      return res.end();
    }
    
    const url = new URL(req.url, `http://localhost:${port}`);
    
    if (url.pathname === '/stats' && req.method === 'GET') {
      const hours = parseInt(url.searchParams.get('hours')) || 24;
      res.writeHead(200);
      res.end(JSON.stringify(getStats(hours)));
      
    } else if (url.pathname === '/logs' && req.method === 'GET') {
      const options = {
        startDate: url.searchParams.get('start') ? new Date(url.searchParams.get('start')) : undefined,
        endDate: url.searchParams.get('end') ? new Date(url.searchParams.get('end')) : undefined,
        level: url.searchParams.get('level'),
        search: url.searchParams.get('search'),
        limit: parseInt(url.searchParams.get('limit')) || 100,
        offset: parseInt(url.searchParams.get('offset')) || 0,
      };
      res.writeHead(200);
      res.end(JSON.stringify(queryLogs(options)));
      
    } else if (url.pathname === '/report' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        try {
          const data = JSON.parse(body);
          const error = new Error(data.message);
          error.stack = data.stack;
          error.name = 'ClientError';
          
          const entry = logError(error, {
            url: data.url,
            method: 'CLIENT',
            headers: { 'user-agent': data.userAgent },
          }, data.userId, { type: 'client_error', ...data.extra });
          
          res.writeHead(200);
          res.end(JSON.stringify({ logged: true, id: entry.epochMs }));
        } catch (err) {
          res.writeHead(400);
          res.end(JSON.stringify({ error: 'Invalid JSON' }));
        }
      });
      
    } else if (url.pathname === '/health') {
      res.writeHead(200);
      res.end(JSON.stringify({ status: 'ok', service: config.serviceName }));
      
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Not found' }));
    }
  });
  
  server.listen(port, () => {
    console.log(`[ErrorLogger] API server running on port ${port}`);
  });
  
  return server;
}

// Run cleanup on startup
cleanOldLogs();

// Schedule daily cleanup
setInterval(cleanOldLogs, 24 * 60 * 60 * 1000);

// ============================================================
// EXPORTS
// ============================================================

module.exports = {
  // Core
  logError,
  
  // Middleware
  middleware,
  requestLogger,
  wrapNextApi,
  
  // Query
  queryLogs,
  getStats,
  
  // Server
  router,
  startServer,
  
  // Config
  config,
  
  // Manual alert
  sendDiscordAlert: (message) => {
    const entry = formatError(new Error(message));
    return sendDiscordAlert(entry, 1);
  },
};
