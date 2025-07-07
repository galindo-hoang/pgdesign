// src/components/WorkProcessSection.tsx
import React, { useState } from "react";
import "./WorkProcessSection.css";

interface WorkflowTab {
  id: string;
  icon: React.ElementType;
  title: string;
  diagram: React.ElementType;
}

interface WorkProcessSectionProps {
  title: string;
  workflows: WorkflowTab[];
  defaultActiveTab?: string;
}

const WorkProcessSection: React.FC<WorkProcessSectionProps> = ({
  title,
  workflows,
  defaultActiveTab = 'design'
}) => {
  // State to track which tab is active
  const [activeTab, setActiveTab] = useState<string>(defaultActiveTab);

  // Find the active workflow
  const activeWorkflow = workflows.find((workflow: WorkflowTab) => workflow.id === activeTab) || workflows[0];

  return (
    <section className="work-process-section">
      <h2 className="wp-main-headline">{title}</h2>

      <div className="wp-tabs">
        {workflows.map((workflow, index) => {
          const IconComponent = workflow.icon;
          return (
            <React.Fragment key={workflow.id}>
              <div 
                className={`wp-tab ${activeTab === workflow.id ? 'wp-tab-active' : ''}`}
                onClick={() => setActiveTab(workflow.id)}
              >
                <IconComponent className="wp-tab-icon" />
                {workflow.title}
              </div>
              {index < workflows.length - 1 && (
                <div className="headerDivider"></div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div className="wp-flow-diagram-container">
        {/* Conditionally render the appropriate diagram based on active tab */}
        {activeWorkflow && (
          <activeWorkflow.diagram className="wp-flow-diagram" />
        )}
      </div>
    </section>
  );
};

export default WorkProcessSection;
