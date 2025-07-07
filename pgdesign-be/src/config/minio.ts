import { Client } from 'minio';
import dotenv from 'dotenv';

dotenv.config();

const minioClient = new Client({
  endPoint: process.env.MINIO_ENDPOINT || 'localhost',
  port: parseInt(process.env.MINIO_PORT || '9000'),
  useSSL: process.env.MINIO_USE_SSL === 'true',
  accessKey: process.env.MINIO_ACCESS_KEY || 'minioadmin',
  secretKey: process.env.MINIO_SECRET_KEY || 'minioadmin',
});

export const bucketName = process.env.MINIO_BUCKET_NAME || 'pgdesign-assets';

// Initialize MinIO bucket
export const initializeBucket = async (): Promise<void> => {
  try {
    const exists = await minioClient.bucketExists(bucketName);
    if (!exists) {
      await minioClient.makeBucket(bucketName, 'us-east-1');
      console.log(`✅ MinIO bucket '${bucketName}' created successfully`);
    } else {
      console.log(`✅ MinIO bucket '${bucketName}' already exists`);
    }
  } catch (error) {
    console.error('❌ MinIO bucket initialization failed:', error);
    throw error;
  }
};

// Test MinIO connection
export const testMinioConnection = async (): Promise<void> => {
  try {
    await minioClient.listBuckets();
    console.log('✅ MinIO connection successful');
  } catch (error) {
    console.error('❌ MinIO connection failed:', error);
    throw error;
  }
};

export default minioClient; 