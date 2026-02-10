#!/usr/bin/env node

/**
 * MISSION CONTROL ALERTS
 * 
 * Checks for upcoming scheduled tasks and outputs Discord-formatted alerts.
 * Tracks alerted tasks to avoid spam.
 * 
 * Usage:
 *   node scripts/mission-control-alerts.cjs          # Check and output alerts
 *   node scripts/mission-control-alerts.cjs --check  # Check only, no state update
 *   node scripts/mission-control-alerts.cjs --reset  # Reset alert tracking
 * 
 * Run every minute via cron:
 *   * * * * * cd /path/to/clawd && node scripts/mission-control-alerts.cjs
 */

const fs = require('fs');
const path = require('path');

// ============================================================================
// CONFIGURATION
// ============================================================================

const CONFIG = {
  dataDir: path.join(__dirname, '..', 'data', 'mission-control'),
  tasksFile: path.join(__dirname, '..', 'data', 'mission-control', 'tasks.json'),
  alertStateFile: path.join(__dirname, '..', 'data', 'mission-control', 'alert-state.json'),
  alertWindowMins: 30,  // Alert for tasks within this many minutes
  // Alert thresholds in minutes - when to send reminders
  alertThresholds: [30, 15, 5, 0]
};

// ============================================================================
// STATE MANAGEMENT
// ============================================================================

function loadAlertState() {
  if (!fs.existsSync(CONFIG.alertStateFile)) {
    return { alerted: {} };
  }
  try {
    return JSON.parse(fs.readFileSync(CONFIG.alertStateFile, 'utf8'));
  } catch (e) {
    return { alerted: {} };
  }
}

function saveAlertState(state) {
  fs.writeFileSync(CONFIG.alertStateFile, JSON.stringify(state, null, 2));
}

function resetAlertState() {
  saveAlertState({ alerted: {} });
  console.log('✅ Alert state reset');
}

/**
 * Get the threshold key for a given number of minutes until task
 * Returns the nearest threshold that hasn't passed
 */
function getThresholdKey(minsUntil) {
  for (const threshold of CONFIG.alertThresholds) {
    if (minsUntil <= threshold + 2 && minsUntil >= threshold - 2) {
      return threshold;
    }
  }
  return null;
}

// ============================================================================
// TASK LOADING
// ============================================================================

function loadTasks() {
  if (!fs.existsSync(CONFIG.tasksFile)) {
    return [];
  }
  return JSON.parse(fs.readFileSync(CONFIG.tasksFile, 'utf8'));
}

/**
 * Find tasks due within the alert window
 */
function getAlertableTasks() {
  const tasks = loadTasks();
  const now = new Date();
  const alertWindowMs = CONFIG.alertWindowMins * 60 * 1000;
  
  return tasks
    .filter(t => {
      if (!t.scheduledAt) return false;
      if (t.status === 'complete') return false;
      
      const scheduled = new Date(t.scheduledAt);
      const diff = scheduled - now;
      
      // Within alert window (not in the past by more than 5 mins)
      return diff >= -5 * 60 * 1000 && diff <= alertWindowMs;
    })
    .map(t => {
      const scheduled = new Date(t.scheduledAt);
      const minsUntil = Math.round((scheduled - now) / 60000);
      return {
        ...t,
        scheduled,
        minsUntil
      };
    })
    .sort((a, b) => a.minsUntil - b.minsUntil);
}

// ============================================================================
// DISCORD FORMATTING
// ============================================================================

function formatDiscordAlert(tasks) {
  if (tasks.length === 0) return null;
  
  const lines = [];
  
  // Header with urgency styling
  lines.push('## ⏰ **UPCOMING TASKS**\n');
  
  for (const task of tasks) {
    const scheduled = task.scheduled;
    const timeStr = scheduled.toLocaleTimeString('en-NZ', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
    const dateStr = scheduled.toLocaleDateString('en-NZ', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
    
    // Urgency indicator
    let urgency;
    if (task.minsUntil <= 0) {
      urgency = '🔴 **NOW!**';
    } else if (task.minsUntil <= 5) {
      urgency = `🟠 **${task.minsUntil} mins**`;
    } else if (task.minsUntil <= 15) {
      urgency = `🟡 ${task.minsUntil} mins`;
    } else {
      urgency = `🟢 ${task.minsUntil} mins`;
    }
    
    // Task line
    lines.push(`### ${task.title}`);
    lines.push(`> 📅 ${dateStr} @ ${timeStr} — ${urgency}`);
    
    if (task.description) {
      lines.push(`> ${task.description}`);
    }
    
    lines.push('');
  }
  
  return lines.join('\n');
}

/**
 * Format a single task alert (for individual notifications)
 */
function formatSingleAlert(task) {
  const scheduled = task.scheduled;
  const timeStr = scheduled.toLocaleTimeString('en-NZ', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
  
  let urgency;
  if (task.minsUntil <= 0) {
    urgency = '🔴 **STARTING NOW**';
  } else if (task.minsUntil <= 5) {
    urgency = `🟠 Starting in **${task.minsUntil} minutes**`;
  } else if (task.minsUntil <= 15) {
    urgency = `🟡 Starting in ${task.minsUntil} minutes`;
  } else {
    urgency = `⏰ Starting in ${task.minsUntil} minutes`;
  }
  
  const lines = [
    `## ${urgency}`,
    `### ${task.title}`,
    `> 📅 @ ${timeStr}`
  ];
  
  if (task.description) {
    lines.push(`> ${task.description}`);
  }
  
  return lines.join('\n');
}

// ============================================================================
// MAIN LOGIC
// ============================================================================

function checkAndAlert(dryRun = false) {
  const state = loadAlertState();
  const tasks = getAlertableTasks();
  const alerts = [];
  
  const now = new Date();
  
  for (const task of tasks) {
    const thresholdKey = getThresholdKey(task.minsUntil);
    
    if (thresholdKey === null) continue;
    
    // Create unique key for this task + threshold combo
    const alertKey = `${task.id}:${thresholdKey}`;
    
    // Check if already alerted for this threshold
    if (state.alerted[alertKey]) {
      const alertedAt = new Date(state.alerted[alertKey]);
      // Don't re-alert within 5 minutes of last alert
      if ((now - alertedAt) < 5 * 60 * 1000) {
        continue;
      }
    }
    
    // This task needs an alert
    alerts.push({
      task,
      threshold: thresholdKey,
      alertKey
    });
    
    // Mark as alerted (unless dry run)
    if (!dryRun) {
      state.alerted[alertKey] = now.toISOString();
    }
  }
  
  // Clean up old alert entries (older than 24 hours)
  const oneDayAgo = new Date(now - 24 * 60 * 60 * 1000);
  for (const key of Object.keys(state.alerted)) {
    const alertedAt = new Date(state.alerted[key]);
    if (alertedAt < oneDayAgo) {
      delete state.alerted[key];
    }
  }
  
  // Save state
  if (!dryRun) {
    saveAlertState(state);
  }
  
  return alerts;
}

function main() {
  const args = process.argv.slice(2);
  
  // Reset mode
  if (args.includes('--reset')) {
    resetAlertState();
    return;
  }
  
  // Check-only mode (no state update)
  const dryRun = args.includes('--check');
  
  // JSON output mode
  const jsonMode = args.includes('--json');
  
  const alerts = checkAndAlert(dryRun);
  
  if (alerts.length === 0) {
    if (jsonMode) {
      console.log(JSON.stringify({ alerts: [] }));
    }
    // Silent exit when no alerts
    return;
  }
  
  if (jsonMode) {
    console.log(JSON.stringify({
      alerts: alerts.map(a => ({
        taskId: a.task.id,
        title: a.task.title,
        description: a.task.description,
        scheduledAt: a.task.scheduledAt,
        minsUntil: a.task.minsUntil,
        threshold: a.threshold
      }))
    }));
    return;
  }
  
  // Output Discord-formatted alerts
  // Each alert gets its own message for clarity
  for (const alert of alerts) {
    console.log(formatSingleAlert(alert.task));
    console.log('---'); // Separator for multiple alerts
  }
}

if (require.main === module) {
  main();
}

module.exports = { checkAndAlert, getAlertableTasks, formatDiscordAlert, formatSingleAlert };
