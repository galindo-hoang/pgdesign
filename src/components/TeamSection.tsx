// src/components/TeamSection.js
import React from "react";
import "./TeamSection.css"; // Import the CSS file

import TmpImage from "../assets/images/thumb-home.png";
// Import your images here (if using local files in a React app)
// import phanAnhThuImage from '../assets/images/phan_anh_thu.jpg';
// import voNguyenPhapImage from '../assets/images/vo_nguyen_phap.jpg';

const TeamSection: React.FC = () => {
  // You could define your team members as an array of objects here
  const teamMembers = [
    {
      id: 1,
      name: "Phan Anh Thư",
      title: "CEO",
      image: "path/to/phan_anh_thu_image.jpg",
    },
    {
      id: 2,
      name: "Võ Nguyên Pháp",
      title: "Project Director",
      image: "path/to/vo_nguyen_phap_image.jpg",
    },
    {
      id: 3,
      name: "Phan Anh Thư",
      title: "CEO",
      image: "path/to/phan_anh_thu_image.jpg",
    },
    {
      id: 4,
      name: "Võ Nguyên Pháp",
      title: "Project Director",
      image: "path/to/vo_nguyen_phap_image.jpg",
    },
    {
      id: 5,
      name: "Phan Anh Thư",
      title: "CEO",
      image: "path/to/phan_anh_thu_image.jpg",
    },
    {
      id: 6,
      name: "Võ Nguyên Pháp",
      title: "Project Director",
      image: "path/to/vo_nguyen_phap_image.jpg",
    },
    {
      id: 7,
      name: "Phan Anh Thư",
      title: "CEO",
      image: "path/to/phan_anh_thu_image.jpg",
    },
    {
      id: 8,
      name: "Võ Nguyên Pháp",
      title: "Project Director",
      image: "path/to/vo_nguyen_phap_image.jpg",
    },
    // Add more members as needed
  ];

  return (
    <section className="pg-team-section">
      <div className="pg-team-content">
        <div className="pg-team-intro-wrapper">
          <div className="pg-teavi-heading">Đội ngữ PG Design</div>
          <p className="pg-team-intro-text">
            Những người trẻ đầy nhiệt huyết và đam mê sáng tạo. Đội ngũ được xây
            dựng để đồng hành cùng bạn từ bước định hình ý tưởng, phát triển bản
            sắc thương hiệu cho đến quản lý toàn bộ quy trình - từ trước đến sau
            khi sản phẩm hoàn thiện.
          </p>
        </div>
        <div className="pg-team-grid">
          {teamMembers.map((member) => (
            <div className="team-member-card" key={member.id}>
              <div className="member-image-container">
                <img
                  src={TmpImage}
                  alt={member.name}
                  className="member-image"
                />
              </div>
              <p className="member-name">{member.name}</p>
              <p className="member-title">{member.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
