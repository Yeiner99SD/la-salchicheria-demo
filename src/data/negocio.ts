export const NEGOCIO = {
  nombre: 'La Salchichería',
  nombreCompleto: 'La Salchichería · Oeste 7',
  lema: ['Hambre no vais a pasar', 'Sed tampoco'],
  direccion: {
    calle: 'Plaza del Oeste, 7',
    cp: '37007',
    ciudad: 'Salamanca',
    pais: 'ES',
  },
  instagram: 'https://www.instagram.com/lasalchicheria7/',
  instagramUser: '@lasalchicheria7',
  telefono: '[TELÉFONO]',
  comoLlegar:
    'https://www.google.com/maps/dir/?api=1&destination=' +
    encodeURIComponent('La Salchichería, Plaza del Oeste 7, 37007 Salamanca'),
} as const;

/** Carta completa, transcrita de la foto de la carta (fotos/carta.jpg). Precios en euros. */
export type Plato = { nombre: string; desc?: string; precio: string; seccion: string };
export type Seccion = { id: string; titulo: string; nota?: string; platos: Plato[] };

const seccion = (id: string, titulo: string, platos: Omit<Plato, 'seccion'>[], nota?: string): Seccion => ({
  id,
  titulo,
  nota,
  platos: platos.map((p) => ({ ...p, seccion: titulo })),
});

export const CARTA_COMPLETA: Seccion[] = [
  seccion('perritos', 'Perritos', [
    { nombre: 'Perrito estilo Salchi', desc: '[Descripción pendiente]', precio: '[PRECIO]' },
    { nombre: '[Resto de perritos]', desc: '[Carta de perritos pendiente de recibir]', precio: '[PRECIO]' },
  ], 'La razón del nombre'),
  seccion('pintxos', 'Pintxos', [
    { nombre: 'Gilda', precio: '2 €' },
    { nombre: 'Tortilla de patata', desc: 'Melosa y con cebolla caramelizada.', precio: '3 €' },
    { nombre: 'Jeta', precio: '2,50 €' },
    { nombre: 'Croqueta de jamón ibérico Belisario Barriga', desc: 'Elaborada con leche infusionada con hueso de jamón.', precio: '1,50 €/ud.' },
  ]),
  seccion('clasicos', 'Los clásicos', [
    { nombre: 'Bravas', desc: 'Con nuestra salsa clásica y alioli de ajo tostado.', precio: '6 €' },
    { nombre: 'Ensaladilla', desc: 'A nuestra manera, con langostino cocido y piparra.', precio: '6 €' },
    { nombre: 'Huevos rotos con paleta ibérica', desc: 'Patatas en bastón, huevos fritos con puntilla y paleta ibérica de Belisario Barriga.', precio: '8,50 €' },
    { nombre: 'Jeta', precio: '6 €' },
    { nombre: 'Anillas a la andaluza', desc: 'Con alioli de ajo tostado.', precio: '7,20 €' },
    { nombre: 'Lágrimas de pollo', desc: 'Tiras de pechuga marinadas y fritas.', precio: '7,20 €' },
    { nombre: 'Fish & chips', desc: 'Merluza rebozada, patatas fritas y salsa tártara.', precio: '12,50 €' },
    { nombre: 'Alitas', desc: 'Cocinadas a baja temperatura y glaseadas con nuestra BBQ coreana.', precio: '7,50 €' },
    { nombre: 'Costillas de cerdo', desc: 'Glaseadas con nuestra BBQ Bourbon.', precio: '9,50 €' },
  ], 'Para compartir'),
  seccion('huerta', 'Huerta', [
    { nombre: 'Carpaccio de tomate, miniburrata y pesto', precio: '7,50 €' },
    { nombre: 'Berenjena asada', desc: 'Con miel de caña y un toque fresco de yogur.', precio: '7 €' },
    { nombre: 'Pimientos de Padrón', precio: '6 €' },
  ]),
];

const buscar = (nombre: string) => CARTA_COMPLETA.flatMap((s) => s.platos).find((p) => p.nombre.startsWith(nombre))!;

/** Selección para la galería del capítulo 1 (el resto, en /carta) */
export const CARTA: Plato[] = [
  'Anillas a la andaluza',
  'Croqueta de jamón ibérico',
  'Bravas',
  'Huevos rotos',
  'Gilda',
  'Alitas',
  'Costillas de cerdo',
].map(buscar);

/** Bebidas. Vinos: solo los legibles en la foto de la carta (precio por botella). */
export const BEBIDAS = {
  cana: { nombre: 'Caña', precio: '[PRECIO]' },
  sangria: { nombre: 'Sangría', precio: '[PRECIO]' },
  vinos: [
    { nombre: 'Brezo', desc: 'Godello del Bierzo. Floral, elegante, mineral.', precio: '21 €' },
    { nombre: 'Piripa', desc: 'Coupage de blancas de Arribes del Duero. Diferente, sabroso, sorprendente.', precio: '23 €' },
  ],
  /** En la foto se intuyen más blancos (15 €, 18 €, 22 €) pero no se leen bien los nombres */
  vinosPendientes: '[Resto de la carta de vinos: blancos de Rueda y Jumilla, entre otros]',
};

/**
 * Reseñas del capítulo 4. SOLO reseñas reales de Google: pegar aquí el texto tal cual,
 * el nombre del autor y, si se sabe, la fecha (texto libre: "octubre de 2026", "hace 2 semanas"…).
 * Mientras sean marcadores entre corchetes, la web los muestra como pendientes. No inventar ninguna.
 */
export type Resena = { texto: string; autor: string; fecha?: string };

export const RESENAS: Resena[] = [
  { texto: '[Reseña real de Google Maps: algo sobre las croquetas]', autor: '[Nombre]' },
  { texto: '[Reseña real: algo sobre lo bien tirada que está la caña]', autor: '[Nombre]' },
  { texto: '[Reseña real: algo sobre el ambiente de la plaza]', autor: '[Nombre]' },
  { texto: '[Reseña real: algo sobre los perritos]', autor: '[Nombre]' },
];

export const MAPA_EMBED =
  'https://www.google.com/maps?output=embed&q=' + encodeURIComponent('Plaza del Oeste 7, 37007 Salamanca');
/** Ficha del bar en Google Maps */
export const MAPA_RESENAS =
  'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('La Salchichería Plaza del Oeste 7 Salamanca');

/**
 * Enlace directo para escribir una reseña. Sustituir el marcador por la URL real, con el formato
 * https://search.google.com/local/writereview?placeid=…
 * Mientras siga el marcador, el botón «Déjanos tu opinión en Google» lleva a la ficha de Google Maps.
 */
export const ENLACE_RESENA_GOOGLE = '[ENLACE_RESEÑA_GOOGLE]';
export const enlaceResena = ENLACE_RESENA_GOOGLE.startsWith('http') ? ENLACE_RESENA_GOOGLE : MAPA_RESENAS;

/**
 * Frase con la que Salchi se presenta en la portada como anfitrión.
 * PENDIENTE de elegir entre 3 opciones (ver CLAUDE.md); de momento, la primera.
 */
export const FRASE_SALCHI = 'Soy Salchi. Tú baja, que yo me estiro.';
