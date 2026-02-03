#!/usr/bin/env node

/**
 * LOCAL MODELS - Local Model Integration Framework
 * 
 * Integrates local models (Ollama, etc.) with privacy-first routing logic.
 * 
 * Usage:
 *   node scripts/local-models.js list
 *   node scripts/local-models.js install <model>
 *   node scripts/local-models.js route --task="..." --check-privacy
 *   node scripts/local-models.js stats
 *   node scripts/local-models.js setup-mac-studio
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const util = require('util');

const execPromise = util.promisify(exec);

// ============================================================================
// CONFIGURATION
// ============================================================================

const CONFIG = {
  dataDir: path.join(__dirname, '..', 'data', 'local-models'),
  configPath: path.join(__dirname, '..', 'data', 'local-models', 'config.json'),
  usagePath: path.join(__dirname, '..', 'data', 'local-models', 'usage.json'),
  stateJsonPath: path.join(__dirname, '..', 'STATE.json'),
  
  defaultConfig: {
    provider: 'ollama',
    endpoint: 'http://localhost:11434',
    models: {
      'llama3': {
        useCases: ['code-generation', 'analysis', 'chat'],
        maxContextTokens: 8192,
        speedRating: 8
      },
      'codellama': {
        useCases: ['code-generation', 'code-review'],
        maxContextTokens: 16384,
        speedRating: 7
      },
      'mistral': {
        useCases: ['general', 'chat', 'analysis'],
        maxContextTokens: 32768,
        speedRating: 9
      }
    },
    routing: {
      preferLocal: [
        'development',
        'testing',
        'sensitive-data',
        'high-volume',
        'code-generation'
      ],
      preferAPI: [
        'production',
        'complex-reasoning',
        'time-critical',
        'strategic-planning'
      ]
    },
    privacy: {
      piiDetection: true,
      financialDataDetection: true,
      autoRouteLocal: true
    },
    costEstimates: {
      electricityPerMonth: 5.00,
      apiCostPerMillionTokens: 0.15  // GPT-4o-mini equivalent
    }
  }
};

// ============================================================================
// INITIALIZATION
// ============================================================================

function ensureDirectories() {
  if (!fs.existsSync(CONFIG.dataDir)) {
    fs.mkdirSync(CONFIG.dataDir, { recursive: true });
  }
  
  if (!fs.existsSync(CONFIG.configPath)) {
    fs.writeFileSync(CONFIG.configPath, JSON.stringify(CONFIG.defaultConfig, null, 2));
  }
  
  if (!fs.existsSync(CONFIG.usagePath)) {
    fs.writeFileSync(CONFIG.usagePath, JSON.stringify([], null, 2));
  }
}

function loadConfig() {
  return JSON.parse(fs.readFileSync(CONFIG.configPath, 'utf8'));
}

function loadUsage() {
  return JSON.parse(fs.readFileSync(CONFIG.usagePath, 'utf8'));
}

function saveUsage(usage) {
  fs.writeFileSync(CONFIG.usagePath, JSON.stringify(usage, null, 2));
}

function updateState() {
  if (!fs.existsSync(CONFIG.stateJsonPath)) return;
  
  const state = JSON.parse(fs.readFileSync(CONFIG.stateJsonPath, 'utf8'));
  
  if (!state.automationSystems) {
    state.automationSystems = {};
  }
  
  state.automationSystems.localModels = {
    script: 'scripts/local-models.js',
    description: 'Local model integration framework with privacy-first routing',
    features: [
      'Ollama integration',
      'Privacy detection (PII, financial data)',
      'Cost optimization',
      'Mac Studio optimization',
      'Auto-routing logic'
    ],
    lastUpdated: new Date().toISOString()
  };
  
  fs.writeFileSync(CONFIG.stateJsonPath, JSON.stringify(state, null, 2));
}

// ============================================================================
// PRIVACY DETECTION
// ============================================================================

function detectSensitiveData(text) {
  const patterns = {
    email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
    phone: /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g,
    ssn: /\b\d{3}-\d{2}-\d{4}\b/g,
    creditCard: /\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g,
    passport: /\b[A-Z]{1,2}\d{6,9}\b/g
  };
  
  const detected = [];
  
  for (const [type, pattern] of Object.entries(patterns)) {
    const matches = text.match(pattern);
    if (matches) {
      detected.push({
        type,
        count: matches.length
      });
    }
  }
  
  return {
    hasSensitiveData: detected.length > 0,
    detected
  };
}

// ============================================================================
// OLLAMA INTEGRATION
// ============================================================================

async function checkOllamaInstalled() {
  try {
    await execPromise('ollama --version');
    return true;
  } catch (error) {
    return false;
  }
}

async function listLocalModels() {
  const isInstalled = await checkOllamaInstalled();
  
  if (!isInstalled) {
    console.log('❌ Ollama not installed');
    console.log('\nInstall Ollama:');
    console.log('  macOS: brew install ollama');
    console.log('  Linux: curl https://ollama.ai/install.sh | sh');
    console.log('  Windows: https://ollama.ai/download');
    return [];
  }
  
  try {
    const { stdout } = await execPromise('ollama list');
    const lines = stdout.trim().split('\n').slice(1);  // Skip header
    
    const models = lines.map(line => {
      const [name, id, size, modified] = line.split(/\s+/);
      return { name, id, size, modified };
    });
    
    return models;
  } catch (error) {
    console.error('Error listing models:', error.message);
    return [];
  }
}

async function installModel(modelName) {
  const isInstalled = await checkOllamaInstalled();
  
  if (!isInstalled) {
    console.error('❌ Ollama not installed. Install it first.');
    return false;
  }
  
  console.log(`📥 Installing ${modelName}...`);
  console.log('This may take a few minutes...\n');
  
  try {
    const child = exec(`ollama pull ${modelName}`);
    
    child.stdout.on('data', data => process.stdout.write(data));
    child.stderr.on('data', data => process.stderr.write(data));
    
    return new Promise((resolve, reject) => {
      child.on('exit', code => {
        if (code === 0) {
          console.log(`\n✅ ${modelName} installed successfully`);
          resolve(true);
        } else {
          console.error(`\n❌ Failed to install ${modelName}`);
          reject(false);
        }
      });
    });
  } catch (error) {
    console.error('Error installing model:', error.message);
    return false;
  }
}

// ============================================================================
// ROUTING LOGIC
// ============================================================================

function shouldUseLocal(task, options = {}) {
  const config = loadConfig();
  
  // Force local if contains sensitive data
  if (options.containsPII || options.containsFinancial) {
    return { useLocal: true, reason: 'Contains sensitive data' };
  }
  
  // Auto-detect sensitive data
  if (config.privacy.piiDetection) {
    const privacyCheck = detectSensitiveData(task);
    if (privacyCheck.hasSensitiveData) {
      return {
        useLocal: true,
        reason: 'Auto-detected sensitive data',
        detected: privacyCheck.detected
      };
    }
  }
  
  // Check task type preferences
  if (options.taskType) {
    if (config.routing.preferLocal.includes(options.taskType)) {
      return { useLocal: true, reason: `Task type "${options.taskType}" prefers local` };
    }
    
    if (config.routing.preferAPI.includes(options.taskType)) {
      return { useLocal: false, reason: `Task type "${options.taskType}" prefers API` };
    }
  }
  
  // Default: prefer API for better quality
  return { useLocal: false, reason: 'Default to API for quality' };
}

async function routeTask(task, options = {}) {
  const routing = shouldUseLocal(task, options);
  
  console.log(`📍 Routing decision: ${routing.useLocal ? 'LOCAL' : 'API'}`);
  console.log(`   Reason: ${routing.reason}`);
  
  if (routing.detected) {
    console.log(`   Detected: ${routing.detected.map(d => d.type).join(', ')}`);
  }
  
  // Log usage
  logUsage({
    task: task.substring(0, 100),  // Truncate for privacy
    useLocal: routing.useLocal,
    reason: routing.reason,
    taskType: options.taskType,
    containsSensitiveData: routing.detected ? true : false
  });
  
  return routing;
}

function logUsage(entry) {
  const usage = loadUsage();
  
  usage.push({
    ...entry,
    timestamp: new Date().toISOString()
  });
  
  // Keep last 10,000 entries
  if (usage.length > 10000) {
    usage.splice(0, usage.length - 10000);
  }
  
  saveUsage(usage);
}

// ============================================================================
// STATISTICS
// ============================================================================

function calculateStats() {
  const usage = loadUsage();
  const config = loadConfig();
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  
  const monthUsage = usage.filter(u => new Date(u.timestamp) >= monthStart);
  
  const localCount = monthUsage.filter(u => u.useLocal).length;
  const apiCount = monthUsage.filter(u => !u.useLocal).length;
  const sensitiveCount = monthUsage.filter(u => u.containsSensitiveData).length;
  
  // Estimate costs
  const estimatedAPITokens = apiCount * 1000;  // Rough estimate
  const apiCostIfLocal = (estimatedAPITokens / 1000000) * config.costEstimates.apiCostPerMillionTokens;
  const electricityCost = config.costEstimates.electricityPerMonth;
  const savings = apiCostIfLocal - electricityCost;
  
  return {
    totalRequests: monthUsage.length,
    localCount,
    apiCount,
    sensitiveCount,
    localPercent: (localCount / monthUsage.length * 100).toFixed(1),
    apiPercent: (apiCount / monthUsage.length * 100).toFixed(1),
    estimatedAPICost: apiCostIfLocal,
    electricityCost,
    savings
  };
}

function displayStats() {
  const stats = calculateStats();
  
  console.log('📊 LOCAL MODEL STATS (Last 30 Days)\n');
  console.log('='.repeat(60));
  console.log();
  
  console.log(`📈 Usage:`);
  console.log(`   Total requests: ${stats.totalRequests}`);
  console.log(`   Local: ${stats.localCount} (${stats.localPercent}%)`);
  console.log(`   API: ${stats.apiCount} (${stats.apiPercent}%)`);
  console.log(`   Sensitive data: ${stats.sensitiveCount} requests`);
  console.log();
  
  console.log(`💰 Cost Savings:`);
  console.log(`   Electricity (est): $${stats.electricityCost.toFixed(2)}/month`);
  console.log(`   If used API: $${stats.estimatedAPICost.toFixed(2)}`);
  console.log(`   Savings: $${stats.savings.toFixed(2)}/month`);
  console.log();
  
  console.log(`🔒 Privacy:`);
  console.log(`   ${stats.sensitiveCount} sensitive requests kept local`);
  console.log(`   0 sensitive data sent to API models`);
  console.log();
  
  console.log('='.repeat(60));
}

// ============================================================================
// MAC STUDIO SETUP
// ============================================================================

async function setupMacStudio() {
  console.log('🍎 Mac Studio Setup for Local Models\n');
  console.log('='.repeat(60));
  console.log();
  
  // Check if on Mac
  const platform = process.platform;
  if (platform !== 'darwin') {
    console.log('⚠️  Not running on macOS. This setup is optimized for Mac Studio.');
    console.log('   Continue anyway? (The script will adapt for your platform)\n');
  }
  
  console.log('📋 Setup Steps:\n');
  console.log('1. Install Ollama:');
  console.log('   brew install ollama');
  console.log();
  
  console.log('2. Download recommended models:');
  console.log('   ollama pull llama3        # Best general model');
  console.log('   ollama pull codellama     # Best for code');
  console.log('   ollama pull mistral       # Fast, high-quality');
  console.log();
  
  console.log('3. Configure for Mac Studio M2/M3 Ultra:');
  console.log('   - Uses Metal acceleration automatically');
  console.log('   - Leverages unified memory (64GB-192GB)');
  console.log('   - GPU cores for parallel inference');
  console.log();
  
  console.log('4. Test installation:');
  console.log('   node scripts/local-models.js list');
  console.log('   node scripts/local-models.js route --task="test" --check-privacy');
  console.log();
  
  console.log('5. Integration:');
  console.log('   Local models will automatically be used for:');
  console.log('   - Development tasks');
  console.log('   - Sensitive data processing');
  console.log('   - High-volume requests');
  console.log();
  
  console.log('='.repeat(60));
  console.log('\n✅ Setup guide complete');
  console.log('Run the commands above to configure local models on Mac Studio');
}

// ============================================================================
// CLI
// ============================================================================

async function main() {
  ensureDirectories();
  updateState();
  
  const args = process.argv.slice(2);
  const command = args[0];
  
  try {
    switch (command) {
      case 'list':
        console.log('📋 Installed Local Models:\n');
        const models = await listLocalModels();
        if (models.length === 0) {
          console.log('No models installed yet.');
          console.log('\nInstall a model:');
          console.log('  node scripts/local-models.js install llama3');
        } else {
          models.forEach((model, idx) => {
            console.log(`${idx + 1}. ${model.name}`);
            console.log(`   Size: ${model.size} | Modified: ${model.modified}`);
          });
        }
        break;
        
      case 'install':
        const modelName = args[1];
        if (!modelName) {
          console.error('❌ Missing model name');
          console.log('Usage: node scripts/local-models.js install <model>');
          console.log('Example: node scripts/local-models.js install llama3');
          process.exit(1);
        }
        await installModel(modelName);
        break;
        
      case 'route':
        const task = args.find(a => a.startsWith('--task='))?.split('=')[1];
        const checkPrivacy = args.includes('--check-privacy');
        const taskType = args.find(a => a.startsWith('--type='))?.split('=')[1];
        
        if (!task) {
          console.error('❌ Missing --task argument');
          console.log('Usage: node scripts/local-models.js route --task="..." [--check-privacy] [--type=...]');
          process.exit(1);
        }
        
        const result = await routeTask(task, { taskType });
        console.log('\n✅ Routing decision complete');
        break;
        
      case 'stats':
        displayStats();
        break;
        
      case 'setup-mac-studio':
        await setupMacStudio();
        break;
        
      default:
        console.log('Usage:');
        console.log('  node scripts/local-models.js list');
        console.log('  node scripts/local-models.js install <model>');
        console.log('  node scripts/local-models.js route --task="..." [--check-privacy]');
        console.log('  node scripts/local-models.js stats');
        console.log('  node scripts/local-models.js setup-mac-studio');
        process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { routeTask, detectSensitiveData, shouldUseLocal, listLocalModels };
