import '@testing-library/jest-dom';

// jsdom implements none of these, and the ambient canvas layer, framer-motion
// and the scroll reset all touch them on mount. Stub them so tests exercise
// the components rather than the environment's gaps.
window.matchMedia ??= (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener() {},
  removeListener() {},
  addEventListener() {},
  removeEventListener() {},
  dispatchEvent: () => false,
});

window.scrollTo = () => {};

HTMLCanvasElement.prototype.getContext = () => null;
