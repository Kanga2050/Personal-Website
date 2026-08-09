import React, { createContext, useContext, useEffect, useMemo } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

const ParallaxContext = createContext(null);

/**
 * Publishes two smoothed pointer offsets (-1..1) and the page scroll, which
 * every scene layer reads to offset itself by its own depth. One listener for
 * the whole tree rather than one per layer.
 */
export const ParallaxProvider = ({ children }) => {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const { scrollY } = useScroll();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return undefined;

    const onMove = (event) => {
      pointerX.set((event.clientX / window.innerWidth - 0.5) * 2);
      pointerY.set((event.clientY / window.innerHeight - 0.5) * 2);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [pointerX, pointerY, reduced]);

  const spring = { stiffness: 38, damping: 22, mass: 0.7 };
  const x = useSpring(pointerX, spring);
  const y = useSpring(pointerY, spring);

  const value = useMemo(
    () => ({ x, y, scrollY, reduced }),
    [x, y, scrollY, reduced],
  );

  return (
    <ParallaxContext.Provider value={value}>
      {children}
    </ParallaxContext.Provider>
  );
};

/**
 * One depth-shifted plane. `depth` 0 is infinitely far away and does not move;
 * 1 is at the viewer's nose. Foreground layers therefore travel furthest, both
 * against the pointer and against the scroll.
 *
 * `scroll` scales how much the page's own scrolling sinks the layer. The
 * landscape sinks gently; a layer that frames the viewport — the branch, the
 * ferns — sets it near zero so it stays where it is planted.
 */
export const Layer = ({
  depth = 0.2,
  scroll = 0.12,
  className = '',
  style,
  children,
  ...rest
}) => {
  const ctx = useContext(ParallaxContext);

  const x = useTransform(ctx.x, (v) => (ctx.reduced ? 0 : v * depth * -46));
  const y = useTransform([ctx.y, ctx.scrollY], ([py, offset]) =>
    ctx.reduced ? 0 : py * depth * -20 + offset * depth * scroll,
  );

  return (
    <motion.div className={className} style={{ x, y, ...style }} {...rest}>
      {children}
    </motion.div>
  );
};

export default ParallaxProvider;
