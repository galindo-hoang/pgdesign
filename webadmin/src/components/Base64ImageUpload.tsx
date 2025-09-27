import React, { useState, useRef, useCallback } from 'react';
import { Upload, X, Edit2, Move } from 'lucide-react';
import './Base64ImageUpload.css';

export interface Base64ImageData {
  id: string;
  base64: string;
  dataUrl: string;
  title: string;
  alt: string;
  size: string;
  type: string;
  width?: number;
  height?: number;
  file?: File;
}

interface Base64ImageUploadProps {
  images: Base64ImageData[];
  onImagesChange: (images: Base64ImageData[]) => void;
  maxFiles?: number;
  allowedTypes?: string[];
  maxSize?: number; // in MB
  showPreview?: boolean;
  multiple?: boolean;
  className?: string;
}

const Base64ImageUpload: React.FC<Base64ImageUploadProps> = ({
  images,
  onImagesChange,
  maxFiles = 10,
  allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  maxSize = 5,
  showPreview = true,
  multiple = true,
  className = ''
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [editingImage, setEditingImage] = useState<Base64ImageData | null>(null);
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

  // Convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to convert file to base64'));
        }
      };
      reader.onerror = (error) => reject(error);
    });
  };

  // Extract base64 string from data URL
  const extractBase64FromDataUrl = (dataUrl: string): string => {
    const base64Index = dataUrl.indexOf(',');
    return base64Index !== -1 ? dataUrl.substring(base64Index + 1) : dataUrl;
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
    setProcessing(true);

    try {
      const newImages: Base64ImageData[] = [];
      
      for (const file of validFiles) {
        try {
          const dataUrl = await fileToBase64(file);
          const base64String = extractBase64FromDataUrl(dataUrl);
          
          const imageData: Base64ImageData = {
            id: `temp-${Date.now()}-${Math.random()}`,
            file,
            base64: base64String,
            dataUrl: dataUrl,
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
          img.src = dataUrl;

          newImages.push(imageData);
        } catch (error) {
          console.error('Error converting file to base64:', error);
          newErrors.push(`Failed to process ${file.name}`);
        }
      }

      if (newImages.length > 0) {
        onImagesChange([...images, ...newImages]);
      }
      
      if (newErrors.length > 0) {
        setErrors(newErrors);
      }
    } catch (error) {
      console.error('Error processing files:', error);
      setErrors([...newErrors, 'Error processing files']);
    } finally {
      setProcessing(false);
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
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  }, [handleFiles]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  }, [handleFiles]);

  const removeImage = (id: string) => {
    onImagesChange(images.filter(img => img.id !== id));
  };

  const moveImage = (fromIndex: number, toIndex: number) => {
    const newImages = [...images];
    const [movedImage] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, movedImage);
    onImagesChange(newImages);
  };

  const ImageEditModal = ({ image, onClose, onSave }: {
    image: Base64ImageData;
    onClose: () => void;
    onSave: (updatedImage: Base64ImageData) => void;
  }) => {
    const [title, setTitle] = useState(image.title);
    const [alt, setAlt] = useState(image.alt);

    const handleSave = () => {
      onSave({ ...image, title, alt });
      onClose();
    };

    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <div className="modal-header">
            <h3>Edit Image</h3>
            <button onClick={onClose} className="close-btn">
              <X size={20} />
            </button>
          </div>
          <div className="modal-body">
            <div className="image-preview-large">
              <img src={image.dataUrl} alt={image.alt} />
            </div>
            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label>Alt Text:</label>
              <input
                type="text"
                value={alt}
                onChange={(e) => setAlt(e.target.value)}
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
    <div className={`base64-image-upload-container ${className}`}>
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
          {processing ? 'Processing images...' : 'Drag & drop images here or click to select'}
        </p>
        <p className="upload-hint">
          Max {maxFiles} files, up to {maxSize}MB each. Images will be converted to base64.
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
            <div key={image.id} className="image-item">
              <div className="image-preview">
                <img src={image.dataUrl} alt={image.alt} />
                <div className="image-overlay">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingImage(image);
                    }}
                    className="image-action-btn"
                    title="Edit"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(image.id);
                    }}
                    className="image-action-btn delete"
                    title="Delete"
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
                <div className="base64-preview">
                  <small>Base64: {image.base64.substring(0, 50)}...</small>
                </div>
              </div>
              <div className="image-actions">
                {index > 0 && (
                  <button
                    onClick={() => moveImage(index, index - 1)}
                    className="move-btn"
                    title="Move left"
                  >
                    ←
                  </button>
                )}
                {index < images.length - 1 && (
                  <button
                    onClick={() => moveImage(index, index + 1)}
                    className="move-btn"
                    title="Move right"
                  >
                    →
                  </button>
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
          onSave={(updatedImage) => {
            const updatedImages = images.map(img => 
              img.id === updatedImage.id ? updatedImage : img
            );
            onImagesChange(updatedImages);
            setEditingImage(null);
          }}
        />
      )}
    </div>
  );
};

export default Base64ImageUpload;
