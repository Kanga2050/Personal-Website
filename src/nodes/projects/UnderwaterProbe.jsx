import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ParticleSystem from '../../components/ParticleSystem';
import AmbientParticles from '../../components/AmbientParticles';
import { createDestinationStyledHandler } from '../../utils/themeUtils';

const UnderwaterProbe = ({ onNavigate, projectsHubTarget }) => {
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
    background: 'linear-gradient(135deg, #0a3d5c 0%, #0f2a44 50%, #0d1b2a 100%)',
    color: '#4dd0e1',
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
    textShadow: '0 0 20px #4dd0e1',
    background: 'linear-gradient(45deg, #4dd0e1, #80deea, #4dd0e1)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  };

  const sectionStyle = {
    marginBottom: '3rem',
    background: 'rgba(77, 208, 225, 0.05)',
    padding: '2rem',
    borderRadius: '15px',
    border: '1px solid rgba(77, 208, 225, 0.2)'
  };

  const sectionTitleStyle = {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#80deea'
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
    border: '2px solid rgba(77, 208, 225, 0.5)',
    borderRadius: '12px',
    background: 'rgba(77, 208, 225, 0.1)',
    color: '#4dd0e1',
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
        particleColor="#4dd0e1"
        particleCount={80}
        speed={0.4}
      />
      
      <AmbientParticles 
        canvasRef={canvasRef}
        color="#4dd0e1"
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
          Underwater Probe
        </motion.h1>

        <motion.div 
          style={sectionStyle}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 style={sectionTitleStyle}>Project Overview</h2>
          <p style={textStyle}>
            Autonomous underwater exploration vehicle designed for deep-sea research and environmental 
            monitoring. This self-navigating probe can operate at depths up to 500 meters, equipped 
            with advanced sensors and cameras for marine research applications.
          </p>
          <p style={textStyle}>
            The probe combines robust engineering with cutting-edge electronics to withstand extreme 
            underwater conditions while collecting valuable scientific data.
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
            <li style={featureItemStyle}>Pressure-resistant titanium hull construction</li>
            <li style={featureItemStyle}>360-degree HD camera system with LED arrays</li>
            <li style={featureItemStyle}>Multi-sensor water quality monitoring (pH, temperature, salinity)</li>
            <li style={featureItemStyle}>GPS surface communication and data transmission</li>
            <li style={featureItemStyle}>Emergency ballast release system for safety</li>
            <li style={featureItemStyle}>Autonomous navigation with obstacle avoidance</li>
            <li style={featureItemStyle}>Sample collection and storage capabilities</li>
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
            <strong>Control System:</strong> Raspberry Pi 4 with custom sensor interface boards
          </p>
          <p style={textStyle}>
            <strong>Operating Depth:</strong> Surface to 500 meters (tested to 600m)
          </p>
          <p style={textStyle}>
            <strong>Mission Duration:</strong> Up to 12 hours continuous operation
          </p>
          <p style={textStyle}>
            <strong>Propulsion:</strong> Vectored thrust system with redundant motors
          </p>
          <p style={textStyle}>
            <strong>Communication:</strong> Acoustic modem and surface RF telemetry
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
            Field testing completed in shallow waters with excellent results. The probe has successfully 
            demonstrated autonomous navigation, data collection, and emergency recovery procedures.
          </p>
          <p style={textStyle}>
            <strong>Next Steps:</strong> Preparing for deep-sea trials and integrating advanced 
            machine learning algorithms for marine life identification.
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

export default UnderwaterProbe;
