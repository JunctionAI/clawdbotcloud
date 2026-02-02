/**
 * Email Automation
 * Handles onboarding sequences, notifications, and campaigns
 * Supports Mailchimp and SendGrid
 */

const mailchimp = require('@mailchimp/mailchimp_transactional')(process.env.MAILCHIMP_API_KEY);
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Send welcome email with license key (Micro-SaaS)
 */
async function sendWelcomeEmail(email, licenseKey) {
  const subject = '🎉 Welcome! Your License Key Inside';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Welcome to [Your Extension Name]!</h2>
      <p>Thank you for subscribing. Here's your license key:</p>
      
      <div style="background: #f4f4f4; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <code style="font-size: 16px; color: #333;">${licenseKey}</code>
      </div>

      <h3>Getting Started:</h3>
      <ol>
        <li>Open your browser extension</li>
        <li>Click "Settings"</li>
        <li>Paste your license key</li>
        <li>Click "Activate"</li>
      </ol>

      <p><strong>Need help?</strong> Reply to this email or check our <a href="https://yourdocs.com">documentation</a>.</p>

      <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
      
      <h3>What's Next?</h3>
      <p>We'll send you tips and tricks over the next few days to help you get the most out of [Extension Name].</p>
      
      <p>Thanks again,<br>The Team</p>
    </div>
  `;

  return await sendEmail(email, subject, html);
}

/**
 * Send cancellation email with feedback request
 */
async function sendCancellationEmail(email) {
  const subject = 'Sorry to see you go 😢';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Your subscription has been cancelled</h2>
      <p>We're sorry to see you go! Your access will remain active until the end of your billing period.</p>

      <p><strong>We'd love to know why you cancelled.</strong></p>
      <p>Your feedback helps us improve. Would you mind taking 30 seconds to tell us what went wrong?</p>

      <a href="https://yoursurvey.com/cancellation-feedback?email=${encodeURIComponent(email)}" 
         style="display: inline-block; background: #007bff; color: white; padding: 12px 24px; 
                text-decoration: none; border-radius: 5px; margin: 20px 0;">
        Share Feedback
      </a>

      <p>If you cancelled by mistake or want to come back, you can <a href="https://yoursite.com/resubscribe">reactivate here</a>.</p>

      <p>Thanks for giving us a try,<br>The Team</p>
    </div>
  `;

  return await sendEmail(email, subject, html);
}

/**
 * Send product delivery email (Digital Products)
 */
async function sendProductDelivery(email, productName, downloadLink) {
  const subject = `✨ Your ${productName} is ready!`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Thank you for your purchase!</h2>
      <p>Your <strong>${productName}</strong> is ready to download.</p>

      <a href="${downloadLink}" 
         style="display: inline-block; background: #28a745; color: white; padding: 15px 30px; 
                text-decoration: none; border-radius: 5px; margin: 20px 0; font-size: 18px;">
        Download Now
      </a>

      <h3>Need Help Getting Started?</h3>
      <ul>
        <li><a href="https://yourdocs.com/setup">Setup Guide</a></li>
        <li><a href="https://yourdocs.com/faq">FAQ</a></li>
        <li><a href="mailto:support@yoursite.com">Contact Support</a></li>
      </ul>

      <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">

      <p><strong>Love the template?</strong> We'd appreciate a review! ⭐⭐⭐⭐⭐</p>
      <a href="https://gumroad.com/yourproduct#reviews">Leave a Review</a>

      <p>Thanks for your support!<br>The Team</p>
    </div>
  `;

  return await sendEmail(email, subject, html);
}

/**
 * Send review request email (7 days after purchase)
 */
async function sendReviewRequest(email, productName, reviewUrl) {
  const subject = `How's ${productName} working for you?`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Quick question...</h2>
      <p>It's been a week since you got <strong>${productName}</strong>. How's it going?</p>

      <p>If you're finding it useful, would you mind leaving a quick review? It really helps others discover it!</p>

      <a href="${reviewUrl}" 
         style="display: inline-block; background: #ffc107; color: #000; padding: 12px 24px; 
                text-decoration: none; border-radius: 5px; margin: 20px 0;">
        Leave a 5-Star Review ⭐⭐⭐⭐⭐
      </a>

      <p>Or if you're having any issues, just reply to this email and I'll help you out!</p>

      <p>Thanks,<br>The Team</p>

      <p style="font-size: 12px; color: #888; margin-top: 30px;">
        Not interested? <a href="[unsubscribe_link]">Unsubscribe</a>
      </p>
    </div>
  `;

  return await sendEmail(email, subject, html);
}

/**
 * Affiliate content notification (new blog post)
 */
async function notifyNewBlogPost(email, postTitle, postUrl) {
  const subject = `New: ${postTitle}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>${postTitle}</h2>
      <p>We just published a new in-depth guide that you might find helpful.</p>

      <a href="${postUrl}" 
         style="display: inline-block; background: #007bff; color: white; padding: 12px 24px; 
                text-decoration: none; border-radius: 5px; margin: 20px 0;">
        Read the Full Guide
      </a>

      <p>As always, we're here to help you make the best decision for your business.</p>

      <p>Cheers,<br>The Team</p>
    </div>
  `;

  return await sendEmail(email, subject, html);
}

/**
 * Core email sending function (uses SendGrid)
 */
async function sendEmail(to, subject, html) {
  const msg = {
    to,
    from: 'noreply@yoursite.com', // Use your verified sender
    subject,
    html,
  };

  try {
    await sgMail.send(msg);
    console.log(`✅ Email sent to ${to}: ${subject}`);
    return { success: true };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Add contact to Mailchimp list
 */
async function addToMailchimpList(email, firstName, tags = []) {
  try {
    const response = await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID, {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: firstName,
      },
      tags,
    });

    console.log(`✅ Added to Mailchimp: ${email}`);
    return response;
  } catch (error) {
    console.error('Mailchimp error:', error);
    throw error;
  }
}

/**
 * Trigger automated sequence in Mailchimp
 */
async function triggerAutomation(email, automationId) {
  // Note: Mailchimp automation triggers work differently
  // This is a conceptual example - check Mailchimp API docs for your version
  
  await addToMailchimpList(email, '', [`automation_${automationId}`]);
  console.log(`✅ Triggered automation ${automationId} for ${email}`);
}

module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail,
  sendProductDelivery,
  sendReviewRequest,
  notifyNewBlogPost,
  sendEmail,
  addToMailchimpList,
  triggerAutomation,
};
