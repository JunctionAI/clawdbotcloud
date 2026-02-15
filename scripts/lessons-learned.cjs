#!/usr/bin/env node

/**
 * LESSONS LEARNED SYSTEM
 * 
 * Agent knowledge compounding - capture insights, synthesize improvements.
 * 
 * Usage:
 *   node scripts/lessons-learned.cjs log --agent <name> --lesson "..." [--category <cat>] [--project <proj>]
 *   node scripts/lessons-learned.cjs list [--agent <name>] [--category <cat>] [--limit <n>]
 *   node scripts/lessons-learned.cjs synthesize [--days <n>]
 *   node scripts/lessons-learned.cjs apply --id <lesson-id>  # Mark lesson as applied
 *   node scripts/lessons-learned.cjs stats
 */

const fs = require('fs');
const path = require('path');

// ============================================================================
// CONFIGURATION
// ============================================================================

const CONFIG = {
  dataDir: path.join(__dirname, '..', 'data', 'lessons-learned'),
  lessonsFile: path.join(__dirname, '..', 'data', 'lessons-learned', 'lessons.json'),
  synthesisFile: path.join(__dirname, '..', 'data', 'lessons-learned', 'synthesis.json'),
  categories: [
    'process',      // How we do things
    'technical',    // Code, tools, infrastructure
    'communication', // How we talk to humans/each other
    'decision',     // Strategic choices
    'mistake',      // What went wrong
    'success',      // What worked well
    'insight',      // General observations
    'improvement'   // Suggested changes
  ]
};

// ============================================================================
// INITIALIZATION
// ============================================================================

function ensureDirectories() {
  if (!fs.existsSync(CONFIG.dataDir)) {
    fs.mkdirSync(CONFIG.dataDir, { recursive: true });
    console.log(`✅ Created data directory: ${CONFIG.dataDir}`);
  }
  
  if (!fs.existsSync(CONFIG.lessonsFile)) {
    const initial = {
      lessons: [],
      meta: {
        created: new Date().toISOString(),
        version: '1.0'
      }
    };
    fs.writeFileSync(CONFIG.lessonsFile, JSON.stringify(initial, null, 2));
    console.log(`✅ Created lessons file: ${CONFIG.lessonsFile}`);
  }
  
  if (!fs.existsSync(CONFIG.synthesisFile)) {
    const initial = {
      syntheses: [],
      meta: {
        lastSynthesis: null,
        version: '1.0'
      }
    };
    fs.writeFileSync(CONFIG.synthesisFile, JSON.stringify(initial, null, 2));
  }
}

function loadLessons() {
  ensureDirectories();
  return JSON.parse(fs.readFileSync(CONFIG.lessonsFile, 'utf8'));
}

function saveLessons(data) {
  fs.writeFileSync(CONFIG.lessonsFile, JSON.stringify(data, null, 2));
}

function loadSynthesis() {
  ensureDirectories();
  return JSON.parse(fs.readFileSync(CONFIG.synthesisFile, 'utf8'));
}

function saveSynthesis(data) {
  fs.writeFileSync(CONFIG.synthesisFile, JSON.stringify(data, null, 2));
}

// ============================================================================
// CORE FUNCTIONS
// ============================================================================

function generateId() {
  return `lesson-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
}

function logLesson(agent, lesson, category = 'insight', project = null, context = null) {
  const data = loadLessons();
  
  const newLesson = {
    id: generateId(),
    agent,
    lesson,
    category,
    project,
    context,
    status: 'new',
    createdAt: new Date().toISOString(),
    appliedAt: null,
    synthesizedIn: null
  };
  
  data.lessons.push(newLesson);
  data.meta.lastUpdated = new Date().toISOString();
  saveLessons(data);
  
  console.log(`\n✅ Lesson logged!`);
  console.log(`   ID: ${newLesson.id}`);
  console.log(`   Agent: ${agent}`);
  console.log(`   Category: ${category}`);
  console.log(`   Lesson: ${lesson.substring(0, 100)}${lesson.length > 100 ? '...' : ''}`);
  
  return newLesson;
}

function listLessons(filters = {}) {
  const data = loadLessons();
  let lessons = data.lessons;
  
  // Apply filters
  if (filters.agent) {
    lessons = lessons.filter(l => l.agent === filters.agent);
  }
  if (filters.category) {
    lessons = lessons.filter(l => l.category === filters.category);
  }
  if (filters.project) {
    lessons = lessons.filter(l => l.project === filters.project);
  }
  if (filters.status) {
    lessons = lessons.filter(l => l.status === filters.status);
  }
  
  // Sort by date (newest first)
  lessons.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
  // Apply limit
  if (filters.limit) {
    lessons = lessons.slice(0, filters.limit);
  }
  
  return lessons;
}

function synthesizeLessons(days = 7) {
  const data = loadLessons();
  const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  
  const recentLessons = data.lessons.filter(l => 
    new Date(l.createdAt) >= cutoff && l.status !== 'synthesized'
  );
  
  if (recentLessons.length === 0) {
    console.log(`\n📊 No new lessons to synthesize in the last ${days} days.`);
    return null;
  }
  
  // Group by category
  const byCategory = {};
  for (const lesson of recentLessons) {
    if (!byCategory[lesson.category]) {
      byCategory[lesson.category] = [];
    }
    byCategory[lesson.category].push(lesson);
  }
  
  // Group by agent
  const byAgent = {};
  for (const lesson of recentLessons) {
    if (!byAgent[lesson.agent]) {
      byAgent[lesson.agent] = [];
    }
    byAgent[lesson.agent].push(lesson);
  }
  
  // Create synthesis
  const synthesis = {
    id: `synthesis-${Date.now()}`,
    period: {
      from: cutoff.toISOString(),
      to: new Date().toISOString(),
      days
    },
    stats: {
      totalLessons: recentLessons.length,
      byCategory,
      byAgent,
      topAgents: Object.entries(byAgent)
        .sort((a, b) => b[1].length - a[1].length)
        .slice(0, 5)
        .map(([agent, lessons]) => ({ agent, count: lessons.length })),
      topCategories: Object.entries(byCategory)
        .sort((a, b) => b[1].length - a[1].length)
        .map(([category, lessons]) => ({ category, count: lessons.length }))
    },
    lessons: recentLessons.map(l => ({
      id: l.id,
      agent: l.agent,
      category: l.category,
      lesson: l.lesson,
      project: l.project
    })),
    createdAt: new Date().toISOString()
  };
  
  // Save synthesis
  const synthData = loadSynthesis();
  synthData.syntheses.push(synthesis);
  synthData.meta.lastSynthesis = new Date().toISOString();
  saveSynthesis(synthData);
  
  // Mark lessons as synthesized
  for (const lesson of recentLessons) {
    const idx = data.lessons.findIndex(l => l.id === lesson.id);
    if (idx >= 0) {
      data.lessons[idx].status = 'synthesized';
      data.lessons[idx].synthesizedIn = synthesis.id;
    }
  }
  saveLessons(data);
  
  return synthesis;
}

function markApplied(lessonId) {
  const data = loadLessons();
  const idx = data.lessons.findIndex(l => l.id === lessonId);
  
  if (idx < 0) {
    console.log(`❌ Lesson not found: ${lessonId}`);
    return null;
  }
  
  data.lessons[idx].status = 'applied';
  data.lessons[idx].appliedAt = new Date().toISOString();
  saveLessons(data);
  
  console.log(`✅ Marked as applied: ${lessonId}`);
  return data.lessons[idx];
}

function getStats() {
  const data = loadLessons();
  const lessons = data.lessons;
  
  const stats = {
    total: lessons.length,
    byStatus: {},
    byCategory: {},
    byAgent: {},
    byProject: {},
    recentCount: lessons.filter(l => {
      const age = Date.now() - new Date(l.createdAt).getTime();
      return age < 7 * 24 * 60 * 60 * 1000; // Last 7 days
    }).length
  };
  
  for (const lesson of lessons) {
    stats.byStatus[lesson.status] = (stats.byStatus[lesson.status] || 0) + 1;
    stats.byCategory[lesson.category] = (stats.byCategory[lesson.category] || 0) + 1;
    stats.byAgent[lesson.agent] = (stats.byAgent[lesson.agent] || 0) + 1;
    if (lesson.project) {
      stats.byProject[lesson.project] = (stats.byProject[lesson.project] || 0) + 1;
    }
  }
  
  return stats;
}

// ============================================================================
// CLI
// ============================================================================

function parseArgs(args) {
  const parsed = { _: [] };
  let currentKey = null;
  
  for (const arg of args) {
    if (arg.startsWith('--')) {
      currentKey = arg.slice(2);
      parsed[currentKey] = true;
    } else if (currentKey) {
      parsed[currentKey] = arg;
      currentKey = null;
    } else {
      parsed._.push(arg);
    }
  }
  
  return parsed;
}

function printHelp() {
  console.log(`
📚 LESSONS LEARNED SYSTEM
Agent knowledge compounding - capture insights, synthesize improvements.

USAGE:
  node scripts/lessons-learned.cjs <command> [options]

COMMANDS:
  log       Log a new lesson
            --agent <name>     Agent name (required)
            --lesson "..."     Lesson text (required)
            --category <cat>   Category (default: insight)
            --project <proj>   Related project
            --context <ctx>    Additional context

  list      List lessons
            --agent <name>     Filter by agent
            --category <cat>   Filter by category
            --project <proj>   Filter by project
            --status <status>  Filter by status (new/synthesized/applied)
            --limit <n>        Limit results (default: 20)

  synthesize  Create synthesis of recent lessons
            --days <n>         Number of days to include (default: 7)

  apply     Mark a lesson as applied
            --id <lesson-id>   Lesson ID to mark

  stats     Show statistics

CATEGORIES:
  process, technical, communication, decision, mistake, success, insight, improvement

EXAMPLES:
  node scripts/lessons-learned.cjs log --agent fury --lesson "Always confirm budget before starting" --category process
  node scripts/lessons-learned.cjs list --agent shuri --limit 10
  node scripts/lessons-learned.cjs synthesize --days 14
  node scripts/lessons-learned.cjs stats
`);
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const command = args._[0];
  
  ensureDirectories();
  
  switch (command) {
    case 'log':
      if (!args.agent || !args.lesson) {
        console.log('❌ Missing required args: --agent and --lesson');
        process.exit(1);
      }
      logLesson(args.agent, args.lesson, args.category || 'insight', args.project, args.context);
      break;
      
    case 'list':
      const lessons = listLessons({
        agent: args.agent,
        category: args.category,
        project: args.project,
        status: args.status,
        limit: parseInt(args.limit) || 20
      });
      
      console.log(`\n📚 Lessons (${lessons.length} results)\n`);
      for (const l of lessons) {
        const date = new Date(l.createdAt).toLocaleDateString();
        console.log(`[${l.id}] ${date} | ${l.agent} | ${l.category}`);
        console.log(`   ${l.lesson}`);
        if (l.project) console.log(`   📁 Project: ${l.project}`);
        console.log(`   Status: ${l.status}`);
        console.log('');
      }
      break;
      
    case 'synthesize':
      const days = parseInt(args.days) || 7;
      console.log(`\n🔄 Synthesizing lessons from last ${days} days...\n`);
      const synthesis = synthesizeLessons(days);
      
      if (synthesis) {
        console.log(`\n📊 SYNTHESIS COMPLETE\n`);
        console.log(`Period: ${days} days`);
        console.log(`Total lessons: ${synthesis.stats.totalLessons}`);
        console.log(`\nBy Category:`);
        for (const cat of synthesis.stats.topCategories) {
          console.log(`  ${cat.category}: ${cat.count}`);
        }
        console.log(`\nTop Contributing Agents:`);
        for (const agent of synthesis.stats.topAgents) {
          console.log(`  ${agent.agent}: ${agent.count} lessons`);
        }
        console.log(`\nSynthesis saved as: ${synthesis.id}`);
      }
      break;
      
    case 'apply':
      if (!args.id) {
        console.log('❌ Missing required arg: --id');
        process.exit(1);
      }
      markApplied(args.id);
      break;
      
    case 'stats':
      const stats = getStats();
      console.log(`\n📊 LESSONS LEARNED STATS\n`);
      console.log(`Total lessons: ${stats.total}`);
      console.log(`Last 7 days: ${stats.recentCount}`);
      console.log(`\nBy Status:`);
      for (const [status, count] of Object.entries(stats.byStatus)) {
        console.log(`  ${status}: ${count}`);
      }
      console.log(`\nBy Category:`);
      for (const [cat, count] of Object.entries(stats.byCategory)) {
        console.log(`  ${cat}: ${count}`);
      }
      console.log(`\nBy Agent:`);
      for (const [agent, count] of Object.entries(stats.byAgent)) {
        console.log(`  ${agent}: ${count}`);
      }
      if (Object.keys(stats.byProject).length > 0) {
        console.log(`\nBy Project:`);
        for (const [proj, count] of Object.entries(stats.byProject)) {
          console.log(`  ${proj}: ${count}`);
        }
      }
      break;
      
    case 'help':
    case '--help':
    case '-h':
      printHelp();
      break;
      
    default:
      if (command) {
        console.log(`❌ Unknown command: ${command}`);
      }
      printHelp();
  }
}

// ============================================================================
// EXPORTS (for programmatic use)
// ============================================================================

module.exports = {
  logLesson,
  listLessons,
  synthesizeLessons,
  markApplied,
  getStats,
  CONFIG
};

// Run CLI if executed directly
if (require.main === module) {
  main();
}
