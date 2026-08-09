import React, { useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import Starfield from './Starfield';
import { getTheme } from '../theme/themes';
import { pageFade } from '../motion';

/**
 * The shell every page sits in: accent wash, grid, particle field, and a
 * centred content column. The section's two accent colours are published on
 * :root so the fixed navigation chrome tints along with the page.
 */
const Page = ({ theme, particles = 70, children }) => {
  const { accent, accent2 } = getTheme(theme);

  useLayoutEffect(() => {
    const root = document.documentElement.style;
    root.setProperty('--accent', accent);
    root.setProperty('--accent-2', accent2);
  }, [accent, accent2]);

  return (
    <motion.div
      className="page"
      variants={pageFade}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="page__wash" />
      <div className="page__grid" />
      <Starfield accent={accent} count={particles} />
      {children}
    </motion.div>
  );
};

export default Page;
