import React, { useState, useEffect, useRef } from 'react';

const ParticleSystem = ({ isActive, trigger, origin = { x: 0, y: 0 } }) => {
  const [particles, setParticles] = useState([]);
  const particleId = useRef(0);

  useEffect(() => {
    const createParticle = () => {
      const angle = Math.random() * Math.PI * 2;
      const velocity = 2 + Math.random() * 4;
      const life = 1 + Math.random() * 2;
      
      return {
        id: particleId.current++,
        x: origin.x,
        y: origin.y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        life: life,
        maxLife: life,
        size: 2 + Math.random() * 3
      };
    };

    const interval = setInterval(() => {
      setParticles(prev => {
        const newParticles = [...prev];
        
        if (isActive) {
          for (let i = 0; i < 3; i++) {
            newParticles.push(createParticle());
          }
        }
        
        return newParticles
          .map(p => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            life: p.life - 0.02,
            vx: p.vx * 0.99,
            vy: p.vy * 0.99
          }))
          .filter(p => p.life > 0);
      });
    }, 50);

    if (trigger) {
      const burstParticles = [];
      for (let i = 0; i < 20; i++) {
        burstParticles.push(createParticle());
      }
      setParticles(prev => [...prev, ...burstParticles]);
    }

    return () => clearInterval(interval);
  }, [isActive, trigger, origin.x, origin.y]);

  const particleSystemStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none'
  };

  const particleStyle = (particle) => ({
    position: 'absolute',
    width: '4px',
    height: '4px',
    backgroundColor: '#facc15',
    borderRadius: '50%',
    left: `${particle.x}px`,
    top: `${particle.y}px`,
    opacity: particle.life / particle.maxLife,
    transform: `scale(${particle.life / particle.maxLife})`,
    transition: 'all 0.05s linear'
  });

  return (
    <div style={particleSystemStyle}>
      {particles.map(particle => (
        <div
          key={particle.id}
          style={particleStyle(particle)}
        />
      ))}
    </div>
  );
};

export default ParticleSystem;
