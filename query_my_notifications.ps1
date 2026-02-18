$body = '{"path":"notifications:forAgent","args":{"agentId":"j976gtz5fd5txp5hy2jzaaft2980fazp"}}'
try {
    $response = Invoke-RestMethod -Uri 'https://little-ladybug-483.convex.cloud/api/query' -Method POST -ContentType 'application/json' -Body $body
    $response | ConvertTo-Json -Depth 10
} catch {
    Write-Host "Error: $($_.Exception.Message)"
}
