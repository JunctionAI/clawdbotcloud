#!/usr/bin/env node
/**
 * Relationship CRM
 * Track people, conversations, follow-ups
 */

import fs from 'fs';
import Supermemory from 'supermemory';

// Load config
const CREDS = JSON.parse(fs.readFileSync('supermemory-credentials.json', 'utf8'));
process.env.SUPERMEMORY_API_KEY = CREDS.apiKey;
const sm = new Supermemory();

// People database
const PEOPLE = {
  'Jakob': {
    name: 'Jakob',
    relationship: 'First Clawdbot client',
    company: 'Unknown',
    email: 'Unknown',
    lastContact: '2026-01-30',
    nextAction: 'Setup meeting (6:45pm Feb 3)',
    tags: ['client', 'clawdbot', 'first-client'],
    notes: 'Important - first revenue from Clawdbot services',
    priority: 'HIGH'
  },
  'Elliott': {
    name: 'Elliott',
    relationship: 'Connection',
    lastContact: 'Unknown',
    tags: ['network'],
    priority: 'MEDIUM'
  },
  'Andi Garnett': {
    name: 'Andi Garnett',
    relationship: 'TWG Discovery Call Contact',
    company: 'The Web Guys',
    project: 'TWG Klaviyo Project',
    lastContact: 'Unknown',
    nextAction: 'Awaiting discovery call response',
    tags: ['client-prospect', 'twg', 'klaviyo'],
    priority: 'HIGH'
  },
  'Ella': {
    name: 'Ella',
    relationship: 'Connection',
    lastContact: 'Unknown',
    tags: ['network'],
    priority: 'MEDIUM'
  },
  'PG Chairman': {
    name: 'PG Investments Chairman',
    relationship: 'Potential employer/partner',
    company: 'PG Investments',
    meeting: 'Feb 5, 2026 9am (breakfast)',
    value: '$150k+ marketing role potential',
    nextAction: 'Meeting prep + research complete',
    tags: ['critical', 'pg-investments', 'strategic', 'high-net-worth'],
    notes: 'This is the bedrock path - chose over setupclaw.com. High-tier network access. Path to $500k+ in 2-3 years.',
    priority: 'CRITICAL'
  },
  'Will': {
    name: 'Will',
    relationship: 'Friend',
    meeting: 'Feb 4, 2026 11am @ B:HIVE Smales Farm',
    lastContact: 'Unknown',
    tags: ['friend', 'catch-up'],
    priority: 'MEDIUM'
  },
  'Rich': {
    name: 'Rich',
    relationship: 'Friend',
    company: 'PureSEO',
    meeting: 'Feb 4, 2026 11:30pm @ PureSEO Polaroid',
    lastContact: 'Unknown',
    tags: ['friend', 'catch-up'],
    priority: 'MEDIUM'
  },
  'Sian': {
    name: 'Sian',
    relationship: 'Personal',
    meeting: 'Feb 7, 2026 7:30pm @ Deadshot',
    lastContact: 'Unknown',
    tags: ['personal'],
    priority: 'MEDIUM'
  },
  'DBH Accounts': {
    name: 'Deep Blue Health Accounts Team',
    email: 'accounts@dbh.co.nz',
    relationship: 'Client (recurring)',
    company: 'Deep Blue Health',
    project: 'DBH Base Income ($52k/year)',
    lastContact: 'Unknown',
    nextAction: 'Chase $9,944 in overdue invoices (URGENT)',
    tags: ['client', 'dbh', 'base-income', 'recurring'],
    notes: '8 overdue invoices, oldest from Nov 3. Critical for cash flow.',
    priority: 'URGENT'
  }
};

// Get follow-ups
function getFollowUps() {
  const now = new Date();
  const followUps = [];
  
  for (const [key, person] of Object.entries(PEOPLE)) {
    if (person.nextAction) {
      followUps.push({
        name: person.name,
        action: person.nextAction,
        priority: person.priority,
        relationship: person.relationship
      });
    }
    
    // Check for upcoming meetings
    if (person.meeting) {
      followUps.push({
        name: person.name,
        action: `Meeting: ${person.meeting}`,
        priority: person.priority,
        relationship: person.relationship
      });
    }
  }
  
  return followUps.sort((a, b) => {
    const priorityOrder = { CRITICAL: 0, URGENT: 1, HIGH: 2, MEDIUM: 3, LOW: 4 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}

// Sync to Supermemory
async function syncToSupermemory() {
  const today = new Date().toLocaleDateString('en-NZ', {
    timeZone: 'Pacific/Auckland',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  for (const [key, person] of Object.entries(PEOPLE)) {
    const content = `Tom's relationship with ${person.name} (${person.relationship}): ${person.company ? `Company: ${person.company}. ` : ''}${person.notes || ''} ${person.nextAction ? `Next action: ${person.nextAction}.` : ''} ${person.value ? `Value: ${person.value}.` : ''} Priority: ${person.priority}. Tags: ${person.tags.join(', ')}. Last contact: ${person.lastContact || 'unknown'}.`;
    
    try {
      await sm.add({
        content,
        containerTag: CREDS.containerTag
      });
    } catch (err) {
      console.error(`Failed to sync ${person.name}:`, err.message);
    }
  }
}

// Main
async function main() {
  console.log('👥  RELATIONSHIP CRM\n');
  
  // Show follow-ups
  const followUps = getFollowUps();
  if (followUps.length > 0) {
    console.log('📋  ACTION ITEMS & FOLLOW-UPS:\n');
    followUps.forEach(f => {
      console.log(`[${f.priority}] ${f.name} (${f.relationship})`);
      console.log(`   ${f.action}\n`);
    });
  }
  
  // Show all contacts
  console.log('📇  ALL CONTACTS:\n');
  const sorted = Object.entries(PEOPLE).sort((a, b) => {
    const priorityOrder = { CRITICAL: 0, URGENT: 1, HIGH: 2, MEDIUM: 3, LOW: 4 };
    return priorityOrder[a[1].priority] - priorityOrder[b[1].priority];
  });
  
  sorted.forEach(([key, person]) => {
    console.log(`${person.name} [${person.priority}]`);
    console.log(`   ${person.relationship}`);
    if (person.company) console.log(`   Company: ${person.company}`);
    if (person.email) console.log(`   Email: ${person.email}`);
    if (person.nextAction) console.log(`   Next: ${person.nextAction}`);
    console.log(`   Tags: ${person.tags.join(', ')}`);
    console.log('');
  });
  
  // Sync to Supermemory
  if (process.argv.includes('--sync')) {
    console.log('🔄 Syncing to Supermemory...');
    await syncToSupermemory();
    console.log('✅ Synced\n');
  }
}

main().catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});

export { PEOPLE, getFollowUps };
