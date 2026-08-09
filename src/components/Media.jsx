import React from 'react';
import Icon from './Icon';

const LABEL = {
  photo: 'Photo',
  video: 'Video',
  animation: 'Animation',
};

/**
 * A deliberate blank. Every one of these marks a spot where a photo, render,
 * video or animation belongs; the caption says what should go there so the
 * slot can be filled without hunting through the code.
 */
const Media = ({ kind = 'photo', note, ratio = '16 / 9' }) => (
  <figure className="media" style={{ '--media-ratio': ratio }}>
    <div className="media__frame">
      <span className="media__mark">
        <Icon name={kind} size={24} strokeWidth={1.4} />
      </span>
      <span className="media__kind">{LABEL[kind] ?? 'Media'}</span>
    </div>
    {note && <figcaption className="media__note">{note}</figcaption>}
  </figure>
);

export default Media;
