#!/usr/bin/env node
/**
 * Network Monetization System - Setup Script
 * Initialize all data directories and verify system readiness
 */

import fs from 'fs';
import path from 'path';

// Data directories to create
const DATA_DIRS = [
  'data/linkedin',
  'data/opportunities',
  'data/relationships',
  'data/referrals'
];

// Initialize files
const INIT_FILES = {
  'data/linkedin/connections.json': {
    connections: [],
    note: 'Export your LinkedIn connections and paste here'
  },
  'data/linkedin/opportunities.json': {
    generatedAt: null,
    highValueTargets: [],
    jobChanges: [],
    opportunities: []
  },
  'data/linkedin/connection-tracking.json': {
    lastChecked: null,
    jobChanges: []
  },
  'data/opportunities/opportunities.json': {
    scannedAt: null,
    totalOpportunities: 0,
    highValue: 0,
    mediumValue: 0,
    opportunities: []
  },
  'data/opportunities/sources.json': {
    sources: []
  },
  'data/opportunities/tracking.json': {
    lastScan: null,
    scannedOpportunities: [],
    contacted: [],
    closed: []
  },
  'data/relationships/crm.json': {
    updatedAt: null,
    people: {},
    decisionMakers: [],
    highValueTargets: []
  },
  'data/relationships/followups.json': {
    generatedAt: null,
    followUps: []
  },
  'data/referrals/referrals.json': {
    referrals: []
  },
  'data/referrals/referrers.json': {
    referrers: {}
  },
  'data/referrals/commission-payments.json': {
    payments: []
  }
};

// Setup function
function setup() {
  console.log('🚀 NETWORK MONETIZATION SYSTEM - SETUP\n');
  console.log('═══════════════════════════════════════════════════════\n');
  
  // Create directories
  console.log('📁 Creating data directories...\n');
  DATA_DIRS.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`  ✅ Created: ${dir}`);
    } else {
      console.log(`  ⏭️  Exists: ${dir}`);
    }
  });
  
  console.log('\n📄 Initializing data files...\n');
  let newFiles = 0;
  let existingFiles = 0;
  
  Object.entries(INIT_FILES).forEach(([filePath, content]) => {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
      console.log(`  ✅ Created: ${filePath}`);
      newFiles++;
    } else {
      console.log(`  ⏭️  Exists: ${filePath}`);
      existingFiles++;
    }
  });
  
  console.log(`\n📊 Summary: ${newFiles} new files created, ${existingFiles} already existed\n`);
  
  // Verify scripts exist
  console.log('🔍 Verifying scripts...\n');
  const scripts = [
    'scripts/linkedin-intelligence.js',
    'scripts/opportunity-scanner.js',
    'scripts/relationship-crm-enhanced.js',
    'scripts/referral-system.js',
    'scripts/network-monetization-dashboard.js'
  ];
  
  let allScriptsExist = true;
  scripts.forEach(script => {
    if (fs.existsSync(script)) {
      console.log(`  ✅ ${script}`);
    } else {
      console.log(`  ❌ MISSING: ${script}`);
      allScriptsExist = false;
    }
  });
  
  console.log('\n═══════════════════════════════════════════════════════\n');
  
  if (allScriptsExist) {
    console.log('✅ SETUP COMPLETE!\n');
    console.log('📝 NEXT STEPS:\n');
    console.log('1. Export your LinkedIn connections:');
    console.log('   LinkedIn → Settings → Data Privacy → Get a copy of your data');
    console.log('   Save to: data/linkedin/connections.json\n');
    console.log('2. Run initial analysis:');
    console.log('   node scripts/linkedin-intelligence.js');
    console.log('   node scripts/opportunity-scanner.js');
    console.log('   node scripts/relationship-crm-enhanced.js\n');
    console.log('3. View dashboard:');
    console.log('   node scripts/network-monetization-dashboard.js\n');
    console.log('4. Read the full guide:');
    console.log('   cat NETWORK-MONETIZATION-SYSTEM.md\n');
    console.log('💰 GOAL: $5k-20k/month from network-driven opportunities\n');
  } else {
    console.log('⚠️  SETUP INCOMPLETE - Some scripts are missing\n');
  }
}

// Run setup
setup();
