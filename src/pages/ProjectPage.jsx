import React from 'react';
import Page from '../components/Page';
import Icon from '../components/Icon';
import Media from '../components/Media';
import { Reveal, Drift } from '../scene/Reveal';
import { nodes } from '../data/site';

/**
 * One chapter of a write-up. Each is its own sheet rather than a rule inside
 * one long panel, so the landscape shows through between them and the page
 * reads as a walk past a series of boards rather than as a document.
 */
const Chapter = ({ section, index }) => (
  <Reveal as="section" className="sheet chapter" lift={0.85} delay={0}>
    <span className="chapter__number">
      {String(index + 1).padStart(2, '0')}
    </span>
    <h2 className="chapter__head">{section.heading}</h2>

    {section.body?.map((paragraph) => (
      <p className="prose" key={paragraph.slice(0, 32)}>
        {paragraph}
      </p>
    ))}

    {section.list && (
      <ul className="sprouts">
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

    {section.media && (
      <Media kind={section.media.kind} note={section.media.note} />
    )}
  </Reveal>
);

const ProjectPage = ({ node, night, onNavigate, onToggleTime }) => {
  const parent = nodes[node.parent];

  return (
    <Page night={night} section={node.section} onToggleTime={onToggleTime}>
      <Reveal className="lede-block" as="header" lift={0.6}>
        <p className="eyebrow">
          <Icon name={node.icon} size={15} />
          {parent?.title}
        </p>
        <h1 className="display">{node.title}</h1>
        <p className="lede">{node.tagline}</p>
        <p className="byline">
          {node.meta}
          {node.meta && node.status ? ' · ' : ''}
          {node.status}
        </p>
      </Reveal>

      {node.hero && (
        <Drift distance={-100}>
          <Reveal lift={1.3}>
            <Media kind={node.hero.kind} note={node.hero.note} ratio="16 / 9" />
          </Reveal>
        </Drift>
      )}

      {node.sections.map((section, i) => (
        <Chapter key={section.heading} section={section} index={i} />
      ))}

      <Reveal className="row" lift={0.5}>
        <button
          type="button"
          className="btn btn--back"
          onClick={() => onNavigate(node.parent)}
        >
          <Icon name="arrowLeft" size={17} />
          {parent?.title}
        </button>
        <button type="button" className="btn" onClick={() => onNavigate('home')}>
          <Icon name="home" size={17} />
          Home
        </button>
      </Reveal>
    </Page>
  );
};

export default ProjectPage;
