/**
 * Configuration Generator
 * Generates environment config for deployed agents (tier-specific)
 */

const { v4: uuidv4 } = require('uuid');

/**
 * Generate complete agent configuration
 * @param {Object} params
 * @returns {Object} Configuration object + .env string
 */
async function generateConfig({ agentId, customerId, tier, email }) {
  const config = {
    // Core
    AGENT_ID: agentId,
    CUSTOMER_ID: customerId,
    TIER: tier,
    CUSTOMER_EMAIL: email,
    
    // Clawdbot
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY, // Shared key (or customer-specific)
    CLAWDBOT_TOKEN: generateSecureToken(),
    GATEWAY_URL: `${process.env.AGENT_BASE_URL}/${agentId}`,
    
    // Skills (tier-specific)
    SKILLS_ENABLED: getSkillsForTier(tier).join(','),
    
    // Memory
    MEMORY_ENABLED: true,
    MEMORY_MAX_SIZE: getMemoryLimit(tier),
    
    // Heartbeat (tier-specific)
    HEARTBEAT_ENABLED: tier !== 'starter',
    HEARTBEAT_SCHEDULE: getHeartbeatSchedule(tier),
    
    // Mission Control (tier-specific)
    MISSION_CONTROL_ENABLED: tier !== 'starter',
    MAX_SUBAGENTS: getMaxSubagents(tier),
    
    // Channels (tier-specific)
    WHATSAPP_ENABLED: true, // All tiers
    TELEGRAM_ENABLED: tier !== 'starter',
    SLACK_ENABLED: tier !== 'starter',
    DISCORD_ENABLED: tier === 'enterprise',
    
    // Security
    EMAIL_PROTECTION_ENABLED: true,
    RISK_SCORING_ENABLED: true,
    CONFIRMATION_REQUIRED: true,
    
    // Support
    SUPPORT_EMAIL: 'support@setupclaw.com',
    SUPPORT_SLACK_CHANNEL: getSupportChannel(tier),
    
    // Dashboard
    DASHBOARD_URL: process.env.DASHBOARD_URL,
    DASHBOARD_API_KEY: generateSecureToken(),
  };
  
  // Convert to .env format
  const envString = Object.entries(config)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');
  
  return {
    config,
    envString,
  };
}

/**
 * Get skills list for tier
 */
function getSkillsForTier(tier) {
  const baseSkills = [
    'email',
    'calendar',
    'research',
    'document',
    'social',
    'finance',
  ];
  
  const proSkills = [
    ...baseSkills,
    'crm',
    'analysis',
    'intelligence',
    'reporting',
  ];
  
  const enterpriseSkills = [
    ...proSkills,
    'custom',
    'api',
    'database',
  ];
  
  switch (tier) {
    case 'starter':
      return baseSkills;
    case 'professional':
      return proSkills;
    case 'enterprise':
      return enterpriseSkills;
    default:
      return baseSkills;
  }
}

/**
 * Get memory size limit
 */
function getMemoryLimit(tier) {
  switch (tier) {
    case 'starter':
      return 50000; // 50KB
    case 'professional':
      return 100000; // 100KB
    case 'enterprise':
      return 999999999; // Unlimited
    default:
      return 50000;
  }
}

/**
 * Get heartbeat schedule (cron format)
 */
function getHeartbeatSchedule(tier) {
  switch (tier) {
    case 'starter':
      return null; // Disabled
    case 'professional':
      return '0 8,18 * * *'; // 8am and 6pm daily
    case 'enterprise':
      return '0 * * * *'; // Every hour (24/7)
    default:
      return null;
  }
}

/**
 * Get max subagents for Mission Control
 */
function getMaxSubagents(tier) {
  switch (tier) {
    case 'starter':
      return 1; // No Mission Control
    case 'professional':
      return 5;
    case 'enterprise':
      return 10;
    default:
      return 1;
  }
}

/**
 * Get support channel for tier
 */
function getSupportChannel(tier) {
  switch (tier) {
    case 'starter':
      return 'support-email'; // Email only
    case 'professional':
      return 'support-pro'; // Shared Slack channel
    case 'enterprise':
      return 'support-enterprise'; // Dedicated channel
    default:
      return 'support-email';
  }
}

/**
 * Generate secure token
 */
function generateSecureToken() {
  return `sck_${uuidv4().replace(/-/g, '')}`;
}

module.exports = {
  generateConfig,
};
