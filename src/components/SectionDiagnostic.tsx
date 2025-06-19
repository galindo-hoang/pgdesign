import React, { useEffect, useState } from 'react';

const SectionDiagnostic: React.FC = () => {
  const [mountedSections, setMountedSections] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    // Listen for console logs to track which sections are mounting
    const originalLog = console.log;
    const originalError = console.error;

    console.log = (...args) => {
      const message = args.join(' ');
      if (message.includes('component mounting')) {
        const sectionName = message.split(' ')[0];
        setMountedSections(prev => [...prev, sectionName]);
      }
      originalLog.apply(console, args);
    };

    console.error = (...args) => {
      const message = args.join(' ');
      setErrors(prev => [...prev, message]);
      originalError.apply(console, args);
    };

    // Cleanup
    return () => {
      console.log = originalLog;
      console.error = originalError;
    };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '12px',
      maxWidth: '300px',
      zIndex: 9999
    }}>
      <h4>Section Diagnostic</h4>
      <div>
        <strong>Mounted Sections ({mountedSections.length}):</strong>
        <ul>
          {mountedSections.map((section, index) => (
            <li key={index} style={{ color: 'lightgreen' }}>{section}</li>
          ))}
        </ul>
      </div>
      {errors.length > 0 && (
        <div>
          <strong>Errors ({errors.length}):</strong>
          <ul>
            {errors.slice(0, 3).map((error, index) => (
              <li key={index} style={{ color: 'red', fontSize: '10px' }}>
                {error.substring(0, 50)}...
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SectionDiagnostic; 