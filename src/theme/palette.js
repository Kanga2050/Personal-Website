/**
 * The palette, mixed the way the reference painting is: a high cerulean sky
 * warming to pink at the horizon, vivid yellow-greens in the light and cool
 * blue-greens in the shade, and a deep navy night.
 *
 * Every colour is published as a CSS custom property on <html>, which also
 * carries data-time="day" | "night". The properties feed ordinary `color`,
 * `background-color` and `fill` declarations, and index.css puts a long
 * transition on those — which is what lets the light shift smoothly instead of
 * snapping when the sun goes down.
 *
 * Watercolour needs two extra tones per surface that cel shading does not:
 * `wash`, a variegation floated over a flat area so it never reads as a solid
 * fill, and `pool`, the darker pigment that gathers where a wet edge dried.
 */

export const TIME = {
  day: {
    haze: '#ffdfc6',
    ridge: '#93aec6',
    ridgeShade: 'rgba(58, 84, 126, 0.22)',
    hillFar: '#94c25f',
    hillMid: '#69a63f',
    hillNear: '#48862f',
    ground: '#316b26',
    wash: 'rgba(120, 170, 90, 0.3)',
    pool: 'rgba(46, 74, 32, 0.3)',
    // Landmark materials
    wall: '#f7ecd4',
    wood: '#8a5f39',
    roof: '#b5604a',
    stone: '#a09a89',
    foliage: '#3f7a33',
    foliageLight: '#77b348',
    glass: '#b6cede',
    // Interiors
    plank: '#cda172',
    plankDark: '#9b6f45',
    plankLight: '#e6c894',
    metal: '#b9c2cb',
    brass: '#c9973f',
    lamp: '#ffd98a',
    roomShade: 'rgba(70, 44, 18, 0.2)',
    roomLight: 'rgba(255, 242, 210, 0.5)',
    // Ink and paper
    ink: '#2f4230',
    inkSoft: '#5c7057',
    paper: 'rgba(255, 252, 244, 0.95)',
    paperEdge: 'rgba(104, 82, 52, 0.22)',
    paperInk: '#3a3226',
    onAccent: '#fffaf0',
    scrim: 'rgba(255, 248, 232, 0.26)',
    halo: 'rgba(255, 253, 244, 0.92)',
    glow: '#ffd489',
    cloud: '#fffdf8',
    cloudShade: 'rgba(178, 196, 232, 0.72)',
    cloudLight: '#ffffff',
    rim: '#fbf6bd',
    snow: '#f2f7fa',
    bloom: '#fff3d4',
    mote: '#fff3c8',
  },
  night: {
    haze: '#3b4570',
    ridge: '#2b3a5e',
    ridgeShade: 'rgba(4, 8, 24, 0.3)',
    hillFar: '#25405a',
    hillMid: '#1b3044',
    hillNear: '#142433',
    ground: '#0c1723',
    wash: 'rgba(90, 130, 190, 0.16)',
    pool: 'rgba(3, 8, 20, 0.34)',
    wall: '#4d5872',
    wood: '#3d4459',
    roof: '#413753',
    stone: '#3e4657',
    foliage: '#1d3b38',
    foliageLight: '#2e5a4c',
    glass: '#2b3a54',
    plank: '#584637',
    plankDark: '#372c24',
    plankLight: '#715944',
    metal: '#6b7688',
    brass: '#8d7040',
    lamp: '#ffcf7a',
    roomShade: 'rgba(5, 9, 22, 0.45)',
    roomLight: 'rgba(255, 214, 150, 0.32)',
    ink: '#eae5d4',
    inkSoft: '#a6b0c4',
    paper: 'rgba(15, 24, 44, 0.92)',
    paperEdge: 'rgba(214, 224, 245, 0.18)',
    paperInk: '#e3dece',
    onAccent: '#0e1524',
    scrim: 'rgba(6, 12, 26, 0.36)',
    halo: 'rgba(6, 12, 28, 0.92)',
    glow: '#ffe6a8',
    cloud: '#8ba0cc',
    cloudShade: 'rgba(30, 44, 80, 0.5)',
    cloudLight: '#c2d0ee',
    rim: '#5f7aae',
    snow: '#9db1cb',
    bloom: '#93a4d2',
    mote: '#d9f0a3',
  },
};

/** Per-section accent, warm by day and cooler by night. */
const ACCENTS = {
  home: { day: '#a2571b', night: '#9fb8ff' },
  workshop: { day: '#b2582c', night: '#e2955c' },
  code: { day: '#2d7060', night: '#6fc9a8' },
  field: { day: '#4f7d2e', night: '#a3d46c' },
  about: { day: '#7a5990', night: '#c0a8e6' },
};

export const accentFor = (section, night) =>
  (ACCENTS[section] ?? ACCENTS.home)[night ? 'night' : 'day'];

const VARS = [
  ['haze', '--haze'],
  ['ridge', '--ridge'],
  ['ridgeShade', '--ridge-shade'],
  ['hillFar', '--hill-far'],
  ['hillMid', '--hill-mid'],
  ['hillNear', '--hill-near'],
  ['ground', '--ground'],
  ['wash', '--wash'],
  ['pool', '--pool'],
  ['wall', '--wall'],
  ['wood', '--wood'],
  ['roof', '--roof'],
  ['stone', '--stone'],
  ['foliage', '--foliage'],
  ['foliageLight', '--foliage-light'],
  ['glass', '--glass'],
  ['plank', '--plank'],
  ['plankDark', '--plank-dark'],
  ['plankLight', '--plank-light'],
  ['metal', '--metal'],
  ['brass', '--brass'],
  ['lamp', '--lamp'],
  ['roomShade', '--room-shade'],
  ['roomLight', '--room-light'],
  ['ink', '--ink'],
  ['inkSoft', '--ink-soft'],
  ['paper', '--paper'],
  ['paperEdge', '--paper-edge'],
  ['paperInk', '--paper-ink'],
  ['onAccent', '--on-accent'],
  ['scrim', '--scrim'],
  ['halo', '--halo'],
  ['glow', '--glow'],
  ['cloud', '--cloud'],
  ['cloudShade', '--cloud-shade'],
  ['cloudLight', '--cloud-light'],
  ['rim', '--rim'],
  ['snow', '--snow'],
  ['bloom', '--bloom'],
  ['mote', '--mote'],
];

/** Push the active palette onto <html>. */
export const applyPalette = (section, night) => {
  const time = TIME[night ? 'night' : 'day'];
  const root = document.documentElement;

  root.dataset.time = night ? 'night' : 'day';
  for (const [key, prop] of VARS) {
    root.style.setProperty(prop, time[key]);
  }
  root.style.setProperty('--accent', accentFor(section, night));
};
