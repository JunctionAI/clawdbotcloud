#!/usr/bin/env node

/**
 * INTEGRATION HELPER
 * Adds Meta Ads automation to app deployment workflow
 */

const fs = require('fs').promises;
const path = require('path');

const INTEGRATION_CODE = `
// ============================================================================
// META ADS INTEGRATION
// ============================================================================

async function launchMetaAds(appConfig) {
  if (!appConfig.enableAds) {
    console.log('📢 Meta Ads disabled for this app');
    return null;
  }

  try {
    const { CampaignManager } = require('./meta-ads-automation.js');
    
    console.log('🚀 Launching Meta Ads campaign...');
    
    const manager = new CampaignManager();
    const campaign = await manager.launchCampaign({
      appName: appConfig.appName,
      appType: appConfig.appType || 'default',
      appId: appConfig.metaAppId,
      targetUrl: appConfig.storeUrl,
      description: appConfig.marketingDescription,
      budget: appConfig.adBudget || 100
    });
    
    console.log(\`✅ Meta Ads campaign launched: \${campaign.campaignId}\`);
    console.log(\`   Budget: $\${campaign.budget}/day\`);
    console.log(\`   Ad Sets: \${campaign.adSets.length}\`);
    
    // Update app config with campaign info
    appConfig.metaCampaignId = campaign.campaignId;
    appConfig.adSpend = campaign.budget;
    
    return campaign;
    
  } catch (error) {
    console.error('❌ Meta Ads launch failed:', error.message);
    console.error('   App will be deployed without ads');
    return null;
  }
}

// Add to your deployment function:
// const metaCampaign = await launchMetaAds(appConfig);
`;

async function main() {
  console.log('Meta Ads Integration Helper\n');
  
  const deploymentFile = path.join(__dirname, 'app-deployment-automation.js');
  
  try {
    // Check if deployment file exists
    await fs.access(deploymentFile);
    
    console.log('✅ Found app-deployment-automation.js');
    console.log('\nAdd this code to integrate Meta Ads:\n');
    console.log(INTEGRATION_CODE);
    console.log('\nExample app config with ads enabled:');
    console.log(JSON.stringify({
      appName: 'My App',
      appType: 'gaming',
      storeUrl: 'https://apps.apple.com/app/myapp',
      marketingDescription: 'The best app ever!',
      enableAds: true,
      adBudget: 100,
      metaAppId: '1234567890'
    }, null, 2));
    
  } catch (error) {
    console.log('ℹ️  app-deployment-automation.js not found');
    console.log('   Create it first, then run this again for integration code');
  }
}

main();
