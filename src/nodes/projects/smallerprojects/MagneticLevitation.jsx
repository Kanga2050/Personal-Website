import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ParticleSystem from '../../../components/ParticleSystem';
import AmbientParticles from '../../../components/AmbientParticles';

const MagneticLevitation = ({ onNavigate }) => {
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
    background: 'linear-gradient(135deg, #ea580c 0%, #f97316 50%, #fb923c 100%)',
    color: '#fed7aa',
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
    color: '#fed7aa',
    textShadow: '0 0 20px rgba(254, 215, 170, 0.5)'
  };

  const sectionStyle = {
    backgroundColor: 'rgba(254, 215, 170, 0.1)',
    borderRadius: '15px',
    padding: '2rem',
    marginBottom: '2rem',
    maxWidth: '800px',
    width: '100%',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(254, 215, 170, 0.2)'
  };

  const sectionTitleStyle = {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#fed7aa'
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
    border: '2px solid rgba(254, 215, 170, 0.5)',
    borderRadius: '12px',
    background: 'rgba(254, 215, 170, 0.1)',
    color: '#fed7aa',
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
        particleColor="#fed7aa"
        particleCount={100}
        speed={0.4}
      />
      
      <AmbientParticles 
        canvasRef={canvasRef}
        color="#fed7aa"
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
          Electromagnetic Levitation Display
        </motion.h1>

        <motion.div 
          style={sectionStyle}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 style={sectionTitleStyle}>Project Overview</h2>
          <p style={textStyle}>
            Electromagnetic levitation system designed to suspend small objects in mid-air using 
            precisely controlled magnetic fields and real-time feedback control. This fascinating 
            display creates the illusion of objects floating freely in space.
          </p>
          <p style={textStyle}>
            The system uses feedback control algorithms to maintain stable levitation of ferromagnetic 
            objects, creating stunning visual displays for demonstrations, art installations, and 
            educational purposes.
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
            <li style={featureItemStyle}>Precise electromagnetic field control with Hall sensor feedback</li>
            <li style={featureItemStyle}>Real-time PID control algorithms for stable levitation</li>
            <li style={featureItemStyle}>Multiple object levitation with independent control</li>
            <li style={featureItemStyle}>Interactive control via gesture recognition and touch interface</li>
            <li style={featureItemStyle}>LED lighting integration for dramatic visual effects</li>
            <li style={featureItemStyle}>Sound-reactive levitation synchronized to music</li>
            <li style={featureItemStyle}>Educational mode with physics visualization</li>
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
            <strong>Control System:</strong> Arduino Mega with custom electromagnet driver boards
          </p>
          <p style={textStyle}>
            <strong>Sensors:</strong> Hall effect sensors with 0.1mm position resolution
          </p>
          <p style={textStyle}>
            <strong>Electromagnets:</strong> Custom-wound coils with variable field strength
          </p>
          <p style={textStyle}>
            <strong>Update Rate:</strong> 1kHz control loop for stable levitation
          </p>
          <p style={textStyle}>
            <strong>Levitation Range:</strong> Objects from 1g to 50g in a 200mm³ volume
          </p>
          <p style={textStyle}>
            <strong>Power Supply:</strong> Switched-mode 24V system with current limiting
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
            Successfully achieved stable levitation of small ferromagnetic objects with excellent 
            position control. The system can maintain levitation for extended periods and responds 
            dynamically to external disturbances.
          </p>
          <p style={textStyle}>
            <strong>Next Steps:</strong> Implementing multi-object choreography, developing 
            wireless power transmission for non-ferromagnetic objects, and creating artistic 
            installation programming for galleries and museums.
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
              e.target.style.background = 'rgba(254, 215, 170, 0.2)';
              e.target.style.boxShadow = '0 5px 15px rgba(254, 215, 170, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(254, 215, 170, 0.1)';
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

export default MagneticLevitation;
