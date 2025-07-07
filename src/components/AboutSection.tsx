// src/components/AboutSection.tsx
import React from "react";
import "./AboutSection.css"; // Import its dedicated CSS

// You might not need props for this simple component, but it's good practice
// to define an interface if you wanted to make the text dynamic.
interface AboutSectionProps {
  headline?: string;
  subHeadline?: string;
  description?: string;
}

const AboutSection: React.FC<AboutSectionProps> = (data) => {
  return (
    <section className="about-section">
      <h2 className="about-headline">{data.headline}</h2>
      <div className="about-subheadline-container">
        <h3 className="about-headline">{data.subHeadline}</h3>
      </div>
      <p className="about-description">{data.description}</p>
    </section>
  );
};

export default AboutSection;
