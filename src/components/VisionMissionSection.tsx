// src/components/AboutUsSection.tsx
import React, { useRef, useEffect, useState } from "react";
import "./VisionMissionSection.css";
import aboutUsImage from "../assets/images/vision-mission-section.jpg"; // Path to your image
// Make sure you have this image in src/assets/images/ or update the path

const VisionMissionSection: React.FC = () => {
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            // Disconnect observer after first trigger to prevent re-animation
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.3, // Trigger when 30% of the element is visible
        rootMargin: '0px 0px -50px 0px', // Adjust trigger point
      }
    );

    if (imageContainerRef.current) {
      observer.observe(imageContainerRef.current);
    }

    return () => {
      if (imageContainerRef.current) {
        observer.unobserve(imageContainerRef.current);
      }
      observer.disconnect();
    };
  }, [isVisible]);

  return (
    <section className="about-us-section">
      <div className="about-us-content-wrapper">
        <div 
          ref={imageContainerRef}
          className={`about-us-image-container ${isVisible ? 'zoom-in-animation' : ''}`}
        >
          <img
            src={aboutUsImage}
            alt="Interior decoration with lamp and plant"
            className="about-us-decoration-image"
          />
        </div>

        <div className="about-us-text-content">
          <div className="about-us-block">
            <div className="about-us-heading">TẦM NHÌN</div>
            <p className="remove-margin">
              PG Design tự hào trở thành đơn vị thiết kế - thi công uy tín hàng
              đầu: nơi mở không gian không chỉ được đầu tư về công năng và thẩm
              mỹ, mà còn là nơi kiến tạo câu chuyện bằng không gian sống của
              người sở hữu.
            </p>
            <p>
              Chúng tôi tin rằng, một không gian đẹp là không gian đặt dấu cảm
              xúc và đồng điệu với nhu cầu sống, từ đó nâng tầm trải nghiệm và
              chất lượng cuộc sống mỗi ngày.
            </p>
          </div>

          <div className="about-us-block">
            <div className="about-us-heading">SỨ MỆNH</div>
            <ul>
              <li>
                Cung cấp các giải pháp thiết kế - thi công đồng bộ, chuyên
                nghiệp, đúng tiến độ tối ưu chi phí mà vẫn đảm bảo chất lượng và
                phong cách riêng.
              </li>
              <li>
                Đạt chuẩn mực thiết kế dựa trên nhu cầu, gu thẩm mỹ và mục tiêu
                sử dụng của từng khách hàng.
              </li>
              <li>
                Không ngừng sáng tạo, cập nhật xu hướng vật liệu, công nghệ và
                phong cách mới trong ngành thiết kế - nội thất.
              </li>
              <li>
                Xây dựng mối quan hệ lâu dài với khách hàng trên nền tảng uy tín
                - minh bạch - tận tâm.
              </li>
            </ul>
          </div>

          <div className="about-us-block">
            <div className="about-us-heading">GIÁ TRỊ CỐT LÕI</div>
            <p className="core-value-item">
              <strong>1. Tận tâm & Chuyên nghiệp</strong>
              <br />
              Đồng hành cùng khách hàng từ bản vẽ đầu tiên dần hoàn thiện công
              trình, với tinh thần trách nhiệm và thái độ tận tâm.
            </p>
            <p className="core-value-item">
              <strong>2. Sáng tạo & Cá tính</strong>
              <br />
              Không gian được thiết kế không chỉ đẹp, mà còn mang dấu ấn riêng,
              thể hiện rõ "chất" của người sở hữu.
            </p>
            <p className="core-value-item">
              <strong>3. Chất lượng & Hoàn hảo</strong>
              <br />
              Luôn chọn giải pháp tốt nhất, vật liệu chất lượng và thi công
              chỉnh chu để đạt đến sự hoàn hảo trong từng chi tiết.
            </p>
            <p className="core-value-item">
              <strong>4. Hiệu quả & Kinh tế hợp lý</strong>
              <br />
              Tối ưu hóa chi phí mà vẫn đảm bảo tính thẩm mỹ, công năng và độ
              bền của công trình.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMissionSection;
