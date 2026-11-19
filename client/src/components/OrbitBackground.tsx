import React, { useEffect, useRef } from 'react';

const GOLD = '230, 181, 74';
const PALE = '255, 223, 120';
const STEEL = '148, 163, 184';
const TAU = Math.PI * 2;

interface Ring {
  /** Radius as a fraction of half the longer viewport side. */
  r: number;
  /** Rotation speed in radians per second; the sign sets the direction. */
  speed: number;
  color: string;
  alpha: number;
  width: number;
  dash?: [number, number];
  /** A glowing dot that orbits on the ring. */
  satellite?: boolean;
  /** A bright arc with a fading tail that leads the satellite. */
  comet?: boolean;
}

const RINGS: Ring[] = [
  { r: 0.14, speed: 0.16, color: GOLD, alpha: 0.34, width: 1.2, dash: [3, 12], satellite: true },
  { r: 0.25, speed: -0.1, color: STEEL, alpha: 0.18, width: 1, comet: true },
  { r: 0.38, speed: 0.07, color: GOLD, alpha: 0.26, width: 1, dash: [60, 28], satellite: true },
  { r: 0.53, speed: -0.055, color: PALE, alpha: 0.15, width: 1, comet: true },
  { r: 0.7, speed: 0.04, color: GOLD, alpha: 0.22, width: 1.4, dash: [2, 18] },
  { r: 0.9, speed: -0.03, color: STEEL, alpha: 0.14, width: 1, dash: [120, 60], satellite: true },
];

/**
 * Full-page background: concentric rings that rotate in alternating directions around the
 * centre of the screen, with orbiting satellites and slow outward ripples. The whole system
 * zooms out and turns a little further as the page is scrolled.
 *
 * Drawn on one viewport-sized canvas so it stays cheap, and frozen for visitors who ask
 * their system for reduced motion.
 */
export const OrbitBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let maxScroll = 0;
    let progress = 0; // eased scroll position, 0 at the top of the page and 1 at the bottom
    let lastDraw = 0;
    let raf = 0;

    const draw = (seconds: number) => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const base = Math.max(width, height) / 2;
      const zoom = 1.6 - progress; // zoom out while scrolling down: 160% at the top, 60% at the bottom
      const scrollTurn = progress * 2.6;

      // Soft warm glow at the core
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, base * 0.5 * zoom);
      glow.addColorStop(0, `rgba(${GOLD}, 0.07)`);
      glow.addColorStop(1, `rgba(${GOLD}, 0)`);
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      // Ripples travelling outward from the centre
      if (!reduceMotion) {
        for (let k = 0; k < 3; k++) {
          const phase = (seconds / 10 + k / 3) % 1;
          const alpha = Math.min(1, phase * 6) * (1 - phase) ** 2 * 0.3;
          ctx.beginPath();
          ctx.arc(cx, cy, (0.05 + 0.95 * phase) * base * zoom, 0, TAU);
          ctx.strokeStyle = `rgba(${PALE}, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      RINGS.forEach((ring, i) => {
        const radius = ring.r * base * zoom;
        const dir = Math.sign(ring.speed);

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(seconds * ring.speed + scrollTurn * dir + i * 1.3);

        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, TAU);
        ctx.setLineDash(ring.dash ?? []);
        ctx.strokeStyle = `rgba(${ring.color}, ${ring.alpha})`;
        ctx.lineWidth = ring.width;
        ctx.stroke();
        ctx.setLineDash([]);

        if (ring.comet) {
          // Tail trails behind the direction of travel and brightens toward the head
          const span = 0.9;
          const steps = 14;
          ctx.save();
          ctx.scale(1, dir);
          ctx.lineWidth = 1.6;
          ctx.lineCap = 'round';
          for (let s = 0; s < steps; s++) {
            ctx.beginPath();
            ctx.arc(0, 0, radius, -span + (span * s) / steps, -span + (span * (s + 1)) / steps + 0.01);
            ctx.strokeStyle = `rgba(${PALE}, ${((s + 1) / steps) ** 2 * 0.6})`;
            ctx.stroke();
          }
          ctx.restore();
        }

        if (ring.satellite || ring.comet) {
          ctx.beginPath();
          ctx.arc(radius, 0, ring.comet ? 2.6 : 2.2, 0, TAU);
          ctx.fillStyle = 'rgba(255, 240, 190, 0.95)';
          ctx.shadowColor = `rgba(${GOLD}, 0.95)`;
          ctx.shadowBlur = 14;
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        ctx.restore();
      });
    };

    const measure = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      // Resizing clears the canvas, so repaint straight away
      draw(performance.now() / 1000);
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const target = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
      const settling = Math.abs(target - progress) > 0.0004;
      // Idle rotation runs at ~30fps; while the page is scrolling every frame is drawn
      if (!settling && now - lastDraw < 32) return;
      progress += (target - progress) * 0.1;
      lastDraw = now;
      draw(now / 1000);
    };

    measure();
    window.addEventListener('resize', measure);

    // The page height changes as content loads, which changes how far "the bottom" is
    const pageObserver = new ResizeObserver(() => {
      maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    });
    pageObserver.observe(document.body);

    if (!reduceMotion) raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', measure);
      pageObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 h-full w-full pointer-events-none"
    />
  );
};
