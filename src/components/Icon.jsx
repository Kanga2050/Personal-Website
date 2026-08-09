import React from 'react';

/**
 * One stroked line-icon set for the whole site. All glyphs are drawn on a
 * 24x24 grid and inherit `currentColor`, so nothing depends on emoji.
 */
const PATHS = {
  // — Chrome ————————————————————————————————————————————————
  map: (
    <>
      <circle cx="12" cy="5" r="2.2" />
      <circle cx="5" cy="18" r="2.2" />
      <circle cx="19" cy="18" r="2.2" />
      <path d="M10.9 6.9 6.1 16.1M13.1 6.9l4.8 9.2M7.2 18h9.6" />
    </>
  ),
  close: <path d="M18 6 6 18M6 6l12 12" />,
  arrowLeft: <path d="M19 12H5M11 18l-6-6 6-6" />,
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8" />
    </>
  ),
  moon: <path d="M20.5 14.8A8.6 8.6 0 0 1 9.2 3.5a8.8 8.8 0 1 0 11.3 11.3Z" />,
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="m3.8 7 8.2 6 8.2-6" />
    </>
  ),

  // — Sections ——————————————————————————————————————————————
  home: (
    <>
      <path d="M3.5 11 12 3.6 20.5 11" />
      <path d="M5.5 9.6V19a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V9.6" />
      <path d="M10 20v-5.5h4V20" />
    </>
  ),
  workshop: (
    <>
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="12" r="8" />
      <path d="M12 1.5V4M12 20v2.5M1.5 12H4M20 12h2.5M4.6 4.6 6.3 6.3M17.7 17.7l1.7 1.7M19.4 4.6l-1.7 1.7M6.3 17.7l-1.7 1.7" />
    </>
  ),
  code: <path d="m8 7-5 5 5 5M16 7l5 5-5 5M13.8 4l-3.6 16" />,
  field: (
    <>
      <path d="M2.5 18.5 8 10.5l4 5.2 3-3.9 6.5 6.7z" />
      <circle cx="17" cy="5.8" r="2.4" />
    </>
  ),
  about: (
    <>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M4.6 20a7.4 7.4 0 0 1 14.8 0" />
    </>
  ),

  // — Projects ——————————————————————————————————————————————
  printer: (
    <>
      <path d="M12 3 4 7.5v9L12 21l8-4.5v-9L12 3Z" />
      <path d="M4 7.5 12 12l8-4.5M12 12v9" />
    </>
  ),
  hydrogen: (
    <>
      <path d="M12 3.2s6 6.3 6 10.1a6 6 0 0 1-12 0C6 9.5 12 3.2 12 3.2Z" />
      <path d="M12.9 9.8 10.3 13.6h3.2l-2.4 3.6" />
    </>
  ),
  drone: (
    <>
      <circle cx="12" cy="12" r="2.5" />
      <path d="M10.2 10.2 6.6 6.6M13.8 10.2l3.6-3.6M10.2 13.8l-3.6 3.6M13.8 13.8l3.6 3.6" />
      <circle cx="5" cy="5" r="2.2" />
      <circle cx="19" cy="5" r="2.2" />
      <circle cx="5" cy="19" r="2.2" />
      <circle cx="19" cy="19" r="2.2" />
    </>
  ),
  cannon: (
    <>
      <path d="M4 10v4a1 1 0 0 0 1 1h2l10 3.6V5.4L7 9H5a1 1 0 0 0-1 1Z" />
      <path d="M20.5 9.2v5.6" />
    </>
  ),
  antenna: (
    <>
      <circle cx="12" cy="10.5" r="1.8" />
      <path d="M9.2 13.3a4 4 0 0 1 0-5.6M14.8 7.7a4 4 0 0 1 0 5.6" />
      <path d="M6.4 16.1a8 8 0 0 1 0-11.2M17.6 4.9a8 8 0 0 1 0 11.2" />
      <path d="M12 12.3V21M9 21h6" />
    </>
  ),
  dataset: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
      <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
    </>
  ),
  trend: (
    <>
      <path d="M3 17.5 8.5 12l3.5 3.5L21 6.5" />
      <path d="M15 6.5h6v6" />
    </>
  ),
  plane: (
    <path d="M12 3c1 0 1.6 1.2 1.6 3v3.3l7.4 4.3v2.2l-7.4-2.2v3.6l2.4 1.7v1.5L12 19.6l-4 .8v-1.5l2.4-1.7v-3.6L3 15.8v-2.2l7.4-4.3V6c0-1.8.6-3 1.6-3Z" />
  ),
  flask: (
    <>
      <path d="M9 3h6M10 3v6.2L4.9 18a2 2 0 0 0 1.7 3h10.8a2 2 0 0 0 1.7-3L14 9.2V3" />
      <path d="M7.6 15h8.8" />
    </>
  ),
  wave: (
    <path d="M2 7.5c2.5-2 5-2 7.5 0s5 2 7.5 0 4.5-2 4.5-2M2 12.5c2.5-2 5-2 7.5 0s5 2 7.5 0 4.5-2 4.5-2M2 17.5c2.5-2 5-2 7.5 0s5 2 7.5 0 4.5-2 4.5-2" />
  ),
  soil: (
    <>
      <path d="M3 15h18M3 19h18" />
      <path d="M12 12V8.4" />
      <path d="M12 9.4c0-2.2 1.6-3.9 3.9-3.9 0 2.3-1.7 3.9-3.9 3.9ZM12 9.4c0-2.2-1.6-3.9-3.9-3.9 0 2.3 1.7 3.9 3.9 3.9Z" />
    </>
  ),
  planet: (
    <>
      <circle cx="12" cy="12" r="6.4" />
      <ellipse
        cx="12"
        cy="12"
        rx="11"
        ry="3.4"
        transform="rotate(-22 12 12)"
      />
    </>
  ),

  // — Media placeholders ————————————————————————————————————
  photo: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <circle cx="8.6" cy="10" r="1.7" />
      <path d="m4 17.4 4.9-4.4 3.9 3.4 3-2.5 4.2 3.5" />
    </>
  ),
  video: (
    <>
      <rect x="3" y="6" width="12.5" height="12" rx="2.5" />
      <path d="m16 11 5-3v8l-5-3z" />
    </>
  ),
  animation: (
    <>
      <path d="M20.5 12a8.5 8.5 0 1 1-2.9-6.4" />
      <path d="M21 3.5v5h-5" />
      <circle cx="12" cy="12" r="2.6" />
    </>
  ),
};

const Icon = ({ name, size = 20, strokeWidth = 1.6, ...rest }) => {
  const glyph = PATHS[name];
  if (!glyph) return null;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {glyph}
    </svg>
  );
};

export default Icon;
