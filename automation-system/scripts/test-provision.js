/**
 * Test Provisioning Script
 * Manually trigger provisioning for testing
 */

require('dotenv').config();
const { provisionAgent } = require('../provision/orchestrator');

async function testProvision() {
  console.log('🧪 Testing agent provisioning...\n');
  
  // Test data
  const testCustomer = {
    customerId: 'test-customer-123',
    tier: process.argv[2] || 'starter', // starter | professional | enterprise
    email: 'test@example.com',
  };
  
  console.log('Test Customer:', testCustomer);
  console.log('---\n');
  
  try {
    // Run provisioning
    const deployment = await provisionAgent(testCustomer);
    
    console.log('\n✅ Provisioning completed successfully!');
    console.log('Deployment ID:', deployment.id);
    console.log('Status:', deployment.status);
    
  } catch (error) {
    console.error('\n❌ Provisioning failed:');
    console.error(error.message);
    console.error('\nStack:', error.stack);
    process.exit(1);
  }
}

// Run test
testProvision()
  .then(() => {
    console.log('\n✅ Test completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Test failed:', error);
    process.exit(1);
  });
