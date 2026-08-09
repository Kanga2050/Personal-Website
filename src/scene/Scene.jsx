import React from 'react';
import { motion, useTime, useTransform } from 'framer-motion';
import { Layer } from './Parallax';
import { useSway } from './Wind';
import { Grain } from './Paint';
import Motes from './Motes';
import { TIME } from '../theme/palette';

const EASE_SOFT = [0.4, 0, 0.2, 1];
const SKY_SHIFT = { duration: 2.4, ease: EASE_SOFT };

/* Deterministic scatter — Math.random would reshuffle the painting on every
   render, and a plain modulo lands everything in visible columns. */
const mulberry32 = (seed) => () => {
  let t = (seed += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

/* ---------------------------------------------------------------------------
   Ridge lines.

   Every band is an open crest curve in a 1600x200 viewBox stretched to a fixed
   share of the viewport height, so each crest lands at a predictable percentage
   and the landmarks can be positioned to stand on it.

   Each crest is drawn three times: filled for the hill, stroked in --pool just
   under the edge for the pigment that gathers where a wash dried, and stroked
   in --rim on the edge itself for the light coming over the top.
   --------------------------------------------------------------------------- */

/** Close an open crest curve into a fillable band. */
const band = (crest) => `${crest}L1600 220H0Z`;

/** One dominant peak with lower shoulders, the way a volcano sits in a range —
    a row of equal cones reads as a chart. Generated, so the snow line and the
    shaded flanks can be derived from the same numbers. */
const PEAKS = [
  { x: 210, y: 104, w: 250 },
  { x: 616, y: 82, w: 270 },
  { x: 1004, y: 24, w: 392 },
  { x: 1412, y: 92, w: 250 },
];
const RIDGE_BASE = 158;

const RIDGE_SHADE = PEAKS.map((p) => {
  const drop = RIDGE_BASE - p.y;
  return (
    `M${p.x} ${p.y - 1}Q${p.x} ${p.y - 6} ${p.x + 16} ${p.y + 12}` +
    `C${p.x + p.w * 0.32} ${p.y + drop * 0.44} ${p.x + p.w * 0.72} ${RIDGE_BASE - drop * 0.08} ${p.x + p.w} ${RIDGE_BASE}` +
    `L${p.x} ${RIDGE_BASE}Z`
  );
});

const RIDGE_CREST = (() => {
  let d = `M0 ${RIDGE_BASE}`;
  for (const p of PEAKS) {
    const drop = RIDGE_BASE - p.y;
    d +=
      `L${p.x - p.w} ${RIDGE_BASE}` +
      `C${p.x - p.w * 0.72} ${RIDGE_BASE - drop * 0.08} ${p.x - p.w * 0.32} ${p.y + drop * 0.44} ${p.x - 16} ${p.y + 12}` +
      `Q${p.x} ${p.y - 6} ${p.x + 16} ${p.y + 12}` +
      `C${p.x + p.w * 0.32} ${p.y + drop * 0.44} ${p.x + p.w * 0.72} ${RIDGE_BASE - drop * 0.08} ${p.x + p.w} ${RIDGE_BASE}`;
  }
  return `${d}L1600 ${RIDGE_BASE}`;
})();

/** Snow in the top of the tall peak only, with a ragged lower edge — it runs
    further down the gullies than it does on the spurs. */
const SNOW = PEAKS.filter((p) => p.y < 60).map((p) => {
  const k = p.w * 0.12;
  return (
    `M${p.x - 16} ${p.y + 12}Q${p.x} ${p.y - 6} ${p.x + 16} ${p.y + 12}` +
    `l${k * 0.3} ${k * 0.62}l${-k * 0.22} ${-k * 0.18}l${k * 0.2} ${k * 0.5}` +
    `l${-k * 0.54} ${-k * 0.34}l${-k * 0.36} ${k * 0.3}l${-k * 0.38} ${-k * 0.36}` +
    `l${-k * 0.32} ${k * 0.18}Z`
  );
});

/* Broad, rolling hills — the reference has long low swells, not scalloped
   waves, so the control points are stretched far apart. */
const HILL_FAR =
  'M0 104C170 60 330 118 480 96s280-66 440-16 296 68 452 24c106-30 184-26 228-12';
const HILL_MID =
  'M0 120C186 72 348 132 522 110s306-72 470-20 306 66 462 24c76-20 122-22 146-14';
const HILL_NEAR =
  'M0 136C204 90 414 148 638 126s418-68 642-8c152 40 254 40 320 14';
const GROUND =
  'M0 162C184 138 372 176 576 158s428-32 632 2c162 28 300 32 392 6';

/** A tiered conifer, stamped out the way a background painter would. */
const conifer = (x, y, h) => {
  const w = h * 0.4;
  return (
    `M${x} ${y}l${w * 0.5} ${h * 0.3}h${-w}Z` +
    `M${x} ${y + h * 0.2}l${w * 0.74} ${h * 0.34}h${-w * 1.48}Z` +
    `M${x} ${y + h * 0.44}l${w} ${h * 0.4}h${-w * 2}Z`
  );
};

/** Copses rather than an even row: trees gather where the ground is wet. */
const TREE_LINE = [
  [148, 92, 26],
  [186, 86, 33],
  [222, 90, 21],
  [252, 94, 27],
  [648, 78, 30],
  [688, 72, 24],
  [716, 78, 31],
  [1120, 130, 27],
  [1164, 125, 35],
  [1206, 131, 23],
  [1240, 128, 29],
]
  .map(([x, y, h]) => conifer(x, y, h))
  .join('');

/** Brush flicks lying along the slope: what stops a hill reading as a fill. */
const flicks = (seed, count, yMin, yMax) => {
  const rand = mulberry32(seed);
  return Array.from({ length: count }, () => {
    const x = rand() * 1600;
    const y = yMin + rand() * (yMax - yMin);
    const w = 26 + rand() * 54;
    const lift = 3 + rand() * 6;
    return `M${x} ${y}q${w / 2} ${-lift} ${w} ${-lift * 0.3}`;
  }).join('');
};

const FLICK_MID = flicks(5, 26, 120, 180);
const FLICK_NEAR = flicks(19, 30, 140, 200);
const FLICK_GROUND = flicks(31, 34, 168, 216);

const STARS = (() => {
  const rand = mulberry32(20260809);
  return Array.from({ length: 96 }, () => ({
    cx: rand() * 100,
    cy: rand() * 68,
    r: 0.05 + rand() * 0.11,
    delay: rand() * 4,
  }));
})();

/* — Clouds ————————————————————————————————————————————————————
   Towering cumulus with a flat, shaded base, painted rather than cut: the
   silhouette is a stack of lobes run through the bleed filter, so the edge
   frays and the body granulates instead of sitting there as a white shape. */

const CLOUD_SHAPES = [
  {
    w: 320,
    base: 128,
    body: [
      [96, 112, 76, 24],
      [174, 104, 68, 30],
      [244, 114, 58, 22],
      [128, 74, 54, 40],
      [196, 66, 48, 36],
      [150, 38, 38, 28],
      [206, 34, 28, 20],
    ],
    cap: [
      [140, 24, 26, 15],
      [198, 22, 19, 12],
      [110, 58, 22, 14],
    ],
  },
  {
    w: 244,
    base: 116,
    body: [
      [78, 102, 58, 20],
      [136, 92, 52, 26],
      [188, 102, 44, 19],
      [108, 64, 38, 28],
      [158, 60, 30, 22],
    ],
    cap: [
      [104, 44, 20, 12],
      [152, 42, 15, 9],
    ],
  },
  {
    w: 186,
    base: 104,
    body: [
      [60, 92, 46, 17],
      [104, 80, 40, 23],
      [144, 92, 34, 16],
      [92, 56, 24, 17],
    ],
    cap: [[86, 42, 16, 9]],
  },
];

const CLOUDS = [
  { shape: 0, top: '8%', scale: 1, opacity: 0.97, duration: 186, phase: 0.3 },
  { shape: 1, top: '26%', scale: 0.78, opacity: 0.8, duration: 238, phase: 0.71 },
  { shape: 2, top: '3%', scale: 0.58, opacity: 0.6, duration: 300, phase: 0.06 },
];

/**
 * Driven off elapsed time rather than a keyframe loop: a loop has to start
 * off-frame to wrap seamlessly, which would leave the sky empty for the first
 * half-minute. A wrapped phase gives every cloud a position on screen from the
 * first paint and still wraps without a seam.
 */
const Cloud = ({ shape, top, scale, opacity, duration, phase, night }) => {
  const art = CLOUD_SHAPES[shape];
  const clip = `cloud-clip-${shape}`;
  const time = useTime();
  const x = useTransform(time, (t) => {
    const p = (t / (duration * 1000) + phase) % 1;
    return `${-34 + p * 148}vw`;
  });

  return (
    <motion.div className="scene__cloud" style={{ top, scale, x }}>
      <motion.svg
        viewBox={`0 0 ${art.w} 150`}
        width={art.w}
        height="150"
        animate={{ opacity: night ? opacity * 0.42 : opacity }}
        transition={SKY_SHIFT}
      >
        <defs>
          <clipPath id={clip}>
            {art.body.map(([cx, cy, rx, ry]) => (
              <ellipse key={`c${cx}-${cy}`} cx={cx} cy={cy} rx={rx} ry={ry} />
            ))}
          </clipPath>
        </defs>

        <g filter="url(#wc-cloud)">
          <g fill="var(--cloud)">
            {art.body.map(([cx, cy, rx, ry]) => (
              <ellipse key={`b${cx}-${cy}`} cx={cx} cy={cy} rx={rx} ry={ry} />
            ))}
          </g>

          {/* Underside: the same lobes dropped and clipped back to the
              silhouette, which leaves a crescent under each one rather than a
              flat grey band across the base. */}
          <g clipPath={`url(#${clip})`} fill="var(--cloud-shade)">
            {art.body.map(([cx, cy, rx, ry]) => (
              <ellipse
                key={`s${cx}-${cy}`}
                cx={cx}
                cy={cy + ry * 0.92}
                rx={rx}
                ry={ry}
              />
            ))}
            <rect x="0" y={art.base} width={art.w} height="40" opacity="0.5" />
          </g>

          <g fill="var(--cloud-light)">
            {art.cap.map(([cx, cy, rx, ry]) => (
              <ellipse key={`h${cx}-${cy}`} cx={cx} cy={cy} rx={rx} ry={ry} />
            ))}
          </g>
        </g>
      </motion.svg>
    </motion.div>
  );
};

/* — Birds ——————————————————————————————————————————————————— */

const FLOCK = [
  [0, 0, 1],
  [26, 11, 0.86],
  [-24, 13, 0.86],
  [50, 23, 0.72],
  [-48, 25, 0.72],
];

/** A distant V. The wing-beat is a scaleY squash, which costs one transform per
    bird instead of an animated path. */
const Birds = ({ night }) => (
  <motion.div
    className="scene__birds"
    initial={{ x: '-14vw' }}
    animate={{ x: '112vw' }}
    transition={{ duration: 96, repeat: Infinity, repeatDelay: 34, ease: 'linear' }}
  >
    <motion.svg
      viewBox="-64 -8 148 44"
      width="148"
      height="44"
      animate={{ opacity: night ? 0 : 0.5 }}
      transition={SKY_SHIFT}
    >
      {FLOCK.map(([x, y, s], i) => (
        <motion.path
          key={`${x}-${y}`}
          d="M-7 0q3.6-4.4 7 0 3.4-4.4 7 0"
          fill="none"
          stroke="var(--ink)"
          strokeWidth={1.5 / s}
          strokeLinecap="round"
          style={{ originX: '0px', originY: '0px' }}
          initial={{ x, y, scale: s }}
          animate={{ x, y, scale: s, scaleY: [s, s * 0.4, s] }}
          transition={{
            scaleY: {
              duration: 0.9,
              delay: i * 0.11,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
        />
      ))}
    </motion.svg>
  </motion.div>
);

/* — Grass ——————————————————————————————————————————————————— */

const blade = (x, h, lean) =>
  `M${x} 40C${x + lean * 0.2} ${40 - h * 0.5} ${x + lean * 0.7} ${40 - h * 0.8} ${x + lean} ${40 - h}` +
  `C${x + lean * 0.5} ${40 - h * 0.76} ${x + 2.4} ${40 - h * 0.46} ${x + 2.6} 40Z`;

const TUFTS = (() => {
  const rand = mulberry32(77);
  return [0, 1, 2, 3, 4, 5].map((i) => {
    const base = i * 160 + 40;
    const blades = Array.from({ length: 10 }, (_, n) => {
      const x = base + n * 9 + rand() * 8;
      return blade(x, 16 + rand() * 22, (rand() - 0.5) * 22);
    }).join('');
    const flowers = Array.from({ length: 2 }, () => ({
      cx: base + rand() * 80,
      cy: 40 - (14 + rand() * 16),
    }));
    // The amplitude varies, the timing does not — one gust, one field.
    return { blades, flowers, amp: 2.4 + rand() * 1.4 };
  });
})();

const Tuft = ({ tuft, index }) => {
  const rotate = useSway(tuft.amp, 0);
  return (
    <motion.g
      style={{ rotate, originX: `${index * 160 + 80}px`, originY: '40px' }}
    >
      <path d={tuft.blades} fill="var(--foliage)" />
      {tuft.flowers.map((f) => (
        <circle
          key={`${f.cx}-${f.cy}`}
          cx={f.cx}
          cy={f.cy}
          r="2.6"
          fill="var(--bloom)"
          opacity="0.85"
        />
      ))}
    </motion.g>
  );
};

/** The nearest thing in the painting: grass the page scrolls up behind. */
const Fringe = () => (
  <Layer depth={0.95} className="scene__fringe">
    <svg viewBox="0 0 960 40" preserveAspectRatio="none" aria-hidden="true">
      <g filter="url(#wc-leaf)">
        {TUFTS.map((tuft, i) => (
          <Tuft key={i} tuft={tuft} index={i} />
        ))}
      </g>
    </svg>
  </Layer>
);

/* — Bands ——————————————————————————————————————————————————— */

/**
 * One hill. The wash is filtered as a unit, so the fill, the pooled edge and
 * the rim light all frayed by the same amount and stay registered with each
 * other — filtering them separately would pull the highlight off the edge.
 */
const Band = ({
  crest,
  fill,
  depth,
  className,
  rim = 0.5,
  pool = 0.3,
  texture,
  filter = 'url(#wc-band)',
  children,
}) => (
  <Layer depth={depth} className={`scene__band ${className}`}>
    <svg viewBox="0 0 1600 200" preserveAspectRatio="none" aria-hidden="true">
      <g filter={filter}>
        <path d={band(crest)} style={{ fill }} />

        {/* Variegation: two soft patches so the "flat" area is never flat.
            Kept faint — read as unevenness in the wash, not as weather. */}
        <ellipse cx="300" cy="184" rx="360" ry="46" fill="url(#wc-shade)" />
        <ellipse cx="1210" cy="180" rx="300" ry="40" fill="url(#wc-lit)" />

        {children}

        {texture && (
          <path
            d={texture}
            fill="none"
            stroke="var(--rim)"
            strokeOpacity="0.1"
            strokeWidth="2"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        )}

        {/* Pigment gathered just inside the drying edge, then the light coming
            over the top of it. */}
        <path
          d={crest}
          fill="none"
          stroke="var(--pool)"
          strokeWidth="5"
          strokeOpacity={pool}
          vectorEffect="non-scaling-stroke"
          transform="translate(0 3)"
        />
        <path
          d={crest}
          fill="none"
          stroke="var(--rim)"
          strokeWidth="2"
          strokeOpacity={rim}
          vectorEffect="non-scaling-stroke"
        />
      </g>
    </svg>
  </Layer>
);

/** The tree-line, bending as one mass on the far channel of the wind. */
const TreeLine = () => {
  const rotate = useSway(0.9, 2);
  return (
    <motion.path
      d={TREE_LINE}
      style={{ fill: 'var(--foliage)', rotate, originX: '800px', originY: '160px' }}
    />
  );
};

/**
 * The landscape behind the landing view and the About page: a crossfading sky,
 * one celestial arc carrying both the sun and the moon, five washed bands and a
 * grass fringe.
 *
 * Day and night are two complete paintings stacked on top of each other —
 * crossfading them is the only way the light can actually interpolate, since
 * CSS gradients do not.
 */
const Scene = ({ night, variant = 'page', onToggleTime }) => {
  // Each toggle advances the arc another half-turn, so the sun always sets
  // westward and the moon rises behind it rather than snapping back.
  const turns = React.useRef(night ? 1 : 0);
  const previous = React.useRef(night);
  if (previous.current !== night) {
    turns.current += 1;
    previous.current = night;
  }
  const rotation = turns.current * 180;

  return (
    <div className={`scene scene--${variant}`}>
      <div className="scene__sky scene__sky--day" />
      <motion.div
        className="scene__sky scene__sky--night"
        initial={false}
        animate={{ opacity: night ? 1 : 0 }}
        transition={SKY_SHIFT}
      />
      {/* Light pooling where the sky meets the hills. */}
      <div className="scene__horizon-glow" />

      <motion.svg
        className="scene__stars"
        viewBox="0 0 100 70"
        preserveAspectRatio="none"
        initial={false}
        animate={{ opacity: night ? 1 : 0 }}
        transition={SKY_SHIFT}
        aria-hidden="true"
      >
        {STARS.map((s) => (
          <motion.circle
            key={`${s.cx}-${s.cy}`}
            cx={s.cx}
            cy={s.cy}
            r={s.r}
            fill="#fdfbf2"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.25, 0.95, 0.25] }}
            transition={{
              duration: 4 + s.delay,
              delay: s.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.svg>

      {/* One rotating arc holds both bodies half a turn apart. */}
      <motion.div
        className="scene__orbit"
        initial={false}
        animate={{ rotate: rotation }}
        transition={{ duration: 2.8, ease: EASE_SOFT }}
      >
        {/* Only the body currently above the horizon is interactive — the
            other one is parked far below and must not take focus. */}
        <div className="scene__body scene__body--top">
          <motion.div
            animate={{ rotate: -rotation }}
            transition={{ duration: 2.8, ease: EASE_SOFT }}
          >
            <button
              type="button"
              className="scene__sun"
              onClick={onToggleTime}
              disabled={!onToggleTime || night}
              aria-hidden={night}
              tabIndex={night ? -1 : 0}
              aria-label="Turn the sky to night"
            >
              <span className="scene__sun-glow" />
            </button>
          </motion.div>
        </div>

        <div className="scene__body scene__body--bottom">
          <motion.div
            animate={{ rotate: -rotation }}
            transition={{ duration: 2.8, ease: EASE_SOFT }}
          >
            <button
              type="button"
              className="scene__moon"
              onClick={onToggleTime}
              disabled={!onToggleTime || !night}
              aria-hidden={!night}
              tabIndex={night ? 0 : -1}
              aria-label="Turn the sky to day"
            >
              <span className="scene__moon-face" />
            </button>
          </motion.div>
        </div>
      </motion.div>

      <Layer depth={0.05} className="scene__clouds">
        {CLOUDS.map((cloud) => (
          <Cloud key={cloud.top} {...cloud} night={night} />
        ))}
        <Birds night={night} />
      </Layer>

      <Band
        crest={RIDGE_CREST}
        fill="var(--ridge)"
        depth={0.08}
        className="scene__band--ridge"
        rim={0.3}
        pool={0.16}
        filter="url(#wc-band-far)"
      >
        {RIDGE_SHADE.map((d) => (
          <path key={d.slice(0, 18)} d={d} style={{ fill: 'var(--ridge-shade)' }} />
        ))}
        {SNOW.map((d) => (
          <path key={d.slice(0, 18)} d={d} style={{ fill: 'var(--snow)' }} />
        ))}
      </Band>

      <Band
        crest={HILL_FAR}
        fill="var(--hill-far)"
        depth={0.16}
        className="scene__band--far"
        rim={0.4}
        pool={0.2}
        filter="url(#wc-band-far)"
      />

      <Band
        crest={HILL_MID}
        fill="var(--hill-mid)"
        depth={0.28}
        className="scene__band--mid"
        rim={0.5}
        pool={0.26}
        texture={FLICK_MID}
      >
        <TreeLine />
      </Band>

      <Band
        crest={HILL_NEAR}
        fill="var(--hill-near)"
        depth={0.44}
        className="scene__band--near"
        rim={0.6}
        pool={0.32}
        texture={FLICK_NEAR}
      />

      <Band
        crest={GROUND}
        fill="var(--ground)"
        depth={0.66}
        className="scene__band--ground"
        rim={0.7}
        pool={0.36}
        texture={FLICK_GROUND}
      />

      <Fringe />

      {/* Canvas cannot read custom properties, so the tint comes from JS. */}
      <Motes
        color={night ? TIME.night.mote : TIME.day.mote}
        night={night}
        count={variant === 'home' ? 52 : 34}
      />

      <div className="scene__scrim" />
      <Grain />
    </div>
  );
};

export default Scene;
