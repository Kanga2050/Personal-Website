import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ParticleSystem from '../components/ParticleSystem';
import SceneObject from '../components/SceneObject';
import AmbientParticles from '../components/AmbientParticles';
import { getDestinationThemeColors, createDestinationStyledHandler } from '../utils/themeUtils';

const ProjectsNode = ({ onNavigate }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Add CSS animation for gradient shift
    const style = document.createElement('style');
    style.textContent = `
      @keyframes gradient-shift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `;
    document.head.appendChild(style);

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
    return () => {
      window.removeEventListener('resize', handleResize);
      document.head.removeChild(style);
    };
  }, []);

  const nodeStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0d3818 0%, #001a0d 50%, #000a05 100%)',
    color: '#00ff88',
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
    textShadow: '0 0 30px #00ff88, 0 0 60px #00ff88',
    background: 'linear-gradient(45deg, #00ff88, #66ffaa, #00ff88, #99ffcc)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundSize: '200% 200%',
    animation: 'gradient-shift 3s ease-in-out infinite'
  };

  const subtitleStyle = {
    fontSize: '1.3rem',
    marginBottom: '3rem',
    textAlign: 'center',
    color: '#66ffaa',
    opacity: 0.9,
    textShadow: '0 0 10px rgba(102, 255, 170, 0.5)'
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
    lineHeight: '1.6'
  };

  const navigationStyle = {
    display: 'flex',
    gap: '2rem',
    marginTop: '2rem'
  };

  const navBoxStyle = {
    padding: '1rem 2rem',
    border: '2px solid rgba(0, 255, 136, 0.5)',
    borderRadius: '12px',
    background: 'rgba(0, 255, 136, 0.1)',
    color: '#00ff88',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    fontSize: '1.1rem',
    fontWeight: 'bold'
  };

  // Theme color definitions
  const themes = {
    green: {
      primary: '#00ff88',
      secondary: '#66ffaa',
      accent: 'rgba(0, 255, 136, 0.1)',
      border: 'rgba(0, 255, 136, 0.3)',
      hoverBorder: 'rgba(0, 255, 136, 0.6)',
      shadow: 'rgba(0, 255, 136, 0.3)',
      statusBg: 'rgba(0, 255, 136, 0.2)',
      statusBorder: 'rgba(0, 255, 136, 0.3)'
    },
    blue: {
      primary: '#00aaff',
      secondary: '#66ccff',
      accent: 'rgba(0, 170, 255, 0.1)',
      border: 'rgba(0, 170, 255, 0.3)',
      hoverBorder: 'rgba(0, 170, 255, 0.6)',
      shadow: 'rgba(0, 170, 255, 0.3)',
      statusBg: 'rgba(0, 170, 255, 0.2)',
      statusBorder: 'rgba(0, 170, 255, 0.3)'
    },
    purple: {
      primary: '#aa66ff',
      secondary: '#cc99ff',
      accent: 'rgba(170, 102, 255, 0.1)',
      border: 'rgba(170, 102, 255, 0.3)',
      hoverBorder: 'rgba(170, 102, 255, 0.6)',
      shadow: 'rgba(170, 102, 255, 0.3)',
      statusBg: 'rgba(170, 102, 255, 0.2)',
      statusBorder: 'rgba(170, 102, 255, 0.3)'
    },
    cyan: {
      primary: '#00ffcc',
      secondary: '#66ffdd',
      accent: 'rgba(0, 255, 204, 0.1)',
      border: 'rgba(0, 255, 204, 0.3)',
      hoverBorder: 'rgba(0, 255, 204, 0.6)',
      shadow: 'rgba(0, 255, 204, 0.3)',
      statusBg: 'rgba(0, 255, 204, 0.2)',
      statusBorder: 'rgba(0, 255, 204, 0.3)'
    },
    orange: {
      primary: '#ff8800',
      secondary: '#ffaa44',
      accent: 'rgba(255, 136, 0, 0.1)',
      border: 'rgba(255, 136, 0, 0.3)',
      hoverBorder: 'rgba(255, 136, 0, 0.6)',
      shadow: 'rgba(255, 136, 0, 0.3)',
      statusBg: 'rgba(255, 136, 0, 0.2)',
      statusBorder: 'rgba(255, 136, 0, 0.3)'
    }
  };

  const getThemeColors = (theme) => themes[theme] || themes.green;

  const projects = [
    {
      id: 'five-axis-printer',
      title: '5-Axis 3D Printer',
      description: 'Revolutionary multi-axis additive manufacturing system capable of producing complex geometries without support structures.',
      tech: 'Precision Engineering, Advanced Materials, Control Systems',
      status: 'Development',
      theme: 'green'
    },
    {
      id: 'underwater-probe',
      title: 'Underwater Probe',
      description: 'Deep-sea exploration vehicle with advanced sensor arrays for marine research and environmental monitoring.',
      tech: 'Pressure Systems, Sonar, Marine Electronics',
      status: 'Testing',
      theme: 'blue'
    },
    {
      id: 'piezo-microscope',
      title: 'Piezoelectric Electron Microscope',
      description: 'Ultra-high resolution imaging system using piezoelectric positioning for nanoscale precision and stability.',
      tech: 'Electron Optics, Piezoelectric Systems, Image Processing',
      status: 'Prototype',
      theme: 'purple'
    },
    {
      id: 'personal-submarine',
      title: 'Personal Submarine',
      description: 'Compact underwater exploration vessel designed for recreational diving and marine observation.',
      tech: 'Submersible Design, Life Support, Navigation',
      status: 'Concept',
      theme: 'cyan'
    },
    {
      id: 'smaller-projects',
      title: 'Smaller Projects Collection',
      description: 'A diverse portfolio of experimental projects including smart materials, sensor networks, and automation systems.',
      tech: 'IoT, Materials Science, Automation',
      status: 'Various',
      theme: 'orange'
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
        particleColor="#00ff88"
        particleCount={150}
        speed={0.8}
      />
      
      <AmbientParticles 
        canvasRef={canvasRef}
        color="#00ff88"
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
          {projects.map((project, index) => {
            const themeColors = getThemeColors(project.theme);
            
            return (
              <motion.div
                key={index}
                style={{
                  ...projectCardStyle,
                  background: themeColors.accent,
                  border: `1px solid ${themeColors.border}`,
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: `0 10px 30px ${themeColors.shadow}`,
                  borderColor: themeColors.hoverBorder
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                onClick={() => onNavigate(project.id)}
              >
                <div style={{
                  ...projectTitleStyle,
                  color: themeColors.secondary
                }}>
                  {project.title}
                </div>
                <div style={{
                  ...projectDescStyle,
                  color: themeColors.primary,
                  opacity: 0.9
                }}>{project.description}</div>
                <div style={{ 
                  marginTop: '1rem', 
                  fontSize: '0.9rem', 
                  color: themeColors.secondary,
                  fontStyle: 'italic'
                }}>
                  {project.tech}
                </div>
                <div style={{
                  marginTop: '1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{
                    fontSize: '0.8rem',
                    color: themeColors.primary,
                    background: themeColors.statusBg,
                    padding: '0.3rem 0.8rem',
                    borderRadius: '15px',
                    border: `1px solid ${themeColors.statusBorder}`
                  }}>
                    {project.status}
                  </div>
                  <div style={{
                    fontSize: '0.9rem',
                    color: themeColors.secondary,
                    fontWeight: 'bold'
                  }}>
                    Click to explore →
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div 
          style={navigationStyle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <div
            style={{
              ...navBoxStyle,
              ...createDestinationStyledHandler('techno').style
            }}
            onClick={() => onNavigate('techno')}
            onMouseEnter={createDestinationStyledHandler('techno').onMouseEnter}
            onMouseLeave={createDestinationStyledHandler('techno').onMouseLeave}
          >
            ↑ My Universe Hub
          </div>
          
          <div
            style={{
              ...navBoxStyle,
              ...createDestinationStyledHandler('engineering').style
            }}
            onClick={() => onNavigate('engineering')}
            onMouseEnter={createDestinationStyledHandler('engineering').onMouseEnter}
            onMouseLeave={createDestinationStyledHandler('engineering').onMouseLeave}
          >
            ← Engineering Cosmos
          </div>
          
          <div
            style={{
              ...navBoxStyle,
              ...createDestinationStyledHandler('memories').style
            }}
            onClick={() => onNavigate('memories')}
            onMouseEnter={createDestinationStyledHandler('memories').onMouseEnter}
            onMouseLeave={createDestinationStyledHandler('memories').onMouseLeave}
          >
            Memory Constellation →
          </div>
        </motion.div>
      </motion.div>

      <SceneObject 
        x={window.innerWidth * 0.15}
        y={window.innerHeight * 0.3}
        size={60}
        color="#00ff88"
        shape="diamond"
        rotationSpeed={1}
        canvasRef={canvasRef}
      />
      
      <SceneObject 
        x={window.innerWidth * 0.85}
        y={window.innerHeight * 0.7}
        size={40}
        color="#66ffaa"
        shape="triangle"
        rotationSpeed={-0.8}
        canvasRef={canvasRef}
      />
    </div>
  );
};

export default ProjectsNode;
