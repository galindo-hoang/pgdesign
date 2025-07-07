"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadService = void 0;
const minio_1 = __importStar(require("../config/minio"));
const sharp_1 = __importDefault(require("sharp"));
const uuid_1 = require("uuid");
const errorHandler_1 = require("../middleware/errorHandler");
class FileUploadService {
    constructor() {
        this.allowedMimeTypes = [
            'image/jpeg',
            'image/jpg',
            'image/png',
            'image/gif',
            'image/webp',
            'image/svg+xml'
        ];
        this.maxFileSize = parseInt(process.env.MAX_FILE_SIZE || '5242880');
        this.generateThumbnail = async (buffer, width = 300, height = 300) => {
            try {
                return await (0, sharp_1.default)(buffer)
                    .resize(width, height, {
                    fit: 'cover',
                    position: 'center'
                })
                    .jpeg({ quality: 80 })
                    .toBuffer();
            }
            catch (error) {
                console.error('Error generating thumbnail:', error);
                throw (0, errorHandler_1.createError)('Failed to generate thumbnail', 500);
            }
        };
    }
    validateFile(file) {
        if (!this.allowedMimeTypes.includes(file.mimetype)) {
            throw (0, errorHandler_1.createError)(`Invalid file type. Allowed types: ${this.allowedMimeTypes.join(', ')}`, 400);
        }
        if (file.size > this.maxFileSize) {
            throw (0, errorHandler_1.createError)(`File size exceeds maximum limit of ${this.maxFileSize / 1024 / 1024}MB`, 400);
        }
    }
    async uploadImage(file, folder = 'images') {
        this.validateFile(file);
        const fileExtension = file.originalname.split('.').pop()?.toLowerCase();
        const fileName = `${(0, uuid_1.v4)()}.${fileExtension}`;
        const objectName = `${folder}/${fileName}`;
        try {
            let processedBuffer = file.buffer;
            if (file.mimetype !== 'image/svg+xml') {
                processedBuffer = await this.processImage(file.buffer, file.mimetype);
            }
            await minio_1.default.putObject(minio_1.bucketName, objectName, processedBuffer, {
                'Content-Type': file.mimetype,
                'Cache-Control': 'max-age=31536000'
            });
            return await this.getFileUrl(objectName);
        }
        catch (error) {
            console.error('Error uploading file:', error);
            throw (0, errorHandler_1.createError)('Failed to upload file', 500);
        }
    }
    async processImage(buffer, mimeType) {
        try {
            const sharpInstance = (0, sharp_1.default)(buffer);
            const metadata = await sharpInstance.metadata();
            if (metadata.width && metadata.width > 1920) {
                return await sharpInstance
                    .resize(1920, null, {
                    withoutEnlargement: true,
                    fit: 'inside'
                })
                    .jpeg({ quality: 85 })
                    .toBuffer();
            }
            if (process.env.CONVERT_TO_WEBP === 'true') {
                return await sharpInstance
                    .webp({ quality: 85 })
                    .toBuffer();
            }
            return buffer;
        }
        catch (error) {
            console.error('Error processing image:', error);
            return buffer;
        }
    }
    async getFileUrl(objectName) {
        try {
            return await minio_1.default.presignedGetObject(minio_1.bucketName, objectName, 7 * 24 * 60 * 60);
        }
        catch (error) {
            console.error('Error getting file URL:', error);
            throw (0, errorHandler_1.createError)('Failed to get file URL', 500);
        }
    }
    async deleteFile(objectName) {
        try {
            await minio_1.default.removeObject(minio_1.bucketName, objectName);
        }
        catch (error) {
            console.error('Error deleting file:', error);
            throw (0, errorHandler_1.createError)('Failed to delete file', 500);
        }
    }
    async uploadMultipleImages(files, folder = 'images') {
        const uploadPromises = files.map(file => this.uploadImage(file, folder));
        return await Promise.all(uploadPromises);
    }
    extractObjectNameFromUrl(url) {
        try {
            const urlParts = url.split('/');
            const bucketIndex = urlParts.indexOf(minio_1.bucketName);
            if (bucketIndex !== -1 && bucketIndex < urlParts.length - 1) {
                return urlParts.slice(bucketIndex + 1).join('/');
            }
            return '';
        }
        catch (error) {
            console.error('Error extracting object name from URL:', error);
            return '';
        }
    }
    async deleteFileByUrl(url) {
        const objectName = this.extractObjectNameFromUrl(url);
        if (objectName) {
            await this.deleteFile(objectName);
        }
    }
    async uploadImageWithThumbnail(file, folder = 'images') {
        this.validateFile(file);
        const fileExtension = file.originalname.split('.').pop()?.toLowerCase();
        const fileName = `${(0, uuid_1.v4)()}.${fileExtension}`;
        const thumbnailName = `${(0, uuid_1.v4)()}_thumb.jpg`;
        const originalObjectName = `${folder}/${fileName}`;
        const thumbnailObjectName = `${folder}/thumbnails/${thumbnailName}`;
        try {
            let processedBuffer = file.buffer;
            if (file.mimetype !== 'image/svg+xml') {
                processedBuffer = await this.processImage(file.buffer, file.mimetype);
            }
            const thumbnailBuffer = await this.generateThumbnail(file.buffer);
            const [originalUrl, thumbnailUrl] = await Promise.all([
                this.uploadProcessedImage(originalObjectName, processedBuffer, file.mimetype),
                this.uploadProcessedImage(thumbnailObjectName, thumbnailBuffer, 'image/jpeg')
            ]);
            return {
                original: originalUrl,
                thumbnail: thumbnailUrl
            };
        }
        catch (error) {
            console.error('Error uploading image with thumbnail:', error);
            throw (0, errorHandler_1.createError)('Failed to upload image with thumbnail', 500);
        }
    }
    async uploadProcessedImage(objectName, buffer, mimeType) {
        await minio_1.default.putObject(minio_1.bucketName, objectName, buffer, {
            'Content-Type': mimeType,
            'Cache-Control': 'max-age=31536000'
        });
        return await this.getFileUrl(objectName);
    }
}
exports.FileUploadService = FileUploadService;
exports.default = new FileUploadService();
//# sourceMappingURL=fileUploadService.js.map