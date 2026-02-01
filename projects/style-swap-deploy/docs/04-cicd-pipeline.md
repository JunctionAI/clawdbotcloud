# 04 - CI/CD Pipeline (GitHub Actions)

Complete GitHub Actions workflow for automated testing, building, and deployment of Style Swap.

## Overview

This CI/CD pipeline provides:
- ✅ Automated testing on every PR
- ✅ Code quality checks (linting, type checking)
- ✅ Preview deployments for PRs
- ✅ Automatic production deployment on merge to main
- ✅ Build caching for faster deployments
- ✅ Rollback capabilities

## Directory Structure

```
.github/
└── workflows/
    ├── ci.yml              # Continuous Integration (tests, lint)
    ├── deploy-preview.yml  # Preview deployments
    ├── deploy-prod.yml     # Production deployments
    └── lighthouse.yml      # Performance testing
```

## 1. Continuous Integration Workflow

Create `.github/workflows/ci.yml`:

```yaml
name: CI

on:
  pull_request:
    branches: [main, develop]
  push:
    branches: [main, develop]

jobs:
  lint:
    name: Lint & Type Check
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run ESLint
        run: npm run lint
      
      - name: Run TypeScript type check
        run: npm run type-check
      
      - name: Check formatting
        run: npm run format:check

  test:
    name: Unit & Integration Tests
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm run test:ci
        env:
          NODE_ENV: test
      
      - name: Upload coverage reports
        uses: codecov/codecov-action@v3
        with:
          token: ${{ secrets.CODECOV_TOKEN }}
          files: ./coverage/coverage-final.json
          flags: unittests
          name: codecov-umbrella

  build:
    name: Build Application
    runs-on: ubuntu-latest
    needs: [lint, test]
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build application
        run: npm run build
        env:
          NEXT_PUBLIC_SITE_URL: ${{ secrets.NEXT_PUBLIC_SITE_URL }}
          NODE_ENV: production
      
      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build-output
          path: .next
          retention-days: 7

  security:
    name: Security Audit
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Run npm audit
        run: npm audit --audit-level=moderate
        continue-on-error: true
      
      - name: Run Snyk security scan
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
        with:
          command: test
```

## 2. Preview Deployment Workflow

Create `.github/workflows/deploy-preview.yml`:

```yaml
name: Deploy Preview

on:
  pull_request:
    branches: [main]
    types: [opened, synchronize, reopened]

jobs:
  deploy-preview:
    name: Deploy to Vercel Preview
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install Vercel CLI
        run: npm install -g vercel@latest
      
      - name: Pull Vercel environment
        run: vercel pull --yes --environment=preview --token=${{ secrets.VERCEL_TOKEN }}
        env:
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
      
      - name: Build project artifacts
        run: vercel build --token=${{ secrets.VERCEL_TOKEN }}
        env:
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
      
      - name: Deploy to Vercel
        id: deploy
        run: |
          DEPLOYMENT_URL=$(vercel deploy --prebuilt --token=${{ secrets.VERCEL_TOKEN }} 2>&1 | grep -oP 'https://[^ ]+')
          echo "url=$DEPLOYMENT_URL" >> $GITHUB_OUTPUT
          echo "Deployed to: $DEPLOYMENT_URL"
        env:
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
      
      - name: Comment PR with deployment URL
        uses: actions/github-script@v7
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          script: |
            const deploymentUrl = '${{ steps.deploy.outputs.url }}';
            const comment = `## 🚀 Preview Deployment Ready!
            
            Your changes have been deployed to Vercel:
            🔗 **${deploymentUrl}**
            
            ### Quick Actions
            - [View Deployment](${deploymentUrl})
            - [View Logs](https://vercel.com/${{ secrets.VERCEL_ORG_ID }}/${{ secrets.VERCEL_PROJECT_ID }})
            - [Run Lighthouse](${deploymentUrl})
            
            **Note**: This is a preview deployment. Changes will not affect production.`;
            
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: comment
            });
```

## 3. Production Deployment Workflow

Create `.github/workflows/deploy-prod.yml`:

```yaml
name: Deploy Production

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  deploy-production:
    name: Deploy to Production
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://styleswap.com
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm run test:ci
        env:
          NODE_ENV: test
      
      - name: Install Vercel CLI
        run: npm install -g vercel@latest
      
      - name: Pull Vercel environment
        run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}
        env:
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
      
      - name: Build project artifacts
        run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}
        env:
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
      
      - name: Deploy to Vercel Production
        id: deploy
        run: |
          DEPLOYMENT_URL=$(vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }} 2>&1 | grep -oP 'https://[^ ]+')
          echo "url=$DEPLOYMENT_URL" >> $GITHUB_OUTPUT
          echo "Deployed to production: $DEPLOYMENT_URL"
        env:
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
      
      - name: Create deployment tag
        run: |
          TAG="deploy-$(date +'%Y%m%d-%H%M%S')"
          git tag $TAG
          git push origin $TAG
      
      - name: Notify deployment success
        uses: actions/github-script@v7
        if: success()
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          script: |
            const deploymentUrl = '${{ steps.deploy.outputs.url }}';
            github.rest.repos.createCommitStatus({
              owner: context.repo.owner,
              repo: context.repo.repo,
              sha: context.sha,
              state: 'success',
              target_url: deploymentUrl,
              description: 'Production deployment successful',
              context: 'Vercel Production'
            });
      
      - name: Notify Sentry of deployment
        run: |
          curl https://sentry.io/api/0/organizations/${{ secrets.SENTRY_ORG }}/releases/ \
            -X POST \
            -H "Authorization: Bearer ${{ secrets.SENTRY_AUTH_TOKEN }}" \
            -H "Content-Type: application/json" \
            -d "{
              \"version\": \"${{ github.sha }}\",
              \"refs\": [{
                \"repository\": \"${{ github.repository }}\",
                \"commit\": \"${{ github.sha }}\"
              }],
              \"projects\": [\"${{ secrets.SENTRY_PROJECT }}\"]
            }"
```

## 4. Lighthouse Performance Testing

Create `.github/workflows/lighthouse.yml`:

```yaml
name: Lighthouse CI

on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  lighthouse:
    name: Run Lighthouse Tests
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      
      - name: Wait for Vercel deployment
        uses: patrickedqvist/wait-for-vercel-preview@v1.3.1
        id: vercel-deploy
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          max_timeout: 300
      
      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v10
        with:
          urls: |
            ${{ steps.vercel-deploy.outputs.url }}
            ${{ steps.vercel-deploy.outputs.url }}/about
            ${{ steps.vercel-deploy.outputs.url }}/contact
          uploadArtifacts: true
          temporaryPublicStorage: true
          budgetPath: ./lighthouse-budget.json
      
      - name: Comment PR with Lighthouse scores
        uses: actions/github-script@v7
        if: github.event_name == 'pull_request'
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          script: |
            const fs = require('fs');
            const results = JSON.parse(fs.readFileSync('.lighthouseci/manifest.json'));
            // Format and post Lighthouse scores as PR comment
```

## 5. Required GitHub Secrets

Add these secrets in **GitHub Settings → Secrets and variables → Actions**:

```
VERCEL_TOKEN              # From Vercel Account Settings → Tokens
VERCEL_ORG_ID             # From .vercel/project.json
VERCEL_PROJECT_ID         # From .vercel/project.json
CODECOV_TOKEN             # From codecov.io (optional)
SNYK_TOKEN                # From snyk.io (optional)
SENTRY_AUTH_TOKEN         # From Sentry Settings
SENTRY_ORG                # Your Sentry organization slug
SENTRY_PROJECT            # Your Sentry project slug
```

### Getting Vercel Token

```bash
# Login to Vercel
vercel login

# Create token at:
# https://vercel.com/account/tokens

# Or via CLI (generates token)
vercel whoami
```

### Getting Vercel Org/Project IDs

```bash
# Link project first
vercel link

# IDs are stored in .vercel/project.json
cat .vercel/project.json
```

## 6. Package.json Scripts

Add these scripts to `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "type-check": "tsc --noEmit",
    "format": "prettier --write \"**/*.{ts,tsx,js,jsx,json,md}\"",
    "format:check": "prettier --check \"**/*.{ts,tsx,js,jsx,json,md}\"",
    "test": "jest --watch",
    "test:ci": "jest --ci --coverage --maxWorkers=2",
    "test:e2e": "playwright test",
    "prepare": "husky install"
  }
}
```

## 7. Pre-commit Hooks (Husky)

Install Husky for pre-commit checks:

```bash
npm install -D husky lint-staged
npx husky install
npx husky add .husky/pre-commit "npx lint-staged"
```

Create `.lintstagedrc.js`:

```javascript
module.exports = {
  '*.{ts,tsx,js,jsx}': [
    'eslint --fix',
    'prettier --write',
  ],
  '*.{json,md,yml,yaml}': [
    'prettier --write',
  ],
};
```

## 8. Deployment Protection Rules

### Branch Protection

Enable in **GitHub Settings → Branches → Branch protection rules**:

For `main` branch:
- [x] Require a pull request before merging
- [x] Require approvals: 1
- [x] Dismiss stale pull request approvals
- [x] Require status checks to pass before merging
  - Required checks:
    - `lint`
    - `test`
    - `build`
- [x] Require branches to be up to date before merging
- [x] Require conversation resolution before merging
- [x] Do not allow bypassing the above settings

## 9. Monitoring Deployments

### View Deployment Status

```bash
# List recent deployments
vercel ls

# Check deployment logs
vercel logs [deployment-url]

# Inspect specific deployment
vercel inspect [deployment-url]
```

### GitHub Actions Monitoring

- **Actions tab**: View all workflow runs
- **Insights → Dependency graph**: View dependencies
- **Security → Code scanning alerts**: Security issues
- **Pull requests**: Inline status checks

## 10. Manual Deployment

When needed:

```bash
# Deploy preview
vercel

# Deploy to production
vercel --prod

# Deploy specific branch
git checkout feature-branch
vercel
```

## Workflow Summary

### On Pull Request:
1. Run linting and type checking
2. Run unit/integration tests
3. Build application
4. Security audit
5. Deploy preview to Vercel
6. Run Lighthouse tests
7. Comment PR with results

### On Merge to Main:
1. Run all tests
2. Build production bundle
3. Deploy to Vercel production
4. Create deployment tag
5. Notify Sentry of release
6. Update deployment status

## Troubleshooting

### Workflow Fails

**Check logs**:
1. Go to Actions tab
2. Click failed workflow
3. Expand failed step
4. Review error messages

**Common issues**:
- Missing secrets
- Incorrect environment variables
- Test failures
- Build errors

### Deployment Hangs

- Check Vercel dashboard for build logs
- Verify all environment variables are set
- Check for infinite loops in build scripts

### Tests Fail in CI but Pass Locally

- Environment differences
- Missing environment variables
- Timezone issues
- Network dependencies

## Best Practices

### ✅ DO:
- Run tests before every deployment
- Use preview deployments for PRs
- Tag production deployments
- Monitor build times
- Keep workflows DRY (Don't Repeat Yourself)
- Cache dependencies
- Fail fast on critical errors

### ❌ DON'T:
- Skip tests to deploy faster
- Commit secrets to workflows
- Deploy without code review
- Ignore failed checks
- Bypass branch protection
- Deploy without backups

## Next Steps

✅ CI/CD pipeline configured  
➡️ **Next**: Set up monitoring in `05-monitoring.md`
