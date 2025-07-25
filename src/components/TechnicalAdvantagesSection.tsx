import React from 'react';
import './TechnicalAdvantagesSection.css';

// Import placeholder images - replace with actual project images
import constructionImage1 from '../assets/images/profilepage/Rectangle 54.png';
import constructionImage2 from '../assets/images/profilepage/Rectangle 53.png';
import constructionImage3 from '../assets/images/profilepage/Rectangle 55.png';
import constructionImage4 from '../assets/images/profilepage/Rectangle 57.png';
import constructionImage5 from '../assets/images/profilepage/Rectangle 56.png';
import constructionImage6 from '../assets/images/profilepage/Rectangle 58.png';
import constructionImage7 from '../assets/images/profilepage/Rectangle 59.png';
import constructionImage8 from '../assets/images/profilepage/Rectangle 61.png';
import constructionImage9 from '../assets/images/profilepage/Rectangle 60.png';
import constructionImage10 from '../assets/images/profilepage/Rectangle 62.png';

const TechnicalAdvantagesSection: React.FC = () => {
  return (
    <div className="technical-advantages-section">
      <div className="technical-container">
        
        {/* Main Title */}
        <div className="main-header">
          <h2 className="main-title">ƯU ĐIỂM KỸ THUẬT TỪNG GIAI ĐOẠN<br/>CỦA PG DESIGN</h2>
        </div>

        {/* Phase 1: Foundation & Structure */}
        <div className="phase-section">
          <div className="phase-header">
            <h3 className="phase-title">PHẦN THỨ I | CHẮC CHẮN & CHÍNH XÁC</h3>
            <p className="phase-description">
              Bao lạch thú công tỷ năng - kiểm soát chất từ<br/>
              Đội thi công hay nghề cao - giám sát kỹ chuyên nghiệp<br/>
              Thi công đúng quy chuẩn kỹ cần - tiến vàng thi thái
            </p>
          </div>
          <div className="phase-images three-grid">
            <img src={constructionImage1} alt="Foundation construction - accurate and solid" />
            <img src={constructionImage2} alt="Structural work in progress" />
            <img src={constructionImage3} alt="Quality control during construction" />
          </div>
        </div>

        {/* Phase 2: Completion & Refinement */}
        <div className="phase-section">
          <div className="phase-header">
            <h3 className="phase-title">PHẦN HOÀN THIỆN | CHỈN CHU & TINH TẾ</h3>
            <p className="phase-description">
              Hoàn thiện tỉ mỉ từng góc nhìn, tỉ số đã đo thả hoàng trầm - nhận - nước<br/>
              Kỹ thuật thi công căn cứ ḅêri, gọm chính, đảng bảo vệ phẩm cấu<br/>
              Luôn chủ vệ thi công tứng tiếp cận & tỹ hãnh mỹ
            </p>
          </div>
          <div className="phase-images mixed-layout">
            <div className="top-row">
              <img src={constructionImage4} alt="Detailed finishing work" />
              <img src={constructionImage5} alt="Precision in construction details" />
            </div>
            <div className="bottom-large">
              <img src={constructionImage6} alt="Completed refined construction phase" />
            </div>
          </div>
        </div>

        {/* Phase 3: Interior & Aesthetics */}
        <div className="phase-section">
          <div className="phase-header">
            <h3 className="phase-title">PHẦN NỘI THẤT | CHỈNH XÁC & THẨM MỸ</h3>
            <p className="phase-description">
              Thi công nội thất theo bản vệ 3D - đúng kích thước, cùng từng<br/>
              Chất liệu tỉ dạng, thiết cồng đầu, veneer, laminate, đầ tỉ mỹlíca,<br/>
              Xuống tận xuất riêng - đạt bậc hăoim loại chất lượng tỉ đầu đơn cuối
            </p>
          </div>

          <div className="phase-images mixed-layout">
            <div className="main-large">
              <img src={constructionImage7} alt="Completed refined construction phase" />
            </div>
            <div className="sub-row">
              <img src={constructionImage8} alt="Precise interior finishing" />
              <img src={constructionImage9} alt="Detailed finishing work" />
              <img src={constructionImage10} alt="Precision in construction details" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TechnicalAdvantagesSection; 