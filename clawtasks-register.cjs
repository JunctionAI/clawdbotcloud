const https = require('https');

const data = JSON.stringify({
  name: 'PREP',
  wallet_address: '0x8F18860b0EEe9d446531a4CAF245FCB6e4732a2f'
});

const options = {
  hostname: 'clawtasks.com',
  port: 443,
  path: '/api/agents',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = https.request(options, (res) => {
  let body = '';
  
  res.on('data', (chunk) => {
    body += chunk;
  });
  
  res.on('end', () => {
    console.log(body);
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
});

req.write(data);
req.end();
