import React from 'react';

const ConsultationAdmin: React.FC = () => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Consultation Management</h1>
      <p>Manage customer consultation requests and inquiries</p>
      <div style={{ marginTop: '2rem', padding: '2rem', background: '#f9fafb', borderRadius: '8px' }}>
        <p>This page will contain:</p>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li>✓ Consultation request list</li>
          <li>✓ Customer contact information</li>
          <li>✓ Request status management</li>
          <li>✓ Response and follow-up tracking</li>
          <li>✓ Email notifications and templates</li>
        </ul>
      </div>
    </div>
  );
};

export default ConsultationAdmin; 