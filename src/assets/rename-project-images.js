const fs = require('fs');
const path = require('path');

// Project mapping based on the generated data
const projectMapping = {
  appartment: {
    'PICITY Q12': {
      title: 'Thiết Kế Nội Thất Căn Hộ PICITY Q12',
      clientName: 'Khách hàng PICITY Q12',
      prefix: 'picity-q12'
    },
    'CHỊ PHƯƠNG - OPAL GARDEN': {
      title: 'Thiết Kế Nội Thất Opal Garden',
      clientName: 'Chị Phương',
      prefix: 'opal-garden'
    },
    'Mr.Lượng - Opal Skyline': {
      title: 'Thiết Kế Nội Thất Opal Skyline',
      clientName: 'Mr. Lượng',
      prefix: 'opal-skyline'
    },
    'ANH ĐĂNG - PHÚ GIA HƯNG - GÒ VẤP': {
      title: 'Thiết Kế Nội Thất Phú Gia Hưng',
      clientName: 'Anh Đăng',
      prefix: 'phu-gia-hung'
    },
    'HOÀNG NHI - DIAMOND CENTERY': {
      title: 'Thiết Kế Nội Thất Diamond Center',
      clientName: 'Hoàng Nhi',
      prefix: 'diamond-center'
    },
    'ANH TUẤN - CITYLAND PARK HILL': {
      title: 'Thiết Kế Nội Thất Cityland Park Hill',
      clientName: 'Anh Tuấn',
      prefix: 'cityland-park-hill'
    },
    'ANH HOÀNG - BÌNH DƯƠNG': {
      title: 'Thiết Kế Nội Thất Bình Dương',
      clientName: 'Anh Hoàng',
      prefix: 'binh-duong'
    },
    'ANH TÙNG - CHỊ THU': {
      title: 'Thiết Kế Nội Thất Căn Hộ Gia Đình',
      clientName: 'Anh Tùng & Chị Thu',
      prefix: 'can-ho-gia-dinh'
    },
    'CHỊ HÀ - PEGASUITE - QUẬN 8': {
      title: 'Thiết Kế Nội Thất Pegasuite',
      clientName: 'Chị Hà',
      prefix: 'pegasuite'
    }
  },
  'house-normal': {
    'CHỊ TÚ - LONG AN': {
      title: 'Thiết Kế Nhà Phố Long An',
      clientName: 'Chị Tú',
      prefix: 'nha-pho-long-an'
    },
    'NHÀ BÈ': {
      title: 'Thiết Kế Nhà Phố Nhà Bè',
      clientName: 'Khách hàng Nhà Bè',
      prefix: 'nha-pho-nha-be'
    },
    'LONG AN - INDOCHINE': {
      title: 'Thiết Kế Nhà Phố Indochine',
      clientName: 'Khách hàng Indochine',
      prefix: 'nha-pho-indochine'
    },
    'MS.HƯƠNG': {
      title: 'Thiết Kế Nhà Phố Ms. Hương',
      clientName: 'Ms. Hương',
      prefix: 'nha-pho-ms-huong'
    },
    'LONG THÀNH': {
      title: 'Thiết Kế Nhà Phố Long Thành',
      clientName: 'Khách hàng Long Thành',
      prefix: 'nha-pho-long-thanh'
    }
  },
  village: {
    'MOLAR VILLA - QUẬN 9': {
      title: 'Thiết Kế Molar Villa',
      clientName: 'Khách hàng Molar Villa',
      prefix: 'molar-villa'
    },
    'SKY LINKED VILLA': {
      title: 'Thiết Kế Sky Linked Villa',
      clientName: 'Khách hàng Sky Linked Villa',
      prefix: 'sky-linked-villa'
    },
    'VILLA SUMMER': {
      title: 'Thiết Kế Villa Summer',
      clientName: 'Khách hàng Villa Summer',
      prefix: 'villa-summer'
    }
  }
};

// Function to sanitize filename
function sanitizeFilename(filename) {
  return filename
    .replace(/[^a-zA-Z0-9\s\-_\.]/g, '') // Remove special characters except spaces, hyphens, underscores, dots
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .toLowerCase();
}

// Function to get file extension
function getFileExtension(filename) {
  return path.extname(filename);
}

// Function to rename images in a folder
function renameImagesInFolder(category, folderName, projectInfo) {
  const folderPath = path.join(__dirname, category, folderName);
  
  if (!fs.existsSync(folderPath)) {
    console.log(`❌ Folder not found: ${folderPath}`);
    return;
  }

  console.log(`\n📁 Processing: ${category}/${folderName}`);
  console.log(`   Project: ${projectInfo.title}`);
  console.log(`   Client: ${projectInfo.clientName}`);
  console.log(`   Prefix: ${projectInfo.prefix}`);

  const files = fs.readdirSync(folderPath);
  const imageFiles = files.filter(file => {
    const ext = getFileExtension(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
  });

  if (imageFiles.length === 0) {
    console.log(`   ⚠️  No image files found`);
    return;
  }

  // Sort files to maintain order
  imageFiles.sort((a, b) => {
    // Extract numbers from filenames for proper sorting
    const numA = parseInt(a.match(/\d+/)?.[0] || '0');
    const numB = parseInt(b.match(/\d+/)?.[0] || '0');
    return numA - numB;
  });

  let renamedCount = 0;
  imageFiles.forEach((oldName, index) => {
    const ext = getFileExtension(oldName);
    const newName = `${projectInfo.prefix}-${String(index + 1).padStart(2, '0')}${ext}`;
    
    const oldPath = path.join(folderPath, oldName);
    const newPath = path.join(folderPath, newName);
    
    try {
      fs.renameSync(oldPath, newPath);
      console.log(`   ✅ ${oldName} → ${newName}`);
      renamedCount++;
    } catch (error) {
      console.log(`   ❌ Error renaming ${oldName}: ${error.message}`);
    }
  });

  console.log(`   📊 Renamed ${renamedCount}/${imageFiles.length} images`);
  return renamedCount;
}

// Main function
function main() {
  console.log('🖼️  Project Image Renaming Script');
  console.log('=====================================');
  
  let totalRenamed = 0;
  let totalProjects = 0;

  // Process each category
  Object.entries(projectMapping).forEach(([category, projects]) => {
    console.log(`\n🏗️  Processing category: ${category.toUpperCase()}`);
    console.log('─'.repeat(50));
    
    Object.entries(projects).forEach(([folderName, projectInfo]) => {
      const renamed = renameImagesInFolder(category, folderName, projectInfo);
      if (renamed !== undefined) {
        totalRenamed += renamed;
        totalProjects++;
      }
    });
  });

  console.log('\n🎉 Renaming Complete!');
  console.log('=====================');
  console.log(`📊 Total projects processed: ${totalProjects}`);
  console.log(`🖼️  Total images renamed: ${totalRenamed}`);
  
  console.log('\n📝 Next Steps:');
  console.log('1. Update the image paths in your project data');
  console.log('2. Test the website to ensure images load correctly');
  console.log('3. Update any hardcoded image references');
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { projectMapping, renameImagesInFolder }; 