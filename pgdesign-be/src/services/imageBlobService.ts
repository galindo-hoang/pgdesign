import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";
import { createError } from "../middleware/errorHandler";
import { FileUpload } from "../types/homePageTypes";

export class ImageBlobService {
  private allowedMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/svg+xml",
  ];

  private maxFileSize = parseInt(process.env.MAX_FILE_SIZE || "5242880"); // 5MB default

  validateFile(file: FileUpload): void {
    if (!this.allowedMimeTypes.includes(file.mimetype)) {
      throw createError(
        `Invalid file type. Allowed types: ${this.allowedMimeTypes.join(", ")}`,
        400
      );
    }

    if (file.size > this.maxFileSize) {
      throw createError(
        `File size exceeds maximum limit of ${
          this.maxFileSize / 1024 / 1024
        }MB`,
        400
      );
    }
  }

  async processImageToBase64(file: FileUpload): Promise<string> {
    this.validateFile(file);

    try {
      let processedBuffer = file.buffer;

      // Process image if it's not SVG
      if (file.mimetype !== "image/svg+xml") {
        processedBuffer = await this.processImage(file.buffer, file.mimetype);
      }

      // Convert to base64
      const base64String = processedBuffer.toString("base64");

      // Return as data URL
      return `data:${file.mimetype};base64,${base64String}`;
    } catch (error) {
      console.error("Error processing image to base64:", error);
      throw createError("Failed to process image to base64", 500);
    }
  }

  async processImage(buffer: Buffer, mimeType: string): Promise<Buffer> {
    try {
      const sharpInstance = sharp(buffer);
      const metadata = await sharpInstance.metadata();

      // Resize if image is too large
      if (metadata.width && metadata.width > 1920) {
        return await sharpInstance
          .resize(1920, null, {
            withoutEnlargement: true,
            fit: "inside",
          })
          .jpeg({ quality: 85 })
          .toBuffer();
      }

      // Convert to WebP for better compression (optional)
      if (process.env.CONVERT_TO_WEBP === "true") {
        return await sharpInstance.webp({ quality: 85 }).toBuffer();
      }

      return buffer;
    } catch (error) {
      console.error("Error processing image:", error);
      return buffer; // Return original buffer if processing fails
    }
  }

  async processMultipleImagesToBase64(files: FileUpload[]): Promise<string[]> {
    const processPromises = files.map((file) =>
      this.processImageToBase64(file)
    );
    return await Promise.all(processPromises);
  }

  generateThumbnail = async (
    buffer: Buffer,
    width: number = 300,
    height: number = 300
  ): Promise<Buffer> => {
    try {
      return await sharp(buffer)
        .resize(width, height, {
          fit: "cover",
          position: "center",
        })
        .jpeg({ quality: 80 })
        .toBuffer();
    } catch (error) {
      console.error("Error generating thumbnail:", error);
      throw createError("Failed to generate thumbnail", 500);
    }
  };

  async processImageWithThumbnailToBase64(
    file: FileUpload
  ): Promise<{ original: string; thumbnail: string }> {
    this.validateFile(file);

    try {
      let processedBuffer = file.buffer;

      // Process main image
      if (file.mimetype !== "image/svg+xml") {
        processedBuffer = await this.processImage(file.buffer, file.mimetype);
      }

      // Generate thumbnail
      const thumbnailBuffer = await this.generateThumbnail(file.buffer);

      // Convert both to base64
      const [originalBase64, thumbnailBase64] = await Promise.all([
        Promise.resolve(
          `data:${file.mimetype};base64,${processedBuffer.toString("base64")}`
        ),
        Promise.resolve(
          `data:image/jpeg;base64,${thumbnailBuffer.toString("base64")}`
        ),
      ]);

      return {
        original: originalBase64,
        thumbnail: thumbnailBase64,
      };
    } catch (error) {
      console.error("Error processing image with thumbnail to base64:", error);
      throw createError(
        "Failed to process image with thumbnail to base64",
        500
      );
    }
  }

  // Utility method to convert base64 data URL back to buffer (if needed)
  base64ToBuffer(base64DataUrl: string): Buffer {
    try {
      const base64String = base64DataUrl.split(",")[1];
      if (!base64String) {
        throw new Error("Invalid base64 data URL format");
      }
      return Buffer.from(base64String, "base64");
    } catch (error) {
      console.error("Error converting base64 to buffer:", error);
      throw createError("Failed to convert base64 to buffer", 500);
    }
  }

  // Utility method to get image info from base64 data URL
  getImageInfo(base64DataUrl: string): { mimeType: string; size: number } {
    try {
      const [header, data] = base64DataUrl.split(",");
      if (!header || !data) {
        return { mimeType: "image/jpeg", size: 0 };
      }
      const mimeType = header.match(/data:([^;]+)/)?.[1] || "image/jpeg";
      const size = Math.round((data.length * 3) / 4); // Approximate size in bytes
      return { mimeType, size };
    } catch (error) {
      console.error("Error getting image info:", error);
      return { mimeType: "image/jpeg", size: 0 };
    }
  }
}

export default new ImageBlobService();
