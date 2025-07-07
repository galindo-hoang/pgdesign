"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testMinioConnection = exports.initializeBucket = exports.bucketName = void 0;
const minio_1 = require("minio");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const minioClient = new minio_1.Client({
    endPoint: process.env.MINIO_ENDPOINT || 'localhost',
    port: parseInt(process.env.MINIO_PORT || '9000'),
    useSSL: process.env.MINIO_USE_SSL === 'true',
    accessKey: process.env.MINIO_ACCESS_KEY || 'minioadmin',
    secretKey: process.env.MINIO_SECRET_KEY || 'minioadmin',
});
exports.bucketName = process.env.MINIO_BUCKET_NAME || 'pgdesign-assets';
const initializeBucket = async () => {
    try {
        const exists = await minioClient.bucketExists(exports.bucketName);
        if (!exists) {
            await minioClient.makeBucket(exports.bucketName, 'us-east-1');
            console.log(`✅ MinIO bucket '${exports.bucketName}' created successfully`);
        }
        else {
            console.log(`✅ MinIO bucket '${exports.bucketName}' already exists`);
        }
    }
    catch (error) {
        console.error('❌ MinIO bucket initialization failed:', error);
        throw error;
    }
};
exports.initializeBucket = initializeBucket;
const testMinioConnection = async () => {
    try {
        await minioClient.listBuckets();
        console.log('✅ MinIO connection successful');
    }
    catch (error) {
        console.error('❌ MinIO connection failed:', error);
        throw error;
    }
};
exports.testMinioConnection = testMinioConnection;
exports.default = minioClient;
//# sourceMappingURL=minio.js.map