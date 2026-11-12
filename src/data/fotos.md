# Inventario de imágenes — La Salchichería

> Estado a 11/11/2026. Las 4 imágenes se han movido y renombrado a `/fotos` y `/marca`.
> Pendiente de recibir el resto de fotos, las capturas de Instagram y el logo en vector.

| Archivo | Qué muestra | Formato | Calidad | Capítulo |
|---|---|---|---|---|
| `marca/logo.jpg` | Salchi (solo el perro, sin el texto "la salchi chería · oeste 7"): línea roja sobre blanco, en forma de S, con gafas de sol. Cabeza arriba a la derecha, cola y patas traseras abajo a la izquierda. | Cuadrado 1:1, mucho margen blanco | Buena, pero **JPG rasterizado**: no sirve para separar cabeza y cola ni para estirar | Hilo conductor (todos) |
| `fotos/cocinero-camiseta.jpg` | Cocinero de espaldas en la cocina, camiseta blanca con Salchi grande en rojo, delantal negro, ollas de acero al fondo. Luz suave, sin flash. | Vertical 4:5 | Media-baja (resolución pequeña, ~480 px de ancho) | 1 · Comer bien (entrada: "la cocina") o 5 · Final |
| `fotos/carta.jpg` | Carta en hojas con anilla: PINTXOS, LOS CLÁSICOS, HUERTA y BLANCOS (vinos), con precios. Salchi ilustrado sujetando un bocadillo. Tinta roja sobre papel blanco. | Vertical ~4:5, recortada sobre blanco | Alta (3273×4096). Pesa ~1 MB: hay que optimizar | 1 · Comer bien (carta) — y fuente de precios/textos |
| `marca/ig-cocina-abierta.jpg` | Pieza gráfica de Instagram: cazos y espumaderas colgando, texto "COCINA ABIERTA · LUNES A DOMINGO" en rojo. | Vertical 4:5 | Buena | Referencia de estilo (tipografía). Posible uso en 0 · Portada o 5 · Final (horario) |

## Fotos provisionales en la web (sustituir cuando lleguen las reales)
Cada una es un `<FotoProvisional foto="…">`; basta con cambiarla por `<Picture src={…} alt="…" />`.

| Capítulo | Archivo | Foto que falta |
|---|---|---|
| 1 · Comer bien | ComerBien.astro | Un plato por tarjeta de la galería (croqueta, bravas, anillas, huevos rotos, gilda, ensaladilla, alitas, costillas, tortilla) + perritos |
| 2 · Beber mejor | BeberMejor.astro | Caña tirándose del grifo (con flash) · Copas de vino blanco en la barra · Jarra de sangría |
| 3 · Pasear lo justo | PasearLoJusto.astro | Fachada desde la plaza · Barra con azulejo · Terraza en la Plaza del Oeste |
| 4 · Catadores | Catadores.astro | Clientes brindando con cañas · Cliente con un perrito |

Intenté bajar fotos libres (Openverse / Wikimedia Commons) como relleno, pero los servicios fallaron o limitaron las descargas; por eso se usan marcadores de marca.

## Datos útiles sacados de la carta
Pintxos: Gilda 2 € · Tortilla de patata 3 € · Jeta 2,50 € · Croqueta de jamón ibérico Belisario Barriga 1,50 €/ud.
Los clásicos: Bravas 6 € · Ensaladilla 6 € · Huevos rotos con paleta ibérica 8,50 € · Jeta 6 € · Anillas a la andaluza 7,20 € · Lágrimas de pollo 7,20 € · Fish & chips 12,50 € · Alitas 7,50 € · Costillas de cerdo 9,50 €.
Huerta: Carpaccio de tomate con miniburrata y pesto 7,50 € · Berenjena asada 7 € · Pimientos de Padrón 6 €.
Blancos (parcialmente legibles): ~15–23 € la botella.
