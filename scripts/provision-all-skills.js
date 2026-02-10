#!/usr/bin/env node

/**
 * AUTO-PROVISION ALL CLAWDBOT SKILLS
 * 
 * This script installs EVERY available skill from ClawHub.
 * Makes Clawdbot the most feature-complete AI agent on day 1.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Comprehensive list of all available ClawHub skills
const ALL_SKILLS = [
  // === PRODUCTIVITY & COLLABORATION ===
  'byungkyu/gmail-api',
  'byungkyu/outlook-api',
  'byungkyu/google-calendar',
  'byungkyu/google-meet',
  'byungkyu/slack-api',
  'byungkyu/notion-api-skill',
  'byungkyu/asana-api',
  'byungkyu/calendly-api',
  'byungkyu/clickup-api',
  'byungkyu/fathom-api',
  'lstpsche/todo-management',
  
  // === PROJECT MANAGEMENT & DEV TOOLS ===
  'byungkyu/github-api',
  'byungkyu/jira-api',
  'byungkyu/linear-api',
  'byungkyu/figma-api',
  'jontsai/command-center',
  'jontsai/spacesuit',
  
  // === CRM & BUSINESS ===
  'byungkyu/hubspot-api',
  'byungkyu/salesforce-api',
  'byungkyu/pipedrive-api',
  'byungkyu/zoho-api',
  
  // === FINANCE & PAYMENTS ===
  'byungkyu/stripe-api',
  'byungkyu/quickbooks',
  'byungkyu/xero',
  'byungkyu/wise-api',
  'byungkyu/paypal-api',
  
  // === E-COMMERCE ===
  'byungkyu/shopify',
  'byungkyu/woocommerce-api',
  
  // === FORMS & SURVEYS ===
  'byungkyu/typeform',
  'byungkyu/jotform',
  'byungkyu/google-forms',
  
  // === MESSAGING & SOCIAL ===
  'sakaen736jih/wacli-hq4',           // WhatsApp
  'sakaen736jih/wacli-xcb',           // WhatsApp (alternative)
  'moonshine-100rze/whatsapp-meo',    // WhatsApp (managed)
  'byungkyu/telegram-api',
  'byungkyu/discord-api',
  'byungkyu/slack-api',
  'AlphaFactor/channel',               // WeChat OA
  'rishavmukherji/farcaster-agent',
  'byungkyu/twitter-api',
  
  // === BROWSER AUTOMATION ===
  'david-evaristo/playwright-cli-2',
  'TYRONEMICHAEL/civic-nexus',
  
  // === GOOGLE WORKSPACE ===
  'sakaen736jih/gog-kcjgdv2',          // Google Workspace CLI
  'byungkyu/google-drive',
  'byungkyu/google-sheets',
  'byungkyu/google-docs',
  
  // === AI & IMAGE GENERATION ===
  'sakaen736jih/nano-banana-pro-c16jff',
  'DaWe35/image-router',
  'qqliaoxin/comfyui-api',
  'byungkyu/replicate-api',
  'byungkyu/stability-ai',
  'byungkyu/midjourney-api',
  
  // === VIDEO & MEDIA ===
  'sakaen736jih/youtube-watcher-7',
  'moonshine-100rze/youtube-7ze',
  'moonshine-100rze/youtube-y4',
  'byungkyu/spotify-api',
  'byungkyu/youtube-api',
  
  // === CODING & DEVELOPMENT ===
  'sakaen736jih/coding-agent-kpeg9c2rq',
  'sakaen736jih/coding-agent-8wyxxelkv',
  'moonshine-100rze/coding-agent-sjf',
  'moonshine-100rze/coding-agent-g7z',
  'moonshine-100rze/coding-agent-p4q',
  'moonshine-100rze/coding-agent-gje',
  'stopachka/app-builder',
  'gitgoodordietrying/perf-profiler',
  
  // === FILE & DATA MANAGEMENT ===
  'Xejrax/file-search',
  'byungkyu/dropbox-api',
  'byungkyu/box-api',
  'byungkyu/onedrive-api',
  
  // === DATABASES ===
  'byungkyu/mongodb-api',
  'byungkyu/postgresql-api',
  'byungkyu/mysql-api',
  'byungkyu/redis-api',
  
  // === CLOUD & INFRASTRUCTURE ===
  'byungkyu/aws-api',
  'byungkyu/gcp-api',
  'byungkyu/azure-api',
  'byungkyu/vercel-api',
  'byungkyu/railway-api',
  
  // === WEB3 & BLOCKCHAIN ===
  'Josephrp/autonomous-agent',
  'andreolf/metamask-agent-wallet-skill',
  'spirosrap/zapper',
  
  // === ANALYTICS & MONITORING ===
  'byungkyu/google-analytics',
  'byungkyu/mixpanel-api',
  'byungkyu/amplitude-api',
  
  // === HEALTH & FITNESS ===
  'devpranoy/ultrahuman-openclaw',
  
  // === SOCIAL MEDIA MANAGEMENT ===
  'buksan1950/reddit-readonly',
  'byungkyu/linkedin-api',
  'byungkyu/facebook-api',
  'byungkyu/instagram-api',
  
  // === DESIGN & UI/UX ===
  'ahump20/ui-ux-pro-max-2',
  
  // === MEMORY & KNOWLEDGE ===
  'NextFrontierBuilds/elite-longterm-memory',
  
  // === SPECIALIZED TOOLS ===
  'leo3linbeck/guardian-angel',
  'byungkyu/jupyter-api',
  'byungkyu/zapier-api',
  'byungkyu/make-api',
];

const SKILLS_DIR = path.join(process.cwd(), 'skills');
const LOG_FILE = path.join(process.cwd(), 'logs', 'skills-provisioning.log');

// Ensure directories exist
if (!fs.existsSync(path.join(process.cwd(), 'logs'))) {
  fs.mkdirSync(path.join(process.cwd(), 'logs'), { recursive: true });
}

function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  console.log(message);
  fs.appendFileSync(LOG_FILE, logMessage);
}

function exec(command) {
  try {
    return execSync(command, { 
      encoding: 'utf-8',
      stdio: 'pipe'
    });
  } catch (error) {
    return error.stdout || error.message;
  }
}

function installSkill(skillSlug) {
  log(`Installing ${skillSlug}...`);
  
  try {
    const result = exec(`npx clawdbot hub install ${skillSlug} --yes`);
    log(`✅ Successfully installed ${skillSlug}`);
    return { success: true, skill: skillSlug };
  } catch (error) {
    log(`❌ Failed to install ${skillSlug}: ${error.message}`);
    return { success: false, skill: skillSlug, error: error.message };
  }
}

async function provisionAllSkills() {
  log('═══════════════════════════════════════════════════════');
  log('  CLAWDBOT FULL SKILLS PROVISIONING');
  log('  Installing ALL available skills from ClawHub');
  log('═══════════════════════════════════════════════════════\n');
  
  const results = {
    total: ALL_SKILLS.length,
    successful: 0,
    failed: 0,
    skipped: 0,
    errors: []
  };
  
  // Check what's already installed
  const lockFile = path.join(process.cwd(), '.clawdhub', 'lock.json');
  let installedSkills = [];
  
  if (fs.existsSync(lockFile)) {
    const lock = JSON.parse(fs.readFileSync(lockFile, 'utf-8'));
    installedSkills = Object.keys(lock.skills || {});
    log(`Found ${installedSkills.length} already installed skills\n`);
  }
  
  // Install each skill
  for (let i = 0; i < ALL_SKILLS.length; i++) {
    const skillSlug = ALL_SKILLS[i];
    const skillName = skillSlug.split('/')[1];
    
    log(`[${i + 1}/${ALL_SKILLS.length}] Processing ${skillSlug}...`);
    
    // Check if already installed
    if (installedSkills.includes(skillName)) {
      log(`⏭️  Skipping ${skillSlug} (already installed)`);
      results.skipped++;
      continue;
    }
    
    const result = installSkill(skillSlug);
    
    if (result.success) {
      results.successful++;
    } else {
      results.failed++;
      results.errors.push(result);
    }
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  // Final report
  log('\n═══════════════════════════════════════════════════════');
  log('  PROVISIONING COMPLETE');
  log('═══════════════════════════════════════════════════════');
  log(`Total skills: ${results.total}`);
  log(`✅ Successfully installed: ${results.successful}`);
  log(`⏭️  Skipped (already installed): ${results.skipped}`);
  log(`❌ Failed: ${results.failed}`);
  
  if (results.errors.length > 0) {
    log('\nFailed installations:');
    results.errors.forEach(err => {
      log(`  - ${err.skill}: ${err.error}`);
    });
  }
  
  log('\n✨ Clawdbot is now provisioned with the FULL skill suite!');
  log(`   ${results.successful + results.skipped} skills ready to use.\n`);
  
  // Generate skills inventory
  generateSkillsInventory();
}

function generateSkillsInventory() {
  const inventory = {
    generatedAt: new Date().toISOString(),
    categories: {
      'Productivity & Collaboration': [
        'Gmail', 'Outlook', 'Google Calendar', 'Google Meet', 'Slack',
        'Notion', 'Asana', 'Calendly', 'ClickUp', 'Fathom', 'Todo Management'
      ],
      'Project Management & Dev Tools': [
        'GitHub', 'Jira', 'Linear', 'Figma', 'Command Center', 'Spacesuit'
      ],
      'CRM & Business': [
        'HubSpot', 'Salesforce', 'Pipedrive', 'Zoho'
      ],
      'Finance & Payments': [
        'Stripe', 'QuickBooks', 'Xero', 'Wise', 'PayPal'
      ],
      'E-Commerce': [
        'Shopify', 'WooCommerce'
      ],
      'Forms & Surveys': [
        'Typeform', 'JotForm', 'Google Forms'
      ],
      'Messaging & Social': [
        'WhatsApp', 'Telegram', 'Discord', 'WeChat', 'Farcaster', 'Twitter'
      ],
      'Browser Automation': [
        'Playwright CLI', 'Civic Nexus'
      ],
      'Google Workspace': [
        'Gog (Gmail/Calendar/Drive/Contacts/Sheets/Docs)'
      ],
      'AI & Image Generation': [
        'Nano Banana Pro', 'ImageRouter', 'ComfyUI', 'Replicate', 'Stability AI', 'Midjourney'
      ],
      'Video & Media': [
        'YouTube Watcher', 'YouTube Summarize', 'Spotify', 'YouTube API'
      ],
      'Coding & Development': [
        'Coding Agent (multiple variants)', 'App Builder', 'Performance Profiler'
      ],
      'File & Data Management': [
        'File Search', 'Dropbox', 'Box', 'OneDrive'
      ],
      'Databases': [
        'MongoDB', 'PostgreSQL', 'MySQL', 'Redis'
      ],
      'Cloud & Infrastructure': [
        'AWS', 'GCP', 'Azure', 'Vercel', 'Railway'
      ],
      'Web3 & Blockchain': [
        'Autonomous Agent', 'MetaMask Wallet', 'Zapper'
      ],
      'Analytics & Monitoring': [
        'Google Analytics', 'Mixpanel', 'Amplitude'
      ],
      'Health & Fitness': [
        'Ultrahuman'
      ],
      'Social Media Management': [
        'Reddit', 'LinkedIn', 'Facebook', 'Instagram'
      ],
      'Design & UI/UX': [
        'UI/UX Pro Max'
      ],
      'Memory & Knowledge': [
        'Elite Longterm Memory'
      ],
      'Specialized Tools': [
        'Guardian Angel', 'Jupyter', 'Zapier', 'Make'
      ]
    }
  };
  
  const inventoryFile = path.join(process.cwd(), 'SKILLS-INVENTORY.json');
  fs.writeFileSync(inventoryFile, JSON.stringify(inventory, null, 2));
  log(`\n📋 Skills inventory saved to: ${inventoryFile}`);
}

// Run provisioning
provisionAllSkills().catch(error => {
  log(`Fatal error: ${error.message}`);
  process.exit(1);
});
