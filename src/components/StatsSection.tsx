// src/components/StatsSection.tsx
import React, { useRef, useEffect, useState } from "react"; // Import useRef, useEffect, useState
import "./StatsSection.css";
import useCountUp from "../hooks/useCountUp"; // Import the custom hook

// Import your SVG icons
import { ReactComponent as BriefcaseIcon } from "../assets/icons/experience-icon.svg";
import { ReactComponent as HandshakeIcon } from "../assets/icons/customer-icon.svg";
import { ReactComponent as DesignIcon } from "../assets/icons/design-icon.svg";
import { ReactComponent as GearIcon } from "../assets/icons/building-icon.svg";

// Define an interface for each statistic item
interface StatItemData {
  id: number;
  icon: React.ElementType;
  targetValue: number; // The number the animation counts up to
  label: string;
}

const StatsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null); // Ref for the section itself
  const [inView, setInView] = useState(false); // State to track if section is in view

  // Define the data for your statistics with target numeric values
  const stats: StatItemData[] = [
    { id: 1, icon: BriefcaseIcon, targetValue: 5, label: "Năm kinh nghiệm" },
    { id: 2, icon: HandshakeIcon, targetValue: 389, label: "Khách hàng" },
    { id: 3, icon: DesignIcon, targetValue: 365, label: "Dự án thiết kế" },
    { id: 4, icon: GearIcon, targetValue: 250, label: "Dự án thi công" },
  ];

  // Set up Intersection Observer
  useEffect(() => {
    const currentRef = sectionRef.current; // Capture the current value of the ref here
    if (!currentRef) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            // Optionally, disconnect observer once it's in view
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of the section is visible
        // rootMargin: '0px 0px -100px 0px', // Adjust if you want it to trigger before fully in view
      }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []); // Run once on mount

  return (
    <section className="stats-section" ref={sectionRef}>
      {" "}
      {/* Attach the ref */}
      <h2 className="stats-main-headline">CHÚNG TÔI ĐÃ XÂY DỰNG</h2>
      <div className="stats-sub-headline-with-lines">
        <h3 className="stats-sub-headline">NHỮNG NGÔI NHÀ HẠNH PHÚC</h3>
      </div>
      <div className="stats-grid">
        {stats.map((item) => (
          <StatItem
            key={item.id}
            icon={item.icon}
            targetValue={item.targetValue}
            label={item.label}
            startAnimation={inView} // Pass 'inView' to tell StatItem when to start
          />
        ))}
      </div>
      <hr className="stats-divider" />
      <div className="stats-grid">
        {" "}
        {stats.map((item) => (
          <div key={item.id} className="stat-item">
            {" "}
            <div className="stat-label"> {item.label}</div>{" "}
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;

// --- Helper Component for individual Stat Item with counting ---
interface StatItemProps {
  icon: React.ElementType;
  targetValue: number;
  label: string;
  startAnimation: boolean; // Prop to trigger animation
}

const StatItem: React.FC<StatItemProps> = ({
  icon: Icon,
  targetValue,
  label,
  startAnimation,
}) => {
  // Use the useCountUp hook
  const {
    count,
    startAnimation: triggerCountUp,
    hasStarted,
  } = useCountUp({
    end: targetValue,
    duration: 1000, // 2 seconds animation
    // startOnEnter: true,
  });

  // Effect to start counting when startAnimation prop becomes true
  useEffect(() => {
    if (startAnimation && !hasStarted) {
      // Only start if in view and not already started
      triggerCountUp();
    }
  }, [startAnimation, hasStarted, triggerCountUp]);

  return (
    <div className="stat-item">
      <Icon className="stat-icon" />
      <div className="stat-value">{count} +</div>
    </div>
  );
};
