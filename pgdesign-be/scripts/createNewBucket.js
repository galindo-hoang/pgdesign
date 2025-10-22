/**
 * Create new bucket with VNData credentials
 */

const { Client } = require('minio');

const client = new Client({
  endPoint: 's3-hcm-r2.s3cloud.vn',
  port: 443,
  useSSL: true,
  accessKey: 'PQBDT1RXDJU9ORTHURV0',
  secretKey: 'CvE81UtcutCwTwxgvxTRN6OtaVoOwPfD1wEsvbBe'
});

const bucketName = 'pgdesign-new';

async function createNewBucket() {
  console.log('🪣 Creating New Bucket on VNData S3...\n');
  
  try {
    // Create bucket
    console.log(`1️⃣ Creating bucket: ${bucketName}...`);
    await client.makeBucket(bucketName);
    console.log(`✅ Bucket '${bucketName}' created successfully!`);
    
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
    
    await client.setBucketPolicy(bucketName, JSON.stringify(policy));
    console.log('✅ Bucket policy set to public read');
    
    // Test upload
    console.log('\n3️⃣ Testing file upload...');
    const testContent = Buffer.from('PGDesign - New Bucket Test');
    const testFileName = 'test/bucket-setup.txt';
    
    await client.putObject(bucketName, testFileName, testContent, {
      'Content-Type': 'text/plain'
    });
    console.log(`✅ Test file uploaded: ${testFileName}`);
    
    // Generate URL
    const publicUrl = `https://s3-hcm-r2.s3cloud.vn/${bucketName}/${testFileName}`;
    console.log(`\n4️⃣ Test public URL: ${publicUrl}`);
    
    console.log('\n🎉 New bucket created and configured!\n');
    console.log(`📝 Bucket name: ${bucketName}`);
    console.log('📝 Next: Update .env.production with new bucket name');
    
    process.exit(0);
    
  } catch (error) {
    console.error('\n❌ Failed:', error.message);
    console.error('Error code:', error.code);
    
    if (error.code === 'BucketAlreadyOwnedByYou') {
      console.log('\n✅ Good news! Bucket already exists and you own it!');
      console.log('   Proceeding to setup...');
      // Continue with setup
    } else {
      process.exit(1);
    }
  }
}

createNewBucket();

