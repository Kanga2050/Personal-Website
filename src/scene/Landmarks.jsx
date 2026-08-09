import React from 'react';
import { motion } from 'framer-motion';
import { useSway } from './Wind';

/**
 * The four destinations, drawn as things standing in the landscape rather than
 * as cards. Each sits on the parallax band matching its distance, so it drifts
 * with the hill it is standing on.
 *
 * Each is painted the same way the hills are: a flat base colour from the
 * palette, one translucent SHADE wash on the side away from the light and one
 * LIGHT wash on the side facing it, and the whole static body run through the
 * watercolour filter so its edges fray and its faces granulate. Because the
 * base colours are custom properties, every landmark re-lights itself when the
 * sun goes down.
 *
 * The filter only ever wraps the parts that hold still. Smoke, falling leaves
 * and the beacon sit outside it, so a frame of animation never forces the
 * turbulence to be recomputed.
 */

/** Static body: painted once, then only moved around. */
const Body = ({ children }) => <g filter="url(#wc-prop)">{children}</g>;

const SHADE = 'rgba(26, 18, 8, 0.17)';
const DEEP = 'rgba(26, 18, 8, 0.28)';
const LIGHT = 'rgba(255, 250, 226, 0.26)';
const LIT = { transition: 'fill 2.4s cubic-bezier(.4,0,.2,1)' };

/** Chimney smoke: three puffs that rise, spread and thin out. */
const Smoke = ({ x, y }) =>
  [0, 1, 2].map((i) => (
    <motion.circle
      key={i}
      cx={x}
      cy={y}
      r={4 + i * 1.6}
      fill="var(--cloud)"
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 0.55, 0],
        y: [0, -36 - i * 11],
        x: [0, 11 + i * 6],
        scale: [0.7, 1.5],
      }}
      transition={{ duration: 6, delay: i * 2, repeat: Infinity, ease: 'easeOut' }}
    />
  ));

/* — Workshop: a hillside farmhouse ——————————————————————————— */

const Cottage = ({ night }) => (
  <svg viewBox="0 0 140 134" className="landmark__art" aria-hidden="true">
    <ellipse cx="70" cy="128" rx="58" ry="5.5" fill={DEEP} opacity="0.5" />

    <Smoke x="104" y="20" />

    <Body>
    <rect x="97" y="24" width="15" height="30" rx="2" fill="var(--roof)" />
    <rect x="95" y="22" width="19" height="6" rx="2" fill="var(--stone)" />

    {/* Stone footing the house sits on — nothing in Ghibli floats. */}
    <path d="M20 112h100v11a3 3 0 0 1-3 3H23a3 3 0 0 1-3-3Z" fill="var(--stone)" />
    <path d="M70 112h50v14h-50Z" fill={SHADE} />

    <rect x="26" y="62" width="88" height="50" fill="var(--wall)" />
    <rect x="94" y="62" width="20" height="50" fill={SHADE} />
    <rect x="26" y="62" width="10" height="50" fill={LIGHT} />

    {/* Exposed timber framing. */}
    <g stroke="var(--wood)" strokeWidth="2.4" opacity="0.72">
      <path d="M26 62v50M114 62v50M26 88h88" />
    </g>

    {/* A sagging eave line reads hand-painted where a straight one reads CAD. */}
    <path d="M4 70Q70 62 136 70L70 16Z" fill="var(--roof)" />
    <path d="M70 16 136 70Q103 66 70 65Z" fill={SHADE} />
    <path d="M70 16 24 56Q47 52 70 51Z" fill={LIGHT} />
    <path
      d="M4 70Q70 62 136 70"
      fill="none"
      stroke="var(--wood)"
      strokeWidth="4.5"
      strokeLinecap="round"
    />

    {/* Dormer. */}
    <path d="M56 44 70 32l14 12v9H56Z" fill="var(--roof)" />
    <rect
      x="63"
      y="44"
      width="14"
      height="9"
      rx="1.5"
      fill={night ? 'var(--glow)' : 'var(--glass)'}
      style={LIT}
    />

    <rect x="61" y="84" width="19" height="28" rx="1.5" fill="var(--wood)" />
    <path d="M71 84h9v28h-9Z" fill={SHADE} />
    <circle cx="76" cy="99" r="1.7" fill="var(--wall)" />

    {[34, 88].map((x) => (
      <g key={x}>
        <rect
          x={x}
          y="72"
          width="18"
          height="16"
          rx="1.5"
          fill={night ? 'var(--glow)' : 'var(--glass)'}
          style={LIT}
        />
        <path
          d={`M${x + 9} 72v16M${x} 80h18`}
          stroke="var(--wood)"
          strokeWidth="1.8"
        />
        {/* Window box, planted. */}
        <rect x={x - 2} y="88" width="22" height="5" rx="1.5" fill="var(--wood)" />
        <g fill="var(--foliage)">
          <circle cx={x + 3} cy="87" r="3" />
          <circle cx={x + 9} cy="86" r="3.4" />
          <circle cx={x + 15} cy="87" r="3" />
        </g>
        <circle cx={x + 9} cy="85" r="1.5" fill="var(--bloom)" />
      </g>
    ))}
    </Body>

    {night && (
      <motion.ellipse
        cx="70"
        cy="86"
        rx="62"
        ry="36"
        fill="var(--glow)"
        style={{ filter: 'blur(16px)' }}
        animate={{ opacity: [0.1, 0.21, 0.1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
    )}
  </svg>
);

/* — Code: a timber radio tower ——————————————————————————————— */

const Tower = ({ night }) => {
  // The pennant leans with the same gust the hillside grass takes.
  const lean = useSway(7, 1);

  return (
  <svg viewBox="0 0 100 158" className="landmark__art" aria-hidden="true">
    <Body>
    <ellipse cx="50" cy="154" rx="34" ry="4.5" fill={DEEP} opacity="0.45" />

    {/* Guy wires, drawn first so the lattice sits on top of them. */}
    <g stroke="var(--wood)" strokeWidth="1" opacity="0.4">
      <path d="M50 30 6 150M50 30 94 150" />
    </g>

    <g stroke="var(--wood)" strokeWidth="3.6" strokeLinecap="round" fill="none">
      <path d="M17 152 40 26M83 152 60 26" />
      <path d="M22 118h56M27 88h46M32 60h34M37 38h26" />
      <path d="M24 132 70 104M74 132 28 104M29 104 65 78M69 104 33 78M34 78 62 52M64 78 36 52" />
    </g>
    {/* Sunward legs catch the light. */}
    <path
      d="M17 152 40 26"
      stroke={LIGHT}
      strokeWidth="3.6"
      strokeLinecap="round"
      fill="none"
    />

    {/* Platform and dish. */}
    <path d="M28 40h44l-4 5H32Z" fill="var(--wood)" />
    <g transform="rotate(-24 74 34)">
      <path d="M62 34a13 13 0 0 1 24 0Z" fill="var(--wall)" />
      <path d="M74 34a13 13 0 0 1 12 0Z" fill={SHADE} />
      <path d="M74 34v-9" stroke="var(--wood)" strokeWidth="2" />
    </g>

    <path d="M50 26V10" stroke="var(--wood)" strokeWidth="2.6" />
    </Body>

    <motion.circle
      cx="50"
      cy="7"
      r="5"
      fill="var(--accent)"
      initial={{ opacity: 1 }}
      animate={{ opacity: [1, 0.18, 1] }}
      transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
    />
    {night && (
      <motion.circle
        cx="50"
        cy="7"
        r="5"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.4"
        initial={{ r: 5, opacity: 0.65 }}
        animate={{ r: [5, 24], opacity: [0.65, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeOut' }}
      />
    )}

    {/* Pennant: it leans on the shared gust and flutters on its own, which is
        the honest split — the lean is the wind, the flutter is the cloth. */}
    <motion.g style={{ rotate: lean, originX: '50px', originY: '18px' }}>
      <motion.path
        d="M50 14h13l-4 4 4 4H50Z"
        fill="var(--accent)"
        style={{ originX: '50px', originY: '18px' }}
        animate={{ scaleX: [1, 0.72, 1], skewY: [0, 4, 0] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.g>
  </svg>
  );
};

/* — Field notes: the great tree ——————————————————————————————— */

/** Leaves that let go of the canopy and spiral down. */
const LEAF_FALL = [
  { x: 46, delay: 0, drift: 26 },
  { x: 96, delay: 3.2, drift: -20 },
  { x: 70, delay: 6.1, drift: 34 },
];

const Tree = () => {
  // The canopy is a sail. It takes the same gust as the grass below it, only
  // slower to answer, which is what makes the whole hillside move as one.
  const rotate = useSway(1.8, 1);

  return (
  <svg viewBox="0 0 164 180" className="landmark__art" aria-hidden="true">
    <Body>
    <ellipse cx="82" cy="174" rx="52" ry="5.5" fill={DEEP} opacity="0.45" />

    {/* A trunk that spreads at the base and forks twice, the way an old
        broadleaf does. Kept simple: the canopy hides everything above y≈70. */}
    <path
      d="M56 176c6-24 14-40 18-62 3-16 1-30-6-46l12-6c8 20 11 38 10 58 5-18 15-30 32-38l6 12c-16 8-24 20-28 38-3 20 0 30 6 44Z"
      fill="var(--wood)"
    />
    <path
      d="M80 176c-6-14-9-24-6-44 4-18 12-30 28-38l-6-12c-17 8-27 20-32 38 1-20-2-38-10-58l-6 3c8 18 11 34 8 52-3 22-9 38-14 59Z"
      fill={SHADE}
    />
    {/* Roots. */}
    <path
      d="M56 176c-10-6-20-8-30-6 8-8 20-10 32-6ZM100 176c10-6 20-9 31-7-8-8-20-10-33-5Z"
      fill="var(--wood)"
    />
    </Body>

    <motion.g style={{ rotate, originX: '82px', originY: '168px' }}>
      <g filter="url(#wc-leaf)">
      {/* Canopy built from overlapping clumps in three tones: the bulk in
          shadow, the top-left catching light, a few loose sprigs on the edge. */}
      <g fill="var(--foliage)">
        <ellipse cx="54" cy="80" rx="44" ry="34" />
        <ellipse cx="110" cy="72" rx="47" ry="36" />
        <ellipse cx="82" cy="44" rx="41" ry="32" />
        <ellipse cx="30" cy="104" rx="28" ry="22" />
        <ellipse cx="126" cy="102" rx="30" ry="23" />
      </g>
      <g fill={SHADE}>
        <ellipse cx="118" cy="96" rx="34" ry="24" />
        <ellipse cx="96" cy="106" rx="30" ry="20" />
      </g>
      <g fill="var(--foliage-light)">
        <ellipse cx="66" cy="40" rx="25" ry="17" />
        <ellipse cx="108" cy="58" rx="21" ry="15" />
        <ellipse cx="42" cy="80" rx="19" ry="13" />
      </g>
      <g fill="var(--rim)" opacity="0.5">
        <ellipse cx="62" cy="26" rx="16" ry="7" />
        <ellipse cx="96" cy="24" rx="12" ry="6" />
      </g>
      </g>
    </motion.g>

    {LEAF_FALL.map((leaf) => (
      <motion.path
        key={leaf.x}
        d="M0 0c5 0 9 4 9 9-5 0-9-4-9-9Z"
        fill="var(--foliage-light)"
        initial={{ opacity: 0 }}
        animate={{
          x: [leaf.x, leaf.x + leaf.drift, leaf.x + leaf.drift * 0.4],
          y: [104, 150, 172],
          rotate: [0, 220, 400],
          opacity: [0, 0.9, 0],
        }}
        transition={{
          duration: 9,
          delay: leaf.delay,
          repeat: Infinity,
          repeatDelay: 2,
          ease: 'easeInOut',
        }}
      />
    ))}
  </svg>
  );
};

/* — About: a mossy stone lantern —————————————————————————————— */

const Lantern = ({ night }) => (
  <svg viewBox="0 0 84 126" className="landmark__art" aria-hidden="true">
    {night && (
      <motion.circle
        cx="42"
        cy="38"
        r="32"
        fill="var(--glow)"
        style={{ filter: 'blur(12px)' }}
        animate={{ opacity: [0.14, 0.32, 0.14] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      />
    )}

    <Body>
    <ellipse cx="42" cy="119" rx="30" ry="5" fill={DEEP} opacity="0.45" />

    <path d="M23 117h38l-6-16H29Z" fill="var(--stone)" />
    <path d="M42 117h19l-6-16h-13Z" fill={SHADE} />

    <rect x="35" y="64" width="14" height="38" rx="3" fill="var(--stone)" />
    <rect x="43" y="64" width="6" height="38" fill={SHADE} />

    <path d="M16 62h52l-8-16H24Z" fill="var(--stone)" />
    <path d="M42 62h26l-8-16H42Z" fill={SHADE} />

    <rect
      x="26"
      y="28"
      width="32"
      height="21"
      rx="3"
      fill={night ? 'var(--glow)' : 'var(--glass)'}
      style={LIT}
    />
    <path d="M42 28v21M26 38h32" stroke="var(--stone)" strokeWidth="1.8" />

    <path d="M13 28h58l-10-14H23Z" fill="var(--stone)" />
    <path d="M42 28h29l-10-14H42Z" fill={SHADE} />
    <path d="M13 28h58" stroke={LIGHT} strokeWidth="2.5" />
    <path d="M42 14V4" stroke="var(--stone)" strokeWidth="4" strokeLinecap="round" />
    <circle cx="42" cy="4" r="3.5" fill="var(--stone)" />

    {/* Moss — the reason it reads as old rather than as new masonry. */}
    <g fill="var(--foliage)" opacity="0.72">
      <path d="M23 117q7-6 14-1-5 4-14 1Z" />
      <path d="M16 62q8-5 15 0-7 3-15 0Z" />
      <path d="M35 96q5-5 10-1-4 4-10 1Z" />
    </g>
    </Body>
  </svg>
);

export const ART = {
  workshop: Cottage,
  code: Tower,
  field: Tree,
  about: Lantern,
};

const Landmark = ({ id, label, hint, night, onSelect }) => {
  const Art = ART[id];

  return (
    <motion.button
      type="button"
      className="landmark"
      onClick={() => onSelect(id)}
      whileHover={{ y: -7 }}
      whileTap={{ y: -2, scale: 0.98 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <Art night={night} />
      <span className="landmark__plate">
        <span className="landmark__label">{label}</span>
        <span className="landmark__hint">{hint}</span>
      </span>
    </motion.button>
  );
};

export default Landmark;
