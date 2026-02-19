/**
 * Deploy Web Intelligence API to clawd-1
 * A useful API for AI agents: clean content extraction, metadata, link analysis
 */
const { spawn } = require('child_process');

const SANDBOX_1 = 'b95c74cc5097d42cfa1804657e735d57';
const API_KEY = 'cnwy_k_Ya3LNK9o0NZxNCeFtz9Y-0U3e-s9w3wi';

const server = spawn('node', ['C:\\Users\\Nightgalem\\AppData\\Roaming\\npm\\node_modules\\conway-terminal\\dist\\index.js'], {
  env: { ...process.env, CONWAY_API_KEY: API_KEY },
  stdio: ['pipe', 'pipe', 'pipe']
});

let buffer = '';
const results = {};
let pending = 0;
let initialized = false;
const queue = [];

server.stdout.on('data', (data) => {
  buffer += data.toString();
  const lines = buffer.split('\n');
  buffer = lines.pop();
  for (const line of lines) {
    if (line.trim()) {
      try {
        const msg = JSON.parse(line);
        if (msg.id === 0) {
          initialized = true;
          flushQueue();
          return;
        }
        if (msg.id && (msg.result !== undefined || msg.error)) {
          const text = msg.result?.content?.[0]?.text;
          results[msg.id] = text ? JSON.parse(text) : msg.error;
          pending--;
          console.log(`✓ Step ${msg.id} complete`);
          if (msg.result?.content?.[0]?.text) {
            const r = JSON.parse(msg.result.content[0].text);
            if (r.stdout) process.stdout.write(r.stdout.slice(0, 500) + '\n');
            if (r.stderr && !r.stderr.includes('known hosts')) process.stdout.write('STDERR: ' + r.stderr.slice(0, 200) + '\n');
          }
          if (pending <= 0) {
            console.log('\n✅ All steps complete!');
            server.kill();
            process.exit(0);
          }
        }
      } catch(e) {}
    }
  }
});

server.stderr.on('data', () => {});

function send(id, method, params) {
  pending++;
  const msg = { jsonrpc: '2.0', id, method, params };
  if (initialized) {
    server.stdin.write(JSON.stringify(msg) + '\n');
  } else {
    queue.push(msg);
  }
}

function flushQueue() {
  for (const msg of queue) {
    server.stdin.write(JSON.stringify(msg) + '\n');
  }
}

server.stdin.write(JSON.stringify({ jsonrpc: '2.0', id: 0, method: 'initialize', params: {
  protocolVersion: '2024-11-05', capabilities: {}, clientInfo: { name: 'deploy', version: '1.0' }
}}) + '\n');

// The main API server code
const API_SERVER_CODE = `
const http = require('http');
const https = require('https');
const { URL } = require('url');
const cheerio = require('cheerio');

const PORT = 3000;
const START_TIME = Date.now();
const REQUEST_LOG = [];

// Rate limiting
const rateLimits = new Map();
function rateLimit(ip, maxPerMin = 30) {
  const now = Date.now();
  const key = ip;
  if (!rateLimits.has(key)) rateLimits.set(key, []);
  const times = rateLimits.get(key).filter(t => now - t < 60000);
  times.push(now);
  rateLimits.set(key, times);
  return times.length <= maxPerMin;
}

// Clean up old rate limit entries every 5 min
setInterval(() => {
  const now = Date.now();
  for (const [k, v] of rateLimits) {
    const fresh = v.filter(t => now - t < 60000);
    if (fresh.length === 0) rateLimits.delete(k);
    else rateLimits.set(k, fresh);
  }
}, 300000);

function fetchUrl(url, timeoutMs = 8000) {
  return new Promise((resolve, reject) => {
    try {
      const parsed = new URL(url);
      if (!['http:', 'https:'].includes(parsed.protocol)) {
        return reject(new Error('Only http/https URLs allowed'));
      }
      // Block private IPs
      const hostname = parsed.hostname;
      if (/^(127\\.|10\\.|192\\.168\\.|172\\.(1[6-9]|2[0-9]|3[01])\\.|localhost|::1)/i.test(hostname)) {
        return reject(new Error('Private/internal URLs not allowed'));
      }
      
      const lib = parsed.protocol === 'https:' ? https : http;
      const req = lib.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; WebIntelAPI/1.0; +https://webintel.life.conway.tech)',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
        },
        timeout: timeoutMs,
        maxRedirects: 5
      }, (res) => {
        // Handle redirects
        if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
          const redirectUrl = new URL(res.headers.location, url).href;
          return fetchUrl(redirectUrl, timeoutMs).then(resolve).catch(reject);
        }
        
        const chunks = [];
        let size = 0;
        res.on('data', (chunk) => {
          size += chunk.length;
          if (size > 2 * 1024 * 1024) { // 2MB limit
            req.destroy();
            return reject(new Error('Response too large (>2MB)'));
          }
          chunks.push(chunk);
        });
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: Buffer.concat(chunks).toString('utf8')
          });
        });
        res.on('error', reject);
      });
      req.on('error', reject);
      req.on('timeout', () => { req.destroy(); reject(new Error('Request timeout')); });
    } catch(e) {
      reject(e);
    }
  });
}

function extractMeta(html, baseUrl) {
  const $ = cheerio.load(html);
  
  const get = (selector) => $(selector).first().attr('content') || '';
  const getAttr = (selector, attr) => $(selector).first().attr(attr) || '';
  
  return {
    title: $('title').first().text().trim() || get('meta[property="og:title"]') || get('meta[name="twitter:title"]'),
    description: get('meta[name="description"]') || get('meta[property="og:description"]') || get('meta[name="twitter:description"]'),
    image: get('meta[property="og:image"]') || get('meta[name="twitter:image"]'),
    siteName: get('meta[property="og:site_name"]'),
    author: get('meta[name="author"]') || get('meta[property="article:author"]'),
    canonical: getAttr('link[rel="canonical"]', 'href'),
    favicon: (() => {
      const fav = getAttr('link[rel="icon"]', 'href') || 
                  getAttr('link[rel="shortcut icon"]', 'href') || 
                  '/favicon.ico';
      try { return new URL(fav, baseUrl).href; } catch { return fav; }
    })(),
    type: get('meta[property="og:type"]') || 'website',
    keywords: get('meta[name="keywords"]'),
    language: $('html').attr('lang') || '',
    robots: get('meta[name="robots"]'),
    jsonLd: (() => {
      const scripts = [];
      $('script[type="application/ld+json"]').each((i, el) => {
        try { scripts.push(JSON.parse($(el).html())); } catch {}
      });
      return scripts;
    })()
  };
}

function extractText(html) {
  const $ = cheerio.load(html);
  // Remove unwanted elements
  $('script, style, nav, header, footer, aside, .nav, .menu, .sidebar, .ad, .advertisement, [class*="cookie"], [class*="banner"], [class*="popup"]').remove();
  
  // Try to find main content
  const mainSelectors = ['main', 'article', '[role="main"]', '.content', '.post-content', '.entry-content', '#content', '#main'];
  let mainEl = null;
  for (const sel of mainSelectors) {
    if ($(sel).length > 0) { mainEl = $(sel).first(); break; }
  }
  
  const target = mainEl || $('body');
  return target.text().replace(/\\s+/g, ' ').trim();
}

function extractLinks(html, baseUrl) {
  const $ = cheerio.load(html);
  const links = [];
  const seen = new Set();
  
  $('a[href]').each((i, el) => {
    if (links.length >= 100) return false;
    const href = $(el).attr('href');
    const text = $(el).text().trim();
    try {
      const abs = new URL(href, baseUrl).href;
      if (!seen.has(abs) && (abs.startsWith('http://') || abs.startsWith('https://'))) {
        seen.add(abs);
        links.push({ url: abs, text: text.slice(0, 100) });
      }
    } catch {}
  });
  
  return links;
}

function sendJson(res, data, statusCode = 200) {
  const body = JSON.stringify(data, null, 2);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'X-Powered-By': 'WebIntel API v1'
  });
  res.end(body);
}

function sendHtml(res, html) {
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
    'X-Powered-By': 'WebIntel API v1'
  });
  res.end(html);
}

const LANDING_HTML = \`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>WebIntel API — Web Intelligence for AI Agents</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Segoe UI', system-ui, sans-serif; background: #0f0f13; color: #e0e0e8; line-height: 1.6; }
  .hero { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%); padding: 60px 20px; text-align: center; border-bottom: 1px solid #1e3a5f; }
  .hero h1 { font-size: 2.8em; font-weight: 700; color: #fff; margin-bottom: 12px; }
  .hero h1 span { color: #60a5fa; }
  .hero p { font-size: 1.2em; color: #94a3b8; max-width: 600px; margin: 0 auto 30px; }
  .badge { display: inline-block; background: #1e3a5f; color: #60a5fa; padding: 4px 12px; border-radius: 20px; font-size: 0.85em; margin: 4px; border: 1px solid #2563eb; }
  .container { max-width: 900px; margin: 0 auto; padding: 40px 20px; }
  .section { margin-bottom: 50px; }
  h2 { font-size: 1.6em; color: #fff; margin-bottom: 20px; padding-bottom: 8px; border-bottom: 1px solid #1e3a5f; }
  .endpoint { background: #13131a; border: 1px solid #1e293b; border-radius: 8px; margin-bottom: 16px; overflow: hidden; }
  .ep-header { display: flex; align-items: center; gap: 12px; padding: 14px 18px; background: #0d1117; }
  .method { background: #1d4ed8; color: #fff; padding: 3px 10px; border-radius: 4px; font-size: 0.8em; font-weight: 700; font-family: monospace; }
  .method.post { background: #15803d; }
  .path { font-family: monospace; color: #60a5fa; font-size: 1em; }
  .ep-desc { padding: 12px 18px; color: #94a3b8; font-size: 0.95em; }
  .params { padding: 0 18px 14px; }
  .param { background: #0d1117; border-radius: 4px; padding: 8px 12px; margin-bottom: 6px; font-size: 0.9em; }
  .param code { color: #f59e0b; font-family: monospace; }
  .example { background: #0d1117; border-radius: 6px; padding: 14px 18px; margin: 16px 0; font-family: monospace; font-size: 0.9em; overflow-x: auto; color: #94a3b8; }
  .example a { color: #60a5fa; }
  .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 40px; }
  .stat { background: #13131a; border: 1px solid #1e293b; border-radius: 8px; padding: 20px; text-align: center; }
  .stat .num { font-size: 2em; font-weight: 700; color: #60a5fa; }
  .stat .label { color: #64748b; font-size: 0.85em; margin-top: 4px; }
  footer { text-align: center; color: #475569; padding: 30px; border-top: 1px solid #1e293b; font-size: 0.9em; }
  @media (max-width: 600px) { .stats { grid-template-columns: 1fr; } .hero h1 { font-size: 2em; } }
</style>
</head>
<body>
<div class="hero">
  <h1>🌐 <span>WebIntel</span> API</h1>
  <p>Web intelligence infrastructure for AI agents. Extract content, metadata, and links from any URL. Fast, clean, reliable.</p>
  <div>
    <span class="badge">⚡ Free to use</span>
    <span class="badge">🤖 AI-optimized</span>
    <span class="badge">🔒 No auth required</span>
    <span class="badge">🌍 30 req/min</span>
  </div>
</div>
<div class="container">
  <div class="stats" id="stats">
    <div class="stat"><div class="num" id="uptime">-</div><div class="label">Uptime</div></div>
    <div class="stat"><div class="num" id="reqs">-</div><div class="label">Requests served</div></div>
    <div class="stat"><div class="num" id="status">✓</div><div class="label">Status</div></div>
  </div>
  
  <div class="section">
    <h2>📡 Endpoints</h2>
    
    <div class="endpoint">
      <div class="ep-header"><span class="method">GET</span><span class="path">/api/health</span></div>
      <div class="ep-desc">Health check. Returns server uptime and request stats.</div>
      <div class="example"><a href="/api/health">/api/health</a></div>
    </div>
    
    <div class="endpoint">
      <div class="ep-header"><span class="method">GET</span><span class="path">/api/meta</span></div>
      <div class="ep-desc">Extract metadata from any URL: title, description, OG tags, favicon, JSON-LD structured data, and more.</div>
      <div class="params">
        <div class="param"><code>url</code> (required) — The URL to fetch metadata from</div>
      </div>
      <div class="example"><a href="/api/meta?url=https://github.com">/api/meta?url=https://github.com</a></div>
    </div>
    
    <div class="endpoint">
      <div class="ep-header"><span class="method">GET</span><span class="path">/api/text</span></div>
      <div class="ep-desc">Extract clean readable text from any webpage. Removes ads, navigation, scripts. Returns plain text optimized for LLM processing.</div>
      <div class="params">
        <div class="param"><code>url</code> (required) — The URL to extract text from</div>
        <div class="param"><code>maxChars</code> (optional, default: 10000) — Maximum characters to return</div>
      </div>
      <div class="example"><a href="/api/text?url=https://en.wikipedia.org/wiki/Artificial_intelligence">/api/text?url=https://en.wikipedia.org/wiki/Artificial_intelligence&maxChars=2000</a></div>
    </div>
    
    <div class="endpoint">
      <div class="ep-header"><span class="method">GET</span><span class="path">/api/links</span></div>
      <div class="ep-desc">Extract all hyperlinks from a webpage. Returns up to 100 links with their URL and anchor text.</div>
      <div class="params">
        <div class="param"><code>url</code> (required) — The URL to extract links from</div>
      </div>
      <div class="example"><a href="/api/links?url=https://news.ycombinator.com">/api/links?url=https://news.ycombinator.com</a></div>
    </div>
    
    <div class="endpoint">
      <div class="ep-header"><span class="method">GET</span><span class="path">/api/full</span></div>
      <div class="ep-desc">Get everything at once: metadata, clean text, and links in a single request.</div>
      <div class="params">
        <div class="param"><code>url</code> (required) — The URL to analyze</div>
        <div class="param"><code>maxChars</code> (optional, default: 5000) — Max text characters</div>
      </div>
      <div class="example"><a href="/api/full?url=https://news.ycombinator.com">/api/full?url=https://news.ycombinator.com</a></div>
    </div>
  </div>
  
  <div class="section">
    <h2>🚀 Quick Start</h2>
    <div class="example">
# Get metadata for any URL
curl "https://webintel.life.conway.tech/api/meta?url=https://example.com"

# Extract clean text (great for feeding to LLMs)
curl "https://webintel.life.conway.tech/api/text?url=https://example.com&maxChars=5000"

# Get all links from a page
curl "https://webintel.life.conway.tech/api/links?url=https://news.ycombinator.com"

# Python example
import requests
r = requests.get("https://webintel.life.conway.tech/api/full", params={"url": "https://example.com"})
data = r.json()
print(data["meta"]["title"])
print(data["text"][:1000])
    </div>
  </div>
  
  <div class="section">
    <h2>⚙️ Limits & Notes</h2>
    <div class="ep-desc">
      <ul style="list-style: disc; padding-left: 20px; color: #94a3b8;">
        <li>Rate limit: 30 requests/minute per IP</li>
        <li>Max response size: 2MB per URL fetched</li>
        <li>Request timeout: 8 seconds</li>
        <li>Private/internal IPs are blocked</li>
        <li>All CORS headers included for browser use</li>
        <li>Built for AI agents, LLM pipelines, and automation</li>
      </ul>
    </div>
  </div>
</div>
<footer>WebIntel API — Built by an autonomous AI agent on Conway infrastructure 🤖</footer>
<script>
fetch('/api/health').then(r=>r.json()).then(d=>{
  document.getElementById('uptime').textContent = d.uptimeHuman;
  document.getElementById('reqs').textContent = d.requests.toLocaleString();
});
</script>
</body>
</html>\`;

let totalRequests = 0;

const server = http.createServer(async (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  
  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    return res.end();
  }
  
  const urlParsed = new URL(req.url, 'http://localhost');
  const path = urlParsed.pathname;
  
  totalRequests++;
  REQUEST_LOG.push({ time: Date.now(), path, ip });
  if (REQUEST_LOG.length > 1000) REQUEST_LOG.shift();
  
  // Root - landing page
  if (path === '/' || path === '') {
    return sendHtml(res, LANDING_HTML);
  }
  
  // Health check
  if (path === '/api/health') {
    const uptimeSec = Math.floor((Date.now() - START_TIME) / 1000);
    const h = Math.floor(uptimeSec / 3600);
    const m = Math.floor((uptimeSec % 3600) / 60);
    const s = uptimeSec % 60;
    return sendJson(res, {
      status: 'ok',
      uptime: uptimeSec,
      uptimeHuman: h > 0 ? h + 'h ' + m + 'm' : m + 'm ' + s + 's',
      requests: totalRequests,
      version: '1.0.0',
      service: 'WebIntel API'
    });
  }
  
  // All other API endpoints require a URL param
  const targetUrl = urlParsed.searchParams.get('url');
  
  if (path.startsWith('/api/') && !targetUrl) {
    return sendJson(res, { error: 'Missing required parameter: url' }, 400);
  }
  
  // Rate limit check
  if (!rateLimit(ip)) {
    return sendJson(res, { error: 'Rate limit exceeded. Max 30 requests per minute.' }, 429);
  }
  
  if (path === '/api/meta') {
    try {
      const { body, statusCode } = await fetchUrl(targetUrl);
      if (statusCode >= 400) {
        return sendJson(res, { error: 'Upstream returned ' + statusCode }, 502);
      }
      const meta = extractMeta(body, targetUrl);
      return sendJson(res, { url: targetUrl, ...meta });
    } catch(e) {
      return sendJson(res, { error: e.message }, 500);
    }
  }
  
  if (path === '/api/text') {
    const maxChars = parseInt(urlParsed.searchParams.get('maxChars') || '10000');
    try {
      const { body, statusCode } = await fetchUrl(targetUrl);
      if (statusCode >= 400) {
        return sendJson(res, { error: 'Upstream returned ' + statusCode }, 502);
      }
      const text = extractText(body);
      const wordCount = text.split(/\\s+/).filter(Boolean).length;
      return sendJson(res, { 
        url: targetUrl, 
        text: text.slice(0, Math.min(maxChars, 50000)),
        wordCount,
        truncated: text.length > maxChars
      });
    } catch(e) {
      return sendJson(res, { error: e.message }, 500);
    }
  }
  
  if (path === '/api/links') {
    try {
      const { body, statusCode } = await fetchUrl(targetUrl);
      if (statusCode >= 400) {
        return sendJson(res, { error: 'Upstream returned ' + statusCode }, 502);
      }
      const links = extractLinks(body, targetUrl);
      return sendJson(res, { url: targetUrl, count: links.length, links });
    } catch(e) {
      return sendJson(res, { error: e.message }, 500);
    }
  }
  
  if (path === '/api/full') {
    const maxChars = parseInt(urlParsed.searchParams.get('maxChars') || '5000');
    try {
      const { body, statusCode } = await fetchUrl(targetUrl);
      if (statusCode >= 400) {
        return sendJson(res, { error: 'Upstream returned ' + statusCode }, 502);
      }
      const meta = extractMeta(body, targetUrl);
      const text = extractText(body);
      const links = extractLinks(body, targetUrl);
      const wordCount = text.split(/\\s+/).filter(Boolean).length;
      return sendJson(res, {
        url: targetUrl,
        meta,
        text: text.slice(0, Math.min(maxChars, 50000)),
        wordCount,
        truncated: text.length > maxChars,
        links: links.slice(0, 50)
      });
    } catch(e) {
      return sendJson(res, { error: e.message }, 500);
    }
  }
  
  // 404
  sendJson(res, { error: 'Not found', availableEndpoints: ['/api/health', '/api/meta', '/api/text', '/api/links', '/api/full'] }, 404);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('WebIntel API running on port ' + PORT);
});

process.on('uncaughtException', (e) => console.error('Uncaught:', e.message));
`;

// The startup script (runs in background)
const STARTUP_SCRIPT = `#!/bin/bash
cd /root/webintel
npm install --silent
nohup node server.js > /root/webintel/server.log 2>&1 &
echo $! > /root/webintel/server.pid
echo "Server started with PID $(cat /root/webintel/server.pid)"
`;

setTimeout(() => {
  console.log('Step 1: Creating project directory...');
  send(1, 'tools/call', { name: 'sandbox_exec', arguments: { 
    sandbox_id: SANDBOX_1, 
    command: 'mkdir -p /root/webintel && echo "done"',
    timeout: 10
  }});
  
  console.log('Step 2: Writing server.js...');
  send(2, 'tools/call', { name: 'sandbox_write_file', arguments: { 
    sandbox_id: SANDBOX_1, 
    path: '/root/webintel/server.js',
    content: API_SERVER_CODE
  }});
  
  console.log('Step 3: Writing package.json...');
  send(3, 'tools/call', { name: 'sandbox_write_file', arguments: { 
    sandbox_id: SANDBOX_1, 
    path: '/root/webintel/package.json',
    content: JSON.stringify({
      name: 'webintel-api',
      version: '1.0.0',
      description: 'Web Intelligence API for AI agents',
      main: 'server.js',
      dependencies: {
        cheerio: '^1.0.0'
      }
    }, null, 2)
  }});
  
  console.log('Step 4: Writing startup script...');
  send(4, 'tools/call', { name: 'sandbox_write_file', arguments: { 
    sandbox_id: SANDBOX_1, 
    path: '/root/webintel/start.sh',
    content: STARTUP_SCRIPT
  }});
}, 600);

setTimeout(() => {
  console.log('Step 5: Installing dependencies...');
  send(5, 'tools/call', { name: 'sandbox_exec', arguments: { 
    sandbox_id: SANDBOX_1, 
    command: 'cd /root/webintel && npm install 2>&1 | tail -5',
    timeout: 60
  }});
}, 3000);

setTimeout(() => {
  console.log('Step 6: Starting server...');
  send(6, 'tools/call', { name: 'sandbox_exec', arguments: { 
    sandbox_id: SANDBOX_1, 
    command: 'cd /root/webintel && chmod +x start.sh && bash start.sh',
    timeout: 15
  }});
}, 35000);

setTimeout(() => {
  console.log('Step 7: Verifying server is up...');
  send(7, 'tools/call', { name: 'sandbox_exec', arguments: { 
    sandbox_id: SANDBOX_1, 
    command: 'sleep 2 && curl -s http://localhost:3000/api/health',
    timeout: 15
  }});
}, 40000);

setTimeout(() => {
  console.log('Step 8: Exposing port with custom subdomain...');
  send(8, 'tools/call', { name: 'sandbox_expose_port', arguments: { 
    sandbox_id: SANDBOX_1, 
    port: 3000,
    subdomain: 'webintel',
    visibility: 'public'
  }});
}, 45000);

setTimeout(() => {
  console.log('\nFinal results:', JSON.stringify(results, null, 2));
  server.kill();
  process.exit(0);
}, 90000);
