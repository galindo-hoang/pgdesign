import React from 'react';

const IntroAdmin: React.FC = () => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Intro Page Management</h1>
      <p>Manage company introduction and about us content</p>
      <div style={{ marginTop: '2rem', padding: '2rem', background: '#f9fafb', borderRadius: '8px' }}>
        <p>This page will contain:</p>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li>✓ About intro section</li>
          <li>✓ Vision & mission management</li>
          <li>✓ Team members</li>
          <li>✓ Commitments and values</li>
          <li>✓ Company statistics</li>
        </ul>
      </div>
    </div>
  );
};

export default IntroAdmin; 