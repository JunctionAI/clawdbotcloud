/**
 * Memory System Setup
 * Creates MEMORY.md and memory/ folder structure
 */

const axios = require('axios');

/**
 * Setup memory system for agent
 */
async function setupMemory({ agentId, deploymentUrl, tier }) {
  console.log(`🧠 Setting up memory system for ${tier} tier...`);
  
  const memoryTemplate = generateMemoryTemplate(tier);
  const dailyLogTemplate = generateDailyLogTemplate();
  
  try {
    // Create MEMORY.md
    await axios.post(`${deploymentUrl}/api/files/create`, {
      path: 'MEMORY.md',
      content: memoryTemplate,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.AGENT_API_KEY}`,
      },
    });
    
    console.log('✅ MEMORY.md created');
    
    // Create memory/ directory structure
    await axios.post(`${deploymentUrl}/api/files/create-dir`, {
      path: 'memory',
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.AGENT_API_KEY}`,
      },
    });
    
    // Create today's log file
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    await axios.post(`${deploymentUrl}/api/files/create`, {
      path: `memory/${today}.md`,
      content: dailyLogTemplate,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.AGENT_API_KEY}`,
      },
    });
    
    console.log('✅ Daily log created');
    
    // Create entity subdirectories (Pro/Enterprise only)
    if (tier !== 'starter') {
      await axios.post(`${deploymentUrl}/api/files/create-dir`, {
        path: 'memory/people',
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.AGENT_API_KEY}`,
        },
      });
      
      await axios.post(`${deploymentUrl}/api/files/create-dir`, {
        path: 'memory/projects',
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.AGENT_API_KEY}`,
        },
      });
      
      await axios.post(`${deploymentUrl}/api/files/create-dir`, {
        path: 'memory/business',
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.AGENT_API_KEY}`,
        },
      });
      
      console.log('✅ Entity directories created');
    }
    
    console.log('✅ Memory system configured');
    
    return { success: true };
    
  } catch (error) {
    console.error('❌ Memory setup failed:', error.message);
    throw error;
  }
}

/**
 * Generate MEMORY.md template
 */
function generateMemoryTemplate(tier) {
  return `# MEMORY.md - Your Long-Term Memory

**Created:** ${new Date().toISOString().split('T')[0]}  
**Tier:** ${tier}  
**Status:** Active

---

## About You

*I'll learn about you as we work together. This section will grow over time.*

---

## Important Preferences

*Your preferences, communication style, and working patterns will be documented here.*

---

## Key Relationships

*People you work with regularly, their roles, and important context.*

---

## Projects & Goals

*Active projects, long-term goals, and strategic priorities.*

---

## Lessons Learned

*Important insights, mistakes to avoid, and patterns I've noticed.*

---

## Quick Reference

*Frequently needed information, shortcuts, and helpful notes.*

---

**This memory file grows with you. I'll update it regularly based on our interactions.**
`;
}

/**
 * Generate daily log template
 */
function generateDailyLogTemplate() {
  const today = new Date().toISOString().split('T')[0];
  return `# ${today} - Daily Log

## Summary

*What happened today*

---

## Interactions

### Morning

### Afternoon

### Evening

---

## Decisions Made

---

## Tasks Completed

---

## Notes

---

**This log is automatically maintained. Significant events are promoted to MEMORY.md.**
`;
}

module.exports = {
  setupMemory,
};
