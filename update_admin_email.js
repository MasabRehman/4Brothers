require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function updateAdmin() {
  try {
    const res = await pool.query(`UPDATE admins SET email = $1 WHERE email = $2`, ['admin@4bros.com', 'admin@virktools.com']);
    console.log(`Updated ${res.rowCount} admin record(s) to admin@4bros.com`);
  } catch (err) {
    console.error('Error updating admin:', err);
  } finally {
    pool.end();
  }
}

updateAdmin();
