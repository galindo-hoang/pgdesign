import React from "react";
import "./ProjectPage.css";
import AboutProjectSection from "../../components/AboutProjectSection";
import ProjectCategoriesSection from "../../components/ProjectCategoriesSection";
import StatsSection from "../../components/StatsSection";

const ProjectPage: React.FC = () => {
  return (
    <div className="project-page">
      <AboutProjectSection />
      <ProjectCategoriesSection />
      <StatsSection />
    </div>
  );
};

export default ProjectPage;
