const https = require('https');
const fs = require('fs');

const creds = JSON.parse(fs.readFileSync('C:/Users/Nightgalem/clawd/outlook-credentials.json'));

const emailBody = `
<h2>Clawdbot 24/7 Service Setup (NSSM)</h2>

<p>Run this <b>once as Administrator</b> tomorrow to make Clawdbot run 24/7:</p>

<h3>Step 1: Open PowerShell as Admin</h3>
<p>Right-click PowerShell → Run as Administrator</p>

<h3>Step 2: Run the installer</h3>
<pre style="background:#f0f0f0;padding:10px;">Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
C:\\Users\\Nightgalem\\clawd\\scripts\\install-clawdbot-service.ps1</pre>

<h3>Step 3: Disable old watchdog (optional)</h3>
<pre style="background:#f0f0f0;padding:10px;">schtasks /Delete /TN "ClawdbotWatchdog" /F</pre>

<h3>What this gives you:</h3>
<ul>
<li>Starts on boot (before login)</li>
<li>Survives sleep/wake cycles</li>
<li>Auto-restart on crash (10 sec delay)</li>
<li>Logs to C:\\Users\\Nightgalem\\clawd\\logs\\</li>
</ul>

<h3>Management commands:</h3>
<pre style="background:#f0f0f0;padding:10px;">Get-Service ClawdbotGateway          # Status
Restart-Service ClawdbotGateway      # Restart
Stop-Service ClawdbotGateway         # Stop</pre>

<p><b>Script:</b> C:\\Users\\Nightgalem\\clawd\\scripts\\install-clawdbot-service.ps1</p>
<p><b>NSSM:</b> C:\\Program Files\\nssm\\nssm.exe (already installed)</p>

<p>— PREP</p>
`;

const email = {
  message: {
    subject: 'Clawdbot 24/7 Service Setup - Run Tomorrow as Admin',
    body: {
      contentType: 'HTML',
      content: emailBody
    },
    toRecipients: [{ emailAddress: { address: 'tom@junctionmedia.ai' } }]
  },
  saveToSentItems: true
};

const data = JSON.stringify(email);

const options = {
  hostname: 'graph.microsoft.com',
  port: 443,
  path: '/v1.0/me/sendMail',
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${creds.access_token}`,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = https.request(options, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    if (res.statusCode === 202) {
      console.log('Email sent successfully!');
    } else {
      console.log('Status:', res.statusCode);
      console.log('Response:', body);
    }
  });
});

req.on('error', (e) => console.error('Error:', e.message));
req.write(data);
req.end();
