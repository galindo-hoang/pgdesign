const fs = require('fs');
const path = require('path');
const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

/**
 * Convert a local image file to base64 data URL
 */
function imageToBase64(imagePath) {
  try {
    // Try to find the image in various locations
    const possiblePaths = [
      path.join(__dirname, '../../../public/assets', imagePath),
      path.join(__dirname, '../../../public', imagePath),
      path.join(__dirname, '../../../src/assets', imagePath),
      path.join(__dirname, '../../../build/assets', imagePath)
    ];
    
    let fullPath = null;
    for (const testPath of possiblePaths) {
      if (fs.existsSync(testPath)) {
        fullPath = testPath;
        break;
      }
    }
    
    if (!fullPath) {
      console.log(`⚠️  Image not found: ${imagePath}`);
      // Return a default placeholder base64 image (1x1 pixel transparent PNG)
      return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==';
    }
    
    const fileBuffer = fs.readFileSync(fullPath);
    const fileExtension = path.extname(fullPath).toLowerCase();
    
    let mimeType = 'image/jpeg';
    if (fileExtension === '.png') mimeType = 'image/png';
    else if (fileExtension === '.gif') mimeType = 'image/gif';
    else if (fileExtension === '.webp') mimeType = 'image/webp';
    
    const base64String = fileBuffer.toString('base64');
    console.log(`✅ Converted image: ${imagePath} (${(fileBuffer.length / 1024).toFixed(1)}KB)`);
    return `data:${mimeType};base64,${base64String}`;
  } catch (error) {
    console.error(`❌ Error converting ${imagePath}:`, error.message);
    // Return placeholder
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==';
  }
}

/**
 * Sample project details data with base64 images
 */
async function createSampleData() {
  try {
    console.log('🚀 Creating sample project details with base64 images...');
    
    // Clear existing data
    await db('project_details').del();
    console.log('🗑️  Cleared existing project details');
    
    // Sample images - using common asset paths
    const sampleImages = [
      'images/diary-image-1.jpg',
      'images/diary-image-2.jpg', 
      'images/diary-image-3.jpg',
      'images/diary-image-4.jpg'
    ];
    
    // Convert sample images to base64
    const base64Images = sampleImages.map(imagePath => imageToBase64(imagePath));
    
    // Sample project data
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
        project_category_id: 1,
        style: 'Hiện đại',
        thumbnail_image_blob: base64Images[0],
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
              <img src="${base64Images[0]}" alt="Mặt tiền nhà" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px;">
              <img src="${base64Images[1]}" alt="Phòng khách" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px;">
            </div>
            
            <p style="color: #333; font-style: italic; margin-top: 2rem;">
              Dự án được hoàn thành với sự hài lòng cao của khách hàng và đạt chất lượng xuất sắc.
            </p>
          </div>
        `,
        project_images_blob: JSON.stringify([base64Images[0], base64Images[1], base64Images[2]]),
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
        project_category_id: 2,
        style: 'Cổ điển',
        thumbnail_image_blob: base64Images[1],
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
              <img src="${base64Images[1]}" alt="Biệt thự" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px;">
              <img src="${base64Images[2]}" alt="Sân vườn" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px;">
            </div>
          </div>
        `,
        project_images_blob: JSON.stringify([base64Images[1], base64Images[2], base64Images[3]]),
        project_status: 'Hoàn thành',
        completion_date: '2024-01-15',
        architect_name: 'KTS. Nguyễn Văn C',
        contractor_name: 'Công ty TNHH Xây dựng PG Design',
        meta_title: 'Biệt Thự 2 Tầng Sang Trọng - Dự án PG Design',
        meta_description: 'Khám phá biệt thự 2 tầng với thiết kế sang trọng và kiến trúc cổ điển.',
        tags: JSON.stringify(['biệt thư', 'cổ điển', '2 tầng', 'sang trọng']),
        is_active: true,
        is_on_homepage: true
      },
      
      {
        project_id: 'project-003',
        title: 'Căn Hộ Duplex Hiện Đại',
        client_name: 'Anh Lê Văn C',
        area: '150m²', 
        construction_date: '2023-09-15',
        address: '789 Đường Nguyễn Hue, Quận 1, TP.HCM',
        description: 'Căn hộ duplex với thiết kế nội thất hiện đại',
        category: 'apartment',
        project_category_id: 3,
        style: 'Hiện đại',
        thumbnail_image_blob: base64Images[2],
        html_content: `
          <div style="padding: 20px; line-height: 1.6;">
            <h2 style="color: #2c3e50; margin-bottom: 1rem;">Căn Hộ Duplex Hiện Đại</h2>
            <p style="color: #333; margin-bottom: 1rem;">
              Căn hộ duplex với thiết kế nội thất hiện đại, tận dụng tối đa không gian sống.
            </p>
            
            <img src="${base64Images[2]}" alt="Căn hộ duplex" style="width: 100%; height: 300px; object-fit: cover; border-radius: 8px; margin: 2rem 0;">
            
            <p style="color: #333; margin-top: 2rem;">
              Thiết kế thông minh với không gian mở và ánh sáng tự nhiên.
            </p>
          </div>
        `,
        project_images_blob: JSON.stringify([base64Images[2], base64Images[3]]),
        project_status: 'Hoàn thành',
        completion_date: '2024-02-10',
        architect_name: 'KTS. Phạm Thị D',
        contractor_name: 'Công ty TNHH Xây dựng PG Design',
        meta_title: 'Căn Hộ Duplex Hiện Đại - Dự án PG Design',
        meta_description: 'Căn hộ duplex với thiết kế nội thất hiện đại tại Quận 1.',
        tags: JSON.stringify(['căn hộ', 'duplex', 'hiện đại', 'nội thất']),
        is_active: true,
        is_on_homepage: false
      }
    ];
    
    // Insert sample data
    for (const project of sampleProjects) {
      await db('project_details').insert(project);
      console.log(`✅ Created project: ${project.project_id} - ${project.title}`);
    }
    
    console.log(`\n🎉 Successfully created ${sampleProjects.length} sample projects with base64 images!`);
    
    // Show summary
    const count = await db('project_details').count('* as total').first();
    console.log(`📊 Total projects in database: ${count.total}`);
    
  } catch (error) {
    console.error('❌ Error creating sample data:', error);
  } finally {
    await db.destroy();
  }
}

createSampleData();

