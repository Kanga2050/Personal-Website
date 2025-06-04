import React from 'react';
import { motion } from 'framer-motion';

const EngineeringNode = ({ onNavigate }) => {
  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1e3a8a, #312e81)',
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
    background: 'linear-gradient(to right, #60a5fa, #22d3ee)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent'
  };

  const textStyle = {
    fontSize: '20px',
    color: '#bfdbfe',
    marginBottom: '48px',
    lineHeight: 1.6
  };

  const buttonStyle = {
    padding: '16px 32px',
    backgroundColor: '#3b82f6',
    color: 'white',
    fontWeight: 'bold',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      style={containerStyle}
    >
      <div style={contentStyle}>
        <motion.h1 
          style={titleStyle}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Engineering Cosmos
        </motion.h1>
        
        <motion.p
          style={textStyle}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          The mechanical universe where logic meets creativity. Here, algorithms dance with imagination.
        </motion.p>

        <motion.button
          style={buttonStyle}
          whileHover={{ scale: 1.05, backgroundColor: '#60a5fa' }}
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

export default EngineeringNode;
