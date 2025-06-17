// Theme utility functions for cross-site navigation
// Ensures navigation elements use destination site's theme colors

export const getDestinationThemeColors = (destinationNodeId) => {
  const themeMapping = {
    // Main nodes
    'techno': 'yellow-techno',
    'engineering': 'tech', 
    'memories': 'nostalgic',
    'projects': 'green',
    
    // Hub nodes (same as their parent)
    'techno-hub': 'yellow-techno',
    'engineering-hub': 'tech',
    'projects-hub': 'green',
    'smaller-projects-hub': 'orange',
    
    // Engineering subnodes
    'mech-design': 'mech-blue',
    'electronics': 'electric-orange',
    'software': 'code-green',
    
    // Project subnodes
    'five-axis-printer': 'green',
    'underwater-probe': 'blue', 
    'piezo-microscope': 'purple',
    'personal-submarine': 'cyan',
    'smaller-projects': 'orange'
  };

  const theme = themeMapping[destinationNodeId] || 'green';
  return getThemeColorPalette(theme);
};

export const getThemeColorPalette = (theme) => {
  switch (theme) {
    case 'yellow-techno':
      return {
        primary: '#facc15',
        secondary: '#fbbf24', 
        background: 'rgba(250, 204, 21, 0.1)',
        border: 'rgba(250, 204, 21, 0.3)',
        hoverBackground: 'rgba(250, 204, 21, 0.2)',
        hoverBorder: 'rgba(250, 204, 21, 0.6)',
        shadow: 'rgba(250, 204, 21, 0.4)'
      };
      
    case 'tech':
    case 'mech-blue':
      return {
        primary: '#3b82f6',
        secondary: '#60a5fa',
        background: 'rgba(59, 130, 246, 0.1)', 
        border: 'rgba(59, 130, 246, 0.3)',
        hoverBackground: 'rgba(59, 130, 246, 0.2)',
        hoverBorder: 'rgba(59, 130, 246, 0.6)',
        shadow: 'rgba(59, 130, 246, 0.4)'
      };
      
    case 'electric-orange':
      return {
        primary: '#f97316',
        secondary: '#fb923c',
        background: 'rgba(249, 115, 22, 0.1)',
        border: 'rgba(249, 115, 22, 0.3)',
        hoverBackground: 'rgba(249, 115, 22, 0.2)',
        hoverBorder: 'rgba(249, 115, 22, 0.6)',
        shadow: 'rgba(249, 115, 22, 0.4)'
      };
      
    case 'code-green':
      return {
        primary: '#10b981',
        secondary: '#34d399',
        background: 'rgba(16, 185, 129, 0.1)',
        border: 'rgba(16, 185, 129, 0.3)',
        hoverBackground: 'rgba(16, 185, 129, 0.2)',
        hoverBorder: 'rgba(16, 185, 129, 0.6)',
        shadow: 'rgba(16, 185, 129, 0.4)'
      };
      
    case 'nostalgic':
      return {
        primary: '#8b5cf6',
        secondary: '#a78bfa',
        background: 'rgba(139, 92, 246, 0.1)',
        border: 'rgba(139, 92, 246, 0.3)',
        hoverBackground: 'rgba(139, 92, 246, 0.2)',
        hoverBorder: 'rgba(139, 92, 246, 0.6)',
        shadow: 'rgba(139, 92, 246, 0.4)'
      };
      
    case 'green':
      return {
        primary: '#00ff88',
        secondary: '#10b981',
        background: 'rgba(0, 255, 136, 0.1)',
        border: 'rgba(0, 255, 136, 0.3)',
        hoverBackground: 'rgba(0, 255, 136, 0.2)',
        hoverBorder: 'rgba(0, 255, 136, 0.6)',
        shadow: 'rgba(0, 255, 136, 0.4)'
      };
      
    case 'blue':
      return {
        primary: '#00aaff',
        secondary: '#0ea5e9',
        background: 'rgba(0, 170, 255, 0.1)',
        border: 'rgba(0, 170, 255, 0.3)',
        hoverBackground: 'rgba(0, 170, 255, 0.2)',
        hoverBorder: 'rgba(0, 170, 255, 0.6)',
        shadow: 'rgba(0, 170, 255, 0.4)'
      };
      
    case 'purple':
      return {
        primary: '#aa66ff',
        secondary: '#c084fc',
        background: 'rgba(170, 102, 255, 0.1)',
        border: 'rgba(170, 102, 255, 0.3)',
        hoverBackground: 'rgba(170, 102, 255, 0.2)',
        hoverBorder: 'rgba(170, 102, 255, 0.6)',
        shadow: 'rgba(170, 102, 255, 0.4)'
      };
      
    case 'cyan':
      return {
        primary: '#00ffcc',
        secondary: '#2dd4bf',
        background: 'rgba(0, 255, 204, 0.1)',
        border: 'rgba(0, 255, 204, 0.3)',
        hoverBackground: 'rgba(0, 255, 204, 0.2)',
        hoverBorder: 'rgba(0, 255, 204, 0.6)',
        shadow: 'rgba(0, 255, 204, 0.4)'
      };
      
    case 'orange':
      return {
        primary: '#ff8800',
        secondary: '#fb923c',
        background: 'rgba(255, 136, 0, 0.1)',
        border: 'rgba(255, 136, 0, 0.3)',
        hoverBackground: 'rgba(255, 136, 0, 0.2)',
        hoverBorder: 'rgba(255, 136, 0, 0.6)',
        shadow: 'rgba(255, 136, 0, 0.4)'
      };
      
    default:
      return {
        primary: '#6b7280',
        secondary: '#9ca3af',
        background: 'rgba(107, 114, 128, 0.1)',
        border: 'rgba(107, 114, 128, 0.3)',
        hoverBackground: 'rgba(107, 114, 128, 0.2)',
        hoverBorder: 'rgba(107, 114, 128, 0.6)',
        shadow: 'rgba(107, 114, 128, 0.4)'
      };
  }
};

// Helper function to create navigation button handlers with destination theming
export const createDestinationStyledHandler = (destinationNodeId) => {
  const colors = getDestinationThemeColors(destinationNodeId);
  
  return {
    onMouseEnter: (e) => {
      e.target.style.background = colors.hoverBackground;
      e.target.style.borderColor = colors.primary;
      e.target.style.boxShadow = `0 5px 15px ${colors.shadow}`;
      e.target.style.color = colors.primary;
    },
    onMouseLeave: (e) => {
      e.target.style.background = colors.background;
      e.target.style.borderColor = colors.border;
      e.target.style.boxShadow = 'none';
      e.target.style.color = colors.primary;
    },
    style: {
      background: colors.background,
      border: `2px solid ${colors.border}`,
      color: colors.primary,
      transition: 'all 0.3s ease'
    }
  };
};
