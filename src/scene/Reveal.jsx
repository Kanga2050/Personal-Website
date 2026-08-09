import React, { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];

/**
 * A block that comes toward the reader as it enters the viewport.
 *
 * The travel is on the z axis, not just y: the deck it lives in carries a
 * perspective, so a block genuinely swings up out of the depth of the scene
 * rather than sliding. `lift` scales that distance — small for a headline,
 * large for something that should feel like it is arriving from far off.
 */
export const Reveal = ({
  lift = 1,
  delay = 0,
  as = 'div',
  className,
  children,
  ...rest
}) => {
  const reduced = useReducedMotion();
  const Tag = motion[as] ?? motion.div;

  if (reduced) {
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      className={className}
      initial={{
        opacity: 0,
        y: 54 * lift,
        z: -200 * lift,
        rotateX: -8 * lift,
      }}
      whileInView={{ opacity: 1, y: 0, z: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.2, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

/**
 * Scroll-linked drift. The child travels `distance` pixels over the whole time
 * the wrapper is crossing the viewport, so neighbouring blocks given different
 * distances separate into planes as the page moves.
 */
export const Drift = ({ distance = -70, className, children, ...rest }) => {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const raw = useTransform(scrollYProgress, [0, 1], [-distance / 2, distance / 2]);
  const y = useSpring(raw, { stiffness: 140, damping: 26, mass: 0.4 });

  return (
    <div ref={ref} className={className} {...rest}>
      <motion.div style={reduced ? undefined : { y }}>{children}</motion.div>
    </div>
  );
};

export default Reveal;
