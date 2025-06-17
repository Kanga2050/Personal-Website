import React, { useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { getDestinationThemeColors, createDestinationStyledHandler } from '../utils/themeUtils';

const EngineeringNode = ({ onNavigate }) => {
  // Memoized styles to prevent recreation
  const containerStyle = useMemo(() => ({
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1e3a8a, #312e81)',
    color: 'white',
    position: 'relative',
    overflow: 'hidden',
    padding: '20px'
  }), []);

  const contentStyle = useMemo(() => ({
    position: 'relative',
    zIndex: 10,
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px'
  }), []);

  const titleStyle = useMemo(() => ({
    fontSize: '4rem',
    fontWeight: 'bold',
    marginBottom: '2rem',
    textAlign: 'center',
    textShadow: '0 0 20px #60a5fa',
    background: 'linear-gradient(45deg, #60a5fa, #22d3ee, #60a5fa)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  }), []);

  const sectionStyle = useMemo(() => ({
    marginBottom: '3rem',
    background: 'rgba(96, 165, 250, 0.05)',
    padding: '2rem',
    borderRadius: '15px',
    border: '1px solid rgba(96, 165, 250, 0.2)'
  }), []);

  const sectionTitleStyle = useMemo(() => ({
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#60a5fa'
  }), []);

  const textStyle = useMemo(() => ({
    fontSize: '1.1rem',
    lineHeight: '1.6',
    marginBottom: '1.5rem',
    opacity: 0.9
  }), []);

  const subnodesGridStyle = useMemo(() => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    marginBottom: '3rem'
  }), []);

  const subnodeCardStyle = useMemo(() => ({
    background: 'rgba(96, 165, 250, 0.1)',
    border: '2px solid rgba(96, 165, 250, 0.3)',
    borderRadius: '15px',
    padding: '2rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden'
  }), []);

  const subnodeTitleStyle = useMemo(() => ({
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    color: '#22d3ee'
  }), []);

  const subnodeDescStyle = useMemo(() => ({
    fontSize: '1rem',
    lineHeight: '1.5',
    opacity: 0.8
  }), []);

  const navigationStyle = useMemo(() => ({
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    flexWrap: 'wrap'
  }), []);

  const navBoxStyle = useMemo(() => ({
    display: 'inline-block',
    padding: '1rem 2rem',
    margin: '0.5rem',
    border: '2px solid rgba(96, 165, 250, 0.5)',
    borderRadius: '12px',
    background: 'rgba(96, 165, 250, 0.1)',
    color: '#60a5fa',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textDecoration: 'none',
    fontSize: '1.1rem',
    fontWeight: 'bold'
  }), []);

  // Memoized event handlers
  const handleTechnoNavigation = useCallback(() => {
    onNavigate('techno');
  }, [onNavigate]);

  const handleProjectsNavigation = useCallback(() => {
    onNavigate('projects');
  }, [onNavigate]);

  const handleSubnodeNavigation = useCallback((subnodeId) => {
    onNavigate(subnodeId);
  }, [onNavigate]);

  // Engineering subnodes data with distinct colors
  const engineeringSubnodes = useMemo(() => [
    {
      id: 'mech-design',
      title: 'Mechanical Design',
      description: 'Advanced CAD modeling, 3D design workflows, and mechanical engineering principles. From concept sketches to production-ready designs using industry-standard tools and methodologies.',
      icon: '⚙️',
      theme: 'mech-blue',
      primaryColor: '#3b82f6',
      secondaryColor: '#60a5fa',
      gradientBg: 'rgba(59, 130, 246, 0.1)',
      gradientBorder: 'rgba(59, 130, 246, 0.3)'
    },
    {
      id: 'electronics',
      title: 'Electronics',
      description: 'Circuit design, embedded systems development, and electronic prototyping. PCB design, microcontroller programming, and hardware-software integration for innovative solutions.',
      icon: '🔌',
      theme: 'electric-orange',
      primaryColor: '#f97316',
      secondaryColor: '#fb923c',
      gradientBg: 'rgba(249, 115, 22, 0.1)',
      gradientBorder: 'rgba(249, 115, 22, 0.3)'
    },
    {
      id: 'software',
      title: 'Software',
      description: 'Programming, algorithms, and software architecture. Full-stack development, system design, and cutting-edge technologies to bring engineering concepts to life.',
      icon: '💻',
      theme: 'code-green',
      primaryColor: '#10b981',
      secondaryColor: '#34d399',
      gradientBg: 'rgba(16, 185, 129, 0.1)',
      gradientBorder: 'rgba(16, 185, 129, 0.3)'
    }
  ], []);

  return (
    <div style={containerStyle}>
      <motion.div 
        style={contentStyle}
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
          Engineering Cosmos
        </motion.h1>

        <motion.div 
          style={sectionStyle}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 style={sectionTitleStyle}>Engineering Overview</h2>
          <p style={textStyle}>
            Welcome to the Engineering Cosmos - where logic meets creativity and innovation takes shape. 
            This is the mechanical universe where algorithms dance with imagination, bringing theoretical 
            concepts into tangible reality through disciplined engineering practices.
          </p>
          <p style={textStyle}>
            Here you'll find the intersection of three fundamental engineering domains, each contributing 
            unique perspectives and methodologies to solve complex challenges and create meaningful solutions.
          </p>
        </motion.div>

        <motion.div 
          style={sectionStyle}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 style={sectionTitleStyle}>Engineering Domains</h2>
          <div style={subnodesGridStyle}>
            {engineeringSubnodes.map((subnode, index) => (
              <motion.div
                key={subnode.id}
                style={{
                  background: subnode.gradientBg,
                  border: `2px solid ${subnode.gradientBorder}`,
                  borderRadius: '15px',
                  padding: '2rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                whileHover={{ 
                  scale: 1.02, 
                  borderColor: subnode.primaryColor,
                  boxShadow: `0 10px 30px ${subnode.primaryColor}40`
                }}
                onClick={() => handleSubnodeNavigation(subnode.id)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${subnode.primaryColor}20`;
                  e.currentTarget.style.borderColor = subnode.primaryColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = subnode.gradientBg;
                  e.currentTarget.style.borderColor = subnode.gradientBorder;
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                  {subnode.icon}
                </div>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  marginBottom: '1rem',
                  color: subnode.primaryColor
                }}>
                  {subnode.title}
                </div>
                <div style={{
                  fontSize: '1rem',
                  lineHeight: '1.5',
                  opacity: 0.8
                }}>
                  {subnode.description}
                </div>
                <div style={{
                  marginTop: '1rem',
                  fontSize: '0.9rem',
                  color: subnode.primaryColor,
                  fontStyle: 'italic',
                  opacity: 0.8
                }}>
                  Click to explore →
                </div>
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
          <h2 style={sectionTitleStyle}>Engineering Philosophy</h2>
          <p style={textStyle}>
            Engineering is the art of applying scientific principles to design, build, and maintain 
            structures, machines, systems, and processes. It's about finding elegant solutions to 
            complex problems while balancing functionality, efficiency, safety, and sustainability.
          </p>
          <p style={textStyle}>
            Each domain brings its own unique perspective: Mechanical Design focuses on physical form 
            and function, Electronics bridges the digital and analog worlds, and Software creates the 
            intelligent behaviors that bring systems to life.
          </p>
        </motion.div>

        <motion.div
          style={navigationStyle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <div
            style={{
              ...navBoxStyle,
              ...createDestinationStyledHandler('techno').style
            }}
            onClick={handleTechnoNavigation}
            onMouseEnter={createDestinationStyledHandler('techno').onMouseEnter}
            onMouseLeave={createDestinationStyledHandler('techno').onMouseLeave}
          >
            ← Return to My Universe
          </div>
          
          <div
            style={{
              ...navBoxStyle,
              ...createDestinationStyledHandler('projects').style
            }}
            onClick={handleProjectsNavigation}
            onMouseEnter={createDestinationStyledHandler('projects').onMouseEnter}
            onMouseLeave={createDestinationStyledHandler('projects').onMouseLeave}
          >
            Explore My Projects →
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default React.memo(EngineeringNode);
