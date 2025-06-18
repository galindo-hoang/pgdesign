import React from "react";
import "./HomePage.css";
import thumbIntro from "../../assets/images/thumb-intro.jpg";
import AboutSection from "../../components/AboutSection";
import ImageSliderSection from "../../components/ImageSliderSection";
import StatsSection from "../../components/StatsSection";
import ServicesSection from "../../components/ServicesSection";
import WorkflowSection from "../../components/WorkProcessSection";
import TeamSection from "../../components/TeamSection";
import ProjectDiarySection from "../../components/ProjectDiarySection";
import TestimonialSliderSection from "../../components/TestimonialSliderSection";
import ConsultationFormSection from "../../components/ConsultationFormSection";

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      {/* Hero/Intro Section */}
      <section className="hero-section">
        <div className="hero-image-container">
          <img src={thumbIntro} alt="PG Design - Kiến tạo không gian" className="hero-image" />
        </div>
      </section>

      {/* Main Content Sections */}
      <main className="main-content">
          <AboutSection />
          <ImageSliderSection slides={[]} />
          <StatsSection />
          <ServicesSection />
          <WorkflowSection />
          <TeamSection />
          <ProjectDiarySection />
          <TestimonialSliderSection />
          <ConsultationFormSection />
      </main>
    </div>
  );
};

export default HomePage;
