import React from 'react';
import { motion } from 'framer-motion';
import Page from '../components/Page';
import Icon from '../components/Icon';
import { nodes } from '../data/site';
import { stagger, fadeUp } from '../motion';

/**
 * A hub: intro copy plus a grid of everything one level below it.
 * Used for Engineering, Projects and the Lab.
 */
const CollectionPage = ({ node, onNavigate }) => {
  const parent = node.parent ? nodes[node.parent] : null;

  return (
    <Page theme={node.theme} particles={60}>
      <motion.div
        className="shell stack"
        style={{ '--gap': '40px' }}
        variants={stagger}
        initial="initial"
        animate="animate"
      >
        <motion.header
          className="stack"
          style={{ '--gap': '16px' }}
          variants={fadeUp}
        >
          <span className="eyebrow">{parent ? parent.title : 'Universe'}</span>
          <h1 className="title">{node.title}</h1>
          <p className="lede">{node.intro}</p>
        </motion.header>

        <motion.div className="grid" variants={stagger}>
          {node.items.map((id) => {
            const item = nodes[id];
            return (
              <motion.button
                type="button"
                key={id}
                className="card"
                variants={fadeUp}
                onClick={() => onNavigate(id)}
              >
                <span className="card__icon">
                  <Icon name={item.icon} size={22} />
                </span>
                <span className="card__title">{item.title}</span>
                <span className="card__text">{item.tagline}</span>
                <span className="card__foot">
                  {item.status ? (
                    <span className="tag">{item.status}</span>
                  ) : (
                    <span />
                  )}
                  <span className="card__arrow">
                    <Icon name="arrowRight" size={18} />
                  </span>
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        <motion.div className="row" variants={fadeUp}>
          {node.links.map((link) => (
            <button
              type="button"
              key={link.to}
              className={
                link.direction === 'back' ? 'btn btn--back' : 'btn btn--fwd'
              }
              onClick={() => onNavigate(link.to)}
            >
              {link.direction === 'back' && <Icon name="arrowLeft" size={18} />}
              {link.label}
              {link.direction !== 'back' && (
                <Icon name="arrowRight" size={18} />
              )}
            </button>
          ))}
        </motion.div>
      </motion.div>
    </Page>
  );
};

export default CollectionPage;
