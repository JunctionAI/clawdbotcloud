#!/usr/bin/env node

/**
 * Fetch and install a skill from ClawHub
 * Works without the full Clawdbot CLI
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

async function fetchSkillFromHub(author, skillName) {
  const url = `https://www.clawhub.ai/api/skills/${author}/${skillName}`;
  
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function installSkill(skillSlug) {
  const [author, skillName] = skillSlug.split('/');
  console.log(`Installing ${skillSlug}...`);
  
  try {
    // Fetch skill metadata from ClawHub
    const skillData = await fetchSkillFromHub(author, skillName);
    
    // Create skill directory
    const skillDir = path.join(process.cwd(), 'skills', skillName);
    const metaDir = path.join(skillDir, '.clawdhub');
    
    if (!fs.existsSync(skillDir)) {
      fs.mkdirSync(skillDir, { recursive: true });
    }
    if (!fs.existsSync(metaDir)) {
      fs.mkdirSync(metaDir, { recursive: true });
    }
    
    // Write SKILL.md
    const skillMd = `---
name: ${skillName}
description: ${skillData.description || 'No description'}
homepage: ${skillData.homepage || ''}
metadata: ${JSON.stringify(skillData.metadata || {})}
---

# ${skillData.name || skillName}

${skillData.summary || 'No summary provided.'}

${skillData.content || ''}
`;
    
    fs.writeFileSync(path.join(skillDir, 'SKILL.md'), skillMd);
    
    // Write origin.json
    const origin = {
      version: 1,
      registry: 'https://clawdhub.com',
      slug: skillName,
      installedVersion: skillData.version || '1.0.0',
      installedAt: Date.now()
    };
    
    fs.writeFileSync(
      path.join(metaDir, 'origin.json'),
      JSON.stringify(origin, null, 2)
    );
    
    // Update lock file
    const lockFile = path.join(process.cwd(), '.clawdhub', 'lock.json');
    let lock = { version: 1, skills: {} };
    
    if (fs.existsSync(lockFile)) {
      lock = JSON.parse(fs.readFileSync(lockFile, 'utf-8'));
    }
    
    lock.skills[skillName] = {
      version: skillData.version || '1.0.0',
      installedAt: Date.now()
    };
    
    const lockDir = path.dirname(lockFile);
    if (!fs.existsSync(lockDir)) {
      fs.mkdirSync(lockDir, { recursive: true });
    }
    
    fs.writeFileSync(lockFile, JSON.stringify(lock, null, 2));
    
    console.log(`✅ Successfully installed ${skillSlug}`);
    return true;
    
  } catch (error) {
    console.error(`❌ Failed to install ${skillSlug}:`, error.message);
    return false;
  }
}

// CLI usage
if (require.main === module) {
  const skillSlug = process.argv[2];
  
  if (!skillSlug) {
    console.error('Usage: node fetch-and-install-skill.js <author>/<skill-name>');
    process.exit(1);
  }
  
  installSkill(skillSlug)
    .then(success => process.exit(success ? 0 : 1))
    .catch(err => {
      console.error('Fatal error:', err);
      process.exit(1);
    });
}

module.exports = { installSkill };
