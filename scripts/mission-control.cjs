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
// SCHEDULED TASK ALERTS
// ============================================================================

/**
 * Get tasks scheduled within the next N hours
 * @param {number} hours - Hours ahead to check (default 2)
 * @returns {Array} Tasks with scheduledAt within the time window
 */
function getUpcomingTasks(hours = 2) {
  const tasks = loadTasks();
  const now = new Date();
  const cutoff = new Date(now.getTime() + hours * 60 * 60 * 1000);
  
  return tasks
    .filter(t => {
      if (!t.scheduledAt) return false;
      if (t.status === 'complete') return false;
      const scheduled = new Date(t.scheduledAt);
      return scheduled >= now && scheduled <= cutoff;
    })
    .sort((a, b) => new Date(a.scheduledAt) - new Date(b.scheduledAt));
}

/**
 * Check for tasks due within the next 30 minutes (for alerting)
 * @returns {Array} Tasks needing alerts
 */
function checkScheduledTasks() {
  const tasks = loadTasks();
  const now = new Date();
  const thirtyMinsFromNow = new Date(now.getTime() + 30 * 60 * 1000);
  
  return tasks
    .filter(t => {
      if (!t.scheduledAt) return false;
      if (t.status === 'complete') return false;
      const scheduled = new Date(t.scheduledAt);
      return scheduled >= now && scheduled <= thirtyMinsFromNow;
    })
    .map(t => {
      const scheduled = new Date(t.scheduledAt);
      const minsUntil = Math.round((scheduled - now) / 60000);
      return {
        ...t,
        minsUntil,
        timeUntil: minsUntil <= 1 ? 'NOW!' : `in ${minsUntil} mins`
      };
    })
    .sort((a, b) => a.minsUntil - b.minsUntil);
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
    } else if (req.url === '/api/upcoming' && req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(getUpcomingTasks(2)));
    } else if (req.url === '/api/alerts' && req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(checkScheduledTasks()));
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
  <title>🎯 Mission Control - Tom's Command Center</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%);
      color: #e0e6ed;
      padding: 20px;
      min-height: 100vh;
    }
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 2px solid #1e293b;
    }
    h1 { font-size: 32px; color: #60a5fa; display: flex; align-items: center; gap: 12px; }
    .live-dot { width: 12px; height: 12px; background: #10b981; border-radius: 50%; animation: pulse 2s infinite; }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
    .stats {
      display: flex;
      gap: 30px;
      font-size: 14px;
    }
    .stat { 
      text-align: center; 
      background: rgba(255,255,255,0.05);
      padding: 15px 25px;
      border-radius: 12px;
      border: 1px solid rgba(255,255,255,0.1);
    }
    .stat-value { font-size: 32px; font-weight: bold; color: #60a5fa; }
    .stat-label { color: #94a3b8; margin-top: 5px; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; }
    .board {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      margin-bottom: 30px;
    }
    @media (max-width: 1200px) { .board { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 600px) { .board { grid-template-columns: 1fr; } }
    .column {
      background: rgba(30, 41, 59, 0.8);
      border-radius: 12px;
      padding: 20px;
      min-height: 400px;
      border: 1px solid rgba(255,255,255,0.1);
    }
    .column-header {
      font-weight: bold;
      margin-bottom: 15px;
      padding-bottom: 15px;
      border-bottom: 2px solid #334155;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 16px;
    }
    .column-count {
      background: #334155;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: bold;
    }
    .task {
      background: #334155;
      border-radius: 10px;
      padding: 16px;
      margin-bottom: 12px;
      cursor: pointer;
      transition: all 0.2s ease;
      position: relative;
      overflow: hidden;
    }
    .task:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.4);
      background: #3d4a63;
    }
    .task::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 4px;
      height: 100%;
    }
    .task-title {
      font-weight: 600;
      margin-bottom: 10px;
      font-size: 15px;
      line-height: 1.4;
    }
    .task-desc {
      font-size: 13px;
      color: #94a3b8;
      margin-bottom: 10px;
      line-height: 1.4;
    }
    .task-meta {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
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
    .task-schedule {
      font-size: 11px;
      color: #60a5fa;
      margin-bottom: 6px;
      padding: 3px 6px;
      background: #1e293b;
      border-radius: 4px;
      display: inline-block;
    }
    /* UPCOMING SECTION */
    .upcoming-section {
      background: linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(249, 115, 22, 0.15));
      border: 2px solid rgba(239, 68, 68, 0.5);
      border-radius: 16px;
      padding: 20px;
      margin-bottom: 25px;
      animation: urgentPulse 3s infinite;
    }
    @keyframes urgentPulse {
      0%, 100% { box-shadow: 0 0 20px rgba(239, 68, 68, 0.2); }
      50% { box-shadow: 0 0 30px rgba(239, 68, 68, 0.4); }
    }
    .upcoming-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 15px;
    }
    .upcoming-icon {
      font-size: 28px;
      animation: shake 1s infinite;
    }
    @keyframes shake {
      0%, 100% { transform: rotate(0deg); }
      25% { transform: rotate(-10deg); }
      75% { transform: rotate(10deg); }
    }
    .upcoming-title {
      font-size: 20px;
      font-weight: bold;
      color: #ef4444;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
    .upcoming-subtitle {
      color: #94a3b8;
      font-size: 13px;
    }
    .upcoming-tasks {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
    }
    .upcoming-task {
      background: rgba(30, 41, 59, 0.9);
      border-radius: 12px;
      padding: 16px 20px;
      border-left: 4px solid #ef4444;
      flex: 1;
      min-width: 280px;
      max-width: 400px;
    }
    .upcoming-task-time {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
    }
    .upcoming-countdown {
      background: linear-gradient(135deg, #ef4444, #f97316);
      color: white;
      padding: 4px 12px;
      border-radius: 20px;
      font-weight: bold;
      font-size: 13px;
    }
    .upcoming-countdown.imminent {
      animation: blink 0.5s infinite;
    }
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    .upcoming-task-title {
      font-size: 16px;
      font-weight: 600;
      color: #e0e6ed;
      margin-bottom: 6px;
    }
    .upcoming-task-desc {
      font-size: 13px;
      color: #94a3b8;
    }
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
    <h1>🎯 Mission Control <span class="live-dot"></span></h1>
    <div class="stats">
      <div class="stat">
        <div class="stat-value" id="stat-today">0</div>
        <div class="stat-label">Completed Today</div>
      </div>
      <div class="stat">
        <div class="stat-value" id="stat-week">0</div>
        <div class="stat-label">This Week</div>
      </div>
      <div class="stat">
        <div class="stat-value" id="stat-total">0</div>
        <div class="stat-label">All Time</div>
      </div>
    </div>
  </header>
  
  <div class="instructions" style="margin-bottom:20px; padding:12px 20px; background:rgba(96,165,250,0.1); border-radius:8px; border:1px solid rgba(96,165,250,0.3); font-size:13px; color:#94a3b8;">
    💡 <strong>Click</strong> a task to advance its status → <strong>Right-click</strong> to change status or delete → Press <strong>N</strong> to add new task
  </div>
  
  <!-- UPCOMING SECTION -->
  <div id="upcoming-section" class="upcoming-section" style="display:none;">
    <div class="upcoming-header">
      <span class="upcoming-icon">⏰</span>
      <span class="upcoming-title">UPCOMING</span>
      <span class="upcoming-subtitle">Tasks due within 2 hours</span>
    </div>
    <div id="upcoming-tasks" class="upcoming-tasks"></div>
  </div>
  
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
  
  <!-- Add Task Modal -->
  <div id="add-modal" class="modal" style="display:none;">
    <div class="modal-content">
      <h3>➕ Add New Task</h3>
      <input type="text" id="new-title" placeholder="Task title..." />
      <textarea id="new-desc" placeholder="Description (optional)"></textarea>
      <select id="new-priority">
        <option value="low">🟢 Low Priority</option>
        <option value="medium" selected>🟡 Medium Priority</option>
        <option value="high">🔴 High Priority</option>
        <option value="critical">⚫ Critical</option>
      </select>
      <select id="new-project">
        <option value="General">General</option>
        <option value="DBH">DBH</option>
        <option value="TWG">TWG</option>
        <option value="Agency">Agency</option>
        <option value="Apps">Apps</option>
        <option value="Admin">Admin</option>
      </select>
      <div class="modal-buttons">
        <button onclick="closeModal()">Cancel</button>
        <button onclick="addNewTask()" class="primary">Add Task</button>
      </div>
    </div>
  </div>
  
  <!-- Context Menu -->
  <div id="context-menu" class="context-menu" style="display:none;">
    <div onclick="setStatus('todo')">📋 To Do</div>
    <div onclick="setStatus('in-progress')">🔨 In Progress</div>
    <div onclick="setStatus('review')">👀 Review</div>
    <div onclick="setStatus('complete')">✅ Complete</div>
    <hr />
    <div onclick="deleteCurrentTask()" class="danger">🗑️ Delete</div>
  </div>

  <div class="bottom-bar">
    <div class="activity-feed">
      <h2>📡 Activity Feed</h2>
      <div id="activity"></div>
    </div>
    <button class="fab" onclick="openModal()">+ Add Task</button>
  </div>
  
  <style>
    .priority-critical::before { background: linear-gradient(180deg, #dc2626, #991b1b); }
    .priority-high::before { background: #ef4444; }
    .priority-medium::before { background: #f59e0b; }
    .priority-low::before { background: #10b981; }
    
    .bottom-bar { display: flex; gap: 20px; align-items: flex-start; }
    .activity-feed { flex: 1; background: rgba(30, 41, 59, 0.8); border-radius: 12px; padding: 20px; max-height: 300px; overflow-y: auto; border: 1px solid rgba(255,255,255,0.1); }
    .activity-feed h2 { margin-bottom: 15px; color: #60a5fa; font-size: 18px; }
    .activity-item { padding: 12px 0; border-bottom: 1px solid #334155; font-size: 14px; }
    .activity-time { color: #64748b; font-size: 12px; margin-top: 4px; }
    
    .fab { 
      position: fixed; bottom: 30px; right: 30px;
      width: 60px; height: 60px; border-radius: 50%;
      background: linear-gradient(135deg, #8b5cf6, #6366f1);
      border: none; color: white; font-size: 28px; cursor: pointer;
      box-shadow: 0 4px 20px rgba(139, 92, 246, 0.5);
      transition: all 0.3s;
    }
    .fab:hover { transform: scale(1.1); box-shadow: 0 6px 30px rgba(139, 92, 246, 0.7); }
    
    .modal { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 1000; }
    .modal-content { background: #1e293b; padding: 30px; border-radius: 16px; width: 90%; max-width: 500px; border: 1px solid rgba(255,255,255,0.1); }
    .modal-content h3 { margin-bottom: 20px; color: #60a5fa; }
    .modal-content input, .modal-content textarea, .modal-content select {
      width: 100%; padding: 12px; margin-bottom: 15px; border-radius: 8px;
      background: #334155; border: 1px solid #475569; color: white; font-size: 14px;
    }
    .modal-content textarea { min-height: 80px; resize: vertical; }
    .modal-buttons { display: flex; gap: 10px; justify-content: flex-end; margin-top: 10px; }
    .modal-buttons button { padding: 10px 20px; border-radius: 8px; border: none; cursor: pointer; font-weight: 600; }
    .modal-buttons button:first-child { background: #475569; color: white; }
    .modal-buttons button.primary { background: linear-gradient(135deg, #8b5cf6, #6366f1); color: white; }
    
    .context-menu { position: fixed; background: #1e293b; border-radius: 8px; padding: 8px 0; min-width: 180px; box-shadow: 0 10px 40px rgba(0,0,0,0.5); z-index: 1000; border: 1px solid rgba(255,255,255,0.1); }
    .context-menu div { padding: 10px 16px; cursor: pointer; transition: background 0.2s; }
    .context-menu div:hover { background: #334155; }
    .context-menu hr { border: none; border-top: 1px solid #334155; margin: 5px 0; }
    .context-menu .danger { color: #ef4444; }
    .context-menu .danger:hover { background: rgba(239, 68, 68, 0.2); }
  </style>
  
  <script>
    const API = 'http://localhost:${CONFIG.port}/api';
    let currentTask = null;
    
    async function loadTasks() {
      const res = await fetch(API + '/tasks');
      const tasks = await res.json();
      
      ['todo', 'in-progress', 'review', 'complete'].forEach(status => {
        document.getElementById('column-' + status).innerHTML = '';
      });
      
      // Sort: scheduled first, then by priority
      const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      tasks.sort((a, b) => {
        if (a.scheduledAt && !b.scheduledAt) return -1;
        if (!a.scheduledAt && b.scheduledAt) return 1;
        if (a.scheduledAt && b.scheduledAt) return new Date(a.scheduledAt) - new Date(b.scheduledAt);
        return (priorityOrder[a.priority] || 2) - (priorityOrder[b.priority] || 2);
      });

      tasks.forEach(task => {
        const el = document.createElement('div');
        el.className = 'task priority-' + (task.priority || 'medium');
        el.dataset.id = task.id;
        
        let scheduleHtml = '';
        if (task.scheduledAt) {
          const date = new Date(task.scheduledAt);
          const timeStr = date.toLocaleTimeString('en-NZ', { hour: '2-digit', minute: '2-digit' });
          const dateStr = date.toLocaleDateString('en-NZ', { weekday: 'short', month: 'short', day: 'numeric' });
          const recurring = task.recurring ? ' 🔄' : '';
          scheduleHtml = \`<div class="task-schedule">📅 \${dateStr} \${timeStr}\${recurring}</div>\`;
        }
        
        const descHtml = task.description ? \`<div class="task-desc">\${task.description}</div>\` : '';
        const blockedHtml = task.blockedReason ? \`<div class="task-desc" style="color:#f59e0b;">⚠️ \${task.blockedReason}</div>\` : '';
        
        el.innerHTML = \`
          <div class="task-title">\${task.title}</div>
          \${scheduleHtml}
          \${descHtml}
          \${blockedHtml}
          <div class="task-meta">
            <span class="tag" style="text-transform:capitalize;">\${task.priority || 'medium'}</span>
            <span class="tag">\${task.project || 'General'}</span>
            \${task.assignee ? \`<span class="tag">@\${task.assignee}</span>\` : ''}
          </div>
        \`;
        
        // Left click = advance status
        el.addEventListener('click', (e) => {
          if (e.button === 0) toggleTaskStatus(task);
        });
        
        // Right click = context menu
        el.addEventListener('contextmenu', (e) => {
          e.preventDefault();
          showContextMenu(e, task);
        });
        
        document.getElementById('column-' + task.status).appendChild(el);
      });
      
      const counts = tasks.reduce((acc, t) => { acc[t.status] = (acc[t.status] || 0) + 1; return acc; }, {});
      ['todo', 'in-progress', 'review', 'complete'].forEach(status => {
        document.getElementById('count-' + status).textContent = counts[status] || 0;
      });
    }
    
    function showContextMenu(e, task) {
      currentTask = task;
      const menu = document.getElementById('context-menu');
      menu.style.display = 'block';
      menu.style.left = e.pageX + 'px';
      menu.style.top = e.pageY + 'px';
    }
    
    document.addEventListener('click', () => {
      document.getElementById('context-menu').style.display = 'none';
    });
    
    async function setStatus(status) {
      if (!currentTask) return;
      await fetch(API + '/tasks/' + currentTask.id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      loadTasks(); loadActivity(); loadStats();
    }
    
    async function deleteCurrentTask() {
      if (!currentTask) return;
      if (!confirm('Delete "' + currentTask.title + '"?')) return;
      await fetch(API + '/tasks/' + currentTask.id, { method: 'DELETE' });
      loadTasks(); loadActivity(); loadStats();
    }
    
    async function toggleTaskStatus(task) {
      const flow = ['todo', 'in-progress', 'review', 'complete'];
      const next = flow[(flow.indexOf(task.status) + 1) % flow.length];
      await fetch(API + '/tasks/' + task.id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: next })
      });
      loadTasks(); loadActivity(); loadStats();
    }
    
    function openModal() { document.getElementById('add-modal').style.display = 'flex'; }
    function closeModal() { document.getElementById('add-modal').style.display = 'none'; }
    
    async function addNewTask() {
      const title = document.getElementById('new-title').value.trim();
      if (!title) return alert('Title required');
      
      await fetch(API + '/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          description: document.getElementById('new-desc').value.trim(),
          priority: document.getElementById('new-priority').value,
          project: document.getElementById('new-project').value
        })
      });
      
      document.getElementById('new-title').value = '';
      document.getElementById('new-desc').value = '';
      closeModal();
      loadTasks(); loadActivity(); loadStats();
    }
    
    async function loadActivity() {
      const res = await fetch(API + '/activity');
      const activity = await res.json();
      document.getElementById('activity').innerHTML = activity.slice(0, 10).map(item => \`
        <div class="activity-item">
          <div>\${formatActivity(item)}</div>
          <div class="activity-time">\${formatTime(item.timestamp)}</div>
        </div>
      \`).join('');
    }
    
    async function loadStats() {
      const res = await fetch(API + '/stats');
      const stats = await res.json();
      document.getElementById('stat-today').textContent = stats.completedToday;
      document.getElementById('stat-week').textContent = stats.completedThisWeek;
      document.getElementById('stat-total').textContent = stats.byStatus.complete;
    }
    
    function formatActivity(item) {
      if (item.type === 'task_created') return \`📝 Created: \${item.title}\`;
      if (item.type === 'task_updated') return \`🔄 \${item.title} → \${item.newStatus}\`;
      if (item.type === 'task_deleted') return \`🗑️ Deleted: \${item.title}\`;
      return item.type;
    }
    
    function formatTime(ts) {
      const diff = Date.now() - new Date(ts);
      if (diff < 60000) return 'just now';
      if (diff < 3600000) return Math.floor(diff / 60000) + 'm ago';
      if (diff < 86400000) return Math.floor(diff / 3600000) + 'h ago';
      return new Date(ts).toLocaleDateString();
    }
    
    async function loadUpcoming() {
      const res = await fetch(API + '/upcoming');
      const upcoming = await res.json();
      const section = document.getElementById('upcoming-section');
      const container = document.getElementById('upcoming-tasks');
      
      if (upcoming.length === 0) {
        section.style.display = 'none';
        return;
      }
      
      section.style.display = 'block';
      container.innerHTML = upcoming.map(task => {
        const scheduled = new Date(task.scheduledAt);
        const now = new Date();
        const minsUntil = Math.round((scheduled - now) / 60000);
        
        let countdown, countdownClass = '';
        if (minsUntil <= 0) {
          countdown = 'NOW!';
          countdownClass = 'imminent';
        } else if (minsUntil < 60) {
          countdown = minsUntil + ' mins';
          if (minsUntil <= 15) countdownClass = 'imminent';
        } else {
          countdown = Math.floor(minsUntil / 60) + 'h ' + (minsUntil % 60) + 'm';
        }
        
        const timeStr = scheduled.toLocaleTimeString('en-NZ', { hour: '2-digit', minute: '2-digit' });
        
        return \`
          <div class="upcoming-task">
            <div class="upcoming-task-time">
              <span class="upcoming-countdown \${countdownClass}">\${countdown}</span>
              <span style="color:#64748b;">@ \${timeStr}</span>
            </div>
            <div class="upcoming-task-title">\${task.title}</div>
            \${task.description ? \`<div class="upcoming-task-desc">\${task.description}</div>\` : ''}
          </div>
        \`;
      }).join('');
    }
    
    // Initial load + auto-refresh
    loadTasks(); loadActivity(); loadStats(); loadUpcoming();
    setInterval(() => { loadTasks(); loadActivity(); loadStats(); loadUpcoming(); }, 5000);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'n' && !e.target.matches('input,textarea')) openModal();
    });
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

module.exports = { addTask, updateTask, deleteTask, getTasks, getStats, logActivity, getUpcomingTasks, checkScheduledTasks };
