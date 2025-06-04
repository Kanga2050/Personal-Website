import React, { useState, useEffect } from 'react';

const AmbientParticles = () => {
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    const createParticles = () => {
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 2 + 0.5,
        direction: Math.random() * Math.PI * 2
      }));
      setParticles(newParticles);
    };
    
    createParticles();
    
    const interval = setInterval(() => {
      setParticles(prev => prev.map(p => ({
        ...p,
        x: (p.x + Math.cos(p.direction) * p.speed * 0.1) % 100,
        y: (p.y + Math.sin(p.direction) * p.speed * 0.1) % 100
      })));
    }, 100);
    
    return () => clearInterval(interval);
  }, []);
  
  const containerStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none'
  };

  const particleStyle = (particle) => ({
    position: 'absolute',
    left: `${particle.x}%`,
    top: `${particle.y}%`,
    width: `${particle.size}px`,
    height: `${particle.size}px`,
    backgroundColor: 'rgba(251, 191, 36, 0.3)',
    borderRadius: '50%',
    filter: 'blur(1px)'
  });
  
  return (
    <div style={containerStyle}>
      {particles.map(particle => (
        <div
          key={particle.id}
          style={particleStyle(particle)}
        />
      ))}
    </div>
  );
};

export default AmbientParticles;
