import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Icon from './Icon';
import { nodes } from '../data/site';
import { accentFor } from '../theme/palette';

const CX = 180;
const CY = 120;
const ORBIT = 72;

const SPRING = { type: 'spring', stiffness: 220, damping: 26 };

/**
 * The map. Current node at the centre, everything reachable from it in orbit.
 * Every node is a single tap that travels there — a section simply brings its
 * own level with it, so there is no separate gesture for going in or out.
 */
const NavigationMenu = ({ level, currentNode, isNight, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState(null);

  const adjacent = (level.edges[currentNode] ?? []).filter((id) => nodes[id]);
  const visible = [currentNode, ...adjacent];

  const positionOf = (id, index) => {
    if (id === currentNode) return { x: CX, y: CY };
    const count = visible.length - 1;
    const angle = ((index - 1) / count) * Math.PI * 2 - Math.PI / 2;
    return {
      x: CX + Math.cos(angle) * ORBIT,
      y: CY + Math.sin(angle) * ORBIT,
    };
  };

  return (
    <>
      <button
        type="button"
        className="nav__toggle"
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close the map' : 'Open the map'}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isOpen ? 'close' : 'map'}
            style={{ display: 'grid' }}
            initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <Icon name={isOpen ? 'close' : 'map'} />
          </motion.span>
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className="nav__panel"
            aria-label="Site map"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <svg className="nav__svg" viewBox="0 0 360 240" role="presentation">
              {visible.slice(1).map((id, i) => {
                const pos = positionOf(id, i + 1);
                return (
                  <motion.line
                    key={`edge-${id}`}
                    x1={CX}
                    y1={CY}
                    x2={pos.x}
                    y2={pos.y}
                    stroke="var(--paper-edge)"
                    strokeWidth={1.5}
                    initial={{ x2: CX, y2: CY, opacity: 0 }}
                    animate={{ x2: pos.x, y2: pos.y, opacity: 1 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  />
                );
              })}

              {visible.map((id, index) => {
                const node = nodes[id];
                const pos = positionOf(id, index);
                const isCurrent = id === currentNode;
                const r = isCurrent ? 20 : 15;
                const accent = accentFor(node.section, isNight);
                const opensLevel = Boolean(node.items?.length);

                return (
                  <g key={id}>
                    <motion.circle
                      cx={pos.x}
                      cy={pos.y}
                      r={r}
                      fill={accent}
                      stroke={isCurrent ? 'var(--ink)' : 'var(--paper-edge)'}
                      strokeWidth={isCurrent ? 2.5 : 1.5}
                      style={{ cursor: isCurrent ? 'default' : 'pointer' }}
                      onClick={() => !isCurrent && onNavigate(id)}
                      onMouseEnter={() => setHovered(id)}
                      onMouseLeave={() => setHovered(null)}
                      initial={{ cx: pos.x, cy: pos.y, r, scale: 0 }}
                      animate={{ cx: pos.x, cy: pos.y, r, scale: 1 }}
                      transition={{
                        scale: { delay: index * 0.05, ...SPRING },
                        cx: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                        cy: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                        r: { duration: 0.3 },
                      }}
                    />

                    <motion.text
                      x={pos.x}
                      y={pos.y + r + 15}
                      className={
                        isCurrent
                          ? 'nav__label nav__label--current'
                          : 'nav__label'
                      }
                      initial={{ attrX: pos.x, attrY: pos.y + r + 15 }}
                      animate={{ attrX: pos.x, attrY: pos.y + r + 15 }}
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {node.short}
                    </motion.text>

                    {/* Three dots mean this node carries a level of its own. */}
                    {opensLevel &&
                      [0, 1, 2].map((dot) => {
                        const angle = (dot * 2 * Math.PI) / 3 - Math.PI / 2;
                        const dx = pos.x + Math.cos(angle) * (r + 8);
                        const dy = pos.y + Math.sin(angle) * (r + 8);
                        return (
                          <motion.circle
                            key={dot}
                            cx={dx}
                            cy={dy}
                            r={2}
                            fill={accent}
                            style={{ pointerEvents: 'none' }}
                            initial={{ cx: dx, cy: dy, scale: 0 }}
                            animate={{ cx: dx, cy: dy, scale: 1 }}
                            transition={{
                              scale: { delay: index * 0.05 + 0.2 + dot * 0.06 },
                              cx: { duration: 0.55 },
                              cy: { duration: 0.55 },
                            }}
                          />
                        );
                      })}

                    {hovered === id && !isCurrent && (
                      <motion.circle
                        cx={pos.x}
                        cy={pos.y}
                        r={r}
                        fill="none"
                        stroke={accent}
                        strokeWidth={2.5}
                        style={{ pointerEvents: 'none' }}
                        initial={{
                          cx: pos.x,
                          cy: pos.y,
                          r,
                          scale: 1,
                          opacity: 0,
                        }}
                        animate={{
                          cx: pos.x,
                          cy: pos.y,
                          r,
                          scale: 1.35,
                          opacity: 0.85,
                        }}
                        transition={{ duration: 0.25 }}
                      />
                    )}

                    {isCurrent && (
                      <motion.circle
                        cx={pos.x}
                        cy={pos.y}
                        r={r}
                        fill="none"
                        stroke={accent}
                        strokeWidth={2}
                        style={{ pointerEvents: 'none' }}
                        initial={{ cx: pos.x, cy: pos.y, r, opacity: 0.35 }}
                        animate={{
                          cx: pos.x,
                          cy: pos.y,
                          r: [r, r + 10, r],
                          opacity: [0.35, 0, 0.35],
                        }}
                        transition={{
                          r: { duration: 2.4, repeat: Infinity },
                          opacity: { duration: 2.4, repeat: Infinity },
                        }}
                      />
                    )}
                  </g>
                );
              })}
            </svg>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavigationMenu;
