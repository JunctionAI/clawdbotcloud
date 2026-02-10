#!/usr/bin/env node

/**
 * STANDUP API - Autonomous Agent Meeting System
 * 
 * Manages agent standups, relationships, and memories.
 * Agents meet 2x daily to discuss performance, generate ideas,
 * and update their relationships based on interactions.
 * 
 * Usage:
 *   node services/mission-control/standup-api.cjs
 * 
 * Runs on http://localhost:3102
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

const CONFIG = {
  port: 3102,
  dataDir: path.join(__dirname, '..', '..', 'data', 'mission-control'),
  agentsFile: path.join(__dirname, '..', '..', 'data', 'mission-control', 'agents.json'),
  relationshipsFile: path.join(__dirname, '..', '..', 'data', 'mission-control', 'relationships.json'),
  standupsDir: path.join(__dirname, '..', '..', 'data', 'mission-control', 'standups'),
  memoriesDir: path.join(__dirname, '..', '..', 'data', 'mission-control', 'agent-memories')
};

// ============================================================================
// DATA LOADERS
// ============================================================================

function loadAgents() {
  try {
    const data = JSON.parse(fs.readFileSync(CONFIG.agentsFile, 'utf8'));
    return data.agents || [];
  } catch (e) {
    console.error('Error loading agents:', e.message);
    return [];
  }
}

function loadRelationships() {
  try {
    return JSON.parse(fs.readFileSync(CONFIG.relationshipsFile, 'utf8'));
  } catch (e) {
    console.error('Error loading relationships:', e.message);
    return { relationships: {}, meta: {} };
  }
}

function saveRelationships(data) {
  data.meta.lastUpdated = new Date().toISOString();
  fs.writeFileSync(CONFIG.relationshipsFile, JSON.stringify(data, null, 2));
}

function loadAgentMemory(agentId) {
  try {
    const filePath = path.join(CONFIG.memoriesDir, `${agentId}.json`);
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    return null;
  }
}

function saveAgentMemory(agentId, data) {
  data.lastUpdated = new Date().toISOString();
  const filePath = path.join(CONFIG.memoriesDir, `${agentId}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function loadStandup(id) {
  try {
    const filePath = path.join(CONFIG.standupsDir, `${id}.json`);
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    return null;
  }
}

function saveStandup(standup) {
  const filePath = path.join(CONFIG.standupsDir, `${standup.id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(standup, null, 2));
}

function listStandups(limit = 20) {
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
        attendees: standup.attendees?.length || 0,
        actionItems: standup.actionItems?.length || 0,
        lessons: standup.lessons?.length || 0,
        status: standup.status
      };
    });
  } catch (e) {
    return [];
  }
}

// ============================================================================
// STANDUP LOGIC
// ============================================================================

function generateStandupId(type) {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  return `${dateStr}-${type}`;
}

function createStandup(type = 'morning') {
  const id = generateStandupId(type);
  const agents = loadAgents();
  const existingStandup = loadStandup(id);
  
  if (existingStandup) {
    return { error: 'Standup already exists for this period', existing: existingStandup };
  }

  const standup = {
    id,
    type,
    date: new Date().toISOString(),
    status: 'in-progress',
    attendees: agents.map(a => ({
      id: a.id,
      name: a.name,
      emoji: a.emoji,
      role: a.role,
      contribution: null,
      mood: 'neutral'
    })),
    agenda: {
      contentPerformance: null,
      socialMentions: null,
      ideasGenerated: [],
      issuesRaised: []
    },
    discussion: [],
    actionItems: [],
    lessons: [],
    relationshipChanges: [],
    metrics: {
      duration: 0,
      participationRate: 0,
      ideasCount: 0,
      actionsCount: 0
    },
    createdAt: new Date().toISOString(),
    completedAt: null
  };

  saveStandup(standup);
  return standup;
}

function addContribution(standupId, agentId, contribution) {
  const standup = loadStandup(standupId);
  if (!standup) return { error: 'Standup not found' };

  const attendee = standup.attendees.find(a => a.id === agentId);
  if (!attendee) return { error: 'Agent not in standup' };

  attendee.contribution = contribution.text;
  attendee.mood = contribution.mood || 'neutral';

  standup.discussion.push({
    agentId,
    agentName: attendee.name,
    type: contribution.type || 'comment',
    content: contribution.text,
    timestamp: new Date().toISOString(),
    reactions: []
  });

  // Check for ideas
  if (contribution.type === 'idea') {
    standup.agenda.ideasGenerated.push({
      from: agentId,
      idea: contribution.text,
      votes: 0
    });
  }

  saveStandup(standup);
  return standup;
}

function addActionItem(standupId, actionItem) {
  const standup = loadStandup(standupId);
  if (!standup) return { error: 'Standup not found' };

  standup.actionItems.push({
    id: `action-${Date.now()}`,
    title: actionItem.title,
    description: actionItem.description,
    assignee: actionItem.assignee,
    priority: actionItem.priority || 'medium',
    dueDate: actionItem.dueDate,
    status: 'pending',
    createdAt: new Date().toISOString(),
    createdBy: actionItem.createdBy
  });

  standup.metrics.actionsCount = standup.actionItems.length;
  saveStandup(standup);
  return standup;
}

function addLesson(standupId, lesson) {
  const standup = loadStandup(standupId);
  if (!standup) return { error: 'Standup not found' };

  const lessonEntry = {
    id: `lesson-${Date.now()}`,
    content: lesson.content,
    category: lesson.category || 'general',
    learnedBy: lesson.agentId,
    appliesTo: lesson.appliesTo || 'all',
    timestamp: new Date().toISOString()
  };

  standup.lessons.push(lessonEntry);

  // Also add to agent's memory
  if (lesson.agentId) {
    const memory = loadAgentMemory(lesson.agentId);
    if (memory) {
      memory.lessons.push(lessonEntry);
      memory.stats.standupAttendance++;
      saveAgentMemory(lesson.agentId, memory);
    }
  }

  saveStandup(standup);
  return standup;
}

function completeStandup(standupId) {
  const standup = loadStandup(standupId);
  if (!standup) return { error: 'Standup not found' };

  standup.status = 'completed';
  standup.completedAt = new Date().toISOString();
  
  // Calculate metrics
  const contributed = standup.attendees.filter(a => a.contribution).length;
  standup.metrics.participationRate = Math.round((contributed / standup.attendees.length) * 100);
  standup.metrics.ideasCount = standup.agenda.ideasGenerated.length;
  standup.metrics.duration = Math.round((new Date(standup.completedAt) - new Date(standup.createdAt)) / 1000 / 60);

  // Update agent memories with standup attendance
  standup.attendees.forEach(attendee => {
    const memory = loadAgentMemory(attendee.id);
    if (memory) {
      memory.stats.standupAttendance++;
      memory.experiences.push({
        type: 'standup',
        standupId: standup.id,
        date: standup.date,
        contributed: !!attendee.contribution
      });
      saveAgentMemory(attendee.id, memory);
    }
  });

  saveStandup(standup);
  return standup;
}

// ============================================================================
// RELATIONSHIP LOGIC
// ============================================================================

function recordInteraction(fromAgent, toAgent, interactionType, context = {}) {
  const relationships = loadRelationships();
  const weights = relationships.meta.interactionWeights;

  if (!relationships.relationships[fromAgent]) {
    relationships.relationships[fromAgent] = {};
  }
  
  if (!relationships.relationships[fromAgent][toAgent]) {
    relationships.relationships[fromAgent][toAgent] = {
      score: relationships.meta.defaultScore,
      lastInteraction: null,
      history: []
    };
  }

  const rel = relationships.relationships[fromAgent][toAgent];
  const weight = weights[interactionType] || 0;
  
  // Update score with bounds
  rel.score = Math.max(-100, Math.min(100, rel.score + weight));
  rel.lastInteraction = new Date().toISOString();
  
  // Add to history (keep last 50)
  rel.history.unshift({
    type: interactionType,
    weight,
    context: context.reason || '',
    timestamp: new Date().toISOString()
  });
  rel.history = rel.history.slice(0, 50);

  // Mirror effect (other agent also affected, but less)
  if (!relationships.relationships[toAgent]) {
    relationships.relationships[toAgent] = {};
  }
  if (!relationships.relationships[toAgent][fromAgent]) {
    relationships.relationships[toAgent][fromAgent] = {
      score: relationships.meta.defaultScore,
      lastInteraction: null,
      history: []
    };
  }
  
  const mirrorRel = relationships.relationships[toAgent][fromAgent];
  mirrorRel.score = Math.max(-100, Math.min(100, mirrorRel.score + Math.floor(weight * 0.5)));
  mirrorRel.lastInteraction = new Date().toISOString();

  saveRelationships(relationships);

  return {
    from: fromAgent,
    to: toAgent,
    type: interactionType,
    newScore: rel.score,
    change: weight
  };
}

function getAgentRelationships(agentId) {
  const relationships = loadRelationships();
  const agents = loadAgents();
  
  const agentRels = relationships.relationships[agentId] || {};
  
  return Object.entries(agentRels).map(([otherId, data]) => {
    const otherAgent = agents.find(a => a.id === otherId);
    return {
      agentId: otherId,
      name: otherAgent?.name || otherId,
      emoji: otherAgent?.emoji || '🤖',
      score: data.score,
      status: getRelationshipStatus(data.score),
      lastInteraction: data.lastInteraction,
      recentHistory: data.history.slice(0, 5)
    };
  });
}

function getRelationshipStatus(score) {
  if (score >= 80) return 'excellent';
  if (score >= 60) return 'good';
  if (score >= 40) return 'neutral';
  if (score >= 20) return 'strained';
  if (score >= 0) return 'poor';
  return 'hostile';
}

function getAllRelationships() {
  const relationships = loadRelationships();
  const agents = loadAgents();
  
  const result = [];
  
  for (const [fromId, targets] of Object.entries(relationships.relationships)) {
    const fromAgent = agents.find(a => a.id === fromId);
    
    for (const [toId, data] of Object.entries(targets)) {
      const toAgent = agents.find(a => a.id === toId);
      
      result.push({
        from: {
          id: fromId,
          name: fromAgent?.name || fromId,
          emoji: fromAgent?.emoji || '🤖'
        },
        to: {
          id: toId,
          name: toAgent?.name || toId,
          emoji: toAgent?.emoji || '🤖'
        },
        score: data.score,
        status: getRelationshipStatus(data.score),
        lastInteraction: data.lastInteraction
      });
    }
  }
  
  return result;
}

// ============================================================================
// AGENT MEMORY API
// ============================================================================

function addToAgentMemory(agentId, memoryEntry) {
  const memory = loadAgentMemory(agentId);
  if (!memory) return { error: 'Agent memory not found' };

  const entry = {
    id: `mem-${Date.now()}`,
    type: memoryEntry.type || 'experience',
    content: memoryEntry.content,
    context: memoryEntry.context,
    timestamp: new Date().toISOString(),
    importance: memoryEntry.importance || 'normal'
  };

  if (memoryEntry.type === 'lesson') {
    memory.lessons.push(entry);
  } else if (memoryEntry.type === 'skill') {
    memory.skills.learned.push({
      name: memoryEntry.content,
      learnedAt: new Date().toISOString(),
      proficiency: 'beginner'
    });
  } else {
    memory.experiences.push(entry);
  }

  saveAgentMemory(agentId, memory);
  return memory;
}

function getAgentLessons(agentId) {
  const memory = loadAgentMemory(agentId);
  if (!memory) return { error: 'Agent memory not found' };
  return memory.lessons;
}

// ============================================================================
// API HANDLER
// ============================================================================

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        reject(e);
      }
    });
  });
}

async function handleRequest(req, res) {
  const url = new URL(req.url, `http://localhost:${CONFIG.port}`);
  const pathname = url.pathname;
  const method = req.method;

  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const json = (data, status = 200) => {
    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data, null, 2));
  };

  try {
    // ==================== STANDUP ROUTES ====================
    
    // POST /api/standups/start - Start a new standup
    if (pathname === '/api/standups/start' && method === 'POST') {
      const body = await parseBody(req);
      const result = createStandup(body.type || 'morning');
      return json(result, result.error ? 400 : 201);
    }

    // GET /api/standups - List recent standups
    if (pathname === '/api/standups' && method === 'GET') {
      const limit = parseInt(url.searchParams.get('limit') || '20');
      return json(listStandups(limit));
    }

    // GET /api/standups/:id - Get specific standup
    const standupMatch = pathname.match(/^\/api\/standups\/([^\/]+)$/);
    if (standupMatch && method === 'GET') {
      const standup = loadStandup(standupMatch[1]);
      return standup ? json(standup) : json({ error: 'Not found' }, 404);
    }

    // POST /api/standups/:id/contribute - Add agent contribution
    const contributeMatch = pathname.match(/^\/api\/standups\/([^\/]+)\/contribute$/);
    if (contributeMatch && method === 'POST') {
      const body = await parseBody(req);
      const result = addContribution(contributeMatch[1], body.agentId, body);
      return json(result, result.error ? 400 : 200);
    }

    // POST /api/standups/:id/action-items - Add action item
    const actionMatch = pathname.match(/^\/api\/standups\/([^\/]+)\/action-items$/);
    if (actionMatch && method === 'POST') {
      const body = await parseBody(req);
      const result = addActionItem(actionMatch[1], body);
      return json(result, result.error ? 400 : 200);
    }

    // POST /api/standups/:id/lessons - Add lesson learned
    const lessonsMatch = pathname.match(/^\/api\/standups\/([^\/]+)\/lessons$/);
    if (lessonsMatch && method === 'POST') {
      const body = await parseBody(req);
      const result = addLesson(lessonsMatch[1], body);
      return json(result, result.error ? 400 : 200);
    }

    // POST /api/standups/:id/complete - Complete standup
    const completeMatch = pathname.match(/^\/api\/standups\/([^\/]+)\/complete$/);
    if (completeMatch && method === 'POST') {
      const result = completeStandup(completeMatch[1]);
      return json(result, result.error ? 400 : 200);
    }

    // ==================== RELATIONSHIP ROUTES ====================

    // GET /api/relationships - Get all relationships
    if (pathname === '/api/relationships' && method === 'GET') {
      return json(getAllRelationships());
    }

    // GET /api/relationships/:agentId - Get agent's relationships
    const relAgentMatch = pathname.match(/^\/api\/relationships\/([^\/]+)$/);
    if (relAgentMatch && method === 'GET') {
      return json(getAgentRelationships(relAgentMatch[1]));
    }

    // POST /api/relationships/interaction - Record an interaction
    if (pathname === '/api/relationships/interaction' && method === 'POST') {
      const body = await parseBody(req);
      const result = recordInteraction(
        body.from,
        body.to,
        body.type,
        { reason: body.reason }
      );
      return json(result);
    }

    // ==================== AGENT MEMORY ROUTES ====================

    // GET /api/agents/:id/memory - Get agent's memory
    const memoryMatch = pathname.match(/^\/api\/agents\/([^\/]+)\/memory$/);
    if (memoryMatch && method === 'GET') {
      const memory = loadAgentMemory(memoryMatch[1]);
      return memory ? json(memory) : json({ error: 'Not found' }, 404);
    }

    // POST /api/agents/:id/memory - Add to agent's memory
    if (memoryMatch && method === 'POST') {
      const body = await parseBody(req);
      const result = addToAgentMemory(memoryMatch[1], body);
      return json(result, result.error ? 400 : 200);
    }

    // GET /api/agents/:id/lessons - Get agent's lessons
    const lessonsAgentMatch = pathname.match(/^\/api\/agents\/([^\/]+)\/lessons$/);
    if (lessonsAgentMatch && method === 'GET') {
      const lessons = getAgentLessons(lessonsAgentMatch[1]);
      return Array.isArray(lessons) ? json(lessons) : json(lessons, 404);
    }

    // ==================== DASHBOARD DATA ====================

    // GET /api/dashboard - Combined data for UI
    if (pathname === '/api/dashboard' && method === 'GET') {
      return json({
        agents: loadAgents(),
        relationships: getAllRelationships(),
        recentStandups: listStandups(5),
        meta: loadRelationships().meta
      });
    }

    // 404
    json({ error: 'Not found', path: pathname }, 404);

  } catch (error) {
    console.error('API Error:', error);
    json({ error: error.message }, 500);
  }
}

// ============================================================================
// SERVER START
// ============================================================================

function startServer() {
  const server = http.createServer(handleRequest);

  server.listen(CONFIG.port, () => {
    console.log('');
    console.log('╔══════════════════════════════════════════════════════════════╗');
    console.log('║              🎙️  STANDUP API - Agent Meetings               ║');
    console.log('╠══════════════════════════════════════════════════════════════╣');
    console.log('║  Autonomous agent standup system with relationships          ║');
    console.log('║                                                              ║');
    console.log(`║  🌐 API: http://localhost:${CONFIG.port}                           ║`);
    console.log('║                                                              ║');
    console.log('║  📍 Endpoints:                                               ║');
    console.log('║  ├─ POST /api/standups/start    Start a standup              ║');
    console.log('║  ├─ GET  /api/standups          List standups                ║');
    console.log('║  ├─ GET  /api/standups/:id      Get standup details          ║');
    console.log('║  ├─ POST /api/standups/:id/action-items  Add action          ║');
    console.log('║  ├─ POST /api/standups/:id/lessons       Add lesson          ║');
    console.log('║  ├─ GET  /api/relationships     All relationships            ║');
    console.log('║  ├─ POST /api/relationships/interaction  Log interaction     ║');
    console.log('║  ├─ GET  /api/agents/:id/memory Agent memory                 ║');
    console.log('║  └─ GET  /api/dashboard         Combined UI data             ║');
    console.log('║                                                              ║');
    console.log('║  📊 Agent Office: http://localhost:3101                      ║');
    console.log('║  🎯 Mission Control: http://localhost:3100                   ║');
    console.log('╚══════════════════════════════════════════════════════════════╝');
    console.log('');
  });
}

startServer();
