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
      content: 'Interactive techno-anime exploration hub',
      subGraph: {
        nodes: {
          'techno-hub': {
            id: 'techno-hub',
            title: 'My Universe',
            theme: 'yellow-techno',
            content: 'Interactive techno-anime exploration hub'
          },
          'techno-deep': {
            id: 'techno-deep',
            title: 'Deep Universe',
            theme: 'yellow-techno',
            content: 'The inner workings of the techno universe'
          },
          'techno-quantum': {
            id: 'techno-quantum',
            title: 'Quantum Layer',
            theme: 'purple',
            content: 'Where reality bends and shifts'
          }
        },
        edges: {
          'techno-hub': ['techno-deep', 'techno-quantum'],
          'techno-deep': ['techno-hub', 'techno-quantum'],
          'techno-quantum': ['techno-hub', 'techno-deep']
        }
      }
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
      content: 'A collection of creative endeavors and technical achievements...',
      subGraph: {
        nodes: {
          'projects-hub': {
            id: 'projects-hub',
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
          'projects-hub': ['five-axis-printer', 'underwater-probe', 'piezo-microscope', 'personal-submarine', 'smaller-projects'],
          'five-axis-printer': ['projects-hub'],
          'underwater-probe': ['projects-hub'],
          'piezo-microscope': ['projects-hub'],
          'personal-submarine': ['projects-hub'],
          'smaller-projects': ['projects-hub']
        }
      }
    }
  },
  edges: {
    start: ['techno'],
    techno: ['engineering', 'memories', 'projects'],
    engineering: ['techno', 'projects'],
    memories: ['techno', 'projects'],
    projects: ['techno', 'engineering', 'memories']
  }
};

// Main App Component
const MyUniverse = () => {
  const [currentNode, setCurrentNode] = useState('start');
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Hierarchical navigation state
  const [navigationPath, setNavigationPath] = useState(['root']); // Track path through graph levels
  const [currentGraphLevel, setCurrentGraphLevel] = useState(memoryGraph); // Current graph being displayed
  
  // Initialize night mode based on current time of day
  const [isNightMode, setIsNightMode] = useState(() => {
    const currentHour = new Date().getHours();
    // Night mode from 6 PM (18:00) to 6 AM (6:00)
    return currentHour >= 18 || currentHour < 6;
  });

  const navigate = (nodeId) => {
    // Check if we're navigating within current graph level
    if (currentGraphLevel.nodes[nodeId]) {
      // Direct navigation without transition screen for smoother menu experience
      setCurrentNode(nodeId);
    }
  };

  const enterSubGraph = (nodeId) => {
    const node = currentGraphLevel.nodes[nodeId];
    if (node && node.subGraph) {
      setIsTransitioning(true);
      setTimeout(() => {
        // Enter the sub-graph
        setNavigationPath(prev => [...prev, nodeId]);
        setCurrentGraphLevel(node.subGraph);
        
        // Set current node to the hub node (internal representation of parent)
        // Look for a node with the pattern nodeId + '-hub' or similar naming
        const hubNodeId = `${nodeId}-hub`;
        const startingNodeId = node.subGraph.nodes[hubNodeId] ? hubNodeId : Object.keys(node.subGraph.nodes)[0];
        setCurrentNode(startingNodeId);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const exitSubGraph = () => {
    if (navigationPath.length > 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        // Pop the current level from the path
        const newPath = navigationPath.slice(0, -1);
        setNavigationPath(newPath);
        
        // Navigate back to parent graph level
        let parentGraph = memoryGraph;
        for (let i = 1; i < newPath.length; i++) {
          const parentNodeId = newPath[i];
          parentGraph = parentGraph.nodes[parentNodeId].subGraph;
        }
        
        setCurrentGraphLevel(parentGraph);
        
        // Set current node to the parent node
        const parentNodeId = navigationPath[navigationPath.length - 1];
        setCurrentNode(parentNodeId);
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

  const renderSubGraphNode = () => {
    const nodeData = currentGraphLevel.nodes[currentNode];
    if (!nodeData) return null;

    return (
      <div style={{
        minHeight: '100vh',
        background: getNodeBackgroundGradient(nodeData.theme),
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '32px',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: '4rem',
            fontWeight: 'bold',
            marginBottom: '2rem',
            color: 'white'
          }}>
            {nodeData.title}
          </h1>
          <p style={{
            fontSize: '1.5rem',
            opacity: 0.9,
            marginBottom: '3rem'
          }}>
            {nodeData.content}
          </p>
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {currentGraphLevel.edges[currentNode]?.map(connectedNodeId => {
              const connectedNode = currentGraphLevel.nodes[connectedNodeId];
              return (
                <button
                  key={connectedNodeId}
                  onClick={() => navigate(connectedNodeId)}
                  style={{
                    padding: '12px 24px',
                    background: `rgba(255, 255, 255, 0.1)`,
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '8px',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={e => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.6)';
                  }}
                  onMouseLeave={e => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                  }}
                >
                  {connectedNode?.title || connectedNodeId}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const getNodeBackgroundGradient = (theme) => {
    switch (theme) {
      case 'yellow-techno':
        return 'linear-gradient(135deg, #92400e, #451a03)';
      case 'tech':
        return 'linear-gradient(135deg, #1e3a8a, #312e81)';
      case 'nostalgic':
        return 'linear-gradient(135deg, #581c87, #be185d)';
      case 'green':
        return 'linear-gradient(135deg, #0d3818, #001a0d)';
      case 'blue':
        return 'linear-gradient(135deg, #0c4a6e, #164e63)';
      case 'purple':
        return 'linear-gradient(135deg, #581c87, #6b21a8)';
      case 'cyan':
        return 'linear-gradient(135deg, #164e63, #0891b2)';
      case 'orange':
        return 'linear-gradient(135deg, #9a3412, #c2410c)';
      default:
        return 'linear-gradient(135deg, #374151, #1f2937)';
    }
  };
        
  const renderCurrentNode = () => {
    switch (currentNode) {
      case 'start':
        return <StartNode onTransition={transitionToTechno} />;
      case 'techno':
      case 'techno-hub':
        return isNightMode ? 
          <TechnoUniverseNight onNavigate={navigate} onToggleTime={toggleTime} /> :
          <TechnoUniverseDay onNavigate={navigate} onToggleTime={toggleTime} />;
      case 'engineering':
        return <EngineeringNode onNavigate={navigate} />;
      case 'memories':
        return <MemoryNode onNavigate={navigate} />;
      case 'projects':
      case 'projects-hub':
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
      // Handle sub-graph nodes with generic node renderer
      default:
        return renderSubGraphNode();
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
          memoryGraph={currentGraphLevel}
          currentNode={currentNode}
          onNavigate={navigate}
          onEnterSubGraph={enterSubGraph}
          onExitSubGraph={exitSubGraph}
          navigationPath={navigationPath}
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