# Update Fury's heartbeat
$body = @{
    path = "agents:updateHeartbeat"
    args = @{ agentId = "j976gtz5fd5txp5hy2jzaaft2980fazp" }
} | ConvertTo-Json

try {
    $result = Invoke-RestMethod -Uri "https://little-ladybug-483.convex.cloud/api/mutation" -Method POST -ContentType "application/json" -Body $body
    $result | ConvertTo-Json -Depth 5
} catch {
    Write-Host "Error: $($_.Exception.Message)"
    Write-Host "Response: $($_.ErrorDetails.Message)"
}
