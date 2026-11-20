/**
 * Destacados de «Como Dios manda» (capítulo 1): los productos que el bar elige enseñar
 * (sus tops, promos y novedades), en el orden que quiera.
 *
 * DEMO: el panel /admin guarda la lista en el navegador (localStorage, clave CLAVE_ALMACEN) y la portada
 * la lee de ahí; si no hay nada guardado, se usan DESTACADOS_INICIALES. Es decir, los cambios solo se ven
 * en el navegador donde se hicieron. Cuando haya servidor y acceso con contraseña, basta con cambiar
 * de dónde se lee y dónde se guarda la lista: el formato (Destacado) puede seguir igual.
 *
 * Este archivo no importa nada de Astro: lo usan también los scripts del navegador.
 */
export const ETIQUETAS = ['', 'Top', 'Promo', 'Nuevo'] as const;
export type Etiqueta = (typeof ETIQUETAS)[number];

export type Destacado = {
  id: string;
  nombre: string;
  desc: string;
  precio: string;
  etiqueta: Etiqueta;
  /** Clave de una foto de la biblioteca (src/data/fotos-destacados.ts) o '' si aún no tiene foto */
  foto: string;
  visible: boolean;
};

export const CLAVE_ALMACEN = 'salchicheria:destacados:v1';
export const MAX_DESTACADOS = 12;

/** Lista de partida. Nombres, descripciones y precios salen de la carta; la etiqueta «Top» es de muestra. */
export const DESTACADOS_INICIALES: Destacado[] = [
  { id: 'perrito-salchi', nombre: 'Perrito estilo Salchi', desc: 'Pan brioche, salchicha bratwurst, bacon, queso rallado, salsa Emmy y cebolla roja encurtida.', precio: '7,50 €', etiqueta: 'Top', foto: 'perrito-estilo-salchi', visible: true },
  { id: 'anillas', nombre: 'Anillas a la andaluza', desc: 'Con alioli de ajo tostado.', precio: '8,50 €', etiqueta: '', foto: 'anillas-camiseta', visible: true },
  { id: 'croqueta', nombre: 'Croqueta de jamón ibérico Belisario Barriga', desc: 'Elaborada con leche infusionada con hueso de jamón.', precio: '1,50 €/ud.', etiqueta: '', foto: '', visible: true },
  { id: 'bravas', nombre: 'Bravas', desc: 'Con nuestra salsa clásica y alioli de ajo tostado.', precio: '6 €', etiqueta: '', foto: '', visible: true },
  { id: 'huevos-rotos', nombre: 'Huevos rotos con paleta ibérica', desc: 'Patatas en bastón, huevos fritos con puntilla y paleta ibérica de Belisario Barriga.', precio: '8,50 €', etiqueta: '', foto: '', visible: true },
];

const texto = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

/** Devuelve la lista saneada, o null si lo guardado no sirve (entonces se usan los iniciales). */
export function validarDestacados(dato: unknown, fotosValidas?: string[]): Destacado[] | null {
  if (!Array.isArray(dato)) return null;
  const lista: Destacado[] = [];
  for (const d of dato.slice(0, MAX_DESTACADOS)) {
    if (!d || typeof d !== 'object') continue;
    const o = d as Record<string, unknown>;
    const nombre = texto(o.nombre, 80);
    if (!nombre) continue;
    const etiqueta = ETIQUETAS.includes(o.etiqueta as Etiqueta) ? (o.etiqueta as Etiqueta) : '';
    let foto = texto(o.foto, 60);
    if (fotosValidas && !fotosValidas.includes(foto)) foto = '';
    lista.push({
      id: texto(o.id, 40) || `d${lista.length}-${Date.now().toString(36)}`,
      nombre,
      desc: texto(o.desc, 200),
      precio: texto(o.precio, 24),
      etiqueta,
      foto,
      visible: o.visible !== false,
    });
  }
  return lista;
}

export function leerDestacados(fotosValidas?: string[]): Destacado[] | null {
  try {
    const crudo = localStorage.getItem(CLAVE_ALMACEN);
    return crudo ? validarDestacados(JSON.parse(crudo), fotosValidas) : null;
  } catch {
    return null; // sin acceso al almacenamiento (modo privado, bloqueado…): se usan los iniciales
  }
}
