import React, { useState, useRef, useEffect } from 'react';
import './AdvancedColorPicker.css';

interface AdvancedColorPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onColorSelect: (color: string) => void;
  currentColor?: string;
  position?: { x: number; y: number };
}

const AdvancedColorPicker: React.FC<AdvancedColorPickerProps> = ({
  isOpen,
  onClose,
  onColorSelect,
  currentColor = '#000000',
  position
}) => {
  const [selectedColor, setSelectedColor] = useState(currentColor);
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [lightness, setLightness] = useState(50);
  const pickerRef = useRef<HTMLDivElement>(null);

  // Predefined color palette
  const colorPalette = [
    // Basic colors
    '#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff',
    '#ffff00', '#ff00ff', '#00ffff', '#ff8000', '#8000ff',
    
    // Extended palette
    '#e60000', '#008a00', '#0066cc', '#9933ff', '#ff6600',
    '#ffcc00', '#33cc33', '#3366ff', '#cc33ff', '#ff3366',
    '#ff9933', '#ffff00', '#99ff33', '#33ffff', '#3399ff',
    '#ff33cc', '#ff6633', '#ffff99', '#ccff99', '#99ffff',
    '#9999ff', '#ff99cc', '#ffcc99', '#cccccc', '#666666'
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    onColorSelect(color);
  };

  const handleHueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHue = parseInt(e.target.value);
    setHue(newHue);
    const newColor = `hsl(${newHue}, ${saturation}%, ${lightness}%)`;
    setSelectedColor(newColor);
  };

  const handleSaturationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSaturation = parseInt(e.target.value);
    setSaturation(newSaturation);
    const newColor = `hsl(${hue}, ${newSaturation}%, ${lightness}%)`;
    setSelectedColor(newColor);
  };

  const handleLightnessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLightness = parseInt(e.target.value);
    setLightness(newLightness);
    const newColor = `hsl(${hue}, ${saturation}%, ${newLightness}%)`;
    setSelectedColor(newColor);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="advanced-color-picker-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000
      }}
    >
      <div 
        ref={pickerRef}
        className="advanced-color-picker"
        style={{
          position: 'absolute',
          top: position?.y || 50,
          left: position?.x || 50,
          zIndex: 1001
        }}
      >
        <div className="color-picker-header">
          <span className="color-picker-title">Colors</span>
          <button className="color-picker-close" onClick={onClose}>×</button>
        </div>

        <div className="color-picker-content">
          {/* Color Wheel Section */}
          <div className="color-wheel-section">
            <div className="color-wheel-container">
              <div 
                className="color-wheel"
                style={{
                  background: `conic-gradient(from 0deg, #ff0000, #ff8000, #ffff00, #80ff00, #00ff00, #00ff80, #00ffff, #0080ff, #0000ff, #8000ff, #ff00ff, #ff0080, #ff0000)`
                }}
              >
                <div 
                  className="color-wheel-inner"
                  style={{
                    background: `radial-gradient(circle, transparent 0%, transparent 70%, ${selectedColor} 70%)`
                  }}
                >
                  <div 
                    className="color-wheel-cursor"
                    style={{
                      transform: `rotate(${hue}deg) translateX(40px)`
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Saturation/Brightness Slider */}
            <div className="saturation-slider-container">
              <div 
                className="saturation-slider"
                style={{
                  background: `linear-gradient(to right, ${selectedColor}, #000000)`
                }}
              >
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={saturation}
                  onChange={handleSaturationChange}
                  className="saturation-range"
                />
              </div>
            </div>
          </div>

          {/* Color Swatches */}
          <div className="color-swatches-section">
            <div className="color-swatches-grid">
              {colorPalette.map((color, index) => (
                <button
                  key={index}
                  className={`color-swatch ${selectedColor === color ? 'selected' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorSelect(color)}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Current Color Display */}
          <div className="current-color-section">
            <div className="current-color-display">
              <div 
                className="current-color-preview"
                style={{ backgroundColor: selectedColor }}
              />
              <span className="current-color-value">{selectedColor}</span>
            </div>
            <div className="color-picker-actions">
              <button className="color-picker-cancel" onClick={onClose}>
                Cancel
              </button>
              <button 
                className="color-picker-ok"
                onClick={() => {
                  onColorSelect(selectedColor);
                  onClose();
                }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedColorPicker; 