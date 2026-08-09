import React, { createContext, useContext, useMemo } from 'react';
import { useReducedMotion, useTime, useTransform } from 'framer-motion';

/**
 * One wind for the whole painting.
 *
 * Giving every leaf its own loop with its own duration is what makes a hedge
 * look like a screensaver: neighbouring leaves drift out of step and the mass
 * never moves as a mass. Real wind arrives as a front — everything at the same
 * distance bends at the same moment, and things further away lag behind.
 *
 * So there is a single signal here, sampled at four lags. Everything sharing a
 * channel waves in phase; channels differ only by how far behind the gust they
 * are. Amplitude is the caller's business, which is what lets a near branch
 * swing hard while the far tree-line barely stirs — same wind, same timing.
 */

const WindContext = createContext(null);

/** A slow gust envelope over a faster ripple, both wrapped into (-1, 1). */
const gust = (seconds) =>
  Math.sin(seconds * 0.58) * 0.58 +
  Math.sin(seconds * 0.23 + 1.4) * 0.3 +
  Math.sin(seconds * 1.31 + 0.7) * 0.12;

/** How far behind the front each channel sits, in seconds. */
const LAGS = [0, 0.45, 0.95, 1.6];

export const WindProvider = ({ children }) => {
  const time = useTime();
  const reduced = useReducedMotion();

  // Four subscribers to the clock for the entire site, rather than one per leaf.
  const near = useTransform(time, (t) => gust(t / 1000 - LAGS[0]));
  const mid = useTransform(time, (t) => gust(t / 1000 - LAGS[1]));
  const far = useTransform(time, (t) => gust(t / 1000 - LAGS[2]));
  const distant = useTransform(time, (t) => gust(t / 1000 - LAGS[3]));

  const value = useMemo(
    () => ({ channels: [near, mid, far, distant], reduced }),
    [near, mid, far, distant, reduced],
  );

  return <WindContext.Provider value={value}>{children}</WindContext.Provider>;
};

/**
 * A rotation, in degrees, for something rooted at one end: grass, a stem, a
 * hanging lantern. `channel` picks which layer of the wind it belongs to.
 */
export const useSway = (amplitude = 3, channel = 0) => {
  const wind = useContext(WindContext);
  const source = wind.channels[channel % wind.channels.length];
  return useTransform(source, (v) => (wind.reduced ? 0 : v * amplitude));
};

/** The same signal as a translation, for anything that slides rather than pivots. */
export const useDrag = (distance = 4, channel = 0) => {
  const wind = useContext(WindContext);
  const source = wind.channels[channel % wind.channels.length];
  return useTransform(source, (v) => (wind.reduced ? 0 : v * distance));
};

export default WindProvider;
