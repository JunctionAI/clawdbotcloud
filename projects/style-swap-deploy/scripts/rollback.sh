#!/bin/bash

# ==============================================
# Style Swap - Rollback Script
# ==============================================
# Usage: ./scripts/rollback.sh [deployment-url]
# ==============================================

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Banner
echo ""
echo "======================================"
echo "  Style Swap Rollback Script"
echo "======================================"
echo ""

# Check if deployment URL provided
if [ -z "$1" ]; then
  echo -e "${RED}❌ Error: No deployment URL provided${NC}"
  echo ""
  echo "Usage: ./scripts/rollback.sh [deployment-url]"
  echo ""
  echo -e "${BLUE}Recent deployments:${NC}"
  echo ""
  vercel ls
  echo ""
  exit 1
fi

DEPLOYMENT_URL=$1

# Validate deployment exists
if ! vercel ls | grep -q "$DEPLOYMENT_URL"; then
  echo -e "${RED}❌ Error: Deployment not found: $DEPLOYMENT_URL${NC}"
  echo ""
  echo -e "${BLUE}Available deployments:${NC}"
  vercel ls
  exit 1
fi

# Display deployment info
echo -e "${YELLOW}📦 Rolling back to:${NC} $DEPLOYMENT_URL"
echo ""
echo -e "${RED}⚠️  WARNING: This will promote the deployment to production${NC}"
echo ""

# Confirmation
read -p "Are you sure you want to rollback? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
  echo -e "${YELLOW}❌ Rollback cancelled${NC}"
  exit 0
fi

# Create rollback tag
TAG="rollback-$(date +'%Y%m%d-%H%M%S')"
git tag -a $TAG -m "Rollback to $DEPLOYMENT_URL"

# Promote deployment
echo ""
echo -e "${BLUE}🔄 Promoting deployment to production...${NC}"
vercel promote $DEPLOYMENT_URL --prod

echo ""
echo -e "${GREEN}✅ Rollback initiated${NC}"
echo ""

# Wait a moment for propagation
echo -e "${YELLOW}⏳ Waiting for deployment to propagate...${NC}"
sleep 10

# Run health checks
echo ""
echo -e "${YELLOW}🏥 Running health checks...${NC}"
node scripts/health-check.js

echo ""
echo -e "${GREEN}✅ Rollback complete!${NC}"
echo ""
echo "======================================"
echo "  Post-Rollback Actions"
echo "======================================"
echo ""
echo "1. Monitor errors: https://sentry.io"
echo "2. Check analytics: https://vercel.com/analytics"
echo "3. Verify site: https://styleswap.com"
echo ""
echo -e "${YELLOW}⚠️  Next steps:${NC}"
echo "- Fix the bug that caused the rollback"
echo "- Test thoroughly in staging"
echo "- Create postmortem document"
echo "- Plan re-deployment"
echo ""
echo -e "${BLUE}📝 Rollback tagged as: $TAG${NC}"
echo ""

# Push tag
git push origin $TAG
