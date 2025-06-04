import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ParticleSystem from '../components/ParticleSystem';
import SceneObject from '../components/SceneObject';
import AmbientParticles from '../components/AmbientParticles';

const ProjectsNode = ({ onNavigate }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
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
    background: 'linear-gradient(135deg, #0f4f0f 0%, #003300 50%, #001a00 100%)',
    color: '#66ff66',
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
    fontSize: '4rem',
    fontWeight: 'bold',
    marginBottom: '2rem',
    textAlign: 'center',
    textShadow: '0 0 20px #66ff66',
    background: 'linear-gradient(45deg, #66ff66, #99ff99, #66ff66)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  };

  const subtitleStyle = {
    fontSize: '1.2rem',
    marginBottom: '3rem',
    textAlign: 'center',
    opacity: 0.8
  };

  const projectsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    maxWidth: '1200px',
    width: '100%',
    marginBottom: '3rem'
  };

  const projectCardStyle = {
    background: 'rgba(102, 255, 102, 0.1)',
    border: '1px solid rgba(102, 255, 102, 0.3)',
    borderRadius: '15px',
    padding: '2rem',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  };

  const projectTitleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#99ff99'
  };

  const projectDescStyle = {
    fontSize: '1rem',
    lineHeight: '1.6',
    opacity: 0.9
  };

  const navigationStyle = {
    display: 'flex',
    gap: '2rem',
    marginTop: '2rem'
  };

  const navBoxStyle = {
    padding: '1rem 2rem',
    border: '2px solid rgba(102, 255, 102, 0.5)',
    borderRadius: '12px',
    background: 'rgba(102, 255, 102, 0.1)',
    color: '#66ff66',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    fontSize: '1.1rem',
    fontWeight: 'bold'
  };

  const projects = [
    {
      title: 'AI Code Assistant',
      description: 'An intelligent coding companion built with machine learning to help developers write better code faster.',
      tech: 'Python, TensorFlow, React'
    },
    {
      title: 'Memory Palace App',
      description: 'A digital memory palace application using 3D visualization to help users memorize information effectively.',
      tech: 'Three.js, WebGL, Node.js'
    },
    {
      title: 'Quantum Simulator',
      description: 'A quantum computing simulator that visualizes quantum states and operations in an intuitive interface.',
      tech: 'JavaScript, D3.js, WebAssembly'
    },
    {
      title: 'Neural Art Generator',
      description: 'An artistic tool that uses neural networks to generate unique digital artwork from text prompts.',
      tech: 'PyTorch, FastAPI, React'
    },
    {
      title: 'Distributed Database',
      description: 'A high-performance distributed database system designed for real-time applications.',
      tech: 'Go, gRPC, Docker'
    },
    {
      title: 'Virtual Reality Lab',
      description: 'An immersive VR environment for conducting scientific experiments in virtual space.',
      tech: 'Unity, C#, OpenXR'
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
        particleColor="#66ff66"
        particleCount={150}
        speed={0.8}
      />
      
      <AmbientParticles 
        canvasRef={canvasRef}
        color="#66ff66"
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
          My Projects
        </motion.h1>
        
        <motion.p 
          style={subtitleStyle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          A showcase of technical achievements and creative endeavors
        </motion.p>

        <motion.div 
          style={projectsGridStyle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              style={projectCardStyle}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 10px 30px rgba(102, 255, 102, 0.3)',
                borderColor: 'rgba(102, 255, 102, 0.6)'
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
            >
              <div style={projectTitleStyle}>{project.title}</div>
              <div style={projectDescStyle}>{project.description}</div>
              <div style={{ 
                marginTop: '1rem', 
                fontSize: '0.9rem', 
                color: '#99ff99',
                fontStyle: 'italic'
              }}>
                {project.tech}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          style={navigationStyle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div
            style={navBoxStyle}
            onClick={() => onNavigate('techno')}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(102, 255, 102, 0.2)';
              e.target.style.boxShadow = '0 5px 15px rgba(102, 255, 102, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(102, 255, 102, 0.1)';
              e.target.style.boxShadow = 'none';
            }}
          >
            ↑ My Universe Hub
          </div>
          
          <div
            style={navBoxStyle}
            onClick={() => onNavigate('engineering')}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(102, 255, 102, 0.2)';
              e.target.style.boxShadow = '0 5px 15px rgba(102, 255, 102, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(102, 255, 102, 0.1)';
              e.target.style.boxShadow = 'none';
            }}
          >
            ← Engineering Cosmos
          </div>
          
          <div
            style={navBoxStyle}
            onClick={() => onNavigate('memories')}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(102, 255, 102, 0.2)';
              e.target.style.boxShadow = '0 5px 15px rgba(102, 255, 102, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(102, 255, 102, 0.1)';
              e.target.style.boxShadow = 'none';
            }}
          >
            Memory Constellation →
          </div>
        </motion.div>
      </motion.div>

      <SceneObject 
        x={window.innerWidth * 0.15}
        y={window.innerHeight * 0.3}
        size={60}
        color="#66ff66"
        shape="diamond"
        rotationSpeed={1}
        canvasRef={canvasRef}
      />
      
      <SceneObject 
        x={window.innerWidth * 0.85}
        y={window.innerHeight * 0.7}
        size={40}
        color="#99ff99"
        shape="triangle"
        rotationSpeed={-0.8}
        canvasRef={canvasRef}
      />
    </div>
  );
};

export default ProjectsNode;
