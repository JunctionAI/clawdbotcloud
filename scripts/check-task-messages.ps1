# Check messages for tasks assigned to Fury
$taskIds = @(
    "js72d0afvcyfhg012smjwkdamh80ejbt"  # Test Mission Control Setup
)

foreach ($taskId in $taskIds) {
    $body = @{
        path = "messages:list"
        args = @{ taskId = $taskId }
    } | ConvertTo-Json
    
    Write-Host "=== Messages for task $taskId ==="
    try {
        $result = Invoke-RestMethod -Uri "https://little-ladybug-483.convex.cloud/api/query" -Method POST -ContentType "application/json" -Body $body
        $result | ConvertTo-Json -Depth 10
    } catch {
        Write-Host "Error: $($_.ErrorDetails.Message)"
    }
}
