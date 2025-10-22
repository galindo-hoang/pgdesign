/**
 * Create pgdesign-assets bucket on VNData S3
 */

const { Client } = require('minio');

const client = new Client({
  endPoint: 's3-hcm-r2.s3cloud.vn',
  port: 443,
  useSSL: true,
  accessKey: 'PQBDT1RXDJU9ORTHURV0',
  secretKey: 'CvE81UtcutCwTwxgvxTRN6OtaVoOwPfD1wEsvbBe'
});

const bucketName = 'pgdesign-assets';

async function createBucket() {
  console.log('🪣 Creating VNData S3 Bucket...\n');
  
  try {
    // Check if bucket already exists
    console.log(`1️⃣ Checking if bucket '${bucketName}' exists...`);
    
    let exists = false;
    try {
      exists = await client.bucketExists(bucketName);
    } catch (err) {
      console.log('   Could not check bucket existence, will try to create');
    }
    
    if (exists) {
      console.log(`✅ Bucket '${bucketName}' already exists!`);
    } else {
      console.log(`   Bucket does not exist, creating...`);
      
      // Try creating bucket without region (VNData specific)
      await client.makeBucket(bucketName);
      console.log(`✅ Bucket '${bucketName}' created successfully!`)
    }
    
    // Set bucket policy for public read
    console.log('\n2️⃣ Setting bucket policy for public read access...');
    const policy = {
      Version: '2012-10-17',
      Statement: [{
        Sid: 'PublicReadGetObject',
        Effect: 'Allow',
        Principal: '*',
        Action: ['s3:GetObject'],
        Resource: [`arn:aws:s3:::${bucketName}/*`]
      }]
    };
    
    try {
      await client.setBucketPolicy(bucketName, JSON.stringify(policy));
      console.log('✅ Bucket policy set to public read');
    } catch (policyErr) {
      console.log('⚠️  Could not set bucket policy:', policyErr.message);
      console.log('   You may need to set this manually in VNData console');
    }
    
    // Test upload
    console.log('\n3️⃣ Testing file upload...');
    const testContent = Buffer.from('Test upload - PGDesign Assets');
    const testFileName = 'test/setup-test.txt';
    
    await client.putObject(bucketName, testFileName, testContent, {
      'Content-Type': 'text/plain'
    });
    console.log(`✅ Test file uploaded: ${testFileName}`);
    
    // Generate URL
    const publicUrl = `https://s3-hcm-r2.s3cloud.vn/${bucketName}/${testFileName}`;
    console.log(`\n4️⃣ Test URL: ${publicUrl}`);
    console.log('   Try accessing this URL in your browser');
    
    console.log('\n🎉 Bucket setup complete!\n');
    console.log('📝 Next steps:');
    console.log('   1. Run migration script to copy files from old account');
    console.log('   2. Restart backend with new credentials');
    
    process.exit(0);
    
  } catch (error) {
    console.error('\n❌ Failed to create bucket:', error.message);
    console.error('Error code:', error.code);
    
    if (error.code === 'AccessDenied') {
      console.error('\n📋 AccessDenied - Possible reasons:');
      console.error('   - Credentials do not have permission to create buckets');
      console.error('   - Bucket already exists under different account');
      console.error('   - Need to create bucket manually in VNData console');
    }
    
    process.exit(1);
  }
}

createBucket();

