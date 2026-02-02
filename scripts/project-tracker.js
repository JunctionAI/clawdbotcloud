#!/usr/bin/env node
/**
 * Project Tracking System
 * Auto-tracks progress on active projects, updates Supermemory, alerts on milestones
 */

import fs from 'fs';
import Supermemory from 'supermemory';

// Load config
const STATE = JSON.parse(fs.readFileSync('STATE.json', 'utf8'));
const CREDS = JSON.parse(fs.readFileSync('supermemory-credentials.json', 'utf8'));

// Initialize Supermemory
process.env.SUPERMEMORY_API_KEY = CREDS.apiKey;
const sm = new Supermemory();

// Project definitions
const PROJECTS = {
  'PG': {
    name: 'PG Investments Chairman Meeting',
    priority: 'CRITICAL',
    deadline: '2026-02-05T09:00:00',
    milestones: [
      { id: 'research', name: 'Complete research', status: 'in-progress' },
      { id: 'prep', name: 'Meeting prep checklist', status: 'pending' },
      { id: 'outfit', name: 'Outfit confirmed', status: 'pending' },
      { id: 'meeting', name: 'Meeting completed', status: 'pending' }
    ],
    value: '$150k+ marketing role',
    tags: ['strategic', 'revenue', 'network']
  },
  'TWG': {
    name: 'The Web Guys - Klaviyo Project',
    priority: 'HIGH',
    milestones: [
      { id: 'discovery', name: 'Discovery call with Andi Garnett', status: 'waiting' }
    ],
    contact: 'Andi Garnett',
    tags: ['client-work', 'revenue']
  },
  'DBH': {
    name: 'Deep Blue Health',
    priority: 'HIGH',
    type: 'recurring',
    revenue: {
      target: '$52k/year',
      frequency: 'weekly',
      lastInvoice: 'INV-0137',
      overdueAmount: '$9,944'
    },
    milestones: [
      { id: 'invoice', name: 'Create weekly invoice', status: 'pending' },
      { id: 'chase-overdue', name: 'Chase overdue invoices', status: 'urgent' }
    ],
    tags: ['base-income', 'revenue']
  },
  'APPS': {
    name: 'App Portfolio (7 apps)',
    priority: 'MEDIUM',
    goal: '1 release/week, test with Meta ads',
    milestones: [
      { id: 'identify', name: 'Identify app list', status: 'pending' },
      { id: 'deploy-auto', name: 'Deployment automation', status: 'pending' },
      { id: 'marketing-auto', name: 'Marketing automation', status: 'pending' },
      { id: 'analytics', name: 'Analytics setup', status: 'pending' }
    ],
    tags: ['creation', 'upside']
  },
  'CLAWDBOT': {
    name: 'Clawdbot Services',
    priority: 'MEDIUM',
    target: '$168k/year',
    model: 'Setup services $1k-$5k/client',
    milestones: [
      { id: 'jakob', name: 'Jakob setup (first client)', status: 'in-progress' }
    ],
    tags: ['esteem', 'revenue']
  }
};

// Check project status
function checkProjects() {
  const updates = [];
  
  for (const [key, project] of Object.entries(PROJECTS)) {
    // Check deadlines
    if (project.deadline) {
      const deadline = new Date(project.deadline);
      const now = new Date();
      const hoursUntil = (deadline - now) / (1000 * 60 * 60);
      
      if (hoursUntil < 48 && hoursUntil > 0) {
        updates.push({
          project: project.name,
          alert: `⏰ DEADLINE IN ${hoursUntil.toFixed(0)} HOURS`,
          priority: project.priority
        });
      }
    }
    
    // Check urgent milestones
    const urgentMilestones = project.milestones?.filter(m => m.status === 'urgent');
    if (urgentMilestones?.length > 0) {
      updates.push({
        project: project.name,
        alert: `🚨 URGENT: ${urgentMilestones.map(m => m.name).join(', ')}`,
        priority: 'URGENT'
      });
    }
    
    // Check waiting milestones
    const waitingMilestones = project.milestones?.filter(m => m.status === 'waiting');
    if (waitingMilestones?.length > 0) {
      updates.push({
        project: project.name,
        alert: `⏳ WAITING: ${waitingMilestones.map(m => m.name).join(', ')}`,
        priority: 'NORMAL'
      });
    }
  }
  
  return updates;
}

// Update Supermemory with project status
async function syncToSupermemory() {
  const today = new Date().toLocaleDateString('en-NZ', {
    timeZone: 'Pacific/Auckland',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  for (const [key, project] of Object.entries(PROJECTS)) {
    const inProgress = project.milestones?.filter(m => m.status === 'in-progress').length || 0;
    const completed = project.milestones?.filter(m => m.status === 'completed').length || 0;
    const total = project.milestones?.length || 0;
    
    const content = `Tom's project "${project.name}" status as of ${today}: ${completed}/${total} milestones completed, ${inProgress} in progress. Priority: ${project.priority}. ${project.value ? `Value: ${project.value}.` : ''} ${project.tags.join(', ')}.`;
    
    try {
      await sm.add({
        content,
        containerTag: CREDS.containerTag
      });
    } catch (err) {
      console.error(`Failed to sync ${project.name}:`, err.message);
    }
  }
}

// Main
async function main() {
  console.log('📊 Project Tracker\n');
  
  // Check all projects
  const updates = checkProjects();
  
  if (updates.length > 0) {
    console.log('🚨 PROJECT ALERTS:\n');
    updates.forEach(u => {
      console.log(`[${u.priority}] ${u.project}`);
      console.log(`   ${u.alert}\n`);
    });
  } else {
    console.log('✅ All projects on track\n');
  }
  
  // Display project overview
  console.log('📋 PROJECT OVERVIEW:\n');
  for (const [key, project] of Object.entries(PROJECTS)) {
    const completed = project.milestones?.filter(m => m.status === 'completed').length || 0;
    const total = project.milestones?.length || 0;
    const progress = total > 0 ? `${completed}/${total}` : 'N/A';
    
    console.log(`${project.name} [${project.priority}]`);
    console.log(`   Progress: ${progress} milestones`);
    if (project.value) console.log(`   Value: ${project.value}`);
    if (project.deadline) {
      const deadline = new Date(project.deadline);
      console.log(`   Deadline: ${deadline.toLocaleDateString('en-NZ', { timeZone: 'Pacific/Auckland' })}`);
    }
    console.log('');
  }
  
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

export { PROJECTS, checkProjects };
