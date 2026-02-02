const express = require('express');
const router = express.Router();
const { getDatabase } = require('../db');
const { marked } = require('marked');

// Generate proposal HTML from template
function generateProposalHTML(data) {
  const { lead, service_type, service_name, components, price, pricing_breakdown, terms } = data;
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      padding: 40px 20px;
      background: #f9f9f9;
    }
    .proposal-container {
      background: white;
      padding: 40px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    .header {
      border-bottom: 3px solid #0066cc;
      padding-bottom: 20px;
      margin-bottom: 30px;
    }
    .header h1 {
      color: #0066cc;
      margin: 0;
      font-size: 32px;
    }
    .header .tagline {
      color: #666;
      margin-top: 5px;
      font-size: 16px;
    }
    .client-info {
      background: #f5f5f5;
      padding: 15px;
      border-radius: 5px;
      margin-bottom: 30px;
    }
    .section {
      margin-bottom: 30px;
    }
    .section h2 {
      color: #0066cc;
      border-bottom: 2px solid #e0e0e0;
      padding-bottom: 10px;
      margin-bottom: 15px;
    }
    .component-list {
      list-style: none;
      padding: 0;
    }
    .component-item {
      background: #f9f9f9;
      padding: 15px;
      margin-bottom: 10px;
      border-left: 4px solid #0066cc;
      border-radius: 4px;
    }
    .component-item h3 {
      margin: 0 0 5px 0;
      color: #333;
      font-size: 18px;
    }
    .component-item p {
      margin: 0;
      color: #666;
      font-size: 14px;
    }
    .component-item .price {
      float: right;
      font-weight: bold;
      color: #0066cc;
      font-size: 16px;
    }
    .pricing-summary {
      background: #e8f4f8;
      padding: 20px;
      border-radius: 5px;
      margin-top: 30px;
    }
    .pricing-row {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid #d0d0d0;
    }
    .pricing-row.total {
      border-top: 3px solid #0066cc;
      border-bottom: none;
      font-size: 24px;
      font-weight: bold;
      color: #0066cc;
      padding-top: 15px;
      margin-top: 10px;
    }
    .terms {
      background: #fff8e1;
      padding: 15px;
      border-radius: 5px;
      border-left: 4px solid #ffa000;
      font-size: 14px;
      margin-top: 20px;
    }
    .cta {
      background: #0066cc;
      color: white;
      padding: 15px 30px;
      text-align: center;
      border-radius: 5px;
      margin-top: 30px;
      font-size: 18px;
      font-weight: bold;
    }
    .cta a {
      color: white;
      text-decoration: none;
    }
    .footer {
      text-align: center;
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
      color: #666;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="proposal-container">
    <div class="header">
      <h1>Project Proposal</h1>
      <div class="tagline">${service_name} for ${lead.company || lead.name}</div>
    </div>
    
    <div class="client-info">
      <strong>Prepared for:</strong> ${lead.name}<br>
      ${lead.company ? `<strong>Company:</strong> ${lead.company}<br>` : ''}
      <strong>Email:</strong> ${lead.email}<br>
      <strong>Date:</strong> ${new Date().toLocaleDateString()}<br>
      <strong>Valid Until:</strong> ${new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString()}
    </div>
    
    <div class="section">
      <h2>Overview</h2>
      <p>Thank you for your interest in our ${service_name} services. Based on our initial conversation, I've put together this customized proposal outlining how we can help achieve your goals.</p>
    </div>
    
    <div class="section">
      <h2>Scope of Work</h2>
      <ul class="component-list">
        ${components.map(comp => `
          <li class="component-item">
            <span class="price">$${comp.price.toLocaleString()}</span>
            <h3>${comp.name}</h3>
            <p>${comp.description || ''}</p>
          </li>
        `).join('')}
      </ul>
    </div>
    
    <div class="section">
      <h2>Timeline</h2>
      <p>Estimated project duration: <strong>${pricing_breakdown.total_hours || 'TBD'} hours</strong></p>
      <p>Expected completion: <strong>2-4 weeks</strong> from project kickoff</p>
    </div>
    
    <div class="pricing-summary">
      <div class="pricing-row">
        <span>Subtotal:</span>
        <span>$${price.toLocaleString()}</span>
      </div>
      <div class="pricing-row total">
        <span>Total Investment:</span>
        <span>$${price.toLocaleString()} NZD</span>
      </div>
    </div>
    
    <div class="section">
      <h2>Payment Terms</h2>
      <div class="terms">
        ${terms || `
          <p><strong>Payment Structure:</strong></p>
          <ul>
            <li>50% deposit upon acceptance ($${(price * 0.5).toLocaleString()})</li>
            <li>50% upon completion ($${(price * 0.5).toLocaleString()})</li>
          </ul>
          <p><strong>Accepted payment methods:</strong> Bank transfer, Stripe (credit card)</p>
        `}
      </div>
    </div>
    
    <div class="section">
      <h2>What Happens Next?</h2>
      <ol>
        <li><strong>Review this proposal</strong> - Take your time, ask any questions</li>
        <li><strong>Accept & pay deposit</strong> - Click the button below to get started</li>
        <li><strong>Kickoff call</strong> - We'll schedule a call within 24-48 hours</li>
        <li><strong>Project delivery</strong> - Regular updates throughout the process</li>
      </ol>
    </div>
    
    <div class="cta">
      <a href="${process.env.FRONTEND_URL}/accept-proposal/${data.proposal_id || 'PLACEHOLDER'}">Accept Proposal & Get Started</a>
    </div>
    
    <div class="footer">
      <p><strong>Tom Hall-Taylor</strong><br>
      Junction Media<br>
      Email: tom@junctionmedia.ai<br>
      Phone: +64 21 XXX XXX</p>
      
      <p style="margin-top: 20px; font-size: 12px;">
        This proposal is valid for 14 days from the date above.<br>
        All prices are in NZD and exclude GST (if applicable).
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

// POST /api/proposals - Generate and save proposal
router.post('/', async (req, res) => {
  const { 
    lead_id, 
    service_type, 
    service_name,
    components = [], 
    price, 
    pricing_breakdown = {},
    terms = null,
    valid_days = 14
  } = req.body;
  
  const db = getDatabase();
  
  try {
    // Get lead info
    const lead = db.prepare('SELECT * FROM leads WHERE id = ?').get(lead_id);
    
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    
    // Generate proposal HTML
    const proposal_data = {
      lead,
      service_type,
      service_name,
      components,
      price,
      pricing_breakdown,
      terms
    };
    
    const scope_html = generateProposalHTML(proposal_data);
    
    // Calculate valid_until date
    const valid_until = new Date();
    valid_until.setDate(valid_until.getDate() + valid_days);
    
    // Save proposal to database
    const stmt = db.prepare(`
      INSERT INTO proposals 
      (lead_id, service_type, title, summary, scope_html, price, pricing_breakdown, terms, valid_until, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    const title = `${service_name} Proposal for ${lead.company || lead.name}`;
    const summary = `Custom ${service_name} proposal - $${price.toLocaleString()} NZD`;
    
    const result = stmt.run(
      lead_id,
      service_type,
      title,
      summary,
      scope_html,
      price,
      JSON.stringify(pricing_breakdown),
      terms,
      valid_until.toISOString().split('T')[0],
      'draft'
    );
    
    const proposal_id = result.lastInsertRowid;
    
    // Update proposal HTML with correct ID
    proposal_data.proposal_id = proposal_id;
    const final_html = generateProposalHTML(proposal_data);
    
    db.prepare('UPDATE proposals SET scope_html = ? WHERE id = ?').run(final_html, proposal_id);
    
    const proposal = db.prepare('SELECT * FROM proposals WHERE id = ?').get(proposal_id);
    
    res.status(201).json({
      success: true,
      proposal,
      preview_url: `${process.env.FRONTEND_URL}/proposals/${proposal_id}`
    });
    
  } catch (error) {
    console.error('Error creating proposal:', error);
    res.status(500).json({ error: 'Failed to create proposal' });
  }
});

// GET /api/proposals/:id - Get proposal
router.get('/:id', (req, res) => {
  const db = getDatabase();
  
  try {
    const proposal = db.prepare(`
      SELECT p.*, l.name as lead_name, l.email as lead_email, l.company as lead_company
      FROM proposals p
      JOIN leads l ON p.lead_id = l.id
      WHERE p.id = ?
    `).get(req.params.id);
    
    if (!proposal) {
      return res.status(404).json({ error: 'Proposal not found' });
    }
    
    // Track view
    if (proposal.status === 'sent' && !proposal.viewed_at) {
      db.prepare('UPDATE proposals SET viewed_at = CURRENT_TIMESTAMP, status = ? WHERE id = ?')
        .run('viewed', req.params.id);
      proposal.viewed_at = new Date().toISOString();
      proposal.status = 'viewed';
    }
    
    res.json({ proposal });
    
  } catch (error) {
    console.error('Error fetching proposal:', error);
    res.status(500).json({ error: 'Failed to fetch proposal' });
  }
});

// GET /api/proposals/:id/html - Get proposal HTML for rendering
router.get('/:id/html', (req, res) => {
  const db = getDatabase();
  
  try {
    const proposal = db.prepare('SELECT scope_html FROM proposals WHERE id = ?').get(req.params.id);
    
    if (!proposal) {
      return res.status(404).json({ error: 'Proposal not found' });
    }
    
    res.setHeader('Content-Type', 'text/html');
    res.send(proposal.scope_html);
    
  } catch (error) {
    console.error('Error fetching proposal HTML:', error);
    res.status(500).json({ error: 'Failed to fetch proposal' });
  }
});

// POST /api/proposals/:id/send - Send proposal to lead
router.post('/:id/send', async (req, res) => {
  const db = getDatabase();
  
  try {
    const proposal = db.prepare(`
      SELECT p.*, l.email, l.name 
      FROM proposals p 
      JOIN leads l ON p.lead_id = l.id 
      WHERE p.id = ?
    `).get(req.params.id);
    
    if (!proposal) {
      return res.status(404).json({ error: 'Proposal not found' });
    }
    
    // TODO: Send email with proposal link
    // For now, just update status
    
    db.prepare('UPDATE proposals SET status = ?, sent_at = CURRENT_TIMESTAMP WHERE id = ?')
      .run('sent', req.params.id);
    
    // Update lead status
    db.prepare('UPDATE leads SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
      .run('proposal-sent', proposal.lead_id);
    
    res.json({ 
      success: true, 
      message: 'Proposal sent successfully',
      proposal_url: `${process.env.FRONTEND_URL}/proposals/${req.params.id}`
    });
    
  } catch (error) {
    console.error('Error sending proposal:', error);
    res.status(500).json({ error: 'Failed to send proposal' });
  }
});

// POST /api/proposals/:id/accept - Accept proposal
router.post('/:id/accept', (req, res) => {
  const db = getDatabase();
  
  try {
    const proposal = db.prepare('SELECT * FROM proposals WHERE id = ?').get(req.params.id);
    
    if (!proposal) {
      return res.status(404).json({ error: 'Proposal not found' });
    }
    
    // Check if expired
    const valid_until = new Date(proposal.valid_until);
    if (valid_until < new Date()) {
      return res.status(400).json({ error: 'Proposal has expired' });
    }
    
    // Update proposal
    db.prepare('UPDATE proposals SET status = ?, accepted_at = CURRENT_TIMESTAMP WHERE id = ?')
      .run('accepted', req.params.id);
    
    // Update lead to client
    db.prepare('UPDATE leads SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
      .run('closed-won', proposal.lead_id);
    
    // TODO: Create client record
    // TODO: Create project record
    // TODO: Trigger onboarding sequence
    // TODO: Send payment link
    
    res.json({ 
      success: true, 
      message: 'Proposal accepted! Check your email for next steps.',
      next_step: 'payment'
    });
    
  } catch (error) {
    console.error('Error accepting proposal:', error);
    res.status(500).json({ error: 'Failed to accept proposal' });
  }
});

// GET /api/proposals - List all proposals
router.get('/', (req, res) => {
  const { status, lead_id, limit = 50 } = req.query;
  
  const db = getDatabase();
  let query = `
    SELECT p.*, l.name as lead_name, l.email as lead_email, l.company as lead_company
    FROM proposals p
    JOIN leads l ON p.lead_id = l.id
    WHERE 1=1
  `;
  const params = [];
  
  if (status) {
    query += ' AND p.status = ?';
    params.push(status);
  }
  
  if (lead_id) {
    query += ' AND p.lead_id = ?';
    params.push(lead_id);
  }
  
  query += ' ORDER BY p.created_at DESC LIMIT ?';
  params.push(parseInt(limit));
  
  try {
    const proposals = db.prepare(query).all(...params);
    res.json({ proposals, count: proposals.length });
  } catch (error) {
    console.error('Error fetching proposals:', error);
    res.status(500).json({ error: 'Failed to fetch proposals' });
  }
});

module.exports = router;
