# Stripe Product & Payment Link Automation - PowerShell Version
# One-command setup for all products and payment links
# Usage: .\stripe-setup.ps1

param(
    [string]$ApiKey = $env:STRIPE_SECRET_KEY
)

Write-Host "`n━━━ Stripe Product & Payment Link Setup ━━━`n" -ForegroundColor Blue

# Check for API key
if (-not $ApiKey) {
    $ApiKey = Read-Host "Enter your Stripe Secret Key (sk_test_... or sk_live_...)"
}

if (-not $ApiKey -or -not $ApiKey.StartsWith("sk_")) {
    Write-Host "✗ Invalid Stripe secret key. Must start with sk_test_ or sk_live_" -ForegroundColor Red
    exit 1
}

$headers = @{
    "Authorization" = "Bearer $ApiKey"
    "Content-Type" = "application/x-www-form-urlencoded"
}

$baseUrl = "https://api.stripe.com/v1"

# Product configurations
$setupFees = @(
    @{ name = "Starter Setup Fee"; amount = 29900; description = "One-time setup fee for Starter plan" },
    @{ name = "Professional Setup Fee"; amount = 59900; description = "One-time setup fee for Professional plan" },
    @{ name = "Enterprise Setup Fee"; amount = 99900; description = "One-time setup fee for Enterprise plan" }
)

$subscriptions = @(
    @{ name = "Starter Subscription"; amount = 19900; description = "Monthly subscription for Starter plan" },
    @{ name = "Professional Subscription"; amount = 49900; description = "Monthly subscription for Professional plan" },
    @{ name = "Enterprise Subscription"; amount = 99900; description = "Monthly subscription for Enterprise plan" }
)

$results = @{
    paymentLinks = @()
}

function Invoke-StripeAPI {
    param($Endpoint, $Body)
    try {
        $response = Invoke-RestMethod -Uri "$baseUrl$Endpoint" -Method Post -Headers $headers -Body $Body
        return $response
    } catch {
        Write-Host "✗ API Error: $($_.Exception.Message)" -ForegroundColor Red
        return $null
    }
}

# Create one-time setup fee products
Write-Host "`n━━━ Creating Setup Fee Products ━━━`n" -ForegroundColor Blue

foreach ($fee in $setupFees) {
    # Create product
    $productBody = "name=$([uri]::EscapeDataString($fee.name))&description=$([uri]::EscapeDataString($fee.description))&type=service"
    $product = Invoke-StripeAPI -Endpoint "/products" -Body $productBody
    
    if ($product) {
        Write-Host "✓ Created product: $($fee.name)" -ForegroundColor Green
        
        # Create one-time price
        $priceBody = "product=$($product.id)&unit_amount=$($fee.amount)&currency=usd"
        $price = Invoke-StripeAPI -Endpoint "/prices" -Body $priceBody
        
        if ($price) {
            Write-Host "✓ Created price: `$$($fee.amount / 100)" -ForegroundColor Green
            
            # Create payment link
            $linkBody = "line_items[0][price]=$($price.id)&line_items[0][quantity]=1"
            $paymentLink = Invoke-StripeAPI -Endpoint "/payment_links" -Body $linkBody
            
            if ($paymentLink) {
                Write-Host "✓ Created payment link: $($paymentLink.url)" -ForegroundColor Green
                $results.paymentLinks += @{ type = "setup"; name = $fee.name; url = $paymentLink.url }
            }
        }
    }
    Write-Host ""
}

# Create subscription products
Write-Host "━━━ Creating Subscription Products ━━━`n" -ForegroundColor Blue

foreach ($sub in $subscriptions) {
    # Create product
    $productBody = "name=$([uri]::EscapeDataString($sub.name))&description=$([uri]::EscapeDataString($sub.description))&type=service"
    $product = Invoke-StripeAPI -Endpoint "/products" -Body $productBody
    
    if ($product) {
        Write-Host "✓ Created product: $($sub.name)" -ForegroundColor Green
        
        # Create recurring price
        $priceBody = "product=$($product.id)&unit_amount=$($sub.amount)&currency=usd&recurring[interval]=month"
        $price = Invoke-StripeAPI -Endpoint "/prices" -Body $priceBody
        
        if ($price) {
            Write-Host "✓ Created price: `$$($sub.amount / 100)/month" -ForegroundColor Green
            
            # Create payment link
            $linkBody = "line_items[0][price]=$($price.id)&line_items[0][quantity]=1"
            $paymentLink = Invoke-StripeAPI -Endpoint "/payment_links" -Body $linkBody
            
            if ($paymentLink) {
                Write-Host "✓ Created payment link: $($paymentLink.url)" -ForegroundColor Green
                $results.paymentLinks += @{ type = "subscription"; name = $sub.name; url = $paymentLink.url }
            }
        }
    }
    Write-Host ""
}

# Summary
Write-Host "`n━━━ Setup Complete! 🎉 ━━━`n" -ForegroundColor Blue
Write-Host "📋 PAYMENT LINKS:`n"

Write-Host "Setup Fees (One-time):" -ForegroundColor Cyan
$results.paymentLinks | Where-Object { $_.type -eq "setup" } | ForEach-Object {
    Write-Host "  • $($_.name)"
    Write-Host "    $($_.url)`n"
}

Write-Host "Subscriptions (Monthly):" -ForegroundColor Cyan
$results.paymentLinks | Where-Object { $_.type -eq "subscription" } | ForEach-Object {
    Write-Host "  • $($_.name)"
    Write-Host "    $($_.url)`n"
}

Write-Host "💡 Next steps:"
Write-Host "   1. Save these payment links"
Write-Host "   2. View all products: https://dashboard.stripe.com/products"
Write-Host "   3. View payment links: https://dashboard.stripe.com/payment-links`n"
