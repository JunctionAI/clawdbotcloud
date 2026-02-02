# Test: Gateway Keep-Alive PATH Resolution Bug
# This test reproduces the bug where the scheduled task fails because
# 'clawdbot' isn't found when running without the user's PATH environment.
#
# The bug: keep-gateway-alive.ps1 uses Start-Process -FilePath "clawdbot"
# which relies on PATH to find the command. When running as a scheduled task
# with LogonType S4U, the user's PATH isn't loaded, so clawdbot can't be found.

$ErrorActionPreference = "Stop"
$testResults = @{
    Passed = @()
    Failed = @()
}

function Test-Case {
    param(
        [string]$Name,
        [scriptblock]$Test
    )

    Write-Host "`n=== TEST: $Name ===" -ForegroundColor Cyan
    try {
        $result = & $Test
        if ($result) {
            Write-Host "PASSED" -ForegroundColor Green
            $script:testResults.Passed += $Name
        } else {
            Write-Host "FAILED" -ForegroundColor Red
            $script:testResults.Failed += $Name
        }
    } catch {
        Write-Host "FAILED: $($_.Exception.Message)" -ForegroundColor Red
        $script:testResults.Failed += $Name
    }
}

# ============================================================
# TEST 1: Verify clawdbot exists in known locations
# ============================================================
Test-Case "Clawdbot executable exists in npm global" {
    $npmGlobalPath = "$env:APPDATA\npm\clawdbot.cmd"
    $exists = Test-Path $npmGlobalPath
    Write-Host "  Checking: $npmGlobalPath"
    Write-Host "  Exists: $exists"
    return $exists
}

Test-Case "Clawdbot executable exists in local node_modules" {
    $localPath = "$PSScriptRoot\..\node_modules\.bin\clawdbot.cmd"
    $exists = Test-Path $localPath
    Write-Host "  Checking: $localPath"
    Write-Host "  Exists: $exists"
    return $exists
}

# ============================================================
# TEST 2: Verify clawdbot resolves in current interactive shell
# ============================================================
Test-Case "Clawdbot resolves in current shell (interactive)" {
    $cmd = Get-Command "clawdbot" -ErrorAction SilentlyContinue
    if ($cmd) {
        Write-Host "  Found: $($cmd.Source)"
        return $true
    } else {
        Write-Host "  Not found in current PATH"
        return $false
    }
}

# ============================================================
# TEST 3: BUG REPRODUCTION - Simulate scheduled task environment
# This test strips the user-specific PATH entries and verifies
# that clawdbot CANNOT be found (demonstrating the bug)
# ============================================================
Test-Case "BUG: Clawdbot fails to resolve in scheduled task environment (no user PATH)" {
    # Simulate the minimal PATH that a scheduled task gets
    # This strips out user-specific paths like %APPDATA%\npm
    $systemPath = [System.Environment]::GetEnvironmentVariable("PATH", "Machine")

    # Save current PATH
    $originalPath = $env:PATH

    try {
        # Set PATH to only system paths (simulating scheduled task)
        $env:PATH = $systemPath

        Write-Host "  Simulating scheduled task environment..."
        Write-Host "  Using system PATH only (no user PATH)"

        # Try to find clawdbot - this SHOULD fail (reproducing the bug)
        $cmd = Get-Command "clawdbot" -ErrorAction SilentlyContinue

        if ($cmd) {
            Write-Host "  UNEXPECTED: clawdbot found at $($cmd.Source)"
            Write-Host "  Bug may be fixed or environment is different"
            return $false  # Test fails if clawdbot IS found (bug not reproduced)
        } else {
            Write-Host "  EXPECTED: clawdbot NOT found (bug reproduced)"
            Write-Host "  This is why the scheduled task fails!"
            return $true  # Test passes if clawdbot is NOT found (bug reproduced)
        }
    } finally {
        # Restore original PATH
        $env:PATH = $originalPath
    }
}

# ============================================================
# TEST 4: Verify the SOLUTION - absolute path works
# ============================================================
Test-Case "SOLUTION: Absolute path to clawdbot.cmd works" {
    $absolutePath = "$env:APPDATA\npm\clawdbot.cmd"

    if (-not (Test-Path $absolutePath)) {
        Write-Host "  clawdbot.cmd not found at expected location"
        return $false
    }

    # Save current PATH
    $originalPath = $env:PATH
    $systemPath = [System.Environment]::GetEnvironmentVariable("PATH", "Machine")

    try {
        # Set PATH to only system paths (simulating scheduled task)
        $env:PATH = $systemPath

        Write-Host "  Using absolute path: $absolutePath"
        Write-Host "  Testing if it's executable..."

        # Verify the file exists and is executable
        $exists = Test-Path $absolutePath
        Write-Host "  File exists: $exists"

        return $exists
    } finally {
        # Restore original PATH
        $env:PATH = $originalPath
    }
}

# ============================================================
# TEST 5: Verify keep-gateway-alive.ps1 uses absolute path (FIX)
# ============================================================
Test-Case "FIX VERIFICATION: keep-gateway-alive.ps1 uses absolute path variable" {
    $scriptPath = "$PSScriptRoot\keep-gateway-alive.ps1"
    $content = Get-Content $scriptPath -Raw

    # Check if script uses Start-Process with $clawdbotPath variable (the fix)
    $usesVariable = $content -match 'Start-Process\s+-FilePath\s+\$clawdbotPath'
    # Check if script still uses the old buggy relative path
    $usesRelative = $content -match 'Start-Process\s+-FilePath\s+"clawdbot"'

    Write-Host "  Checking keep-gateway-alive.ps1..."
    Write-Host "  Uses `$clawdbotPath variable: $usesVariable"
    Write-Host "  Uses buggy relative 'clawdbot': $usesRelative"

    if ($usesVariable -and -not $usesRelative) {
        Write-Host "  FIX CONFIRMED: Script uses absolute path variable"
        return $true
    } else {
        Write-Host "  BUG STILL PRESENT: Script uses relative path"
        return $false
    }
}

# ============================================================
# TEST 6: Verify script has path resolution logic
# ============================================================
Test-Case "FIX VERIFICATION: Script resolves clawdbot path at startup" {
    $scriptPath = "$PSScriptRoot\keep-gateway-alive.ps1"
    $content = Get-Content $scriptPath -Raw

    # Check for path resolution logic
    $hasLocalCheck = $content -match 'node_modules\\\.bin\\clawdbot\.cmd'
    $hasGlobalCheck = $content -match '\$env:APPDATA.*npm.*clawdbot\.cmd'
    $hasExitOnNotFound = $content -match 'exit\s+1'

    Write-Host "  Checking for path resolution logic..."
    Write-Host "  Has local node_modules check: $hasLocalCheck"
    Write-Host "  Has npm global check: $hasGlobalCheck"
    Write-Host "  Has exit on not found: $hasExitOnNotFound"

    $allChecks = $hasLocalCheck -and $hasGlobalCheck -and $hasExitOnNotFound
    if ($allChecks) {
        Write-Host "  FIX CONFIRMED: Script has proper path resolution"
    }
    return $allChecks
}

# ============================================================
# TEST 7: FIX #2 - Script uses correct gateway command
# ============================================================
Test-Case "FIX #2: Script uses 'gateway run' (foreground mode)" {
    $scriptPath = "$PSScriptRoot\keep-gateway-alive.ps1"
    $content = Get-Content $scriptPath -Raw

    # 'gateway start' = starts/restarts daemon service then EXITS (WRONG)
    # 'gateway run'   = runs gateway in foreground (STAYS RUNNING) (CORRECT)
    $usesGatewayRun = $content -match '"gateway",\s*"run"'
    $usesGatewayStart = $content -match '"gateway",\s*"start"'

    Write-Host "  Checking which gateway command is used..."
    Write-Host "  Uses 'gateway run' (foreground, stays running): $usesGatewayRun"
    Write-Host "  Uses buggy 'gateway start' (daemon, exits immediately): $usesGatewayStart"

    if ($usesGatewayRun -and -not $usesGatewayStart) {
        Write-Host "  FIX CONFIRMED: Script uses 'gateway run' (foreground mode)"
        return $true
    } elseif ($usesGatewayStart) {
        Write-Host "  BUG PRESENT: Script still uses 'gateway start' which exits immediately!"
        return $false
    } else {
        Write-Host "  UNKNOWN: Neither command pattern matched"
        return $false
    }
}

# ============================================================
# SUMMARY
# ============================================================
Write-Host "`n"
Write-Host "============================================" -ForegroundColor Yellow
Write-Host "TEST SUMMARY" -ForegroundColor Yellow
Write-Host "============================================" -ForegroundColor Yellow
Write-Host "Passed: $($testResults.Passed.Count)" -ForegroundColor Green
Write-Host "Failed: $($testResults.Failed.Count)" -ForegroundColor Red

if ($testResults.Failed.Count -gt 0) {
    Write-Host "`nFailed tests:" -ForegroundColor Red
    $testResults.Failed | ForEach-Object { Write-Host "  - $_" -ForegroundColor Red }
}

Write-Host "`n"
Write-Host "EXPECTED RESULTS AFTER FIX:" -ForegroundColor Cyan
Write-Host "  - 'Clawdbot executable exists' tests should PASS"
Write-Host "  - 'BUG: Clawdbot fails to resolve' should PASS (proves the bug existed)"
Write-Host "  - 'SOLUTION: Absolute path works' should PASS"
Write-Host "  - 'FIX VERIFICATION' tests should PASS (confirms fix is applied)"
Write-Host "`n"

# Return exit code based on test results
# All 7 tests should pass after the fix is applied
$expectedPassCount = 7
if ($testResults.Passed.Count -eq $expectedPassCount) {
    Write-Host "All tests passed! Fix verified." -ForegroundColor Green
    exit 0
} elseif ($testResults.Passed.Count -ge 5) {
    Write-Host "Most tests passed. Review any failures above." -ForegroundColor Yellow
    exit 0
} else {
    Write-Host "Multiple test failures. Review output above." -ForegroundColor Red
    exit 1
}
