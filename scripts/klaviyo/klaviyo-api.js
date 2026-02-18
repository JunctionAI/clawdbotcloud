/**
 * Klaviyo API Integration
 * Pulls campaign metrics for analysis and optimization
 * 
 * Usage:
 *   node scripts/klaviyo/klaviyo-api.js campaigns --days=30
 *   node scripts/klaviyo/klaviyo-api.js metrics --campaign-id=abc123
 *   node scripts/klaviyo/klaviyo-api.js export --output=data/campaigns.json
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Load API key from env or credentials file
const KLAVIYO_API_KEY = process.env.KLAVIYO_API_KEY || loadApiKey();

function loadApiKey() {
  const credPath = path.join(__dirname, '../../klaviyo-credentials.json');
  if (fs.existsSync(credPath)) {
    const creds = JSON.parse(fs.readFileSync(credPath, 'utf8'));
    return creds.apiKey;
  }
  return null;
}

// Klaviyo API v2024-10-15 (latest revision)
const API_BASE = 'https://a.klaviyo.com/api';
const API_REVISION = '2024-10-15';

async function klaviyoRequest(endpoint, method = 'GET', body = null) {
  if (!KLAVIYO_API_KEY) {
    console.error('❌ No Klaviyo API key found.');
    console.error('Set KLAVIYO_API_KEY env var or create klaviyo-credentials.json');
    process.exit(1);
  }

  return new Promise((resolve, reject) => {
    const url = new URL(`${API_BASE}${endpoint}`);
    const options = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Authorization': `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
        'revision': API_REVISION,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });

    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

// Get campaigns (email)
async function getCampaigns(days = 30) {
  const since = new Date();
  since.setDate(since.getDate() - days);
  
  const endpoint = `/campaigns/?filter=equals(messages.channel,'email')&sort=-send_time`;
  const response = await klaviyoRequest(endpoint);
  
  if (response.status !== 200) {
    console.error('Error fetching campaigns:', response.data);
    return [];
  }
  
  return response.data.data || [];
}

// Get campaign metrics
async function getCampaignMetrics(campaignId) {
  // Get campaign details first
  const detailEndpoint = `/campaigns/${campaignId}/`;
  const detail = await klaviyoRequest(detailEndpoint);
  
  // Get metrics via campaign-values endpoint
  const metricsEndpoint = `/campaign-values-reports/`;
  const metricsBody = {
    data: {
      type: 'campaign-values-report',
      attributes: {
        statistics: ['opens', 'clicks', 'unique_opens', 'unique_clicks', 'recipients', 'bounces', 'unsubscribes'],
        timeframe: { key: 'last_30_days' },
        conversion_metric_id: null
      },
      relationships: {
        campaigns: {
          data: [{ type: 'campaign', id: campaignId }]
        }
      }
    }
  };
  
  const metrics = await klaviyoRequest(metricsEndpoint, 'POST', metricsBody);
  
  return {
    campaign: detail.data?.data || {},
    metrics: metrics.data?.data || {}
  };
}

// Get all campaigns with metrics (for analysis)
async function exportCampaignsWithMetrics(days = 30, outputPath = null) {
  console.log(`📊 Fetching campaigns from last ${days} days...`);
  
  const campaigns = await getCampaigns(days);
  console.log(`Found ${campaigns.length} campaigns`);
  
  const results = [];
  
  for (const campaign of campaigns) {
    const name = campaign.attributes?.name || 'Unknown';
    const sendTime = campaign.attributes?.send_time;
    const status = campaign.attributes?.status;
    
    // Basic campaign info
    const record = {
      id: campaign.id,
      name: name,
      subject: campaign.attributes?.message?.subject || '',
      preview_text: campaign.attributes?.message?.preview_text || '',
      send_time: sendTime,
      status: status,
      // Metrics will be added below
      recipients: 0,
      opens: 0,
      unique_opens: 0,
      clicks: 0,
      unique_clicks: 0,
      open_rate: 0,
      click_rate: 0
    };
    
    results.push(record);
    process.stdout.write('.');
  }
  
  console.log('\n✅ Export complete');
  
  if (outputPath) {
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
    console.log(`📁 Saved to ${outputPath}`);
  }
  
  return results;
}

// CLI handling
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  const getArg = (name) => {
    const arg = args.find(a => a.startsWith(`--${name}=`));
    return arg ? arg.split('=')[1] : null;
  };
  
  switch (command) {
    case 'campaigns':
      const days = parseInt(getArg('days') || '30');
      const campaigns = await getCampaigns(days);
      console.log(JSON.stringify(campaigns, null, 2));
      break;
      
    case 'metrics':
      const campaignId = getArg('campaign-id');
      if (!campaignId) {
        console.error('Usage: node klaviyo-api.js metrics --campaign-id=xxx');
        process.exit(1);
      }
      const metrics = await getCampaignMetrics(campaignId);
      console.log(JSON.stringify(metrics, null, 2));
      break;
      
    case 'export':
      const exportDays = parseInt(getArg('days') || '30');
      const output = getArg('output') || 'data/klaviyo-campaigns.json';
      await exportCampaignsWithMetrics(exportDays, output);
      break;
      
    case 'test':
      console.log('Testing Klaviyo connection...');
      const testResponse = await klaviyoRequest('/accounts/');
      if (testResponse.status === 200) {
        console.log('✅ Connected to Klaviyo!');
        console.log('Account:', testResponse.data.data?.[0]?.attributes?.contact_information?.organization_name);
      } else {
        console.log('❌ Connection failed:', testResponse.data);
      }
      break;
      
    default:
      console.log(`
Klaviyo API Integration

Commands:
  campaigns [--days=30]              List recent campaigns
  metrics --campaign-id=xxx          Get metrics for specific campaign
  export [--days=30] [--output=path] Export campaigns with metrics to JSON
  test                               Test API connection

Setup:
  1. Get your Klaviyo Private API Key from Settings > API Keys
  2. Either:
     - Set KLAVIYO_API_KEY environment variable
     - Create klaviyo-credentials.json with: {"apiKey": "your-key"}
`);
  }
}

main().catch(console.error);
