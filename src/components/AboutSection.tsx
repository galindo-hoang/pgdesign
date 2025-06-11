// src/components/AboutSection.tsx
import React from "react";
import "./AboutSection.css"; // Import its dedicated CSS

import { ReactComponent as PenIcon } from "../assets/icons/Edit.svg"; // Adjust path to your SVG

// You might not need props for this simple component, but it's good practice
// to define an interface if you wanted to make the text dynamic.
interface AboutSectionProps {
  // headline?: string;
  // subHeadline?: string;
  // description?: string;
}

const AboutSection: React.FC<AboutSectionProps> = () => {
  return (
    <section className="about-section">
      <h2 className="about-headline">MỖI THIẾT KẾ LÀ MỘT CÂU CHUYỆN</h2>
      <div className="about-subheadline-container">
        <h3 className="about-headline">MỖI CÔNG TRÌNH LÀ MỘT DẤU ẤN</h3>
        {/* The SVG icon next to the sub-headline */}
        {/* Set its color via the 'color' CSS property of its parent/self */}
        <PenIcon className="about-pen-icon" />
      </div>
      <p className="about-description">
        Thành lập từ năm 2022, PG là đội ngũ kiến trúc sư trẻ đầy đam mê và
        nhiệt huyết, hoạt động chuyên sâu trong lĩnh vực Kiến trúc - Xây dựng -
        Nội thất. Chúng tôi mang đến giải pháp toàn diện từ thiết kế ý tưởng đến
        thi công hoàn thiện, giúp khách hàng tối ưu không gian sống, tiết kiệm
        thời gian và chi phí, nhưng vẫn đảm bảo thẩm mỹ và công năng.
      </p>
    </section>
  );
};

export default AboutSection;
