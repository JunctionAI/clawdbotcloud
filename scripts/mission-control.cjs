#!/usr/bin/env node

/**
 * MISSION CONTROL DASHBOARD
 * 
 * Kanban board tracking all autonomous tasks with web interface.
 * 
 * Usage:
 *   node scripts/mission-control.js              # Start web server
 *   node scripts/mission-control.js add ...      # Add task
 *   node scripts/mission-control.js update ...   # Update task
 *   node scripts/mission-control.js activity     # Show activity feed
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
}

function loadTasks() {
  return JSON.parse(fs.readFileSync(CONFIG.tasksFile, 'utf8'));
}

function saveTasks(tasks) {
  fs.writeFileSync(CONFIG.tasksFile, JSON.stringify(tasks, null, 2));
}

function loadActivity() {
  return JSON.parse(fs.readFileSync(CONFIG.activityFile, 'utf8'));
}

function saveActivity(activity) {
  fs.writeFileSync(CONFIG.activityFile, JSON.stringify(activity, null, 2));
}

function logActivity(event) {
  const activity = loadActivity();
  activity.unshift({
    ...event,
    timestamp: new Date().toISOString()
  });
  
  // Keep last 1000 events
  if (activity.length > 1000) {
    activity.splice(1000);
  }
  
  saveActivity(activity);
}

function updateState() {
  if (!fs.existsSync(CONFIG.stateJsonPath)) return;
  
  const state = JSON.parse(fs.readFileSync(CONFIG.stateJsonPath, 'utf8'));
  
  if (!state.automationSystems) {
    state.automationSystems = {};
  }
  
  state.automationSystems.missionControl = {
    script: 'scripts/mission-control.js',
    description: 'Kanban dashboard tracking all autonomous tasks',
    features: [
      'Kanban board (To Do → In Progress → Review → Complete)',
      'Activity feed',
      'Web interface (localhost:3100)',
      'Auto-updates from scripts',
      'Task management API'
    ],
    url: `http://localhost:${CONFIG.port}`,
    lastUpdated: new Date().toISOString()
  };
  
  fs.writeFileSync(CONFIG.stateJsonPath, JSON.stringify(state, null, 2));
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
    id: generateTaskId(),
    title: taskData.title,
    description: taskData.description || '',
    status: 'todo',
    priority: taskData.priority || 'medium',
    tags: taskData.tags || [],
    project: taskData.project || 'General',
    assignee: taskData.assignee || 'autonomous-agent',
    estimatedHours: taskData.estimatedHours || null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    completedAt: null
  };
  
  tasks.push(task);
  saveTasks(tasks);
  
  logActivity({
    type: 'task_created',
    taskId: task.id,
    title: task.title,
    status: task.status
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
    taskId: taskId,
    title: tasks[taskIndex].title,
    changes: updates,
    oldStatus,
    newStatus: tasks[taskIndex].status
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
    taskId: taskId,
    title: task.title
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
      inProgress: tasks.filter(t => t.status === 'in-progress').length,
      review: tasks.filter(t => t.status === 'review').length,
      complete: tasks.filter(t => t.status === 'complete').length
    },
    completedToday: tasks.filter(t => 
      t.status === 'complete' && 
      new Date(t.completedAt) >= todayStart
    ).length,
    completedThisWeek: tasks.filter(t => 
      t.status === 'complete' && 
      new Date(t.completedAt) >= weekStart
    ).length
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
    
    // Route handling
    if (req.url === '/' && req.method === 'GET') {
      serveHTML(res);
    } else if (req.url === '/api/tasks' && req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(getTasks()));
    } else if (req.url === '/api/tasks' && req.method === 'POST') {
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
    } else if (req.url.startsWith('/api/tasks/') && req.method === 'PATCH') {
      const taskId = req.url.split('/')[3];
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
    } else if (req.url.startsWith('/api/tasks/') && req.method === 'DELETE') {
      const taskId = req.url.split('/')[3];
      try {
        deleteTask(taskId);
        res.writeHead(204);
        res.end();
      } catch (error) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
      }
    } else if (req.url === '/api/activity' && req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(loadActivity().slice(0, 50)));
    } else if (req.url === '/api/stats' && req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(getStats()));
    } else {
      res.writeHead(404);
      res.end('Not Found');
    }
  });
  
  server.listen(CONFIG.port, () => {
    console.log(`🎯 Mission Control Dashboard running at http://localhost:${CONFIG.port}`);
    console.log('Press Ctrl+C to stop');
  });
}

function serveHTML(res) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mission Control - Clawdbot</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #0a0e27;
      color: #e0e6ed;
      padding: 20px;
    }
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 2px solid #1e293b;
    }
    h1 { font-size: 28px; color: #60a5fa; }
    .stats {
      display: flex;
      gap: 20px;
      font-size: 14px;
    }
    .stat { text-align: center; }
    .stat-value { font-size: 24px; font-weight: bold; color: #60a5fa; }
    .stat-label { color: #94a3b8; margin-top: 5px; }
    .board {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      margin-bottom: 30px;
    }
    .column {
      background: #1e293b;
      border-radius: 8px;
      padding: 15px;
      min-height: 400px;
    }
    .column-header {
      font-weight: bold;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 2px solid #334155;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .column-count {
      background: #334155;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 12px;
    }
    .task {
      background: #334155;
      border-radius: 6px;
      padding: 12px;
      margin-bottom: 10px;
      cursor: pointer;
      transition: transform 0.2s;
    }
    .task:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    }
    .task-title {
      font-weight: 500;
      margin-bottom: 8px;
    }
    .task-meta {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      font-size: 12px;
      color: #94a3b8;
    }
    .tag {
      background: #0f172a;
      padding: 2px 8px;
      border-radius: 4px;
    }
    .priority-high { border-left: 3px solid #ef4444; }
    .priority-medium { border-left: 3px solid #f59e0b; }
    .priority-low { border-left: 3px solid #10b981; }
    .activity-feed {
      background: #1e293b;
      border-radius: 8px;
      padding: 20px;
      max-height: 300px;
      overflow-y: auto;
    }
    .activity-feed h2 {
      margin-bottom: 15px;
      color: #60a5fa;
    }
    .activity-item {
      padding: 10px 0;
      border-bottom: 1px solid #334155;
      font-size: 14px;
    }
    .activity-time {
      color: #94a3b8;
      font-size: 12px;
    }
    .add-btn {
      background: #60a5fa;
      color: #0a0e27;
      border: none;
      padding: 10px 20px;
      border-radius: 6px;
      cursor: pointer;
      font-weight: bold;
    }
    .add-btn:hover { background: #3b82f6; }
  </style>
</head>
<body>
  <header>
    <h1>🎯 Mission Control</h1>
    <div class="stats">
      <div class="stat">
        <div class="stat-value" id="stat-today">0</div>
        <div class="stat-label">Today</div>
      </div>
      <div class="stat">
        <div class="stat-value" id="stat-week">0</div>
        <div class="stat-label">This Week</div>
      </div>
      <div class="stat">
        <div class="stat-value" id="stat-total">0</div>
        <div class="stat-label">Total</div>
      </div>
    </div>
  </header>
  
  <div class="board">
    <div class="column">
      <div class="column-header">
        📋 To Do
        <span class="column-count" id="count-todo">0</span>
      </div>
      <div id="column-todo"></div>
    </div>
    
    <div class="column">
      <div class="column-header">
        🔨 In Progress
        <span class="column-count" id="count-in-progress">0</span>
      </div>
      <div id="column-in-progress"></div>
    </div>
    
    <div class="column">
      <div class="column-header">
        👀 Review
        <span class="column-count" id="count-review">0</span>
      </div>
      <div id="column-review"></div>
    </div>
    
    <div class="column">
      <div class="column-header">
        ✅ Complete
        <span class="column-count" id="count-complete">0</span>
      </div>
      <div id="column-complete"></div>
    </div>
  </div>
  
  <div class="activity-feed">
    <h2>📡 Activity Feed</h2>
    <div id="activity"></div>
  </div>
  
  <script>
    const API = 'http://localhost:${CONFIG.port}/api';
    
    async function loadTasks() {
      const res = await fetch(API + '/tasks');
      const tasks = await res.json();
      
      // Clear columns
      ['todo', 'in-progress', 'review', 'complete'].forEach(status => {
        document.getElementById('column-' + status).innerHTML = '';
      });
      
      // Render tasks
      tasks.forEach(task => {
        const el = document.createElement('div');
        el.className = 'task priority-' + task.priority;
        el.innerHTML = \`
          <div class="task-title">\${task.title}</div>
          <div class="task-meta">
            <span class="tag">\${task.priority}</span>
            <span class="tag">\${task.project}</span>
          </div>
        \`;
        el.addEventListener('click', () => toggleTaskStatus(task));
        document.getElementById('column-' + task.status).appendChild(el);
      });
      
      // Update counts
      const counts = tasks.reduce((acc, t) => {
        acc[t.status] = (acc[t.status] || 0) + 1;
        return acc;
      }, {});
      
      ['todo', 'in-progress', 'review', 'complete'].forEach(status => {
        document.getElementById('count-' + status).textContent = counts[status] || 0;
      });
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
      loadActivity();
      loadStats();
    }
    
    async function loadActivity() {
      const res = await fetch(API + '/activity');
      const activity = await res.json();
      
      const html = activity.slice(0, 10).map(item => \`
        <div class="activity-item">
          <div>\${formatActivity(item)}</div>
          <div class="activity-time">\${formatTime(item.timestamp)}</div>
        </div>
      \`).join('');
      
      document.getElementById('activity').innerHTML = html;
    }
    
    async function loadStats() {
      const res = await fetch(API + '/stats');
      const stats = await res.json();
      
      document.getElementById('stat-today').textContent = stats.completedToday;
      document.getElementById('stat-week').textContent = stats.completedThisWeek;
      document.getElementById('stat-total').textContent = stats.byStatus.complete;
    }
    
    function formatActivity(item) {
      if (item.type === 'task_created') {
        return \`📝 Created: \${item.title}\`;
      } else if (item.type === 'task_updated') {
        return \`🔄 Updated: \${item.title} → \${item.newStatus}\`;
      } else if (item.type === 'task_deleted') {
        return \`🗑️  Deleted: \${item.title}\`;
      }
      return item.type;
    }
    
    function formatTime(timestamp) {
      const date = new Date(timestamp);
      const now = new Date();
      const diff = now - date;
      
      if (diff < 60000) return 'just now';
      if (diff < 3600000) return Math.floor(diff / 60000) + 'm ago';
      if (diff < 86400000) return Math.floor(diff / 3600000) + 'h ago';
      return date.toLocaleDateString();
    }
    
    // Initial load
    loadTasks();
    loadActivity();
    loadStats();
    
    // Auto-refresh every 5 seconds
    setInterval(() => {
      loadTasks();
      loadActivity();
      loadStats();
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
  updateState();
  
  const args = process.argv.slice(2);
  const command = args[0];
  
  if (!command || command === 'serve') {
    startServer();
    return;
  }
  
  try {
    switch (command) {
      case 'add':
        const title = args.find(a => a.startsWith('--title='))?.split('=')[1];
        const priority = args.find(a => a.startsWith('--priority='))?.split('=')[1] || 'medium';
        const project = args.find(a => a.startsWith('--project='))?.split('=')[1] || 'General';
        
        if (!title) {
          console.error('❌ Missing --title argument');
          process.exit(1);
        }
        
        const task = addTask({ title, priority, project });
        console.log(`✅ Task created: ${task.id}`);
        console.log(JSON.stringify(task, null, 2));
        break;
        
      case 'update':
        const taskId = args.find(a => a.startsWith('--id='))?.split('=')[1];
        const status = args.find(a => a.startsWith('--status='))?.split('=')[1];
        
        if (!taskId) {
          console.error('❌ Missing --id argument');
          process.exit(1);
        }
        
        const updates = {};
        if (status) updates.status = status;
        
        const updated = updateTask(taskId, updates);
        console.log(`✅ Task updated: ${taskId}`);
        console.log(JSON.stringify(updated, null, 2));
        break;
        
      case 'activity':
        const activity = loadActivity().slice(0, 20);
        console.log('📡 Recent Activity:\n');
        activity.forEach((item, idx) => {
          console.log(`${idx + 1}. [${item.timestamp}] ${item.type}: ${item.title || ''}`);
        });
        break;
        
      default:
        console.log('Usage:');
        console.log('  node scripts/mission-control.js              # Start web server');
        console.log('  node scripts/mission-control.js add ...      # Add task');
        console.log('  node scripts/mission-control.js update ...   # Update task');
        console.log('  node scripts/mission-control.js activity     # Show activity');
        process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { addTask, updateTask, deleteTask, getTasks, getStats, logActivity };
