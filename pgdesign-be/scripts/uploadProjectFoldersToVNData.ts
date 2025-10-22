#!/usr/bin/env ts-node

import * as dotenv from 'dotenv';
import * as knex from 'knex';
import * as fs from 'fs';
import * as path from 'path';
import { VNDataS3FileUploadService } from '../src/services/vnDataS3FileUploadService';

dotenv.config();

// Use explicit database configuration
const db = knex.default({
  client: 'mysql2',
  connection: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'rootpassword',
    database: 'pgdesign_dev',
    charset: 'utf8mb4'
  },
  pool: {
    min: 2,
    max: 10
  },
  useNullAsDefault: true
});

// VNData S3 configuration
const vnDataConfig = {
  endpoint: process.env.VNDATA_S3_ENDPOINT || 'https://s3-hcm-r2.s3cloud.vn',
  bucketName: 'projectpage', // Target bucket
  region: process.env.VNDATA_REGION || 'hcm-r2',
  accessKey: process.env.VNDATA_ACCESS_KEY || 'KS1KMPXYY4CEPQ5RW5BN',
  secretKey: process.env.VNDATA_SECRET_KEY || 'ErdmFIm4R8T2WzU9QvUFyPb0Y1HUREdIxTBo8DEK',
  useSSL: true
};

const uploadService = new VNDataS3FileUploadService(vnDataConfig);

// Base URL for VNData S3
const VNDATA_BASE_URL = 'https://s3-hcm-r2.s3cloud.vn/projectpage';

// Categories to upload
const CATEGORIES = ['appartment', 'house-business', 'house-normal', 'village'];

// Helper function to get content type
function getContentType(fileName: string): string {
  const ext = path.extname(fileName).toLowerCase();
  switch (ext) {
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    case '.gif':
      return 'image/gif';
    case '.webp':
      return 'image/webp';
    case '.svg':
      return 'image/svg+xml';
    default:
      return 'application/octet-stream';
  }
}

// Helper function to upload file to VNData S3
async function uploadFileToVNData(localPath: string, s3Key: string): Promise<string> {
  try {
    const fileBuffer = fs.readFileSync(localPath);
    const contentType = getContentType(localPath);
    
    // Create a file object compatible with VNDataS3FileUploadService
    const fileObj = {
      buffer: fileBuffer,
      originalname: path.basename(localPath),
      mimetype: contentType,
      size: fileBuffer.length
    } as any;

    // Use the uploadImage method with custom folder structure
    const folder = s3Key.substring(0, s3Key.lastIndexOf('/'));
    const fileName = path.basename(s3Key);
    
    // Temporarily modify the service to use custom key
    const originalUploadImage = uploadService.uploadImage.bind(uploadService);
    
    // Override uploadImage to use custom key
    uploadService.uploadImage = async (file: any, folderPath: string = 'images') => {
      const objectName = s3Key;
      
      try {
        let processedBuffer = file.buffer;
        let actualContentType = file.mimetype;

        // Process image if it's not SVG
        if (file.mimetype !== 'image/svg+xml') {
          const sharp = require('sharp');
          const sharpInstance = sharp(file.buffer);
          const metadata = await sharpInstance.metadata();

          // Resize if image is too large
          if (metadata.width && metadata.width > 1920) {
            console.log(`🔄 Resizing image from ${metadata.width}px to 1920px`);
            
            let resized = sharpInstance.resize(1920, null, {
              withoutEnlargement: true,
              fit: 'inside'
            });

            switch (file.mimetype) {
              case 'image/jpeg':
              case 'image/jpg':
                processedBuffer = await resized.jpeg({ quality: 100 }).toBuffer();
                break;
              case 'image/png':
                processedBuffer = await resized.png({ compressionLevel: 0 }).toBuffer();
                break;
              case 'image/webp':
                processedBuffer = await resized.webp({ quality: 100 }).toBuffer();
                break;
              default:
                processedBuffer = await resized.toBuffer();
            }
          }
        }

        // Upload to VNData S3
        await (uploadService as any).s3Client.putObject((uploadService as any).bucketName, objectName, processedBuffer, {
          'Content-Type': actualContentType,
          'Cache-Control': 'max-age=31536000',
        });

        return `${VNDATA_BASE_URL}/${objectName}`;
      } catch (error) {
        console.error('Error uploading file to VNData S3:', error);
        throw error;
      }
    };

    const result = await uploadService.uploadImage(fileObj, folder);
    
    // Restore original method
    uploadService.uploadImage = originalUploadImage;
    
    return result;
  } catch (error) {
    console.error(`❌ Error uploading ${localPath}:`, error);
    throw error;
  }
}

// Helper function to update database URLs
async function updateDatabaseUrls(oldUrl: string, newUrl: string): Promise<void> {
  try {
    // Update thumbnail_image
    await db('project_details')
      .where('thumbnail_image', oldUrl)
      .update({ thumbnail_image: newUrl });

    // Update project_images (JSON array)
    const projects = await db('project_details').select('id', 'project_images');
    
    for (const project of projects) {
      if (project.project_images) {
        try {
          const images = JSON.parse(project.project_images);
          let updated = false;
          
          for (let i = 0; i < images.length; i++) {
            if (images[i] === oldUrl) {
              images[i] = newUrl;
              updated = true;
            }
          }
          
          if (updated) {
            await db('project_details')
              .where('id', project.id)
              .update({ project_images: JSON.stringify(images) });
          }
        } catch (error) {
          console.error(`❌ Error parsing project_images for project ${project.id}:`, error);
        }
      }
    }
  } catch (error) {
    console.error(`❌ Error updating database URLs:`, error);
    throw error;
  }
}

// Main function to upload folders and update database
async function uploadFoldersAndUpdateDatabase() {
  console.log('🚀 Starting upload of project folders to VNData S3...\n');

  try {
    const assetsPath = '/Users/huy.hoang/Desktop/pgdesign/public/assets';
    let totalFiles = 0;
    let uploadedFiles = 0;
    let updatedUrls = 0;

    for (const category of CATEGORIES) {
      console.log(`📁 Processing category: ${category}`);
      
      const categoryPath = path.join(assetsPath, category);
      
      if (!fs.existsSync(categoryPath)) {
        console.log(`   ⚠️  Category folder not found: ${categoryPath}`);
        continue;
      }

      const projectFolders = fs.readdirSync(categoryPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

      console.log(`   📦 Found ${projectFolders.length} project folders`);

      for (const projectFolder of projectFolders) {
        const projectPath = path.join(categoryPath, projectFolder);
        const files = fs.readdirSync(projectPath)
          .filter(file => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file));

        console.log(`   📂 Processing project: ${projectFolder} (${files.length} files)`);

        for (const file of files) {
          totalFiles++;
          
          const localFilePath = path.join(projectPath, file);
          const s3Key = `${category}/${projectFolder}/${file}`;
          
          try {
            // Upload file to VNData S3
            const newUrl = await uploadFileToVNData(localFilePath, s3Key);
            uploadedFiles++;
            
            // Create old URL pattern (assuming current URLs follow this pattern)
            const oldUrlPattern = `https://s3-hcm-r2.s3cloud.vn/pgdesign-new/projectpage/${category}/${projectFolder}/${file}`;
            
            // Update database URLs
            await updateDatabaseUrls(oldUrlPattern, newUrl);
            updatedUrls++;
            
            console.log(`   ✅ Uploaded: ${file} -> ${newUrl}`);
            
          } catch (error) {
            console.error(`   ❌ Failed to upload ${file}:`, error);
          }
        }
      }
    }

    console.log('\n📊 Upload Summary:');
    console.log(`   Total files processed: ${totalFiles}`);
    console.log(`   Successfully uploaded: ${uploadedFiles}`);
    console.log(`   Database URLs updated: ${updatedUrls}`);
    console.log(`   Errors: ${totalFiles - uploadedFiles}`);

    console.log('\n✅ Upload and database update completed!');

  } catch (error) {
    console.error('❌ Error during upload process:', error);
    throw error;
  } finally {
    await db.destroy();
  }
}

// Run the function
uploadFoldersAndUpdateDatabase()
  .then(() => {
    console.log('\n🎯 Script completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Script failed:', error);
    process.exit(1);
  });
