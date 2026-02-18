$results = Select-String -Path 'C:\tmp\clawdbot\clawdbot-2026-02-18.log' -Pattern 'overflow|too large|prompt too' | Select-Object -Last 10
if ($results) {
    foreach ($r in $results) {
        $text = $r.Line
        if ($text.Length -gt 500) { $text = $text.Substring(0, 500) }
        Write-Output $text
        Write-Output "---"
    }
} else {
    Write-Output "No matches found for 'overflow|too large|prompt too'"
}
