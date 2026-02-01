#!/usr/bin/env node

/**
 * Style Swap - Health Check Script
 * 
 * Checks critical endpoints to verify deployment health
 * Usage: node scripts/health-check.js [url]
 */

const https = require('https');
const http = require('http');

// Configuration
const SITE_URL = process.argv[2] || process.env.NEXT_PUBLIC_SITE_URL || 'https://styleswap.com';
const TIMEOUT = 10000; // 10 seconds

// Critical endpoints to check
const CRITICAL_ENDPOINTS = [
  { path: '/', name: 'Homepage' },
  { path: '/api/health', name: 'Health API' },
  { path: '/shop', name: 'Shop Page' },
  { path: '/login', name: 'Login Page' },
];

// Colors for output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

/**
 * Check a single endpoint
 */
async function checkEndpoint(path, name) {
  return new Promise((resolve) => {
    const url = `${SITE_URL}${path}`;
    const startTime = Date.now();
    const protocol = url.startsWith('https') ? https : http;
    
    const req = protocol.get(url, {
      timeout: TIMEOUT,
    }, (res) => {
      const duration = Date.now() - startTime;
      const status = res.statusCode;
      const healthy = status >= 200 && status < 400;
      
      resolve({
        path,
        name,
        status,
        duration,
        healthy,
        url,
      });
    });
    
    req.on('error', (err) => {
      resolve({
        path,
        name,
        status: 0,
        duration: Date.now() - startTime,
        healthy: false,
        error: err.message,
        url,
      });
    });
    
    req.on('timeout', () => {
      req.destroy();
      resolve({
        path,
        name,
        status: 0,
        duration: TIMEOUT,
        healthy: false,
        error: 'Request timeout',
        url,
      });
    });
  });
}

/**
 * Format duration in ms
 */
function formatDuration(ms) {
  if (ms < 1000) {
    return `${ms}ms`;
  }
  return `${(ms / 1000).toFixed(2)}s`;
}

/**
 * Format status with color
 */
function formatStatus(status, healthy) {
  const color = healthy ? colors.green : colors.red;
  return `${color}${status}${colors.reset}`;
}

/**
 * Main health check function
 */
async function runHealthCheck() {
  console.log('');
  console.log('='.repeat(60));
  console.log(`${colors.blue}  Style Swap - Health Check${colors.reset}`);
  console.log('='.repeat(60));
  console.log('');
  console.log(`${colors.blue}Target:${colors.reset} ${SITE_URL}`);
  console.log('');
  
  const startTime = Date.now();
  
  // Run all checks in parallel
  const results = await Promise.all(
    CRITICAL_ENDPOINTS.map(({ path, name }) => checkEndpoint(path, name))
  );
  
  const totalDuration = Date.now() - startTime;
  
  // Display results
  console.log('Results:');
  console.log('');
  
  results.forEach((result) => {
    const icon = result.healthy ? '✅' : '❌';
    const nameCol = result.name.padEnd(20);
    const pathCol = result.path.padEnd(15);
    const statusCol = formatStatus(result.status, result.healthy).padEnd(10);
    const durationCol = formatDuration(result.duration);
    
    console.log(`${icon} ${nameCol} ${pathCol} ${statusCol} ${durationCol}`);
    
    if (result.error) {
      console.log(`   ${colors.red}Error: ${result.error}${colors.reset}`);
    }
  });
  
  console.log('');
  console.log('='.repeat(60));
  
  // Summary
  const totalChecks = results.length;
  const passedChecks = results.filter(r => r.healthy).length;
  const failedChecks = totalChecks - passedChecks;
  const allHealthy = passedChecks === totalChecks;
  
  console.log('');
  console.log('Summary:');
  console.log('');
  console.log(`  Total checks:  ${totalChecks}`);
  console.log(`  ${colors.green}Passed:${colors.reset}        ${passedChecks}`);
  console.log(`  ${colors.red}Failed:${colors.reset}        ${failedChecks}`);
  console.log(`  Total time:    ${formatDuration(totalDuration)}`);
  console.log('');
  
  if (allHealthy) {
    console.log(`${colors.green}✅ All health checks passed${colors.reset}`);
  } else {
    console.log(`${colors.red}❌ Some health checks failed${colors.reset}`);
  }
  
  console.log('');
  console.log('='.repeat(60));
  console.log('');
  
  // Exit with appropriate code
  process.exit(allHealthy ? 0 : 1);
}

// Run the health check
runHealthCheck().catch((error) => {
  console.error(`${colors.red}Fatal error:${colors.reset}`, error.message);
  process.exit(1);
});
