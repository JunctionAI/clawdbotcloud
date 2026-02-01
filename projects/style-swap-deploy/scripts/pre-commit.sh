#!/bin/bash

# ==============================================
# Style Swap - Pre-commit Hook
# ==============================================
# Runs before each commit to ensure code quality
# ==============================================

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo ""
echo -e "${BLUE}🔍 Running pre-commit checks...${NC}"
echo ""

# Get list of staged files
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(ts|tsx|js|jsx)$' || true)

if [ -z "$STAGED_FILES" ]; then
  echo -e "${GREEN}✅ No JavaScript/TypeScript files to check${NC}"
  exit 0
fi

# Run ESLint on staged files
echo -e "${YELLOW}📝 Running ESLint...${NC}"
npm run lint -- --fix $STAGED_FILES || {
  echo -e "${RED}❌ ESLint failed${NC}"
  echo ""
  echo "Fix linting errors before committing."
  exit 1
}
echo -e "${GREEN}✅ ESLint passed${NC}"

# Run Prettier on staged files
echo -e "${YELLOW}✨ Running Prettier...${NC}"
npx prettier --write $STAGED_FILES || {
  echo -e "${RED}❌ Prettier failed${NC}"
  exit 1
}
echo -e "${GREEN}✅ Prettier passed${NC}"

# Run TypeScript type check
echo -e "${YELLOW}📝 Running TypeScript type check...${NC}"
npm run type-check || {
  echo -e "${RED}❌ Type check failed${NC}"
  exit 1
}
echo -e "${GREEN}✅ Type check passed${NC}"

# Add formatted files back to staging
git add $STAGED_FILES

echo ""
echo -e "${GREEN}✅ All pre-commit checks passed${NC}"
echo ""

exit 0
