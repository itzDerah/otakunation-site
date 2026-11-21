// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// GitHub Pages project sites are served from /<repository>/, not the domain root.
// Local development keeps the root path so the existing preview URLs still work.
const isGitHubPages = process.env.DEPLOY_TARGET === 'github-pages';
const [owner, repository] = (process.env.GITHUB_REPOSITORY ?? '').split('/');

// https://astro.build/config
export default defineConfig({
  site: isGitHubPages && owner ? `https://${owner.toLowerCase()}.github.io` : undefined,
  base: isGitHubPages && repository ? `/${repository}` : undefined,
  vite: {
    plugins: [tailwindcss()]
  }
});
