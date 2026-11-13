import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const reducido = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = <T extends Element = HTMLElement>(s: string) => document.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string) => gsap.utils.toArray<T>(s);

/* ── Scroll suave (solo si se permite movimiento) ───────────────── */
if (!reducido) {
  const lenis = new Lenis({ lerp: 0.1, anchors: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

/* ── Salchi: barra de progreso ──────────────────────────────────── */
const rail = $('[data-salchi]');
const portada = $('[data-portada]');

if (rail) {
  const cabeza = rail.querySelector<HTMLElement>('.salchi-cabeza')!;
  const medir = () => rail.style.setProperty('--recorrido', `${rail.clientHeight - cabeza.offsetHeight}px`);
  medir();
  ScrollTrigger.addEventListener('refreshInit', medir);

  const inclinacion = { g: 0 };
  const giro = gsap.quickTo(inclinacion, 'g', {
    duration: 0.4,
    ease: 'power3',
    onUpdate: () => rail.style.setProperty('--giro', `${inclinacion.g.toFixed(2)}deg`),
  });

  // Celebración al llegar al final: salto, vuelta y "¡Guau!"
  const img = rail.querySelector('[data-salchi-img]');
  const guau = rail.querySelector('[data-salchi-guau]');
  let celebrando = false;
  const celebrar = () => {
    if (reducido) {
      gsap.set(guau, { opacity: 1, scale: 1 });
      return;
    }
    gsap
      .timeline()
      .to(img, { y: -18, duration: 0.25, ease: 'power2.out' })
      .to(img, { rotate: 360, duration: 0.5, ease: 'power2.inOut' }, '<')
      .to(img, { y: 0, duration: 0.5, ease: 'bounce.out' })
      .set(img, { rotate: 0 })
      .to(guau, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(3)' }, 0.2);
  };
  const descelebrar = () => gsap.to(guau, { opacity: 0, scale: 0.4, duration: 0.2 });

  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate(self) {
      rail.style.setProperty('--p', self.progress.toFixed(4));
      if (!reducido) giro(gsap.utils.clamp(-14, 14, self.getVelocity() / 180));
      if (self.progress > 0.985 && !celebrando) {
        celebrando = true;
        celebrar();
      } else if (self.progress < 0.95 && celebrando) {
        celebrando = false;
        descelebrar();
      }
    },
  });
  if (!reducido) ScrollTrigger.addEventListener('scrollEnd', () => giro(0));

  // En la portada Salchi ya está en grande: la barra aparece al salir de ella
  if (portada) {
    ScrollTrigger.create({
      trigger: portada,
      start: 'bottom 75%',
      onEnter: () => rail.style.setProperty('--visible', '1'),
      onLeaveBack: () => rail.style.setProperty('--visible', '0'),
    });
    if (window.scrollY < portada.offsetHeight * 0.25) rail.style.setProperty('--visible', '0');
  }
}

/* ── Animaciones (todas desactivadas con movimiento reducido) ───── */
// Cada capítulo se prepara en su propia tarea (en orden de documento, que importa para los pins)
// para no bloquear el hilo principal de golpe: mejor INP/TBT en móviles modestos.
const tareas: Array<() => void> = [];

if (!reducido) {
  tareas.push(() => {
    /* Portada: entrada */
    gsap
      .timeline({ defaults: { ease: 'power4.out' } })
      .from('[data-portada-salchi]', { scaleX: 0.3, scaleY: 1.4, autoAlpha: 0, duration: 0.9, ease: 'back.out(2)' })
      .from('[data-lema]', { yPercent: 60, autoAlpha: 0, stagger: 0.12, duration: 0.8 }, '-=0.5')
      .from('[data-portada-info] > *', { y: 20, autoAlpha: 0, stagger: 0.1, duration: 0.6 }, '-=0.5');

  });

  tareas.push(() => {
    /* Portada: al bajar, Salchi se estira hacia abajo y se va */
    gsap.to('[data-portada-salchi]', {
      scaleY: 1.6,
      scaleX: 0.8,
      yPercent: 30,
      autoAlpha: 0,
      ease: 'none',
      scrollTrigger: { trigger: '[data-portada]', start: 'top top', end: 'bottom top', scrub: true },
    });

  });

  tareas.push(() => {
    /* Titulares de capítulo: suben y la segunda palabra se estira como Salchi */
    $$('h2').forEach((h2) => {
      const partes = h2.querySelectorAll('[data-titular]');
      if (!partes.length) return;
      gsap.from(partes, {
        yPercent: 105,
        stagger: 0.12,
        duration: 0.9,
        ease: 'power4.out',
        scrollTrigger: { trigger: h2, start: 'top 80%' },
      });
      const estira = h2.querySelector<HTMLElement>('[data-estira]');
      if (estira) {
        // se estira como Salchi, pero nunca más allá del ancho disponible
        estira.style.width = 'max-content';
        const maximo = () => gsap.utils.clamp(1, 1.3, (estira.parentElement!.clientWidth - 4) / estira.offsetWidth);
        gsap.fromTo(
          estira,
          { scaleX: 1 },
          {
            scaleX: maximo,
            ease: 'none',
            scrollTrigger: { trigger: h2, start: 'top 60%', end: 'bottom top', scrub: true, invalidateOnRefresh: true },
          },
        );
      }
    });

  });

  tareas.push(() => {
    /* 1 · Carta fijada que hace zoom y se pasea */
    const zoom = $('[data-zoom]');
    if (zoom) {
      const textos = $$('[data-zoom-texto]');
      gsap.set(textos.slice(1), { autoAlpha: 0, y: 30 });
      gsap
        .timeline({
          defaults: { ease: 'power2.inOut' },
          scrollTrigger: { trigger: zoom, start: 'top top', end: '+=200%', pin: true, scrub: 0.8 },
        })
        .set('[data-zoom-img]', { transformOrigin: '50% 50%' })
        .to('[data-zoom-img]', { scale: 2.6, transformOrigin: '19% 43%', duration: 1 }) // Salchi con el bocadillo
        .to(textos[0], { autoAlpha: 0, y: -30, duration: 0.3 }, '<0.2')
        .to(textos[1], { autoAlpha: 1, y: 0, duration: 0.3 }, '<0.2')
        .to({}, { duration: 0.3 })
        .to('[data-zoom-img]', { scale: 2.2, transformOrigin: '46% 27%', duration: 1 }) // LOS CLÁSICOS
        .to(textos[1], { autoAlpha: 0, y: -30, duration: 0.3 }, '<0.2')
        .to(textos[2], { autoAlpha: 1, y: 0, duration: 0.3 }, '<0.2')
        .to({}, { duration: 0.4 });
    }

  });

  tareas.push(() => {
    /* 1 · Galería horizontal de platos */
    const wrap = $('[data-galeria-wrap]');
    const track = $('[data-track]');
    if (wrap && track) {
      const distancia = () => Math.max(0, track.scrollWidth - window.innerWidth);
      const horizontal = gsap.to(track, {
        x: () => -distancia(),
        ease: 'none',
        scrollTrigger: {
          trigger: wrap,
          start: 'top top',
          end: () => `+=${distancia()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
      $$('[data-plato]').forEach((plato, i) => {
        gsap.from(plato, {
          rotate: i % 2 ? 8 : -8,
          y: 40,
          autoAlpha: 0.2,
          ease: 'back.out(1.6)',
          scrollTrigger: { trigger: plato, containerAnimation: horizontal, start: 'left 95%', end: 'left 55%', scrub: true },
        });
      });
    }

  });

  tareas.push(() => {
    /* 2 · La caña se llena */
    const cana = $('[data-cana]');
    if (cana) {
      gsap
        .timeline({ scrollTrigger: { trigger: cana, start: 'top top', end: '+=120%', pin: true, scrub: 0.6 } })
        .from('[data-liquido]', { y: 262, ease: 'power1.inOut', duration: 1 })
        .from('[data-burbuja]', { y: 40, autoAlpha: 0, stagger: 0.05, duration: 0.4 }, 0.4);
      // las burbujas siguen subiendo solas
      $$('[data-burbuja]').forEach((b, i) => {
        gsap.to(b, { y: -30, repeat: -1, yoyo: true, duration: 1.4 + (i % 3) * 0.4, ease: 'sine.inOut', delay: i * 0.2 });
      });
    }

  });

  tareas.push(() => {
    /* 2 · Reveal de fotos con máscara */
    $$('[data-revela]').forEach((caja) => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: caja, start: 'top 90%', end: 'top 35%', scrub: 0.5 } });
      tl.fromTo(caja, { clipPath: 'inset(100% 0% 0% 0% round 1.5rem)' }, { clipPath: 'inset(0% 0% 0% 0% round 1.5rem)', ease: 'power2.out' }).from(
        caja.querySelector('[data-revela-img]'),
        { scale: 1.35, ease: 'power2.out' },
        0,
      );
    });

  });

  tareas.push(() => {
    /* 3 · Parallax del collage */
    $$('[data-velocidad]').forEach((el) => {
      const v = Number(el.dataset.velocidad);
      gsap.fromTo(
        el,
        { yPercent: v },
        { yPercent: -v, ease: 'none', scrollTrigger: { trigger: '[data-collage]', start: 'top bottom', end: 'bottom top', scrub: true } },
      );
    });

  });

  tareas.push(() => {
    /* 4 · Los posavasos caen sobre la mesa */
    const mesa = $('[data-posavasos]');
    if (mesa) {
      gsap.from(mesa.querySelectorAll('[data-posavaso]'), {
        y: () => -window.innerHeight * 0.9,
        rotation: () => gsap.utils.random(-120, 120),
        autoAlpha: 0,
        duration: 1.1,
        ease: 'bounce.out',
        stagger: { each: 0.12, from: 'random' },
        scrollTrigger: { trigger: mesa, start: 'top 75%' },
      });
    }

  });

  tareas.push(() => {
    /* 5 · Final: la respuesta entra con retranca y Salchi se estira de alegría */
    gsap.from('[data-respuesta]', {
      y: 30,
      autoAlpha: 0,
      stagger: 0.25,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: { trigger: '[data-pregunta]', start: 'top 60%' },
    });
    gsap.from('[data-ticket]', {
      y: 120,
      rotation: 2,
      autoAlpha: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: { trigger: '[data-ticket]', start: 'top 90%' },
    });
    gsap
      .timeline({ scrollTrigger: { trigger: '[data-final-salchi]', start: 'top 85%' } })
      .from('[data-final-salchi]', { scaleY: 0.4, scaleX: 1.1, duration: 1, ease: 'elastic.out(1, 0.4)' })
      .from('[data-final-cartel]', { y: -60, rotation: -30, autoAlpha: 0, duration: 0.8, ease: 'back.out(2)' }, 0.2);
  });

  const siguiente = () => {
    const t = tareas.shift();
    if (!t) return; // GSAP ya refresca solo en el evento load
    t();
    setTimeout(siguiente, 0);
  };
  siguiente();
}

