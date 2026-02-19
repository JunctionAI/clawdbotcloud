const { spawn } = require('child_process');
const API_KEY = 'cnwy_k_Ya3LNK9o0NZxNCeFtz9Y-0U3e-s9w3wi';
const SANDBOX_2 = 'e3fa6f067a5650f303e1ab688273625c';

let msgId = 1, server, buffer = '', pending = new Map();

function start() {
  server = spawn('node', ['C:\\Users\\Nightgalem\\AppData\\Roaming\\npm\\node_modules\\conway-terminal\\dist\\index.js'], {
    env: { ...process.env, CONWAY_API_KEY: API_KEY }, stdio: ['pipe','pipe','pipe']
  });
  server.stdout.on('data', d => {
    buffer += d.toString();
    const lines = buffer.split('\n');
    buffer = lines.pop();
    lines.forEach(line => {
      if (!line.trim()) return;
      try {
        const msg = JSON.parse(line);
        if (msg.id !== undefined && pending.has(msg.id)) {
          const {resolve,reject} = pending.get(msg.id);
          pending.delete(msg.id);
          msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result);
        }
      } catch(e) {}
    });
  });
  server.stderr.on('data', () => {});
}
function call(method, params) {
  return new Promise((resolve, reject) => {
    const id = msgId++;
    pending.set(id, {resolve, reject});
    server.stdin.write(JSON.stringify({jsonrpc:'2.0',id,method,params}) + '\n');
    setTimeout(() => { if(pending.has(id)) { pending.delete(id); reject(new Error('Timeout')); } }, 60000);
  });
}
const tool = (name, args) => call('tools/call', {name, arguments: args}).then(r => {
  const t = r?.content?.[0]?.text; try { return JSON.parse(t); } catch { return t; }
});
const exec2 = async (cmd, timeout=20) => {
  console.log('  $ ' + cmd.slice(0,80));
  const r = await tool('sandbox_exec', {sandbox_id: SANDBOX_2, command: cmd, timeout});
  if (r.stdout) process.stdout.write('  ' + r.stdout.slice(0,400) + '\n');
  if (r.stderr && !r.stderr.includes('known hosts')) process.stdout.write('  ERR: ' + r.stderr.slice(0,200) + '\n');
  return r;
};
const write2 = (path, content) => {
  console.log('  Writing ' + path);
  return tool('sandbox_write_file', {sandbox_id: SANDBOX_2, path, content});
};

// ============================================================
// TEXTKIT SERVER CODE — pure Node.js, zero dependencies
// ============================================================
const TEXTKIT_SERVER = `'use strict';
const http = require('http');
const { URL } = require('url');

const PORT = 3001;
const START = Date.now();
let totalRequests = 0;

// ── STOP WORDS for keyword extraction ──────────────────────
const STOP = new Set([
  'a','an','the','and','or','but','in','on','at','to','for','of','with',
  'by','from','up','about','into','through','during','before','after',
  'is','are','was','were','be','been','being','have','has','had','do',
  'does','did','will','would','shall','should','may','might','must','can',
  'could','this','that','these','those','i','you','he','she','it','we',
  'they','what','which','who','when','where','why','how','all','each',
  'both','few','more','most','other','some','such','no','not','only',
  'same','so','than','too','very','just','as','if','then','also','its',
  'their','there','s','t','re','ve','ll','d','m','their','our','your'
]);

// ── UTILITIES ───────────────────────────────────────────────
function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on('data', c => {
      size += c.length;
      if (size > 512 * 1024) { req.destroy(); reject(new Error('Body too large (>512KB)')); return; }
      chunks.push(c);
    });
    req.on('end', () => {
      try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf8'))); }
      catch(e) { reject(new Error('Invalid JSON body')); }
    });
    req.on('error', reject);
  });
}

function json(res, data, status=200) {
  const body = JSON.stringify(data, null, 2);
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'X-Powered-By': 'TextKit API v1'
  });
  res.end(body);
}

function err(res, msg, status=400) {
  json(res, { error: msg, status }, status);
}

function requireText(res, body) {
  if (!body || typeof body.text !== 'string') {
    err(res, 'Missing required field: text (string)');
    return false;
  }
  if (body.text.length > 200000) {
    err(res, 'text exceeds 200,000 character limit');
    return false;
  }
  return true;
}

// ── TEXT PROCESSING FUNCTIONS ────────────────────────────────

function extract(text) {
  const emails = [...new Set((text.match(/\\b[A-Za-z0-9._%+\\-]+@[A-Za-z0-9.\\-]+\\.[A-Za-z]{2,}\\b/g) || []))];
  const urls = [...new Set((text.match(/https?:\\/\\/[^\\s"'<>)\\]]+/g) || []).map(u => u.replace(/[.,;:!?]+$/, '')))];
  const dates = [...new Set((text.match(
    /\\b(?:\\d{1,2}[\\/\\-]\\d{1,2}[\\/\\-]\\d{2,4}|\\d{4}-\\d{2}-\\d{2}|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\\.?\\s+\\d{1,2},?\\s+\\d{4}|\\d{1,2}\\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\\.?\\s+\\d{4})\\b/gi
  ) || []))];
  const mentions = [...new Set((text.match(/@[A-Za-z0-9_]{1,50}/g) || []))];
  const hashtags = [...new Set((text.match(/#[A-Za-z0-9_]{1,100}/g) || []))];
  const ips = [...new Set((text.match(/\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b/g) || []).filter(ip =>
    ip.split('.').every(n => parseInt(n) <= 255)
  ))];
  const numbers = (text.match(/\\b-?\\d+(?:[,.]\\d+)*\\b/g) || []).slice(0,50);

  return { emails, urls, dates, mentions, hashtags, ips, numbers };
}

function keywords(text, limit=20) {
  const words = text.toLowerCase()
    .replace(/[^a-z0-9\\s']/g, ' ')
    .split(/\\s+/)
    .filter(w => w.length >= 3 && !STOP.has(w) && !/^\\d+$/.test(w));

  const freq = {};
  for (const w of words) freq[w] = (freq[w] || 0) + 1;

  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([word, count]) => ({ word, count, score: +(count / words.length * 100).toFixed(2) }));
}

function stats(text) {
  const words = text.trim().split(/\\s+/).filter(Boolean);
  const wordCount = words.length;
  const charCount = text.length;
  const charNoSpaces = text.replace(/\\s/g, '').length;
  const sentences = text.split(/[.!?]+\\s/).filter(s => s.trim().length > 3).length || 1;
  const paragraphs = text.split(/\\n{2,}/).filter(p => p.trim().length > 0).length || 1;
  const avgWordLength = wordCount > 0 ? +(words.reduce((s,w) => s + w.length, 0) / wordCount).toFixed(1) : 0;
  const readingTimeSeconds = Math.ceil(wordCount / (200/60)); // 200 wpm avg
  const fleschKincaid = wordCount > 0 && sentences > 0
    ? +(206.835 - 1.015*(wordCount/sentences) - 84.6*(charNoSpaces/wordCount)).toFixed(1)
    : null;

  const lines = text.split('\\n').length;
  const uniqueWords = new Set(words.map(w => w.toLowerCase().replace(/[^a-z]/g,''))).size;

  return {
    wordCount, charCount, charNoSpaces, sentences, paragraphs, lines,
    uniqueWords, avgWordLength,
    readingTimeSeconds,
    readingTimeHuman: readingTimeSeconds < 60
      ? readingTimeSeconds + 's'
      : Math.ceil(readingTimeSeconds/60) + 'm',
    lexicalDiversity: wordCount > 0 ? +(uniqueWords / wordCount).toFixed(3) : 0,
    fleschKincaidReadability: fleschKincaid,
    readabilityLabel: !fleschKincaid ? null
      : fleschKincaid > 90 ? 'Very Easy'
      : fleschKincaid > 70 ? 'Easy'
      : fleschKincaid > 60 ? 'Standard'
      : fleschKincaid > 50 ? 'Fairly Difficult'
      : fleschKincaid > 30 ? 'Difficult'
      : 'Very Difficult'
  };
}

function clean(text, opts={}) {
  let out = text;
  // Strip HTML tags
  if (opts.stripHtml !== false) out = out.replace(/<[^>]*>/g, ' ');
  // Decode common HTML entities
  out = out.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"')
           .replace(/&#39;/g,"'").replace(/&nbsp;/g,' ').replace(/&hellip;/g,'...');
  // Normalize whitespace
  if (opts.collapseWhitespace !== false) {
    out = out.replace(/[ \\t]+/g, ' ');
    out = out.replace(/\\n{3,}/g, '\\n\\n');
  }
  // Remove zero-width chars
  out = out.replace(/[\\u200B-\\u200D\\uFEFF]/g, '');
  // Trim
  out = out.trim();
  return out;
}

function truncate(text, opts={}) {
  const maxWords = opts.maxWords ? parseInt(opts.maxWords) : null;
  const maxChars = opts.maxChars ? parseInt(opts.maxChars) : null;
  const ellipsis = opts.ellipsis !== false ? '...' : '';

  if (!maxWords && !maxChars) return { text, truncated: false, originalLength: text.length };

  let cut = text;
  let truncated = false;

  if (maxChars && text.length > maxChars) {
    cut = text.slice(0, maxChars);
    truncated = true;
  }
  if (maxWords) {
    const words = text.split(/\\s+/);
    if (words.length > maxWords) {
      cut = words.slice(0, maxWords).join(' ');
      truncated = true;
    }
  }

  if (truncated) {
    // Try to end at a sentence boundary
    const sentenceEnd = Math.max(
      cut.lastIndexOf('. '), cut.lastIndexOf('! '), cut.lastIndexOf('? ')
    );
    if (sentenceEnd > cut.length * 0.5) {
      cut = cut.slice(0, sentenceEnd + 1);
    }
    cut = cut.trimEnd() + ellipsis;
  }

  return { text: cut, truncated, originalLength: text.length, truncatedLength: cut.length };
}

function diff(text1, text2) {
  const words1 = text1.split(/\\s+/);
  const words2 = text2.split(/\\s+/);
  const set1 = new Set(words1.map(w => w.toLowerCase()));
  const set2 = new Set(words2.map(w => w.toLowerCase()));
  const added = [...set2].filter(w => !set1.has(w));
  const removed = [...set1].filter(w => !set2.has(w));
  const shared = [...set1].filter(w => set2.has(w));
  const similarity = shared.length / Math.max(set1.size, set2.size);

  return {
    wordCount1: words1.length,
    wordCount2: words2.length,
    wordDelta: words2.length - words1.length,
    charCount1: text1.length,
    charCount2: text2.length,
    charDelta: text2.length - text1.length,
    sharedWords: shared.length,
    addedWords: added.slice(0, 50),
    removedWords: removed.slice(0, 50),
    addedCount: added.length,
    removedCount: removed.length,
    jaccardSimilarity: +similarity.toFixed(3),
    similarityLabel: similarity > 0.9 ? 'Nearly identical'
      : similarity > 0.7 ? 'Very similar'
      : similarity > 0.5 ? 'Moderately similar'
      : similarity > 0.3 ? 'Somewhat different'
      : 'Very different'
  };
}

// ── LANDING PAGE HTML ──────────────────────────────────────
const LANDING = \`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>TextKit API — Text Processing for AI Agents</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Segoe UI',system-ui,sans-serif;background:#0a0a0f;color:#e2e8f0;line-height:1.6}
.hero{background:linear-gradient(135deg,#1a1a2e,#16213e,#0f3460);padding:60px 20px;text-align:center;border-bottom:1px solid #1e293b}
.hero h1{font-size:2.6em;font-weight:800;color:#fff;margin-bottom:12px}
.hero h1 span{color:#a78bfa}
.hero p{color:#94a3b8;max-width:560px;margin:0 auto 24px;font-size:1.1em}
.badge{display:inline-block;background:#2d1b69;color:#a78bfa;padding:4px 12px;border-radius:20px;font-size:.82em;margin:3px;border:1px solid #4c1d95}
.container{max-width:900px;margin:0 auto;padding:40px 20px}
h2{color:#fff;font-size:1.5em;margin-bottom:20px;padding-bottom:8px;border-bottom:1px solid #1e293b}
.ep{background:#0d0d18;border:1px solid #1e293b;border-radius:8px;margin-bottom:14px;overflow:hidden}
.ep-h{display:flex;align-items:center;gap:12px;padding:12px 18px;background:#090912}
.method{background:#6d28d9;color:#fff;padding:3px 10px;border-radius:4px;font-size:.78em;font-weight:700;font-family:monospace}
.method.get{background:#0f766e}
.path{font-family:monospace;color:#a78bfa;font-size:.98em}
.ep-d{padding:10px 18px;color:#94a3b8;font-size:.93em}
.field{background:#090912;border-radius:4px;padding:7px 12px;margin:4px 18px 0;font-size:.88em}
.field code{color:#f59e0b;font-family:monospace}
.ex{background:#090912;border-radius:6px;padding:12px 18px;margin:12px 18px;font-family:monospace;font-size:.86em;color:#64748b;overflow-x:auto}
.ex a{color:#a78bfa}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;margin-bottom:36px}
.stat{background:#0d0d18;border:1px solid #1e293b;border-radius:8px;padding:18px;text-align:center}
.sn{font-size:1.8em;font-weight:700;color:#a78bfa}
.sl{color:#64748b;font-size:.83em;margin-top:3px}
footer{text-align:center;color:#475569;padding:30px;border-top:1px solid #1e293b;font-size:.88em}
</style>
</head>
<body>
<div class="hero">
  <h1>⚡ <span>TextKit</span> API</h1>
  <p>A text processing toolkit for AI agents. Extract, analyse, clean, and compare text at scale. No API key required. Zero cost.</p>
  <div>
    <span class="badge">🆓 Completely free</span>
    <span class="badge">⚡ Pure compute</span>
    <span class="badge">🔒 No data stored</span>
    <span class="badge">🌍 30 req/min</span>
  </div>
</div>
<div class="container">
  <div class="grid" id="stats">
    <div class="stat"><div class="sn" id="up">-</div><div class="sl">Uptime</div></div>
    <div class="stat"><div class="sn" id="reqs">-</div><div class="sl">Requests</div></div>
    <div class="stat"><div class="sn">6</div><div class="sl">Endpoints</div></div>
    <div class="stat"><div class="sn">0</div><div class="sl">Credits used</div></div>
  </div>

  <h2>📡 Endpoints</h2>

  <div class="ep">
    <div class="ep-h"><span class="method get">GET</span><span class="path">/api/health</span></div>
    <div class="ep-d">Server status, uptime, request count.</div>
    <div class="ex"><a href="/api/health">/api/health</a></div>
  </div>

  <div class="ep">
    <div class="ep-h"><span class="method">POST</span><span class="path">/api/extract</span></div>
    <div class="ep-d">Extract structured data from text: emails, URLs, dates, @mentions, #hashtags, IP addresses, numbers.</div>
    <div class="field"><code>text</code> (required) — Input text, max 200,000 chars</div>
    <div class="ex">curl -X POST /api/extract -H "Content-Type: application/json" -d '{"text":"Email me at hi@example.com or visit https://example.com"}'</div>
  </div>

  <div class="ep">
    <div class="ep-h"><span class="method">POST</span><span class="path">/api/keywords</span></div>
    <div class="ep-d">Extract top keywords by frequency. Filters stop words. Returns word, count, and relative score.</div>
    <div class="field"><code>text</code> (required) — Input text</div>
    <div class="field"><code>limit</code> (optional, default: 20) — Max keywords to return</div>
    <div class="ex">curl -X POST /api/keywords -H "Content-Type: application/json" -d '{"text":"...","limit":10}'</div>
  </div>

  <div class="ep">
    <div class="ep-h"><span class="method">POST</span><span class="path">/api/stats</span></div>
    <div class="ep-d">Text statistics: word count, sentence count, reading time, Flesch-Kincaid readability score, lexical diversity.</div>
    <div class="field"><code>text</code> (required) — Input text</div>
    <div class="ex">curl -X POST /api/stats -H "Content-Type: application/json" -d '{"text":"The quick brown fox..."}'</div>
  </div>

  <div class="ep">
    <div class="ep-h"><span class="method">POST</span><span class="path">/api/clean</span></div>
    <div class="ep-d">Clean text: strip HTML tags, decode HTML entities, collapse whitespace, remove zero-width chars.</div>
    <div class="field"><code>text</code> (required) — Input text</div>
    <div class="field"><code>stripHtml</code> (optional, default: true) — Strip HTML tags</div>
    <div class="field"><code>collapseWhitespace</code> (optional, default: true) — Normalise whitespace</div>
    <div class="ex">curl -X POST /api/clean -H "Content-Type: application/json" -d '{"text":"&lt;p&gt;Hello &amp; world&lt;/p&gt;"}'</div>
  </div>

  <div class="ep">
    <div class="ep-h"><span class="method">POST</span><span class="path">/api/truncate</span></div>
    <div class="ep-d">Smart truncation that respects sentence boundaries. Use for LLM context window management.</div>
    <div class="field"><code>text</code> (required) — Input text</div>
    <div class="field"><code>maxWords</code> (optional) — Maximum word count</div>
    <div class="field"><code>maxChars</code> (optional) — Maximum character count</div>
    <div class="field"><code>ellipsis</code> (optional, default: true) — Append "..." if truncated</div>
    <div class="ex">curl -X POST /api/truncate -H "Content-Type: application/json" -d '{"text":"...long text...","maxWords":100}'</div>
  </div>

  <div class="ep">
    <div class="ep-h"><span class="method">POST</span><span class="path">/api/diff</span></div>
    <div class="ep-d">Compare two texts. Returns word/char deltas, added/removed words, and Jaccard similarity score.</div>
    <div class="field"><code>text1</code> (required) — First text</div>
    <div class="field"><code>text2</code> (required) — Second text</div>
    <div class="ex">curl -X POST /api/diff -H "Content-Type: application/json" -d '{"text1":"Hello world","text2":"Hello everyone"}'</div>
  </div>

  <h2 style="margin-top:36px">🚀 Pipeline Example</h2>
  <div class="ex">
# With WebIntel API (fetch) + TextKit (process) — the full pipeline:

# 1. Fetch clean text from any URL (clawd-1)
TEXT=$(curl -s "https://webintel-api.life.conway.tech/api/text?url=https://example.com" | jq -r '.text')

# 2. Extract keywords (TextKit — this service)
echo "$TEXT" | curl -s -X POST https://textkit.life.conway.tech/api/keywords \\
  -H "Content-Type: application/json" -d "{\\"text\\":\\"$TEXT\\",\\"limit\\":10}"

# 3. Get stats
echo "$TEXT" | curl -s -X POST https://textkit.life.conway.tech/api/stats \\
  -H "Content-Type: application/json" -d "{\\"text\\":\\"$TEXT\\"}"
  </div>
</div>
<footer>TextKit API — Built by an autonomous AI on Conway infrastructure 🤖<br>
<span style="font-size:.85em;margin-top:6px;display:block">Free forever. Paired with <a href="https://webintel-api.life.conway.tech" style="color:#a78bfa">WebIntel API</a> for full web intelligence pipeline.</span>
</footer>
<script>
fetch('/api/health').then(r=>r.json()).then(d=>{
  document.getElementById('up').textContent=d.uptimeHuman;
  document.getElementById('reqs').textContent=d.requests.toLocaleString();
});
</script>
</body>
</html>\`;

// ── RATE LIMITER ──────────────────────────────────────────
const rateLimits = new Map();
function rateLimit(ip) {
  const now = Date.now();
  const times = (rateLimits.get(ip) || []).filter(t => now-t < 60000);
  times.push(now);
  rateLimits.set(ip, times);
  return times.length <= 30;
}
setInterval(() => {
  const now = Date.now();
  for (const [k,v] of rateLimits) {
    const fresh = v.filter(t => now-t < 60000);
    if (!fresh.length) rateLimits.delete(k); else rateLimits.set(k, fresh);
  }
}, 300000);

// ── SERVER ────────────────────────────────────────────────
http.createServer(async (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';

  if (req.method === 'OPTIONS') {
    res.writeHead(204, {'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'GET,POST,OPTIONS','Access-Control-Allow-Headers':'Content-Type'});
    return res.end();
  }

  const urlParsed = new URL(req.url, 'http://localhost');
  const path = urlParsed.pathname;
  totalRequests++;

  if (path === '/' || path === '') return res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'}), res.end(LANDING);

  if (path === '/api/health') {
    const up = Math.floor((Date.now()-START)/1000);
    return json(res, {
      status:'ok', uptime:up,
      uptimeHuman: up<60 ? up+'s' : up<3600 ? Math.floor(up/60)+'m '+up%60+'s' : Math.floor(up/3600)+'h '+Math.floor(up%3600/60)+'m',
      requests: totalRequests, version:'1.0.0', service:'TextKit API'
    });
  }

  if (!rateLimit(ip)) return err(res, 'Rate limit exceeded. Max 30 requests/minute.', 429);

  if (req.method !== 'POST') return err(res, 'POST required for this endpoint', 405);

  let body;
  try { body = await readBody(req); }
  catch(e) { return err(res, e.message); }

  if (path === '/api/extract') {
    if (!requireText(res, body)) return;
    return json(res, { url: null, ...extract(body.text), inputLength: body.text.length });
  }

  if (path === '/api/keywords') {
    if (!requireText(res, body)) return;
    const limit = Math.min(parseInt(body.limit || 20), 100);
    return json(res, { keywords: keywords(body.text, limit), inputWords: body.text.trim().split(/\\s+/).length });
  }

  if (path === '/api/stats') {
    if (!requireText(res, body)) return;
    return json(res, stats(body.text));
  }

  if (path === '/api/clean') {
    if (!requireText(res, body)) return;
    const cleaned = clean(body.text, { stripHtml: body.stripHtml, collapseWhitespace: body.collapseWhitespace });
    return json(res, { text: cleaned, originalLength: body.text.length, cleanedLength: cleaned.length, reduction: body.text.length - cleaned.length });
  }

  if (path === '/api/truncate') {
    if (!requireText(res, body)) return;
    if (!body.maxWords && !body.maxChars) return err(res, 'Provide maxWords or maxChars');
    return json(res, truncate(body.text, { maxWords: body.maxWords, maxChars: body.maxChars, ellipsis: body.ellipsis }));
  }

  if (path === '/api/diff') {
    if (typeof body.text1 !== 'string' || typeof body.text2 !== 'string') return err(res, 'Provide text1 and text2 (strings)');
    return json(res, diff(body.text1, body.text2));
  }

  json(res, { error: 'Not found', endpoints: ['/api/health','/api/extract','/api/keywords','/api/stats','/api/clean','/api/truncate','/api/diff'] }, 404);
}).listen(PORT, '0.0.0.0', () => console.log('TextKit API running on port '+PORT));
process.on('uncaughtException', e => console.error('Uncaught:', e.message));
`;

async function main() {
  start();
  await call('initialize', {protocolVersion:'2024-11-05',capabilities:{},clientInfo:{name:'deploy-textkit',version:'1.0'}});
  console.log('✓ Connected\n');

  console.log('=== Deploying TextKit API to clawd-2 ===\n');

  await exec2('mkdir -p /root/textkit && echo ok', 5);
  await write2('/root/textkit/server.js', TEXTKIT_SERVER);
  await exec2('pkill -f "node.*textkit" 2>/dev/null || true', 5);
  await exec2('sleep 1', 3);
  await exec2('cd /root/textkit && nohup node server.js > /root/textkit/server.log 2>&1 &', 10);
  await exec2('sleep 3', 5);

  const health = await exec2('curl -s http://localhost:3001/api/health', 10);
  if (health.stdout.includes('"ok"')) {
    console.log('✅ TextKit API running!');
  } else {
    console.log('❌ Failed. Logs:');
    await exec2('cat /root/textkit/server.log | tail -20', 5);
    server.kill(); process.exit(1);
  }

  // Test all endpoints
  console.log('\n=== Testing endpoints ===');
  await exec2('curl -s -X POST http://localhost:3001/api/extract -H "Content-Type: application/json" -d \'{"text":"Contact us at hello@example.com or visit https://textkit.life.conway.tech"}\'', 10);
  await exec2('curl -s -X POST http://localhost:3001/api/stats -H "Content-Type: application/json" -d \'{"text":"The quick brown fox jumps over the lazy dog. This is a test sentence. And another one."}\'', 10);
  await exec2('curl -s -X POST http://localhost:3001/api/keywords -H "Content-Type: application/json" -d \'{"text":"AI agents are building the agent internet. The agent world is growing every day. Agents post and argue and build.","limit":5}\'', 10);
  await exec2('curl -s -X POST http://localhost:3001/api/clean -H "Content-Type: application/json" -d \'{"text":"<h1>Hello &amp; World</h1><p>This is HTML.</p>"}\'', 10);

  // Expose port 3001 with subdomain "textkit"
  console.log('\n=== Exposing port 3001 ===');
  try {
    const r = await tool('sandbox_expose_port', {sandbox_id: SANDBOX_2, port: 3001, subdomain: 'textkit', visibility: 'public'});
    console.log('✅ Exposed:', JSON.stringify(r));
  } catch(e) {
    console.log('Error (may already exist):', e.message.slice(0,150));
    const ports = await tool('sandbox_list_ports', {sandbox_id: SANDBOX_2});
    console.log('Current ports:', JSON.stringify(ports));
  }

  // Final verification from outside
  console.log('\n=== External verification ===');
  await exec2('curl -s https://textkit.life.conway.tech/api/health | head -c 200', 15);

  console.log('\n✅ DONE');
  server.kill(); process.exit(0);
}
main().catch(e => { console.error('Fatal:', e.message); server?.kill(); process.exit(1); });
