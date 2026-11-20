# Inventario de imágenes — La Salchichería

> Estado a 13/11/2026. Llegaron el SVG de Salchi (`marca/logo.svg`) y 14 exportaciones de Instagram en `/fotos`.
> Pendiente: logotipo con texto en vector y fotos de local, terraza, barra, sangría y clientes.

| Archivo | Qué muestra | Formato | Calidad | Capítulo |
|---|---|---|---|---|
| `marca/logo.jpg` | Salchi (solo el perro, sin el texto "la salchi chería · oeste 7"): línea roja sobre blanco, en forma de S, con gafas de sol. Cabeza arriba a la derecha, cola y patas traseras abajo a la izquierda. | Cuadrado 1:1, mucho margen blanco | Buena, pero **JPG rasterizado**: no sirve para separar cabeza y cola ni para estirar | Hilo conductor (todos) |
| `fotos/cocinero-camiseta.jpg` | Cocinero de espaldas en la cocina, camiseta blanca con Salchi grande en rojo, delantal negro, ollas de acero al fondo. Luz suave, sin flash. | Vertical 4:5 | Media-baja (resolución pequeña, ~480 px de ancho) | 1 · Comer bien (entrada: "la cocina") o 5 · Final |
| `fotos/carta_600ppp.png` | **Carta nueva (20/11/2026)**, en digital: Pintxos, Huerta, Los clásicos, Burger · Perritos · Brioche, Molletes, Carnes y Postres, con precios y alérgenos. Rojo sobre crema. | Vertical A4 (4958×7016) | Muy alta. Optimizada en `src/assets/fotos/carta-2026.jpg` (2600 px) | 1 · Comer bien (zoom por secciones) y fuente de `CARTA_COMPLETA` |
| `fotos/carta.jpg` | Carta antigua: hojas con anilla, PINTXOS, LOS CLÁSICOS, HUERTA y BLANCOS. | Vertical ~4:5 | Alta (3273×4096) | **Sin usar** desde el 20/11. Solo de ella salen los vinos blancos |
| `marca/ig-cocina-abierta.jpg` | Pieza gráfica de Instagram: cazos y espumaderas colgando, texto "COCINA ABIERTA · LUNES A DOMINGO" en rojo. | Vertical 4:5 | Buena | Referencia de estilo (tipografía). Posible uso en 0 · Portada o 5 · Final (horario) |

## Fotos reales en uso (originales en `/fotos`, optimizadas a 1200 px en `src/assets/fotos`)

| Original | En la web | Dónde |
|---|---|---|
| igexport-Debma64DRFm-2 | perrito-estilo-salchi.jpg | Cap. 1, destacado «Perrito estilo Salchi» · biblioteca de /admin · /propuesta-galeria |
| igexport-Ddjzz_7Cr9a-3 | anillas-camiseta.jpg | Cap. 1, destacado «Anillas» · biblioteca de /admin · /propuesta-galeria |
| igexport-DeoeTpMCJvP-2 | cana-grifo.jpg | Cap. 2, Cañas · biblioteca de /admin · /propuesta-galeria |
| igexport-DcwXqWRjrfA-4 | cartel-vinitos.jpg | Cap. 2, Vinitos · /propuesta-galeria |
| igexport-DfjzivZiHDO | perritos-plato.jpg | Biblioteca de /admin · /propuesta-galeria |
| igexport-DeoeTpMCJvP / Debma64DRFm | perrito-queso.jpg / perrito-camiseta.jpg | Biblioteca de /admin · /propuesta-galeria |
| igexport-Ddjzz_7Cr9a / -2 | anillas-rotulo.jpg / anillas-alioli.jpg | Biblioteca de /admin (solo anillas-rotulo) · /propuesta-galeria |
| igexport-DcwXqWRjrfA-3 / -2 | cartel-de-picar.jpg / cartel-canitas.jpg | /propuesta-galeria |
| igexport-DcqlX_qluNi | cartel-logotipo.jpg | Sin usar (logotipo con texto, en imagen) |
| igexport-DcqlX_qluNi-2 / -3 | — | Sin usar: historia del edificio (1943). El enfoque es la marca |

**Sin fotos a propósito:** la página `/carta` (solo productos y precios, desde el 17/11) y el capítulo 4 (solo reseñas).
La «biblioteca de /admin» son las fotos que se pueden asignar a un destacado (`src/data/fotos-destacados.ts`).

## Fotos provisionales en la web (sustituir cuando lleguen las reales)
Cada una es un `<FotoProvisional foto="…">`; basta con cambiarla por `<Picture src={…} alt="…" />`.

| Capítulo | Archivo | Foto que falta |
|---|---|---|
| 1 · Comer bien | Destacados (`src/data/destacados.ts`) | Croqueta, bravas y huevos rotos salen como plato vacío. Para darles foto: añadirla a `src/data/fotos-destacados.ts` y asignarla (en el panel o en `DESTACADOS_INICIALES`) |
| 2 · Beber mejor | BeberMejor.astro | Jarra de sangría |
| 3 · Pasear lo justo | PasearLoJusto.astro | Fachada desde la plaza · Barra con azulejo · Terraza en la Plaza del Oeste |
| Galería (propuesta) | propuesta-galeria.astro | 9 marcadores: local, sala, barra, terraza, ambiente |

Intenté bajar fotos libres (Openverse / Wikimedia Commons) como relleno, pero los servicios fallaron o limitaron las descargas; por eso se usan marcadores de marca.

## Datos útiles sacados de la carta
(La carta de partida de la web está en `src/data/carta.ts`, que se construye con `CARTA_COMPLETA` y `BEBIDAS` de `negocio.ts`. Lo que se edite en /admin no cambia estos archivos.)

La comida sale de la carta nueva (`fotos/carta_600ppp.png`); la transcripción completa está en `CARTA_COMPLETA`.
La carta nueva no trae bebidas: caña y sangría siguen sin precio, y los vinos blancos (Brezo 21 €, Piripa 23 €; el resto ilegible, ~15–22 €) salen de la carta antigua.
