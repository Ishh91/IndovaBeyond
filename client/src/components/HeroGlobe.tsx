import React, { useEffect, useRef } from 'react';

// Crop of the hexagonal monogram inside /assets/logo.jpg (1024x1024 source)
const LOGO_CROP = { sx: 235, sy: 70, sw: 540, sh: 585 };

interface SurfacePoint {
  x: number;
  y: number;
  z: number;
  city: boolean;
  size: number;
}

// Pseudo-continents: a smooth noise field on the unit sphere decides where "land" is
const isLand = (x: number, y: number, z: number) => {
  const n =
    Math.sin(3.1 * x + 1.3) * Math.cos(2.7 * y - 0.4) +
    0.7 * Math.sin(4.3 * z + 2.1) * Math.cos(3.7 * x) +
    0.5 * Math.sin(5.9 * y + 2.3 * z);
  return n > 0.28;
};

const buildSurface = (): SurfacePoint[] => {
  const total = 5200;
  const points: SurfacePoint[] = [];
  // Deterministic pseudo-random so the globe looks the same on every load
  let seed = 7;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  for (let i = 0; i < total; i++) {
    const phi = Math.acos(1 - (2 * (i + 0.5)) / total);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const x = Math.sin(phi) * Math.cos(theta);
    const y = Math.cos(phi);
    const z = Math.sin(phi) * Math.sin(theta);
    if (!isLand(x, y, z)) continue;
    points.push({ x, y, z, city: rand() < 0.2, size: 0.8 + rand() * 1.1 });
  }
  return points;
};

export const HeroGlobe: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = 0;
    let width = 0;
    let height = 0;

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Mouse tilt interaction
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetRotY = ((e.clientX - rect.left - width / 2) / width) * 0.4;
      targetRotX = -((e.clientY - rect.top - height / 2) / height) * 0.3;
    };
    const handleMouseLeave = () => {
      targetRotX = 0;
      targetRotY = 0;
    };
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const surface = buildSurface();

    // Prepare the monogram once: crop it, crush the near-black backdrop to true black and
    // fade the edges, so no rectangular patch shows when it is blended onto the globe
    let emblem: HTMLCanvasElement | null = null;
    const logo = new Image();
    logo.onload = () => {
      const { sx, sy, sw, sh } = LOGO_CROP;
      const off = document.createElement('canvas');
      off.width = sw;
      off.height = sh;
      const octx = off.getContext('2d');
      if (!octx) return;
      octx.drawImage(logo, sx, sy, sw, sh, 0, 0, sw, sh);
      const img = octx.getImageData(0, 0, sw, sh);
      const d = img.data;
      const floor = 46;
      for (let py = 0; py < sh; py++) {
        for (let px = 0; px < sw; px++) {
          const i = (py * sw + px) * 4;
          const dx = (px - sw / 2) / (sw / 2);
          const dy = (py - sh / 2) / (sh / 2);
          const edge = Math.min(1, Math.max(0, (1.02 - Math.hypot(dx, dy)) / 0.18));
          for (let c = 0; c < 3; c++) {
            d[i + c] = Math.max(0, d[i + c] - floor) * (255 / (255 - floor)) * edge;
          }
        }
      }
      octx.putImageData(img, 0, 0);
      emblem = off;
    };
    logo.src = '/assets/logo.jpg';

    const dust = Array.from({ length: 40 }, () => ({
      x: Math.random() - 0.5,
      y: Math.random() - 0.5,
      speed: Math.random() * 0.0008 + 0.0003,
      size: Math.random() * 1.4 + 0.5,
    }));

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const spin = reducedMotion ? 0 : 0.0035;
    let angle = 0.6;
    let time = 0;

    const rings = [
      { radius: 1.36, tilt: -24, squash: 0.3, speed: 1.1 },
      { radius: 1.44, tilt: 16, squash: 0.24, speed: -0.8 },
      { radius: 1.24, tilt: 38, squash: 0.36, speed: 0.6 },
    ];

    const drawRing = (
      cx: number,
      cy: number,
      R: number,
      ring: (typeof rings)[number],
      back: boolean
    ) => {
      const radius = R * ring.radius;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate((ring.tilt * Math.PI) / 180 + currentRotX * 0.5);

      ctx.beginPath();
      ctx.ellipse(0, 0, radius, radius * ring.squash, 0, back ? Math.PI : 0, back ? Math.PI * 2 : Math.PI);

      // Soft outer glow, then a bright core line
      ctx.strokeStyle = `rgba(230, 181, 74, ${back ? 0.18 : 0.3})`;
      ctx.lineWidth = 6;
      ctx.shadowColor = 'rgba(255, 200, 90, 0.9)';
      ctx.shadowBlur = 18;
      ctx.stroke();
      ctx.strokeStyle = back ? 'rgba(230, 181, 74, 0.55)' : 'rgba(255, 226, 150, 0.95)';
      ctx.lineWidth = back ? 1.4 : 2;
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Orbiting energy node
      const nodeAngle = (((angle * 4 * ring.speed) % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
      if (back ? nodeAngle > Math.PI : nodeAngle <= Math.PI) {
        ctx.fillStyle = '#FFF5D6';
        ctx.shadowColor = '#FFD700';
        ctx.shadowBlur = 16;
        ctx.beginPath();
        ctx.arc(radius * Math.cos(nodeAngle), radius * ring.squash * Math.sin(nodeAngle), 3.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      ctx.restore();
    };

    const render = () => {
      angle += spin;
      time += 0.016;
      currentRotX += (targetRotX - currentRotX) * 0.05;
      currentRotY += (targetRotY - currentRotY) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const R = Math.min(width, height) * 0.335;
      if (R < 2) {
        // The canvas has no size yet (for example the page opened in a hidden tab); try again next frame
        if (!width || !height) handleResize();
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      const cx = width / 2;
      const cy = height / 2 - R * 0.12;

      // 1. Stage pedestal: glowing concentric gold ellipses under the globe
      const baseCy = cy + R * 1.12;
      const baseRx = R * 1.25;
      const baseRy = R * 0.2;
      const baseGrad = ctx.createRadialGradient(cx, baseCy, 4, cx, baseCy, baseRx * 1.3);
      baseGrad.addColorStop(0, 'rgba(255, 214, 130, 0.5)');
      baseGrad.addColorStop(0.35, 'rgba(212, 155, 40, 0.16)');
      baseGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.save();
      ctx.translate(cx, baseCy);
      ctx.scale(1, baseRy / baseRx);
      ctx.translate(-cx, -baseCy);
      ctx.fillStyle = baseGrad;
      ctx.beginPath();
      ctx.arc(cx, baseCy, baseRx * 1.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      [1, 0.72, 0.44].forEach((r, i) => {
        ctx.strokeStyle = `rgba(255, 214, 130, ${0.35 + i * 0.2})`;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = 'rgba(255, 200, 90, 0.8)';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.ellipse(cx, baseCy, baseRx * r, baseRy * r, 0, 0, Math.PI * 2);
        ctx.stroke();
      });
      ctx.shadowBlur = 0;

      // 2. Drifting gold dust
      dust.forEach((d) => {
        d.y -= d.speed;
        if (d.y < -0.5) d.y = 0.5;
        ctx.fillStyle = 'rgba(255, 223, 120, 0.55)';
        ctx.beginPath();
        ctx.arc(cx + d.x * width, cy + d.y * height, d.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Back halves of the orbital rings
      rings.forEach((ring) => drawRing(cx, cy, R, ring, true));

      // 4. Atmosphere halo + sphere body
      const halo = ctx.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 1.25);
      halo.addColorStop(0, 'rgba(120, 160, 255, 0.22)');
      halo.addColorStop(0.5, 'rgba(230, 181, 74, 0.08)');
      halo.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.25, 0, Math.PI * 2);
      ctx.fill();

      const body = ctx.createRadialGradient(cx - R * 0.45, cy - R * 0.5, R * 0.05, cx, cy, R);
      body.addColorStop(0, '#22345a');
      body.addColorStop(0.45, '#0b1424');
      body.addColorStop(1, '#020409');
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fill();

      // 5. Land dots and gold city lights on the visible hemisphere
      const rot = angle + currentRotY;
      const cosR = Math.cos(rot);
      const sinR = Math.sin(rot);
      const tilt = 0.3 + currentRotX;
      const cosT = Math.cos(tilt);
      const sinT = Math.sin(tilt);
      for (const p of surface) {
        const x1 = p.x * cosR + p.z * sinR;
        const z1 = -p.x * sinR + p.z * cosR;
        const y2 = p.y * cosT - z1 * sinT;
        const z2 = p.y * sinT + z1 * cosT;
        if (z2 <= 0.02) continue;
        const px = cx + x1 * R;
        const py = cy - y2 * R;
        if (p.city) {
          ctx.fillStyle = `rgba(255, 210, 120, ${0.35 + z2 * 0.65})`;
          const s = p.size * (0.9 + z2 * 0.7);
          ctx.fillRect(px - s / 2, py - s / 2, s, s);
        } else {
          ctx.fillStyle = `rgba(150, 175, 220, ${0.12 + z2 * 0.42})`;
          ctx.fillRect(px - 0.6, py - 0.6, 1.2, 1.2);
        }
      }

      // 6. Rim light and glass sheen
      ctx.strokeStyle = 'rgba(170, 200, 255, 0.55)';
      ctx.lineWidth = 1.5;
      ctx.shadowColor = 'rgba(140, 180, 255, 0.9)';
      ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.arc(cx, cy, R - 0.5, -Math.PI * 0.95, -Math.PI * 0.2);
      ctx.stroke();
      ctx.strokeStyle = 'rgba(255, 205, 110, 0.6)';
      ctx.shadowColor = 'rgba(255, 200, 90, 0.9)';
      ctx.beginPath();
      ctx.arc(cx, cy, R - 0.5, Math.PI * 0.1, Math.PI * 0.75);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // 7. Monogram floating at the core ('screen' drops the logo's black background)
      if (emblem) {
        const source = emblem;
        const lw = R * 1.3;
        const lh = (lw * LOGO_CROP.sh) / LOGO_CROP.sw;
        const bob = reducedMotion ? 0 : Math.sin(time * 1.2) * R * 0.025;
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, R, 0, Math.PI * 2);
        ctx.clip();
        // Second, fainter pass brightens the metal against the dark sphere
        (['screen', 'lighter'] as const).forEach((mode, i) => {
          ctx.globalCompositeOperation = mode;
          ctx.globalAlpha = i === 0 ? 1 : 0.45;
          ctx.drawImage(source, cx - lw / 2, cy - lh / 2 + bob, lw, lh);
        });
        ctx.restore();
      }

      // 8. Front halves of the orbital rings
      rings.forEach((ring) => drawRing(cx, cy, R, ring, false));

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full aspect-square max-w-[680px] mx-auto lg:-my-6 flex items-center justify-center select-none">
      {/* Background radial atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#E6B54A]/10 via-[#000000]/0 to-[#FFF0B8]/5 rounded-full filter blur-3xl pointer-events-none" />

      {/* Interactive 3D Canvas: globe, orbital rings and the INDOVA BEYOND monogram */}
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Globe with the INDOVA BEYOND monogram and golden orbital rings"
        className="w-full h-full relative z-10"
      />
    </div>
  );
};
