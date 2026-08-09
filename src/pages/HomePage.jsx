import React from 'react';
import { motion } from 'framer-motion';
import Scene from '../scene/Scene';
import { Layer } from '../scene/Parallax';
import Landmark from '../scene/Landmarks';
import Foreground from '../scene/Foreground';
import { Wash } from '../components/Page';
import useMediaQuery from '../hooks/useMediaQuery';

/**
 * Where each destination stands in the landscape. `depth` matches the parallax
 * band it is sitting on, so the cottage drifts with the near hill and the
 * tower with the mid one.
 */
/**
 * `bottom` is tuned to the crest of the band each landmark stands on — the
 * bands span -7%..107% of the viewport, so a landmark at left L% sits over
 * viewBox x = (L + 7) / 114 * 1600 of its ridge path.
 */
const PLACEMENT = [
  {
    id: 'workshop',
    label: 'Workshop',
    hint: 'Things with moving parts',
    depth: 0.44,
    width: 'clamp(96px, 11.5vw, 176px)',
    wide: { left: '14%', bottom: '10%' },
    narrow: { left: '22%', bottom: '11%' },
  },
  {
    id: 'code',
    label: 'Code',
    hint: 'Models and pipelines',
    depth: 0.28,
    width: 'clamp(58px, 7vw, 104px)',
    wide: { left: '40%', bottom: '21%' },
    narrow: { left: '30%', bottom: '26%' },
  },
  {
    id: 'field',
    label: 'Field Notes',
    hint: 'Research outdoors',
    depth: 0.44,
    width: 'clamp(104px, 12.5vw, 190px)',
    wide: { left: '68%', bottom: '14%' },
    narrow: { left: '76%', bottom: '15%' },
  },
  {
    id: 'about',
    label: 'About',
    hint: 'Who is doing all this',
    depth: 0.66,
    width: 'clamp(46px, 5.5vw, 82px)',
    wide: { left: '88%', bottom: '3%' },
    narrow: { left: '58%', bottom: '2%' },
  },
];

const rise = {
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
};

/**
 * The landing view: no panels, no cards. The navigation is the landscape, and
 * the sun and moon in the sky are the day/night control.
 */
const HomePage = ({ night, onNavigate, onToggleTime }) => {
  const narrow = useMediaQuery('(max-width: 760px)');

  return (
    <motion.div className="home">
      <Scene night={night} variant="home" onToggleTime={onToggleTime} />

      <Layer depth={0.12} className="home__title">
        <motion.p
          className="home__eyebrow"
          {...rise}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          San Ramon, California
        </motion.p>
        <motion.h1
          className="home__name"
          {...rise}
          transition={{ duration: 1, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          Shaurya
          <br />
          Chauhan
        </motion.h1>
        <motion.p
          className="home__lede"
          {...rise}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          Machines, models and field notes. Wander the hills — everything out
          there opens.
        </motion.p>
      </Layer>

      {PLACEMENT.map((spot, i) => (
        <Layer
          key={spot.id}
          depth={spot.depth}
          className="home__spot"
          style={{
            ...(narrow ? spot.narrow : spot.wide),
            '--landmark-width': spot.width,
            zIndex: 10 + Math.round(spot.depth * 10),
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.35 + i * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Landmark
              id={spot.id}
              label={spot.label}
              hint={spot.hint}
              night={night}
              onSelect={onNavigate}
            />
          </motion.div>
        </Layer>
      ))}

      <Foreground branch={false} />
      <Wash />
    </motion.div>
  );
};

export default HomePage;
