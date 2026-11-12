// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// En GitHub Actions (GitHub Pages) la web vive en https://<usuario>.github.io/<repo>/
// y se calcula sola a partir de GITHUB_REPOSITORY. En local y en el dominio definitivo, en la raíz.
const [owner, repo] = (process.env.GITHUB_REPOSITORY ?? '').split('/');
const enGitHubPages = Boolean(process.env.GITHUB_ACTIONS && owner && repo);

export default defineConfig({
  // TODO: cambiar por el dominio definitivo cuando lo haya (lo usan Open Graph y la URL canónica)
  site: enGitHubPages ? `https://${owner.toLowerCase()}.github.io` : 'https://lasalchicheria.example',
  base: enGitHubPages ? `/${repo}` : '/',
  vite: {
    plugins: [tailwindcss()],
  },
});
