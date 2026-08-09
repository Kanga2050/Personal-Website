import React from 'react';
import { motion } from 'framer-motion';
import Page from '../components/Page';
import Icon from '../components/Icon';
import { nodes } from '../data/site';
import { stagger, fadeUp } from '../motion';

const DESTINATIONS = ['engineering', 'projects', 'memories'];

/**
 * The hub. Day and night are the same layout with a different accent ramp —
 * the split into two near-identical components was the largest duplication in
 * the old codebase and bought nothing.
 */
const UniversePage = ({ isNight, onNavigate }) => (
  <Page theme={isNight ? 'universe-night' : 'universe'} particles={100}>
    <motion.div
      className="shell shell--center stack"
      style={{ '--gap': '44px' }}
      variants={stagger}
      initial="initial"
      animate="animate"
    >
      <motion.header
        className="stack"
        style={{ '--gap': '16px' }}
        variants={fadeUp}
      >
        <span className="eyebrow">{isNight ? 'Night' : 'Day'}</span>
        <h1 className="display">Universe</h1>
        <p className="lede">
          Three places to go from here. Each one opens into its own level of
          the graph.
        </p>
      </motion.header>

      <motion.div className="grid" variants={stagger}>
        {DESTINATIONS.map((id) => {
          const node = nodes[id];
          return (
            <motion.button
              type="button"
              key={id}
              className="card"
              variants={fadeUp}
              onClick={() => onNavigate(id)}
            >
              <span className="card__icon">
                <Icon name={node.icon} size={22} />
              </span>
              <span className="card__title">{node.title}</span>
              <span className="card__text">{node.tagline}</span>
              <span className="card__foot">
                <span />
                <span className="card__arrow">
                  <Icon name="arrowRight" size={18} />
                </span>
              </span>
            </motion.button>
          );
        })}
      </motion.div>
    </motion.div>
  </Page>
);

export default UniversePage;
