// src/components/AboutUsSection.tsx
import React, { useRef, useEffect, useState } from "react";
import "./VisionMissionSection.css";
// Make sure you have this image in src/assets/images/ or update the path

interface VisionMissionContent {
  image?: string;
  vision: {
    title: string;
    paragraphs: string[];
  };
  mission: {
    title: string;
    items: string[];
  };
  coreValues: {
    title: string;
    values: Array<{
      title: string;
      description: string;
    }>;
  };
}

interface VisionMissionSectionProps {
  content: VisionMissionContent;
}

const VisionMissionSection: React.FC<VisionMissionSectionProps> = ({content}) => {
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            // Disconnect observer after first trigger to prevent re-animation
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of the element is visible
        rootMargin: '0px 0px -50px 0px', // Adjust trigger point
      }
    );

    if (imageContainerRef.current) {
      observer.observe(imageContainerRef.current);
    }

    return () => {
      if (imageContainerRef.current) {
        observer.unobserve(imageContainerRef.current);
      }
      observer.disconnect();
    };
  }, [isVisible]);

  return (
    <section className="about-us-section">
      <div className="about-us-content-wrapper">
        <div 
          ref={imageContainerRef}
          className={`about-us-image-container ${isVisible ? 'zoom-in-animation' : ''}`}
        >
          <img
            src={content.image}
            alt="Interior decoration with lamp and plant"
            className="about-us-decoration-image"
          />
        </div>

        <div className="about-us-text-content">
          <div className="about-us-block">
            <div className="about-us-heading">{content.vision.title}</div>
            {content.vision.paragraphs.map((paragraph, index) => (
              <p key={index} className={index === 0 ? "remove-margin" : ""}>
                {paragraph}
              </p>
            ))}
          </div>

          <div className="about-us-block">
            <div className="about-us-heading">{content.mission.title}</div>
            <ul>
              {content.mission.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="about-us-block">
            <div className="about-us-heading">{content.coreValues.title}</div>
            {content.coreValues.values.map((value, index) => (
              <p key={index} className="core-value-item">
                <strong>{value.title}</strong>
                <br />
                {value.description}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMissionSection;
