import React, { useRef, useEffect, useState } from "react";
import "./CommitmentsSection.css"; // Import the CSS file

// Import your SVG icons as React Components
import { ReactComponent as DirectExecutionIcon } from "../assets/icons/direct-execution-icon.svg";
import { ReactComponent as QualityMaterialsIcon } from "../assets/icons/quality-materials-icon.svg";
import { ReactComponent as ClearPricingIcon } from "../assets/icons/clear-pricing-icon.svg";
import { ReactComponent as TimelyDeliveryIcon } from "../assets/icons/timely-delivery-icon.svg";
import { ReactComponent as ReasonablePriceIcon } from "../assets/icons/reasonable-price-icon.svg";
import { ReactComponent as PostHandoverWarrantyIcon } from "../assets/icons/post-handover-warranty-icon.svg";

const CommitmentsSection: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    itemRefs.current.forEach((item, index) => {
      if (item) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setVisibleItems(prev => {
                  const newSet = new Set(Array.from(prev));
                  newSet.add(index);
                  return newSet;
                });
                observer.disconnect(); // Stop observing once animated
              }
            });
          },
          {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px',
          }
        );

        observer.observe(item);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  const commitmentData = [
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
  ];

  return (
    <section className="pg-commitments-section">
      <div className="pg-commitments-heading">CAM KẾT CỦA PG DESIGN</div>
      <div className="pg-commitments-grid">
        {commitmentData.map((commitment, index) => {
          const IconComponent = commitment.icon;
          const isVisible = visibleItems.has(index);
          
          return (
            <div 
              key={index}
              ref={el => {
                itemRefs.current[index] = el;
              }}
              className="commitment-item"
            >
              <div className="commitment-header">
                <div className={`commitment-icon ${isVisible ? 'animate-icon' : ''}`}>
                  <IconComponent />
                </div>
                <h3 className="commitment-title">{commitment.title}</h3>
              </div>
              <p className="commitment-description">
                {commitment.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CommitmentsSection;
