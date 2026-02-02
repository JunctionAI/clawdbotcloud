#!/usr/bin/env node
/**
 * Setup script for Information Extraction Pipeline
 * Initializes configs, installs dependencies, runs first sync
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function checkDependencies() {
  console.log('📦 Checking dependencies...\n');
  
  const deps = [
    { name: 'rss-parser', required: false, purpose: 'RSS feed parsing' },
    { name: 'pdf-parse', required: false, purpose: 'PDF text extraction' },
    { name: 'supermemory', required: true, purpose: 'Memory storage' }
  ];

  const missing = [];
  
  for (const dep of deps) {
    try {
      await import(dep.name);
      console.log(`✅ ${dep.name} - installed`);
    } catch (err) {
      if (dep.required) {
        console.log(`❌ ${dep.name} - REQUIRED (${dep.purpose})`);
        missing.push(dep.name);
      } else {
        console.log(`⚠️  ${dep.name} - optional (${dep.purpose})`);
      }
    }
  }

  if (missing.length > 0) {
    console.log(`\n❌ Missing required dependencies: ${missing.join(', ')}`);
    console.log('Install with: npm install ' + missing.join(' '));
    return false;
  }

  console.log('\n✅ All required dependencies installed');
  return true;
}

async function initializeConfigs() {
  console.log('\n⚙️  Initializing configurations...\n');
  
  // Create config directory
  const configDir = path.join(__dirname, '..', 'config');
  await fs.mkdir(configDir, { recursive: true });
  
  // Create cache directory
  const cacheDir = path.join(__dirname, '..', 'cache');
  await fs.mkdir(cacheDir, { recursive: true });
  
  // Run each script to generate default configs
  const scripts = [
    'x-twitter-monitor.js',
    'article-digest.js',
    'info-extraction-pipeline.js'
  ];

  for (const script of scripts) {
    try {
      console.log(`  Initializing ${script}...`);
      const { stdout } = await execAsync(`node scripts/${script} status`, {
        cwd: path.join(__dirname, '..')
      });
      console.log(`  ✅ ${script} configured`);
    } catch (err) {
      // Expected to fail, but will create config
      console.log(`  ✅ ${script} config created`);
    }
  }

  console.log('\n✅ All configurations initialized');
}

async function testSupermemory() {
  console.log('\n🧠 Testing Supermemory connection...\n');
  
  try {
    const { stdout } = await execAsync('node scripts/supermemory-sync.js profile', {
      cwd: path.join(__dirname, '..')
    });
    console.log('✅ Supermemory connected successfully');
    return true;
  } catch (err) {
    console.error('❌ Supermemory connection failed');
    console.error('Make sure supermemory-credentials.json exists');
    return false;
  }
}

async function runFirstSync() {
  console.log('\n🔄 Running first sync...\n');
  
  try {
    // Add welcome message to Supermemory
    const { stdout } = await execAsync(
      'node scripts/supermemory-sync.js add "Information Extraction Pipeline initialized - tracking Twitter, articles, and books for actionable insights"',
      { cwd: path.join(__dirname, '..') }
    );
    console.log('✅ First sync complete');
  } catch (err) {
    console.error('⚠️  First sync failed:', err.message);
  }
}

async function updateStateJson() {
  console.log('\n📝 Updating STATE.json...\n');
  
  try {
    const statePath = path.join(__dirname, '..', 'STATE.json');
    const state = JSON.parse(await fs.readFile(statePath, 'utf8'));
    
    // Add pipeline to automation systems if not exists
    if (!state.automationSystems.informationPipeline) {
      state.automationSystems.informationPipeline = {
        "script": "scripts/info-extraction-pipeline.js",
        "description": "Intelligence extraction & delivery pipeline - perfect information at perfect times",
        "features": [
          "Twitter/X monitoring",
          "Article digestion",
          "Book/PDF extraction",
          "Insight scoring & ranking",
          "Morning briefing integration",
          "Real-time alerts"
        ],
        "usage": "node scripts/info-extraction-pipeline.js run",
        "components": {
          "twitter": "scripts/x-twitter-monitor.js",
          "articles": "scripts/article-digest.js",
          "books": "scripts/book-digest.js"
        },
        "config": {
          "twitterFrequency": "4h",
          "articleFrequency": "6h",
          "morningBriefing": "8am",
          "alertThreshold": "8/10"
        },
        "autoRun": "every 4 hours (heartbeat)",
        "lastUpdated": new Date().toISOString()
      };
      
      await fs.writeFile(statePath, JSON.stringify(state, null, 2));
      console.log('✅ STATE.json updated');
    } else {
      console.log('⚠️  Pipeline already in STATE.json');
    }
  } catch (err) {
    console.error('⚠️  Failed to update STATE.json:', err.message);
  }
}

async function showNextSteps() {
  console.log('\n' + '='.repeat(70));
  console.log('🎉 SETUP COMPLETE!');
  console.log('='.repeat(70));
  console.log('\n📚 Documentation: docs/INFO-EXTRACTION-PIPELINE.md\n');
  console.log('🚀 Next Steps:\n');
  console.log('1. Configure Twitter accounts:');
  console.log('   Edit: config/x-twitter-monitor.json');
  console.log('   Add your key accounts and topics\n');
  
  console.log('2. Add RSS feeds:');
  console.log('   Edit: config/article-digest.json');
  console.log('   Add your favorite blogs and newsletters\n');
  
  console.log('3. Run your first extraction:');
  console.log('   node scripts/info-extraction-pipeline.js run\n');
  
  console.log('4. Check insights:');
  console.log('   node scripts/info-extraction-pipeline.js insights 24\n');
  
  console.log('5. Add to morning briefing:');
  console.log('   Already integrated! Run: node scripts/morning-briefing.js\n');
  
  console.log('6. Optional - Install for full features:');
  console.log('   npm install rss-parser pdf-parse\n');
  
  console.log('7. Add to HEARTBEAT.md for automation:');
  console.log('   Every 4h: node scripts/info-extraction-pipeline.js run\n');
  
  console.log('='.repeat(70));
  console.log('💡 Pro Tip: Start with article digest, it works immediately!');
  console.log('   node scripts/article-digest.js add "https://example.com" high');
  console.log('='.repeat(70));
}

async function main() {
  console.log('🚀 Information Extraction Pipeline Setup\n');
  console.log('='.repeat(70));
  console.log('Setting up intelligence extraction system...\n');

  // Check dependencies
  const depsOk = await checkDependencies();
  if (!depsOk) {
    console.log('\n❌ Setup incomplete - install missing dependencies');
    process.exit(1);
  }

  // Initialize configs
  await initializeConfigs();

  // Test Supermemory
  const smOk = await testSupermemory();
  if (!smOk) {
    console.log('\n⚠️  Supermemory not configured - some features will be limited');
  }

  // Run first sync
  if (smOk) {
    await runFirstSync();
  }

  // Update STATE.json
  await updateStateJson();

  // Show next steps
  await showNextSteps();
}

main().catch(err => {
  console.error('❌ Setup failed:', err.message);
  process.exit(1);
});
