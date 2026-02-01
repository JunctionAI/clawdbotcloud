# 09 - Rollback Procedures

Complete rollback and disaster recovery guide for Style Swap.

## When to Rollback

**Rollback immediately** if you experience:

- 🚨 **Critical bugs** affecting core functionality
- 🚨 **Security vulnerability** discovered
- 🚨 **Error rate** > 5%
- 🚨 **Payment processing** failures
- 🚨 **Authentication** completely broken
- 🚨 **Database corruption** or data loss
- 🚨 **Performance degradation** > 50%

**Consider rollback** if:

- ⚠️ Error rate > 2%
- ⚠️ Multiple user complaints about same issue
- ⚠️ Performance degradation > 25%
- ⚠️ Non-critical feature completely broken

---

## Rollback Methods

### Method 1: Vercel Instant Rollback (Recommended)

**Fastest rollback - Takes < 30 seconds**

#### Via Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Select **style-swap** project
3. Click **Deployments** tab
4. Find the last working deployment
5. Click **⋮** (three dots) → **Promote to Production**
6. Confirm promotion

#### Via Vercel CLI

```bash
# List recent deployments
vercel ls

# Output example:
# style-swap-abc123.vercel.app (Current Production)
# style-swap-def456.vercel.app (Previous)
# style-swap-ghi789.vercel.app

# Promote previous deployment to production
vercel promote style-swap-def456.vercel.app --prod

# Or rollback to specific deployment URL
vercel alias set style-swap-def456.vercel.app styleswap.com
```

**Verification:**

```bash
# Check current production deployment
vercel ls --prod

# Visit site and verify
curl -I https://styleswap.com
```

---

### Method 2: Git Revert (For Code-level Rollback)

**When you need to revert specific commits**

#### Quick Revert (Last Commit)

```bash
# Revert the last commit
git revert HEAD

# Push to main (triggers auto-deploy)
git push origin main
```

#### Revert Multiple Commits

```bash
# Revert last 3 commits
git revert HEAD~3..HEAD

# Or revert specific commit
git revert <commit-hash>

# Push to trigger deployment
git push origin main
```

#### Hard Reset (Nuclear Option - Use with Caution)

```bash
# Find the commit to rollback to
git log --oneline

# Hard reset to that commit
git reset --hard <commit-hash>

# Force push (dangerous!)
git push origin main --force

# This triggers Vercel to redeploy from that commit
```

⚠️ **Warning**: `git push --force` rewrites history. Only use if necessary.

---

### Method 3: Database Rollback

**When database changes need to be reverted**

#### Using Migration Rollback

```bash
# Rollback last migration
npm run migrate:rollback

# Or with Prisma
npx prisma migrate resolve --rolled-back <migration-name>

# Verify database state
npm run migrate:status
```

#### Restore from Backup

**Prerequisites**: Automated backups configured

##### Step 1: Download Latest Backup

```bash
# For PostgreSQL (Heroku/Railway/Supabase)
pg_dump -h <host> -U <user> -d <database> -F c -f backup-pre-rollback.dump

# Or download from provider dashboard
```

##### Step 2: Restore Backup

```bash
# For PostgreSQL
pg_restore -h <host> -U <user> -d <database> -c backup-pre-rollback.dump

# Verify restoration
psql -h <host> -U <user> -d <database> -c "SELECT COUNT(*) FROM users;"
```

##### Step 3: Test Application

```bash
# Run application locally against restored database
npm run dev

# Verify critical functionality
# - User login
# - Data retrieval
# - Payments (use test mode)
```

---

### Method 4: Environment Variable Rollback

**When environment variables were changed**

#### Via Vercel Dashboard

1. **Settings** → **Environment Variables**
2. Find changed variables
3. Click **Edit** → Change to previous value
4. **Save**
5. **Redeploy** (required for changes to take effect)

#### Via Vercel CLI

```bash
# Remove incorrect variable
vercel env rm VARIABLE_NAME production

# Add correct value
vercel env add VARIABLE_NAME production
# Enter value when prompted

# Redeploy to apply changes
vercel --prod
```

---

## Rollback Checklist

### Immediate Actions (0-5 minutes)

- [ ] **Assess the situation** - What's broken?
- [ ] **Check error logs** in Sentry
- [ ] **Verify error rate** in analytics
- [ ] **Notify team** via Slack/Teams
- [ ] **Put up status banner** (optional): "We're experiencing issues. Working on a fix."

### Rollback Execution (5-15 minutes)

- [ ] **Choose rollback method** (Vercel instant rollback usually)
- [ ] **Execute rollback**
- [ ] **Verify rollback** worked
  - [ ] Visit site
  - [ ] Test critical features
  - [ ] Check error rate dropped
- [ ] **Monitor for 15 minutes**

### Post-Rollback (15+ minutes)

- [ ] **Update status page/banner**: "Issues resolved"
- [ ] **Notify users** (if affected)
- [ ] **Document what happened**
- [ ] **Create postmortem** (see template below)
- [ ] **Fix the bug** in development
- [ ] **Test thoroughly** before re-deploying
- [ ] **Plan re-deployment**

---

## Rollback Scripts

### Quick Rollback Script

Create `scripts/rollback.sh`:

```bash
#!/bin/bash

# Quick rollback script for Style Swap
# Usage: ./scripts/rollback.sh [deployment-url]

set -e

echo "🔄 Starting rollback process..."

# Check if deployment URL provided
if [ -z "$1" ]; then
  echo "❌ Error: No deployment URL provided"
  echo "Usage: ./scripts/rollback.sh [deployment-url]"
  echo ""
  echo "Recent deployments:"
  vercel ls
  exit 1
fi

DEPLOYMENT_URL=$1

echo "📦 Rolling back to: $DEPLOYMENT_URL"
echo ""
read -p "Are you sure? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
  echo "❌ Rollback cancelled"
  exit 0
fi

echo "🚀 Promoting deployment to production..."
vercel promote $DEPLOYMENT_URL --prod

echo "✅ Rollback complete!"
echo "🔍 Verifying deployment..."
curl -I https://styleswap.com

echo ""
echo "✅ Rollback successful!"
echo "📊 Monitor errors: https://sentry.io"
echo "📈 Check analytics: https://vercel.com/analytics"
```

Make executable:

```bash
chmod +x scripts/rollback.sh
```

Usage:

```bash
./scripts/rollback.sh style-swap-def456.vercel.app
```

---

## Health Check Script

Create `scripts/health-check.js`:

```javascript
const https = require('https');

const SITE_URL = 'https://styleswap.com';
const CRITICAL_ENDPOINTS = [
  '/',
  '/api/health',
  '/shop',
  '/login',
];

async function checkEndpoint(path) {
  return new Promise((resolve) => {
    const url = `${SITE_URL}${path}`;
    const startTime = Date.now();
    
    https.get(url, (res) => {
      const duration = Date.now() - startTime;
      const status = res.statusCode;
      const healthy = status >= 200 && status < 400;
      
      resolve({
        path,
        status,
        duration,
        healthy,
      });
    }).on('error', (err) => {
      resolve({
        path,
        status: 0,
        duration: Date.now() - startTime,
        healthy: false,
        error: err.message,
      });
    });
  });
}

async function runHealthCheck() {
  console.log('🏥 Running health check...\n');
  
  const results = await Promise.all(
    CRITICAL_ENDPOINTS.map(checkEndpoint)
  );
  
  results.forEach((result) => {
    const icon = result.healthy ? '✅' : '❌';
    const time = `${result.duration}ms`;
    console.log(`${icon} ${result.path.padEnd(20)} ${result.status} (${time})`);
    if (result.error) {
      console.log(`   Error: ${result.error}`);
    }
  });
  
  const allHealthy = results.every(r => r.healthy);
  
  console.log('\n' + '='.repeat(50));
  console.log(allHealthy ? '✅ All checks passed' : '❌ Some checks failed');
  
  process.exit(allHealthy ? 0 : 1);
}

runHealthCheck();
```

Usage:

```bash
node scripts/health-check.js
```

---

## Deployment Tags

**Tag every production deployment** for easy rollback reference:

```bash
# After successful production deployment
TAG="deploy-$(date +'%Y%m%d-%H%M%S')"
git tag -a $TAG -m "Production deployment"
git push origin $TAG

# List deployment tags
git tag -l "deploy-*"

# Rollback to specific tag
git checkout $TAG
git push origin main --force # Only if needed
```

---

## Disaster Recovery Scenarios

### Scenario 1: Complete Site Down

**Symptoms**: Site returns 500 errors or doesn't load

**Actions**:

1. **Check Vercel status**: https://vercel-status.com
2. **Check DNS**: `nslookup styleswap.com`
3. **Rollback last deployment**:
   ```bash
   vercel ls
   vercel promote [previous-deployment] --prod
   ```
4. **Monitor recovery**

### Scenario 2: Database Corruption

**Symptoms**: Data inconsistencies, errors on data fetch

**Actions**:

1. **Stop writes** (put site in read-only mode)
2. **Identify corruption** extent
3. **Restore from backup** (see Database Rollback above)
4. **Verify data integrity**
5. **Resume normal operations**

### Scenario 3: Payment Processing Down

**Symptoms**: Payments failing, Stripe webhooks not working

**Actions**:

1. **Check Stripe status**: https://status.stripe.com
2. **Verify webhook endpoint**: Settings → Webhooks in Stripe
3. **Check environment variables**: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
4. **Test with Stripe CLI**:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```
5. **Rollback if environment variable issue**

### Scenario 4: Authentication Broken

**Symptoms**: Users can't login, session errors

**Actions**:

1. **Check `NEXTAUTH_SECRET`** is correct
2. **Verify `NEXTAUTH_URL`** matches domain
3. **Check database connection**
4. **Test locally** with production env vars
5. **Rollback deployment** if code issue

---

## Communication Templates

### Internal Alert (Slack/Teams)

```
🚨 PRODUCTION ISSUE

Status: [Critical/Major/Minor]
Impact: [Description of what's broken]
Affected Users: [All/Subset/None yet]

Actions:
1. Rolling back to previous deployment
2. Investigating root cause
3. ETA for fix: [Time]

Monitor:
- Sentry: [Link]
- Vercel: [Link]

Lead: @[Your Name]
```

### User-Facing Message (Status Banner)

```
⚠️ We're experiencing technical difficulties. Our team is working on a fix.
Updates: [status.styleswap.com]
```

### Post-Incident Email

```
Subject: Update on [Date] Service Disruption

Hi everyone,

We experienced a brief service disruption today from [Time] to [Time].

What happened:
[Brief explanation]

What we did:
[Actions taken]

What we're doing to prevent this:
[Future improvements]

We apologize for any inconvenience.

The Style Swap Team
```

---

## Postmortem Template

Create `postmortems/YYYY-MM-DD-incident.md`:

```markdown
# Incident Postmortem - [Date]

## Summary
Brief description of what went wrong.

## Timeline
- **HH:MM** - Issue first detected
- **HH:MM** - Team notified
- **HH:MM** - Rollback initiated
- **HH:MM** - Service restored
- **HH:MM** - Root cause identified

## Impact
- **Duration**: X minutes
- **Affected users**: X users
- **Error rate**: X%
- **Revenue impact**: $X (if applicable)

## Root Cause
Detailed explanation of what caused the issue.

## Resolution
How the issue was resolved.

## Action Items
- [ ] Fix implemented in development
- [ ] Additional tests added
- [ ] Monitoring improved
- [ ] Documentation updated
- [ ] Team trained on prevention

## Lessons Learned
- What went well
- What could be improved
- What we learned

## Prevention
Steps to prevent this from happening again.
```

---

## Best Practices

### ✅ DO:
- Deploy during low-traffic hours
- Test thoroughly in staging
- Have rollback plan ready
- Monitor immediately after deploy
- Keep team on standby during major deploys
- Tag deployments for easy reference
- Document all incidents

### ❌ DON'T:
- Deploy on Fridays (weekend coverage)
- Deploy without testing
- Panic - follow the checklist
- Deploy multiple changes at once
- Ignore warning signs
- Skip postmortems

---

## Rollback Success Metrics

Rollback is successful when:

- ✅ Error rate returns to < 1%
- ✅ Site loads correctly
- ✅ Critical features work
- ✅ Payments processing
- ✅ Authentication working
- ✅ No new errors in Sentry

---

## Emergency Contacts

```
On-Call Engineer: [Name] - [Phone]
Backup: [Name] - [Phone]

Vercel Support: support@vercel.com
Database Provider: [Contact]
Payment Provider: [Contact]
DNS Provider: [Contact]
```

---

## Recovery Time Objectives (RTO)

Target recovery times:

- **Critical (site down)**: < 15 minutes
- **Major (feature broken)**: < 1 hour
- **Minor (non-critical bug)**: < 4 hours

---

## Conclusion

**Stay calm, follow the process, and communicate clearly.**

A good rollback is one that:
1. Restores service quickly
2. Preserves user data
3. Provides learning for the team

Every incident is an opportunity to improve. 🚀

---

## Quick Reference Commands

```bash
# List deployments
vercel ls

# Instant rollback
vercel promote [deployment-url] --prod

# Health check
node scripts/health-check.js

# View logs
vercel logs [deployment-url]

# Check Sentry
open https://sentry.io/organizations/[org]/issues/

# Git rollback
git revert HEAD
git push origin main
```

---

**Remember**: It's better to rollback and fix properly than to rush a broken fix. 💪
