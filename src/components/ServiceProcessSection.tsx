import React from "react";
import "./ServiceProcessSection.css";
import constructionImage from "../assets/images/diary-image-7.jpg";

interface ServiceProcessSectionProps {
  processNumber: number;
  title: string;
  description: string;
  note: string;
}

const ServiceProcessSection: React.FC<ServiceProcessSectionProps> = ({
  processNumber,
  title,
  description,
  note
}) => {
  return (
    <section className="service-process-section">
      <div 
        className="service-process-background"
        style={{ backgroundImage: `url(${constructionImage})` }}
      >
        <div className="service-process-overlay">
          <div className="service-process-number">
            <span>{processNumber}</span>
          </div>
          
          <div className="service-process-content">
            <div className="service-process-main-content">
              <h1 className="service-process-title">{title}</h1>
              
              <p className="service-process-description">
                {description}
              </p>
            </div>
            { note.length != 0 && (
              <p className="service-process-note">({note})</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceProcessSection ;