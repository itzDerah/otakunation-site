/**
 * GitHub Pages serves this project under `/<repository>/`, while local
 * development serves it from `/`. Use this helper for every file in `public/`
 * so the same markup works in both environments.
 */
const base = import.meta.env.BASE_URL.endsWith("/")
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

/** Prefix a public asset path with Astro's configured base path. */
export function asset(path: string): string {
  if (/^(?:[a-z]+:)?\/\//i.test(path) || path.startsWith("data:")) return path;
  return `${base}${path.replace(/^\/+/, "")}`;
}

/** Prefix an application route with Astro's configured base path. */
export function withBase(pathname: string): string {
  if (pathname === base.slice(0, -1) || pathname.startsWith(base)) return pathname;
  return `${base}${pathname.replace(/^\/+/, "")}`;
}
