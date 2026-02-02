const express = require('express');
const router = express.Router();
const { getDatabase } = require('../db');

// ==============================================
// EMAIL SEQUENCE AUTOMATION
// ==============================================

// POST /api/automation/email-sequences/trigger
router.post('/email-sequences/trigger', async (req, res) => {
  const { sequence_name, recipient_email, lead_id, client_id, context = {} } = req.body;
  
  const db = getDatabase();
  
  try {
    // Get sequence
    const sequence = db.prepare('SELECT * FROM email_sequences WHERE name = ? AND active = 1')
      .get(sequence_name);
    
    if (!sequence) {
      return res.status(404).json({ error: 'Email sequence not found' });
    }
    
    // Get all templates in sequence
    const templates = db.prepare(`
      SELECT * FROM email_templates 
      WHERE sequence_id = ? AND active = 1 
      ORDER BY step_number ASC
    `).all(sequence.id);
    
    if (templates.length === 0) {
      return res.status(400).json({ error: 'No templates in sequence' });
    }
    
    // Schedule emails
    const scheduled = [];
    for (const template of templates) {
      const send_date = new Date();
      send_date.setDate(send_date.getDate() + template.delay_days);
      
      const stmt = db.prepare(`
        INSERT INTO email_sends (template_id, recipient_email, lead_id, client_id, status)
        VALUES (?, ?, ?, ?, 'pending')
      `);
      
      const result = stmt.run(template.id, recipient_email, lead_id || null, client_id || null);
      
      scheduled.push({
        email_id: result.lastInsertRowid,
        template_id: template.id,
        subject: template.subject,
        scheduled_for: send_date.toISOString()
      });
    }
    
    res.json({
      success: true,
      sequence_name,
      recipient_email,
      emails_scheduled: scheduled.length,
      scheduled
    });
    
  } catch (error) {
    console.error('Error triggering email sequence:', error);
    res.status(500).json({ error: 'Failed to trigger email sequence' });
  }
});

// GET /api/automation/email-sequences/pending
router.get('/email-sequences/pending', (req, res) => {
  const db = getDatabase();
  
  try {
    const pending = db.prepare(`
      SELECT 
        es.*,
        et.subject,
        et.body_html,
        et.sequence_id,
        seq.name as sequence_name
      FROM email_sends es
      JOIN email_templates et ON es.template_id = et.id
      JOIN email_sequences seq ON et.sequence_id = seq.id
      WHERE es.status = 'pending'
      AND datetime(es.created_at, '+' || et.delay_days || ' days') <= datetime('now')
      ORDER BY es.created_at ASC
      LIMIT 50
    `).all();
    
    res.json({ pending, count: pending.length });
  } catch (error) {
    console.error('Error fetching pending emails:', error);
    res.status(500).json({ error: 'Failed to fetch pending emails' });
  }
});

// POST /api/automation/email-sequences/send/:email_id
router.post('/email-sequences/send/:email_id', async (req, res) => {
  const db = getDatabase();
  
  try {
    const email = db.prepare(`
      SELECT es.*, et.subject, et.body_html, et.body_text
      FROM email_sends es
      JOIN email_templates et ON es.template_id = et.id
      WHERE es.id = ?
    `).get(req.params.email_id);
    
    if (!email) {
      return res.status(404).json({ error: 'Email not found' });
    }
    
    // TODO: Actually send email via SendGrid/Mailgun
    console.log(`[EMAIL] Sending to ${email.recipient_email}: ${email.subject}`);
    
    // Update status
    db.prepare('UPDATE email_sends SET status = ?, sent_at = CURRENT_TIMESTAMP WHERE id = ?')
      .run('sent', req.params.email_id);
    
    res.json({ success: true, message: 'Email sent successfully' });
    
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

// ==============================================
// TESTIMONIAL AUTOMATION
// ==============================================

// POST /api/automation/testimonials/request
router.post('/testimonials/request', (req, res) => {
  const { client_id, project_id } = req.body;
  
  const db = getDatabase();
  
  try {
    // Get client info
    const client = db.prepare('SELECT * FROM clients WHERE id = ?').get(client_id);
    
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }
    
    // Check if already requested
    const existing = db.prepare(`
      SELECT * FROM testimonials 
      WHERE client_id = ? AND project_id = ?
    `).get(client_id, project_id || null);
    
    if (existing) {
      return res.status(409).json({ error: 'Testimonial already requested for this project' });
    }
    
    // Create testimonial request
    const stmt = db.prepare(`
      INSERT INTO testimonials (client_id, project_id)
      VALUES (?, ?)
    `);
    
    const result = stmt.run(client_id, project_id || null);
    
    // Trigger testimonial request email sequence
    // TODO: Send email with testimonial form link
    
    res.status(201).json({
      success: true,
      testimonial_id: result.lastInsertRowid,
      message: 'Testimonial request sent',
      form_url: `${process.env.FRONTEND_URL}/testimonials/${result.lastInsertRowid}`
    });
    
  } catch (error) {
    console.error('Error requesting testimonial:', error);
    res.status(500).json({ error: 'Failed to request testimonial' });
  }
});

// POST /api/automation/testimonials/submit/:id
router.post('/testimonials/submit/:id', (req, res) => {
  const { rating, quote, video_url, permission_granted } = req.body;
  
  const db = getDatabase();
  
  try {
    const stmt = db.prepare(`
      UPDATE testimonials 
      SET rating = ?, quote = ?, video_url = ?, permission_granted = ?, received_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    
    stmt.run(rating, quote || null, video_url || null, permission_granted ? 1 : 0, req.params.id);
    
    res.json({ success: true, message: 'Thank you for your testimonial!' });
    
  } catch (error) {
    console.error('Error submitting testimonial:', error);
    res.status(500).json({ error: 'Failed to submit testimonial' });
  }
});

// ==============================================
// REFERRAL AUTOMATION
// ==============================================

// POST /api/automation/referrals/request
router.post('/referrals/request', (req, res) => {
  const { client_id } = req.body;
  
  const db = getDatabase();
  
  try {
    const client = db.prepare('SELECT * FROM clients WHERE id = ?').get(client_id);
    
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }
    
    // Trigger referral request email
    // TODO: Send email with referral link
    
    res.json({
      success: true,
      message: 'Referral request sent',
      referral_link: `${process.env.FRONTEND_URL}/refer/${client_id}`
    });
    
  } catch (error) {
    console.error('Error requesting referral:', error);
    res.status(500).json({ error: 'Failed to request referral' });
  }
});

// POST /api/automation/referrals/submit
router.post('/referrals/submit', (req, res) => {
  const { referrer_client_id, referred_email, referred_name } = req.body;
  
  const db = getDatabase();
  
  try {
    // Validate referrer
    const referrer = db.prepare('SELECT * FROM clients WHERE id = ?').get(referrer_client_id);
    
    if (!referrer) {
      return res.status(404).json({ error: 'Referrer not found' });
    }
    
    // Check for duplicate
    const existing = db.prepare(`
      SELECT * FROM referrals 
      WHERE referrer_client_id = ? AND referred_email = ?
    `).get(referrer_client_id, referred_email);
    
    if (existing) {
      return res.status(409).json({ error: 'You\'ve already referred this person' });
    }
    
    // Create referral
    const stmt = db.prepare(`
      INSERT INTO referrals (referrer_client_id, referred_email, referred_name, reward_type, reward_amount)
      VALUES (?, ?, ?, 'percentage', 10)
    `);
    
    const result = stmt.run(referrer_client_id, referred_email, referred_name || null);
    
    // Create lead for referred person
    const lead_stmt = db.prepare(`
      INSERT INTO leads (email, name, source, status, notes)
      VALUES (?, ?, 'referral', 'new', ?)
    `);
    
    const lead_result = lead_stmt.run(
      referred_email,
      referred_name || null,
      `Referred by ${referrer.name}`
    );
    
    // Link referral to lead
    db.prepare('UPDATE referrals SET referred_lead_id = ? WHERE id = ?')
      .run(lead_result.lastInsertRowid, result.lastInsertRowid);
    
    // Send intro email to referred person
    // TODO: Trigger email sequence
    
    res.status(201).json({
      success: true,
      message: 'Thank you for the referral! We\'ll reach out to them shortly.',
      reward: '10% of their first project'
    });
    
  } catch (error) {
    console.error('Error submitting referral:', error);
    res.status(500).json({ error: 'Failed to submit referral' });
  }
});

// ==============================================
// UPSELL/CROSS-SELL AUTOMATION
// ==============================================

// POST /api/automation/upsells/check
router.post('/upsells/check', (req, res) => {
  const { client_id, trigger_type } = req.body;
  
  const db = getDatabase();
  
  try {
    const client = db.prepare('SELECT * FROM clients WHERE id = ?').get(client_id);
    
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }
    
    // Get client's project history
    const projects = db.prepare(`
      SELECT * FROM projects 
      WHERE client_id = ? 
      ORDER BY created_at DESC
    `).all(client_id);
    
    // Determine suggested upsells based on history
    const suggested_services = [];
    
    const service_types = projects.map(p => p.service_type);
    
    // If they have Clawdbot setup, suggest marketing or AI automation
    if (service_types.includes('clawdbot-setup') && !service_types.includes('marketing-consulting')) {
      suggested_services.push({
        service: 'marketing-consulting',
        reason: 'Now that your Clawdbot is set up, let\'s drive traffic to it',
        estimated_value: 3000
      });
    }
    
    // If they have marketing, suggest AI automation
    if (service_types.includes('marketing-consulting') && !service_types.includes('ai-automation')) {
      suggested_services.push({
        service: 'ai-automation',
        reason: 'Automate your marketing workflows with AI',
        estimated_value: 5000
      });
    }
    
    // If they have one-off projects, suggest retainer
    if (projects.length >= 2 && !projects.some(p => p.pricing_model === 'retainer')) {
      suggested_services.push({
        service: 'retainer',
        reason: 'Save 20% with a monthly retainer',
        estimated_value: 2000
      });
    }
    
    // If project completed >3 months ago, suggest check-in
    const last_project = projects[0];
    if (last_project && last_project.completed_at) {
      const months_since = (Date.now() - new Date(last_project.completed_at)) / (1000 * 60 * 60 * 24 * 30);
      if (months_since > 3) {
        suggested_services.push({
          service: 'check-in',
          reason: 'Time for a quarterly optimization check-in',
          estimated_value: 500
        });
      }
    }
    
    res.json({
      client_id,
      client_name: client.name,
      suggested_services,
      should_contact: suggested_services.length > 0
    });
    
  } catch (error) {
    console.error('Error checking upsells:', error);
    res.status(500).json({ error: 'Failed to check upsells' });
  }
});

// POST /api/automation/upsells/trigger
router.post('/upsells/trigger', (req, res) => {
  const { client_id, suggested_service, trigger_condition } = req.body;
  
  const db = getDatabase();
  
  try {
    const stmt = db.prepare(`
      INSERT INTO upsell_triggers (client_id, trigger_type, trigger_condition, suggested_service, status)
      VALUES (?, 'manual', ?, ?, 'pending')
    `);
    
    const result = stmt.run(client_id, JSON.stringify(trigger_condition), suggested_service);
    
    // TODO: Send upsell email
    
    res.status(201).json({
      success: true,
      upsell_id: result.lastInsertRowid,
      message: 'Upsell triggered'
    });
    
  } catch (error) {
    console.error('Error triggering upsell:', error);
    res.status(500).json({ error: 'Failed to trigger upsell' });
  }
});

// ==============================================
// ONBOARDING AUTOMATION
// ==============================================

// POST /api/automation/onboarding/start
router.post('/onboarding/start', async (req, res) => {
  const { client_id, project_id } = req.body;
  
  const db = getDatabase();
  
  try {
    const client = db.prepare('SELECT * FROM clients WHERE id = ?').get(client_id);
    const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(project_id);
    
    if (!client || !project) {
      return res.status(404).json({ error: 'Client or project not found' });
    }
    
    // Mark onboarding as started
    db.prepare('UPDATE clients SET onboarding_complete = 0 WHERE id = ?').run(client_id);
    db.prepare('UPDATE projects SET status = ? WHERE id = ?').run('active', project_id);
    
    // Trigger onboarding email sequence
    // TODO: Send welcome email with next steps
    
    // Schedule kickoff call reminder
    // TODO: Create calendar invite
    
    res.json({
      success: true,
      message: 'Onboarding started',
      next_steps: [
        'Welcome email sent',
        'Kickoff call scheduled',
        'Access credentials sent',
        'Project dashboard created'
      ]
    });
    
  } catch (error) {
    console.error('Error starting onboarding:', error);
    res.status(500).json({ error: 'Failed to start onboarding' });
  }
});

// POST /api/automation/onboarding/complete
router.post('/onboarding/complete', (req, res) => {
  const { client_id } = req.body;
  
  const db = getDatabase();
  
  try {
    db.prepare('UPDATE clients SET onboarding_complete = 1 WHERE id = ?').run(client_id);
    
    // Trigger follow-up sequence
    // TODO: Schedule first check-in
    
    res.json({
      success: true,
      message: 'Onboarding complete'
    });
    
  } catch (error) {
    console.error('Error completing onboarding:', error);
    res.status(500).json({ error: 'Failed to complete onboarding' });
  }
});

module.exports = router;
