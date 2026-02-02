#!/usr/bin/env node
/**
 * Network Monetization System - Test with Sample Data
 * Demonstrates the system with realistic sample data
 */

import fs from 'fs';
import path from 'path';

// Sample LinkedIn connections
const SAMPLE_CONNECTIONS = {
  connections: [
    {
      name: 'Sarah Chen',
      title: 'VP Marketing at CloudScale SaaS',
      company: 'CloudScale SaaS',
      industry: 'SaaS',
      connectionCount: 750,
      lastContact: '2025-11-20',
      relationshipStrength: 'MEDIUM',
      email: 'sarah.chen@cloudscale.io',
      notes: 'Met at SaaStr conference 2024',
      jobChangeDate: '2026-01-15', // Recent job change!
      previousTitle: 'Director of Marketing at StartupX'
    },
    {
      name: 'Marcus Johnson',
      title: 'CEO at FinTech Innovations',
      company: 'FinTech Innovations',
      industry: 'Fintech',
      connectionCount: 1200,
      lastContact: '2025-12-10',
      relationshipStrength: 'STRONG',
      email: 'marcus@fintechinno.com',
      notes: 'Founded company after $5M seed round',
      mutualConnections: ['Tom Hall-Taylor', 'Rich']
    },
    {
      name: 'Emily Rodriguez',
      title: 'CMO at E-commerce Giant',
      company: 'E-commerce Giant',
      industry: 'E-commerce',
      connectionCount: 2500,
      lastContact: '2026-01-05',
      relationshipStrength: 'STRONG',
      email: 'emily.r@ecommerce.com',
      notes: 'Looking for growth hacking expertise'
    },
    {
      name: 'David Kim',
      title: 'Founder & CTO at AI Startup',
      company: 'AI Startup',
      industry: 'AI/ML',
      connectionCount: 450,
      lastContact: '2025-10-15',
      relationshipStrength: 'WEAK',
      email: 'david@aistartup.ai',
      notes: 'Just raised Series A ($10M)',
      jobChangeDate: '2025-12-01',
      previousTitle: 'Senior Engineer at Google'
    },
    {
      name: 'Jennifer Lee',
      title: 'VP Growth at Shopify',
      company: 'Shopify',
      industry: 'E-commerce Platform',
      connectionCount: 3000,
      lastContact: '2025-09-20',
      relationshipStrength: 'MEDIUM',
      email: 'jennifer.lee@shopify.com',
      notes: 'Influential in e-commerce space'
    },
    {
      name: 'Alex Thompson',
      title: 'Marketing Director at Agency Co',
      company: 'Agency Co',
      industry: 'Marketing Agency',
      connectionCount: 600,
      lastContact: '2026-01-20',
      relationshipStrength: 'STRONG',
      email: 'alex@agencyco.com',
      notes: 'Potential partnership opportunity'
    },
    {
      name: 'Lisa Wang',
      title: 'Investor at Venture Partners',
      company: 'Venture Partners',
      industry: 'Venture Capital',
      connectionCount: 5000,
      lastContact: '2025-08-15',
      relationshipStrength: 'WEAK',
      email: 'lisa@venturepartners.com',
      notes: 'High-net-worth, great network'
    },
    {
      name: 'Robert Brown',
      title: 'CEO at Local Business',
      company: 'Local Business',
      industry: 'Retail',
      connectionCount: 200,
      lastContact: '2025-11-30',
      relationshipStrength: 'MEDIUM',
      email: 'robert@localbusiness.com',
      notes: 'Looking for marketing help'
    }
  ]
};

// Sample referral
const SAMPLE_REFERRAL = {
  referrerName: 'Jakob',
  referrerEmail: 'jakob@example.com',
  clientName: 'Tech Startup NZ',
  clientEmail: 'ceo@techstartup.nz',
  clientCompany: 'Tech Startup NZ',
  serviceType: 'consulting',
  estimatedValue: 15000,
  notes: 'Looking for growth marketing and automation'
};

// Setup test data
function setupTestData() {
  console.log('🧪 NETWORK MONETIZATION SYSTEM - TEST MODE\n');
  console.log('═══════════════════════════════════════════════════════\n');
  console.log('Setting up sample data...\n');
  
  // Ensure directories exist
  const dirs = ['data/linkedin', 'data/opportunities', 'data/relationships', 'data/referrals'];
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
  
  // Write sample LinkedIn connections
  const connectionsPath = 'data/linkedin/connections.json';
  fs.writeFileSync(connectionsPath, JSON.stringify(SAMPLE_CONNECTIONS, null, 2));
  console.log(`✅ Created sample LinkedIn connections (${SAMPLE_CONNECTIONS.connections.length} connections)`);
  console.log(`   → ${connectionsPath}\n`);
  
  console.log('📊 Sample Connections Include:\n');
  SAMPLE_CONNECTIONS.connections.forEach((conn, i) => {
    console.log(`${i + 1}. ${conn.name} - ${conn.title}`);
    if (conn.jobChangeDate) {
      console.log(`   🔥 NEW ROLE: ${conn.previousTitle} → ${conn.title}`);
    }
  });
  
  console.log('\n═══════════════════════════════════════════════════════\n');
  console.log('✅ Test data setup complete!\n');
  console.log('📝 Now run the system:\n');
  console.log('1. LinkedIn Intelligence:');
  console.log('   node scripts/linkedin-intelligence.js\n');
  console.log('2. Opportunity Scanner:');
  console.log('   node scripts/opportunity-scanner.js\n');
  console.log('3. Enhanced CRM:');
  console.log('   node scripts/relationship-crm-enhanced.js\n');
  console.log('4. Add sample referral:');
  console.log('   node scripts/referral-system.js add \\');
  console.log(`     --referrer="${SAMPLE_REFERRAL.referrerName}" \\`);
  console.log(`     --referrer-email="${SAMPLE_REFERRAL.referrerEmail}" \\`);
  console.log(`     --client="${SAMPLE_REFERRAL.clientName}" \\`);
  console.log(`     --client-email="${SAMPLE_REFERRAL.clientEmail}" \\`);
  console.log(`     --company="${SAMPLE_REFERRAL.clientCompany}" \\`);
  console.log(`     --service="${SAMPLE_REFERRAL.serviceType}" \\`);
  console.log(`     --value=${SAMPLE_REFERRAL.estimatedValue}\n`);
  console.log('5. View Master Dashboard:');
  console.log('   node scripts/network-monetization-dashboard.js\n');
  console.log('═══════════════════════════════════════════════════════\n');
}

// Run full demo
async function runFullDemo() {
  console.log('🎬 RUNNING FULL SYSTEM DEMO\n');
  console.log('═══════════════════════════════════════════════════════\n');
  
  // Setup test data
  setupTestData();
  
  console.log('\n⏳ Running all analysis scripts...\n');
  
  // Import and run scripts
  try {
    console.log('1️⃣ LinkedIn Intelligence Analysis...\n');
    const { analyzeNetwork } = await import('./linkedin-intelligence.js');
    await analyzeNetwork();
    
    console.log('\n2️⃣ Opportunity Scanner...\n');
    const { scanOpportunities } = await import('./opportunity-scanner.js');
    await scanOpportunities();
    
    console.log('\n3️⃣ Enhanced CRM Analysis...\n');
    const { runEnhancedCRM } = await import('./relationship-crm-enhanced.js');
    await runEnhancedCRM();
    
    console.log('\n4️⃣ Referral System Dashboard...\n');
    const { showDashboard: showReferralDashboard } = await import('./referral-system.js');
    await showReferralDashboard();
    
    console.log('\n5️⃣ Master Dashboard...\n');
    const { showDashboard } = await import('./network-monetization-dashboard.js');
    await showDashboard();
    
    console.log('═══════════════════════════════════════════════════════');
    console.log('✅ DEMO COMPLETE!\n');
    console.log('💡 This demo used sample data. To use with your real network:');
    console.log('   1. Export your LinkedIn connections');
    console.log('   2. Replace data/linkedin/connections.json with your data');
    console.log('   3. Run the scripts again\n');
    console.log('💰 GOAL: $5k-20k/month from network-driven opportunities\n');
    
  } catch (err) {
    console.error('\n❌ Demo error:', err.message);
    console.log('\n💡 Try running scripts individually to debug\n');
  }
}

// Main
const args = process.argv.slice(2);
if (args.includes('--demo')) {
  runFullDemo();
} else {
  setupTestData();
}
