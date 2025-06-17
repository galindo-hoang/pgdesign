import React, { useState } from "react";
import "./BlogPage.css";

// Import sample images (you can replace with actual project images)
import sampleImage1 from "../assets/images/diary-image-1.jpg";
import sampleImage2 from "../assets/images/diary-image-2.jpg";
import sampleImage3 from "../assets/images/diary-image-3.jpg";
import sampleImage4 from "../assets/images/diary-image-4.jpg";
import consultationImage from "../assets/images/thumb-intro.jpg";

interface ProjectItem {
  id: string;
  title: string;
  image: string;
  area: string;
  style: string;
  client: string;
  location: string;
}

const BlogPage: React.FC = () => {
  const [visibleProjects, setVisibleProjects] = useState(6);

  // Sample project data
  const projects: ProjectItem[] = [
    {
      id: "1",
      title: "Thiết kế nội thất Phòng khách Nhà Phố Hiện Đại – Quận 2",
      image: sampleImage1,
      area: "20 m²",
      style: "Phong cách hiện đại",
      client: "Anh Tú",
      location: "Quận 2"
    },
    {
      id: "2",
      title: "Thiết kế nội thất Phòng khách Biệt Thự Cổ Điển – Quận 7",
      image: sampleImage2,
      area: "35 m²",
      style: "Phong cách cổ điển",
      client: "Chị Lan",
      location: "Quận 7"
    },
    {
      id: "3",
      title: "Thiết kế nội thất Phòng khách Căn Hộ Minimalist – Quận 1",
      image: sampleImage3,
      area: "18 m²",
      style: "Phong cách tối giản",
      client: "Anh Nam",
      location: "Quận 1"
    },
    {
      id: "4",
      title: "Thiết kế nội thất Phòng khách Nhà Vườn Indochine – Quận 3",
      image: sampleImage4,
      area: "28 m²",
      style: "Phong cách Indochine",
      client: "Chị Hoa",
      location: "Quận 3"
    },
    {
      id: "5",
      title: "Thiết kế nội thất Phòng khách Penthouse Luxury – Quận 2",
      image: sampleImage1,
      area: "45 m²",
      style: "Phong cách sang trọng",
      client: "Anh Minh",
      location: "Quận 2"
    },
    {
      id: "6",
      title: "Thiết kế nội thất Phòng khách Studio Scandinavian – Quận 5",
      image: sampleImage2,
      area: "15 m²",
      style: "Phong cách Bắc Âu",
      client: "Chị Mai",
      location: "Quận 5"
    },
    {
      id: "7",
      title: "Thiết kế nội thất Phòng khách Duplex Modern – Quận 4",
      image: sampleImage3,
      area: "32 m²",
      style: "Phong cách hiện đại",
      client: "Anh Hoàng",
      location: "Quận 4"
    },
    {
      id: "8",
      title: "Thiết kế nội thất Phòng khách Townhouse Vintage – Quận 6",
      image: sampleImage4,
      area: "24 m²",
      style: "Phong cách vintage",
      client: "Chị Thúy",
      location: "Quận 6"
    }
  ];

  const handleLoadMore = () => {
    setVisibleProjects(prev => Math.min(prev + 6, projects.length));
  };

  const handleConsultationClick = () => {
    // Handle consultation form or contact
    console.log("Consultation requested");
  };

  return (
    <div className="blog-page">
      {/* Hero Section */}
      <section className="blog-hero">
        <div className="blog-hero-content">
          <h1 className="blog-hero-title">
            PG DESIGN - THIẾT KẾ NỘI THẤT PHÒNG KHÁCH ĐẸP, HIỆN ĐẠI TẠI TP.HCM
          </h1>
          <p className="blog-hero-subtitle">
            Khám phá bộ sưu tập những không gian phòng khách được thiết kế tinh tế, 
            kết hợp hoàn hảo giữa thẩm mỹ và công năng sử dụng.
          </p>
        </div>
      </section>

      {/* Project Gallery Grid */}
      <section className="project-gallery">
        <div className="project-gallery-container">
          <div className="project-grid">
            {projects.slice(0, visibleProjects).map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-image-container">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="project-image"
                    loading="lazy"
                  />
                  <div className="project-overlay">
                    <button className="project-view-btn">Xem chi tiết</button>
                  </div>
                </div>
                
                <div className="project-info">
                  <h3 className="project-title">{project.title}</h3>
                  <div className="project-details">
                    <div className="project-detail">
                      <span className="detail-icon">📐</span>
                      <span className="detail-text">{project.area}</span>
                    </div>
                    <div className="project-detail">
                      <span className="detail-icon">🎨</span>
                      <span className="detail-text">{project.style}</span>
                    </div>
                    <div className="project-detail">
                      <span className="detail-icon">👤</span>
                      <span className="detail-text">{project.client} – {project.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {visibleProjects < projects.length && (
            <div className="load-more-container">
              <button className="load-more-btn" onClick={handleLoadMore}>
                Xem thêm dự án
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Information/Content Section */}
      <section className="blog-content">
        <div className="blog-content-container">
          <div className="content-header">
            <h2 className="content-main-title">
              PG DESIGN - THIẾT KẾ NỘI THẤT PHÒNG KHÁCH ĐẸP, HIỆN ĐẠI TẠI TP.HCM
            </h2>
          </div>

          <div className="content-body">
            <p className="content-intro">
              Phòng khách là không gian trung tâm của ngôi nhà, nơi gia đình quây quần và đón tiếp khách. 
              Một phòng khách được thiết kế đẹp không chỉ tạo ấn tượng mạnh mẽ với khách ghé thăm mà còn 
              mang lại cảm giác thoải mái, ấm cúng cho chính gia chủ.
            </p>

            <h3 className="content-section-title">Các phong cách thiết kế phòng khách đẹp</h3>
            <div className="content-list">
              <div className="list-item">
                <span className="list-number">1.</span>
                <div className="list-content">
                  <strong>Phong cách hiện đại (Modern):</strong> Đặc trưng bởi những đường nét sạch sẽ, 
                  màu sắc trung tính và sử dụng vật liệu công nghiệp như thép, kính, beton.
                </div>
              </div>
              <div className="list-item">
                <span className="list-number">2.</span>
                <div className="list-content">
                  <strong>Phong cách cổ điển (Classical):</strong> Mang đậm nét truyền thống với 
                  những chi tiết trang trí tinh xảo, màu sắc ấm áp và vật liệu tự nhiên.
                </div>
              </div>
              <div className="list-item">
                <span className="list-number">3.</span>
                <div className="list-content">
                  <strong>Phong cách tối giản (Minimalist):</strong> "Less is more" - ít đồ đạc nhưng 
                  mỗi món đều có ý nghĩa và công năng rõ ràng.
                </div>
              </div>
              <div className="list-item">
                <span className="list-number">4.</span>
                <div className="list-content">
                  <strong>Phong cách Indochine:</strong> Kết hợp tinh tế giữa văn hóa Á Đông và 
                  kiến trúc Pháp, tạo nên vẻ đẹp hoài cổ độc đáo.
                </div>
              </div>
            </div>

            <h3 className="content-section-title">Những yếu tố quan trọng khi thiết kế nội thất phòng khách</h3>
            <div className="content-factors">
              <div className="factor-item">
                <h4 className="factor-title">1. Tối ưu không gian</h4>
                <p className="factor-desc">
                  Bố trí nội thất hợp lý để tạo động tuyến thuận tiện, không gian thoáng đãng 
                  và dễ dàng di chuyển.
                </p>
              </div>
              <div className="factor-item">
                <h4 className="factor-title">2. Ánh sáng và thông gió</h4>
                <p className="factor-desc">
                  Tận dụng ánh sáng tự nhiên, kết hợp chiếu sáng nhân tạo và đảm bảo 
                  thông gió tốt cho không gian.
                </p>
              </div>
              <div className="factor-item">
                <h4 className="factor-title">3. Màu sắc và vật liệu</h4>
                <p className="factor-desc">
                  Lựa chọn bảng màu hài hòa, vật liệu chất lượng phù hợp với phong cách 
                  và sở thích của gia chủ.
                </p>
              </div>
              <div className="factor-item">
                <h4 className="factor-title">4. Công năng và thẩm mỹ</h4>
                <p className="factor-desc">
                  Cân bằng giữa tính thực tiễn và vẻ đẹp, đảm bảo không gian vừa đẹp 
                  vừa tiện dụng trong sinh hoạt hằng ngày.
                </p>
              </div>
            </div>

            <h3 className="content-section-title">Quy trình thiết kế nội thất phòng khách chuyên nghiệp</h3>
            <div className="process-steps">
              <div className="step-item">
                <div className="step-number">01</div>
                <div className="step-content">
                  <h4 className="step-title">Khảo sát và tư vấn</h4>
                  <p className="step-desc">Đo đạc không gian, tìm hiểu nhu cầu và sở thích của khách hàng.</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-number">02</div>
                <div className="step-content">
                  <h4 className="step-title">Thiết kế concept</h4>
                  <p className="step-desc">Lên ý tưởng thiết kế tổng thể, chọn phong cách và bảng màu.</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-number">03</div>
                <div className="step-content">
                  <h4 className="step-title">Thiết kế chi tiết</h4>
                  <p className="step-desc">Hoàn thiện bản vẽ 2D, 3D và danh sách vật tư cụ thể.</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-number">04</div>
                <div className="step-content">
                  <h4 className="step-title">Thi công và giám sát</h4>
                  <p className="step-desc">Triển khai thi công theo đúng thiết kế và giám sát chất lượng.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="consultation-cta">
        <div className="cta-container">
          <div className="cta-content">
            <h2 className="cta-title">NHẬN TƯ VẤN THIẾT KẾ NỘI THẤT</h2>
            <p className="cta-description">
              Bạn đang muốn thiết kế không gian phòng khách đẹp và hiện đại? 
              Hãy liên hệ với PG Design để được tư vấn miễn phí và nhận báo giá chi tiết.
            </p>
            <div className="cta-features">
              <div className="cta-feature">
                <span className="feature-icon">✓</span>
                <span className="feature-text">Tư vấn miễn phí</span>
              </div>
              <div className="cta-feature">
                <span className="feature-icon">✓</span>
                <span className="feature-text">Thiết kế 3D chân thực</span>
              </div>
              <div className="cta-feature">
                <span className="feature-icon">✓</span>
                <span className="feature-text">Thi công chuyên nghiệp</span>
              </div>
            </div>
            <button className="cta-button" onClick={handleConsultationClick}>
              ĐĂNG KÝ TƯ VẤN NGAY
            </button>
          </div>
          <div className="cta-image">
            <img 
              src={consultationImage} 
              alt="Interior Design Consultation" 
              className="consultation-image"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage; 