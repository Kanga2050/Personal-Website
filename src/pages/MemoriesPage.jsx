import React from 'react';
import { motion } from 'framer-motion';
import Page from '../components/Page';
import Icon from '../components/Icon';
import { stagger, fadeUp } from '../motion';

const STARS = [
  { x: 30, y: 96, r: 3.5 },
  { x: 86, y: 44, r: 5 },
  { x: 132, y: 82, r: 3 },
  { x: 178, y: 30, r: 4.5 },
  { x: 214, y: 88, r: 3 },
  { x: 156, y: 122, r: 3.5 },
];

const Constellation = () => (
  <svg
    viewBox="0 0 244 152"
    width="100%"
    style={{ maxWidth: 340 }}
    fill="none"
    aria-hidden="true"
  >
    <motion.polyline
      points={STARS.map((s) => `${s.x},${s.y}`).join(' ')}
      stroke="var(--accent)"
      strokeOpacity="0.35"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.1, ease: 'easeInOut', delay: 0.2 }}
    />
    {STARS.map((star, i) => (
      <motion.circle
        key={`${star.x}-${star.y}`}
        cx={star.x}
        cy={star.y}
        r={star.r}
        fill="var(--accent)"
        animate={{ opacity: [0.45, 1, 0.45] }}
        transition={{
          duration: 3.5 + i * 0.4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    ))}
  </svg>
);

const MemoriesPage = ({ onNavigate }) => (
  <Page theme="memories" particles={110}>
    <motion.div
      className="shell shell--narrow shell--center stack"
      style={{ '--gap': '28px', alignItems: 'center' }}
      variants={stagger}
      initial="initial"
      animate="animate"
    >
      <motion.div variants={fadeUp} style={{ width: '100%' }}>
        <Constellation />
      </motion.div>

      <motion.h1 className="title" variants={fadeUp}>
        Memories
      </motion.h1>

      <motion.p className="lede" variants={fadeUp}>
        Fragments of time, arranged as a constellation. Individual moments are
        not much on their own; the shape only appears once you draw the lines
        between them.
      </motion.p>

      <motion.div className="row row--center" variants={fadeUp}>
        <button
          type="button"
          className="btn btn--back"
          onClick={() => onNavigate('universe')}
        >
          <Icon name="arrowLeft" size={18} />
          Universe
        </button>
        <button
          type="button"
          className="btn btn--fwd"
          onClick={() => onNavigate('projects')}
        >
          Projects
          <Icon name="arrowRight" size={18} />
        </button>
      </motion.div>
    </motion.div>
  </Page>
);

export default MemoriesPage;
