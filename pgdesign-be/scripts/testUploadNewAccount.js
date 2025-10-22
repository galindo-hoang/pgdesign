/**
 * Test Upload to New VNData Account
 */

const { Client } = require('minio');

const newClient = new Client({
  endPoint: 's3-hcm-r2.s3cloud.vn',
  port: 443,
  useSSL: true,
  accessKey: 'PQBDT1RXDJU9ORTHURV0',
  secretKey: 'CvE81UtcutCwTwxgvxTRN6OtaVoOwPfD1wEsvbBe',
  region: 'hcm-r2'
});

const bucketName = 'pgdesign-assets';

async function testUpload() {
  console.log('🧪 Testing Upload to New VNData Account...\n');
  
  try {
    // Test 1: Try to upload a test file
    console.log('1️⃣ Attempting to upload test file...');
    const testContent = Buffer.from('VNData S3 Test - New Account');
    const testFileName = 'test/connection-test.txt';
    
    await newClient.putObject(bucketName, testFileName, testContent, {
      'Content-Type': 'text/plain'
    });
    console.log(`✅ Test file uploaded successfully: ${testFileName}`);
    
    // Test 2: Try to read it back
    console.log('\n2️⃣ Attempting to read test file...');
    const dataStream = await newClient.getObject(bucketName, testFileName);
    const chunks = [];
    
    await new Promise((resolve, reject) => {
      dataStream.on('data', chunk => chunks.push(chunk));
      dataStream.on('end', resolve);
      dataStream.on('error', reject);
    });
    
    const content = Buffer.concat(chunks).toString('utf-8');
    console.log(`✅ Read file successfully: "${content}"`);
    
    // Test 3: Generate public URL
    const publicUrl = `https://s3-hcm-r2.s3cloud.vn/${bucketName}/${testFileName}`;
    console.log(`\n3️⃣ Public URL: ${publicUrl}`);
    
    // Test 4: Try to set bucket policy
    console.log('\n4️⃣ Attempting to set bucket policy...');
    try {
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
      
      await newClient.setBucketPolicy(bucketName, JSON.stringify(policy));
      console.log('✅ Bucket policy set successfully');
    } catch (policyError) {
      console.log('⚠️  Could not set bucket policy:', policyError.message);
      console.log('   You may need to set this manually in VNData console');
    }
    
    console.log('\n🎉 New account is ready for migration!\n');
    console.log('📝 You can now run the migration script');
    
    process.exit(0);
    
  } catch (error) {
    console.error('\n❌ Upload test failed:', error.message);
    console.error('Error code:', error.code);
    console.error('\n📋 Troubleshooting steps:');
    console.error('   1. Go to VNData console: https://portal.vndata.vn');
    console.error(`   2. Create bucket: ${bucketName}`);
    console.error('   3. Set bucket to public read (or configure policy)');
    console.error('   4. Verify credentials have read/write permissions');
    console.error('   5. Run this test again');
    process.exit(1);
  }
}

testUpload();

