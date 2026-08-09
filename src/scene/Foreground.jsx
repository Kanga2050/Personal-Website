import React from 'react';
import { motion } from 'framer-motion';
import { Layer } from './Parallax';
import { useSway } from './Wind';

/**
 * The nearest plane of the painting, drawn *over* the page rather than behind
 * it: a leafy branch hanging into the top corner and broad-leaved plants
 * standing up from the bottom ones. Text passes behind them as it scrolls,
 * which is what sells the depth — a scene you can only see past is a backdrop,
 * a scene that occludes you is somewhere you are standing.
 *
 * Everything here shares the wind. The leaves take the front of the gust and
 * the limb they hang from takes the lag behind it, so the branch reads as one
 * object with light ends rather than as a collection of independent loops.
 *
 * Nothing here takes a pointer event.
 */

/** One leaf, tip at the origin, pointing along +x. Drawn with a mid-vein so it
    reads as foliage at 30px rather than as a coloured blob. */
const Leaf = ({ length = 60, tone, vein }) => (
  <>
    <path
      d={`M0 0C${length * 0.26} ${-length * 0.3} ${length * 0.74} ${-length * 0.34} ${length} 0C${length * 0.74} ${length * 0.34} ${length * 0.26} ${length * 0.3} 0 0Z`}
      fill={tone}
    />
    <path
      d={`M${length * 0.06} 0H${length * 0.9}`}
      stroke={vein}
      strokeWidth={length * 0.035}
      strokeLinecap="round"
      opacity="0.45"
    />
  </>
);

/* — The branch ——————————————————————————————————————————————
   Hand-placed rather than scattered along a curve: a real branch puts its
   leaves in clusters at the nodes, and an even sprinkle reads as a comb. */

const CLUSTERS = [
  { x: 46, y: 30, leaves: [-52, 8, 62], size: 62 },
  { x: 126, y: 62, leaves: [-64, -6, 48, 96], size: 58 },
  { x: 206, y: 96, leaves: [-58, 14, 74], size: 52 },
  { x: 272, y: 128, leaves: [-40, 30, 88], size: 44 },
];

const TONES = ['var(--foliage)', 'var(--foliage-light)', 'var(--foliage)'];

/** Leaves lead the gust; every one of them turns at the same moment. */
const Spray = ({ cluster, ci }) => {
  const rotate = useSway(4, 0);
  return (
    <motion.g style={{ x: cluster.x, y: cluster.y, rotate }}>
      {cluster.leaves.map((angle, li) => (
        <g key={angle} transform={`rotate(${angle})`}>
          <Leaf
            length={cluster.size}
            tone={TONES[(ci + li) % TONES.length]}
            vein="var(--wood)"
          />
        </g>
      ))}
    </motion.g>
  );
};

const Branch = () => {
  const rotate = useSway(1.4, 1);

  return (
    <Layer depth={0.9} scroll={0.04} className="fore fore--branch">
      <motion.svg
        viewBox="-10 -30 340 210"
        aria-hidden="true"
        style={{ rotate, originX: '-10px', originY: '-30px' }}
      >
        <g filter="url(#wc-leaf)">
          {/* Tapered limb: one thick stroke for the base, a thinner one
              carrying on to the tip, so it narrows the way a branch does. */}
          <path
            d="M-14-6C34 12 92 34 132 62"
            fill="none"
            stroke="var(--wood)"
            strokeWidth="15"
            strokeLinecap="round"
          />
          <path
            d="M110 48C168 82 222 112 292 138"
            fill="none"
            stroke="var(--wood)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M86 34C104 58 108 78 104 104M188 92C206 108 214 124 216 142"
            fill="none"
            stroke="var(--wood)"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {CLUSTERS.map((cluster, ci) => (
            <Spray key={cluster.x} cluster={cluster} ci={ci} />
          ))}
        </g>
      </motion.svg>
    </Layer>
  );
};

/* — Corner plants ——————————————————————————————————————————— */

const rad = (deg) => (deg * Math.PI) / 180;

/** Stems fanning out of the bottom corner, each ending in one broad leaf. */
const STALKS = [
  { angle: -80, len: 104, size: 104, bow: 20, amp: 2.6 },
  { angle: -54, len: 82, size: 88, bow: 16, amp: 3.4 },
  { angle: -110, len: 78, size: 82, bow: -16, amp: 3 },
  { angle: -28, len: 58, size: 74, bow: 10, amp: 4.2 },
  { angle: -134, len: 46, size: 62, bow: -10, amp: 3.6 },
].map((s) => {
  const tip = [Math.cos(rad(s.angle)) * s.len, Math.sin(rad(s.angle)) * s.len];
  // Bow the stem perpendicular to its own direction.
  const mid = [
    tip[0] / 2 - Math.sin(rad(s.angle)) * s.bow,
    tip[1] / 2 + Math.cos(rad(s.angle)) * s.bow,
  ];
  return {
    ...s,
    tip,
    stem: `M0 0Q${mid[0]} ${mid[1]} ${tip[0]} ${tip[1]}`,
    // Point the leaf along the last segment of the stem.
    leafAngle: (Math.atan2(tip[1] - mid[1], tip[0] - mid[0]) * 180) / Math.PI,
  };
});

/** Same clump, same air: one channel, and only the amplitude varies with how
    tall and how thin each stem is. */
const Stalk = ({ stalk, index }) => {
  const rotate = useSway(stalk.amp, 0);
  return (
    <motion.g style={{ rotate, originX: '0px', originY: '0px' }}>
      <path
        d={stalk.stem}
        fill="none"
        stroke="var(--wood)"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <g transform={`translate(${stalk.tip[0]} ${stalk.tip[1]}) rotate(${stalk.leafAngle})`}>
        <Leaf
          length={stalk.size}
          tone={index % 2 ? 'var(--foliage)' : 'var(--foliage-light)'}
          vein="var(--ground)"
        />
      </g>
    </motion.g>
  );
};

const Plants = ({ side }) => (
  <Layer depth={1} scroll={0} className={`fore fore--plants fore--plants-${side}`}>
    <svg viewBox="-40 0 220 230" aria-hidden="true">
      <g filter="url(#wc-leaf)" transform="translate(0 226)">
        {STALKS.map((stalk, i) => (
          <Stalk key={stalk.angle} stalk={stalk} index={i} />
        ))}
      </g>
    </svg>
  </Layer>
);

/* — Leaves blowing through ——————————————————————————————————— */

const DRIFTERS = [
  { top: '24%', delay: 2, duration: 18, spin: 520 },
  { top: '61%', delay: 11, duration: 23, spin: -430 },
];

const Drifters = () => (
  <div className="fore fore--drifters" aria-hidden="true">
    {DRIFTERS.map((d) => (
      <motion.svg
        key={d.top}
        viewBox="0 -14 62 28"
        style={{ top: d.top }}
        initial={{ x: '-8vw', opacity: 0 }}
        animate={{
          x: '108vw',
          y: [0, 48, -22, 32, 0],
          rotate: d.spin,
          opacity: [0, 0.9, 0.9, 0],
        }}
        transition={{
          duration: d.duration,
          delay: d.delay,
          repeat: Infinity,
          repeatDelay: 12,
          ease: 'linear',
        }}
      >
        <Leaf length={58} tone="var(--foliage-light)" vein="var(--wood)" />
      </motion.svg>
    ))}
  </div>
);

/**
 * `branch` is off on the landing view, where the headline already owns the top
 * corner and the landmarks carry the composition.
 */
const Foreground = ({ branch = true }) => (
  <>
    {branch && <Branch />}
    <Plants side="left" />
    <Plants side="right" />
    <Drifters />
  </>
);

export default Foreground;
