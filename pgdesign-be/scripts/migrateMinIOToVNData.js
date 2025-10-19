/**
 * Migrate images from MinIO to VNData S3
 * This script copies all images and updates database URLs
 */

const { Client } = require('minio');
const db = require('../dist/config/database').default;

// Source: MinIO
const minioClient = new Client({
  endPoint: 'localhost',
  port: 9000,
  useSSL: false,
  accessKey: 'minioadmin',
  secretKey: 'minioadmin'
});

// Destination: VNData S3
const vnDataClient = new Client({
  endPoint: 's3-hcm-r2.s3cloud.vn',
  port: 443,
  useSSL: true,
  accessKey: 'KS1KMPXYY4CEPQ5RW5BN',
  secretKey: 'ErdmFIm4R8T2WzU9QvUFyPb0Y1HUREdIxTBo8DEK'
});

const bucketName = 'pgdesign-assets';

async function migrateData() {
  console.log('🚀 Starting migration from MinIO to VNData S3...\n');
  
  try {
    // Step 1: Ensure VNData bucket exists
    const vnDataBucketExists = await vnDataClient.bucketExists(bucketName);
    if (!vnDataBucketExists) {
      console.log('Creating VNData bucket...');
      await vnDataClient.makeBucket(bucketName);
      console.log('✅ Bucket created\n');
    }

    // Step 2: Set public policy
    const policy = {
      Version: '2012-10-17',
      Statement: [{
        Effect: 'Allow',
        Principal: { AWS: ['*'] },
        Action: ['s3:GetObject'],
        Resource: [`arn:aws:s3:::${bucketName}/*`]
      }]
    };
    await vnDataClient.setBucketPolicy(bucketName, JSON.stringify(policy));
    console.log('✅ Bucket policy set to public\n');

    // Step 3: List all objects from MinIO
    console.log('📋 Listing objects from MinIO...');
    const stream = minioClient.listObjects(bucketName, '', true);
    const objects = [];

    await new Promise((resolve, reject) => {
      stream.on('data', obj => objects.push(obj));
      stream.on('end', resolve);
      stream.on('error', reject);
    });

    console.log(`Found ${objects.length} objects to migrate\n`);

    // Step 4: Copy each object
    let successCount = 0;
    let errorCount = 0;

    for (const obj of objects) {
      try {
        // Download from MinIO
        const chunks = [];
        const dataStream = await minioClient.getObject(bucketName, obj.name);
        
        await new Promise((resolve, reject) => {
          dataStream.on('data', chunk => chunks.push(chunk));
          dataStream.on('end', resolve);
          dataStream.on('error', reject);
        });

        const buffer = Buffer.concat(chunks);

        // Upload to VNData
        await vnDataClient.putObject(bucketName, obj.name, buffer, {
          'Content-Type': obj.metadata?.['content-type'] || 'application/octet-stream',
          'Cache-Control': 'max-age=31536000'
        });

        console.log(`✅ Migrated: ${obj.name}`);
        successCount++;

      } catch (error) {
        console.error(`❌ Failed: ${obj.name} - ${error.message}`);
        errorCount++;
      }
    }

    console.log(`\n📊 Migration Summary:`);
    console.log(`   ✅ Success: ${successCount}`);
    console.log(`   ❌ Failed: ${errorCount}`);
    console.log(`   📦 Total: ${objects.length}`);

    // Step 5: Update database URLs
    console.log(`\n🔄 Updating database URLs...`);
    
    await db('project_details')
      .whereNotNull('thumbnail_image_url')
      .update({
        thumbnail_image_url: db.raw("REPLACE(thumbnail_image_url, 'http://localhost:9000', 'https://s3-hcm-r2.s3cloud.vn')")
      });

    await db('project_details')
      .whereNotNull('project_images_urls')
      .update({
        project_images_urls: db.raw("REPLACE(project_images_urls, 'http://localhost:9000', 'https://s3-hcm-r2.s3cloud.vn')")
      });

    await db('project_categories')
      .whereNotNull('background_image_url')
      .update({
        background_image_url: db.raw("REPLACE(background_image_url, 'http://localhost:9000', 'https://s3-hcm-r2.s3cloud.vn')")
      });

    console.log('✅ Database URLs updated\n');

    console.log('🎉 Migration completed successfully!\n');
    console.log('📝 Next steps:');
    console.log('   1. Update .env: STORAGE_PROVIDER=vndata-s3');
    console.log('   2. Add VNData credentials to .env');
    console.log('   3. Restart backend server');
    console.log('   4. New uploads will use VNData S3');

    process.exit(0);

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrateData();

