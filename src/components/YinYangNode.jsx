import React from 'react';
import { motion } from 'framer-motion';
import { getTheme, getSiteReference } from '../theme/universalTheme';

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
      // Keep menu open for continued navigation
      
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
      // Yin side - use night/dark theme (nostalgic purple)
      const yinSiteRef = getSiteReference('memories');
      const yinTheme = getTheme(yinSiteRef.themeId);
      return yinTheme.colors.primary;
    } else if (yinYangHoverSide === 'yang') {
      // Yang side - use day/light theme (yellow-techno)
      const yangSiteRef = getSiteReference('techno');
      const yangTheme = getTheme(yangSiteRef.themeId);
      return yangTheme.colors.primary;
    }
    // Default color when no specific side is hovered
    const defaultSiteRef = getSiteReference('techno');
    const defaultTheme = getTheme(defaultSiteRef.themeId);
    return defaultTheme.colors.primary;
  };

  const nodeRadius = isCurrent ? 20 : 15;
  
  // Get theme colors for both sides of the yin-yang
  const yangSiteRef = getSiteReference('techno'); // Light/day side
  const yangTheme = getTheme(yangSiteRef.themeId);
  
  const yinSiteRef = getSiteReference('memories'); // Dark/night side  
  const yinTheme = getTheme(yinSiteRef.themeId);

  return (
    <g>
      {/* Define gradients for yin-yang */}
      <defs>
        {/* Yang (light/day) gradient - use techno theme colors */}
        <linearGradient id={`yangGradient-${node.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={yangTheme.colors.primary} />
          <stop offset="100%" stopColor={yangTheme.colors.tertiary || yangTheme.colors.primary} />
        </linearGradient>
        
        {/* Yin (dark/night) gradient - use memories theme colors */}
        <linearGradient id={`yinGradient-${node.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={yinTheme.colors.primary} />
          <stop offset="100%" stopColor={yinTheme.colors.secondary || yinTheme.colors.primary} />
        </linearGradient>
      </defs>
      
      {/* Invisible hover zones for yin-yang sides */}
      {/* Left side (Yin) hover zone */}
      <motion.path
        d={`M ${position.x - nodeRadius} ${position.y}
            A ${nodeRadius} ${nodeRadius} 0 0 1 ${position.x} ${position.y - nodeRadius}
            A ${nodeRadius} ${nodeRadius} 0 0 1 ${position.x} ${position.y + nodeRadius}
            Z`}
        fill="transparent"
        style={{ cursor: 'pointer' }}
        onMouseEnter={() => onHover(node.id, 'yin')}
        onMouseLeave={() => onHoverEnd()}
        onClick={(e) => {
          e.stopPropagation(); // Prevent background click
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
        animate={{
          d: `M ${position.x - nodeRadius} ${position.y}
              A ${nodeRadius} ${nodeRadius} 0 0 1 ${position.x} ${position.y - nodeRadius}
              A ${nodeRadius} ${nodeRadius} 0 0 1 ${position.x} ${position.y + nodeRadius}
              Z`
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
      
      {/* Right side (Yang) hover zone */}
      <motion.path
        d={`M ${position.x} ${position.y - nodeRadius}
            A ${nodeRadius} ${nodeRadius} 0 0 1 ${position.x + nodeRadius} ${position.y}
            A ${nodeRadius} ${nodeRadius} 0 0 1 ${position.x} ${position.y + nodeRadius}
            Z`}
        fill="transparent"
        style={{ cursor: 'pointer' }}
        onMouseEnter={() => onHover(node.id, 'yang')}
        onMouseLeave={() => onHoverEnd()}
        onClick={(e) => {
          e.stopPropagation(); // Prevent background click
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
        animate={{
          d: `M ${position.x} ${position.y - nodeRadius}
              A ${nodeRadius} ${nodeRadius} 0 0 1 ${position.x + nodeRadius} ${position.y}
              A ${nodeRadius} ${nodeRadius} 0 0 1 ${position.x} ${position.y + nodeRadius}
              Z`
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      />
      
      {/* Yang (light) background circle - uses same animation pattern as regular nodes */}
      <motion.circle
        cx={position.x}
        cy={position.y}
        r={nodeRadius}
        fill={`url(#yangGradient-${node.id})`}
        stroke={isCurrent ? 'white' : 'rgba(255, 255, 255, 0.3)'}
        strokeWidth={isCurrent ? 3 : 2}
        style={{ cursor: 'pointer', pointerEvents: 'none' }}
        initial={{ scale: 0 }}
        animate={{ 
          scale: 1,
          cx: position.x,
          cy: position.y,
          r: nodeRadius
        }}
        transition={{ 
          scale: { delay: index * 0.1 },
          cx: { duration: 0.6, ease: "easeInOut" },
          cy: { duration: 0.6, ease: "easeInOut" },
          r: { duration: 0.3, ease: "easeInOut" }
        }}
      />
      
      {/* Yin (dark) half - teardrop shape */}
      <motion.path
        d={`M ${position.x} ${position.y - nodeRadius}
            A ${nodeRadius} ${nodeRadius} 0 0 0 ${position.x} ${position.y + nodeRadius}
            A ${nodeRadius/2} ${nodeRadius/2} 0 0 0 ${position.x} ${position.y}
            A ${nodeRadius/2} ${nodeRadius/2} 0 0 1 ${position.x} ${position.y - nodeRadius}
            Z`}
        fill={`url(#yinGradient-${node.id})`}
        style={{ pointerEvents: 'none' }}
        initial={{ scale: 0 }}
        animate={{ 
          scale: 1,
          d: `M ${position.x} ${position.y - nodeRadius}
              A ${nodeRadius} ${nodeRadius} 0 0 0 ${position.x} ${position.y + nodeRadius}
              A ${nodeRadius/2} ${nodeRadius/2} 0 0 0 ${position.x} ${position.y}
              A ${nodeRadius/2} ${nodeRadius/2} 0 0 1 ${position.x} ${position.y - nodeRadius}
              Z`
        }}
        transition={{ 
          scale: { delay: index * 0.1 },
          d: { duration: 0.6, ease: "easeInOut" }
        }}
      />
      
      {/* Small yin (dark) circle in yang side */}
      <motion.circle
        cx={position.x}
        cy={position.y - nodeRadius/2}
        r={nodeRadius/5}
        fill={`url(#yinGradient-${node.id})`}
        style={{ pointerEvents: 'none' }}
        initial={{ scale: 0 }}
        animate={{ 
          scale: 1,
          cx: position.x,
          cy: position.y - nodeRadius/2,
          r: nodeRadius/5
        }}
        transition={{ 
          scale: { delay: index * 0.1 + 0.1 },
          cx: { duration: 0.6, ease: "easeInOut" },
          cy: { duration: 0.6, ease: "easeInOut" },
          r: { duration: 0.3, ease: "easeInOut" }
        }}
      />
      
      {/* Small yang (light) circle in yin side */}
      <motion.circle
        cx={position.x}
        cy={position.y + nodeRadius/2}
        r={nodeRadius/5}
        fill={`url(#yangGradient-${node.id})`}
        style={{ pointerEvents: 'none' }}
        initial={{ scale: 0 }}
        animate={{ 
          scale: 1,
          cx: position.x,
          cy: position.y + nodeRadius/2,
          r: nodeRadius/5
        }}
        transition={{ 
          scale: { delay: index * 0.1 + 0.1 },
          cx: { duration: 0.6, ease: "easeInOut" },
          cy: { duration: 0.6, ease: "easeInOut" },
          r: { duration: 0.3, ease: "easeInOut" }
        }}
      />

      {/* Node text - same animation pattern as regular nodes */}
      <motion.text
        x={position.x}
        y={position.y + 30}
        style={nodeTextStyle}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          x: position.x,
          y: position.y + 30
        }}
        transition={{ 
          opacity: { delay: index * 0.1 + 0.2 },
          x: { duration: 0.6, ease: "easeInOut" },
          y: { duration: 0.6, ease: "easeInOut" }
        }}
      >
        {node.title.length > 12 ? node.title.substring(0, 12) + '...' : node.title}
      </motion.text>
      

      
      {/* Add hover halo effect - same as regular nodes */}
      {hoveredNode === node.id && (
        <motion.circle
          cx={position.x}
          cy={position.y}
          r={nodeRadius}
          fill="none"
          stroke={getHoverHaloColor()}
          strokeWidth={3}
          opacity={0.8}
          initial={{ scale: 1, opacity: 0 }}
          animate={{ 
            scale: isCurrent ? 1.2 : 1.4, 
            opacity: 0.8,
            cx: position.x,
            cy: position.y
          }}
          transition={{ 
            scale: { duration: 0.2 },
            opacity: { duration: 0.2 },
            cx: { duration: 0.6, ease: "easeInOut" },
            cy: { duration: 0.6, ease: "easeInOut" }
          }}
        />
      )}
      
      {/* Add pulsing effect for current node - same as regular nodes */}
      {isCurrent && (
        <motion.circle
          cx={position.x}
          cy={position.y}
          r={nodeRadius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.6)"
          strokeWidth={2}
          opacity={0.3}
          animate={{ 
            r: [nodeRadius, nodeRadius + 10, nodeRadius], 
            opacity: [0.3, 0, 0.3],
            cx: position.x,
            cy: position.y
          }}
          transition={{ 
            r: { duration: 2, repeat: Infinity },
            opacity: { duration: 2, repeat: Infinity },
            cx: { duration: 0.6, ease: "easeInOut" },
            cy: { duration: 0.6, ease: "easeInOut" }
          }}
        />
      )}
    </g>
  );
};

export default YinYangNode;
