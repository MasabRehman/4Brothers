require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function wipeAndSeed() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Disable foreign key checks for truncation if needed, but in Postgres TRUNCATE CASCADE handles it
    console.log('Truncating tables...');
    await client.query(`
      TRUNCATE TABLE 
        order_items, 
        orders, 
        product_images, 
        products, 
        subcategories, 
        categories, 
        brands 
      CASCADE;
    `);

    // Insert new categories
    const newCategories = [
      { name: 'Medicines', slug: 'medicines' },
      { name: 'Groceries', slug: 'groceries' },
      { name: 'Home Needs', slug: 'home-needs' },
      { name: 'Office Needs', slug: 'office-needs' },
      { name: 'Construction', slug: 'construction' }
    ];

    console.log('Inserting new categories...');
    let order = 1;
    for (const cat of newCategories) {
      await client.query(
        `INSERT INTO categories (name, slug, display_order, is_featured, is_active, created_at, updated_at) 
         VALUES ($1, $2, $3, true, true, NOW(), NOW())`,
        [cat.name, cat.slug, order]
      );
      order++;
    }

    await client.query('COMMIT');
    console.log('Successfully wiped old data and seeded new categories!');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error wiping and seeding:', err);
  } finally {
    client.release();
    pool.end();
  }
}

wipeAndSeed();
