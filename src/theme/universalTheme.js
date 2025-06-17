/**
 * Universal Theming System
 * 
 * This module provides a gradient-based theming system that automatically generates
 * all color variations from primary gradients. Each theme has a unique visual identity
 * while maintaining consistency across the application.
 */

// ===== THEME DEFINITIONS =====

export const themeConfig = {
  // Main Universe & Core Areas
  'yellow-techno': {
    id: 'yellow-techno',
    name: 'My Universe',
    gradient: ['#facc15', '#fbbf24', '#f59e0b'],
    identity: 'Bright, energetic, futuristic'
  },
  
  'tech': {
    id: 'tech', 
    name: 'Engineering Cosmos',
    gradient: ['#3b82f6', '#60a5fa', '#93c5fd'],
    identity: 'Professional, technical, precise'
  },
  
  'nostalgic': {
    id: 'nostalgic',
    name: 'Memory Constellation', 
    gradient: ['#8b5cf6', '#a78bfa', '#c4b5fd'],
    identity: 'Ethereal, contemplative, mystical'
  },
  
  'green': {
    id: 'green',
    name: 'Projects Showcase',
    gradient: ['#00ff88', '#10b981', '#34d399'], 
    identity: 'Growth, creativity, innovation'
  },
  
  // Engineering Subnodes
  'mech-blue': {
    id: 'mech-blue',
    name: 'Mechanical Design',
    gradient: ['#1e40af', '#3b82f6', '#60a5fa'],
    identity: 'Precision engineering, CAD workflows'
  },
  
  'electric-orange': {
    id: 'electric-orange', 
    name: 'Electronics',
    gradient: ['#ea580c', '#f97316', '#fb923c'],
    identity: 'Energy, circuits, embedded systems'
  },
  
  'code-green': {
    id: 'code-green',
    name: 'Software',
    gradient: ['#059669', '#10b981', '#34d399'],
    identity: 'Logic, algorithms, digital creation'
  },
  
  // Project Themes
  'orange': {
    id: 'orange',
    name: 'Innovation Lab',
    gradient: ['#c2410c', '#ea580c', '#f97316'],
    identity: 'Experimentation, rapid prototyping'
  },
  
  'blue': {
    id: 'blue',
    name: 'Deep Exploration', 
    gradient: ['#1e40af', '#2563eb', '#3b82f6'],
    identity: 'Depth, exploration, discovery'
  },
  
  'purple': {
    id: 'purple',
    name: 'Creative Vision',
    gradient: ['#7c3aed', '#8b5cf6', '#a78bfa'], 
    identity: 'Imagination, AI, artistic expression'
  },
  
  'cyan': {
    id: 'cyan',
    name: 'Aquatic Systems',
    gradient: ['#0891b2', '#06b6d4', '#22d3ee'],
    identity: 'Fluid, adaptive, marine-focused'
  },
  
  // Special Themes
  'black': {
    id: 'black',
    name: 'Origin Point',
    gradient: ['#374151', '#4b5563', '#6b7280'],
    identity: 'Mysterious, foundational, beginning'
  }
};

// ===== SITE REFERENCE MAPPING =====

export const siteReferences = {
  // Main nodes
  start: { themeId: 'black', title: '__ Universe' },
  techno: { themeId: 'yellow-techno', title: 'My Universe' },
  'techno-hub': { themeId: 'yellow-techno', title: 'My Universe' },
  engineering: { themeId: 'tech', title: 'Engineering Cosmos' },
  'engineering-hub': { themeId: 'tech', title: 'Engineering Cosmos' }, 
  memories: { themeId: 'nostalgic', title: 'Memory Constellation' },
  projects: { themeId: 'green', title: 'Projects Showcase' },
  'projects-hub': { themeId: 'green', title: 'Projects Showcase' },
  
  // Engineering subnodes
  'mech-design': { themeId: 'mech-blue', title: 'Mechanical Design' },
  electronics: { themeId: 'electric-orange', title: 'Electronics' },
  software: { themeId: 'code-green', title: 'Software' },
  
  // Project nodes
  'five-axis-printer': { themeId: 'green', title: '5-Axis 3D Printer' },
  'underwater-probe': { themeId: 'blue', title: 'Underwater Probe' },
  'piezo-microscope': { themeId: 'purple', title: 'Piezoelectric Microscope' },
  'personal-submarine': { themeId: 'cyan', title: 'Personal Submarine' },
  'smaller-projects': { themeId: 'orange', title: 'Innovation Lab' },
  'smaller-projects-hub': { themeId: 'orange', title: 'Innovation Lab' },
  
  // Smaller project subnodes
  'iot-weather-station': { themeId: 'blue', title: 'IoT Weather Station' },
  'gesture-drone-interface': { themeId: 'purple', title: 'Gesture Drone Interface' },
  'autonomous-garden': { themeId: 'green', title: 'Autonomous Garden' },
  'holographic-display': { themeId: 'cyan', title: 'Holographic Display' },
  'neural-network-music': { themeId: 'purple', title: 'Neural Network Music' },
  'magnetic-levitation': { themeId: 'orange', title: 'Magnetic Levitation' },
  
  // Techno subnodes
  'techno-deep': { themeId: 'yellow-techno', title: 'Deep Universe' },
  'techno-quantum': { themeId: 'purple', title: 'Quantum Layer' }
};

// ===== COLOR GENERATION FUNCTIONS =====

/**
 * Generates a complete color palette from a gradient array
 * @param {string[]} gradient - Array of hex colors defining the gradient
 * @returns {Object} Complete color palette for theming
 */
export const generateColorPalette = (gradient) => {
  const [primary, secondary, tertiary] = gradient;
  
  return {
    // Core colors
    primary,
    secondary, 
    tertiary,
    
    // Gradients
    backgroundSolid: `linear-gradient(135deg, ${gradient.join(', ')})`,
    backgroundLight: `linear-gradient(135deg, ${primary}20, ${secondary}15, ${tertiary}10)`,
    backgroundMedium: `linear-gradient(135deg, ${primary}30, ${secondary}25, ${tertiary}20)`,
    
    // Interactive states  
    hover: primary + '40',
    hoverStrong: primary + '60',
    active: secondary + '60',
    focus: primary + '80',
    
    // Text colors
    textPrimary: primary,
    textSecondary: secondary,
    textTertiary: tertiary,
    textLight: primary + 'CC', // 80% opacity
    
    // Borders
    border: primary + '30',
    borderMedium: primary + '50', 
    borderStrong: primary + '70',
    borderHover: secondary + '60',
    
    // Effects
    glow: primary + '40',
    shadow: primary + '30',
    pulse: secondary + '50',
    
    // Backgrounds with opacity
    bgOpacity10: primary + '1A', // 10%
    bgOpacity20: primary + '33', // 20%
    bgOpacity30: primary + '4D', // 30%
    bgOpacity40: primary + '66', // 40%
  };
};

/**
 * Gets the complete theme object for a given theme ID
 * @param {string} themeId - The theme identifier
 * @returns {Object} Complete theme object with colors and metadata
 */
export const getTheme = (themeId) => {
  const config = themeConfig[themeId];
  if (!config) {
    console.warn(`Theme '${themeId}' not found, available themes:`, Object.keys(themeConfig));
    throw new Error(`Theme '${themeId}' not found`);
  }
  
  return {
    ...config,
    colors: generateColorPalette(config.gradient)
  };
};

/**
 * Gets site reference information including theme
 * @param {string} siteId - The site/node identifier  
 * @returns {Object} Site reference with theme information
 */
export const getSiteReference = (siteId) => {
  const reference = siteReferences[siteId];
  if (!reference) {
    throw new Error(`Site reference '${siteId}' not found`);
  }
  
  return {
    ...reference,
    theme: getTheme(reference.themeId)
  };
};

/**
 * Creates styled handlers for navigation elements pointing to other sites
 * @param {string} destinationSiteId - The destination site ID
 * @returns {Object} Style handlers configured for the destination theme
 */
export const createCrossSiteNavigation = (destinationSiteId) => {
  const destination = getSiteReference(destinationSiteId);
  const colors = destination.theme.colors;
  
  return {
    destination,
    style: {
      background: colors.backgroundLight,
      border: `2px solid ${colors.border}`,
      color: colors.textPrimary,
      transition: 'all 0.3s ease'
    },
    handlers: {
      onMouseEnter: (e) => {
        e.target.style.background = colors.backgroundMedium;
        e.target.style.borderColor = colors.borderHover;
        e.target.style.boxShadow = `0 5px 15px ${colors.shadow}`;
        e.target.style.color = colors.textSecondary;
      },
      onMouseLeave: (e) => {
        e.target.style.background = colors.backgroundLight;
        e.target.style.borderColor = colors.border;
        e.target.style.boxShadow = 'none';
        e.target.style.color = colors.textPrimary;
      }
    }
  };
};

/**
 * Gets gradient background for CSS
 * @param {string} themeId - Theme identifier
 * @returns {string} CSS gradient string
 */
export const getThemeBackground = (themeId) => {
  const theme = getTheme(themeId);
  return theme.colors.backgroundSolid;
};

/**
 * Gets primary color for a theme
 * @param {string} themeId - Theme identifier  
 * @returns {string} Primary color hex value
 */
export const getThemePrimaryColor = (themeId) => {
  const theme = getTheme(themeId);
  return theme.colors.primary;
};

// ===== CONVENIENCE FUNCTIONS =====

/**
 * Creates a themed button component style object
 * @param {string} themeId - Theme to use for styling
 * @param {string} variant - Button variant ('primary', 'secondary', 'outline')
 * @returns {Object} Button style object
 */
export const createThemedButton = (themeId, variant = 'primary') => {
  const colors = getTheme(themeId).colors;
  
  const variants = {
    primary: {
      background: colors.backgroundSolid,
      color: 'white',
      border: `2px solid ${colors.primary}`,
      boxShadow: `0 2px 10px ${colors.shadow}`
    },
    secondary: {
      background: colors.backgroundLight,
      color: colors.textPrimary,
      border: `2px solid ${colors.border}`,
      boxShadow: 'none'
    },
    outline: {
      background: 'transparent',
      color: colors.textPrimary, 
      border: `2px solid ${colors.border}`,
      boxShadow: 'none'
    }
  };
  
  return {
    ...variants[variant],
    padding: '12px 24px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    ':hover': {
      background: variant === 'primary' ? colors.backgroundMedium : colors.backgroundLight,
      borderColor: colors.borderHover,
      boxShadow: `0 5px 15px ${colors.shadow}`,
      transform: 'translateY(-2px)'
    }
  };
};

// ===== EXPORTS =====

export default {
  themeConfig,
  siteReferences,
  getTheme,
  getSiteReference,
  createCrossSiteNavigation,
  getThemeBackground,
  getThemePrimaryColor,
  createThemedButton,
  generateColorPalette
};
