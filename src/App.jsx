import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import StartNode from './nodes/StartNode';
import TechnoUniverseDay from './nodes/technouniverse/TechnoUniverseDay';
import TechnoUniverseNight from './nodes/technouniverse/TechnoUniverseNight';
import EngineeringNode from './nodes/EngineeringNode';
import MemoryNode from './nodes/MemoryNode';
import ProjectsNode from './nodes/ProjectsNode';
import NavigationMenu from './components/NavigationMenu';
import FiveAxisPrinter from './nodes/projects/FiveAxisPrinter';
import UnderwaterProbe from './nodes/projects/UnderwaterProbe';
import PiezoMicroscope from './nodes/projects/PiezoMicroscope';
import PersonalSubmarine from './nodes/projects/PersonalSubmarine';
import SmallerProjects from './nodes/projects/SmallerProjects';

const memoryGraph = {
  nodes: {
    start: {
      id: 'start',
      title: '__ Universe',
      theme: 'black',
      content: 'The beginning of everything...'
    },
    techno: {
      id: 'techno',
      title: 'My Universe',
      theme: 'yellow-techno',
      content: 'Interactive techno-anime exploration hub'
    },
    engineering: {
      id: 'engineering',
      title: 'Engineering Cosmos',
      theme: 'tech',
      content: 'The mechanical universe where logic meets creativity...'
    },
    memories: {
      id: 'memories',
      title: 'Memory Constellation',
      theme: 'nostalgic',
      content: 'Fragments of time, crystallized into navigable space...'
    },
    projects: {
      id: 'projects',
      title: 'My Projects',
      theme: 'green',
      content: 'A collection of creative endeavors and technical achievements...'
    },
    'five-axis-printer': {
      id: 'five-axis-printer',
      title: '5-Axis 3D Printer',
      theme: 'green',
      content: 'Revolutionary multi-axis additive manufacturing system'
    },
    'underwater-probe': {
      id: 'underwater-probe',
      title: 'Underwater Probe',
      theme: 'blue',
      content: 'Deep-sea exploration vehicle with advanced sensor arrays'
    },
    'piezo-microscope': {
      id: 'piezo-microscope',
      title: 'Piezoelectric Electron Microscope',
      theme: 'purple',
      content: 'Ultra-high resolution imaging system using piezoelectric positioning'
    },
    'personal-submarine': {
      id: 'personal-submarine',
      title: 'Personal Submarine',
      theme: 'cyan',
      content: 'Compact underwater exploration vessel for recreational diving'
    },
    'smaller-projects': {
      id: 'smaller-projects',
      title: 'Smaller Projects Collection',
      theme: 'orange',
      content: 'Diverse portfolio of experimental projects and innovations'
    }
  },
  edges: {
    start: ['techno'],
    techno: ['engineering', 'memories', 'projects'],
    engineering: ['techno', 'projects'],
    memories: ['techno', 'projects'],
    projects: ['techno', 'engineering', 'memories', 'five-axis-printer', 'underwater-probe', 'piezo-microscope', 'personal-submarine', 'smaller-projects'],
    'five-axis-printer': ['projects'],
    'underwater-probe': ['projects'],
    'piezo-microscope': ['projects'],
    'personal-submarine': ['projects'],
    'smaller-projects': ['projects']
  }
};

// Main App Component
const MyUniverse = () => {
  const [currentNode, setCurrentNode] = useState('start');
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Initialize night mode based on current time of day
  const [isNightMode, setIsNightMode] = useState(() => {
    const currentHour = new Date().getHours();
    // Night mode from 6 PM (18:00) to 6 AM (6:00)
    return currentHour >= 18 || currentHour < 6;
  });

  const navigate = (nodeId) => {
    if (memoryGraph.nodes[nodeId]) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentNode(nodeId);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const transitionToTechno = () => {
    // Set night mode based on current time when transitioning from start
    const currentHour = new Date().getHours();
    const shouldBeNight = currentHour >= 18 || currentHour < 6;
    setIsNightMode(shouldBeNight);
    navigate('techno');
  };

  const toggleTime = () => {
    setIsNightMode(!isNightMode);
  };

  const renderCurrentNode = () => {
    switch (currentNode) {
      case 'start':
        return <StartNode onTransition={transitionToTechno} />;
      case 'techno':
        return isNightMode ? 
          <TechnoUniverseNight onNavigate={navigate} onToggleTime={toggleTime} /> :
          <TechnoUniverseDay onNavigate={navigate} onToggleTime={toggleTime} />;
      case 'engineering':
        return <EngineeringNode onNavigate={navigate} />;
      case 'memories':
        return <MemoryNode onNavigate={navigate} />;
      case 'projects':
        return <ProjectsNode onNavigate={navigate} />;
      case 'five-axis-printer':
        return <FiveAxisPrinter onNavigate={navigate} />;
      case 'underwater-probe':
        return <UnderwaterProbe onNavigate={navigate} />;
      case 'piezo-microscope':
        return <PiezoMicroscope onNavigate={navigate} />;
      case 'personal-submarine':
        return <PersonalSubmarine onNavigate={navigate} />;
      case 'smaller-projects':
        return <SmallerProjects onNavigate={navigate} />;
      default:
        return <StartNode onTransition={transitionToTechno} />;
    }
  };

  const transitionOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
    zIndex: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const transitionTextStyle = {
    color: '#facc15',
    fontSize: '24px'
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Navigation Menu - only show on non-start nodes */}
      {currentNode !== 'start' && (
        <NavigationMenu 
          memoryGraph={memoryGraph}
          currentNode={currentNode}
          onNavigate={navigate}
          isNightMode={isNightMode}
          onToggleTime={toggleTime}
        />
      )}
      
      <AnimatePresence mode="wait">
        {!isTransitioning && (
          <motion.div
            key={currentNode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderCurrentNode()}
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            style={transitionOverlayStyle}
            initial={{ scale: 0, borderRadius: '50%' }}
            animate={{ scale: 1, borderRadius: '0%' }}
            exit={{ scale: 0, borderRadius: '50%' }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            <motion.div
              style={transitionTextStyle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Entering memory space...
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyUniverse;