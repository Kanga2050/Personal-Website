import React from 'react';

/**
 * One stroked line-icon set for the whole site, so nothing relies on emoji
 * (which render differently on every platform and never match the type).
 * All glyphs are drawn on a 24x24 grid and inherit `currentColor`.
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
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8" />
    </>
  ),
  moon: <path d="M20.5 14.8A8.6 8.6 0 0 1 9.2 3.5a8.8 8.8 0 1 0 11.3 11.3Z" />,
  arrowLeft: <path d="M19 12H5M11 18l-6-6 6-6" />,
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  close: <path d="M18 6 6 18M6 6l12 12" />,
  cornerUpLeft: <path d="M9 14 4 9l5-5M4 9h10a6 6 0 0 1 6 6v5" />,

  // — Sections ——————————————————————————————————————————————
  engineering: (
    <>
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="12" r="8" />
      <path d="M12 1.5V4M12 20v2.5M1.5 12H4M20 12h2.5M4.6 4.6 6.3 6.3M17.7 17.7l1.7 1.7M19.4 4.6l-1.7 1.7M6.3 17.7l-1.7 1.7" />
    </>
  ),
  memories: (
    <>
      <path d="M5 16.5 9.5 9l4 4.5L19 6" />
      <circle cx="5" cy="16.5" r="1.5" />
      <circle cx="9.5" cy="9" r="1.5" />
      <circle cx="13.5" cy="13.5" r="1.5" />
      <circle cx="19" cy="6" r="1.5" />
    </>
  ),
  projects: (
    <>
      <rect x="3" y="3" width="7.5" height="7.5" rx="1.8" />
      <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.8" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.8" />
      <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.8" />
    </>
  ),

  // — Engineering domains ————————————————————————————————————
  mechanical: (
    <>
      <circle cx="12" cy="6" r="2" />
      <path d="M10.8 7.7 6 20M13.2 7.7 18 20M8.7 15h6.6" />
    </>
  ),
  electronics: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4" />
    </>
  ),
  software: <path d="m8 7-5 5 5 5M16 7l5 5-5 5M13.8 4l-3.6 16" />,

  // — Project glyphs ————————————————————————————————————————
  printer: (
    <>
      <path d="M12 3 4 7.5v9L12 21l8-4.5v-9L12 3Z" />
      <path d="M4 7.5 12 12l8-4.5M12 12v9" />
    </>
  ),
  probe: (
    <>
      <path d="M12 3a3 3 0 0 1 3 3v8a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3Z" />
      <path d="M6.5 9.5a7 7 0 0 0 0 5M4 8a10 10 0 0 0 0 8M17.5 9.5a7 7 0 0 1 0 5M20 8a10 10 0 0 1 0 8" />
    </>
  ),
  microscope: (
    <>
      <path d="M4 21h16" />
      <path d="M8 21v-3h8v3" />
      <path d="M11.5 16A5.5 5.5 0 0 1 10 6.4" />
      <path d="m13.5 3.5 5 5-4.5 4.5-5-5 4.5-4.5Z" />
    </>
  ),
  submarine: (
    <>
      <path d="M20 13c0 2.2-3.6 4-8 4s-8-1.8-8-4 3.6-4 8-4 8 1.8 8 4Z" />
      <path d="M10.8 9.2V6.5h3v2.7M20 13h2M22 10.5v5" />
      <circle cx="9" cy="13" r="1" />
      <circle cx="14" cy="13" r="1" />
    </>
  ),
  lab: (
    <>
      <path d="M9 3h6M10 3v6.2L4.9 18a2 2 0 0 0 1.7 3h10.8a2 2 0 0 0 1.7-3L14 9.2V3" />
      <path d="M7.6 15h8.8" />
    </>
  ),

  // — Lab experiments ———————————————————————————————————————
  weather: (
    <>
      <path d="M17.5 17.5H7a4.5 4.5 0 0 1-.8-8.9A6 6 0 0 1 18 9.8a4 4 0 0 1-.5 7.7Z" />
      <path d="M9 20v1.5M13 19.8v2M17 20v1.5" />
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
  garden: (
    <>
      <path d="M4 20c0-8 6-14 16-14 0 10-6 14-13 14H4Z" />
      <path d="M4 20c4-5 8-8 13-10" />
    </>
  ),
  hologram: (
    <>
      <path d="m12 3.5 6 3.5v7l-6 3.5-6-3.5v-7l6-3.5Z" />
      <path d="m6 7 6 3.5L18 7M12 10.5v7" />
      <path d="M4 21h16M8.5 21l1.2-1.8M15.5 21l-1.2-1.8" />
    </>
  ),
  music: <path d="M4 14.5v-5M8 18.5v-13M12 21V3M16 18.5v-13M20 14.5v-5" />,
  magnet: (
    <>
      <path d="M6 4h5v8a1 1 0 0 0 2 0V4h5v8a6 6 0 0 1-12 0V4Z" />
      <path d="M6 9h5M13 9h5" />
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
