import React from "react";
import "./IntroPage.css";
import AboutIntroSection from "../../components/AboutIntroSection";
import VisionMissionSection from "../../components/VisionMissionSection";
import CommitmentsSection from "../../components/CommitmentsSection";
import TeamSection from "../../components/TeamSection";

// Import your SVG icons as React Components
import { ReactComponent as DirectExecutionIcon } from "../../assets/icons/direct-execution-icon.svg";
import { ReactComponent as QualityMaterialsIcon } from "../../assets/icons/quality-materials-icon.svg";
import { ReactComponent as ClearPricingIcon } from "../../assets/icons/clear-pricing-icon.svg";
import { ReactComponent as TimelyDeliveryIcon } from "../../assets/icons/timely-delivery-icon.svg";
import { ReactComponent as ReasonablePriceIcon } from "../../assets/icons/reasonable-price-icon.svg";
import { ReactComponent as PostHandoverWarrantyIcon } from "../../assets/icons/post-handover-warranty-icon.svg";

// Import images
import backgroundImage from "../../assets/images/thumb-intro.jpg";
import visionMissionImage from "../../assets/images/vision-mission-section.jpg";

const IntroPage: React.FC = () => {
  // About Intro Section Data
  const aboutIntroData = {
    brandTitle: "PG DESIGN",
    brandSubtitle: "KIẾN TẠO KHÔNG GIAN",
    identity: "KHẲNG ĐỊNH BẢN SẮC",
    descriptions: [
      "Là đơn vị chuyên nghiệp trong lĩnh vực thiết kế kiến trúc, nội thất và thi công trọn gói. Với đội ngũ thiết kế và thi công giàu kinh nghiệm, chúng tôi cam kết mang đến những công trình chất lượng cao, đúng tiến độ và phản ánh rõ rệt tính cách của từng khách hàng.",
      "PG Design không chỉ tạo ra những không gian sống và làm việc thẩm mỹ, mà còn góp phần xây dựng bản sắc riêng cho mỗi công trình thông qua thiết kế cá nhân hóa và có chiều sâu, gắn liền với phong cách sống và định hướng thương hiệu của khách hàng. Đây chính là cách chúng tôi mang đến giá trị vượt lên trên vẻ đẹp bề mặt - một không gian có hồn và có ý nghĩa."
    ],
    backgroundImage: backgroundImage
  };

  // Vision Mission Section Data
  const visionMissionData = {
    image: visionMissionImage,
    vision: {
      title: "TẦM NHÌN",
      paragraphs: [
        "PG Design tự hào trở thành đơn vị thiết kế - thi công uy tín hàng đầu: nơi mở không gian không chỉ được đầu tư về công năng và thẩm mỹ, mà còn là nơi kiến tạo câu chuyện bằng không gian sống của người sở hữu.",
        "Chúng tôi tin rằng, một không gian đẹp là không gian đặt dấu cảm xúc và đồng điệu với nhu cầu sống, từ đó nâng tầm trải nghiệm và chất lượng cuộc sống mỗi ngày."
      ]
    },
    mission: {
      title: "SỨ MỆNH",
      items: [
        "Cung cấp các giải pháp thiết kế - thi công đồng bộ, chuyên nghiệp, đúng tiến độ tối ưu chi phí mà vẫn đảm bảo chất lượng và phong cách riêng.",
        "Đạt chuẩn mực thiết kế dựa trên nhu cầu, gu thẩm mỹ và mục tiêu sử dụng của từng khách hàng.",
        "Không ngừng sáng tạo, cập nhật xu hướng vật liệu, công nghệ và phong cách mới trong ngành thiết kế - nội thất.",
        "Xây dựng mối quan hệ lâu dài với khách hàng trên nền tảng uy tín - minh bạch - tận tâm."
      ]
    },
    coreValues: {
      title: "GIÁ TRỊ CỐT LÕI",
      values: [
        {
          title: "1. Tận tâm & Chuyên nghiệp",
          description: "Đồng hành cùng khách hàng từ bản vẽ đầu tiên dần hoàn thiện công trình, với tinh thần trách nhiệm và thái độ tận tâm."
        },
        {
          title: "2. Sáng tạo & Cá tính",
          description: "Không gian được thiết kế không chỉ đẹp, mà còn mang dấu ấn riêng, thể hiện rõ \"chất\" của người sở hữu."
        },
        {
          title: "3. Chất lượng & Hoàn hảo",
          description: "Luôn chọn giải pháp tốt nhất, vật liệu chất lượng và thi công chỉnh chu để đạt đến sự hoàn hảo trong từng chi tiết."
        },
        {
          title: "4. Hiệu quả & Kinh tế hợp lý",
          description: "Tối ưu hóa chi phí mà vẫn đảm bảo tính thẩm mỹ, công năng và độ bền của công trình."
        }
      ]
    }
  };

  // Commitments Section Data
  const commitmentsData = {
    title: "CAM KẾT CỦA PG DESIGN",
    commitments: [
      {
        icon: DirectExecutionIcon,
        title: "KHÔNG KHOÁN THẦU",
        description: "PG Design cam kết trực tiếp đảm nhận từ khâu thiết kế đến thi công, không giao khoán cho bên thứ ba."
      },
      {
        icon: QualityMaterialsIcon,
        title: "VẬT TƯ ĐẠT CHUẨN",
        description: "Chúng tôi sử dụng vật liệu chính hãng, rõ nguồn gốc, đảm bảo độ bền và tính thẩm mỹ cho công trình."
      },
      {
        icon: ClearPricingIcon,
        title: "CHI PHÍ MINH BẠCH",
        description: "Mọi hạng mục đều được minh bạch trong báo giá. Cam kết không để khách hàng lo lắng về chi phí phát sinh bất ngờ."
      },
      {
        icon: TimelyDeliveryIcon,
        title: "THI CÔNG ĐÚNG TIẾN ĐỘ",
        description: "Chúng tôi đặt uy tín lên hàng đầu, bằng việc thực hiện công trình đúng tiến độ đã thống nhất với khách hàng."
      },
      {
        icon: ReasonablePriceIcon,
        title: "GIÁ HỢP LÝ - TỐI ƯU NGÂN SÁCH",
        description: "Chi phí thiết kế và thi công được tính toán hợp lý, mang lại giá trị cao nhất cho mỗi đồng đầu tư của khách hàng."
      },
      {
        icon: PostHandoverWarrantyIcon,
        title: "CAM KẾT BẢO HÀNH",
        description: "Sau khi bàn giao, PG Design vẫn luôn đồng hành cùng khách hàng thông qua chính sách bảo hành chuyên nghiệp và chu đáo."
      }
    ]
  };

  // Team Section Data
  const teamData = {
    content: {
      heading: "Đội ngũ PG Design",
      description: "Những người trẻ đầy nhiệt huyết và đam mê sáng tạo. Đội ngũ được xây dựng để đồng hành cùng bạn từ bước định hình ý tưởng, phát triển bản sắc thương hiệu cho đến quản lý toàn bộ quy trình - từ trước đến sau khi sản phẩm hoàn thiện."
    },
    boardDirectors: [
      {
        id: 1,
        name: "Phan Anh Thư",
        title: "CEO & Founder",
        image: "path/to/phan_anh_thu_image.jpg",
      },
      {
        id: 2,
        name: "Võ Nguyên Pháp",
        title: "Project Director",
        image: "path/to/vo_nguyen_phap_image.jpg",
      },
    ],
    teamMembers: [
      {
        id: 1,
        name: "Nguyễn Văn A",
        title: "Senior Architect",
        image: "path/to/member1.jpg",
      },
      {
        id: 2,
        name: "Trần Thị B",
        title: "Interior Designer",
        image: "path/to/member2.jpg",
      },
      {
        id: 3,
        name: "Lê Minh C",
        title: "Construction Manager",
        image: "path/to/member3.jpg",
      },
      {
        id: 4,
        name: "Phạm Thu D",
        title: "3D Designer",
        image: "path/to/member4.jpg",
      },
      {
        id: 5,
        name: "Hoàng Văn E",
        title: "Site Supervisor",
        image: "path/to/member5.jpg",
      },
      {
        id: 6,
        name: "Đỗ Thị F",
        title: "Project Coordinator",
        image: "path/to/member6.jpg",
      }
    ]
  };

  return (
    <div className="IntroPageContainter">
      <AboutIntroSection content={aboutIntroData} />
      <VisionMissionSection content={visionMissionData} />
      <CommitmentsSection title={commitmentsData.title} commitments={commitmentsData.commitments} />
      <TeamSection 
        content={teamData.content} 
        boardDirectors={teamData.boardDirectors} 
        teamMembers={teamData.teamMembers} 
      />
    </div>
  );
};

export default IntroPage;
