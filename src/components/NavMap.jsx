import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './Icon';
import { nodes } from '../data/site';
import { getTheme, withAlpha } from '../theme/themes';
import { EASE, DURATION } from '../motion';

const CX = 160;
const CY = 100;
const R_CURRENT = 18;
const R_ADJACENT = 13;

/** Pull the orbit in when there are few neighbours, so it never looks sparse. */
const orbitFor = (count) => (count >= 3 ? 74 : count === 2 ? 62 : 52);

const accentOf = (id) => getTheme(nodes[id]?.theme).accent;

/**
 * The site map: the current node at the centre, everything reachable from it
 * in orbit. Clicking a neighbour moves there; clicking the centre when it has
 * a level below it descends into that level.
 */
const NavMap = ({
  level,
  currentNode,
  path,
  onNavigate,
  onEnter,
  onExit,
  showTimeToggle,
  isNight,
  onToggleTime,
}) => {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(null);

  const visible = useMemo(() => {
    const adjacent = (level.edges[currentNode] ?? []).filter((id) => nodes[id]);
    return [currentNode, ...adjacent];
  }, [level, currentNode]);

  const orbit = orbitFor(visible.length - 1);

  const positions = useMemo(() => {
    const map = { [currentNode]: { x: CX, y: CY } };
    const orbiting = visible.slice(1);
    orbiting.forEach((id, i) => {
      const angle = (i / orbiting.length) * Math.PI * 2 - Math.PI / 2;
      map[id] = {
        x: CX + Math.cos(angle) * orbit,
        y: CY + Math.sin(angle) * orbit,
      };
    });
    return map;
  }, [visible, currentNode, orbit]);

  const centreHasChildren = Boolean(level.children?.[currentNode]);
  const insideLevel = path.length > 0;

  const crumbs = ['Universe', ...path.map((id) => nodes[id]?.short ?? id)];

  const handleNodeClick = (id) => {
    if (id !== currentNode) {
      onNavigate(id);
      return;
    }
    if (centreHasChildren) onEnter(id);
  };

  const hint = centreHasChildren
    ? `Open ${nodes[currentNode]?.short ?? ''}`
    : insideLevel
      ? 'Select a neighbour, or step out'
      : 'Select a destination';

  return (
    <>
      <div className="chrome">
        {showTimeToggle && (
          <button
            type="button"
            className="chrome__btn"
            onClick={onToggleTime}
            aria-label={isNight ? 'Switch to day' : 'Switch to night'}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isNight ? 'moon' : 'sun'}
                style={{ display: 'grid' }}
                initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                transition={{ duration: DURATION.base, ease: EASE }}
              >
                <Icon name={isNight ? 'moon' : 'sun'} />
              </motion.span>
            </AnimatePresence>
          </button>
        )}

        <button
          type="button"
          className="chrome__btn"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? 'Close site map' : 'Open site map'}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? 'close' : 'map'}
              style={{ display: 'grid' }}
              initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
              transition={{ duration: DURATION.base, ease: EASE }}
            >
              <Icon name={open ? 'close' : 'map'} />
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="map"
            aria-label="Site map"
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: DURATION.base, ease: EASE }}
          >
            <div className="map__head">
              <div className="map__crumbs">
                {crumbs.map((crumb, i) => (
                  <React.Fragment key={crumb}>
                    {i > 0 && <span aria-hidden="true">/</span>}
                    <span
                      className={
                        i === crumbs.length - 1
                          ? 'map__crumb map__crumb--current'
                          : 'map__crumb'
                      }
                    >
                      {crumb}
                    </span>
                  </React.Fragment>
                ))}
              </div>

              {insideLevel && (
                <button type="button" className="map__up" onClick={onExit}>
                  <Icon name="cornerUpLeft" size={13} />
                  Up
                </button>
              )}
            </div>

            <svg
              className="map__svg"
              viewBox="0 0 320 210"
              role="presentation"
            >
              {/* Boundary of the level we have descended into. */}
              {insideLevel && (
                <motion.circle
                  cx={CX}
                  cy={CY}
                  r={orbit + 26}
                  fill={withAlpha(accentOf(currentNode), 0.04)}
                  stroke={withAlpha(accentOf(currentNode), 0.28)}
                  strokeWidth={1}
                  strokeDasharray="4 6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: DURATION.slow, ease: EASE }}
                />
              )}

              {visible.slice(1).map((id) => (
                <motion.line
                  key={`edge-${id}`}
                  x1={CX}
                  y1={CY}
                  x2={positions[id].x}
                  y2={positions[id].y}
                  stroke={withAlpha(accentOf(id), hovered === id ? 0.6 : 0.25)}
                  strokeWidth={1.5}
                  initial={{ x2: CX, y2: CY, opacity: 0 }}
                  animate={{
                    x2: positions[id].x,
                    y2: positions[id].y,
                    opacity: 1,
                  }}
                  transition={{ duration: DURATION.slow, ease: EASE }}
                />
              ))}

              {visible.map((id) => {
                const node = nodes[id];
                const pos = positions[id];
                const isCurrent = id === currentNode;
                const r = isCurrent ? R_CURRENT : R_ADJACENT;
                const accent = accentOf(id);
                const hasChildren = Boolean(level.children?.[id]);

                return (
                  <motion.g
                    key={id}
                    className="map__node"
                    onClick={() => handleNodeClick(id)}
                    onMouseEnter={() => setHovered(id)}
                    onMouseLeave={() => setHovered(null)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: DURATION.base, ease: EASE }}
                  >
                    {/* Halo: steady on the current node, on hover elsewhere. */}
                    <motion.circle
                      cx={pos.x}
                      cy={pos.y}
                      r={r + 6}
                      fill="none"
                      stroke={accent}
                      strokeWidth={1.5}
                      initial={{ cx: pos.x, cy: pos.y, r: r + 6, opacity: 0 }}
                      animate={{
                        cx: pos.x,
                        cy: pos.y,
                        r: r + (hovered === id ? 9 : 6),
                        opacity: isCurrent || hovered === id ? 0.45 : 0,
                      }}
                      transition={{ duration: DURATION.base, ease: EASE }}
                    />

                    <motion.circle
                      cx={pos.x}
                      cy={pos.y}
                      r={r}
                      fill={withAlpha(accent, isCurrent ? 0.9 : 0.55)}
                      stroke={accent}
                      strokeWidth={isCurrent ? 2 : 1.5}
                      initial={{ cx: pos.x, cy: pos.y, r }}
                      animate={{ cx: pos.x, cy: pos.y, r }}
                      transition={{ duration: DURATION.slow, ease: EASE }}
                    />

                    {/* A node holding a level below it gets an open ring. */}
                    {hasChildren && (
                      <motion.circle
                        cx={pos.x}
                        cy={pos.y}
                        r={r + 5}
                        fill="none"
                        stroke={accent}
                        strokeWidth={1}
                        strokeDasharray="3 4"
                        strokeOpacity={0.7}
                        initial={{ cx: pos.x, cy: pos.y, r: r + 5 }}
                        animate={{ cx: pos.x, cy: pos.y, r: r + 5 }}
                        transition={{ duration: DURATION.slow, ease: EASE }}
                      />
                    )}

                    {/* attrX/attrY, not x/y: framer maps x/y to transforms,
                        which would offset the text from its own coordinates. */}
                    <motion.text
                      x={pos.x}
                      y={pos.y + r + 15}
                      className={
                        isCurrent ? 'map__label map__label--current' : 'map__label'
                      }
                      initial={{ attrX: pos.x, attrY: pos.y + r + 15 }}
                      animate={{ attrX: pos.x, attrY: pos.y + r + 15 }}
                      transition={{ duration: DURATION.slow, ease: EASE }}
                    >
                      {node?.short ?? id}
                    </motion.text>
                  </motion.g>
                );
              })}
            </svg>

            <p className="map__hint">{hint}</p>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavMap;
