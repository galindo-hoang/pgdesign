import React from 'react';
import './ConstructionProcessSection.css';
import { ConstructionProcessSectionProps } from '../types/profilePageTypes';

const ConstructionProcessSection: React.FC<ConstructionProcessSectionProps> = ({ data }) => {
  return (
    <div className="construction-process-section">
      
      {/* Section 1: Modern Design */}
      <div className="process-section">
        <div className="process-header">
          <h3 className="process-title">{data.sections[0].title}</h3>
          <p className="process-description">
            {data.sections[0].description}
          </p>
        </div>
        <div className="process-images two-images">
          <img src={data.sections[0].images[0]} alt="Modern interior design" />
          <img src={data.sections[0].images[1]} alt="Contemporary design trends" />
        </div>
      </div>

      {/* Section 2: Quality Construction */}
      <div className="process-section">
        <div className="process-header">
          <h3 className="process-title">{data.sections[1].title}</h3>
          <p className="process-description">
            {data.sections[1].description}
          </p>
        </div>
        <div className="process-images three-images">
          <img src={data.sections[1].images[0]} alt="Construction site foundation" />
          <img src={data.sections[1].images[1]} alt="Professional construction work" />
          <img src={data.sections[1].images[2]} alt="Construction progress monitoring" />
        </div>
      </div>

      {/* Section 3: Dedicated Team */}
      <div className="process-section">
        <div className="process-header">
          <h3 className="process-title">{data.sections[2].title}</h3>
          <p className="process-description">
            {data.sections[2].description}
          </p>
        </div>
        <div className="process-images single-large">
          <img src={data.sections[2].images[0]} alt="Dedicated construction team working" />
        </div>
      </div>

      {/* Section 4: Time and Cost Optimization */}
      <div className="process-section">
        <div className="process-header">
          <h3 className="process-title">{data.sections[3].title}</h3>
          <p className="process-description">
            {data.sections[3].description}
          </p>
        </div>
        <div className="process-images time-optimization">
          <div className="worker-row">
            <img src={data.sections[3].images[0]} alt="Professional worker with quality control" />
            <img src={data.sections[3].images[1]} alt="Construction site surveying" />
          </div>
          <div className="main-worker">
            <img src={data.sections[3].images[2]} alt="Construction progress and quality assurance" />
          </div>
        </div>
      </div>

    </div>
  );
};

export default ConstructionProcessSection; 