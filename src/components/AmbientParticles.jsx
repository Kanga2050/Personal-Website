import React, { useState, useEffect, useCallback, useMemo } from 'react';

const AmbientParticles = ({ color = '#fbbf24', opacity = 0.3, particleCount = 20 }) => {
  const [particles, setParticles] = useState([]);
  
  // Memoized particle creation
  const createParticles = useCallback(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 2 + 0.5,
      direction: Math.random() * Math.PI * 2
    }));
  }, [particleCount]);

  useEffect(() => {
    setParticles(createParticles());
    
    const interval = setInterval(() => {
      setParticles(prev => prev.map(p => ({
        ...p,
        x: (p.x + Math.cos(p.direction) * p.speed * 0.1) % 100,
        y: (p.y + Math.sin(p.direction) * p.speed * 0.1) % 100
      })));
    }, 100);
    
    return () => clearInterval(interval);
  }, [createParticles]);
  
  // Memoized styles
  const containerStyle = useMemo(() => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none'
  }), []);

  const getParticleStyle = useCallback((particle) => ({
    position: 'absolute',
    left: `${particle.x}%`,
    top: `${particle.y}%`,
    width: `${particle.size}px`,
    height: `${particle.size}px`,
    backgroundColor: `rgba(${hexToRgb(color)}, ${opacity})`,
    borderRadius: '50%',
    filter: 'blur(1px)',
    willChange: 'transform' // Optimize for animations
  }), [color, opacity]);

  // Helper function to convert hex to rgb
  const hexToRgb = useCallback((hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? 
      `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` :
      '251, 191, 36'; // fallback
  }, []);
  
  return (
    <div style={containerStyle}>
      {particles.map(particle => (
        <div
          key={particle.id}
          style={getParticleStyle(particle)}
        />
      ))}
    </div>
  );
};

export default React.memo(AmbientParticles);
