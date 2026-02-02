const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const DB_PATH = path.join(__dirname, '../database/consulting.db');
const SCHEMA_PATH = path.join(__dirname, '../database/schema.sql');

// Initialize database
function initializeDatabase() {
  const db = new Database(DB_PATH);
  
  // Enable foreign keys
  db.pragma('foreign_keys = ON');
  
  // Read and execute schema
  if (fs.existsSync(SCHEMA_PATH)) {
    const schema = fs.readFileSync(SCHEMA_PATH, 'utf8');
    db.exec(schema);
    console.log('✅ Database schema initialized');
  } else {
    console.warn('⚠️  Schema file not found:', SCHEMA_PATH);
  }
  
  return db;
}

// Get database instance
function getDatabase() {
  if (!fs.existsSync(DB_PATH)) {
    return initializeDatabase();
  }
  const db = new Database(DB_PATH);
  db.pragma('foreign_keys = ON');
  return db;
}

module.exports = {
  initializeDatabase,
  getDatabase
};
