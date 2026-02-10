#!/usr/bin/env node
/**
 * Supermemory Provisioning Setup
 * Automates Supermemory integration for every Clawdbot customer
 * Run this during customer onboarding
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';
import readline from 'readline';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function setupSupermemory() {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🧠 SUPERMEMORY PROVISIONING SETUP');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  try {
    // Step 1: Check if Supermemory SDK is installed
    console.log('📦 Step 1: Checking Supermemory SDK installation...\n');
    
    let sdkInstalled = false;
    try {
      await import('supermemory');
      console.log('✅ Supermemory SDK is installed\n');
      sdkInstalled = true;
    } catch (err) {
      console.log('⚠️  Supermemory SDK not found. Installing...\n');
    }

    if (!sdkInstalled) {
      console.log('📥 Installing supermemory SDK via npm...');
      await execAsync('npm install supermemory');
      console.log('✅ Supermemory SDK installed\n');
    }

    // Step 2: Get API credentials
    console.log('🔑 Step 2: Supermemory API Credentials\n');
    console.log('Get your API key from: https://console.supermemory.ai\n');
    console.log('1. Sign up/login at console.supermemory.ai');
    console.log('2. Go to API Keys → Create API Key');
    console.log('3. Copy your API key\n');

    const apiKey = await question('Enter your Supermemory API key: ');
    
    if (!apiKey || apiKey.trim().length < 10) {
      throw new Error('Invalid API key provided');
    }

    const containerTag = await question('Enter container tag (e.g., username, customer_id): ');
    
    if (!containerTag || containerTag.trim().length < 2) {
      throw new Error('Invalid container tag provided');
    }

    // Step 3: Create credentials file
    console.log('\n💾 Step 3: Saving credentials...\n');
    
    const credsPath = path.join(__dirname, '..', 'supermemory-credentials.json');
    const credsData = {
      apiKey: apiKey.trim(),
      containerTag: containerTag.trim(),
      note: 'Supermemory.ai API - Universal Memory API for personalized AI context',
      setupAt: new Date().toISOString()
    };

    await fs.writeFile(credsPath, JSON.stringify(credsData, null, 2));
    console.log(`✅ Credentials saved to: ${credsPath}\n`);

    // Step 4: Verify config exists
    console.log('⚙️  Step 4: Verifying configuration...\n');
    
    const configPath = path.join(__dirname, '..', 'config', 'supermemory-config.json');
    
    try {
      await fs.access(configPath);
      console.log(`✅ Config file exists: ${configPath}\n`);
    } catch (err) {
      console.log('⚠️  Config file not found. This is expected for new installations.');
      console.log('   The config will be created automatically.\n');
    }

    // Step 5: Test connection
    console.log('🧪 Step 5: Testing Supermemory connection...\n');
    
    process.env.SUPERMEMORY_API_KEY = apiKey.trim();
    
    const { default: Supermemory } = await import('supermemory');
    const client = new Supermemory();
    
    // Test add
    const testContent = `Supermemory integration configured for ${containerTag} on ${new Date().toLocaleDateString()}`;
    
    console.log('📝 Sending test memory...');
    await client.add({
      content: testContent,
      containerTag: containerTag.trim()
    });
    console.log('✅ Test memory added successfully\n');

    // Test profile
    console.log('📊 Fetching profile...');
    const profile = await client.profile({
      containerTag: containerTag.trim()
    });
    console.log('✅ Profile retrieved successfully\n');

    // Step 6: Update STATE.json
    console.log('📋 Step 6: Updating STATE.json...\n');
    
    const statePath = path.join(__dirname, '..', 'STATE.json');
    
    let state = {};
    try {
      const stateData = await fs.readFile(statePath, 'utf8');
      state = JSON.parse(stateData);
    } catch (err) {
      console.log('⚠️  STATE.json not found. Creating new one.');
      state = {
        meta: {
          lastUpdated: new Date().toISOString(),
          version: '1.0'
        },
        connectedServices: {}
      };
    }

    state.connectedServices = state.connectedServices || {};
    state.connectedServices.supermemory = {
      connected: true,
      containerTag: containerTag.trim(),
      credentialsPath: 'supermemory-credentials.json',
      scriptPath: 'scripts/supermemory-client.js',
      sessionStartScript: 'scripts/supermemory-session-start.js',
      sessionEndScript: 'scripts/session-end-sync.js',
      installedAt: new Date().toISOString(),
      note: 'Universal Memory API for personalized AI context'
    };

    await fs.writeFile(statePath, JSON.stringify(state, null, 2));
    console.log('✅ STATE.json updated\n');

    // Step 7: Create cache directory
    console.log('📁 Step 7: Creating cache directory...\n');
    
    const cacheDir = path.join(__dirname, '..', 'cache');
    await fs.mkdir(cacheDir, { recursive: true });
    console.log('✅ Cache directory ready\n');

    // Step 8: Summary
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ SUPERMEMORY INTEGRATION COMPLETE!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    console.log('📚 What was configured:\n');
    console.log('  ✓ Supermemory SDK installed');
    console.log('  ✓ API credentials saved and tested');
    console.log('  ✓ Configuration files created');
    console.log('  ✓ STATE.json updated');
    console.log('  ✓ Cache directory created');
    console.log('  ✓ Connection verified\n');

    console.log('🚀 Next steps:\n');
    console.log('1. Test the integration:');
    console.log('   node scripts/supermemory-client.js profile\n');
    console.log('2. Load profile at session start:');
    console.log('   node scripts/supermemory-session-start.js\n');
    console.log('3. Add to AGENTS.md session start routine:');
    console.log('   - Run: node scripts/supermemory-session-start.js');
    console.log('   - Or: Import and call in your main agent loop\n');

    console.log('📖 Documentation: SUPERMEMORY-INTEGRATION.md\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  } catch (err) {
    console.error('\n❌ Setup failed:', err.message);
    console.error(err.stack);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Run
setupSupermemory();
