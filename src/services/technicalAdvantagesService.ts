import { TechnicalAdvantagesData } from '../types/profilePageTypes';

// Import placeholder images - replace with actual project images
const constructionImage1 = 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/profilepage/Rectangle 54.png';;
const constructionImage2 = 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/profilepage/Rectangle 53.png';;
const constructionImage3 = 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/profilepage/Rectangle 55.png';;
const constructionImage4 = 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/profilepage/Rectangle 57.png';;
const constructionImage5 = 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/profilepage/Rectangle 56.png';;
const constructionImage6 = 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/profilepage/Rectangle 58.png';;
const constructionImage7 = 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/profilepage/Rectangle 59.png';;
const constructionImage8 = 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/profilepage/Rectangle 61.png';;
const constructionImage9 = 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/profilepage/Rectangle 60.png';;
const constructionImage10 = 'https://s3-hcm-r2.s3cloud.vn/pgdesign-new/profilepage/Rectangle 62.png';;

// Mock data - replace with API calls later
const mockTechnicalAdvantagesData: TechnicalAdvantagesData = {
  mainTitle: 'ƯU ĐIỂM KỸ THUẬT TỪNG GIAI ĐOẠN CỦA PG DESIGN',
  phases: [
    {
      title: 'PHẦN THỨ I | CHẮC CHẮN & CHÍNH XÁC',
      description: 'Bao lạch thú công tỷ năng - kiểm soát chất từ Đội thi công hay nghề cao - giám sát kỹ chuyên nghiệp Thi công đúng quy chuẩn kỹ cần - tiến vàng thi thái',
      images: [constructionImage1, constructionImage2, constructionImage3],
      layoutType: 'three-grid'
    },
    {
      title: 'PHẦN HOÀN THIỆN | CHỈN CHU & TINH TẾ',
      description: 'Hoàn thiện tỉ mỉ từng góc nhìn, tỉ số đã đo thả hoàng trầm - nhận - nước Kỹ thuật thi công căn cứ ḅêri, gọm chính, đảng bảo vệ phẩm cấu Luôn chủ vệ thi công tứng tiếp cận & tỹ hãnh mỹ',
      images: [constructionImage4, constructionImage5, constructionImage6],
      layoutType: 'mixed-layout'
    },
    {
      title: 'PHẦN NỘI THẤT | CHỈNH XÁC & THẨM MỸ',
      description: 'Thi công nội thất theo bản vệ 3D - đúng kích thước, cùng từng Chất liệu tỉ dạng, thiết cồng đầu, veneer, laminate, đầ tỉ mỹlíca, Xuống tận xuất riêng - đạt bậc hăoim loại chất lượng tỉ đầu đơn cuối',
      images: [constructionImage7, constructionImage8, constructionImage9, constructionImage10],
      layoutType: 'mixed-layout'
    }
  ]
};

// Fetch technical advantages data
export const fetchTechnicalAdvantagesData = async (): Promise<TechnicalAdvantagesData> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch('/api/profile/technical-advantages');
    // if (!response.ok) throw new Error('Failed to fetch technical advantages data');
    // return await response.json();
    
    // For now, return mock data
    return mockTechnicalAdvantagesData;
  } catch (error) {
    console.error('Error fetching technical advantages data:', error);
    throw error;
  }
};

// Update technical advantages data (for admin use)
export const updateTechnicalAdvantagesData = async (data: TechnicalAdvantagesData): Promise<void> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch('/api/profile/technical-advantages', {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}`
    //   },
    //   body: JSON.stringify(data)
    // });
    // if (!response.ok) throw new Error('Failed to update technical advantages data');
    
    console.log('Technical advantages data updated:', data);
  } catch (error) {
    console.error('Error updating technical advantages data:', error);
    throw error;
  }
}; 