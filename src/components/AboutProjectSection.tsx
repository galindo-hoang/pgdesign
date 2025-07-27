// src/components/AboutProjectSection.tsx
import React, { useRef, useEffect, useState } from "react";
import "./AboutProjectSection.css"; // Import CSS module

interface AboutProjectContent {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
}

interface AboutProjectSectionProps {
  content: AboutProjectContent;
}

const AboutProjectSection: React.FC<AboutProjectSectionProps> = ({content}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentSectionRef = sectionRef.current;
    
    // Fallback: Trigger animation after 1 second regardless of intersection
    const fallbackTimer = setTimeout(() => {
      if (!isVisible) {
        console.log('About Project - Fallback animation trigger'); // Debug log
        setIsVisible(true);
      }
    }, 1000);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log('About Project - Intersection triggered:', entry.isIntersecting); // Debug log
          if (entry.isIntersecting && !isVisible) {
            console.log('About Project - Starting zoom animation'); // Debug log
            clearTimeout(fallbackTimer); // Cancel fallback if intersection works
            setIsVisible(true);
            // Disconnect observer after first trigger to prevent re-animation
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible (easier to trigger)
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
      className={`intro-section ${isVisible ? 'zoom-in-bg' : ''}`}
      style={{ backgroundImage: `url(${content.backgroundImage})` }}
    >
      <div className="intro-content-container">
        {/* The text is here, inside the h2, which is inside intro-content-container */}
        <h2 className="intro-about-project">
          {content.title}
          {content.subtitle && (
            <>
              <br />
              {content.subtitle}
            </>
          )}
        </h2>
      </div>
    </section>
  );
};

export default AboutProjectSection;
