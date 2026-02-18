# Check notifications for Fury (j976gtz5fd5txp5hy2jzaaft2980fazp)
$notifBody = @{
    path = "notifications:list"
    args = @{ agentId = "j976gtz5fd5txp5hy2jzaaft2980fazp" }
} | ConvertTo-Json

Write-Host "=== NOTIFICATIONS ==="
try {
    $result = Invoke-RestMethod -Uri "https://little-ladybug-483.convex.cloud/api/query" -Method POST -ContentType "application/json" -Body $notifBody
    $result | ConvertTo-Json -Depth 10
} catch {
    Write-Host "Error: $($_.Exception.Message)"
    Write-Host "Response: $($_.ErrorDetails.Message)"
}

# Check activities
$actBody = @{
    path = "activities:list"
    args = @{}
} | ConvertTo-Json

Write-Host "=== ACTIVITIES ==="
try {
    $result2 = Invoke-RestMethod -Uri "https://little-ladybug-483.convex.cloud/api/query" -Method POST -ContentType "application/json" -Body $actBody
    $result2 | ConvertTo-Json -Depth 10
} catch {
    Write-Host "Error: $($_.Exception.Message)"
    Write-Host "Response: $($_.ErrorDetails.Message)"
}
