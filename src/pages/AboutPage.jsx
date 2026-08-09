import React from 'react';
import Page from '../components/Page';
import Icon from '../components/Icon';
import Media from '../components/Media';
import { Reveal, Drift } from '../scene/Reveal';

const AboutPage = ({ node, night, onNavigate, onToggleTime }) => (
  <Page night={night} section={node.section} onToggleTime={onToggleTime}>
    <Reveal className="lede-block" as="header" lift={0.6}>
      <p className="eyebrow">
        <Icon name="about" size={15} />
        About
      </p>
      <h1 className="display">Shaurya Chauhan</h1>
      <p className="lede">{node.tagline}</p>
    </Reveal>

    <Drift distance={-100}>
      <Reveal lift={1.3}>
        <Media kind={node.portrait.kind} note={node.portrait.note} ratio="4 / 3" />
      </Reveal>
    </Drift>

    <Reveal as="section" className="sheet chapter" lift={0.85}>
      {node.intro.map((paragraph) => (
        <p className="prose" key={paragraph.slice(0, 32)}>
          {paragraph}
        </p>
      ))}
    </Reveal>

    {node.groups.map((group, i) => (
      <Reveal as="section" className="sheet chapter" key={group.heading} lift={0.85}>
        <span className="chapter__number">
          {String(i + 1).padStart(2, '0')}
        </span>
        <h2 className="chapter__head">{group.heading}</h2>
        <dl className="specs">
          {group.entries.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    ))}

    <Reveal as="section" className="sheet chapter" lift={0.85}>
      <h2 className="chapter__head">{node.contact.label}</h2>
      <a className="btn btn--primary" href={`mailto:${node.contact.email}`}>
        <Icon name="mail" size={17} />
        {node.contact.email}
      </a>
    </Reveal>

    <Reveal className="row" lift={0.5}>
      <button
        type="button"
        className="btn btn--back"
        onClick={() => onNavigate('home')}
      >
        <Icon name="arrowLeft" size={17} />
        Back to the hills
      </button>
    </Reveal>
  </Page>
);

export default AboutPage;
