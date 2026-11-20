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

const perro = rail?.querySelector<HTMLElement>('[data-salchi-perro]');

if (rail && perro) {
  // El cuerpo puede crecer hasta que las patas tocan el final de la barra.
  // (offsetHeight del perro = cabeza + patas: el cuerpo que crece no ocupa sitio)
  const medir = () => perro.style.setProperty('--largo', `${Math.max(0, rail.clientHeight - perro.offsetHeight)}px`);
  medir();
  ScrollTrigger.addEventListener('refreshInit', medir);

  // Las patas se balancean un poco según la velocidad del scroll
  const inclinacion = { g: 0 };
  const giro = gsap.quickTo(inclinacion, 'g', {
    duration: 0.4,
    ease: 'power3',
    onUpdate: () => perro.style.setProperty('--giro', `${inclinacion.g.toFixed(2)}deg`),
  });

  // Celebración al llegar al final: Salchi levanta la cabeza y dice "¡Guau!"
  const cabeza = perro.querySelector('.sl-arriba');
  const guau = rail.querySelector('[data-salchi-guau]');
  let celebrando = false;
  const celebrar = () => {
    if (reducido) {
      gsap.set(guau, { opacity: 1, scale: 1 });
      return;
    }
    gsap
      .timeline()
      .to(cabeza, { y: -10, rotate: -8, transformOrigin: '60% 100%', duration: 0.22, ease: 'power2.out' })
      .to(cabeza, { y: 0, rotate: 0, duration: 0.7, ease: 'elastic.out(1, 0.35)' })
      .to(guau, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(3)' }, 0.15);
  };
  const descelebrar = () => gsap.to(guau, { opacity: 0, scale: 0.4, duration: 0.2 });

  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate(self) {
      perro.style.setProperty('--estira', self.progress.toFixed(4));
      if (!reducido) giro(gsap.utils.clamp(-5, 5, self.getVelocity() / 400));
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
    /* Portada: al bajar, Salchi se estira de verdad: la cabeza sube con la página y las patas se quedan atrás.
       Solo se anima --estira (fromTo, con valores de partida explícitos): así no pisa la animación
       de entrada y al volver arriba Salchi queda entero y opaco, como al principio. */
    gsap.fromTo(
      '[data-portada-salchi] [data-salchi-largo]',
      { '--estira': 0 },
      {
        '--estira': 1,
        ease: 'none',
        scrollTrigger: { trigger: '[data-portada]', start: 'top top', end: 'bottom top', scrub: true },
      },
    );

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
    /* 1 · Carta fijada: la cámara recorre la carta sección a sección, cada una con su frase.
       Las paradas y sus cajas vienen de ComerBien.astro (data-caja en cada frase). */
    const zoom = $('[data-zoom]');
    const img = $('[data-zoom-img]');
    if (zoom && img) {
      const textos = $$('[data-zoom-texto]');
      const cajas = textos.map((t) => (t.dataset.caja ? t.dataset.caja.split(',').map(Number) : null));
      gsap.set(textos.slice(1), { autoAlpha: 0, y: 30 });
      gsap.set(img, { transformOrigin: '0 0' });

      // Encuadre de una sección: escala para que quepa (ancho y alto) y desplazamiento para centrarla.
      // Se calcula con las medidas del momento (funciones + invalidateOnRefresh), así se adapta al girar el móvil.
      const encuadre = (caja: number[] | null) => {
        if (!caja) return { scale: 1, x: 0, y: 0 };
        const [x0, y0, x1, y1] = caja;
        const W = img.offsetWidth;
        const H = img.offsetHeight;
        const ancho = zoom.clientWidth - (zoom.clientWidth < 768 ? 64 : 110); // hueco para Salchi a la derecha
        const alto = zoom.clientHeight;
        const s = Math.min((0.94 * ancho) / ((x1 - x0) * W), (0.66 * alto) / ((y1 - y0) * H), 3.4);
        // el centro de la sección va al centro del hueco libre, un poco por encima de la mitad (abajo va la frase)
        return {
          scale: s,
          x: ancho / 2 - img.offsetLeft - s * ((x0 + x1) / 2) * W,
          y: alto * 0.43 - img.offsetTop - s * ((y0 + y1) / 2) * H,
        };
      };

      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        scrollTrigger: {
          trigger: zoom,
          start: 'top top',
          end: () => `+=${(textos.length - 1) * 70}%`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
      for (let i = 1; i < textos.length; i++) {
        const e = () => encuadre(cajas[i]);
        tl.to(img, { scale: () => e().scale, x: () => e().x, y: () => e().y, duration: 1 })
          .to(textos[i - 1], { autoAlpha: 0, y: -30, duration: 0.3 }, '<0.2')
          .to(textos[i], { autoAlpha: 1, y: 0, duration: 0.3 }, '<0.2')
          .to({}, { duration: 0.45 }); // pausa para leer la sección
      }
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
    /* 4 · Las reseñas suben una a una (entrada tranquila: aquí lo importante es leer) */
    const mesa = $('[data-posavasos]');
    if (mesa) {
      gsap.from(mesa.querySelectorAll('[data-posavaso]'), {
        y: 50,
        autoAlpha: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: { trigger: mesa, start: 'top 80%' },
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
      .from('[data-final-salchi]', { scaleY: 0.4, scaleX: 1.1, duration: 1, ease: 'elastic.out(1, 0.4)' });
  });

  const siguiente = () => {
    const t = tareas.shift();
    if (!t) return; // GSAP ya refresca solo en el evento load
    t();
    setTimeout(siguiente, 0);
  };
  siguiente();
}

