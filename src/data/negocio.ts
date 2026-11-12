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

/** Platos de la carta (sacados de la foto de la carta). Precios en euros. */
export type Plato = { nombre: string; desc?: string; precio: string; seccion: string };

export const CARTA: Plato[] = [
  { seccion: 'Pintxos', nombre: 'Croqueta de jamón ibérico', desc: 'Belisario Barriga. Con leche infusionada con hueso de jamón.', precio: '1,50 €/ud.' },
  { seccion: 'Los clásicos', nombre: 'Bravas', desc: 'Con nuestra salsa clásica y alioli de ajo tostado.', precio: '6 €' },
  { seccion: 'Los clásicos', nombre: 'Anillas a la andaluza', desc: 'Con alioli de ajo tostado.', precio: '7,20 €' },
  { seccion: 'Los clásicos', nombre: 'Huevos rotos', desc: 'Patatas en bastón, huevos fritos con puntilla y paleta ibérica.', precio: '8,50 €' },
  { seccion: 'Pintxos', nombre: 'Gilda', precio: '2 €' },
  { seccion: 'Los clásicos', nombre: 'Ensaladilla', desc: 'A nuestra manera, con langostino cocido y piparra.', precio: '6 €' },
  { seccion: 'Los clásicos', nombre: 'Alitas', desc: 'A baja temperatura y glaseadas con BBQ coreana.', precio: '7,50 €' },
  { seccion: 'Los clásicos', nombre: 'Costillas de cerdo', desc: 'Glaseadas con nuestra BBQ Bourbon.', precio: '9,50 €' },
  { seccion: 'Pintxos', nombre: 'Tortilla de patata', desc: 'Melosa y con cebolla caramelizada.', precio: '3 €' },
];

/** Bebidas. Vinos: solo los legibles en la foto de la carta (precio por botella). */
export const BEBIDAS = {
  cana: { nombre: 'Caña', precio: '[PRECIO]' },
  sangria: { nombre: 'Sangría', precio: '[PRECIO]' },
  vinos: [
    { nombre: 'Brezo', desc: 'Godello del Bierzo. Floral, elegante, mineral.', precio: '21 €' },
    { nombre: 'Piripa', desc: 'Coupage de blancas de Arribes del Duero. Diferente, sabroso, sorprendente.', precio: '23 €' },
  ],
};

export const RESENAS_PENDIENTES = [
  '[Reseña real de Google Maps: algo sobre las croquetas]',
  '[Reseña real: algo sobre lo bien tirada que está la caña]',
  '[Reseña real: algo sobre el ambiente de la plaza]',
  '[Reseña real: algo sobre los perritos]',
];

export const MAPA_EMBED =
  'https://www.google.com/maps?output=embed&q=' + encodeURIComponent('Plaza del Oeste 7, 37007 Salamanca');
export const MAPA_RESENAS =
  'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('La Salchichería Plaza del Oeste 7 Salamanca');
