#!/bin/bash

# ==============================================
# Style Swap - Deployment Script
# ==============================================
# Usage: ./scripts/deploy.sh [preview|production]
# ==============================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default environment
ENVIRONMENT="${1:-preview}"

# Banner
echo ""
echo "======================================"
echo "  Style Swap Deployment Script"
echo "======================================"
echo ""

# Validate environment
if [[ "$ENVIRONMENT" != "preview" && "$ENVIRONMENT" != "production" ]]; then
  echo -e "${RED}❌ Invalid environment: $ENVIRONMENT${NC}"
  echo "Usage: ./scripts/deploy.sh [preview|production]"
  exit 1
fi

echo -e "${BLUE}🎯 Target environment: $ENVIRONMENT${NC}"
echo ""

# Pre-deployment checks
echo -e "${YELLOW}🔍 Running pre-deployment checks...${NC}"

# Check if git is clean
if [[ -n $(git status -s) ]]; then
  echo -e "${YELLOW}⚠️  Warning: You have uncommitted changes${NC}"
  read -p "Continue anyway? (yes/no): " continue
  if [[ "$continue" != "yes" ]]; then
    echo -e "${RED}❌ Deployment cancelled${NC}"
    exit 1
  fi
fi

# Check if on correct branch for production
if [[ "$ENVIRONMENT" == "production" ]]; then
  CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
  if [[ "$CURRENT_BRANCH" != "main" ]]; then
    echo -e "${RED}❌ Production deployments must be from 'main' branch${NC}"
    echo -e "   Current branch: $CURRENT_BRANCH"
    exit 1
  fi
fi

# Run tests
echo -e "${YELLOW}🧪 Running tests...${NC}"
npm run test:ci || {
  echo -e "${RED}❌ Tests failed${NC}"
  exit 1
}
echo -e "${GREEN}✅ Tests passed${NC}"

# Run linting
echo -e "${YELLOW}🔍 Running linter...${NC}"
npm run lint || {
  echo -e "${RED}❌ Linting failed${NC}"
  exit 1
}
echo -e "${GREEN}✅ Linting passed${NC}"

# Type check
echo -e "${YELLOW}📝 Running type check...${NC}"
npm run type-check || {
  echo -e "${RED}❌ Type check failed${NC}"
  exit 1
}
echo -e "${GREEN}✅ Type check passed${NC}"

# Build locally
echo -e "${YELLOW}🏗️  Building application...${NC}"
npm run build || {
  echo -e "${RED}❌ Build failed${NC}"
  exit 1
}
echo -e "${GREEN}✅ Build successful${NC}"

echo ""
echo -e "${GREEN}✅ All pre-deployment checks passed${NC}"
echo ""

# Confirmation for production
if [[ "$ENVIRONMENT" == "production" ]]; then
  echo -e "${YELLOW}⚠️  You are about to deploy to PRODUCTION${NC}"
  echo ""
  read -p "Are you absolutely sure? (yes/no): " confirm
  if [[ "$confirm" != "yes" ]]; then
    echo -e "${RED}❌ Deployment cancelled${NC}"
    exit 1
  fi
fi

# Deploy with Vercel
echo -e "${BLUE}🚀 Deploying to $ENVIRONMENT...${NC}"

if [[ "$ENVIRONMENT" == "production" ]]; then
  vercel --prod
else
  vercel
fi

# Get deployment URL
DEPLOYMENT_URL=$(vercel ls | grep -m 1 "style-swap" | awk '{print $2}')

echo ""
echo -e "${GREEN}✅ Deployment successful!${NC}"
echo ""
echo "======================================"
echo "  Deployment Information"
echo "======================================"
echo ""
echo -e "${BLUE}🔗 URL:${NC} $DEPLOYMENT_URL"
echo ""

# Tag deployment for production
if [[ "$ENVIRONMENT" == "production" ]]; then
  TAG="deploy-$(date +'%Y%m%d-%H%M%S')"
  git tag -a $TAG -m "Production deployment"
  git push origin $TAG
  echo -e "${GREEN}✅ Tagged deployment: $TAG${NC}"
  echo ""
fi

# Post-deployment checks
echo -e "${YELLOW}🏥 Running health checks...${NC}"
node scripts/health-check.js

echo ""
echo -e "${GREEN}✅ Deployment complete!${NC}"
echo ""
echo "======================================"
echo "  Next Steps"
echo "======================================"
echo ""
echo "1. Monitor errors: https://sentry.io"
echo "2. Check analytics: https://vercel.com/analytics"
echo "3. Verify functionality: $DEPLOYMENT_URL"
echo ""

if [[ "$ENVIRONMENT" == "production" ]]; then
  echo -e "${YELLOW}⚠️  Keep monitoring for the next 30 minutes${NC}"
  echo ""
fi
