import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SceneObject = ({ x, y, size, color, onClick, children, hoverEffect = "pulse" }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const containerStyle = {
    position: 'absolute',
    left: `${x}%`,
    top: `${y}%`,
    cursor: 'pointer'
  };

  const objectStyle = {
    position: 'relative',
    width: size,
    height: size,
    background: color,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    boxShadow: isHovered ? `0 0 20px ${color}` : 'none'
  };

  const ringStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '50%',
    border: '2px solid rgba(255, 255, 255, 0.5)'
  };

  return (
    <motion.div
      style={containerStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ 
        scale: hoverEffect === "pulse" ? 1.1 : 1.05,
        filter: "brightness(1.2)"
      }}
      whileTap={{ scale: 0.95 }}
    >
      <div style={objectStyle}>
        {children}
        {isHovered && (
          <motion.div
            style={ringStyle}
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 1 }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          />
        )}
      </div>
    </motion.div>
  );
};

export default SceneObject;
