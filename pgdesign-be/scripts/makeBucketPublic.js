const { Client } = require('minio');
require('dotenv').config();

// MinIO configuration
const minioClient = new Client({
  endPoint: process.env.MINIO_ENDPOINT || 'localhost',
  port: parseInt(process.env.MINIO_PORT || '9000'),
  useSSL: process.env.MINIO_USE_SSL === 'true',
  accessKey: process.env.MINIO_ACCESS_KEY || 'minioadmin',
  secretKey: process.env.MINIO_SECRET_KEY || 'minioadmin',
});

const bucketName = process.env.MINIO_BUCKET_NAME || 'pgdesign-assets';

async function setBucketPublic() {
  try {
    console.log('🔧 Setting bucket to public access...');
    
    // Set bucket policy to public-read
    const policy = {
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Principal: '*',
          Action: ['s3:GetObject'],
          Resource: [`arn:aws:s3:::${bucketName}/*`]
        }
      ]
    };

    await minioClient.setBucketPolicy(bucketName, JSON.stringify(policy));
    console.log('✅ Bucket policy set to public-read');
    
    // Test the policy by listing objects
    const objects = await minioClient.listObjects(bucketName, '', false);
    let objectCount = 0;
    
    await new Promise((resolve, reject) => {
      objects.on('data', (obj) => {
        objectCount++;
      });
      
      objects.on('end', () => {
        console.log(`📊 Found ${objectCount} objects in bucket`);
        resolve();
      });
      
      objects.on('error', (err) => {
        reject(err);
      });
    });
    
    console.log('🎉 Bucket is now publicly accessible!');
    console.log(`🔗 Public URL format: http://${process.env.MINIO_ENDPOINT || 'localhost'}:${process.env.MINIO_PORT || '9000'}/${bucketName}/[object-name]`);
    
  } catch (error) {
    console.error('❌ Error setting bucket policy:', error);
    throw error;
  }
}

async function main() {
  try {
    await setBucketPublic();
  } catch (error) {
    console.error('💥 Process failed:', error);
    process.exit(1);
  }
}

main(); 