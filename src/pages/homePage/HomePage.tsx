import React from "react";
import "./HomePage.css";
import thumb from "../../assets/images/thumb-home.png";
import HeaderNav from "../../components/Headerbar/HeaderNav";
import AboutSection from "../../components/AboutSection";
import ImageSlider from "../../components/ImageSlider";
import StatsSection from "../../components/StatsSection";
import ServicesSection from "../../components/ServicesSection";
import WorkflowSection from "../../components/WorkProcessSection";

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
        <ImageSlider slides={[]} />
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
    </div>
  );
};

export default HomePage;
