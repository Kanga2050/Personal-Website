import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ParticleSystem from '../../../components/ParticleSystem';
import AmbientParticles from '../../../components/AmbientParticles';

const GestureDroneInterface = ({ onNavigate }) => {
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
    background: 'linear-gradient(135deg, #581c87 0%, #6b21a8 50%, #8b5cf6 100%)',
    color: '#c4b5fd',
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
    color: '#ddd6fe',
    textShadow: '0 0 20px rgba(221, 214, 254, 0.5)'
  };

  const sectionStyle = {
    backgroundColor: 'rgba(196, 181, 253, 0.1)',
    borderRadius: '15px',
    padding: '2rem',
    marginBottom: '2rem',
    maxWidth: '800px',
    width: '100%',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(196, 181, 253, 0.2)'
  };

  const sectionTitleStyle = {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#ddd6fe'
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
    border: '2px solid rgba(196, 181, 253, 0.5)',
    borderRadius: '12px',
    background: 'rgba(196, 181, 253, 0.1)',
    color: '#c4b5fd',
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
        particleColor="#c4b5fd"
        particleCount={120}
        speed={0.8}
      />
      
      <AmbientParticles 
        canvasRef={canvasRef}
        color="#c4b5fd"
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
          Gesture-Controlled Drone Interface
        </motion.h1>

        <motion.div 
          style={sectionStyle}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 style={sectionTitleStyle}>Project Overview</h2>
          <p style={textStyle}>
            Revolutionary hand gesture recognition system enabling intuitive drone control through 
            natural hand movements. Using advanced computer vision and machine learning algorithms, 
            this interface translates human gestures into precise flight commands.
          </p>
          <p style={textStyle}>
            The system eliminates the need for traditional controllers, providing a more immersive 
            and natural piloting experience for both recreational and professional drone operations.
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
            <li style={featureItemStyle}>Real-time hand tracking using depth cameras and computer vision</li>
            <li style={featureItemStyle}>Machine learning gesture classification with 98% accuracy</li>
            <li style={featureItemStyle}>Intuitive gesture mapping: point to steer, palm gestures for altitude</li>
            <li style={featureItemStyle}>Emergency stop gesture for immediate landing</li>
            <li style={featureItemStyle}>Customizable gesture commands for advanced maneuvers</li>
            <li style={featureItemStyle}>Multi-user recognition and switching capabilities</li>
            <li style={featureItemStyle}>Visual feedback system with AR overlays</li>
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
            <strong>Vision System:</strong> Intel RealSense D435i depth camera with RGB imaging
          </p>
          <p style={textStyle}>
            <strong>Processing:</strong> NVIDIA Jetson Nano for real-time ML inference
          </p>
          <p style={textStyle}>
            <strong>Latency:</strong> &lt;50ms gesture recognition to command execution
          </p>
          <p style={textStyle}>
            <strong>Range:</strong> Effective gesture detection up to 3 meters distance
          </p>
          <p style={textStyle}>
            <strong>Compatibility:</strong> DJI SDK integration with major drone platforms
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
            Beta testing completed with professional drone pilots showing 85% user preference 
            over traditional controllers for creative filming applications. System demonstrates 
            excellent stability and responsiveness.
          </p>
          <p style={textStyle}>
            <strong>Next Steps:</strong> Implementing haptic feedback gloves and expanding gesture 
            vocabulary for complex aerial choreography and industrial inspection workflows.
          </p>
        </motion.div>

        <motion.div
          style={{ textAlign: 'center', marginTop: '3rem' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div
            style={navBoxStyle}
            onClick={() => onNavigate('smaller-projects-hub')}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(196, 181, 253, 0.2)';
              e.target.style.boxShadow = '0 5px 15px rgba(196, 181, 253, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(196, 181, 253, 0.1)';
              e.target.style.boxShadow = 'none';
            }}
          >
            ← Back to Smaller Projects
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default GestureDroneInterface;
