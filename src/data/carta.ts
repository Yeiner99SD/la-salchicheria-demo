/**
 * Carta completa EDITABLE (página /carta), platos y bebidas en una sola lista de secciones.
 *
 * La carta de partida sale de la transcripción de la foto de la carta (CARTA_COMPLETA y BEBIDAS
 * en negocio.ts). DEMO: el panel /admin guarda la carta editada en el navegador (localStorage,
 * clave CLAVE_CARTA) y /carta la lee de ahí; si no hay nada guardado, se usa CARTA_INICIAL.
 * Los cambios solo se ven en el navegador donde se hicieron. Cuando haya servidor, basta con
 * cambiar de dónde se lee y dónde se guarda: el formato (SeccionCarta) puede seguir igual.
 *
 * Este archivo no importa nada de Astro: lo usan también los scripts del navegador.
 */
import { CARTA_COMPLETA, BEBIDAS } from './negocio';

export type PlatoCarta = { nombre: string; desc: string; precio: string };
export type SeccionCarta = { id: string; titulo: string; nota: string; platos: PlatoCarta[] };

export const CLAVE_CARTA = 'salchicheria:carta:v1';
export const MAX_SECCIONES = 15;
export const MAX_PLATOS = 40;

export const CARTA_INICIAL: SeccionCarta[] = [
  ...CARTA_COMPLETA.map((s) => ({
    id: s.id,
    titulo: s.titulo,
    nota: s.nota ?? '',
    platos: s.platos.map((p) => ({ nombre: p.nombre, desc: p.desc ?? '', precio: p.precio })),
  })),
  {
    id: 'beber',
    titulo: 'Para beber',
    nota: '',
    platos: [BEBIDAS.cana, BEBIDAS.sangria].map((b) => ({ nombre: b.nombre, desc: '', precio: b.precio })),
  },
  {
    id: 'blancos',
    titulo: 'Blancos',
    nota: 'Precio por botella',
    platos: [
      ...BEBIDAS.vinos.map((v) => ({ nombre: v.nombre, desc: v.desc, precio: v.precio })),
      { nombre: '[Resto de la carta de vinos]', desc: '', precio: '' },
    ],
  },
];

const texto = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

/** Identificador apto para el ancla del índice (#pintxos), único dentro de la carta */
export function idSeccion(titulo: string, usados: Set<string>) {
  const base =
    titulo
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 30) || 'seccion';
  let id = base;
  for (let n = 2; usados.has(id); n++) id = `${base}-${n}`;
  usados.add(id);
  return id;
}

/** Devuelve la carta saneada, o null si lo guardado no sirve (entonces se usa la de partida). */
export function validarCarta(dato: unknown): SeccionCarta[] | null {
  if (!Array.isArray(dato)) return null;
  const usados = new Set<string>();
  const carta: SeccionCarta[] = [];
  for (const s of dato.slice(0, MAX_SECCIONES)) {
    if (!s || typeof s !== 'object') continue;
    const o = s as Record<string, unknown>;
    const platos = (Array.isArray(o.platos) ? o.platos : [])
      .slice(0, MAX_PLATOS)
      .map((p) => {
        const q = (p ?? {}) as Record<string, unknown>;
        return { nombre: texto(q.nombre, 80), desc: texto(q.desc, 200), precio: texto(q.precio, 24) };
      })
      .filter((p) => p.nombre);
    // Una sección sin nombre no se pierde si tiene platos: se le pone uno genérico
    const titulo = texto(o.titulo, 40) || (platos.length ? 'Sin nombre' : '');
    if (!titulo) continue;
    carta.push({ id: idSeccion(titulo, usados), titulo, nota: texto(o.nota, 40), platos });
  }
  return carta;
}

export function leerCarta(): SeccionCarta[] | null {
  try {
    const crudo = localStorage.getItem(CLAVE_CARTA);
    return crudo ? validarCarta(JSON.parse(crudo)) : null;
  } catch {
    return null; // sin acceso al almacenamiento (modo privado, bloqueado…): se usa la de partida
  }
}
