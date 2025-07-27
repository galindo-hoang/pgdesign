import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProjectCategoryPage.css";
import ProjectItemCard from "../components/ProjectItemCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { 
  ProjectCategory,
  ProjectDetail
} from "../types/projectCategoryPageTypes";
import { 
  fetchCategoryWithSubCategories 
} from "../services/projectCategoryService";

interface ProjectCategoryPageProps {
  // No props needed as we'll use the service
}

// This component now uses dynamic data from the service with categoryId parameter

const ProjectCategoryPage: React.FC<ProjectCategoryPageProps> = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [categoryData, setCategoryData] = useState<ProjectCategory | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Load category with subcategories if categoryId exists
        if (categoryId) {
          const categoryResult = await fetchCategoryWithSubCategories(categoryId);
          if (categoryResult) {
            setCategoryData(categoryResult);
          }
        }
      } catch (err) {
        console.error('Error loading project category data:', err);
        setError('Failed to load category data');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [categoryId]);

  const handleProjectClick = (project: ProjectDetail) => {
    // Navigate to detailed project page
    console.log("Navigate to project:", project);
    // You can implement navigation to detailed project page here
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="project-category-page">
        <div className="category-not-found">
          <h1>Lỗi tải dữ liệu</h1>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  if (!categoryData) {
    return (
      <div className="project-category-page">
        <div className="category-not-found">
          <h1>Danh mục không tồn tại</h1>
          <p>Danh mục dự án bạn tìm kiếm không được tìm thấy.</p>
        </div>
      </div>
    );
  }
  // Get hero image from category data or fallback to default
  const heroImage = categoryData.heroImageUrl;

  return (
    <div className="project-category-page">
      <div 
        className="category-header"
        data-category={categoryData.id}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="floating-particles"></div>
        <div className="category-header-content">
          <h1 className="category-title">{categoryData.title}</h1>
          <p className="category-description">{categoryData.description}</p>
        </div>
      </div>

        <div className="subcategory-content">
          {/* Project Grid */}
          <div className="projects-grid">
            {categoryData.projects.map((projectDetail) => {
              // Transform ProjectDetail to ProjectItem format for compatibility
              const projectItem = {
                id: projectDetail.projectId,
                title: projectDetail.title,
                thumbnailImage: projectDetail.thumbnailImage || '/assets/images/default-project.png',
                clientName: projectDetail.clientName,
                area: projectDetail.area,
                constructionDate: projectDetail.constructionDate,
                address: projectDetail.address,
                description: projectDetail.description || '',
                category: projectDetail.category,
                style: projectDetail.style || 'Modern'
              };
              
              return (
                <ProjectItemCard
                  key={projectDetail.id}
                  project={projectItem}
                  onClick={(project) => handleProjectClick(projectDetail)}
                />
              );
            })}
          </div>
        </div>
    </div>
  );
};

export default ProjectCategoryPage; 