// src/services/blogDetailService.ts

import { BlogDetailData, BlogDetailServiceResponse } from '../types/blogDetailTypes';

// Mock data for blog details - replace with actual API calls
const mockBlogDetails: { [key: string]: BlogDetailData } = {
  "nha-dep-mix-chat-lieu-dung-cach": {
    id: "1",
    title: "4 Công Thức Phối Vật Liệu Giúp Không Gian 'Lên Đời' Tức Thì",
    subtitle: "(Hoặc: Nhà Đẹp Là Do Mix Chất Liệu Đúng Cách – Bạn Đã Biết Chưa?)",
    excerpt: "Khám phá bí quyết tạo nên không gian sống đẹp mắt thông qua việc kết hợp các chất liệu một cách hài hòa. Từ gỗ tự nhiên đến kim loại, từ vải vóc đến đá cẩm thạch, mỗi chất liệu đều mang đến một vẻ đẹp riêng biệt.",
    thumbnail: "/src/assets/images/diary-image-1.jpg",
    viewCount: 2156,
    hashtags: ["chất liệu", "thiết kế", "nội thất", "mix-match"],
    publishDate: "2024-01-20",
    slug: "nha-dep-mix-chat-lieu-dung-cach",
    author: "PG Design Team",
    readTime: "8 phút",
    category: "Thiết kế nội thất",
    htmlContent: `
      <div class="blog-content">
        <div class="blog-intro" style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 2rem; border-radius: 12px; margin-bottom: 2rem; border-left: 4px solid #1b3025;">
          <p style="font-size: 1.1rem; line-height: 1.8; color: #2c3e50; margin: 0; font-weight: 500;">
            Trong thiết kế nội thất hiện đại, việc kết hợp các chất liệu không chỉ là vấn đề thẩm mỹ mà còn là <strong style="color: #1b3025;">nghệ thuật tạo chiều sâu và cá tính</strong> cho không gian. Sự kết hợp tinh tế, sáng tạo giữa các chất liệu khác nhau sẽ mang đến cho ngôi nhà của bạn một vẻ đẹp độc đáo và ấn tượng.
          </p>
        </div>
        
        <p style="font-size: 1.05rem; line-height: 1.7; color: #495057; margin-bottom: 2rem;">
          Dưới đây là <span style="color: #1b3025; font-weight: 600;">4 công thức phối vật liệu</span> phổ biến và hiệu quả mà PG Design muốn chia sẻ với bạn:
        </p>

        <div class="material-combination" style="margin-bottom: 3rem;">
          <h3 style="color: #1b3025; font-size: 1.4rem; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid #e9ecef;">
            <span style="background: linear-gradient(45deg, #1b3025, #2d5a4a); color: white; padding: 0.3rem 0.8rem; border-radius: 6px; margin-right: 0.5rem;">1</span>
            Đá lát & Gỗ – Mát lạnh gặp ấm áp
          </h3>
          <div style="display: flex; gap: 1.5rem; align-items: flex-start; margin-bottom: 1.5rem;">
            <img src="/src/assets/images/diary-image-1.jpg" alt="Đá lát và gỗ kết hợp" style="width: 200px; height: 150px; object-fit: cover; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />
            <div>
              <p style="font-size: 1rem; line-height: 1.6; color: #495057; margin-bottom: 1rem;">
                Đây là cặp đôi hoàn hảo kết hợp giữa vẻ <strong style="color: #1b3025;">sang trọng, mát lạnh</strong> của đá với cảm giác <strong style="color: #1b3025;">mộc mạc, gần gũi</strong> của gỗ. Sự kết hợp này đặc biệt phù hợp cho các khu vực như bếp hoặc phòng tắm, nơi cần sự bền bỉ và thẩm mỹ cao.
              </p>
              <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px; border-left: 3px solid #1b3025;">
                <p style="margin: 0; font-size: 0.95rem; color: #495057;">
                  <strong style="color: #1b3025;">💡 Khám phá các mẫu thiết kế bếp – phòng tắm</strong> kết hợp đá & gỗ tại 
                  <a href="https://pgdesign.vn/" target="_blank" style="color: #1b3025; text-decoration: none; font-weight: 600; border-bottom: 1px solid #1b3025;">PG Design</a> 
                  – Đơn vị thiết kế nội thất uy tín
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="material-combination" style="margin-bottom: 3rem;">
          <h3 style="color: #1b3025; font-size: 1.4rem; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid #e9ecef;">
            <span style="background: linear-gradient(45deg, #1b3025, #2d5a4a); color: white; padding: 0.3rem 0.8rem; border-radius: 6px; margin-right: 0.5rem;">2</span>
            Đá & Gỗ – Mộc mạc mà sang trọng
          </h3>
          <div style="display: flex; gap: 1.5rem; align-items: flex-start; margin-bottom: 1.5rem;">
            <img src="/src/assets/images/diary-image-2.jpg" alt="Đá và gỗ tự nhiên" style="width: 200px; height: 150px; object-fit: cover; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />
            <div>
              <p style="font-size: 1rem; line-height: 1.6; color: #495057; margin-bottom: 1rem;">
                Đá và gỗ khi kết hợp với nhau tạo nên một không gian vừa <strong style="color: #1b3025;">đơn giản, tinh tế</strong> vừa đầy chiều sâu. Sự kết hợp này mang đến cảm giác thư giãn, thoải mái và rất phù hợp cho phòng khách, phòng đọc sách hoặc phòng giải trí.
              </p>
              <p style="font-size: 1rem; line-height: 1.6; color: #495057; margin-bottom: 1rem;">
                Bề mặt gỗ tự nhiên kết hợp với đá thô tạo nên không gian sống <strong style="color: #1b3025;">bền bỉ, sang trọng</strong> nhưng không kém phần mộc mạc.
              </p>
              <div style="background: #f8f9fa; padding: 1rem; border-radius: 8px; border-left: 3px solid #1b3025;">
                <p style="margin: 0; font-size: 0.95rem; color: #495057;">
                  <strong style="color: #1b3025;">🔍 Xem thêm các mẫu nội thất phòng khách</strong> ứng dụng phối chất liệu tại 
                  <a href="https://pgdesign.vn/" target="_blank" style="color: #1b3025; text-decoration: none; font-weight: 600; border-bottom: 1px solid #1b3025;">https://pgdesign.vn/</a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="material-combination" style="margin-bottom: 3rem;">
          <h3 style="color: #1b3025; font-size: 1.4rem; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid #e9ecef;">
            <span style="background: linear-gradient(45deg, #1b3025, #2d5a4a); color: white; padding: 0.3rem 0.8rem; border-radius: 6px; margin-right: 0.5rem;">3</span>
            Kim loại & Gỗ – Hiện đại gặp tự nhiên
          </h3>
          <div style="display: flex; gap: 1.5rem; align-items: flex-start; margin-bottom: 1.5rem;">
            <img src="/src/assets/images/diary-image-3.jpg" alt="Kim loại và gỗ kết hợp" style="width: 200px; height: 150px; object-fit: cover; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />
            <div>
              <p style="font-size: 1rem; line-height: 1.6; color: #495057; margin-bottom: 1rem;">
                Sự kết hợp giữa kim loại và gỗ tạo nên không gian vừa <strong style="color: #1b3025;">hiện đại vừa ấm cúng</strong>. Kim loại mang đến vẻ sáng bóng, hiện đại trong khi gỗ tạo cảm giác tự nhiên, gần gũi.
              </p>
              <p style="font-size: 1rem; line-height: 1.6; color: #495057; margin-bottom: 1rem;">
                Kết hợp này đặc biệt phù hợp cho các không gian làm việc, phòng khách hiện đại hoặc các khu vực cần sự <strong style="color: #1b3025;">cân bằng giữa công năng và thẩm mỹ</strong>.
              </p>
            </div>
          </div>
        </div>

        <div class="material-combination" style="margin-bottom: 3rem;">
          <h3 style="color: #1b3025; font-size: 1.4rem; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid #e9ecef;">
            <span style="background: linear-gradient(45deg, #1b3025, #2d5a4a); color: white; padding: 0.3rem 0.8rem; border-radius: 6px; margin-right: 0.5rem;">4</span>
            Vải vóc & Gỗ – Mềm mại gặp cứng cáp
          </h3>
          <div style="display: flex; gap: 1.5rem; align-items: flex-start; margin-bottom: 1.5rem;">
            <img src="/src/assets/images/diary-image-4.jpg" alt="Vải vóc và gỗ kết hợp" style="width: 200px; height: 150px; object-fit: cover; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />
            <div>
              <p style="font-size: 1rem; line-height: 1.6; color: #495057; margin-bottom: 1rem;">
                Vải vóc và gỗ là sự kết hợp hoàn hảo tạo nên không gian <strong style="color: #1b3025;">ấm cúng, thoải mái</strong>. Vải vóc mang đến sự mềm mại, ấm áp trong khi gỗ tạo nền tảng vững chắc, tự nhiên.
              </p>
              <p style="font-size: 1rem; line-height: 1.6; color: #495057; margin-bottom: 1rem;">
                Sự kết hợp này rất phù hợp cho phòng ngủ, phòng khách hoặc các khu vực sinh hoạt gia đình cần sự <strong style="color: #1b3025;">thoải mái và ấm cúng</strong>.
              </p>
            </div>
          </div>
        </div>

        <div class="tips-section" style="background: linear-gradient(135deg, #1b3025 0%, #2d5a4a 100%); color: white; padding: 2rem; border-radius: 12px; margin: 3rem 0;">
          <h3 style="color: white; font-size: 1.4rem; margin-bottom: 1.5rem; text-align: center;">
            💡 Lời khuyên khi phối vật liệu
          </h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
            <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px; border-left: 3px solid #4CAF50;">
              <strong style="color: #4CAF50;">🎯 Chọn 2-3 chất liệu chính:</strong>
              <p style="margin: 0.5rem 0 0 0; font-size: 0.95rem; opacity: 0.9;">Tránh sử dụng quá nhiều chất liệu khác nhau trong cùng một không gian</p>
            </div>
            <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px; border-left: 3px solid #4CAF50;">
              <strong style="color: #4CAF50;">⚖️ Cân bằng tỷ lệ:</strong>
              <p style="margin: 0.5rem 0 0 0; font-size: 0.95rem; opacity: 0.9;">Một chất liệu nên chiếm khoảng 60-70%, chất liệu còn lại 30-40%</p>
            </div>
            <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px; border-left: 3px solid #4CAF50;">
              <strong style="color: #4CAF50;">🎨 Chú ý đến màu sắc:</strong>
              <p style="margin: 0.5rem 0 0 0; font-size: 0.95rem; opacity: 0.9;">Chọn các chất liệu có tông màu hài hòa với nhau</p>
            </div>
            <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px; border-left: 3px solid #4CAF50;">
              <strong style="color: #4CAF50;">🔧 Xem xét công năng:</strong>
              <p style="margin: 0.5rem 0 0 0; font-size: 0.95rem; opacity: 0.9;">Đảm bảo chất liệu phù hợp với mục đích sử dụng của không gian</p>
            </div>
          </div>
        </div>

        <div class="conclusion" style="background: #f8f9fa; padding: 2rem; border-radius: 12px; border-left: 4px solid #1b3025; margin-top: 2rem;">
          <p style="font-size: 1.1rem; line-height: 1.7; color: #2c3e50; margin: 0; font-weight: 500;">
            Việc phối hợp chất liệu đúng cách sẽ giúp không gian của bạn trở nên <strong style="color: #1b3025;">độc đáo, có chiều sâu</strong> và thể hiện được phong cách sống của gia chủ. 
            <span style="color: #1b3025; font-weight: 600;">Hãy để PG Design đồng hành cùng bạn trong việc tạo nên không gian sống hoàn hảo!</span>
          </p>
        </div>

        <div class="cta-section" style="text-align: center; margin-top: 3rem; padding: 2rem; background: linear-gradient(135deg, #e9ecef 0%, #f8f9fa 100%); border-radius: 12px;">
          <h4 style="color: #1b3025; font-size: 1.2rem; margin-bottom: 1rem;">Bạn có muốn tạo không gian sống hoàn hảo?</h4>
          <p style="color: #495057; margin-bottom: 1.5rem;">Liên hệ ngay với PG Design để được tư vấn thiết kế nội thất chuyên nghiệp</p>
          <a href="https://pgdesign.vn/" target="_blank" style="display: inline-block; background: linear-gradient(45deg, #1b3025, #2d5a4a); color: white; padding: 1rem 2rem; text-decoration: none; border-radius: 8px; font-weight: 600; transition: all 0.3s ease; box-shadow: 0 4px 12px rgba(27, 48, 37, 0.3);">
            🏠 Tư vấn thiết kế miễn phí
          </a>
        </div>
      </div>
    `
  },
  "4-tips-tao-diem-nhan-bep-sang-trong": {
    id: "2",
    title: "4 Tips Tạo Điểm Nhấn Cho Bếp Sang Trọng & Tiện Nghi",
    excerpt: "Phòng bếp không chỉ là nơi nấu nướng mà còn là trung tâm của gia đình. Khám phá 4 bí quyết quan trọng để tạo điểm nhấn cho phòng bếp vừa sang trọng vừa tiện dụng cho cuộc sống hàng ngày.",
    thumbnail: "/src/assets/images/diary-image-2.jpg",
    viewCount: 1893,
    hashtags: ["phòng bếp", "sang trọng", "tiện nghi", "tips"],
    publishDate: "2024-01-18",
    slug: "4-tips-tao-diem-nhan-bep-sang-trong",
    author: "PG Design Team",
    readTime: "6 phút",
    category: "Thiết kế bếp",
    htmlContent: `
      <div class="blog-content">
        <p>Phòng bếp hiện đại không chỉ đơn thuần là nơi nấu nướng mà còn là trung tâm của gia đình, nơi mọi người quây quần bên nhau. Để tạo nên một phòng bếp vừa sang trọng vừa tiện dụng, cần có sự kết hợp hài hòa giữa thẩm mỹ và công năng.</p>

        <h3>1. Sử dụng đá ốp bếp cao cấp</h3>
        <p>Đá ốp bếp không chỉ tạo vẻ đẹp thẩm mỹ mà còn đảm bảo độ bền và dễ vệ sinh. Chọn đá có hoa văn tự nhiên, màu sắc hài hòa với tổng thể không gian.</p>

        <h3>2. Thiết kế tủ bếp thông minh</h3>
        <p>Tủ bếp với hệ thống mở đóng thông minh, ngăn kéo có hãm nhẹ và các phụ kiện tiện dụng sẽ giúp việc nấu nướng trở nên dễ dàng hơn.</p>

        <h3>3. Ánh sáng đa tầng</h3>
        <p>Kết hợp ánh sáng chung với ánh sáng cục bộ cho khu vực nấu nướng và rửa bát, tạo không gian ấm cúng và tiện dụng.</p>

        <h3>4. Màu sắc hài hòa</h3>
        <p>Chọn bảng màu 2-3 tông màu chính, tránh sử dụng quá nhiều màu sắc khác nhau trong cùng một không gian.</p>
      </div>
    `
  }
  // Add more blog details as needed
};

// Function to fetch blog detail data
export const fetchBlogDetailData = async (slug: string): Promise<BlogDetailData> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const blogDetail = mockBlogDetails[slug];
  
  if (!blogDetail) {
    throw new Error('Blog not found');
  }

  return blogDetail;
};

// Function to get current data source (for development)
export const getCurrentDataSource = (): string => {
  return 'Mock Data';
}; 