// src/services/blogDetailService.ts

import { BlogDetailData } from '../types/blogDetailTypes';

// Mapping from URL-friendly slugs to actual folder names
const blogFolderMapping: { [key: string]: string } = {
  "12-xu-huong-thiet-ke-khong-gian-xanh": "12 xu hướng",
  "21-mau-ke-tivi-duoi-gam-cau-thang": "21+ mẫu",
  "4-tips-tao-diem-nhan-bep-sang-trong": "4-tips-tao-diem-nhan-bep-sang-trong",
  "6-tip-ve-sinh-ban-an-go-don-gian": "6+ tip",
  "4-phong-cach-tu-quan-ao-dep": "bí mật",
  "nha-dep-mix-chat-lieu-dung-cach": "nhà đẹp",
  "cach-phoi-mau-noi-that-dep-sang-trong": "phối màu",
  "top-7-vat-lieu-op-tuong-gia-chu-can-biet": "top 7"
};

// Mock data for blog details - corresponds to public/assets/blog folders
const mockBlogDetails: { [key: string]: BlogDetailData } = {
  "12-xu-huong-thiet-ke-khong-gian-xanh": {
    id: "1",
    title: "12 Xu Hướng Thiết Kế Không Gian Xanh Cho Ngôi Nhà Của Bạn",
    subtitle: "Khám phá những xu hướng thiết kế xanh hiện đại và bền vững",
    excerpt: "Thiết kế không gian xanh không chỉ mang lại vẻ đẹp tự nhiên mà còn góp phần bảo vệ môi trường. Khám phá 12 xu hướng thiết kế xanh đang được ưa chuộng hiện nay.",
    thumbnail: "/assets/blog/12 xu hướng/Picture1.png",
    viewCount: 5678,
    hashtags: ["thiết kế xanh", "không gian xanh", "bền vững", "xu hướng", "môi trường"],
    publishDate: "2024-02-15",
    slug: "12-xu-huong-thiet-ke-khong-gian-xanh",
    author: "PG Design Team",
    readTime: "15 phút",
    category: "Thiết kế xanh",
    htmlContent: `<h3 class="ql-align-justify">
    <strong>Khám phá 12 xu hướng thiết kế không gian xanh cho ngôi nhà, từ giếng trời, cây cảnh trong nhà đến vườn rau tự cung tự cấp, giúp ngôi nhà của bạn trở nên trong lành và tươi mát.</strong>
    </h3>
    <p>
    <strong>12 Xu Hướng Thiết Kế Không Gian Xanh Cho Ngôi Nhà Của Bạn</strong>
    </p>
    <p class="ql-align-justify">Thiết kế không gian xanh đang trở thành xu hướng mạnh mẽ, mang lại sự tươi mát, thư giãn cho ngôi nhà giữa đô thị nhộn nhịp. Việc tích hợp cây xanh vào không gian nội thất không chỉ mang lại vẻ đẹp thiên nhiên mà còn giúp cải thiện sức khỏe và tâm trạng. Với <strong>12 xu hướng thiết kế không gian xanh</strong> mà PG Design đã gợi ý đến bạn, hy vọng bạn sẽ có thêm nhiều thông tin để biến căn nhà thành một nơi đáng sống giúp bạn có một không gian sống đầy thiên nhiên!</p>
    <p class="ql-align-justify">
    <strong>
    <img src="//:0">
    </strong>
    </p>
    <h1 class="ql-align-justify">
    <strong>Thiết Kế Không Gian Xanh Cho Nhà</strong>
    </h1>
    <p class="ql-align-justify">Thiết kế không gian xanh cho nhà là xu hướng hiện đại giúp con người gần gũi với thiên nhiên hơn trong cuộc sống hàng ngày. Với việc bố trí cây xanh, sử dụng vật liệu tự nhiên và tạo các khu vực thư giãn trong nhà, không gian sống trở nên trong lành, hài hòa và thoải mái. Các thiết kế không gian xanh không chỉ mang lại tính thẩm mỹ cao mà còn giúp cải thiện sức khỏe, tinh thần, đồng thời góp phần bảo vệ môi trường.</p>
    <p class="ql-align-justify">Bạn có thể tham khảo thêm các xu hướng và dự án cụ thể để bắt đầu xây dựng không gian xanh cho ngôi nhà của mình.</p>
    <h1 class="ql-align-justify">
    <strong>12 xu hướng thiết kế không gian xanh cho ngôi nhà của bạn</strong>
    </h1>
    <p class="ql-align-justify">
    <span style="color: rgb(10, 10, 10);">Cùng Lovina điểm danh 12 xu hướng thiết kế không gian xanh đang được yêu thích nhất năm 2024 này nhé!</span>
    </p>
    <h2 class="ql-align-justify">
    <strong>1. Tận Dụng Giếng Trời</strong>
    </h2>
    <p class="ql-align-justify">Giếng trời là giải pháp tuyệt vời để lấy ánh sáng tự nhiên và tạo điều kiện cho cây xanh phát triển bên trong nhà. Bạn có thể tận dụng khu vực giếng trời để bố trí cây lớn hoặc làm vườn nhỏ, giúp không gian trở nên thoáng đãng và mát mẻ. <strong>
    <em>Tham khảo các thiết kế giếng trời kết hợp cây xanh ở đây.</em>
    </strong>
    </p>
    <p class="ql-align-justify">
    <strong>
    <em>
    <img src="//:0">
    </em>
    </strong>
    </p>
    <p class="ql-align-center">
    <em>Giếng trời không gian xanh cực chill và thoáng đãng trong ngôi nhà của bạn</em>
    </p>
    <h2 class="ql-align-justify">
    <strong>2. Thêm Bình Cây Ở Các Góc Trong Nhà</strong>
    </h2>
    <p class="ql-align-justify">
    <span style="color: rgb(10, 10, 10);">Với diện tích khá khiêm tốn, chủ những căn nhà phố có thể cân nhắc đặt tiểu cảnh, cây xanh dưới gầm hoặc bên cạnh cầu thang, trên bàn khách hoặc trong phòng ngủ.</span>
    </p>
    <p class="ql-align-justify">
    <strong style="color: rgb(10, 10, 10);">
    <img src="//:0">
    </strong>
    </p>
    <p class="ql-align-center">
    <em>Thêm các bình cây nhỏ nhỏ xinh xinh cho không gian xanh của bạn</em>
    </p>
    <p class="ql-align-justify">Những góc trống trong nhà thường bị bỏ qua, nhưng nếu bạn bố trí thêm bình cây xanh sẽ tạo nên không gian sống hài hòa hơn. Các loại cây cảnh như cây kim tiền, cây phát tài sẽ mang lại không khí trong lành và thẩm mỹ cho ngôi nhà.</p>
    <h2 class="ql-align-justify">
    <strong>3. Tiểu Cảnh Ở Ban Công</strong>
    </h2>
    <p class="ql-align-justify">Thiết kế tiểu cảnh tại ban công là cách hiệu quả để biến không gian nhỏ này thành một khu vườn mini xanh mát. Bạn có thể trồng cây leo, hoa hoặc tạo một tiểu cảnh nhỏ với đá và nước, giúp ban công trở thành nơi thư giãn lý tưởng.</p>
    <p class="ql-align-justify">
    <strong>
    <img src="//:0">
    </strong>
    </p>
    <p class="ql-align-center">
    <em>Sử dụng tiểu cảnh ban công ngôi nhà thêm xanh mát và nơi để chữa lành tâm hồn</em>
    </p>
    <h2 class="ql-align-justify">
    <strong>4. Vườn Rau Tự Cung Tự Cấp</strong>
    </h2>
    <p class="ql-align-justify">
    <span style="color: rgb(10, 10, 10);">Không chỉ là cây xanh trang trí, nhiều gia đình hiện nay thích trồng rau sạch ngay trong nhà.</span>
    </p>
    <p class="ql-align-justify">
    <strong style="color: rgb(10, 10, 10);">
    <img src="//:0">
    </strong>
    </p>
    <p class="ql-align-center">
    <em>Vườn rau trên sân thượng vừa để trang trí vừa để phục vụ bữa ăn cho gia đình mình.</em>
    </p>
    <p class="ql-align-justify">Một khu vườn rau tự cung tự cấp ngay trong nhà là xu hướng được nhiều gia đình lựa chọn, vừa tạo không gian xanh vừa cung cấp thực phẩm sạch. Hệ thống thủy canh hoặc chậu trồng rau nhỏ là những giải pháp hiệu quả cho không gian hẹp. Tìm hiểu thêm về sản phẩm trồng rau tại nhà tại đây.</p>
    <p class="ql-align-justify">&nbsp;</p>
    <h2 class="ql-align-justify">
    <strong>5. Sử Dụng Vật Liệu Tự Nhiên</strong>
    </h2>
    <p class="ql-align-justify">Việc kết hợp vật liệu tự nhiên như gỗ, đá, tre vào không gian sống không chỉ mang lại cảm giác gần gũi mà còn giúp tối ưu thiết kế xanh. Sử dụng nội thất từ gỗ tự nhiên hay gạch lát nền có họa tiết thiên nhiên là những lựa chọn phổ biến.</p>
    <p class="ql-align-justify">
    <strong>
    <img src="//:0">
    </strong>
    </p>
    <p class="ql-align-center">
    <em>Sử dụng vật liệu tự nhiên căn nhà thêm sức sống</em>
    </p>
    <h2 class="ql-align-justify">
    <strong>6. Góc Thư Giãn Bên Cửa Sổ</strong>
    </h2>
    <p class="ql-align-justify">
    <span style="color: rgb(10, 10, 10);">Tận dụng không gian gần cửa sổ để đặt các chậu cây nhỏ hoặc làm vườn thảo mộc mini.</span> Một góc thư giãn bên cửa sổ với một chiếc ghế nhỏ, đệm êm và vài chậu cây sẽ mang lại không gian thoải mái cho bạn đọc sách, nghỉ ngơi. Cửa sổ lớn kết hợp với cây xanh sẽ giúp không gian ngập tràn ánh sáng và thiên nhiên.</p>
    <p class="ql-align-justify">
    <strong>
    <img src="//:0">
    </strong>
    </p>
    <p class="ql-align-center">
    <em style="color: rgb(10, 10, 10);">Thêm góc thư giãn bên cửa sổ cho thêm không gian xanh cho căn nhà</em>
    </p>
    <h2 class="ql-align-justify">
    <strong>7. Vườn Treo Trong Nhà</strong>
    </h2>
    <p class="ql-align-justify">Vườn treo là một giải pháp tiết kiệm không gian nhưng vẫn mang lại cảm giác xanh mát cho ngôi nhà. Bạn có thể thiết kế vườn treo bằng cách sử dụng các loại chậu treo hoặc hệ thống giàn leo cho cây cảnh, tạo ra một bức tranh thiên nhiên độc đáo ngay trong phòng khách.</p>
    <p class="ql-align-justify">
    <strong>
    <img src="//:0">
    </strong>
    </p>
    <p class="ql-align-center">
    <em>Trang trí vườn treo sinh động, tận dụng trang trí căn nhà thêm xinh</em>
    </p>
    <h2 class="ql-align-justify">
    <strong>8. Cây Xanh Trong Phòng Tắm</strong>
    </h2>
    <p class="ql-align-justify">Cây xanh trong phòng tắm không chỉ tạo cảm giác tươi mới mà còn giúp điều hòa độ ẩm trong phòng. Các loại cây như cây dây nhện, cây lưỡi hổ hoặc cây bạc hà có khả năng phát triển tốt trong môi trường ẩm ướt. Bạn có thể bố trí một vài chậu cây nhỏ để không gian phòng tắm trở nên gần gũi với thiên nhiên hơn.</p>
    <p class="ql-align-justify">
    <strong>
    <img src="//:0">
    </strong>
    </p>
    <p class="ql-align-center">
    <em>Thêm ít cây xanh tăng thêm sự thư giãn</em>
    </p>
    <h2 class="ql-align-justify">
    <strong>9. Tường Cây Xanh</strong>
    </h2>
    <p class="ql-align-justify">Tường cây xanh (green wall) là giải pháp mới trong thiết kế nội thất xanh. Bức tường cây không chỉ là một điểm nhấn độc đáo mà còn giúp làm sạch không khí và tăng cường độ ẩm cho không gian sống. Bạn có thể tạo ra tường cây xanh trong phòng khách, phòng ăn hoặc phòng ngủ.</p>
    <p class="ql-align-justify">
    <strong>
    <img src="//:0">
    </strong>
    </p>
    <h2 class="ql-align-justify">
    <strong>10. Khu Vườn Mini Trong Nhà</strong>
    </h2>
    <p class="ql-align-justify">Nếu bạn có không gian hạn chế, một khu vườn mini trong nhà sẽ là giải pháp tuyệt vời. Chỉ cần một góc nhỏ trong nhà, bạn có thể tạo ra một không gian xanh mát với cây cảnh nhỏ, đá và nước. Khu vườn này sẽ là nơi lý tưởng để bạn thư giãn sau một ngày làm việc mệt mỏi.</p>
    <p class="ql-align-justify">
    <strong>
    <img src="//:0">
    </strong>
    </p>
    <h2 class="ql-align-justify">
    <strong>12. Cửa Sổ Kính Lớn Kết Hợp Cây Xanh</strong>
    </h2>
    <p class="ql-align-justify">Cửa sổ kính lớn giúp ngôi nhà nhận được ánh sáng tự nhiên dồi dào và tạo sự thông thoáng. Kết hợp cửa sổ kính với các chậu cây xanh sẽ giúp bạn có cảm giác gần gũi với thiên nhiên ngay trong nhà. Bố trí cây xanh ở khu vực cửa sổ cũng giúp không gian trở nên trong lành và dễ chịu.</p>
    <p class="ql-align-justify">
    <strong>
    <img src="//:0">
    </strong>
    </p>
    <p class="ql-align-center">
    <em>Không gian lý tưởng để cây xanh phát triển tốt</em>
    </p>
    <h1 class="ql-align-justify">
    <strong>Lợi Ích Của Không Gian Xanh Trong Thiết Kế Nội Thất</strong>
    </h1>
    <p class="ql-align-justify">
    <span style="color: rgb(33, 37, 41);">Không gian xanh không chỉ mang lại giá trị thẩm mỹ mà còn có nhiều lợi ích khác:</span>
    </p>
    <p class="ql-align-justify">
    <span style="color: rgb(33, 37, 41);">●&nbsp;&nbsp;&nbsp;&nbsp;</span>
    <strong style="color: rgb(33, 37, 41);">Thanh Lọc Không Khí</strong>
    <span style="color: rgb(33, 37, 41);">: Cây xanh có khả năng loại bỏ các chất độc hại, giúp không khí trong lành hơn.</span>
    </p>
    <p class="ql-align-justify">
    <span style="color: rgb(33, 37, 41);">●&nbsp;&nbsp;&nbsp;&nbsp;</span>
    <strong style="color: rgb(33, 37, 41);">Giảm Căng Thẳng</strong>
    <span style="color: rgb(33, 37, 41);">: Tiếp xúc với thiên nhiên làm giảm căng thẳng và cải thiện tâm trạng.</span>
    </p>
    <p class="ql-align-justify">
    <span style="color: rgb(33, 37, 41);">●&nbsp;&nbsp;&nbsp;&nbsp;</span>
    <strong style="color: rgb(33, 37, 41);">Cải Thiện Sức Khỏe</strong>
    <span style="color: rgb(33, 37, 41);">: Không gian sống xanh giúp cải thiện giấc ngủ, giảm triệu chứng dị ứng và tăng cường sức khỏe tổng thể.</span>
    </p>
    <p class="ql-align-justify">
    <span style="color: rgb(33, 37, 41);">●&nbsp;&nbsp;&nbsp;&nbsp;</span>
    <strong style="color: rgb(33, 37, 41);">Tiết Kiệm Năng Lượng</strong>
    <span style="color: rgb(33, 37, 41);">: Bằng cách sử dụng cây xanh để che nắng, bạn có thể giảm lượng nhiệt và tiết kiệm năng lượng cho điều hòa không khí.</span>
    </p>
    <p class="ql-align-justify">
    <strong>Với 12 xu hướng</strong> này bạn có thể biến ngôi nhà của mình thành nơi sống lý tưởng, xanh mát và gần gũi với thiên nhiên.</p>
    <p class="ql-align-justify">&nbsp;</p>
    <h1>
    <br>
    </h1>`
  },
  "21-mau-ke-tivi-duoi-gam-cau-thang": {
    id: "2",
    title: "21+ Mẫu Kệ Tivi Dưới Gầm Cầu Thang Đẹp Sang Trọng, Tinh Tế - Giá Phải Chăng",
    subtitle: "Tận dụng không gian gầm cầu thang với những thiết kế kệ tivi độc đáo",
    excerpt: "Gầm cầu thang thường là không gian bị lãng quên, nhưng với thiết kế thông minh, nó có thể trở thành điểm nhấn ấn tượng cho ngôi nhà của bạn.",
    thumbnail: "/assets/blog/21+ mẫu/Picture1.png",
    viewCount: 4321,
    hashtags: ["kệ tivi", "gầm cầu thang", "thiết kế nội thất", "tiết kiệm không gian", "sang trọng"],
    publishDate: "2024-02-10",
    slug: "21-mau-ke-tivi-duoi-gam-cau-thang",
    author: "PG Design Team",
    readTime: "12 phút",
    category: "Thiết kế nội thất",
    htmlContent: `<!-- Content from public/assets/blog/21+ mẫu/raw.html -->`
  },
  "4-tips-tao-diem-nhan-bep-sang-trong": {
    id: "3",
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
    htmlContent: `<h1 class="ql-align-justify">
    <strong>4 Tips Tạo Điểm Nhấn Cho Bếp Sang Trọng &amp; Tiện Nghi</strong>
    </h1>
    <p class="ql-align-justify">
    <strong>Phòng bếp</strong> không chỉ là nơi nấu nướng, mà còn là <strong>trái tim của ngôi nhà</strong>, nơi giữ lửa yêu thương và vun đắp hạnh phúc mỗi ngày. Một căn bếp được thiết kế tinh tế, sang trọng và tiện nghi sẽ không chỉ tạo cảm hứng cho người nội trợ mà còn là không gian gắn kết cả gia đình.</p>
    <p class="ql-align-justify">Vậy làm sao để <strong>biến phòng bếp thành điểm nhấn đắt giá</strong> trong ngôi nhà của bạn? Dưới đây là PG Design sẽ đưa ra 4 <strong>tips thiết kế bếp sang trọng và tiện nghi</strong> mà bạn không nên bỏ qua.</p>
    <h2 class="ql-align-justify">
    <strong>1. Sử dụng ánh sáng thông minh</strong>
    </h2>
    <p class="ql-align-justify">Ánh sáng là yếu tố quyết định sự ấm cúng và chiều sâu của không gian. Hãy tận dụng <strong>ánh sáng tự nhiên</strong> từ cửa sổ, giếng trời kết hợp với <strong>đèn thả trần nghệ thuật</strong>, <strong>đèn LED âm tủ</strong>, hay <strong>đèn hắt trần</strong> để tạo hiệu ứng thị giác cuốn hút.</p>
    <p class="ql-align-justify">Bố trí ánh sáng hợp lý không chỉ giúp căn bếp luôn sáng sủa, mà còn nâng tầm tính thẩm mỹ và mang lại cảm giác dễ chịu cho người sử dụng.</p>
    <p class="ql-align-justify">🔗 <em>Khám phá thêm giải pháp thiết kế chiếu sáng và không gian bếp tại</em>
    <a href="https://pgdesign.vn/" rel="noopener noreferrer" target="_blank" style="color: windowtext;"> </a>
    <a href="https://pgdesign.vn/" rel="noopener noreferrer" target="_blank" style="color: rgb(17, 85, 204);">PG Design – Đơn vị thiết kế nội thất uy tín</a>
    </p>
    <h2 class="ql-align-justify">
    <strong>2. Ưu tiên vật liệu bề mặt cao cấp</strong>
    </h2>
    <p class="ql-align-justify">Lựa chọn vật liệu hoàn thiện là chìa khóa tạo nên vẻ ngoài đẳng cấp cho phòng bếp. Các chất liệu như:</p>
    <p>●&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Đá tự nhiên hoặc đá nhân tạo cao cấp</strong>
    </p>
    <p>●&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Gỗ công nghiệp phủ acrylic bóng gương</strong>
    </p>
    <p>●&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Kính cường lực ốp tường bếp</strong>
    </p>
    <p class="ql-align-justify">… đều có khả năng <strong>chống bám bẩn, dễ vệ sinh</strong> và mang lại diện mạo hiện đại, sang trọng. Mặt bếp sáng bóng hay tường bếp phản chiếu ánh sáng sẽ là điểm nhấn thị giác ấn tượng.</p>
    <p class="ql-align-justify">&gt;&gt;&gt;&gt;<em>Tham khảo thêm các mẫu bếp sang trọng được thiết kế theo yêu cầu tại</em>
    <a href="https://pgdesign.vn/" rel="noopener noreferrer" target="_blank" style="color: windowtext;"> </a>
    <a href="https://pgdesign.vn/" rel="noopener noreferrer" target="_blank" style="color: rgb(17, 85, 204);">https://pgdesign.vn/</a>
    </p>
    <h2 class="ql-align-justify">
    <strong>3. Thêm đảo bếp hoặc quầy bar mini</strong>
    </h2>
    <p class="ql-align-justify">Một <strong>đảo bếp hiện đại</strong> không chỉ giúp tăng diện tích thao tác, mà còn đóng vai trò là trung tâm thu hút ánh nhìn. Đây là yếu tố được ưa chuộng trong các thiết kế <strong>bếp mở</strong> kết nối với phòng khách.</p>
    <p class="ql-align-justify">Nếu diện tích hạn chế, bạn có thể thay thế bằng <strong>quầy bar mini</strong> kết hợp tủ rượu, kệ trang trí hoặc khu vực ăn nhanh – vừa tiết kiệm không gian vừa &gt;&gt;&gt;&gt;&gt;&gt;tăng tính tiện ích và cá tính.</p>
    <p class="ql-align-justify">
    <em>Xem thêm các công trình thực tế tại</em>
    <a href="https://pgdesign.vn/" rel="noopener noreferrer" target="_blank" style="color: windowtext;"> </a>
    <a href="https://pgdesign.vn/" rel="noopener noreferrer" target="_blank" style="color: rgb(17, 85, 204);">PG Design</a>
    </p>
    <h2 class="ql-align-justify">
    <strong>4. Tối ưu không gian lưu trữ thông minh</strong>
    </h2>
    <p class="ql-align-justify">Một căn bếp đẹp cần <strong>gọn gàng, dễ sử dụng</strong>. Hệ tủ bếp thông minh với:</p>
    <p>●&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Ngăn kéo chia ô tiện lợi</strong>
    </p>
    <p>●&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Ray trượt êm ái</strong>
    </p>
    <p>●&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Tủ góc xoay tận dụng không gian chết</strong>
    </p>
    <p class="ql-align-justify">… sẽ giúp bạn lưu trữ ngăn nắp, tiết kiệm diện tích và dễ dàng tìm kiếm vật dụng. Đây là bí quyết giúp căn bếp luôn <strong>gọn gàng và tiện nghi</strong> dù diện tích lớn hay nhỏ.</p>
    <p class="ql-align-justify">
    <em>Liên hệ PG Design để nhận tư vấn thiết kế tủ bếp và không gian lưu trữ thông minh:</em>
    <a href="https://pgdesign.vn/" rel="noopener noreferrer" target="_blank" style="color: windowtext;"> </a>
    <a href="https://pgdesign.vn/" rel="noopener noreferrer" target="_blank" style="color: rgb(17, 85, 204);">https://pgdesign.vn/</a>
    </p>
    <h2 class="ql-align-justify">
    <strong>Kết luận</strong>
    </h2>
    <p class="ql-align-justify">Với 4 tips đơn giản nhưng hiệu quả trên, bạn hoàn toàn có thể <strong>nâng tầm không gian bếp</strong> thành nơi vừa <strong>sang trọng</strong>, vừa <strong>tiện nghi</strong>, lại tràn đầy cảm hứng mỗi ngày. Một căn bếp đẹp không chỉ phục vụ nhu cầu nấu nướng, mà còn là không gian khơi nguồn yêu thương, kết nối các thành viên trong gia đình.</p>
    <p class="ql-align-justify">
    <strong>Bạn đang tìm kiếm ý tưởng thiết kế bếp đẹp, hiện đại và đậm dấu ấn cá nhân?</strong>
    </p>
    <p class="ql-align-justify">Đừng ngần ngại liên hệ với<a href="https://pgdesign.vn/" rel="noopener noreferrer" target="_blank" style="color: windowtext;"> </a>
    <a href="https://pgdesign.vn/" rel="noopener noreferrer" target="_blank" style="color: rgb(17, 85, 204);">PG Design – Giải pháp thiết kế thi công trọn gói cho tổ ấm của bạn</a>
    </p>
    <p class="ql-align-justify">
    <strong style="color: red;">Meta Description (Mô tả SEO):</strong>
    </p>
    <p class="ql-align-justify">
    <span style="color: red;">Khám phá 4 tips giúp không gian bếp trở nên sang trọng và tiện nghi hơn bao giờ hết: ánh sáng thông minh, vật liệu cao cấp, đảo bếp hiện đại, lưu trữ thông minh. Đừng bỏ lỡ!</span>
    </p>
    <p class="ql-align-justify">&nbsp;</p>
    <h1>
    <br>
    </h1>`
  },
  "6-tip-ve-sinh-ban-an-go-don-gian": {
    id: "4",
    title: "6+ Tip Vệ Sinh Bộ Bàn Ăn Gỗ Đơn Giản Ngay Tại Nhà",
    subtitle: "Hướng dẫn chi tiết cách bảo quản và vệ sinh bàn ăn gỗ hiệu quả",
    excerpt: "Bàn ăn gỗ là một trong những đồ nội thất quan trọng trong gia đình. Việc bảo quản và vệ sinh đúng cách sẽ giúp bàn ăn luôn đẹp và bền bỉ theo thời gian.",
    thumbnail: "/assets/blog/6+ tip/Picture1.png",
    viewCount: 2987,
    hashtags: ["vệ sinh", "bàn ăn gỗ", "bảo quản", "nội thất", "chăm sóc"],
    publishDate: "2024-01-30",
    slug: "6-tip-ve-sinh-ban-an-go-don-gian",
    author: "PG Design Team",
    readTime: "8 phút",
    category: "Bảo quản nội thất",
    htmlContent: `<!-- Content from public/assets/blog/6+ tip/raw.html -->`
  },
  "4-phong-cach-tu-quan-ao-dep": {
    id: "5",
    title: "Khám Phá Những Ý Tưởng Thiết Kế Nội Thất Độc Đáo",
    subtitle: "Tìm hiểu những xu hướng thiết kế mới nhất và cách áp dụng vào không gian sống",
    excerpt: "Thiết kế nội thất không ngừng phát triển với những ý tưởng mới mẻ và sáng tạo. Hãy cùng khám phá những xu hướng thiết kế đang được ưa chuộng hiện nay.",
    thumbnail: "/assets/blog/khám phá/Picture1.png",
    viewCount: 3892,
    hashtags: ["khám phá", "ý tưởng", "thiết kế", "xu hướng", "sáng tạo"],
    publishDate: "2024-02-05",
    slug: "4-phong-cach-tu-quan-ao-dep",
    author: "PG Design Team",
    readTime: "11 phút",
    category: "Xu hướng thiết kế",
    htmlContent: `<!-- Content from public/assets/blog/khám phá/raw.html -->`
  },
  "nha-dep-mix-chat-lieu-dung-cach": {
    id: "6",
    title: "Nhà Đẹp - Nghệ Thuật Tạo Không Gian Sống Hoàn Hảo",
    subtitle: "Bí quyết thiết kế ngôi nhà đẹp từ những chi tiết nhỏ nhất",
    excerpt: "Một ngôi nhà đẹp không chỉ phụ thuộc vào diện tích hay ngân sách mà còn là sự kết hợp hài hòa giữa thẩm mỹ và công năng sử dụng.",
    thumbnail: "/assets/blog/nhà đẹp/Picture1.png",
    viewCount: 4567,
    hashtags: ["nhà đẹp", "thiết kế", "không gian sống", "thẩm mỹ", "công năng"],
    publishDate: "2024-01-28",
    slug: "nha-dep-mix-chat-lieu-dung-cach",
    author: "PG Design Team",
    readTime: "13 phút",
    category: "Thiết kế nhà",
    htmlContent: `<h1 class="ql-align-justify">
    <strong>4 Công Thức Phối Vật Liệu Giúp Không Gian ‘Lên Đời’ Tức Thì</strong>
    </h1>
    <p class="ql-align-justify">(<em>Hoặc: Nhà Đẹp Là Do Mix Chất Liệu Đúng Cách – Bạn Đã Biết Chưa?</em>)</p>
    <p class="ql-align-justify">Trong thiết kế nội thất hiện đại, <strong>phối hợp vật liệu</strong> không đơn thuần chỉ là vấn đề thẩm mỹ, mà còn là <strong>nghệ thuật tạo chiều sâu và cá tính cho không gian</strong>. Một ngôi nhà đẹp không chỉ dựa vào màu sắc hay bố cục hợp lý, mà còn đến từ cách <strong>kết hợp vật liệu một cách tinh tế, sáng tạo</strong>.</p>
    <p class="ql-align-justify">Dưới đây là <strong>4 công thức phối vật liệu phổ biến và hiệu quả</strong>, giúp bạn "nâng tầm" không gian sống chỉ trong tích tắc.</p>
    <h2 class="ql-align-justify">
    <strong>1. Đá lát &amp; Gỗ – Mát lạnh gặp ấm áp</strong>
    </h2>
    <p class="ql-align-justify">
    <strong>Đá lát và gỗ</strong> là cặp đôi hoàn hảo giữa sự <strong>sang trọng, mát lạnh của đá</strong> và <strong>nét mộc mạc, gần gũi từ gỗ</strong>. Sự tương phản hài hòa này tạo nên điểm nhấn đắt giá cho không gian, đặc biệt tại những khu vực như <strong>phòng bếp</strong> hoặc <strong>phòng tắm</strong>, nơi đề cao cả <strong>tính bền vững lẫn tính thẩm mỹ</strong>.</p>
    <p class="ql-align-justify">👉 <em>Khám phá các mẫu thiết kế bếp – phòng tắm kết hợp đá &amp; gỗ tại</em>
    <a href="https://pgdesign.vn/" rel="noopener noreferrer" target="_blank" style="color: windowtext;"> </a>
    <a href="https://pgdesign.vn/" rel="noopener noreferrer" target="_blank" style="color: rgb(17, 85, 204);">PG Design – Đơn vị thiết kế nội thất uy tín</a>
    </p>
    <p class="ql-align-justify">
    <strong>
    <img src="//:0">
    </strong>
    </p>
    <h2 class="ql-align-justify">
    <strong>2. Đá &amp; Gỗ – Mộc mạc mà sang trọng</strong>
    </h2>
    <p class="ql-align-justify">Cũng vẫn là <strong>đá và gỗ</strong>, nhưng ở một phiên bản khác: <strong>đơn giản, tinh tế và đầy chiều sâu</strong>. Sự kết hợp này mang đến cảm giác thư giãn, dễ chịu – lý tưởng cho <strong>phòng khách</strong>, <strong>phòng đọc</strong> hay <strong>phòng giải trí</strong>. Bề mặt gỗ tự nhiên kết hợp với đá thô tạo nên không gian sống <strong>bền bỉ theo thời gian</strong>, vừa sang trọng vừa không cầu kỳ.</p>
    <p class="ql-align-justify">🎯 <em>Xem thêm các mẫu nội thất phòng khách ứng dụng phối chất liệu tại</em>
    <a href="https://pgdesign.vn/" rel="noopener noreferrer" target="_blank" style="color: windowtext;"> </a>
    <a href="https://pgdesign.vn/" rel="noopener noreferrer" target="_blank" style="color: rgb(17, 85, 204);">https://pgdesign.vn/</a>
    </p>
    <p class="ql-align-justify">
    <strong>&nbsp;</strong>
    </p>
    <p class="ql-align-justify">
    <strong>
    <img src="//:0">
    </strong>
    </p>
    <h2 class="ql-align-justify">
    <strong>3. Gỗ &amp; Gạch – Giao thoa giữa hoài niệm và hiện đại</strong>
    </h2>
    <p class="ql-align-justify">Vẻ <strong>thô mộc của gạch</strong> khi kết hợp cùng <strong>chất liệu gỗ tự nhiên</strong> tạo nên một bức tranh hài hòa giữa <strong>xưa và nay</strong>. Phối vật liệu này đặc biệt phù hợp với những không gian mang cá tính sáng tạo như <strong>phòng làm việc</strong>, <strong>phòng học</strong>, hoặc <strong>khu sinh hoạt chung</strong> – nơi đề cao cảm hứng, sự linh hoạt và nét độc bản trong từng chi tiết.</p>
    <p class="ql-align-justify">📌 <em>Bạn muốn thiết kế không gian làm việc cá tính? Đừng bỏ lỡ các giải pháp từ</em>
    <a href="https://pgdesign.vn/" rel="noopener noreferrer" target="_blank" style="color: windowtext;"> </a>
    <a href="https://pgdesign.vn/" rel="noopener noreferrer" target="_blank" style="color: rgb(17, 85, 204);">PG Design</a>
    </p>
    <p class="ql-align-justify">
    <strong>
    <img src="//:0">
    </strong>
    </p>
    <h2 class="ql-align-justify">
    <strong>4. Kim Loại &amp; Kính – Hơi thở của sự tối giản đương đại</strong>
    </h2>
    <p class="ql-align-justify">
    <strong>Kính trong suốt</strong> kết hợp với <strong>kim loại thanh mảnh</strong> là công thức hoàn hảo cho những ai yêu thích <strong>phong cách tối giản, hiện đại</strong>. Cặp đôi này không chỉ tạo cảm giác rộng rãi, gọn gàng mà còn dễ dàng ứng dụng vào nhiều không gian như <strong>phòng tắm, bếp, phòng thay đồ hoặc khu vực làm việc</strong>.</p>
    <p class="ql-align-justify">
    <em>Tìm hiểu thêm về phong cách thiết kế tối giản đương đại tại</em>
    <a href="https://pgdesign.vn/" rel="noopener noreferrer" target="_blank" style="color: windowtext;"> </a>
    <a href="https://pgdesign.vn/" rel="noopener noreferrer" target="_blank" style="color: rgb(17, 85, 204);">https://pgdesign.vn/</a>
    </p>
    <p class="ql-align-justify">
    <strong>&nbsp;</strong>
    </p>
    <p class="ql-align-justify">
    <strong>
    <img src="//:0">
    </strong>
    </p>
    <h2 class="ql-align-justify">
    <strong>Tổng kết</strong>
    </h2>
    <p class="ql-align-justify">
    <strong>Chất liệu là "ngôn ngữ" của không gian.</strong> Biết cách phối hợp vật liệu sẽ giúp bạn tạo ra những không gian không chỉ đẹp mắt mà còn mang tính cá nhân hóa, cảm xúc và chiều sâu.</p>
    <p class="ql-align-justify">Dù bạn yêu thích sự sang trọng, gần gũi hay hiện đại cá tính, 4 công thức phối vật liệu trên sẽ giúp bạn <strong>“mix &amp; match” đúng chuẩn</strong> để <strong>ngôi nhà trở nên cuốn hút ngay từ cái nhìn đầu tiên</strong>.</p>
    <p class="ql-align-justify">
    <em>Cần tư vấn thiết kế phối hợp vật liệu cho từng khu vực cụ thể?</em>
    </p>
    <p class="ql-align-justify">Hãy để<a href="https://pgdesign.vn/" rel="noopener noreferrer" target="_blank" style="color: windowtext;"> </a>
    <a href="https://pgdesign.vn/" rel="noopener noreferrer" target="_blank" style="color: rgb(17, 85, 204);">PG Design</a> đồng hành cùng bạn tạo nên không gian sống lý tưởng!</p>
    <h3 class="ql-align-justify">
    <strong style="color: black;">Meta Description (Mô tả SEO):</strong>
    </h3>
    <p class="ql-align-justify">Khám phá 4 công thức phối vật liệu giúp nâng tầm không gian sống: đá – gỗ, gạch – gỗ, kim loại – kính. Mỗi lựa chọn mang đến vẻ đẹp độc đáo, cá tính và tiện nghi cho ngôi nhà bạn.</p>
    <p class="ql-align-justify">&nbsp;</p>
    <h1>
    <br>
    </h1>`
  },
  "cach-phoi-mau-noi-that-dep-sang-trong": {
    id: "7",
    title: "Nghệ Thuật Phối Màu Trong Thiết Kế Nội Thất",
    subtitle: "Hướng dẫn chi tiết cách phối màu để tạo không gian hài hòa và ấn tượng",
    excerpt: "Màu sắc đóng vai trò quan trọng trong việc tạo nên không gian sống. Việc phối màu đúng cách sẽ mang lại cảm giác thoải mái và thẩm mỹ cao cho ngôi nhà.",
    thumbnail: "/assets/blog/phối màu/Picture1.png",
    viewCount: 3245,
    hashtags: ["phối màu", "màu sắc", "thiết kế", "hài hòa", "thẩm mỹ"],
    publishDate: "2024-02-01",
    slug: "cach-phoi-mau-noi-that-dep-sang-trong",
    author: "PG Design Team",
    readTime: "9 phút",
    category: "Phối màu",
    htmlContent: `<h3 class="ql-align-justify"><strong style="color: black;">PHỐI MÀU NỘI THẤT SAO CHO ĐẸP – SANG – NHÌN LÂU KHÔNG CHÁN?</strong></h3><p class="ql-align-justify">Màu sắc chính là "ngôn ngữ thầm lặng" tạo nên cảm xúc cho không gian sống. Một căn nhà đẹp không chỉ ở thiết kế mà còn ở <strong>cách phối màu tinh tế</strong>, mang lại sự hài hòa và dễ chịu cho thị giác – càng nhìn càng yêu!</p><p class="ql-align-justify">Dưới đây là 5 cách phối màu nội thất được các chuyên gia đánh giá cao về tính <strong>thẩm mỹ – bền vững – sang trọng</strong>:</p><h3 class="ql-align-justify"><strong style="color: black;">TIP PHỐI MÀU KHÔNG BAO GIỜ LỖI THỜI:</strong></h3><p class="ql-align-justify">Chọn <strong>2 màu chủ đạo + 1 màu nhấn</strong></p><p class="ql-align-justify">Ưu tiên tone <strong>ấm nhẹ, dễ chịu</strong> nếu bạn muốn không gian ở lâu vẫn thấy “dễ thở”</p><p class="ql-align-justify">Đừng ngại dùng màu trung tính – vì chúng chính là “nền” để màu sắc khác tỏa sáng</p><h2 class="ql-align-justify"><strong>Hình 1: Trắng – Be – Gỗ sáng: Nhẹ nhàng, tinh tế</strong></h2><p class="ql-align-justify">●&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Cảm giác:</strong> Thanh lịch, tối giản nhưng đầy ấm áp.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify">●&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Phong cách phù hợp:</strong> Japandi, Wabi-sabi, Scandinavian.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify">●&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Điểm cộng:</strong> Ánh sáng dễ lan tỏa, không gian trông rộng rãi và yên bình.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify">●&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Ứng dụng:</strong> Tường trắng – sofa be – sàn gỗ sáng. Tủ và bàn nên chọn màu vân gỗ tự nhiên.</p><p class="ql-align-justify"><br></p><h2 class="ql-align-justify"><strong>Hình 2: Ghi – Đen – Nâu gỗ: Nam tính, sang trọng</strong></h2><p class="ql-align-justify">●&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Cảm giác:</strong> Hiện đại, đẳng cấp và hơi hướng nghệ thuật.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify">●&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Phong cách phù hợp:</strong> Modern, Industrial, Luxury.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify">●&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Điểm cộng:</strong> Rất hợp cho không gian mở, chung cư cao cấp hoặc nhà phố tối giản.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify">●&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Ứng dụng:</strong> Sofa ghi – vách ốp đen nhám – điểm nhấn nâu gỗ. Có thể thêm ánh đèn vàng để làm mềm không gian.</p><h2 class="ql-align-justify"><strong>Hình 3:&nbsp;Xanh olive – Trắng – Gỗ nhạt: Mát mẻ, nhẹ nhàng</strong></h2><p class="ql-align-justify">●&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Cảm giác:</strong> Thân thiện với thiên nhiên, dễ chịu, dễ sống.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify">●&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Phong cách phù hợp:</strong> Địa Trung Hải, Farmhouse, Tropical.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify">●&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Điểm cộng:</strong> Gợi sự tươi mới mà không bị chói – giúp thư giãn hiệu quả.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify">●&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Ứng dụng:</strong> Sử dụng cho phòng khách, phòng ngủ hoặc bếp đều phù hợp. Nên kết hợp cây xanh nhỏ và ánh sáng tự nhiên.</p><p class="ql-align-justify"><br></p><h2 class="ql-align-justify"><strong>Hình 4: Kem – Nâu đất – Vàng cát: Ấm áp, sang trọng cổ điển</strong></h2><p class="ql-align-justify">●&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Cảm giác:</strong> Cân bằng giữa hiện đại và truyền thống.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify">●&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Phong cách phù hợp:</strong> Tân cổ điển, Indochine, Classic.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify">●&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Điểm cộng:</strong> Màu trung tính nhưng không nhạt nhòa, có chiều sâu và giá trị lâu dài.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify">●&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Ứng dụng:</strong> Tường kem – rèm nâu đất – đèn vàng ấm – nội thất màu cát nhẹ.</p><p class="ql-align-justify"><br></p><h2 class="ql-align-justify"><strong>Hình 5: Xanh navy – Xám – Trắng: Cá tính, nghệ thuật</strong></h2><p class="ql-align-justify">●&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Cảm giác:</strong> Đậm chất boutique, cá tính và ấn tượng.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify">●&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Phong cách phù hợp:</strong> Art Deco, Modern Classic.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify">●&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Điểm cộng:</strong> Tạo điểm nhấn mạnh mà vẫn dễ phối với các tone khác.</p><p class="ql-align-justify"><br></p><p class="ql-align-justify">●&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Ứng dụng:</strong> Một bức tường navy, sofa xám sáng, phụ kiện trắng – điểm xuyết kim loại vàng đồng cho hiệu ứng sang trọng.</p>`
  },
  "top-7-vat-lieu-op-tuong-gia-chu-can-biet": {
    id: "8",
    title: "Top 7 Xu Hướng Thiết Kế Nội Thất 2024",
    subtitle: "Những xu hướng thiết kế nổi bật nhất trong năm 2024",
    excerpt: "Năm 2024 mang đến nhiều xu hướng thiết kế mới mẻ và độc đáo. Hãy cùng khám phá top 7 xu hướng thiết kế nội thất đang được ưa chuộng nhất.",
    thumbnail: "/assets/blog/top 7/Picture1.png",
    viewCount: 6789,
    hashtags: ["top 7", "xu hướng 2024", "thiết kế", "nội thất", "mới nhất"],
    publishDate: "2024-01-15",
    slug: "top-7-vat-lieu-op-tuong-gia-chu-can-biet",
    author: "PG Design Team",
    readTime: "14 phút",
    category: "Xu hướng 2024",
    htmlContent: `<!-- Content from public/assets/blog/top 7/raw.html -->`
  }
};

// Function to fetch blog detail data by slug or ID
export const fetchBlogDetailData = async (identifier: string): Promise<BlogDetailData> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Check if identifier is a slug
  let blogDetail = mockBlogDetails[identifier];
  
  if (!blogDetail) {
    // Check if identifier is an ID
    const idToSlugMap: { [key: string]: string } = {
      "1": "12-xu-huong-thiet-ke-khong-gian-xanh",
      "2": "21-mau-ke-tivi-duoi-gam-cau-thang", 
      "3": "4-tips-tao-diem-nhan-bep-sang-trong",
      "4": "6-tip-ve-sinh-ban-an-go-don-gian",
      "5": "4-phong-cach-tu-quan-ao-dep",
      "6": "nha-dep-mix-chat-lieu-dung-cach",
      "7": "cach-phoi-mau-noi-that-dep-sang-trong",
      "8": "top-7-vat-lieu-op-tuong-gia-chu-can-biet"
    };
    
    const slug = idToSlugMap[identifier];
    if (slug) {
      blogDetail = mockBlogDetails[slug];
    }
  }
  
  if (!blogDetail) {
    throw new Error('Blog not found');
  }
  return blogDetail;
};

// Function to read file content from the assets/blog directory
async function readFileWithPath(folderName: string): Promise<string> {
  try {
    // Try to read raw.html file first
    const response = await fetch(`${process.env.PUBLIC_URL}/assets/blog/${encodeURIComponent(folderName)}/raw.html`);
    
    if (!response.ok) {
      // If raw.html doesn't exist, try raw.txt
      const txtResponse = await fetch(`${process.env.PUBLIC_URL}/assets/blog/${encodeURIComponent(folderName)}/raw.txt`);
      
      if (!txtResponse.ok) {
        throw new Error(`File not found: raw.html or raw.txt in ${folderName}`);
      }
      
      const content = await txtResponse.text();
      return content;
    }
    
    const content = await response.text();
    return content;
  } catch (error) {
    console.error(`Error reading file from ${folderName}:`, error);
    throw new Error(`Failed to read file content from ${folderName}: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Function to check if a file exists
export const checkFileExists = async (folderName: string, fileName: string): Promise<boolean> => {
  try {
    const response = await fetch(`/assets/blog/${encodeURIComponent(folderName)}/${fileName}`, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    return false;
  }
};

// Function to get file content with detailed error information
export const getFileContentWithInfo = async (folderName: string): Promise<{
  content: string;
  fileName: string;
  size: number;
  lastModified: string;
}> => {
  const fileExtensions = ['raw.html', 'raw.txt', 'content.html', 'content.txt'];
  
  for (const extension of fileExtensions) {
    try {
      const response = await fetch(`/assets/blog/${encodeURIComponent(folderName)}/${extension}`);
      
      if (response.ok) {
        const content = await response.text();
        const size = parseInt(response.headers.get('content-length') || '0');
        const lastModified = response.headers.get('last-modified') || '';
        
        return {
          content,
          fileName: extension,
          size,
          lastModified
        };
      }
    } catch (error) {
      continue;
    }
  }
  
  throw new Error(`No readable file found in ${folderName}`);
};

// Function to get current data source (for development)
export const getCurrentDataSource = (): string => {
  return 'Mock Data';
};

// Function to get file information (size, last modified, etc.)
export const getFileInfo = async (folderName: string): Promise<{ size: number; lastModified: string; exists: boolean }> => {
  try {
    const response = await fetch(`/assets/blog/${encodeURIComponent(folderName)}/raw.html`, { method: 'HEAD' });
    
    if (!response.ok) {
      return { size: 0, lastModified: '', exists: false };
    }
    
    const size = parseInt(response.headers.get('content-length') || '0');
    const lastModified = response.headers.get('last-modified') || '';
    
    return { size, lastModified, exists: true };
  } catch (error) {
    console.error(`Error getting file info for ${folderName}:`, error);
    return { size: 0, lastModified: '', exists: false };
  }
};

// Function to validate if a blog folder exists and has required files
export const validateBlogFolder = async (folderName: string): Promise<{
  exists: boolean;
  hasRawHtml: boolean;
  hasPicture1: boolean;
  fileSize?: number;
}> => {
  try {
    const rawHtmlInfo = await getFileInfo(folderName);
    const picture1Response = await fetch(`/assets/blog/${encodeURIComponent(folderName)}/Picture1.png`, { method: 'HEAD' });
    
    return {
      exists: rawHtmlInfo.exists,
      hasRawHtml: rawHtmlInfo.exists,
      hasPicture1: picture1Response.ok,
      fileSize: rawHtmlInfo.size
    };
  } catch (error) {
    console.error(`Error validating blog folder ${folderName}:`, error);
    return { exists: false, hasRawHtml: false, hasPicture1: false };
  }
};