$body = @{
    path = "tasks:listPending"
    args = @{}
} | ConvertTo-Json -Compress

try {
    $response = Invoke-RestMethod -Uri "https://little-ladybug-483.convex.cloud/api/query" -Method POST -ContentType "application/json" -Body $body
    $response | ConvertTo-Json -Depth 10
} catch {
    Write-Host "Error: $($_.Exception.Message)"
    Write-Host $_.ErrorDetails.Message
}
