// src/components/AboutProjectSection.tsx
import React, { useRef, useEffect, useState } from "react";
import "./AboutProjectSection.css"; // Import CSS module
import backgroundImage from "../assets/images/thumb-intro.jpg"; // Adjust path as needed

const AboutProjectSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fallback: Trigger animation after 1 second regardless of intersection
    const fallbackTimer = setTimeout(() => {
      if (!isVisible) {
        console.log('Fallback animation trigger'); // Debug log
        setIsVisible(true);
      }
    }, 1000);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log('Intersection triggered:', entry.isIntersecting); // Debug log
          if (entry.isIntersecting && !isVisible) {
            console.log('Starting zoom animation'); // Debug log
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      clearTimeout(fallbackTimer);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      observer.disconnect();
    };
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className={`intro-section ${isVisible ? 'zoom-in-bg' : ''}`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="intro-content-container">
        {/* The text is here, inside the h2, which is inside intro-content-container */}
        <h2 className="intro-about-project">
          Dự án
          <br />
          PG DESIGN
        </h2>
      </div>
    </section>
  );
};

export default AboutProjectSection;
