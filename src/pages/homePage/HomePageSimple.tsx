import React from "react";
import "./HomePage.css";
import thumbIntro from "../../assets/images/thumb-intro.jpg";

const HomePageSimple: React.FC = () => {
  console.log("HomePageSimple component mounting...");

  return (
    <div className="home-page">
      {/* Diagnostic Info */}
      <div style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        background: 'rgba(0,0,0,0.8)',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        fontSize: '12px',
        zIndex: 9999
      }}>
        <h4>Simple Home Page Loaded</h4>
        <p>If you see this, React is working</p>
      </div>
      
      {/* Hero/Intro Section */}
      <section className="hero-section">
        <div className="hero-image-container">
          <img src={thumbIntro} alt="PG Design - Kiến tạo không gian" className="hero-image" />
        </div>
      </section>

      {/* Simple Content Sections */}
      <main className="main-content">
        <section style={{ padding: '50px 20px', textAlign: 'center', background: '#f8f9fa' }}>
          <h2>MỖI THIẾT KẾ LÀ MỘT CÂU CHUYỆN</h2>
          <h3>MỖI CÔNG TRÌNH LÀ MỘT DẤU ẤN</h3>
          <p>
            Thành lập từ năm 2022, PG là đội ngũ kiến trúc sư trẻ đầy đam mê và
            nhiệt huyết, hoạt động chuyên sâu trong lĩnh vực Kiến trúc - Xây dựng -
            Nội thất. Chúng tôi mang đến giải pháp toàn diện từ thiết kế ý tưởng đến
            thi công hoàn thiện, giúp khách hàng tối ưu không gian sống, tiết kiệm
            thời gian và chi phí, nhưng vẫn đảm bảo thẩm mỹ và công năng.
          </p>
        </section>
        
        <section style={{ padding: '50px 20px', textAlign: 'center', background: '#ffffff' }}>
          <h2>DỊCH VỤ CỦA CHÚNG TÔI</h2>
          <p>Thiết kế kiến trúc, nội thất và thi công chuyên nghiệp</p>
        </section>
        
        <section style={{ padding: '50px 20px', textAlign: 'center', background: '#f8f9fa' }}>
          <h2>THỐNG KÊ</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
            <div style={{ padding: '20px' }}>
              <h3>8+</h3>
              <p>Năm kinh nghiệm</p>
            </div>
            <div style={{ padding: '20px' }}>
              <h3>500+</h3>
              <p>Khách hàng</p>
            </div>
            <div style={{ padding: '20px' }}>
              <h3>450+</h3>
              <p>Dự án</p>
            </div>
            <div style={{ padding: '20px' }}>
              <h3>98%</h3>
              <p>Chất lượng</p>
            </div>
          </div>
        </section>
        
        <section style={{ padding: '50px 20px', textAlign: 'center', background: '#ffffff' }}>
          <h2>LIÊN HỆ</h2>
          <p>Hãy liên hệ với chúng tôi để được tư vấn miễn phí</p>
        </section>
      </main>
    </div>
  );
};

export default HomePageSimple; 