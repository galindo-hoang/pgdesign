/**
 * Setup existing pgdesign-assets bucket on VNData S3
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

async function setupBucket() {
  console.log('⚙️  Setting up VNData S3 Bucket...\n');
  
  try {
    // Test upload
    console.log('1️⃣ Testing file upload...');
    const testContent = Buffer.from('Test upload - PGDesign Assets - New Account');
    const testFileName = 'test/setup-test.txt';
    
    await client.putObject(bucketName, testFileName, testContent, {
      'Content-Type': 'text/plain'
    });
    console.log(`✅ Test file uploaded: ${testFileName}`);
    
    // Test read
    console.log('\n2️⃣ Testing file read...');
    const dataStream = await client.getObject(bucketName, testFileName);
    const chunks = [];
    
    await new Promise((resolve, reject) => {
      dataStream.on('data', chunk => chunks.push(chunk));
      dataStream.on('end', resolve);
      dataStream.on('error', reject);
    });
    
    const content = Buffer.concat(chunks).toString('utf-8');
    console.log(`✅ Read file successfully: "${content}"`);
    
    // Set bucket policy for public read
    console.log('\n3️⃣ Setting bucket policy for public read access...');
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
      
      // Verify policy
      const currentPolicy = await client.getBucketPolicy(bucketName);
      console.log('✅ Policy verified:', JSON.parse(currentPolicy).Statement[0].Sid);
    } catch (policyErr) {
      console.log('⚠️  Could not set bucket policy:', policyErr.message);
      console.log('   You may need to set this manually in VNData console');
    }
    
    // Generate URL
    const publicUrl = `https://s3-hcm-r2.s3cloud.vn/${bucketName}/${testFileName}`;
    console.log(`\n4️⃣ Test public URL: ${publicUrl}`);
    console.log('   Try accessing this URL in your browser');
    
    // List some objects
    console.log('\n5️⃣ Listing existing objects...');
    const stream = client.listObjects(bucketName, '', true);
    let count = 0;
    
    await new Promise((resolve, reject) => {
      stream.on('data', obj => {
        count++;
        if (count <= 10) {
          console.log(`   - ${obj.name} (${(obj.size / 1024).toFixed(2)} KB)`);
        }
      });
      stream.on('end', () => {
        console.log(`✅ Total objects in bucket: ${count}`);
        resolve();
      });
      stream.on('error', reject);
    });
    
    console.log('\n🎉 Bucket is ready!\n');
    console.log('📝 Next steps:');
    console.log('   1. Run migration script to copy files from old account');
    console.log('   2. Backend is already configured with new credentials');
    console.log('   3. After migration, restart backend server');
    
    process.exit(0);
    
  } catch (error) {
    console.error('\n❌ Setup failed:', error.message);
    console.error('Error code:', error.code);
    process.exit(1);
  }
}

setupBucket();

