# La Salchichería · Oeste 7 — Landing page

Landing page para **La Salchichería**, un bar nuevo en la Plaza del Oeste, 7 (Salamanca).
Es una propuesta comercial (demo) para presentar al dueño: tiene que enamorar a la primera.

## Objetivo
Una landing de una sola página donde **hacer scroll sea una aventura**: como entrar al bar.
Protagonista: **Salchi**, el perro salchicha con gafas de sol de la marca, que **se estira a medida que el usuario hace scroll**.
Enfoque: **marca y personalidad**, no la historia del edificio.

## Stack
- **Astro** (última versión estable) + **Tailwind CSS v4** (plugin de Vite `@tailwindcss/vite`).
- Animación de scroll: **GSAP + ScrollTrigger** (gratuito) y **Lenis** para scroll suave.
- Imágenes: `astro:assets` (`<Image />` / `<Picture />`) para optimizar a AVIF/WebP.
- Sin frameworks de UI (React/Vue) salvo que sea imprescindible. JS mínimo y en islas.
- Despliegue previsto: estático (Netlify / Vercel / Cloudflare Pages).

## Estructura de carpetas
```
/fotos        → fotos originales del bar (NO modificar; copiar optimizadas a src/assets/fotos)
/marca        → logo, capturas de Instagram, manual de marca si llega
/src/assets   → imágenes usadas por la web
/src/components, /src/layouts, /src/pages, /src/data
```

## Identidad de marca (deducida de su Instagram @lasalchicheria7)
- **Paleta:** rojo intenso de marca `#DF0B27` (muestreado del logo y de Instagram; token `rojo`) y blanco. Nada más como colores de marca.
  - Acentos que vienen de las fotos, usar con moderación: azul del borde de los platos de peltre (aprox. `#1E2F8F`), dorado cerveza, blanco roto de azulejo y verde de junta.
- **Tipografía (deducida de la carta y de Instagram):**
  1. Logotipo "la salchi chería · oeste 7": NO recrearlo, usar el archivo del logo (pendiente de recibir).
  2. Grotesca muy bold, MAYÚSCULAS ("COCINA ABIERTA", nombres de plato) → **Archivo Black** (`font-titular`).
  3. Condensada, MAYÚSCULAS ("LUNES A DOMINGO", titulares gigantes) → **Anton** (`font-condensada`).
  4. Monoespaciada con aire de ticket (descripciones, precios, horario) → **Space Mono** (`font-mono`).
  5. Rotulado a mano para títulos de sección ("PINTXOS", "HUERTA") → **Permanent Marker** (`font-mano`), provisional.
  Fuentes autoalojadas con @fontsource. Si llega el manual de marca, sus fuentes mandan.
- **Tono de voz:** de colega, tuteo/vosotros, humor seco y corto. Frases reales de la marca:
  - "Hambre no vais a pasar · Sed tampoco"
  - "Comer bien | Beber mejor | Pasear lo justo"
  - "La vida según Salchi"
  - "¿Hacéis reservas? No, solo tienes que venir. Según llegas te hacemos hueco."
- **Fotografía:** directa, con flash, manos y producto (perritos, croquetas, anillas a la andaluza, cañas tirándose, platos de peltre).
- **Recursos gráficos:** fondos rojos planos, ilustraciones de línea blanca, textos repetidos en patrón (tipo "DESLIZA DESLIZA DESLIZA").

## Datos del negocio
- Dirección: Plaza del Oeste, 7 · 37007 Salamanca
- Horario: Lunes a jueves 12:00–16:00 y 19:00–23:30 · Viernes a domingo 12:00–23:30
- **No hacen reservas.** El CTA principal NO es "Reservar".
- Instagram: https://www.instagram.com/lasalchicheria7/
- Carta con precios: sacada de `fotos/carta.jpg` → `src/data/negocio.ts`. Faltan teléfono y precios de perritos (marcadores `[TELÉFONO]`, `[PRECIO]`).

## Reglas
- **Salchi y el logo:** usar SOLO los archivos de `/marca`. No redibujar ni inventar versiones del personaje. Para el efecto de estirar, separar la cabeza y la cola del SVG oficial y estirar entre ambas un "cuerpo" (trazo/rectángulo en rojo de marca). Si solo hay PNG, avisar y pedir el vector antes de improvisar.
- Toda la web en **español de España**.
- **Mobile-first**: la mayoría de visitas llegan desde Google Maps o Instagram en el móvil. Probar a 375 px.
- Respetar `prefers-reduced-motion`: sin scroll animado y con contenido visible igual.
- Rendimiento: Lighthouse ≥ 90 en móvil. Lazy-load de fotos fuera de pantalla. Sin imágenes de más de 300 KB en web.
- Accesibilidad: contraste AA, `alt` descriptivo en todas las fotos, navegación por teclado.
- SEO local: `title`/`meta description`, Open Graph y JSON-LD `BarOrPub` con dirección y horario.
- Indicador **"¿Estamos abiertos ahora?"** calculado con el horario en zona horaria `Europe/Madrid`.
- Antes de dar algo por terminado: ejecutar `npm run build` sin errores y revisar en móvil y escritorio.

## Estado (16/11/2026)
- **Publicado el 16/11/2026:** `main` incluye la rama `ajustes-16-nov`, aprobada por el usuario. La base es la versión limpia del commit `1cc3bf9` (portada con Salchi en SVG + lema y capítulos tal como estaban), a la que se volvió el 16/11 tras descartar un rediseño más recargado.
- **Criterio de diseño:** mejorar SOBRE esta versión, con cambios pequeños y acordados antes. No recargar: nada de patrones de fondo, sellos, cintas entre capítulos, pegatinas ni barras fijas sin pedirlo. No rehacer la portada ni la estructura de los capítulos.
- **Rama `respaldo-rediseno-15-nov`** (solo local, sin publicar): guarda lo descartado, por si se quiere recuperar alguna pieza suelta con `git checkout respaldo-rediseno-15-nov -- <ruta>`:
  - 13/11: logotipo "la Salchi chería" en la portada (`logotipo-blanco.png`), capítulo 4 "Así se vive" con fotos de Instagram, galería solo con platos con foto, `Dato.astro` (datos pendientes como etiqueta con lápiz) y `presentacion/qr-demo.png` (cartel con QR a la demo).
  - 15/11: rediseño visual completo (patrón en portada, `Sello.astro`, `Cinta.astro`, pared de azulejo en el capítulo 3, `BarraAcciones.astro`).
- **Cambios del 16/11 (rama `ajustes-16-nov`, ya en `main`).** Para lo siguiente: trabajar en una rama nueva y no hacer merge ni push a `main` sin aprobación, porque cada push despliega la demo.
  - Portada: «Ver carta» es el botón primario (a `/carta`), «Cómo llegar» el secundario. Frase de Salchi como anfitrión (`FRASE_SALCHI` en `negocio.ts`: «Soy Salchi. Tú baja, que yo me estiro.», elegida por el usuario). La franja «DESLIZA» en bucle se sustituyó por un texto estático con flecha (`.baja-suave`, quieta con movimiento reducido).
  - Capítulo 4 (`Catadores.astro`): solo reseñas, sin fotos. Tarjetas con texto, autor, «Google» con icono y fecha opcional. Datos en `RESENAS` (`negocio.ts`). Botón «Déjanos tu opinión en Google» → `enlaceResena` (usa `ENLACE_RESENA_GOOGLE` si ya es una URL; si no, la ficha de Maps). La entrada animada pasó de «posavasos que caen» a una subida suave.
  - Ticket final: solo Salchi en SVG (se quitó el cartel «Cocina abierta»).
  - Pie (`Pie.astro`): frases de marca en bloque estático (antes marquesina) + marca, Instagram con icono, dirección con enlace a Maps, teléfono, horario (de `src/lib/horario.ts`) y © con el año de compilación.
  - `Icono.astro`: nuevos `instagram`, `google` y `pin`. `Base.astro`: prop `noindex`.
  - **`/propuesta-galeria`**: propuesta de galería, con `noindex`, etiqueta «Propuesta · pendiente de aprobación» y sin enlaces desde ninguna otra página. 13 fotos reales + 9 `<FotoProvisional>`.
  - Ya no queda ningún texto en bucle. La clase `.marquesina` sigue en `global.css` pero no se usa.
  - Capítulos 2, 3 y cabecera del 5: comprobados idénticos píxel a píxel respecto a `main`.
  - **Salchi que se estira de verdad** (`SalchiLargo.astro` + `SalchiDibujo.astro`): el dibujo oficial se muestra tres veces recortado por una línea horizontal (y = 606, por encima de la cola): arriba (cabeza), una rebanada de 1 unidad estirada en vertical (el cuerpo que crece) y abajo (patas y cola). El trazado NO se edita: solo se encuadra con viewBox. El usuario autorizó este corte **solo para la demo**; pedirá al estudio a Salchi en piezas (cabeza, cuerpo repetible, patas) y entonces se sustituyen los tres `<svg>`. Se controla con `--estira` (0→1) y `--largo`. Colores: `--salchi-tinta` y `--salchi-relleno`.
    - Barra (`SalchiRail.astro`): la **cabeza queda arriba y las patas bajan** con el scroll (antes: chapa de cola arriba y chapa de cabeza abajo). Línea roja con interior blanco.
    - Portada: al bajar, la cabeza sube con la página y las patas se quedan atrás (cuerpo hasta `70vh`), con relleno rojo para tapar el texto por el que pasa.
    - Arreglado el Salchi semitransparente al volver arriba: la animación de scroll usaba `gsap.to` con `autoAlpha` y tomaba como partida la opacidad de media entrada. Ahora solo anima `--estira` con `fromTo`.
  - **«Como Dios manda» = destacados que elige el bar.** Datos y formato en `src/data/destacados.ts` (`Destacado`: nombre, desc, precio, etiqueta Top/Promo/Nuevo, foto, visible; el orden es el de la lista). Fotos asignables en `src/data/fotos-destacados.ts`. Tarjeta: `TarjetaDestacado.astro` (también sirve de `<template>` para el navegador).
  - **`/admin` (panel de PRUEBA, sin autenticación, `noindex`, sin enlaces):** añadir de la carta o en blanco, editar, etiquetar, elegir foto, ocultar, reordenar, quitar y restaurar. Guarda en `localStorage` (`CLAVE_ALMACEN`): **los cambios solo se ven en el navegador donde se hacen**. `src/scripts/destacados.ts` aplica la lista guardada en la portada y debe importarse ANTES de `movimiento.ts` (la galería mide las tarjetas al montarse). Para producción falta: contraseña, guardar en servidor y subida de fotos.
  - **Reseñas reales:** 5 de la ficha de Google del bar actual, pasadas por el usuario en capturas el 16/11 y copiadas literalmente (con sus erratas) en `RESENAS`. Las fechas relativas («hace un mes») se pasaron a mes y año. Ojo: lo que hay en internet en agregadores son reseñas de la etapa anterior del local (café cultural, desde 2014): no usar. Google Maps no deja leer las del bar nuevo desde fuera; las pasa el usuario.
  - `presentacion/la-web-explicada.md`: explicación de la web para el dueño, sin tecnicismos. Actualizarla si cambia la estructura.
  - Si `npm run dev` muestra `/admin` sin estilos, reiniciarlo (no registró las clases de la página nueva). La versión compilada está bien.
- **Web completa:** portada + capítulos 1–5 + pie, y **/carta** (carta completa con precios, enlazada con el botón "Ver la carta completa" al terminar el capítulo 1). `npm run build` sin errores.
- **Demo publicada:** https://yeiner99sd.github.io/la-salchicheria-demo/ (repo público Yeiner99SD/la-salchicheria-demo). Cada push a `main` despliega con GitHub Actions; la demo lleva `noindex` (`PUBLIC_DEMO=true`). Enlaces internos con `ruta()` de `src/lib/ruta.ts` (respeta el `base`).
- **Salchi en SVG:** `marca/logo.svg` (copiado en `src/assets/marca/salchi.svg`) se incrusta con `Salchi.astro`: `parte="entero" | "cabeza" | "cola"` encuadra el MISMO trazado con el viewBox, sin redibujar. Color con `currentColor`. La barra (`SalchiRail.astro`) usa cabeza y cola. Favicon: `public/favicon.svg`.
- Falta el **logotipo con texto** en vector ("la salchi chería"): solo existe en imagen (`fotos/igexport-DcqlX_qluNi.jpg` → `src/assets/fotos/cartel-logotipo.jpg`, sin usar todavía).
- **Fotos reales** (de Instagram, optimizadas en `src/assets/fotos`): perritos, anillas, caña tirándose y carteles de marca (Cañitas, De picar, Vinitos). El resto siguen como `<FotoProvisional>`. Lista en `src/data/fotos.md`.
- **Ancho en móvil:** todo el contenido va dentro de `.lienzo` (recorta el sobrante horizontal; `hidden` de respaldo y `clip` donde se entiende). Las animaciones de entrada no deben desplazar en horizontal. `.con-rail` va fuera de `@layer` para ganar a `px-*`.
- **Reseñas:** solo reales, en `RESENAS` (`src/data/negocio.ts`). No inventar opiniones.
- **Animación:** `src/scripts/movimiento.ts`. Sin animaciones con `prefers-reduced-motion`. Iconos en SVG (`Icono.astro`): no usar glifos → ↓ ★ en el texto (fuerzan fuentes del sistema y encarecen la primera maquetación).
- **Lighthouse móvil (local, Edge en Windows):** accesibilidad, buenas prácticas y SEO 100; rendimiento entre 75 y 94 según la pasada (mucho ruido local). Medir con PageSpeed Insights tras publicar.

## Pendiente
- **Del dueño:** precios de perritos, caña y sangría · carta de perritos · teléfono · resto de vinos (en la foto se intuyen blancos de 15, 18 y 22 €) · logotipo con texto en SVG · reseñas reales · fotos de local, terraza, barra, sangría, clientes y platos de la galería · dominio definitivo (al pasar a él, quitar `noindex` y cambiar `site` en `astro.config.mjs`).
- **Del usuario:** pedir al estudio a Salchi en piezas · pasar el enlace `[ENLACE_RESEÑA_GOOGLE]` · aprobar (o no) la propuesta de galería · decidir si la reseña de «BONSAI EN CORTO» se queda (pone dos pegas y nombra una hamburguesa que no está en la carta transcrita).
- **Ideas a futuro (no desarrollar aún):** foto real de la carta completa con zoom por secciones · que el bar elija los productos destacados de «Como Dios manda» (prioridad, ofertas, novedades).
- **Mejoras propuestas, sin decidir:** tilde cortada en los títulos grandes ("ASÍ") · aprovechar mejor el espacio en escritorio (vaso y galería) · huecos visibles (`[PRECIO]`, `[Foto pendiente]`, `[Reseña real…]`, platos vacíos de la galería) · capítulo 3 hecho de marcadores de foto · QR para la presentación.
- **Por probar:** la demo en iPhone (Safari) y en el navegador de Instagram; PageSpeed Insights sobre la URL publicada.
