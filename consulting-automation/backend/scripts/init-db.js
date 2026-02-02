const { initializeDatabase } = require('../db');
const path = require('path');
const fs = require('fs');

console.log('🚀 Initializing Consulting Automation Database...\n');

try {
  // Create database directory if it doesn't exist
  const dbDir = path.join(__dirname, '../../database');
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
    console.log('✅ Created database directory');
  }
  
  // Initialize database with schema
  const db = initializeDatabase();
  
  console.log('✅ Database initialized successfully');
  console.log('✅ Schema loaded');
  
  // Check tables
  const tables = db.prepare(`
    SELECT name FROM sqlite_master 
    WHERE type='table' 
    ORDER BY name
  `).all();
  
  console.log(`\n📊 Created ${tables.length} tables:`);
  tables.forEach(table => {
    console.log(`   - ${table.name}`);
  });
  
  // Seed email sequences if empty
  const sequences = db.prepare('SELECT COUNT(*) as count FROM email_sequences').get();
  
  if (sequences.count === 0) {
    console.log('\n📧 Seeding email sequences...');
    
    db.prepare(`
      INSERT INTO email_sequences (id, name, description, active) VALUES
      (1, 'lead-nurture', 'Nurture new leads from inquiry to proposal', 1),
      (2, 'onboarding', 'Welcome new clients and set expectations', 1),
      (3, 'testimonial-request', 'Request testimonials after project completion', 1),
      (4, 'referral-ask', 'Ask happy clients for referrals', 1)
    `).run();
    
    console.log('✅ Email sequences seeded');
  }
  
  db.close();
  
  console.log('\n🎉 Database setup complete!');
  console.log('\n📝 Next steps:');
  console.log('   1. Copy .env.example to .env and fill in your values');
  console.log('   2. Run: npm start');
  console.log('   3. Open landing pages in browser');
  console.log('   4. Test lead submission\n');
  
} catch (error) {
  console.error('❌ Error initializing database:', error);
  process.exit(1);
}
