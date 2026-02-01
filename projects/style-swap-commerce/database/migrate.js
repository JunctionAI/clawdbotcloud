const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function migrate() {
  const client = await pool.connect();
  
  try {
    console.log('Starting database migration...');
    
    const schema = fs.readFileSync(
      path.join(__dirname, 'schema.sql'),
      'utf8'
    );
    
    await client.query(schema);
    
    console.log('✓ Database schema created successfully');
    
    // Insert sample brands
    await client.query(`
      INSERT INTO brands (name, slug, website_url, commission_rate, is_active)
      VALUES 
        ('Nike', 'nike', 'https://www.nike.com', 12.00, true),
        ('Adidas', 'adidas', 'https://www.adidas.com', 10.00, true),
        ('Zara', 'zara', 'https://www.zara.com', 8.00, true),
        ('H&M', 'hm', 'https://www.hm.com', 9.00, true)
      ON CONFLICT (slug) DO NOTHING;
    `);
    
    console.log('✓ Sample brands inserted');
    console.log('Migration completed successfully!');
    
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

migrate();
