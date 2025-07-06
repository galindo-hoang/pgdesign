import React from "react";
import "./ConstructionServicesSection.css";


interface ServiceProcessSectionProps {
  titleLeft: string;
  contentsLeft: string[];
  titleRight: string;
  contentsRight: string[];
}

const ConstructionServicesSection: React.FC<ServiceProcessSectionProps> = ({
  titleLeft,
  contentsLeft,
  titleRight,
  contentsRight,
}) => {
  return (
    <section className="construction-services-section">
      <div className="construction-services-container">
        <div className="construction-services-grid">
          {/* Left Column - Rough Construction */}
          <div className="construction-service-column">
            <h2 className="construction-service-title">{titleLeft}</h2>
            <ul className="construction-service-list">
              {contentsLeft.map((element: string, index: number) => 
                <li key={index}>{element}</li>
              )}
            </ul>
          </div>

          {/* Vertical Divider */}
          <div className="construction-services-divider"></div>

          {/* Right Column - Complete Package */}
          <div className="construction-service-column">
            <h2 className="construction-service-title">{titleRight}</h2>
            <ul className="construction-service-list">
              {contentsRight.map((element: string, index: number) => 
                <li key={index}>{element}</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConstructionServicesSection; 