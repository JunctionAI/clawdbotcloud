#!/bin/bash

# Stripe Product & Payment Link Automation - Bash Version
# One-command setup for all products and payment links
# Usage: ./stripe-setup.sh

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

log_success() { echo -e "${GREEN}✓${NC} $1"; }
log_info() { echo -e "${BLUE}ℹ${NC} $1"; }
log_warn() { echo -e "${YELLOW}⚠${NC} $1"; }
log_error() { echo -e "${RED}✗${NC} $1"; }
log_header() { echo -e "\n${BLUE}━━━ $1 ━━━${NC}\n"; }

log_header "Stripe Product & Payment Link Setup"

# Get API key
API_KEY="${STRIPE_SECRET_KEY}"

if [ -z "$API_KEY" ]; then
    log_warn "STRIPE_SECRET_KEY not found in environment"
    read -p "Enter your Stripe Secret Key (sk_test_... or sk_live_...): " API_KEY
fi

if [[ ! "$API_KEY" =~ ^sk_ ]]; then
    log_error "Invalid Stripe secret key. Must start with sk_test_ or sk_live_"
    exit 1
fi

log_success "Stripe API key validated"

# Check for required commands
if ! command -v curl &> /dev/null; then
    log_error "curl is required but not installed. Please install curl."
    exit 1
fi

if ! command -v jq &> /dev/null; then
    log_warn "jq not found. Output will be less pretty. Install with: brew install jq"
    JQ_AVAILABLE=false
else
    JQ_AVAILABLE=true
fi

BASE_URL="https://api.stripe.com/v1"

# Function to call Stripe API
stripe_api() {
    local endpoint="$1"
    local data="$2"
    
    response=$(curl -s -X POST "${BASE_URL}${endpoint}" \
        -u "${API_KEY}:" \
        -d "${data}")
    
    echo "$response"
}

# Store results
declare -a PAYMENT_LINKS

# Product configurations
declare -A SETUP_FEES=(
    ["Starter Setup Fee"]="29900|One-time setup fee for Starter plan"
    ["Professional Setup Fee"]="59900|One-time setup fee for Professional plan"
    ["Enterprise Setup Fee"]="99900|One-time setup fee for Enterprise plan"
)

declare -A SUBSCRIPTIONS=(
    ["Starter Subscription"]="19900|Monthly subscription for Starter plan"
    ["Professional Subscription"]="49900|Monthly subscription for Professional plan"
    ["Enterprise Subscription"]="99900|Monthly subscription for Enterprise plan"
)

# Create one-time setup fee products
log_header "Creating Setup Fee Products"

for name in "${!SETUP_FEES[@]}"; do
    IFS='|' read -r amount description <<< "${SETUP_FEES[$name]}"
    
    # Create product
    product_data="name=${name}&description=${description}&type=service"
    product_response=$(stripe_api "/products" "$product_data")
    
    if [ "$JQ_AVAILABLE" = true ]; then
        product_id=$(echo "$product_response" | jq -r '.id')
    else
        product_id=$(echo "$product_response" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
    fi
    
    if [ ! -z "$product_id" ] && [ "$product_id" != "null" ]; then
        log_success "Created product: $name"
        
        # Create one-time price
        price_data="product=${product_id}&unit_amount=${amount}&currency=usd"
        price_response=$(stripe_api "/prices" "$price_data")
        
        if [ "$JQ_AVAILABLE" = true ]; then
            price_id=$(echo "$price_response" | jq -r '.id')
        else
            price_id=$(echo "$price_response" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
        fi
        
        if [ ! -z "$price_id" ] && [ "$price_id" != "null" ]; then
            price_display=$((amount / 100))
            log_success "Created price: \$$price_display"
            
            # Create payment link
            link_data="line_items[0][price]=${price_id}&line_items[0][quantity]=1"
            link_response=$(stripe_api "/payment_links" "$link_data")
            
            if [ "$JQ_AVAILABLE" = true ]; then
                link_url=$(echo "$link_response" | jq -r '.url')
            else
                link_url=$(echo "$link_response" | grep -o '"url":"[^"]*"' | cut -d'"' -f4)
            fi
            
            if [ ! -z "$link_url" ] && [ "$link_url" != "null" ]; then
                log_success "Created payment link: $link_url"
                PAYMENT_LINKS+=("SETUP|$name|$link_url")
            fi
        fi
    else
        log_error "Failed to create product: $name"
    fi
    echo ""
done

# Create subscription products
log_header "Creating Subscription Products"

for name in "${!SUBSCRIPTIONS[@]}"; do
    IFS='|' read -r amount description <<< "${SUBSCRIPTIONS[$name]}"
    
    # Create product
    product_data="name=${name}&description=${description}&type=service"
    product_response=$(stripe_api "/products" "$product_data")
    
    if [ "$JQ_AVAILABLE" = true ]; then
        product_id=$(echo "$product_response" | jq -r '.id')
    else
        product_id=$(echo "$product_response" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
    fi
    
    if [ ! -z "$product_id" ] && [ "$product_id" != "null" ]; then
        log_success "Created product: $name"
        
        # Create recurring price
        price_data="product=${product_id}&unit_amount=${amount}&currency=usd&recurring[interval]=month"
        price_response=$(stripe_api "/prices" "$price_data")
        
        if [ "$JQ_AVAILABLE" = true ]; then
            price_id=$(echo "$price_response" | jq -r '.id')
        else
            price_id=$(echo "$price_response" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)
        fi
        
        if [ ! -z "$price_id" ] && [ "$price_id" != "null" ]; then
            price_display=$((amount / 100))
            log_success "Created price: \$$price_display/month"
            
            # Create payment link
            link_data="line_items[0][price]=${price_id}&line_items[0][quantity]=1"
            link_response=$(stripe_api "/payment_links" "$link_data")
            
            if [ "$JQ_AVAILABLE" = true ]; then
                link_url=$(echo "$link_response" | jq -r '.url')
            else
                link_url=$(echo "$link_response" | grep -o '"url":"[^"]*"' | cut -d'"' -f4)
            fi
            
            if [ ! -z "$link_url" ] && [ "$link_url" != "null" ]; then
                log_success "Created payment link: $link_url"
                PAYMENT_LINKS+=("SUBSCRIPTION|$name|$link_url")
            fi
        fi
    else
        log_error "Failed to create product: $name"
    fi
    echo ""
done

# Summary
log_header "Setup Complete! 🎉"

echo -e "\n📋 PAYMENT LINKS:\n"

echo "Setup Fees (One-time):"
for link in "${PAYMENT_LINKS[@]}"; do
    IFS='|' read -r type name url <<< "$link"
    if [ "$type" = "SETUP" ]; then
        echo "  • $name"
        echo "    $url"
        echo ""
    fi
done

echo "Subscriptions (Monthly):"
for link in "${PAYMENT_LINKS[@]}"; do
    IFS='|' read -r type name url <<< "$link"
    if [ "$type" = "SUBSCRIPTION" ]; then
        echo "  • $name"
        echo "    $url"
        echo ""
    fi
done

log_info "Total payment links created: ${#PAYMENT_LINKS[@]}"

echo -e "\n💡 Next steps:"
echo "   1. Save these payment links"
echo "   2. View all products: https://dashboard.stripe.com/products"
echo "   3. View payment links: https://dashboard.stripe.com/payment-links"
echo ""
