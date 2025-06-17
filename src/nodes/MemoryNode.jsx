import React, { useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { getDestinationThemeColors } from '../utils/themeUtils';

const MemoryNode = ({ onNavigate }) => {
  // Memoized styles to prevent recreation
  const containerStyle = useMemo(() => ({
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #581c87, #be185d)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden'
  }), []);

  const contentStyle = useMemo(() => ({
    maxWidth: '896px',
    margin: '0 auto',
    padding: '32px',
    textAlign: 'center'
  }), []);

  const titleStyle = useMemo(() => ({
    fontSize: '72px',
    fontWeight: 'bold',
    marginBottom: '24px',
    background: 'linear-gradient(to right, #a78bfa, #f472b6)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent'
  }), []);

  const textStyle = useMemo(() => ({
    fontSize: '20px',
    color: '#e9d5ff',
    marginBottom: '48px',
    lineHeight: 1.6
  }), []);

  const baseButtonStyle = useMemo(() => ({
    padding: '16px 32px',
    color: 'white',
    fontWeight: 'bold',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    margin: '0 8px'
  }), []);

  const navigationStyle = useMemo(() => ({
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    flexWrap: 'wrap'
  }), []);

  // Memoized navigation handlers
  const handleTechnoNavigation = useCallback(() => {
    onNavigate('techno');
  }, [onNavigate]);

  const handleProjectsNavigation = useCallback(() => {
    onNavigate('projects');
  }, [onNavigate]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      style={containerStyle}
    >
      <div style={contentStyle}>
        <motion.h1 
          style={titleStyle}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Memory Constellation
        </motion.h1>
        
        <motion.p
          style={textStyle}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Fragments of time, crystallized into navigable space. Each memory a star in the vast cosmos of experience.
        </motion.p>

        <motion.div
          style={navigationStyle}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <motion.button
            style={{
              ...baseButtonStyle, 
              backgroundColor: getDestinationThemeColors('techno').primary,
              border: `2px solid ${getDestinationThemeColors('techno').border}`
            }}
            whileHover={{ 
              scale: 1.05, 
              backgroundColor: getDestinationThemeColors('techno').secondary,
              boxShadow: `0 5px 15px ${getDestinationThemeColors('techno').shadow}`
            }}
            whileTap={{ scale: 0.95 }}
            onClick={handleTechnoNavigation}
          >
            ← Return to My Universe
          </motion.button>
          
          <motion.button
            style={{
              ...baseButtonStyle, 
              backgroundColor: getDestinationThemeColors('projects').primary,
              border: `2px solid ${getDestinationThemeColors('projects').border}`
            }}
            whileHover={{ 
              scale: 1.05, 
              backgroundColor: getDestinationThemeColors('projects').secondary,
              boxShadow: `0 5px 15px ${getDestinationThemeColors('projects').shadow}`
            }}
            whileTap={{ scale: 0.95 }}
            onClick={handleProjectsNavigation}
          >
            Explore My Projects →
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default React.memo(MemoryNode);
