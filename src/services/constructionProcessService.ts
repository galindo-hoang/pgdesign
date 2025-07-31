import { ConstructionProcessData } from '../types/profilePageTypes';

// Import placeholder images - replace with actual construction/design images
import interiorImage1 from '../assets/images/profilepage/Rectangle 44.png';
import interiorImage2 from '../assets/images/profilepage/Rectangle 43.png';
import constructionImage1 from '../assets/images/profilepage/Rectangle 46.png';
import constructionImage2 from '../assets/images/profilepage/Rectangle 45.png';
import constructionImage3 from '../assets/images/profilepage/Rectangle 51.png';
import constructionSingleImage from '../assets/images/profilepage/Rectangle 47.png';
import workerImage1 from '../assets/images/profilepage/Rectangle 50.png';
import workerImage2 from '../assets/images/profilepage/Rectangle 49.png';
import workerImage3 from '../assets/images/profilepage/Rectangle 52.png';

// Mock data - replace with API calls later
const mockConstructionProcessData: ConstructionProcessData = {
  sections: [
    {
      title: 'THIẾT KẾ HIỆN ĐẠI - BẮT KỊP XU HƯỚNG',
      description: 'PG Design luôn theo dõi và học hỏi những xu hướng mới và cập nhật những xu hướng thiết kế mới nhất. Đồng thời luôn bắt kịp thời đại công nghệ hiện tại và sử dụng những tiến bộ công nghệ để tối ưu',
      images: [interiorImage1, interiorImage2],
      layoutType: 'two-images'
    },
    {
      title: 'THI CÔNG CHẤT LƯỢNG - QUẢN LÝ CHUẨN CHỈNH',
      description: 'Tuân thủ thực hiện toàn bộ quy trình thi công Phân thả, hoàn thiện, đầy đủ - tuân - kiểm bảo hảo định nghĩa tại thời điểm lắp đặt trong quá trình đã cam kết. Mọi công đoạn đều có kỳ sư giám sát chuyên môn, cam kết "thi công thật - giao thật kết".',
      images: [constructionImage1, constructionImage2, constructionImage3],
      layoutType: 'three-images'
    },
    {
      title: 'SẢN PHẨM TỐT - TỪ NHỮNG CON NGƯỜI TÂM HUYẾT',
      description: 'Đội ngũ PG luôn tự hào về năng lực chuyên nghiệp giúp giảm chi phí qua kình nghiệm những gì cứng rắn từ chuyên môn, cam kết "thi công thật - giảng thật kết" để mình chi tiết đó cùng toàn bộ tâm huyết của mình cho mỗi sản phẩm.',
      images: [constructionSingleImage],
      layoutType: 'single-large'
    },
    {
      title: 'TỐI ƯU THỜI GIAN VÀ CHI PHÍ',
      description: 'Quy trình kinh doanh và thi công chuyên nghiệp giúp giảm chi phí qua kình nghiệm và nghiên cứu thị trường thời gian với công việc giao hàng; thách hạng chi tiết. kinh doanh mất thời gian ít hơn hiệu quả - tiết kiệm thời gian và chi phí.',
      images: [workerImage1, workerImage2, workerImage3],
      layoutType: 'time-optimization'
    }
  ]
};

// Fetch construction process data
export const fetchConstructionProcessData = async (): Promise<ConstructionProcessData> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch('/api/profile/construction-process');
    // if (!response.ok) throw new Error('Failed to fetch construction process data');
    // return await response.json();
    
    // For now, return mock data
    return mockConstructionProcessData;
  } catch (error) {
    console.error('Error fetching construction process data:', error);
    throw error;
  }
};

// Update construction process data (for admin use)
export const updateConstructionProcessData = async (data: ConstructionProcessData): Promise<void> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch('/api/profile/construction-process', {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}`
    //   },
    //   body: JSON.stringify(data)
    // });
    // if (!response.ok) throw new Error('Failed to update construction process data');
    
    console.log('Construction process data updated:', data);
  } catch (error) {
    console.error('Error updating construction process data:', error);
    throw error;
  }
}; 