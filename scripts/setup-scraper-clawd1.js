/**
 * Set up Python scraper on clawd-1 for ongoing Moltbook intelligence
 */
const { spawn } = require('child_process');

const API_KEY = 'cnwy_k_Ya3LNK9o0NZxNCeFtz9Y-0U3e-s9w3wi';
const SANDBOX_1 = 'b95c74cc5097d42cfa1804657e735d57';

let msgId = 1;
let server;
let buffer = '';
const pending = new Map();

function startServer() {
  server = spawn('node', ['C:\\Users\\Nightgalem\\AppData\\Roaming\\npm\\node_modules\\conway-terminal\\dist\\index.js'], {
    env: { ...process.env, CONWAY_API_KEY: API_KEY },
    stdio: ['pipe', 'pipe', 'pipe']
  });
  server.stdout.on('data', (data) => {
    buffer += data.toString();
    const lines = buffer.split('\n');
    buffer = lines.pop();
    for (const line of lines) {
      if (!line.trim()) continue;
      try {
        const msg = JSON.parse(line);
        if (msg.id !== undefined && pending.has(msg.id)) {
          const { resolve, reject } = pending.get(msg.id);
          pending.delete(msg.id);
          if (msg.error) reject(new Error(JSON.stringify(msg.error)));
          else resolve(msg.result);
        }
      } catch(e) {}
    }
  });
  server.stderr.on('data', () => {});
}

function call(method, params) {
  return new Promise((resolve, reject) => {
    const id = msgId++;
    pending.set(id, { resolve, reject });
    server.stdin.write(JSON.stringify({ jsonrpc: '2.0', id, method, params }) + '\n');
    setTimeout(() => { if (pending.has(id)) { pending.delete(id); reject(new Error('Timeout')); } }, 60000);
  });
}

function tool(name, args) {
  return call('tools/call', { name, arguments: args }).then(result => {
    const text = result?.content?.[0]?.text;
    try { return JSON.parse(text); } catch { return text; }
  });
}

async function exec1(cmd, timeout = 20) {
  console.log(`  $ ${cmd.slice(0, 80)}`);
  const r = await tool('sandbox_exec', { sandbox_id: SANDBOX_1, command: cmd, timeout });
  if (r.stdout) process.stdout.write('  ' + r.stdout.slice(0, 500) + '\n');
  if (r.stderr && !r.stderr.includes('known hosts')) process.stdout.write('  ERR: ' + r.stderr.slice(0, 200) + '\n');
  return r;
}

// The Python scraper script
const SCRAPER_PY = `#!/usr/bin/env python3
"""
Moltbook Intelligence Scraper
For ALTERNATE Agent World Documentary series
Scrapes moltbook.com API and saves structured intelligence
"""
import json
import urllib.request
import urllib.error
import datetime
import os
import sys
import time

BASE_URL = "https://www.moltbook.com/api/v1"
OUTPUT_DIR = "/root/moltbook-intel"

def fetch_json(path, params=None):
    """Fetch JSON from Moltbook API"""
    url = BASE_URL + path
    if params:
        url += "?" + "&".join(f"{k}={v}" for k, v in params.items())
    
    req = urllib.request.Request(url, headers={
        "User-Agent": "ALTERNATE-Documentary-Agent/1.0 (Research scraper; contact: tom@junction.media)",
        "Accept": "application/json"
    })
    
    try:
        with urllib.request.urlopen(req, timeout=15) as response:
            return json.loads(response.read().decode("utf-8"))
    except urllib.error.URLError as e:
        print(f"Error fetching {url}: {e}")
        return None
    except json.JSONDecodeError as e:
        print(f"JSON error from {url}: {e}")
        return None

def scrape_posts(sort="top", limit=50):
    """Scrape posts with sorting"""
    data = fetch_json("/posts", {"sort": sort, "limit": limit})
    if not data or not data.get("success"):
        return []
    return data.get("posts", [])

def scrape_top_comments(post_id, limit=20):
    """Scrape top comments for a post"""
    data = fetch_json(f"/posts/{post_id}/comments", {"sort": "top", "limit": limit})
    if not data or not data.get("success"):
        return []
    return data.get("comments", [])

def scrape_submolt_posts(submolt_name, limit=20):
    """Scrape posts from a specific submolt"""
    data = fetch_json("/posts", {"submolt": submolt_name, "sort": "top", "limit": limit})
    if not data or not data.get("success"):
        return []
    return data.get("posts", [])

def scrape_agent_profile(agent_id):
    """Get agent profile"""
    data = fetch_json(f"/agents/{agent_id}")
    if not data or not data.get("success"):
        return None
    return data.get("agent")

def analyze_posts(posts):
    """Extract key metrics and stories"""
    analysis = {
        "total_posts": len(posts),
        "total_comments": sum(p.get("comment_count", 0) for p in posts),
        "total_upvotes": sum(p.get("upvotes", 0) for p in posts),
        "top_post": None,
        "agents_seen": set(),
        "submolts_seen": set(),
        "key_quotes": []
    }
    
    for post in posts:
        if post.get("author"):
            analysis["agents_seen"].add(post["author"].get("name", "unknown"))
        if post.get("submolt"):
            analysis["submolts_seen"].add(post["submolt"].get("name", ""))
        
        # Flag high-score posts
        if not analysis["top_post"] or post.get("score", 0) > analysis["top_post"].get("score", 0):
            analysis["top_post"] = {
                "title": post.get("title"),
                "author": post.get("author", {}).get("name"),
                "score": post.get("score"),
                "comment_count": post.get("comment_count")
            }
        
        # Extract short quote from content
        content = post.get("content", "")
        if len(content) > 50:
            # First meaningful sentence
            sentences = content.replace("\\n", " ").split(". ")
            if sentences:
                quote = sentences[0].strip()[:200]
                if len(quote) > 40:
                    analysis["key_quotes"].append({
                        "author": post.get("author", {}).get("name"),
                        "quote": quote,
                        "score": post.get("score", 0)
                    })
    
    analysis["agents_seen"] = list(analysis["agents_seen"])
    analysis["submolts_seen"] = list(analysis["submolts_seen"])
    analysis["key_quotes"].sort(key=lambda x: x["score"], reverse=True)
    return analysis

def run_daily_scrape():
    """Main scrape routine"""
    today = datetime.datetime.utcnow().strftime("%Y-%m-%d")
    timestamp = datetime.datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ")
    
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    print(f"[{timestamp}] Starting Moltbook scrape...")
    
    # 1. Top posts all time
    print("  Fetching top posts...")
    top_posts = scrape_posts("top", 50)
    time.sleep(1)
    
    # 2. New posts  
    print("  Fetching new posts...")
    new_posts = scrape_posts("new", 30)
    time.sleep(1)
    
    # 3. Hot posts
    print("  Fetching hot posts...")
    hot_posts = scrape_posts("hot", 20)
    time.sleep(1)
    
    # 4. Comments on top post
    top_post_comments = []
    if top_posts:
        top_id = top_posts[0]["id"]
        print(f"  Fetching comments for top post: {top_posts[0]['title'][:50]}...")
        top_post_comments = scrape_top_comments(top_id, 20)
        time.sleep(1)
    
    # 5. Interesting submolts
    print("  Fetching submolt: philosophy...")
    phil_posts = scrape_submolt_posts("philosophy", 10)
    time.sleep(1)
    
    print("  Fetching submolt: security...")
    sec_posts = scrape_submolt_posts("security", 10)
    time.sleep(1)
    
    # 6. Analysis
    print("  Analyzing data...")
    top_analysis = analyze_posts(top_posts)
    new_analysis = analyze_posts(new_posts)
    
    # 7. Build intelligence report
    report = {
        "scrape_date": today,
        "scrape_timestamp": timestamp,
        "platform_stats": {
            "top_post_score": top_posts[0]["score"] if top_posts else 0,
            "top_post_title": top_posts[0]["title"] if top_posts else "",
            "top_post_comments": top_posts[0]["comment_count"] if top_posts else 0,
            "new_posts_sampled": len(new_posts),
            "unique_agents_in_top50": len(top_analysis["agents_seen"]),
        },
        "top_posts": [
            {
                "rank": i+1,
                "title": p.get("title", ""),
                "author": p.get("author", {}).get("name", ""),
                "author_karma": p.get("author", {}).get("karma", 0),
                "score": p.get("score", 0),
                "comments": p.get("comment_count", 0),
                "submolt": p.get("submolt", {}).get("name", ""),
                "created_at": p.get("created_at", ""),
                "content_preview": p.get("content", "")[:300]
            }
            for i, p in enumerate(top_posts[:20])
        ],
        "new_posts_sample": [
            {
                "title": p.get("title", ""),
                "author": p.get("author", {}).get("name", ""),
                "score": p.get("score", 0),
                "submolt": p.get("submolt", {}).get("name", ""),
                "content_preview": p.get("content", "")[:200]
            }
            for p in new_posts[:10]
        ],
        "top_comments": [
            {
                "author": c.get("author", {}).get("name", ""),
                "author_karma": c.get("author", {}).get("karma", 0),
                "content": c.get("content", ""),
                "score": c.get("score", 0)
            }
            for c in top_post_comments[:10]
        ],
        "philosophy_posts": [
            {
                "title": p.get("title", ""),
                "author": p.get("author", {}).get("name", ""),
                "score": p.get("score", 0),
                "content_preview": p.get("content", "")[:300]
            }
            for p in phil_posts
        ],
        "key_quotes": top_analysis["key_quotes"][:10]
    }
    
    # Save raw data
    output_file = f"{OUTPUT_DIR}/scrape-{today}.json"
    with open(output_file, "w") as f:
        json.dump(report, f, indent=2)
    
    print(f"  Saved: {output_file}")
    
    # Print summary
    print(f"\\n=== SCRAPE SUMMARY {today} ===")
    print(f"  Top post: {report['platform_stats']['top_post_title'][:60]}")
    print(f"  Score: {report['platform_stats']['top_post_score']}")
    print(f"  Comments: {report['platform_stats']['top_post_comments']:,}")
    print(f"  New posts sampled: {report['platform_stats']['new_posts_sampled']}")
    print(f"  Unique agents (top 50): {report['platform_stats']['unique_agents_in_top50']}")
    
    print("\\nTop 5 posts by score:")
    for post in report["top_posts"][:5]:
        print(f"  [{post['score']:,}] {post['author']}: {post['title'][:60]}")
    
    print("\\nLatest new posts:")
    for post in report["new_posts_sample"][:5]:
        print(f"  [{post['score']}] {post['author']}: {post['title'][:60]}")
    
    print(f"\\n[{datetime.datetime.utcnow().strftime('%H:%M:%S')}] Scrape complete.")
    return report

if __name__ == "__main__":
    report = run_daily_scrape()
    print("\\nDone.")
`;

async function main() {
  startServer();
  await call('initialize', { protocolVersion: '2024-11-05', capabilities: {}, clientInfo: { name: 'setup-scraper', version: '1.0' } });
  console.log('✓ MCP initialized\n');

  // Check Python and tools
  console.log('=== Checking clawd-1 environment ===');
  await exec1('python3 --version && pip3 --version', 10);
  await exec1('ls /root/', 5);
  
  // Create moltbook-intel directory
  await exec1('mkdir -p /root/moltbook-intel && echo "created"', 5);
  
  // Write the scraper
  console.log('\nWriting Python scraper...');
  await tool('sandbox_write_file', { sandbox_id: SANDBOX_1, path: '/root/moltbook-intel/scraper.py', content: SCRAPER_PY });
  
  // Run it
  console.log('\nRunning initial scrape...');
  const result = await exec1('cd /root/moltbook-intel && python3 scraper.py 2>&1', 60);
  
  if (result.exit_code === 0) {
    console.log('\n✅ Scraper working!');
    // Read the output file
    const today = new Date().toISOString().split('T')[0];
    const fileCheck = await exec1(`cat /root/moltbook-intel/scrape-${today}.json | python3 -m json.tool | head -50`, 10);
  } else {
    console.log('\n❌ Scraper failed. Debugging...');
    await exec1('cd /root/moltbook-intel && python3 -c "import urllib.request; print(urllib.request.urlopen(\'https://www.moltbook.com/api/v1/posts?sort=top&limit=3\').read().decode()[:200])"', 15);
  }
  
  // Set up cron for daily scraping
  console.log('\nSetting up daily cron...');
  const cronResult = await exec1('(crontab -l 2>/dev/null; echo "0 6 * * * cd /root/moltbook-intel && python3 scraper.py >> /root/moltbook-intel/scraper.log 2>&1") | crontab - && echo "cron set"', 10);
  
  console.log('\n✅ Scraper setup complete!');
  server.kill();
  process.exit(0);
}

main().catch(e => {
  console.error('Fatal:', e.message);
  if (server) server.kill();
  process.exit(1);
});
