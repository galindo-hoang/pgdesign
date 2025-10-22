/**
 * Test New VNData S3 Credentials
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

async function testConnection() {
  console.log('🧪 Testing NEW VNData S3 Credentials...\n');
  
  try {
    // Test 1: List buckets
    console.log('1️⃣ Testing bucket list...');
    const buckets = await newClient.listBuckets();
    console.log(`✅ Connected! Found ${buckets.length} buckets`);
    if (buckets.length > 0) {
      buckets.forEach(b => console.log(`   - ${b.name} (created: ${b.creationDate})`));
    } else {
      console.log('   No buckets found (will create one)');
    }
    
    // Test 2: Check if pgdesign-assets bucket exists
    const bucketName = 'pgdesign-assets';
    console.log(`\n2️⃣ Checking bucket: ${bucketName}...`);
    const exists = await newClient.bucketExists(bucketName);
    
    if (exists) {
      console.log(`✅ Bucket '${bucketName}' already exists`);
      
      // List some objects
      console.log('\n3️⃣ Listing objects...');
      const stream = newClient.listObjects(bucketName, '', true);
      let count = 0;
      
      await new Promise((resolve, reject) => {
        stream.on('data', obj => {
          count++;
          if (count <= 5) {
            console.log(`   - ${obj.name} (${(obj.size / 1024).toFixed(2)} KB)`);
          }
        });
        stream.on('end', () => {
          console.log(`✅ Total objects: ${count}`);
          resolve();
        });
        stream.on('error', reject);
      });
    } else {
      console.log(`⚠️  Bucket '${bucketName}' does not exist`);
      console.log('   Will create it during migration');
    }
    
    console.log('\n🎉 New credentials are valid and working!\n');
    process.exit(0);
    
  } catch (error) {
    console.error('\n❌ Connection test failed:', error.message);
    console.error('Error code:', error.code);
    console.error('\nPossible issues:');
    console.error('   - Incorrect access key or secret key');
    console.error('   - Credentials not activated yet');
    console.error('   - Insufficient permissions');
    console.error('   - Wrong endpoint or region');
    process.exit(1);
  }
}

testConnection();

