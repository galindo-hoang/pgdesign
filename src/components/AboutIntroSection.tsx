import React, { useRef, useEffect, useState } from "react";
import "./AboutIntroSection.css"; // Import CSS module

interface AboutIntroContent {
  brandTitle: string;
  brandSubtitle: string;
  identity: string;
  descriptions: string[];
  backgroundImage?: string;
}

interface AboutIntroSectionProps {
  content: AboutIntroContent;
}

const AboutIntroSection: React.FC<AboutIntroSectionProps> = ({content}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentSectionRef = sectionRef.current;
    
    // Fallback: Trigger animation after 1 second regardless of intersection
    const fallbackTimer = setTimeout(() => {
      if (!isVisible) {
        console.log('About Intro - Fallback animation trigger'); // Debug log
        setIsVisible(true);
      }
    }, 1000);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log('About Intro - Intersection triggered:', entry.isIntersecting); // Debug log
          if (entry.isIntersecting && !isVisible) {
            console.log('About Intro - Starting zoom animation'); // Debug log
            clearTimeout(fallbackTimer); // Cancel fallback if intersection works
            setIsVisible(true);
            // Disconnect observer after first trigger to prevent re-animation
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px', // Reduced margin for easier triggering
      }
    );

    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }

    return () => {
      clearTimeout(fallbackTimer);
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
      observer.disconnect();
    };
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className={`about-intro-section ${isVisible ? 'zoom-in-bg' : ''}`}
      style={{ backgroundImage: `url(${content.backgroundImage})` }}
    >
      <div className="about-intro-content-container">
        <div className="intro-pg-design">
          <p className="about-intro-pg-design-title">{content.brandTitle}</p>
          <p className="about-intro-pg-design-subtitle">{content.brandSubtitle}</p>
        </div>

        <div className="about-intro-separator-line"></div>

        <p className="about-intro-affirm-identity">{content.identity}</p>

        {content.descriptions.map((description, index) => (
          <p key={index} className="about-intro-description-paragraph">
            {description}
          </p>
        ))}
      </div>
    </section>
  );
};

export default AboutIntroSection;
