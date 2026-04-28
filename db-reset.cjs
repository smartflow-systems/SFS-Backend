// Drops all SFS-Backend tables so db:push can recreate them cleanly.
// Safe to run — only use when there is no real data.
const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function run() {
  const client = await pool.connect();
  try {
    await client.query('DROP TABLE IF EXISTS invitations CASCADE');
    await client.query('DROP TABLE IF EXISTS subscriptions CASCADE');
    await client.query('DROP TABLE IF EXISTS users CASCADE');
    await client.query('DROP TABLE IF EXISTS products CASCADE');
    await client.query('DROP TABLE IF EXISTS orgs CASCADE');
    console.log('All tables dropped. Run: npm run db:push');
  } finally {
    client.release();
    pool.end();
  }
}

run().catch(console.error);
