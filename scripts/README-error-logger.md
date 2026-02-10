# Error Logger - Lightweight Self-Hosted Error Tracking

Zero-dependency error logging and alerting for Clawdbot/Ally services.

## Features

- 📝 **Structured logging** - JSON logs with timestamp, stack trace, request context
- 🔄 **Daily rotation** - Automatic log file rotation by date
- 🚨 **Discord alerts** - Webhook notifications on error spikes  
- 🔍 **Query API** - REST endpoints for ops dashboard
- 🧹 **Auto-cleanup** - Configurable retention period
- 🔒 **Sanitization** - Automatic redaction of sensitive headers/params

## Quick Start

### Express/Node.js

```javascript
const express = require('express');
const errorLogger = require('./scripts/error-logger');

const app = express();

// Log all 4xx/5xx responses
app.use(errorLogger.requestLogger());

// Your routes...
app.get('/api/users', (req, res) => { ... });

// Error handling middleware (add LAST)
app.use(errorLogger.middleware());

// Mount the query API
app.use('/api/errors', errorLogger.router());
```

### Next.js API Routes

```javascript
// pages/api/example.js
const errorLogger = require('../../scripts/error-logger');

async function handler(req, res) {
  // Your code that might throw...
  throw new Error('Something went wrong');
}

export default errorLogger.wrapNextApi(handler);
```

### Manual Logging

```javascript
const errorLogger = require('./scripts/error-logger');

try {
  await riskyOperation();
} catch (error) {
  errorLogger.logError(error, req, userId, { 
    context: 'payment processing',
    orderId: '12345' 
  });
}
```

### Standalone API Server

```javascript
// Run error API without Express
const errorLogger = require('./scripts/error-logger');
errorLogger.startServer(3001);

// Endpoints:
// GET  /stats?hours=24     - Error statistics
// GET  /logs?limit=100     - Query logs  
// POST /report             - Client-side error reports
// GET  /health             - Health check
```

## Configuration

Set via environment variables:

| Variable | Default | Description |
|----------|---------|-------------|
| `ERROR_LOG_DIR` | `./logs/errors` | Log file directory |
| `DISCORD_ERROR_WEBHOOK` | null | Discord webhook URL for alerts |
| `ERROR_ALERT_THRESHOLD` | 10 | Errors to trigger alert |
| `ERROR_ALERT_WINDOW_MS` | 60000 | Time window (1 minute) |
| `ERROR_ALERT_COOLDOWN_MS` | 300000 | Cooldown between alerts (5 min) |
| `ERROR_LOG_MAX_SIZE_MB` | 50 | Max log file size |
| `ERROR_LOG_RETENTION_DAYS` | 30 | Days to keep logs |
| `SERVICE_NAME` | clawdbot | Service identifier |
| `NODE_ENV` | development | Environment name |

## Client-Side Integration

### React (Error Boundary)

```jsx
import { ErrorBoundary, initErrorReporting } from './scripts/error-boundary';

// Initialize once at app startup
initErrorReporting({ 
  endpoint: '/api/errors/report',
  userId: currentUser?.id 
});

// Wrap your app
function App() {
  return (
    <ErrorBoundary 
      fallback={(error, reset) => (
        <div>
          <h1>Oops!</h1>
          <button onClick={reset}>Try Again</button>
        </div>
      )}
    >
      <YourApp />
    </ErrorBoundary>
  );
}
```

### Vanilla JS

```html
<script src="/scripts/error-reporter-client.js"></script>
<script>
  ErrorReporter.init({ 
    endpoint: '/api/errors/report',
    userId: '12345'
  });
  
  // Manual reporting
  try {
    riskyCode();
  } catch (e) {
    ErrorReporter.captureError(e, { context: 'checkout' });
  }
</script>
```

## Query API

### Get Logs

```
GET /api/errors?start=2024-01-01&end=2024-01-02&limit=100&search=database
```

Response:
```json
{
  "logs": [...],
  "total": 150,
  "offset": 0,
  "limit": 100,
  "hasMore": true
}
```

### Get Statistics

```
GET /api/errors/stats?hours=24
```

Response:
```json
{
  "totalErrors": 42,
  "timeRange": { "start": "...", "end": "..." },
  "byHour": { "2024-01-01T14": 5, ... },
  "topErrors": [
    { "fingerprint": "...", "message": "...", "count": 10 }
  ],
  "topEndpoints": [
    { "endpoint": "POST /api/users", "count": 8 }
  ],
  "currentSpike": { "errorsInWindow": 3, "threshold": 10 }
}
```

## Log Format

Each log entry is a JSON object:

```json
{
  "timestamp": "2024-01-15T10:30:45.123Z",
  "epochMs": 1705315845123,
  "level": "error",
  "service": "clawdbot",
  "environment": "production",
  "error": {
    "name": "Error",
    "message": "Database connection failed",
    "stack": "Error: Database connection failed\n    at ...",
    "code": "ECONNREFUSED",
    "fingerprint": "Database connection failed::at db.js:45"
  },
  "request": {
    "method": "POST",
    "url": "/api/users",
    "path": "/api/users",
    "query": {},
    "headers": { "authorization": "[REDACTED]" },
    "ip": "192.168.1.100",
    "userAgent": "Mozilla/5.0..."
  },
  "userId": "user_12345",
  "system": {
    "hostname": "server-1",
    "pid": 12345,
    "nodeVersion": "v20.0.0",
    "platform": "linux",
    "memoryUsage": 52428800
  }
}
```

## Discord Alert Format

When error threshold is exceeded:

```
🚨 Error Spike Detected
Service: clawdbot
Environment: production
Errors in Window: 15
Latest Error: Database connection failed
URL: POST /api/users
```

## File Structure

```
logs/
└── errors/
    ├── errors-2024-01-14.json
    ├── errors-2024-01-15.json
    └── errors-2024-01-16.json
```

## Tips

1. **Set up Discord alerts** for production - know about issues before users report them
2. **Use the fingerprint** field to deduplicate similar errors in your dashboard
3. **Query with search** to find specific errors: `/api/errors?search=timeout`
4. **Monitor the stats endpoint** with your ops dashboard
5. **Set retention** appropriately - 30 days is usually plenty
