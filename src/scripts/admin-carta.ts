/**
 * Panel de prueba · parte 2: editar la carta completa de /carta.
 * Secciones (nombre, nota, orden) y platos (nombre, descripción, precio, orden).
 * Guarda en localStorage (CLAVE_CARTA) en cada cambio y avisa con el evento 'carta-cambiada'
 * para que el desplegable de destacados use la carta nueva.
 */
import { CARTA_INICIAL, CLAVE_CARTA, MAX_PLATOS, MAX_SECCIONES, leerCarta, type SeccionCarta } from '../data/carta';

const q = <T extends Element = HTMLElement>(s: string, raiz: ParentNode = document) => raiz.querySelector<T>(s)!;
const lista = q('[data-carta-lista]');
const estado = q('[data-carta-estado]');
const tSeccion = q<HTMLTemplateElement>('[data-plantilla-seccion-carta]');
const tPlato = q<HTMLTemplateElement>('[data-plantilla-plato-carta]');

const copia = (c: SeccionCarta[]): SeccionCarta[] => c.map((s) => ({ ...s, platos: s.platos.map((p) => ({ ...p })) }));
let carta: SeccionCarta[] = leerCarta() ?? copia(CARTA_INICIAL);
const clonar = (t: HTMLTemplateElement) => (t.content.cloneNode(true) as DocumentFragment).firstElementChild as HTMLElement;
const cuenta = (n: number) => (n === 1 ? '1 plato' : `${n} platos`);

function guardar(mensaje = 'Carta guardada en este navegador.') {
  try {
    localStorage.setItem(CLAVE_CARTA, JSON.stringify(carta));
    estado.textContent = mensaje;
  } catch {
    estado.textContent = 'No se ha podido guardar: este navegador no permite almacenar datos.';
  }
  document.dispatchEvent(new CustomEvent('carta-cambiada'));
}

/** Pinta toda la carta. `abiertas`: índices de las secciones que deben quedar desplegadas. */
function pintar(abiertas = new Set<number>()) {
  lista.replaceChildren(
    ...carta.map((s, si) => {
      const det = clonar(tSeccion) as HTMLDetailsElement;
      det.dataset.si = String(si);
      det.open = abiertas.has(si);
      q('[data-s-titulo]', det).textContent = s.titulo || 'Sección sin nombre';
      q('[data-s-cuenta]', det).textContent = cuenta(s.platos.length);
      q<HTMLInputElement>('[data-sc="titulo"]', det).value = s.titulo;
      q<HTMLInputElement>('[data-sc="nota"]', det).value = s.nota;
      q<HTMLButtonElement>('[data-carta-accion="subir-seccion"]', det).disabled = si === 0;
      q<HTMLButtonElement>('[data-carta-accion="bajar-seccion"]', det).disabled = si === carta.length - 1;
      q<HTMLButtonElement>('[data-carta-accion="anadir-plato"]', det).disabled = s.platos.length >= MAX_PLATOS;
      q('[data-platos]', det).replaceChildren(
        ...s.platos.map((p, pi) => {
          const li = clonar(tPlato);
          li.dataset.pi = String(pi);
          q<HTMLInputElement>('[data-pc="nombre"]', li).value = p.nombre;
          q<HTMLInputElement>('[data-pc="precio"]', li).value = p.precio;
          q<HTMLTextAreaElement>('[data-pc="desc"]', li).value = p.desc;
          q<HTMLButtonElement>('[data-carta-accion="subir-plato"]', li).disabled = pi === 0;
          q<HTMLButtonElement>('[data-carta-accion="bajar-plato"]', li).disabled = pi === s.platos.length - 1;
          return li;
        }),
      );
      return det;
    }),
  );
  q<HTMLButtonElement>('[data-carta-accion="anadir-seccion"]').disabled = carta.length >= MAX_SECCIONES;
}

const abiertasAhora = () =>
  new Set([...lista.querySelectorAll<HTMLDetailsElement>('[data-seccion]')].filter((d) => d.open).map((d) => Number(d.dataset.si)));
const indices = (el: Element) => ({
  si: Number(el.closest<HTMLElement>('[data-seccion]')?.dataset.si),
  pi: Number(el.closest<HTMLElement>('[data-plato]')?.dataset.pi),
});

// Escribir en un campo: se guarda al momento (sin repintar, para no perder el foco)
lista.addEventListener('input', (e) => {
  const campo = e.target as HTMLInputElement;
  const { si, pi } = indices(campo);
  const s = carta[si];
  if (!s) return;
  if (campo.dataset.sc) {
    (s as Record<string, unknown>)[campo.dataset.sc] = campo.value;
    if (campo.dataset.sc === 'titulo') q('[data-s-titulo]', campo.closest('[data-seccion]')!).textContent = campo.value || 'Sección sin nombre';
  } else if (campo.dataset.pc && s.platos[pi]) {
    (s.platos[pi] as Record<string, unknown>)[campo.dataset.pc] = campo.value;
  } else return;
  guardar();
});

// Mover un elemento de una lista
const mover = <T,>(arr: T[], i: number, paso: number) => {
  const j = i + paso;
  if (j < 0 || j >= arr.length) return false;
  [arr[i], arr[j]] = [arr[j], arr[i]];
  return true;
};

// Botones de secciones y platos
lista.addEventListener('click', (e) => {
  const boton = (e.target as Element).closest<HTMLButtonElement>('[data-carta-accion]');
  if (!boton) return;
  const accion = boton.dataset.cartaAccion!;
  const { si, pi } = indices(boton);
  const s = carta[si];
  if (!s) return;
  let abiertas = abiertasAhora();
  // a dónde llevar el foco después de repintar: [sección, plato | -1, selector]
  let foco: [number, number, string] | null = null;
  let mensaje = 'Carta guardada en este navegador.';

  if (accion === 'anadir-plato') {
    s.platos.push({ nombre: '', desc: '', precio: '' });
    foco = [si, s.platos.length - 1, '[data-pc="nombre"]'];
    mensaje = `Plato añadido al final de «${s.titulo}».`;
  } else if (accion === 'subir-plato' || accion === 'bajar-plato') {
    const paso = accion === 'subir-plato' ? -1 : 1;
    if (!mover(s.platos, pi, paso)) return;
    foco = [si, pi + paso, `[data-carta-accion="${accion}"]`];
    mensaje = 'Orden de platos cambiado.';
  } else if (accion === 'quitar-plato') {
    const nombre = s.platos[pi]?.nombre || 'el plato';
    s.platos.splice(pi, 1);
    foco = [si, -1, '[data-carta-accion="anadir-plato"]'];
    mensaje = `Quitado: ${nombre}.`;
  } else if (accion === 'subir-seccion' || accion === 'bajar-seccion') {
    const paso = accion === 'subir-seccion' ? -1 : 1;
    if (!mover(carta, si, paso)) return;
    // la sección movida sigue abierta en su nueva posición
    abiertas = new Set([...abiertas].map((i) => (i === si ? si + paso : i === si + paso ? si : i)));
    foco = [si + paso, -1, `[data-carta-accion="${accion}"]`];
    mensaje = 'Orden de secciones cambiado.';
  } else if (accion === 'quitar-seccion') {
    const n = s.platos.length;
    if (!confirm(`¿Quitar la sección «${s.titulo}»${n ? ` y sus ${cuenta(n)}` : ''}?`)) return;
    carta.splice(si, 1);
    abiertas = new Set([...abiertas].filter((i) => i !== si).map((i) => (i > si ? i - 1 : i)));
    mensaje = `Sección quitada: ${s.titulo}.`;
  } else return;

  pintar(abiertas);
  guardar(mensaje);
  if (foco) {
    const det = lista.children[foco[0]] as HTMLElement | undefined;
    const raiz = foco[1] >= 0 ? det?.querySelectorAll('[data-plato]')[foco[1]] : det;
    let el = raiz?.querySelector<HTMLElement>(foco[2]);
    if (el instanceof HTMLButtonElement && el.disabled) el = raiz?.querySelector<HTMLElement>('input');
    el?.focus();
  }
});

q('[data-carta-accion="anadir-seccion"]').addEventListener('click', () => {
  if (carta.length >= MAX_SECCIONES) return;
  carta.push({ id: '', titulo: 'Nueva sección', nota: '', platos: [] });
  const abiertas = abiertasAhora();
  abiertas.add(carta.length - 1);
  pintar(abiertas);
  guardar('Sección añadida al final.');
  const det = lista.lastElementChild as HTMLElement;
  det.scrollIntoView({ block: 'center' });
  const campo = q<HTMLInputElement>('[data-sc="titulo"]', det);
  campo.focus();
  campo.select();
});

q('[data-carta-accion="restaurar"]').addEventListener('click', () => {
  if (!confirm('¿Volver a la carta de partida? Se perderán los cambios de la carta hechos en este navegador.')) return;
  try {
    localStorage.removeItem(CLAVE_CARTA);
  } catch {
    /* sin almacenamiento: no hay nada que borrar */
  }
  carta = copia(CARTA_INICIAL);
  pintar();
  estado.textContent = 'Carta de partida restaurada.';
  document.dispatchEvent(new CustomEvent('carta-cambiada'));
});

pintar();
