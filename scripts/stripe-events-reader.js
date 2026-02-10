#!/usr/bin/env node
/**
 * Stripe Events Reader
 * 
 * Reads and summarizes events from stripe-events.jsonl
 * For ops dashboard consumption.
 * 
 * Usage:
 *   node stripe-events-reader.js [--today|--week|--month] [--type TYPE] [--json]
 */

const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(__dirname, '..', 'logs', 'stripe-events.jsonl');

/**
 * Read all events from log file
 */
function readAllEvents() {
  if (!fs.existsSync(LOG_FILE)) {
    return [];
  }
  
  const content = fs.readFileSync(LOG_FILE, 'utf-8');
  const lines = content.trim().split('\n').filter(Boolean);
  
  return lines.map(line => {
    try {
      return JSON.parse(line);
    } catch {
      return null;
    }
  }).filter(Boolean);
}

/**
 * Filter events by time period
 */
function filterByTime(events, period) {
  const now = new Date();
  let cutoff;
  
  switch (period) {
    case 'today':
      cutoff = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    case 'week':
      cutoff = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case 'month':
      cutoff = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    case 'all':
    default:
      return events;
  }
  
  return events.filter(e => new Date(e.timestamp) >= cutoff);
}

/**
 * Filter events by type
 */
function filterByType(events, type) {
  if (!type) return events;
  return events.filter(e => e.type === type || e.type.includes(type));
}

/**
 * Generate summary statistics
 */
function generateSummary(events) {
  const summary = {
    total: events.length,
    byType: {},
    timeline: {},
    recentActivity: [],
  };
  
  // Count by type
  for (const event of events) {
    summary.byType[event.type] = (summary.byType[event.type] || 0) + 1;
  }
  
  // Group by date
  for (const event of events) {
    const date = event.timestamp.split('T')[0];
    if (!summary.timeline[date]) {
      summary.timeline[date] = { total: 0, byType: {} };
    }
    summary.timeline[date].total++;
    summary.timeline[date].byType[event.type] = 
      (summary.timeline[date].byType[event.type] || 0) + 1;
  }
  
  // Recent 10 events
  summary.recentActivity = events
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 10)
    .map(e => ({
      time: e.timestamp,
      type: e.type,
      summary: eventSummary(e),
    }));
  
  return summary;
}

/**
 * Generate human-readable summary for an event
 */
function eventSummary(event) {
  const d = event.data;
  
  switch (event.type) {
    case 'new_subscription':
      return `New subscription ${d.subscriptionId?.slice(-8)} (${d.status})`;
    case 'subscription_change':
      return `Plan change for ${d.subscriptionId?.slice(-8)}`;
    case 'cancellation':
      return `Canceled ${d.subscriptionId?.slice(-8)} - ${d.cancellationReason || 'no reason'}`;
    case 'payment_failed':
      return `Failed payment $${(d.amountDue / 100).toFixed(2)} (attempt ${d.attemptCount})`;
    case 'payment_succeeded':
      return `Payment $${(d.amountPaid / 100).toFixed(2)} received`;
    default:
      return event.type;
  }
}

/**
 * Format summary for console output
 */
function formatSummary(summary, period) {
  const lines = [
    `\n═══ Stripe Events Summary (${period || 'all time'}) ═══\n`,
    `Total events: ${summary.total}`,
    '',
    '📊 By Event Type:',
  ];
  
  const typeOrder = [
    'new_subscription',
    'subscription_change', 
    'cancellation',
    'payment_succeeded',
    'payment_failed',
  ];
  
  const sortedTypes = Object.entries(summary.byType)
    .sort((a, b) => {
      const aIdx = typeOrder.indexOf(a[0]);
      const bIdx = typeOrder.indexOf(b[0]);
      if (aIdx === -1 && bIdx === -1) return b[1] - a[1];
      if (aIdx === -1) return 1;
      if (bIdx === -1) return -1;
      return aIdx - bIdx;
    });
  
  for (const [type, count] of sortedTypes) {
    const icon = getTypeIcon(type);
    lines.push(`  ${icon} ${type}: ${count}`);
  }
  
  if (Object.keys(summary.timeline).length > 0) {
    lines.push('');
    lines.push('📅 Recent Days:');
    
    const recentDays = Object.entries(summary.timeline)
      .sort((a, b) => b[0].localeCompare(a[0]))
      .slice(0, 7);
    
    for (const [date, data] of recentDays) {
      lines.push(`  ${date}: ${data.total} events`);
    }
  }
  
  if (summary.recentActivity.length > 0) {
    lines.push('');
    lines.push('🔔 Recent Activity:');
    
    for (const activity of summary.recentActivity) {
      const time = new Date(activity.time).toLocaleString();
      lines.push(`  [${time}] ${activity.summary}`);
    }
  }
  
  return lines.join('\n');
}

function getTypeIcon(type) {
  switch (type) {
    case 'new_subscription': return '🆕';
    case 'subscription_change': return '🔄';
    case 'cancellation': return '❌';
    case 'payment_succeeded': return '✅';
    case 'payment_failed': return '⚠️';
    default: return '•';
  }
}

/**
 * Main CLI
 */
function main() {
  const args = process.argv.slice(2);
  
  let period = 'all';
  let type = null;
  let jsonOutput = false;
  
  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--today':
        period = 'today';
        break;
      case '--week':
        period = 'week';
        break;
      case '--month':
        period = 'month';
        break;
      case '--type':
        type = args[++i];
        break;
      case '--json':
        jsonOutput = true;
        break;
      case '--help':
        console.log(`
Stripe Events Reader

Usage: node stripe-events-reader.js [options]

Options:
  --today     Only events from today
  --week      Only events from last 7 days
  --month     Only events from this month
  --type TYPE Filter by event type (e.g., cancellation)
  --json      Output as JSON
  --help      Show this help
`);
        process.exit(0);
    }
  }
  
  let events = readAllEvents();
  events = filterByTime(events, period);
  events = filterByType(events, type);
  
  const summary = generateSummary(events);
  
  if (jsonOutput) {
    console.log(JSON.stringify(summary, null, 2));
  } else {
    console.log(formatSummary(summary, period));
  }
}

// Export for programmatic use
module.exports = {
  readAllEvents,
  filterByTime,
  filterByType,
  generateSummary,
  LOG_FILE,
};

if (require.main === module) {
  main();
}
