/**
 * METALLUM — Simulação de Partículas de Solda (Canvas Sparks)
 * Otimizado para alta performance: HiDPI / Retina, cancelamento do RAF em abas
 * inativas (visibilitychange) e quando fora da viewport (IntersectionObserver).
 */

(function (global) {
  "use strict";

  function initSparks(canvas) {
    if (!canvas) return null;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return null;

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const anchor = { x: 0.865, y: 0.87 };
    const image = { width: 2400, height: 1600 };
    const focal = { desktop: [0.62, 0.5], mobile: [0.88, 0.5] };

    const parts = [];
    let W = 0, H = 0, ox = 0, oy = 0, scale = 1;
    let raf = 0, last = performance.now(), acc = 0;
    let isIntersecting = false;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mobileMq = window.matchMedia("(max-width: 767.98px)");

    const resize = () => {
      // Usa clientWidth/clientHeight com fallback para getBoundingClientRect
      const r = canvas.getBoundingClientRect();
      W = canvas.clientWidth || r.width || 320;
      H = canvas.clientHeight || r.height || 240;
      if (W === 0 || H === 0) return;

      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const s = Math.max(W / image.width, H / image.height);
      const rw = image.width * s;
      const rh = image.height * s;
      const [px, py] = mobileMq.matches ? focal.mobile : focal.desktop;
      ox = (W - rw) * px + anchor.x * rw;
      oy = (H - rh) * py + anchor.y * rh;
      scale = Math.max(0.6, Math.min(1.4, rw / 2000));
    };

    const spawn = (n) => {
      for (let i = 0; i < n; i++) {
        const a = -Math.PI / 2 + (Math.random() - 0.62) * Math.PI * 1.15;
        const sp = (160 + Math.random() * 520) * scale;
        parts.push({
          x: ox + (Math.random() - 0.5) * 6,
          y: oy + (Math.random() - 0.5) * 6,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp,
          life: 0,
          max: 0.35 + Math.random() * 0.95,
          w: 0.6 + Math.random() * 1.3
        });
      }
    };

    const frame = (now) => {
      // Se a aba estiver oculta ou o elemento fora de tela, interrompe o RAF
      if (document.hidden || !isIntersecting) {
        raf = 0;
        return;
      }

      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      acc += dt * (36 + Math.random() * 70);
      const burst = Math.random() < 0.025 ? 14 : 0;
      const n = Math.floor(acc) + burst;
      acc -= Math.floor(acc);
      if (parts.length < 240) spawn(n);

      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";

      const flick = 0.55 + Math.random() * 0.45;
      const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, 120 * scale * flick);
      g.addColorStop(0, `rgba(255,246,228,${0.5 * flick})`);
      g.addColorStop(0.25, `rgba(255,170,90,${0.18 * flick})`);
      g.addColorStop(1, "rgba(255,120,40,0)");
      ctx.fillStyle = g;
      ctx.fillRect(ox - 160 * scale, oy - 160 * scale, 320 * scale, 320 * scale);

      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.life += dt;
        if (p.life >= p.max || p.y > H + 20 || p.x < -20 || p.x > W + 20) {
          parts.splice(i, 1);
          continue;
        }
        p.vy += 620 * scale * dt;
        p.vx *= 0.992;
        p.vy *= 0.992;
        const px = p.x;
        const py = p.y;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        const t = p.life / p.max;
        const alpha = (1 - t) * (1 - t);
        const r = 255;
        const gg = Math.round(244 - 130 * t);
        const b = Math.round(214 - 190 * t);
        ctx.strokeStyle = `rgba(${r},${gg},${b},${alpha})`;
        ctx.lineWidth = p.w;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(p.x + (p.x - px) * 1.6, p.y + (p.y - py) * 1.6);
        ctx.stroke();
      }
      ctx.globalCompositeOperation = "source-over";
    };

    const syncPlayback = () => {
      const shouldRun = !document.hidden && isIntersecting;
      if (shouldRun) {
        if (!raf) {
          last = performance.now();
          raf = requestAnimationFrame(frame);
        }
      } else {
        if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const io = new IntersectionObserver(([e]) => {
      isIntersecting = e.isIntersecting;
      syncPlayback();
    });
    io.observe(canvas);

    document.addEventListener("visibilitychange", syncPlayback);

    return {
      destroy: () => {
        if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
        ro.disconnect();
        io.disconnect();
        document.removeEventListener("visibilitychange", syncPlayback);
      }
    };
  }

  global.initSparks = initSparks;
  if (typeof module !== "undefined" && module.exports) {
    module.exports = { initSparks };
  }
})(typeof window !== "undefined" ? window : globalThis);
