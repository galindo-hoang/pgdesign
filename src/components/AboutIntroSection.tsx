import React, { useRef, useEffect, useState } from "react";
import "./AboutIntroSection.css"; // Import CSS module
import backgroundImage from "../assets/images/thumb-intro.jpg"; // Adjust path as needed

const IntroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fallback: Trigger animation after 1 second regardless of intersection
    const fallbackTimer = setTimeout(() => {
      if (!isVisible) {
        console.log('About Intro - Fallback animation trigger'); // Debug log
        setIsVisible(true);
      }
    }, 1000);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log('About Intro - Intersection triggered:', entry.isIntersecting); // Debug log
          if (entry.isIntersecting && !isVisible) {
            console.log('About Intro - Starting zoom animation'); // Debug log
            clearTimeout(fallbackTimer); // Cancel fallback if intersection works
            setIsVisible(true);
            // Disconnect observer after first trigger to prevent re-animation
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px', // Reduced margin for easier triggering
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      clearTimeout(fallbackTimer);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      observer.disconnect();
    };
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className={`about-intro-section ${isVisible ? 'zoom-in-bg' : ''}`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="about-intro-content-container">
        <div className="intro-pg-design">
          <p className="about-intro-pg-design-title">PG DESIGN</p>
          <p className="about-intro-pg-design-subtitle">KIẾN TẠO KHÔNG GIAN</p>
        </div>

        <div className="about-intro-separator-line"></div>

        <p className="about-intro-affirm-identity">KHẲNG ĐỊNH BẢN SẮC</p>

        <p className="about-intro-description-paragraph">
          Là đơn vị chuyên nghiệp trong lĩnh vực thiết kế kiến trúc, nội thất và
          thi công trọn gói. Với đội ngũ thiết kế và thi công giàu kinh nghiệm,
          chúng tôi cam kết mang đến những công trình chất lượng cao, đúng tiến
          độ và phần ánh rõ rệt tính cách của từng khách hàng.
        </p>

        <p className="about-intro-description-paragraph">
          PG Design không chỉ tạo ra những không gian sống và làm việc thẩm mỹ,
          mà còn góp phần xây dựng bản sắc riêng cho mỗi công trình thông qua
          thiết kế cá nhân hóa và có chiều sâu, gắn liền với phong cách sống và
          định hướng thương hiệu của khách hàng. Đây chính là cách chúng tôi
          mang đến giá trị vượt lên trên vẻ đẹp bề mặt - một không gian có hồn
          và có ý nghĩa.
        </p>
      </div>
    </section>
  );
};

export default IntroSection;
