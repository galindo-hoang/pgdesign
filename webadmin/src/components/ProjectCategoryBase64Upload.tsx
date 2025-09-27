import React from 'react';
import Base64ImageUpload, { Base64ImageData } from './Base64ImageUpload';
import { useBase64Images } from '../hooks/useBase64Images';

interface ProjectCategoryBase64UploadProps {
  initialBase64?: string;
  onBase64Change: (base64: string | null) => void;
  title?: string;
  description?: string;
}

const ProjectCategoryBase64Upload: React.FC<ProjectCategoryBase64UploadProps> = ({
  initialBase64,
  onBase64Change,
  title = "Category Background Image",
  description = "Upload a background image for this project category. The image will be converted to base64 format."
}) => {
  const { images, handleImagesChange, loadFromBase64 } = useBase64Images({
    maxFiles: 1, // Only one image for category background
    onImagesChange: (newImages) => {
      // When images change, notify parent with base64 data
      if (newImages.length > 0) {
        onBase64Change(newImages[0].base64);
      } else {
        onBase64Change(null);
      }
    }
  });

  // Load initial base64 data if provided
  React.useEffect(() => {
    if (initialBase64 && images.length === 0) {
      // Detect image type from base64 data
      let imageType = 'image/jpeg'; // default
      if (initialBase64.startsWith('/9j/')) {
        imageType = 'image/jpeg';
      } else if (initialBase64.startsWith('iVBORw0KGgo')) {
        imageType = 'image/png';
      } else if (initialBase64.startsWith('R0lGODlh') || initialBase64.startsWith('R0lGODdh')) {
        imageType = 'image/gif';
      } else if (initialBase64.startsWith('UklGR')) {
        imageType = 'image/webp';
      }

      loadFromBase64([{
        title: 'Category Background',
        alt: 'Category Background Image',
        base64: initialBase64,
        type: imageType,
        size: 'Unknown'
      }]);
    }
  }, [initialBase64, images.length, loadFromBase64]);

  const styles = {
    container: {
      margin: '1.5rem 0'
    },
    header: {
      marginBottom: '1rem'
    },
    title: {
      margin: '0 0 0.5rem 0',
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#1f2937'
    },
    description: {
      margin: 0,
      fontSize: '0.875rem',
      color: '#6b7280',
      lineHeight: 1.5
    },
    uploadContainer: {
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '1rem',
      background: 'white'
    },
    imageInfo: {
      marginTop: '1rem',
      padding: '1rem',
      background: '#f9fafb',
      border: '1px solid #e5e7eb',
      borderRadius: '8px'
    },
    imageInfoTitle: {
      margin: '0 0 0.75rem 0',
      fontSize: '1rem',
      fontWeight: 600,
      color: '#1f2937'
    },
    imageDetailText: {
      margin: '0.25rem 0',
      fontSize: '0.875rem',
      color: '#4b5563'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.description}>{description}</p>
      </div>

      <div style={styles.uploadContainer}>
        <Base64ImageUpload
          images={images}
          onImagesChange={handleImagesChange}
          maxFiles={1}
          maxSize={10}
          allowedTypes={['image/jpeg', 'image/png', 'image/gif', 'image/webp']}
          showPreview={true}
          multiple={false}
        />
      </div>

      {images.length > 0 && (
        <div style={styles.imageInfo}>
          <h4 style={styles.imageInfoTitle}>Current Image</h4>
          <div>
            <p style={styles.imageDetailText}><strong>Type:</strong> {images[0].type}</p>
            <p style={styles.imageDetailText}><strong>Size:</strong> {images[0].size}</p>
            <p style={styles.imageDetailText}><strong>Base64 Length:</strong> {images[0].base64.length} characters</p>
            {images[0].width && images[0].height && (
              <p style={styles.imageDetailText}><strong>Dimensions:</strong> {images[0].width} × {images[0].height}</p>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default ProjectCategoryBase64Upload;
