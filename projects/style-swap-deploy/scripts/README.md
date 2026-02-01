# Scripts

Utility scripts for deploying and managing Style Swap.

## Available Scripts

### `deploy.sh`

Automated deployment script with pre-deployment checks.

**Usage:**

```bash
# Deploy to preview environment
./scripts/deploy.sh preview

# Deploy to production
./scripts/deploy.sh production
```

**Features:**
- ✅ Runs tests before deployment
- ✅ Runs linting and type checking
- ✅ Builds application locally first
- ✅ Confirms before production deploy
- ✅ Tags production deployments
- ✅ Runs post-deployment health checks

---

### `rollback.sh`

Quick rollback to a previous deployment.

**Usage:**

```bash
# List available deployments
vercel ls

# Rollback to specific deployment
./scripts/rollback.sh style-swap-abc123.vercel.app
```

**Features:**
- ✅ Validates deployment exists
- ✅ Confirms before rollback
- ✅ Tags rollback for reference
- ✅ Runs health checks after rollback
- ✅ Provides next steps guidance

---

### `health-check.js`

Checks critical endpoints to verify site health.

**Usage:**

```bash
# Check production
node scripts/health-check.js

# Check specific URL
node scripts/health-check.js https://preview-abc.vercel.app
```

**Features:**
- ✅ Tests multiple critical endpoints
- ✅ Measures response times
- ✅ Provides pass/fail summary
- ✅ Colored output for easy reading
- ✅ Exits with appropriate status code

---

### `pre-commit.sh`

Pre-commit hook for code quality (used with Husky).

**Setup:**

```bash
# Install Husky
npm install -D husky

# Initialize Husky
npx husky install

# Add pre-commit hook
npx husky add .husky/pre-commit "bash scripts/pre-commit.sh"
```

**Features:**
- ✅ Runs ESLint on staged files
- ✅ Runs Prettier formatting
- ✅ Runs TypeScript type checking
- ✅ Auto-fixes issues when possible
- ✅ Prevents bad commits

---

## Making Scripts Executable

```bash
# Make all scripts executable
chmod +x scripts/*.sh

# Or individually
chmod +x scripts/deploy.sh
chmod +x scripts/rollback.sh
chmod +x scripts/pre-commit.sh
```

---

## Script Dependencies

These scripts require:

- **Node.js** (v18+)
- **npm** or **yarn**
- **Vercel CLI** (`npm install -g vercel`)
- **Git**

---

## Customization

Feel free to customize these scripts for your needs:

1. **Add more endpoints** to `health-check.js`
2. **Add security scans** to `deploy.sh`
3. **Add database backups** to `deploy.sh`
4. **Add Slack notifications** to deployment scripts
5. **Add performance tests** to `deploy.sh`

---

## Example Workflow

### Standard Deployment

```bash
# 1. Make changes
git add .
git commit -m "Add new feature"

# 2. Push to GitHub (triggers preview deployment via CI/CD)
git push origin feature-branch

# 3. Create PR and get approval

# 4. Merge to main

# 5. Deploy to production
./scripts/deploy.sh production
```

### Emergency Rollback

```bash
# 1. Identify issue
# Check Sentry, error logs, user reports

# 2. List recent deployments
vercel ls

# 3. Rollback to last known good deployment
./scripts/rollback.sh style-swap-abc123.vercel.app

# 4. Monitor health
node scripts/health-check.js

# 5. Fix bug in development
# 6. Re-deploy when ready
```

---

## Troubleshooting

### "Permission denied"

```bash
chmod +x scripts/deploy.sh
```

### "command not found: vercel"

```bash
npm install -g vercel
```

### Health check fails

- Verify site is accessible
- Check environment variables
- Review deployment logs in Vercel dashboard

---

## Integration with CI/CD

These scripts can also be used in GitHub Actions:

```yaml
- name: Run health checks
  run: node scripts/health-check.js
```

See `docs/04-cicd-pipeline.md` for full CI/CD setup.
