import React from "react";
import "./HomePage.css";
import thumb from "../../assets/images/thumb-home.png";
import HeaderNav from "../../components/Headerbar/HeaderNav";
import AboutSection from "../../components/AboutSection";
import ImageSliderSection from "../../components/ImageSliderSection";
import StatsSection from "../../components/StatsSection";
import ServicesSection from "../../components/ServicesSection";
import WorkflowSection from "../../components/WorkProcessSection";
import ProjectDiarySection from "../../components/ProjectDiarySection";
import TestimonialSliderSection from "../../components/TestimonialSliderSection";
import ConsultationFormSection from "../../components/ConsultationFormSection";

const HomePage: React.FC = () => {
  return (
    <div>
      <div className="fullscreen-container">
        <div className="feeback">
          <HeaderNav />
        </div>
        <img src={thumb} alt="thumb-home" className="fullscreen-image" />
      </div>
      <div>
        <AboutSection />
      </div>
      <div>
        <ImageSliderSection slides={[]} />
      </div>
      <div>
        <StatsSection />
      </div>
      <div>
        <ServicesSection />
      </div>
      <div>
        <WorkflowSection />
      </div>
      <div>
        <ProjectDiarySection />
      </div>
      <div>
        <TestimonialSliderSection />
      </div>
      <div>
        <ConsultationFormSection />
      </div>
    </div>
  );
};

export default HomePage;
