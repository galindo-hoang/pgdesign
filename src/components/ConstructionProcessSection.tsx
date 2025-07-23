import React from 'react';
import './ConstructionProcessSection.css';

// Import placeholder images - replace with actual construction/design images
import interiorImage1 from '../assets/images/profilepage/Rectangle 44.jpg';
import interiorImage2 from '../assets/images/profilepage/Rectangle 43.jpg';
import constructionImage1 from '../assets/images/profilepage/Rectangle 46.jpg';
import constructionImage2 from '../assets/images/profilepage/Rectangle 45.jpg';
import constructionImage3 from '../assets/images/profilepage/Rectangle 51.jpg';
import constructionSingleImage from '../assets/images/profilepage/Rectangle 47.jpg';
import workerImage1 from '../assets/images/profilepage/Rectangle 50.jpg';
import workerImage2 from '../assets/images/profilepage/Rectangle 49.jpg';
import workerImage3 from '../assets/images/profilepage/Rectangle 52.jpg';


const ConstructionProcessSection: React.FC = () => {
  return (
    <div className="construction-process-section">
      
      {/* Section 1: Modern Design */}
      <div className="process-section">
        <div className="process-header">
          <h3 className="process-title">THIẾT KẾ HIỆN ĐẠI - BẮT KỊP XU HƯỚNG</h3>
          <p className="process-description">
            PG Design luôn theo dõi và học hỏi những xu hướng mới và cập nhật những xu hướng thiết kế mới
            nhất. Đồng thời luôn bắt kịp thời đại công nghệ hiện tại và sử dụng những tiến bộ công nghệ để tối ưu
          </p>
        </div>
        <div className="process-images two-images">
          <img src={interiorImage1} alt="Modern interior design" />
          <img src={interiorImage2} alt="Contemporary design trends" />
        </div>
      </div>

      {/* Section 2: Quality Construction */}
      <div className="process-section">
        <div className="process-header">
          <h3 className="process-title">THI CÔNG CHẤT LƯỢNG - QUẢN LÝ CHUẨN CHỈNH</h3>
          <p className="process-description">
            Tuân thủ thực hiện toàn bộ quy trình thi công
            Phân thả, hoàn thiện, đầy đủ - tuân - kiểm bảo hảo định nghĩa tại thời điểm lắp đặt trong quá trình đã cam kết.
            Mọi công đoạn đều có kỳ sư giám sát chuyên môn, cam kết "thi công thật - giao thật kết".
          </p>
        </div>
        <div className="process-images three-images">
          <img src={constructionImage1} alt="Construction site foundation" />
          <img src={constructionImage2} alt="Professional construction work" />
          <img src={constructionImage3} alt="Construction progress monitoring" />
        </div>
      </div>

      {/* Section 3: Dedicated Team */}
      <div className="process-section">
        <div className="process-header">
          <h3 className="process-title">SẢN PHẨM TỐT - TỪ NHỮNG CON NGƯỜI TÂM HUYẾT</h3>
          <p className="process-description">
            Đội ngũ PG luôn tự hào về năng lực chuyên nghiệp
            giúp giảm chi phí qua kình nghiệm những gì cứng rắn từ chuyên môn, cam kết "thi công thật - giảng thật kết"
            để mình chi tiết đó cùng toàn bộ tâm huyết của mình cho mỗi sản phẩm.
          </p>
        </div>
        <div className="process-images single-large">
          <img src={constructionSingleImage} alt="Dedicated construction team working" />
        </div>
      </div>

      {/* Section 4: Time and Cost Optimization */}
      <div className="process-section">
        <div className="process-header">
          <h3 className="process-title">TỐI ƯU THỜI GIAN VÀ CHI PHÍ</h3>
          <p className="process-description">
            Quy trình kinh doanh và thi công chuyên nghiệp
            giúp giảm chi phí qua kình nghiệm và nghiên cứu thị trường thời gian với công việc giao hàng; thách hạng chi tiết.
            kinh doanh mất thời gian ít hơn hiệu quả - tiết kiệm thời gian và chi phí.
          </p>
        </div>
        <div className="process-images time-optimization">
          <div className="worker-row">
            <img src={workerImage1} alt="Professional worker with quality control" />
            <img src={workerImage2} alt="Construction site surveying" />
          </div>
          <div className="main-worker">
            <img src={workerImage3} alt="Construction progress and quality assurance" />
          </div>
        </div>
      </div>

    </div>
  );
};

export default ConstructionProcessSection; 