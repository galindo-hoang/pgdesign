import React, { useRef, useEffect, useState } from "react";
import "./ServiceProcessSection.css";

interface ServiceProcessSectionProps {
  processNumber: number;
  title: string[]; // Changed from string to string[]
  description: string;
  note: string;
  imageUrl: string;
}

const ServiceProcessSection: React.FC<ServiceProcessSectionProps> = ({
  processNumber,
  title,
  description,
  note,
  imageUrl
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const currentRef = sectionRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={`service-process-section ${inView ? 'animate-in' : ''}`}
    >
      <div 
        className="service-process-background"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="service-process-overlay">
          <div className="service-process-number">
            <span>{processNumber}</span>
          </div>
          
          <div className="service-process-content">
            <div className="service-process-main-content">
              <h1 className="service-process-title">
                {title.map((titleLine, index) => (
                  <React.Fragment key={index}>
                    {titleLine}
                    {index < title.length - 1 && <br />}
                  </React.Fragment>
                ))}
              </h1>
              
              <p className="service-process-description">
                {description}
              </p>
            </div>
            { note.length !== 0 && (
              <p className="service-process-note">({note})</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceProcessSection;