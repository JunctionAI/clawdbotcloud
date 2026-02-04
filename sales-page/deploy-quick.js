#!/usr/bin/env node

/**
 * 🚀 QUICK DEPLOYMENT TESTER
 * Run this to test your sales page locally before deploying
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;
const INDEX_FILE = 'index.html';

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  let filePath = req.url === '/' ? INDEX_FILE : req.url.slice(1);
  
  // Prevent directory traversal
  filePath = path.normalize(filePath).replace(/^(\.\.[\/\\])+/, '');
  
  const fullPath = path.join(__dirname, filePath);
  const ext = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[ext] || 'text/plain';
  
  fs.readFile(fullPath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - File Not Found</h1>', 'utf-8');
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`, 'utf-8');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log('\n🚀 CLAWDBOT SALES PAGE - LOCAL TEST SERVER');
  console.log('==========================================');
  console.log(`\n✅ Server running at: http://localhost:${PORT}`);
  console.log(`\n📋 What to test:`);
  console.log('   - All links work');
  console.log('   - Calendly popup opens');
  console.log('   - Stripe payment link works');
  console.log('   - Mobile responsive (resize browser)');
  console.log('   - All sections scroll smoothly');
  console.log(`\n⚡ Press Ctrl+C to stop\n`);
});
