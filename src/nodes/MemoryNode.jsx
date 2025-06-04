import React from 'react';
import { motion } from 'framer-motion';

const MemoryNode = ({ onNavigate }) => {
  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #581c87, #be185d)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden'
  };

  const contentStyle = {
    maxWidth: '896px',
    margin: '0 auto',
    padding: '32px',
    textAlign: 'center'
  };

  const titleStyle = {
    fontSize: '72px',
    fontWeight: 'bold',
    marginBottom: '24px',
    background: 'linear-gradient(to right, #a78bfa, #f472b6)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent'
  };

  const textStyle = {
    fontSize: '20px',
    color: '#e9d5ff',
    marginBottom: '48px',
    lineHeight: 1.6
  };

  const buttonStyle = {
    padding: '16px 32px',
    backgroundColor: '#8b5cf6',
    color: 'white',
    fontWeight: 'bold',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };

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

        <motion.button
          style={buttonStyle}
          whileHover={{ scale: 1.05, backgroundColor: '#a78bfa' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate('techno')}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          ← Return to My Universe
        </motion.button>
      </div>
    </motion.div>
  );
};

export default MemoryNode;
