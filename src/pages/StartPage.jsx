import React from 'react';
import { motion } from 'framer-motion';
import Page from '../components/Page';
import Icon from '../components/Icon';
import { stagger, fadeUp, EASE, DURATION } from '../motion';

const SATELLITES = [0, 120, 240];

/** The graph the whole site is built on, drawn once as the entry mark. */
const OrbitMark = () => (
  <svg
    viewBox="0 0 200 200"
    width="180"
    height="180"
    fill="none"
    aria-hidden="true"
    style={{ overflow: 'visible' }}
  >
    <circle
      cx="100"
      cy="100"
      r="70"
      stroke="var(--accent)"
      strokeOpacity="0.18"
      strokeWidth="1"
    />

    <motion.g
      style={{ originX: '100px', originY: '100px' }}
      animate={{ rotate: 360 }}
      transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
    >
      <circle
        cx="100"
        cy="100"
        r="70"
        stroke="var(--accent)"
        strokeOpacity="0.5"
        strokeWidth="1.5"
        strokeDasharray="2 14"
        strokeLinecap="round"
      />
      {SATELLITES.map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const x = 100 + Math.cos(rad) * 70;
        const y = 100 + Math.sin(rad) * 70;
        return (
          <g key={deg}>
            <line
              x1="100"
              y1="100"
              x2={x}
              y2={y}
              stroke="var(--accent)"
              strokeOpacity="0.18"
            />
            <circle cx={x} cy={y} r="5" fill="var(--accent)" fillOpacity="0.75" />
          </g>
        );
      })}
    </motion.g>

    <motion.circle
      cx="100"
      cy="100"
      r="26"
      fill="var(--accent)"
      fillOpacity="0.07"
      initial={{ r: 26, opacity: 1 }}
      animate={{ r: [26, 32, 26], opacity: [1, 0.4, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    />
    <circle cx="100" cy="100" r="11" fill="var(--accent)" />
  </svg>
);

const StartPage = ({ onEnter }) => (
  <Page theme="universe" particles={90}>
    <motion.div
      className="shell shell--narrow shell--center stack"
      style={{ '--gap': '28px', alignItems: 'center' }}
      variants={stagger}
      initial="initial"
      animate="animate"
    >
      <motion.div variants={fadeUp}>
        <OrbitMark />
      </motion.div>

      <motion.h1 className="display" variants={fadeUp}>
        Universe
      </motion.h1>

      <motion.p className="lede" variants={fadeUp}>
        A personal site laid out as a graph. Engineering, projects, and the
        experiments that connect them.
      </motion.p>

      <motion.button
        type="button"
        className="btn btn--primary btn--fwd"
        variants={fadeUp}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: DURATION.fast, ease: EASE }}
        onClick={onEnter}
      >
        Enter
        <Icon name="arrowRight" size={18} />
      </motion.button>
    </motion.div>
  </Page>
);

export default StartPage;
