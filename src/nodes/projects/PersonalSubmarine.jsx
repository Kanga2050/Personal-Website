import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ParticleSystem from '../../components/ParticleSystem';
import AmbientParticles from '../../components/AmbientParticles';

const PersonalSubmarine = ({ onNavigate, projectsHubTarget }) => {
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
    background: 'linear-gradient(135deg, #0d47a1 0%, #1565c0 50%, #1976d2 100%)',
    color: '#81d4fa',
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
    textShadow: '0 0 20px #81d4fa',
    background: 'linear-gradient(45deg, #81d4fa, #b3e5fc, #81d4fa)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  };

  const sectionStyle = {
    marginBottom: '3rem',
    background: 'rgba(129, 212, 250, 0.05)',
    padding: '2rem',
    borderRadius: '15px',
    border: '1px solid rgba(129, 212, 250, 0.2)'
  };

  const sectionTitleStyle = {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#b3e5fc'
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
    border: '2px solid rgba(129, 212, 250, 0.5)',
    borderRadius: '12px',
    background: 'rgba(129, 212, 250, 0.1)',
    color: '#81d4fa',
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
        particleColor="#81d4fa"
        particleCount={90}
        speed={0.5}
      />
      
      <AmbientParticles 
        canvasRef={canvasRef}
        color="#81d4fa"
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
          Personal Submarine
        </motion.h1>

        <motion.div 
          style={sectionStyle}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 style={sectionTitleStyle}>Project Overview</h2>
          <p style={textStyle}>
            Compact single-person submarine designed for recreational underwater exploration and 
            marine photography. Featuring a transparent acrylic viewing sphere, this vessel enables 
            safe underwater adventures up to 30 meters depth with panoramic underwater views.
          </p>
          <p style={textStyle}>
            The submarine combines safety, comfort, and functionality to provide an unparalleled 
            underwater exploration experience for marine enthusiasts and researchers.
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
            <li style={featureItemStyle}>Panoramic acrylic viewing dome for 360° underwater visibility</li>
            <li style={featureItemStyle}>Electric propulsion system with variable speed control</li>
            <li style={featureItemStyle}>Emergency surface protocol with automatic ballast release</li>
            <li style={featureItemStyle}>Integrated 4K camera systems for documentation</li>
            <li style={featureItemStyle}>Air recycling life support with CO2 scrubbing</li>
            <li style={featureItemStyle}>LED lighting arrays for underwater illumination</li>
            <li style={featureItemStyle}>Ergonomic pilot controls and heads-up display</li>
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
            <strong>Hull Material:</strong> Marine-grade aluminum with acrylic viewing sphere
          </p>
          <p style={textStyle}>
            <strong>Operating Depth:</strong> Surface to 30 meters (tested to 45m)
          </p>
          <p style={textStyle}>
            <strong>Dive Duration:</strong> Up to 6 hours with life support systems
          </p>
          <p style={textStyle}>
            <strong>Propulsion:</strong> Battery-powered electric thrusters (8 hours operation)
          </p>
          <p style={textStyle}>
            <strong>Safety Systems:</strong> Emergency ascent, surface beacon, underwater communication
          </p>
        </motion.div>

        <motion.div 
          style={sectionStyle}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <h2 style={sectionTitleStyle}>Safety & Certification</h2>
          <p style={textStyle}>
            Comprehensive safety testing has been completed including pressure testing, emergency 
            systems validation, and underwater escape procedures. The submarine includes multiple 
            redundant safety systems and emergency protocols.
          </p>
          <p style={textStyle}>
            All systems have been designed to exceed maritime safety standards with focus on 
            fail-safe operation and emergency surface capabilities.
          </p>
        </motion.div>

        <motion.div 
          style={sectionStyle}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <h2 style={sectionTitleStyle}>Current Status</h2>
          <p style={textStyle}>
            Safety testing completed successfully with all emergency systems validated. The submarine 
            has undergone extensive trials in controlled environments and shallow water testing.
          </p>
          <p style={textStyle}>
            <strong>Next Steps:</strong> Obtaining final marine certification and preparing for 
            commercial operation. Advanced navigation systems and underwater communication 
            upgrades are in development.
          </p>
        </motion.div>

        <motion.div
          style={{ textAlign: 'center', marginTop: '3rem' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <div
            style={navBoxStyle}
            onClick={() => onNavigate(projectsHubTarget || 'projects')}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(129, 212, 250, 0.2)';
              e.target.style.boxShadow = '0 5px 15px rgba(129, 212, 250, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(129, 212, 250, 0.1)';
              e.target.style.boxShadow = 'none';
            }}
          >
            ← Back to Projects
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PersonalSubmarine;
