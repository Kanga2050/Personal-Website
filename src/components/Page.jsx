import React from 'react';
import { motion } from 'framer-motion';
import Scene from '../scene/Scene';
import Interior, { hasRoom } from '../scene/Interior';
import Foreground from '../scene/Foreground';

const EASE = [0.22, 1, 0.36, 1];

/**
 * The cut between two pages.
 *
 * Cross-fading two full paintings muddies both of them for half a second. A
 * wash of paper closing over the old one and opening on the new one is how the
 * films do it, and it costs one opacity on one element.
 */
export const Wash = () => (
  <motion.div
    className="wash"
    aria-hidden="true"
    initial={{ opacity: 1 }}
    animate={{ opacity: 0 }}
    exit={{ opacity: 1 }}
    transition={{ duration: 0.42, ease: EASE }}
  />
);

/**
 * Interior shell. A section and everything under it stands in the room that
 * section belongs to — the bench, the treehouse, the paper loft — and anything
 * without a room of its own stands out in the landscape. Either way the light
 * is on the far side of a window or a sky, the content rides on a deck between
 * the scenery and whatever is in front of it, and the deck carries the
 * perspective that <Reveal> blocks travel through.
 */
const Page = ({ night, section, width = 'article', onToggleTime, children }) => {
  const indoors = hasRoom(section);

  return (
    <motion.div className={indoors ? 'page page--indoors' : 'page'}>
      {indoors ? (
        <Interior room={section} night={night} onToggleTime={onToggleTime} />
      ) : (
        <Scene night={night} variant="page" onToggleTime={onToggleTime} />
      )}

      <motion.div
        className={`page__content page__content--${width}`}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        {children}
      </motion.div>

      {/* Outdoors the foliage is the near plane; indoors the room draws its
          own, standing on the bench in front of the reader. */}
      {!indoors && <Foreground />}
      <Wash />
    </motion.div>
  );
};

export default Page;
