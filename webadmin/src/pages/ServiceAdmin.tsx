import React from 'react';

const ServiceAdmin: React.FC = () => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Service Management</h1>
      <p>Manage service offerings and service page content</p>
      <div style={{ marginTop: '2rem', padding: '2rem', background: '#f9fafb', borderRadius: '8px' }}>
        <p>This page will contain:</p>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li>✓ Service page hero section</li>
          <li>✓ Service categories</li>
          <li>✓ Construction services</li>
          <li>✓ Process sections</li>
          <li>✓ Service descriptions and pricing</li>
        </ul>
      </div>
    </div>
  );
};

export default ServiceAdmin; 