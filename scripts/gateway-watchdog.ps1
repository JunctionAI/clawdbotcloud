# Gateway Watchdog v3 - NEVER gives up, restarts forever
# Checks every 30 seconds, restarts gateway if down
# Uses node.exe directly (works from Task Scheduler without GUI)
# Log file: C:\Users\Nightgalem\clawd\logs\gateway-watchdog.log

$ErrorActionPreference = "Continue"

$gatewayPort = 18789
$checkInterval = 30  # seconds
$nodeExe = "C:\Program Files\nodejs\node.exe"
$entryScript = "C:\Users\Nightgalem\AppData\Roaming\npm\node_modules\clawdbot\dist\entry.js"
$logDir = "C:\Users\Nightgalem\clawd\logs"
$logFile = "$logDir\gateway-watchdog.log"
$maxLogSizeMB = 5

# Ensure log directory exists
if (-not (Test-Path $logDir)) {
    New-Item -ItemType Directory -Path $logDir -Force | Out-Null
}

function Write-Log {
    param([string]$Message)
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $line = "[$timestamp] $Message"
    Add-Content -Path $logFile -Value $line -ErrorAction SilentlyContinue

    # Rotate log if too large
    if ((Test-Path $logFile) -and ((Get-Item $logFile).Length / 1MB) -gt $maxLogSizeMB) {
        $backupLog = "$logFile.old"
        if (Test-Path $backupLog) { Remove-Item $backupLog -Force }
        Rename-Item $logFile $backupLog -Force
    }
}

function Test-GatewayRunning {
    try {
        $conn = Get-NetTCPConnection -LocalPort $gatewayPort -ErrorAction SilentlyContinue |
            Where-Object { $_.State -eq 'Listen' }
        return $null -ne $conn
    } catch {
        return $false
    }
}

function Start-Gateway {
    Write-Log "Starting gateway..."

    if (-not (Test-Path $nodeExe)) {
        Write-Log "ERROR: node.exe not found at $nodeExe"
        return $false
    }
    if (-not (Test-Path $entryScript)) {
        Write-Log "ERROR: entry.js not found at $entryScript"
        return $false
    }

    try {
        # Kill any zombie node processes holding the port
        $portUsers = Get-NetTCPConnection -LocalPort $gatewayPort -ErrorAction SilentlyContinue
        if ($portUsers) {
            foreach ($p in $portUsers) {
                try {
                    Stop-Process -Id $p.OwningProcess -Force -ErrorAction SilentlyContinue
                    Write-Log "Killed zombie process $($p.OwningProcess) on port $gatewayPort"
                } catch {}
            }
            Start-Sleep -Seconds 3
        }

        # Launch node.exe directly with Start-Process
        # This works from Task Scheduler without needing a GUI/console window
        Write-Log "Running: node.exe $entryScript gateway run"
        $proc = Start-Process -FilePath $nodeExe -ArgumentList "`"$entryScript`" gateway run" -WorkingDirectory "C:\Users\Nightgalem" -WindowStyle Hidden -PassThru
        Write-Log "Started node process PID: $($proc.Id)"

        # Wait for it to bind the port (up to 30 seconds)
        for ($i = 0; $i -lt 6; $i++) {
            Start-Sleep -Seconds 5
            if (Test-GatewayRunning) {
                Write-Log "Gateway is now listening on port $gatewayPort"
                return $true
            }
        }

        Write-Log "WARNING: Gateway not listening after 30s, will retry next cycle"
        return $false
    } catch {
        Write-Log "ERROR starting gateway: $($_.Exception.Message)"
        return $false
    }
}

# Prevent multiple watchdog instances via mutex
$mutexName = "Global\ClawdbotGatewayWatchdog"
$createdNew = $false
try {
    $mutex = New-Object System.Threading.Mutex($true, $mutexName, [ref]$createdNew)
} catch {
    # Mutex creation failed, try without Global prefix
    $mutexName = "ClawdbotGatewayWatchdog"
    $mutex = New-Object System.Threading.Mutex($true, $mutexName, [ref]$createdNew)
}

if (-not $createdNew) {
    # Another watchdog is already running - exit silently
    exit 0
}

try {
    Write-Log "========================================="
    Write-Log "Gateway Watchdog v2 started (NEVER gives up)"
    Write-Log "Monitoring port $gatewayPort every ${checkInterval}s"
    Write-Log "========================================="

    $failCount = 0

    while ($true) {
        try {
            if (Test-GatewayRunning) {
                if ($failCount -gt 0) {
                    Write-Log "Gateway recovered after $failCount failed checks"
                }
                $failCount = 0
            } else {
                $failCount++
                Write-Log "Gateway DOWN (check #$failCount) - restarting..."
                Start-Gateway

                # Brief extra wait after restart attempt
                if ($failCount -gt 3) {
                    $extraWait = [Math]::Min(60, $failCount * 10)
                    Write-Log "Extra cooldown: ${extraWait}s (attempt #$failCount)"
                    Start-Sleep -Seconds $extraWait
                }
            }
        } catch {
            Write-Log "ERROR in watchdog loop: $($_.Exception.Message)"
        }

        Start-Sleep -Seconds $checkInterval
    }
} finally {
    $mutex.ReleaseMutex()
    $mutex.Dispose()
    Write-Log "Watchdog stopped"
}
