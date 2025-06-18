import React from "react";
import "./IntroPage.css";
import AboutIntroSection from "../../components/AboutIntroSection";
import VisionMissionSection from "../../components/VisionMissionSection";
import CommitmentsSection from "../../components/CommitmentsSection";
import TeamSection from "../../components/TeamSection";

const IntroPage: React.FC = () => {
  return (
    <div className="IntroPageContainter">
      <AboutIntroSection />
      <VisionMissionSection />
      <CommitmentsSection />
      <TeamSection />
    </div>
  );
};

export default IntroPage;
