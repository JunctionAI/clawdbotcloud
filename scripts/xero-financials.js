#!/usr/bin/env node
import https from 'https';
import fs from 'fs';

const creds = JSON.parse(fs.readFileSync('xero-credentials.json', 'utf8'));

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
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
          return;
        }
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

async function getInvoices() {
  console.log('📄 Fetching invoices from Xero...\n');
  
  // Get invoices from last 3 months
  const since = new Date();
  since.setMonth(since.getMonth() - 3);
  
  const response = await xeroRequest(
    `/api.xro/2.0/Invoices?Statuses=DRAFT,SUBMITTED,AUTHORISED,PAID&Where=Date>=DateTime(${since.getFullYear()},${since.getMonth()+1},${since.getDate()})`
  );
  
  if (response.Invoices) {
    console.log(`Found ${response.Invoices.length} invoices\n`);
    
    response.Invoices.forEach(inv => {
      const status = inv.Status;
      const total = inv.Total;
      const date = inv.Date?.slice(0, 10);
      const contact = inv.Contact?.Name;
      const ref = inv.InvoiceNumber;
      
      console.log(`${ref} | ${contact} | $${total} ${inv.CurrencyCode} | ${status} | ${date}`);
    });
    
    // Summary
    const totalDraft = response.Invoices.filter(i => i.Status === 'DRAFT').reduce((sum, i) => sum + i.Total, 0);
    const totalAuthorised = response.Invoices.filter(i => i.Status === 'AUTHORISED').reduce((sum, i) => sum + i.Total, 0);
    const totalPaid = response.Invoices.filter(i => i.Status === 'PAID').reduce((sum, i) => sum + i.Total, 0);
    
    console.log(`\n💰 Summary:`);
    console.log(`   Draft: $${totalDraft.toFixed(2)}`);
    console.log(`   Authorised (awaiting payment): $${totalAuthorised.toFixed(2)}`);
    console.log(`   Paid: $${totalPaid.toFixed(2)}`);
  }
  
  return response;
}

async function getReports() {
  console.log('\n📊 Fetching P&L Report...\n');
  const pl = await xeroRequest('/api.xro/2.0/Reports/ProfitAndLoss');
  console.log(JSON.stringify(pl, null, 2));
}

// Run
if (process.argv[2] === 'invoices') {
  getInvoices().catch(err => {
    console.error('❌ Error:', err.message);
    process.exit(1);
  });
} else if (process.argv[2] === 'reports') {
  getReports().catch(err => {
    console.error('❌ Error:', err.message);
    process.exit(1);
  });
} else {
  console.log('Usage: node scripts/xero-financials.js [invoices|reports]');
  process.exit(1);
}
