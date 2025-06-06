import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import YinYangNode from './YinYangNode';

const NavigationMenu = ({ memoryGraph, currentNode, onNavigate, isNightMode, onToggleTime }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [visibleNodes, setVisibleNodes] = useState([]);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [yinYangHoverSide, setYinYangHoverSide] = useState(null); // 'yin' or 'yang'

  useEffect(() => {
    // Get current node and its adjacent nodes
    const currentNodeData = memoryGraph.nodes[currentNode];
    const adjacentNodeIds = memoryGraph.edges[currentNode] || [];
    
    const nodes = [currentNodeData];
    adjacentNodeIds.forEach(nodeId => {
      if (memoryGraph.nodes[nodeId]) {
        nodes.push(memoryGraph.nodes[nodeId]);
      }
    });
    
    setVisibleNodes(nodes);
  }, [currentNode, memoryGraph]);

  const getNodePosition = (nodeId, index, total) => {
    if (nodeId === currentNode) {
      return { x: 150, y: 100 }; // Center position for current node
    }
    
    // Position adjacent nodes in a circle around the current node
    const angle = (index * 2 * Math.PI) / (total - 1);
    const radius = 60;
    return {
      x: 150 + Math.cos(angle) * radius,
      y: 100 + Math.sin(angle) * radius
    };
  };

  const getNodeColor = (theme) => {
    switch (theme) {
      case 'black':
        return '#374151';
      case 'yellow-techno':
        return '#facc15';
      case 'tech':
        return '#3b82f6';
      case 'nostalgic':
        return '#8b5cf6';
      case 'green':
        return '#66ff66';
      case 'blue':
        return '#00aaff';
      case 'purple':
        return '#aa66ff';
      case 'cyan':
        return '#00ffcc';
      case 'orange':
        return '#ff8800';
      default:
        return '#6b7280';
    }
  };

  const getHoverHaloColor = (nodeId) => {
    if (nodeId === 'techno') {
      // For techno node, return different colors based on hover side
      if (yinYangHoverSide === 'yin') {
        // Night mode colors - purple/dark
        return '#8b5cf6';
      } else if (yinYangHoverSide === 'yang') {
        // Day mode colors - yellow/light
        return '#facc15';
      }
      // Default techno color when no specific side is hovered
      return '#facc15';
    }
    
    // For regular nodes, use their theme color
    const node = memoryGraph.nodes[nodeId];
    return node ? getNodeColor(node.theme) : '#6b7280';
  };

  const handleNodeClick = (nodeId) => {
    if (nodeId !== currentNode) {
      onNavigate(nodeId);
      setIsOpen(false);
    }
  };

  const handleTechnoYinYangClick = (clickX, position, isCurrent) => {
    if (isCurrent) {
      // If we're on the techno node, toggle between day/night
      onToggleTime();
    } else {
      // If navigating to techno, determine day/night based on click position
      const centerX = position.x;
      const isLeftSide = clickX < centerX;
      
      // Navigate to techno node first
      onNavigate('techno');
      setIsOpen(false);
      
      // Then set the appropriate mode after a brief delay
      setTimeout(() => {
        // Left side (yin/dark) = night mode, Right side (yang/light) = day mode
        if ((isLeftSide && !isNightMode) || (!isLeftSide && isNightMode)) {
          onToggleTime();
        }
      }, 100);
    }
  };

  const handleYinYangHover = (nodeId, side) => {
    setHoveredNode(nodeId);
    setYinYangHoverSide(side);
  };

  const handleYinYangHoverEnd = () => {
    setHoveredNode(null);
    setYinYangHoverSide(null);
  };

  const menuButtonStyle = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 100,
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: isOpen ? 'rgba(250, 204, 21, 0.2)' : 'rgba(0, 0, 0, 0.7)',
    border: `2px solid ${isOpen ? '#facc15' : 'rgba(255, 255, 255, 0.3)'}`,
    color: isOpen ? '#facc15' : 'white',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease',
    boxShadow: isOpen ? '0 0 20px rgba(250, 204, 21, 0.3)' : 'none'
  };

  const menuPanelStyle = {
    position: 'fixed',
    top: '80px',
    right: '20px',
    width: '300px',
    height: '200px',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    padding: '20px',
    zIndex: 99,
    backdropFilter: 'blur(20px)'
  };

  const svgStyle = {
    width: '100%',
    height: '100%'
  };

  const nodeStyle = {
    cursor: 'pointer'
  };

  const edgeStyle = {
    stroke: 'rgba(255, 255, 255, 0.3)',
    strokeWidth: 2
  };

  const nodeTextStyle = {
    fill: 'white',
    fontSize: '10px',
    textAnchor: 'middle',
    dominantBaseline: 'middle',
    pointerEvents: 'none'
  };

  return (
    <>
      {/* Menu Button */}
      <motion.div
        style={menuButtonStyle}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          ⚡
        </motion.div>
      </motion.div>

      {/* Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            style={menuPanelStyle}
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            
            <svg style={svgStyle}>
              {/* Render edges first */}
              {visibleNodes.map((nodeA, indexA) => {
                return visibleNodes.map((nodeB, indexB) => {
                  // Skip if same node or if we've already rendered this edge
                  if (indexA >= indexB) return null;
                  
                  // Check if there's an edge between nodeA and nodeB in either direction
                  const hasEdgeAB = memoryGraph.edges[nodeA.id]?.includes(nodeB.id);
                  const hasEdgeBA = memoryGraph.edges[nodeB.id]?.includes(nodeA.id);
                  
                  if (!hasEdgeAB && !hasEdgeBA) return null;
                  
                  const posA = getNodePosition(nodeA.id, indexA, visibleNodes.length);
                  const posB = getNodePosition(nodeB.id, indexB, visibleNodes.length);
                  
                  return (
                    <motion.line
                      key={`edge-${nodeA.id}-${nodeB.id}`}
                      x1={posA.x}
                      y1={posA.y}
                      x2={posB.x}
                      y2={posB.y}
                      style={edgeStyle}
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.3 + (indexA + indexB) * 0.05, duration: 0.5 }}
                    />
                  );
                });
              }).flat().filter(Boolean)}
              
              {/* Render nodes */}
              {visibleNodes.map((node, index) => {
                const position = getNodePosition(node.id, index, visibleNodes.length);
                const isCurrent = node.id === currentNode;
                const nodeColor = getNodeColor(node.theme);
                
                // Special handling for techno node - render as yin-yang
                if (node.id === 'techno') {
                  return (
                    <YinYangNode
                      key={node.id}
                      node={node}
                      index={index}
                      position={position}
                      isCurrent={isCurrent}
                      isNightMode={isNightMode}
                      hoveredNode={hoveredNode}
                      yinYangHoverSide={yinYangHoverSide}
                      onHover={handleYinYangHover}
                      onHoverEnd={handleYinYangHoverEnd}
                      onToggleTime={onToggleTime}
                      onNavigate={onNavigate}
                      onClose={() => setIsOpen(false)}
                    />
                  );
                }
                
                // Regular node rendering for non-techno nodes
                return (
                  <g key={node.id}>
                    <motion.circle
                      cx={position.x}
                      cy={position.y}
                      r={isCurrent ? 20 : 15}
                      fill={nodeColor}
                      stroke={isCurrent ? 'white' : 'rgba(255, 255, 255, 0.5)'}
                      strokeWidth={isCurrent ? 3 : 2}
                      style={nodeStyle}
                      onClick={() => handleNodeClick(node.id)}
                      onMouseEnter={() => setHoveredNode(node.id)}
                      onMouseLeave={() => setHoveredNode(null)}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileTap={{ scale: 0.9 }}
                    />
                    <motion.text
                      x={position.x}
                      y={position.y + 30}
                      style={nodeTextStyle}
                      onClick={() => handleNodeClick(node.id)}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    >
                      {node.title.length > 12 ? node.title.substring(0, 12) + '...' : node.title}
                    </motion.text>
                    
                    {/* Add hover halo effect showing destination color */}
                    {hoveredNode === node.id && (
                      <motion.circle
                        cx={position.x}
                        cy={position.y}
                        r={isCurrent ? 20 : 15}
                        fill="none"
                        stroke={getHoverHaloColor(node.id)}
                        strokeWidth={3}
                        opacity={0.8}
                        initial={{ scale: 1, opacity: 0 }}
                        animate={{ scale: isCurrent ? 1.2 : 1.4, opacity: 0.8 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                    
                    {/* Add pulsing effect for current node */}
                    {isCurrent && (
                      <motion.circle
                        cx={position.x}
                        cy={position.y}
                        r={20}
                        fill="none"
                        stroke={nodeColor}
                        strokeWidth={2}
                        opacity={0.3}
                        animate={{ r: [20, 30, 20], opacity: [0.3, 0, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </g>
                );
              })}
            </svg>
            
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavigationMenu;
