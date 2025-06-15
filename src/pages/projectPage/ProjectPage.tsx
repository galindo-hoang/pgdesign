import React from "react";
import "./ProjectPage.css";
import AboutProjectSection from "../../components/AboutProjectSection";
import StatsSection from "../../components/StatsSection";

const ProjectPage: React.FC = () => {
  return (
    <div>
      <AboutProjectSection />
      <StatsSection />
    </div>
  );
};

export default ProjectPage;
