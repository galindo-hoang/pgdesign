// src/components/ServicesSection.tsx
import React, { useRef, useEffect, useState } from "react";
import "./ServicesSection.css"; // Import its dedicated CSS

interface ServiceItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
}

interface ServicesHeroContent {
  mainTitle: string;
  brandName: string;
  description: string;
  heroImageUrl?: string;
}

interface ServicesSectionProps {
  heroContent: ServicesHeroContent;
  services: ServiceItem[];
}

const ServicesSection: React.FC<ServicesSectionProps> = ({heroContent, services}) => {
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
      className={`services-section ${inView ? 'animate-in' : ''}`}
    >
      <div className="services-container">
        <div className="services-hero-content-container">
          <div className="services-hero-content">
            <h1 className="services-main-title">{heroContent.mainTitle}</h1>
            <h2 className="services-brand">{heroContent.brandName}</h2>
            <p className="services-description">
              {heroContent.description}
            </p>
          </div>
        </div>
        
        {/* Hero Image */}
        <div className="services-hero-image">
          <img 
            src={heroContent.heroImageUrl} 
            alt="Modern Interior Design" 
            className="services-hero-img"
          />
        </div>

        <div className="services-grid-container">
          <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-number">
                <span>{service.id}</span>
              </div>
              <div className="service-content">
                <h3 className="service-title">{service.title}</h3>
                {service.subtitle && (
                  <p className="service-subtitle">{service.subtitle}</p>
                )}
                <p className="service-card-description">{service.description}</p>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
