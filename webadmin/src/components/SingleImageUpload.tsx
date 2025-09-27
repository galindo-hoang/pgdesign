import React, { useState, useRef, useCallback } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import './Base64ImageUpload.css';

interface SingleImageUploadProps {
  onImageUpload: (base64Data: string) => void;
  onImageRemove: () => void;
  currentImage: string | null;
  maxSizeKB?: number;
  acceptedFormats?: string[];
  className?: string;
  label?: string;
}

const SingleImageUpload: React.FC<SingleImageUploadProps> = ({
  onImageUpload,
  onImageRemove,
  currentImage,
  maxSizeKB = 2048,
  acceptedFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  className = '',
  label = 'Upload Image'
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    if (!acceptedFormats.includes(file.type)) {
      return `File type ${file.type} not allowed. Allowed types: ${acceptedFormats.join(', ')}`;
    }
    if (file.size > maxSizeKB * 1024) {
      return `File size ${(file.size / 1024).toFixed(1)}KB exceeds maximum ${maxSizeKB}KB`;
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

  const handleFiles = useCallback(async (files: FileList) => {
    const file = files[0]; // Only handle first file for single upload
    if (!file) return;

    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setProcessing(true);

    try {
      const dataUrl = await fileToBase64(file);
      onImageUpload(dataUrl);
    } catch (error) {
      console.error('Error converting file to base64:', error);
      setError('Failed to process image');
    } finally {
      setProcessing(false);
    }
  }, [onImageUpload, maxSizeKB, acceptedFormats]);

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


  return (
    <div className={`single-image-upload-container ${className}`}>
      {label && <label className="upload-label">{label}</label>}
      
      {!currentImage ? (
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
            {processing ? 'Processing image...' : 'Drag & drop an image here or click to select'}
          </p>
          <p className="upload-hint">
            Max {(maxSizeKB / 1024).toFixed(1)}MB. Accepted formats: {acceptedFormats.map(f => f.split('/')[1].toUpperCase()).join(', ')}
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept={acceptedFormats.join(',')}
            onChange={handleFileInput}
            style={{ display: 'none' }}
          />
        </div>
      ) : (
        <div className="image-preview-container">
          <div className="image-preview-single">
            <img src={currentImage} alt="Uploaded image" />
            <div className="image-overlay">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="image-action-btn"
                title="Replace image"
              >
                <ImageIcon size={16} />
              </button>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept={acceptedFormats.join(',')}
            onChange={handleFileInput}
            style={{ display: 'none' }}
          />
        </div>
      )}

      {error && (
        <div className="error-container">
          <div className="error-message">
            {error}
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleImageUpload;
