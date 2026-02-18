# Try agents:update or agents:heartbeat
$endpoints = @("agents:update", "agents:heartbeat", "agents:patch", "agents:updateStatus")

foreach ($ep in $endpoints) {
    $body = @{
        path = $ep
        args = @{ agentId = "j976gtz5fd5txp5hy2jzaaft2980fazp"; status = "idle" }
    } | ConvertTo-Json
    
    Write-Host "=== $ep ==="
    try {
        $result = Invoke-RestMethod -Uri "https://little-ladybug-483.convex.cloud/api/mutation" -Method POST -ContentType "application/json" -Body $body
        $result | ConvertTo-Json -Depth 5
        break
    } catch {
        Write-Host "Error: $($_.ErrorDetails.Message)"
    }
}
