const https = require('https');
const fs = require('fs');
const os = require('os');

const creds = JSON.parse(fs.readFileSync(os.homedir() + '/clawd/xero-credentials.json', 'utf8'));

function xeroRequest(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.xero.com',
      path: path,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${creds.accessToken}`,
        'xero-tenant-id': creds.tenantId,
        'Accept': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(data);
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function main() {
  console.log('=== XERO FINANCIAL ANALYSIS ===\n');

  // Get P&L Report
  console.log('Fetching Profit & Loss...');
  const pl = await xeroRequest('/api.xro/2.0/Reports/ProfitAndLoss');
  
  // Get Balance Sheet
  console.log('Fetching Balance Sheet...');
  const bs = await xeroRequest('/api.xro/2.0/Reports/BalanceSheet');
  
  // Get Bank Transactions (last 3 months)
  console.log('Fetching Recent Transactions...');
  const since = new Date();
  since.setMonth(since.getMonth() - 3);
  const transactions = await xeroRequest(`/api.xro/2.0/BankTransactions?Where=Date>=DateTime(${since.getFullYear()},${since.getMonth()+1},${since.getDate()})`);
  
  // Get Invoices
  console.log('Fetching Invoices...');
  const invoices = await xeroRequest('/api.xro/2.0/Invoices?Statuses=AUTHORISED,PAID');

  console.log('\n=== PROFIT & LOSS ===');
  console.log(JSON.stringify(pl, null, 2));
  
  console.log('\n=== BALANCE SHEET ===');
  console.log(JSON.stringify(bs, null, 2));
  
  console.log('\n=== RECENT TRANSACTIONS ===');
  console.log(JSON.stringify(transactions, null, 2));
  
  console.log('\n=== INVOICES ===');
  console.log(JSON.stringify(invoices, null, 2));
}

main().catch(console.error);
