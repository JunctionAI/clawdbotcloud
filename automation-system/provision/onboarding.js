/**
 * Onboarding System
 * Handles welcome emails and onboarding sequence
 */

const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send welcome email after provisioning
 */
async function sendWelcomeEmail({ email, tier, agentUrl, dashboardUrl }) {
  console.log(`📧 Sending welcome email to ${email}...`);
  
  const subject = getTierWelcomeSubject(tier);
  const html = generateWelcomeEmail({ tier, agentUrl, dashboardUrl });
  
  try {
    const { data, error } = await resend.emails.send({
      from: 'Clawdbot <welcome@setupclaw.com>',
      to: [email],
      subject,
      html,
    });
    
    if (error) {
      throw new Error(error.message);
    }
    
    console.log(`✅ Welcome email sent: ${data.id}`);
    
    return { success: true, emailId: data.id };
    
  } catch (error) {
    console.error('❌ Failed to send welcome email:', error.message);
    throw error;
  }
}

/**
 * Get tier-specific subject line
 */
function getTierWelcomeSubject(tier) {
  switch (tier) {
    case 'starter':
      return '🎉 Welcome to Clawdbot Starter - Your Agent is Ready!';
    case 'professional':
      return '🚀 Welcome to Clawdbot Professional - Let\'s Save You 10+ Hours Per Week';
    case 'enterprise':
      return '⭐ Welcome to Clawdbot Enterprise - Your Dedicated AI Team Awaits';
    default:
      return '🎉 Welcome to Clawdbot!';
  }
}

/**
 * Generate welcome email HTML
 */
function generateWelcomeEmail({ tier, agentUrl, dashboardUrl }) {
  const tierBenefits = getTierBenefits(tier);
  
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Clawdbot</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px; }
    .header h1 { margin: 0; font-size: 28px; }
    .badge { background: rgba(255,255,255,0.2); padding: 5px 15px; border-radius: 20px; display: inline-block; margin-top: 10px; font-size: 14px; }
    .content { background: #f9fafb; padding: 30px; border-radius: 10px; margin-bottom: 20px; }
    .cta { background: #667eea; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold; margin: 10px 0; }
    .cta:hover { background: #5568d3; }
    .benefits { list-style: none; padding: 0; }
    .benefits li { padding: 10px 0; padding-left: 30px; position: relative; }
    .benefits li:before { content: "✅"; position: absolute; left: 0; }
    .next-steps { background: white; padding: 20px; border-left: 4px solid #667eea; margin: 20px 0; }
    .footer { text-align: center; color: #666; font-size: 14px; margin-top: 30px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>🎉 Your Agent is Ready!</h1>
    <span class="badge">${tier.toUpperCase()} TIER</span>
  </div>
  
  <div class="content">
    <h2>Welcome to Clawdbot!</h2>
    <p>Your personal AI agent has been deployed and is ready to save you hours every week.</p>
    
    <p><strong>What you get with ${tier}:</strong></p>
    <ul class="benefits">
      ${tierBenefits.map(benefit => `<li>${benefit}</li>`).join('')}
    </ul>
  </div>
  
  <div class="next-steps">
    <h3>🚀 Next Steps (5 minutes)</h3>
    <ol>
      <li><strong>Access Your Dashboard:</strong><br>
        <a href="${dashboardUrl}" class="cta">Open Dashboard</a>
      </li>
      <li><strong>Connect WhatsApp/Telegram:</strong><br>
        Follow the setup guide in your dashboard to connect your preferred messaging app.
      </li>
      <li><strong>Send Your First Message:</strong><br>
        Try: "What can you help me with?" to see your skills library.
      </li>
      <li><strong>Watch Quick Start Video (3 min):</strong><br>
        <a href="https://setupclaw.com/videos/quickstart-${tier}" target="_blank">Watch Now</a>
      </li>
    </ol>
  </div>
  
  <div class="content">
    <h3>📚 Resources</h3>
    <ul>
      <li><a href="https://docs.setupclaw.com">Documentation</a></li>
      <li><a href="https://setupclaw.com/skills">Skills Library</a></li>
      <li><a href="https://community.setupclaw.com">Community Forum</a></li>
      ${tier !== 'starter' ? '<li><a href="https://setupclaw.com/slack">Join Pro Slack Channel</a></li>' : ''}
    </ul>
  </div>
  
  <div class="content">
    <h3>💬 Need Help?</h3>
    <p>We're here to help you get the most out of Clawdbot:</p>
    <ul>
      <li><strong>Email:</strong> support@setupclaw.com (${tier === 'starter' ? '24-hour' : tier === 'professional' ? '4-hour' : '1-hour'} response)</li>
      ${tier !== 'starter' ? '<li><strong>Slack:</strong> Real-time support in your dedicated channel</li>' : ''}
      ${tier === 'enterprise' ? '<li><strong>Phone:</strong> Your dedicated support agent will reach out within 24 hours</li>' : ''}
    </ul>
  </div>
  
  <div class="footer">
    <p>Excited to save you time? Let's get started! 🚀</p>
    <p style="color: #999; font-size: 12px; margin-top: 20px;">
      Clawdbot ${tier.toUpperCase()} | <a href="${dashboardUrl}">Manage Account</a>
    </p>
  </div>
</body>
</html>
  `;
}

/**
 * Get tier-specific benefits for email
 */
function getTierBenefits(tier) {
  const starter = [
    '50+ pre-built business skills',
    'Memory system that learns and grows',
    'Email & calendar management',
    'Research & document automation',
    'Multi-channel access (WhatsApp, Telegram)',
    '24-hour email support',
  ];
  
  const professional = [
    ...starter,
    'Mission Control (5 agents working in parallel)',
    'Heartbeat system (proactive 2x daily check-ins)',
    'Advanced CRM & financial analysis',
    '2 custom skills per month',
    'Priority 4-hour support + monthly strategy call',
  ];
  
  const enterprise = [
    ...professional.slice(0, -1),
    'Mission Control (10 agents)',
    '24/7 continuous monitoring',
    'Unlimited custom skills & integrations',
    'SSO, audit logs, compliance-ready',
    'Dedicated support agent + weekly calls',
    '99.5% uptime SLA',
  ];
  
  switch (tier) {
    case 'starter':
      return starter;
    case 'professional':
      return professional;
    case 'enterprise':
      return enterprise;
    default:
      return starter;
  }
}

module.exports = {
  sendWelcomeEmail,
};
