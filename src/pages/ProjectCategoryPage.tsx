import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProjectCategoryPage.css";
import ProjectItemCard, { ProjectItem } from "../components/ProjectItemCard";

// Import sample images (you can replace with actual project images)
import sampleImage1 from "../assets/images/diary-image-1.jpg";
import sampleImage2 from "../assets/images/diary-image-2.jpg";
import sampleImage3 from "../assets/images/diary-image-3.jpg";
import sampleImage4 from "../assets/images/diary-image-4.jpg";

// Import hero background image
import heroImage from "../assets/images/diary-image-1.jpg";

interface SubCategory {
  id: string;
  title: string;
  description?: string;
  projects: ProjectItem[];
}

interface CategoryData {
  id: string;
  title: string;
  description: string;
  subCategories: SubCategory[];
}

interface ProjectCategoryPageProps {
  categoriesData?: { [key: string]: CategoryData };
  defaultHeroImage?: string;
}

// Sample project data generator - can be overridden with real data
const getSampleProjects = (category: string, subCategory: string): ProjectItem[] => {
  const baseProjects = [
    {
      id: "1",
      title: `Dự án ${subCategory} #1`,
      thumbnailImage: sampleImage1,
      clientName: "Anh Nguyễn Văn A",
      area: "120m²",
      constructionDate: "12/2023",
      address: "Quận 7, TP.HCM",
      description: "Dự án thiết kế hiện đại với không gian mở, tận dụng ánh sáng tự nhiên.",
      category,
      subCategory,
      style: "Modern"
    },
    {
      id: "2",
      title: `Dự án ${subCategory} #2`,
      thumbnailImage: sampleImage2,
      clientName: "Chị Trần Thị B",
      area: "150m²",
      constructionDate: "10/2023",
      address: "Quận 2, TP.HCM",
      description: "Thiết kế kết hợp phong cách cổ điển và hiện đại.",
      category,
      subCategory,
      style: "Neoclassical"
    },
    {
      id: "3",
      title: `Dự án ${subCategory} #3`,
      thumbnailImage: sampleImage3,
      clientName: "Anh Lê Văn C",
      area: "200m²",
      constructionDate: "08/2023",
      address: "Quận 1, TP.HCM",
      description: "Không gian sang trọng với những chi tiết tinh tế.",
      category,
      subCategory,
      style: "Classical"
    },
    {
      id: "4",
      title: `Dự án ${subCategory} #4`,
      thumbnailImage: sampleImage4,
      clientName: "Chị Phạm Thị D",
      area: "180m²",
      constructionDate: "06/2023",
      address: "Quận 3, TP.HCM",
      description: "Thiết kế Indochine mang đậm hơi thở văn hóa Á Đông.",
      category,
      subCategory,
      style: "Indochine"
    }
  ];

  return baseProjects;
};

// Default category configurations - can be overridden
const getDefaultCategoriesData = (): { [key: string]: CategoryData } => {
  return {
    "house-normal": {
      id: "house-normal",
      title: "NHÀ PHỐ",
      description: "Thiết kế nhà phố hiện đại, tối ưu hóa không gian và ánh sáng tự nhiên cho cuộc sống đô thị.",
      subCategories: [
        {
          id: "nha-ong",
          title: "Nhà Ống",
          description: "Thiết kế cho mặt tiền hẹp, chiều sâu dài, tận dụng tối đa diện tích.",
          projects: getSampleProjects("house-normal", "Nhà Ống")
        },
        {
          id: "nha-lien-ke",
          title: "Nhà Liền Kề",
          description: "Nhà phố trong khu quy hoạch, kiến trúc đồng bộ và hiện đại.",
          projects: getSampleProjects("house-normal", "Nhà Liền Kề")
        },
        {
          id: "house-normal-san-vuon",
          title: "Nhà Phố Có Sân Vườn",
          description: "Kết hợp không gian xanh, tạo sự thông thoáng và gần gũi thiên nhiên.",
          projects: getSampleProjects("house-normal", "Nhà Phố Có Sân Vườn")
        },
        {
          id: "shophouse",
          title: "Shophouse",
          description: "Tầng trệt kinh doanh, tầng trên ở, tối ưu hóa mặt tiền thu hút khách hàng.",
          projects: getSampleProjects("house-normal", "Shophouse")
        }
      ]
    },
    "house-full": {
      id: "house-full",
      title: "NHÀ VƯỜN",
      description: "Hòa quyện kiến trúc với thiên nhiên, tạo nên không gian sống xanh và thư thái.",
      subCategories: [
        {
          id: "resort-villa",
          title: "Resort Garden Houses",
          description: "Diện tích lớn, nhiều tiện ích cao cấp như hồ bơi, sân tennis.",
          projects: getSampleProjects("house-full", "Resort Garden Houses")
        },
        {
          id: "mini-garden",
          title: "Nhà Vườn Mini",
          description: "Diện tích vừa phải, vẫn có không gian xanh và cảnh quan nhỏ.",
          projects: getSampleProjects("house-full", "Nhà Vườn Mini")
        }
      ]
    },
    "house-rough": {
      id: "house-rough",
      title: "BIỆT THỰ",
      description: "Kiến trúc sang trọng và đẳng cấp, thể hiện phong cách sống luxury của gia chủ.",
      subCategories: [
        {
          id: "house-rough-don-lap",
          title: "Biệt Thự Đơn Lập",
          description: "Hoàn toàn độc lập, 4 mặt thoáng, tối đa hóa sự riêng tư.",
          projects: getSampleProjects("house-rough", "Biệt Thự Đơn Lập")
        },
        {
          id: "house-rough-song-lap",
          title: "Biệt Thự Song Lập",
          description: "Hai biệt thự kiến trúc đối xứng, chung một bức tường.",
          projects: getSampleProjects("house-rough", "Biệt Thự Song Lập")
        }
      ]
    },
    "house-interior": {
      id: "house-interior",
      title: "NHÀ CẤP 4",
      description: "Nhà một tầng đặc trưng của Việt Nam với nhiều biến thể phong cách và bố trí.",
      subCategories: [
        {
          id: "mai-thai",
          title: "Nhà Cấp 4 Mái Thái",
          description: "Mái dốc lớn hình chóp hoặc chữ A, đẹp mắt, thoát nước tốt.",
          projects: getSampleProjects("house-interior", "Mái Thái")
        },
        {
          id: "mai-nhat",
          title: "Nhà Cấp 4 Mái Nhật",
          description: "Độ dốc ít hơn mái Thái, tạo vẻ trang nghiêm, phù hợp phong cách hiện đại.",
          projects: getSampleProjects("house-interior", "Mái Nhật")
        },
        {
          id: "mai-bang",
          title: "Nhà Cấp 4 Mái Bằng",
          description: "Mái phẳng, có thể tận dụng không gian mái, kiến trúc vững chắc, hiện đại.",
          projects: getSampleProjects("house-interior", "Mái Bằng")
        },
        {
          id: "gac-lung",
          title: "Nhà Cấp 4 Gác Lửng",
          description: "Có thêm không gian gác lửng để tối ưu diện tích sử dụng.",
          projects: getSampleProjects("house-interior", "Gác Lửng")
        }
      ]
    }
  };
};

const ProjectCategoryPage: React.FC<ProjectCategoryPageProps> = ({
  categoriesData = getDefaultCategoriesData(),
  defaultHeroImage = heroImage
}) => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [categoryData, setCategoryData] = useState<CategoryData | null>(null);
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);

  useEffect(() => {
    if (categoryId && categoriesData[categoryId]) {
      const data = categoriesData[categoryId];
      setCategoryData(data);
      if (data && data.subCategories.length > 0) {
        setActiveSubCategory(data.subCategories[0].id);
      }
    }
  }, [categoryId, categoriesData]);

  const handleProjectClick = (project: ProjectItem) => {
    // Navigate to detailed project page
    console.log("Navigate to project:", project);
    // You can implement navigation to detailed project page here
  };

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

  const activeSubCategoryData = categoryData.subCategories.find(
    sub => sub.id === activeSubCategory
  );

  return (
    <div className="project-category-page">
      <div 
        className="category-header"
        data-category={categoryData.id}
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${defaultHeroImage})`,
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

      {/* Sub-category Navigation */}
      <div className="subcategory-navigation">
        <div className="subcategory-nav-container">
          {categoryData.subCategories.map((subCategory) => (
            <button
              key={subCategory.id}
              className={`subcategory-nav-item ${
                activeSubCategory === subCategory.id ? "active" : ""
              }`}
              onClick={() => setActiveSubCategory(subCategory.id)}
            >
              {subCategory.title}
            </button>
          ))}
        </div>
      </div>

      {/* Active Sub-category Content */}
      {activeSubCategoryData && (
        <div className="subcategory-content">
          <div className="subcategory-header">
            <h2 className="subcategory-title">{activeSubCategoryData.title}</h2>
            {activeSubCategoryData.description && (
              <p className="subcategory-description">{activeSubCategoryData.description}</p>
            )}
          </div>

          {/* Project Grid */}
          <div className="projects-grid">
            {activeSubCategoryData.projects.map((project) => (
              <ProjectItemCard
                key={project.id}
                project={project}
                onClick={handleProjectClick}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectCategoryPage; 