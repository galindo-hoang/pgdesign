/**
 * Migrate VNData S3 Objects from Old Account to New Account
 * This script copies all objects from the old VNData bucket to the new VNData bucket
 */

const { Client } = require('minio');
const mysql = require('mysql2/promise');

// OLD VNData Credentials
const oldClient = new Client({
  endPoint: 's3-hcm-r2.s3cloud.vn',
  port: 443,
  useSSL: true,
  accessKey: 'KS1KMPXYY4CEPQ5RW5BN',
  secretKey: 'ErdmFIm4R8T2WzU9QvUFyPb0Y1HUREdIxTBo8DEK',
  region: 'hcm-r2'
});

// NEW VNData Credentials
const newClient = new Client({
  endPoint: 's3-hcm-r2.s3cloud.vn',
  port: 443,
  useSSL: true,
  accessKey: 'PQBDT1RXDJU9ORTHURV0',
  secretKey: 'CvE81UtcutCwTwxgvxTRN6OtaVoOwPfD1wEsvbBe'
});

const oldBucketName = 'pgdesign-assets';
const newBucketName = 'pgdesign-new';

// Database configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'pgdesign_db'
};

async function migrateObjects() {
  console.log('🔄 Starting VNData S3 Migration (Old Account → New Account)\n');
  
  try {
    // Step 1: Check old bucket exists
    console.log('1️⃣ Checking old bucket...');
    const oldBucketExists = await oldClient.bucketExists(oldBucketName);
    if (!oldBucketExists) {
      console.error(`❌ Old bucket '${oldBucketName}' does not exist!`);
      process.exit(1);
    }
    console.log(`✅ Old bucket '${oldBucketName}' exists`);
    
    // Step 2: Check new bucket
    console.log('\n2️⃣ Checking new bucket...');
    const newBucketExists = await newClient.bucketExists(newBucketName);
    
    if (!newBucketExists) {
      console.error(`❌ New bucket '${newBucketName}' does not exist!`);
      console.log('   Please run createNewBucket.js first');
      process.exit(1);
    }
    console.log(`✅ New bucket '${newBucketName}' exists`);
    
    // Step 3: Verify bucket policy
    console.log('\n3️⃣ Verifying bucket policy...');
    try {
      const policy = await newClient.getBucketPolicy(newBucketName);
      console.log('✅ Bucket policy is set');
    } catch (err) {
      console.log('⚠️  Warning: Could not verify bucket policy');
    }
    
    // Step 4: List all objects from old bucket
    console.log('\n4️⃣ Listing objects from old bucket...');
    const objectsList = [];
    
    const stream = oldClient.listObjects(oldBucketName, '', true);
    
    await new Promise((resolve, reject) => {
      stream.on('data', obj => {
        objectsList.push({
          name: obj.name,
          size: obj.size,
          etag: obj.etag
        });
      });
      stream.on('end', resolve);
      stream.on('error', reject);
    });
    
    console.log(`✅ Found ${objectsList.length} objects to migrate`);
    
    if (objectsList.length === 0) {
      console.log('\n⚠️  No objects to migrate!');
      process.exit(0);
    }
    
    // Step 5: Copy objects from old to new bucket
    console.log('\n5️⃣ Copying objects to new bucket...');
    let successCount = 0;
    let errorCount = 0;
    
    for (let i = 0; i < objectsList.length; i++) {
      const obj = objectsList[i];
      const progress = `[${i + 1}/${objectsList.length}]`;
      
      try {
        // Get object from old bucket
        const dataStream = await oldClient.getObject(oldBucketName, obj.name);
        
        // Collect data into buffer
        const chunks = [];
        await new Promise((resolve, reject) => {
          dataStream.on('data', chunk => chunks.push(chunk));
          dataStream.on('end', resolve);
          dataStream.on('error', reject);
        });
        const buffer = Buffer.concat(chunks);
        
        // Get metadata
        const stat = await oldClient.statObject(oldBucketName, obj.name);
        const metadata = stat.metaData || {};
        
        // Upload to new bucket
        await newClient.putObject(newBucketName, obj.name, buffer, {
          'Content-Type': metadata['content-type'] || 'application/octet-stream',
          'Cache-Control': metadata['cache-control'] || 'max-age=31536000'
        });
        
        successCount++;
        
        // Show progress for every 10 files or at the end
        if (successCount % 10 === 0 || i === objectsList.length - 1) {
          console.log(`   ${progress} Copied: ${obj.name} (${(obj.size / 1024).toFixed(2)} KB)`);
        }
        
      } catch (error) {
        errorCount++;
        console.error(`   ${progress} ❌ Failed to copy: ${obj.name} - ${error.message}`);
      }
    }
    
    console.log(`\n✅ Migration completed!`);
    console.log(`   Success: ${successCount} objects`);
    console.log(`   Failed: ${errorCount} objects`);
    console.log(`   Total size migrated: ${(objectsList.reduce((sum, obj) => sum + obj.size, 0) / 1024 / 1024).toFixed(2)} MB`);
    
    // Step 6: Verify migration
    console.log('\n6️⃣ Verifying migration...');
    const newStream = newClient.listObjects(newBucketName, '', true);
    let newObjectCount = 0;
    
    await new Promise((resolve, reject) => {
      newStream.on('data', () => newObjectCount++);
      newStream.on('end', resolve);
      newStream.on('error', reject);
    });
    
    console.log(`✅ New bucket contains ${newObjectCount} objects`);
    
    // Test a sample URL
    console.log('\n7️⃣ Testing sample URL...');
    const sampleUrl = `https://s3-hcm-r2.s3cloud.vn/${newBucketName}/logo/pg-design-logo.svg`;
    console.log(`   Sample URL: ${sampleUrl}`);
    console.log(`   Try accessing this URL in your browser to verify public access`);
    
    console.log('\n🎉 Migration successful!');
    console.log('\n📝 Next steps:');
    console.log('   1. Backend is already using new credentials (.env.production updated)');
    console.log('   2. Restart backend server with: NODE_ENV=production npm run dev');
    console.log('   3. Test APIs to ensure everything works');
    console.log('   4. Once verified, you can delete the old bucket from the old account');
    
    process.exit(0);
    
  } catch (error) {
    console.error('\n❌ Migration failed:', error.message);
    console.error(error);
    process.exit(1);
  }
}

migrateObjects();

