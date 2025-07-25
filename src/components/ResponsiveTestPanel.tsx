import React, { useState } from 'react';
import './ResponsiveTestPanel.css';

const ResponsiveTestPanel: React.FC = () => {
  const [currentWidth, setCurrentWidth] = useState(window.innerWidth);
  const [currentHeight, setCurrentHeight] = useState(window.innerHeight);

  React.useEffect(() => {
    const handleResize = () => {
      setCurrentWidth(window.innerWidth);
      setCurrentHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="responsive-test-panel">
      <div className="test-header">
        <h3>Responsive Color Picker Test</h3>
        <div className="screen-info">
          <span>Width: {currentWidth}px</span>
          <span>Height: {currentHeight}px</span>
        </div>
      </div>
      
      <div className="test-breakpoints">
        <div className="breakpoint-info">
          <h4>Breakpoints:</h4>
          <ul>
            <li className={currentWidth <= 360 ? 'active' : ''}>
              &le; 360px: Extra Small Mobile
            </li>
            <li className={currentWidth > 360 && currentWidth <= 480 ? 'active' : ''}>
              361px - 480px: Small Mobile
            </li>
            <li className={currentWidth > 480 && currentWidth <= 768 ? 'active' : ''}>
              481px - 768px: Mobile/Tablet
            </li>
            <li className={currentWidth > 768 ? 'active' : ''}>
              &gt; 768px: Desktop
            </li>
          </ul>
        </div>
      </div>

      <div className="test-instructions">
        <h4>Test Instructions:</h4>
        <ol>
          <li>Resize your browser window to test different screen sizes</li>
          <li>Click on the color picker buttons (A and ■) in the Quill editor</li>
          <li>Observe how the color picker dropdown adapts to different screen sizes</li>
          <li>Test on mobile devices or use browser dev tools mobile simulation</li>
        </ol>
      </div>

      <div className="test-features">
        <h4>Responsive Features:</h4>
        <ul>
          <li>✅ Color picker positioning adjusts based on screen size</li>
          <li>✅ Grid layout changes from 5x5 to 4x4 on smaller screens</li>
          <li>✅ Color swatch sizes scale down appropriately</li>
          <li>✅ Dropdown positioning prevents overflow</li>
          <li>✅ Landscape orientation support</li>
          <li>✅ High DPI display optimization</li>
        </ul>
      </div>
    </div>
  );
};

export default ResponsiveTestPanel; 