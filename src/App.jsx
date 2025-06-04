import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import StartNode from './nodes/StartNode';
import TechnoUniverseNode from './nodes/TechnoUniverseNode';
import EngineeringNode from './nodes/EngineeringNode';
import MemoryNode from './nodes/MemoryNode';

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
    }
  },
  edges: {
    start: ['techno'],
    techno: ['engineering', 'memories'],
    engineering: ['techno'],
    memories: ['techno']
  }
};

// Main App Component
const MyUniverse = () => {
  const [currentNode, setCurrentNode] = useState('start');
  const [isTransitioning, setIsTransitioning] = useState(false);

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
    navigate('techno');
  };

  const renderCurrentNode = () => {
    switch (currentNode) {
      case 'start':
        return <StartNode onTransition={transitionToTechno} />;
      case 'techno':
        return <TechnoUniverseNode onNavigate={navigate} />;
      case 'engineering':
        return <EngineeringNode onNavigate={navigate} />;
      case 'memories':
        return <MemoryNode onNavigate={navigate} />;
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