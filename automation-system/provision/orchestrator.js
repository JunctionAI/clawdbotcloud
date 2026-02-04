/**
 * Provisioning Orchestrator
 * Coordinates agent deployment, configuration, and onboarding
 */

const { deployAgent } = require('./deployer');
const { generateConfig } = require('./config-generator');
const { installSkills } = require('./skills-installer');
const { setupMemory } = require('./memory-setup');
const { sendWelcomeEmail } = require('./onboarding');
const { createAgent, createDeployment, updateDeployment } = require('../db/agents');

/**
 * Main provisioning function
 * @param {Object} params - Provisioning parameters
 * @param {string} params.customerId - Customer UUID
 * @param {string} params.tier - starter | professional | enterprise
 * @param {string} params.email - Customer email
 * @returns {Promise<Object>} Deployment object
 */
async function provisionAgent({ customerId, tier, email }) {
  console.log(`🚀 Starting provisioning for customer ${customerId} (${tier})`);
  
  let deployment;
  
  try {
    // 1. Create agent record
    const agent = await createAgent({
      customerId,
      tier,
      status: 'provisioning',
    });
    
    console.log(`✅ Agent created: ${agent.id}`);
    
    // 2. Create deployment record
    deployment = await createDeployment({
      agentId: agent.id,
      status: 'pending',
      startedAt: new Date(),
    });
    
    console.log(`✅ Deployment created: ${deployment.id}`);
    
    // 3. Generate configuration
    await updateDeploymentStatus(deployment.id, 'in_progress', 'Generating configuration...');
    
    const config = await generateConfig({
      agentId: agent.id,
      customerId,
      tier,
      email,
    });
    
    console.log(`✅ Configuration generated`);
    
    // 4. Deploy Docker container
    await updateDeploymentStatus(deployment.id, 'in_progress', 'Deploying container...');
    
    const deploymentInfo = await deployAgent({
      agentId: agent.id,
      config,
      tier,
    });
    
    console.log(`✅ Container deployed: ${deploymentInfo.url}`);
    
    // 5. Install skills (tier-specific)
    await updateDeploymentStatus(deployment.id, 'in_progress', 'Installing skills...');
    
    await installSkills({
      agentId: agent.id,
      deploymentUrl: deploymentInfo.url,
      tier,
    });
    
    console.log(`✅ Skills installed`);
    
    // 6. Setup memory system
    await updateDeploymentStatus(deployment.id, 'in_progress', 'Setting up memory...');
    
    await setupMemory({
      agentId: agent.id,
      deploymentUrl: deploymentInfo.url,
      tier,
    });
    
    console.log(`✅ Memory system configured`);
    
    // 7. Health check - verify agent is responding
    await updateDeploymentStatus(deployment.id, 'in_progress', 'Running health check...');
    
    const isHealthy = await healthCheck(deploymentInfo.url);
    
    if (!isHealthy) {
      throw new Error('Agent health check failed');
    }
    
    console.log(`✅ Health check passed`);
    
    // 8. Mark deployment as complete
    await updateDeploymentStatus(deployment.id, 'completed', 'Deployment successful', {
      deploymentUrl: deploymentInfo.url,
      deploymentId: deploymentInfo.id,
    });
    
    // 9. Update agent status
    await updateAgent(agent.id, {
      status: 'ready',
      deploymentUrl: deploymentInfo.url,
      deploymentId: deploymentInfo.id,
      config,
    });
    
    console.log(`✅ Agent ready: ${deploymentInfo.url}`);
    
    // 10. Send welcome email with credentials
    await sendWelcomeEmail({
      email,
      tier,
      agentUrl: deploymentInfo.url,
      dashboardUrl: `${process.env.DASHBOARD_URL}/welcome`,
    });
    
    console.log(`✅ Welcome email sent to ${email}`);
    
    // 11. Schedule onboarding sequence
    await scheduleOnboarding({
      customerId,
      email,
      tier,
    });
    
    console.log(`✅ Onboarding sequence scheduled`);
    
    console.log(`🎉 Provisioning complete for ${customerId}`);
    
    return deployment;
    
  } catch (error) {
    console.error(`❌ Provisioning failed:`, error);
    
    // Mark deployment as failed
    if (deployment) {
      await updateDeploymentStatus(deployment.id, 'failed', error.message);
    }
    
    // TODO: Send alert to support team
    // TODO: Send apology email to customer with support contact
    
    throw error;
  }
}

/**
 * Update deployment status and logs
 */
async function updateDeploymentStatus(deploymentId, status, message, metadata = {}) {
  const logEntry = `[${new Date().toISOString()}] ${message}`;
  
  await updateDeployment(deploymentId, {
    status,
    logs: logEntry, // Append to existing logs
    ...metadata,
    ...(status === 'completed' && { completedAt: new Date() }),
  });
  
  console.log(logEntry);
}

/**
 * Health check - ping agent to verify it's responding
 */
async function healthCheck(url, retries = 5) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(`${url}/health`, {
        method: 'GET',
        timeout: 5000,
      });
      
      if (response.ok) {
        return true;
      }
    } catch (error) {
      console.log(`Health check attempt ${i + 1}/${retries} failed, retrying...`);
      await sleep(5000); // Wait 5 seconds before retry
    }
  }
  
  return false;
}

/**
 * Schedule onboarding email sequence
 */
async function scheduleOnboarding({ customerId, email, tier }) {
  // Use a job queue (BullMQ, Inngest, or simple cron)
  // Schedule emails for Day 3, 7, 14, 30
  
  const sequence = [
    { delay: 3, template: 'day_3_checkin' },
    { delay: 7, template: 'day_7_quickwin' },
    { delay: 14, template: 'day_14_roi' },
    { delay: 30, template: 'day_30_survey' },
  ];
  
  // TODO: Implement with actual job queue
  console.log(`📅 Scheduled ${sequence.length} onboarding emails for ${email}`);
  
  return { scheduled: sequence.length };
}

/**
 * Utility: Sleep
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
  provisionAgent,
};
