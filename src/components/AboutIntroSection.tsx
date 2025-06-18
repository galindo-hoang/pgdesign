import React from "react";
import "./AboutIntroSection.css"; // Import CSS module
import backgroundImage from "../assets/images/thumb-intro.jpg"; // Adjust path as needed

const IntroSection: React.FC = () => {
  return (
    <section
      className="intro-section"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="intro-content-container">
        <div className="intro-pg-design">
          <p className="intro-pg-design-title">PG DESIGN</p>
          <p className="intro-pg-design-subtitle">KIẾN TẠO KHÔNG GIAN</p>
        </div>

        <div className="intro-separator-line"></div>

        <p className="intro-affirm-identity">KHẲNG ĐỊNH BẢN SẮC</p>

        <p className="intro-description-paragraph">
          Là đơn vị chuyên nghiệp trong lĩnh vực thiết kế kiến trúc, nội thất và
          thi công trọn gói. Với đội ngũ thiết kế và thi công giàu kinh nghiệm,
          chúng tôi cam kết mang đến những công trình chất lượng cao, đúng tiến
          độ và phần ánh rõ rệt tính cách của từng khách hàng.
        </p>

        <p className="intro-description-paragraph">
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
