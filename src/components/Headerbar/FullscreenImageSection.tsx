import React from "react";
import "./FullscreenImageSection.css";
import backgroundImage from "../../assets/images/thumb-home.png"; // Path to your image

const FullscreenImageSection = () => {
  return (
    <div className="fullscreen-container">
      <img
        src={backgroundImage}
        alt="Background"
        className="fullscreen-image"
      />
      {/* Your content goes here, potentially overlaid on the image */}
      <div className="content-overlay"></div>
    </div>
  );
};

export default FullscreenImageSection;
