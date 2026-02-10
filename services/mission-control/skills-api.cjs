/**
 * Skills Management API for Mission Control
 * 
 * Provides endpoints for managing agents and skills.
 * Can be used standalone or integrated into an existing Express app.
 */

const express = require('express');
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', '..', 'data', 'mission-control');
const AGENTS_FILE = path.join(DATA_DIR, 'agents.json');
const SKILLS_FILE = path.join(DATA_DIR, 'skills.json');

// Helper functions
function readJSON(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    return null;
  }
}

function writeJSON(filePath, data) {
  try {
    // Ensure directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Update meta timestamp
    if (data.meta) {
      data.meta.lastUpdated = new Date().toISOString();
    }
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error.message);
    return false;
  }
}

// Create router
const router = express.Router();

/**
 * GET /api/skills
 * List all available skills
 */
router.get('/skills', (req, res) => {
  const data = readJSON(SKILLS_FILE);
  if (!data) {
    return res.status(500).json({ error: 'Failed to read skills data' });
  }
  res.json(data);
});

/**
 * GET /api/skills/:id
 * Get a specific skill by ID
 */
router.get('/skills/:id', (req, res) => {
  const data = readJSON(SKILLS_FILE);
  if (!data) {
    return res.status(500).json({ error: 'Failed to read skills data' });
  }
  
  const skill = data.skills.find(s => s.id === req.params.id);
  if (!skill) {
    return res.status(404).json({ error: 'Skill not found' });
  }
  
  res.json(skill);
});

/**
 * GET /api/agents
 * List all agents with their skills
 */
router.get('/agents', (req, res) => {
  const agentsData = readJSON(AGENTS_FILE);
  const skillsData = readJSON(SKILLS_FILE);
  
  if (!agentsData) {
    return res.status(500).json({ error: 'Failed to read agents data' });
  }
  
  // Optionally enrich agents with full skill details
  if (req.query.expand === 'skills' && skillsData) {
    const skillsMap = new Map(skillsData.skills.map(s => [s.id, s]));
    agentsData.agents = agentsData.agents.map(agent => ({
      ...agent,
      skillDetails: (agent.skills || []).map(skillId => skillsMap.get(skillId)).filter(Boolean)
    }));
  }
  
  res.json(agentsData);
});

/**
 * GET /api/agents/:id
 * Get a specific agent by ID
 */
router.get('/agents/:id', (req, res) => {
  const agentsData = readJSON(AGENTS_FILE);
  const skillsData = readJSON(SKILLS_FILE);
  
  if (!agentsData) {
    return res.status(500).json({ error: 'Failed to read agents data' });
  }
  
  const agent = agentsData.agents.find(a => a.id === req.params.id);
  if (!agent) {
    return res.status(404).json({ error: 'Agent not found' });
  }
  
  // Enrich with skill details
  if (skillsData) {
    const skillsMap = new Map(skillsData.skills.map(s => [s.id, s]));
    agent.skillDetails = (agent.skills || []).map(skillId => skillsMap.get(skillId)).filter(Boolean);
  }
  
  res.json(agent);
});

/**
 * PATCH /api/agents/:id
 * Update an agent's properties (including skills)
 */
router.patch('/agents/:id', express.json(), (req, res) => {
  const agentsData = readJSON(AGENTS_FILE);
  const skillsData = readJSON(SKILLS_FILE);
  
  if (!agentsData) {
    return res.status(500).json({ error: 'Failed to read agents data' });
  }
  
  const agentIndex = agentsData.agents.findIndex(a => a.id === req.params.id);
  if (agentIndex === -1) {
    return res.status(404).json({ error: 'Agent not found' });
  }
  
  const updates = req.body;
  const agent = agentsData.agents[agentIndex];
  
  // Validate skills if being updated
  if (updates.skills && skillsData) {
    const validSkillIds = new Set(skillsData.skills.map(s => s.id));
    const invalidSkills = updates.skills.filter(s => !validSkillIds.has(s));
    if (invalidSkills.length > 0) {
      return res.status(400).json({ 
        error: 'Invalid skills', 
        invalidSkills,
        validSkills: Array.from(validSkillIds)
      });
    }
  }
  
  // Apply allowed updates
  const allowedFields = ['skills', 'status', 'currentTask', 'focus', 'level', 'capabilities'];
  for (const field of allowedFields) {
    if (updates[field] !== undefined) {
      agent[field] = updates[field];
    }
  }
  
  // Save changes
  if (!writeJSON(AGENTS_FILE, agentsData)) {
    return res.status(500).json({ error: 'Failed to save changes' });
  }
  
  // Return enriched agent
  if (skillsData) {
    const skillsMap = new Map(skillsData.skills.map(s => [s.id, s]));
    agent.skillDetails = (agent.skills || []).map(skillId => skillsMap.get(skillId)).filter(Boolean);
  }
  
  res.json({ success: true, agent });
});

/**
 * POST /api/agents
 * Create a new agent
 */
router.post('/agents', express.json(), (req, res) => {
  const agentsData = readJSON(AGENTS_FILE);
  const skillsData = readJSON(SKILLS_FILE);
  
  if (!agentsData) {
    return res.status(500).json({ error: 'Failed to read agents data' });
  }
  
  const { id, name, emoji, role, focus, skills = [], level = 'standard' } = req.body;
  
  // Validate required fields
  if (!id || !name) {
    return res.status(400).json({ error: 'id and name are required' });
  }
  
  // Check for duplicate ID
  if (agentsData.agents.some(a => a.id === id)) {
    return res.status(409).json({ error: 'Agent with this ID already exists' });
  }
  
  // Validate skills
  if (skills.length > 0 && skillsData) {
    const validSkillIds = new Set(skillsData.skills.map(s => s.id));
    const invalidSkills = skills.filter(s => !validSkillIds.has(s));
    if (invalidSkills.length > 0) {
      return res.status(400).json({ 
        error: 'Invalid skills', 
        invalidSkills,
        validSkills: Array.from(validSkillIds)
      });
    }
  }
  
  const newAgent = {
    id,
    name,
    emoji: emoji || '🤖',
    role: role || 'Agent',
    focus: focus || '',
    status: 'active',
    skills,
    level,
    capabilities: [],
    currentTask: null,
    tasksCompleted: 0,
    createdAt: new Date().toISOString()
  };
  
  agentsData.agents.push(newAgent);
  
  if (!writeJSON(AGENTS_FILE, agentsData)) {
    return res.status(500).json({ error: 'Failed to save agent' });
  }
  
  res.status(201).json({ success: true, agent: newAgent });
});

/**
 * DELETE /api/agents/:id
 * Delete an agent
 */
router.delete('/agents/:id', (req, res) => {
  const agentsData = readJSON(AGENTS_FILE);
  
  if (!agentsData) {
    return res.status(500).json({ error: 'Failed to read agents data' });
  }
  
  const agentIndex = agentsData.agents.findIndex(a => a.id === req.params.id);
  if (agentIndex === -1) {
    return res.status(404).json({ error: 'Agent not found' });
  }
  
  const deletedAgent = agentsData.agents.splice(agentIndex, 1)[0];
  
  if (!writeJSON(AGENTS_FILE, agentsData)) {
    return res.status(500).json({ error: 'Failed to save changes' });
  }
  
  res.json({ success: true, deletedAgent });
});

/**
 * GET /api/agents/:id/can/:skill
 * Check if an agent has a specific skill
 */
router.get('/agents/:id/can/:skill', (req, res) => {
  const agentsData = readJSON(AGENTS_FILE);
  
  if (!agentsData) {
    return res.status(500).json({ error: 'Failed to read agents data' });
  }
  
  const agent = agentsData.agents.find(a => a.id === req.params.id);
  if (!agent) {
    return res.status(404).json({ error: 'Agent not found' });
  }
  
  const hasSkill = (agent.skills || []).includes(req.params.skill);
  res.json({ 
    agent: agent.id, 
    skill: req.params.skill, 
    hasSkill 
  });
});

/**
 * GET /api/agents/with-skill/:skill
 * Find all agents with a specific skill
 */
router.get('/agents/with-skill/:skill', (req, res) => {
  const agentsData = readJSON(AGENTS_FILE);
  
  if (!agentsData) {
    return res.status(500).json({ error: 'Failed to read agents data' });
  }
  
  const agents = agentsData.agents.filter(a => 
    (a.skills || []).includes(req.params.skill)
  );
  
  res.json({ 
    skill: req.params.skill, 
    agents: agents.map(a => ({ id: a.id, name: a.name, level: a.level }))
  });
});

// Export router and helper functions
module.exports = {
  router,
  readJSON,
  writeJSON,
  AGENTS_FILE,
  SKILLS_FILE,
  DATA_DIR
};

// Standalone server if run directly
if (require.main === module) {
  const app = express();
  const PORT = process.env.SKILLS_API_PORT || 3080;
  
  app.use('/api', router);
  
  // Health check
  app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'skills-api' });
  });
  
  app.listen(PORT, () => {
    console.log(`Skills API running on http://localhost:${PORT}`);
    console.log('Endpoints:');
    console.log('  GET  /api/skills');
    console.log('  GET  /api/skills/:id');
    console.log('  GET  /api/agents');
    console.log('  GET  /api/agents/:id');
    console.log('  POST /api/agents');
    console.log('  PATCH /api/agents/:id');
    console.log('  DELETE /api/agents/:id');
    console.log('  GET  /api/agents/:id/can/:skill');
    console.log('  GET  /api/agents/with-skill/:skill');
  });
}
