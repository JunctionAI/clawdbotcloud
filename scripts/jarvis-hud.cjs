#!/usr/bin/env node

/**
 * JARVIS HUD - Iron Man Style Command Interface
 * 
 * A futuristic holographic interface for Mission Control
 * Runs on port 3102
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

const { exec } = require('child_process');
const util = require('util');
const execAsync = util.promisify(exec);

const CONFIG = {
  port: 3102,
  dataDir: path.join(__dirname, '..', 'data', 'mission-control'),
  tasksFile: path.join(__dirname, '..', 'data', 'mission-control', 'tasks.json'),
  activityFile: path.join(__dirname, '..', 'data', 'mission-control', 'activity.json'),
  agentsFile: path.join(__dirname, '..', 'data', 'mission-control', 'agents.json'),
  relationshipsFile: path.join(__dirname, '..', 'data', 'mission-control', 'relationships.json'),
  stateJsonPath: path.join(__dirname, '..', 'STATE.json'),
  calendarCacheFile: path.join(__dirname, '..', 'data', 'mission-control', 'calendar-cache.json')
};

// Cache for calendar events (refreshed every 5 mins)
let calendarCache = { events: [], lastFetched: 0 };

async function fetchOutlookCalendar() {
  const now = Date.now();
  // Only refresh every 5 minutes
  if (now - calendarCache.lastFetched < 300000 && calendarCache.events.length > 0) {
    return calendarCache.events;
  }
  
  try {
    const { stdout } = await execAsync('node scripts/outlook-calendar.js list --days=7 --json', {
      cwd: path.join(__dirname, '..'),
      timeout: 30000
    });
    
    // Parse the JSON output
    const parsed = JSON.parse(stdout.trim());
    const events = (parsed.events || []).map(event => ({
      id: event.id,
      title: event.subject,
      start: event.start,
      end: event.end,
      location: event.location || ''
    }));
    
    calendarCache = { events, lastFetched: now };
    
    // Also save to cache file
    try {
      fs.writeFileSync(CONFIG.calendarCacheFile, JSON.stringify(calendarCache, null, 2));
    } catch (e) {}
    
    return events;
  } catch (error) {
    console.error('Calendar fetch error:', error.message);
    // Try to load from cache file
    try {
      const cached = JSON.parse(fs.readFileSync(CONFIG.calendarCacheFile, 'utf8'));
      return cached.events || [];
    } catch (e) {
      return [];
    }
  }
}

function loadJSON(file, fallback = []) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return fallback;
  }
}

function startServer() {
  const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.writeHead(200);
      res.end();
      return;
    }

    if (req.url === '/') {
      serveHTML(res);
    } else if (req.url === '/api/calendar') {
      // Dedicated calendar endpoint with real Outlook data
      fetchOutlookCalendar().then(events => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ events }));
      }).catch(err => {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message, events: [] }));
      });
      return;
    } else if (req.url === '/api/data') {
      const tasksData = loadJSON(CONFIG.tasksFile, { tasks: [] });
      const activityData = loadJSON(CONFIG.activityFile, { activities: [] });
      const agentsData = loadJSON(CONFIG.agentsFile, { agents: [] });
      const relationshipsData = loadJSON(CONFIG.relationshipsFile, { relationships: {} });
      const state = loadJSON(CONFIG.stateJsonPath, {});
      
      const tasks = Array.isArray(tasksData) ? tasksData : (tasksData.tasks || []);
      const activity = Array.isArray(activityData) ? activityData : (activityData.activities || []);
      const agents = Array.isArray(agentsData) ? agentsData : (agentsData.agents || []);
      const relationships = relationshipsData.relationships || {};
      const teams = agentsData.teams || {};
      
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ tasks, activity: activity.slice(0, 30), agents, relationships, teams, state }));
    } else {
      res.writeHead(404);
      res.end('Not Found');
    }
  });

  server.listen(CONFIG.port, () => {
    console.log(`🤖 JARVIS HUD online at http://localhost:${CONFIG.port}`);
    console.log('Press Ctrl+C to terminate');
  });
}

function serveHTML(res) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>J.A.R.V.I.S. - Command Interface</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&family=Rajdhani:wght@300;400;500;600;700&display=swap');
    
    * { margin: 0; padding: 0; box-sizing: border-box; }
    
    :root {
      --primary: #00d4ff;
      --primary-dim: #0099cc;
      --accent: #00ffff;
      --glow: rgba(0, 212, 255, 0.5);
      --bg-dark: #0a0a12;
      --bg-panel: rgba(10, 20, 40, 0.85);
      --border: rgba(0, 212, 255, 0.3);
      --text: #e0f7ff;
      --text-dim: #6fa8c0;
      --warning: #ff9500;
      --success: #00ff88;
      --danger: #ff3366;
    }
    
    body {
      font-family: 'Rajdhani', sans-serif;
      background: var(--bg-dark);
      color: var(--text);
      min-height: 100vh;
      overflow-x: hidden;
      position: relative;
    }
    
    /* Animated Background */
    .bg-grid {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: 
        linear-gradient(rgba(0, 212, 255, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 212, 255, 0.03) 1px, transparent 1px);
      background-size: 50px 50px;
      pointer-events: none;
      z-index: 0;
    }
    
    /* Scanning Line Effect */
    .scan-line {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, transparent, var(--primary), var(--accent), var(--primary), transparent);
      box-shadow: 0 0 20px var(--primary), 0 0 40px var(--glow);
      animation: scan 4s linear infinite;
      z-index: 1000;
      opacity: 0.7;
    }
    
    @keyframes scan {
      0% { top: 0; opacity: 0; }
      10% { opacity: 0.7; }
      90% { opacity: 0.7; }
      100% { top: 100%; opacity: 0; }
    }
    
    /* Data Stream Effect */
    .data-stream {
      position: fixed;
      top: 0;
      bottom: 0;
      width: 1px;
      background: linear-gradient(to bottom, transparent, var(--primary), transparent);
      opacity: 0.3;
      animation: stream 3s linear infinite;
    }
    
    .data-stream:nth-child(1) { left: 10%; animation-delay: 0s; }
    .data-stream:nth-child(2) { left: 30%; animation-delay: 1s; }
    .data-stream:nth-child(3) { left: 50%; animation-delay: 0.5s; }
    .data-stream:nth-child(4) { left: 70%; animation-delay: 1.5s; }
    .data-stream:nth-child(5) { left: 90%; animation-delay: 0.8s; }
    
    @keyframes stream {
      0% { opacity: 0; transform: scaleY(0); }
      50% { opacity: 0.3; transform: scaleY(1); }
      100% { opacity: 0; transform: scaleY(0); }
    }
    
    /* Main Container */
    .hud-container {
      position: relative;
      z-index: 10;
      padding: 20px;
      min-height: 100vh;
      animation: fadeIn 1.5s ease-out;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
    
    /* Header */
    .header {
      text-align: center;
      padding: 30px 0;
      position: relative;
    }
    
    .jarvis-title {
      font-family: 'Orbitron', sans-serif;
      font-size: 48px;
      font-weight: 900;
      letter-spacing: 15px;
      color: var(--primary);
      text-shadow: 
        0 0 10px var(--primary),
        0 0 20px var(--glow),
        0 0 40px var(--glow),
        0 0 80px rgba(0, 212, 255, 0.3);
      animation: titlePulse 3s ease-in-out infinite;
    }
    
    @keyframes titlePulse {
      0%, 100% { 
        text-shadow: 
          0 0 10px var(--primary),
          0 0 20px var(--glow),
          0 0 40px var(--glow);
      }
      50% { 
        text-shadow: 
          0 0 20px var(--primary),
          0 0 40px var(--glow),
          0 0 80px var(--glow),
          0 0 120px rgba(0, 212, 255, 0.4);
      }
    }
    
    .status-line {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 15px;
      margin-top: 15px;
      font-family: 'Orbitron', sans-serif;
      font-size: 14px;
      letter-spacing: 3px;
      color: var(--success);
    }
    
    .status-dot {
      width: 12px;
      height: 12px;
      background: var(--success);
      border-radius: 50%;
      box-shadow: 0 0 10px var(--success), 0 0 20px var(--success);
      animation: statusPulse 1.5s ease-in-out infinite;
    }
    
    @keyframes statusPulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.6; transform: scale(0.8); }
    }
    
    /* Voice Waveform */
    .waveform-container {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 4px;
      height: 40px;
      margin: 20px 0;
    }
    
    .wave-bar {
      width: 4px;
      background: linear-gradient(to top, var(--primary-dim), var(--accent));
      border-radius: 2px;
      animation: wave 1.2s ease-in-out infinite;
      box-shadow: 0 0 8px var(--glow);
    }
    
    @keyframes wave {
      0%, 100% { height: 8px; }
      50% { height: var(--wave-height, 30px); }
    }
    
    /* Hexagon Decorations */
    .hex-corner {
      position: fixed;
      width: 120px;
      height: 120px;
      border: 2px solid var(--border);
      opacity: 0.5;
      animation: hexRotate 20s linear infinite;
    }
    
    .hex-corner.top-left { top: 20px; left: 20px; }
    .hex-corner.top-right { top: 20px; right: 20px; animation-direction: reverse; }
    .hex-corner.bottom-left { bottom: 20px; left: 20px; animation-direction: reverse; }
    .hex-corner.bottom-right { bottom: 20px; right: 20px; }
    
    @keyframes hexRotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    /* Main Grid Layout */
    .main-grid {
      display: grid;
      grid-template-columns: 1fr 2fr 1fr;
      gap: 20px;
      max-width: 1800px;
      margin: 0 auto;
    }
    
    @media (max-width: 1400px) {
      .main-grid { grid-template-columns: 1fr 1fr; }
    }
    
    @media (max-width: 900px) {
      .main-grid { grid-template-columns: 1fr; }
    }
    
    /* Panel Base */
    .panel {
      background: var(--bg-panel);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 20px;
      position: relative;
      overflow: hidden;
      animation: panelFadeIn 0.8s ease-out forwards;
      opacity: 0;
    }
    
    .panel::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, var(--primary), transparent);
    }
    
    @keyframes panelFadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .panel:nth-child(1) { animation-delay: 0.1s; }
    .panel:nth-child(2) { animation-delay: 0.2s; }
    .panel:nth-child(3) { animation-delay: 0.3s; }
    .panel:nth-child(4) { animation-delay: 0.4s; }
    .panel:nth-child(5) { animation-delay: 0.5s; }
    
    .panel-title {
      font-family: 'Orbitron', sans-serif;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 3px;
      color: var(--primary);
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .panel-title::before {
      content: '';
      width: 8px;
      height: 8px;
      background: var(--primary);
      clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
    }
    
    /* Circular Progress Ring */
    .ring-container {
      display: flex;
      justify-content: center;
      gap: 30px;
      flex-wrap: wrap;
      margin: 20px 0;
    }
    
    .progress-ring {
      position: relative;
      width: 100px;
      height: 100px;
    }
    
    .progress-ring svg {
      transform: rotate(-90deg);
      width: 100px;
      height: 100px;
    }
    
    .progress-ring circle {
      fill: none;
      stroke-width: 6;
      stroke-linecap: round;
    }
    
    .progress-ring .bg {
      stroke: rgba(0, 212, 255, 0.15);
    }
    
    .progress-ring .progress {
      stroke: var(--primary);
      stroke-dasharray: 251;
      stroke-dashoffset: 251;
      filter: drop-shadow(0 0 6px var(--glow));
      animation: ringFill 2s ease-out forwards;
    }
    
    @keyframes ringFill {
      to { stroke-dashoffset: var(--offset, 0); }
    }
    
    .progress-ring .value {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-family: 'Orbitron', sans-serif;
      font-size: 20px;
      font-weight: 700;
      color: var(--text);
    }
    
    .progress-ring .label {
      position: absolute;
      bottom: -25px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 11px;
      color: var(--text-dim);
      text-transform: uppercase;
      letter-spacing: 1px;
      white-space: nowrap;
    }
    
    /* Agent Status */
    .agent-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    
    .agent-card {
      background: rgba(0, 212, 255, 0.05);
      border: 1px solid var(--border);
      border-radius: 6px;
      padding: 15px;
      position: relative;
      overflow: hidden;
    }
    
    .agent-card::after {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.1), transparent);
      animation: agentScan 3s linear infinite;
    }
    
    @keyframes agentScan {
      to { left: 100%; }
    }
    
    .agent-name {
      font-family: 'Orbitron', sans-serif;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 2px;
      color: var(--accent);
      margin-bottom: 8px;
    }
    
    .agent-status {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      color: var(--text-dim);
    }
    
    .agent-indicator {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      animation: agentPulse 2s ease-in-out infinite;
    }
    
    .agent-indicator.online { 
      background: var(--success);
      box-shadow: 0 0 8px var(--success);
    }
    
    .agent-indicator.idle { 
      background: var(--warning);
      box-shadow: 0 0 8px var(--warning);
    }
    
    .agent-indicator.offline { 
      background: var(--danger);
      box-shadow: 0 0 8px var(--danger);
    }
    
    @keyframes agentPulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    
    /* Task List */
    .task-list {
      max-height: 350px;
      overflow-y: auto;
      scrollbar-width: thin;
      scrollbar-color: var(--primary-dim) transparent;
    }
    
    .task-item {
      background: rgba(0, 212, 255, 0.03);
      border-left: 3px solid var(--primary);
      padding: 12px 15px;
      margin-bottom: 10px;
      border-radius: 0 6px 6px 0;
      position: relative;
      transition: all 0.3s ease;
    }
    
    .task-item:hover {
      background: rgba(0, 212, 255, 0.08);
      transform: translateX(5px);
    }
    
    .task-item.priority-critical { border-left-color: var(--danger); }
    .task-item.priority-high { border-left-color: var(--warning); }
    .task-item.priority-medium { border-left-color: var(--primary); }
    .task-item.priority-low { border-left-color: var(--success); }
    
    .task-title {
      font-weight: 600;
      font-size: 14px;
      margin-bottom: 5px;
    }
    
    .task-meta {
      display: flex;
      gap: 10px;
      font-size: 11px;
      color: var(--text-dim);
    }
    
    .task-badge {
      background: rgba(0, 212, 255, 0.15);
      padding: 2px 8px;
      border-radius: 3px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    /* Calendar Widget */
    .calendar-event {
      background: rgba(0, 255, 136, 0.05);
      border: 1px solid rgba(0, 255, 136, 0.2);
      border-radius: 6px;
      padding: 12px;
      margin-bottom: 10px;
    }
    
    .event-time {
      font-family: 'Orbitron', sans-serif;
      font-size: 12px;
      color: var(--success);
      margin-bottom: 5px;
    }
    
    .event-title {
      font-size: 14px;
      font-weight: 600;
    }
    
    /* Activity Feed */
    .activity-feed {
      max-height: 300px;
      overflow-y: auto;
    }
    
    .activity-item {
      display: flex;
      gap: 12px;
      padding: 10px 0;
      border-bottom: 1px solid rgba(0, 212, 255, 0.1);
      animation: activitySlide 0.5s ease-out;
    }
    
    @keyframes activitySlide {
      from { opacity: 0; transform: translateX(-20px); }
      to { opacity: 1; transform: translateX(0); }
    }
    
    .activity-icon {
      width: 32px;
      height: 32px;
      background: rgba(0, 212, 255, 0.1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      flex-shrink: 0;
    }
    
    .activity-content {
      flex: 1;
    }
    
    .activity-text {
      font-size: 13px;
      margin-bottom: 3px;
    }
    
    .activity-time {
      font-size: 11px;
      color: var(--text-dim);
    }
    
    /* Stats Row */
    .stats-row {
      display: flex;
      justify-content: space-around;
      text-align: center;
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid var(--border);
    }
    
    .stat-item {
      position: relative;
    }
    
    .stat-value {
      font-family: 'Orbitron', sans-serif;
      font-size: 28px;
      font-weight: 700;
      color: var(--primary);
      text-shadow: 0 0 10px var(--glow);
    }
    
    .stat-label {
      font-size: 11px;
      color: var(--text-dim);
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-top: 5px;
    }
    
    /* Time Display */
    .time-display {
      font-family: 'Orbitron', sans-serif;
      font-size: 32px;
      text-align: center;
      color: var(--accent);
      margin: 20px 0;
      text-shadow: 0 0 20px var(--glow);
    }
    
    .date-display {
      font-size: 14px;
      color: var(--text-dim);
      letter-spacing: 3px;
    }
    
    /* Scrollbar */
    ::-webkit-scrollbar {
      width: 6px;
    }
    
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    
    ::-webkit-scrollbar-thumb {
      background: var(--primary-dim);
      border-radius: 3px;
    }
    
    /* Loading Animation */
    .loading {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
      padding: 40px;
    }
    
    .loading-dot {
      width: 12px;
      height: 12px;
      background: var(--primary);
      border-radius: 50%;
      animation: loadingPulse 1.4s ease-in-out infinite;
    }
    
    .loading-dot:nth-child(2) { animation-delay: 0.2s; }
    .loading-dot:nth-child(3) { animation-delay: 0.4s; }
    
    @keyframes loadingPulse {
      0%, 80%, 100% { transform: scale(0.6); opacity: 0.5; }
      40% { transform: scale(1); opacity: 1; }
    }
    
    /* Arc Reactor */
    .arc-reactor {
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 80px;
      height: 80px;
      z-index: 100;
    }
    
    .reactor-core {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 30px;
      height: 30px;
      background: radial-gradient(circle, var(--accent), var(--primary));
      border-radius: 50%;
      box-shadow: 0 0 30px var(--primary), 0 0 60px var(--glow);
      animation: reactorPulse 2s ease-in-out infinite;
    }
    
    @keyframes reactorPulse {
      0%, 100% { box-shadow: 0 0 20px var(--primary), 0 0 40px var(--glow); }
      50% { box-shadow: 0 0 40px var(--primary), 0 0 80px var(--glow), 0 0 120px rgba(0, 212, 255, 0.3); }
    }
    
    .reactor-ring {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border: 2px solid var(--primary);
      border-radius: 50%;
      opacity: 0.6;
    }
    
    .reactor-ring:nth-child(1) { width: 50px; height: 50px; animation: reactorRotate 8s linear infinite; }
    .reactor-ring:nth-child(2) { width: 65px; height: 65px; animation: reactorRotate 12s linear infinite reverse; }
    .reactor-ring:nth-child(3) { width: 80px; height: 80px; animation: reactorRotate 16s linear infinite; }
    
    @keyframes reactorRotate {
      from { transform: translate(-50%, -50%) rotate(0deg); }
      to { transform: translate(-50%, -50%) rotate(360deg); }
    }
  </style>
</head>
<body>
  <!-- Background Effects -->
  <div class="bg-grid"></div>
  <div class="scan-line"></div>
  <div class="data-stream"></div>
  <div class="data-stream"></div>
  <div class="data-stream"></div>
  <div class="data-stream"></div>
  <div class="data-stream"></div>
  
  <!-- Corner Decorations -->
  <div class="hex-corner top-left"></div>
  <div class="hex-corner top-right"></div>
  <div class="hex-corner bottom-left"></div>
  <div class="hex-corner bottom-right"></div>
  
  <!-- Arc Reactor -->
  <div class="arc-reactor">
    <div class="reactor-ring"></div>
    <div class="reactor-ring"></div>
    <div class="reactor-ring"></div>
    <div class="reactor-core"></div>
  </div>
  
  <div class="hud-container">
    <!-- Header -->
    <header class="header">
      <h1 class="jarvis-title">J.A.R.V.I.S.</h1>
      <div class="status-line">
        <span class="status-dot"></span>
        <span>SYSTEM ONLINE</span>
        <span>•</span>
        <span id="uptime">INITIALIZING...</span>
      </div>
      
      <!-- Voice Waveform -->
      <div class="waveform-container" id="waveform"></div>
      
      <!-- Time Display -->
      <div class="time-display">
        <div id="time">--:--:--</div>
        <div class="date-display" id="date">LOADING...</div>
      </div>
    </header>
    
    <!-- Main Content Grid -->
    <div class="main-grid">
      <!-- Left Column -->
      <div class="left-column">
        <!-- Agent Status Panel -->
        <div class="panel">
          <div class="panel-title">AGENT STATUS</div>
          <div class="agent-grid">
            <div class="agent-card">
              <div class="agent-name">PREP</div>
              <div class="agent-status">
                <span class="agent-indicator online"></span>
                <span>AUTONOMOUS</span>
              </div>
            </div>
            <div class="agent-card">
              <div class="agent-name">MAIN</div>
              <div class="agent-status">
                <span class="agent-indicator online"></span>
                <span>ACTIVE</span>
              </div>
            </div>
            <div class="agent-card">
              <div class="agent-name">RESEARCH</div>
              <div class="agent-status">
                <span class="agent-indicator idle"></span>
                <span>STANDBY</span>
              </div>
            </div>
            <div class="agent-card">
              <div class="agent-name">CREATIVE</div>
              <div class="agent-status">
                <span class="agent-indicator idle"></span>
                <span>STANDBY</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Calendar Widget -->
        <div class="panel" style="margin-top: 20px;">
          <div class="panel-title">UPCOMING EVENTS</div>
          <div id="calendar">
            <div class="loading">
              <div class="loading-dot"></div>
              <div class="loading-dot"></div>
              <div class="loading-dot"></div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Center Column - Task Overview -->
      <div class="center-column">
        <div class="panel">
          <div class="panel-title">TASK OVERVIEW</div>
          
          <!-- Progress Rings -->
          <div class="ring-container" id="progress-rings">
            <div class="progress-ring">
              <svg><circle class="bg" cx="50" cy="50" r="40"/><circle class="progress" cx="50" cy="50" r="40" style="--offset: 251"/></svg>
              <span class="value">-</span>
              <span class="label">TODO</span>
            </div>
            <div class="progress-ring">
              <svg><circle class="bg" cx="50" cy="50" r="40"/><circle class="progress" cx="50" cy="50" r="40" style="--offset: 251"/></svg>
              <span class="value">-</span>
              <span class="label">IN PROGRESS</span>
            </div>
            <div class="progress-ring">
              <svg><circle class="bg" cx="50" cy="50" r="40"/><circle class="progress" cx="50" cy="50" r="40" style="--offset: 251"/></svg>
              <span class="value">-</span>
              <span class="label">REVIEW</span>
            </div>
            <div class="progress-ring">
              <svg><circle class="bg" cx="50" cy="50" r="40"/><circle class="progress" cx="50" cy="50" r="40" style="--offset: 251"/></svg>
              <span class="value">-</span>
              <span class="label">COMPLETE</span>
            </div>
          </div>
          
          <!-- Active Tasks List -->
          <div class="task-list" id="task-list">
            <div class="loading">
              <div class="loading-dot"></div>
              <div class="loading-dot"></div>
              <div class="loading-dot"></div>
            </div>
          </div>
          
          <!-- Stats Row -->
          <div class="stats-row">
            <div class="stat-item">
              <div class="stat-value" id="stat-active">-</div>
              <div class="stat-label">ACTIVE TASKS</div>
            </div>
            <div class="stat-item">
              <div class="stat-value" id="stat-today">-</div>
              <div class="stat-label">TODAY</div>
            </div>
            <div class="stat-item">
              <div class="stat-value" id="stat-week">-</div>
              <div class="stat-label">THIS WEEK</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Right Column -->
      <div class="right-column">
        <!-- Activity Feed -->
        <div class="panel">
          <div class="panel-title">ACTIVITY STREAM</div>
          <div class="activity-feed" id="activity-feed">
            <div class="loading">
              <div class="loading-dot"></div>
              <div class="loading-dot"></div>
              <div class="loading-dot"></div>
            </div>
          </div>
        </div>
        
        <!-- System Status -->
        <div class="panel" style="margin-top: 20px;">
          <div class="panel-title">SYSTEM METRICS</div>
          <div id="system-status">
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 13px;">
              <span>DISCORD</span>
              <span style="color: var(--success);">● CONNECTED</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 13px;">
              <span>OUTLOOK</span>
              <span style="color: var(--success);">● SYNCED</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 13px;">
              <span>WHATSAPP</span>
              <span style="color: var(--success);">● LINKED</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 13px;">
              <span>SUPERMEMORY</span>
              <span style="color: var(--success);">● ACTIVE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <script>
    const API = 'http://localhost:3102/api';
    const startTime = Date.now();
    
    // Generate waveform bars
    function initWaveform() {
      const container = document.getElementById('waveform');
      for (let i = 0; i < 40; i++) {
        const bar = document.createElement('div');
        bar.className = 'wave-bar';
        bar.style.setProperty('--wave-height', (Math.random() * 25 + 10) + 'px');
        bar.style.animationDelay = (Math.random() * 1.2) + 's';
        container.appendChild(bar);
      }
    }
    
    // Update time display
    function updateTime() {
      const now = new Date();
      document.getElementById('time').textContent = now.toLocaleTimeString('en-NZ', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: false 
      });
      document.getElementById('date').textContent = now.toLocaleDateString('en-NZ', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).toUpperCase();
      
      // Update uptime
      const uptime = Math.floor((Date.now() - startTime) / 1000);
      const hours = Math.floor(uptime / 3600);
      const mins = Math.floor((uptime % 3600) / 60);
      const secs = uptime % 60;
      document.getElementById('uptime').textContent = 
        'UPTIME: ' + String(hours).padStart(2, '0') + ':' + 
        String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
    }
    
    // Format relative time
    function formatTime(ts) {
      const diff = Date.now() - new Date(ts);
      if (diff < 60000) return 'JUST NOW';
      if (diff < 3600000) return Math.floor(diff / 60000) + 'M AGO';
      if (diff < 86400000) return Math.floor(diff / 3600000) + 'H AGO';
      return new Date(ts).toLocaleDateString('en-NZ', { month: 'short', day: 'numeric' });
    }
    
    // Get activity icon
    function getActivityIcon(type) {
      switch(type) {
        case 'task_created': return '📝';
        case 'task_updated': return '🔄';
        case 'task_deleted': return '🗑️';
        default: return '⚡';
      }
    }
    
    // Load and display data
    async function loadData() {
      try {
        const res = await fetch(API + '/data');
        const { tasks, activity, state } = await res.json();
        
        // Calculate stats
        const stats = {
          todo: tasks.filter(t => t.status === 'todo').length,
          inProgress: tasks.filter(t => t.status === 'in-progress').length,
          review: tasks.filter(t => t.status === 'review').length,
          complete: tasks.filter(t => t.status === 'complete').length
        };
        
        const total = tasks.length || 1;
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        const weekStart = new Date();
        weekStart.setDate(weekStart.getDate() - 7);
        
        const completedToday = tasks.filter(t => 
          t.status === 'complete' && new Date(t.completedAt) >= todayStart
        ).length;
        
        const completedWeek = tasks.filter(t => 
          t.status === 'complete' && new Date(t.completedAt) >= weekStart
        ).length;
        
        // Update progress rings
        const rings = document.querySelectorAll('.progress-ring');
        const values = [stats.todo, stats.inProgress, stats.review, stats.complete];
        const circumference = 251;
        
        rings.forEach((ring, i) => {
          const percent = (values[i] / total);
          const offset = circumference - (percent * circumference);
          ring.querySelector('.progress').style.setProperty('--offset', offset);
          ring.querySelector('.value').textContent = values[i];
        });
        
        // Update stats
        document.getElementById('stat-active').textContent = stats.todo + stats.inProgress + stats.review;
        document.getElementById('stat-today').textContent = completedToday;
        document.getElementById('stat-week').textContent = completedWeek;
        
        // Render active tasks (non-complete)
        const activeTasks = tasks.filter(t => t.status !== 'complete')
          .sort((a, b) => {
            const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
            return (priorityOrder[a.priority] || 2) - (priorityOrder[b.priority] || 2);
          });
        
        document.getElementById('task-list').innerHTML = activeTasks.map(task => \`
          <div class="task-item priority-\${task.priority || 'medium'}">
            <div class="task-title">\${task.title}</div>
            <div class="task-meta">
              <span class="task-badge">\${task.status}</span>
              <span class="task-badge">\${task.priority || 'medium'}</span>
              <span>\${task.project || 'General'}</span>
            </div>
          </div>
        \`).join('');
        
        // Calendar is loaded separately via loadCalendar()
        
        // Render activity feed
        document.getElementById('activity-feed').innerHTML = activity.slice(0, 15).map(item => \`
          <div class="activity-item">
            <div class="activity-icon">\${getActivityIcon(item.type)}</div>
            <div class="activity-content">
              <div class="activity-text">\${item.title || item.type}</div>
              <div class="activity-time">\${formatTime(item.timestamp)}</div>
            </div>
          </div>
        \`).join('');
        
      } catch (error) {
        console.error('Failed to load data:', error);
      }
    }
    
    // Load calendar from Outlook
    async function loadCalendar() {
      try {
        const res = await fetch(API + '/calendar');
        const { events } = await res.json();
        
        const now = new Date();
        const upcoming = events
          .filter(e => new Date(e.start) > now)
          .sort((a, b) => new Date(a.start) - new Date(b.start))
          .slice(0, 5);
        
        if (upcoming.length > 0) {
          document.getElementById('calendar').innerHTML = upcoming.map(event => {
            const date = new Date(event.start);
            const isToday = date.toDateString() === now.toDateString();
            const isTomorrow = date.toDateString() === new Date(now.getTime() + 86400000).toDateString();
            
            let dayLabel = date.toLocaleDateString('en-NZ', { weekday: 'short', month: 'short', day: 'numeric' });
            if (isToday) dayLabel = 'TODAY';
            if (isTomorrow) dayLabel = 'TOMORROW';
            
            return \`
              <div class="calendar-event" style="\${isToday ? 'border-color: var(--warning); background: rgba(255, 149, 0, 0.1);' : ''}">
                <div class="event-time" style="\${isToday ? 'color: var(--warning);' : ''}">\${dayLabel} • \${date.toLocaleTimeString('en-NZ', { hour: '2-digit', minute: '2-digit' })}</div>
                <div class="event-title">\${event.title}</div>
                \${event.location ? '<div style="font-size: 11px; color: var(--text-dim); margin-top: 4px;">📍 ' + event.location + '</div>' : ''}
              </div>
            \`;
          }).join('');
        } else {
          document.getElementById('calendar').innerHTML = '<div style="color: var(--text-dim); font-size: 13px; padding: 20px; text-align: center;">NO UPCOMING EVENTS</div>';
        }
      } catch (error) {
        console.error('Calendar load failed:', error);
        document.getElementById('calendar').innerHTML = '<div style="color: var(--danger); font-size: 13px; padding: 20px; text-align: center;">CALENDAR SYNC ERROR</div>';
      }
    }
    
    // Initialize
    initWaveform();
    updateTime();
    loadData();
    loadCalendar();
    
    // Update intervals
    setInterval(updateTime, 1000);
    setInterval(loadData, 5000);
    setInterval(loadCalendar, 60000); // Refresh calendar every minute
  </script>
</body>
</html>`;
  
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(html);
}

if (require.main === module) {
  startServer();
}

module.exports = { startServer };
