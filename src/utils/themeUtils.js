// Legacy theme utility functions - DEPRECATED
// Use src/theme/universalTheme.js for new implementations

import { getSiteReference, createCrossSiteNavigation, getTheme } from '../theme/universalTheme.js';

// Legacy function - use getSiteReference() instead
export const getDestinationThemeColors = (destinationNodeId) => {
  console.warn('getDestinationThemeColors is deprecated, use getSiteReference() from universalTheme.js');
  const siteRef = getSiteReference(destinationNodeId);
  return siteRef.theme.colors;
};

// Legacy function - use getTheme() instead  
export const getThemeColorPalette = (theme) => {
  console.warn('getThemeColorPalette is deprecated, use getTheme() from universalTheme.js');
  const themeObj = getTheme(theme);
  return themeObj.colors;
};

// Legacy function - use createCrossSiteNavigation() instead
export const createDestinationStyledHandler = (destinationNodeId) => {
  console.warn('createDestinationStyledHandler is deprecated, use createCrossSiteNavigation() from universalTheme.js');
  const nav = createCrossSiteNavigation(destinationNodeId);
  
  return {
    style: nav.style,
    onMouseEnter: nav.handlers.onMouseEnter,
    onMouseLeave: nav.handlers.onMouseLeave
  };
};
