const { Client } = require('minio');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// MinIO configuration
const minioClient = new Client({
  endPoint: process.env.MINIO_ENDPOINT || 'localhost',
  port: parseInt(process.env.MINIO_PORT || '9000'),
  useSSL: process.env.MINIO_USE_SSL === 'true',
  accessKey: process.env.MINIO_ACCESS_KEY || 'minioadmin',
  secretKey: process.env.MINIO_SECRET_KEY || 'minioadmin',
});

const bucketName = process.env.MINIO_BUCKET_NAME || 'pgdesign-assets';

// Project mapping with correct folder names
const projectMapping = {
  appartment: {
    'PICITY Q12': {
      title: 'Thiết Kế Nội Thất Căn Hộ PICITY Q12',
      clientName: 'Khách hàng PICITY Q12',
      folderName: 'PICITY Q12',
      prefix: 'picity-q12',
      imageCount: 14
    },
    'CHỊ PHƯƠNG - OPAL GARDEN': {
      title: 'Thiết Kế Nội Thất Opal Garden',
      clientName: 'Chị Phương',
      folderName: 'CHỊ PHƯƠNG - OPAL GARDEN',
      prefix: 'opal-garden',
      imageCount: 12
    },
    'Mr.Lượng - Opal Skyline': {
      title: 'Thiết Kế Nội Thất Opal Skyline',
      clientName: 'Mr. Lượng',
      folderName: 'Mr.Lượng - Opal Skyline',
      prefix: 'opal-skyline',
      imageCount: 12
    },
    'ANH ĐĂNG - PHÚ GIA HƯNG - GÒ VẤP': {
      title: 'Thiết Kế Nội Thất Phú Gia Hưng',
      clientName: 'Anh Đăng',
      folderName: 'ANH ĐĂNG - PHÚ GIA HƯNG - GÒ VẤP',
      prefix: 'phu-gia-hung',
      imageCount: 12
    },
    'HOÀNG NHI - DIAMOND CENTERY': {
      title: 'Thiết Kế Nội Thất Diamond Center',
      clientName: 'Hoàng Nhi',
      folderName: 'HOÀNG NHI - DIAMOND CENTERY',
      prefix: 'diamond-center',
      imageCount: 21
    },
    'ANH TUẤN - CITYLAND PARK HILL': {
      title: 'Thiết Kế Nội Thất Cityland Park Hill',
      clientName: 'Anh Tuấn',
      folderName: 'ANH TUẤN - CITYLAND PARK HILL',
      prefix: 'cityland-park-hill',
      imageCount: 19
    },
    'ANH HOÀNG - BÌNH DƯƠNG': {
      title: 'Thiết Kế Nội Thất Bình Dương',
      clientName: 'Anh Hoàng',
      folderName: 'ANH HOÀNG - BÌNH DƯƠNG',
      prefix: 'binh-duong',
      imageCount: 19
    },
    'ANH TÙNG - CHỊ THU': {
      title: 'Thiết Kế Nội Thất Căn Hộ Gia Đình',
      clientName: 'Anh Tùng & Chị Thu',
      folderName: 'ANH TÙNG - CHỊ THU',
      prefix: 'can-ho-gia-dinh',
      imageCount: 19
    },
    'CHỊ HÀ - PEGASUITE - QUẬN 8': {
      title: 'Thiết Kế Nội Thất Pegasuite',
      clientName: 'Chị Hà',
      folderName: 'CHỊ HÀ - PEGASUITE - QUẬN 8',
      prefix: 'pegasuite',
      imageCount: 9
    }
  },
  'house-normal': {
    'CHỊ TÚ - LONG AN': {
      title: 'Thiết Kế Nhà Phố Long An',
      clientName: 'Chị Tú',
      folderName: 'CHỊ TÚ - LONG AN',
      prefix: 'nha-pho-long-an',
      imageCount: 9
    },
    'NHÀ BÈ': {
      title: 'Thiết Kế Nhà Phố Nhà Bè',
      clientName: 'Khách hàng Nhà Bè',
      folderName: 'NHÀ BÈ',
      prefix: 'nha-pho-nha-be',
      imageCount: 15
    },
    'LONG AN - INDOCHINE': {
      title: 'Thiết Kế Nhà Phố Indochine',
      clientName: 'Khách hàng Indochine',
      folderName: 'LONG AN - INDOCHINE',
      prefix: 'nha-pho-indochine',
      imageCount: 6
    },
    'MS.HƯƠNG': {
      title: 'Thiết Kế Nhà Phố Ms. Hương',
      clientName: 'Ms. Hương',
      folderName: 'MS.HƯƠNG',
      prefix: 'nha-pho-ms-huong',
      imageCount: 12
    },
    'LONG THÀNH': {
      title: 'Thiết Kế Nhà Phố Long Thành',
      clientName: 'Khách hàng Long Thành',
      folderName: 'LONG THÀNH',
      prefix: 'nha-pho-long-thanh',
      imageCount: 13
    }
  },
  village: {
    'MOLAR VILLA - QUẬN 9': {
      title: 'Thiết Kế Molar Villa',
      clientName: 'Khách hàng Molar Villa',
      folderName: 'MOLAR VILLA - QUẬN 9',
      prefix: 'molar-villa',
      imageCount: 7
    },
    'SKY LINKED VILLA': {
      title: 'Thiết Kế Sky Linked Villa',
      clientName: 'Khách hàng Sky Linked Villa',
      folderName: 'SKY LINKED VILLA',
      prefix: 'sky-linked-villa',
      imageCount: 23
    },
    'VILLA SUMMER': {
      title: 'Thiết Kế Villa Summer',
      clientName: 'Khách hàng Villa Summer',
      folderName: 'VILLA SUMMER',
      prefix: 'villa-summer',
      imageCount: 9
    }
  }
};

async function ensureBucketExists() {
  try {
    const exists = await minioClient.bucketExists(bucketName);
    if (!exists) {
      console.log(`📦 Creating bucket: ${bucketName}`);
      await minioClient.makeBucket(bucketName);
      console.log(`✅ Bucket ${bucketName} created successfully`);
    } else {
      console.log(`✅ Bucket ${bucketName} already exists`);
    }
  } catch (error) {
    console.error('❌ Error ensuring bucket exists:', error);
    throw error;
  }
}

async function uploadImage(localPath, objectName) {
  try {
    const fileStream = fs.createReadStream(localPath);
    const stat = await fs.promises.stat(localPath);
    
    await minioClient.putObject(bucketName, objectName, fileStream, stat.size, {
      'Content-Type': getContentType(localPath)
    });
    
    return true;
  } catch (error) {
    console.error(`❌ Error uploading ${objectName}:`, error.message);
    return false;
  }
}

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.png':
    case '.jpeg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    case '.gif':
      return 'image/gif';
    default:
      return 'application/octet-stream';
  }
}

async function uploadProjectImages() {
  console.log('🚀 Starting project images upload to MinIO...');
  
  const projectImagesPath = path.join(__dirname, '..', '..', 'src', 'assets');
  let totalUploaded = 0;
  let totalFailed = 0;
  
  for (const [category, projects] of Object.entries(projectMapping)) {
    console.log(`\n📁 Uploading ${category} projects...`);
    
    for (const [folderName, projectInfo] of Object.entries(projects)) {
      console.log(`   📂 Processing ${projectInfo.title}...`);
      
      const localProjectPath = path.join(projectImagesPath, category, folderName);
      
      if (!fs.existsSync(localProjectPath)) {
        console.log(`      ⚠️  Project folder not found: ${localProjectPath}`);
        continue;
      }
      
      const files = fs.readdirSync(localProjectPath);
      let projectUploaded = 0;
      let projectFailed = 0;
      
      for (const file of files) {
        if (/\.(jpg|jpeg|png|gif)$/i.test(file)) {
          const localFilePath = path.join(localProjectPath, file);
          const objectName = `${category}/${folderName}/${file}`;
          
          console.log(`      📤 Uploading ${file}...`);
          
          const success = await uploadImage(localFilePath, objectName);
          
          if (success) {
            projectUploaded++;
            totalUploaded++;
            console.log(`         ✅ Uploaded: ${objectName}`);
          } else {
            projectFailed++;
            totalFailed++;
          }
        }
      }
      
      console.log(`      📊 ${projectInfo.title}: ${projectUploaded} uploaded, ${projectFailed} failed`);
    }
  }
  
  console.log(`\n🎉 Upload Complete!`);
  console.log(`📊 Total: ${totalUploaded} uploaded, ${totalFailed} failed`);
  console.log(`🔗 Images are now accessible at: http://localhost:9000/${bucketName}/[category]/[project-folder]/[image-name]`);
  
  return { totalUploaded, totalFailed };
}

async function main() {
  try {
    await ensureBucketExists();
    await uploadProjectImages();
  } catch (error) {
    console.error('💥 Process failed:', error);
    process.exit(1);
  }
}

main(); 