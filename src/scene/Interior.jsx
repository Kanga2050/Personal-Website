import React from 'react';
import { motion } from 'framer-motion';
import { Layer } from './Parallax';
import { useSway } from './Wind';
import { Grain } from './Paint';
import Motes from './Motes';
import { TIME } from '../theme/palette';

/**
 * Rooms.
 *
 * A hub page is not a document about a subject, it is the place the subject
 * happens: the workshop is a bench, the field notes are a treehouse, the code
 * is a loft full of paper. Each room is built from the same five planes the
 * landscape uses — wall, window, wall furniture, work surface, near props —
 * so the parallax, the wind and the watercolour filters carry straight over
 * and the page still moves like the hills do.
 *
 * Everything is drawn here, in paths. Light falls from the window on the left
 * in every room, which is why every shaded face is on the right.
 */

const EASE_SOFT = [0.4, 0, 0.2, 1];
const SWAP = { duration: 2.4, ease: EASE_SOFT };
const VIEW = '0 0 1200 720';

/* — Shared parts ————————————————————————————————————————————— */

/** A sawn board. Slightly out of square, because a drawn one never is. */
const Plank = ({ x, y, w, h, tone = 'var(--plank)', skew = 0 }) => (
  <>
    <path
      d={`M${x} ${y + skew}L${x + w} ${y}L${x + w} ${y + h}L${x} ${y + h + skew}Z`}
      fill={tone}
    />
    <path
      d={`M${x} ${y + h + skew}L${x + w} ${y + h}v-4L${x} ${y + h + skew - 4}Z`}
      fill="var(--room-shade)"
    />
  </>
);

/** A stoppered jar. The contents show through, so the fill is the interesting
    part and the glass is only two highlights. */
const Jar = ({ x, y, w, h, fill }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={w * 0.28} y={-h * 0.14} width={w * 0.44} height={h * 0.16} rx="3" fill="var(--brass)" />
    <path
      d={`M0 ${h * 0.1}q0 ${-h * 0.12} ${w * 0.22} ${-h * 0.12}h${w * 0.56}q${w * 0.22} 0 ${w * 0.22} ${h * 0.12}v${h * 0.78}q0 ${h * 0.12} ${-w * 0.2} ${h * 0.12}h${-w * 0.6}q${-w * 0.2} 0 ${-w * 0.2} ${-h * 0.12}Z`}
      fill="var(--glass)"
      opacity="0.55"
    />
    <path
      d={`M${w * 0.1} ${h * 0.46}h${w * 0.8}v${h * 0.42}q0 ${h * 0.12} ${-w * 0.2} ${h * 0.12}h${-w * 0.4}q${-w * 0.2} 0 ${-w * 0.2} ${-h * 0.12}Z`}
      fill={fill}
      opacity="0.8"
    />
    <path
      d={`M${w * 0.16} ${h * 0.16}v${h * 0.6}`}
      stroke="var(--room-light)"
      strokeWidth={w * 0.09}
      strokeLinecap="round"
      fill="none"
    />
  </g>
);

/** A book seen spine-on, leaning if you ask it to. */
const Book = ({ x, y, w, h, tone, lean = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${lean} 0 ${h})`}>
    <rect width={w} height={h} rx="2" fill={tone} />
    <rect x={w * 0.16} y={h * 0.12} width={w * 0.68} height={h * 0.04} fill="var(--room-light)" />
    <rect x={w * 0.16} y={h * 0.82} width={w * 0.68} height={h * 0.04} fill="var(--room-light)" />
    <rect x={w * 0.72} width={w * 0.28} height={h} fill="var(--room-shade)" />
  </g>
);

/**
 * The window, and with it the only way to change the light from inside a room.
 * The sun and the moon share the corner of the pane: one climbs out of frame
 * as the other rises into it, which is the same gesture the outdoor arc makes,
 * seen through a smaller opening.
 */
const Window = ({ night, onToggleTime, shape = 'sash' }) => (
  <Layer depth={0.12} scroll={0.05} className={`room__window room__window--${shape}`}>
    <div className="room__glass">
      <div className="scene__sky scene__sky--day" />
      <motion.div
        className="scene__sky scene__sky--night"
        initial={false}
        animate={{ opacity: night ? 1 : 0 }}
        transition={SWAP}
      />

      <motion.div
        className="room__body room__body--sun"
        initial={false}
        animate={{ y: night ? '150%' : '0%', opacity: night ? 0 : 1 }}
        transition={{ duration: 2.6, ease: EASE_SOFT }}
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

      <motion.div
        className="room__body room__body--moon"
        initial={false}
        animate={{ y: night ? '0%' : '150%', opacity: night ? 1 : 0 }}
        transition={{ duration: 2.6, ease: EASE_SOFT }}
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

      {/* A slice of the same landscape, a long way off. */}
      <svg className="room__view" viewBox="0 0 200 140" preserveAspectRatio="none">
        <g filter="url(#wc-band-far)">
          <path
            d="M0 96C26 80 44 92 62 86s34-18 56-6 40 12 62 2c12-6 18-6 20-4V140H0Z"
            fill="var(--hill-far)"
          />
          <path
            d="M0 116C30 104 56 120 84 112s48-14 74-2c14 6 30 8 42 6V140H0Z"
            fill="var(--hill-mid)"
          />
        </g>
      </svg>

      <motion.div
        className="room__drift"
        animate={{ x: ['-40%', '140%'] }}
        transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
      >
        <svg viewBox="0 0 120 54" width="120" height="54">
          <g filter="url(#wc-cloud)" fill="var(--cloud)">
            <ellipse cx="38" cy="38" rx="30" ry="12" />
            <ellipse cx="64" cy="30" rx="26" ry="15" />
            <ellipse cx="86" cy="38" rx="22" ry="11" />
          </g>
        </svg>
      </motion.div>
    </div>

    {/* Frame last, so it sits over the glass and hides the seam. */}
    <svg className="room__frame" viewBox="0 0 200 200" preserveAspectRatio="none">
      <g filter="url(#wc-prop)">
        <path
          d="M0 0h200v200H0Z M12 12v176h176V12Z"
          fill="var(--wood)"
          fillRule="evenodd"
        />
        <rect x="96" y="12" width="8" height="176" fill="var(--wood)" />
        <rect x="12" y="96" width="176" height="8" fill="var(--wood)" />
        <path d="M0 188h200v12H0Z" fill="var(--plank-dark)" />
      </g>
    </svg>
  </Layer>
);

/* — Workshop: the bench ——————————————————————————————————————— */

const PEG_HOLES = (() => {
  const holes = [];
  for (let row = 0; row < 11; row += 1) {
    for (let col = 0; col < 30; col += 1) {
      holes.push(`M${420 + col * 26} ${70 + row * 30}h6`);
    }
  }
  return holes.join('');
})();

const WorkshopWall = () => (
  <svg className="room__plane" viewBox={VIEW} preserveAspectRatio="xMidYMax slice">
    <rect width="1200" height="720" fill="var(--plank)" />
    <g filter="url(#wc-room)">
      {/* Pegboard, hung a little proud of the wall. */}
      <rect x="404" y="46" width="770" height="366" rx="6" fill="var(--plank-dark)" />
      <rect x="404" y="46" width="770" height="14" fill="var(--room-light)" opacity="0.5" />
      <path
        d={PEG_HOLES}
        stroke="var(--room-shade)"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* The room falls off to the right, away from the window. */}
      <rect x="820" y="0" width="380" height="720" fill="var(--room-shade)" opacity="0.5" />
    </g>
  </svg>
);

const WorkshopFittings = () => (
  <svg className="room__plane" viewBox={VIEW} preserveAspectRatio="xMidYMax slice">
    <g filter="url(#wc-prop)">
      {/* Hanging tools. */}
      <g stroke="var(--metal)" strokeWidth="9" strokeLinecap="round" fill="none">
        <path d="M470 92v120" />
        <path d="M512 92v96" />
        <path d="M554 92v140" />
      </g>
      <g fill="var(--brass)">
        <rect x="462" y="208" width="16" height="34" rx="5" />
        <rect x="504" y="184" width="16" height="30" rx="5" />
        <rect x="546" y="228" width="16" height="38" rx="5" />
      </g>

      {/* Combination wrench. */}
      <g transform="translate(626 88)" fill="var(--metal)">
        <path d="M14 0a16 16 0 1 1-.1 0Zm0 9a7 7 0 1 0 .1 0Z" />
        <rect x="9" y="28" width="10" height="118" rx="5" />
        <path d="M14 150a14 14 0 1 1-.1 0Zm0 8a6 6 0 1 0 .1 0Z" />
      </g>

      {/* Pliers. */}
      <g transform="translate(700 92)">
        <path
          d="M18 0 30 62 22 132M42 0 30 62 40 132"
          stroke="var(--metal)"
          strokeWidth="11"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M22 132v40M40 132v40"
          stroke="var(--roof)"
          strokeWidth="13"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* Handsaw. */}
      <g transform="translate(790 96)">
        <path d="M0 0h150l-14 60H26Z" fill="var(--metal)" />
        <path
          d="M26 60h110l-4 16-8-10-8 10-8-10-8 10-8-10-8 10-8-10-8 10-8-10-8 10-8-10-8 10Z"
          fill="var(--metal)"
        />
        <path d="M0 0q-40 4-40 32t40 30Z" fill="var(--wood)" />
      </g>

      {/* Calipers on their hook. */}
      <g transform="translate(980 88)" fill="var(--metal)">
        <rect x="0" y="30" width="140" height="16" rx="4" />
        <rect x="8" y="46" width="16" height="46" rx="4" />
        <rect x="86" y="46" width="14" height="60" rx="4" />
        <rect x="76" y="12" width="46" height="34" rx="5" fill="var(--paper)" />
      </g>

      {/* A coil of wire on a nail. */}
      <g transform="translate(1050 220)" fill="none" stroke="var(--brass)" strokeWidth="7">
        <circle cx="42" cy="42" r="40" />
        <circle cx="42" cy="42" r="26" />
      </g>

      {/* A drawing pinned to the board. */}
      <g transform="translate(456 258)">
        <rect width="180" height="132" rx="3" fill="var(--paper)" />
        <g stroke="var(--accent)" strokeWidth="3" fill="none" opacity="0.7">
          <path d="M26 100 60 40l34 60Z" />
          <path d="M110 40h48v60h-48Z" />
          <path d="M18 116h146" strokeDasharray="8 7" />
        </g>
        <circle cx="90" cy="8" r="6" fill="var(--roof)" />
      </g>

      {/* Shelf with tins. */}
      <g transform="translate(700 300)">
        <rect x="-8" y="86" width="300" height="14" rx="4" fill="var(--wood)" />
        <rect x="14" y="34" width="52" height="52" rx="4" fill="var(--roof)" />
        <rect x="80" y="24" width="46" height="62" rx="4" fill="var(--foliage)" />
        <rect x="140" y="42" width="58" height="44" rx="4" fill="var(--brass)" />
        <rect x="212" y="30" width="44" height="56" rx="4" fill="var(--stone)" />
        <rect x="14" y="34" width="242" height="8" fill="var(--room-light)" opacity="0.6" />
      </g>
    </g>
  </svg>
);

const WorkshopSurface = () => (
  <svg className="room__plane" viewBox={VIEW} preserveAspectRatio="xMidYMax slice">
    <g filter="url(#wc-room)">
      {/* Bench top, with the front edge catching the light. */}
      <path d="M-40 470h1280v34H-40Z" fill="var(--plank-light)" />
      <path d="M-40 504h1280v250H-40Z" fill="var(--plank-dark)" />
      <path d="M-40 470h1280v8H-40Z" fill="var(--room-light)" />
      {/* Cutting mat. */}
      <rect x="300" y="488" width="620" height="180" rx="8" fill="var(--foliage)" opacity="0.55" />
      <g stroke="var(--room-light)" strokeWidth="2" opacity="0.4">
        <path d="M340 508h540M340 548h540M340 588h540M400 496v160M520 496v160M640 496v160M760 496v160" />
      </g>
      {/* Grain in the bench. */}
      <g stroke="var(--room-shade)" strokeWidth="3" fill="none" opacity="0.5">
        <path d="M-40 540q300 -14 600 0t640 -6" />
        <path d="M-40 610q340 16 660 0t620 8" />
        <path d="M-40 682q280 -12 580 2t660 -8" />
      </g>
    </g>
  </svg>
);

const WorkshopProps = () => (
  <svg className="room__plane" viewBox={VIEW} preserveAspectRatio="xMidYMax slice">
    <g filter="url(#wc-prop)">
      {/* Swing-arm lamp, reaching in from the left. */}
      <g transform="translate(40 300)">
        <ellipse cx="60" cy="212" rx="66" ry="16" fill="var(--metal)" />
        <path
          d="M60 208V132l96-64 44 58"
          stroke="var(--metal)"
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="156" cy="68" r="11" fill="var(--brass)" />
        <path d="M200 126 262 96l30 62-66 24Z" fill="var(--roof)" />
        <path d="M226 182l66-24 6 12-66 24Z" fill="var(--lamp)" />
      </g>

      {/* Open notebook. */}
      <g transform="translate(330 552)">
        <path d="M0 22 108 0l106 22-106 26Z" fill="var(--paper)" />
        <path d="M0 22v42l108 26V48Z" fill="var(--paper)" />
        <path d="M214 22v42L108 90V48Z" fill="var(--paper)" />
        <path d="M108 0v90" stroke="var(--paper-edge)" strokeWidth="3" />
        <g stroke="var(--ink-soft)" strokeWidth="2.5" opacity="0.5">
          <path d="M18 32h74M18 44h68M18 56h74M124 32h74M124 44h66M124 56h72" />
        </g>
      </g>

      {/* The trunnion cradle, printed and sitting on the mat. */}
      <g transform="translate(600 512)">
        <path d="M20 96 0 40l40-24 76 8 30 52-42 34Z" fill="var(--accent)" opacity="0.9" />
        <path d="M0 40l40-24 76 8-30 30Z" fill="var(--room-light)" />
        <path d="M124 84l22-18-30-52-30 30Z" fill="var(--room-shade)" />
        <circle cx="66" cy="66" r="15" fill="var(--plank-dark)" />
      </g>

      {/* Mug, with the steam going up on the wind. */}
      <g transform="translate(880 566)">
        <path d="M0 0h72v56q0 20-36 20T0 56Z" fill="var(--wall)" />
        <path d="M50 0h22v56q0 20-36 20 22 0 22-20Z" fill="var(--room-shade)" />
        <path d="M72 12q26 0 26 20t-26 20" stroke="var(--wall)" strokeWidth="9" fill="none" />
        <ellipse cx="36" cy="2" rx="36" ry="9" fill="var(--wood)" />
      </g>

      {/* Jar of pencils. */}
      <g transform="translate(1010 520)">
        <g stroke="var(--wood)" strokeWidth="8" strokeLinecap="round">
          <path d="M18 44 12 -6" />
          <path d="M40 40 46 -14" />
          <path d="M62 46 76 2" />
        </g>
        <Jar x={0} y={40} w={86} h={92} fill="var(--glass)" />
      </g>
    </g>
  </svg>
);

/** Steam is the one thing in the room that moves on its own. */
const Steam = () => (
  <div className="room__steam" aria-hidden="true">
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        initial={{ opacity: 0, y: 0, scale: 0.6 }}
        animate={{ opacity: [0, 0.5, 0], y: -110, scale: 1.5 }}
        transition={{
          duration: 6,
          delay: i * 2,
          repeat: Infinity,
          ease: 'easeOut',
        }}
      />
    ))}
  </div>
);

/* — Field notes: the treehouse ————————————————————————————————— */

const TreehouseWall = () => (
  <svg className="room__plane" viewBox={VIEW} preserveAspectRatio="xMidYMax slice">
    <rect width="1200" height="720" fill="var(--plank-dark)" />
    <g filter="url(#wc-room)">
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <Plank
          key={i}
          x={-40}
          y={i * 104}
          w={1280}
          h={94}
          tone={i % 2 ? 'var(--plank)' : 'var(--plank-light)'}
          skew={i % 2 ? 4 : -3}
        />
      ))}
      {/* Daylight coming through the gaps between the boards. */}
      <g stroke="var(--rim)" strokeWidth="4" opacity="0.35">
        <path d="M-40 100h1280M-40 308h1280M-40 516h1280" />
      </g>
      {/* Knots. */}
      <g fill="var(--plank-dark)" opacity="0.7">
        <ellipse cx="220" cy="52" rx="14" ry="9" />
        <ellipse cx="742" cy="158" rx="11" ry="7" />
        <ellipse cx="384" cy="372" rx="16" ry="10" />
        <ellipse cx="1024" cy="470" rx="12" ry="8" />
      </g>
      <rect x="880" y="0" width="320" height="720" fill="var(--room-shade)" opacity="0.55" />
    </g>
  </svg>
);

const TreehouseFittings = () => (
  <svg className="room__plane" viewBox={VIEW} preserveAspectRatio="xMidYMax slice">
    <g filter="url(#wc-prop)">
      {/* The trunk the whole room is built around. */}
      <path
        d="M980 -40q-40 200 -14 400t44 400h240q-40 -200 -20 -400t8 -400Z"
        fill="var(--wood)"
      />
      <g stroke="var(--room-shade)" strokeWidth="7" fill="none" opacity="0.6">
        <path d="M1000 -20q-30 200 -8 380t34 380" />
        <path d="M1064 -20q-24 200 -4 380t30 380" />
        <path d="M1128 -20q-18 200 0 380t24 380" />
      </g>

      {/* Bunting across the room. */}
      <path d="M392 104q210 76 430 40t300 -66" stroke="var(--wood)" strokeWidth="4" fill="none" />
      {[
        [432, 128, 'var(--roof)'],
        [530, 146, 'var(--foliage-light)'],
        [628, 156, 'var(--brass)'],
        [726, 154, 'var(--glass)'],
        [824, 142, 'var(--roof)'],
        [922, 122, 'var(--foliage-light)'],
      ].map(([x, y, tone]) => (
        <path key={x} d={`M${x} ${y}h56l-28 52Z`} fill={tone} />
      ))}

      {/* Pinned survey map. */}
      <g transform="translate(408 214)">
        <rect width="240" height="180" rx="4" fill="var(--paper)" />
        <g fill="none" stroke="var(--accent)" strokeWidth="3" opacity="0.6">
          <path d="M28 132q40 -60 84 -44t96 -46" />
          <path d="M22 104q46 -56 92 -40t100 -42" />
          <path d="M34 158q36 -58 78 -42t92 -44" />
        </g>
        <circle cx="150" cy="92" r="8" fill="var(--roof)" />
        <circle cx="120" cy="10" r="7" fill="var(--metal)" />
      </g>

      {/* Shelf of specimen jars. */}
      <g transform="translate(660 300)">
        <rect x="-10" y="140" width="330" height="16" rx="5" fill="var(--wood)" />
        <Jar x={10} y={54} w={72} h={86} fill="var(--foliage-light)" />
        <Jar x={104} y={38} w={80} h={102} fill="var(--accent)" />
        <Jar x={206} y={62} w={68} h={78} fill="var(--glass)" />
      </g>

      {/* Dried herbs, hung to dry. */}
      <g transform="translate(806 60)">
        <path d="M18 0v96" stroke="var(--wood)" strokeWidth="5" fill="none" />
        <path
          d="M18 96q-46 40 -30 92 14 -46 30 -56 16 10 30 56 16 -52 -30 -92Z"
          fill="var(--foliage)"
        />
      </g>
    </g>
  </svg>
);

/** Lanterns hanging from the ceiling. They pivot from the hook, they all hang
    in the same air, and so they all swing on the same channel. */
const Lantern = ({ x, drop, size, channel }) => {
  const rotate = useSway(3.4, channel);
  return (
    <motion.g style={{ rotate, originX: `${x}px`, originY: '0px' }}>
      <path d={`M${x} 0v${drop}`} stroke="var(--wood)" strokeWidth="4" fill="none" />
      <g transform={`translate(${x - size / 2} ${drop})`}>
        <path
          d={`M${size * 0.2} 0h${size * 0.6}l${size * 0.2} ${size * 0.24}v${size * 0.62}l${-size * 0.2} ${size * 0.24}h${-size * 0.6}l${-size * 0.2} ${-size * 0.24}v${-size * 0.62}Z`}
          fill="var(--lamp)"
          opacity="0.92"
        />
        <path
          d={`M${size * 0.8} 0l${size * 0.2} ${size * 0.24}v${size * 0.62}l${-size * 0.2} ${size * 0.24}Z`}
          fill="var(--room-shade)"
        />
        <g stroke="var(--wood)" strokeWidth={size * 0.05} fill="none">
          <path d={`M0 ${size * 0.24}h${size}M0 ${size * 0.86}h${size}`} />
          <path d={`M${size * 0.2} 0v${size * 1.1}M${size * 0.8} 0v${size * 1.1}`} />
        </g>
      </g>
    </motion.g>
  );
};

const TreehouseLanterns = () => (
  <svg className="room__plane" viewBox={VIEW} preserveAspectRatio="xMidYMax slice">
    <g filter="url(#wc-prop)">
      <Lantern x={438} drop={120} size={62} channel={1} />
      <Lantern x={700} drop={192} size={48} channel={1} />
      <Lantern x={904} drop={92} size={54} channel={1} />
    </g>
  </svg>
);

const TreehouseFloor = () => (
  <svg className="room__plane" viewBox={VIEW} preserveAspectRatio="xMidYMax slice">
    <g filter="url(#wc-room)">
      {/* Floorboards running away from the reader. */}
      <path d="M-40 496h1280v260H-40Z" fill="var(--plank)" />
      <path d="M-40 496h1280v10H-40Z" fill="var(--room-light)" />
      <g stroke="var(--room-shade)" strokeWidth="4" opacity="0.6">
        <path d="M40 496 -60 756M300 496 250 756M560 496 552 756M820 496 856 756M1080 496 1160 756" />
        <path d="M-40 596h1280M-40 686h1280" />
      </g>
      {/* Hatch down to the ladder. */}
      <g transform="translate(120 574)">
        <rect width="230" height="120" rx="6" fill="var(--plank-dark)" />
        <rect x="10" y="10" width="210" height="100" rx="4" fill="var(--ground)" opacity="0.5" />
        <circle cx="196" cy="60" r="13" fill="none" stroke="var(--brass)" strokeWidth="6" />
      </g>
    </g>
  </svg>
);

const TreehouseProps = () => (
  <svg className="room__plane" viewBox={VIEW} preserveAspectRatio="xMidYMax slice">
    <g filter="url(#wc-prop)">
      {/* Coil of rope. */}
      <g transform="translate(430 560)" fill="none" stroke="var(--brass)" strokeWidth="12">
        <ellipse cx="70" cy="60" rx="68" ry="26" />
        <ellipse cx="70" cy="46" rx="50" ry="19" />
        <ellipse cx="70" cy="34" rx="32" ry="12" />
      </g>

      {/* Field notebook and a pressed leaf. */}
      <g transform="translate(650 590)">
        <rect width="176" height="112" rx="5" fill="var(--roof)" transform="rotate(-6)" />
        <rect x="10" y="8" width="160" height="96" rx="4" fill="var(--paper)" transform="rotate(-6)" />
        <path
          d="M46 74C58 40 96 30 132 34 122 70 84 84 46 74Z"
          fill="var(--foliage-light)"
          transform="rotate(-6)"
        />
      </g>

      {/* A jar of collected somethings, lid off. */}
      <g transform="translate(880 566)">
        <Jar x={0} y={0} w={96} h={126} fill="var(--foliage-light)" />
      </g>
    </g>
  </svg>
);

/* — Code: the paper loft ——————————————————————————————————————— */

const StudyWall = () => (
  <svg className="room__plane" viewBox={VIEW} preserveAspectRatio="xMidYMax slice">
    <rect width="1200" height="720" fill="var(--wall)" />
    <g filter="url(#wc-room)">
      {/* Plaster, unevenly washed. */}
      <ellipse cx="300" cy="200" rx="440" ry="260" fill="var(--room-light)" opacity="0.5" />
      <rect x="760" y="0" width="440" height="720" fill="var(--room-shade)" opacity="0.55" />
      <path d="M-40 640h1280v116H-40Z" fill="var(--plank-dark)" />
      <path d="M-40 630h1280v14H-40Z" fill="var(--wood)" />
    </g>
  </svg>
);

const StudyFittings = () => (
  <svg className="room__plane" viewBox={VIEW} preserveAspectRatio="xMidYMax slice">
    <g filter="url(#wc-prop)">
      {/* Bookcase against the shaded wall. */}
      <g transform="translate(760 40)">
        <rect width="420" height="560" rx="6" fill="var(--wood)" />
        <rect x="14" y="14" width="392" height="532" fill="var(--plank-dark)" />
        {[0, 1, 2, 3].map((row) => (
          <rect key={row} x="14" y={150 + row * 134} width="392" height="14" fill="var(--wood)" />
        ))}
        {[
          [30, 30, ['var(--roof)', 'var(--foliage)', 'var(--brass)', 'var(--glass)', 'var(--accent)']],
          [30, 164, ['var(--foliage)', 'var(--accent)', 'var(--roof)', 'var(--stone)']],
          [30, 298, ['var(--glass)', 'var(--brass)', 'var(--foliage)', 'var(--roof)', 'var(--accent)']],
        ].map(([x, y, tones]) =>
          tones.map((tone, i) => (
            <Book
              key={`${y}-${i}`}
              x={x + i * 40 + (i % 2) * 6}
              y={y + 26}
              w={28}
              h={94}
              tone={tone}
              lean={i === tones.length - 1 ? 12 : 0}
            />
          )),
        )}
        {/* Books stacked flat on the bottom shelf, and a cat asleep on them. */}
        <g transform="translate(40 470)">
          <rect width="180" height="20" rx="3" fill="var(--roof)" />
          <rect x="8" y="-20" width="166" height="20" rx="3" fill="var(--foliage)" />
          <rect x="4" y="-40" width="172" height="20" rx="3" fill="var(--accent)" />
          <path
            d="M20 -40q-6 -34 26 -36t44 10q30 -4 44 8t10 18Z"
            fill="var(--stone)"
          />
          <path d="M32 -74l-4 -18 20 12ZM70 -78l6 -18 12 16Z" fill="var(--stone)" />
        </g>
      </g>

      {/* Pinned notes with string running between them. */}
      <g transform="translate(424 88)">
        <path
          d="M0 40q90 34 180 6t190 -26"
          stroke="var(--roof)"
          strokeWidth="3"
          fill="none"
          opacity="0.8"
        />
        {[
          [10, 46, -5],
          [126, 70, 4],
          [252, 52, -3],
          [66, 168, 3],
          [200, 186, -6],
        ].map(([x, y, tilt]) => (
          <g key={`${x}-${y}`} transform={`translate(${x} ${y}) rotate(${tilt})`}>
            <rect width="96" height="76" rx="3" fill="var(--paper)" />
            <g stroke="var(--ink-soft)" strokeWidth="2.5" opacity="0.45">
              <path d="M14 20h66M14 34h56M14 48h64M14 62h40" />
            </g>
          </g>
        ))}
      </g>
    </g>
  </svg>
);

const StudySurface = () => (
  <svg className="room__plane" viewBox={VIEW} preserveAspectRatio="xMidYMax slice">
    <g filter="url(#wc-room)">
      <path d="M-40 486h1280v30H-40Z" fill="var(--plank-light)" />
      <path d="M-40 516h1280v240H-40Z" fill="var(--plank)" />
      <path d="M-40 486h1280v8H-40Z" fill="var(--room-light)" />
      <g stroke="var(--room-shade)" strokeWidth="3" fill="none" opacity="0.45">
        <path d="M-40 566q320 -12 640 2t600 -8" />
        <path d="M-40 650q300 14 620 0t620 6" />
      </g>
    </g>
  </svg>
);

const StudyProps = () => (
  <svg className="room__plane" viewBox={VIEW} preserveAspectRatio="xMidYMax slice">
    <g filter="url(#wc-prop)">
      {/* Desk lamp. */}
      <g transform="translate(70 306)">
        <ellipse cx="56" cy="196" rx="58" ry="14" fill="var(--brass)" />
        <path
          d="M56 192V96l70-48"
          stroke="var(--brass)"
          strokeWidth="11"
          strokeLinecap="round"
          fill="none"
        />
        <path d="M126 48 196 26l26 56-72 22Z" fill="var(--roof)" />
        <path d="M150 104l72-22 6 12-72 22Z" fill="var(--lamp)" />
      </g>

      {/* Stacks of paper, the tallest one going over. */}
      <g transform="translate(310 402)">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <rect
            key={i}
            x={i % 2 ? 4 : 0}
            y={84 - i * 11}
            width="150"
            height="12"
            rx="2"
            fill="var(--paper)"
            stroke="var(--paper-edge)"
            strokeWidth="1"
          />
        ))}
      </g>
      <g transform="translate(500 448) rotate(6)">
        {[0, 1, 2, 3].map((i) => (
          <rect
            key={i}
            x={i * 5}
            y={38 - i * 11}
            width="132"
            height="12"
            rx="2"
            fill="var(--paper)"
            stroke="var(--paper-edge)"
            strokeWidth="1"
          />
        ))}
      </g>

      {/* An open ledger, ruled and half filled. */}
      <g transform="translate(640 486)">
        <path d="M0 26 118 0l116 26-116 30Z" fill="var(--paper)" />
        <path d="M0 26v48l118 30V56Z" fill="var(--paper)" />
        <path d="M234 26v48L118 104V56Z" fill="var(--paper)" />
        <path d="M118 0v104" stroke="var(--paper-edge)" strokeWidth="3" />
        <g stroke="var(--accent)" strokeWidth="2.5" opacity="0.55">
          <path d="M20 38h80M20 52h72M20 66h78M136 38h80M136 52h70" />
        </g>
      </g>

      {/* Plant on the desk — the one green thing in the room. */}
      <g transform="translate(950 440)">
        <g stroke="var(--foliage)" strokeWidth="7" fill="none" strokeLinecap="round">
          <path d="M50 96q-30 -40 -46 -76" />
          <path d="M50 96q4 -46 -2 -86" />
          <path d="M50 96q32 -36 54 -70" />
        </g>
        <g fill="var(--foliage-light)">
          <ellipse cx="4" cy="20" rx="22" ry="13" transform="rotate(-32 4 20)" />
          <ellipse cx="48" cy="10" rx="20" ry="12" transform="rotate(-6 48 10)" />
          <ellipse cx="104" cy="26" rx="22" ry="13" transform="rotate(28 104 26)" />
        </g>
        <path d="M14 96h72l-10 62H24Z" fill="var(--roof)" />
        <path d="M62 96h24l-10 62H52Z" fill="var(--room-shade)" />
      </g>
    </g>
  </svg>
);

/* — Assembly ————————————————————————————————————————————————— */

const ROOMS = {
  workshop: {
    window: 'sash',
    wall: WorkshopWall,
    fittings: WorkshopFittings,
    surface: WorkshopSurface,
    props: WorkshopProps,
    extra: Steam,
  },
  field: {
    window: 'round',
    wall: TreehouseWall,
    fittings: TreehouseFittings,
    hanging: TreehouseLanterns,
    surface: TreehouseFloor,
    props: TreehouseProps,
  },
  code: {
    window: 'tall',
    wall: StudyWall,
    fittings: StudyFittings,
    surface: StudySurface,
    props: StudyProps,
  },
};

export const hasRoom = (section) => Boolean(ROOMS[section]);

/**
 * A room, assembled from the same plane stack the landscape uses so both move
 * under one parallax provider. The window is the light source and the only
 * control in here; everything to the right of it is in its shadow.
 */
const Interior = ({ room, night, onToggleTime }) => {
  const parts = ROOMS[room] ?? ROOMS.workshop;
  const { wall: Wall, fittings: Fittings, surface: Surface, props: Props } = parts;
  const Hanging = parts.hanging;
  const Extra = parts.extra;

  return (
    <div className={`scene room room--${room}`}>
      <Layer depth={0.04} scroll={0.04} className="room__layer">
        <Wall />
      </Layer>

      <Window night={night} onToggleTime={onToggleTime} shape={parts.window} />

      <Layer depth={0.16} scroll={0.06} className="room__layer">
        <Fittings />
      </Layer>

      {Hanging && (
        <Layer depth={0.24} scroll={0.06} className="room__layer">
          <Hanging />
        </Layer>
      )}

      <Layer depth={0.46} scroll={0.1} className="room__layer">
        <Surface />
      </Layer>

      <Layer depth={0.72} scroll={0.12} className="room__layer room__layer--near">
        <Props />
      </Layer>

      {Extra && <Extra />}

      {/* Daylight thrown across the room from the window. */}
      <div className="room__shaft" />
      <Motes
        color={night ? TIME.night.mote : TIME.day.mote}
        night={night}
        count={30}
      />
      <div className="room__vignette" />
      <Grain />
    </div>
  );
};

export default Interior;
