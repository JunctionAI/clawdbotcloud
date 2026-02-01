#!/usr/bin/env node
/**
 * Seed Demo Data
 * Populates database with sample products and affiliate links for testing
 */

const { Pool } = require('pg');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const demoProducts = [
  // Nike
  { brand: 'nike', name: 'Air Max 270', url: 'https://www.nike.com/t/air-max-270', price: 150.00, category: 'shoes' },
  { brand: 'nike', name: 'Dri-FIT Running Shirt', url: 'https://www.nike.com/t/dri-fit-shirt', price: 35.00, category: 'tops' },
  { brand: 'nike', name: 'Tech Fleece Hoodie', url: 'https://www.nike.com/t/tech-fleece', price: 110.00, category: 'outerwear' },
  
  // Adidas
  { brand: 'adidas', name: 'Ultraboost 22', url: 'https://www.adidas.com/ultraboost-22', price: 180.00, category: 'shoes' },
  { brand: 'adidas', name: 'Essentials Logo Tee', url: 'https://www.adidas.com/essentials-tee', price: 30.00, category: 'tops' },
  { brand: 'adidas', name: 'Tiro Track Pants', url: 'https://www.adidas.com/tiro-pants', price: 55.00, category: 'pants' },
  
  // Zara
  { brand: 'zara', name: 'Slim Fit Jeans', url: 'https://www.zara.com/slim-jeans', price: 79.99, category: 'pants' },
  { brand: 'zara', name: 'Textured Shirt', url: 'https://www.zara.com/textured-shirt', price: 49.99, category: 'tops' },
  { brand: 'zara', name: 'Leather Jacket', url: 'https://www.zara.com/leather-jacket', price: 199.99, category: 'outerwear' },
  
  // H&M
  { brand: 'hm', name: 'Cotton T-Shirt', url: 'https://www.hm.com/cotton-tee', price: 12.99, category: 'tops' },
  { brand: 'hm', name: 'Skinny Fit Chinos', url: 'https://www.hm.com/chinos', price: 34.99, category: 'pants' },
  { brand: 'hm', name: 'Hooded Sweatshirt', url: 'https://www.hm.com/hoodie', price: 29.99, category: 'outerwear' }
];

async function seedData() {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    console.log('🌱 Seeding demo data...\n');
    
    // Get brand IDs
    const brands = await client.query('SELECT id, slug FROM brands');
    const brandMap = {};
    brands.rows.forEach(b => brandMap[b.slug] = b.id);
    
    let productCount = 0;
    let linkCount = 0;
    
    for (const product of demoProducts) {
      const brandId = brandMap[product.brand];
      
      if (!brandId) {
        console.log(`⚠️  Brand ${product.brand} not found, skipping ${product.name}`);
        continue;
      }
      
      // Insert product
      const productResult = await client.query(
        `INSERT INTO products (brand_id, name, product_url, price, category, is_available)
         VALUES ($1, $2, $3, $4, $5, true)
         RETURNING id`,
        [brandId, product.name, product.url, product.price, product.category]
      );
      
      const productId = productResult.rows[0].id;
      productCount++;
      
      // Create affiliate link
      const shortCode = uuidv4().substring(0, 8);
      const trackedUrl = `${product.url}?utm_source=styleswap&utm_medium=referral&utm_campaign=demo`;
      
      await client.query(
        `INSERT INTO affiliate_links (product_id, brand_id, original_url, short_code, tracked_url)
         VALUES ($1, $2, $3, $4, $5)`,
        [productId, brandId, product.url, shortCode, trackedUrl]
      );
      
      linkCount++;
      
      console.log(`✓ Created: ${product.name} (${product.brand}) - Link: ${shortCode}`);
    }
    
    // Generate some sample clicks
    console.log('\n📊 Generating sample clicks...\n');
    
    const links = await client.query('SELECT id FROM affiliate_links LIMIT 5');
    
    for (const link of links.rows) {
      const clickCount = Math.floor(Math.random() * 50) + 10;
      
      for (let i = 0; i < clickCount; i++) {
        await client.query(
          `INSERT INTO clicks (affiliate_link_id, session_id, ip_address, user_agent, device_type, clicked_at)
           VALUES ($1, $2, $3, $4, $5, NOW() - INTERVAL '${Math.floor(Math.random() * 30)} days')`,
          [
            link.id,
            uuidv4(),
            `192.168.1.${Math.floor(Math.random() * 255)}`,
            'Mozilla/5.0 (Demo User Agent)',
            ['mobile', 'desktop', 'tablet'][Math.floor(Math.random() * 3)]
          ]
        );
      }
      
      // Update click count
      await client.query(
        'UPDATE affiliate_links SET click_count = $1 WHERE id = $2',
        [clickCount, link.id]
      );
      
      console.log(`✓ Generated ${clickCount} clicks for link ${link.id}`);
    }
    
    // Generate some sample conversions
    console.log('\n💰 Generating sample conversions...\n');
    
    const clicksWithLinks = await client.query(
      `SELECT c.id, al.id as link_id, al.brand_id
       FROM clicks c
       JOIN affiliate_links al ON c.affiliate_link_id = al.id
       ORDER BY RANDOM()
       LIMIT 15`
    );
    
    for (const click of clicksWithLinks.rows) {
      const orderValue = (Math.random() * 200 + 20).toFixed(2);
      
      // Get brand commission rate
      const brand = await client.query(
        'SELECT commission_rate FROM brands WHERE id = $1',
        [click.brand_id]
      );
      
      const commissionRate = brand.rows[0].commission_rate;
      const commissionAmount = (orderValue * commissionRate / 100).toFixed(2);
      
      await client.query(
        `INSERT INTO conversions 
         (affiliate_link_id, click_id, order_id, order_value, commission_rate, commission_amount, status, converted_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, NOW() - INTERVAL '${Math.floor(Math.random() * 20)} days')`,
        [
          click.link_id,
          click.id,
          `ORDER-${uuidv4().substring(0, 8).toUpperCase()}`,
          orderValue,
          commissionRate,
          commissionAmount,
          ['pending', 'confirmed', 'paid'][Math.floor(Math.random() * 3)]
        ]
      );
      
      // Update link stats
      await client.query(
        `UPDATE affiliate_links 
         SET conversion_count = conversion_count + 1,
             revenue_generated = revenue_generated + $1,
             commission_earned = commission_earned + $2
         WHERE id = $3`,
        [orderValue, commissionAmount, click.link_id]
      );
      
      console.log(`✓ Created conversion: $${orderValue} (commission: $${commissionAmount})`);
    }
    
    await client.query('COMMIT');
    
    console.log('\n' + '='.repeat(60));
    console.log('✅ Demo data seeded successfully!');
    console.log('='.repeat(60));
    console.log(`\n📊 Summary:`);
    console.log(`  - Products created: ${productCount}`);
    console.log(`  - Affiliate links: ${linkCount}`);
    console.log(`  - Sample clicks: ~${links.rows.length * 30}`);
    console.log(`  - Sample conversions: 15`);
    console.log(`\n🚀 Ready to test!`);
    console.log(`  - Open: frontend/buy-button.html`);
    console.log(`  - Open: frontend/dashboard.html`);
    console.log(`  - API: http://localhost:3000/api/analytics/dashboard\n`);
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Seeding failed:', error.message);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

seedData().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
