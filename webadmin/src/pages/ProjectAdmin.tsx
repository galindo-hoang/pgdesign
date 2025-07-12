import React from 'react';

const ProjectAdmin: React.FC = () => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Project Management</h1>
      <p>Manage project portfolio and categories</p>
      <div style={{ marginTop: '2rem', padding: '2rem', background: '#f9fafb', borderRadius: '8px' }}>
        <p>This page will contain:</p>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li>✓ Project categories management</li>
          <li>✓ Project portfolio items</li>
          <li>✓ About project section</li>
          <li>✓ Statistics and achievements</li>
          <li>✓ Project filtering and organization</li>
        </ul>
      </div>
    </div>
  );
};

export default ProjectAdmin; 