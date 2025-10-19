/**
 * Test VNData S3 Connection
 * Verify credentials and bucket access
 */

const { Client } = require('minio');

const vnDataClient = new Client({
  endPoint: 's3-hcm-r2.s3cloud.vn',
  port: 443,
  useSSL: true,
  accessKey: 'KS1KMPXYY4CEPQ5RW5BN',
  secretKey: 'ErdmFIm4R8T2WzU9QvUFyPb0Y1HUREdIxTBo8DEK',
  region: 'hcm-r2'
});

const bucketName = 'pgdesign-assets';

async function testConnection() {
  console.log('🧪 Testing VNData S3 Connection...\n');
  
  try {
    // Test 1: List buckets
    console.log('1️⃣ Testing bucket list...');
    const buckets = await vnDataClient.listBuckets();
    console.log(`✅ Connected! Found ${buckets.length} buckets`);
    buckets.forEach(b => console.log(`   - ${b.name} (created: ${b.creationDate})`));
    
    // Test 2: Check if bucket exists
    console.log(`\n2️⃣ Checking bucket: ${bucketName}...`);
    const exists = await vnDataClient.bucketExists(bucketName);
    
    if (exists) {
      console.log(`✅ Bucket '${bucketName}' exists`);
    } else {
      console.log(`⚠️  Bucket '${bucketName}' does not exist`);
      console.log(`   Creating bucket...`);
      // Try without region first
      try {
        await vnDataClient.makeBucket(bucketName);
        console.log(`✅ Bucket created successfully`);
      } catch (err) {
        console.log(`   Trying with region 'us-east-1'...`);
        await vnDataClient.makeBucket(bucketName, 'us-east-1');
        console.log(`✅ Bucket created successfully`);
      }
    }
    
    // Test 3: Set public access policy
    console.log('\n3️⃣ Setting bucket policy to public...');
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
    console.log('✅ Bucket policy set to public');
    
    // Test 4: Upload test file
    console.log('\n4️⃣ Testing file upload...');
    const testContent = Buffer.from('VNData S3 Test File - PGDesign');
    const testFileName = 'test/connection-test.txt';
    
    await vnDataClient.putObject(bucketName, testFileName, testContent, {
      'Content-Type': 'text/plain'
    });
    console.log(`✅ Test file uploaded: ${testFileName}`);
    
    // Test 5: Generate public URL
    const publicUrl = `https://s3-hcm-r2.s3cloud.vn/${bucketName}/${testFileName}`;
    console.log(`\n5️⃣ Public URL: ${publicUrl}`);
    console.log('   Try accessing this URL in your browser');
    
    // Test 6: List objects
    console.log('\n6️⃣ Listing objects in bucket...');
    const stream = vnDataClient.listObjects(bucketName, '', true);
    let objectCount = 0;
    
    await new Promise((resolve, reject) => {
      stream.on('data', obj => {
        objectCount++;
        if (objectCount <= 5) {
          console.log(`   - ${obj.name} (${(obj.size / 1024).toFixed(2)} KB)`);
        }
      });
      stream.on('end', resolve);
      stream.on('error', reject);
    });
    
    console.log(`✅ Total objects: ${objectCount}`);
    
    console.log('\n🎉 All tests passed! VNData S3 is ready to use.\n');
    console.log('📝 Next steps:');
    console.log('   1. Copy .env.vndata to .env');
    console.log('   2. Restart backend server');
    console.log('   3. Upload images will use VNData S3 automatically');
    
    process.exit(0);
    
  } catch (error) {
    console.error('\n❌ Connection test failed:', error.message);
    console.error('\nTroubleshooting:');
    console.error('   - Check your credentials');
    console.error('   - Verify endpoint URL');
    console.error('   - Ensure bucket permissions');
    process.exit(1);
  }
}

testConnection();

