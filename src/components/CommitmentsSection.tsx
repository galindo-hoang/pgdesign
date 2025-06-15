import React from "react";
import "./CommitmentsSection.css"; // Import the CSS file

// Import your SVG icons as React Components
import { ReactComponent as DirectExecutionIcon } from "../assets/icons/direct-execution-icon.svg";
import { ReactComponent as QualityMaterialsIcon } from "../assets/icons/quality-materials-icon.svg";
import { ReactComponent as ClearPricingIcon } from "../assets/icons/clear-pricing-icon.svg";
import { ReactComponent as TimelyDeliveryIcon } from "../assets/icons/timely-delivery-icon.svg";
import { ReactComponent as ReasonablePriceIcon } from "../assets/icons/reasonable-price-icon.svg";
import { ReactComponent as PostHandoverWarrantyIcon } from "../assets/icons/post-handover-warranty-icon.svg";

const CommitmentsSection: React.FC = () => {
  return (
    <section className="pg-commitments-section">
      <h2 className="pg-commitments-heading">CAM KẾT CỦA PG DESIGN</h2>
      <div className="pg-commitments-grid">
        {/* Commitment Item 1: KHÔNG KHOÁN THẦU */}
        <div className="commitment-item">
          <div className="commitment-header">
            {" "}
            {/* <-- This wrapper is crucial for side-by-side layout */}
            <div className="commitment-icon">
              <DirectExecutionIcon />
            </div>
            <h3 className="commitment-title">KHÔNG KHOÁN THẦU</h3>
          </div>
          <p className="commitment-description">
            PG Design cam kết trực tiếp đảm nhận từ khâu thiết kế đến thi công,
            không giao khoán cho bên thứ ba.
          </p>
        </div>

        {/* Commitment Item 2: VẬT TƯ ĐẠT CHUẨN */}
        <div className="commitment-item">
          <div className="commitment-header">
            <div className="commitment-icon">
              <QualityMaterialsIcon />
            </div>
            <h3 className="commitment-title">VẬT TƯ ĐẠT CHUẨN</h3>
          </div>
          <p className="commitment-description">
            Chúng tôi sử dụng vật liệu chính hãng, rõ nguồn gốc, đảm bảo độ bền
            và tính thẩm mỹ cho công trình.
          </p>
        </div>

        {/* Commitment Item 3: CHI PHÍ MINH BẠCH */}
        <div className="commitment-item">
          <div className="commitment-header">
            <div className="commitment-icon">
              <ClearPricingIcon />
            </div>
            <h3 className="commitment-title">CHI PHÍ MINH BẠCH</h3>
          </div>
          <p className="commitment-description">
            Mọi hạng mục đều được minh bạch trong báo giá. Cam kết không để
            khách hàng lo lắng về chi phí phát sinh bất ngờ.
          </p>
        </div>

        {/* Commitment Item 4: THI CÔNG ĐÚNG TIẾN ĐỘ */}
        <div className="commitment-item">
          <div className="commitment-header">
            <div className="commitment-icon">
              <TimelyDeliveryIcon />
            </div>
            <h3 className="commitment-title">THI CÔNG ĐÚNG TIẾN ĐỘ</h3>
          </div>
          <p className="commitment-description">
            Chúng tôi đặt uy tín lên hàng đầu, bằng việc thực hiện công trình
            đúng tiến độ đã thống nhất với khách hàng.
          </p>
        </div>

        {/* Commitment Item 5: GIÁ HỢP LÝ - TỐI ƯU NGÂN SÁCH */}
        <div className="commitment-item">
          <div className="commitment-header">
            <div className="commitment-icon">
              <ReasonablePriceIcon />
            </div>
            <h3 className="commitment-title">GIÁ HỢP LÝ - TỐI ƯU NGÂN SÁCH</h3>
          </div>
          <p className="commitment-description">
            Chi phí thiết kế và thi công được tính toán hợp lý, mang lại giá trị
            cao nhất cho mỗi đồng đầu tư của khách hàng.
          </p>
        </div>

        {/* Commitment Item 6: CAM KẾT BẢO HÀNH */}
        <div className="commitment-item">
          <div className="commitment-header">
            <div className="commitment-icon">
              <PostHandoverWarrantyIcon />
            </div>
            <h3 className="commitment-title">CAM KẾT BẢO HÀNH</h3>
          </div>
          <p className="commitment-description">
            Sau khi bàn giao, PG Design vẫn luôn đồng hành cùng khách hàng thông
            qua chính sách bảo hành chuyên nghiệp và chu đáo.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CommitmentsSection;
