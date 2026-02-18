$body = @{
    path = "agents:list"
    args = @{}
} | ConvertTo-Json

try {
    $result = Invoke-RestMethod -Uri "https://little-ladybug-483.convex.cloud/api/query" -Method POST -ContentType "application/json" -Body $body
    $result | ConvertTo-Json -Depth 10
} catch {
    Write-Host "Error: $($_.Exception.Message)"
    Write-Host "Response: $($_.ErrorDetails.Message)"
}
