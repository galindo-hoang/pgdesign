import React, { useState, useRef, useCallback } from 'react';
import { Upload, X, Edit3, Eye, Trash2, RotateCw, Crop } from 'lucide-react';
import './ImageUpload.css';

export interface ImageData {
  id?: string;
  file?: File;
  url: string;
  title?: string;
  alt?: string;
  size?: string;
  type?: string;
  width?: number;
  height?: number;
}

interface ImageUploadProps {
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

const ImageUpload: React.FC<ImageUploadProps> = ({
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
  const [showCropModal, setShowCropModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

    // Check total count
    if (images.length + validFiles.length > maxFiles) {
      newErrors.push(`Maximum ${maxFiles} files allowed. Currently have ${images.length} files.`);
      setErrors(newErrors);
      return;
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

      onImagesChange([...images, ...newImages]);
    } catch (error) {
      console.error('Error processing files:', error);
      setErrors([...newErrors, 'Error processing files']);
    } finally {
      setUploading(false);
    }
  }, [images, maxFiles, onImagesChange, allowedTypes, maxSize]);

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
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  }, [handleFiles]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

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
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h3>Edit Image</h3>
            <button onClick={onClose} className="modal-close">
              <X />
            </button>
          </div>
          <div className="modal-body">
            <div className="image-preview">
              <img src={image.url} alt={image.alt} />
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
            <div className="image-info">
              <p><strong>Size:</strong> {image.size}</p>
              <p><strong>Type:</strong> {image.type}</p>
              {image.width && image.height && (
                <p><strong>Dimensions:</strong> {image.width} × {image.height}</p>
              )}
            </div>
          </div>
          <div className="modal-footer">
            <button onClick={onClose} className="btn-secondary">Cancel</button>
            <button onClick={handleSave} className="btn-primary">Save Changes</button>
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
          {uploading ? 'Uploading...' : 'Drag & drop images here or click to select'}
        </p>
        <p className="upload-hint">
          Max {maxFiles} files, up to {maxSize}MB each
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
      {images.length > 0 && (
        <div className="images-grid">
          {images.map((image, index) => (
            <div key={image.id || index} className="image-item">
              <div className="image-preview">
                <img src={image.url} alt={image.alt} />
                <div className="image-overlay">
                  <button
                    onClick={() => setEditingImage(image)}
                    className="image-action-btn"
                    title="Edit"
                  >
                    <Edit3 />
                  </button>
                  <button
                    onClick={() => {/* View full size */}}
                    className="image-action-btn"
                    title="View"
                  >
                    <Eye />
                  </button>
                  {enableCrop && (
                    <button
                      onClick={() => setShowCropModal(true)}
                      className="image-action-btn"
                      title="Crop"
                    >
                      <Crop />
                    </button>
                  )}
                  <button
                    onClick={() => removeImage(index)}
                    className="image-action-btn delete"
                    title="Delete"
                  >
                    <Trash2 />
                  </button>
                </div>
              </div>
              <div className="image-info">
                <p className="image-title">{image.title}</p>
                <p className="image-size">{image.size}</p>
                {image.width && image.height && (
                  <p className="image-dimensions">{image.width} × {image.height}</p>
                )}
              </div>
              <div className="image-actions">
                <button
                  onClick={() => moveImage(index, Math.max(0, index - 1))}
                  disabled={index === 0}
                  className="btn-sm"
                >
                  ←
                </button>
                <button
                  onClick={() => moveImage(index, Math.min(images.length - 1, index + 1))}
                  disabled={index === images.length - 1}
                  className="btn-sm"
                >
                  →
                </button>
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
            const index = images.findIndex(img => img.id === editingImage.id);
            if (index !== -1) {
              updateImage(index, updates);
            }
          }}
        />
      )}
    </div>
  );
};

export default ImageUpload; 