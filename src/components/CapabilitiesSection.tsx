import React from 'react';
import './CapabilitiesSection.css';
import { CapabilitiesSectionProps } from '../types/profilePageTypes';

const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({ data }) => {
  return (
    <div className="capabilities-section">
      <div className="capabilities-container">
        {/* Header Section */}
        <div className="capabilities-header">
          <h1 className="capabilities-title">{data.title}</h1>
          <h2 className="company-name">{data.companyName}</h2>
          <div className="company-branding">
            <div className="service-line">{data.serviceLine}</div>
            <p className="capabilities-description">
              {data.description}
            </p>
          </div>
        </div>

        {/* Capabilities List */}
        <div className="capabilities-content">
          <div className="capabilities-list">
            <ul>
              {data.capabilities.map((capability, index) => (
                <li key={index}>{capability}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Architectural Images */}
        <div className="architectural-images">
          <div className="image-grid">
            <div className="main-image">
              <img src={data.images.mainImage} alt="Modern villa design with elegant columns and contemporary architecture" />
            </div>
            <div className="side-images">
              {data.images.sideImages.map((image, index) => (
                <div key={index} className="side-image">
                  <img src={image} alt={`Architectural design view ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="benefits-section">
          <h3 className="benefits-title">
            {data.benefitsTitle}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default CapabilitiesSection; 