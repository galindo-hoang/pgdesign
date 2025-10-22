#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Mapping từ tên có dấu sang tên không dấu
const folderMappings = {
  'ANH ĐĂNG - PHÚ GIA HƯNG - GÒ VẤP': 'ANH DANG - PHU GIA HUNG - GO VAP',
  'ANH HOÀNG - BÌNH DƯƠNG': 'ANH HOANG - BINH DUONG',
  'ANH TUẤN - CITYLAND PARK HILL': 'ANH TUAN - CITYLAND PARK HILL',
  'ANH TÙNG - CHỊ THU': 'ANH TUNG - CHI THU',
  'CHỊ HÀ - PEGASUITE - QUẬN 8': 'CHI HA - PEGASUITE - QUAN 8',
  'CHỊ PHƯƠNG - OPAL GARDEN': 'CHI PHUONG - OPAL GARDEN',
  'HOÀNG NHI - DIAMOND CENTERY': 'HOANG NHI - DIAMOND CENTERY',
  'Mr.Lượng - Opal Skyline': 'Mr.Luong - Opal Skyline',
  'PICITY Q12': 'PICITY Q12',
  'CHỊ TÚ - LONG AN': 'CHI TU - LONG AN',
  'LONG AN - INDOCHINE': 'LONG AN - INDOCHINE',
  'LONG THÀNH': 'LONG THANH',
  'MS.HƯƠNG': 'MS.HUONG',
  'NHÀ BÈ': 'NHA BE',
  'MOLAR VILLA - QUẬN 9': 'MOLAR VILLA - QUAN 9',
  'SKY LINKED VILLA': 'SKY LINKED VILLA',
  'VILLA SUMMER': 'VILLA SUMMER',
  'THE K COFFEE TEA - THU DUC': 'THE K COFFEE TEA - THU DUC',
  'Ngoc Be Cake - Go Vap': 'Ngoc Be Cake - Go Vap',
  'B COFFEE - HCM': 'B COFFEE - HCM',
  'Bamboo panel - Go Vap': 'Bamboo panel - Go Vap',
  'PERSEFONI OFFICE- QUAN 3': 'PERSEFONI OFFICE- QUAN 3',
  'VAN PHONG 89 - HO BA KIEN': 'VAN PHONG 89 - HO BA KIEN',
  'WEPLOY OFFICE - Quan 1': 'WEPLOY OFFICE - Quan 1',
  '12 xu hướng': '12 xu huong',
  '21+ mẫu': '21+ mau',
  '4-tips-tao-diem-nhan-bep-sang-trong': '4-tips-tao-diem-nhan-bep-sang-trong',
  '6+ tip': '6+ tip',
  'khám phá': 'kham pha',
  'nhà đẹp': 'nha dep',
  'phối màu': 'phoi mau',
  'top 7': 'top 7'
};

async function fixVietnameseFolderNames() {
  console.log('🔧 Fixing Vietnamese folder names...\n');
  
  const basePath = path.resolve(__dirname, '../../src/public/assets');
  let totalRenamed = 0;
  let totalSkipped = 0;
  
  // Process each category
  const categories = ['appartment', 'house-normal', 'village', 'house-business', 'blog'];
  
  for (const category of categories) {
    const categoryPath = path.join(basePath, category);
    
    if (!fs.existsSync(categoryPath)) {
      console.log(`⏭️  Category ${category} does not exist, skipping`);
      continue;
    }
    
    console.log(`📁 Processing category: ${category}`);
    
    const folders = fs.readdirSync(categoryPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    
    for (const folderName of folders) {
      if (folderMappings[folderName]) {
        const oldPath = path.join(categoryPath, folderName);
        const newPath = path.join(categoryPath, folderMappings[folderName]);
        
        try {
          fs.renameSync(oldPath, newPath);
          console.log(`   ✅ Renamed: ${folderName} → ${folderMappings[folderName]}`);
          totalRenamed++;
        } catch (error) {
          console.log(`   ❌ Error renaming ${folderName}: ${error.message}`);
        }
      } else {
        console.log(`   ⏭️  No mapping for: ${folderName}`);
        totalSkipped++;
      }
    }
  }
  
  console.log('\n📊 Summary:');
  console.log(`   Folders renamed: ${totalRenamed}`);
  console.log(`   Folders skipped: ${totalSkipped}`);
  
  console.log('\n✅ Vietnamese folder names fixed!');
}

fixVietnameseFolderNames().catch(console.error);
