/**
 * Biblioteca de fotos que se pueden asignar a un destacado desde /admin.
 * Para añadir una: copiar la foto optimizada a src/assets/fotos, importarla aquí y darle clave, nombre y alt.
 * (En la demo no se pueden subir fotos desde el panel: no hay servidor donde guardarlas.)
 */
import { getImage } from 'astro:assets';
import perritoEstiloSalchi from '../assets/fotos/perrito-estilo-salchi.jpg';
import perritoQueso from '../assets/fotos/perrito-queso.jpg';
import perritosPlato from '../assets/fotos/perritos-plato.jpg';
import perritoCamiseta from '../assets/fotos/perrito-camiseta.jpg';
import anillasCamiseta from '../assets/fotos/anillas-camiseta.jpg';
import anillasRotulo from '../assets/fotos/anillas-rotulo.jpg';
import canaGrifo from '../assets/fotos/cana-grifo.jpg';

const FOTOS: Record<string, { imagen: ImageMetadata; nombre: string; alt: string }> = {
  'perrito-estilo-salchi': {
    imagen: perritoEstiloSalchi,
    nombre: 'Perrito estilo Salchi (cartel rojo)',
    alt: 'Perrito estilo Salchi en su caja de cartón, con salsa, queso rallado y cebolla encurtida rosa, sobre fondo rojo.',
  },
  'perrito-queso': {
    imagen: perritoQueso,
    nombre: 'Perrito con queso y patatas paja',
    alt: 'Perrito con queso fundido, cebolla frita y patatas paja en su caja de cartón.',
  },
  'perritos-plato': {
    imagen: perritosPlato,
    nombre: 'Dos perritos en plato de peltre',
    alt: 'Dos perritos con queso, salsa y patatas paja sobre un plato de peltre.',
  },
  'perrito-camiseta': {
    imagen: perritoCamiseta,
    nombre: 'Perrito con la camiseta del bar',
    alt: 'Perrito estilo Salchi delante de una camiseta con el logotipo de La Salchichería.',
  },
  'anillas-camiseta': {
    imagen: anillasCamiseta,
    nombre: 'Anillas a la andaluza',
    alt: 'Plato de peltre con anillas a la andaluza bien doradas y alioli.',
  },
  'anillas-rotulo': {
    imagen: anillasRotulo,
    nombre: 'Anillas servidas con pinzas',
    alt: 'Unas pinzas sirven anillas a la andaluza en un plato de peltre.',
  },
  'cana-grifo': {
    imagen: canaGrifo,
    nombre: 'Caña tirándose del grifo',
    alt: 'Una caña tirándose del grifo, con la espuma subiendo.',
  },
};

export type FotoLista = { nombre: string; alt: string; src: string; srcset: string; miniatura: string };

/** Fotos ya optimizadas (WebP) con sus URL, para pintarlas igual en el servidor y en el navegador. */
export async function bibliotecaFotos(): Promise<Record<string, FotoLista>> {
  const salida: Record<string, FotoLista> = {};
  for (const [clave, f] of Object.entries(FOTOS)) {
    const anchos = await Promise.all([300, 480, 600].map((w) => getImage({ src: f.imagen, width: w, format: 'webp' })));
    salida[clave] = {
      nombre: f.nombre,
      alt: f.alt,
      src: anchos[2].src,
      srcset: anchos.map((a, i) => `${a.src} ${[300, 480, 600][i]}w`).join(', '),
      miniatura: anchos[0].src,
    };
  }
  return salida;
}
