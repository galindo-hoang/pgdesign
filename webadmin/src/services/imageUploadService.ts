// Image Upload Service - Upload files to S3 via backend API
const API_BASE_URL =
  process.env.REACT_APP_API_URL || "https://be.pgdesign.vn/api/v1";

export interface UploadResponse {
  success: boolean;
  message: string;
  data: {
    url?: string;
    urls?: string[];
    thumbnailUrl?: string;
    originalUrl?: string;
    count?: number;
    filename?: string;
    size?: number;
    mimetype?: string;
  };
}

/**
 * Upload single image to S3
 * @param file - File to upload
 * @param folder - Folder name in S3 (optional)
 * @returns Promise with uploaded image URL
 */
export const uploadSingleImage = async (
  file: File,
  folder: string = "images"
): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("folder", folder);

  try {
    const response = await fetch(`${API_BASE_URL}/upload/image`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status}`);
    }

    const result: UploadResponse = await response.json();

    if (!result.success || !result.data.url) {
      throw new Error(result.message || "Upload failed");
    }

    return result.data.url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

/**
 * Upload multiple images to S3
 * @param files - Files to upload
 * @param folder - Folder name in S3 (optional)
 * @returns Promise with array of uploaded image URLs
 */
export const uploadMultipleImages = async (
  files: File[],
  folder: string = "images"
): Promise<string[]> => {
  const formData = new FormData();
  files.forEach((file) => formData.append("images", file));
  formData.append("folder", folder);

  try {
    const response = await fetch(`${API_BASE_URL}/upload/images`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status}`);
    }

    const result: UploadResponse = await response.json();

    if (!result.success || !result.data.urls) {
      throw new Error(result.message || "Upload failed");
    }

    return result.data.urls;
  } catch (error) {
    console.error("Error uploading images:", error);
    throw error;
  }
};

/**
 * Upload project detail thumbnail (generates both original and thumbnail)
 * @param file - File to upload
 * @param projectId - Project ID for folder organization
 * @returns Promise with thumbnail and original URLs
 */
export const uploadProjectDetailThumbnail = async (
  file: File,
  projectId: string
): Promise<{ thumbnailUrl: string; originalUrl: string }> => {
  const formData = new FormData();
  formData.append("thumbnail", file);
  formData.append("projectId", projectId);

  try {
    const response = await fetch(
      `${API_BASE_URL}/upload/project-detail-thumbnail`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status}`);
    }

    const result: UploadResponse = await response.json();

    if (
      !result.success ||
      !result.data.thumbnailUrl ||
      !result.data.originalUrl
    ) {
      throw new Error(result.message || "Upload failed");
    }

    return {
      thumbnailUrl: result.data.thumbnailUrl,
      originalUrl: result.data.originalUrl,
    };
  } catch (error) {
    console.error("Error uploading thumbnail:", error);
    throw error;
  }
};

/**
 * Upload project detail images
 * @param files - Files to upload
 * @param projectId - Project ID for folder organization
 * @returns Promise with array of uploaded image URLs
 */
export const uploadProjectDetailImages = async (
  files: File[],
  projectId: string
): Promise<string[]> => {
  const formData = new FormData();
  files.forEach((file) => formData.append("images", file));
  formData.append("projectId", projectId);

  try {
    const response = await fetch(
      `${API_BASE_URL}/upload/project-detail-images`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status}`);
    }

    const result: UploadResponse = await response.json();

    if (!result.success || !result.data.urls) {
      throw new Error(result.message || "Upload failed");
    }

    return result.data.urls;
  } catch (error) {
    console.error("Error uploading project images:", error);
    throw error;
  }
};

/**
 * Delete file from S3 by URL
 * @param url - File URL to delete
 */
export const deleteFile = async (url: string): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/upload/file`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      throw new Error(`Delete failed: ${response.status}`);
    }

    const result: UploadResponse = await response.json();

    if (!result.success) {
      throw new Error(result.message || "Delete failed");
    }
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
};

/**
 * Validate image file before upload
 * @param file - File to validate
 * @returns Validation result
 */
export const validateImageFile = (
  file: File
): { valid: boolean; error?: string } => {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/svg+xml",
  ];

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: "Chỉ hỗ trợ file JPG, PNG, GIF, WebP, SVG" };
  }

  if (file.size > maxSize) {
    return { valid: false, error: "File không được vượt quá 5MB" };
  }

  return { valid: true };
};
