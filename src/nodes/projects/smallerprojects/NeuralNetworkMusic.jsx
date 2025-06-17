import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ParticleSystem from '../../../components/ParticleSystem';
import AmbientParticles from '../../../components/AmbientParticles';
import { createDestinationStyledHandler } from '../../../utils/themeUtils';
import { createDestinationStyledHandler } from '../../../utils/themeUtils';

const NeuralNetworkMusic = ({ onNavigate }) => {
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
    color: '#ddd6fe',
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
        particleCount={130}
        speed={0.9}
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
          Neural Network Music Generator
        </motion.h1>

        <motion.div 
          style={sectionStyle}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 style={sectionTitleStyle}>Project Overview</h2>
          <p style={textStyle}>
            AI-powered music composition system that uses deep learning neural networks to generate 
            original musical compositions across multiple genres and styles. The system analyzes vast 
            musical datasets to learn patterns and create entirely new compositions.
          </p>
          <p style={textStyle}>
            This experimental music generator explores the intersection of artificial intelligence 
            and creative expression, producing unique MIDI compositions that can be rendered through 
            various virtual instruments and synthesizers.
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
            <li style={featureItemStyle}>Multi-genre neural network training (classical, jazz, electronic, rock)</li>
            <li style={featureItemStyle}>Real-time MIDI composition with customizable parameters</li>
            <li style={featureItemStyle}>Style transfer capabilities between different musical genres</li>
            <li style={featureItemStyle}>Interactive web interface for composition control</li>
            <li style={featureItemStyle}>Integration with popular DAWs and MIDI hardware</li>
            <li style={featureItemStyle}>Emotion-based composition using sentiment analysis</li>
            <li style={featureItemStyle}>Collaborative human-AI composition tools</li>
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
            <strong>Neural Architecture:</strong> Transformer-based model with attention mechanisms
          </p>
          <p style={textStyle}>
            <strong>Training Data:</strong> 50,000+ MIDI files across multiple genres and decades
          </p>
          <p style={textStyle}>
            <strong>Processing Power:</strong> NVIDIA RTX 4090 for model training and inference
          </p>
          <p style={textStyle}>
            <strong>Output Format:</strong> MIDI, WAV, and direct DAW integration
          </p>
          <p style={textStyle}>
            <strong>Interface:</strong> Web-based GUI with real-time parameter adjustment
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
            The system successfully generates musically coherent compositions with impressive 
            stylistic consistency. Early testing shows 78% of listeners cannot distinguish 
            AI-generated pieces from human compositions in blind tests.
          </p>
          <p style={textStyle}>
            <strong>Next Steps:</strong> Implementing real-time performance capabilities, 
            adding voice synthesis, and developing a collaborative platform for musicians 
            to work alongside AI composition tools.
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

export default NeuralNetworkMusic;
