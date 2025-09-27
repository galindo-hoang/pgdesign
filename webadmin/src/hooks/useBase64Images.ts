import { useState, useCallback } from 'react';
import { Base64ImageData } from '../components/Base64ImageUpload';

interface UseBase64ImagesOptions {
  maxFiles?: number;
  onImagesChange?: (images: Base64ImageData[]) => void;
}

export const useBase64Images = (options: UseBase64ImagesOptions = {}) => {
  const { maxFiles = 10, onImagesChange } = options;
  const [images, setImages] = useState<Base64ImageData[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImagesChange = useCallback((newImages: Base64ImageData[]) => {
    setImages(newImages);
    onImagesChange?.(newImages);
  }, [onImagesChange]);

  const addImages = useCallback((newImages: Base64ImageData[]) => {
    setImages(prev => {
      const combined = [...prev, ...newImages];
      const limited = combined.slice(0, maxFiles);
      onImagesChange?.(limited);
      return limited;
    });
  }, [maxFiles, onImagesChange]);

  const removeImage = useCallback((id: string) => {
    setImages(prev => {
      const filtered = prev.filter(img => img.id !== id);
      onImagesChange?.(filtered);
      return filtered;
    });
  }, [onImagesChange]);

  const updateImage = useCallback((id: string, updates: Partial<Base64ImageData>) => {
    setImages(prev => {
      const updated = prev.map(img => 
        img.id === id ? { ...img, ...updates } : img
      );
      onImagesChange?.(updated);
      return updated;
    });
  }, [onImagesChange]);

  const clearImages = useCallback(() => {
    setImages([]);
    onImagesChange?.([]);
  }, [onImagesChange]);

  const moveImage = useCallback((fromIndex: number, toIndex: number) => {
    setImages(prev => {
      const newImages = [...prev];
      const [movedImage] = newImages.splice(fromIndex, 1);
      newImages.splice(toIndex, 0, movedImage);
      onImagesChange?.(newImages);
      return newImages;
    });
  }, [onImagesChange]);

  // Get base64 data only (without data URL prefix)
  const getBase64Data = useCallback(() => {
    return images.map(img => ({
      id: img.id,
      title: img.title,
      alt: img.alt,
      base64: img.base64,
      type: img.type,
      size: img.size,
      width: img.width,
      height: img.height
    }));
  }, [images]);

  // Get data URLs for display
  const getDataUrls = useCallback(() => {
    return images.map(img => img.dataUrl);
  }, [images]);

  // Load images from base64 data (for editing existing data)
  const loadFromBase64 = useCallback((base64Data: Array<{
    id?: string;
    title: string;
    alt?: string;
    base64: string;
    type: string;
    size?: string;
    width?: number;
    height?: number;
  }>) => {
    const loadedImages: Base64ImageData[] = base64Data.map((data, index) => ({
      id: data.id || `loaded-${Date.now()}-${index}`,
      title: data.title,
      alt: data.alt || data.title,
      base64: data.base64,
      dataUrl: `data:${data.type};base64,${data.base64}`,
      type: data.type,
      size: data.size || 'Unknown',
      width: data.width,
      height: data.height
    }));

    setImages(loadedImages);
    onImagesChange?.(loadedImages);
  }, [onImagesChange]);

  return {
    images,
    isProcessing,
    setIsProcessing,
    handleImagesChange,
    addImages,
    removeImage,
    updateImage,
    clearImages,
    moveImage,
    getBase64Data,
    getDataUrls,
    loadFromBase64
  };
};

export default useBase64Images;
