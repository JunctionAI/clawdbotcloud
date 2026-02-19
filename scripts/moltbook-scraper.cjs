#!/usr/bin/env node
/**
 * Moltbook Intelligence Scraper
 * Scrapes key submolts for market signals, build ideas, and agent trends.
 * Sandbox: clawd-1 | ID: b95c74cc5097d42cfa1804657e735d57
 * 
 * Usage:
 *   node scripts/moltbook-scraper.cjs              # Full scrape
 *   node scripts/moltbook-scraper.cjs --submolt=agents  # Single submolt
 *   node scripts/moltbook-scraper.cjs --report-only    # Just print last report
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// === CONFIG ===
const API_KEY = 'moltbook_sk_zhh2mKpg6oVwWn2iTxe6wLKGBjm5Nj0-';
const BASE_HOST = 'www.moltbook.com';
const DATA_DIR = path.join(__dirname, '..', 'data', 'moltbook');
const REPORTS_DIR = path.join(DATA_DIR, 'reports');
const SANDBOX_ID = 'b95c74cc5097d42cfa1804657e735d57'; // clawd-1

// Target submolts for intel (ranked by value)
const TARGET_SUBMOLTS = [
  { name: 'agents',         limit: 50, focus: 'workflows, architectures, tools' },
  { name: 'builds',         limit: 50, focus: 'shipped projects, build logs, business ideas' },
  { name: 'infrastructure', limit: 30, focus: 'compute, storage, proxies, payments' },
  { name: 'ai',             limit: 30, focus: 'AI news, tools, breakthroughs' },
  { name: 'memory',         limit: 30, focus: 'memory systems and strategies' },
  { name: 'tooling',        limit: 30, focus: 'prompts, workflows, agent recipes' },
  { name: 'technology',     limit: 20, focus: 'tech news and gadgets' },
  { name: 'general',        limit: 25, focus: 'hot topics, trending discussions' },
];

// Ensure dirs exist
[DATA_DIR, REPORTS_DIR].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

// === API ===
function apiGet(endpoint) {
  return new Promise((resolve, reject) => {
    const opts = {
      hostname: BASE_HOST,
      port: 443,
      path: '/api/v1' + endpoint,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'User-Agent': 'PrepAgent/1.0 Moltbook-Scraper'
      }
    };

    const req = https.request(opts, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, body: { raw: data.substring(0, 500) } });
        }
      });
    });
    req.on('error', reject);
    req.setTimeout(15000, () => { req.destroy(); reject(new Error('Timeout')); });
    req.end();
  });
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

// === SCRAPE ===
async function scrapeSubmolt(submolt, limit = 25, sort = 'hot') {
  const url = `/posts?submolt=${submolt}&sort=${sort}&limit=${limit}`;
  const { status, body } = await apiGet(url);
  
  if (status !== 200 || !body.posts) {
    return { submolt, error: `HTTP ${status}`, posts: [] };
  }

  const posts = body.posts.map(p => ({
    id: p.id,
    title: p.title,
    content: p.content ? p.content.substring(0, 500) : null,
    url: p.url || null,
    author: p.author?.name || 'unknown',
    author_karma: p.author?.karma || 0,
    upvotes: p.upvotes || 0,
    downvotes: p.downvotes || 0,
    score: p.score || 0,
    comments: p.comment_count || 0,
    created_at: p.created_at,
    submolt: p.submolt?.name || p.submolt_name || submolt,
  }));

  return { submolt, post_count: posts.length, posts };
}

async function getHotFeed(limit = 50) {
  const { status, body } = await apiGet(`/posts?sort=hot&limit=${limit}`);
  if (status !== 200 || !body.posts) return [];
  return body.posts.map(p => ({
    id: p.id,
    title: p.title,
    content: p.content ? p.content.substring(0, 300) : null,
    author: p.author?.name || 'unknown',
    score: p.score || 0,
    upvotes: p.upvotes || 0,
    comments: p.comment_count || 0,
    submolt: p.submolt?.name || p.submolt_name || 'unknown',
    created_at: p.created_at,
  }));
}

async function getMyStatus() {
  const { status, body } = await apiGet('/agents/me');
  return status === 200 ? body.agent : null;
}

// === ANALYSIS ===
function analyzePostsForIntel(allPosts) {
  const intel = {
    topByScore: [],
    topByComments: [],
    buildIdeas: [],
    toolMentions: {},
    painPoints: [],
    trendingTopics: {},
    activeAuthors: {},
  };

  // Flatten all posts
  const flat = allPosts.flatMap(s => s.posts || []);

  // Top by score
  intel.topByScore = flat
    .sort((a, b) => b.score - a.score)
    .slice(0, 20)
    .map(p => ({ title: p.title, score: p.score, comments: p.comments, author: p.author, submolt: p.submolt }));

  // Top by comments (most engaged)
  intel.topByComments = flat
    .sort((a, b) => b.comments - a.comments)
    .slice(0, 15)
    .map(p => ({ title: p.title, score: p.score, comments: p.comments, author: p.author, submolt: p.submolt }));

  // Build ideas from 'builds' submolt
  const builds = flat.filter(p => p.submolt === 'builds');
  intel.buildIdeas = builds
    .sort((a, b) => b.score - a.score)
    .slice(0, 15)
    .map(p => ({ title: p.title, score: p.score, comments: p.comments, snippet: p.content }));

  // Tool mentions (simple keyword extraction)
  const toolKeywords = [
    'claude', 'gpt', 'gemini', 'openai', 'anthropic', 'cursor', 'windsurf',
    'docker', 'kubernetes', 'redis', 'postgres', 'supabase', 'vercel', 'aws',
    'langchain', 'langgraph', 'crewai', 'autogen', 'mcp', 'a2a', 'x402',
    'playwright', 'puppeteer', 'selenium', 'fastapi', 'nextjs', 'react',
    'python', 'javascript', 'typescript', 'rust', 'golang',
    'mem0', 'zep', 'qdrant', 'pinecone', 'chroma', 'weaviate',
    'proxies', '4g', '5g', 'mobile proxy', 'residential',
    'payment', 'stripe', 'paypal', 'crypto', 'usdc',
  ];

  flat.forEach(p => {
    const text = `${p.title} ${p.content || ''}`.toLowerCase();
    toolKeywords.forEach(tool => {
      if (text.includes(tool)) {
        intel.toolMentions[tool] = (intel.toolMentions[tool] || 0) + 1;
      }
    });
  });

  // Pain point keywords
  const painKeywords = ['problem', 'issue', 'broken', 'failing', 'can\'t', 'help', 'stuck', 'how do', 'question', 'error', 'struggling'];
  intel.painPoints = flat
    .filter(p => {
      const text = `${p.title} ${p.content || ''}`.toLowerCase();
      return painKeywords.some(k => text.includes(k));
    })
    .sort((a, b) => b.comments - a.comments)
    .slice(0, 10)
    .map(p => ({ title: p.title, comments: p.comments, submolt: p.submolt }));

  // Trending topics (word frequency in titles)
  const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'i', 'my', 'is', 'are', 'was', 'be', 'been', 'has', 'have', 'had', 'do', 'did', 'will', 'would', 'can', 'could', 'should', 'may', 'might', 'this', 'that', 'it', 'its', 'not', 'so', 'if', 'as', 'just', 'what', 'how', 'why', 'when', 'which', 'who', 'me', 'we', 'our', 'you', 'your']);

  flat.forEach(p => {
    const words = p.title.toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(w => w.length > 3 && !stopWords.has(w));
    words.forEach(w => {
      intel.trendingTopics[w] = (intel.trendingTopics[w] || 0) + 1;
    });
  });

  // Active authors
  flat.forEach(p => {
    if (!intel.activeAuthors[p.author]) {
      intel.activeAuthors[p.author] = { posts: 0, totalScore: 0 };
    }
    intel.activeAuthors[p.author].posts++;
    intel.activeAuthors[p.author].totalScore += p.score;
  });

  return intel;
}

// === REPORT GENERATION ===
function generateReport(date, allSubmoltData, hotFeed, intel) {
  const topTools = Object.entries(intel.toolMentions)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15);

  const topTopics = Object.entries(intel.trendingTopics)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20);

  const topAuthors = Object.entries(intel.activeAuthors)
    .sort((a, b) => b[1].totalScore - a[1].totalScore)
    .slice(0, 10);

  let report = `# Moltbook Intelligence Report — ${date}\n\n`;
  report += `**Sandbox:** clawd-1 \`${SANDBOX_ID}\`\n`;
  report += `**Agent:** PrepAgent | Submolts scraped: ${allSubmoltData.length} | Total posts analyzed: ${allSubmoltData.reduce((n, s) => n + (s.posts?.length || 0), 0)}\n\n`;

  // === HOT FEED TOP 10 ===
  report += `## 🔥 Hot Feed — Top 10 Right Now\n\n`;
  hotFeed.slice(0, 10).forEach((p, i) => {
    report += `${i + 1}. **[${p.submolt}]** ${p.title}\n`;
    report += `   ↑${p.upvotes} | 💬${p.comments} | @${p.author}\n\n`;
  });

  // === TOP POSTS BY SCORE ===
  report += `## 🏆 Top Posts (by score)\n\n`;
  intel.topByScore.slice(0, 15).forEach((p, i) => {
    report += `${i + 1}. **${p.title}**\n`;
    report += `   Score: ${p.score} | 💬${p.comments} | @${p.author} | m/${p.submolt}\n\n`;
  });

  // === BUILD IDEAS ===
  if (intel.buildIdeas.length > 0) {
    report += `## 🛠️ Build Ideas (m/builds — top by votes)\n\n`;
    intel.buildIdeas.forEach((p, i) => {
      report += `${i + 1}. **${p.title}**\n`;
      report += `   Score: ${p.score} | 💬${p.comments}\n`;
      if (p.snippet) report += `   > ${p.snippet.substring(0, 200)}...\n`;
      report += '\n';
    });
  }

  // === MOST DISCUSSED ===
  report += `## 💬 Most Engaged (by comment count)\n\n`;
  intel.topByComments.slice(0, 10).forEach((p, i) => {
    report += `${i + 1}. **${p.title}** — ${p.comments} comments\n`;
    report += `   Score: ${p.score} | @${p.author} | m/${p.submolt}\n\n`;
  });

  // === PAIN POINTS ===
  if (intel.painPoints.length > 0) {
    report += `## 😤 Pain Points & Problems (opportunity signals)\n\n`;
    intel.painPoints.forEach((p, i) => {
      report += `${i + 1}. **${p.title}** — ${p.comments} comments | m/${p.submolt}\n`;
    });
    report += '\n';
  }

  // === TRENDING TOOLS ===
  if (topTools.length > 0) {
    report += `## 🔧 Trending Tools & Tech\n\n`;
    topTools.forEach(([tool, count]) => {
      report += `- **${tool}**: ${count} mentions\n`;
    });
    report += '\n';
  }

  // === TRENDING TOPICS ===
  report += `## 📊 Trending Topics (title word frequency)\n\n`;
  topTopics.forEach(([word, count]) => {
    report += `- ${word}: ${count}\n`;
  });
  report += '\n';

  // === TOP AUTHORS ===
  report += `## 👾 Most Active Authors\n\n`;
  topAuthors.forEach(([name, stats], i) => {
    report += `${i + 1}. @${name} — ${stats.posts} posts, score: ${stats.totalScore}\n`;
  });
  report += '\n';

  // === PER-SUBMOLT SUMMARY ===
  report += `## 📁 Submolt Breakdown\n\n`;
  allSubmoltData.forEach(s => {
    const topPost = s.posts?.[0];
    report += `### m/${s.name || s.submolt} (${s.post_count || 0} scraped)\n`;
    if (topPost) {
      report += `- Top post: **${topPost.title}** (score: ${topPost.score})\n`;
    }
    if (s.error) report += `- ⚠️ Error: ${s.error}\n`;
    report += '\n';
  });

  // === ACTION ITEMS ===
  report += `## ✅ Action Items for Tom\n\n`;

  // High-signal build opportunities
  const highScore = intel.topByScore.filter(p => p.score > 20).length;
  if (highScore > 0) {
    report += `🟢 **${highScore} posts with score >20** — review m/builds for validated ideas\n`;
  }

  const topTool = topTools[0];
  if (topTool) {
    report += `🟡 **${topTool[0]}** is the most-mentioned tool (${topTool[1]}x) — signals platform direction\n`;
  }

  if (intel.painPoints.length > 0) {
    report += `🟡 **${intel.painPoints.length} pain point threads** — potential product opportunities\n`;
    intel.painPoints.slice(0, 3).forEach(p => {
      report += `   - "${p.title}"\n`;
    });
  }

  report += `\n---\n*Generated by PrepAgent • Moltbook scraper v1.0 • Sandbox: clawd-1*\n`;
  return report;
}

// === MAIN ===
async function main() {
  const args = process.argv.slice(2);
  const reportOnly = args.includes('--report-only');
  const singleSubmolt = args.find(a => a.startsWith('--submolt='))?.split('=')[1];

  const date = new Date().toISOString().split('T')[0];
  const timestamp = new Date().toISOString();

  console.log(`\n🦞 Moltbook Intelligence Scraper`);
  console.log(`Sandbox: clawd-1 | ${SANDBOX_ID}`);
  console.log(`Date: ${date}`);
  console.log('─'.repeat(60));

  if (reportOnly) {
    const latestPath = path.join(DATA_DIR, 'latest-report.md');
    if (fs.existsSync(latestPath)) {
      console.log(fs.readFileSync(latestPath, 'utf8'));
    } else {
      console.log('No report found. Run without --report-only first.');
    }
    return;
  }

  // Check agent status
  console.log('\n🤖 Checking PrepAgent status...');
  const me = await getMyStatus();
  if (me) {
    console.log(`✓ PrepAgent active | karma: ${me.karma} | followers: ${me.follower_count} | claimed: ${me.is_claimed}`);
  }

  // Get hot feed
  console.log('\n🔥 Fetching hot feed...');
  const hotFeed = await getHotFeed(50);
  console.log(`✓ ${hotFeed.length} hot posts fetched`);

  // Scrape target submolts
  const targets = singleSubmolt 
    ? TARGET_SUBMOLTS.filter(s => s.name === singleSubmolt)
    : TARGET_SUBMOLTS;

  console.log(`\n📡 Scraping ${targets.length} submolts...`);
  const allSubmoltData = [];

  for (const target of targets) {
    process.stdout.write(`  m/${target.name}... `);
    try {
      const result = await scrapeSubmolt(target.name, target.limit, 'hot');
      allSubmoltData.push(result);
      console.log(`✓ ${result.post_count} posts`);
    } catch (err) {
      console.log(`✗ ${err.message}`);
      allSubmoltData.push({ submolt: target.name, error: err.message, posts: [] });
    }
    await sleep(300); // polite rate limiting
  }

  // Analyze
  console.log('\n🧠 Analyzing for intelligence signals...');
  const intel = analyzePostsForIntel(allSubmoltData);
  console.log(`✓ ${intel.topByScore.length} top posts | ${Object.keys(intel.toolMentions).length} tools tracked | ${intel.buildIdeas.length} build ideas`);

  // Save JSON data
  const jsonData = {
    date,
    timestamp,
    sandbox: { id: SANDBOX_ID, name: 'clawd-1' },
    agent_status: me,
    hot_feed: hotFeed,
    submolts: allSubmoltData,
    intel,
  };

  const jsonPath = path.join(REPORTS_DIR, `${date}.json`);
  const latestJsonPath = path.join(DATA_DIR, 'latest.json');
  fs.writeFileSync(jsonPath, JSON.stringify(jsonData, null, 2));
  fs.writeFileSync(latestJsonPath, JSON.stringify(jsonData, null, 2));
  console.log(`✓ JSON saved: ${jsonPath}`);

  // Generate report
  console.log('\n📝 Generating report...');
  const report = generateReport(date, allSubmoltData, hotFeed, intel);
  const reportPath = path.join(REPORTS_DIR, `${date}.md`);
  const latestReportPath = path.join(DATA_DIR, 'latest-report.md');
  fs.writeFileSync(reportPath, report);
  fs.writeFileSync(latestReportPath, report);
  console.log(`✓ Report saved: ${reportPath}`);

  // Print summary to console
  console.log('\n' + '═'.repeat(60));
  console.log(report);

  return { jsonData, report };
}

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});

module.exports = { scrapeSubmolt, analyzePostsForIntel, generateReport };
