import React from 'react';
import './CapabilitiesSection.css';

// Import placeholder images - you can replace these with actual architectural renderings
import architecturalImage1 from '../assets/images/diary-image-1.jpg';
import architecturalImage2 from '../assets/images/diary-image-2.jpg';
import architecturalImage3 from '../assets/images/diary-image-3.jpg';

const CapabilitiesSection: React.FC = () => {
  return (
    <div className="capabilities-section">
      <div className="capabilities-container">
        {/* Header Section */}
        <div className="capabilities-header">
          <h1 className="capabilities-title">NĂNG LỰC</h1>
          <h2 className="company-name">PG DESIGN</h2>
          <div className="company-branding">
            <div className="service-line">THIẾT KẾ & THI CÔNG TRỌN GÓI</div>
            <p className="capabilities-description">
              Tối ưu toàn bộ quy trình - Đảm bảo chất lượng - Tiết kiệm chi phí
            </p>
          </div>
        </div>

        {/* Capabilities List */}
        <div className="capabilities-content">
          <div className="capabilities-list">
            <ul>
              <li> <strong>Một đầu mối - Xuyên suốt từ thiết kế đến thi công</strong>, giúp giảm sai sót và rút ngắn tiến độ.</li>
              <li> <strong>Thi công nhanh hơn đến 25%</strong>, kiểm soát chất lượng và an toàn công trình.</li>
              <li> <strong>Tiết kiệm 10-20% chi phí</strong> nhờ quy trình khép kín và quản lý ngân sách hiệu quả.</li>
              <li> <strong>Thiết kế hiện đại, đề thi công</strong> phù hợp xu hướng và nhu cầu sử dụng thực tế.</li>
              <li> <strong>Đội ngũ trẻ, giàu nhiệt huyết</strong> - luôn cập nhật xu hướng mới và hướng không gian sống. </li>
            </ul>
          </div>
        </div>

        {/* Architectural Images */}
        <div className="architectural-images">
          <div className="image-grid">
            <div className="main-image">
              <img src={architecturalImage1} alt="Modern villa design with elegant columns and contemporary architecture" />
            </div>
            <div className="side-images">
              <div className="side-image">
                <img src={architecturalImage2} alt="Detailed view of modern villa entrance with classical elements" />
              </div>
              <div className="side-image">
                <img src={architecturalImage3} alt="Alternative angle of luxury villa design showcasing architectural details" />
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="benefits-section">
          <h3 className="benefits-title">
            LỢI ÍCH KHÁCH HÀNG NHẬN ĐƯỢC <br/>
            KHI CHỌN PG DESIGN
          </h3>
        </div>
      </div>
    </div>
  );
};

export default CapabilitiesSection; 