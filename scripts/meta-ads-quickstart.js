#!/usr/bin/env node

/**
 * META ADS QUICK START
 * Interactive CLI for launching campaigns quickly
 */

const readline = require('readline');
const { CampaignManager } = require('./meta-ads-automation.js');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function main() {
  console.log('╔════════════════════════════════════════════╗');
  console.log('║   Meta Ads Campaign Quick Launch          ║');
  console.log('╚════════════════════════════════════════════╝\n');

  try {
    // Collect campaign details
    const appName = await question('App Name: ');
    const appType = await question('App Type (gaming/productivity/ecommerce/social/health/finance/default): ');
    const targetUrl = await question('App Store/Play Store URL: ');
    const description = await question('App Description (short): ');
    const budget = await question('Daily Budget ($50-500): ');

    console.log('\n📋 Campaign Configuration:');
    console.log(`   App: ${appName}`);
    console.log(`   Type: ${appType}`);
    console.log(`   URL: ${targetUrl}`);
    console.log(`   Budget: $${budget}/day`);
    console.log('');

    const confirm = await question('Launch campaign? (yes/no): ');
    
    if (confirm.toLowerCase() !== 'yes' && confirm.toLowerCase() !== 'y') {
      console.log('❌ Campaign launch cancelled');
      rl.close();
      return;
    }

    console.log('\n🚀 Launching campaign...\n');

    const manager = new CampaignManager();
    const campaign = await manager.launchCampaign({
      appName,
      appType: appType || 'default',
      targetUrl,
      description,
      budget: parseFloat(budget) || 100
    });

    console.log('\n✅ Campaign launched successfully!');
    console.log(`\nCampaign ID: ${campaign.campaignId}`);
    console.log(`Ad Sets Created: ${campaign.adSets.length}`);
    console.log(`Ads Created: ${campaign.adSets.reduce((sum, as) => sum + as.ads.length, 0)}`);
    console.log('\n📊 Monitor performance:');
    console.log('   node scripts/meta-ads-automation.js monitor');
    console.log('\n📋 Generate report:');
    console.log('   node scripts/meta-ads-automation.js report');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
  } finally {
    rl.close();
  }
}

main();
