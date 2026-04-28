const { Pool } = require('pg');
const { execSync } = require('child_process');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function run() {
  const client = await pool.connect();
  try {
    console.log('Dropping all tables...');
    await client.query('DROP TABLE IF EXISTS invitations CASCADE');
    await client.query('DROP TABLE IF EXISTS subscriptions CASCADE');
    await client.query('DROP TABLE IF EXISTS users CASCADE');
    await client.query('DROP TABLE IF EXISTS products CASCADE');
    await client.query('DROP TABLE IF EXISTS orgs CASCADE');
    console.log('Done. Recreating schema...');
  } finally {
    client.release();
    await pool.end();
  }

  execSync('npm run db:push', { stdio: 'inherit' });
  console.log('\nAll done — run: npm run dev');
}

run().catch(console.error);
