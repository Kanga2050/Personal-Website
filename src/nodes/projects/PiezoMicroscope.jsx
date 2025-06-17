import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ParticleSystem from '../../components/ParticleSystem';
import AmbientParticles from '../../components/AmbientParticles';
import { createDestinationStyledHandler } from '../../utils/themeUtils';

const PiezoMicroscope = ({ onNavigate, projectsHubTarget }) => {
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
    background: 'linear-gradient(135deg, #4a148c 0%, #6a1b9a 50%, #8e24aa 100%)',
    color: '#e1bee7',
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
    textShadow: '0 0 20px #e1bee7',
    background: 'linear-gradient(45deg, #e1bee7, #f3e5f5, #e1bee7)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  };

  const sectionStyle = {
    marginBottom: '3rem',
    background: 'rgba(225, 190, 231, 0.05)',
    padding: '2rem',
    borderRadius: '15px',
    border: '1px solid rgba(225, 190, 231, 0.2)'
  };

  const sectionTitleStyle = {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#f3e5f5'
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
    border: '2px solid rgba(225, 190, 231, 0.5)',
    borderRadius: '12px',
    background: 'rgba(225, 190, 231, 0.1)',
    color: '#e1bee7',
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
        particleColor="#e1bee7"
        particleCount={120}
        speed={0.3}
      />
      
      <AmbientParticles 
        canvasRef={canvasRef}
        color="#e1bee7"
        opacity={0.2}
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
          Piezoelectric Electron Microscope
        </motion.h1>

        <motion.div 
          style={sectionStyle}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 style={sectionTitleStyle}>Project Overview</h2>
          <p style={textStyle}>
            Ultra-precise electron microscope utilizing piezoelectric actuators for nanometer-scale 
            positioning accuracy. This advanced microscopy system achieves sub-nanometer positioning 
            precision for cutting-edge materials research and nanotechnology applications.
          </p>
          <p style={textStyle}>
            The integration of piezoelectric control systems with traditional electron microscopy 
            enables unprecedented stability and precision in sample manipulation and imaging.
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
            <li style={featureItemStyle}>Sub-nanometer positioning precision (±0.1nm accuracy)</li>
            <li style={featureItemStyle}>Real-time vibration compensation algorithms</li>
            <li style={featureItemStyle}>Automated sample navigation with drift correction</li>
            <li style={featureItemStyle}>Environmental chamber compatibility for controlled conditions</li>
            <li style={featureItemStyle}>AI-assisted image analysis and pattern recognition</li>
            <li style={featureItemStyle}>Multi-scale imaging from macro to atomic resolution</li>
            <li style={featureItemStyle}>Custom LabVIEW control interface with automation protocols</li>
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
            <strong>Positioning System:</strong> 3-axis piezoelectric actuators with capacitive feedback
          </p>
          <p style={textStyle}>
            <strong>Resolution:</strong> Currently achieving 0.1nm positioning accuracy
          </p>
          <p style={textStyle}>
            <strong>Control Electronics:</strong> Custom-designed low-noise amplifiers and DAQ systems
          </p>
          <p style={textStyle}>
            <strong>Software:</strong> LabVIEW-based control with MATLAB image processing
          </p>
          <p style={textStyle}>
            <strong>Environmental Control:</strong> Temperature stability ±0.01°C, vibration isolation
          </p>
        </motion.div>

        <motion.div 
          style={sectionStyle}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <h2 style={sectionTitleStyle}>Research Applications</h2>
          <p style={textStyle}>
            The microscope enables groundbreaking research in nanotechnology, materials science, 
            and quantum physics. Applications include atomic-scale manipulation, defect analysis 
            in semiconductor devices, and characterization of novel 2D materials.
          </p>
          <p style={textStyle}>
            Current research projects include studying graphene defects, analyzing quantum dot 
            structures, and investigating protein folding mechanisms at the molecular level.
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
            Successfully achieving 0.1nm resolution with excellent thermal and mechanical stability. 
            The system has been validated for extended imaging sessions with minimal drift.
          </p>
          <p style={textStyle}>
            <strong>Next Steps:</strong> Implementing machine learning algorithms for automated 
            feature detection and developing specialized holders for biological samples.
          </p>
        </motion.div>

        <motion.div
          style={{ textAlign: 'center', marginTop: '3rem' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
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

export default PiezoMicroscope;
