# Deployment Guide

Complete guide for deploying Style Swap Commerce to production.

## 🌐 Platform Options

### 1. Heroku (Easiest)

**Pros:** Simple deployment, managed database, auto-scaling
**Cons:** Can be expensive at scale, cold starts on free tier

```bash
# Prerequisites
# - Heroku CLI installed
# - Git repository initialized

# Login to Heroku
heroku login

# Create app
heroku create styleswap-commerce-prod

# Add PostgreSQL
heroku addons:create heroku-postgresql:standard-0

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set STRIPE_SECRET_KEY=sk_live_xxx
heroku config:set STRIPE_PUBLISHABLE_KEY=pk_live_xxx
heroku config:set STRIPE_WEBHOOK_SECRET=whsec_xxx
heroku config:set AFFILIATE_WEBHOOK_SECRET=your_secret
heroku config:set DEFAULT_UTM_SOURCE=styleswap
heroku config:set DEFAULT_UTM_MEDIUM=referral
heroku config:set FRONTEND_URL=https://styleswap.com

# Deploy
git push heroku main

# Run migrations
heroku run npm run migrate

# Scale dynos (optional)
heroku ps:scale web=2

# View logs
heroku logs --tail

# Set up daily stats cron
heroku addons:create scheduler:standard
# Then add job: npm run generate-daily-stats
```

### 2. Vercel (Modern)

**Pros:** Fast deployments, serverless, great DX
**Cons:** Serverless limits, cold starts

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# Add PostgreSQL connection string
# Configure webhooks

# Note: May need to adjust for serverless architecture
# Consider using Vercel Postgres or external DB
```

### 3. AWS (Scalable)

**Pros:** Full control, scalable, many services
**Cons:** Complex setup, requires DevOps knowledge

**Architecture:**
- EC2/ECS for application
- RDS for PostgreSQL
- S3 for static assets
- CloudFront for CDN
- Lambda for webhooks (optional)

**Setup:**
```bash
# 1. Create RDS PostgreSQL instance
aws rds create-db-instance \
  --db-instance-identifier styleswap-db \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --master-username admin \
  --master-user-password YourPassword123

# 2. Create EC2 instance
# Use Ubuntu 22.04 LTS
# Install Node.js 18+

# 3. Deploy application
ssh ubuntu@your-ec2-ip
git clone your-repo
cd style-swap-commerce
npm install --production
npm run migrate

# 4. Set up PM2 for process management
npm install -g pm2
pm2 start src/server.js --name styleswap-commerce
pm2 startup
pm2 save

# 5. Set up Nginx reverse proxy
sudo apt install nginx
# Configure nginx to proxy to localhost:3000

# 6. Get SSL certificate
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d api.styleswap.com
```

### 4. DigitalOcean App Platform (Balanced)

**Pros:** Simple like Heroku, cheaper, good performance
**Cons:** Fewer services than AWS

```bash
# 1. Create DigitalOcean account
# 2. Create new App from GitHub repo
# 3. Select Node.js environment
# 4. Add managed PostgreSQL database
# 5. Set environment variables
# 6. Deploy
```

### 5. Railway (Developer-Friendly)

**Pros:** Git-based deployment, managed services, fair pricing
**Cons:** Newer platform, smaller community

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Add PostgreSQL
railway add postgresql

# Deploy
railway up

# Set environment variables via dashboard
```

## 🗄️ Database Setup

### Managed PostgreSQL (Recommended)

**Heroku Postgres:**
```bash
heroku addons:create heroku-postgresql:standard-0
# Connection string automatically added to DATABASE_URL
```

**DigitalOcean Managed Database:**
```bash
# Create via dashboard
# Connection string: postgresql://user:pass@host:25060/db?sslmode=require
```

**AWS RDS:**
```bash
# Create via Console or CLI
# Enable public accessibility for initial migration
# Then restrict to VPC
```

### Self-Hosted PostgreSQL

```bash
# Docker Compose
version: '3.8'
services:
  db:
    image: postgres:14
    environment:
      POSTGRES_DB: styleswap_commerce
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:
```

### Database Optimization

```sql
-- Create indexes (already in schema.sql)
-- Vacuum regularly
VACUUM ANALYZE;

-- Monitor query performance
SELECT * FROM pg_stat_statements 
ORDER BY total_exec_time DESC 
LIMIT 10;

-- Set up connection pooling
-- Already configured in config/database.js with pg Pool
```

## 🔐 Environment Variables

**Production `.env`:**
```env
# Server
NODE_ENV=production
PORT=3000

# Database
DATABASE_URL=postgresql://user:pass@host:5432/styleswap_commerce

# Stripe
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxx
STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx

# Affiliate Networks
AFFILIATE_WEBHOOK_SECRET=your_strong_secret_here

# UTM Tracking
DEFAULT_UTM_SOURCE=styleswap
DEFAULT_UTM_MEDIUM=referral

# Commissions
DEFAULT_COMMISSION_RATE=10
BRAND_COMMISSION_RATES={"nike":12,"adidas":10,"zara":8}

# Analytics
ANALYTICS_RETENTION_DAYS=365

# CORS
FRONTEND_URL=https://styleswap.com

# Optional: Redis (for caching)
REDIS_URL=redis://localhost:6379

# Optional: Sentry (error tracking)
SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx

# Optional: SendGrid (emails)
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
```

## 🔄 CI/CD Setup

### GitHub Actions

**.github/workflows/deploy.yml:**
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
      
      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
          heroku_app_name: styleswap-commerce-prod
          heroku_email: your-email@example.com
      
      - name: Run migrations
        run: heroku run npm run migrate --app styleswap-commerce-prod
```

### GitLab CI

**.gitlab-ci.yml:**
```yaml
stages:
  - test
  - deploy

test:
  stage: test
  image: node:18
  script:
    - npm ci
    - npm test
  only:
    - main

deploy:
  stage: deploy
  image: node:18
  script:
    - npm ci --production
    - npm run migrate
  only:
    - main
  environment:
    name: production
```

## 📊 Monitoring

### Application Monitoring

**1. Sentry (Error Tracking):**
```javascript
// Add to src/server.js
const Sentry = require('@sentry/node');

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV
});

// Add error handler
app.use(Sentry.Handlers.errorHandler());
```

**2. New Relic (APM):**
```bash
npm install newrelic

# Add newrelic.js configuration
# Set environment variable
NEW_RELIC_LICENSE_KEY=your_key
```

**3. DataDog (Full Stack):**
```javascript
const tracer = require('dd-trace').init();
```

### Database Monitoring

```sql
-- Create monitoring queries
CREATE EXTENSION pg_stat_statements;

-- Monitor slow queries
SELECT query, mean_exec_time, calls 
FROM pg_stat_statements 
WHERE mean_exec_time > 100 
ORDER BY mean_exec_time DESC;

-- Check connection pool
SELECT count(*) FROM pg_stat_activity;
```

### Custom Health Checks

```javascript
// Add to src/server.js
app.get('/health/detailed', async (req, res) => {
  try {
    // Check database
    await pool.query('SELECT 1');
    
    // Check Redis (if using)
    // await redis.ping();
    
    res.json({
      status: 'healthy',
      database: 'connected',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      error: error.message
    });
  }
});
```

## 🔔 Alerting

### Uptime Monitoring
- **UptimeRobot:** Free, monitors /health endpoint
- **Pingdom:** Detailed monitoring
- **Better Uptime:** Status pages

### Webhook Monitoring
```javascript
// Alert on webhook failures
const alertOnWebhookFailure = async () => {
  const failures = await pool.query(`
    SELECT COUNT(*) as count 
    FROM webhook_events 
    WHERE processed = false 
    AND received_at > NOW() - INTERVAL '1 hour'
  `);
  
  if (failures.rows[0].count > 10) {
    // Send alert (email, Slack, PagerDuty)
    await sendAlert(`Webhook failures: ${failures.rows[0].count}`);
  }
};

// Run every 15 minutes
setInterval(alertOnWebhookFailure, 15 * 60 * 1000);
```

## 🔧 Performance Optimization

### 1. Enable Compression
```javascript
const compression = require('compression');
app.use(compression());
```

### 2. Add Redis Caching
```javascript
const Redis = require('ioredis');
const redis = new Redis(process.env.REDIS_URL);

// Cache dashboard data
app.get('/api/analytics/dashboard', async (req, res) => {
  const cacheKey = `dashboard:${JSON.stringify(req.query)}`;
  const cached = await redis.get(cacheKey);
  
  if (cached) {
    return res.json(JSON.parse(cached));
  }
  
  const data = await analyticsService.getDashboard(req.query);
  await redis.setex(cacheKey, 300, JSON.stringify(data)); // 5 min cache
  res.json(data);
});
```

### 3. Database Query Optimization
```sql
-- Already indexed in schema.sql
-- Monitor with EXPLAIN ANALYZE

EXPLAIN ANALYZE
SELECT * FROM clicks 
WHERE affiliate_link_id = 123 
AND clicked_at > NOW() - INTERVAL '30 days';
```

### 4. CDN for Static Assets
```javascript
// Use CloudFront, Cloudflare, or similar
// Serve frontend files from CDN
```

## 🔒 Security Hardening

### 1. Rate Limiting (Already Implemented)
```javascript
// Increase for production
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000 // Higher for production
});
```

### 2. Webhook IP Whitelisting
```javascript
const allowedIPs = [
  '54.187.216.72', // Example: ShareASale
  '54.187.205.235'
];

app.post('/api/webhooks/:source', (req, res, next) => {
  const clientIP = req.ip;
  if (!allowedIPs.includes(clientIP)) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
});
```

### 3. HTTPS Only
```javascript
// Force HTTPS in production
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      return res.redirect(`https://${req.header('host')}${req.url}`);
    }
    next();
  });
}
```

## 📦 Backup Strategy

### Database Backups

**Automated (Heroku):**
```bash
heroku pg:backups:schedule --at '02:00 America/Los_Angeles'
heroku pg:backups:download
```

**Manual:**
```bash
# Backup
pg_dump styleswap_commerce > backup.sql

# Restore
psql styleswap_commerce < backup.sql

# Automated script
#!/bin/bash
BACKUP_DIR="/backups/postgres"
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump styleswap_commerce | gzip > "$BACKUP_DIR/backup_$DATE.sql.gz"

# Keep only last 7 days
find $BACKUP_DIR -name "backup_*.sql.gz" -mtime +7 -delete
```

## 🚀 Launch Checklist

- [ ] Database migrated and seeded
- [ ] Environment variables set
- [ ] SSL certificate configured
- [ ] Domain DNS configured
- [ ] Health checks passing
- [ ] Monitoring enabled (Sentry, etc.)
- [ ] Backups configured
- [ ] Rate limiting tested
- [ ] Webhook endpoints registered with partners
- [ ] Analytics tracking verified
- [ ] Error logging working
- [ ] Load testing completed
- [ ] Security audit done
- [ ] Documentation updated

## 📞 Support

For production issues, check:
1. Application logs
2. Database logs
3. Sentry/error tracker
4. Health check endpoint
5. Webhook events table

---

**Ready to launch!** 🚀
