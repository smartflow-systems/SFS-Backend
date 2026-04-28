// Raw DB check — run with: DATABASE_URL=... node db-check.cjs
const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function run() {
  const client = await pool.connect();
  try {
    // List all tables
    const tables = await client.query(`
      SELECT table_name FROM information_schema.tables
      WHERE table_schema = 'public' ORDER BY table_name
    `);
    console.log('Tables in DB:', tables.rows.map(r => r.table_name));

    // Try inserting a test org
    const insert = await client.query(`
      INSERT INTO orgs (name, slug, plan)
      VALUES ('Test Org', 'test-org-debug', 'free')
      RETURNING *
    `);
    console.log('Insert orgs OK:', insert.rows[0]);

    // Clean up
    await client.query(`DELETE FROM orgs WHERE slug = 'test-org-debug'`);
    console.log('Cleanup done');
  } catch (err) {
    console.error('DB Error:', err.message);
    console.error('Code:', err.code);
  } finally {
    client.release();
    pool.end();
  }
}

run();
