# Wise Daily Spending Tracker
# Pulls transactions from Wise business account and logs to spending tracker

$token = (Get-Content wise-credentials.json | ConvertFrom-Json).apiToken
$headers = @{ Authorization = "Bearer $token" }

# Get business account NZD balance ID
$account = Invoke-RestMethod -Uri "https://api.transferwise.com/v1/borderless-accounts?profileId=28947642" -Headers $headers
$nzdBalance = $account.balances | Where-Object { $_.currency -eq "NZD" }
$balanceId = $nzdBalance.id

# Get today's transactions (00:00 to now)
$today = Get-Date
$from = $today.Date.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
$to = $today.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")

# Pull statement
$statement = Invoke-RestMethod -Uri "https://api.transferwise.com/v1/profiles/28947642/balance-statements/$balanceId/statement.json?intervalStart=$from&intervalEnd=$to&type=COMPACT" -Headers $headers

# Format transactions
$trackerFile = "memory/spending-tracker-feb-2026.md"
$date = $today.ToString("yyyy-MM-dd")

if ($statement.transactions.Count -gt 0) {
    $output = "`n## $date`n`n"
    
    foreach ($tx in $statement.transactions) {
        $amount = [math]::Abs($tx.amount.value)
        $time = ([DateTime]$tx.date).ToString("HH:mm")
        
        if ($tx.details.type -eq "CARD") {
            $merchant = $tx.details.merchant.name
            $category = $tx.details.category
            $output += "- **`$$amount** @ $merchant ($category) - $time`n"
        } elseif ($tx.details.type -eq "TRANSFER") {
            $recipient = $tx.details.recipient.name
            $output += "- **`$$amount** → $recipient (Transfer) - $time`n"
        } else {
            $desc = $tx.details.description
            $output += "- **`$$amount** - $desc - $time`n"
        }
    }
    
    $total = ($statement.transactions | Where-Object { $_.type -eq "DEBIT" } | Measure-Object -Property { $_.amount.value } -Sum).Sum
    $output += "`n**Total spent today:** `$$([math]::Abs($total))`n"
    
    # Append to tracker file
    Add-Content -Path $trackerFile -Value $output
    
    Write-Host "✅ Logged $($statement.transactions.Count) transactions for $date"
} else {
    Write-Host "No transactions today ($date)"
}
