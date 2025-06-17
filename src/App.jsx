import React, { useState, useCallback, useMemo, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ErrorBoundary from './components/ErrorBoundary';
import PerformanceMonitor from './components/PerformanceMonitor';

// Lazy load components for better performance
const StartNode = lazy(() => import('./nodes/StartNode'));
const TechnoUniverseDay = lazy(() => import('./nodes/technouniverse/TechnoUniverseDay'));
const TechnoUniverseNight = lazy(() => import('./nodes/technouniverse/TechnoUniverseNight'));
const EngineeringNode = lazy(() => import('./nodes/EngineeringNode'));
const MemoryNode = lazy(() => import('./nodes/MemoryNode'));
const ProjectsNode = lazy(() => import('./nodes/ProjectsNode'));
const NavigationMenu = lazy(() => import('./components/NavigationMenu'));
const FiveAxisPrinter = lazy(() => import('./nodes/projects/FiveAxisPrinter'));
const UnderwaterProbe = lazy(() => import('./nodes/projects/UnderwaterProbe'));
const PiezoMicroscope = lazy(() => import('./nodes/projects/PiezoMicroscope'));
const PersonalSubmarine = lazy(() => import('./nodes/projects/PersonalSubmarine'));
const SmallerProjects = lazy(() => import('./nodes/projects/SmallerProjects'));
const IoTWeatherStation = lazy(() => import('./nodes/projects/smallerprojects/IoTWeatherStation'));
const GestureDroneInterface = lazy(() => import('./nodes/projects/smallerprojects/GestureDroneInterface'));
const AutonomousGarden = lazy(() => import('./nodes/projects/smallerprojects/AutonomousGarden'));
const HolographicDisplay = lazy(() => import('./nodes/projects/smallerprojects/HolographicDisplay'));
const NeuralNetworkMusic = lazy(() => import('./nodes/projects/smallerprojects/NeuralNetworkMusic'));
const MagneticLevitation = lazy(() => import('./nodes/projects/smallerprojects/MagneticLevitation'));

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
      content: 'The mechanical universe where logic meets creativity...',
      subGraph: {
        nodes: {
          'engineering-hub': {
            id: 'engineering-hub',
            title: 'Engineering Cosmos',
            theme: 'tech',
            content: 'The mechanical universe where logic meets creativity...'
          },
          'mech-design': {
            id: 'mech-design',
            title: 'Mechanical Design',
            theme: 'mech-blue',
            content: 'CAD, 3D modeling, and mechanical engineering workflows'
          },
          'electronics': {
            id: 'electronics',
            title: 'Electronics',
            theme: 'electric-orange',
            content: 'Circuit design, embedded systems, and electronic prototyping'
          },
          'software': {
            id: 'software',
            title: 'Software',
            theme: 'code-green',
            content: 'Programming, algorithms, and software architecture'
          }
        },
        edges: {
          'engineering-hub': ['mech-design', 'electronics', 'software'],
          'mech-design': ['engineering-hub', 'electronics', 'software'],
          'electronics': ['engineering-hub', 'mech-design', 'software'],
          'software': ['engineering-hub', 'mech-design', 'electronics']
        }
      }
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
            content: 'Diverse portfolio of experimental projects and innovations',
            subGraph: {
              nodes: {
                'smaller-projects-hub': {
                  id: 'smaller-projects-hub',
                  title: 'Smaller Projects Collection',
                  theme: 'orange',
                  content: 'Diverse portfolio of experimental projects and innovations'
                },
                'iot-weather-station': {
                  id: 'iot-weather-station',
                  title: 'IoT Weather Monitoring Station',
                  theme: 'blue',
                  content: 'Solar-powered weather station with real-time data logging and web dashboard'
                },
                'gesture-drone-interface': {
                  id: 'gesture-drone-interface',
                  title: 'Gesture-Controlled Drone Interface',
                  theme: 'purple',
                  content: 'Hand gesture recognition system for intuitive drone control using computer vision'
                },
                'autonomous-garden': {
                  id: 'autonomous-garden',
                  title: 'Autonomous Garden System',
                  theme: 'green',
                  content: 'Smart irrigation and monitoring system with AI-driven plant health optimization'
                },
                'holographic-display': {
                  id: 'holographic-display',
                  title: 'Holographic Display Experiments',
                  theme: 'cyan',
                  content: 'Research into volumetric displays using persistence of vision and LED arrays'
                },
                'neural-network-music': {
                  id: 'neural-network-music',
                  title: 'Neural Network Music Generator',
                  theme: 'purple',
                  content: 'AI-powered music composition system using deep learning and MIDI synthesis'
                },
                'magnetic-levitation': {
                  id: 'magnetic-levitation',
                  title: 'Electromagnetic Levitation Display',
                  theme: 'orange',
                  content: 'Electromagnetic levitation system for floating object displays with feedback control'
                }
              },
              edges: {
                'smaller-projects-hub': ['iot-weather-station', 'gesture-drone-interface', 'autonomous-garden', 'holographic-display', 'neural-network-music', 'magnetic-levitation'],
                'iot-weather-station': ['smaller-projects-hub'],
                'gesture-drone-interface': ['smaller-projects-hub'],
                'autonomous-garden': ['smaller-projects-hub'],
                'holographic-display': ['smaller-projects-hub'],
                'neural-network-music': ['smaller-projects-hub'],
                'magnetic-levitation': ['smaller-projects-hub']
              }
            }
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
  
  // Initialize night mode based on current time of day - memoized to prevent recalculation
  const [isNightMode, setIsNightMode] = useState(() => {
    const currentHour = new Date().getHours();
    // Night mode from 6 PM (18:00) to 6 AM (6:00)
    return currentHour >= 18 || currentHour < 6;
  });

  // Memoized navigation function to prevent unnecessary re-renders
  const navigate = useCallback((nodeId) => {
    // First, check if target node exists in current graph level
    if (currentGraphLevel.nodes[nodeId]) {
      setCurrentNode(nodeId);
      return;
    }

    // If not found in current level, search all graph levels for the target node
    // Check main graph
    if (memoryGraph.nodes[nodeId]) {
      // If we're in a subgraph, exit to main graph first
      if (navigationPath.length > 1) {
        setIsTransitioning(true);
        const timeoutId = setTimeout(() => {
          setNavigationPath(['root']);
          setCurrentGraphLevel(memoryGraph);
          setCurrentNode(nodeId);
          setIsTransitioning(false);
        }, 300);
        
        // Cleanup timeout to prevent memory leaks
        return () => clearTimeout(timeoutId);
      } else {
        setCurrentNode(nodeId);
      }
      return;
    }

    // Check all subgraphs for the target node
    for (const [parentNodeId, parentNode] of Object.entries(memoryGraph.nodes)) {
      if (parentNode.subGraph && parentNode.subGraph.nodes[nodeId]) {
        // Found in a subgraph - navigate there
        setIsTransitioning(true);
        const timeoutId = setTimeout(() => {
          setNavigationPath(['root', parentNodeId]);
          setCurrentGraphLevel(parentNode.subGraph);
          setCurrentNode(nodeId);
          setIsTransitioning(false);
        }, 300);
        
        // Cleanup timeout to prevent memory leaks
        return () => clearTimeout(timeoutId);
      }
    }

    // If node not found anywhere, log warning
    console.warn(`Navigation target '${nodeId}' not found in any graph level`);
  }, [currentGraphLevel, navigationPath]);

  const enterSubGraph = useCallback((nodeId) => {
    const node = currentGraphLevel.nodes[nodeId];
    if (node && node.subGraph) {
      setIsTransitioning(true);
      const timeoutId = setTimeout(() => {
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
      
      // Cleanup timeout to prevent memory leaks
      return () => clearTimeout(timeoutId);
    }
  }, [currentGraphLevel]);

  const exitSubGraph = useCallback(() => {
    if (navigationPath.length > 1) {
      setIsTransitioning(true);
      const timeoutId = setTimeout(() => {
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
      
      // Cleanup timeout to prevent memory leaks
      return () => clearTimeout(timeoutId);
    }
  }, [navigationPath]);

  const transitionToTechno = useCallback(() => {
    // Set night mode based on current time when transitioning from start
    const currentHour = new Date().getHours();
    const shouldBeNight = currentHour >= 18 || currentHour < 6;
    setIsNightMode(shouldBeNight);
    navigate('techno');
  }, [navigate]);

  const toggleTime = useCallback(() => {
    setIsNightMode(prev => !prev);
  }, []);

  // Memoized helper functions to prevent re-renders
  const getProjectsHubTarget = useCallback(() => {
    // If we're currently in the projects subgraph (navigationPath length > 1 and current graph level has projects-hub)
    if (navigationPath.length > 1 && currentGraphLevel.nodes && currentGraphLevel.nodes['projects-hub']) {
      return 'projects-hub';
    }
    // Otherwise, we're in the main graph level, so return 'projects'
    return 'projects';
  }, [navigationPath, currentGraphLevel]);

  const getNodeBackgroundGradient = useCallback((theme) => {
    switch (theme) {
      case 'yellow-techno':
        return 'linear-gradient(135deg, #92400e, #451a03)';
      case 'tech':
        return 'linear-gradient(135deg, #1e3a8a, #312e81)';
      case 'mech-blue':
        return 'linear-gradient(135deg, #1e40af, #1e3a8a)';
      case 'electric-orange':
        return 'linear-gradient(135deg, #ea580c, #c2410c)';
      case 'code-green':
        return 'linear-gradient(135deg, #059669, #047857)';
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
  }, []);

  // Memoized sub-graph node renderer
  const renderSubGraphNode = useMemo(() => {
    const nodeData = currentGraphLevel.nodes[currentNode];
    if (!nodeData) return null;

    // Get theme-specific colors
    const getThemeColors = (theme) => {
      switch (theme) {
        case 'tech':
          return {
            titleColor: 'linear-gradient(45deg, #60a5fa, #22d3ee, #60a5fa)',
            textColor: 'white',
            buttonBg: 'rgba(96, 165, 250, 0.1)',
            buttonBorder: 'rgba(96, 165, 250, 0.5)',
            buttonColor: '#60a5fa',
            buttonHoverBg: 'rgba(96, 165, 250, 0.2)',
            buttonHoverBorder: 'rgba(96, 165, 250, 0.7)'
          };
        case 'mech-blue':
          return {
            titleColor: 'linear-gradient(45deg, #3b82f6, #60a5fa, #3b82f6)',
            textColor: 'white',
            buttonBg: 'rgba(59, 130, 246, 0.1)',
            buttonBorder: 'rgba(59, 130, 246, 0.5)',
            buttonColor: '#3b82f6',
            buttonHoverBg: 'rgba(59, 130, 246, 0.2)',
            buttonHoverBorder: 'rgba(59, 130, 246, 0.7)'
          };
        case 'electric-orange':
          return {
            titleColor: 'linear-gradient(45deg, #f97316, #fb923c, #f97316)',
            textColor: 'white',
            buttonBg: 'rgba(249, 115, 22, 0.1)',
            buttonBorder: 'rgba(249, 115, 22, 0.5)',
            buttonColor: '#f97316',
            buttonHoverBg: 'rgba(249, 115, 22, 0.2)',
            buttonHoverBorder: 'rgba(249, 115, 22, 0.7)'
          };
        case 'code-green':
          return {
            titleColor: 'linear-gradient(45deg, #10b981, #34d399, #10b981)',
            textColor: 'white',
            buttonBg: 'rgba(16, 185, 129, 0.1)',
            buttonBorder: 'rgba(16, 185, 129, 0.5)',
            buttonColor: '#10b981',
            buttonHoverBg: 'rgba(16, 185, 129, 0.2)',
            buttonHoverBorder: 'rgba(16, 185, 129, 0.7)'
          };
        case 'green':
          return {
            titleColor: 'linear-gradient(45deg, #00ff88, #66ffaa, #00ff88)',
            textColor: 'white',
            buttonBg: 'rgba(0, 255, 136, 0.1)',
            buttonBorder: 'rgba(0, 255, 136, 0.5)',
            buttonColor: '#00ff88',
            buttonHoverBg: 'rgba(0, 255, 136, 0.2)',
            buttonHoverBorder: 'rgba(0, 255, 136, 0.7)'
          };
        case 'nostalgic':
          return {
            titleColor: 'linear-gradient(45deg, #a78bfa, #f472b6, #a78bfa)',
            textColor: 'white',
            buttonBg: 'rgba(139, 92, 246, 0.1)',
            buttonBorder: 'rgba(139, 92, 246, 0.5)',
            buttonColor: '#8b5cf6',
            buttonHoverBg: 'rgba(139, 92, 246, 0.2)',
            buttonHoverBorder: 'rgba(139, 92, 246, 0.7)'
          };
        case 'orange':
          return {
            titleColor: 'linear-gradient(45deg, #ff8800, #ffaa44, #ff8800)',
            textColor: 'white',
            buttonBg: 'rgba(255, 136, 0, 0.1)',
            buttonBorder: 'rgba(255, 136, 0, 0.5)',
            buttonColor: '#ff8800',
            buttonHoverBg: 'rgba(255, 136, 0, 0.2)',
            buttonHoverBorder: 'rgba(255, 136, 0, 0.7)'
          };
        default:
          return {
            titleColor: 'white',
            textColor: 'white',
            buttonBg: 'rgba(255, 255, 255, 0.1)',
            buttonBorder: 'rgba(255, 255, 255, 0.3)',
            buttonColor: 'white',
            buttonHoverBg: 'rgba(255, 255, 255, 0.2)',
            buttonHoverBorder: 'rgba(255, 255, 255, 0.6)'
          };
      }
    };

    const colors = getThemeColors(nodeData.theme);

    return (
      <div style={{
        minHeight: '100vh',
        background: getNodeBackgroundGradient(nodeData.theme),
        color: colors.textColor,
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
            background: colors.titleColor,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: ['tech', 'mech-blue'].includes(nodeData.theme) ? '0 0 20px #60a5fa' : 
                       nodeData.theme === 'electric-orange' ? '0 0 20px #f97316' :
                       nodeData.theme === 'orange' ? '0 0 20px #ff8800' :
                       nodeData.theme === 'code-green' ? '0 0 20px #10b981' : 'none'
          }}>
            {nodeData.title}
          </h1>
          <p style={{
            fontSize: '1.5rem',
            opacity: 0.9,
            marginBottom: '3rem',
            color: colors.textColor
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
                    background: colors.buttonBg,
                    border: `2px solid ${colors.buttonBorder}`,
                    borderRadius: '8px',
                    color: colors.buttonColor,
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={e => {
                    e.target.style.background = colors.buttonHoverBg;
                    e.target.style.borderColor = colors.buttonHoverBorder;
                    if (['tech', 'mech-blue'].includes(nodeData.theme)) {
                      e.target.style.boxShadow = '0 5px 15px rgba(96, 165, 250, 0.4)';
                    } else if (nodeData.theme === 'electric-orange') {
                      e.target.style.boxShadow = '0 5px 15px rgba(249, 115, 22, 0.4)';
                    } else if (nodeData.theme === 'orange') {
                      e.target.style.boxShadow = '0 5px 15px rgba(255, 136, 0, 0.4)';
                    } else if (nodeData.theme === 'code-green') {
                      e.target.style.boxShadow = '0 5px 15px rgba(16, 185, 129, 0.4)';
                    }
                  }}
                  onMouseLeave={e => {
                    e.target.style.background = colors.buttonBg;
                    e.target.style.borderColor = colors.buttonBorder;
                    e.target.style.boxShadow = 'none';
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
  }, [currentGraphLevel, currentNode, navigate, getNodeBackgroundGradient]);

  // Memoized current node renderer with error boundary
  const renderCurrentNode = useMemo(() => {
    const projectsHubTarget = getProjectsHubTarget();
    
    switch (currentNode) {
      case 'start':
        return <StartNode onTransition={transitionToTechno} />;
      case 'techno':
      case 'techno-hub':
        return isNightMode ? 
          <TechnoUniverseNight onNavigate={navigate} onToggleTime={toggleTime} /> :
          <TechnoUniverseDay onNavigate={navigate} onToggleTime={toggleTime} />;
      case 'engineering':
      case 'engineering-hub':
        return <EngineeringNode onNavigate={navigate} />;
      case 'memories':
        return <MemoryNode onNavigate={navigate} />;
      case 'projects':
      case 'projects-hub':
        return <ProjectsNode onNavigate={navigate} />;
      case 'five-axis-printer':
        return <FiveAxisPrinter onNavigate={navigate} projectsHubTarget={projectsHubTarget} />;
      case 'underwater-probe':
        return <UnderwaterProbe onNavigate={navigate} projectsHubTarget={projectsHubTarget} />;
      case 'piezo-microscope':
        return <PiezoMicroscope onNavigate={navigate} projectsHubTarget={projectsHubTarget} />;
      case 'personal-submarine':
        return <PersonalSubmarine onNavigate={navigate} projectsHubTarget={projectsHubTarget} />;
      case 'smaller-projects':
      case 'smaller-projects-hub':
        return <SmallerProjects onNavigate={navigate} projectsHubTarget={projectsHubTarget} />;
      case 'iot-weather-station':
        return <IoTWeatherStation onNavigate={navigate} />;
      case 'gesture-drone-interface':
        return <GestureDroneInterface onNavigate={navigate} />;
      case 'autonomous-garden':
        return <AutonomousGarden onNavigate={navigate} />;
      case 'holographic-display':
        return <HolographicDisplay onNavigate={navigate} />;
      case 'neural-network-music':
        return <NeuralNetworkMusic onNavigate={navigate} />;
      case 'magnetic-levitation':
        return <MagneticLevitation onNavigate={navigate} />;
      // Handle sub-graph nodes with generic node renderer
      default:
        return renderSubGraphNode;
    }
  }, [currentNode, isNightMode, navigate, toggleTime, transitionToTechno, getProjectsHubTarget, renderSubGraphNode]);

  // Memoized style objects to prevent re-creation
  const transitionOverlayStyle = useMemo(() => ({
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
  }), []);

  const transitionTextStyle = useMemo(() => ({
    color: '#facc15',
    fontSize: '24px'
  }), []);

  const containerStyle = useMemo(() => ({ 
    position: 'relative' 
  }), []);

  return (
    <ErrorBoundary>
      <PerformanceMonitor enabled={process.env.NODE_ENV === 'development'} />
      <div style={containerStyle}>
        {/* Navigation Menu - only show on non-start nodes */}
        {currentNode !== 'start' && (
          <Suspense fallback={<div>Loading...</div>}>
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
          </Suspense>
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
              <Suspense fallback={<div>Loading...</div>}>
                {renderCurrentNode}
              </Suspense>
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
    </ErrorBoundary>
  );
};

export default MyUniverse;