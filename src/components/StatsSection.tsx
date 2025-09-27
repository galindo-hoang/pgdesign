// src/components/StatsSection.tsx
import React, { useRef, useEffect, useState } from "react";
import "./StatsSection.css";
import useCountUp from "../hooks/useCountUp";

// Define an interface for each statistic item
interface StatItemData {
  id: number;
  icon: React.ElementType;
  targetValue: number;
  label: string;
  suffix: string;
  description: string;
  category: string;
}

interface StatMainHeader {
  mainHeadline: string
  subHeadline: string
  description: string
}

interface StatProps {
  stateHeader: StatMainHeader,
  stateItems: StatItemData[]
}

const StatsSection: React.FC<StatProps> = ({stateHeader, stateItems}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

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
          <h2 className="stats-main-headline">{stateHeader.mainHeadline}</h2>
          <div className="stats-sub-headline-wrapper">
            <h3 className="stats-sub-headline">{stateHeader.subHeadline}</h3>
            <p className="stats-description">{stateHeader.description}</p>
          </div>
        </div>

        <div className="stats-grid">
          {stateItems.map((item, index) => (
            <StatItem
              key={item.id}
              icon={item.icon}
              targetValue={item.targetValue}
              label={item.label}
              suffix={item.suffix}
              description={item.description}
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
      <div className="stat-overlay" />
      
      <div className="stat-content-wrapper">
        <div className="stat-icon-wrapper">
          <Icon className="stat-icon" />
        </div>
        <div className="stat-content">
          <div className="stat-value">
            {count}{suffix}
          </div>
          {/* <div className="stat-label">{label}</div> */}
          <div className="stat-description">{description}</div>
        </div>
      </div>
    </div>
  );
};
