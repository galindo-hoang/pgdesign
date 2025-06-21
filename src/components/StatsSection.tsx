// src/components/StatsSection.tsx
import React, { useRef, useEffect, useState } from "react";
import "./StatsSection.css";
import useCountUp from "../hooks/useCountUp";

// Import your SVG icons
import { ReactComponent as BriefcaseIcon } from "../assets/icons/experience-icon.svg";
import { ReactComponent as HandshakeIcon } from "../assets/icons/customer-icon.svg";
import { ReactComponent as DesignIcon } from "../assets/icons/design-icon.svg";
import { ReactComponent as GearIcon } from "../assets/icons/building-icon.svg";

// Import project images for backgrounds
import experienceImg from "../assets/images/diary-image-1.jpg";
import customerImg from "../assets/images/diary-image-2.jpg";
import projectImg from "../assets/images/diary-image-3.jpg";
import qualityImg from "../assets/images/diary-image-4.jpg";

// Define an interface for each statistic item
interface StatItemData {
  id: number;
  icon: React.ElementType;
  targetValue: number;
  label: string;
  suffix: string;
  description: string;
  backgroundImage: string;
  category: string;
}

const StatsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  // Enhanced, more relevant statistics for architecture & interior design company
  const stats: StatItemData[] = [
    { 
      id: 1, 
      icon: BriefcaseIcon, 
      targetValue: 5, 
      label: "Kinh nghiệm", 
      suffix: "+ năm",
      description: "Trong thiết kế & thi công",
      backgroundImage: experienceImg,
      category: "experience"
    },
    { 
      id: 2, 
      icon: HandshakeIcon, 
      targetValue: 500, 
      label: "Khách hàng", 
      suffix: "+",
      description: "Tin tưởng & hài lòng",
      backgroundImage: customerImg,
      category: "customers"
    },
    { 
      id: 3, 
      icon: DesignIcon, 
      targetValue: 450, 
      label: "Dự án", 
      suffix: "+",
      description: "Thiết kế hoàn thành",
      backgroundImage: projectImg,
      category: "projects"
    },
    { 
      id: 4, 
      icon: GearIcon, 
      targetValue: 98, 
      label: "Chất lượng", 
      suffix: "%",
      description: "Cam kết hoàn hảo",
      backgroundImage: qualityImg,
      category: "quality"
    },
  ];

  // Set up Intersection Observer
  useEffect(() => {
    const currentRef = sectionRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section className="stats-section" ref={sectionRef}>
      <div className="stats-container">
        <div className="stats-header">
          <h2 className="stats-main-headline">THÀNH TỰU CỦA CHÚNG TÔI</h2>
          <div className="stats-sub-headline-wrapper">
            <h3 className="stats-sub-headline">Những con số ấn tượng</h3>
            <p className="stats-description">
              Với nhiều năm kinh nghiệm trong lĩnh vực thiết kế kiến trúc và nội thất, 
              chúng tôi tự hào mang đến những giải pháp tối ưu cho mọi không gian sống.
            </p>
          </div>
        </div>

        <div className="stats-grid">
          {stats.map((item, index) => (
            <StatItem
              key={item.id}
              icon={item.icon}
              targetValue={item.targetValue}
              label={item.label}
              suffix={item.suffix}
              description={item.description}
              backgroundImage={item.backgroundImage}
              category={item.category}
              startAnimation={inView}
              animationDelay={index * 150}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

// Enhanced StatItem component
interface StatItemProps {
  icon: React.ElementType;
  targetValue: number;
  label: string;
  suffix: string;
  description: string;
  backgroundImage: string;
  category: string;
  startAnimation: boolean;
  animationDelay: number;
}

const StatItem: React.FC<StatItemProps> = ({
  icon: Icon,
  targetValue,
  label,
  suffix,
  description,
  backgroundImage,
  category,
  startAnimation,
  animationDelay,
}) => {
  const { count, startAnimation: triggerCountUp, hasStarted } = useCountUp({
    end: targetValue,
  });

  useEffect(() => {
    if (startAnimation && !hasStarted) {
      setTimeout(() => {
        triggerCountUp();
      }, animationDelay);
    }
  }, [startAnimation, hasStarted, triggerCountUp, animationDelay]);

  return (
    <div 
      className={`stat-item stat-item-${category}`}
      style={{ 
        animationDelay: `${animationDelay}ms` 
      }}
    >
      <div 
        className="stat-background-image"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className="stat-overlay" />
      
      <div className="stat-content-wrapper">
        <div className="stat-icon-wrapper">
          <Icon className="stat-icon" />
        </div>
        <div className="stat-content">
          <div className="stat-value">
            {count}{suffix}
          </div>
          <div className="stat-label">{label}</div>
          <div className="stat-description">{description}</div>
        </div>
      </div>
    </div>
  );
};
