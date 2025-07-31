import React from 'react';
import './TechnicalAdvantagesSection.css';
import { TechnicalAdvantagesSectionProps } from '../types/profilePageTypes';

const TechnicalAdvantagesSection: React.FC<TechnicalAdvantagesSectionProps> = ({ data }) => {
  return (
    <div className="technical-advantages-section">
      <div className="technical-container">
        
        {/* Main Title */}
        <div className="main-header">
          <h2 className="main-title">{data.mainTitle}</h2>
        </div>

        {/* Dynamic Phase Sections */}
        {data.phases.map((phase, index) => (
          <div key={index} className="phase-section">
            <div className="phase-header">
              <h3 className="phase-title">{phase.title}</h3>
              <p className="phase-description">
                {phase.description}
              </p>
            </div>
            
            <div className={`phase-images ${phase.layoutType}`}>
              {phase.layoutType === 'three-grid' && (
                <>
                  <img src={phase.images[0]} alt={`${phase.title} - view 1`} />
                  <img src={phase.images[1]} alt={`${phase.title} - view 2`} />
                  <img src={phase.images[2]} alt={`${phase.title} - view 3`} />
                </>
              )}
              
              {phase.layoutType === 'mixed-layout' && phase.images.length === 4 && (
                <>
                  <div className="main-large">
                    <img src={phase.images[0]} alt={`${phase.title} - main view`} />
                  </div>
                  <div className="sub-row">
                    <img src={phase.images[1]} alt={`${phase.title} - sub view 1`} />
                    <img src={phase.images[2]} alt={`${phase.title} - sub view 2`} />
                    <img src={phase.images[3]} alt={`${phase.title} - sub view 3`} />
                  </div>
                </>
              )}
              
              {phase.layoutType === 'mixed-layout' && phase.images.length === 3 && (
                <>
                  <div className="top-row">
                    <img src={phase.images[0]} alt={`${phase.title} - top view 1`} />
                    <img src={phase.images[1]} alt={`${phase.title} - top view 2`} />
                  </div>
                  <div className="bottom-large">
                    <img src={phase.images[2]} alt={`${phase.title} - bottom large view`} />
                  </div>
                </>
              )}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default TechnicalAdvantagesSection; 