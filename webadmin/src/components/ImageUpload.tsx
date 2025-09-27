import React, { useState, useRef, useCallback } from 'react';
import { Upload, X } from 'lucide-react';
import './ImageUpload.css';

export interface ImageData {
  id: string;
  file?: File;
  url: string;
  title: string;
  alt: string;
  size: string;
  type: string;
  width?: number;
  height?: number;
}

interface ImageUploadProps {
  image: ImageData | null;
  onImageChange: (image: ImageData | null) => void;
  allowedTypes?: string[];
  maxSize?: number; // in MB
  showPreview?: boolean;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  image,
  onImageChange,
  allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  maxSize = 5,
  showPreview = true,
  className = ''
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Detect image format from base64 data
  const detectImageFormat = (base64Data: string): string => {
    // Check magic numbers for different image formats
    if (base64Data.startsWith('/9j/')) return 'jpeg';
    if (base64Data.startsWith('iVBORw0KGgo')) return 'png';
    if (base64Data.startsWith('R0lGODlh') || base64Data.startsWith('R0lGODdh')) return 'gif';
    if (base64Data.startsWith('UklGR')) return 'webp';
    if (base64Data.startsWith('Qk0')) return 'bmp';
    
    // Default to jpeg if unknown
    return 'jpeg';
  };

  // Process base64 image data to ensure proper data URL format
  const processImageData = (imageData: any): string | null => {
    // Check if imageData exists
    if (!imageData) {
      return null;
    }
    
    // Handle Buffer object (from Node.js backend)
    if (imageData && typeof imageData === 'object' && imageData.type === 'Buffer' && Array.isArray(imageData.data)) {
      try {
        // Convert Buffer data array to Uint8Array then to base64
        const uint8Array = new Uint8Array(imageData.data);
        let binary = '';
        uint8Array.forEach(byte => {
          binary += String.fromCharCode(byte);
        });
        let base64String = btoa(binary);
        
        // Check if the base64 data is actually a double-encoded data URL
        try {
          const decoded = atob(base64String);
          if (decoded.startsWith('data:image/')) {
            return decoded;
          }
        } catch (e) {
          // Not double-encoded, proceed with normal processing
        }
        
        // Detect image format from the base64 data
        const format = detectImageFormat(base64String);
        const dataUrl = `data:image/${format};base64,${base64String}`;
        
        return dataUrl;
      } catch (error) {
        console.error('Error converting Buffer to base64:', error);
        return null;
      }
    }
    
    // Handle string data
    if (typeof imageData === 'string') {
      // If it's already a data URL, return as is
      if (imageData.startsWith("data:image/")) {
        return imageData;
      }
      
      // Check if this is a double-encoded base64 string
      try {
        const decoded = atob(imageData);
        if (decoded.startsWith('data:image/')) {
          return decoded;
        }
      } catch (e) {
        // Not double-encoded, proceed with normal processing
      }
      
      // Detect format and add proper prefix
      const format = detectImageFormat(imageData);
      return `data:image/${format};base64,${imageData}`;
    }
    
    return null;
  };

  const validateFile = (file: File): string | null => {
    if (!allowedTypes.includes(file.type)) {
      return `File type ${file.type} not allowed. Allowed types: ${allowedTypes.join(', ')}`;
    }
    if (file.size > maxSize * 1024 * 1024) {
      return `File size ${(file.size / 1024 / 1024).toFixed(1)}MB exceeds maximum ${maxSize}MB`;
    }
    return null;
  };

  const handleFiles = useCallback(async (files: FileList) => {
    if (files.length === 0) return;
    
    const file = files[0]; // Only take the first file
    const error = validateFile(file);
    
    if (error) {
      setErrors([error]);
      return;
    }

    setErrors([]);
    setUploading(true);

    try {
      const imageData: ImageData = {
        id: `temp-${Date.now()}-${Math.random()}`,
        file,
        url: URL.createObjectURL(file),
        title: file.name,
        alt: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(1)}MB`,
        type: file.type
      };

      // Get image dimensions
      const img = new Image();
      img.onload = () => {
        imageData.width = img.width;
        imageData.height = img.height;
      };
      img.src = imageData.url;

      onImageChange(imageData); // Replace existing image
    } catch (error) {
      console.error('Error processing file:', error);
      setErrors(['Error processing file']);
    } finally {
      setUploading(false);
    }
  }, [onImageChange, allowedTypes, maxSize]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  }, [handleFiles]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  }, [handleFiles]);

  const removeImage = () => {
    // Clean up object URL if it's a new upload
    if (image?.url && image.url.startsWith('blob:')) {
      URL.revokeObjectURL(image.url);
    }
    onImageChange(null);
  };

  return (
    <div className={`image-upload-container ${className}`}>
      {!image ? (
        // Upload Area - shown when no image
        <div 
          className={`upload-area ${dragActive ? 'drag-active' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="upload-icon" />
          <p>
            {uploading 
              ? 'Uploading...' 
              : 'Drag & drop an image here or click to select'
            }
          </p>
          <p className="upload-hint">
            Up to {maxSize}MB
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept={allowedTypes.join(',')}
            onChange={handleFileInput}
            style={{ display: 'none' }}
          />
        </div>
      ) : (
        // Image Preview - shown when image exists
        showPreview && (
          <div className="image-item">
            <div className="image-preview">
              <img src={processImageData(image.url) || image.url} alt={image.alt} />
              <div className="image-overlay">
                <button
                  onClick={removeImage}
                  className="image-action-btn delete"
                  title="Remove image"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
            <div className="image-info">
              <h4>{image.title}</h4>
              <p>{image.size} • {image.type.split('/')[1].toUpperCase()}</p>
              {image.width && image.height && (
                <p>{image.width} × {image.height}</p>
              )}
            </div>
          </div>
        )
      )}

      {/* Errors */}
      {errors.length > 0 && (
        <div className="error-container">
          {errors.map((error, index) => (
            <div key={index} className="error-message">
              {error}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;