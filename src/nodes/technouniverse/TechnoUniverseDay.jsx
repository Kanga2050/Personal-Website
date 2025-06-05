import React from 'react';
import { motion } from 'framer-motion';
import AmbientParticles from '../../components/AmbientParticles';
import SceneObject from '../../components/SceneObject';

const TechnoUniverseDay = ({ onNavigate, onToggleTime }) => {
  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #92400e, #b45309, #ea580c)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden'
  };

  const gridOverlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
    backgroundImage: 'linear-gradient(gold 1px, transparent 1px), linear-gradient(90deg, gold 1px, transparent 1px)',
    backgroundSize: '50px 50px'
  };

  const sceneContainerStyle = {
    position: 'relative',
    width: '100%',
    height: '100vh'
  };

  const titleContainerStyle = {
    position: 'absolute',
    left: '50%',
    top: '33.333333%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    zIndex: 10
  };

  const titleStyle = {
    fontSize: '96px',
    fontWeight: 'bold',
    background: 'linear-gradient(to right, #facc15, #fbbf24, #fb923c)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    marginBottom: '16px',
    letterSpacing: '0.1em'
  };

  const subtitleStyle = {
    color: '#fde047',
    fontSize: '20px',
    fontWeight: '300',
    letterSpacing: '0.05em'
  };

  const sunStyle = {
    position: 'absolute',
    top: '20px',
    left: '20px',
    fontSize: '80px',
    color: '#fbbf24',
    textShadow: '0 0 20px #facc15',
    zIndex: 10,
    cursor: 'pointer'
  };

  const dataStreamStyle1 = {
    position: 'absolute',
    left: '40px',
    top: '80px',
    color: '#facc15',
    fontFamily: 'monospace',
    fontSize: '14px',
    opacity: 0.6,
    lineHeight: 1.4
  };

  const dataStreamStyle2 = {
    position: 'absolute',
    right: '64px',
    bottom: '128px',
    color: '#fbbf24',
    fontFamily: 'monospace',
    fontSize: '14px',
    opacity: 0.6,
    lineHeight: 1.4
  };

  const geometricShape1Style = {
    position: 'absolute',
    left: '25%',
    top: '25%',
    width: '32px',
    height: '32px',
    border: '2px solid #facc15',
    opacity: 0.3
  };

  const geometricShape2Style = {
    position: 'absolute',
    right: '33.333333%',
    bottom: '33.333333%',
    width: '24px',
    height: '24px',
    backgroundColor: '#fbbf24',
    opacity: 0.4,
    transform: 'rotate(45deg)'
  };

  const instructionsStyle = {
    position: 'absolute',
    bottom: '32px',
    left: '50%',
    transform: 'translateX(-50%)',
    textAlign: 'center',
    color: 'rgba(253, 224, 71, 0.7)',
    fontFamily: 'monospace'
  };

  const scanLinesStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
    background: 'linear-gradient(transparent 48%, rgba(255,215,0,0.03) 49%, rgba(255,215,0,0.03) 51%, transparent 52%)',
    backgroundSize: '100% 4px'
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={containerStyle}
    >
      <AmbientParticles />
      <div style={gridOverlayStyle} />
      
      {/* Sun in top left */}
      <motion.div
        style={sunStyle}
        initial={{ scale: 0, rotate: 0 }}
        animate={{ scale: 1, rotate: 360 }}
        transition={{ duration: 2, ease: "easeOut" }}
        onClick={onToggleTime}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          ☀️
        </motion.div>
      </motion.div>
      
      <div style={sceneContainerStyle}>
        <motion.div
          style={titleContainerStyle}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h1 style={titleStyle}>
            MY UNIVERSE
          </h1>
          <p style={subtitleStyle}>
            // Click objects to explore different dimensions
          </p>
        </motion.div>

        <SceneObject
          x={20} y={45}
          size="64px"
          color="linear-gradient(135deg, #3b82f6, #06b6d4)"
          onClick={() => onNavigate('engineering')}
        >
          <motion.div
            style={{ fontSize: '32px' }}
            animate={{ rotateY: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            🔧
          </motion.div>
        </SceneObject>

        <SceneObject
          x={75} y={65}
          size="56px"
          color="linear-gradient(135deg, #8b5cf6, #ec4899)"
          onClick={() => onNavigate('memories')}
          hoverEffect="glow"
        >
          <motion.div
            style={{ fontSize: '20px' }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✨
          </motion.div>
        </SceneObject>

        <SceneObject
          x={50} y={20}
          size="60px"
          color="linear-gradient(135deg, #059669, #10b981)"
          onClick={() => onNavigate('projects')}
          hoverEffect="pulse"
        >
          <motion.div
            style={{ fontSize: '24px' }}
            animate={{ rotateZ: [0, 15, -15, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            💼
          </motion.div>
        </SceneObject>

        <motion.div
          style={dataStreamStyle1}
          animate={{ x: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          01101001<br/>
          11010110<br/>
          10101011
        </motion.div>

        <motion.div
          style={dataStreamStyle2}
          animate={{ x: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          neural.exe<br/>
          memory.dll<br/>
          dreams.sys
        </motion.div>

        <motion.div
          style={geometricShape1Style}
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        
        <motion.div
          style={geometricShape2Style}
          animate={{ rotate: [45, 405], y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        />

        <motion.div
          style={scanLinesStyle}
          animate={{ y: [-100, '100vh'] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />

        <motion.div
          style={instructionsStyle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <p style={{ fontSize: '12px', marginTop: '4px' }}>Hover over objects to reveal their secrets</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TechnoUniverseDay;
