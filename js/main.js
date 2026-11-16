/**
 * METALLUM — Script Principal (HTML/CSS/JS Architecture)
 * Lenis + GSAP + ScrollTrigger + Interações, Drawers, Lightbox e Formulário
 */

(function (global) {
  "use strict";

  const {
    CONFIG = {},
    COMPANY = {},
    NAVIGATION = [],
    SCENES = [],
    SERVICES = [],
    SERVICE_CATEGORIES = [],
    INDUSTRIES = [],
    PROJECTS = [],
    PRINCIPLES = [],
    PROCESS_STEPS = [],
    GALLERY = [],
    CONTACT = {},
    initSparks = () => null
  } = global;

// Registra plugins do GSAP
if (typeof gsap !== "undefined") {
  if (typeof ScrollTrigger !== "undefined") gsap.registerPlugin(ScrollTrigger);
  const Split = typeof SplitText !== "undefined" ? SplitText : (typeof window !== "undefined" && window.SplitText ? window.SplitText : null);
  if (Split) gsap.registerPlugin(Split);
  gsap.defaults({ ease: "expo.out", duration: 1.1 });
}

// Media queries para animação
const MQ = {
  desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
  mobile: "(max-width: 1023.98px) and (prefers-reduced-motion: no-preference)",
  motion: "(prefers-reduced-motion: no-preference)",
  reduce: "(prefers-reduced-motion: reduce)"
};

function prefersReducedMotion() {
  return window.matchMedia(MQ.reduce).matches;
}

// ───────────────────────── Scroll Management (Lenis & Anchors) ─────────────────────────
let lenis = null;
let scrollLocks = 0;
let pendingScroll = null;

function headerOffset() {
  const v = getComputedStyle(document.documentElement).getPropertyValue("--header-h");
  const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
  return v.includes("rem") ? parseFloat(v) * rem : parseFloat(v) || 72;
}

function scrollToTarget(target, opts = {}) {
  const el = typeof target === "string" ? document.querySelector(target) : target;
  if (!el) return;
  if (scrollLocks > 0) {
    pendingScroll = el;
    return;
  }
  const isTop = el.id === "inicio";
  const offset = isTop ? 0 : -headerOffset() + 1;
  if (lenis) {
    lenis.scrollTo(isTop ? 0 : el, {
      offset,
      duration: opts.immediate ? 0 : 1.5,
      immediate: opts.immediate,
      easing: (t) => 1 - Math.pow(1 - t, 4)
    });
  } else {
    const y = isTop ? 0 : el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({
      top: y,
      behavior: prefersReducedMotion() || opts.immediate ? "auto" : "smooth"
    });
  }
}

function lockScroll() {
  scrollLocks += 1;
  if (scrollLocks > 1) return;
  lenis?.stop();
  const sbw = window.innerWidth - document.documentElement.clientWidth;
  document.documentElement.style.overflow = "hidden";
  if (sbw > 0) document.documentElement.style.paddingRight = `${sbw}px`;
}

function unlockScroll() {
  scrollLocks = Math.max(0, scrollLocks - 1);
  if (scrollLocks > 0) return;
  document.documentElement.style.overflow = "";
  document.documentElement.style.paddingRight = "";
  lenis?.start();
  if (pendingScroll) {
    const t = pendingScroll;
    pendingScroll = null;
    requestAnimationFrame(() => scrollToTarget(t));
  }
}

// ───────────────────────── Inicialização ao Carregar o DOM ─────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  const reduce = prefersReducedMotion();

  // 1. Lenis Smooth Scroll
  if (!reduce && typeof Lenis !== "undefined") {
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true, syncTouch: false });
    if (typeof ScrollTrigger !== "undefined") {
      lenis.on("scroll", ScrollTrigger.update);
    }
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  // 2. Interceptador de âncoras suaves
  document.addEventListener("click", (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const hash = a.getAttribute("href");
    if (!hash || hash.length < 2) return;
    const target = document.querySelector(hash);
    if (!target) return;

    e.preventDefault();
    scrollToTarget(target);
    history.replaceState(null, "", hash === "#inicio" ? location.pathname : hash);
    window.setTimeout(() => target.focus({ preventScroll: true }), reduce ? 0 : 900);
  });

  // Se a URL já tiver hash
  if (location.hash.length > 1) {
    const el = document.querySelector(location.hash);
    if (el) window.setTimeout(() => scrollToTarget(el, { immediate: true }), 60);
  }

  // Recalcular ScrollTrigger ao redimensionar ou carregar fontes
  if (typeof ScrollTrigger !== "undefined") {
    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(refresh);
    }
    if (document.readyState === "complete") {
      refresh();
    } else {
      window.addEventListener("load", refresh);
    }

    // Refresh após imagens terminarem de carregar
    window.addEventListener("load", () => {
      setTimeout(refresh, 100);
      setTimeout(refresh, 500);
    });

    let lastH = document.body.scrollHeight;
    let timer = 0;
    const ro = new ResizeObserver(() => {
      const h = document.body.scrollHeight;
      if (Math.abs(h - lastH) < 2) return;
      lastH = h;
      window.clearTimeout(timer);
      timer = window.setTimeout(refresh, 150);
    });
    ro.observe(document.body);
  }

  // 3. Canvas Sparks no Hero
  const sparksCanvas = document.getElementById("hero-sparks-canvas");
  if (sparksCanvas) {
    initSparks(sparksCanvas);
  }

  // 4. Configurar Animações Globais GSAP
  setupAnimations();

  // 5. Header, Menu Mobile e Scroll Spy
  setupHeader();

  // 6. Seções Interativas: Soluções, Projetos, Galeria, Form
  setupServices();
  setupProjects();
  setupGallery();
  setupQuoteForm();
});

// ───────────────────────── Animações GSAP e Revelações Declarativas ─────────────────────────
function setupAnimations() {
  if (typeof gsap === "undefined") return;

  const mm = gsap.matchMedia();
  const header = document.getElementById("site-header");
  const heroRoot = document.getElementById("inicio");

  mm.add(MQ.motion, () => {
    // ── Hero Entrance ──
    if (heroRoot) {
      const q = gsap.utils.selector(heroRoot);
      const tl = gsap.timeline({ delay: 0.15 });

      gsap.set(q("[data-pre]"), { autoAlpha: 1 });
      gsap.set(q("[data-hero-media]"), { clipPath: "inset(49.6% 0% 49.6% 0%)" });
      gsap.set(q("[data-hero-zoom]"), { scale: 1.32 });

      tl.fromTo(q("[data-hero-slit]"), { scaleX: 0 }, { scaleX: 1, duration: 0.85, ease: "expo.inOut" })
        .to(q("[data-hero-media]"), { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut" }, "-=0.05")
        .to(q("[data-hero-slit]"), { autoAlpha: 0, duration: 0.4 }, "<0.2")
        .to(q("[data-hero-zoom]"), { scale: 1.06, duration: 2.8, ease: "expo.out" }, "<")
        .from(q("[data-hero-line]"), { yPercent: 112, duration: 1.4, stagger: 0.1, ease: "expo.out" }, "-=2.0")
        .from(q("[data-hero-fade]"), { autoAlpha: 0, y: 24, duration: 1.2, stagger: 0.08 }, "-=1.15")
        .from(q("[data-hero-frame]"), { autoAlpha: 0, duration: 1.4, stagger: 0.05, ease: "power2.out" }, "<");

      if (header) {
        tl.fromTo(header, { autoAlpha: 0, y: -16 }, { autoAlpha: 1, y: 0, duration: 1.2 }, "<");
      }

      // Scroll do Hero
      const scrollTl = gsap.timeline({
        scrollTrigger: { trigger: heroRoot, start: "top top", end: "bottom top", scrub: true }
      });
      scrollTl
        .fromTo(q("[data-hero-parallax]"), { yPercent: 0 }, { yPercent: 14, ease: "none" }, 0)
        .fromTo(q("[data-hero-content]"), { y: 0 }, { y: () => -window.innerHeight * 0.12, ease: "none" }, 0)
        .to(q("[data-hero-content]"), { autoAlpha: 0, ease: "none", duration: 0.5 }, 0.2);
    }

    // ── Fade-up declarativo ([data-reveal]) ──
    const items = gsap.utils.toArray("[data-reveal]");
    gsap.set(items, { opacity: 0, y: 36 });
    ScrollTrigger.batch(items, {
      start: "top 88%",
      once: true,
      onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 1.2, stagger: 0.09, overwrite: true }),
      onRefresh: (batch) => {
        batch.forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.92) {
            gsap.to(el, { opacity: 1, y: 0, duration: 0.8, overwrite: true });
          }
        });
      }
    });

    const onFocusIn = (e) => {
      const el = e.target.closest("[data-reveal]");
      if (el && gsap.getProperty(el, "opacity") !== 1) {
        gsap.to(el, { opacity: 1, y: 0, duration: 0.4, overwrite: true });
      }
    };
    document.addEventListener("focusin", onFocusIn);

    // ── Títulos com linhas reveladas ([data-reveal-lines]) ──
    const Split = typeof SplitText !== "undefined" ? SplitText : (typeof window !== "undefined" && window.SplitText ? window.SplitText : null);
    gsap.utils.toArray("[data-reveal-lines]").forEach((el) => {
      gsap.set(el, { autoAlpha: 1 });
      if (Split) {
        Split.create(el, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
          autoSplit: true,
          onSplit(self) {
            return gsap.from(self.lines, {
              yPercent: 105,
              duration: 1.25,
              stagger: 0.08,
              ease: "expo.out",
              scrollTrigger: { trigger: el, start: "top 86%", once: true }
            });
          }
        });
      } else {
        // Fallback elegante se SplitText não estiver carregado
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 86%", once: true }
        });
      }
    });

    // ── Parallax declarativo ([data-parallax]) ──
    gsap.utils.toArray("[data-parallax]").forEach((el) => {
      const amount = parseFloat(el.dataset.parallax || "10");
      gsap.fromTo(
        el,
        { yPercent: -amount },
        {
          yPercent: amount,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement || el,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        }
      );
    });

    // ── Traços de Desenho Técnico SVG ([data-draw]) ──
    gsap.utils.toArray("[data-draw]").forEach((path) => {
      const len = path.getTotalLength ? path.getTotalLength() : 0;
      if (!len) return;
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 2.2,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: path.closest("[data-draw-root]") || path,
          start: "top 80%",
          once: true
        },
        delay: parseFloat(path.dataset.drawDelay || "0")
      });
    });

    // ── Seção Empresa (Intro) ──
    const introRoot = document.getElementById("empresa");
    if (introRoot) {
      const qIntro = gsap.utils.selector(introRoot);
      const clips = qIntro("[data-clip]");
      if (clips.length) {
        gsap.fromTo(
          clips,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.6,
            ease: "expo.inOut",
            stagger: 0.25,
            scrollTrigger: { trigger: clips[0], start: "top 82%", once: true }
          }
        );
      }
      const callout = qIntro("[data-callout]")[0];
      if (callout) {
        gsap.fromTo(
          callout,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: "expo.inOut",
            transformOrigin: "left center",
            scrollTrigger: { trigger: callout, start: "top 80%", once: true },
            delay: 0.9
          }
        );
      }
    }

    // ── Seção Manifesto (Palavras acendendo com scroll) ──
    const manifestoRoot = document.querySelector(".manifesto-section");
    if (manifestoRoot) {
      const ws = manifestoRoot.querySelectorAll("[data-word]");
      if (ws.length) {
        gsap.fromTo(
          ws,
          { opacity: 0.14 },
          {
            opacity: 1,
            stagger: 0.12,
            ease: "none",
            scrollTrigger: {
              trigger: manifestoRoot.querySelector("[data-words]"),
              start: "top 78%",
              end: "bottom 42%",
              scrub: true
            }
          }
        );
      }
      const heat = manifestoRoot.querySelector("[data-heat]");
      if (heat) {
        gsap.fromTo(
          heat,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { trigger: manifestoRoot, start: "top 70%", end: "bottom 50%", scrub: true }
          }
        );
      }
    }

    // ── Seção Cenas Desktop (Sequência cinematográfica com pinning exclusivo >= 1024px) ──
    const scenesRoot = document.getElementById("narrativa");
    if (scenesRoot) {
      mm.add(MQ.desktop, () => {
        const qScenes = gsap.utils.selector(scenesRoot);
        const blocks = qScenes("[data-scene]");
        const n = blocks.length;
        const progressBars = qScenes("[data-scene-bar]");
        const counter = scenesRoot.querySelector("[data-scene-counter]");
        const labels = qScenes("[data-scene-nav]");

        blocks.forEach((b, i) => {
          if (i > 0) gsap.set(b, { clipPath: "inset(100% 0% 0% 0%)" });
          gsap.set(b.querySelector("[data-scene-img]"), { scale: i > 0 ? 1.28 : 1.12 });
        });

        const stage = qScenes("[data-stage]")[0];
        if (stage && n > 1) {
          const tlScenes = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: scenesRoot,
              start: "top top",
              end: () => `+=${window.innerHeight * (n - 0.2) * 1.05}`,
              pin: stage,
              scrub: 0.8,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const total = tlScenes.duration();
                const t = self.progress * total;
                const bounds = [0, ...Array.from({ length: n - 1 }, (_, k) => (k + 1) * 1.4 + 0.1), total];
                let idx = 0;
                while (idx < n - 1 && t >= bounds[idx + 1]) idx++;
                const local = (t - bounds[idx]) / Math.max(0.001, bounds[idx + 1] - bounds[idx]);
                if (counter) counter.textContent = String(idx + 1).padStart(2, "0");
                progressBars.forEach((bar, i) => {
                  bar.style.transform = `scaleY(${i < idx ? 1 : i === idx ? Math.min(1, local) : 0})`;
                });
                labels.forEach((l, i) => (l.dataset.active = i === idx ? "true" : "false"));
              }
            }
          });

          tlScenes.to(blocks[0].querySelector("[data-scene-img]"), { scale: 1.02, duration: 1 }, 0);

          for (let i = 1; i < n; i++) {
            const at = i * 1.4 - 0.4;
            const prev = blocks[i - 1];
            const cur = blocks[i];
            tlScenes
              .to(cur, { clipPath: "inset(0% 0% 0% 0%)", duration: 1, ease: "power2.inOut" }, at)
              .to(cur.querySelector("[data-scene-img]"), { scale: 1.04, duration: 1.6 }, at)
              .to(prev.querySelector("[data-scene-img]"), { scale: 1.18, yPercent: -7, duration: 1 }, at)
              .to(prev.querySelector("[data-scene-shade]"), { opacity: 0.85, duration: 1 }, at)
              .to(prev.querySelectorAll("[data-scene-text]"), { y: -60, autoAlpha: 0, duration: 0.5, stagger: 0.03 }, at)
              .from(cur.querySelectorAll("[data-scene-text]"), { y: 90, autoAlpha: 0, duration: 0.6, stagger: 0.06, ease: "power3.out" }, at + 0.5);
          }
          tlScenes.to({}, { duration: 0.6 });

          gsap.from(blocks[0].querySelectorAll("[data-scene-text]"), {
            y: 70,
            autoAlpha: 0,
            stagger: 0.08,
            duration: 1.3,
            scrollTrigger: { trigger: scenesRoot, start: "top 65%", once: true }
          });
        }
      });

      // ── Seção Cenas Mobile (Scroll Natural sem Pinning < 1024px) ──
      mm.add(MQ.mobile, () => {
        const blocks = scenesRoot.querySelectorAll("[data-scene]");
        blocks.forEach((b) => {
          gsap.set(b, { clearProps: "clipPath,transform" });
          const img = b.querySelector("[data-scene-img]");
          if (img) gsap.set(img, { clearProps: "transform,scale" });
          gsap.from(b, {
            opacity: 0.35,
            y: 24,
            ease: "power2.out",
            scrollTrigger: {
              trigger: b,
              start: "top 85%",
              end: "top 45%",
              scrub: true
            }
          });
        });
      });
    }

    // ── Seção Aplicações (Industries) — Scroll Horizontal no Desktop ──
    const indRoot = document.getElementById("aplicacoes");
    if (indRoot) {
      const track = indRoot.querySelector("[data-track]");
      const bar = indRoot.querySelector("[data-ind-progress]");
      const pinContainer = indRoot.querySelector("[data-ind-pin]");

      if (track && pinContainer) {
        // Desktop: fixação e scroll horizontal sincronizado
        mm.add(MQ.desktop, () => {
          const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
          const tween = gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: pinContainer,
              start: "top top",
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 0.6,
              invalidateOnRefresh: true,
              anticipatePin: 1,
              onUpdate: (self) => bar && (bar.style.transform = `scaleX(${self.progress})`)
            }
          });

          gsap.utils.toArray("[data-ind-img]", indRoot).forEach((img) => {
            gsap.fromTo(
              img,
              { xPercent: -8 },
              {
                xPercent: 8,
                ease: "none",
                scrollTrigger: {
                  trigger: img.parentElement,
                  containerAnimation: tween,
                  start: "left right",
                  end: "right left",
                  scrub: true
                }
              }
            );
          });
        });

        // Mobile: scroll nativo horizontal fluido com indicador de progresso
        mm.add(MQ.mobile, () => {
          gsap.set(track, { clearProps: "transform" });
          const trackContainer = indRoot.querySelector(".industries-scroll-container");
          if (trackContainer && bar) {
            const onScroll = () => {
              const max = trackContainer.scrollWidth - trackContainer.clientWidth;
              const prog = max > 0 ? trackContainer.scrollLeft / max : 0;
              bar.style.transform = `scaleX(${Math.min(1, Math.max(0, prog))})`;
            };
            trackContainer.addEventListener("scroll", onScroll, { passive: true });
            return () => trackContainer.removeEventListener("scroll", onScroll);
          }
        });
      }
    }

    // ── Seção Projetos — Clip-path nos frames ──
    const projRoot = document.getElementById("projetos");
    if (projRoot) {
      gsap.utils.toArray("[data-proj-frame]", projRoot).forEach((f) => {
        gsap.fromTo(
          f,
          { clipPath: "inset(12% 12% 12% 12%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: { trigger: f, start: "top 95%", end: "top 35%", scrub: true }
          }
        );
      });
    }

    // ── Seção Processo de Atendimento — Linha de Progresso ──
    const procRoot = document.getElementById("processo");
    if (procRoot) {
      const steps = gsap.utils.toArray("[data-step]", procRoot);
      const line = procRoot.querySelector("[data-flow]");
      const fill = procRoot.querySelector("[data-flow-fill]");
      const nSteps = steps.length;

      const updateSteps = (p) => {
        steps.forEach((s, i) => (s.dataset.on = p >= (i + 0.15) / nSteps || p > 0.98 ? "true" : "false"));
      };

      if (line && fill) {
        // Desktop: horizontal
        mm.add(MQ.desktop, () => {
          gsap.set(fill, { scaleX: 0, scaleY: 1 });
          gsap.to(fill, {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: line,
              start: "top 75%",
              end: "top 25%",
              scrub: 0.5,
              onUpdate: (s) => updateSteps(s.progress)
            }
          });
        });

        // Mobile: vertical
        mm.add(MQ.mobile, () => {
          gsap.set(fill, { scaleY: 0, scaleX: 1 });
          gsap.to(fill, {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: line,
              start: "top 65%",
              end: "bottom 60%",
              scrub: 0.5,
              onUpdate: (s) => updateSteps(s.progress)
            }
          });
        });
      }
    }
  });

  mm.add(MQ.reduce, () => {
    gsap.set(["[data-pre]", header], { autoAlpha: 1 });
    const fill = document.querySelector("[data-flow-fill]");
    if (fill) gsap.set(fill, { scaleX: 1, scaleY: 1 });
    document.querySelectorAll("[data-step]").forEach((s) => (s.dataset.on = "true"));
  });

  document.documentElement.classList.add("hero-ready");
}

// ───────────────────────── Header, Menu Mobile & Scroll Spy ─────────────────────────
function setupHeader() {
  const header = document.getElementById("site-header");
  const menuToggle = document.getElementById("menu-toggle-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  if (!header) return;

    let menuOpen = false;

    // Header scroll visual state
    if (typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const y = self.scroll();
          header.dataset.scrolled = y > 40 ? "true" : "false";
          const hide = !menuOpen && self.direction === 1 && y > window.innerHeight * 0.9;
          header.dataset.hidden = hide ? "true" : "false";
        }
      });
    }

  // Active section tracking (Scroll Spy)
  const navIds = NAVIGATION.map((n) => n.href.slice(1)).concat("orcamento");
  const sectionEls = navIds.map((id) => document.getElementById(id)).filter(Boolean);
  const navLinks = document.querySelectorAll(".header-nav-link");

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const id = e.target.id;
          navLinks.forEach((link) => {
            const href = link.getAttribute("href");
            if (href === `#${id}`) {
              link.setAttribute("aria-current", "true");
            } else {
              link.removeAttribute("aria-current");
            }
          });
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sectionEls.forEach((el) => io.observe(el));

  // Menu Mobile Drawer com rigorosa sincronização de acessibilidade e inert
  if (menuToggle && mobileMenu) {
    let menuOpen = false;
    let isAnimating = false;

    const setMenuOpen = (open) => {
      if (isAnimating || menuOpen === open) return;
      isAnimating = true;
      menuOpen = open;

      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
      const reduce = prefersReducedMotion();

      if (open) {
        lockScroll();
        // Remove inert ANTES da exibição
        mobileMenu.removeAttribute("inert");
        mobileMenu.style.visibility = "visible";

        if (typeof gsap !== "undefined" && !reduce) {
          const tl = gsap.timeline({
            onComplete: () => {
              isAnimating = false;
              const firstLink = mobileMenu.querySelector("a");
              if (firstLink) firstLink.focus();
            }
          });
          tl.fromTo(
            mobileMenu,
            { clipPath: "inset(0 0 100% 0)" },
            { clipPath: "inset(0 0 0% 0)", duration: 0.7, ease: "expo.inOut" }
          ).fromTo(
            mobileMenu.querySelectorAll("[data-menu-item]"),
            { yPercent: 110, opacity: 0 },
            { yPercent: 0, opacity: 1, stagger: 0.04, duration: 0.65, ease: "expo.out" },
            0.25
          );
        } else {
          mobileMenu.style.clipPath = "inset(0 0 0% 0)";
          isAnimating = false;
          const firstLink = mobileMenu.querySelector("a");
          if (firstLink) firstLink.focus();
        }
      } else {
        // Fechamento: o menu permanece interativo DURANTE a animação
        if (typeof gsap !== "undefined" && !reduce) {
          gsap.to(mobileMenu, {
            clipPath: "inset(0 0 100% 0)",
            duration: 0.55,
            ease: "expo.inOut",
            onComplete: () => {
              // inert é aplicado SOMENTE APÓS o término da animação
              mobileMenu.style.visibility = "hidden";
              mobileMenu.setAttribute("inert", "");
              unlockScroll();
              isAnimating = false;
              // Retorna foco ao botão de abertura
              menuToggle.focus({ preventScroll: true });
            }
          });
        } else {
          mobileMenu.style.clipPath = "inset(0 0 100% 0)";
          mobileMenu.style.visibility = "hidden";
          mobileMenu.setAttribute("inert", "");
          unlockScroll();
          isAnimating = false;
          menuToggle.focus({ preventScroll: true });
        }
      }
    };

    menuToggle.addEventListener("click", () => setMenuOpen(!menuOpen));

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenuOpen(false));
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menuOpen) {
        e.preventDefault();
        setMenuOpen(false);
      }
    });
  }
}

// ───────────────────────── Seção de Serviços & Drawer ─────────────────────────
function setupServices() {
  const serviceItems = document.querySelectorAll(".service-item-btn");
  const tabBtns = document.querySelectorAll(".service-tab-btn");
  const stageImg = document.getElementById("service-stage-img");
  const stageCat = document.getElementById("service-stage-cat");
  const stageCnae = document.getElementById("service-stage-cnae-badge");
  const stageTitle = document.getElementById("service-stage-title");
  const stageSummary = document.getElementById("service-stage-summary");
  const stageFig = document.getElementById("service-stage-fig");
  const stageDetailsBtn = document.getElementById("service-stage-details-btn");

  if (!serviceItems.length) return;

  let currentActiveIndex = 0;

  function updateDesktopStage(idx) {
    if (typeof SERVICES === "undefined" || !SERVICES[idx]) return;
    const s = SERVICES[idx];
    currentActiveIndex = idx;

    if (stageImg) {
      stageImg.style.transition = "opacity 0.25s ease, transform 0.4s ease";
      stageImg.style.opacity = "0.3";
      stageImg.style.transform = "scale(1.04)";
      setTimeout(() => {
        stageImg.src = s.image;
        stageImg.alt = s.name;
        stageImg.style.opacity = "1";
        stageImg.style.transform = "scale(1)";
      }, 140);
    }
    if (stageCat) {
      stageCat.textContent = `ÁREA ${s.categoryNumber || "01"} / ${(s.categoryName || "").toUpperCase()}`;
    }
    if (stageCnae) {
      stageCnae.textContent = s.cnaeFormatted || `CNAE ${s.cnae}`;
    }
    if (stageTitle) {
      stageTitle.textContent = s.name;
    }
    if (stageSummary) {
      stageSummary.textContent = s.description;
    }
    if (stageFig) {
      stageFig.textContent = `Fig. ${String(idx + 1).padStart(2, "0")} / ${String(SERVICES.length).padStart(2, "0")}`;
    }
    if (stageDetailsBtn) {
      stageDetailsBtn.onclick = (e) => {
        e.preventDefault();
        openServiceDrawer(idx);
      };
    }
  }

  function setActiveService(idx, isToggle = false) {
    const isMobile = window.innerWidth < 1024;
    const targetBtn = document.querySelector(`.service-item-btn[data-index="${idx}"]`);
    if (!targetBtn) return;

    const currentlyActive = targetBtn.getAttribute("data-active") === "true";

    if (isToggle && currentlyActive && isMobile) {
      // No mobile, clicar no item ativo permite recolher
      targetBtn.setAttribute("data-active", "false");
      targetBtn.setAttribute("aria-expanded", "false");
      const acc = document.getElementById(`service-acc-${idx}`);
      if (acc) acc.hidden = true;
      return;
    }

    // Seleção única: ativa o clicado e desativa todos os outros
    serviceItems.forEach((btn) => {
      const bIdx = parseInt(btn.dataset.index, 10);
      const isActive = bIdx === idx;
      btn.setAttribute("data-active", isActive ? "true" : "false");
      btn.setAttribute("aria-expanded", isActive ? "true" : "false");
      const acc = document.getElementById(`service-acc-${bIdx}`);
      if (acc) acc.hidden = !isActive;
    });

    updateDesktopStage(idx);
  }

  // Event listeners para cada item da lista (botões +)
  serviceItems.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const idx = parseInt(btn.dataset.index, 10);
      setActiveService(idx, true);
    });
  });

  // Event listeners para botões de CTA dentro dos accordions mobile
  document.querySelectorAll(".btn-service-detail-cta").forEach((cta) => {
    cta.addEventListener("click", (e) => {
      e.preventDefault();
      const idx = parseInt(cta.dataset.serviceIndex, 10);
      if (!isNaN(idx)) openServiceDrawer(idx);
    });
  });

  // Filtro pelas 5 Abas de Especialidades
  tabBtns.forEach((tab) => {
    tab.addEventListener("click", () => {
      const area = tab.dataset.area;
      tabBtns.forEach((t) => {
        const isSelected = t === tab;
        t.dataset.active = isSelected ? "true" : "false";
        t.setAttribute("aria-selected", isSelected ? "true" : "false");
      });

      const wrappers = document.querySelectorAll(".service-item-wrapper");
      let firstVisibleIdx = null;

      wrappers.forEach((w) => {
        const cat = w.dataset.category;
        const matches = (area === "all" || cat === area);
        w.dataset.hidden = matches ? "false" : "true";
        if (matches && firstVisibleIdx === null) {
          const btn = w.querySelector(".service-item-btn");
          if (btn) firstVisibleIdx = parseInt(btn.dataset.index, 10);
        }
      });

      if (firstVisibleIdx !== null) {
        setActiveService(firstVisibleIdx, false);
      }
      if (typeof ScrollTrigger !== "undefined") {
        ScrollTrigger.refresh();
      }
    });
  });

  // Inicializa o primeiro serviço como ativo
  updateDesktopStage(0);

  // Configuração do Service Drawer modal/dialog
  setupServiceDrawer();
}
function setupServiceDrawer() {
  const drawerRoot = document.getElementById("service-dialog-root");
  const overlay = document.getElementById("service-dialog-overlay");
  const drawer = document.getElementById("service-dialog-drawer");
  const closeBtn = document.getElementById("service-dialog-close");
  const prevBtn = document.getElementById("service-drawer-prev");
  const nextBtn = document.getElementById("service-drawer-next");
  const quoteCtaBtn = document.getElementById("service-drawer-quote-btn");

  if (!drawerRoot || !drawer) return;

  let currentIndex = 0;
  let isOpen = false;
  let lastFocus = null;

  function render(idx) {
    currentIndex = idx;
    const s = SERVICES[idx];
    if (!s) return;
    const n = SERVICES.length;

    const numEl = document.getElementById("service-drawer-num");
    const totalEl = document.getElementById("service-drawer-total");
    const imgEl = document.getElementById("service-drawer-img");
    const titleEl = document.getElementById("service-drawer-title");
    const descEl = document.getElementById("service-drawer-desc");
    const cnaeTag = document.getElementById("service-drawer-cnae-tag");
    const catTag = document.getElementById("service-drawer-cat-tag");
    const denomEl = document.getElementById("service-drawer-denomination");
    const primaryTag = document.getElementById("service-drawer-primary-tag");

    if (numEl) numEl.textContent = s.number;
    if (totalEl) totalEl.textContent = String(n).padStart(2, "0");
    if (imgEl) {
      imgEl.src = s.image;
      imgEl.alt = s.name || s.title;
    }
    if (titleEl) titleEl.textContent = s.name || s.title;
    if (descEl) descEl.textContent = s.description;
    if (cnaeTag) cnaeTag.textContent = s.cnaeFormatted || (s.cnae ? `CNAE ${s.cnae}` : "Serviço Especializado");
    if (catTag) catTag.textContent = s.categoryName || "Especialidade Metallum";
    if (denomEl) {
      denomEl.textContent = s.denomination && s.denomination !== s.name
        ? `Denominação oficial: ${s.denomination}`
        : `Classificação: ${s.isPrimary ? "Atividade Principal" : "Atividade Secundária"}`;
    }
    if (primaryTag) {
      primaryTag.style.display = s.isPrimary ? "inline-flex" : "none";
    }

    const prevS = SERVICES[(idx - 1 + n) % n];
    const nextS = SERVICES[(idx + 1) % n];
    const prevTitle = document.getElementById("service-drawer-prev-title");
    const nextTitle = document.getElementById("service-drawer-next-title");
    if (prevTitle) prevTitle.textContent = prevS.name || prevS.title;
    if (nextTitle) nextTitle.textContent = nextS.name || nextS.title;

    drawer.scrollTo({ top: 0, behavior: "smooth" });
  }

  window.openServiceDrawer = function (idx) {
    render(idx);
    isOpen = true;
    lastFocus = document.activeElement;
    lockScroll();
    drawerRoot.style.visibility = "visible";
    drawerRoot.removeAttribute("inert");

    const reduce = prefersReducedMotion();
    const tl = gsap.timeline();
    tl.fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1, duration: reduce ? 0 : 0.5, ease: "power2.out" }, 0)
      .fromTo(drawer, { xPercent: 100 }, { xPercent: 0, duration: reduce ? 0 : 0.9, ease: "expo.out" }, 0)
      .fromTo(
        drawer.querySelectorAll("[data-dialog-item]"),
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, stagger: 0.05, duration: reduce ? 0 : 0.8, ease: "expo.out" },
        reduce ? 0 : 0.18
      );

    closeBtn.focus({ preventScroll: true });
  };

  function close() {
    if (!isOpen) return;
    isOpen = false;
    const reduce = prefersReducedMotion();
    const tl = gsap.timeline({
      onComplete: () => {
        drawerRoot.style.visibility = "hidden";
        drawerRoot.setAttribute("inert", "");
        unlockScroll();
        lastFocus?.focus({ preventScroll: true });
      }
    });
    tl.to(drawer, { xPercent: 100, duration: reduce ? 0 : 0.6, ease: "expo.inOut" }, 0)
      .to(overlay, { autoAlpha: 0, duration: reduce ? 0 : 0.45 }, reduce ? 0 : 0.1);
  }

  overlay.addEventListener("click", close);
  closeBtn.addEventListener("click", close);

  prevBtn.addEventListener("click", () => render((currentIndex - 1 + SERVICES.length) % SERVICES.length));
  nextBtn.addEventListener("click", () => render((currentIndex + 1) % SERVICES.length));

  quoteCtaBtn.addEventListener("click", () => {
    const s = SERVICES[currentIndex];
    selectServiceInForm(s.id);
    close();
    scrollToTarget("#orcamento");
  });

  document.addEventListener("keydown", (e) => {
    if (!isOpen) return;
    if (e.key === "Escape") close();
  });
}

// ───────────────────────── Seção de Projetos & Drawer ─────────────────────────
function setupProjects() {
  document.querySelectorAll(".project-btn, .project-view-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.dataset.index, 10);
      openProjectDrawer(idx);
    });
  });

  setupProjectDrawer();
}

function setupProjectDrawer() {
  const drawerRoot = document.getElementById("project-dialog-root");
  const overlay = document.getElementById("project-dialog-overlay");
  const drawer = document.getElementById("project-dialog-drawer");
  const closeBtn = document.getElementById("project-dialog-close");
  const prevBtn = document.getElementById("project-drawer-prev");
  const nextBtn = document.getElementById("project-drawer-next");
  const ctaBtn = document.getElementById("project-drawer-quote-btn");

  if (!drawerRoot || !drawer) return;

  let currentIndex = 0;
  let isOpen = false;
  let lastFocus = null;

  function render(idx) {
    currentIndex = idx;
    const p = PROJECTS[idx];
    if (!p) return;
    const n = PROJECTS.length;

    document.getElementById("project-drawer-code").textContent = p.code;
    document.getElementById("project-drawer-cat").textContent = p.category;
    document.getElementById("project-drawer-img").src = p.image;
    document.getElementById("project-drawer-img").alt = p.title;
    document.getElementById("project-drawer-title").textContent = p.title;
    document.getElementById("project-drawer-summary").textContent = p.summary;
    document.getElementById("project-drawer-context").textContent = p.context;
    document.getElementById("project-drawer-approach").textContent = p.approach;
    document.getElementById("project-drawer-detail-img").src = p.detailImage;

    const processesOl = document.getElementById("project-drawer-processes");
    processesOl.innerHTML = p.processes
      .map(
        (x, k) => `
        <li style="display: flex; align-items: center; gap: 0.75rem; color: var(--color-graphite);">
          <span style="font-family: var(--font-mono); font-size: 0.75rem; font-weight: 600; color: var(--color-copper);">${String(k + 1).padStart(2, "0")}</span>
          ${x}
          ${k < p.processes.length - 1 ? `<span style="height: 1px; width: 1.25rem; background-color: var(--color-steel-border);" aria-hidden="true"></span>` : ""}
        </li>`
      )
      .join("");

    drawer.scrollTo({ top: 0, behavior: "smooth" });
  }

  window.openProjectDrawer = function (idx) {
    render(idx);
    isOpen = true;
    lastFocus = document.activeElement;
    lockScroll();
    drawerRoot.style.visibility = "visible";
    drawerRoot.removeAttribute("inert");

    const reduce = prefersReducedMotion();
    const tl = gsap.timeline();
    tl.fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1, duration: reduce ? 0 : 0.5, ease: "power2.out" }, 0)
      .fromTo(drawer, { xPercent: 100 }, { xPercent: 0, duration: reduce ? 0 : 0.9, ease: "expo.out" }, 0)
      .fromTo(
        drawer.querySelectorAll("[data-dialog-item]"),
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, stagger: 0.05, duration: reduce ? 0 : 0.8, ease: "expo.out" },
        reduce ? 0 : 0.18
      );

    closeBtn.focus({ preventScroll: true });
  };

  function close() {
    if (!isOpen) return;
    isOpen = false;
    const reduce = prefersReducedMotion();
    const tl = gsap.timeline({
      onComplete: () => {
        drawerRoot.style.visibility = "hidden";
        drawerRoot.setAttribute("inert", "");
        unlockScroll();
        lastFocus?.focus({ preventScroll: true });
      }
    });
    tl.to(drawer, { xPercent: 100, duration: reduce ? 0 : 0.6, ease: "expo.inOut" }, 0)
      .to(overlay, { autoAlpha: 0, duration: reduce ? 0 : 0.45 }, reduce ? 0 : 0.1);
  }

  overlay.addEventListener("click", close);
  closeBtn.addEventListener("click", close);

  prevBtn.addEventListener("click", () => render((currentIndex - 1 + PROJECTS.length) % PROJECTS.length));
  nextBtn.addEventListener("click", () => render((currentIndex + 1) % PROJECTS.length));

  ctaBtn.addEventListener("click", () => {
    close();
    scrollToTarget("#orcamento");
  });

  document.addEventListener("keydown", (e) => {
    if (!isOpen) return;
    if (e.key === "Escape") close();
  });
}

// ───────────────────────── Galeria & Lightbox ─────────────────────────
function setupGallery() {
  document.querySelectorAll(".gallery-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.dataset.index, 10);
      openLightbox(idx);
    });
  });

  const dialogRoot = document.getElementById("gallery-dialog-root");
  const overlay = document.getElementById("gallery-dialog-overlay");
  const closeBtn = document.getElementById("gallery-dialog-close");
  const prevBtn = document.getElementById("gallery-lightbox-prev");
  const nextBtn = document.getElementById("gallery-lightbox-next");
  const imgEl = document.getElementById("gallery-lightbox-img");
  const counterEl = document.getElementById("gallery-lightbox-counter");
  const totalEl = document.getElementById("gallery-lightbox-total");
  const catEl = document.getElementById("gallery-lightbox-category");
  const titleEl = document.getElementById("gallery-lightbox-title");

  if (!dialogRoot || !imgEl) return;

  let currentIndex = 0;
  let isOpen = false;
  let touchStartX = null;
  let lastFocus = null;

  function render(idx) {
    currentIndex = idx;
    const g = GALLERY[idx];
    const n = GALLERY.length;

    imgEl.src = g.image;
    imgEl.alt = g.caption;
    counterEl.textContent = String(idx + 1).padStart(2, "0");
    totalEl.textContent = String(n).padStart(2, "0");
    catEl.textContent = g.category;
    titleEl.textContent = g.caption;

    imgEl.style.animation = "none";
    imgEl.offsetHeight; // trigger reflow
    imgEl.style.animation = "fadeIn 0.6s ease";
  }

  window.openLightbox = function (idx) {
    render(idx);
    isOpen = true;
    lastFocus = document.activeElement;
    lockScroll();
    dialogRoot.style.visibility = "visible";
    dialogRoot.removeAttribute("inert");

    const reduce = prefersReducedMotion();
    gsap.fromTo(dialogRoot, { autoAlpha: 0 }, { autoAlpha: 1, duration: reduce ? 0 : 0.4 });
    closeBtn.focus({ preventScroll: true });
  };

  function close() {
    if (!isOpen) return;
    isOpen = false;
    const reduce = prefersReducedMotion();
    gsap.to(dialogRoot, {
      autoAlpha: 0,
      duration: reduce ? 0 : 0.35,
      onComplete: () => {
        dialogRoot.style.visibility = "hidden";
        dialogRoot.setAttribute("inert", "");
        unlockScroll();
        lastFocus?.focus({ preventScroll: true });
      }
    });
  }

  overlay.addEventListener("click", close);
  closeBtn.addEventListener("click", close);

  const go = (delta) => render((currentIndex + delta + GALLERY.length) % GALLERY.length);
  prevBtn.addEventListener("click", () => go(-1));
  nextBtn.addEventListener("click", () => go(1));

  // Touch Swipe para mobile
  imgEl.parentElement.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  });
  imgEl.parentElement.addEventListener("touchend", (e) => {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
    touchStartX = null;
  });

  document.addEventListener("keydown", (e) => {
    if (!isOpen) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") go(1);
    if (e.key === "ArrowLeft") go(-1);
  });
}

// ───────────────────────── Formulário de Orçamento ─────────────────────────
function selectServiceInForm(serviceId) {
  const select = document.getElementById("quote-service");
  if (select) {
    select.value = serviceId;
  }
}

function setupQuoteForm() {
  const form = document.getElementById("quote-form");
  const resultCard = document.getElementById("quote-result-card");
  const resetBtn = document.getElementById("quote-reset-btn");
  if (!form) return;

  const phoneInput = document.getElementById("quote-phone");
  const msgInput = document.getElementById("quote-message");
  const charCounter = document.getElementById("quote-msg-count");
  const fileInput = document.getElementById("quote-file");
  const fileNameDisplay = document.getElementById("quote-file-name");
  const fileRemoveBtn = document.getElementById("quote-file-remove");

  // Máscara de Telefone
  phoneInput?.addEventListener("input", (e) => {
    const v = e.target.value.replace(/\D/g, "").slice(0, 11);
    if (v.length <= 2) e.target.value = v.length ? `(${v}` : "";
    else if (v.length <= 6) e.target.value = `(${v.slice(0, 2)}) ${v.slice(2)}`;
    else if (v.length <= 10) e.target.value = `(${v.slice(0, 2)}) ${v.slice(2, 6)}-${v.slice(6)}`;
    else e.target.value = `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
  });

  // Contador de caracteres da mensagem
  msgInput?.addEventListener("input", (e) => {
    if (charCounter) charCounter.textContent = e.target.value.trim().length;
  });

  // Upload de arquivo
  let selectedFile = null;
  fileInput?.addEventListener("change", (e) => {
    selectedFile = e.target.files?.[0] || null;
    if (selectedFile) {
      fileNameDisplay.textContent = selectedFile.name;
      fileRemoveBtn.style.display = "block";
    } else {
      fileNameDisplay.textContent = "Anexar desenho técnico (opcional)";
      fileRemoveBtn.style.display = "none";
    }
  });

  fileRemoveBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    selectedFile = null;
    fileInput.value = "";
    fileNameDisplay.textContent = "Anexar desenho técnico (opcional)";
    fileRemoveBtn.style.display = "none";
  });

  // Validação e Envio
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let hasError = false;
    const name = document.getElementById("quote-name");
    const company = document.getElementById("quote-company");
    const email = document.getElementById("quote-email");
    const service = document.getElementById("quote-service");
    const message = document.getElementById("quote-message");
    const consent = document.getElementById("quote-consent");

    const showError = (fieldId, msg) => {
      hasError = true;
      const input = document.getElementById(fieldId);
      const errEl = document.getElementById(`${fieldId}-err`);
      if (input) input.classList.add("error");
      if (errEl) errEl.innerHTML = `<span role="alert">${msg}</span>`;
    };

    const clearError = (fieldId) => {
      const input = document.getElementById(fieldId);
      const errEl = document.getElementById(`${fieldId}-err`);
      if (input) input.classList.remove("error");
      if (errEl) errEl.textContent = "";
    };

    // Limpa erros anteriores
    ["quote-name", "quote-company", "quote-email", "quote-phone", "quote-message", "quote-file", "quote-consent"].forEach(clearError);

    if (name.value.trim().length < 3) showError("quote-name", "Informe seu nome completo.");
    if (company.value.trim().length < 2) showError("quote-company", "Informe o nome da empresa.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) showError("quote-email", "Informe um e-mail válido.");

    const phoneDigits = phoneInput.value.replace(/\D/g, "");
    if (phoneDigits.length > 0 && (phoneDigits.length < 10 || phoneDigits.length > 11)) {
      showError("quote-phone", "Telefone com DDD, 10 ou 11 dígitos.");
    }

    if (message.value.trim().length < 20) {
      showError("quote-message", "Descreva a necessidade com pelo menos 20 caracteres.");
    }

    if (!consent.checked) {
      showError("quote-consent", "É necessário autorizar o contato.");
    }

    if (selectedFile) {
      const ext = "." + (selectedFile.name.split(".").pop() || "").toLowerCase();
      if (!CONTACT.form.acceptedFiles.includes(ext)) {
        showError("quote-file", `Formato não aceito. Use: ${CONTACT.form.acceptedFiles.join(", ")}.`);
      } else if (selectedFile.size > CONTACT.form.maxFileSizeMB * 1024 * 1024) {
        showError("quote-file", `Arquivo acima de ${CONTACT.form.maxFileSizeMB} MB.`);
      }
    }

    if (hasError) {
      const firstError = form.querySelector(".error") || consent;
      firstError?.focus();
      return;
    }

    // Validação local concluída em modo demonstrativo (sem envio para servidor)
    form.style.display = "none";
    resultCard.style.display = "flex";

    document.getElementById("quote-result-name").textContent = name.value;
    document.getElementById("quote-result-company").textContent = company.value;
    const servObj = SERVICES.find((s) => s.id === service.value);
    document.getElementById("quote-result-service").textContent = servObj ? (servObj.name || servObj.title) : "Não definida";

    if (selectedFile) {
      document.getElementById("quote-result-file-row").style.display = "contents";
      document.getElementById("quote-result-file").textContent = `${selectedFile.name} (não enviado)`;
    } else {
      document.getElementById("quote-result-file-row").style.display = "none";
    }

    submitBtn.disabled = false;
    submitBtn.innerHTML = originalBtnText;

    scrollToTarget("#quote-panel");
  });

  resetBtn?.addEventListener("click", () => {
    form.reset();
    selectedFile = null;
    if (fileNameDisplay) fileNameDisplay.textContent = "Anexar desenho técnico (opcional)";
    if (fileRemoveBtn) fileRemoveBtn.style.display = "none";
    if (charCounter) charCounter.textContent = "0";

    resultCard.style.display = "none";
    form.style.display = "block";
    scrollToTarget("#quote-panel");
  });
}
})(typeof window !== "undefined" ? window : globalThis);
