// src/components/WorkProcessSection.tsx
import React, { useState } from "react";
import "./WorkProcessSection.css";

// Import SVG components
// Make sure these paths are correct for your project structure
import { ReactComponent as DesignProcessIcon } from "../assets/icons/design-process-icon.svg"; // Your design icon SVG
import { ReactComponent as ConstructionProcessIcon } from "../assets/icons/construction-process-icon.svg"; // Your construction icon SVG
import { ReactComponent as WorkProcessFlowDiagram1 } from "../assets/icons/work-process-flow-diagram-1.svg"; // Your main flow diagram SVG
import { ReactComponent as WorkProcessFlowDiagram2 } from "../assets/icons/work-process-flow-diagram-2.svg"; // Your main flow diagram SVG

const WorkProcessSection: React.FC = () => {
  // State to track which tab is active
  const [activeTab, setActiveTab] = useState<'design' | 'construction'>('design');

  return (
    <section className="work-process-section">
      <h2 className="wp-main-headline">QUY TRÌNH LÀM VIỆC</h2>

      <div className="wp-tabs">
        <div 
          className={`wp-tab ${activeTab === 'design' ? 'wp-tab-active' : ''}`}
          onClick={() => setActiveTab('design')}
        >
          <DesignProcessIcon className="wp-tab-icon" />
          QUY TRÌNH THIẾT KẾ
        </div>
        <div className="headerDivider"></div>
        <div 
          className={`wp-tab ${activeTab === 'construction' ? 'wp-tab-active' : ''}`}
          onClick={() => setActiveTab('construction')}
        >
          <ConstructionProcessIcon className="wp-tab-icon" />
          QUY TRÌNH THI CÔNG
        </div>
      </div>

      <div className="wp-flow-diagram-container">
        {/* Conditionally render the appropriate diagram based on active tab */}
        {activeTab === 'design' ? (
          <WorkProcessFlowDiagram1 className="wp-flow-diagram" />
        ) : (
          <WorkProcessFlowDiagram2 className="wp-flow-diagram" />
        )}
      </div>
    </section>
  );
};

export default WorkProcessSection;
