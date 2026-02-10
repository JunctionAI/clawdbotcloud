#!/usr/bin/env node

/**
 * MISSION CONTROL DASHBOARD V2
 * 
 * Complete Agent Headquarters with:
 * - Activity Feed with filtering
 * - Weekly Calendar View
 * - Global Search (Cmd+K)
 * - Agent Visualization
 * 
 * Usage:
 *   node scripts/mission-control-v2.cjs              # Start web server on :3100
 *   node scripts/mission-control-v2.cjs add ...      # Add task
 *   node scripts/mission-control-v2.cjs log ...      # Log agent activity
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

// ============================================================================
// CONFIGURATION
// ============================================================================

const CONFIG = {
  port: 3100,
  dataDir: path.join(__dirname, '..', 'data', 'mission-control'),
  tasksFile: path.join(__dirname, '..', 'data', 'mission-control', 'tasks.json'),
  activityFile: path.join(__dirname, '..', 'data', 'mission-control', 'activity.json'),
  agentsFile: path.join(__dirname, '..', 'data', 'mission-control', 'agents.json'),
  memoryDir: path.join(__dirname, '..', 'memory'),
  stateJsonPath: path.join(__dirname, '..', 'STATE.json')
};

// ============================================================================
// INITIALIZATION
// ============================================================================

function ensureDirectories() {
  if (!fs.existsSync(CONFIG.dataDir)) {
    fs.mkdirSync(CONFIG.dataDir, { recursive: true });
  }
  
  if (!fs.existsSync(CONFIG.tasksFile)) {
    fs.writeFileSync(CONFIG.tasksFile, JSON.stringify([], null, 2));
  }
  
  if (!fs.existsSync(CONFIG.activityFile)) {
    fs.writeFileSync(CONFIG.activityFile, JSON.stringify([], null, 2));
  }
  
  if (!fs.existsSync(CONFIG.agentsFile)) {
    fs.writeFileSync(CONFIG.agentsFile, JSON.stringify([
      {
        id: 'main-agent',
        name: 'Main Agent',
        role: 'Orchestrator',
        status: 'online',
        description: 'Primary AI agent',
        currentTask: null,
        parent: null,
        capabilities: ['orchestration', 'planning'],
        lastSeen: new Date().toISOString(),
        createdAt: new Date().toISOString()
      }
    ], null, 2));
  }
}

// ============================================================================
// DATA LOADERS
// ============================================================================

function loadTasks() {
  try {
    return JSON.parse(fs.readFileSync(CONFIG.tasksFile, 'utf8'));
  } catch {
    return [];
  }
}

function saveTasks(tasks) {
  fs.writeFileSync(CONFIG.tasksFile, JSON.stringify(tasks, null, 2));
}

function loadActivity() {
  try {
    return JSON.parse(fs.readFileSync(CONFIG.activityFile, 'utf8'));
  } catch {
    return [];
  }
}

function saveActivity(activity) {
  fs.writeFileSync(CONFIG.activityFile, JSON.stringify(activity, null, 2));
}

function loadAgents() {
  try {
    return JSON.parse(fs.readFileSync(CONFIG.agentsFile, 'utf8'));
  } catch {
    return [];
  }
}

function saveAgents(agents) {
  fs.writeFileSync(CONFIG.agentsFile, JSON.stringify(agents, null, 2));
}

// ============================================================================
// ACTIVITY LOGGING
// ============================================================================

function logActivity(event) {
  const activity = loadActivity();
  activity.unshift({
    id: `act-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    ...event,
    timestamp: new Date().toISOString()
  });
  
  // Keep last 1000 events
  if (activity.length > 1000) {
    activity.splice(1000);
  }
  
  saveActivity(activity);
  return activity[0];
}

// ============================================================================
// TASK MANAGEMENT
// ============================================================================

function generateTaskId() {
  return `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function addTask(taskData) {
  const tasks = loadTasks();
  
  const task = {
    id: taskData.id || generateTaskId(),
    title: taskData.title,
    description: taskData.description || '',
    status: taskData.status || 'todo',
    priority: taskData.priority || 'medium',
    tags: taskData.tags || [],
    project: taskData.project || 'General',
    assignee: taskData.assignee || 'main-agent',
    estimatedHours: taskData.estimatedHours || null,
    scheduledAt: taskData.scheduledAt || null,
    recurring: taskData.recurring || null,
    recurringTime: taskData.recurringTime || null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    completedAt: null
  };
  
  tasks.push(task);
  saveTasks(tasks);
  
  logActivity({
    type: 'task_created',
    agent: taskData.assignee || 'main-agent',
    action: 'create_task',
    taskId: task.id,
    title: task.title,
    description: `Created task: ${task.title}`,
    status: 'success'
  });
  
  return task;
}

function updateTask(taskId, updates) {
  const tasks = loadTasks();
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  
  if (taskIndex === -1) {
    throw new Error(`Task ${taskId} not found`);
  }
  
  const oldStatus = tasks[taskIndex].status;
  
  tasks[taskIndex] = {
    ...tasks[taskIndex],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  if (updates.status === 'complete' && !tasks[taskIndex].completedAt) {
    tasks[taskIndex].completedAt = new Date().toISOString();
  }
  
  saveTasks(tasks);
  
  logActivity({
    type: 'task_updated',
    agent: tasks[taskIndex].assignee || 'main-agent',
    action: 'update_task',
    taskId: taskId,
    title: tasks[taskIndex].title,
    description: `Updated task: ${tasks[taskIndex].title} (${oldStatus} → ${tasks[taskIndex].status})`,
    changes: updates,
    oldStatus,
    newStatus: tasks[taskIndex].status,
    status: 'success'
  });
  
  return tasks[taskIndex];
}

function deleteTask(taskId) {
  const tasks = loadTasks();
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  
  if (taskIndex === -1) {
    throw new Error(`Task ${taskId} not found`);
  }
  
  const task = tasks[taskIndex];
  tasks.splice(taskIndex, 1);
  saveTasks(tasks);
  
  logActivity({
    type: 'task_deleted',
    agent: task.assignee || 'main-agent',
    action: 'delete_task',
    taskId: taskId,
    title: task.title,
    description: `Deleted task: ${task.title}`,
    status: 'success'
  });
}

function getTasks(filters = {}) {
  let tasks = loadTasks();
  
  if (filters.status) {
    tasks = tasks.filter(t => t.status === filters.status);
  }
  
  if (filters.priority) {
    tasks = tasks.filter(t => t.priority === filters.priority);
  }
  
  if (filters.project) {
    tasks = tasks.filter(t => t.project === filters.project);
  }
  
  if (filters.assignee) {
    tasks = tasks.filter(t => t.assignee === filters.assignee);
  }
  
  return tasks;
}

function getStats() {
  const tasks = loadTasks();
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekStart = new Date(now);
  weekStart.setDate(weekStart.getDate() - 7);
  
  return {
    total: tasks.length,
    byStatus: {
      todo: tasks.filter(t => t.status === 'todo').length,
      'in-progress': tasks.filter(t => t.status === 'in-progress').length,
      review: tasks.filter(t => t.status === 'review').length,
      complete: tasks.filter(t => t.status === 'complete').length
    },
    completedToday: tasks.filter(t => 
      t.status === 'complete' && 
      t.completedAt &&
      new Date(t.completedAt) >= todayStart
    ).length,
    completedThisWeek: tasks.filter(t => 
      t.status === 'complete' && 
      t.completedAt &&
      new Date(t.completedAt) >= weekStart
    ).length
  };
}

// ============================================================================
// AGENT MANAGEMENT
// ============================================================================

function updateAgentStatus(agentId, status, currentTask = null) {
  const agents = loadAgents();
  const agentIndex = agents.findIndex(a => a.id === agentId);
  
  if (agentIndex === -1) {
    // Create new agent if doesn't exist
    agents.push({
      id: agentId,
      name: agentId,
      role: 'Subagent',
      status: status,
      currentTask: currentTask,
      parent: 'main-agent',
      lastSeen: new Date().toISOString(),
      createdAt: new Date().toISOString()
    });
  } else {
    agents[agentIndex].status = status;
    agents[agentIndex].currentTask = currentTask;
    agents[agentIndex].lastSeen = new Date().toISOString();
  }
  
  saveAgents(agents);
  return agents.find(a => a.id === agentId);
}

// ============================================================================
// SEARCH
// ============================================================================

function searchAll(query) {
  const results = {
    tasks: [],
    activity: [],
    memory: []
  };
  
  const q = query.toLowerCase();
  
  // Search tasks
  const tasks = loadTasks();
  results.tasks = tasks.filter(t => 
    t.title.toLowerCase().includes(q) ||
    (t.description && t.description.toLowerCase().includes(q)) ||
    (t.project && t.project.toLowerCase().includes(q)) ||
    (t.tags && t.tags.some(tag => tag.toLowerCase().includes(q)))
  ).slice(0, 10);
  
  // Search activity
  const activity = loadActivity();
  results.activity = activity.filter(a =>
    (a.title && a.title.toLowerCase().includes(q)) ||
    (a.description && a.description.toLowerCase().includes(q)) ||
    (a.agent && a.agent.toLowerCase().includes(q)) ||
    (a.action && a.action.toLowerCase().includes(q))
  ).slice(0, 10);
  
  // Search memory files
  if (fs.existsSync(CONFIG.memoryDir)) {
    const searchDir = (dir, depth = 0) => {
      if (depth > 2) return;
      
      try {
        const files = fs.readdirSync(dir);
        for (const file of files) {
          const filePath = path.join(dir, file);
          const stat = fs.statSync(filePath);
          
          if (stat.isDirectory()) {
            searchDir(filePath, depth + 1);
          } else if (file.endsWith('.md')) {
            try {
              const content = fs.readFileSync(filePath, 'utf8');
              if (content.toLowerCase().includes(q)) {
                // Find matching lines
                const lines = content.split('\n');
                const matches = [];
                lines.forEach((line, idx) => {
                  if (line.toLowerCase().includes(q)) {
                    matches.push({ line: idx + 1, text: line.substring(0, 100) });
                  }
                });
                
                if (matches.length > 0) {
                  results.memory.push({
                    file: path.relative(CONFIG.memoryDir, filePath),
                    path: filePath,
                    matches: matches.slice(0, 3)
                  });
                }
              }
            } catch (e) {
              // Skip unreadable files
            }
          }
        }
      } catch (e) {
        // Skip inaccessible directories
      }
    };
    
    searchDir(CONFIG.memoryDir);
    results.memory = results.memory.slice(0, 10);
  }
  
  return results;
}

// ============================================================================
// CALENDAR
// ============================================================================

function getCalendarWeek(startDate = null) {
  const now = startDate ? new Date(startDate) : new Date();
  
  // Get Sunday of current week
  const sunday = new Date(now);
  sunday.setDate(sunday.getDate() - sunday.getDay());
  sunday.setHours(0, 0, 0, 0);
  
  // Get Saturday
  const saturday = new Date(sunday);
  saturday.setDate(saturday.getDate() + 6);
  saturday.setHours(23, 59, 59, 999);
  
  const tasks = loadTasks();
  const weekTasks = [];
  const alwaysRunning = [];
  const nextUp = [];
  
  tasks.forEach(task => {
    if (task.recurring && !task.scheduledAt) {
      alwaysRunning.push(task);
    } else if (task.scheduledAt) {
      const taskDate = new Date(task.scheduledAt);
      
      if (task.recurring) {
        // For recurring tasks, show on each day of the week
        for (let d = 0; d < 7; d++) {
          const dayDate = new Date(sunday);
          dayDate.setDate(dayDate.getDate() + d);
          
          const taskCopy = { ...task };
          taskCopy.displayDate = dayDate.toISOString();
          weekTasks.push(taskCopy);
        }
      } else if (taskDate >= sunday && taskDate <= saturday) {
        weekTasks.push(task);
      }
      
      // Check if upcoming (next 48 hours)
      const nowTime = new Date();
      const diff = taskDate - nowTime;
      if (diff > 0 && diff < 48 * 60 * 60 * 1000 && task.status !== 'complete') {
        nextUp.push({
          ...task,
          countdown: Math.floor(diff / (60 * 1000)) // minutes
        });
      }
    }
  });
  
  // Sort nextUp by countdown
  nextUp.sort((a, b) => a.countdown - b.countdown);
  
  return {
    weekStart: sunday.toISOString(),
    weekEnd: saturday.toISOString(),
    tasks: weekTasks,
    alwaysRunning,
    nextUp: nextUp.slice(0, 5)
  };
}

// ============================================================================
// WEB SERVER
// ============================================================================

function startServer() {
  const server = http.createServer((req, res) => {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
      res.writeHead(200);
      res.end();
      return;
    }
    
    const url = new URL(req.url, `http://localhost:${CONFIG.port}`);
    const pathname = url.pathname;
    
    // Route handling
    if (pathname === '/' && req.method === 'GET') {
      serveHTML(res);
    } else if (pathname === '/api/tasks' && req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(getTasks()));
    } else if (pathname === '/api/tasks' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        try {
          const taskData = JSON.parse(body);
          const task = addTask(taskData);
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(task));
        } catch (error) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: error.message }));
        }
      });
    } else if (pathname.startsWith('/api/tasks/') && req.method === 'PATCH') {
      const taskId = pathname.split('/')[3];
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        try {
          const updates = JSON.parse(body);
          const task = updateTask(taskId, updates);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(task));
        } catch (error) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: error.message }));
        }
      });
    } else if (pathname.startsWith('/api/tasks/') && req.method === 'DELETE') {
      const taskId = pathname.split('/')[3];
      try {
        deleteTask(taskId);
        res.writeHead(204);
        res.end();
      } catch (error) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
      }
    } else if (pathname === '/api/activity' && req.method === 'GET') {
      const limit = parseInt(url.searchParams.get('limit')) || 50;
      const agent = url.searchParams.get('agent');
      const type = url.searchParams.get('type');
      const date = url.searchParams.get('date');
      
      let activity = loadActivity();
      
      if (agent) {
        activity = activity.filter(a => a.agent === agent);
      }
      if (type) {
        activity = activity.filter(a => a.type === type || a.action === type);
      }
      if (date) {
        const dateStart = new Date(date);
        dateStart.setHours(0, 0, 0, 0);
        const dateEnd = new Date(date);
        dateEnd.setHours(23, 59, 59, 999);
        activity = activity.filter(a => {
          const aDate = new Date(a.timestamp);
          return aDate >= dateStart && aDate <= dateEnd;
        });
      }
      
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(activity.slice(0, limit)));
    } else if (pathname === '/api/activity' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        try {
          const event = JSON.parse(body);
          const logged = logActivity(event);
          res.writeHead(201, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(logged));
        } catch (error) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: error.message }));
        }
      });
    } else if (pathname === '/api/agents' && req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(loadAgents()));
    } else if (pathname === '/api/agents' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        try {
          const { agentId, status, currentTask } = JSON.parse(body);
          const agent = updateAgentStatus(agentId, status, currentTask);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(agent));
        } catch (error) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: error.message }));
        }
      });
    } else if (pathname === '/api/stats' && req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(getStats()));
    } else if (pathname === '/api/calendar' && req.method === 'GET') {
      const startDate = url.searchParams.get('start');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(getCalendarWeek(startDate)));
    } else if (pathname === '/api/search' && req.method === 'GET') {
      const query = url.searchParams.get('q') || '';
      if (query.length < 2) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Query too short' }));
        return;
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(searchAll(query)));
    } else {
      res.writeHead(404);
      res.end('Not Found');
    }
  });
  
  server.listen(CONFIG.port, () => {
    console.log(`🎯 Mission Control V2 running at http://localhost:${CONFIG.port}`);
    console.log('Press Ctrl+C to stop');
  });
}

// ============================================================================
// HTML TEMPLATE
// ============================================================================

function serveHTML(res) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mission Control V2 - Agent Headquarters</title>
  <style>
    :root {
      --bg-primary: #0a0e27;
      --bg-secondary: #1e293b;
      --bg-tertiary: #334155;
      --accent: #60a5fa;
      --accent-hover: #3b82f6;
      --text-primary: #e0e6ed;
      --text-secondary: #94a3b8;
      --success: #10b981;
      --warning: #f59e0b;
      --danger: #ef4444;
      --purple: #a855f7;
    }
    
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: var(--bg-primary);
      color: var(--text-primary);
      min-height: 100vh;
    }
    
    /* Layout */
    .app {
      display: flex;
      height: 100vh;
    }
    
    .sidebar {
      width: 220px;
      background: var(--bg-secondary);
      padding: 20px;
      border-right: 1px solid var(--bg-tertiary);
      display: flex;
      flex-direction: column;
    }
    
    .main-content {
      flex: 1;
      overflow-y: auto;
      padding: 20px;
    }
    
    /* Sidebar */
    .logo {
      font-size: 24px;
      font-weight: bold;
      color: var(--accent);
      margin-bottom: 30px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .nav-item {
      padding: 12px 15px;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 5px;
      transition: background 0.2s;
    }
    
    .nav-item:hover {
      background: var(--bg-tertiary);
    }
    
    .nav-item.active {
      background: var(--accent);
      color: var(--bg-primary);
    }
    
    .nav-divider {
      height: 1px;
      background: var(--bg-tertiary);
      margin: 15px 0;
    }
    
    .search-hint {
      margin-top: auto;
      padding: 10px;
      background: var(--bg-tertiary);
      border-radius: 8px;
      font-size: 12px;
      color: var(--text-secondary);
      text-align: center;
    }
    
    .search-hint kbd {
      background: var(--bg-primary);
      padding: 2px 6px;
      border-radius: 4px;
      font-family: monospace;
    }
    
    /* Header */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 25px;
    }
    
    .header h1 {
      font-size: 28px;
      color: var(--text-primary);
    }
    
    .stats-row {
      display: flex;
      gap: 20px;
    }
    
    .stat-card {
      background: var(--bg-secondary);
      padding: 15px 25px;
      border-radius: 10px;
      text-align: center;
    }
    
    .stat-value {
      font-size: 28px;
      font-weight: bold;
      color: var(--accent);
    }
    
    .stat-label {
      font-size: 12px;
      color: var(--text-secondary);
      margin-top: 5px;
    }
    
    /* View container */
    .view { display: none; }
    .view.active { display: block; }
    
    /* Board View */
    .board {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      margin-bottom: 30px;
    }
    
    .column {
      background: var(--bg-secondary);
      border-radius: 10px;
      padding: 15px;
      min-height: 400px;
    }
    
    .column-header {
      font-weight: 600;
      margin-bottom: 15px;
      padding-bottom: 12px;
      border-bottom: 2px solid var(--bg-tertiary);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .column-count {
      background: var(--bg-tertiary);
      padding: 3px 10px;
      border-radius: 12px;
      font-size: 12px;
    }
    
    .task {
      background: var(--bg-tertiary);
      border-radius: 8px;
      padding: 14px;
      margin-bottom: 10px;
      cursor: pointer;
      transition: all 0.2s;
      border-left: 4px solid transparent;
    }
    
    .task:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(0,0,0,0.3);
    }
    
    .task-title {
      font-weight: 500;
      margin-bottom: 8px;
      font-size: 14px;
    }
    
    .task-meta {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
      font-size: 11px;
    }
    
    .tag {
      background: var(--bg-primary);
      padding: 3px 8px;
      border-radius: 4px;
      color: var(--text-secondary);
    }
    
    .task.priority-high { border-left-color: var(--danger); }
    .task.priority-medium { border-left-color: var(--warning); }
    .task.priority-low { border-left-color: var(--success); }
    
    .task-schedule {
      font-size: 11px;
      color: var(--accent);
      margin-bottom: 8px;
      padding: 4px 8px;
      background: var(--bg-primary);
      border-radius: 4px;
      display: inline-block;
    }
    
    /* Activity Feed */
    .activity-section {
      display: grid;
      grid-template-columns: 1fr 300px;
      gap: 20px;
    }
    
    .activity-feed {
      background: var(--bg-secondary);
      border-radius: 10px;
      padding: 20px;
    }
    
    .activity-feed h2 {
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .activity-filters {
      display: flex;
      gap: 10px;
      margin-bottom: 15px;
      flex-wrap: wrap;
    }
    
    .filter-select {
      background: var(--bg-tertiary);
      border: none;
      padding: 8px 12px;
      border-radius: 6px;
      color: var(--text-primary);
      font-size: 13px;
    }
    
    .activity-list {
      max-height: 500px;
      overflow-y: auto;
    }
    
    .activity-item {
      padding: 12px;
      border-bottom: 1px solid var(--bg-tertiary);
      display: flex;
      gap: 12px;
      align-items: flex-start;
    }
    
    .activity-icon {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      flex-shrink: 0;
    }
    
    .activity-icon.task { background: var(--accent); }
    .activity-icon.agent { background: var(--purple); }
    .activity-icon.success { background: var(--success); }
    .activity-icon.error { background: var(--danger); }
    
    .activity-content {
      flex: 1;
    }
    
    .activity-title {
      font-weight: 500;
      margin-bottom: 4px;
    }
    
    .activity-desc {
      font-size: 13px;
      color: var(--text-secondary);
    }
    
    .activity-time {
      font-size: 11px;
      color: var(--text-secondary);
    }
    
    .activity-agent {
      font-size: 11px;
      color: var(--accent);
      margin-top: 4px;
    }
    
    /* Agent Panel */
    .agent-panel {
      background: var(--bg-secondary);
      border-radius: 10px;
      padding: 20px;
    }
    
    .agent-panel h3 {
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .agent-card {
      background: var(--bg-tertiary);
      border-radius: 8px;
      padding: 12px;
      margin-bottom: 10px;
    }
    
    .agent-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }
    
    .agent-name {
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }
    
    .status-dot.online { background: var(--success); }
    .status-dot.working { background: var(--warning); animation: pulse 1s infinite; }
    .status-dot.idle { background: var(--text-secondary); }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    
    .agent-role {
      font-size: 11px;
      color: var(--text-secondary);
    }
    
    .agent-task {
      font-size: 12px;
      color: var(--accent);
      padding: 6px 8px;
      background: var(--bg-primary);
      border-radius: 4px;
      margin-top: 8px;
    }
    
    /* Calendar View */
    .calendar-container {
      display: grid;
      grid-template-columns: 1fr 280px;
      gap: 20px;
    }
    
    .calendar-grid {
      background: var(--bg-secondary);
      border-radius: 10px;
      padding: 20px;
    }
    
    .calendar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    
    .calendar-nav {
      display: flex;
      gap: 10px;
    }
    
    .cal-btn {
      background: var(--bg-tertiary);
      border: none;
      padding: 8px 15px;
      border-radius: 6px;
      color: var(--text-primary);
      cursor: pointer;
    }
    
    .cal-btn:hover { background: var(--accent); color: var(--bg-primary); }
    
    .week-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 10px;
    }
    
    .day-column {
      background: var(--bg-tertiary);
      border-radius: 8px;
      padding: 12px;
      min-height: 350px;
    }
    
    .day-header {
      text-align: center;
      padding-bottom: 10px;
      border-bottom: 1px solid var(--bg-primary);
      margin-bottom: 10px;
    }
    
    .day-name {
      font-size: 11px;
      color: var(--text-secondary);
      text-transform: uppercase;
    }
    
    .day-date {
      font-size: 18px;
      font-weight: bold;
    }
    
    .day-column.today .day-date {
      color: var(--accent);
    }
    
    .cal-task {
      background: var(--bg-primary);
      padding: 8px;
      border-radius: 6px;
      margin-bottom: 8px;
      font-size: 12px;
      border-left: 3px solid var(--accent);
    }
    
    .cal-task.high { border-left-color: var(--danger); }
    .cal-task.recurring { border-left-color: var(--purple); }
    
    .cal-task-time {
      font-size: 10px;
      color: var(--accent);
      margin-bottom: 4px;
    }
    
    /* Sidebar panels */
    .sidebar-panels {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    
    .side-panel {
      background: var(--bg-secondary);
      border-radius: 10px;
      padding: 15px;
    }
    
    .side-panel h3 {
      font-size: 14px;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .next-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      background: var(--bg-tertiary);
      border-radius: 6px;
      margin-bottom: 8px;
      font-size: 13px;
    }
    
    .countdown {
      font-size: 11px;
      color: var(--accent);
      font-weight: 500;
    }
    
    .always-item {
      padding: 8px 10px;
      background: var(--bg-tertiary);
      border-radius: 6px;
      margin-bottom: 6px;
      font-size: 12px;
      border-left: 3px solid var(--purple);
    }
    
    /* Search Modal */
    .search-modal {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.7);
      z-index: 1000;
      justify-content: center;
      padding-top: 100px;
    }
    
    .search-modal.active {
      display: flex;
    }
    
    .search-container {
      width: 600px;
      max-height: 500px;
      background: var(--bg-secondary);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
    }
    
    .search-input-container {
      display: flex;
      align-items: center;
      padding: 15px 20px;
      border-bottom: 1px solid var(--bg-tertiary);
    }
    
    .search-input-container span {
      font-size: 20px;
      margin-right: 15px;
    }
    
    .search-input {
      flex: 1;
      background: transparent;
      border: none;
      font-size: 18px;
      color: var(--text-primary);
      outline: none;
    }
    
    .search-input::placeholder {
      color: var(--text-secondary);
    }
    
    .search-results {
      max-height: 400px;
      overflow-y: auto;
      padding: 15px;
    }
    
    .search-section {
      margin-bottom: 20px;
    }
    
    .search-section-title {
      font-size: 11px;
      text-transform: uppercase;
      color: var(--text-secondary);
      margin-bottom: 10px;
      padding-left: 10px;
    }
    
    .search-result {
      padding: 12px;
      border-radius: 8px;
      cursor: pointer;
      margin-bottom: 6px;
      background: var(--bg-tertiary);
    }
    
    .search-result:hover {
      background: var(--accent);
      color: var(--bg-primary);
    }
    
    .search-result-title {
      font-weight: 500;
      margin-bottom: 4px;
    }
    
    .search-result-meta {
      font-size: 12px;
      opacity: 0.7;
    }
    
    .search-empty {
      text-align: center;
      padding: 40px;
      color: var(--text-secondary);
    }
    
    /* Agent Org Chart */
    .org-chart {
      background: var(--bg-secondary);
      border-radius: 10px;
      padding: 30px;
    }
    
    .org-level {
      display: flex;
      justify-content: center;
      margin-bottom: 30px;
      position: relative;
    }
    
    .org-agent {
      background: var(--bg-tertiary);
      padding: 20px 30px;
      border-radius: 12px;
      text-align: center;
      position: relative;
      margin: 0 15px;
    }
    
    .org-agent.main {
      background: linear-gradient(135deg, var(--accent), var(--purple));
    }
    
    .org-agent-name {
      font-weight: 600;
      margin-bottom: 5px;
    }
    
    .org-agent-role {
      font-size: 12px;
      color: var(--text-secondary);
      margin-bottom: 10px;
    }
    
    .org-agent-status {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      font-size: 12px;
    }
    
    .org-connector {
      position: absolute;
      width: 2px;
      height: 30px;
      background: var(--bg-tertiary);
      left: 50%;
      bottom: -30px;
    }
    
    .org-horizontal {
      position: absolute;
      height: 2px;
      background: var(--bg-tertiary);
      top: 0;
      left: 10%;
      right: 10%;
    }
    
    .org-branch::before {
      content: '';
      position: absolute;
      width: 2px;
      height: 30px;
      background: var(--bg-tertiary);
      left: 50%;
      top: -30px;
    }
    
    /* Responsive */
    @media (max-width: 1200px) {
      .board { grid-template-columns: repeat(2, 1fr); }
      .calendar-container { grid-template-columns: 1fr; }
      .activity-section { grid-template-columns: 1fr; }
    }
    
    @media (max-width: 768px) {
      .sidebar { display: none; }
      .board { grid-template-columns: 1fr; }
      .week-grid { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <div class="app">
    <!-- Sidebar -->
    <nav class="sidebar">
      <div class="logo">🎯 Mission Control</div>
      
      <div class="nav-item active" data-view="board">
        <span>📋</span> Task Board
      </div>
      <div class="nav-item" data-view="activity">
        <span>📡</span> Activity Feed
      </div>
      <div class="nav-item" data-view="calendar">
        <span>📅</span> Calendar
      </div>
      <div class="nav-item" data-view="agents">
        <span>🤖</span> Agents
      </div>
      
      <div class="nav-divider"></div>
      
      <div class="search-hint">
        Press <kbd>⌘</kbd> + <kbd>K</kbd> to search
      </div>
    </nav>
    
    <!-- Main Content -->
    <main class="main-content">
      <!-- Board View -->
      <div id="view-board" class="view active">
        <div class="header">
          <h1>Task Board</h1>
          <div class="stats-row">
            <div class="stat-card">
              <div class="stat-value" id="stat-today">0</div>
              <div class="stat-label">Completed Today</div>
            </div>
            <div class="stat-card">
              <div class="stat-value" id="stat-week">0</div>
              <div class="stat-label">This Week</div>
            </div>
            <div class="stat-card">
              <div class="stat-value" id="stat-active">0</div>
              <div class="stat-label">Active</div>
            </div>
          </div>
        </div>
        
        <div class="board">
          <div class="column">
            <div class="column-header">
              📋 To Do
              <span class="column-count" id="count-todo">0</span>
            </div>
            <div id="column-todo" class="column-tasks"></div>
          </div>
          
          <div class="column">
            <div class="column-header">
              🔨 In Progress
              <span class="column-count" id="count-in-progress">0</span>
            </div>
            <div id="column-in-progress" class="column-tasks"></div>
          </div>
          
          <div class="column">
            <div class="column-header">
              👀 Review
              <span class="column-count" id="count-review">0</span>
            </div>
            <div id="column-review" class="column-tasks"></div>
          </div>
          
          <div class="column">
            <div class="column-header">
              ✅ Complete
              <span class="column-count" id="count-complete">0</span>
            </div>
            <div id="column-complete" class="column-tasks"></div>
          </div>
        </div>
      </div>
      
      <!-- Activity View -->
      <div id="view-activity" class="view">
        <div class="header">
          <h1>Activity Feed</h1>
        </div>
        
        <div class="activity-section">
          <div class="activity-feed">
            <h2>📡 All Activity</h2>
            
            <div class="activity-filters">
              <select id="filter-agent" class="filter-select">
                <option value="">All Agents</option>
              </select>
              <select id="filter-type" class="filter-select">
                <option value="">All Types</option>
                <option value="task_created">Task Created</option>
                <option value="task_updated">Task Updated</option>
                <option value="task_deleted">Task Deleted</option>
              </select>
              <input type="date" id="filter-date" class="filter-select">
            </div>
            
            <div id="activity-list" class="activity-list"></div>
          </div>
          
          <div class="agent-panel">
            <h3>🤖 Agents</h3>
            <div id="agent-sidebar"></div>
          </div>
        </div>
      </div>
      
      <!-- Calendar View -->
      <div id="view-calendar" class="view">
        <div class="header">
          <h1>Weekly Calendar</h1>
        </div>
        
        <div class="calendar-container">
          <div class="calendar-grid">
            <div class="calendar-header">
              <h2 id="week-range">Week View</h2>
              <div class="calendar-nav">
                <button class="cal-btn" id="prev-week">← Prev</button>
                <button class="cal-btn" id="today-btn">Today</button>
                <button class="cal-btn" id="next-week">Next →</button>
              </div>
            </div>
            <div id="week-grid" class="week-grid"></div>
          </div>
          
          <div class="sidebar-panels">
            <div class="side-panel">
              <h3>⏰ Next Up</h3>
              <div id="next-up"></div>
            </div>
            
            <div class="side-panel">
              <h3>🔄 Always Running</h3>
              <div id="always-running"></div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Agents View -->
      <div id="view-agents" class="view">
        <div class="header">
          <h1>Agent Workforce</h1>
        </div>
        
        <div class="org-chart">
          <div id="org-chart-content"></div>
        </div>
      </div>
    </main>
  </div>
  
  <!-- Search Modal -->
  <div id="search-modal" class="search-modal">
    <div class="search-container">
      <div class="search-input-container">
        <span>🔍</span>
        <input type="text" id="search-input" class="search-input" placeholder="Search tasks, memory, activity...">
      </div>
      <div id="search-results" class="search-results">
        <div class="search-empty">Start typing to search...</div>
      </div>
    </div>
  </div>
  
  <script>
    const API = '/api';
    let currentWeekStart = null;
    
    // ========================================
    // Navigation
    // ========================================
    
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', () => {
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        
        item.classList.add('active');
        const viewId = 'view-' + item.dataset.view;
        document.getElementById(viewId).classList.add('active');
        
        // Refresh view data
        if (item.dataset.view === 'board') loadTasks();
        if (item.dataset.view === 'activity') loadActivity();
        if (item.dataset.view === 'calendar') loadCalendar();
        if (item.dataset.view === 'agents') loadAgentChart();
      });
    });
    
    // ========================================
    // Board View
    // ========================================
    
    async function loadTasks() {
      const res = await fetch(API + '/tasks');
      const tasks = await res.json();
      
      ['todo', 'in-progress', 'review', 'complete'].forEach(status => {
        document.getElementById('column-' + status).innerHTML = '';
      });
      
      tasks.sort((a, b) => {
        if (a.scheduledAt && b.scheduledAt) return new Date(a.scheduledAt) - new Date(b.scheduledAt);
        if (a.scheduledAt) return -1;
        if (b.scheduledAt) return 1;
        return 0;
      });
      
      tasks.forEach(task => {
        const el = document.createElement('div');
        el.className = 'task priority-' + task.priority;
        
        let scheduleHtml = '';
        if (task.scheduledAt) {
          const date = new Date(task.scheduledAt);
          const timeStr = date.toLocaleTimeString('en-NZ', { hour: '2-digit', minute: '2-digit' });
          const dateStr = date.toLocaleDateString('en-NZ', { weekday: 'short', month: 'short', day: 'numeric' });
          const recurring = task.recurring ? ' 🔄' : '';
          scheduleHtml = '<div class="task-schedule">📅 ' + dateStr + ' ' + timeStr + recurring + '</div>';
        }
        
        el.innerHTML = \`
          <div class="task-title">\${task.title}</div>
          \${scheduleHtml}
          <div class="task-meta">
            <span class="tag">\${task.priority}</span>
            <span class="tag">\${task.project}</span>
            \${task.assignee ? '<span class="tag">@' + task.assignee + '</span>' : ''}
          </div>
        \`;
        el.addEventListener('click', () => toggleTaskStatus(task));
        
        const column = document.getElementById('column-' + task.status);
        if (column) column.appendChild(el);
      });
      
      const counts = tasks.reduce((acc, t) => {
        acc[t.status] = (acc[t.status] || 0) + 1;
        return acc;
      }, {});
      
      ['todo', 'in-progress', 'review', 'complete'].forEach(status => {
        document.getElementById('count-' + status).textContent = counts[status] || 0;
      });
      
      loadStats();
    }
    
    async function toggleTaskStatus(task) {
      const statusFlow = ['todo', 'in-progress', 'review', 'complete'];
      const currentIndex = statusFlow.indexOf(task.status);
      const nextStatus = statusFlow[(currentIndex + 1) % statusFlow.length];
      
      await fetch(API + '/tasks/' + task.id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      });
      
      loadTasks();
    }
    
    async function loadStats() {
      const res = await fetch(API + '/stats');
      const stats = await res.json();
      
      document.getElementById('stat-today').textContent = stats.completedToday;
      document.getElementById('stat-week').textContent = stats.completedThisWeek;
      document.getElementById('stat-active').textContent = 
        (stats.byStatus['in-progress'] || 0) + (stats.byStatus['review'] || 0);
    }
    
    // ========================================
    // Activity View
    // ========================================
    
    async function loadActivity() {
      const agent = document.getElementById('filter-agent').value;
      const type = document.getElementById('filter-type').value;
      const date = document.getElementById('filter-date').value;
      
      let url = API + '/activity?limit=100';
      if (agent) url += '&agent=' + encodeURIComponent(agent);
      if (type) url += '&type=' + encodeURIComponent(type);
      if (date) url += '&date=' + encodeURIComponent(date);
      
      const res = await fetch(url);
      const activity = await res.json();
      
      const html = activity.map(item => \`
        <div class="activity-item">
          <div class="activity-icon \${getActivityIcon(item).class}">
            \${getActivityIcon(item).icon}
          </div>
          <div class="activity-content">
            <div class="activity-title">\${item.title || item.type}</div>
            <div class="activity-desc">\${item.description || ''}</div>
            <div class="activity-agent">@\${item.agent || 'system'}</div>
          </div>
          <div class="activity-time">\${formatTime(item.timestamp)}</div>
        </div>
      \`).join('');
      
      document.getElementById('activity-list').innerHTML = html || '<div class="search-empty">No activity found</div>';
      
      loadAgentSidebar();
    }
    
    function getActivityIcon(item) {
      if (item.type === 'task_created') return { icon: '📝', class: 'task' };
      if (item.type === 'task_updated') return { icon: '🔄', class: 'task' };
      if (item.type === 'task_deleted') return { icon: '🗑️', class: 'task' };
      if (item.status === 'success') return { icon: '✅', class: 'success' };
      if (item.status === 'error') return { icon: '❌', class: 'error' };
      return { icon: '📌', class: 'agent' };
    }
    
    async function loadAgentSidebar() {
      const res = await fetch(API + '/agents');
      const agents = await res.json();
      
      // Populate filter dropdown
      const select = document.getElementById('filter-agent');
      const currentValue = select.value;
      select.innerHTML = '<option value="">All Agents</option>';
      agents.forEach(a => {
        select.innerHTML += '<option value="' + a.id + '">' + a.name + '</option>';
      });
      select.value = currentValue;
      
      // Render sidebar
      const html = agents.map(a => \`
        <div class="agent-card">
          <div class="agent-header">
            <div class="agent-name">
              <div class="status-dot \${a.status}"></div>
              \${a.name}
            </div>
            <div class="agent-role">\${a.role}</div>
          </div>
          \${a.currentTask ? '<div class="agent-task">📋 ' + a.currentTask + '</div>' : ''}
        </div>
      \`).join('');
      
      document.getElementById('agent-sidebar').innerHTML = html;
    }
    
    // Activity filters
    document.getElementById('filter-agent').addEventListener('change', loadActivity);
    document.getElementById('filter-type').addEventListener('change', loadActivity);
    document.getElementById('filter-date').addEventListener('change', loadActivity);
    
    // ========================================
    // Calendar View
    // ========================================
    
    async function loadCalendar(startDate = null) {
      let url = API + '/calendar';
      if (startDate) url += '?start=' + encodeURIComponent(startDate);
      
      const res = await fetch(url);
      const data = await res.json();
      
      currentWeekStart = new Date(data.weekStart);
      
      // Update header
      const weekEnd = new Date(data.weekEnd);
      document.getElementById('week-range').textContent = 
        currentWeekStart.toLocaleDateString('en-NZ', { month: 'short', day: 'numeric' }) + 
        ' - ' + 
        weekEnd.toLocaleDateString('en-NZ', { month: 'short', day: 'numeric', year: 'numeric' });
      
      // Render week grid
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      let gridHtml = '';
      for (let d = 0; d < 7; d++) {
        const dayDate = new Date(currentWeekStart);
        dayDate.setDate(dayDate.getDate() + d);
        
        const isToday = dayDate.getTime() === today.getTime();
        
        // Get tasks for this day
        const dayTasks = data.tasks.filter(t => {
          const taskDate = new Date(t.displayDate || t.scheduledAt);
          return taskDate.toDateString() === dayDate.toDateString();
        });
        
        const tasksHtml = dayTasks.map(t => {
          const time = new Date(t.scheduledAt).toLocaleTimeString('en-NZ', { hour: '2-digit', minute: '2-digit' });
          const classes = [t.priority === 'high' ? 'high' : '', t.recurring ? 'recurring' : ''].join(' ');
          return \`
            <div class="cal-task \${classes}">
              <div class="cal-task-time">\${time} \${t.recurring ? '🔄' : ''}</div>
              <div>\${t.title}</div>
            </div>
          \`;
        }).join('');
        
        gridHtml += \`
          <div class="day-column \${isToday ? 'today' : ''}">
            <div class="day-header">
              <div class="day-name">\${days[d]}</div>
              <div class="day-date">\${dayDate.getDate()}</div>
            </div>
            \${tasksHtml}
          </div>
        \`;
      }
      
      document.getElementById('week-grid').innerHTML = gridHtml;
      
      // Next Up
      const nextUpHtml = data.nextUp.map(t => \`
        <div class="next-item">
          <span>\${t.title}</span>
          <span class="countdown">\${formatCountdown(t.countdown)}</span>
        </div>
      \`).join('') || '<div class="search-empty">Nothing upcoming</div>';
      document.getElementById('next-up').innerHTML = nextUpHtml;
      
      // Always Running
      const alwaysHtml = data.alwaysRunning.map(t => \`
        <div class="always-item">\${t.title}</div>
      \`).join('') || '<div class="search-empty">No continuous tasks</div>';
      document.getElementById('always-running').innerHTML = alwaysHtml;
    }
    
    function formatCountdown(minutes) {
      if (minutes < 60) return minutes + 'm';
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      if (hours < 24) return hours + 'h ' + mins + 'm';
      const days = Math.floor(hours / 24);
      return days + 'd ' + (hours % 24) + 'h';
    }
    
    document.getElementById('prev-week').addEventListener('click', () => {
      const prev = new Date(currentWeekStart);
      prev.setDate(prev.getDate() - 7);
      loadCalendar(prev.toISOString());
    });
    
    document.getElementById('next-week').addEventListener('click', () => {
      const next = new Date(currentWeekStart);
      next.setDate(next.getDate() + 7);
      loadCalendar(next.toISOString());
    });
    
    document.getElementById('today-btn').addEventListener('click', () => {
      loadCalendar();
    });
    
    // ========================================
    // Agents Org Chart
    // ========================================
    
    async function loadAgentChart() {
      const res = await fetch(API + '/agents');
      const agents = await res.json();
      
      const mainAgent = agents.find(a => !a.parent);
      const subAgents = agents.filter(a => a.parent);
      
      let html = '';
      
      // Main agent
      if (mainAgent) {
        html += \`
          <div class="org-level">
            <div class="org-agent main">
              <div class="org-agent-name">\${mainAgent.name}</div>
              <div class="org-agent-role">\${mainAgent.role}</div>
              <div class="org-agent-status">
                <div class="status-dot \${mainAgent.status}"></div>
                \${mainAgent.status}
              </div>
              \${mainAgent.currentTask ? '<div style="margin-top:10px;font-size:12px;opacity:0.8">📋 ' + mainAgent.currentTask + '</div>' : ''}
              <div class="org-connector"></div>
            </div>
          </div>
        \`;
      }
      
      // Sub agents
      if (subAgents.length > 0) {
        html += '<div class="org-level" style="position:relative;">';
        html += '<div class="org-horizontal"></div>';
        
        subAgents.forEach(a => {
          html += \`
            <div class="org-agent org-branch">
              <div class="org-agent-name">\${a.name}</div>
              <div class="org-agent-role">\${a.role}</div>
              <div class="org-agent-status">
                <div class="status-dot \${a.status}"></div>
                \${a.status}
              </div>
              \${a.currentTask ? '<div style="margin-top:10px;font-size:12px;opacity:0.8">📋 ' + a.currentTask + '</div>' : ''}
            </div>
          \`;
        });
        
        html += '</div>';
      }
      
      document.getElementById('org-chart-content').innerHTML = html || '<div class="search-empty">No agents registered</div>';
    }
    
    // ========================================
    // Search
    // ========================================
    
    const searchModal = document.getElementById('search-modal');
    const searchInput = document.getElementById('search-input');
    let searchTimeout = null;
    
    // Open with Cmd+K
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchModal.classList.add('active');
        searchInput.focus();
      }
      
      if (e.key === 'Escape') {
        searchModal.classList.remove('active');
      }
    });
    
    // Close on backdrop click
    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) {
        searchModal.classList.remove('active');
      }
    });
    
    // Search as you type
    searchInput.addEventListener('input', () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(performSearch, 300);
    });
    
    async function performSearch() {
      const query = searchInput.value.trim();
      
      if (query.length < 2) {
        document.getElementById('search-results').innerHTML = 
          '<div class="search-empty">Start typing to search...</div>';
        return;
      }
      
      const res = await fetch(API + '/search?q=' + encodeURIComponent(query));
      const results = await res.json();
      
      let html = '';
      
      if (results.tasks.length > 0) {
        html += '<div class="search-section">';
        html += '<div class="search-section-title">Tasks</div>';
        results.tasks.forEach(t => {
          html += \`
            <div class="search-result" onclick="goToTask('\${t.id}')">
              <div class="search-result-title">\${t.title}</div>
              <div class="search-result-meta">\${t.project} · \${t.status}</div>
            </div>
          \`;
        });
        html += '</div>';
      }
      
      if (results.activity.length > 0) {
        html += '<div class="search-section">';
        html += '<div class="search-section-title">Activity</div>';
        results.activity.forEach(a => {
          html += \`
            <div class="search-result" onclick="goToActivity()">
              <div class="search-result-title">\${a.title || a.type}</div>
              <div class="search-result-meta">\${a.agent} · \${formatTime(a.timestamp)}</div>
            </div>
          \`;
        });
        html += '</div>';
      }
      
      if (results.memory.length > 0) {
        html += '<div class="search-section">';
        html += '<div class="search-section-title">Memory Files</div>';
        results.memory.forEach(m => {
          const matchText = m.matches[0]?.text || '';
          html += \`
            <div class="search-result">
              <div class="search-result-title">📄 \${m.file}</div>
              <div class="search-result-meta">\${matchText.substring(0, 80)}...</div>
            </div>
          \`;
        });
        html += '</div>';
      }
      
      if (!html) {
        html = '<div class="search-empty">No results found</div>';
      }
      
      document.getElementById('search-results').innerHTML = html;
    }
    
    function goToTask(taskId) {
      searchModal.classList.remove('active');
      document.querySelector('[data-view="board"]').click();
    }
    
    function goToActivity() {
      searchModal.classList.remove('active');
      document.querySelector('[data-view="activity"]').click();
    }
    
    // ========================================
    // Utilities
    // ========================================
    
    function formatTime(timestamp) {
      const date = new Date(timestamp);
      const now = new Date();
      const diff = now - date;
      
      if (diff < 60000) return 'just now';
      if (diff < 3600000) return Math.floor(diff / 60000) + 'm ago';
      if (diff < 86400000) return Math.floor(diff / 3600000) + 'h ago';
      if (diff < 604800000) return Math.floor(diff / 86400000) + 'd ago';
      return date.toLocaleDateString();
    }
    
    // ========================================
    // Initialize
    // ========================================
    
    loadTasks();
    loadActivity();
    loadCalendar();
    loadAgentChart();
    
    // Auto-refresh every 5 seconds
    setInterval(() => {
      const activeView = document.querySelector('.view.active').id;
      if (activeView === 'view-board') loadTasks();
      if (activeView === 'view-activity') loadActivity();
      if (activeView === 'view-calendar') loadCalendar(currentWeekStart?.toISOString());
      if (activeView === 'view-agents') loadAgentChart();
    }, 5000);
  </script>
</body>
</html>`;

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(html);
}

// ============================================================================
// CLI
// ============================================================================

async function main() {
  ensureDirectories();
  
  const args = process.argv.slice(2);
  const command = args[0];
  
  if (!command || command === 'serve') {
    startServer();
    return;
  }
  
  try {
    switch (command) {
      case 'add':
        const title = args.find(a => a.startsWith('--title='))?.split('=').slice(1).join('=');
        const priority = args.find(a => a.startsWith('--priority='))?.split('=')[1] || 'medium';
        const project = args.find(a => a.startsWith('--project='))?.split('=')[1] || 'General';
        
        if (!title) {
          console.error('❌ Missing --title argument');
          process.exit(1);
        }
        
        const task = addTask({ title, priority, project });
        console.log(`✅ Task created: ${task.id}`);
        break;
        
      case 'log':
        const agent = args.find(a => a.startsWith('--agent='))?.split('=')[1] || 'main-agent';
        const action = args.find(a => a.startsWith('--action='))?.split('=')[1];
        const desc = args.find(a => a.startsWith('--desc='))?.split('=').slice(1).join('=');
        const status = args.find(a => a.startsWith('--status='))?.split('=')[1] || 'success';
        
        if (!action) {
          console.error('❌ Missing --action argument');
          process.exit(1);
        }
        
        const event = logActivity({
          type: 'agent_action',
          agent,
          action,
          description: desc || action,
          status
        });
        console.log(`✅ Activity logged: ${event.id}`);
        break;
        
      case 'agent':
        const agentId = args.find(a => a.startsWith('--id='))?.split('=')[1];
        const agentStatus = args.find(a => a.startsWith('--status='))?.split('=')[1] || 'online';
        const currentTask = args.find(a => a.startsWith('--task='))?.split('=').slice(1).join('=');
        
        if (!agentId) {
          console.error('❌ Missing --id argument');
          process.exit(1);
        }
        
        updateAgentStatus(agentId, agentStatus, currentTask);
        console.log(`✅ Agent ${agentId} updated: ${agentStatus}`);
        break;
        
      default:
        console.log('Mission Control V2 - Commands:');
        console.log('  node mission-control-v2.cjs                  # Start server');
        console.log('  node mission-control-v2.cjs add --title=...  # Add task');
        console.log('  node mission-control-v2.cjs log --action=... # Log activity');
        console.log('  node mission-control-v2.cjs agent --id=...   # Update agent');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { addTask, updateTask, deleteTask, getTasks, getStats, logActivity, updateAgentStatus, searchAll };
