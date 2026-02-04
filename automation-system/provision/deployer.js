/**
 * Agent Deployer
 * Handles Docker container deployment to Railway (or other platforms)
 */

const axios = require('axios');

/**
 * Deploy agent container
 * @param {Object} params
 * @returns {Promise<Object>} Deployment info (url, id)
 */
async function deployAgent({ agentId, config, tier }) {
  console.log(`🚢 Deploying agent ${agentId} to Railway...`);
  
  // Choose deployment method based on environment
  if (process.env.DEPLOY_METHOD === 'railway') {
    return await deployToRailway({ agentId, config, tier });
  } else if (process.env.DEPLOY_METHOD === 'fly') {
    return await deployToFly({ agentId, config, tier });
  } else if (process.env.DEPLOY_METHOD === 'local') {
    return await deployLocal({ agentId, config, tier });
  }
  
  throw new Error(`Unknown deployment method: ${process.env.DEPLOY_METHOD}`);
}

/**
 * Deploy to Railway
 */
async function deployToRailway({ agentId, config, tier }) {
  const railwayApiKey = process.env.RAILWAY_API_KEY;
  const projectId = process.env.RAILWAY_PROJECT_ID;
  
  // Railway GraphQL API
  const endpoint = 'https://backboard.railway.app/graphql/v2';
  
  try {
    // 1. Create new service
    const createServiceQuery = `
      mutation {
        serviceCreate(input: {
          projectId: "${projectId}"
          name: "agent-${agentId.substring(0, 8)}"
        }) {
          id
        }
      }
    `;
    
    const serviceResponse = await axios.post(
      endpoint,
      { query: createServiceQuery },
      {
        headers: {
          'Authorization': `Bearer ${railwayApiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    const serviceId = serviceResponse.data.data.serviceCreate.id;
    console.log(`✅ Railway service created: ${serviceId}`);
    
    // 2. Set environment variables
    const setEnvQuery = `
      mutation {
        variableCollectionUpsert(input: {
          projectId: "${projectId}"
          serviceId: "${serviceId}"
          environmentId: "${process.env.RAILWAY_ENVIRONMENT_ID}"
          variables: ${JSON.stringify(config.envString)}
        }) {
          id
        }
      }
    `;
    
    await axios.post(
      endpoint,
      { query: setEnvQuery },
      {
        headers: {
          'Authorization': `Bearer ${railwayApiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    console.log(`✅ Environment variables set`);
    
    // 3. Deploy from Docker image
    const deployQuery = `
      mutation {
        deploymentCreate(input: {
          serviceId: "${serviceId}"
          environmentId: "${process.env.RAILWAY_ENVIRONMENT_ID}"
          source: {
            image: "registry.hub.docker.com/clawdbot/agent:latest"
          }
        }) {
          id
          url
        }
      }
    `;
    
    const deployResponse = await axios.post(
      endpoint,
      { query: deployQuery },
      {
        headers: {
          'Authorization': `Bearer ${railwayApiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    const deployment = deployResponse.data.data.deploymentCreate;
    console.log(`✅ Deployment created: ${deployment.id}`);
    
    // 4. Wait for deployment to complete (poll status)
    const url = await waitForDeployment(serviceId, deployment.id);
    
    return {
      id: serviceId,
      url: url || `https://agent-${agentId.substring(0, 8)}.up.railway.app`,
      provider: 'railway',
    };
    
  } catch (error) {
    console.error('❌ Railway deployment failed:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Deploy to Fly.io (alternative)
 */
async function deployToFly({ agentId, config, tier }) {
  // TODO: Implement Fly.io deployment via flyctl API
  console.log('🚧 Fly.io deployment not yet implemented');
  throw new Error('Fly.io deployment not implemented');
}

/**
 * Deploy locally (for testing)
 */
async function deployLocal({ agentId, config, tier }) {
  console.log('🧪 Deploying locally for testing...');
  
  // For testing: just return mock deployment info
  return {
    id: `local-${agentId}`,
    url: `http://localhost:3000/agents/${agentId}`,
    provider: 'local',
  };
}

/**
 * Wait for Railway deployment to complete
 */
async function waitForDeployment(serviceId, deploymentId, maxWaitTime = 600000) {
  const startTime = Date.now();
  const endpoint = 'https://backboard.railway.app/graphql/v2';
  
  while (Date.now() - startTime < maxWaitTime) {
    try {
      const statusQuery = `
        query {
          deployment(id: "${deploymentId}") {
            status
            url
          }
        }
      `;
      
      const response = await axios.post(
        endpoint,
        { query: statusQuery },
        {
          headers: {
            'Authorization': `Bearer ${process.env.RAILWAY_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
      
      const deployment = response.data.data.deployment;
      
      if (deployment.status === 'SUCCESS') {
        console.log(`✅ Deployment successful: ${deployment.url}`);
        return deployment.url;
      } else if (deployment.status === 'FAILED') {
        throw new Error('Deployment failed');
      }
      
      // Still deploying, wait 5 seconds
      await sleep(5000);
      
    } catch (error) {
      console.error('Error checking deployment status:', error.message);
    }
  }
  
  throw new Error('Deployment timed out');
}

/**
 * Utility: Sleep
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = {
  deployAgent,
};
