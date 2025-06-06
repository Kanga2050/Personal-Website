import React from 'react';
import { motion } from 'framer-motion';

const YinYangNode = ({ 
  node, 
  index, 
  position, 
  isCurrent, 
  isNightMode,
  hoveredNode,
  yinYangHoverSide,
  onHover,
  onHoverEnd,
  onToggleTime,
  onNavigate,
  onClose
}) => {
  
  const handleYinYangClick = (clickX, isCurrent) => {
    if (isCurrent) {
      // If we're on the current node, toggle between day/night
      onToggleTime();
    } else {
      // If navigating to node, determine day/night based on click position
      const centerX = position.x;
      const isLeftSide = clickX < centerX;
      
      // Navigate to node first
      onNavigate(node.id);
      onClose();
      
      // Then set the appropriate mode after a brief delay
      setTimeout(() => {
        // Left side (yin/dark) = night mode, Right side (yang/light) = day mode
        if ((isLeftSide && !isNightMode) || (!isLeftSide && isNightMode)) {
          onToggleTime();
        }
      }, 100);
    }
  };

  const nodeTextStyle = {
    fill: 'white',
    fontSize: '10px',
    textAnchor: 'middle',
    dominantBaseline: 'middle',
    pointerEvents: 'none'
  };

  const getHoverHaloColor = () => {
    if (yinYangHoverSide === 'yin') {
      // Night mode colors - purple/dark
      return '#8b5cf6';
    } else if (yinYangHoverSide === 'yang') {
      // Day mode colors - yellow/light
      return '#facc15';
    }
    // Default color when no specific side is hovered
    return '#facc15';
  };

  return (
    <g>
      {/* Define gradients for yin-yang */}
      <defs>
        {/* Yang (light/day) gradient - yellow to orange */}
        <linearGradient id={`yangGradient-${node.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
        
        {/* Yin (dark/night) gradient - purple to pink */}
        <linearGradient id={`yinGradient-${node.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
      
      {/* Invisible hover zones for yin-yang sides */}
      {/* Left side (Yin) hover zone */}
      <motion.path
        d={`M ${position.x - (isCurrent ? 20 : 15)} ${position.y}
            A ${isCurrent ? 20 : 15} ${isCurrent ? 20 : 15} 0 0 1 ${position.x} ${position.y - (isCurrent ? 20 : 15)}
            A ${isCurrent ? 20 : 15} ${isCurrent ? 20 : 15} 0 0 1 ${position.x} ${position.y + (isCurrent ? 20 : 15)}
            Z`}
        fill="transparent"
        style={{ cursor: 'pointer' }}
        onMouseEnter={() => onHover(node.id, 'yin')}
        onMouseLeave={() => onHoverEnd()}
        onClick={(e) => {
          if (isCurrent) {
            // If current node, toggle to night mode
            if (!isNightMode) onToggleTime();
          } else {
            // If not current, navigate and set to night mode
            const rect = e.target.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            handleYinYangClick(clickX, isCurrent);
          }
        }}
      />
      
      {/* Right side (Yang) hover zone */}
      <motion.path
        d={`M ${position.x} ${position.y - (isCurrent ? 20 : 15)}
            A ${isCurrent ? 20 : 15} ${isCurrent ? 20 : 15} 0 0 1 ${position.x + (isCurrent ? 20 : 15)} ${position.y}
            A ${isCurrent ? 20 : 15} ${isCurrent ? 20 : 15} 0 0 1 ${position.x} ${position.y + (isCurrent ? 20 : 15)}
            Z`}
        fill="transparent"
        style={{ cursor: 'pointer' }}
        onMouseEnter={() => onHover(node.id, 'yang')}
        onMouseLeave={() => onHoverEnd()}
        onClick={(e) => {
          if (isCurrent) {
            // If current node, toggle to day mode  
            if (isNightMode) onToggleTime();
          } else {
            // If not current, navigate and set to day mode
            const rect = e.target.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            handleYinYangClick(clickX, isCurrent);
          }
        }}
      />
      
      {/* Yin-Yang design */}
      <motion.g
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: index * 0.1 }}
        style={{ pointerEvents: 'none' }}
      >
        {/* Yang (light) background circle */}
        <circle
          cx={position.x}
          cy={position.y}
          r={isCurrent ? 20 : 15}
          fill={`url(#yangGradient-${node.id})`}
          stroke={isCurrent ? 'white' : 'rgba(255, 255, 255, 0.3)'}
          strokeWidth={isCurrent ? 1.5 : 1}
        />
        
        {/* Yin (dark) half - teardrop shape */}
        <path
          d={`M ${position.x} ${position.y - (isCurrent ? 20 : 15)}
              A ${isCurrent ? 20 : 15} ${isCurrent ? 20 : 15} 0 0 0 ${position.x} ${position.y + (isCurrent ? 20 : 15)}
              A ${(isCurrent ? 20 : 15)/2} ${(isCurrent ? 20 : 15)/2} 0 0 0 ${position.x} ${position.y}
              A ${(isCurrent ? 20 : 15)/2} ${(isCurrent ? 20 : 15)/2} 0 0 1 ${position.x} ${position.y - (isCurrent ? 20 : 15)}
              Z`}
          fill={`url(#yinGradient-${node.id})`}
        />
        
        {/* Small yin (dark) circle in yang side */}
        <circle
          cx={position.x}
          cy={position.y - (isCurrent ? 10 : 7.5)}
          r={(isCurrent ? 4 : 3)}
          fill={`url(#yinGradient-${node.id})`}
        />
        
        {/* Small yang (light) circle in yin side */}
        <circle
          cx={position.x}
          cy={position.y + (isCurrent ? 10 : 7.5)}
          r={(isCurrent ? 4 : 3)}
          fill={`url(#yangGradient-${node.id})`}
        />
      </motion.g>
      
      <motion.text
        x={position.x}
        y={position.y + 30}
        style={nodeTextStyle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.1 + 0.2 }}
      >
        {node.title.length > 12 ? node.title.substring(0, 12) + '...' : node.title}
      </motion.text>
      
      {/* Add hover halo effect */}
      {hoveredNode === node.id && (
        <motion.circle
          cx={position.x}
          cy={position.y}
          r={isCurrent ? 20 : 15}
          fill="none"
          stroke={getHoverHaloColor()}
          strokeWidth={3}
          opacity={0.8}
          initial={{ scale: 1, opacity: 0 }}
          animate={{ scale: isCurrent ? 1.2 : 1.4, opacity: 0.8 }}
          transition={{ duration: 0.2 }}
        />
      )}
      
      {/* Add pulsing effect for current node */}
      {isCurrent && (
        <motion.circle
          cx={position.x}
          cy={position.y}
          r={20}
          fill="none"
          stroke="rgba(255, 255, 255, 0.6)"
          strokeWidth={2}
          opacity={0.3}
          animate={{ r: [20, 30, 20], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </g>
  );
};

export default YinYangNode;
