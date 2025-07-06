import React from "react";
import "./SolutionSection.css"
import TmpImage from "../assets/images/diary-image-1.jpg";

interface solutionItemData {
  id: number;
  imageUrl: string;
  category: string; // "Dịch vụ"
  title: string;
  link: string; // URL for "Xem chi tiết"
}

const SolutionSection: React.FC = () => {
  // Define the data for your solutions
  const solutions: solutionItemData[] = [
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
    <section className="solutions-section">
      <h2 className="solutions-main-headline">GIẢI PHÁP KHÔNG GIAN</h2>
      <h3 className="solutions-sub-headline">DÀNH RIÊNG CHO BẠN</h3>
      <div className="solutions-grid">
        {solutions.map((solution) => (
          <div key={solution.id} className="solution-card">
            {/* The image container with the curved top and now the overlaid text */}
            <div className="solution-image-container">
              <img
                src={TmpImage}
                alt={solution.title}
                className="solution-image"
              />
              {/* Overlay for gradient/text readability */}
              <div className="image-overlay">
                <div className="solution-info">
                  <a href={solution.link} className="solution-details-link">
                    Xem chi tiết
                  </a>
                  <div className="solution-text-content">
                    <p className="solution-category">{solution.category}</p>
                    <h4 className="solution-title">{solution.title}</h4>
                  </div>
                </div>
              </div>

              {/* solution info is now inside the image container */}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SolutionSection;