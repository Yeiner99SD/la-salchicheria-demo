# Inventario de imágenes — La Salchichería

> Estado a 13/11/2026. Llegaron el SVG de Salchi (`marca/logo.svg`) y 14 exportaciones de Instagram en `/fotos`.
> Pendiente: logotipo con texto en vector y fotos de local, terraza, barra, sangría y clientes.

| Archivo | Qué muestra | Formato | Calidad | Capítulo |
|---|---|---|---|---|
| `marca/logo.jpg` | Salchi (solo el perro, sin el texto "la salchi chería · oeste 7"): línea roja sobre blanco, en forma de S, con gafas de sol. Cabeza arriba a la derecha, cola y patas traseras abajo a la izquierda. | Cuadrado 1:1, mucho margen blanco | Buena, pero **JPG rasterizado**: no sirve para separar cabeza y cola ni para estirar | Hilo conductor (todos) |
| `fotos/cocinero-camiseta.jpg` | Cocinero de espaldas en la cocina, camiseta blanca con Salchi grande en rojo, delantal negro, ollas de acero al fondo. Luz suave, sin flash. | Vertical 4:5 | Media-baja (resolución pequeña, ~480 px de ancho) | 1 · Comer bien (entrada: "la cocina") o 5 · Final |
| `fotos/carta.jpg` | Carta en hojas con anilla: PINTXOS, LOS CLÁSICOS, HUERTA y BLANCOS (vinos), con precios. Salchi ilustrado sujetando un bocadillo. Tinta roja sobre papel blanco. | Vertical ~4:5, recortada sobre blanco | Alta (3273×4096). Pesa ~1 MB: hay que optimizar | 1 · Comer bien (carta) — y fuente de precios/textos |
| `marca/ig-cocina-abierta.jpg` | Pieza gráfica de Instagram: cazos y espumaderas colgando, texto "COCINA ABIERTA · LUNES A DOMINGO" en rojo. | Vertical 4:5 | Buena | Referencia de estilo (tipografía). Posible uso en 0 · Portada o 5 · Final (horario) |

## Fotos reales en uso (originales en `/fotos`, optimizadas a 1200 px en `src/assets/fotos`)

| Original | En la web | Dónde |
|---|---|---|
| igexport-Debma64DRFm-2 | perrito-estilo-salchi.jpg | Cap. 1, primera tarjeta de la galería |
| igexport-Ddjzz_7Cr9a-3 | anillas-camiseta.jpg | Cap. 1, plato "Anillas a la andaluza" |
| igexport-DeoeTpMCJvP-2 | cana-grifo.jpg | Cap. 2, Cañas |
| igexport-DcwXqWRjrfA-4 | cartel-vinitos.jpg | Cap. 2, Vinitos |
| igexport-DfjzivZiHDO | perritos-plato.jpg | Cap. 4, posavaso de foto |
| igexport-DeoeTpMCJvP / Debma64DRFm | perrito-queso.jpg / perrito-camiseta.jpg | /carta, Perritos |
| igexport-Ddjzz_7Cr9a / -2 | anillas-rotulo.jpg / anillas-alioli.jpg | /carta, Los clásicos |
| igexport-DcwXqWRjrfA-3 / -2 | cartel-de-picar.jpg / cartel-canitas.jpg | /carta, Pintxos y Para beber |
| igexport-DcqlX_qluNi | cartel-logotipo.jpg | Sin usar (logotipo con texto, en imagen) |
| igexport-DcqlX_qluNi-2 / -3 | — | Sin usar: historia del edificio (1943). El enfoque es la marca |

## Fotos provisionales en la web (sustituir cuando lleguen las reales)
Cada una es un `<FotoProvisional foto="…">`; basta con cambiarla por `<Picture src={…} alt="…" />`.

| Capítulo | Archivo | Foto que falta |
|---|---|---|
| 1 · Comer bien | ComerBien.astro | Platos de la galería: croqueta, bravas, huevos rotos, gilda, alitas, costillas (se añaden en `FOTOS` del componente) |
| 2 · Beber mejor | BeberMejor.astro | Jarra de sangría |
| 3 · Pasear lo justo | PasearLoJusto.astro | Fachada desde la plaza · Barra con azulejo · Terraza en la Plaza del Oeste |
| 4 · Catadores | Catadores.astro | Clientes brindando con cañas |

Intenté bajar fotos libres (Openverse / Wikimedia Commons) como relleno, pero los servicios fallaron o limitaron las descargas; por eso se usan marcadores de marca.

## Datos útiles sacados de la carta
Pintxos: Gilda 2 € · Tortilla de patata 3 € · Jeta 2,50 € · Croqueta de jamón ibérico Belisario Barriga 1,50 €/ud.
Los clásicos: Bravas 6 € · Ensaladilla 6 € · Huevos rotos con paleta ibérica 8,50 € · Jeta 6 € · Anillas a la andaluza 7,20 € · Lágrimas de pollo 7,20 € · Fish & chips 12,50 € · Alitas 7,50 € · Costillas de cerdo 9,50 €.
Huerta: Carpaccio de tomate con miniburrata y pesto 7,50 € · Berenjena asada 7 € · Pimientos de Padrón 6 €.
Blancos (parcialmente legibles): ~15–23 € la botella.
