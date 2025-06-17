import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

const ParticleSystem = ({ isActive, trigger, origin = { x: 0, y: 0 }, particleColor = '#facc15', particleCount = 100, speed = 0.5 }) => {
  const [particles, setParticles] = useState([]);
  const particleId = useRef(0);
  const intervalRef = useRef(null);

  // Memoized particle creation function
  const createParticle = useCallback(() => {
    const angle = Math.random() * Math.PI * 2;
    const velocity = 2 + Math.random() * 4 * speed;
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
  }, [origin.x, origin.y, speed]);

  // Optimize particle updates with useCallback
  const updateParticles = useCallback(() => {
    setParticles(prev => {
      const newParticles = [...prev];
      
      if (isActive && newParticles.length < particleCount) {
        const particlesToAdd = Math.min(3, particleCount - newParticles.length);
        for (let i = 0; i < particlesToAdd; i++) {
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
  }, [isActive, particleCount, createParticle]);

  useEffect(() => {
    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(updateParticles, 50);

    if (trigger) {
      const burstParticles = [];
      for (let i = 0; i < 20; i++) {
        burstParticles.push(createParticle());
      }
      setParticles(prev => [...prev, ...burstParticles]);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [updateParticles, trigger, createParticle]);

  // Memoized styles
  const particleSystemStyle = useMemo(() => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none'
  }), []);

  const getParticleStyle = useCallback((particle) => ({
    position: 'absolute',
    width: '4px',
    height: '4px',
    backgroundColor: particleColor,
    borderRadius: '50%',
    left: `${particle.x}px`,
    top: `${particle.y}px`,
    opacity: particle.life / particle.maxLife,
    transform: `scale(${particle.life / particle.maxLife})`,
    transition: 'all 0.05s linear'
  }), [particleColor]);
  return (
    <div style={particleSystemStyle}>
      {particles.map(particle => (
        <div
          key={particle.id}
          style={getParticleStyle(particle)}
        />
      ))}
    </div>
  );
};

export default React.memo(ParticleSystem);
