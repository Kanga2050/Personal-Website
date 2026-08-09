import React, { useEffect, useRef } from 'react';
import { withAlpha } from '../theme/themes';

/**
 * Ambient drifting particles on a single canvas.
 *
 * Deliberately not React state: the previous implementation re-rendered a few
 * hundred DOM nodes on a setInterval, which is what made every page feel
 * sluggish. One requestAnimationFrame loop writing to one canvas costs
 * essentially nothing and lets the motion actually be smooth.
 */
const Starfield = ({ accent = '#ffffff', count = 70, speed = 0.06 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    // Missing in non-browser test environments.
    const ctx = canvas.getContext?.('2d');
    if (!ctx) return undefined;

    let width = 0;
    let height = 0;
    let particles = [];
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
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.6 + Math.random() * 1.6,
        // Depth drives both size and speed, which reads as parallax.
        depth: 0.35 + Math.random() * 0.65,
        drift: (Math.random() - 0.5) * 0.35,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const draw = (time) => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.y -= speed * p.depth * 16;
        p.x += p.drift * p.depth;

        if (p.y < -4) {
          p.y = height + 4;
          p.x = Math.random() * width;
        }
        if (p.x < -4) p.x = width + 4;
        if (p.x > width + 4) p.x = -4;

        const twinkle = 0.45 + 0.4 * Math.sin(time * 0.0012 + p.phase);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * p.depth, 0, Math.PI * 2);
        ctx.fillStyle = withAlpha(accent, twinkle * p.depth * 0.55);
        ctx.fill();
      }

      frame = requestAnimationFrame(draw);
    };

    resize();
    seed();
    frame = requestAnimationFrame(draw);

    const handleResize = () => {
      resize();
      seed();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', handleResize);
    };
  }, [accent, count, speed]);

  return <canvas ref={canvasRef} className="page__field" aria-hidden="true" />;
};

export default React.memo(Starfield);
