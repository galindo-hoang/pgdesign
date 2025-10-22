/**
 * Set VNData S3 Bucket Policy to Public Read
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

async function setBucketPolicy() {
  console.log('🔒 Setting VNData S3 Bucket Policy for Public Access...\n');
  
  try {
    // Check if bucket exists
    console.log(`1️⃣ Checking bucket: ${bucketName}...`);
    const exists = await vnDataClient.bucketExists(bucketName);
    
    if (!exists) {
      console.error(`❌ Bucket '${bucketName}' does not exist!`);
      process.exit(1);
    }
    console.log(`✅ Bucket exists`);
    
    // Set public read policy
    console.log('\n2️⃣ Setting bucket policy to allow public read access...');
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
    
    await vnDataClient.setBucketPolicy(bucketName, JSON.stringify(policy));
    console.log('✅ Bucket policy set successfully!');
    
    // Verify policy
    console.log('\n3️⃣ Verifying bucket policy...');
    const currentPolicy = await vnDataClient.getBucketPolicy(bucketName);
    console.log('Current policy:', JSON.parse(currentPolicy));
    
    // Test access with a sample file
    console.log('\n4️⃣ Testing public access...');
    console.log('Try accessing any file URL in your browser:');
    console.log('   https://s3-hcm-r2.s3cloud.vn/pgdesign-assets/logo/pg-design-logo.svg');
    
    console.log('\n🎉 Success! All files in the bucket are now publicly accessible.\n');
    
    process.exit(0);
    
  } catch (error) {
    console.error('\n❌ Failed to set bucket policy:', error.message);
    if (error.code) console.error('Error code:', error.code);
    console.error('\nPossible issues:');
    console.error('   - Insufficient permissions on VNData account');
    console.error('   - Invalid credentials');
    console.error('   - Bucket policy not supported by VNData');
    process.exit(1);
  }
}

setBucketPolicy();

