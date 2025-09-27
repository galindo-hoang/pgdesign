import React, { useState } from 'react';
import { 
  fetchProjectPageData, 
  clearProjectPageCache, 
  getCacheInfo,
  clearSpecificCache 
} from '../services/projectPageService';

interface CacheTestComponentProps {
  onClose?: () => void;
}

const CacheTestComponent: React.FC<CacheTestComponentProps> = ({ onClose }) => {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [cacheInfo, setCacheInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const addLog = (message: string, type: 'info' | 'success' | 'error' = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    const logMessage = `[${timestamp}] ${message}`;
    setTestResults(prev => [...prev, `${type}: ${logMessage}`]);
  };

  const clearLogs = () => {
    setTestResults([]);
  };

  const updateCacheInfo = () => {
    const info = getCacheInfo();
    setCacheInfo(info);
    addLog(`Cache info updated: ${info.totalEntries} entries, ${info.totalSize} bytes total`, 'info');
  };

  const testSingleCall = async () => {
    setLoading(true);
    addLog('🧪 Testing single API call...', 'info');
    
    try {
      const startTime = Date.now();
      const data = await fetchProjectPageData();
      const endTime = Date.now();
      
      addLog(`✅ Single call completed in ${endTime - startTime}ms`, 'success');
      addLog(`Data received: About Project title = "${data.aboutProject.title}"`, 'info');
      updateCacheInfo();
    } catch (error) {
      addLog(`❌ Error: ${error}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const testDoubleCall = async () => {
    setLoading(true);
    addLog('🧪 Testing double API call (should use cache on second call)...', 'info');
    
    try {
      // First call
      const startTime1 = Date.now();
      const data1 = await fetchProjectPageData();
      const endTime1 = Date.now();
      addLog(`First call completed in ${endTime1 - startTime1}ms`, 'info');
      
      // Second call (should use cache)
      const startTime2 = Date.now();
      const data2 = await fetchProjectPageData();
      const endTime2 = Date.now();
      addLog(`Second call completed in ${endTime2 - startTime2}ms`, 'info');
      
      if (JSON.stringify(data1) === JSON.stringify(data2)) {
        addLog('✅ Both calls returned identical data', 'success');
      } else {
        addLog('❌ Data mismatch between calls', 'error');
      }
      
      const speedImprovement = ((endTime1 - startTime1) / (endTime2 - startTime2)).toFixed(2);
      addLog(`Speed improvement: ${speedImprovement}x faster on second call`, 'success');
      
      updateCacheInfo();
    } catch (error) {
      addLog(`❌ Error: ${error}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const testRapidCalls = async () => {
    setLoading(true);
    addLog('🧪 Testing 5 rapid API calls...', 'info');
    
    try {
      const promises = [];
      const startTime = Date.now();
      
      // Make 5 rapid calls
      for (let i = 0; i < 5; i++) {
        promises.push(
          fetchProjectPageData().then(data => ({
            callNumber: i + 1,
            data,
            timestamp: Date.now()
          }))
        );
      }
      
      const results = await Promise.all(promises);
      const endTime = Date.now();
      
      addLog(`✅ All 5 calls completed in ${endTime - startTime}ms`, 'success');
      
      // Check if all results are identical
      const firstResult = JSON.stringify(results[0].data);
      const allIdentical = results.every(result => JSON.stringify(result.data) === firstResult);
      
      if (allIdentical) {
        addLog('✅ All calls returned identical data', 'success');
      } else {
        addLog('❌ Some calls returned different data', 'error');
      }
      
      results.forEach(result => {
        addLog(`Call ${result.callNumber}: completed at ${result.timestamp - startTime}ms`, 'info');
      });
      
      updateCacheInfo();
    } catch (error) {
      addLog(`❌ Error: ${error}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleClearCache = () => {
    clearProjectPageCache();
    addLog('🧹 All cache cleared', 'info');
    updateCacheInfo();
  };

  const handleClearSpecificCache = (endpoint: string) => {
    const cleared = clearSpecificCache(endpoint);
    addLog(`🧹 Cache for "${endpoint}" ${cleared ? 'cleared' : 'not found'}`, 'info');
    updateCacheInfo();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.8)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '20px',
        maxWidth: '800px',
        maxHeight: '80vh',
        overflow: 'auto',
        width: '100%'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>🧪 Project Page Cache Testing</h2>
          {onClose && (
            <button onClick={onClose} style={{ background: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px' }}>
              ✕ Close
            </button>
          )}
        </div>

        {/* Test Buttons */}
        <div style={{ marginBottom: '20px' }}>
          <h3>🔄 API Call Tests</h3>
          <button 
            onClick={testSingleCall} 
            disabled={loading}
            style={{ margin: '5px', padding: '10px 15px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}
          >
            Single Call
          </button>
          <button 
            onClick={testDoubleCall} 
            disabled={loading}
            style={{ margin: '5px', padding: '10px 15px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px' }}
          >
            Double Call
          </button>
          <button 
            onClick={testRapidCalls} 
            disabled={loading}
            style={{ margin: '5px', padding: '10px 15px', background: '#ffc107', color: 'black', border: 'none', borderRadius: '5px' }}
          >
            5 Rapid Calls
          </button>
        </div>

        {/* Cache Management */}
        <div style={{ marginBottom: '20px' }}>
          <h3>🗄️ Cache Management</h3>
          <button 
            onClick={updateCacheInfo}
            style={{ margin: '5px', padding: '10px 15px', background: '#17a2b8', color: 'white', border: 'none', borderRadius: '5px' }}
          >
            Check Cache Status
          </button>
          <button 
            onClick={handleClearCache}
            style={{ margin: '5px', padding: '10px 15px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '5px' }}
          >
            Clear All Cache
          </button>
          <button 
            onClick={() => handleClearSpecificCache('complete-page')}
            style={{ margin: '5px', padding: '10px 15px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '5px' }}
          >
            Clear Page Cache
          </button>
          <button 
            onClick={clearLogs}
            style={{ margin: '5px', padding: '10px 15px', background: '#6f42c1', color: 'white', border: 'none', borderRadius: '5px' }}
          >
            Clear Logs
          </button>
        </div>

        {/* Cache Info */}
        {cacheInfo && (
          <div style={{ marginBottom: '20px', padding: '10px', background: '#f8f9fa', borderRadius: '5px' }}>
            <h4>📊 Cache Information</h4>
            <p><strong>Total Entries:</strong> {cacheInfo.totalEntries}</p>
            <p><strong>Total Size:</strong> {(cacheInfo.totalSize / 1024).toFixed(2)} KB</p>
            <p><strong>Pending Requests:</strong> {cacheInfo.totalPending}</p>
            
            {cacheInfo.entries && cacheInfo.entries.length > 0 && (
              <div>
                <h5>📦 Cached Data:</h5>
                {cacheInfo.entries.map((entry: any, index: number) => (
                  <div key={index} style={{ fontSize: '12px', margin: '5px 0' }}>
                    <strong>{entry.key}:</strong> {(entry.size / 1024).toFixed(2)} KB, 
                    Age: {(entry.age / 1000).toFixed(1)}s, 
                    Valid: {entry.isValid ? '✅' : '❌'}
                  </div>
                ))}
              </div>
            )}

            {cacheInfo.pendingRequests && cacheInfo.pendingRequests.length > 0 && (
              <div>
                <h5>⏳ Pending Requests:</h5>
                {cacheInfo.pendingRequests.map((key: string, index: number) => (
                  <div key={index} style={{ fontSize: '12px', margin: '5px 0', color: '#ffc107' }}>
                    <strong>{key}</strong> (in progress...)
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Test Results */}
        <div>
          <h3>📝 Test Results</h3>
          <div style={{
            background: '#f8f9fa',
            padding: '10px',
            borderRadius: '5px',
            maxHeight: '300px',
            overflow: 'auto',
            fontFamily: 'monospace',
            fontSize: '12px',
            whiteSpace: 'pre-wrap'
          }}>
            {testResults.length === 0 ? (
              <span style={{ color: '#6c757d' }}>No test results yet. Run some tests above.</span>
            ) : (
              testResults.map((result, index) => {
                const [type, message] = result.split(': ', 2);
                const color = type === 'error' ? '#dc3545' : type === 'success' ? '#28a745' : '#6c757d';
                return (
                  <div key={index} style={{ color, marginBottom: '2px' }}>
                    {message}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {loading && (
          <div style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            background: 'rgba(255,255,255,0.8)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            borderRadius: '10px'
          }}>
            <div>🔄 Testing in progress...</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CacheTestComponent;
