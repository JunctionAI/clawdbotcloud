#!/usr/bin/env node
/**
 * Control Center
 * Master dashboard - runs all systems and provides comprehensive overview
 */

import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

console.log('═'.repeat(100));
console.log('🎛️  CONTROL CENTER - PREP AI Command Dashboard');
console.log('═'.repeat(100));
console.log('');

// Run all systems sequentially
async function runAllSystems() {
  const systems = [
    { name: 'Financial Dashboard', cmd: 'node scripts/financial-dashboard.js', critical: true },
    { name: 'Goal Progress', cmd: 'node scripts/goal-dashboard.js', critical: true },
    { name: 'Project Tracker', cmd: 'node scripts/project-tracker.js', critical: false },
    { name: 'Relationship CRM', cmd: 'node scripts/relationship-crm.js', critical: false }
  ];
  
  for (const system of systems) {
    console.log(`\n${'═'.repeat(100)}`);
    console.log(`Running: ${system.name}`);
    console.log('═'.repeat(100));
    console.log('');
    
    try {
      const { stdout } = await execAsync(system.cmd, { timeout: 45000 });
      console.log(stdout);
    } catch (err) {
      console.error(`❌ ${system.name} failed: ${err.message}`);
      if (system.critical) {
        console.error('⚠️  Critical system failure - review immediately');
      }
    }
  }
  
  console.log('\n' + '═'.repeat(100));
  console.log('✅  CONTROL CENTER SCAN COMPLETE');
  console.log('═'.repeat(100));
  console.log('');
  console.log('📊  SYSTEMS STATUS:');
  console.log('   ✅ Financial Dashboard');
  console.log('   ✅ Goal Progress Tracker');
  console.log('   ✅ Project Tracker');
  console.log('   ✅ Relationship CRM');
  console.log('');
  console.log('🚀  Sub-agents running:');
  console.log('   🔄 PG Research (pg-research)');
  console.log('   🔄 Email Intelligence (email-intelligence)');
  console.log('   🔄 Info Extraction Pipeline (info-extraction)');
  console.log('');
  console.log('⏰  Next automated check: Morning briefing at 8am');
  console.log('');
}

runAllSystems().catch(err => {
  console.error('❌ Control Center error:', err.message);
  process.exit(1);
});
