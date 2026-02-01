#!/usr/bin/env node
/**
 * Setup Verification Script
 * Run this to verify your Style Swap Commerce setup
 */

const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const checks = {
  passed: [],
  failed: [],
  warnings: []
};

function log(type, message) {
  const icons = { success: '✓', error: '✗', warning: '⚠' };
  console.log(`${icons[type]} ${message}`);
}

async function checkEnvironment() {
  console.log('\n🔍 Checking Environment Variables...\n');
  
  const required = [
    'DATABASE_URL',
    'DEFAULT_UTM_SOURCE',
    'DEFAULT_UTM_MEDIUM'
  ];
  
  const optional = [
    'STRIPE_SECRET_KEY',
    'STRIPE_WEBHOOK_SECRET',
    'AFFILIATE_WEBHOOK_SECRET',
    'FRONTEND_URL',
    'PORT'
  ];
  
  for (const key of required) {
    if (process.env[key]) {
      checks.passed.push(`Environment variable ${key} is set`);
      log('success', `${key} is set`);
    } else {
      checks.failed.push(`Environment variable ${key} is missing`);
      log('error', `${key} is MISSING (required)`);
    }
  }
  
  for (const key of optional) {
    if (process.env[key]) {
      checks.passed.push(`Environment variable ${key} is set`);
      log('success', `${key} is set`);
    } else {
      checks.warnings.push(`Environment variable ${key} is not set`);
      log('warning', `${key} is not set (optional)`);
    }
  }
}

async function checkDatabase() {
  console.log('\n🗄️  Checking Database Connection...\n');
  
  if (!process.env.DATABASE_URL) {
    log('error', 'DATABASE_URL not set, skipping database checks');
    return;
  }
  
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  
  try {
    // Test connection
    await pool.query('SELECT 1');
    checks.passed.push('Database connection successful');
    log('success', 'Database connection successful');
    
    // Check tables
    const tables = [
      'brands', 'products', 'affiliate_links', 'clicks', 
      'conversions', 'carts', 'cart_items', 'webhook_events', 'daily_stats'
    ];
    
    for (const table of tables) {
      try {
        await pool.query(`SELECT 1 FROM ${table} LIMIT 1`);
        checks.passed.push(`Table ${table} exists`);
        log('success', `Table ${table} exists`);
      } catch (error) {
        checks.failed.push(`Table ${table} missing`);
        log('error', `Table ${table} MISSING`);
      }
    }
    
    // Check for sample data
    const brandCount = await pool.query('SELECT COUNT(*) FROM brands');
    if (parseInt(brandCount.rows[0].count) > 0) {
      checks.passed.push(`Brands table has ${brandCount.rows[0].count} records`);
      log('success', `Found ${brandCount.rows[0].count} brands`);
    } else {
      checks.warnings.push('Brands table is empty');
      log('warning', 'Brands table is empty (run npm run migrate)');
    }
    
  } catch (error) {
    checks.failed.push(`Database error: ${error.message}`);
    log('error', `Database connection failed: ${error.message}`);
  } finally {
    await pool.end();
  }
}

async function checkFiles() {
  console.log('\n📁 Checking Required Files...\n');
  
  const requiredFiles = [
    'package.json',
    'src/server.js',
    'src/routes/api.js',
    'src/services/affiliateLinkService.js',
    'src/services/commissionService.js',
    'src/services/cartService.js',
    'src/services/analyticsService.js',
    'config/database.js',
    'database/schema.sql',
    'database/migrate.js',
    'webhooks/handler.js'
  ];
  
  for (const file of requiredFiles) {
    const filePath = path.join(__dirname, '..', file);
    if (fs.existsSync(filePath)) {
      checks.passed.push(`File ${file} exists`);
      log('success', file);
    } else {
      checks.failed.push(`File ${file} missing`);
      log('error', `${file} MISSING`);
    }
  }
}

async function checkDependencies() {
  console.log('\n📦 Checking Dependencies...\n');
  
  try {
    const packageJson = require('../package.json');
    const required = [
      'express', 'pg', 'dotenv', 'stripe', 'cors', 
      'helmet', 'morgan', 'express-rate-limit'
    ];
    
    for (const dep of required) {
      if (packageJson.dependencies[dep]) {
        checks.passed.push(`Dependency ${dep} listed`);
        log('success', `${dep} v${packageJson.dependencies[dep]}`);
      } else {
        checks.failed.push(`Dependency ${dep} missing`);
        log('error', `${dep} MISSING in package.json`);
      }
    }
    
    // Check if node_modules exists
    if (fs.existsSync(path.join(__dirname, '..', 'node_modules'))) {
      checks.passed.push('node_modules directory exists');
      log('success', 'Dependencies installed (node_modules exists)');
    } else {
      checks.warnings.push('node_modules directory missing');
      log('warning', 'Dependencies not installed (run npm install)');
    }
    
  } catch (error) {
    checks.failed.push('Failed to read package.json');
    log('error', 'Failed to read package.json');
  }
}

async function printSummary() {
  console.log('\n' + '='.repeat(60));
  console.log('📊 Setup Verification Summary');
  console.log('='.repeat(60));
  
  console.log(`\n✓ Passed: ${checks.passed.length}`);
  console.log(`✗ Failed: ${checks.failed.length}`);
  console.log(`⚠ Warnings: ${checks.warnings.length}`);
  
  if (checks.failed.length > 0) {
    console.log('\n❌ FAILED CHECKS:');
    checks.failed.forEach(msg => console.log(`  - ${msg}`));
  }
  
  if (checks.warnings.length > 0) {
    console.log('\n⚠️  WARNINGS:');
    checks.warnings.forEach(msg => console.log(`  - ${msg}`));
  }
  
  console.log('\n' + '='.repeat(60));
  
  if (checks.failed.length === 0) {
    console.log('✅ All checks passed! Your setup looks good.');
    console.log('\nNext steps:');
    console.log('  1. Run: npm install');
    console.log('  2. Run: npm run migrate');
    console.log('  3. Run: npm start');
    console.log('  4. Open: http://localhost:3000/health');
  } else {
    console.log('❌ Setup incomplete. Please fix the failed checks above.');
    process.exit(1);
  }
  
  console.log('='.repeat(60) + '\n');
}

async function main() {
  console.log('🚀 Style Swap Commerce - Setup Verification\n');
  
  await checkEnvironment();
  await checkFiles();
  await checkDependencies();
  await checkDatabase();
  await printSummary();
}

main().catch(error => {
  console.error('Verification script error:', error);
  process.exit(1);
});
