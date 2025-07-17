const knex = require('knex');
const dotenv = require('dotenv');

dotenv.config();

const config = {
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'rootpassword',
    database: process.env.DB_NAME || 'pgdesign_dev',
    charset: 'utf8mb4'
  },
  pool: {
    min: 2,
    max: 10
  },
  useNullAsDefault: true
};

const db = knex(config);

// MinIO public URL pattern
const MINIO_PUBLIC_BASE = 'http://localhost:9000/pgdesign-assets';

async function verifyPublicUrls() {
  try {
    console.log('🔍 Verifying all URLs are using public MinIO format...\n');
    
    // Tables and columns with URLs to check
    const urlChecks = [
      { table: 'project_details', column: 'thumbnail_image' },
      { table: 'project_details', column: 'project_images' },
      { table: 'hero_images', column: 'image_url' },
      { table: 'project_sub_categories', column: 'hero_image_url' },
      { table: 'project_categories', column: 'background_image_url' },
      { table: 'image_slider_data', column: 'image_url' },
      { table: 'project_diary_images', column: 'image_url' },
      { table: 'solution_items', column: 'image_url' },
      { table: 'stats_items', column: 'background_image_url' },
      { table: 'stats_items', column: 'icon_url' },
      { table: 'team_members', column: 'image_url' },
      { table: 'testimonials', column: 'avatar_url' },
      { table: 'vision_mission_data', column: 'image_url' },
      { table: 'workflow_tabs', column: 'diagram_url' },
      { table: 'workflow_tabs', column: 'icon_url' },
      { table: 'about_intro_data', column: 'background_image_url' },
      { table: 'about_project_data', column: 'background_image_url' },
      { table: 'board_directors', column: 'image_url' },
      { table: 'commitment_items', column: 'icon_url' },
      { table: 'service_page_hero', column: 'hero_image_url' },
    ];
    
    let totalChecked = 0;
    let totalPublic = 0;
    let totalProblems = 0;
    
    for (const { table, column } of urlChecks) {
      try {
        const result = await db.raw(`
          SELECT 
            COUNT(*) as total,
            SUM(CASE WHEN ${column} LIKE '${MINIO_PUBLIC_BASE}%' THEN 1 ELSE 0 END) as public_urls,
            SUM(CASE WHEN ${column} LIKE '/assets/%' THEN 1 ELSE 0 END) as relative_urls,
            SUM(CASE WHEN ${column} IS NOT NULL AND ${column} != '' AND ${column} NOT LIKE '${MINIO_PUBLIC_BASE}%' AND ${column} NOT LIKE 'http%' THEN 1 ELSE 0 END) as problem_urls
          FROM ${table} 
          WHERE ${column} IS NOT NULL AND ${column} != ''
        `);
        
        const stats = result[0][0];
        if (stats.total > 0) {
          totalChecked += stats.total;
          totalPublic += stats.public_urls;
          totalProblems += stats.problem_urls;
          
          const status = stats.problem_urls > 0 ? '❌' : stats.public_urls === stats.total ? '✅' : '⚠️';
          console.log(`${status} ${table}.${column}: ${stats.public_urls}/${stats.total} public URLs`);
          
          if (stats.relative_urls > 0) {
            console.log(`   🔧 ${stats.relative_urls} relative URLs that may need conversion`);
          }
          if (stats.problem_urls > 0) {
            console.log(`   ❌ ${stats.problem_urls} problematic URLs found`);
          }
        }
      } catch (error) {
        console.log(`⚠️  Error checking ${table}.${column}: ${error.message}`);
      }
    }
    
    console.log('\n📊 Summary:');
    console.log(`Total URLs checked: ${totalChecked}`);
    console.log(`Public MinIO URLs: ${totalPublic}`);
    console.log(`Problem URLs: ${totalProblems}`);
    
    if (totalProblems === 0) {
      console.log('\n🎉 All URLs are using the correct public MinIO format!');
    } else {
      console.log(`\n⚠️  Found ${totalProblems} URLs that need attention.`);
    }
    
    console.log('\n✅ Verification completed!');
    
  } catch (error) {
    console.error('❌ Error during verification:', error);
    throw error;
  }
}

// Run verification
verifyPublicUrls()
  .then(() => {
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Verification failed:', error);
    process.exit(1);
  }); 