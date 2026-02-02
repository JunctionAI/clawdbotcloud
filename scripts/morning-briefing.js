#!/usr/bin/env node
/**
 * Morning Briefing System
 * Comprehensive automated briefing: calendar, financials, priorities, alerts
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';

const execAsync = promisify(exec);

// Get current date/time in NZ
function getNZDateTime() {
  const now = new Date();
  const nzDate = now.toLocaleString('en-NZ', { 
    timeZone: 'Pacific/Auckland',
    dateStyle: 'full',
    timeStyle: 'short'
  });
  const dayName = now.toLocaleDateString('en-NZ', { 
    timeZone: 'Pacific/Auckland',
    weekday: 'long'
  });
  return { nzDate, dayName, timestamp: now };
}

// Get calendar events (next 48h)
async function getCalendarEvents() {
  try {
    const { stdout } = await execAsync('node scripts/outlook-calendar.js list --days=2');
    // Parse the output to extract events
    // Note: The script output needs to be adjusted +1 day due to the -1 day offset
    return stdout;
  } catch (err) {
    return '❌ Failed to fetch calendar';
  }
}

// Get financial snapshot
async function getFinancialSnapshot() {
  try {
    const { stdout } = await execAsync('node scripts/financial-dashboard.js');
    return stdout;
  } catch (err) {
    return '❌ Failed to fetch financials';
  }
}

// Get email intelligence
async function getEmailIntelligence() {
  try {
    // Check if email intelligence is set up
    if (!fs.existsSync('gmail-token.json')) {
      return '⚠️  Email intelligence not configured (run: node scripts/gmail-setup.js)';
    }
    
    // Run email monitoring
    const { stdout } = await execAsync('node scripts/email-intelligence.js monitor');
    return stdout;
  } catch (err) {
    return '❌ Failed to fetch emails: ' + err.message;
  }
}

// Get intelligence insights from pipeline
async function getIntelligenceInsights() {
  try {
    // Check if insights cache exists
    const insightsPath = 'cache/morning-insights.txt';
    if (fs.existsSync(insightsPath)) {
      return fs.readFileSync(insightsPath, 'utf8');
    }
    
    // Try to generate fresh insights
    const { stdout } = await execAsync('node scripts/info-extraction-pipeline.js insights 24');
    return stdout;
  } catch (err) {
    return '⚠️  No recent insights (run: node scripts/info-extraction-pipeline.js run)';
  }
}

// Check for critical reminders from HEARTBEAT.md
function getCriticalReminders() {
  try {
    const heartbeat = fs.readFileSync('HEARTBEAT.md', 'utf8');
    const today = new Date().toLocaleDateString('en-NZ', { 
      timeZone: 'Pacific/Auckland',
      weekday: 'long'
    });
    
    // Extract reminders for today
    const reminders = [];
    
    if (heartbeat.includes('Baycorp') && today === 'Monday') {
      reminders.push('⏰ 9am: Baycorp WiFi Setup');
    }
    
    if (heartbeat.includes('XERO INVOICE')) {
      const lines = heartbeat.split('\n');
      for (const line of lines) {
        if (line.includes('XERO INVOICE') && line.includes(today.slice(0, 3))) {
          reminders.push('⏰ FIRST THING: Sort Xero invoice for DBH (timesheet/hours)');
          break;
        }
      }
    }
    
    if (heartbeat.includes('PG Chairman') && heartbeat.includes('morning') && today === 'Wednesday') {
      reminders.push('⏰ PG Chairman meeting prep check (notes ready? outfit sorted?)');
    }
    
    return reminders;
  } catch (err) {
    return [];
  }
}

// Get priorities from HEARTBEAT.md and STATE.json
function getPriorities() {
  try {
    const state = JSON.parse(fs.readFileSync('STATE.json', 'utf8'));
    const activeProjects = state.activeProjects || [];
    const pendingItems = state.pendingItems || [];
    
    // Extract top 3 priorities
    const priorities = [];
    
    // Check for PG meeting this week
    const pgProject = activeProjects.find(p => p.includes('PG'));
    if (pgProject) {
      priorities.push(`🎯 PRIMARY: ${pgProject}`);
    }
    
    // Add other pending items
    pendingItems.slice(0, 2).forEach(item => {
      if (!item.includes('PG')) {
        priorities.push(item);
      }
    });
    
    return priorities;
  } catch (err) {
    return ['❌ Failed to load priorities'];
  }
}

// Main briefing
async function generateBriefing() {
  const { nzDate, dayName } = getNZDateTime();
  
  console.log('═'.repeat(80));
  console.log(`🌅  MORNING BRIEFING - ${dayName.toUpperCase()}`);
  console.log(`📅  ${nzDate}`);
  console.log('═'.repeat(80));
  console.log('');
  
  // Critical reminders
  const reminders = getCriticalReminders();
  if (reminders.length > 0) {
    console.log('🔔  CRITICAL REMINDERS');
    console.log('─'.repeat(80));
    reminders.forEach(r => console.log(r));
    console.log('');
  }
  
  // Priorities
  console.log('🎯  TODAY\'S PRIORITIES');
  console.log('─'.repeat(80));
  const priorities = getPriorities();
  priorities.forEach(p => console.log(p));
  console.log('');
  
  // Calendar
  console.log('📅  CALENDAR (Next 48 Hours)');
  console.log('─'.repeat(80));
  console.log('⚠️  Note: Add +1 day to displayed dates (calendar offset bug)');
  const calendar = await getCalendarEvents();
  console.log(calendar);
  
  // Intelligence insights
  console.log('');
  console.log('💡  INTELLIGENCE INSIGHTS');
  console.log('─'.repeat(80));
  const insights = await getIntelligenceInsights();
  console.log(insights);
  
  // Email intelligence
  console.log('');
  console.log('📧  EMAIL INTELLIGENCE');
  console.log('─'.repeat(80));
  const emails = await getEmailIntelligence();
  console.log(emails);
  
  // Financial snapshot
  console.log('');
  console.log('💰  FINANCIAL SNAPSHOT');
  console.log('─'.repeat(80));
  const financials = await getFinancialSnapshot();
  console.log(financials);
  
  console.log('');
  console.log('═'.repeat(80));
  console.log('🚀  LET\'S CRUSH IT TODAY');
  console.log('═'.repeat(80));
}

// Run
generateBriefing().catch(err => {
  console.error('❌ Briefing failed:', err.message);
  process.exit(1);
});
