$lines = Get-Content 'C:\tmp\clawdbot\clawdbot-2026-02-18.log' -Tail 20
foreach ($line in $lines) {
    Write-Output $line.Substring(0, [Math]::Min(250, $line.Length))
    Write-Output "---"
}
