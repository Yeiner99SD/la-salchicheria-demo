/**
 * Si desde /admin se guardó una lista de destacados en este navegador, sustituye las tarjetas
 * de «Como Dios manda» por esa lista. Debe ejecutarse ANTES de movimiento.ts, porque la galería
 * horizontal mide las tarjetas al montarse (por eso index.astro lo importa primero).
 * Sin lista guardada (o sin JavaScript) se ven los destacados de partida, pintados en el servidor.
 */
import { leerDestacados, type Destacado } from '../data/destacados';

type Foto = { alt: string; src: string; srcset: string };

const pista = document.querySelector<HTMLElement>('[data-track]');
const plantilla = document.querySelector<HTMLTemplateElement>('[data-plantilla-destacado]');
const datosFotos = document.querySelector('[data-fotos-destacados]');

if (pista && plantilla && datosFotos) {
  const fotos: Record<string, Foto> = JSON.parse(datosFotos.textContent || '{}');
  const guardados = leerDestacados(Object.keys(fotos));

  if (guardados) {
    const cierre = pista.querySelector('[data-destacados-cierre]');
    pista.querySelectorAll('[data-destacado]').forEach((li) => li.remove());

    const pon = (raiz: Element, selector: string, texto: string) => {
      const el = raiz.querySelector<HTMLElement>(selector)!;
      el.textContent = texto;
      el.hidden = !texto;
    };

    guardados
      .filter((d: Destacado) => d.visible)
      .forEach((d) => {
        const li = (plantilla.content.cloneNode(true) as DocumentFragment).firstElementChild!;
        const foto = fotos[d.foto];
        const img = li.querySelector<HTMLImageElement>('[data-d-foto]')!;
        const sinFoto = li.querySelector<HTMLElement>('[data-d-sin-foto]')!;
        if (foto) {
          img.srcset = foto.srcset;
          img.src = foto.src;
          img.alt = foto.alt;
        }
        img.hidden = !foto;
        sinFoto.hidden = Boolean(foto);
        pon(li, '[data-d-plato-nombre]', d.nombre);
        pon(li, '[data-d-nombre]', d.nombre);
        pon(li, '[data-d-precio]', d.precio);
        pon(li, '[data-d-desc]', d.desc);
        pon(li, '[data-d-etiqueta]', d.etiqueta);
        li.querySelector('[data-d-etiqueta]')!.setAttribute('data-tipo', d.etiqueta);
        pista.insertBefore(li, cierre);
      });
  }
}
