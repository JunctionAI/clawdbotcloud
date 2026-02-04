/**
 * Skills Installer
 * Installs tier-specific skills to deployed agent
 */

const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

/**
 * Install skills for agent
 */
async function installSkills({ agentId, deploymentUrl, tier }) {
  console.log(`📦 Installing skills for ${tier} tier...`);
  
  const skills = getSkillsForTier(tier);
  
  for (const skill of skills) {
    try {
      await installSkill(deploymentUrl, skill);
      console.log(`✅ Installed skill: ${skill}`);
    } catch (error) {
      console.error(`❌ Failed to install skill ${skill}:`, error.message);
      // Don't fail entire provisioning if one skill fails
    }
  }
  
  console.log(`✅ Installed ${skills.length} skills`);
  
  return { installed: skills.length };
}

/**
 * Install individual skill
 */
async function installSkill(deploymentUrl, skillName) {
  const skillPath = path.join(__dirname, '../../skills', skillName);
  
  // Check if skill exists
  try {
    await fs.access(skillPath);
  } catch {
    console.warn(`⚠️ Skill not found: ${skillName}`);
    return;
  }
  
  // Read skill files
  const skillMd = await fs.readFile(path.join(skillPath, 'SKILL.md'), 'utf-8');
  const hasScripts = await fileExists(path.join(skillPath, 'scripts'));
  
  // Upload to agent
  await axios.post(`${deploymentUrl}/api/skills/install`, {
    name: skillName,
    documentation: skillMd,
    // TODO: Include scripts if they exist
  }, {
    headers: {
      'Authorization': `Bearer ${process.env.AGENT_API_KEY}`,
    },
    timeout: 30000,
  });
}

/**
 * Get skills list for tier
 */
function getSkillsForTier(tier) {
  const starterSkills = [
    'email',
    'calendar',
    'research',
    'document',
    'social',
    'finance',
    'web-search',
    'web-fetch',
  ];
  
  const proSkills = [
    ...starterSkills,
    'crm',
    'analysis',
    'intelligence',
    'reporting',
    'automation',
    'integration',
  ];
  
  const enterpriseSkills = [
    ...proSkills,
    'custom-api',
    'database',
    'webhook',
    'sso',
  ];
  
  switch (tier) {
    case 'starter':
      return starterSkills;
    case 'professional':
      return proSkills;
    case 'enterprise':
      return enterpriseSkills;
    default:
      return starterSkills;
  }
}

/**
 * Check if file exists
 */
async function fileExists(path) {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}

module.exports = {
  installSkills,
};
