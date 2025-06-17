import React, { useState, useEffect, memo } from 'react';

const PerformanceMonitor = ({ enabled = false }) => {
  const [fps, setFps] = useState(0);
  const [memoryUsage, setMemoryUsage] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    let frameCount = 0;
    let lastTime = performance.now();
    let animationId;

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastTime = currentTime;
        
        // Measure memory usage if available
        if (performance.memory) {
          setMemoryUsage(Math.round(performance.memory.usedJSHeapSize / 1024 / 1024));
        }
      }
      
      animationId = requestAnimationFrame(measureFPS);
    };

    animationId = requestAnimationFrame(measureFPS);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [enabled]);

  if (!enabled) return null;

  const containerStyle = {
    position: 'fixed',
    top: '10px',
    left: '10px',
    background: 'rgba(0, 0, 0, 0.8)',
    color: 'white',
    padding: '8px 12px',
    borderRadius: '4px',
    fontSize: '12px',
    fontFamily: 'monospace',
    zIndex: 9999,
    border: '1px solid rgba(255, 255, 255, 0.2)'
  };

  return (
    <div style={containerStyle}>
      <div>FPS: {fps}</div>
      {memoryUsage > 0 && <div>Memory: {memoryUsage}MB</div>}
    </div>
  );
};

export default memo(PerformanceMonitor);
