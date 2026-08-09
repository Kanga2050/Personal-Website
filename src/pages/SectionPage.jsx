import React from 'react';
import Page from '../components/Page';
import Icon from '../components/Icon';
import Media from '../components/Media';
import { Reveal, Drift } from '../scene/Reveal';
import { nodes } from '../data/site';

/**
 * A hub. Rather than a list in a box, each thing below this section arrives as
 * its own plate swinging up out of the depth, alternating which side it leads
 * from so the eye zig-zags down the hillside.
 */
const SectionPage = ({ node, night, onNavigate, onToggleTime }) => (
  <Page night={night} section={node.section} width="wide" onToggleTime={onToggleTime}>
    <Reveal className="lede-block" as="header" lift={0.6}>
      <p className="eyebrow">
        <Icon name={node.icon} size={15} />
        {node.items.length} {node.unit}
      </p>
      <h1 className="display">{node.title}</h1>
      <p className="lede">{node.intro}</p>
    </Reveal>

    {node.media && (
      <Drift distance={-90}>
        <Reveal lift={1.2}>
          <Media kind={node.media.kind} note={node.media.note} ratio="21 / 9" />
        </Reveal>
      </Drift>
    )}

    <ul className="plates">
      {node.items.map((id, i) => {
        const item = nodes[id];
        return (
          <Reveal
            as="li"
            key={id}
            lift={0.9}
            className={i % 2 ? 'plate-row plate-row--right' : 'plate-row'}
          >
            <button
              type="button"
              className="plate"
              onClick={() => onNavigate(id)}
            >
              <span className="plate__mark">
                <Icon name={item.icon} size={26} />
              </span>
              <span className="plate__body">
                <span className="plate__head">
                  <span className="plate__title">{item.title}</span>
                  {item.status && (
                    <span className="plate__status">{item.status}</span>
                  )}
                </span>
                <span className="plate__text">{item.tagline}</span>
                {item.meta && <span className="plate__meta">{item.meta}</span>}
              </span>
              <span className="plate__go">
                <Icon name="arrowRight" size={19} />
              </span>
            </button>
          </Reveal>
        );
      })}
    </ul>

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

export default SectionPage;
