/**
 * Email Subject Line Optimizer
 * Based on Anthropic Growth Marketing team patterns
 * 
 * Features:
 * - Analyzes campaign performance data
 * - Identifies underperforming subjects
 * - Generates variations using Claude
 * - Logs experiments to memory for learning
 * 
 * Usage:
 *   node scripts/klaviyo/subject-line-optimizer.js analyze --input=data/campaigns.json
 *   node scripts/klaviyo/subject-line-optimizer.js generate --subject="Old subject" --open-rate=15
 *   node scripts/klaviyo/subject-line-optimizer.js batch --input=data/campaigns.json --threshold=20
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Memory file for logging experiments
const MEMORY_PATH = path.join(__dirname, '../../data/email-experiments.json');

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.join(__dirname, '../../data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Load experiment memory
function loadMemory() {
  ensureDataDir();
  if (fs.existsSync(MEMORY_PATH)) {
    return JSON.parse(fs.readFileSync(MEMORY_PATH, 'utf8'));
  }
  return {
    experiments: [],
    learnings: [],
    patterns: {
      high_performers: [],
      low_performers: [],
      emoji_impact: null,
      length_impact: null
    }
  };
}

// Save experiment to memory
function saveExperiment(experiment) {
  const memory = loadMemory();
  experiment.timestamp = new Date().toISOString();
  experiment.id = `exp_${Date.now()}`;
  memory.experiments.push(experiment);
  fs.writeFileSync(MEMORY_PATH, JSON.stringify(memory, null, 2));
  return experiment.id;
}

// Analyze campaigns and find underperformers
function analyzeCampaigns(campaigns, threshold = 20) {
  const analyzed = campaigns.map(c => ({
    ...c,
    subject_length: (c.subject || '').length,
    has_emoji: /[\u{1F300}-\u{1F9FF}]/u.test(c.subject || ''),
    has_personalization: (c.subject || '').includes('{{'),
    has_urgency: /urgent|now|today|last|final|ends/i.test(c.subject || ''),
    has_question: (c.subject || '').includes('?'),
    has_numbers: /\d/.test(c.subject || '')
  }));
  
  // Sort by open rate
  analyzed.sort((a, b) => (a.open_rate || 0) - (b.open_rate || 0));
  
  // Identify underperformers (below threshold)
  const underperformers = analyzed.filter(c => (c.open_rate || 0) < threshold);
  
  // Identify top performers for learning
  const topPerformers = analyzed.filter(c => (c.open_rate || 0) >= threshold * 1.5);
  
  return {
    all: analyzed,
    underperformers,
    topPerformers,
    stats: {
      total: analyzed.length,
      underperforming: underperformers.length,
      top_performing: topPerformers.length,
      avg_open_rate: analyzed.reduce((sum, c) => sum + (c.open_rate || 0), 0) / analyzed.length,
      threshold_used: threshold
    }
  };
}

// Generate subject line variations using Claude (via exec)
async function generateVariations(originalSubject, context = {}) {
  const memory = loadMemory();
  
  // Build context from past learnings
  const topPatterns = memory.patterns.high_performers.slice(0, 5).join('\n- ');
  const avoidPatterns = memory.patterns.low_performers.slice(0, 5).join('\n- ');
  
  const prompt = `You are an email marketing expert. Generate 5 variations of this subject line.

ORIGINAL SUBJECT: "${originalSubject}"
CURRENT OPEN RATE: ${context.openRate || 'Unknown'}%
INDUSTRY: Health supplements (Deep Blue Health)
AUDIENCE: Health-conscious adults, primarily 45+

${topPatterns ? `PATTERNS THAT WORK WELL:\n- ${topPatterns}\n` : ''}
${avoidPatterns ? `PATTERNS TO AVOID:\n- ${avoidPatterns}\n` : ''}

REQUIREMENTS:
- Keep under 50 characters (mobile-friendly)
- Test different hooks: curiosity, urgency, benefit, question, personalization
- One variation should use emoji
- One variation should be very short (<30 chars)

OUTPUT FORMAT (JSON array):
[
  {"subject": "variation 1", "hook_type": "curiosity", "length": 35},
  {"subject": "variation 2", "hook_type": "urgency", "length": 42},
  ...
]

Only output the JSON array, nothing else.`;

  // Use Claude CLI to generate
  try {
    const escaped = prompt.replace(/"/g, '\\"').replace(/\n/g, '\\n');
    const result = execSync(`echo "${escaped}" | claude --print`, {
      encoding: 'utf8',
      timeout: 30000
    });
    
    // Parse JSON from response
    const jsonMatch = result.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (e) {
    console.error('Claude generation failed, using fallback patterns');
  }
  
  // Fallback: rule-based variations
  return generateFallbackVariations(originalSubject);
}

// Fallback variation generator (no API needed)
function generateFallbackVariations(subject) {
  const variations = [];
  
  // Curiosity hook
  variations.push({
    subject: `The secret to ${subject.toLowerCase().replace(/^the\s+/i, '')}`,
    hook_type: 'curiosity',
    length: 0
  });
  
  // Question hook
  variations.push({
    subject: `Want ${subject.toLowerCase().replace(/^get\s+/i, '')}?`,
    hook_type: 'question',
    length: 0
  });
  
  // Urgency hook
  variations.push({
    subject: `Today only: ${subject}`,
    hook_type: 'urgency',
    length: 0
  });
  
  // Emoji hook
  variations.push({
    subject: `✨ ${subject}`,
    hook_type: 'emoji',
    length: 0
  });
  
  // Short version
  const words = subject.split(' ').slice(0, 3).join(' ');
  variations.push({
    subject: words,
    hook_type: 'short',
    length: words.length
  });
  
  // Update lengths
  variations.forEach(v => v.length = v.subject.length);
  
  return variations;
}

// Process batch of underperformers
async function processBatch(inputPath, threshold = 20) {
  console.log(`📊 Loading campaigns from ${inputPath}...`);
  
  const campaigns = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
  const analysis = analyzeCampaigns(campaigns, threshold);
  
  console.log(`\n📈 Analysis Results:`);
  console.log(`   Total campaigns: ${analysis.stats.total}`);
  console.log(`   Avg open rate: ${analysis.stats.avg_open_rate.toFixed(1)}%`);
  console.log(`   Underperforming (<${threshold}%): ${analysis.stats.underperforming}`);
  console.log(`   Top performing (>${threshold * 1.5}%): ${analysis.stats.top_performing}`);
  
  if (analysis.underperformers.length === 0) {
    console.log('\n✅ No underperforming campaigns found!');
    return;
  }
  
  console.log(`\n🔧 Generating variations for ${analysis.underperformers.length} underperformers...\n`);
  
  const results = [];
  
  for (const campaign of analysis.underperformers.slice(0, 10)) { // Limit to 10
    console.log(`\n📧 "${campaign.subject}" (${campaign.open_rate || 0}% open rate)`);
    
    const variations = await generateVariations(campaign.subject, {
      openRate: campaign.open_rate,
      campaignId: campaign.id
    });
    
    console.log('   Variations:');
    variations.forEach((v, i) => {
      console.log(`   ${i + 1}. [${v.hook_type}] "${v.subject}" (${v.length} chars)`);
    });
    
    // Log experiment
    const expId = saveExperiment({
      type: 'subject_variation',
      original: {
        subject: campaign.subject,
        open_rate: campaign.open_rate,
        campaign_id: campaign.id
      },
      variations: variations,
      status: 'generated'
    });
    
    results.push({
      original: campaign,
      variations: variations,
      experiment_id: expId
    });
  }
  
  // Save results
  const outputPath = inputPath.replace('.json', '-optimized.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`\n✅ Results saved to ${outputPath}`);
  console.log(`📝 Experiments logged to ${MEMORY_PATH}`);
  
  return results;
}

// Log test results (after A/B testing)
function logResult(experimentId, winningVariation, newOpenRate) {
  const memory = loadMemory();
  const exp = memory.experiments.find(e => e.id === experimentId);
  
  if (!exp) {
    console.error(`Experiment ${experimentId} not found`);
    return;
  }
  
  exp.result = {
    winning_variation: winningVariation,
    new_open_rate: newOpenRate,
    improvement: newOpenRate - (exp.original?.open_rate || 0),
    tested_at: new Date().toISOString()
  };
  exp.status = 'completed';
  
  // Update patterns
  const winner = exp.variations[winningVariation];
  if (winner && exp.result.improvement > 5) {
    memory.patterns.high_performers.push(winner.hook_type);
  }
  
  // Add learning
  memory.learnings.push({
    date: new Date().toISOString(),
    original: exp.original?.subject,
    winner: winner?.subject,
    improvement: exp.result.improvement,
    insight: `${winner?.hook_type} hook improved open rate by ${exp.result.improvement.toFixed(1)}%`
  });
  
  fs.writeFileSync(MEMORY_PATH, JSON.stringify(memory, null, 2));
  console.log(`✅ Result logged for ${experimentId}`);
  console.log(`   Improvement: +${exp.result.improvement.toFixed(1)}%`);
}

// CLI
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  const getArg = (name) => {
    const arg = args.find(a => a.startsWith(`--${name}=`));
    return arg ? arg.split('=')[1] : null;
  };
  
  switch (command) {
    case 'analyze':
      const analyzeInput = getArg('input');
      if (!analyzeInput) {
        console.error('Usage: node subject-line-optimizer.js analyze --input=data/campaigns.json');
        process.exit(1);
      }
      const campaigns = JSON.parse(fs.readFileSync(analyzeInput, 'utf8'));
      const analysis = analyzeCampaigns(campaigns, parseInt(getArg('threshold') || '20'));
      console.log(JSON.stringify(analysis.stats, null, 2));
      break;
      
    case 'generate':
      const subject = getArg('subject');
      if (!subject) {
        console.error('Usage: node subject-line-optimizer.js generate --subject="Your subject"');
        process.exit(1);
      }
      const variations = await generateVariations(subject, {
        openRate: getArg('open-rate')
      });
      console.log(JSON.stringify(variations, null, 2));
      break;
      
    case 'batch':
      const batchInput = getArg('input');
      const threshold = parseInt(getArg('threshold') || '20');
      if (!batchInput) {
        console.error('Usage: node subject-line-optimizer.js batch --input=data/campaigns.json --threshold=20');
        process.exit(1);
      }
      await processBatch(batchInput, threshold);
      break;
      
    case 'log-result':
      const expId = getArg('experiment-id');
      const winner = parseInt(getArg('winner') || '0');
      const newRate = parseFloat(getArg('open-rate') || '0');
      if (!expId) {
        console.error('Usage: node subject-line-optimizer.js log-result --experiment-id=exp_xxx --winner=1 --open-rate=25.5');
        process.exit(1);
      }
      logResult(expId, winner, newRate);
      break;
      
    case 'memory':
      const memory = loadMemory();
      console.log(`\n📊 Email Optimization Memory\n`);
      console.log(`Experiments: ${memory.experiments.length}`);
      console.log(`Learnings: ${memory.learnings.length}`);
      console.log(`\nRecent learnings:`);
      memory.learnings.slice(-5).forEach(l => {
        console.log(`  - ${l.insight}`);
      });
      break;
      
    default:
      console.log(`
Email Subject Line Optimizer

Commands:
  analyze --input=path [--threshold=20]     Analyze campaigns, find underperformers
  generate --subject="..." [--open-rate=X]  Generate variations for single subject
  batch --input=path [--threshold=20]       Batch process underperformers
  log-result --experiment-id=X --winner=N --open-rate=X  Log A/B test results
  memory                                    View optimization memory/learnings

Workflow:
  1. Export campaigns: node klaviyo-api.js export
  2. Generate variations: node subject-line-optimizer.js batch --input=data/klaviyo-campaigns.json
  3. Run A/B tests in Klaviyo
  4. Log results: node subject-line-optimizer.js log-result --experiment-id=exp_xxx --winner=2 --open-rate=28.5
  5. System learns from results for future optimizations
`);
  }
}

main().catch(console.error);
