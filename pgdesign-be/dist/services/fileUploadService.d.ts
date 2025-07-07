import { FileUpload } from '../types/homePageTypes.js';
export declare class FileUploadService {
    private allowedMimeTypes;
    private maxFileSize;
    validateFile(file: FileUpload): void;
    uploadImage(file: FileUpload, folder?: string): Promise<string>;
    processImage(buffer: Buffer, mimeType: string): Promise<Buffer>;
    getFileUrl(objectName: string): Promise<string>;
    deleteFile(objectName: string): Promise<void>;
    uploadMultipleImages(files: FileUpload[], folder?: string): Promise<string[]>;
    extractObjectNameFromUrl(url: string): string;
    deleteFileByUrl(url: string): Promise<void>;
    generateThumbnail: (buffer: Buffer, width?: number, height?: number) => Promise<Buffer>;
    uploadImageWithThumbnail(file: FileUpload, folder?: string): Promise<{
        original: string;
        thumbnail: string;
    }>;
    private uploadProcessedImage;
}
declare const _default: FileUploadService;
export default _default;
//# sourceMappingURL=fileUploadService.d.ts.map