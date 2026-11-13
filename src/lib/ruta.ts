/** Ruta interna respetando el `base` (en GitHub Pages la web vive en /<repo>/) */
export const ruta = (camino = '') => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${camino.replace(/^\//, '')}`;
