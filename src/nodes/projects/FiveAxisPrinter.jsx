import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ParticleSystem from '../../components/ParticleSystem';
import AmbientParticles from '../../components/AmbientParticles';
import { createDestinationStyledHandler } from '../../utils/themeUtils';

const FiveAxisPrinter = ({ onNavigate, projectsHubTarget }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nodeStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1a4a2e 0%, #0d2818 50%, #051a0d 100%)',
    color: '#00ff88',
    fontFamily: 'Arial, sans-serif',
    position: 'relative',
    overflow: 'hidden',
    padding: '20px'
  };

  const containerStyle = {
    position: 'relative',
    zIndex: 10,
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px'
  };

  const titleStyle = {
    fontSize: '3.5rem',
    fontWeight: 'bold',
    marginBottom: '2rem',
    textAlign: 'center',
    textShadow: '0 0 20px #00ff88',
    background: 'linear-gradient(45deg, #00ff88, #66ffaa, #00ff88)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  };

  const sectionStyle = {
    marginBottom: '3rem',
    background: 'rgba(0, 255, 136, 0.05)',
    padding: '2rem',
    borderRadius: '15px',
    border: '1px solid rgba(0, 255, 136, 0.2)'
  };

  const sectionTitleStyle = {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#66ffaa'
  };

  const textStyle = {
    fontSize: '1.1rem',
    lineHeight: '1.7',
    marginBottom: '1rem',
    opacity: 0.9
  };

  const featureListStyle = {
    paddingLeft: '1.5rem',
    marginBottom: '1rem'
  };

  const featureItemStyle = {
    fontSize: '1rem',
    lineHeight: '1.6',
    marginBottom: '0.5rem',
    opacity: 0.85
  };

  const navBoxStyle = {
    display: 'inline-block',
    padding: '1rem 2rem',
    margin: '0.5rem',
    border: '2px solid rgba(0, 255, 136, 0.5)',
    borderRadius: '12px',
    background: 'rgba(0, 255, 136, 0.1)',
    color: '#00ff88',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    fontSize: '1.1rem',
    fontWeight: 'bold'
  };

  return (
    <div style={nodeStyle}>
      <canvas 
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />
      
      <ParticleSystem 
        canvasRef={canvasRef}
        particleColor="#00ff88"
        particleCount={100}
        speed={0.6}
      />
      
      <AmbientParticles 
        canvasRef={canvasRef}
        color="#00ff88"
        opacity={0.3}
      />

      <motion.div 
        style={containerStyle}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.h1 
          style={titleStyle}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          5-Axis 3D Printer
        </motion.h1>

        <motion.div 
          style={sectionStyle}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 style={sectionTitleStyle}>Project Overview</h2>
          <p style={textStyle}>
            Revolutionary 5-axis 3D printer that can rotate and tilt the print bed during printing, 
            enabling complex overhangs and internal structures without support material. This advanced 
            manufacturing system represents a breakthrough in additive manufacturing technology.
          </p>
          <p style={textStyle}>
            The printer combines traditional FDM printing with CNC-style 5-axis motion control, 
            allowing for unprecedented geometric freedom and material efficiency.
          </p>
        </motion.div>

        <motion.div 
          style={sectionStyle}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 style={sectionTitleStyle}>Key Features</h2>
          <ul style={featureListStyle}>
            <li style={featureItemStyle}>Simultaneous 5-axis motion control with real-time kinematics</li>
            <li style={featureItemStyle}>Custom G-code interpreter for complex toolpaths</li>
            <li style={featureItemStyle}>Real-time collision detection algorithms</li>
            <li style={featureItemStyle}>Automatic calibration and bed leveling system</li>
            <li style={featureItemStyle}>Multi-material printing capabilities</li>
            <li style={featureItemStyle}>Support-free printing for complex geometries</li>
            <li style={featureItemStyle}>Heated chamber for advanced materials</li>
          </ul>
        </motion.div>

        <motion.div 
          style={sectionStyle}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 style={sectionTitleStyle}>Technical Specifications</h2>
          <p style={textStyle}>
            <strong>Motion System:</strong> Custom Arduino-based control with stepper motor drivers
          </p>
          <p style={textStyle}>
            <strong>Print Volume:</strong> 200mm x 200mm x 150mm with full 5-axis accessibility
          </p>
          <p style={textStyle}>
            <strong>Layer Resolution:</strong> 0.05mm - 0.3mm variable layer heights
          </p>
          <p style={textStyle}>
            <strong>Materials:</strong> PLA, PETG, ABS, TPU, Carbon Fiber composites
          </p>
        </motion.div>

        <motion.div 
          style={sectionStyle}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <h2 style={sectionTitleStyle}>Current Status</h2>
          <p style={textStyle}>
            Prototype complete with successful test prints demonstrating complex geometries. 
            Currently optimizing slicing algorithms and refining motion control for production readiness.
          </p>
          <p style={textStyle}>
            <strong>Next Steps:</strong> Implementing advanced path planning algorithms and 
            developing user-friendly slicing software.
          </p>
        </motion.div>

        <motion.div
          style={{ textAlign: 'center', marginTop: '3rem' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div
            style={{
              ...navBoxStyle,
              ...createDestinationStyledHandler('projects').style
            }}
            onClick={() => onNavigate(projectsHubTarget || 'projects')}
            onMouseEnter={createDestinationStyledHandler('projects').onMouseEnter}
            onMouseLeave={createDestinationStyledHandler('projects').onMouseLeave}
          >
            ← Back to Projects
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FiveAxisPrinter;
