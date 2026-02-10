#!/usr/bin/env node

/**
 * Test installed skills to verify they work
 */

const fs = require('fs');
const path = require('path');

function testSkillsInstallation() {
  console.log('═══════════════════════════════════════════════════════');
  console.log('  CLAWDBOT SKILLS INSTALLATION TEST');
  console.log('═══════════════════════════════════════════════════════\n');
  
  const skillsDir = path.join(process.cwd(), 'skills');
  const lockFile = path.join(process.cwd(), '.clawdhub', 'lock.json');
  
  // Check skills directory exists
  if (!fs.existsSync(skillsDir)) {
    console.error('❌ Skills directory not found!');
    return false;
  }
  
  // Check lock file exists
  if (!fs.existsSync(lockFile)) {
    console.error('❌ Lock file not found! No skills installed.');
    return false;
  }
  
  // Read lock file
  const lock = JSON.parse(fs.readFileSync(lockFile, 'utf-8'));
  const installedSkills = Object.keys(lock.skills || {});
  
  console.log(`Found ${installedSkills.length} installed skills\n`);
  
  // Test each skill
  const results = {
    total: installedSkills.length,
    valid: 0,
    invalid: 0,
    issues: []
  };
  
  installedSkills.forEach((skillName, index) => {
    const skillDir = path.join(skillsDir, skillName);
    const skillMd = path.join(skillDir, 'SKILL.md');
    const originJson = path.join(skillDir, '.clawdhub', 'origin.json');
    
    console.log(`[${index + 1}/${installedSkills.length}] Testing ${skillName}...`);
    
    let valid = true;
    const issues = [];
    
    // Check skill directory exists
    if (!fs.existsSync(skillDir)) {
      issues.push('Directory not found');
      valid = false;
    }
    
    // Check SKILL.md exists
    if (!fs.existsSync(skillMd)) {
      issues.push('SKILL.md not found');
      valid = false;
    }
    
    // Check origin.json exists
    if (!fs.existsSync(originJson)) {
      issues.push('origin.json not found');
      valid = false;
    }
    
    if (valid) {
      console.log(`  ✅ ${skillName} - Valid`);
      results.valid++;
    } else {
      console.log(`  ❌ ${skillName} - Invalid: ${issues.join(', ')}`);
      results.invalid++;
      results.issues.push({ skill: skillName, issues });
    }
  });
  
  // Summary
  console.log('\n═══════════════════════════════════════════════════════');
  console.log('  TEST RESULTS');
  console.log('═══════════════════════════════════════════════════════');
  console.log(`Total skills: ${results.total}`);
  console.log(`✅ Valid: ${results.valid}`);
  console.log(`❌ Invalid: ${results.invalid}`);
  
  if (results.issues.length > 0) {
    console.log('\nIssues found:');
    results.issues.forEach(issue => {
      console.log(`  - ${issue.skill}: ${issue.issues.join(', ')}`);
    });
  }
  
  console.log('\n✨ Test complete!\n');
  
  return results.invalid === 0;
}

// Run tests
const success = testSkillsInstallation();
process.exit(success ? 0 : 1);
