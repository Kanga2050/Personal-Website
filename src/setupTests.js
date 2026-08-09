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

// framer-motion's whileInView needs one. Report every observed element as
// visible immediately, so scroll-revealed content is assertable in tests.
window.IntersectionObserver ??= class {
  constructor(callback) {
    this.callback = callback;
  }

  observe(target) {
    this.callback([{ target, isIntersecting: true, intersectionRatio: 1 }], this);
  }

  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
};

HTMLCanvasElement.prototype.getContext = () => null;
