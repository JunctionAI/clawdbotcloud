#!/usr/bin/env node
/**
 * Referral Tracking System
 * Incentivize referrals, track sources, auto-thank and reward
 * 
 * OBJECTIVE: Turn network into revenue engine via referrals
 * MODEL: Give 10%, get infinite upside (referrer gets 10% commission)
 * 
 * FEATURES:
 * - Track referral sources
 * - Calculate commissions (10% of deal value)
 * - Auto-thank referrers
 * - Leaderboard (who's sending the most/best referrals?)
 * - Incentive tiers (rewards for top referrers)
 */

import fs from 'fs';
import path from 'path';

// Data paths
const DATA_DIR = 'data/referrals';
const REFERRALS_FILE = path.join(DATA_DIR, 'referrals.json');
const REFERRERS_FILE = path.join(DATA_DIR, 'referrers.json');
const PAYMENTS_FILE = path.join(DATA_DIR, 'commission-payments.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize files
function initializeFiles() {
  if (!fs.existsSync(REFERRALS_FILE)) {
    fs.writeFileSync(REFERRALS_FILE, JSON.stringify({ referrals: [] }, null, 2));
  }
  if (!fs.existsSync(REFERRERS_FILE)) {
    fs.writeFileSync(REFERRERS_FILE, JSON.stringify({ referrers: {} }, null, 2));
  }
  if (!fs.existsSync(PAYMENTS_FILE)) {
    fs.writeFileSync(PAYMENTS_FILE, JSON.stringify({ payments: [] }, null, 2));
  }
}

// Referral status: LEAD → QUALIFIED → PROPOSAL → WON → PAID_OUT
const REFERRAL_STATUS = {
  LEAD: 'Initial referral received',
  QUALIFIED: 'Qualified as potential client',
  PROPOSAL: 'Proposal sent',
  WON: 'Deal closed - commission owed',
  PAID_OUT: 'Commission paid to referrer',
  LOST: 'Deal lost - no commission'
};

// Add new referral
function addReferral(data) {
  initializeFiles();
  
  const referralsData = JSON.parse(fs.readFileSync(REFERRALS_FILE, 'utf8'));
  const referrersData = JSON.parse(fs.readFileSync(REFERRERS_FILE, 'utf8'));
  
  const referral = {
    id: `ref_${Date.now()}`,
    referrerName: data.referrerName,
    referrerEmail: data.referrerEmail,
    clientName: data.clientName,
    clientEmail: data.clientEmail,
    clientCompany: data.clientCompany,
    serviceType: data.serviceType, // consulting, clawdbot-setup, speaking, etc.
    estimatedValue: data.estimatedValue,
    commissionRate: data.commissionRate || 0.10, // Default 10%
    status: 'LEAD',
    dateReceived: new Date().toISOString(),
    notes: data.notes || '',
    history: [
      {
        date: new Date().toISOString(),
        status: 'LEAD',
        notes: 'Referral received'
      }
    ]
  };
  
  referralsData.referrals.push(referral);
  fs.writeFileSync(REFERRALS_FILE, JSON.stringify(referralsData, null, 2));
  
  // Update referrer stats
  if (!referrersData.referrers[data.referrerName]) {
    referrersData.referrers[data.referrerName] = {
      name: data.referrerName,
      email: data.referrerEmail,
      totalReferrals: 0,
      qualifiedReferrals: 0,
      wonReferrals: 0,
      totalCommissionsEarned: 0,
      totalCommissionsPaid: 0,
      referrals: []
    };
  }
  
  referrersData.referrers[data.referrerName].totalReferrals++;
  referrersData.referrers[data.referrerName].referrals.push(referral.id);
  fs.writeFileSync(REFERRERS_FILE, JSON.stringify(referrersData, null, 2));
  
  console.log(`✅ Added referral: ${data.clientName} referred by ${data.referrerName}`);
  console.log(`   Estimated value: $${data.estimatedValue}`);
  console.log(`   Commission (10%): $${data.estimatedValue * 0.10}\n`);
  
  // Auto-thank referrer
  sendThankYouMessage(data.referrerName, data.referrerEmail, data.clientName);
  
  return referral;
}

// Update referral status
function updateReferralStatus(referralId, newStatus, notes) {
  initializeFiles();
  
  const referralsData = JSON.parse(fs.readFileSync(REFERRALS_FILE, 'utf8'));
  const referrersData = JSON.parse(fs.readFileSync(REFERRERS_FILE, 'utf8'));
  
  const referral = referralsData.referrals.find(r => r.id === referralId);
  
  if (!referral) {
    console.error(`❌ Referral ${referralId} not found`);
    return;
  }
  
  const oldStatus = referral.status;
  referral.status = newStatus;
  referral.history.push({
    date: new Date().toISOString(),
    status: newStatus,
    notes: notes || ''
  });
  
  // Update referrer stats
  const referrer = referrersData.referrers[referral.referrerName];
  
  if (newStatus === 'QUALIFIED' && oldStatus === 'LEAD') {
    referrer.qualifiedReferrals++;
  }
  
  if (newStatus === 'WON') {
    referrer.wonReferrals++;
    const commission = referral.estimatedValue * referral.commissionRate;
    referrer.totalCommissionsEarned += commission;
    referral.commissionOwed = commission;
    referral.dateWon = new Date().toISOString();
    
    console.log(`🎉 Referral WON! ${referral.clientName}`);
    console.log(`   Value: $${referral.estimatedValue}`);
    console.log(`   Commission owed to ${referral.referrerName}: $${commission}\n`);
    
    // Notify referrer
    sendWonNotification(referral);
  }
  
  fs.writeFileSync(REFERRALS_FILE, JSON.stringify(referralsData, null, 2));
  fs.writeFileSync(REFERRERS_FILE, JSON.stringify(referrersData, null, 2));
  
  console.log(`✅ Updated ${referralId} from ${oldStatus} → ${newStatus}`);
}

// Pay commission
function payCommission(referralId, paymentMethod, transactionId) {
  initializeFiles();
  
  const referralsData = JSON.parse(fs.readFileSync(REFERRALS_FILE, 'utf8'));
  const referrersData = JSON.parse(fs.readFileSync(REFERRERS_FILE, 'utf8'));
  const paymentsData = JSON.parse(fs.readFileSync(PAYMENTS_FILE, 'utf8'));
  
  const referral = referralsData.referrals.find(r => r.id === referralId);
  
  if (!referral) {
    console.error(`❌ Referral ${referralId} not found`);
    return;
  }
  
  if (referral.status !== 'WON') {
    console.error(`❌ Cannot pay commission - referral status is ${referral.status}, must be WON`);
    return;
  }
  
  const payment = {
    referralId,
    referrerName: referral.referrerName,
    referrerEmail: referral.referrerEmail,
    amount: referral.commissionOwed,
    paymentMethod,
    transactionId,
    datePaid: new Date().toISOString()
  };
  
  paymentsData.payments.push(payment);
  referral.status = 'PAID_OUT';
  referral.commissionPaid = referral.commissionOwed;
  referral.datePaid = new Date().toISOString();
  
  // Update referrer
  const referrer = referrersData.referrers[referral.referrerName];
  referrer.totalCommissionsPaid += referral.commissionOwed;
  
  fs.writeFileSync(REFERRALS_FILE, JSON.stringify(referralsData, null, 2));
  fs.writeFileSync(REFERRERS_FILE, JSON.stringify(referrersData, null, 2));
  fs.writeFileSync(PAYMENTS_FILE, JSON.stringify(paymentsData, null, 2));
  
  console.log(`✅ Paid $${referral.commissionOwed} to ${referral.referrerName}`);
  console.log(`   Method: ${paymentMethod}`);
  console.log(`   Transaction: ${transactionId}\n`);
  
  // Send payment confirmation
  sendPaymentConfirmation(referral, payment);
}

// Auto-thank referrer
function sendThankYouMessage(referrerName, referrerEmail, clientName) {
  const message = `
Hey ${referrerName},

Thanks so much for referring ${clientName} to me! 🙏

I've reached out to them and we're setting up a call. I'll keep you posted on how it goes.

Just a reminder: If this turns into a project, you'll get 10% of the deal value as a thank you. Easy money for you, and it helps me grow.

Appreciate you thinking of me!

Best,
Tom
  `.trim();
  
  console.log('📧 THANK YOU MESSAGE (send this to referrer):\n');
  console.log(`To: ${referrerEmail}`);
  console.log(`Subject: Thanks for the referral! 🙏\n`);
  console.log(message);
  console.log('\n---\n');
}

// Notify referrer of won deal
function sendWonNotification(referral) {
  const commission = referral.commissionOwed;
  const message = `
Hey ${referral.referrerName},

Great news! 🎉

The referral you sent me (${referral.clientName}) just closed. We're moving forward with a $${referral.estimatedValue} project.

Per our agreement, you're getting 10% = **$${commission}**.

I'll send payment within 7 days via [Wise/PayPal/Bank transfer - your preference].

Thanks again for the intro - this is exactly the kind of partnership I love. Keep 'em coming!

Best,
Tom
  `.trim();
  
  console.log('🎉 WON NOTIFICATION (send this to referrer):\n');
  console.log(`To: ${referral.referrerEmail}`);
  console.log(`Subject: Referral closed! $${commission} commission coming your way 💰\n`);
  console.log(message);
  console.log('\n---\n');
}

// Send payment confirmation
function sendPaymentConfirmation(referral, payment) {
  const message = `
Hey ${referral.referrerName},

Payment sent! 💸

I just sent you $${payment.amount} for referring ${referral.clientName}.

Method: ${payment.paymentMethod}
Transaction ID: ${payment.transactionId}

Thanks again for the referral. Looking forward to sending you more commissions in the future!

Best,
Tom
  `.trim();
  
  console.log('💸 PAYMENT CONFIRMATION (send this to referrer):\n');
  console.log(`To: ${referral.referrerEmail}`);
  console.log(`Subject: Payment sent - $${payment.amount} 💸\n`);
  console.log(message);
  console.log('\n---\n');
}

// Referrer leaderboard
function showLeaderboard() {
  initializeFiles();
  
  const referrersData = JSON.parse(fs.readFileSync(REFERRERS_FILE, 'utf8'));
  const referrers = Object.values(referrersData.referrers);
  
  // Sort by total commissions earned
  referrers.sort((a, b) => b.totalCommissionsEarned - a.totalCommissionsEarned);
  
  console.log('🏆 REFERRER LEADERBOARD\n');
  console.log('Rank | Name | Referrals | Won | Earned | Paid');
  console.log('-----|------|-----------|-----|--------|------');
  
  referrers.forEach((ref, i) => {
    const rank = i + 1;
    const emoji = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : '  ';
    console.log(`${emoji} ${rank}  | ${ref.name.padEnd(20)} | ${ref.totalReferrals.toString().padEnd(9)} | ${ref.wonReferrals.toString().padEnd(3)} | $${ref.totalCommissionsEarned.toString().padEnd(6)} | $${ref.totalCommissionsPaid.toString().padEnd(5)}`);
  });
  
  console.log('\n');
  
  // Top performers
  if (referrers.length > 0) {
    console.log('💎 TOP PERFORMERS:\n');
    referrers.slice(0, 3).forEach((ref, i) => {
      console.log(`${i + 1}. ${ref.name}: $${ref.totalCommissionsEarned} earned (${ref.wonReferrals} won deals)`);
    });
    console.log('\n');
  }
  
  // Incentive tiers
  console.log('🎁 INCENTIVE TIERS:\n');
  console.log('- $1,000+ earned: VIP status + bonus 5% on next referral');
  console.log('- $5,000+ earned: Exclusive partnership + 15% commission tier');
  console.log('- $10,000+ earned: Profit-sharing partner + ongoing revenue split\n');
}

// Dashboard
function showDashboard() {
  initializeFiles();
  
  const referralsData = JSON.parse(fs.readFileSync(REFERRALS_FILE, 'utf8'));
  const paymentsData = JSON.parse(fs.readFileSync(PAYMENTS_FILE, 'utf8'));
  
  const referrals = referralsData.referrals || [];
  
  // Stats
  const leads = referrals.filter(r => r.status === 'LEAD').length;
  const qualified = referrals.filter(r => r.status === 'QUALIFIED').length;
  const proposals = referrals.filter(r => r.status === 'PROPOSAL').length;
  const won = referrals.filter(r => r.status === 'WON').length;
  const paidOut = referrals.filter(r => r.status === 'PAID_OUT').length;
  const lost = referrals.filter(r => r.status === 'LOST').length;
  
  const totalCommissionsOwed = referrals
    .filter(r => r.status === 'WON')
    .reduce((sum, r) => sum + (r.commissionOwed || 0), 0);
  
  const totalCommissionsPaid = paymentsData.payments.reduce((sum, p) => sum + p.amount, 0);
  
  console.log('📊 REFERRAL SYSTEM DASHBOARD\n');
  console.log(`Total Referrals: ${referrals.length}\n`);
  
  console.log('Pipeline:');
  console.log(`  Leads: ${leads}`);
  console.log(`  Qualified: ${qualified}`);
  console.log(`  Proposals: ${proposals}`);
  console.log(`  Won: ${won}`);
  console.log(`  Paid Out: ${paidOut}`);
  console.log(`  Lost: ${lost}\n`);
  
  console.log('Financials:');
  console.log(`  Commissions Owed: $${totalCommissionsOwed}`);
  console.log(`  Commissions Paid: $${totalCommissionsPaid}`);
  console.log(`  Outstanding: $${totalCommissionsOwed}\n`);
  
  // Recent referrals
  console.log('📋 RECENT REFERRALS:\n');
  referrals.slice(-5).reverse().forEach((ref, i) => {
    console.log(`${i + 1}. [${ref.status}] ${ref.clientName} (referred by ${ref.referrerName})`);
    console.log(`   Value: $${ref.estimatedValue} | Commission: $${ref.estimatedValue * ref.commissionRate}\n`);
  });
  
  // Outstanding commissions
  const outstanding = referrals.filter(r => r.status === 'WON');
  if (outstanding.length > 0) {
    console.log('💰 COMMISSIONS TO PAY:\n');
    outstanding.forEach((ref, i) => {
      console.log(`${i + 1}. ${ref.referrerName}: $${ref.commissionOwed} for ${ref.clientName}`);
    });
    console.log('\n');
  }
}

// Main CLI
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  const command = args[0];
  
  if (command === 'add') {
    // node referral-system.js add --referrer="Name" --referrer-email="email" --client="Client Name" --client-email="email" --company="Company" --service="consulting" --value=10000
    const data = {
      referrerName: args.find(a => a.startsWith('--referrer='))?.split('=')[1],
      referrerEmail: args.find(a => a.startsWith('--referrer-email='))?.split('=')[1],
      clientName: args.find(a => a.startsWith('--client='))?.split('=')[1],
      clientEmail: args.find(a => a.startsWith('--client-email='))?.split('=')[1],
      clientCompany: args.find(a => a.startsWith('--company='))?.split('=')[1],
      serviceType: args.find(a => a.startsWith('--service='))?.split('=')[1] || 'consulting',
      estimatedValue: parseInt(args.find(a => a.startsWith('--value='))?.split('=')[1]) || 0
    };
    addReferral(data);
  } else if (command === 'update') {
    // node referral-system.js update <id> <status> [notes]
    updateReferralStatus(args[1], args[2], args.slice(3).join(' '));
  } else if (command === 'pay') {
    // node referral-system.js pay <id> <method> <transaction-id>
    payCommission(args[1], args[2], args[3]);
  } else if (command === 'leaderboard') {
    showLeaderboard();
  } else {
    // Default: show dashboard
    showDashboard();
  }
}

export { 
  addReferral, 
  updateReferralStatus, 
  payCommission, 
  showLeaderboard, 
  showDashboard 
};
