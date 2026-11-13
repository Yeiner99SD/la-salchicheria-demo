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

## Estado (13/11/2026)
- **Web completa:** portada + capítulos 1–5 + pie, y **/carta** (carta completa con precios, enlazada con el botón "Ver la carta completa" al terminar el capítulo 1). `npm run build` sin errores.
- **Demo publicada:** https://yeiner99sd.github.io/la-salchicheria-demo/ (repo público Yeiner99SD/la-salchicheria-demo). Cada push a `main` despliega con GitHub Actions; la demo lleva `noindex` (`PUBLIC_DEMO=true`). Enlaces internos con `ruta()` de `src/lib/ruta.ts` (respeta el `base`).
- **Salchi en SVG:** `marca/logo.svg` (copiado en `src/assets/marca/salchi.svg`) se incrusta con `Salchi.astro`: `parte="entero" | "cabeza" | "cola"` encuadra el MISMO trazado con el viewBox, sin redibujar. Color con `currentColor`. La barra (`SalchiRail.astro`) usa cabeza y cola. Favicon: `public/favicon.svg`.
- Falta el **logotipo con texto** en vector ("la salchi chería"): solo existe en imagen (`fotos/igexport-DcqlX_qluNi.jpg` → `src/assets/fotos/cartel-logotipo.jpg`, sin usar todavía).
- **Fotos reales** (de Instagram, optimizadas en `src/assets/fotos`): perritos, anillas, caña tirándose y carteles de marca (Cañitas, De picar, Vinitos). El resto siguen como `<FotoProvisional>`. Lista en `src/data/fotos.md`.
- **Ancho en móvil:** todo el contenido va dentro de `.lienzo` (recorta el sobrante horizontal; `hidden` de respaldo y `clip` donde se entiende). Las animaciones de entrada no deben desplazar en horizontal. `.con-rail` va fuera de `@layer` para ganar a `px-*`.
- **Reseñas:** marcadores `[Reseña real …]` en `src/data/negocio.ts`. No inventar opiniones.
- **Animación:** `src/scripts/movimiento.ts`. Sin animaciones con `prefers-reduced-motion`. Iconos en SVG (`Icono.astro`): no usar glifos → ↓ ★ en el texto (fuerzan fuentes del sistema y encarecen la primera maquetación).
- **Lighthouse móvil (local, Edge en Windows):** accesibilidad, buenas prácticas y SEO 100; rendimiento entre 75 y 94 según la pasada (mucho ruido local). Medir con PageSpeed Insights tras publicar.
