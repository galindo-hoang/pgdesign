import { Client } from 'minio';
declare const minioClient: Client;
export declare const bucketName: string;
export declare const initializeBucket: () => Promise<void>;
export declare const testMinioConnection: () => Promise<void>;
export default minioClient;
//# sourceMappingURL=minio.d.ts.map