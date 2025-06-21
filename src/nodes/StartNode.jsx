import React from 'react';
import { motion } from 'framer-motion';
import UniverseButton from '../components/UniverseButton';
import { getTheme, getSiteReference } from '../theme/universalTheme';

const StartNode = ({ onTransition }) => {
  // Get theme for start node
  const siteRef = getSiteReference('start');
  const theme = getTheme(siteRef.themeId);

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#000000', // Pure black background
    color: 'white', // White text
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden'
  };

  const contentStyle = {
    textAlign: 'center',
    zIndex: 10
  };

  const titleStyle = {
    fontSize: '72px',
    fontWeight: '300',
    marginBottom: '32px',
    letterSpacing: '0.1em',
    color: 'white' // Ensure title text is white
  };

  const subtitleStyle = {
    color: '#9ca3af', // Light gray for subtitle
    fontSize: '18px',
    maxWidth: '448px',
    margin: '0 auto'
  };

  const buttonContainerStyle = {
    display: 'inline-block',
    marginRight: '16px'
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={containerStyle}
    >
      <div style={contentStyle}>
        <motion.h1 
          style={titleStyle}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span style={buttonContainerStyle}>
            <UniverseButton onTransition={onTransition} />
          </span>
          Universe
        </motion.h1>
        <motion.p
          style={subtitleStyle}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Click to enter the memory graph
        </motion.p>
      </div>
    </motion.div>
  );
};

export default StartNode;
