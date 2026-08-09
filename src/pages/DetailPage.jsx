import React from 'react';
import { motion } from 'framer-motion';
import Page from '../components/Page';
import Icon from '../components/Icon';
import { nodes } from '../data/site';
import { stagger, fadeUp } from '../motion';

const Section = ({ section }) => (
  <motion.section className="panel stack" style={{ '--gap': '14px' }} variants={fadeUp}>
    <h2 className="heading">{section.heading}</h2>

    {section.body?.map((paragraph) => (
      <p className="body" key={paragraph.slice(0, 32)}>
        {paragraph}
      </p>
    ))}

    {section.list && (
      <ul className="checklist">
        {section.list.map((entry) => (
          <li key={entry}>{entry}</li>
        ))}
      </ul>
    )}

    {section.specs && (
      <dl className="specs">
        {section.specs.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    )}
  </motion.section>
);

/** A single write-up. Every project and discipline page renders through this. */
const DetailPage = ({ node, onNavigate }) => {
  const parent = nodes[node.parent];

  return (
    <Page theme={node.theme} particles={50}>
      <motion.div
        className="shell shell--article stack"
        style={{ '--gap': '24px' }}
        variants={stagger}
        initial="initial"
        animate="animate"
      >
        <motion.header
          className="stack"
          style={{ '--gap': '18px', marginBottom: '16px' }}
          variants={fadeUp}
        >
          <div className="row" style={{ alignItems: 'center', gap: '14px' }}>
            <span className="card__icon">
              <Icon name={node.icon} size={22} />
            </span>
            <span className="eyebrow">{parent?.title}</span>
          </div>

          <h1 className="title">{node.title}</h1>
          <p className="lede">{node.tagline}</p>

          {node.status && (
            <div className="row">
              <span className="tag">{node.status}</span>
            </div>
          )}
        </motion.header>

        {node.sections.map((section) => (
          <Section key={section.heading} section={section} />
        ))}

        <motion.div className="row" variants={fadeUp} style={{ marginTop: '16px' }}>
          <button
            type="button"
            className="btn btn--back"
            onClick={() => onNavigate(node.parent)}
          >
            <Icon name="arrowLeft" size={18} />
            {parent?.title}
          </button>
        </motion.div>
      </motion.div>
    </Page>
  );
};

export default DetailPage;
