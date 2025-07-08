import React, { useState, useEffect } from "react";
import "./ProjectPage.css";
import AboutProjectSection from "../../components/AboutProjectSection";
import ProjectCategoriesSection from "../../components/ProjectCategoriesSection";
import StatsSection from "../../components/StatsSection";
import LoadingSpinner from "../../components/LoadingSpinner";
import { ProjectPageData } from "../../types/projectPageTypes";
import { fetchProjectPageData } from "../../services/projectPageService";

// Import your SVG icons for stat items
import { ReactComponent as BriefcaseIcon } from "../../assets/icons/experience-icon.svg";
import { ReactComponent as HandshakeIcon } from "../../assets/icons/customer-icon.svg";
import { ReactComponent as DesignIcon } from "../../assets/icons/design-icon.svg";
import { ReactComponent as GearIcon } from "../../assets/icons/building-icon.svg";


const ProjectPage: React.FC = () => {
  const [projectData, setProjectData] = useState<ProjectPageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Icon mapping for stats items
  const iconMap = {
    'experience-icon': BriefcaseIcon,
    'customer-icon': HandshakeIcon,
    'design-icon': DesignIcon,
    'building-icon': GearIcon
  };

  useEffect(() => {
    const loadProjectData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const data = await fetchProjectPageData();
        setProjectData(data);
      } catch (err) {
        console.error('Error loading project page data:', err);
        setError('Failed to load project page data');
      } finally {
        setIsLoading(false);
      }
    };

    loadProjectData();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !projectData) {
    return (
      <div className="error-container">
        <h2>Error loading project page</h2>
        <p>{error || 'No project data available'}</p>
        <button onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }

  // Transform API data to component format
  const stateHeader = {
    mainHeadline: projectData.statsSection.mainHeadline,
    subHeadline: projectData.statsSection.subHeadline,
    description: projectData.statsSection.description
  };

  const statIcons = projectData.statsSection.statsItems.map(item => ({
    id: item.id,
    icon: iconMap[item.iconName as keyof typeof iconMap] || BriefcaseIcon,
    targetValue: item.targetValue,
    label: item.label,
    suffix: item.suffix,
    description: item.description,
    backgroundImage: item.backgroundImageUrl,
    category: item.category
  }));

  const aboutProjectSectionContent = {
    title: projectData.aboutProject.title,
    subtitle: projectData.aboutProject.subtitle,
    backgroundImage: projectData.aboutProject.backgroundImageUrl
  };

  const projectCategoriesHeader = {
    mainTitle: projectData.projectCategories.mainTitle,
    subtitle: projectData.projectCategories.subtitle,
    description: projectData.projectCategories.description
  };

  const projectCategories = projectData.projectCategories.categories.map(category => ({
    id: category.categoryId,
    title: category.title,
    projectCount: category.projectCount,
    backgroundImage: category.backgroundImageUrl,
    navigationPath: category.navigationPath
  }));

  return (
    <div className="project-page">
      <AboutProjectSection content={aboutProjectSectionContent}/>
      <StatsSection stateHeader={stateHeader} stateItems={statIcons}/>
      <ProjectCategoriesSection header={projectCategoriesHeader} categories={projectCategories} />
    </div>
  );
};

export default ProjectPage;
