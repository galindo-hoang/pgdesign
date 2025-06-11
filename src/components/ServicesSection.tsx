// src/components/ServicesSection.tsx
import React from "react";
import "./ServicesSection.css"; // Import its dedicated CSS
import TmpImage from "../assets/images/thumb-home.png";

// Define an interface for each service item
interface ServiceItemData {
  id: number;
  imageUrl: string;
  category: string; // "Dịch vụ"
  title: string;
  link: string; // URL for "Xem chi tiết"
}

const ServicesSection: React.FC = () => {
  // Define the data for your services
  const services: ServiceItemData[] = [
    {
      id: 1,
      imageUrl: "../assets/images/thumb-home.png", // Replace with your image paths
      category: "Dịch vụ",
      title: "Thiết kế kiến trúc",
      link: "#", // Placeholder link
    },
    {
      id: 2,
      imageUrl: "../assets/images/thumb-home.png",
      category: "Dịch vụ",
      title: "Thiết kế nội thất",
      link: "#",
    },
    {
      id: 3,
      imageUrl: "/assets/images/thumb-home.png",
      category: "Dịch vụ",
      title: "Thi công hoàn thiện",
      link: "#",
    },
    {
      id: 4,
      imageUrl: "/assets/images/thumb-home.png",
      category: "Dịch vụ",
      title: "Thi công trọn gói",
      link: "#",
    },
  ];

  return (
    <section className="services-section">
      <h2 className="services-main-headline">GIẢI PHÁP KHÔNG GIAN</h2>
      <h3 className="services-sub-headline">DÀNH RIÊNG CHO BẠN</h3>

      <div className="services-grid">
        {services.map((service) => (
          <div key={service.id} className="service-card">
            {/* The image container with the curved top and now the overlaid text */}
            <div className="service-image-container">
              <img
                src={TmpImage}
                alt={service.title}
                className="service-image"
              />
              {/* Overlay for gradient/text readability */}
              <div className="image-overlay">
                <div className="service-info">
                  <a href={service.link} className="service-details-link">
                    Xem chi tiết
                  </a>
                  <div className="service-text-content">
                    <p className="service-category">{service.category}</p>
                    <h4 className="service-title">{service.title}</h4>
                  </div>
                </div>
              </div>

              {/* Service info is now inside the image container */}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
