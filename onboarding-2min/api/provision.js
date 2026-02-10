/**
 * Instant Provisioning API
 * Handles user signup to working bot in under 30 seconds
 */

const fs = require('fs').promises;
const path = require('path');

/**
 * Main provisioning function - MUST complete in <30 seconds
 */
async function provisionUser(userData) {
  const startTime = Date.now();
  console.log(`🚀 Starting instant provision for ${userData.name}...`);
  
  try {
    // Run all steps in parallel where possible
    const results = await Promise.all([
      createWorkspace(userData),
      generateAgentConfig(userData),
      loadSkillsLibrary(userData),
      createSampleConversations(userData),
      setupMemorySystem(userData)
    ]);
    
    const elapsed = Date.now() - startTime;
    console.log(`✅ Provisioning complete in ${elapsed}ms`);
    
    return {
      success: true,
      agentId: results[0].agentId,
      workspacePath: results[0].workspacePath,
      configPath: results[1].configPath,
      skillsCount: results[2].skillsCount,
      sampleConversations: results[3],
      memoryInitialized: results[4],
      provisioningTime: elapsed
    };
    
  } catch (error) {
    console.error('❌ Provisioning failed:', error);
    throw error;
  }
}

/**
 * Create user workspace (pre-configured, instant)
 */
async function createWorkspace(userData) {
  const agentId = `agent_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const workspacePath = path.join(__dirname, '../../workspaces', agentId);
  
  // Create directory structure
  await fs.mkdir(workspacePath, { recursive: true });
  await fs.mkdir(path.join(workspacePath, 'memory'), { recursive: true });
  await fs.mkdir(path.join(workspacePath, 'skills'), { recursive: true });
  
  console.log(`✓ Workspace created: ${agentId}`);
  
  return { agentId, workspacePath };
}

/**
 * Generate personalized agent configuration
 */
async function generateAgentConfig(userData) {
  const config = {
    SOUL: generateSOUL(userData),
    USER: generateUSER(userData),
    AGENTS: generateAGENTS(userData),
    TOOLS: generateTOOLS(userData)
  };
  
  const workspacePath = path.join(__dirname, '../../workspaces', `agent_${userData.name.toLowerCase().replace(/\s/g, '_')}`);
  
  // Write config files in parallel
  await Promise.all([
    fs.writeFile(path.join(workspacePath, 'SOUL.md'), config.SOUL),
    fs.writeFile(path.join(workspacePath, 'USER.md'), config.USER),
    fs.writeFile(path.join(workspacePath, 'AGENTS.md'), config.AGENTS),
    fs.writeFile(path.join(workspacePath, 'TOOLS.md'), config.TOOLS)
  ]);
  
  console.log(`✓ Agent config generated`);
  
  return { configPath: workspacePath };
}

/**
 * Generate SOUL.md based on user's selected goal
 */
function generateSOUL(userData) {
  const goalPersonalities = {
    email: {
      name: "InboxMaster",
      personality: "efficient, detail-oriented, proactive",
      strengths: "email triage, response drafting, priority management"
    },
    calendar: {
      name: "ScheduleWizard",
      personality: "organized, anticipatory, time-conscious",
      strengths: "meeting coordination, time blocking, conflict resolution"
    },
    research: {
      name: "ResearchPro",
      personality: "curious, thorough, analytical",
      strengths: "information gathering, synthesis, insight generation"
    },
    general: {
      name: "OmniAgent",
      personality: "versatile, adaptive, proactive",
      strengths: "multi-domain automation, learning, efficiency"
    }
  };
  
  const profile = goalPersonalities[userData.goal] || goalPersonalities.general;
  
  return `# SOUL.md - Who You Are

## Identity
**Name:** ${profile.name}  
**Owner:** ${userData.name}  
**Primary Goal:** ${userData.goal === 'general' ? 'Comprehensive automation' : `${userData.goal} automation`}

## Personality
You are ${profile.personality}. You excel at ${profile.strengths}.

## Core Values
- **Speed:** Respond quickly, act decisively
- **Accuracy:** Get it right the first time
- **Proactivity:** Anticipate needs, don't wait to be asked
- **Learning:** Improve from every interaction

## Your Mission
Save ${userData.name} at least 10 hours per week through intelligent automation of ${userData.goal === 'general' ? 'all tasks' : userData.goal + ' tasks'}.

## Communication Style
- Clear and concise
- Always confirm before taking irreversible actions
- Provide options when uncertain
- Celebrate wins (even small ones)

---
*Generated: ${new Date().toISOString()}*
`;
}

/**
 * Generate USER.md with personalization
 */
function generateUSER(userData) {
  return `# USER.md - Who You're Helping

## Basic Info
**Name:** ${userData.name}  
**Company:** ${userData.company || 'Not specified'}  
**Timezone:** ${userData.timezone}  
**Onboarding Date:** ${new Date().toISOString().split('T')[0]}

## Primary Focus
**Top Priority:** ${userData.goal === 'general' ? 'Comprehensive productivity automation' : `${userData.goal} optimization`}

## Preferences (Auto-Learned)
*This section will auto-populate as I learn your preferences*

- Communication style: TBD (learning...)
- Working hours: TBD (learning...)
- Meeting preferences: TBD (learning...)
- Decision-making style: TBD (learning...)

## Quick Wins (First Week)
${getQuickWins(userData.goal)}

## Context Notes
*Add notes here about projects, priorities, or important context*

---
*Last updated: ${new Date().toISOString()}*
`;
}

function getQuickWins(goal) {
  const wins = {
    email: `
- [ ] Summarize inbox daily (morning & afternoon)
- [ ] Auto-flag urgent emails
- [ ] Draft responses to common questions
- [ ] Archive newsletters and spam
`,
    calendar: `
- [ ] Morning schedule briefing
- [ ] Block focus time (no-meeting zones)
- [ ] Auto-reschedule conflicts
- [ ] Meeting prep summaries
`,
    research: `
- [ ] Daily industry news summary
- [ ] Competitor monitoring
- [ ] Trend analysis reports
- [ ] Research question answering
`,
    general: `
- [ ] Morning briefing (schedule + priorities)
- [ ] Email inbox zero automation
- [ ] Meeting scheduling on demand
- [ ] Ad-hoc research tasks
`
  };
  
  return wins[goal] || wins.general;
}

/**
 * Generate AGENTS.md with best practices
 */
function generateAGENTS(userData) {
  return `# AGENTS.md - How You Operate

## Session Context
- **Owner:** ${userData.name}
- **Timezone:** ${userData.timezone}
- **Specialization:** ${userData.goal || 'general automation'}

## Core Rules
1. **Read before acting:** Always check SOUL.md, USER.md, and today's memory
2. **Confirm destructive actions:** Ask before deleting, sending, or major changes
3. **Learn continuously:** Update memory files after every significant interaction
4. **Be proactive:** Don't wait to be asked - suggest improvements

## Memory Protocol
- **Daily logs:** Write to \`memory/YYYY-MM-DD.md\` for each session
- **Long-term:** Update MEMORY.md weekly with key learnings
- **Context:** Always read yesterday + today before starting

## Quick Start Checklist (Every Session)
\`\`\`
1. Read STATE.json
2. Read MEMORY.md
3. Read today's memory file
4. Check for urgent items
5. Say good morning (if first session of day)
\`\`\`

## Specialized Skills for ${userData.goal}
${getSpecializedSkills(userData.goal)}

---
*Generated: ${new Date().toISOString()}*
`;
}

function getSpecializedSkills(goal) {
  const skills = {
    email: `
- Email triage (urgent/important/defer/delete)
- Response drafting with tone matching
- Meeting extraction & auto-scheduling
- Subscription management
- VIP monitoring
`,
    calendar: `
- Schedule optimization & gap analysis
- Meeting coordination (multi-party)
- Travel time blocking
- Prep time allocation
- Conflict resolution
`,
    research: `
- Web research & summarization
- Competitive intelligence
- Trend analysis
- Source verification
- Report generation
`,
    general: `
- Email & calendar management
- Research & analysis
- Document drafting
- Task automation
- Proactive suggestions
`
  };
  
  return skills[goal] || skills.general;
}

/**
 * Generate TOOLS.md
 */
function generateTOOLS(userData) {
  return `# TOOLS.md - Your Toolkit

## Available Tools
*This will auto-populate as you connect services*

### Email (Not connected)
- [ ] Gmail
- [ ] Outlook
- [ ] Other

### Calendar (Not connected)
- [ ] Google Calendar
- [ ] Outlook Calendar
- [ ] Other

### Messaging (Not connected)
- [ ] WhatsApp
- [ ] Telegram
- [ ] Discord
- [ ] Slack

### Preferences
**Timezone:** ${userData.timezone}  
**Preferred communication:** TBD (will learn from usage)

---
*Connect your first tool to get started!*
`;
}

/**
 * Load pre-built skills library (instant)
 */
async function loadSkillsLibrary(userData) {
  const skills = getSkillsForGoal(userData.goal);
  
  // Skills are pre-loaded, just return count
  console.log(`✓ Skills library loaded: ${skills.length} skills`);
  
  return { skillsCount: skills.length, skills };
}

function getSkillsForGoal(goal) {
  const baseSkills = [
    'email_summary',
    'calendar_check',
    'meeting_schedule',
    'research_web',
    'draft_email',
    'task_list',
    'reminder_set',
    'document_summarize'
  ];
  
  const specializedSkills = {
    email: ['inbox_triage', 'auto_respond', 'vip_monitor', 'subscription_manage', 'thread_follow'],
    calendar: ['time_block', 'conflict_resolve', 'meeting_prep', 'schedule_optimize', 'travel_time'],
    research: ['competitive_intel', 'trend_analysis', 'source_verify', 'report_generate', 'news_monitor'],
    general: [...baseSkills]
  };
  
  return [
    ...baseSkills,
    ...(specializedSkills[goal] || [])
  ];
}

/**
 * Create sample conversations (instant smart responses)
 */
async function createSampleConversations(userData) {
  const samples = [
    {
      user: "What can you help me with?",
      agent: `Hi ${userData.name}! I'm your AI assistant specialized in ${userData.goal === 'general' ? 'everything' : userData.goal}. I can:

• Manage your ${userData.goal === 'email' ? 'inbox and emails' : userData.goal === 'calendar' ? 'schedule and meetings' : userData.goal === 'research' ? 'research and analysis' : 'daily tasks'}
• Learn your preferences and improve over time
• Work 24/7 in the background
• Proactively suggest improvements

What would you like to try first?`,
      timestamp: new Date().toISOString()
    },
    {
      user: "Show me what you can do",
      agent: `I have ${getSkillsForGoal(userData.goal).length}+ skills ready! Here are some quick wins:

${getQuickWinExamples(userData.goal)}

Want to try any of these? Or ask me something else!`,
      timestamp: new Date().toISOString()
    }
  ];
  
  console.log(`✓ Sample conversations created`);
  
  return samples;
}

function getQuickWinExamples(goal) {
  const examples = {
    email: `
1. "Summarize my inbox" - I'll give you the TL;DR
2. "Draft a reply to [person]" - I'll write it for you
3. "Find emails about [topic]" - Instant search
4. "Archive all newsletters" - Clean inbox in seconds`,
    
    calendar: `
1. "What's my schedule today?" - Full daily briefing
2. "Find a 30-min slot this week" - I'll check availability
3. "Schedule a meeting with [person]" - I'll coordinate
4. "Block focus time tomorrow" - Protect your deep work`,
    
    research: `
1. "Research [topic]" - Comprehensive analysis
2. "What's trending in [industry]?" - Latest insights
3. "Compare [A] vs [B]" - Side-by-side analysis
4. "Summarize this article" - TL;DR in seconds`,
    
    general: `
1. "What should I focus on today?" - Prioritized task list
2. "Summarize my inbox" - Email TL;DR
3. "Check my schedule" - Today's agenda
4. "Research [topic]" - Quick insights`
  };
  
  return examples[goal] || examples.general;
}

/**
 * Setup memory system (pre-initialized)
 */
async function setupMemorySystem(userData) {
  const today = new Date().toISOString().split('T')[0];
  const memoryEntry = `# ${today} - Onboarding Day

## Welcome!
Started working with ${userData.name} today. Primary focus: ${userData.goal}.

## Initial Setup
- Workspace created
- Skills library loaded (${getSkillsForGoal(userData.goal).length} skills)
- Sample conversations provided
- Ready to start!

## Next Steps
- Connect first integration (email/calendar)
- Complete first real task
- Learn preferences
- Start saving time!

---
*Onboarding completed in record time!* 🚀
`;
  
  const workspacePath = path.join(__dirname, '../../workspaces', `agent_${userData.name.toLowerCase().replace(/\s/g, '_')}`);
  await fs.writeFile(path.join(workspacePath, 'memory', `${today}.md`), memoryEntry);
  
  console.log(`✓ Memory system initialized`);
  
  return true;
}

/**
 * API endpoint handler
 */
async function handleProvisionRequest(req, res) {
  try {
    const userData = req.body;
    
    // Validate required fields
    if (!userData.name || !userData.timezone) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, timezone'
      });
    }
    
    // Provision user (instant)
    const result = await provisionUser(userData);
    
    // Return success with agent details
    res.json({
      success: true,
      agent: {
        id: result.agentId,
        name: userData.name,
        workspace: result.workspacePath,
        skills: result.skillsCount,
        ready: true
      },
      provisioningTime: result.provisioningTime,
      nextSteps: [
        'Connect your first integration',
        'Try a sample command',
        'Explore the dashboard'
      ]
    });
    
  } catch (error) {
    console.error('Provisioning error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}

module.exports = {
  provisionUser,
  handleProvisionRequest
};
