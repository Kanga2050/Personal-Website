import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ParticleSystem from '../../../components/ParticleSystem';
import AmbientParticles from '../../../components/AmbientParticles';
import { createDestinationStyledHandler } from '../../../utils/themeUtils';
import { createDestinationStyledHandler } from '../../../utils/themeUtils';

const HolographicDisplay = ({ onNavigate }) => {
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
    background: 'linear-gradient(135deg, #164e63 0%, #0891b2 50%, #06b6d4 100%)',
    color: '#67e8f9',
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
    color: '#a5f3fc',
    textShadow: '0 0 20px rgba(165, 243, 252, 0.5)'
  };

  const sectionStyle = {
    backgroundColor: 'rgba(103, 232, 249, 0.1)',
    borderRadius: '15px',
    padding: '2rem',
    marginBottom: '2rem',
    maxWidth: '800px',
    width: '100%',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(103, 232, 249, 0.2)'
  };

  const sectionTitleStyle = {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#a5f3fc'
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
    border: '2px solid rgba(103, 232, 249, 0.5)',
    borderRadius: '12px',
    background: 'rgba(103, 232, 249, 0.1)',
    color: '#67e8f9',
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
        particleColor="#67e8f9"
        particleCount={140}
        speed={1.0}
      />
      
      <AmbientParticles 
        canvasRef={canvasRef}
        color="#67e8f9"
        opacity={0.4}
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
          Holographic Display Experiments
        </motion.h1>

        <motion.div 
          style={sectionStyle}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 style={sectionTitleStyle}>Project Overview</h2>
          <p style={textStyle}>
            Cutting-edge research into volumetric display technologies using persistence of vision 
            and high-speed LED arrays to create true 3D holographic visualizations. This project 
            explores the boundaries of spatial data representation and immersive visualization.
          </p>
          <p style={textStyle}>
            The system generates floating 3D images visible from multiple angles without the need 
            for special glasses or headsets, opening new possibilities for data visualization and 
            interactive displays.
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
            <li style={featureItemStyle}>360-degree viewing angle with true depth perception</li>
            <li style={featureItemStyle}>High-speed LED matrix with 10,000+ addressable points</li>
            <li style={featureItemStyle}>Persistence of vision technique for smooth 3D rendering</li>
            <li style={featureItemStyle}>Real-time data visualization capabilities</li>
            <li style={featureItemStyle}>Interactive gesture control for manipulating holograms</li>
            <li style={featureItemStyle}>Multiple display modes: scientific data, entertainment, education</li>
            <li style={featureItemStyle}>Custom rendering engine optimized for volumetric displays</li>
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
            <strong>Display Matrix:</strong> 64x64x64 voxel resolution with RGB color support
          </p>
          <p style={textStyle}>
            <strong>Refresh Rate:</strong> 60Hz volumetric refresh for flicker-free viewing
          </p>
          <p style={textStyle}>
            <strong>Processing:</strong> FPGA-based real-time 3D rendering pipeline
          </p>
          <p style={textStyle}>
            <strong>Control System:</strong> Custom PCB with high-speed LED drivers
          </p>
          <p style={textStyle}>
            <strong>Power:</strong> 500W power system with advanced thermal management
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
            Prototype successfully demonstrates basic 3D holographic effects with impressive 
            visual quality. The system can render simple geometric shapes and data visualizations 
            floating in mid-air with excellent brightness and clarity.
          </p>
          <p style={textStyle}>
            <strong>Next Steps:</strong> Increasing resolution to 128³ voxels, implementing 
            real-time physics simulation, and exploring applications in medical imaging and 
            architectural visualization.
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

export default HolographicDisplay;
