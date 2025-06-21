import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ParticleSystem from './ParticleSystem';
import { getTheme } from '../theme/universalTheme';

const UniverseButton = ({ onTransition }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [burstTrigger, setBurstTrigger] = useState(0);
  const [buttonPos, setButtonPos] = useState({ x: 0, y: 0 });
  const buttonRef = useRef(null);

  useEffect(() => {
    const updateButtonPosition = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setButtonPos({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        });
      }
    };

    updateButtonPosition();
    window.addEventListener('resize', updateButtonPosition);
    
    return () => window.removeEventListener('resize', updateButtonPosition);
  }, []);

  const handleClick = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setButtonPos({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      });
    }
    
    setIsActive(true);
    setBurstTrigger(prev => prev + 1);
    
    setTimeout(() => {
      onTransition();
    }, 800);
  };

  const technoTheme = getTheme('yellow-techno');

  const buttonStyle = {
    position: 'relative',
    padding: '12px 24px',
    backgroundColor: technoTheme.colors.primary,
    color: '#000000', // Black text for high contrast on yellow background
    fontWeight: 'bold',
    fontSize: '20px',
    borderRadius: '8px',
    border: `2px solid ${technoTheme.colors.tertiary || technoTheme.colors.primary}`,
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'all 0.3s ease',
    textShadow: '1px 1px 2px rgba(255, 255, 255, 0.3)', // Light shadow for better visibility
    boxShadow: isHovered ? `0 0 20px ${technoTheme.colors.primary}80` : `0 0 10px ${technoTheme.colors.primary}50`
  };

  return (
    <>
      <motion.button
        ref={buttonRef}
        style={buttonStyle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        __
      </motion.button>
      
      <ParticleSystem 
        isActive={isHovered || isActive} 
        trigger={burstTrigger}
        origin={buttonPos}
        particleColor={technoTheme.colors.primary}
      />
    </>
  );
};

export default UniverseButton;
