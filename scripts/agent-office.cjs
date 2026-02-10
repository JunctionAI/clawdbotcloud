#!/usr/bin/env node

/**
 * AGENT OFFICE VISUALIZATION
 * 
 * Top-down office view showing AI agents working at their desks.
 * Agents walk between areas based on their current status.
 * Relationship lines show connections between agents.
 * 
 * Usage:
 *   node scripts/agent-office.cjs
 * 
 * Opens on http://localhost:3101
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

const CONFIG = {
  port: 3101,
  agentsFile: path.join(__dirname, '..', 'data', 'mission-control', 'agents.json'),
  tasksFile: path.join(__dirname, '..', 'data', 'mission-control', 'tasks.json'),
  relationshipsFile: path.join(__dirname, '..', 'data', 'mission-control', 'relationships.json'),
  standupsDir: path.join(__dirname, '..', 'data', 'mission-control', 'standups'),
  memoriesDir: path.join(__dirname, '..', 'data', 'mission-control', 'agent-memories')
};

function loadAgents() {
  try {
    const data = JSON.parse(fs.readFileSync(CONFIG.agentsFile, 'utf8'));
    return data.agents || [];
  } catch (e) {
    return [];
  }
}

function loadTasks() {
  try {
    return JSON.parse(fs.readFileSync(CONFIG.tasksFile, 'utf8'));
  } catch (e) {
    return [];
  }
}

function loadRelationships() {
  try {
    return JSON.parse(fs.readFileSync(CONFIG.relationshipsFile, 'utf8'));
  } catch (e) {
    return { relationships: {}, meta: {} };
  }
}

function loadRecentStandups(limit = 5) {
  try {
    const files = fs.readdirSync(CONFIG.standupsDir)
      .filter(f => f.endsWith('.json'))
      .sort()
      .reverse()
      .slice(0, limit);
    
    return files.map(f => {
      const standup = JSON.parse(fs.readFileSync(path.join(CONFIG.standupsDir, f), 'utf8'));
      return {
        id: standup.id,
        type: standup.type,
        date: standup.date,
        status: standup.status,
        attendees: standup.attendees?.length || 0,
        actionItems: standup.actionItems?.length || 0,
        lessons: standup.lessons?.length || 0
      };
    });
  } catch (e) {
    return [];
  }
}

function loadAgentMemory(agentId) {
  try {
    const filePath = path.join(CONFIG.memoriesDir, `${agentId}.json`);
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    return null;
  }
}

function getHTML() {
  const agents = loadAgents();
  const tasks = loadTasks();
  const relationships = loadRelationships();
  const recentStandups = loadRecentStandups();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>🏢 Agent Office - Mission Control</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      background: #0a0e27;
      color: #e2e8f0;
      font-family: 'Segoe UI', system-ui, sans-serif;
      min-height: 100vh;
      overflow: hidden;
    }

    .header {
      background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
      padding: 15px 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #334155;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
    }

    .header h1 {
      font-size: 1.5rem;
      background: linear-gradient(135deg, #60a5fa, #a78bfa);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .header-stats {
      display: flex;
      gap: 20px;
      align-items: center;
    }

    .stat {
      background: rgba(99, 102, 241, 0.1);
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 0.85rem;
      border: 1px solid rgba(99, 102, 241, 0.3);
    }

    .stat-value {
      color: #60a5fa;
      font-weight: bold;
    }

    .view-toggle {
      display: flex;
      gap: 5px;
      background: rgba(30, 41, 59, 0.8);
      padding: 4px;
      border-radius: 10px;
    }

    .view-btn {
      padding: 8px 16px;
      border: none;
      background: transparent;
      color: #94a3b8;
      border-radius: 8px;
      cursor: pointer;
      font-size: 0.85rem;
      transition: all 0.2s;
    }

    .view-btn.active {
      background: #6366f1;
      color: white;
    }

    .view-btn:hover:not(.active) {
      background: rgba(99, 102, 241, 0.2);
    }

    .office-container {
      margin-top: 70px;
      height: calc(100vh - 70px);
      position: relative;
      overflow: hidden;
    }

    /* Office Floor */
    .office-floor {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 1200px;
      height: 700px;
      background: 
        repeating-linear-gradient(
          0deg,
          transparent,
          transparent 49px,
          rgba(99, 102, 241, 0.05) 49px,
          rgba(99, 102, 241, 0.05) 50px
        ),
        repeating-linear-gradient(
          90deg,
          transparent,
          transparent 49px,
          rgba(99, 102, 241, 0.05) 49px,
          rgba(99, 102, 241, 0.05) 50px
        ),
        linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
      border-radius: 20px;
      border: 2px solid #334155;
      box-shadow: 
        0 0 60px rgba(99, 102, 241, 0.1),
        inset 0 0 100px rgba(0, 0, 0, 0.3);
    }

    /* SVG for relationship lines */
    .relationship-lines {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 5;
    }

    .relationship-line {
      stroke-linecap: round;
      transition: opacity 0.3s;
    }

    .relationship-line.hidden {
      opacity: 0;
    }

    /* Areas */
    .area {
      position: absolute;
      border-radius: 15px;
      padding: 15px;
      background: rgba(30, 41, 59, 0.6);
      border: 1px dashed rgba(148, 163, 184, 0.3);
    }

    .area-label {
      position: absolute;
      top: -25px;
      left: 15px;
      font-size: 0.75rem;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 2px;
    }

    /* Work Area */
    .work-area {
      top: 80px;
      left: 50px;
      width: 500px;
      height: 400px;
      background: rgba(34, 197, 94, 0.05);
      border-color: rgba(34, 197, 94, 0.3);
    }

    /* Meeting Area */
    .meeting-area {
      top: 80px;
      right: 50px;
      width: 300px;
      height: 250px;
      background: rgba(249, 115, 22, 0.05);
      border-color: rgba(249, 115, 22, 0.3);
    }

    .meeting-table {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 150px;
      height: 80px;
      background: linear-gradient(135deg, #374151 0%, #1f2937 100%);
      border-radius: 10px;
      border: 2px solid #4b5563;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
    }

    /* Break Area */
    .break-area {
      bottom: 80px;
      right: 50px;
      width: 300px;
      height: 200px;
      background: rgba(168, 85, 247, 0.05);
      border-color: rgba(168, 85, 247, 0.3);
    }

    .coffee-machine {
      position: absolute;
      bottom: 20px;
      right: 20px;
      width: 40px;
      height: 60px;
      background: linear-gradient(180deg, #78716c 0%, #57534e 100%);
      border-radius: 5px;
      border: 2px solid #a8a29e;
    }

    .couch {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 120px;
      height: 50px;
      background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%);
      border-radius: 25px;
      border: 2px solid #8b5cf6;
    }

    /* Idle Area */
    .idle-area {
      bottom: 80px;
      left: 50px;
      width: 200px;
      height: 200px;
      background: rgba(99, 102, 241, 0.05);
      border-color: rgba(99, 102, 241, 0.3);
    }

    /* Desks */
    .desk {
      position: absolute;
      width: 100px;
      height: 60px;
      background: linear-gradient(135deg, #475569 0%, #334155 100%);
      border-radius: 8px;
      border: 2px solid #64748b;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    }

    .desk::before {
      content: '';
      position: absolute;
      top: 5px;
      left: 5px;
      right: 5px;
      height: 25px;
      background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
      border-radius: 3px;
      box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
    }

    .desk-1 { top: 40px; left: 40px; }
    .desk-2 { top: 40px; left: 180px; }
    .desk-3 { top: 40px; left: 320px; }
    .desk-4 { top: 160px; left: 40px; }
    .desk-5 { top: 160px; left: 180px; }
    .desk-6 { top: 160px; left: 320px; }
    .desk-7 { top: 280px; left: 100px; }
    .desk-8 { top: 280px; left: 240px; }

    /* Agent Avatar */
    .agent {
      position: absolute;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      cursor: pointer;
      transition: transform 0.3s ease;
      z-index: 10;
      animation: float 3s ease-in-out infinite;
    }

    .agent:hover {
      transform: scale(1.2);
      z-index: 20;
    }

    .agent-body {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      position: relative;
      box-shadow: 
        0 4px 20px rgba(0, 0, 0, 0.4),
        0 0 30px var(--glow-color, rgba(99, 102, 241, 0.3));
      border: 3px solid var(--border-color, #6366f1);
      background: var(--bg-color, linear-gradient(135deg, #1e293b 0%, #0f172a 100%));
    }

    .agent-name {
      position: absolute;
      bottom: -25px;
      left: 50%;
      transform: translateX(-50%);
      white-space: nowrap;
      font-size: 0.7rem;
      font-weight: bold;
      color: #e2e8f0;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
      background: rgba(15, 23, 42, 0.9);
      padding: 2px 8px;
      border-radius: 10px;
    }

    .agent-status {
      position: absolute;
      top: -8px;
      right: -8px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 2px solid #0f172a;
      animation: pulse 2s ease-in-out infinite;
    }

    .status-active { background: #22c55e; box-shadow: 0 0 10px #22c55e; }
    .status-idle { background: #f59e0b; box-shadow: 0 0 10px #f59e0b; }
    .status-busy { background: #ef4444; box-shadow: 0 0 10px #ef4444; }
    .status-offline { background: #6b7280; }

    /* Task bubble */
    .task-bubble {
      position: absolute;
      top: -50px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(30, 41, 59, 0.95);
      padding: 5px 10px;
      border-radius: 10px;
      font-size: 0.65rem;
      max-width: 150px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      border: 1px solid #475569;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .agent:hover .task-bubble {
      opacity: 1;
    }

    @keyframes walk {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-3px); }
    }

    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-5px); }
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    .agent.walking {
      animation: walk 0.3s ease-in-out infinite;
    }

    .agent.working .agent-body::after {
      content: '⌨️';
      position: absolute;
      bottom: -15px;
      font-size: 0.8rem;
      animation: typing 0.5s ease-in-out infinite;
    }

    @keyframes typing {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.3; }
    }

    /* Side Panel */
    .side-panel {
      position: fixed;
      right: -450px;
      top: 70px;
      width: 450px;
      height: calc(100vh - 70px);
      background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
      border-left: 1px solid #334155;
      transition: right 0.3s ease;
      z-index: 200;
      overflow-y: auto;
      padding: 20px;
    }

    .side-panel.open {
      right: 0;
    }

    .panel-close {
      position: absolute;
      top: 15px;
      right: 15px;
      background: none;
      border: none;
      color: #94a3b8;
      font-size: 1.5rem;
      cursor: pointer;
    }

    .panel-close:hover {
      color: #f87171;
    }

    .panel-header {
      display: flex;
      align-items: center;
      gap: 15px;
      margin-bottom: 25px;
      padding-bottom: 15px;
      border-bottom: 1px solid #334155;
    }

    .panel-avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
      border: 3px solid #6366f1;
    }

    .panel-name {
      font-size: 1.3rem;
      font-weight: bold;
    }

    .panel-project {
      font-size: 0.85rem;
      color: #94a3b8;
    }

    .panel-section {
      margin-bottom: 20px;
    }

    .panel-section h3 {
      font-size: 0.85rem;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 10px;
    }

    .skill-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .skill-tag {
      background: rgba(99, 102, 241, 0.2);
      color: #a5b4fc;
      padding: 5px 12px;
      border-radius: 15px;
      font-size: 0.75rem;
      border: 1px solid rgba(99, 102, 241, 0.3);
    }

    .stat-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }

    .stat-card {
      background: rgba(30, 41, 59, 0.5);
      padding: 15px;
      border-radius: 10px;
      border: 1px solid #334155;
    }

    .stat-card-value {
      font-size: 1.5rem;
      font-weight: bold;
      color: #60a5fa;
    }

    .stat-card-label {
      font-size: 0.75rem;
      color: #94a3b8;
    }

    /* Relationship visualization in panel */
    .relationship-grid {
      display: grid;
      gap: 10px;
    }

    .relationship-card {
      background: rgba(30, 41, 59, 0.5);
      padding: 12px;
      border-radius: 10px;
      border: 1px solid #334155;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .rel-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      background: rgba(15, 23, 42, 0.8);
    }

    .rel-info {
      flex: 1;
    }

    .rel-name {
      font-size: 0.85rem;
      font-weight: bold;
    }

    .rel-bar {
      height: 6px;
      background: #1f2937;
      border-radius: 3px;
      margin-top: 5px;
      overflow: hidden;
    }

    .rel-bar-fill {
      height: 100%;
      border-radius: 3px;
      transition: width 0.5s ease;
    }

    .rel-score {
      font-size: 0.75rem;
      font-weight: bold;
      min-width: 40px;
      text-align: right;
    }

    /* Lesson/Memory items */
    .memory-item {
      background: rgba(30, 41, 59, 0.5);
      padding: 12px;
      border-radius: 10px;
      border: 1px solid #334155;
      margin-bottom: 10px;
    }

    .memory-item-type {
      font-size: 0.65rem;
      color: #94a3b8;
      text-transform: uppercase;
      margin-bottom: 5px;
    }

    .memory-item-content {
      font-size: 0.85rem;
    }

    .memory-item-time {
      font-size: 0.7rem;
      color: #64748b;
      margin-top: 5px;
    }

    /* Standup Panel */
    .standup-list {
      display: grid;
      gap: 10px;
    }

    .standup-card {
      background: rgba(30, 41, 59, 0.5);
      padding: 15px;
      border-radius: 10px;
      border: 1px solid #334155;
      cursor: pointer;
      transition: all 0.2s;
    }

    .standup-card:hover {
      border-color: #6366f1;
      transform: translateX(5px);
    }

    .standup-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }

    .standup-title {
      font-weight: bold;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .standup-badge {
      font-size: 0.65rem;
      padding: 2px 8px;
      border-radius: 10px;
    }

    .standup-badge.morning {
      background: rgba(251, 191, 36, 0.2);
      color: #fbbf24;
    }

    .standup-badge.evening {
      background: rgba(139, 92, 246, 0.2);
      color: #8b5cf6;
    }

    .standup-status {
      font-size: 0.7rem;
      padding: 3px 10px;
      border-radius: 10px;
    }

    .standup-status.completed {
      background: rgba(34, 197, 94, 0.2);
      color: #22c55e;
    }

    .standup-status.in-progress {
      background: rgba(245, 158, 11, 0.2);
      color: #f59e0b;
    }

    .standup-stats {
      display: flex;
      gap: 15px;
      font-size: 0.75rem;
      color: #94a3b8;
    }

    /* Start Standup Button */
    .start-standup-btn {
      width: 100%;
      padding: 15px;
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      border: none;
      border-radius: 12px;
      color: white;
      font-weight: bold;
      font-size: 1rem;
      cursor: pointer;
      margin-bottom: 15px;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }

    .start-standup-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 20px rgba(99, 102, 241, 0.4);
    }

    /* Legend */
    .legend {
      position: fixed;
      top: 90px;
      left: 20px;
      background: rgba(30, 41, 59, 0.9);
      border-radius: 10px;
      padding: 15px;
      border: 1px solid #334155;
      z-index: 50;
    }

    .legend h4 {
      font-size: 0.75rem;
      color: #94a3b8;
      margin-bottom: 10px;
      text-transform: uppercase;
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.75rem;
      margin-bottom: 5px;
    }

    .legend-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }

    .legend-line {
      width: 30px;
      height: 3px;
      border-radius: 2px;
    }

    /* Relationship Toggle */
    .rel-toggle {
      margin-top: 15px;
      padding-top: 10px;
      border-top: 1px solid #334155;
    }

    .rel-toggle label {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.75rem;
      cursor: pointer;
    }

    .rel-toggle input {
      cursor: pointer;
    }

    /* Particles */
    .particles {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      overflow: hidden;
    }

    .particle {
      position: absolute;
      width: 4px;
      height: 4px;
      background: rgba(99, 102, 241, 0.3);
      border-radius: 50%;
      animation: float-particle 15s linear infinite;
    }

    @keyframes float-particle {
      0% {
        transform: translateY(100vh) rotate(0deg);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 1;
      }
      100% {
        transform: translateY(-100vh) rotate(720deg);
        opacity: 0;
      }
    }

    /* Back Link */
    .back-link {
      color: #94a3b8;
      text-decoration: none;
      font-size: 0.85rem;
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .back-link:hover {
      color: #60a5fa;
    }

    /* Bottom Panels */
    .bottom-panels {
      position: fixed;
      bottom: 20px;
      left: 20px;
      right: 20px;
      display: flex;
      gap: 20px;
      z-index: 50;
    }

    .bottom-panel {
      background: rgba(30, 41, 59, 0.95);
      border-radius: 15px;
      border: 1px solid #334155;
      padding: 15px;
      max-height: 200px;
      overflow-y: auto;
    }

    .bottom-panel h4 {
      font-size: 0.8rem;
      color: #94a3b8;
      margin-bottom: 10px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .activity-panel {
      width: 300px;
    }

    .standups-panel {
      flex: 1;
      max-width: 400px;
    }

    .activity-item {
      display: flex;
      gap: 10px;
      padding: 8px 0;
      border-bottom: 1px solid rgba(51, 65, 85, 0.5);
      font-size: 0.75rem;
    }

    .activity-item:last-child {
      border-bottom: none;
    }

    .activity-time {
      color: #64748b;
      min-width: 50px;
    }

    .activity-text {
      color: #cbd5e1;
    }

    /* Standup in-progress indicator */
    .standup-in-progress {
      background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(249, 115, 22, 0.1));
      border: 2px solid rgba(245, 158, 11, 0.5);
      animation: standup-pulse 2s ease-in-out infinite;
    }

    @keyframes standup-pulse {
      0%, 100% { box-shadow: 0 0 20px rgba(245, 158, 11, 0.2); }
      50% { box-shadow: 0 0 40px rgba(245, 158, 11, 0.4); }
    }
  </style>
</head>
<body>
  <header class="header">
    <h1>🏢 Agent Office</h1>
    <div class="header-stats">
      <a href="http://localhost:3100" class="back-link">← Mission Control</a>
      <div class="view-toggle">
        <button class="view-btn active" onclick="setView('office')">🏢 Office</button>
        <button class="view-btn" onclick="setView('standups')">🎙️ Standups</button>
      </div>
      <div class="stat">Agents: <span class="stat-value" id="agent-count">0</span></div>
      <div class="stat">Active: <span class="stat-value" id="active-count">0</span></div>
    </div>
  </header>

  <div class="office-container">
    <div class="particles" id="particles"></div>
    
    <div class="office-floor">
      <!-- SVG for relationship lines -->
      <svg class="relationship-lines" id="relationship-svg"></svg>

      <!-- Work Area -->
      <div class="area work-area">
        <span class="area-label">💻 Work Zone</span>
        <div class="desk desk-1"></div>
        <div class="desk desk-2"></div>
        <div class="desk desk-3"></div>
        <div class="desk desk-4"></div>
        <div class="desk desk-5"></div>
        <div class="desk desk-6"></div>
        <div class="desk desk-7"></div>
        <div class="desk desk-8"></div>
      </div>

      <!-- Meeting Area -->
      <div class="area meeting-area" id="meeting-area">
        <span class="area-label">📊 Meeting Room</span>
        <div class="meeting-table"></div>
      </div>

      <!-- Break Area -->
      <div class="area break-area">
        <span class="area-label">☕ Break Room</span>
        <div class="couch"></div>
        <div class="coffee-machine"></div>
      </div>

      <!-- Idle Area -->
      <div class="area idle-area">
        <span class="area-label">🌙 Idle Zone</span>
      </div>

      <!-- Agents will be rendered here -->
      <div id="agents-container"></div>
    </div>
  </div>

  <div class="legend">
    <h4>Status</h4>
    <div class="legend-item">
      <div class="legend-dot" style="background: #22c55e;"></div>
      <span>Active</span>
    </div>
    <div class="legend-item">
      <div class="legend-dot" style="background: #f59e0b;"></div>
      <span>Idle</span>
    </div>
    <div class="legend-item">
      <div class="legend-dot" style="background: #ef4444;"></div>
      <span>Busy</span>
    </div>
    <div class="legend-item">
      <div class="legend-dot" style="background: #6b7280;"></div>
      <span>Offline</span>
    </div>
    
    <div class="rel-toggle">
      <h4 style="margin-bottom: 8px;">Relationships</h4>
      <div class="legend-item">
        <div class="legend-line" style="background: #22c55e;"></div>
        <span>Good (60+)</span>
      </div>
      <div class="legend-item">
        <div class="legend-line" style="background: #f59e0b;"></div>
        <span>Neutral (40-60)</span>
      </div>
      <div class="legend-item">
        <div class="legend-line" style="background: #ef4444;"></div>
        <span>Tension (&lt;40)</span>
      </div>
      <label style="margin-top: 10px;">
        <input type="checkbox" id="showRelationships" checked onchange="toggleRelationships()">
        Show Lines
      </label>
    </div>
  </div>

  <div class="bottom-panels">
    <div class="bottom-panel activity-panel" id="activity-feed">
      <h4>📡 Live Activity</h4>
      <div id="activity-items"></div>
    </div>
    
    <div class="bottom-panel standups-panel">
      <h4>🎙️ Recent Standups</h4>
      <div id="standups-list"></div>
    </div>
  </div>

  <div class="side-panel" id="side-panel">
    <button class="panel-close" onclick="closePanel()">×</button>
    <div id="panel-content"></div>
  </div>

  <script>
    // Data from server
    const agentsData = ${JSON.stringify(agents)};
    const tasksData = ${JSON.stringify(tasks)};
    const relationshipsData = ${JSON.stringify(relationships)};
    const recentStandups = ${JSON.stringify(recentStandups)};

    // Color schemes for agents
    const colorSchemes = [
      { border: '#22c55e', glow: 'rgba(34, 197, 94, 0.3)', bg: 'linear-gradient(135deg, #14532d 0%, #052e16 100%)' },
      { border: '#f59e0b', glow: 'rgba(245, 158, 11, 0.3)', bg: 'linear-gradient(135deg, #78350f 0%, #451a03 100%)' },
      { border: '#6366f1', glow: 'rgba(99, 102, 241, 0.3)', bg: 'linear-gradient(135deg, #3730a3 0%, #1e1b4b 100%)' },
      { border: '#ec4899', glow: 'rgba(236, 72, 153, 0.3)', bg: 'linear-gradient(135deg, #831843 0%, #500724 100%)' },
      { border: '#14b8a6', glow: 'rgba(20, 184, 166, 0.3)', bg: 'linear-gradient(135deg, #115e59 0%, #042f2e 100%)' },
      { border: '#f43f5e', glow: 'rgba(244, 63, 94, 0.3)', bg: 'linear-gradient(135deg, #881337 0%, #4c0519 100%)' },
      { border: '#3b82f6', glow: 'rgba(59, 130, 246, 0.3)', bg: 'linear-gradient(135deg, #1e3a8a 0%, #1e1b4b 100%)' },
    ];

    // Desk positions (relative to work area)
    const deskPositions = [
      { x: 90, y: 120 },
      { x: 230, y: 120 },
      { x: 370, y: 120 },
      { x: 90, y: 240 },
      { x: 230, y: 240 },
      { x: 370, y: 240 },
      { x: 150, y: 360 },
      { x: 290, y: 360 },
    ];

    // Area positions
    const areas = {
      work: { x: 50, y: 80, width: 500, height: 400 },
      meeting: { x: 650, y: 80, width: 300, height: 250 },
      break: { x: 650, y: 420, width: 300, height: 200 },
      idle: { x: 50, y: 500, width: 200, height: 200 }
    };

    // Agent positions storage
    const agentPositions = {};

    function getRelationshipColor(score) {
      if (score >= 60) return '#22c55e';
      if (score >= 40) return '#f59e0b';
      return '#ef4444';
    }

    function getRelationshipOpacity(score) {
      return Math.max(0.2, Math.abs(score - 50) / 100 + 0.3);
    }

    function initAgents() {
      const container = document.getElementById('agents-container');
      container.innerHTML = '';

      agentsData.forEach((agent, index) => {
        const colorScheme = colorSchemes[index % colorSchemes.length];
        const deskPos = deskPositions[index % deskPositions.length];
        
        // Determine status and position
        let status = agent.status || 'idle';
        let area = 'work';
        let targetX, targetY;

        if (agent.currentTask || status === 'active') {
          area = 'work';
          targetX = areas.work.x + deskPos.x;
          targetY = areas.work.y + deskPos.y;
          status = 'active';
        } else if (status === 'idle') {
          area = 'idle';
          targetX = areas.idle.x + 50 + Math.random() * 100;
          targetY = areas.idle.y + 50 + Math.random() * 100;
        } else {
          area = 'break';
          targetX = areas.break.x + 50 + Math.random() * 200;
          targetY = areas.break.y + 50 + Math.random() * 100;
        }

        agentPositions[agent.id] = { x: targetX + 25, y: targetY + 25 }; // Center point

        const agentEl = document.createElement('div');
        agentEl.className = 'agent' + (status === 'active' ? ' working' : '');
        agentEl.id = 'agent-' + agent.id;
        agentEl.style.cssText = \`
          left: \${targetX}px;
          top: \${targetY}px;
          --border-color: \${colorScheme.border};
          --glow-color: \${colorScheme.glow};
          --bg-color: \${colorScheme.bg};
          animation-delay: \${index * 0.3}s;
        \`;
        agentEl.onclick = () => showAgentPanel(agent, colorScheme);

        const taskText = agent.currentTask || agent.focus || 'No active task';

        agentEl.innerHTML = \`
          <div class="task-bubble">\${taskText.substring(0, 40)}</div>
          <div class="agent-body">\${agent.emoji || '🤖'}</div>
          <div class="agent-status status-\${status}"></div>
          <div class="agent-name">\${agent.name.split(' ')[0]}</div>
        \`;

        container.appendChild(agentEl);
      });

      // Update stats
      document.getElementById('agent-count').textContent = agentsData.length;
      document.getElementById('active-count').textContent = agentsData.filter(a => a.status === 'active').length;

      // Draw relationship lines
      drawRelationshipLines();
    }

    function drawRelationshipLines() {
      const svg = document.getElementById('relationship-svg');
      svg.innerHTML = '';

      if (!relationshipsData.relationships) return;

      const drawn = new Set();

      for (const [fromId, targets] of Object.entries(relationshipsData.relationships)) {
        for (const [toId, data] of Object.entries(targets)) {
          const key = [fromId, toId].sort().join('-');
          if (drawn.has(key)) continue;
          drawn.add(key);

          const from = agentPositions[fromId];
          const to = agentPositions[toId];
          if (!from || !to) continue;

          const color = getRelationshipColor(data.score);
          const opacity = getRelationshipOpacity(data.score);

          const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          line.setAttribute('x1', from.x);
          line.setAttribute('y1', from.y);
          line.setAttribute('x2', to.x);
          line.setAttribute('y2', to.y);
          line.setAttribute('stroke', color);
          line.setAttribute('stroke-width', '2');
          line.setAttribute('stroke-opacity', opacity);
          line.setAttribute('class', 'relationship-line');
          line.setAttribute('data-from', fromId);
          line.setAttribute('data-to', toId);
          line.setAttribute('data-score', data.score);

          svg.appendChild(line);
        }
      }
    }

    function toggleRelationships() {
      const show = document.getElementById('showRelationships').checked;
      const lines = document.querySelectorAll('.relationship-line');
      lines.forEach(line => {
        line.classList.toggle('hidden', !show);
      });
    }

    function showAgentPanel(agent, colorScheme) {
      const panel = document.getElementById('side-panel');
      const content = document.getElementById('panel-content');

      const task = agent.currentTask 
        ? tasksData.find(t => t.title === agent.currentTask)
        : tasksData.find(t => t.assignee === agent.id && t.status === 'in-progress');

      // Get relationships for this agent
      const agentRels = relationshipsData.relationships?.[agent.id] || {};
      const relationships = Object.entries(agentRels).map(([otherId, data]) => {
        const otherAgent = agentsData.find(a => a.id === otherId);
        return {
          id: otherId,
          name: otherAgent?.name || otherId,
          emoji: otherAgent?.emoji || '🤖',
          score: data.score
        };
      }).sort((a, b) => b.score - a.score);

      const skills = (agent.capabilities || []).map(skill => 
        '<span class="skill-tag">' + skill + '</span>'
      ).join('');

      const relationshipCards = relationships.map(rel => \`
        <div class="relationship-card">
          <div class="rel-avatar">\${rel.emoji}</div>
          <div class="rel-info">
            <div class="rel-name">\${rel.name.split(' ')[0]}</div>
            <div class="rel-bar">
              <div class="rel-bar-fill" style="width: \${(rel.score + 100) / 2}%; background: \${getRelationshipColor(rel.score)};"></div>
            </div>
          </div>
          <div class="rel-score" style="color: \${getRelationshipColor(rel.score)};">\${rel.score}</div>
        </div>
      \`).join('');

      content.innerHTML = \`
        <div class="panel-header">
          <div class="panel-avatar" style="border-color: \${colorScheme.border};">\${agent.emoji || '🤖'}</div>
          <div>
            <div class="panel-name">\${agent.name}</div>
            <div class="panel-project">📁 \${agent.project || 'General'}</div>
          </div>
        </div>

        <div class="panel-section">
          <h3>📊 Stats</h3>
          <div class="stat-grid">
            <div class="stat-card">
              <div class="stat-card-value">\${agent.tasksCompleted || 0}</div>
              <div class="stat-card-label">Tasks Completed</div>
            </div>
            <div class="stat-card">
              <div class="stat-card-value">\${agent.heartbeatInterval || '15min'}</div>
              <div class="stat-card-label">Check-in Interval</div>
            </div>
          </div>
        </div>

        <div class="panel-section">
          <h3>🤝 Relationships</h3>
          <div class="relationship-grid">
            \${relationshipCards || '<div style="color: #64748b; font-size: 0.85rem;">No relationships yet</div>'}
          </div>
        </div>

        <div class="panel-section">
          <h3>🧠 Capabilities</h3>
          <div class="skill-tags">\${skills}</div>
        </div>

        <div class="panel-section">
          <h3>📋 Focus Area</h3>
          <p style="font-size: 0.9rem; color: #cbd5e1;">\${agent.focus || 'General tasks'}</p>
        </div>

        <button class="start-standup-btn" onclick="recordInteraction('\${agent.id}')">
          💬 Record Interaction
        </button>
      \`;

      panel.classList.add('open');
    }

    function closePanel() {
      document.getElementById('side-panel').classList.remove('open');
    }

    function recordInteraction(agentId) {
      const agents = agentsData.filter(a => a.id !== agentId);
      const otherAgent = prompt('Interaction with which agent? (' + agents.map(a => a.id).join(', ') + ')');
      if (!otherAgent) return;

      const type = prompt('Type of interaction? (collaboration, disagreement, argument, compliment, help, ignore)');
      if (!type) return;

      fetch('http://localhost:3102/api/relationships/interaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: agentId,
          to: otherAgent,
          type: type,
          reason: 'Manual entry from Agent Office'
        })
      })
      .then(r => r.json())
      .then(data => {
        alert('Recorded! New score: ' + data.newScore + ' (change: ' + data.change + ')');
        window.location.reload();
      })
      .catch(err => alert('Error: ' + err.message));
    }

    function startStandup(type) {
      fetch('http://localhost:3102/api/standups/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type })
      })
      .then(r => r.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          alert('Standup started: ' + data.id);
          window.location.reload();
        }
      })
      .catch(err => alert('Error: ' + err.message));
    }

    function renderStandups() {
      const container = document.getElementById('standups-list');
      
      if (recentStandups.length === 0) {
        container.innerHTML = \`
          <button class="start-standup-btn" onclick="startStandup('morning')">
            🌅 Start Morning Standup
          </button>
          <button class="start-standup-btn" style="background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);" onclick="startStandup('evening')">
            🌙 Start Evening Standup
          </button>
          <p style="text-align: center; color: #64748b; font-size: 0.8rem; margin-top: 10px;">No standups yet</p>
        \`;
        return;
      }

      container.innerHTML = recentStandups.map(s => \`
        <div class="standup-card" onclick="showStandupDetails('\${s.id}')">
          <div class="standup-header">
            <div class="standup-title">
              \${s.type === 'morning' ? '🌅' : '🌙'}
              <span class="standup-badge \${s.type}">\${s.type}</span>
              \${s.id}
            </div>
            <div class="standup-status \${s.status}">\${s.status}</div>
          </div>
          <div class="standup-stats">
            <span>👥 \${s.attendees} agents</span>
            <span>📋 \${s.actionItems} actions</span>
            <span>💡 \${s.lessons} lessons</span>
          </div>
        </div>
      \`).join('');
    }

    function showStandupDetails(id) {
      fetch('http://localhost:3102/api/standups/' + id)
        .then(r => r.json())
        .then(standup => {
          const panel = document.getElementById('side-panel');
          const content = document.getElementById('panel-content');

          const actionItems = standup.actionItems?.map(a => \`
            <div class="memory-item">
              <div class="memory-item-type">Action Item - \${a.priority}</div>
              <div class="memory-item-content"><strong>\${a.title}</strong></div>
              <div style="font-size: 0.8rem; color: #94a3b8;">\${a.description || ''}</div>
              <div class="memory-item-time">Assigned to: \${a.assignee || 'Unassigned'}</div>
            </div>
          \`).join('') || '<p style="color: #64748b;">No action items</p>';

          const lessons = standup.lessons?.map(l => \`
            <div class="memory-item">
              <div class="memory-item-type">Lesson - \${l.category}</div>
              <div class="memory-item-content">\${l.content}</div>
              <div class="memory-item-time">Learned by: \${l.learnedBy || 'Team'}</div>
            </div>
          \`).join('') || '<p style="color: #64748b;">No lessons recorded</p>';

          content.innerHTML = \`
            <div class="panel-header">
              <div class="panel-avatar" style="border-color: \${standup.type === 'morning' ? '#fbbf24' : '#8b5cf6'};">
                \${standup.type === 'morning' ? '🌅' : '🌙'}
              </div>
              <div>
                <div class="panel-name">\${standup.id}</div>
                <div class="panel-project">\${standup.status} • \${standup.attendees?.length || 0} attendees</div>
              </div>
            </div>

            <div class="panel-section">
              <h3>📊 Metrics</h3>
              <div class="stat-grid">
                <div class="stat-card">
                  <div class="stat-card-value">\${standup.metrics?.participationRate || 0}%</div>
                  <div class="stat-card-label">Participation</div>
                </div>
                <div class="stat-card">
                  <div class="stat-card-value">\${standup.metrics?.ideasCount || 0}</div>
                  <div class="stat-card-label">Ideas Generated</div>
                </div>
              </div>
            </div>

            <div class="panel-section">
              <h3>📋 Action Items (\${standup.actionItems?.length || 0})</h3>
              \${actionItems}
            </div>

            <div class="panel-section">
              <h3>💡 Lessons Learned (\${standup.lessons?.length || 0})</h3>
              \${lessons}
            </div>

            \${standup.status === 'in-progress' ? \`
              <button class="start-standup-btn" onclick="completeStandup('\${standup.id}')">
                ✅ Complete Standup
              </button>
            \` : ''}
          \`;

          panel.classList.add('open');
        })
        .catch(err => console.error('Error loading standup:', err));
    }

    function completeStandup(id) {
      fetch('http://localhost:3102/api/standups/' + id + '/complete', {
        method: 'POST'
      })
      .then(r => r.json())
      .then(() => {
        alert('Standup completed!');
        window.location.reload();
      })
      .catch(err => alert('Error: ' + err.message));
    }

    function setView(view) {
      document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'));
      event.target.classList.add('active');
      
      if (view === 'standups') {
        // Could show a full standups view
        const panel = document.getElementById('side-panel');
        const content = document.getElementById('panel-content');
        
        content.innerHTML = \`
          <div class="panel-header">
            <div class="panel-avatar" style="border-color: #6366f1;">🎙️</div>
            <div>
              <div class="panel-name">Standups</div>
              <div class="panel-project">Agent Meeting Management</div>
            </div>
          </div>

          <button class="start-standup-btn" onclick="startStandup('morning')">
            🌅 Start Morning Standup
          </button>
          <button class="start-standup-btn" style="background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);" onclick="startStandup('evening')">
            🌙 Start Evening Standup
          </button>

          <div class="panel-section" style="margin-top: 20px;">
            <h3>📜 Recent Standups</h3>
            <div class="standup-list">
              \${recentStandups.map(s => \`
                <div class="standup-card" onclick="showStandupDetails('\${s.id}')">
                  <div class="standup-header">
                    <div class="standup-title">
                      \${s.type === 'morning' ? '🌅' : '🌙'} \${s.id}
                    </div>
                    <div class="standup-status \${s.status}">\${s.status}</div>
                  </div>
                  <div class="standup-stats">
                    <span>📋 \${s.actionItems} actions</span>
                    <span>💡 \${s.lessons} lessons</span>
                  </div>
                </div>
              \`).join('') || '<p style="color: #64748b;">No standups yet</p>'}
            </div>
          </div>
        \`;
        
        panel.classList.add('open');
      }
    }

    // Create particles
    function createParticles() {
      const container = document.getElementById('particles');
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (10 + Math.random() * 10) + 's';
        container.appendChild(particle);
      }
    }

    // Activity feed
    function updateActivityFeed() {
      const feed = document.getElementById('activity-items');
      const activities = [
        { time: 'now', text: '🏢 Office view loaded' },
        { time: '2m', text: '🔄 Agents synchronized' }
      ];

      agentsData.forEach(agent => {
        if (agent.lastHeartbeat) {
          const ago = getTimeAgo(new Date(agent.lastHeartbeat));
          activities.push({
            time: ago,
            text: (agent.emoji || '🤖') + ' ' + agent.name.split(' ')[0] + ' checked in'
          });
        }
      });

      activities.sort((a, b) => parseTimeAgo(a.time) - parseTimeAgo(b.time));

      feed.innerHTML = activities.slice(0, 5).map(a => \`
        <div class="activity-item">
          <span class="activity-time">\${a.time}</span>
          <span class="activity-text">\${a.text}</span>
        </div>
      \`).join('');
    }

    function getTimeAgo(date) {
      const seconds = Math.floor((new Date() - date) / 1000);
      if (seconds < 60) return 'now';
      if (seconds < 3600) return Math.floor(seconds / 60) + 'm';
      if (seconds < 86400) return Math.floor(seconds / 3600) + 'h';
      return Math.floor(seconds / 86400) + 'd';
    }

    function parseTimeAgo(str) {
      if (str === 'now') return 0;
      const num = parseInt(str);
      if (str.endsWith('m')) return num * 60;
      if (str.endsWith('h')) return num * 3600;
      if (str.endsWith('d')) return num * 86400;
      return 0;
    }

    // Random movement for idle agents
    function moveIdleAgents() {
      agentsData.forEach(agent => {
        if (agent.status === 'idle') {
          const el = document.getElementById('agent-' + agent.id);
          if (el && Math.random() > 0.7) {
            const newX = areas.idle.x + 30 + Math.random() * 140;
            const newY = areas.idle.y + 30 + Math.random() * 140;
            
            el.classList.add('walking');
            el.style.transition = 'left 2s ease, top 2s ease';
            el.style.left = newX + 'px';
            el.style.top = newY + 'px';
            
            agentPositions[agent.id] = { x: newX + 25, y: newY + 25 };
            
            setTimeout(() => {
              el.classList.remove('walking');
              drawRelationshipLines(); // Redraw lines after movement
            }, 2000);
          }
        }
      });
    }

    // Initialize
    createParticles();
    initAgents();
    updateActivityFeed();
    renderStandups();

    // Periodic updates
    setInterval(moveIdleAgents, 5000);
    setInterval(updateActivityFeed, 30000);

    // Refresh data every 30 seconds
    setInterval(() => {
      fetch('/api/agents')
        .then(r => r.json())
        .then(data => {
          if (data.agents) {
            window.location.reload();
          }
        })
        .catch(() => {});
    }, 30000);
  </script>
</body>
</html>`;
}

// API handlers
function handleAPI(req, res, pathname) {
  if (pathname === '/api/agents') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ agents: loadAgents() }));
    return true;
  }

  if (pathname === '/api/tasks') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(loadTasks()));
    return true;
  }

  if (pathname === '/api/relationships') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(loadRelationships()));
    return true;
  }

  if (pathname === '/api/standups') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(loadRecentStandups()));
    return true;
  }

  return false;
}

// Start server
function startServer() {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, 'http://localhost:' + CONFIG.port);
    const pathname = url.pathname;

    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return;
    }

    // API routes
    if (pathname.startsWith('/api/')) {
      if (handleAPI(req, res, pathname)) return;
    }

    // Serve HTML
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(getHTML());
  });

  server.listen(CONFIG.port, () => {
    console.log('');
    console.log('╔══════════════════════════════════════════════════════════════╗');
    console.log('║                    🏢 AGENT OFFICE                           ║');
    console.log('╠══════════════════════════════════════════════════════════════╣');
    console.log('║  Visual workspace with relationships & standups              ║');
    console.log('║                                                              ║');
    console.log('║  🌐 Dashboard: http://localhost:' + CONFIG.port + '                     ║');
    console.log('║  🎙️  Standup API: http://localhost:3102                      ║');
    console.log('║  📊 Mission Control: http://localhost:3100                   ║');
    console.log('║                                                              ║');
    console.log('║  Features:                                                   ║');
    console.log('║  • Top-down office view with work zones                      ║');
    console.log('║  • Relationship lines (green=good, red=tension)              ║');
    console.log('║  • Click agents to view relationships & memory               ║');
    console.log('║  • Standup management with action items & lessons            ║');
    console.log('║  • Real-time activity feed                                   ║');
    console.log('╚══════════════════════════════════════════════════════════════╝');
    console.log('');
  });
}

startServer();
