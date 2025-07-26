// src/services/blogDetailService.ts

import { BlogDetailData, BlogDetailServiceResponse } from '../types/blogDetailTypes';

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
    htmlContent: `<!-- Content from public/assets/blog/12 xu hướng/raw.html -->`
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
    htmlContent: `<!-- Content from public/assets/blog/4-tips-tao-diem-nhan-bep-sang-trong/raw.html -->`
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
    htmlContent: `<!-- Content from public/assets/blog/nhà đẹp/raw.html -->`
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
    htmlContent: `<!-- Content from public/assets/blog/phối màu/raw.html -->`
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

  alert(identifier)

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

// Function to get current data source (for development)
export const getCurrentDataSource = (): string => {
  return 'Mock Data';
};