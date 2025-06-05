import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ParticleSystem from '../../components/ParticleSystem';
import AmbientParticles from '../../components/AmbientParticles';

const SmallerProjects = ({ onNavigate }) => {
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
    background: 'linear-gradient(135deg, #bf360c 0%, #d84315 50%, #ff5722 100%)',
    color: '#ffab91',
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
    textShadow: '0 0 20px #ffab91',
    background: 'linear-gradient(45deg, #ffab91, #ffccbc, #ffab91)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  };

  const sectionStyle = {
    marginBottom: '3rem',
    background: 'rgba(255, 171, 145, 0.05)',
    padding: '2rem',
    borderRadius: '15px',
    border: '1px solid rgba(255, 171, 145, 0.2)'
  };

  const sectionTitleStyle = {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#ffccbc'
  };

  const textStyle = {
    fontSize: '1.1rem',
    lineHeight: '1.7',
    marginBottom: '1rem',
    opacity: 0.9
  };

  const projectGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem'
  };

  const projectCardStyle = {
    background: 'rgba(255, 171, 145, 0.1)',
    padding: '1.5rem',
    borderRadius: '12px',
    border: '1px solid rgba(255, 171, 145, 0.3)'
  };

  const projectTitleStyle = {
    fontSize: '1.3rem',
    fontWeight: 'bold',
    marginBottom: '0.8rem',
    color: '#ffccbc'
  };

  const projectDescStyle = {
    fontSize: '1rem',
    lineHeight: '1.5',
    opacity: 0.85
  };

  const navBoxStyle = {
    display: 'inline-block',
    padding: '1rem 2rem',
    margin: '0.5rem',
    border: '2px solid rgba(255, 171, 145, 0.5)',
    borderRadius: '12px',
    background: 'rgba(255, 171, 145, 0.1)',
    color: '#ffab91',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    fontSize: '1.1rem',
    fontWeight: 'bold'
  };

  const smallerProjects = [
    {
      title: 'IoT Weather Monitoring Station',
      description: 'Solar-powered weather station with real-time data logging and web dashboard. Monitors temperature, humidity, pressure, wind speed, and rainfall with wireless data transmission.'
    },
    {
      title: 'Gesture-Controlled Drone Interface',
      description: 'Hand gesture recognition system for intuitive drone control using computer vision and machine learning. Enables natural piloting through hand movements and gestures.'
    },
    {
      title: 'Autonomous Garden System',
      description: 'Smart irrigation and monitoring system with soil sensors, automated watering, and plant health tracking. Solar-powered with mobile app integration.'
    },
    {
      title: 'Holographic Display Experiments',
      description: 'Research into volumetric displays using persistence of vision and LED arrays. Exploring 3D visualization techniques for data representation.'
    },
    {
      title: 'Smart Home Automation Hub',
      description: 'Central control system for home automation with voice control, mobile app, and AI-driven optimization. Integrates lighting, security, climate control.'
    },
    {
      title: 'Magnetic Levitation Display',
      description: 'Electromagnetic levitation system for floating object displays. Uses feedback control to maintain stable levitation of small objects.'
    }
  ];

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
        particleColor="#ffab91"
        particleCount={110}
        speed={0.7}
      />
      
      <AmbientParticles 
        canvasRef={canvasRef}
        color="#ffab91"
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
          Smaller Projects Collection
        </motion.h1>

        <motion.div 
          style={sectionStyle}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 style={sectionTitleStyle}>Project Overview</h2>
          <p style={textStyle}>
            A diverse collection of experimental projects and proof-of-concept prototypes exploring 
            emerging technologies and creative engineering solutions. These projects serve as testing 
            grounds for new ideas and rapid prototyping of innovative concepts.
          </p>
          <p style={textStyle}>
            Each project focuses on different aspects of technology integration, from IoT devices 
            and automation to experimental displays and human-computer interfaces.
          </p>
        </motion.div>

        <motion.div 
          style={sectionStyle}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 style={sectionTitleStyle}>Active Projects</h2>
          <div style={projectGridStyle}>
            {smallerProjects.map((project, index) => (
              <motion.div
                key={index}
                style={projectCardStyle}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.02, borderColor: 'rgba(255, 171, 145, 0.5)' }}
              >
                <div style={projectTitleStyle}>{project.title}</div>
                <div style={projectDescStyle}>{project.description}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          style={sectionStyle}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <h2 style={sectionTitleStyle}>Development Philosophy</h2>
          <p style={textStyle}>
            These projects embrace rapid prototyping and iterative design principles. Each serves 
            as a learning opportunity to explore new technologies, test innovative approaches, 
            and develop skills across diverse engineering disciplines.
          </p>
          <p style={textStyle}>
            The focus is on experimentation, creativity, and pushing the boundaries of what's 
            possible with accessible technology and creative problem-solving.
          </p>
        </motion.div>

        <motion.div 
          style={sectionStyle}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <h2 style={sectionTitleStyle}>Technical Approaches</h2>
          <p style={textStyle}>
            <strong>Rapid Prototyping:</strong> 3D printing, laser cutting, and modular electronics for quick iterations
          </p>
          <p style={textStyle}>
            <strong>Open Source Integration:</strong> Leveraging Arduino, Raspberry Pi, and open-source software stacks
          </p>
          <p style={textStyle}>
            <strong>Cross-Platform Development:</strong> Mobile apps, web interfaces, and embedded systems integration
          </p>
          <p style={textStyle}>
            <strong>Experimental Technologies:</strong> AI/ML integration, computer vision, and emerging sensor technologies
          </p>
        </motion.div>

        <motion.div 
          style={sectionStyle}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <h2 style={sectionTitleStyle}>Current Status</h2>
          <p style={textStyle}>
            Multiple projects in various stages of development with ongoing experimentation and 
            refinement. The collection continues to grow as new ideas emerge and technologies evolve.
          </p>
          <p style={textStyle}>
            <strong>Next Steps:</strong> Expanding documentation, creating tutorial content, and 
            exploring commercial applications for the most promising prototypes.
          </p>
        </motion.div>

        <motion.div
          style={{ textAlign: 'center', marginTop: '3rem' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <div
            style={navBoxStyle}
            onClick={() => onNavigate('projects')}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 171, 145, 0.2)';
              e.target.style.boxShadow = '0 5px 15px rgba(255, 171, 145, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 171, 145, 0.1)';
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

export default SmallerProjects;
