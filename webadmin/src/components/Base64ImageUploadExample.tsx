import React, { useState } from 'react';
import Base64ImageUpload, { Base64ImageData } from './Base64ImageUpload';

const Base64ImageUploadExample: React.FC = () => {
  const [images, setImages] = useState<Base64ImageData[]>([]);

  const handleImagesChange = (newImages: Base64ImageData[]) => {
    setImages(newImages);
    console.log('Images updated:', newImages);
    
    // Log base64 data for each image
    newImages.forEach((image, index) => {
      console.log(`Image ${index + 1} base64:`, image.base64.substring(0, 100) + '...');
    });
  };

  const handleSaveImages = () => {
    // This is where you would save the base64 data to your backend
    const base64Data = images.map(img => ({
      id: img.id,
      title: img.title,
      alt: img.alt,
      base64: img.base64,
      type: img.type,
      size: img.size
    }));

    console.log('Saving base64 data:', base64Data);
    
    // Example: Send to backend
    // await saveProjectCategoryImages(base64Data);
    
    alert(`Ready to save ${images.length} images as base64 data!`);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h2>Base64 Image Upload Example</h2>
      <p>Upload images and they will be automatically converted to base64 format.</p>
      
      <Base64ImageUpload
        images={images}
        onImagesChange={handleImagesChange}
        maxFiles={5}
        maxSize={10}
        allowedTypes={['image/jpeg', 'image/png', 'image/gif', 'image/webp']}
        showPreview={true}
        multiple={true}
      />

      {images.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Current Images ({images.length})</h3>
          <div style={{ marginBottom: '1rem' }}>
            {images.map((image, index) => (
              <div key={image.id} style={{ 
                marginBottom: '1rem', 
                padding: '1rem', 
                border: '1px solid #e5e7eb', 
                borderRadius: '8px',
                backgroundColor: '#f9fafb'
              }}>
                <h4>{image.title}</h4>
                <p><strong>Type:</strong> {image.type}</p>
                <p><strong>Size:</strong> {image.size}</p>
                <p><strong>Base64 length:</strong> {image.base64.length} characters</p>
                <details>
                  <summary>View Base64 Data</summary>
                  <textarea 
                    readOnly 
                    value={image.base64} 
                    style={{ 
                      width: '100%', 
                      height: '100px', 
                      marginTop: '0.5rem',
                      fontFamily: 'monospace',
                      fontSize: '0.75rem'
                    }} 
                  />
                </details>
              </div>
            ))}
          </div>
          
          <button 
            onClick={handleSaveImages}
            style={{
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Save Images as Base64
          </button>
        </div>
      )}
    </div>
  );
};

export default Base64ImageUploadExample;
