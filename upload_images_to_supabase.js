require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const { pool } = require('./src/config/database');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const imagesToUpload = [
  { file: 'warehouse_hq.png', settingKey: 'home_hero_image' },
  { file: 'med_hq.png', settingKey: 'category_med_image' },
  { file: 'groceries_hq.png', settingKey: 'category_groceries_image' },
  { file: 'homeneeds_hq.png', settingKey: 'category_home_image' },
  { file: 'officeneeds_hq.png', settingKey: 'category_office_image' },
  { file: 'construction_hq.png', settingKey: 'category_construction_image' }
];

async function migrateImages() {
  const client = await pool.connect();
  try {
    // 1. Ensure the columns exist in company_settings table
    console.log('Updating database schema...');
    for (const item of imagesToUpload) {
      try {
        await client.query(`ALTER TABLE company_settings ADD COLUMN ${item.settingKey} TEXT;`);
      } catch (err) {
        // Ignore if column already exists
        if (err.code !== '42701') console.log(`Notice for ${item.settingKey}:`, err.message);
      }
    }

    // 2. Upload images to Supabase and update database
    for (const item of imagesToUpload) {
      const filePath = path.join(__dirname, 'client/public', item.file);
      if (!fs.existsSync(filePath)) {
        console.log(`Skipping ${item.file}: File not found.`);
        continue;
      }
      
      const fileBuffer = fs.readFileSync(filePath);
      
      console.log(`Uploading ${item.file}...`);
      const { data, error } = await supabase.storage
        .from('images')
        .upload(item.file, fileBuffer, {
          contentType: 'image/png',
          upsert: true
        });
        
      if (error) {
        console.error(`Failed to upload ${item.file}:`, error.message);
        continue;
      }
      
      const { data: publicUrlData } = supabase.storage.from('images').getPublicUrl(item.file);
      const publicUrl = publicUrlData.publicUrl;
      
      // Update database
      await client.query(`UPDATE company_settings SET ${item.settingKey} = $1`, [publicUrl]);
      console.log(`Updated ${item.settingKey} -> ${publicUrl}`);
    }
    
    console.log('Migration complete!');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    client.release();
    process.exit(0);
  }
}

migrateImages();
