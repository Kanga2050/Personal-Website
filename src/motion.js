/**
 * Shared motion vocabulary. Every animation on the site uses the same easing
 * curve and one of these three durations, so transitions feel like one system
 * instead of a dozen unrelated timings.
 */
export const EASE = [0.22, 1, 0.36, 1];

export const DURATION = {
  fast: 0.18,
  base: 0.32,
  slow: 0.6,
};

/** Whole-page crossfade, driven by <AnimatePresence mode="wait">. */
export const pageFade = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: DURATION.base, ease: EASE } },
  exit: { opacity: 0, transition: { duration: DURATION.fast, ease: EASE } },
};

/** Container that reveals its children one after another. */
export const stagger = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
};

/** The single entrance used for every block of content. */
export const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE },
  },
};

/** Same idea, for panels that should feel slightly heavier. */
export const fadeScale = {
  initial: { opacity: 0, scale: 0.97 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.slow, ease: EASE },
  },
};
