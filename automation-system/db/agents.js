/**
 * Agent Database Operations
 */

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

/**
 * Create new agent
 */
async function createAgent({ customerId, tier, status }) {
  const query = `
    INSERT INTO agents (id, customer_id, tier, status)
    VALUES (gen_random_uuid(), $1, $2, $3)
    RETURNING *
  `;
  
  const values = [customerId, tier, status];
  
  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error creating agent:', error);
    throw error;
  }
}

/**
 * Update agent
 */
async function updateAgent(agentId, updates) {
  const { status, deploymentUrl, deploymentId, config } = updates;
  
  const query = `
    UPDATE agents
    SET status = COALESCE($1, status),
        deployment_url = COALESCE($2, deployment_url),
        deployment_id = COALESCE($3, deployment_id),
        config = COALESCE($4, config),
        updated_at = NOW()
    WHERE id = $5
    RETURNING *
  `;
  
  const values = [status, deploymentUrl, deploymentId, config, agentId];
  
  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error updating agent:', error);
    throw error;
  }
}

/**
 * Create deployment record
 */
async function createDeployment({ agentId, status, startedAt }) {
  const query = `
    INSERT INTO deployments (id, agent_id, status, started_at)
    VALUES (gen_random_uuid(), $1, $2, $3)
    RETURNING *
  `;
  
  const values = [agentId, status, startedAt];
  
  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error creating deployment:', error);
    throw error;
  }
}

/**
 * Update deployment
 */
async function updateDeployment(deploymentId, updates) {
  const { status, logs, error, completedAt } = updates;
  
  // Append to logs if provided
  let logQuery = 'logs';
  if (logs) {
    logQuery = `logs || E'\\n' || $2`;
  }
  
  const query = `
    UPDATE deployments
    SET status = COALESCE($1, status),
        logs = CASE WHEN $2 IS NOT NULL THEN ${logQuery} ELSE logs END,
        error = COALESCE($3, error),
        completed_at = COALESCE($4, completed_at)
    WHERE id = $5
    RETURNING *
  `;
  
  const values = [status, logs, error, completedAt, deploymentId];
  
  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error updating deployment:', error);
    throw error;
  }
}

module.exports = {
  createAgent,
  updateAgent,
  createDeployment,
  updateDeployment,
};
