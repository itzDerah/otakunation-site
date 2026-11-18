# otakunation-site

Corporate website for Otakunation. This repository currently contains the project
foundation only — no brand design, page sections, or content have been implemented yet.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Astro 7 (static output) |
| Language | TypeScript, strict config |
| Styling | Tailwind CSS 4 via `@tailwindcss/vite` |
| Icons | `@lucide/astro` (installed, not yet used) |

## Requirements

- Node.js `>=22.23.4` (enforced in `package.json` → `engines`)

## Commands

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static output in dist/
npm run preview   # serve the production build locally
```

## Status

- **Brand assets pending.** The crest, wordmark, colour palette, and Montserrat
  typography have not been supplied. The theme is intentionally neutral; no visual
  decisions are baked in.
- **Deployment not configured.** Cloudflare Pages is the intended host; wiring it up is
  deferred until the first real build exists.
- The placeholder favicon is Astro's default and is not final brand artwork.
