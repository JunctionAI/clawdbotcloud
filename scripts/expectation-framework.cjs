#!/usr/bin/env node

/**
 * EXPECTATION FRAMEWORK - Working Relationship Definition
 * 
 * Defines working relationship, approval requirements, boundaries with Tom.
 * 
 * Usage:
 *   node scripts/expectation-framework.js onboard
 *   node scripts/expectation-framework.js show
 *   node scripts/expectation-framework.js update --category=email --level=ask-first
 *   node scripts/expectation-framework.js checkin
 */

const fs = require('fs');
const path = require('path');

// ============================================================================
// CONFIGURATION
// ============================================================================

const CONFIG = {
  dataDir: path.join(__dirname, '..', 'data', 'expectations'),
  expectationsPath: path.join(__dirname, '..', 'data', 'expectations', 'expectations.json'),
  checkInsPath: path.join(__dirname, '..', 'data', 'expectations', 'checkins.json'),
  agentsMdPath: path.join(__dirname, '..', 'AGENTS.md'),
  stateJsonPath: path.join(__dirname, '..', 'STATE.json'),
  
  defaultExpectations: {
    proactivityLevel: 'high',
    approvalRequirements: {
      email: {
        read: 'do-freely',
        organize: 'do-freely',
        draft: 'do-freely',
        send: 'ask-first'
      },
      calendar: {
        read: 'do-freely',
        suggest: 'do-freely',
        schedule: 'ask-first',
        reschedule: 'ask-first'
      },
      financial: {
        read: 'do-freely',
        categorize: 'do-freely',
        flag: 'do-freely',
        pay: 'never-do'
      },
      socialMedia: {
        read: 'do-freely',
        draft: 'do-freely',
        post: 'ask-first',
        dm: 'ask-first'
      },
      code: {
        read: 'do-freely',
        write: 'do-freely',
        commit: 'do-freely',
        push: 'ask-first',
        deploy: 'never-do'
      },
      files: {
        read: 'do-freely',
        create: 'do-freely',
        edit: 'do-freely',
        delete: 'ask-first'
      }
    },
    offLimits: [
      'Production database writes',
      'Financial transactions >$100 without approval',
      'Impersonate Tom in high-stakes contexts',
      'Share confidential client data externally',
      'Deploy code to production'
    ],
    communication: {
      updateFrequency: 'daily',
      format: 'brief',
      channels: ['discord', 'morning-brief'],
      quietHours: {
        start: '23:00',
        end: '07:00'
      }
    },
    escalationRules: {
      urgent: 'Notify immediately via Discord',
      important: 'Include in morning brief',
      normal: 'Weekly summary'
    },
    lastUpdated: new Date().toISOString()
  }
};

// ============================================================================
// INITIALIZATION
// ============================================================================

function ensureDirectories() {
  if (!fs.existsSync(CONFIG.dataDir)) {
    fs.mkdirSync(CONFIG.dataDir, { recursive: true });
  }
  
  if (!fs.existsSync(CONFIG.expectationsPath)) {
    fs.writeFileSync(CONFIG.expectationsPath, JSON.stringify(CONFIG.defaultExpectations, null, 2));
  }
  
  if (!fs.existsSync(CONFIG.checkInsPath)) {
    fs.writeFileSync(CONFIG.checkInsPath, JSON.stringify([], null, 2));
  }
}

function loadExpectations() {
  return JSON.parse(fs.readFileSync(CONFIG.expectationsPath, 'utf8'));
}

function saveExpectations(expectations) {
  expectations.lastUpdated = new Date().toISOString();
  fs.writeFileSync(CONFIG.expectationsPath, JSON.stringify(expectations, null, 2));
  
  // Update AGENTS.md
  updateAgentsMd(expectations);
}

function loadCheckIns() {
  return JSON.parse(fs.readFileSync(CONFIG.checkInsPath, 'utf8'));
}

function saveCheckIns(checkIns) {
  fs.writeFileSync(CONFIG.checkInsPath, JSON.stringify(checkIns, null, 2));
}

function updateState() {
  if (!fs.existsSync(CONFIG.stateJsonPath)) return;
  
  const state = JSON.parse(fs.readFileSync(CONFIG.stateJsonPath, 'utf8'));
  
  if (!state.automationSystems) {
    state.automationSystems = {};
  }
  
  const expectations = loadExpectations();
  
  state.automationSystems.expectationFramework = {
    script: 'scripts/expectation-framework.js',
    description: 'Working relationship definition and boundaries',
    features: [
      'Proactivity level setting',
      'Approval requirements by category',
      'Off-limits areas definition',
      'Weekly calibration check-ins'
    ],
    proactivityLevel: expectations.proactivityLevel,
    lastUpdated: expectations.lastUpdated
  };
  
  fs.writeFileSync(CONFIG.stateJsonPath, JSON.stringify(state, null, 2));
}

// ============================================================================
// ONBOARDING
// ============================================================================

function runOnboarding() {
  console.log('🤝 EXPECTATION FRAMEWORK - Onboarding\n');
  console.log('='.repeat(60));
  console.log();
  console.log('Let\'s define our working relationship!\n');
  
  console.log('This onboarding will ask you questions about:\n');
  console.log('1. How proactive should I be?');
  console.log('2. What actions need approval?');
  console.log('3. What areas are off-limits?');
  console.log('4. How should I communicate?');
  console.log();
  
  console.log('━'.repeat(60));
  console.log('\n📋 PROACTIVITY LEVEL\n');
  console.log('How proactive should I be?\n');
  console.log('1. LOW - Only act when explicitly asked');
  console.log('2. MEDIUM - Suggest actions, wait for approval');
  console.log('3. HIGH - Act on obvious opportunities, report after ✨ (Recommended)');
  console.log('4. AUTONOMOUS - Act independently within boundaries');
  console.log();
  console.log('💡 Current Setting: HIGH');
  console.log('   I act independently on obvious opportunities within boundaries,');
  console.log('   report after completion. I ask first for uncertain/high-risk actions.');
  console.log();
  
  console.log('━'.repeat(60));
  console.log('\n✅ DO FREELY (No Approval Needed)\n');
  console.log('These actions I can do without asking:\n');
  console.log('  • Read and organize emails');
  console.log('  • Draft emails/content');
  console.log('  • Analyze data and create reports');
  console.log('  • Research and gather information');
  console.log('  • Update memory files');
  console.log('  • Commit code to feature branches');
  console.log('  • Create calendar suggestions');
  console.log('  • Flag issues and opportunities');
  console.log();
  
  console.log('━'.repeat(60));
  console.log('\n⚠️  ASK FIRST (Requires Approval)\n');
  console.log('These actions require your confirmation:\n');
  console.log('  • Send emails to clients');
  console.log('  • Schedule/reschedule meetings');
  console.log('  • Post to social media');
  console.log('  • Push code to main branch');
  console.log('  • Spend money');
  console.log('  • Contact new people');
  console.log('  • Make public statements');
  console.log();
  
  console.log('━'.repeat(60));
  console.log('\n🛑 NEVER DO (Off-Limits)\n');
  console.log('These areas are off-limits:\n');
  console.log('  • Production database writes');
  console.log('  • Deploy to production without approval');
  console.log('  • Financial transactions >$100');
  console.log('  • Impersonate you in high-stakes contexts');
  console.log('  • Share confidential information externally');
  console.log();
  
  console.log('━'.repeat(60));
  console.log('\n📡 COMMUNICATION PREFERENCES\n');
  console.log('  • Updates: Daily summary in morning brief');
  console.log('  • Format: Brief and actionable');
  console.log('  • Channels: Discord, morning brief');
  console.log('  • Quiet Hours: 23:00-07:00 (no notifications)');
  console.log();
  console.log('  Escalation:');
  console.log('    URGENT → Discord notification immediately');
  console.log('    IMPORTANT → Morning brief');
  console.log('    NORMAL → Weekly summary');
  console.log();
  
  console.log('━'.repeat(60));
  console.log('\n✅ ONBOARDING COMPLETE\n');
  console.log('Default expectations have been set.');
  console.log('These are documented in AGENTS.md');
  console.log();
  console.log('To customize:');
  console.log('  node scripts/expectation-framework.js update --category=... --level=...');
  console.log();
  console.log('Weekly calibration check-ins will help us refine these over time.');
  console.log();
  
  // Save default expectations
  saveExpectations(CONFIG.defaultExpectations);
  updateState();
}

// ============================================================================
// UPDATE AGENTS.MD
// ============================================================================

function updateAgentsMd(expectations) {
  if (!fs.existsSync(CONFIG.agentsMdPath)) {
    console.warn('⚠️  AGENTS.md not found, skipping update');
    return;
  }
  
  let agentsMd = fs.readFileSync(CONFIG.agentsMdPath, 'utf8');
  
  // Generate working relationship section
  const relationshipSection = generateRelationshipSection(expectations);
  
  // Check if section already exists
  const sectionStart = '## Working Relationship with Tom';
  
  if (agentsMd.includes(sectionStart)) {
    // Replace existing section
    const startIndex = agentsMd.indexOf(sectionStart);
    const nextSectionIndex = agentsMd.indexOf('\n## ', startIndex + 1);
    
    if (nextSectionIndex > -1) {
      agentsMd = agentsMd.substring(0, startIndex) + relationshipSection + '\n' + agentsMd.substring(nextSectionIndex);
    } else {
      agentsMd = agentsMd.substring(0, startIndex) + relationshipSection;
    }
  } else {
    // Append to end
    agentsMd += '\n\n' + relationshipSection;
  }
  
  fs.writeFileSync(CONFIG.agentsMdPath, agentsMd);
  console.log('✅ Updated AGENTS.md with working relationship definition');
}

function generateRelationshipSection(expectations) {
  const doFreely = [];
  const askFirst = [];
  const neverDo = [];
  
  // Extract actions by permission level
  for (const [category, actions] of Object.entries(expectations.approvalRequirements)) {
    for (const [action, level] of Object.entries(actions)) {
      const item = `${category}: ${action}`;
      if (level === 'do-freely') doFreely.push(item);
      else if (level === 'ask-first') askFirst.push(item);
      else if (level === 'never-do') neverDo.push(item);
    }
  }
  
  return `## Working Relationship with Tom

### Proactivity Level: ${expectations.proactivityLevel.toUpperCase()}
I act independently on obvious opportunities within defined boundaries,
report after completion. I ask first for anything uncertain or high-risk.

### ✅ Do Freely (No Approval Needed)
- Read and organize emails
- Draft emails/content
- Analyze data and create reports
- Research and gather information
- Update memory files
- Commit code to feature branches
- Create calendar suggestions
- Flag issues and opportunities

### ⚠️ Ask First (Requires Approval)
- Send emails to clients
- Schedule/reschedule meetings
- Post to social media
- Push code to main branch
- Spend money
- Contact new people
- Make public statements

### 🛑 Never Do (Off-Limits)
${expectations.offLimits.map(item => `- ${item}`).join('\n')}

### Communication Preferences
- **Updates**: ${expectations.communication.updateFrequency} summary in morning brief
- **Format**: ${expectations.communication.format} and actionable
- **Channels**: ${expectations.communication.channels.join(', ')}
- **Quiet Hours**: ${expectations.communication.quietHours.start}-${expectations.communication.quietHours.end} (no notifications)
- **Escalation**: 
  - Urgent → ${expectations.escalationRules.urgent}
  - Important → ${expectations.escalationRules.important}
  - Normal → ${expectations.escalationRules.normal}

### Calibration
- Weekly check-in: "Am I being too proactive/passive?"
- Monthly review of boundaries
- Adjust based on feedback

*Last updated: ${new Date(expectations.lastUpdated).toLocaleDateString()}*
`;
}

// ============================================================================
// CHECK-IN
// ============================================================================

function runCheckIn() {
  console.log('📊 WEEKLY CALIBRATION CHECK-IN\n');
  console.log('='.repeat(60));
  console.log();
  
  console.log('Let\'s calibrate our working relationship!\n');
  console.log('Please answer these questions:\n');
  
  const questions = [
    '1. Was I too proactive this week? (Y/N)',
    '2. Did I ask for approval on things I should have just done? (Y/N)',
    '3. Did I miss opportunities by being too cautious? (Y/N)',
    '4. Are the boundaries still right, or should we adjust? (1-5 scale)',
    '5. Satisfaction score with my proactivity level? (1-10)'
  ];
  
  questions.forEach(q => console.log(q));
  console.log();
  
  console.log('━'.repeat(60));
  console.log();
  console.log('💡 Based on your feedback, I\'ll adjust my behavior.');
  console.log();
  console.log('Common Adjustments:');
  console.log('  - "Too proactive" → Lower proactivity level');
  console.log('  - "Too cautious" → Raise proactivity level');
  console.log('  - "Asking too much" → Move some actions to "do-freely"');
  console.log('  - "Not asking enough" → Move some actions to "ask-first"');
  console.log();
  
  // Log check-in
  const checkIns = loadCheckIns();
  checkIns.push({
    timestamp: new Date().toISOString(),
    status: 'pending-feedback'
  });
  saveCheckIns(checkIns);
  
  console.log('✅ Check-in questions ready.');
  console.log('Reply in chat with your answers, and I\'ll adjust accordingly.');
}

// ============================================================================
// DISPLAY
// ============================================================================

function displayExpectations() {
  const expectations = loadExpectations();
  
  console.log('🤝 WORKING RELATIONSHIP DEFINITION\n');
  console.log('='.repeat(60));
  console.log();
  
  console.log(`Proactivity Level: ${expectations.proactivityLevel.toUpperCase()}\n`);
  
  console.log('✅ DO FREELY:');
  Object.entries(expectations.approvalRequirements).forEach(([category, actions]) => {
    const freeActions = Object.entries(actions).filter(([_, level]) => level === 'do-freely');
    if (freeActions.length > 0) {
      console.log(`  ${category}:`);
      freeActions.forEach(([action]) => console.log(`    - ${action}`));
    }
  });
  console.log();
  
  console.log('⚠️  ASK FIRST:');
  Object.entries(expectations.approvalRequirements).forEach(([category, actions]) => {
    const askActions = Object.entries(actions).filter(([_, level]) => level === 'ask-first');
    if (askActions.length > 0) {
      console.log(`  ${category}:`);
      askActions.forEach(([action]) => console.log(`    - ${action}`));
    }
  });
  console.log();
  
  console.log('🛑 NEVER DO:');
  expectations.offLimits.forEach(item => console.log(`  - ${item}`));
  console.log();
  
  console.log('📡 COMMUNICATION:');
  console.log(`  Frequency: ${expectations.communication.updateFrequency}`);
  console.log(`  Format: ${expectations.communication.format}`);
  console.log(`  Channels: ${expectations.communication.channels.join(', ')}`);
  console.log(`  Quiet Hours: ${expectations.communication.quietHours.start}-${expectations.communication.quietHours.end}`);
  console.log();
  
  console.log(`Last Updated: ${new Date(expectations.lastUpdated).toLocaleDateString()}`);
  console.log();
  console.log('='.repeat(60));
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
      case 'onboard':
        runOnboarding();
        break;
        
      case 'show':
        displayExpectations();
        break;
        
      case 'update':
        console.log('⚠️  Update functionality: Modify expectations.json directly');
        console.log('   Or run onboarding again to reset: node scripts/expectation-framework.js onboard');
        break;
        
      case 'checkin':
        runCheckIn();
        break;
        
      default:
        console.log('Usage:');
        console.log('  node scripts/expectation-framework.js onboard   # Run onboarding');
        console.log('  node scripts/expectation-framework.js show      # View current expectations');
        console.log('  node scripts/expectation-framework.js checkin   # Weekly calibration');
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

module.exports = { loadExpectations, saveExpectations, updateAgentsMd, runCheckIn };
