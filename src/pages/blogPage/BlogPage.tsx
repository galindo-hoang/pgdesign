import React, { useState, useEffect } from "react";
import "./NewsSection.css";
import NewsSection from "./NewsSection";
import ConsultationCTASection from "../../components/ConsultationCTASection";

// Import BlogPageService
import { 
  fetchBlogPageData, 
  fetchProjectItems, 
  getCurrentDataSource, 
  readFilespreadsheet,
  readFilespreadsheetWithEmbeddedContent
} from "../../services/blogPageService";

// Import types
import { 
  BlogPageData, 
  ProjectGalleryData, 
  BlogPageFilters 
} from "../../types/blogPageTypes";

// Import LoadingSpinner component
import LoadingSpinner from "../../components/LoadingSpinner";


const BlogPage: React.FC = () => {
  // State management
  const [blogData, setBlogData] = useState<BlogPageData | null>(null);
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [projectsData, setProjectsData] = useState<ProjectGalleryData | null>(null);
  const [newsLoading, setNewsLoading] = useState(false);

  // Mock news data - replace with actual API call
  const mockNewsData = [
    {
      id: "1",
      title: "Nhà đẹp là do mix chất liệu đúng cách – Bạn đã biết chưa?",
      excerpt: "Khám phá bí quyết tạo nên không gian sống đẹp mắt thông qua việc kết hợp các chất liệu một cách hài hòa. Từ gỗ tự nhiên đến kim loại, từ vải vóc đến đá cẩm thạch, mỗi chất liệu đều mang đến một vẻ đẹp riêng biệt.",
      thumbnail: "/src/assets/images/diary-image-1.jpg",
      viewCount: 2156,
      hashtags: ["chất liệu", "thiết kế", "nội thất", "mix-match"],
      publishDate: "2024-01-20",
      slug: "nha-dep-mix-chat-lieu-dung-cach"
    },
    {
      id: "2",
      title: "4 Tips Tạo Điểm Nhấn Cho Bếp Sang Trọng & Tiện Nghi",
      excerpt: "Bếp không chỉ là nơi nấu nướng mà còn là trái tim của ngôi nhà. Khám phá 4 tips thiết kế bếp sang trọng và tiện nghi giúp không gian bếp trở nên ấn tượng và hiệu quả hơn.",
      thumbnail: "/assets/blog/4-tips-tao-diem-nhan-bep-sang-trong/Picture1.png",
      viewCount: 3421,
      hashtags: ["thiết kế bếp", "nội thất", "sang trọng", "tiện nghi", "điểm nhấn"],
      publishDate: "2024-01-25",
      slug: "4-tips-tao-diem-nhan-bep-sang-trong"
    },
    {
      id: "3",
      title: "Khám Phá 4 Phong Cách Tủ Quần Áo Đẹp Chuẩn Gu & Cá Tính",
      excerpt: "Tủ quần áo không chỉ là nơi cất trữ mà còn phản ánh phong cách sống của chủ nhân. Tìm hiểu 4 phong cách thiết kế tủ quần áo độc đáo phù hợp với từng gu thẩm mỹ và cá tính riêng biệt.",
      thumbnail: "/src/assets/images/diary-image-3.jpg",
      viewCount: 1678,
      hashtags: ["tủ quần áo", "phong cách", "cá tính", "thiết kế"],
      publishDate: "2024-01-16",
      slug: "4-phong-cach-tu-quan-ao-dep"
    },
    {
      id: "4",
      title: "Các cách phối màu nội thất đẹp và sang trọng, nhìn lâu không chán",
      excerpt: "Màu sắc đóng vai trò quan trọng trong việc tạo cảm giác cho không gian sống. Khám phá các cách phối màu nội thất đẹp mắt và sang trọng, tạo ra không gian sống vừa hiện đại vừa bền vững theo thời gian.",
      thumbnail: "/src/assets/images/diary-image-4.jpg",
      viewCount: 2431,
      hashtags: ["phối màu", "nội thất", "sang trọng", "thiết kế"],
      publishDate: "2024-01-14",
      slug: "cach-phoi-mau-noi-that-dep-sang-trong"
    },
    {
      id: "5",
      title: "Top 7 vật liệu ốp tường gia chủ cần biết khi xây nhà và làm nội thất",
      excerpt: "Vật liệu ốp tường không chỉ tạo vẻ đẹp thẩm mỹ mà còn bảo vệ tường và tăng tuổi thọ công trình. Tìm hiểu 7 loại vật liệu ốp tường phổ biến và ứng dụng phù hợp cho từng không gian.",
      thumbnail: "/src/assets/images/diary-image-5.jpg",
      viewCount: 1987,
      hashtags: ["vật liệu", "ốp tường", "xây nhà", "nội thất"],
      publishDate: "2024-01-12",
      slug: "top-7-vat-lieu-op-tuong-gia-chu-can-biet"
    },
    {
      id: "6",
      title: "6 + Tip vệ sinh bộ bàn ăn gỗ đơn giản ngay tại nhà",
      excerpt: "Bộ bàn ăn gỗ là món đồ nội thất quan trọng trong mỗi gia đình. Học cách vệ sinh và bảo quản bộ bàn ăn gỗ đúng cách để duy trì vẻ đẹp và độ bền theo thời gian với những phương pháp đơn giản.",
      thumbnail: "/src/assets/images/diary-image-6.jpg",
      viewCount: 1756,
      hashtags: ["bàn ăn gỗ", "vệ sinh", "bảo quản", "tips"],
      publishDate: "2024-01-10",
      slug: "6-tip-ve-sinh-ban-an-go-don-gian"
    },
    {
      id: "7",
      title: "[21+ Mẫu] Kệ tivi dưới gầm cầu thang đẹp sang trọng, tinh tế - giá phải chăng",
      excerpt: "Tận dụng không gian gầm cầu thang để tạo kệ tivi độc đáo và tiện dụng. Khám phá hơn 21 mẫu thiết kế kệ tivi dưới gầm cầu thang với nhiều phong cách khác nhau, từ hiện đại đến cổ điển.",
      thumbnail: "/src/assets/images/diary-image-7.jpg",
      viewCount: 2891,
      hashtags: ["kệ tivi", "gầm cầu thang", "thiết kế", "tiết kiệm không gian"],
      publishDate: "2024-01-08",
      slug: "21-mau-ke-tivi-duoi-gam-cau-thang"
    },
    {
      id: "8",
      title: "12 Xu Hướng Thiết Kế Không Gian Xanh Cho Ngôi Nhà Của Bạn",
      excerpt: "Xu hướng thiết kế không gian xanh đang trở thành lựa chọn hàng đầu cho những ngôi nhà hiện đại. Tìm hiểu 12 xu hướng thiết kế không gian xanh độc đáo để tạo ra môi trường sống trong lành và thân thiện.",
      thumbnail: "/src/assets/images/diary-image-8.jpg",
      viewCount: 2234,
      hashtags: ["không gian xanh", "xu hướng", "thiết kế", "môi trường"],
      publishDate: "2024-01-06",
      slug: "12-xu-huong-thiet-ke-khong-gian-xanh"
    },
    {
      id: "9",
      title: "Bật mí 99+ thiết kế quán trà sữa đảm bảo hút khách",
      excerpt: "Thiết kế quán trà sữa không chỉ cần đẹp mắt mà còn phải tạo được ấn tượng mạnh với khách hàng. Khám phá hơn 99 mẫu thiết kế quán trà sữa độc đáo với nhiều phong cách khác nhau để thu hút khách hàng.",
      thumbnail: "/src/assets/images/diary-image-1.jpg",
      viewCount: 3124,
      hashtags: ["quán trà sữa", "thiết kế", "kinh doanh", "thu hút khách"],
      publishDate: "2024-01-04",
      slug: "99-thiet-ke-quan-tra-sua-hut-khach"
    }
  ];

  // Load blog page data on component mount
  useEffect(() => {
    const loadBlogPageData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const data = await fetchBlogPageData();
        setBlogData(data);

        // Load initial projects data
        const projectFilters: BlogPageFilters = {
          limit: visibleProjects,
          offset: 0
        };
        const projectGallery = await fetchProjectItems(projectFilters);
        setProjectsData(projectGallery);

      } catch (err: any) {
        console.error('Error loading blog page data:', err);
        setError(err.message || 'Failed to load blog page data');
      } finally {
        setIsLoading(false);
      }
    };

    loadBlogPageData();

    readFilespreadsheetWithEmbeddedContent()
  }, [visibleProjects]);

  // Handle load more projects
  const handleLoadMore = async () => {
    if (!projectsData || !projectsData.hasMore) return;

    try {
      const newLimit = visibleProjects + 6;
      const filters: BlogPageFilters = {
        limit: newLimit,
        offset: 0
      };

      const newProjectsData = await fetchProjectItems(filters);
      setProjectsData(newProjectsData);
      setVisibleProjects(newLimit);
    } catch (err: any) {
      console.error('Error loading more projects:', err);
      setError('Failed to load more projects');
    }
  };

  const handleConsultationClick = () => {
    // Handle consultation form or contact
    console.log("Consultation requested");
  };

  const handleNewsClick = (newsId: string) => {
    // Find the news item by ID
    const newsItem = mockNewsData.find(item => item.id === newsId);
    if (newsItem && newsItem.slug) {
      // Navigate to blog detail page using the slug
      window.location.href = `/blog/${newsItem.slug}`;
    }
  };

  // Retry function for error handling
  const handleRetry = () => {
    window.location.reload();
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="blog-page">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '50vh' 
        }}>
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  // Error state
  if (error || !blogData) {
    return (
      <div className="blog-page">
        <div style={{ 
          textAlign: 'center', 
          padding: '2rem',
          color: '#666'
        }}>
          <h2>Có lỗi xảy ra</h2>
          <p>{error || 'Không thể tải dữ liệu trang blog'}</p>
          <button 
            onClick={handleRetry}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#1b3025',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-page">

      {/* News Section */}
      <NewsSection
        news={mockNewsData}
        title="Tin Tức & Bài Viết"
        subtitle="Khám phá những bài viết mới nhất về thiết kế nội thất từ PG Design"
        loading={newsLoading}
        onNewsClick={handleNewsClick}
      />

      {/* Call to Action Section */}
      <ConsultationCTASection
        title={blogData.consultationCTA?.title}
        description={blogData.consultationCTA?.description}
        features={blogData.consultationCTA?.features}
        buttonText={blogData.consultationCTA?.buttonText}
        imageUrl={blogData.consultationCTA?.imageUrl}
        onConsultationClick={handleConsultationClick}
      />

      {/* Data source indicator (for development) */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{
          position: 'fixed',
          bottom: '10px',
          right: '10px',
          background: '#1b3025',
          color: 'white',
          padding: '5px 10px',
          borderRadius: '4px',
          fontSize: '12px',
          zIndex: 1000
        }}>
          Data: {getCurrentDataSource()}
        </div>
      )}
    </div>
  );
};

export default BlogPage; 