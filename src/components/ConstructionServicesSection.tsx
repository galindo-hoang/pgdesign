import React, { useRef, useEffect, useState } from "react";
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
      className={`construction-services-section ${inView ? 'animate-in' : ''}`}
    >
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