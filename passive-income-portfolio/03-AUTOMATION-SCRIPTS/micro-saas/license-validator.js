/**
 * License Validator for Browser Extension
 * Validates API keys against Supabase backend
 * Use this in your extension's background script
 */

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

/**
 * Validate a license key
 * @param {string} licenseKey - The API key to validate
 * @returns {Promise<Object>} - Validation result with user data
 */
async function validateLicense(licenseKey) {
  try {
    const { data, error } = await supabase
      .from('licenses')
      .select('*')
      .eq('api_key', licenseKey)
      .single();

    if (error || !data) {
      return {
        valid: false,
        message: 'Invalid license key',
      };
    }

    // Check if license is active
    if (data.status !== 'active') {
      return {
        valid: false,
        message: `License is ${data.status}`,
      };
    }

    // Check if subscription has expired
    const expiryDate = new Date(data.expires_at);
    const now = new Date();

    if (expiryDate < now) {
      // Mark as expired in database
      await supabase
        .from('licenses')
        .update({ status: 'expired' })
        .eq('api_key', licenseKey);

      return {
        valid: false,
        message: 'License has expired',
        expiryDate: data.expires_at,
      };
    }

    // Log usage
    await logUsage(licenseKey);

    return {
      valid: true,
      user: {
        email: data.user_email,
        plan: data.plan_type,
        expiresAt: data.expires_at,
      },
    };
  } catch (err) {
    console.error('License validation error:', err);
    return {
      valid: false,
      message: 'Validation service error',
    };
  }
}

/**
 * Log usage for analytics
 */
async function logUsage(licenseKey) {
  await supabase.from('usage_logs').insert({
    api_key: licenseKey,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Generate a new license key (called after Stripe payment)
 */
async function createLicense(userEmail, planType, stripeSubscriptionId) {
  const apiKey = generateApiKey();
  
  // Calculate expiry (30 days for monthly, 365 for yearly)
  const expiryDays = planType === 'yearly' ? 365 : 30;
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + expiryDays);

  const { data, error } = await supabase
    .from('licenses')
    .insert({
      api_key: apiKey,
      user_email: userEmail,
      plan_type: planType,
      stripe_subscription_id: stripeSubscriptionId,
      status: 'active',
      expires_at: expiresAt.toISOString(),
      created_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create license: ${error.message}`);
  }

  return data;
}

/**
 * Generate a random API key
 */
function generateApiKey() {
  const crypto = require('crypto');
  return 'lic_' + crypto.randomBytes(32).toString('hex');
}

/**
 * Revoke a license (for cancellations/refunds)
 */
async function revokeLicense(stripeSubscriptionId) {
  const { error } = await supabase
    .from('licenses')
    .update({ status: 'revoked' })
    .eq('stripe_subscription_id', stripeSubscriptionId);

  if (error) {
    throw new Error(`Failed to revoke license: ${error.message}`);
  }
}

module.exports = {
  validateLicense,
  createLicense,
  revokeLicense,
};
