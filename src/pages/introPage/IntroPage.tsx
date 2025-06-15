import React from "react";
import "./IntroPage.css";
import AboutIntroSection from "../../components/AboutIntroSection";
import VisionMissionSection from "../../components/VisionMissionSection";
import CommitmentsSection from "../../components/CommitmentsSection";
import TeamSection from "../../components/TeamSection";
import Footer from "../../components/Footerbar/FooterNav";
import Navbar from "../../components/Headerbar/Navbar";

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
