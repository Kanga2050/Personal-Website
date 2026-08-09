import React from 'react';

/**
 * Watercolour, as SVG filters.
 *
 * Three things separate a watercolour wash from a flat vector fill, and each
 * one is a stage in these filters:
 *
 *   bleed        the edge is never the path you drew — water carries pigment
 *                past it in an irregular wobble. `feTurbulence` +
 *                `feDisplacementMap` pushes the outline around by a few units.
 *   granulation  pigment settles into the tooth of the paper, so a "flat" area
 *                is finely mottled. A second, high-frequency turbulence is
 *                multiplied back into the shape.
 *   pooling      water pushes pigment to the edge of a wet area, where it dries
 *                darker than the middle. `feMorphology` erodes a copy of the
 *                shape and the difference is flooded with a darker tone.
 *
 * All of them are applied to *static* geometry — parallax and sway move the
 * wrapper's transform, never the filtered content — so each filter rasterises
 * once and is then just a cached bitmap being moved around.
 *
 * Every mark on this site is drawn from these paths and filters. Nothing is
 * traced, photographed or generated; there is no third-party asset to license.
 */

/** Bleed + granulation, sized for the big landscape bands. */
const Bleed = ({ id, seed, freq, scale, octaves = 3, grain = 0.16 }) => (
  <filter
    id={id}
    x="-12%"
    y="-30%"
    width="124%"
    height="160%"
    colorInterpolationFilters="sRGB"
  >
    <feTurbulence
      type="fractalNoise"
      baseFrequency={freq}
      numOctaves={octaves}
      seed={seed}
      result="warp"
    />
    <feDisplacementMap
      in="SourceGraphic"
      in2="warp"
      scale={scale}
      xChannelSelector="R"
      yChannelSelector="G"
      result="shape"
    />

    {/* Paper tooth: grey noise, flattened to a narrow range so it darkens the
        wash slightly and unevenly instead of turning it to static. */}
    <feTurbulence
      type="fractalNoise"
      baseFrequency="0.72"
      numOctaves="2"
      seed={seed + 11}
      result="tooth"
    />
    <feColorMatrix in="tooth" type="saturate" values="0" result="grey" />
    <feComponentTransfer in="grey" result="soft">
      <feFuncR type="linear" slope={grain} intercept={1 - grain} />
      <feFuncG type="linear" slope={grain} intercept={1 - grain} />
      <feFuncB type="linear" slope={grain} intercept={1 - grain} />
      <feFuncA type="linear" slope="0" intercept="1" />
    </feComponentTransfer>
    <feBlend in="shape" in2="soft" mode="multiply" result="grained" />
    <feComposite in="grained" in2="shape" operator="in" />
  </filter>
);

/** Bleed, granulation, and a darker rim where the wash dried. */
const Pooled = ({ id, seed, freq, scale, radius, depth }) => (
  <filter
    id={id}
    x="-14%"
    y="-14%"
    width="128%"
    height="128%"
    colorInterpolationFilters="sRGB"
  >
    <feTurbulence
      type="fractalNoise"
      baseFrequency={freq}
      numOctaves="3"
      seed={seed}
      result="warp"
    />
    <feDisplacementMap
      in="SourceGraphic"
      in2="warp"
      scale={scale}
      xChannelSelector="R"
      yChannelSelector="G"
      result="shape"
    />

    <feMorphology in="shape" operator="erode" radius={radius} result="core" />
    <feComposite in="shape" in2="core" operator="out" result="edge" />
    <feFlood floodColor="#2a1c0c" floodOpacity={depth} result="pigment" />
    <feComposite in="pigment" in2="edge" operator="in" result="rim" />
    <feGaussianBlur in="rim" stdDeviation={radius * 0.4} result="softRim" />

    <feMerge>
      <feMergeNode in="shape" />
      <feMergeNode in="softRim" />
    </feMerge>
  </filter>
);

/**
 * Mounted once, at the root. SVG filters are document-global, so every scene
 * and every room references these by id rather than carrying its own copy.
 */
export const PaintDefs = () => (
  <svg className="paint-defs" aria-hidden="true" focusable="false">
    <defs>
      {/* Landscape bands: stretched to the full width, so the frequency is
          deliberately anisotropic — long horizontal ripples, not a fuzz. */}
      <Bleed id="wc-band" seed={3} freq="0.008 0.03" scale={9} />
      <Bleed id="wc-band-far" seed={17} freq="0.006 0.024" scale={5} grain={0.1} />

      {/* Room walls and work surfaces: broad flat areas, so what they need is
          the tooth rather than a frayed outline. */}
      <Bleed id="wc-room" seed={73} freq="0.014" scale={3} grain={0.18} />

      {/* Cumulus: soft, generous, and blurred slightly at the shoulders. */}
      <Bleed id="wc-cloud" seed={41} freq="0.028" scale={5} grain={0.08} />

      {/* Props — landmarks, tools, jars. Small enough to afford the rim. */}
      <Pooled id="wc-prop" seed={9} freq="0.05" scale={1.6} radius={0.7} depth={0.2} />

      {/* Foliage: a finer wobble, since leaves are small and a big scale eats
          them rather than fraying them. */}
      <Bleed id="wc-leaf" seed={57} freq="0.06" scale={1.8} grain={0.12} />

      {/* Variegation. Two stops of one colour at different alpha give a
          soft-edged patch without paying for another blur. The custom
          properties live on <html>, so they inherit down here even though the
          shapes that reference these gradients are somewhere else entirely. */}
      <radialGradient id="wc-lit">
        <stop offset="0%" stopColor="var(--rim)" stopOpacity="0.16" />
        <stop offset="58%" stopColor="var(--rim)" stopOpacity="0.06" />
        <stop offset="100%" stopColor="var(--rim)" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="wc-shade">
        <stop offset="0%" stopColor="var(--pool)" stopOpacity="0.24" />
        <stop offset="60%" stopColor="var(--pool)" stopOpacity="0.09" />
        <stop offset="100%" stopColor="var(--pool)" stopOpacity="0" />
      </radialGradient>
    </defs>
  </svg>
);

/**
 * Paper. A multiply-blended noise sheet over the whole page, plus the cold-
 * press vignette a wash leaves at the edge of a sheet. This is what stops the
 * flat regions between the painted elements — the sky, the sheets of text —
 * from reading as screen colour.
 */
export const Grain = () => (
  <>
    <div className="grain" aria-hidden="true" />
    <div className="grain__edge" aria-hidden="true" />
  </>
);

export default PaintDefs;
