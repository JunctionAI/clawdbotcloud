#!/usr/bin/env node
/**
 * Test Email Intelligence System
 * Validates setup, connections, and functionality
 */

import fs from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

console.log('═'.repeat(80));
console.log('🧪  EMAIL INTELLIGENCE SYSTEM TEST');
console.log('═'.repeat(80));
console.log('');

// Test 1: Check file existence
console.log('TEST 1: Checking files...');
const requiredFiles = [
  'scripts/gmail-setup.js',
  'scripts/email-intelligence.js',
  'scripts/morning-briefing.js'
];

let filesOK = true;
for (const file of requiredFiles) {
  if (fs.existsSync(file)) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} - MISSING`);
    filesOK = false;
  }
}
console.log('');

// Test 2: Check dependencies
console.log('TEST 2: Checking Node.js dependencies...');
let depsOK = true;

try {
  await import('googleapis');
  console.log('  ✅ googleapis');
} catch (err) {
  console.log('  ❌ googleapis - NOT INSTALLED');
  console.log('     Run: npm install googleapis');
  depsOK = false;
}

try {
  await import('@anthropic-ai/sdk');
  console.log('  ✅ @anthropic-ai/sdk');
} catch (err) {
  console.log('  ❌ @anthropic-ai/sdk - NOT INSTALLED');
  console.log('     Run: npm install @anthropic-ai/sdk');
  depsOK = false;
}
console.log('');

// Test 3: Check credentials
console.log('TEST 3: Checking Gmail credentials...');
let credsOK = true;

if (fs.existsSync('google-credentials.json')) {
  console.log('  ✅ google-credentials.json');
} else {
  console.log('  ⚠️  google-credentials.json - NOT FOUND');
  console.log('     Run: node scripts/gmail-setup.js');
  credsOK = false;
}

if (fs.existsSync('gmail-token.json')) {
  console.log('  ✅ gmail-token.json');
} else {
  console.log('  ⚠️  gmail-token.json - NOT FOUND');
  console.log('     Run: node scripts/gmail-setup.js');
  credsOK = false;
}
console.log('');

// Test 4: Check STATE.json integration
console.log('TEST 4: Checking STATE.json integration...');
try {
  const state = JSON.parse(fs.readFileSync('STATE.json', 'utf8'));
  
  if (state.automationSystems?.emailIntelligence) {
    console.log('  ✅ Email intelligence in STATE.json');
    console.log(`     Script: ${state.automationSystems.emailIntelligence.script}`);
    console.log(`     Features: ${state.automationSystems.emailIntelligence.features.length}`);
  } else {
    console.log('  ❌ Email intelligence NOT in STATE.json');
  }
  
  if (state.connectedServices?.gog?.setupScript) {
    console.log('  ✅ Gmail setup script configured');
  } else {
    console.log('  ❌ Gmail setup script NOT configured');
  }
} catch (err) {
  console.log('  ❌ Error reading STATE.json:', err.message);
}
console.log('');

// Test 5: Check environment variables
console.log('TEST 5: Checking environment variables...');
if (process.env.ANTHROPIC_API_KEY) {
  console.log('  ✅ ANTHROPIC_API_KEY set');
} else {
  console.log('  ⚠️  ANTHROPIC_API_KEY not set');
  console.log('     Email summarization will use fallback mode');
}
console.log('');

// Test 6: Test Gmail connection (if credentials exist)
if (credsOK) {
  console.log('TEST 6: Testing Gmail connection...');
  try {
    const { stdout, stderr } = await execAsync('node scripts/email-intelligence.js test');
    console.log(stdout);
  } catch (err) {
    console.log('  ❌ Connection test failed');
    console.log('     Error:', err.message);
  }
} else {
  console.log('TEST 6: Skipping Gmail connection test (credentials not found)');
  console.log('  ⚠️  Run: node scripts/gmail-setup.js');
}
console.log('');

// Summary
console.log('═'.repeat(80));
console.log('📊  TEST SUMMARY');
console.log('═'.repeat(80));

if (filesOK && depsOK) {
  console.log('✅ All core files and dependencies installed');
} else {
  console.log('❌ Some files or dependencies missing - see above');
}

if (credsOK) {
  console.log('✅ Gmail credentials configured');
  console.log('');
  console.log('🎉 Email Intelligence System is READY!');
  console.log('');
  console.log('Next steps:');
  console.log('  1. Test monitoring: node scripts/email-intelligence.js monitor');
  console.log('  2. Add to heartbeat for automated checks');
  console.log('  3. Review morning briefing: node scripts/morning-briefing.js');
} else {
  console.log('⚠️  Gmail not configured yet');
  console.log('');
  console.log('Setup steps:');
  console.log('  1. Get OAuth credentials from Google Cloud Console');
  console.log('  2. Save as google-credentials.json');
  console.log('  3. Run: node scripts/gmail-setup.js');
  console.log('  4. Run this test again');
}

console.log('');
console.log('═'.repeat(80));
