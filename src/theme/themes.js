/**
 * Every section of the site is identified by a theme id. A theme is just a
 * two-stop accent ramp; the rest of the palette is shared and lives in
 * index.css. Components read a theme with `getTheme(id)` and hand the two
 * colours to <Page>, which exposes them as --accent / --accent-2.
 */

const THEMES = {
  origin: { name: 'Origin', accent: '#cbd5e1', accent2: '#94a3b8' },
  universe: { name: 'Universe', accent: '#f5c542', accent2: '#ff9f43' },
  'universe-night': { name: 'Universe', accent: '#a78bfa', accent2: '#60a5fa' },
  engineering: { name: 'Engineering', accent: '#5aa9ff', accent2: '#22d3ee' },
  memories: { name: 'Memories', accent: '#a78bfa', accent2: '#f472b6' },
  projects: { name: 'Projects', accent: '#34d399', accent2: '#22d3ee' },

  mechanical: { name: 'Mechanical', accent: '#60a5fa', accent2: '#818cf8' },
  electronics: { name: 'Electronics', accent: '#fb923c', accent2: '#f59e0b' },
  software: { name: 'Software', accent: '#34d399', accent2: '#4ade80' },

  lab: { name: 'Lab', accent: '#fb923c', accent2: '#fbbf24' },
  deep: { name: 'Deep', accent: '#38bdf8', accent2: '#3b82f6' },
  optics: { name: 'Optics', accent: '#c084fc', accent2: '#a78bfa' },
  marine: { name: 'Marine', accent: '#22d3ee', accent2: '#2dd4bf' },
};

const FALLBACK = THEMES.origin;

export const getTheme = (id) => THEMES[id] ?? FALLBACK;

/** `#rrggbb` + 0..1 alpha -> `rgba(...)`, for canvas and inline SVG fills. */
export const withAlpha = (hex, alpha) => {
  const value = parseInt(hex.slice(1), 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export default THEMES;
