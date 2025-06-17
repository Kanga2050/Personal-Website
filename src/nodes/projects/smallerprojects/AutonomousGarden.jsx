import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ParticleSystem from '../../../components/ParticleSystem';
import AmbientParticles from '../../../components/AmbientParticles';
import { createDestinationStyledHandler } from '../../../utils/themeUtils';

const AutonomousGarden = ({ onNavigate }) => {
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
    background: 'linear-gradient(135deg, #14532d 0%, #166534 50%, #16a34a 100%)',
    color: '#86efac',
    fontFamily: 'Arial, sans-serif',
    position: 'relative',
    overflow: 'hidden',
    padding: '20px'
  };

  const containerStyle = {
    position: 'relative',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '40px'
  };

  const titleStyle = {
    fontSize: '3.5rem',
    fontWeight: 'bold',
    marginBottom: '2rem',
    textAlign: 'center',
    color: '#bbf7d0',
    textShadow: '0 0 20px rgba(187, 247, 208, 0.5)'
  };

  const sectionStyle = {
    backgroundColor: 'rgba(134, 239, 172, 0.1)',
    borderRadius: '15px',
    padding: '2rem',
    marginBottom: '2rem',
    maxWidth: '800px',
    width: '100%',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(134, 239, 172, 0.2)'
  };

  const sectionTitleStyle = {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#bbf7d0'
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
    border: '2px solid rgba(134, 239, 172, 0.5)',
    borderRadius: '12px',
    background: 'rgba(134, 239, 172, 0.1)',
    color: '#86efac',
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
        particleColor="#86efac"
        particleCount={110}
        speed={0.5}
      />
      
      <AmbientParticles 
        canvasRef={canvasRef}
        color="#86efac"
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
          Autonomous Garden System
        </motion.h1>

        <motion.div 
          style={sectionStyle}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 style={sectionTitleStyle}>Project Overview</h2>
          <p style={textStyle}>
            AI-driven smart irrigation and plant health monitoring system that autonomously manages 
            garden care through advanced sensor networks and machine learning algorithms. This system 
            optimizes water usage while maximizing plant health and growth.
          </p>
          <p style={textStyle}>
            Solar-powered and fully autonomous, the system learns plant requirements over time 
            and adapts to changing environmental conditions for optimal garden management.
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
            <li style={featureItemStyle}>Multi-zone soil moisture and pH monitoring sensors</li>
            <li style={featureItemStyle}>Automated drip irrigation with zone-specific control</li>
            <li style={featureItemStyle}>Plant health analysis using computer vision and multispectral imaging</li>
            <li style={featureItemStyle}>Weather prediction integration for irrigation scheduling</li>
            <li style={featureItemStyle}>Mobile app with real-time garden status and alerts</li>
            <li style={featureItemStyle}>Solar power system with rainwater collection integration</li>
            <li style={featureItemStyle}>Machine learning optimization for water conservation</li>
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
            <strong>Control System:</strong> Raspberry Pi 4 with custom sensor interface board
          </p>
          <p style={textStyle}>
            <strong>Irrigation:</strong> 8-zone drip system with solenoid valve control
          </p>
          <p style={textStyle}>
            <strong>Sensors:</strong> Soil moisture, pH, temperature, light, and humidity arrays
          </p>
          <p style={textStyle}>
            <strong>Vision System:</strong> Raspberry Pi HQ camera with multispectral filters
          </p>
          <p style={textStyle}>
            <strong>Power:</strong> 100W solar panel with battery backup and rain collection
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
            Field testing in progress with impressive results: 40% water savings compared to 
            traditional irrigation while improving plant health metrics. The AI system has learned 
            optimal care patterns for 15 different plant species.
          </p>
          <p style={textStyle}>
            <strong>Next Steps:</strong> Scaling to commercial greenhouse applications and 
            integrating pest detection capabilities using computer vision and pheromone sensors.
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
              ...createDestinationStyledHandler('smaller-projects-hub').style
            }}
            onClick={() => onNavigate('smaller-projects-hub')}
            onMouseEnter={createDestinationStyledHandler('smaller-projects-hub').onMouseEnter}
            onMouseLeave={createDestinationStyledHandler('smaller-projects-hub').onMouseLeave}
          >
            ← Back to Smaller Projects
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AutonomousGarden;
