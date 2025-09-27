import React, { useState, useRef, useCallback } from 'react';
import { Upload, X, Edit3, Trash2 } from 'lucide-react';
import './ImageUpload.css';

export interface ImageData {
  id: string;
  file?: File;
  url: string;
  title: string;
  alt: string;
  size?: string;
  type?: string;
  width?: number;
  height?: number;
}

interface MultipleImageUploadProps {
  images: ImageData[];
  onImagesChange: (images: ImageData[]) => void;
  maxFiles?: number;
  allowedTypes?: string[];
  maxSize?: number; // in MB
  showPreview?: boolean;
  enableCrop?: boolean;
  multiple?: boolean;
  className?: string;
}

const MultipleImageUpload: React.FC<MultipleImageUploadProps> = ({
  images,
  onImagesChange,
  maxFiles = 10,
  allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  maxSize = 5,
  showPreview = true,
  enableCrop = false,
  multiple = true,
  className = ''
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [editingImage, setEditingImage] = useState<ImageData | null>(null);
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
    const fileArray = Array.from(files);
    const newErrors: string[] = [];
    const validFiles: File[] = [];

    // Validate files
    for (const file of fileArray) {
      const error = validateFile(file);
      if (error) {
        newErrors.push(error);
      } else {
        validFiles.push(file);
      }
    }

    // For single image mode, limit to 1 file
    if (!multiple || maxFiles === 1) {
      if (validFiles.length > 1) {
        newErrors.push(`Only 1 file allowed in single image mode.`);
        validFiles.splice(1); // Keep only the first file
      }
    } else {
      // Check total count for multiple mode
      if (images.length + validFiles.length > maxFiles) {
        newErrors.push(`Maximum ${maxFiles} files allowed. Currently have ${images.length} files.`);
        setErrors(newErrors);
        return;
      }
    }

    setErrors(newErrors);
    setUploading(true);

    try {
      const newImages: ImageData[] = [];
      
      for (const file of validFiles) {
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

        newImages.push(imageData);
      }

      // For single image mode, replace existing image
      if (!multiple || maxFiles === 1) {
        onImagesChange(newImages); // Replace with new image
      } else {
        onImagesChange([...images, ...newImages]); // Add to existing images
      }
    } catch (error) {
      console.error('Error processing files:', error);
      setErrors([...newErrors, 'Error processing files']);
    } finally {
      setUploading(false);
    }
  }, [images, maxFiles, onImagesChange, allowedTypes, maxSize, multiple]);

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

  const removeImage = (index: number) => {
    const newImages = [...images];
    const removedImage = newImages.splice(index, 1)[0];
    
    // Clean up object URL if it's a new upload
    if (removedImage.url.startsWith('blob:')) {
      URL.revokeObjectURL(removedImage.url);
    }
    
    onImagesChange(newImages);
  };

  const updateImage = (index: number, updates: Partial<ImageData>) => {
    const newImages = [...images];
    newImages[index] = { ...newImages[index], ...updates };
    onImagesChange(newImages);
  };

  const moveImage = (fromIndex: number, toIndex: number) => {
    const newImages = [...images];
    const [movedImage] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, movedImage);
    onImagesChange(newImages);
  };

  const ImageEditModal = ({ image, onClose, onSave }: {
    image: ImageData;
    onClose: () => void;
    onSave: (updates: Partial<ImageData>) => void;
  }) => {
    const [editData, setEditData] = useState({
      title: image.title || '',
      alt: image.alt || ''
    });

    const handleSave = () => {
      onSave(editData);
      onClose();
    };

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h3>Edit Image</h3>
            <button onClick={onClose} className="modal-close">
              <X />
            </button>
          </div>
          <div className="modal-body">
            <div className="image-preview">
              <img src={processImageData(image.url) || image.url} alt={image.alt} />
            </div>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={editData.title}
                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Alt Text</label>
              <input
                type="text"
                value={editData.alt}
                onChange={(e) => setEditData({ ...editData, alt: e.target.value })}
                className="form-input"
              />
            </div>
          </div>
          <div className="modal-footer">
            <button onClick={onClose} className="btn-secondary">Cancel</button>
            <button onClick={handleSave} className="btn-primary">Save</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`image-upload-container ${className}`}>
      {/* Upload Area */}
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
            : (!multiple || maxFiles === 1) 
              ? 'Drag & drop an image here or click to select'
              : 'Drag & drop images here or click to select'
          }
        </p>
        <p className="upload-hint">
          {(!multiple || maxFiles === 1) 
            ? `Up to ${maxSize}MB`
            : `Max ${maxFiles} files, up to ${maxSize}MB each`
          }
        </p>
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept={allowedTypes.join(',')}
          onChange={handleFileInput}
          style={{ display: 'none' }}
        />
      </div>

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

      {/* Images Grid */}
      {images.length > 0 && showPreview && (
        <div className="images-grid">
          {images.map((image, index) => (
            <div key={image.id || index} className="image-item">
              <div className="image-preview">
                <img src={processImageData(image.url) || image.url} alt={image.alt} />
                <div className="image-overlay">
                  <button
                    onClick={() => setEditingImage(image)}
                    className="image-action-btn"
                    title="Edit"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => removeImage(index)}
                    className="image-action-btn delete"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="image-info">
                <h4>{image.title}</h4>
                <p>{image.size} • {image.type?.split('/')[1].toUpperCase()}</p>
                {image.width && image.height && (
                  <p>{image.width} × {image.height}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingImage && (
        <ImageEditModal
          image={editingImage}
          onClose={() => setEditingImage(null)}
          onSave={(updates) => {
            const imageIndex = images.findIndex(img => img.id === editingImage.id);
            if (imageIndex !== -1) {
              updateImage(imageIndex, updates);
            }
            setEditingImage(null);
          }}
        />
      )}
    </div>
  );
};

export default MultipleImageUpload;
