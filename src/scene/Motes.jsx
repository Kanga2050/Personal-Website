import React, { useEffect, useRef } from 'react';

/** Pre-render one soft dot; drawing 50 gradients per frame is not free. */
const makeSprite = (color, size) => {
  const sprite = document.createElement('canvas');
  sprite.width = size;
  sprite.height = size;
  const ctx = sprite.getContext('2d');
  const half = size / 2;
  const glow = ctx.createRadialGradient(half, half, 0, half, half, half);
  glow.addColorStop(0, color);
  glow.addColorStop(0.35, color);
  glow.addColorStop(1, 'transparent');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, size, size);
  return sprite;
};

/**
 * Pollen by day, fireflies by night — one canvas, one rAF loop, off the React
 * render path entirely.
 */
const Motes = ({ color = '#fff3c8', night = false, count = 46 }) => {
  const canvasRef = useRef(null);
  const nightRef = useRef(night);
  nightRef.current = night;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const ctx = canvas.getContext?.('2d');
    if (!ctx) return undefined;

    const sprite = makeSprite(color, 64);
    let width = 0;
    let height = 0;
    let motes = [];
    let frame;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      motes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 6 + Math.random() * 10,
        depth: 0.4 + Math.random() * 0.6,
        sway: 0.4 + Math.random() * 1.2,
        phase: Math.random() * Math.PI * 2,
        rise: 0.12 + Math.random() * 0.4,
      }));
    };

    const draw = (time) => {
      ctx.clearRect(0, 0, width, height);
      const isNight = nightRef.current;

      for (const m of motes) {
        m.y -= m.rise * m.depth * (isNight ? 0.5 : 0.95);
        m.x += Math.sin(time * 0.0004 + m.phase) * m.sway * m.depth * 0.5;

        if (m.y < -20) {
          m.y = height + 20;
          m.x = Math.random() * width;
        }
        if (m.x < -20) m.x = width + 20;
        if (m.x > width + 20) m.x = -20;

        // Fireflies blink; pollen just breathes.
        const pulse = isNight
          ? 0.08 + 0.92 * Math.max(0, Math.sin(time * 0.0015 + m.phase)) ** 3
          : 0.3 + 0.3 * Math.sin(time * 0.0009 + m.phase);

        const s = m.size * m.depth * (isNight ? 1.8 : 1);
        ctx.globalAlpha = pulse * (isNight ? 0.9 : 0.42);
        ctx.drawImage(sprite, m.x - s / 2, m.y - s / 2, s, s);
      }

      ctx.globalAlpha = 1;
      frame = requestAnimationFrame(draw);
    };

    resize();
    seed();
    frame = requestAnimationFrame(draw);

    const onResize = () => {
      resize();
      seed();
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', onResize);
    };
  }, [color, count]);

  return <canvas ref={canvasRef} className="scene__motes" aria-hidden="true" />;
};

export default React.memo(Motes);
