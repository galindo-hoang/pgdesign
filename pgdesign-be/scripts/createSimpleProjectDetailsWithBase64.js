const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

// Simple 1x1 transparent placeholder base64 image
const placeholderBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==';

async function createSimpleProjects() {
  try {
    console.log('🚀 Creating simple project details with base64 placeholders...');
    
    // Check existing project_categories
    const categories = await db('project_categories').select('id', 'category_id', 'title').limit(5);
    console.log('📋 Available categories:', categories);
    
    // Clear existing project_details
    await db('project_details').del();
    console.log('🗑️  Cleared existing project details');
    
    // Use valid category IDs or create without foreign key constraint
    const sampleProjects = [
      {
        project_id: 'project-001',
        title: 'Nhà Phố Hiện Đại 3 Tầng',
        client_name: 'Anh Nguyễn Văn A',
        area: '120m²',
        construction_date: '2023-06-15',
        address: '123 Đường Nguyễn Văn Cừ, Quận 5, TP.HCM',
        description: 'Thiết kế nhà phố hiện đại với không gian mở và ánh sáng tự nhiên',
        category: 'house-normal',
        // Use first available category ID or null
        project_category_id: categories.length > 0 ? categories[0].id : null,
        style: 'Hiện đại',
        thumbnail_image_blob: placeholderBase64,
        html_content: `
          <div style="padding: 20px; line-height: 1.6;">
            <h2 style="color: #2c3e50; margin-bottom: 1rem;">Nhà Phố Hiện Đại 3 Tầng</h2>
            <p style="color: #333; margin-bottom: 1rem;">
              Đây là dự án nhà phố hiện đại được thiết kế với phong cách tối giản nhưng không kém phần sang trọng. 
              Công trình được hoàn thành với chất lượng cao và sự hài lòng của khách hàng.
            </p>
            
            <h3 style="color: #34495e; margin-top: 2rem; margin-bottom: 1rem;">Đặc điểm nổi bật</h3>
            <ul style="color: #555; margin-bottom: 2rem;">
              <li>Thiết kế mặt tiền hiện đại với các đường nét sạch sẽ</li>
              <li>Tối ưu hóa ánh sáng tự nhiên cho toàn bộ không gian</li>
              <li>Sử dụng vật liệu cao cấp và thân thiện với môi trường</li>
              <li>Bố trí không gian thông minh, tận dụng tối đa diện tích</li>
            </ul>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin: 2rem 0;">
              <img src="${placeholderBase64}" alt="Mặt tiền nhà" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px;">
              <img src="${placeholderBase64}" alt="Phòng khách" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px;">
            </div>
            
            <p style="color: #333; font-style: italic; margin-top: 2rem;">
              Dự án được hoàn thành với sự hài lòng cao của khách hàng và đạt chất lượng xuất sắc.
            </p>
          </div>
        `,
        project_images_blob: JSON.stringify([placeholderBase64, placeholderBase64, placeholderBase64]),
        project_status: 'Hoàn thành',
        completion_date: '2023-12-20',
        architect_name: 'KTS. Lê Văn B',
        contractor_name: 'Công ty TNHH Xây dựng PG Design',
        meta_title: 'Nhà Phố Hiện Đại 3 Tầng - Dự án PG Design',
        meta_description: 'Khám phá dự án nhà phố hiện đại 3 tầng với thiết kế tinh tế và không gian sống tối ưu.',
        tags: JSON.stringify(['nhà phố', 'hiện đại', '3 tầng', 'thiết kế', 'xây dựng']),
        is_active: true,
        is_on_homepage: true
      },
      
      {
        project_id: 'project-002', 
        title: 'Biệt Thự 2 Tầng Sang Trọng',
        client_name: 'Chị Trần Thị B',
        area: '200m²',
        construction_date: '2023-08-01',
        address: '456 Đường Lê Văn Sỹ, Quận 3, TP.HCM', 
        description: 'Thiết kế biệt thự sang trọng với kiến trúc cổ điển',
        category: 'house-full',
        project_category_id: categories.length > 1 ? categories[1].id : (categories.length > 0 ? categories[0].id : null),
        style: 'Cổ điển',
        thumbnail_image_blob: placeholderBase64,
        html_content: `
          <div style="padding: 20px; line-height: 1.6;">
            <h2 style="color: #2c3e50; margin-bottom: 1rem;">Biệt Thự 2 Tầng Sang Trọng</h2>
            <p style="color: #333; margin-bottom: 1rem;">
              Biệt thự 2 tầng với thiết kế sang trọng, kết hợp giữa kiến trúc cổ điển và hiện đại.
            </p>
            
            <h3 style="color: #34495e; margin-top: 2rem; margin-bottom: 1rem;">Đặc điểm thiết kế</h3>
            <ul style="color: #555; margin-bottom: 2rem;">
              <li>Kiến trúc cổ điển Châu Âu</li>
              <li>Sân vườn rộng rãi</li>
              <li>Nội thất cao cấp</li>
              <li>Hệ thống smart home</li>
            </ul>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin: 2rem 0;">
              <img src="${placeholderBase64}" alt="Biệt thự" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px;">
              <img src="${placeholderBase64}" alt="Sân vườn" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px;">
            </div>
          </div>
        `,
        project_images_blob: JSON.stringify([placeholderBase64, placeholderBase64]),
        project_status: 'Hoàn thành',
        completion_date: '2024-01-15',
        architect_name: 'KTS. Nguyễn Văn C',
        contractor_name: 'Công ty TNHH Xây dựng PG Design',
        meta_title: 'Biệt Thự 2 Tầng Sang Trọng - Dự án PG Design',
        meta_description: 'Khám phá biệt thự 2 tầng với thiết kế sang trọng và kiến trúc cổ điển.',
        tags: JSON.stringify(['biệt thư', 'cổ điển', '2 tầng', 'sang trọng']),
        is_active: true,
        is_on_homepage: true
      }
    ];
    
    // If no categories exist, remove the foreign key constraint temporarily
    if (categories.length === 0) {
      console.log('⚠️  No categories found. Creating projects without category constraint...');
      // Remove project_category_id from all projects
      sampleProjects.forEach(project => {
        delete project.project_category_id;
      });
    }
    
    // Insert sample data
    for (const project of sampleProjects) {
      await db('project_details').insert(project);
      console.log(`✅ Created project: ${project.project_id} - ${project.title}`);
    }
    
    console.log(`\n🎉 Successfully created ${sampleProjects.length} sample projects with base64 placeholders!`);
    
    // Show summary
    const count = await db('project_details').count('* as total').first();
    console.log(`📊 Total projects in database: ${count.total}`);
    
    // Show sample data
    const samples = await db('project_details')
      .select('id', 'project_id', 'title', 'thumbnail_image_blob')
      .limit(2);
      
    console.log('\n📋 Sample data:');
    samples.forEach(project => {
      console.log(`   • ${project.project_id}: ${project.title}`);
      console.log(`     Thumbnail: ${project.thumbnail_image_blob ? 'HAS BASE64 DATA' : 'NO DATA'}`);
    });
    
  } catch (error) {
    console.error('❌ Error creating sample data:', error);
  } finally {
    await db.destroy();
  }
}

createSimpleProjects();

