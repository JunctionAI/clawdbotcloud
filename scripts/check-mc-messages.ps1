# Try various message/comment endpoints
$endpoints = @("messages:list", "comments:list", "tasks:getByAssignee", "tasks:getPending", "tasks:inbox")

foreach ($ep in $endpoints) {
    $body = @{
        path = $ep
        args = @{}
    } | ConvertTo-Json
    
    Write-Host "=== $ep ==="
    try {
        $result = Invoke-RestMethod -Uri "https://little-ladybug-483.convex.cloud/api/query" -Method POST -ContentType "application/json" -Body $body
        $result | ConvertTo-Json -Depth 5
    } catch {
        Write-Host "Error: $($_.ErrorDetails.Message)"
    }
}
