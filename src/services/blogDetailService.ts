// src/services/blogDetailService.ts

import { BlogDetailData, BlogDetailServiceResponse } from '../types/blogDetailTypes';

// Mock data for blog details - replace with actual API calls
const mockBlogDetails: { [key: string]: BlogDetailData } = {
  "4-tips-tao-diem-nhan-bep-sang-trong": {
    id: "2",
    title: "4 Tips Tạo Điểm Nhấn Cho Bếp Sang Trọng & Tiện Nghi",
    subtitle: "Khám phá bí quyết thiết kế bếp hiện đại với những điểm nhấn độc đáo",
    excerpt: "Bếp không chỉ là nơi nấu nướng mà còn là trái tim của ngôi nhà. Khám phá 4 tips thiết kế bếp sang trọng và tiện nghi giúp không gian bếp trở nên ấn tượng và hiệu quả hơn.",
    thumbnail: "/assets/blog/4-tips-tao-diem-nhan-bep-sang-trong/Picture1.png",
    viewCount: 3421,
    hashtags: ["thiết kế bếp", "nội thất", "sang trọng", "tiện nghi", "điểm nhấn"],
    publishDate: "2024-01-25",
    slug: "4-tips-tao-diem-nhan-bep-sang-trong",
    author: "PG Design Team",
    readTime: "10 phút",
    category: "Thiết kế bếp",
    htmlContent: `
      <div class="blog-content">
        <div class="blog-intro" style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 2rem; border-radius: 12px; margin-bottom: 2rem; border-left: 4px solid #1b3025;">
          <p style="font-size: 1.1rem; line-height: 1.8; color: #2c3e50; margin: 0; font-weight: 500;">
            Bếp không chỉ là nơi nấu nướng mà còn là <strong style="color: #1b3025;">trái tim của ngôi nhà</strong>, nơi gia đình quây quần và tạo nên những kỷ niệm đẹp. Một không gian bếp được thiết kế tốt sẽ mang lại cảm giác sang trọng, tiện nghi và ấm cúng cho gia đình bạn.
          </p>
        </div>
        
        <p style="font-size: 1.05rem; line-height: 1.7; color: #495057; margin-bottom: 2rem;">
          Dưới đây là <span style="color: #1b3025; font-weight: 600;">4 tips thiết kế bếp</span> độc đáo mà PG Design muốn chia sẻ để giúp không gian bếp của bạn trở nên ấn tượng và hiệu quả hơn:
        </p>

        <div class="kitchen-tip" style="margin-bottom: 3rem;">
          <h3 style="color: #1b3025; font-size: 1.4rem; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid #e9ecef;">
            <span style="background: linear-gradient(45deg, #1b3025, #2d5a4a); color: white; padding: 0.3rem 0.8rem; border-radius: 6px; margin-right: 0.5rem;">1</span>
            Đảo bếp - Điểm nhấn trung tâm
          </h3>
          <div style="display: flex; gap: 1.5rem; align-items: flex-start; margin-bottom: 1.5rem;">
            <img src="/assets/blog/4-tips-tao-diem-nhan-bep-sang-trong/Picture1.png" alt="Đảo bếp sang trọng" style="width: 250px; height: 180px; object-fit: cover; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />
            <div>
              <p style="font-size: 1rem; line-height: 1.6; color: #495057; margin-bottom: 1rem;">
                <strong style="color: #1b3025;">Đảo bếp</strong> không chỉ là nơi nấu nướng mà còn là điểm nhấn trung tâm của không gian bếp. Một đảo bếp được thiết kế tốt sẽ tạo nên không gian mở, kết nối giữa bếp và phòng ăn một cách tự nhiên.
              </p>
              <p style="font-size: 1rem; line-height: 1.6; color: #495057; margin-bottom: 1rem;">
                <strong style="color: #1b3025;">Lợi ích của đảo bếp:</strong>
              </p>
              <ul style="color: #495057; margin-left: 1.5rem;">
                <li>Tăng diện tích làm việc và lưu trữ</li>
                <li>Tạo không gian giao tiếp khi nấu nướng</li>
                <li>Làm điểm nhấn thẩm mỹ cho không gian bếp</li>
                <li>Phù hợp cho các bữa tiệc nhỏ tại nhà</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="kitchen-tip" style="margin-bottom: 3rem;">
          <h3 style="color: #1b3025; font-size: 1.4rem; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid #e9ecef;">
            <span style="background: linear-gradient(45deg, #1b3025, #2d5a4a); color: white; padding: 0.3rem 0.8rem; border-radius: 6px; margin-right: 0.5rem;">2</span>
            Ánh sáng thông minh - Tạo không gian ấm cúng
          </h3>
          <div style="display: flex; gap: 1.5rem; align-items: flex-start; margin-bottom: 1.5rem;">
            <img src="/assets/blog/4-tips-tao-diem-nhan-bep-sang-trong/Picture2.png" alt="Ánh sáng bếp thông minh" style="width: 250px; height: 180px; object-fit: cover; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />
            <div>
              <p style="font-size: 1rem; line-height: 1.6; color: #495057; margin-bottom: 1rem;">
                <strong style="color: #1b3025;">Ánh sáng</strong> đóng vai trò quan trọng trong việc tạo không gian bếp sang trọng và ấm cúng. Hệ thống ánh sáng thông minh sẽ giúp không gian bếp trở nên linh hoạt và đa chức năng.
              </p>
              <p style="font-size: 1rem; line-height: 1.6; color: #495057; margin-bottom: 1rem;">
                <strong style="color: #1b3025;">Các loại ánh sáng cần thiết:</strong>
              </p>
              <ul style="color: #495057; margin-left: 1.5rem;">
                <li>Ánh sáng tổng thể cho không gian chung</li>
                <li>Đèn dưới tủ bếp cho khu vực làm việc</li>
                <li>Đèn trang trí cho đảo bếp và quầy bar</li>
                <li>Ánh sáng cảm ứng cho tủ lưu trữ</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="kitchen-tip" style="margin-bottom: 3rem;">
          <h3 style="color: #1b3025; font-size: 1.4rem; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid #e9ecef;">
            <span style="background: linear-gradient(45deg, #1b3025, #2d5a4a); color: white; padding: 0.3rem 0.8rem; border-radius: 6px; margin-right: 0.5rem;">3</span>
            Tủ bếp thông minh - Tối ưu không gian lưu trữ
          </h3>
          <div style="display: flex; gap: 1.5rem; align-items: flex-start; margin-bottom: 1.5rem;">
            <img src="/assets/blog/4-tips-tao-diem-nhan-bep-sang-trong/Picture3.png" alt="Tủ bếp thông minh" style="width: 250px; height: 180px; object-fit: cover; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />
            <div>
              <p style="font-size: 1rem; line-height: 1.6; color: #495057; margin-bottom: 1rem;">
                <strong style="color: #1b3025;">Tủ bếp thông minh</strong> là giải pháp tối ưu cho việc lưu trữ và sắp xếp đồ dùng bếp một cách khoa học. Những thiết kế thông minh sẽ giúp tận dụng tối đa không gian và tạo sự tiện nghi.
              </p>
              <p style="font-size: 1rem; line-height: 1.6; color: #495057; margin-bottom: 1rem;">
                <strong style="color: #1b3025;">Các tính năng thông minh:</strong>
              </p>
              <ul style="color: #495057; margin-left: 1.5rem;">
                <li>Ngăn kéo có hệ thống đẩy nhẹ</li>
                <li>Kệ xoay cho góc tủ</li>
                <li>Hộc tủ đa năng cho đồ gia dụng</li>
                <li>Hệ thống treo dao và dụng cụ</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="kitchen-tip" style="margin-bottom: 3rem;">
          <h3 style="color: #1b3025; font-size: 1.4rem; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid #e9ecef;">
            <span style="background: linear-gradient(45deg, #1b3025, #2d5a4a); color: white; padding: 0.3rem 0.8rem; border-radius: 6px; margin-right: 0.5rem;">4</span>
            Chất liệu cao cấp - Tạo điểm nhấn sang trọng
          </h3>
          <div style="display: flex; gap: 1.5rem; align-items: flex-start; margin-bottom: 1.5rem;">
            <img src="/assets/blog/4-tips-tao-diem-nhan-bep-sang-trong/Picture4.png" alt="Chất liệu cao cấp cho bếp" style="width: 250px; height: 180px; object-fit: cover; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />
            <div>
              <p style="font-size: 1rem; line-height: 1.6; color: #495057; margin-bottom: 1rem;">
                <strong style="color: #1b3025;">Chất liệu cao cấp</strong> không chỉ mang lại vẻ đẹp sang trọng mà còn đảm bảo độ bền và dễ bảo trì. Việc lựa chọn chất liệu phù hợp sẽ tạo nên điểm nhấn độc đáo cho không gian bếp.
              </p>
              <p style="font-size: 1rem; line-height: 1.6; color: #495057; margin-bottom: 1rem;">
                <strong style="color: #1b3025;">Các chất liệu được khuyến nghị:</strong>
              </p>
              <ul style="color: #495057; margin-left: 1.5rem;">
                <li>Mặt đá granite hoặc quartz cho mặt bàn</li>
                <li>Gỗ tự nhiên cho tủ bếp</li>
                <li>Kính cường lực cho vách ngăn</li>
                <li>Inox cao cấp cho thiết bị bếp</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="tips-section" style="background: linear-gradient(135deg, #1b3025 0%, #2d5a4a 100%); color: white; padding: 2rem; border-radius: 12px; margin: 3rem 0;">
          <h3 style="color: white; font-size: 1.4rem; margin-bottom: 1.5rem; text-align: center;">
            💡 Lời khuyên khi thiết kế bếp
          </h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
            <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px; border-left: 3px solid #4CAF50;">
              <strong style="color: #4CAF50;">🎯 Lập kế hoạch chi tiết:</strong>
              <p style="margin: 0.5rem 0 0 0; font-size: 0.95rem; opacity: 0.9;">Xác định rõ nhu cầu sử dụng và ngân sách trước khi thiết kế</p>
            </div>
            <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px; border-left: 3px solid #4CAF50;">
              <strong style="color: #4CAF50;">🔧 Chọn thiết bị phù hợp:</strong>
              <p style="margin: 0.5rem 0 0 0; font-size: 0.95rem; opacity: 0.9;">Lựa chọn thiết bị bếp chất lượng cao và tiết kiệm năng lượng</p>
            </div>
            <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px; border-left: 3px solid #4CAF50;">
              <strong style="color: #4CAF50;">🎨 Phối màu hài hòa:</strong>
              <p style="margin: 0.5rem 0 0 0; font-size: 0.95rem; opacity: 0.9;">Sử dụng bảng màu nhất quán và phù hợp với phong cách tổng thể</p>
            </div>
            <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px; border-left: 3px solid #4CAF50;">
              <strong style="color: #4CAF50;">💡 Ánh sáng đa tầng:</strong>
              <p style="margin: 0.5rem 0 0 0; font-size: 0.95rem; opacity: 0.9;">Kết hợp nhiều loại ánh sáng để tạo không gian linh hoạt</p>
            </div>
          </div>
        </div>

        <div class="conclusion" style="background: #f8f9fa; padding: 2rem; border-radius: 12px; border-left: 4px solid #1b3025; margin-top: 2rem;">
          <p style="font-size: 1.1rem; line-height: 1.7; color: #2c3e50; margin: 0; font-weight: 500;">
            Một không gian bếp được thiết kế tốt sẽ mang lại <strong style="color: #1b3025;">trải nghiệm nấu nướng tuyệt vời</strong> và tạo nên những khoảnh khắc đáng nhớ cho gia đình. 
            <span style="color: #1b3025; font-weight: 600;">Hãy để PG Design đồng hành cùng bạn trong việc tạo nên không gian bếp hoàn hảo!</span>
          </p>
        </div>

        <div class="cta-section" style="text-align: center; margin-top: 3rem; padding: 2rem; background: linear-gradient(135deg, #e9ecef 0%, #f8f9fa 100%); border-radius: 12px;">
          <h4 style="color: #1b3025; font-size: 1.2rem; margin-bottom: 1rem;">Bạn có muốn thiết kế bếp sang trọng và tiện nghi?</h4>
          <p style="color: #495057; margin-bottom: 1.5rem;">Liên hệ ngay với PG Design để được tư vấn thiết kế bếp chuyên nghiệp</p>
          <a href="https://pgdesign.vn/" target="_blank" style="display: inline-block; background: linear-gradient(45deg, #1b3025, #2d5a4a); color: white; padding: 1rem 2rem; text-decoration: none; border-radius: 8px; font-weight: 600; transition: all 0.3s ease; box-shadow: 0 4px 12px rgba(27, 48, 37, 0.3);">
            🏠 Tư vấn thiết kế bếp miễn phí
          </a>
        </div>
      </div>
    `
  },
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