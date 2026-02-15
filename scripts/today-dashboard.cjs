#!/usr/bin/env node

/**
 * TODAY DASHBOARD - Clean, Simple Task & Calendar View
 * Runs on port 3103
 */

const fs = require('fs');
const path = require('path');
const http = require('http');
const { exec } = require('child_process');
const util = require('util');
const execAsync = util.promisify(exec);

const PORT = 3103;

async function getCalendarEvents() {
  try {
    const { stdout } = await execAsync('node scripts/outlook-calendar.js list --days=7', {
      cwd: path.join(__dirname, '..'),
      timeout: 30000
    });
    return stdout;
  } catch (e) {
    return 'Calendar unavailable';
  }
}

function getTodayTasks() {
  try {
    const calendar = fs.readFileSync(
      path.join(__dirname, '..', 'projects', 'junction', 'content-calendar-week1-2.md'),
      'utf8'
    );
    return calendar;
  } catch (e) {
    return 'No tasks found';
  }
}

function getStateJson() {
  try {
    return JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'STATE.json'), 'utf8'));
  } catch (e) {
    return {};
  }
}

function getTodayLog() {
  const today = new Date().toISOString().split('T')[0];
  try {
    return fs.readFileSync(
      path.join(__dirname, '..', 'memory', `${today}.md`),
      'utf8'
    );
  } catch (e) {
    return 'No log for today yet';
  }
}

const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Today - Command Center</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background: #0a0a0a;
      color: #e5e5e5;
      min-height: 100vh;
      padding: 24px;
    }
    
    .container {
      max-width: 1400px;
      margin: 0 auto;
    }
    
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 32px;
      padding-bottom: 20px;
      border-bottom: 1px solid #222;
    }
    
    h1 {
      font-size: 28px;
      font-weight: 700;
      color: #fff;
    }
    
    .date {
      font-size: 16px;
      color: #888;
    }
    
    .time {
      font-size: 32px;
      font-weight: 600;
      color: #00d4ff;
      font-variant-numeric: tabular-nums;
    }
    
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
    }
    
    @media (max-width: 900px) {
      .grid { grid-template-columns: 1fr; }
    }
    
    .card {
      background: #111;
      border: 1px solid #222;
      border-radius: 12px;
      padding: 24px;
    }
    
    .card h2 {
      font-size: 14px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #00d4ff;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .card h2::before {
      content: '';
      width: 8px;
      height: 8px;
      background: #00d4ff;
      border-radius: 2px;
    }
    
    /* Schedule */
    .schedule-item {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      padding: 16px 0;
      border-bottom: 1px solid #1a1a1a;
    }
    
    .schedule-item:last-child {
      border-bottom: none;
    }
    
    .schedule-time {
      font-size: 14px;
      font-weight: 600;
      color: #00d4ff;
      min-width: 70px;
      font-variant-numeric: tabular-nums;
    }
    
    .schedule-content {
      flex: 1;
    }
    
    .schedule-title {
      font-size: 16px;
      font-weight: 500;
      color: #fff;
      margin-bottom: 4px;
    }
    
    .schedule-meta {
      font-size: 13px;
      color: #666;
    }
    
    .schedule-now {
      background: rgba(0, 212, 255, 0.1);
      border-left: 3px solid #00d4ff;
      margin: 0 -24px;
      padding: 16px 24px;
    }
    
    /* Tasks */
    .task-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 12px 0;
      border-bottom: 1px solid #1a1a1a;
    }
    
    .task-item:last-child {
      border-bottom: none;
    }
    
    .task-checkbox {
      width: 20px;
      height: 20px;
      border: 2px solid #333;
      border-radius: 4px;
      flex-shrink: 0;
      margin-top: 2px;
    }
    
    .task-checkbox.done {
      background: #00d4ff;
      border-color: #00d4ff;
    }
    
    .task-text {
      font-size: 15px;
      color: #ccc;
    }
    
    .task-text.done {
      text-decoration: line-through;
      color: #555;
    }
    
    .task-blocked {
      background: rgba(255, 100, 100, 0.1);
      border-left: 3px solid #ff6464;
      padding: 12px;
      margin: 8px 0;
      border-radius: 0 8px 8px 0;
    }
    
    .task-blocked-label {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      color: #ff6464;
      margin-bottom: 4px;
    }
    
    /* Projects */
    .project-item {
      padding: 12px 0;
      border-bottom: 1px solid #1a1a1a;
    }
    
    .project-item:last-child {
      border-bottom: none;
    }
    
    .project-name {
      font-size: 15px;
      font-weight: 500;
      color: #fff;
      margin-bottom: 4px;
    }
    
    .project-status {
      font-size: 13px;
      color: #666;
    }
    
    .status-dot {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin-right: 6px;
    }
    
    .status-active { background: #00ff88; }
    .status-blocked { background: #ff6464; }
    .status-pending { background: #ffaa00; }
    
    /* Quick Stats */
    .stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin-bottom: 24px;
    }
    
    .stat {
      background: #111;
      border: 1px solid #222;
      border-radius: 12px;
      padding: 20px;
      text-align: center;
    }
    
    .stat-value {
      font-size: 36px;
      font-weight: 700;
      color: #00d4ff;
    }
    
    .stat-label {
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #666;
      margin-top: 4px;
    }
    
    /* Full Width Cards */
    .full-width {
      grid-column: 1 / -1;
    }
    
    .upcoming-days {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }
    
    .day-card {
      background: #0a0a0a;
      border: 1px solid #222;
      border-radius: 8px;
      padding: 16px;
    }
    
    .day-card h3 {
      font-size: 14px;
      font-weight: 600;
      color: #888;
      margin-bottom: 12px;
    }
    
    .day-card.today {
      border-color: #00d4ff;
      background: rgba(0, 212, 255, 0.05);
    }
    
    .day-card.today h3 {
      color: #00d4ff;
    }
    
    .event-mini {
      font-size: 13px;
      color: #ccc;
      padding: 8px 0;
      border-bottom: 1px solid #1a1a1a;
    }
    
    .event-mini:last-child {
      border-bottom: none;
    }
    
    .event-time {
      color: #00d4ff;
      font-weight: 500;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div>
        <h1>Command Center</h1>
        <div class="date" id="date"></div>
      </div>
      <div class="time" id="time"></div>
    </header>
    
    <div class="stats">
      <div class="stat">
        <div class="stat-value" id="tasks-today">3</div>
        <div class="stat-label">Tasks Today</div>
      </div>
      <div class="stat">
        <div class="stat-value" id="blockers">1</div>
        <div class="stat-label">Blockers</div>
      </div>
      <div class="stat">
        <div class="stat-value" id="events">2</div>
        <div class="stat-label">Events</div>
      </div>
    </div>
    
    <div class="grid">
      <!-- Today's Schedule -->
      <div class="card">
        <h2>Today's Schedule</h2>
        <div id="schedule">
          <div class="schedule-item schedule-now">
            <div class="schedule-time">NOW</div>
            <div class="schedule-content">
              <div class="schedule-title">TWG + Junction Setup</div>
              <div class="schedule-meta">Until 2pm</div>
            </div>
          </div>
          <div class="schedule-item">
            <div class="schedule-time">2:00 PM</div>
            <div class="schedule-content">
              <div class="schedule-title">Leave for DBH</div>
              <div class="schedule-meta">Deep Blue Health office</div>
            </div>
          </div>
          <div class="schedule-item">
            <div class="schedule-time">7:30 PM</div>
            <div class="schedule-content">
              <div class="schedule-title">Dental Appointment</div>
              <div class="schedule-meta"></div>
            </div>
          </div>
          <div class="schedule-item">
            <div class="schedule-time">9:30 PM</div>
            <div class="schedule-content">
              <div class="schedule-title">ALTERNATE Grind</div>
              <div class="schedule-meta">With Zach until 3:30am</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Today's Tasks -->
      <div class="card">
        <h2>Today's Tasks</h2>
        <div id="tasks">
          <div class="task-item">
            <div class="task-checkbox"></div>
            <div class="task-text">Publish first blog post (AI Marketing Agency NZ)</div>
          </div>
          <div class="task-item">
            <div class="task-checkbox"></div>
            <div class="task-text">LinkedIn Post #1: "Why we built an AI agency"</div>
          </div>
          <div class="task-item">
            <div class="task-checkbox"></div>
            <div class="task-text">Email platform selection</div>
          </div>
          <div class="task-blocked">
            <div class="task-blocked-label">⚠️ Blocked</div>
            <div class="task-text">Domain connection (junctionmedia.ai → Vercel)</div>
          </div>
        </div>
      </div>
      
      <!-- Active Projects -->
      <div class="card">
        <h2>Active Projects</h2>
        <div id="projects">
          <div class="project-item">
            <div class="project-name"><span class="status-dot status-active"></span>DBH</div>
            <div class="project-status">Stable base income • 4h/day</div>
          </div>
          <div class="project-item">
            <div class="project-name"><span class="status-dot status-active"></span>ALTERNATE Film</div>
            <div class="project-status">Release Feb 14 • Final push</div>
          </div>
          <div class="project-item">
            <div class="project-name"><span class="status-dot status-pending"></span>Junction Media</div>
            <div class="project-status">Sprint Day 3 • Blocked on domain</div>
          </div>
          <div class="project-item">
            <div class="project-name"><span class="status-dot status-pending"></span>TWG Klaviyo</div>
            <div class="project-status">Website work in progress</div>
          </div>
        </div>
      </div>
      
      <!-- Upcoming -->
      <div class="card">
        <h2>Upcoming</h2>
        <div class="upcoming-days">
          <div class="day-card today">
            <h3>Today (Wed 12)</h3>
            <div class="event-mini"><span class="event-time">2pm</span> DBH</div>
            <div class="event-mini"><span class="event-time">7:30pm</span> Dental</div>
            <div class="event-mini"><span class="event-time">9:30pm</span> ALTERNATE</div>
          </div>
          <div class="day-card">
            <h3>Tomorrow (Thu 13)</h3>
            <div class="event-mini"><span class="event-time">11am-6pm</span> DBH Full Day</div>
            <div class="event-mini"><span class="event-time">2pm</span> Vietnamese influencer</div>
          </div>
          <div class="day-card">
            <h3>Friday (14)</h3>
            <div class="event-mini">🎬 ALTERNATE LAUNCH</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <script>
    function updateTime() {
      const now = new Date();
      document.getElementById('time').textContent = now.toLocaleTimeString('en-NZ', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        hour12: true 
      });
      document.getElementById('date').textContent = now.toLocaleDateString('en-NZ', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
    updateTime();
    setInterval(updateTime, 1000);
  </script>
</body>
</html>`;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(HTML);
});

server.listen(PORT, () => {
  console.log('📋 Today Dashboard running at http://localhost:' + PORT);
  console.log('Press Ctrl+C to stop');
});
