// src/components/AboutProjectSection.tsx
import React from "react";
import "./AboutProjectSection.css"; // Import CSS module
import backgroundImage from "../assets/images/thumb-intro.jpg"; // Adjust path as needed

const AboutProjectSection: React.FC = () => {
  return (
    <section
      className="intro-section"
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
