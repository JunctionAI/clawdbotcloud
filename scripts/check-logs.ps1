# Check what happened before the crash - end of yesterday's log
$results = Select-String -Path 'C:\tmp\clawdbot\clawdbot-2026-02-18.log' -Pattern 'Unhandled|SIGTERM|exit|crash|fatal|process.*die|uncaught'
Write-Output "Found $($results.Count) crash events in Feb 18 log"
foreach ($r in ($results | Select-Object -Last 5)) {
    $text = $r.Line
    if ($text.Length -gt 500) { $text = $text.Substring(0, 500) }
    Write-Output $text
    Write-Output "---"
}

# Also check when the old gateway (PID 534932 from our restart) stopped
Write-Output "`n=== Checking for port 18789 timeline ==="
$results2 = Select-String -Path 'C:\tmp\clawdbot\clawdbot-2026-02-18.log' -Pattern 'listening on ws://127|Port 18789 is already'
Write-Output "Found $($results2.Count) port events"
foreach ($r in ($results2 | Select-Object -Last 10)) {
    $text = $r.Line
    if ($text.Length -gt 350) { $text = $text.Substring(0, 350) }
    Write-Output $text
    Write-Output "---"
}
