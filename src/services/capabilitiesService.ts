import { CapabilitiesData } from '../types/profilePageTypes';

// Import placeholder images - you can replace these with actual architectural renderings
import architecturalImage1 from '../assets/images/profilepage/image.png';

// Mock data - replace with API calls later
const mockCapabilitiesData: CapabilitiesData = {
  title: 'NĂNG LỰC',
  companyName: 'PG DESIGN',
  serviceLine: 'THIẾT KẾ & THI CÔNG TRỌN GÓI',
  description: 'Tối ưu toàn bộ quy trình - Đảm bảo chất lượng - Tiết kiệm chi phí',
  capabilities: [
    'Một đầu mối - Xuyên suốt từ thiết kế đến thi công, giúp giảm sai sót và rút ngắn tiến độ.',
    'Thi công nhanh hơn đến 25%, kiểm soát chất lượng và an toàn công trình.',
    'Tiết kiệm 10-20% chi phí nhờ quy trình khép kín và quản lý ngân sách hiệu quả.',
    'Thiết kế hiện đại, đề thi công phù hợp xu hướng và nhu cầu sử dụng thực tế.',
    'Đội ngũ trẻ, giàu nhiệt huyết - luôn cập nhật xu hướng mới và hướng không gian sống.'
  ],
  images: {
    mainImage: architecturalImage1,
    sideImages: [architecturalImage1, architecturalImage1]
  },
  benefitsTitle: 'LỢI ÍCH KHÁCH HÀNG NHẬN ĐƯỢC KHI CHỌN PG DESIGN'
};

// Fetch capabilities data
export const fetchCapabilitiesData = async (): Promise<CapabilitiesData> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch('/api/profile/capabilities');
    // if (!response.ok) throw new Error('Failed to fetch capabilities data');
    // return await response.json();
    
    // For now, return mock data
    return mockCapabilitiesData;
  } catch (error) {
    console.error('Error fetching capabilities data:', error);
    throw error;
  }
};

// Update capabilities data (for admin use)
export const updateCapabilitiesData = async (data: CapabilitiesData): Promise<void> => {
  try {
    // TODO: Replace with actual API call
    // const response = await fetch('/api/profile/capabilities', {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}`
    //   },
    //   body: JSON.stringify(data)
    // });
    // if (!response.ok) throw new Error('Failed to update capabilities data');
    
    console.log('Capabilities data updated:', data);
  } catch (error) {
    console.error('Error updating capabilities data:', error);
    throw error;
  }
}; 