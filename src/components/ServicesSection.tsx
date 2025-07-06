// src/components/ServicesSection.tsx
import React from "react";
import "./ServicesSection.css"; // Import its dedicated CSS
import heroImage from "../assets/images/vision-mission-section.jpg";

const ServicesSection: React.FC = () => {
  const services = [
    {
      id: 1,
      title: "Dịch vụ thi công",
      subtitle: "Phân thô hoặc",
      description: "Trọn gói hoàn thiện"
    },
    {
      id: 2,
      title: "Dịch vụ thi công",
      subtitle: "",
      description: "Nội thất"
    },
    {
      id: 3,
      title: "Dịch vụ thiết kế",
      subtitle: "",
      description: "Kiến trúc - Nội thất"
    },
    {
      id: 4,
      title: "Dịch vụ thi công",
      subtitle: "Cải tạo sửa chữa hoặc",
      description: "Dự án đã có bản vẽ"
    }
  ];

  return (
    <section className="services-section">
      <div className="services-container">
        <div className="services-hero-content-container">
          <div className="services-hero-content">
            <h1 className="services-main-title">DỊCH VỤ</h1>
            <h2 className="services-brand">PG DESIGN</h2>
            <p className="services-description">
              Chúng tôi đồng hành cùng khách hàng từ bản vẽ ý tưởng đến không gian sống hoàn thiện, 
              tối ưu công năng - nâng tầm thẩm mỹ - đảm bảo chất lượng thi công.
            </p>
          </div>
        </div>
        
        {/* Hero Image */}
        <div className="services-hero-image">
          <img 
            src={heroImage} 
            alt="Modern Interior Design" 
            className="services-hero-img"
          />
        </div>

        <div className="services-grid-container">
          <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-number">
                <span>{service.id}</span>
              </div>
              <div className="service-content">
                <h3 className="service-title">{service.title}</h3>
                {service.subtitle && (
                  <p className="service-subtitle">{service.subtitle}</p>
                )}
                <p className="service-card-description">{service.description}</p>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
