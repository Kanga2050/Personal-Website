import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import YinYangNode from './YinYangNode';

const NavigationMenu = ({ memoryGraph, currentNode, onNavigate, onEnterSubGraph, onExitSubGraph, navigationPath, isNightMode, onToggleTime }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [visibleNodes, setVisibleNodes] = useState([]);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [yinYangHoverSide, setYinYangHoverSide] = useState(null); // 'yin' or 'yang'
  const [backgroundCircleRadius, setBackgroundCircleRadius] = useState(0);
  const [backgroundTheme, setBackgroundTheme] = useState(null);
  const [animatedPositions, setAnimatedPositions] = useState({});
  const [previousCurrentNode, setPreviousCurrentNode] = useState(currentNode);

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
    
    // Handle smooth transitions when currentNode changes within the same graph level
    if (previousCurrentNode !== currentNode && navigationPath.length > 0) {
      // Calculate new positions for all nodes
      const newPositions = {};
      nodes.forEach((node, index) => {
        newPositions[node.id] = getNodePosition(node.id, index, nodes.length);
      });
      setAnimatedPositions(newPositions);
      setPreviousCurrentNode(currentNode);
    }
    
    // Maintain background circle for subgraph navigation
    // If we're in a subgraph (navigationPath length > 1), keep the background circle visible
    if (navigationPath.length > 1) {
      // Get the parent node theme from the navigation path
      const parentNodeId = navigationPath[navigationPath.length - 1];
      // We need to get the theme from the root level nodes since we're in a subgraph
      const parentNodeTheme = getParentNodeTheme(parentNodeId);
      if (parentNodeTheme && backgroundCircleRadius === 0) {
        setBackgroundTheme(parentNodeTheme);
        const requiredRadius = calculateRequiredRadius();
        setBackgroundCircleRadius(requiredRadius); // Set to calculated size immediately
      }
    } else {
      // We're back at the root level, clear the background circle
      if (backgroundCircleRadius > 0) {
        setBackgroundCircleRadius(0);
        setBackgroundTheme(null);
      }
    }
  }, [currentNode, memoryGraph, navigationPath, previousCurrentNode]);

  // Helper function to get parent node theme from the main memory graph
  const getParentNodeTheme = (nodeId) => {
    // Look in the main memoryGraph for the parent node theme
    // We need to traverse from App.jsx's memoryGraph, but since we don't have direct access,
    // we'll use a mapping approach
    const themeMapping = {
      'techno': 'yellow-techno',
      'projects': 'green',
      'engineering': 'tech',
      'memories': 'nostalgic'
    };
    return themeMapping[nodeId] || 'green'; // Default to green if not found
  };

  // Calculate the minimum radius needed to contain all nodes in a given graph
  const calculateRequiredRadiusForGraph = (graphNodes, graphEdges, centralNodeId) => {
    if (!graphNodes || Object.keys(graphNodes).length <= 1) return 60; // Smaller minimum radius
    
    const nodeIds = Object.keys(graphNodes);
    const adjacentNodes = nodeIds.filter(id => id !== centralNodeId);
    
    if (adjacentNodes.length === 0) return 60;
    
    // The nodes are positioned in a circle of radius 70 around center
    // We just need to add the node radius (15px) plus small padding
    const nodePositionRadius = 70; // Distance from center to node centers
    const nodeRadius = 15; // Radius of non-current nodes
    const padding = 8; // Small padding around nodes
    
    const requiredRadius = nodePositionRadius + nodeRadius + padding;
    
    return Math.max(requiredRadius, 60); // Ensure minimum radius of 60
  };

  // Calculate the minimum radius needed to contain all visible nodes
  const calculateRequiredRadius = () => {
    return calculateRequiredRadiusForGraph(
      memoryGraph.nodes, 
      memoryGraph.edges, 
      currentNode
    );
  };

  const getNodePosition = (nodeId, index, total) => {
    if (nodeId === currentNode) {
      return { x: 180, y: 120 }; // Center position for current node (adjusted for larger SVG)
    }
    
    // Position adjacent nodes in a circle around the current node
    const angle = (index * 2 * Math.PI) / (total - 1);
    const radius = 70;
    return {
      x: 180 + Math.cos(angle) * radius,
      y: 120 + Math.sin(angle) * radius
    };
  };

  // Get animated position for smooth transitions
  const getAnimatedNodePosition = (nodeId, index, total) => {
    // If we have an animated position for this node, use it
    if (animatedPositions[nodeId]) {
      return animatedPositions[nodeId];
    }
    // Otherwise, fall back to the calculated position
    return getNodePosition(nodeId, index, total);
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

  const getBackgroundColor = (theme) => {
    const color = getNodeColor(theme);
    // Convert hex to rgba with better opacity for visibility
    const hex = color.replace('#', '');
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    
    // Use higher opacity and add brightness adjustment for better visibility
    const brightness = 0.4; // Increase brightness
    const opacity = 0.6; // Increase opacity
    
    return `rgba(${Math.min(255, r + r * brightness)}, ${Math.min(255, g + g * brightness)}, ${Math.min(255, b + b * brightness)}, ${opacity})`;
  };

  const handleNodeClick = (nodeId) => {
    const clickedNode = memoryGraph.nodes[nodeId];
    
    if (nodeId === currentNode && clickedNode.subGraph) {
      // Current node with sub-graph - enter sub-graph with expansion animation
      startExpansionAnimation(clickedNode, () => {
        onEnterSubGraph(nodeId);
        // Keep menu open for subgraph navigation
      });
    } else if (nodeId !== currentNode) {
      // Navigate to different node - keep menu open for smoother experience
      onNavigate(nodeId);
      // Don't close menu immediately - let it stay open for continuous navigation
    }
  };

  const startExpansionAnimation = (node, onComplete) => {
    setBackgroundTheme(node.theme);
    setBackgroundCircleRadius(0);
    
    // Calculate the target radius based on the subgraph contents
    let targetRadius = 80; // Default minimum
    if (node.subGraph && node.subGraph.nodes) {
      // Find the hub node ID (the central node in the subgraph)
      const hubNodeId = `${node.id}-hub`;
      const centralNodeId = node.subGraph.nodes[hubNodeId] ? hubNodeId : Object.keys(node.subGraph.nodes)[0];
      targetRadius = calculateRequiredRadiusForGraph(
        node.subGraph.nodes, 
        node.subGraph.edges, 
        centralNodeId
      );
    }
    
    // Use a more reliable animation approach with requestAnimationFrame
    let animationId;
    let startTime = null;
    const duration = 800; // 800ms for expansion
    
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Use easeOut animation curve
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const newRadius = easedProgress * targetRadius;
      
      setBackgroundCircleRadius(newRadius);
      
      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      } else {
        // Animation complete - call onComplete but keep the circle visible
        // The circle will persist to show the exit boundary
        onComplete();
      }
    };
    
    animationId = requestAnimationFrame(animate);
    
    // Return cleanup function
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  };

  const startCollapseAnimation = (theme, onComplete) => {
    setBackgroundTheme(theme);
    const startRadius = backgroundCircleRadius; // Use current radius as starting point
    
    // Use a more reliable animation approach with requestAnimationFrame
    let animationId;
    let startTime = null;
    const duration = 600; // 600ms for collapse
    
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Use easeIn animation curve for collapse
      const easedProgress = Math.pow(progress, 2);
      const newRadius = startRadius * (1 - easedProgress);
      
      setBackgroundCircleRadius(newRadius);
      
      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      } else {
        // Animation complete - reset and call onComplete
        setBackgroundCircleRadius(0);
        setBackgroundTheme(null);
        setTimeout(() => {
          onComplete();
        }, 100);
      }
    };
    
    animationId = requestAnimationFrame(animate);
    
    // Return cleanup function
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  };

  const handleBackgroundClick = (e) => {
    if (!isOpen) return;
    
    // Don't close menu if clicking on nodes or their text - only on empty background
    if (e.target.tagName === 'circle' || e.target.tagName === 'text' || e.target.tagName === 'g') {
      return;
    }
    
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = 180; // SVG center (adjusted)
    const centerY = 120; // SVG center (adjusted)
    const clickX = e.nativeEvent.offsetX;
    const clickY = e.nativeEvent.offsetY;
    
    // Calculate distance from center
    const distance = Math.sqrt(Math.pow(clickX - centerX, 2) + Math.pow(clickY - centerY, 2));
    
    // Use the current background circle radius as the boundary (with small buffer for better UX)
    const boundaryRadius = backgroundCircleRadius - 10; // 10px buffer inside the circle
    
    // If clicked outside the boundary and we're in a sub-graph, exit with animation
    if (distance > boundaryRadius && navigationPath.length > 1) {
      const currentNodeData = memoryGraph.nodes[currentNode];
      if (currentNodeData) {
        // Get the theme for the collapse animation
        const parentNodeId = navigationPath[navigationPath.length - 1];
        const parentTheme = getParentNodeTheme(parentNodeId);
        startCollapseAnimation(parentTheme, () => {
          onExitSubGraph();
        });
      } else {
        onExitSubGraph();
      }
      // Don't close menu when exiting subgraph - keep it open for continued navigation
    } else if (navigationPath.length === 1 && distance > 120) {
      // Only close menu when clicking far outside the node area at root level
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
      // Keep menu open for continued navigation
      
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
    width: '360px',
    height: '240px',
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
          <>
            {/* Navigation Path Indicator */}
            {navigationPath.length > 1 && (
              <motion.div
                style={{
                  position: 'fixed',
                  top: '40px',
                  right: '20px',
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  zIndex: 98,
                  backdropFilter: 'blur(10px)',
                  fontSize: '12px',
                  color: 'white',
                  fontFamily: 'monospace'
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div style={{ marginBottom: '4px', opacity: 0.7 }}>
                  Level {navigationPath.length - 1}
                </div>
                <div>
                  Path: {navigationPath.slice(1).join(' → ')}
                </div>
              </motion.div>
            )}
            
            <motion.div
            style={menuPanelStyle}
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            
            <svg style={svgStyle} onClick={handleBackgroundClick}>
              {/* Background circle for expansion animation and subgraph boundary indicator */}
              {backgroundCircleRadius > 0 && backgroundTheme && (
                <motion.circle
                  cx={180}
                  cy={120}
                  r={backgroundCircleRadius}
                  fill={getBackgroundColor(backgroundTheme)}
                  stroke={getNodeColor(backgroundTheme)}
                  strokeWidth="2"
                  opacity={navigationPath.length > 1 ? 0.3 : 0.8} // Lower opacity when persistent
                  style={{ pointerEvents: 'none' }}
                  strokeDasharray={navigationPath.length > 1 ? "5,5" : "none"} // Dashed when persistent
                  animate={navigationPath.length > 1 ? {
                    strokeDashoffset: [0, -10],
                    opacity: [0.3, 0.4, 0.3]
                  } : {}}
                  transition={navigationPath.length > 1 ? {
                    strokeDashoffset: { duration: 2, repeat: Infinity, ease: "linear" },
                    opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                  } : {}}
                />
              )}
               {/* Render edges first */}
              {visibleNodes.map((nodeA, indexA) => {
                return visibleNodes.map((nodeB, indexB) => {
                  // Skip if same node or if we've already rendered this edge
                  if (indexA >= indexB) return null;
                  
                  // Check if there's an edge between nodeA and nodeB in either direction
                  const hasEdgeAB = memoryGraph.edges[nodeA.id]?.includes(nodeB.id);
                  const hasEdgeBA = memoryGraph.edges[nodeB.id]?.includes(nodeA.id);
                  
                  if (!hasEdgeAB && !hasEdgeBA) return null;
                  
                  const posA = getAnimatedNodePosition(nodeA.id, indexA, visibleNodes.length);
                  const posB = getAnimatedNodePosition(nodeB.id, indexB, visibleNodes.length);

                  return (
                    <motion.line
                      key={`edge-${nodeA.id}-${nodeB.id}`}
                      x1={posA.x}
                      y1={posA.y}
                      x2={posB.x}
                      y2={posB.y}
                      style={edgeStyle}
                      initial={{ pathLength: 0 }}
                      animate={{ 
                        pathLength: 1,
                        x1: posA.x,
                        y1: posA.y,
                        x2: posB.x,
                        y2: posB.y
                      }}
                      transition={{ 
                        pathLength: { delay: 0.3 + (indexA + indexB) * 0.05, duration: 0.5 },
                        x1: { duration: 0.6, ease: "easeInOut" },
                        y1: { duration: 0.6, ease: "easeInOut" },
                        x2: { duration: 0.6, ease: "easeInOut" },
                        y2: { duration: 0.6, ease: "easeInOut" }
                      }}
                    />
                  );
                });
              }).flat().filter(Boolean)}
              
              {/* Render nodes */}
              {visibleNodes.map((node, index) => {
                const position = getAnimatedNodePosition(node.id, index, visibleNodes.length);
                const isCurrent = node.id === currentNode;
                const nodeColor = getNodeColor(node.theme);
                
                // Special handling for techno node - render as yin-yang but treat as regular node
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
                      onNavigate={onNavigate} // Regular navigation, no subgraph expansion
                      onClose={() => {}} // Keep menu open - no closing action
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
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent background click
                        handleNodeClick(node.id);
                      }}
                      onMouseEnter={() => setHoveredNode(node.id)}
                      onMouseLeave={() => setHoveredNode(null)}
                      initial={{ scale: 0 }}
                      animate={{ 
                        scale: 1,
                        cx: position.x,
                        cy: position.y,
                        r: isCurrent ? 20 : 15
                      }}
                      transition={{ 
                        scale: { delay: index * 0.1 },
                        cx: { duration: 0.6, ease: "easeInOut" },
                        cy: { duration: 0.6, ease: "easeInOut" },
                        r: { duration: 0.3, ease: "easeInOut" }
                      }}
                      whileTap={{ scale: 0.9 }}
                    />
                    <motion.text
                      x={position.x}
                      y={position.y + 30}
                      style={nodeTextStyle}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent background click
                        handleNodeClick(node.id);
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: 1,
                        x: position.x,
                        y: position.y + 30
                      }}
                      transition={{ 
                        opacity: { delay: index * 0.1 + 0.2 },
                        x: { duration: 0.6, ease: "easeInOut" },
                        y: { duration: 0.6, ease: "easeInOut" }
                      }}
                    >
                      {node.title.length > 12 ? node.title.substring(0, 12) + '...' : node.title}
                    </motion.text>
                    
                    {/* Sub-graph indicator - small dots around the node */}
                    {node.subGraph && (
                      <g>
                        {[0, 1, 2].map(dotIndex => (
                          <motion.circle
                            key={`subgraph-indicator-${dotIndex}`}
                            cx={position.x + Math.cos(dotIndex * 2 * Math.PI / 3) * (isCurrent ? 28 : 23)}
                            cy={position.y + Math.sin(dotIndex * 2 * Math.PI / 3) * (isCurrent ? 28 : 23)}
                            r={2}
                            fill="white"
                            opacity={0.9}
                            initial={{ scale: 0 }}
                            animate={{ 
                              scale: 1,
                              cx: position.x + Math.cos(dotIndex * 2 * Math.PI / 3) * (isCurrent ? 28 : 23),
                              cy: position.y + Math.sin(dotIndex * 2 * Math.PI / 3) * (isCurrent ? 28 : 23)
                            }}
                            transition={{ 
                              scale: { delay: index * 0.1 + 0.4 + dotIndex * 0.1 },
                              cx: { duration: 0.6, ease: "easeInOut" },
                              cy: { duration: 0.6, ease: "easeInOut" }
                            }}
                          />
                        ))}
                        {/* Add a pulsing ring for current nodes with subgraph */}
                        {isCurrent && (
                          <motion.circle
                            cx={position.x}
                            cy={position.y}
                            r={25}
                            fill="none"
                            stroke="yellow"
                            strokeWidth={2}
                            opacity={0.6}
                            animate={{ 
                              r: [25, 35, 25], 
                              opacity: [0.6, 0.2, 0.6],
                              cx: position.x,
                              cy: position.y
                            }}
                            transition={{ 
                              r: { duration: 1.5, repeat: Infinity },
                              opacity: { duration: 1.5, repeat: Infinity },
                              cx: { duration: 0.6, ease: "easeInOut" },
                              cy: { duration: 0.6, ease: "easeInOut" }
                            }}
                          />
                        )}
                      </g>
                    )}
                    
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
                        animate={{ 
                          scale: isCurrent ? 1.2 : 1.4, 
                          opacity: 0.8,
                          cx: position.x,
                          cy: position.y
                        }}
                        transition={{ 
                          scale: { duration: 0.2 },
                          opacity: { duration: 0.2 },
                          cx: { duration: 0.6, ease: "easeInOut" },
                          cy: { duration: 0.6, ease: "easeInOut" }
                        }}
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
                        animate={{ 
                          r: [20, 30, 20], 
                          opacity: [0.3, 0, 0.3],
                          cx: position.x,
                          cy: position.y
                        }}
                        transition={{ 
                          r: { duration: 2, repeat: Infinity },
                          opacity: { duration: 2, repeat: Infinity },
                          cx: { duration: 0.6, ease: "easeInOut" },
                          cy: { duration: 0.6, ease: "easeInOut" }
                        }}
                      />
                    )}
                  </g>
                );
              })}
            </svg>
            
          </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavigationMenu;
