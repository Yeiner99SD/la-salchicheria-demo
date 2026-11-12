# La Salchichería · Oeste 7 — demo de landing

**Demo en vivo:** https://yeiner99sd.github.io/la-salchicheria-demo/

Propuesta de landing para La Salchichería (Plaza del Oeste, 7 · Salamanca). Hacer scroll es como entrar al bar, guiado por Salchi, que se estira a medida que bajas.

> Es una **demo**: las fotos con la etiqueta "[Foto: …]", las reseñas entre corchetes y algunos precios son provisionales. La demo no se indexa en buscadores (`noindex`).

## Stack
Astro · Tailwind CSS v4 · GSAP + ScrollTrigger · Lenis. Web estática, mobile-first, con `prefers-reduced-motion` respetado.

## Desarrollo
```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/
```

Cada push a `main` se publica solo en GitHub Pages (`.github/workflows/deploy.yml`).
