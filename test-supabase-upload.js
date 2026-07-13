require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

async function testUpload() {
  const filePath = path.join(__dirname, 'client/public/warehouse_hq.png');
  const fileBuffer = fs.readFileSync(filePath);
  
  const { data, error } = await supabase.storage
    .from('images')
    .upload('warehouse_hq.png', fileBuffer, {
      contentType: 'image/png',
      upsert: true
    });
    
  if (error) {
    console.error('Upload failed:', error.message);
  } else {
    console.log('Upload success:', data);
    const { data: publicUrl } = supabase.storage.from('images').getPublicUrl('warehouse_hq.png');
    console.log('Public URL:', publicUrl.publicUrl);
  }
}

testUpload();
