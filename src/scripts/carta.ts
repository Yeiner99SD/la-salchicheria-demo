/**
 * Si desde /admin se guardó una carta en este navegador, sustituye la carta de partida de /carta
 * (secciones e índice). Sin carta guardada (o sin JavaScript) se ve la de partida, pintada en el servidor.
 * Todo el texto se pone con textContent: lo escrito en el panel nunca se interpreta como HTML.
 */
import { leerCarta } from '../data/carta';

const contenedor = document.querySelector<HTMLElement>('[data-carta-secciones]');
const indice = document.querySelector<HTMLElement>('[data-carta-indice]');
const tSeccion = document.querySelector<HTMLTemplateElement>('[data-plantilla-seccion]');
const tPlato = document.querySelector<HTMLTemplateElement>('[data-plantilla-plato]');
const tEnlace = document.querySelector<HTMLTemplateElement>('[data-plantilla-enlace]');
const carta = leerCarta();

if (carta && contenedor && indice && tSeccion && tPlato && tEnlace) {
  const clonar = (t: HTMLTemplateElement) => (t.content.cloneNode(true) as DocumentFragment).firstElementChild as HTMLElement;
  const pon = (el: HTMLElement, valor: string) => {
    el.textContent = valor;
    el.hidden = !valor;
  };

  contenedor.replaceChildren(
    ...carta.map((s) => {
      const sec = clonar(tSeccion);
      sec.id = s.id;
      sec.setAttribute('aria-labelledby', `${s.id}-titulo`);
      const h2 = sec.querySelector('h2')!;
      h2.id = `${s.id}-titulo`;
      h2.textContent = s.titulo;
      pon(sec.querySelector('[data-nota]')!, s.nota ? `(${s.nota})` : '');
      sec.querySelector('ul')!.replaceChildren(
        ...s.platos.map((p) => {
          const li = clonar(tPlato);
          li.querySelector('h3')!.textContent = p.nombre;
          pon(li.querySelector('[data-precio]')!, p.precio);
          li.querySelector<HTMLElement>('[data-guia]')!.hidden = !p.precio;
          pon(li.querySelector('[data-desc]')!, p.desc);
          return li;
        }),
      );
      return sec;
    }),
  );

  indice.replaceChildren(
    ...carta.map((s) => {
      const li = clonar(tEnlace);
      const a = li.querySelector('a')!;
      a.href = `#${s.id}`;
      a.textContent = s.titulo;
      return li;
    }),
  );
}
