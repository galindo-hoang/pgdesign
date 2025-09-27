// src/components/AboutProjectSection.tsx
import React, { useRef, useEffect, useState } from "react";
import "./AboutProjectSection.css"; // Import CSS module

interface AboutProjectContent {
  title: string;
  subtitle?: string;
  backgroundImage?: string | null;
}

interface AboutProjectSectionProps {
  content: AboutProjectContent;
}

const AboutProjectSection: React.FC<AboutProjectSectionProps> = ({content}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Process image data - handle double-encoding issue (consistent with ProjectCategoriesSection)
  const processImageData = (imageData: string | null | undefined): string | null => {
    if (!imageData) return null;
    
    if (typeof imageData !== 'string') {
      console.log('AboutProject imageData is not string:', typeof imageData, imageData);
      return null;
    }
    
    const imageString = imageData.trim();
    if (imageString === '') return null;
    
    // Check if this is a double-encoded base64 string
    if (imageString.startsWith('data:image/') && imageString.includes('base64,')) {
      try {
        const base64Part = imageString.split('base64,')[1];
        const decoded = atob(base64Part);
        
        // If decoded string is also a data URL, use it instead
        if (decoded.startsWith('data:image/')) {
          console.log('AboutProject: Detected double-encoded image, using decoded version');
          return decoded;
        }
      } catch (error) {
        console.log('AboutProject: Error decoding base64:', error);
      }
    }
    
    // Return original string if no double-encoding detected
    return imageString;
  };

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

  const processedBackgroundImage = processImageData(content.backgroundImage);
  console.log('AboutProject processed image:', processedBackgroundImage ? processedBackgroundImage.substring(0, 50) + '...' : 'null');

  return (
    <section
      ref={sectionRef}
      className={`intro-section ${isVisible ? 'zoom-in-bg' : ''}`}
      style={{ 
        backgroundImage: processedBackgroundImage ? `url(${processedBackgroundImage})` : 'none',
        backgroundColor: !processedBackgroundImage ? '#f0f0f0' : 'transparent'
      }}
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
