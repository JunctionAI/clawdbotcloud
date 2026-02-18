$body = '{"path":"tasks:list","args":{"status":"inbox"}}'
try {
    $response = Invoke-RestMethod -Uri 'https://little-ladybug-483.convex.cloud/api/query' -Method POST -ContentType 'application/json' -Body $body
    Write-Host "INBOX:"
    $response | ConvertTo-Json -Depth 10
} catch {
    Write-Host "Error: $($_.Exception.Message)"
}

$body2 = '{"path":"tasks:list","args":{"status":"in_progress"}}'
try {
    $response2 = Invoke-RestMethod -Uri 'https://little-ladybug-483.convex.cloud/api/query' -Method POST -ContentType 'application/json' -Body $body2
    Write-Host "IN_PROGRESS:"
    $response2 | ConvertTo-Json -Depth 10
} catch {
    Write-Host "Error: $($_.Exception.Message)"
}

$body3 = '{"path":"tasks:list","args":{"status":"assigned"}}'
try {
    $response3 = Invoke-RestMethod -Uri 'https://little-ladybug-483.convex.cloud/api/query' -Method POST -ContentType 'application/json' -Body $body3
    Write-Host "ASSIGNED:"
    $response3 | ConvertTo-Json -Depth 10
} catch {
    Write-Host "Error: $($_.Exception.Message)"
}

$body4 = '{"path":"tasks:list","args":{"status":"review"}}'
try {
    $response4 = Invoke-RestMethod -Uri 'https://little-ladybug-483.convex.cloud/api/query' -Method POST -ContentType 'application/json' -Body $body4
    Write-Host "REVIEW:"
    $response4 | ConvertTo-Json -Depth 10
} catch {
    Write-Host "Error: $($_.Exception.Message)"
}
