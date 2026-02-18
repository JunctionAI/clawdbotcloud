$body = '{"path":"agents:heartbeat","args":{"sessionKey":"agent:customer-researcher:main","status":"idle"}}'
try {
    $response = Invoke-RestMethod -Uri 'https://little-ladybug-483.convex.cloud/api/mutation' -Method POST -ContentType 'application/json' -Body $body
    $response | ConvertTo-Json -Depth 10
} catch {
    Write-Host "Error: $($_.Exception.Message)"
}
