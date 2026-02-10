#!/usr/bin/env node

/**
 * FULL SKILLS INSTALLER
 * 
 * Master skill installation module for Clawdbot provisioning.
 * Ensures EVERY customer gets the complete skill suite on day 1.
 * 
 * This is what makes Clawdbot the most feature-complete AI assistant.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// ═══════════════════════════════════════════════════════════════════════════════
// COMPREHENSIVE SKILL CATALOG - ALL 100+ INTEGRATIONS
// ═══════════════════════════════════════════════════════════════════════════════

const SKILL_CATALOG = {
  // === PRODUCTIVITY & COLLABORATION ===
  productivity: [
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
  ],
  
  // === PROJECT MANAGEMENT & DEV TOOLS ===
  devtools: [
    'byungkyu/github-api',
    'byungkyu/jira-api',
    'byungkyu/linear-api',
    'byungkyu/figma-api',
    'jontsai/command-center',
    'jontsai/spacesuit',
  ],
  
  // === CRM & BUSINESS ===
  business: [
    'byungkyu/hubspot-api',
    'byungkyu/salesforce-api',
    'byungkyu/pipedrive-api',
    'byungkyu/zoho-api',
  ],
  
  // === FINANCE & PAYMENTS ===
  finance: [
    'byungkyu/stripe-api',
    'byungkyu/quickbooks',
    'byungkyu/xero',
    'byungkyu/wise-api',
    'byungkyu/paypal-api',
  ],
  
  // === E-COMMERCE ===
  ecommerce: [
    'byungkyu/shopify',
    'byungkyu/woocommerce-api',
  ],
  
  // === FORMS & SURVEYS ===
  forms: [
    'byungkyu/typeform',
    'byungkyu/jotform',
    'byungkyu/google-forms',
  ],
  
  // === MESSAGING & SOCIAL ===
  messaging: [
    'sakaen736jih/wacli-hq4',           // WhatsApp
    'sakaen736jih/wacli-xcb',           // WhatsApp (alternative)
    'moonshine-100rze/whatsapp-meo',    // WhatsApp (managed)
    'byungkyu/telegram-api',
    'byungkyu/discord-api',
    'AlphaFactor/channel',              // WeChat OA
    'rishavmukherji/farcaster-agent',
    'byungkyu/twitter-api',
  ],
  
  // === BROWSER AUTOMATION ===
  browser: [
    'david-evaristo/playwright-cli-2',
    'TYRONEMICHAEL/civic-nexus',
  ],
  
  // === GOOGLE WORKSPACE ===
  google: [
    'sakaen736jih/gog-kcjgdv2',         // Google Workspace CLI
    'byungkyu/google-drive',
    'byungkyu/google-sheets',
    'byungkyu/google-docs',
  ],
  
  // === AI & IMAGE GENERATION ===
  ai: [
    'sakaen736jih/nano-banana-pro-c16jff',
    'DaWe35/image-router',
    'qqliaoxin/comfyui-api',
    'byungkyu/replicate-api',
    'byungkyu/stability-ai',
    'byungkyu/midjourney-api',
  ],
  
  // === VIDEO & MEDIA ===
  media: [
    'sakaen736jih/youtube-watcher-7',
    'moonshine-100rze/youtube-7ze',
    'moonshine-100rze/youtube-y4',
    'byungkyu/spotify-api',
    'byungkyu/youtube-api',
  ],
  
  // === CODING & DEVELOPMENT ===
  coding: [
    'sakaen736jih/coding-agent-kpeg9c2rq',
    'sakaen736jih/coding-agent-8wyxxelkv',
    'moonshine-100rze/coding-agent-sjf',
    'moonshine-100rze/coding-agent-g7z',
    'moonshine-100rze/coding-agent-p4q',
    'moonshine-100rze/coding-agent-gje',
    'stopachka/app-builder',
    'gitgoodordietrying/perf-profiler',
  ],
  
  // === FILE & DATA MANAGEMENT ===
  files: [
    'Xejrax/file-search',
    'byungkyu/dropbox-api',
    'byungkyu/box-api',
    'byungkyu/onedrive-api',
  ],
  
  // === DATABASES ===
  databases: [
    'byungkyu/mongodb-api',
    'byungkyu/postgresql-api',
    'byungkyu/mysql-api',
    'byungkyu/redis-api',
  ],
  
  // === CLOUD & INFRASTRUCTURE ===
  cloud: [
    'byungkyu/aws-api',
    'byungkyu/gcp-api',
    'byungkyu/azure-api',
    'byungkyu/vercel-api',
    'byungkyu/railway-api',
  ],
  
  // === WEB3 & BLOCKCHAIN ===
  web3: [
    'Josephrp/autonomous-agent',
    'andreolf/metamask-agent-wallet-skill',
    'spirosrap/zapper',
  ],
  
  // === ANALYTICS & MONITORING ===
  analytics: [
    'byungkyu/google-analytics',
    'byungkyu/mixpanel-api',
    'byungkyu/amplitude-api',
  ],
  
  // === HEALTH & FITNESS ===
  health: [
    'devpranoy/ultrahuman-openclaw',
  ],
  
  // === SOCIAL MEDIA MANAGEMENT ===
  social: [
    'buksan1950/reddit-readonly',
    'byungkyu/linkedin-api',
    'byungkyu/facebook-api',
    'byungkyu/instagram-api',
  ],
  
  // === DESIGN & UI/UX ===
  design: [
    'ahump20/ui-ux-pro-max-2',
  ],
  
  // === MEMORY & KNOWLEDGE ===
  memory: [
    'NextFrontierBuilds/elite-longterm-memory',
  ],
  
  // === SPECIALIZED TOOLS ===
  specialized: [
    'leo3linbeck/guardian-angel',
    'byungkyu/jupyter-api',
    'byungkyu/zapier-api',
    'byungkyu/make-api',
  ],
};

// Flatten all skills into a single array
const ALL_SKILLS = Object.values(SKILL_CATALOG).flat();

/**
 * Main class for skill installation
 */
class FullSkillsInstaller {
  constructor(workspacePath, options = {}) {
    this.workspacePath = workspacePath || process.cwd();
    this.options = {
      verbose: options.verbose || false,
      parallel: options.parallel || 5,
      skipExisting: options.skipExisting !== false,
      logFile: options.logFile || path.join(this.workspacePath, 'logs', 'skills-install.log'),
    };
    
    // Ensure logs directory exists
    const logsDir = path.dirname(this.options.logFile);
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }
    
    this.results = {
      total: ALL_SKILLS.length,
      installed: 0,
      skipped: 0,
      failed: 0,
      errors: [],
      startTime: null,
      endTime: null,
    };
  }

  log(message, level = 'info') {
    const timestamp = new Date().toISOString();
    const logLine = `[${timestamp}] [${level.toUpperCase()}] ${message}\n`;
    
    if (this.options.verbose || level === 'error') {
      console.log(message);
    }
    
    fs.appendFileSync(this.options.logFile, logLine);
  }

  /**
   * Get already installed skills from lock file
   */
  getInstalledSkills() {
    const lockFile = path.join(this.workspacePath, '.clawdhub', 'lock.json');
    if (fs.existsSync(lockFile)) {
      try {
        const lock = JSON.parse(fs.readFileSync(lockFile, 'utf-8'));
        return Object.keys(lock.skills || {});
      } catch (e) {
        return [];
      }
    }
    return [];
  }

  /**
   * Install a single skill
   */
  async installSkill(skillSlug) {
    const skillName = skillSlug.split('/')[1];
    
    try {
      // Use clawdbot CLI to install
      execSync(`npx clawdbot hub install ${skillSlug} --yes`, {
        encoding: 'utf-8',
        stdio: 'pipe',
        cwd: this.workspacePath,
        timeout: 60000, // 60 second timeout per skill
      });
      
      this.log(`✅ Installed: ${skillSlug}`);
      this.results.installed++;
      return { success: true, skill: skillSlug };
      
    } catch (error) {
      this.log(`❌ Failed: ${skillSlug} - ${error.message}`, 'error');
      this.results.failed++;
      this.results.errors.push({ skill: skillSlug, error: error.message });
      return { success: false, skill: skillSlug, error: error.message };
    }
  }

  /**
   * Install skills in batches to avoid overwhelming the system
   */
  async installBatch(skills) {
    const batchSize = this.options.parallel;
    const results = [];
    
    for (let i = 0; i < skills.length; i += batchSize) {
      const batch = skills.slice(i, i + batchSize);
      const batchResults = await Promise.all(
        batch.map(skill => this.installSkill(skill))
      );
      results.push(...batchResults);
      
      // Small delay between batches
      if (i + batchSize < skills.length) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
    
    return results;
  }

  /**
   * Install ALL skills
   */
  async installAll() {
    this.results.startTime = Date.now();
    
    this.log('═══════════════════════════════════════════════════════════════');
    this.log('  CLAWDBOT FULL SKILLS PROVISIONING');
    this.log('  Installing ALL available skills from ClawHub');
    this.log(`  Total skills to process: ${ALL_SKILLS.length}`);
    this.log('═══════════════════════════════════════════════════════════════');
    
    // Get already installed skills
    const installedSkills = this.getInstalledSkills();
    this.log(`Found ${installedSkills.length} already installed skills`);
    
    // Filter out already installed if skipping
    let skillsToInstall = ALL_SKILLS;
    if (this.options.skipExisting) {
      skillsToInstall = ALL_SKILLS.filter(skill => {
        const skillName = skill.split('/')[1];
        return !installedSkills.includes(skillName);
      });
      this.results.skipped = ALL_SKILLS.length - skillsToInstall.length;
      this.log(`Skipping ${this.results.skipped} already installed skills`);
    }
    
    if (skillsToInstall.length === 0) {
      this.log('All skills already installed! Nothing to do.');
      return this.getReport();
    }
    
    this.log(`Installing ${skillsToInstall.length} skills...`);
    
    // Install in batches
    await this.installBatch(skillsToInstall);
    
    this.results.endTime = Date.now();
    
    // Generate report
    return this.getReport();
  }

  /**
   * Install by category
   */
  async installCategory(categoryName) {
    const skills = SKILL_CATALOG[categoryName];
    if (!skills) {
      throw new Error(`Unknown category: ${categoryName}. Available: ${Object.keys(SKILL_CATALOG).join(', ')}`);
    }
    
    this.log(`Installing ${categoryName} category (${skills.length} skills)...`);
    return await this.installBatch(skills);
  }

  /**
   * Generate installation report
   */
  getReport() {
    const elapsed = this.results.endTime - this.results.startTime;
    
    const report = {
      ...this.results,
      elapsed: elapsed,
      elapsedFormatted: `${Math.round(elapsed / 1000)}s`,
      successRate: `${Math.round((this.results.installed / (this.results.total - this.results.skipped)) * 100)}%`,
      summary: {
        total: this.results.total,
        installed: this.results.installed,
        skipped: this.results.skipped,
        failed: this.results.failed,
      }
    };
    
    // Log final report
    this.log('\n═══════════════════════════════════════════════════════════════');
    this.log('  PROVISIONING COMPLETE');
    this.log('═══════════════════════════════════════════════════════════════');
    this.log(`Total skills: ${report.total}`);
    this.log(`✅ Successfully installed: ${report.installed}`);
    this.log(`⏭️  Skipped (already installed): ${report.skipped}`);
    this.log(`❌ Failed: ${report.failed}`);
    this.log(`⏱️  Time: ${report.elapsedFormatted}`);
    
    if (report.errors.length > 0) {
      this.log('\nFailed installations:');
      report.errors.forEach(err => {
        this.log(`  - ${err.skill}: ${err.error}`);
      });
    }
    
    this.log('\n✨ Clawdbot is now provisioned with the FULL skill suite!');
    this.log(`   ${report.installed + report.skipped} skills ready to use.`);
    
    // Save inventory
    this.saveInventory();
    
    return report;
  }

  /**
   * Save skills inventory JSON
   */
  saveInventory() {
    const inventory = {
      generatedAt: new Date().toISOString(),
      totalSkills: ALL_SKILLS.length,
      categories: Object.entries(SKILL_CATALOG).map(([name, skills]) => ({
        name,
        count: skills.length,
        skills: skills.map(s => s.split('/')[1])
      })),
      allSkills: ALL_SKILLS,
    };
    
    const inventoryFile = path.join(this.workspacePath, 'SKILLS-INVENTORY.json');
    fs.writeFileSync(inventoryFile, JSON.stringify(inventory, null, 2));
    this.log(`📋 Skills inventory saved to: ${inventoryFile}`);
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// MODULE EXPORTS
// ═══════════════════════════════════════════════════════════════════════════════

module.exports = {
  FullSkillsInstaller,
  SKILL_CATALOG,
  ALL_SKILLS,
  
  /**
   * Quick install function for provisioning scripts
   */
  async provisionFullSkills(workspacePath, options = {}) {
    const installer = new FullSkillsInstaller(workspacePath, options);
    return await installer.installAll();
  },
  
  /**
   * Get skill count for display
   */
  getSkillCount() {
    return ALL_SKILLS.length;
  },
  
  /**
   * Get categories for display
   */
  getCategories() {
    return Object.entries(SKILL_CATALOG).map(([name, skills]) => ({
      name,
      count: skills.length,
      description: getCategoryDescription(name),
    }));
  },
};

function getCategoryDescription(category) {
  const descriptions = {
    productivity: 'Email, Calendar, Collaboration',
    devtools: 'GitHub, Jira, Linear, Figma',
    business: 'CRM - HubSpot, Salesforce, Pipedrive',
    finance: 'Stripe, QuickBooks, Xero, Wise',
    ecommerce: 'Shopify, WooCommerce',
    forms: 'Typeform, JotForm, Google Forms',
    messaging: 'WhatsApp, Telegram, Discord',
    browser: 'Playwright, Web Automation',
    google: 'Gmail, Drive, Sheets, Docs',
    ai: 'Image Generation, ComfyUI, Midjourney',
    media: 'YouTube, Spotify',
    coding: 'Code Generation, App Builder',
    files: 'Dropbox, Box, OneDrive',
    databases: 'MongoDB, PostgreSQL, MySQL',
    cloud: 'AWS, GCP, Azure, Vercel',
    web3: 'Blockchain, DeFi, MetaMask',
    analytics: 'Google Analytics, Mixpanel',
    health: 'Ultrahuman',
    social: 'Reddit, LinkedIn, Facebook',
    design: 'UI/UX Tools',
    memory: 'Long-term Memory Systems',
    specialized: 'Zapier, Make, Jupyter',
  };
  return descriptions[category] || category;
}

// ═══════════════════════════════════════════════════════════════════════════════
// CLI EXECUTION
// ═══════════════════════════════════════════════════════════════════════════════

if (require.main === module) {
  const args = process.argv.slice(2);
  const verbose = args.includes('--verbose') || args.includes('-v');
  const category = args.find(a => !a.startsWith('-'));
  
  const installer = new FullSkillsInstaller(process.cwd(), { verbose });
  
  if (category) {
    installer.installCategory(category)
      .then(report => {
        console.log('\n✅ Category installation complete');
        process.exit(report.failed > 0 ? 1 : 0);
      })
      .catch(err => {
        console.error('Fatal error:', err.message);
        process.exit(1);
      });
  } else {
    installer.installAll()
      .then(report => {
        console.log('\n✅ Full installation complete');
        process.exit(report.failed > 0 ? 1 : 0);
      })
      .catch(err => {
        console.error('Fatal error:', err.message);
        process.exit(1);
      });
  }
}
