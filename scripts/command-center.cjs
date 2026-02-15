#!/usr/bin/env node

/**
 * COMMAND CENTER - Interactive Project Dashboard
 * Click agents to see full task queues
 * Real data from schedule files
 * Runs on port 3103
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

const PORT = 3103;
const BASE_DIR = path.join(__dirname, '..');
const MISSION_CONTROL_DIR = path.join(BASE_DIR, 'data', 'mission-control');
const SCHEDULES_DIR = path.join(BASE_DIR, 'data', 'agent-schedules');

function loadAgentsData() {
  try {
    return JSON.parse(fs.readFileSync(path.join(MISSION_CONTROL_DIR, 'agents.json'), 'utf8'));
  } catch (e) {
    return { agents: [], teams: {} };
  }
}

function loadAllSchedules() {
  const schedules = {};
  try {
    const files = fs.readdirSync(SCHEDULES_DIR).filter(f => f.endsWith('.json') && f !== 'TEAMS.json' && f !== 'README.md');
    files.forEach(f => {
      try {
        const data = JSON.parse(fs.readFileSync(path.join(SCHEDULES_DIR, f), 'utf8'));
        const key = f.replace('.json', '').toLowerCase();
        schedules[key] = data;
      } catch (e) {}
    });
  } catch (e) {}
  return schedules;
}

function getData() {
  const data = loadAgentsData();
  const schedules = loadAllSchedules();
  const agents = data.agents || [];
  const teams = data.teams || {};
  
  // Enrich agents with schedule data
  agents.forEach(agent => {
    const scheduleKey = agent.id.replace(/-/g, '-');
    const schedule = schedules[scheduleKey] || schedules[agent.id] || null;
    if (schedule) {
      agent.queue = schedule.queue || [];
      agent.blocked = schedule.blocked || [];
      agent.completed = schedule.completed || [];
    } else {
      agent.queue = [];
      agent.blocked = [];
      agent.completed = [];
    }
  });
  
  // Group by team
  const teamGroups = {};
  Object.keys(teams).forEach(teamId => {
    teamGroups[teamId] = {
      ...teams[teamId],
      agents: agents.filter(a => a.team === teamId)
    };
  });
  
  // Stats
  const totalTasks = agents.reduce((sum, a) => sum + (a.queue?.length || 0), 0);
  const blockedTasks = agents.reduce((sum, a) => sum + (a.blocked?.length || 0), 0);
  const activeAgents = agents.filter(a => a.status === 'active').length;
  
  return {
    teams: teamGroups,
    schedules,
    stats: { totalAgents: agents.length, activeAgents, totalTasks, blockedTasks }
  };
}

const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Command Center</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; background: #0a0a0a; color: #e5e5e5; min-height: 100vh; }
    
    .header { background: #111; border-bottom: 1px solid #222; padding: 14px 24px; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; z-index: 100; }
    .header h1 { font-size: 20px; font-weight: 700; }
    .time { font-size: 22px; font-weight: 600; color: #00d4ff; }
    .live { display: flex; align-items: center; gap: 8px; }
    .live-dot { width: 8px; height: 8px; background: #00ff88; border-radius: 50%; animation: pulse 2s infinite; }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
    
    .container { padding: 20px; max-width: 1400px; margin: 0 auto; }
    
    .stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 24px; }
    .stat { background: #111; border: 1px solid #222; border-radius: 10px; padding: 16px; text-align: center; }
    .stat-value { font-size: 28px; font-weight: 700; color: #00d4ff; }
    .stat-value.warning { color: #ffaa00; }
    .stat-value.success { color: #00ff88; }
    .stat-label { font-size: 10px; text-transform: uppercase; letter-spacing: 1px; color: #666; margin-top: 4px; }
    
    .layout { display: grid; grid-template-columns: 260px 1fr; gap: 20px; }
    @media (max-width: 900px) { .layout { grid-template-columns: 1fr; } }
    
    .schedule { background: #111; border: 1px solid #222; border-radius: 10px; padding: 16px; height: fit-content; position: sticky; top: 70px; }
    .schedule h2 { font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #00d4ff; margin-bottom: 12px; }
    .sched-item { padding: 8px 0; border-bottom: 1px solid #1a1a1a; }
    .sched-time { font-size: 11px; font-weight: 600; color: #00d4ff; }
    .sched-title { font-size: 13px; color: #fff; margin-top: 2px; }
    .sched-now { background: rgba(0,212,255,0.1); margin: 0 -16px; padding: 8px 16px; border-left: 3px solid #00d4ff; }
    
    .projects { display: grid; grid-template-columns: repeat(auto-fit, minmax(380px, 1fr)); gap: 16px; }
    .project { background: #111; border: 1px solid #222; border-radius: 10px; overflow: hidden; }
    .project-header { padding: 14px 16px; border-bottom: 1px solid #222; display: flex; justify-content: space-between; align-items: center; }
    .project-name { font-size: 16px; font-weight: 700; }
    .project-desc { font-size: 11px; color: #666; margin-top: 2px; }
    .project-badge { padding: 3px 10px; border-radius: 12px; font-size: 10px; font-weight: 600; }
    
    .project-body { padding: 12px 16px; }
    
    .agent-row { display: flex; align-items: center; gap: 10px; padding: 10px 0; border-bottom: 1px solid #1a1a1a; cursor: pointer; transition: background 0.2s; }
    .agent-row:hover { background: rgba(255,255,255,0.02); margin: 0 -16px; padding: 10px 16px; }
    .agent-row:last-child { border-bottom: none; }
    
    .agent-avatar { width: 32px; height: 32px; background: #222; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 16px; }
    .agent-info { flex: 1; min-width: 0; }
    .agent-name { font-size: 13px; font-weight: 600; color: #fff; }
    .agent-role { font-size: 11px; color: #666; }
    .agent-task { font-size: 11px; color: #00d4ff; margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    
    .agent-status { padding: 3px 8px; border-radius: 10px; font-size: 9px; font-weight: 600; text-transform: uppercase; }
    .status-active { background: rgba(0,255,136,0.15); color: #00ff88; }
    .status-idle { background: rgba(255,170,0,0.15); color: #ffaa00; }
    .status-scheduled { background: rgba(0,212,255,0.15); color: #00d4ff; }
    .status-standby { background: rgba(102,102,102,0.15); color: #666; }
    
    .click-hint { font-size: 9px; color: #444; margin-left: auto; }
    
    /* Modal */
    .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); z-index: 1000; display: none; align-items: center; justify-content: center; }
    .modal-overlay.show { display: flex; }
    .modal { background: #111; border: 1px solid #333; border-radius: 12px; width: 90%; max-width: 600px; max-height: 80vh; overflow: hidden; }
    .modal-header { padding: 16px 20px; border-bottom: 1px solid #222; display: flex; justify-content: space-between; align-items: center; }
    .modal-title { font-size: 18px; font-weight: 700; display: flex; align-items: center; gap: 10px; }
    .modal-close { background: none; border: none; color: #666; font-size: 24px; cursor: pointer; }
    .modal-close:hover { color: #fff; }
    .modal-body { padding: 20px; overflow-y: auto; max-height: calc(80vh - 70px); }
    
    .task-section { margin-bottom: 20px; }
    .task-section-title { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #666; margin-bottom: 10px; display: flex; align-items: center; gap: 8px; }
    .task-count { background: #222; padding: 2px 8px; border-radius: 10px; font-size: 10px; }
    
    .task-item { background: #0a0a0a; border: 1px solid #1a1a1a; border-radius: 8px; padding: 12px; margin-bottom: 8px; }
    .task-title { font-size: 13px; color: #fff; margin-bottom: 4px; }
    .task-meta { font-size: 11px; color: #666; display: flex; gap: 12px; }
    .task-priority { display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 6px; }
    .priority-high { background: #ff6b6b; }
    .priority-medium { background: #ffaa00; }
    .priority-low { background: #666; }
    
    .blocked-item { border-color: rgba(255,100,100,0.3); background: rgba(255,100,100,0.05); }
    .blocked-item .task-title { color: #ff6b6b; }
    
    .empty-state { color: #444; font-size: 12px; font-style: italic; padding: 20px; text-align: center; }
    
    .footer { text-align: center; padding: 16px; color: #333; font-size: 10px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>🎯 Command Center</h1>
    <div class="live">
      <div class="live-dot"></div>
      <span style="color:#00ff88;font-size:10px;">LIVE</span>
      <div class="time" id="time"></div>
    </div>
  </div>
  
  <div class="container">
    <div class="stats" id="stats"></div>
    <div class="layout">
      <div class="schedule">
        <h2>📅 Your Schedule</h2>
        <div class="sched-item sched-now">
          <div class="sched-time">NOW → 2pm</div>
          <div class="sched-title">TWG + Junction</div>
        </div>
        <div class="sched-item"><div class="sched-time">2:00 PM</div><div class="sched-title">DBH</div></div>
        <div class="sched-item"><div class="sched-time">7:30 PM</div><div class="sched-title">🦷 Dental</div></div>
        <div class="sched-item"><div class="sched-time">9:30 PM</div><div class="sched-title">🎬 ALTERNATE</div></div>
        <h2 style="margin-top:16px;">📌 Key Dates</h2>
        <div class="sched-item"><div class="sched-time">Tomorrow 2pm</div><div class="sched-title">Vietnamese Influencer</div></div>
        <div class="sched-item"><div class="sched-time">Fri Feb 14</div><div class="sched-title" style="color:#ff6b6b;">🎬 ALTERNATE LAUNCH</div></div>
      </div>
      <div class="projects" id="projects"></div>
    </div>
  </div>
  
  <div class="modal-overlay" id="modal" onclick="if(event.target===this)closeModal()">
    <div class="modal">
      <div class="modal-header">
        <div class="modal-title" id="modal-title"></div>
        <button class="modal-close" onclick="closeModal()">&times;</button>
      </div>
      <div class="modal-body" id="modal-body"></div>
    </div>
  </div>
  
  <div class="footer">Click any agent to see full task queue • Auto-refreshes every 30s</div>
  
  <script>
    let currentData = null;
    
    function updateTime() {
      document.getElementById('time').textContent = new Date().toLocaleTimeString('en-NZ', { hour: '2-digit', minute: '2-digit', hour12: true });
    }
    updateTime();
    setInterval(updateTime, 1000);
    
    const teamColors = { command: '#00d4ff', junction: '#00ff88', alternate: '#ff6b6b', vision: '#ffd93d', dbh: '#6bcfff' };
    
    function renderStats(stats) {
      return '<div class="stat"><div class="stat-value">' + stats.totalAgents + '</div><div class="stat-label">Agents</div></div>' +
        '<div class="stat"><div class="stat-value success">' + stats.activeAgents + '</div><div class="stat-label">Active</div></div>' +
        '<div class="stat"><div class="stat-value">' + stats.totalTasks + '</div><div class="stat-label">Queued</div></div>' +
        '<div class="stat"><div class="stat-value warning">' + stats.blockedTasks + '</div><div class="stat-label">Blocked</div></div>';
    }
    
    function renderProject(teamId, team) {
      const color = teamColors[teamId] || '#666';
      const agents = team.agents || [];
      const activeCount = agents.filter(a => a.status === 'active').length;
      const totalTasks = agents.reduce((sum, a) => sum + (a.queue?.length || 0), 0);
      
      let agentsHtml = '';
      agents.forEach(agent => {
        const statusClass = 'status-' + (agent.status || 'idle');
        const queueLen = agent.queue?.length || 0;
        const task = agent.currentTask || (agent.queue?.[0]?.title) || 'No tasks';
        
        agentsHtml += '<div class="agent-row" onclick="showAgent(\\'' + agent.id + '\\')">' +
          '<div class="agent-avatar">' + (agent.emoji || '🤖') + '</div>' +
          '<div class="agent-info">' +
            '<div class="agent-name">' + (agent.name || agent.id) + '</div>' +
            '<div class="agent-role">' + (agent.role || '') + '</div>' +
            '<div class="agent-task">→ ' + task + '</div>' +
          '</div>' +
          '<div class="agent-status ' + statusClass + '">' + (agent.status || 'idle') + '</div>' +
          (queueLen > 0 ? '<span class="click-hint">' + queueLen + ' tasks →</span>' : '') +
        '</div>';
      });
      
      if (!agentsHtml) agentsHtml = '<div class="empty-state">No agents assigned</div>';
      
      return '<div class="project" style="border-color:' + color + '33;">' +
        '<div class="project-header" style="border-color:' + color + '33;">' +
          '<div><div class="project-name" style="color:' + color + ';">' + (team.emoji || '') + ' ' + (team.name || teamId).replace(/^[^A-Z]*/, '') + '</div>' +
          '<div class="project-desc">' + (team.description || '') + '</div></div>' +
          '<div class="project-badge" style="background:' + color + '22;color:' + color + ';">' + totalTasks + ' tasks</div>' +
        '</div><div class="project-body">' + agentsHtml + '</div></div>';
    }
    
    function showAgent(agentId) {
      if (!currentData) return;
      let agent = null;
      Object.values(currentData.teams).forEach(team => {
        const found = team.agents?.find(a => a.id === agentId);
        if (found) agent = found;
      });
      if (!agent) return;
      
      document.getElementById('modal-title').innerHTML = agent.emoji + ' ' + agent.name + '<span style="font-size:12px;color:#666;font-weight:400;margin-left:10px;">' + agent.role + '</span>';
      
      let bodyHtml = '';
      
      // Queue
      const queue = agent.queue || [];
      bodyHtml += '<div class="task-section"><div class="task-section-title">📋 Task Queue <span class="task-count">' + queue.length + '</span></div>';
      if (queue.length === 0) {
        bodyHtml += '<div class="empty-state">No tasks in queue</div>';
      } else {
        queue.forEach(task => {
          const priorityClass = 'priority-' + (task.priority || 'medium');
          bodyHtml += '<div class="task-item"><div class="task-title"><span class="task-priority ' + priorityClass + '"></span>' + task.title + '</div>' +
            '<div class="task-meta">' +
              (task.estimatedMinutes ? '<span>⏱ ' + task.estimatedMinutes + 'm</span>' : '') +
              (task.priority ? '<span>Priority: ' + task.priority + '</span>' : '') +
            '</div></div>';
        });
      }
      bodyHtml += '</div>';
      
      // Blocked
      const blocked = agent.blocked || [];
      if (blocked.length > 0) {
        bodyHtml += '<div class="task-section"><div class="task-section-title" style="color:#ff6b6b;">⚠️ Blocked <span class="task-count">' + blocked.length + '</span></div>';
        blocked.forEach(task => {
          bodyHtml += '<div class="task-item blocked-item"><div class="task-title">' + task.title + '</div>' +
            '<div class="task-meta"><span>Blocked by: ' + (task.blockedBy || 'unknown') + '</span>' +
            (task.reason ? '<span>' + task.reason + '</span>' : '') + '</div></div>';
        });
        bodyHtml += '</div>';
      }
      
      // Completed
      const completed = agent.completed || [];
      if (completed.length > 0) {
        bodyHtml += '<div class="task-section"><div class="task-section-title" style="color:#00ff88;">✅ Completed <span class="task-count">' + completed.length + '</span></div>';
        completed.slice(0, 5).forEach(task => {
          bodyHtml += '<div class="task-item" style="opacity:0.6;"><div class="task-title" style="text-decoration:line-through;">' + task.title + '</div></div>';
        });
        bodyHtml += '</div>';
      }
      
      document.getElementById('modal-body').innerHTML = bodyHtml;
      document.getElementById('modal').classList.add('show');
    }
    
    function closeModal() {
      document.getElementById('modal').classList.remove('show');
    }
    
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
    
    async function loadData() {
      try {
        const res = await fetch('/api/data');
        currentData = await res.json();
        
        document.getElementById('stats').innerHTML = renderStats(currentData.stats);
        
        let projectsHtml = '';
        ['alternate', 'junction', 'vision', 'dbh', 'command'].forEach(teamId => {
          if (currentData.teams[teamId]) projectsHtml += renderProject(teamId, currentData.teams[teamId]);
        });
        document.getElementById('projects').innerHTML = projectsHtml;
      } catch (e) { console.error('Load failed:', e); }
    }
    
    loadData();
    setInterval(loadData, 30000);
  </script>
</body>
</html>`;

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.url === '/api/data') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(getData()));
  } else {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(HTML);
  }
});

server.listen(PORT, () => {
  console.log('🎯 Command Center running at http://localhost:' + PORT);
  console.log('');
  console.log('Features:');
  console.log('  • Click agents to see full task queue');
  console.log('  • Real data from schedule files');
  console.log('  • Auto-refresh every 30s');
  console.log('');
});
