#!/bin/bash

# Production Database Migration Script
# This script applies database migrations to the production database with safety checks

set -e

# Colors for output
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo -e "${YELLOW}⚠️  WARNING: This will apply migrations to PRODUCTION database${NC}"
echo ""

# Load .env.production and extract DATABASE_URL
if [ ! -f ".env.production" ]; then
  echo -e "${RED}❌ Error: .env.production file not found${NC}"
  exit 1
fi

# Extract DATABASE_URL from .env.production
DB_URL=$(grep "^DATABASE_URL=" .env.production | cut -d '=' -f 2- | tr -d '"')

if [ -z "$DB_URL" ]; then
  echo -e "${RED}❌ Error: DATABASE_URL not found in .env.production${NC}"
  exit 1
fi

# Display connection info
echo -e "${YELLOW}📊 Database Connection Details:${NC}"
echo "-----------------------------------"

# Extract host and database name for display (mask credentials)
MASKED_URL=$(echo "$DB_URL" | sed 's/:[^@]*@/@/g')
echo "Connection: $MASKED_URL"
echo ""

# Confirmation prompt
read -p "$(echo -e ${GREEN}Type 'yes' to confirm and proceed with production migration: ${NC})" -r
echo

if [[ ! $REPLY =~ ^[Yy][Ee][Ss]$ ]]; then
  echo -e "${YELLOW}❌ Cancelled${NC}"
  exit 0
fi

echo -e "${GREEN}✓ Proceeding with production database migration...${NC}"
echo ""

# Run migration with .env.production
pnpm migrate:prod

echo ""
echo -e "${GREEN}✅ Production migration completed successfully${NC}"
