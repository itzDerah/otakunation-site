# Homepage — Milestone 2

The corporate homepage is composed in `src/pages/index.astro` from typed Astro sections.
It is a static, pre-launch marketing page: it explains the vision and the six planned
ecosystem areas without implying that registration, recruitment or the platform itself is
live.

## Composition

| Order | Section / anchor | Component | Purpose |
| --- | --- | --- | --- |
| — | `#top` | `nav/SiteHeader.astro` | Sticky masthead, theme toggle, primary CTA, mobile disclosure |
| 1 | hero (no id) | `home/Hero.astro` | Wordmark, positioning statement, status, plan pillars, crest stage |
| 2 | `#vision` | `home/Vision.astro` | What Otakunation is being built for |
| 3 | `#ecosystem` | `home/Ecosystem.astro` + `EcosystemCard.astro` | Six planned areas, all marked “Planned” |
| 4 | `#about` | `home/About.astro` | Story, nation seal, African foundation band |
| 5 | `#news` | `home/News.astro` | Verified-updates empty state and planned categories |
| 6 | `#opportunities` | `home/Opportunities.astro` | Four future participation lanes, all “Not yet open” |
| 7 | `#community` | `home/CommunityCta.astro` | “Join the Nation” CTA with registration status |
| 8 | `#contact` | `nav/SiteFooter.astro` | Contact status, ecosystem links, legal/social pending states |

Ecosystem cards also have stable deep links: `#ecosystem-anime`,
`#ecosystem-community`, `#ecosystem-guilds`, `#ecosystem-creators`,
`#ecosystem-gaming` and `#ecosystem-marketplace`.

## Navigation and calls to action

- Primary nav: Home (`#top`), About (`#about`), Ecosystem (`#ecosystem`),
  News & Updates (`#news`), Opportunities (`#opportunities`), Contact (`#contact`).
- Header CTA: “Explore the Nation” → `#ecosystem`.
- Hero CTAs: “Explore the ecosystem” → `#ecosystem`; “Read our story” → `#about`.
- Community CTAs resolve from config: with no registration URL, they are
  “Explore the ecosystem” → `#ecosystem` and “Update status” → `#news`.
- All links are either working homepage anchors or resolve to a clearly pending state.
  There are no invented routes, emails, social profiles or legal pages.

The full nav appears at `lg` (1024px). Between 1024 and 1279px a compact tier tightens
padding and type so all six links and the CTA fit. Below 1024px the menu is a native
`<details>` disclosure; it closes on link selection, outside click and Escape, and returns
focus to the summary when Escape is used. Resizing up to the desktop header also closes it.

## Content rules

- Every ecosystem area says **Planned**. No feature is described as available.
- News contains no articles, dates, milestones or achievements. The page states that
  nothing is published until it is verified.
- Opportunities lists future lanes only, with “Not yet open” badges and no application
  form, deadline or selection process.
- Contact and social copy explicitly say that verified channels are not published yet.
- Africa is presented as the brand's foundation, not as a claim about staff, offices,
  metrics or partners.
- The hero artwork uses the official crest plus CSS/SVG geometry. No third-party anime
  artwork, characters or studio assets are used.

## Configuration

All editable site-level values live in `src/data/site.ts`; ecosystem copy lives in
`src/data/ecosystem.ts`.

| Value | Current state | Effect |
| --- | --- | --- |
| `site.community.registrationUrl` | `null` | Shows registration-pending status and anchor CTAs |
| `site.contact.email` | `null` | No `mailto:` link is rendered |
| `site.socials` | `[]` | Footer says no verified social channels are published |
| `site.legal.privacyUrl` / `termsUrl` | `null` | Footer shows “pending” text instead of dead links |
| `site.seo.ogImage` | `/og/og-default.jpg` | Social preview image (1200×630) |
| `ecosystemAreas[].status` | `"Planned"` | Badge on every ecosystem card |

Set these values only when the destinations are official and verified. When
`registrationUrl` is set, the community CTA automatically becomes “Join the Nation” and
opens the configured destination.

## SEO and metadata

`BaseLayout.astro` renders:

- a complete title and description;
- Open Graph (`og:type`, `og:site_name`, title, description, image, image dimensions,
  image alt, locale);
- Twitter/X `summary_large_image` tags;
- favicon, 192px icon and Apple touch icon;
- `theme-color` updated with the active theme.

`astro.config.mjs` sets `site` and `base` only when `DEPLOY_TARGET=github-pages`, which
the Pages workflow provides. Local development therefore keeps root-relative URLs, while
the deployed build emits:

- canonical URL `https://itzderah.github.io/otakunation-site/…`;
- `og:url` and absolute Open Graph/Twitter image URLs;
- base-prefixed favicons, crest images, fonts, CSS and in-site links.

`src/utils/paths.ts` centralises the prefixing: `asset()` for `public/` files and
`withBase()` for routes. New components must use these helpers rather than hard-coding
`/…`, otherwise links break under the project Pages path.

The production domain is not yet confirmed. GitHub Pages is the current **preview**
hosting target; when the real domain is agreed, update `astro.config.mjs` and add
`@astrojs/sitemap` plus a `Sitemap:` line in the generated `robots.txt`.

`src/pages/robots.txt.ts` allows the site and disallows the styleguide route using the
configured base path (`/styleguide` locally, `/otakunation-site/styleguide` on Pages).
The styleguide also carries `noindex, nofollow` and is not linked from the homepage.

## Verified checks

Run against the production build (`npm run build`) on the local static server:

| Area | Result |
| --- | --- |
| Build | Passes; 2 static pages (`/` and `/styleguide/`) |
| Layout | No horizontal overflow at 320, 360, 390, 768, 1024 or 1440px, dark and light |
| Scrolling | No nested vertical scroll containers |
| Console / network | No console errors, page errors, failed requests or 4xx/5xx responses |
| Navigation | All in-page anchors resolve; no `href="#"`; no links to unknown routes |
| Mobile menu | Opens; closes on link, outside click and Escape; Escape restores summary focus |
| Theme | Defaults to dark; toggle persists across reload; `theme-color` updates |
| Reduced motion | Orbital animation disabled and smooth scroll removed |
| Keyboard | Skip link focuses `#main`; focus ring visible on interactive controls |
| Images | All crest instances load; every image has an `alt` attribute |
| Accessibility | axe-core WCAG 2.1/2.2 A + AA: 0 violations on `/` and `/styleguide/`, both themes |
| Metadata | Title, description, OG, Twitter, favicons and robots rules present |
| Social image | `/og/og-default.jpg` returns 200, JPEG, 1200×630 |

axe reports contrast over textured or gradient backgrounds as “incomplete”; those panels
were checked manually. Decorative, `aria-hidden` artwork includes intentionally low-contrast
watermark numerals that are exempt from text-contrast requirements.

## Local preview

```bash
npm install
npm run dev                 # http://localhost:4321
npm run build && npm run preview
```

The deployed preview is <https://itzderah.github.io/otakunation-site/>, built by
`.github/workflows/deploy-pages.yml`. To reproduce its `/otakunation-site/` base path
locally, build with the same environment as the workflow:

```bash
DEPLOY_TARGET=github-pages \
GITHUB_REPOSITORY=itzDerah/otakunation-site \
GITHUB_REPOSITORY_OWNER=itzDerah \
npm run build
```

## Production checklist

1. Replace the GitHub Pages preview with the confirmed production domain, then verify the
   canonical URL and absolute OG image URL in the built HTML. Keep the Pages workflow for
   previews or move it to a separate public repository if the source stays private.
2. Remove or gate `src/pages/styleguide.astro`; keep the robots disallow only as a
   temporary defence.
3. Add a sitemap integration and the corresponding `Sitemap:` robots entry.
4. Replace pending config values only with verified official destinations.
5. Re-run the link, theme, responsive, reduced-motion and axe checks against the deployed
   URL, including a real social-card preview. The Pages build must keep every asset under
   `/otakunation-site/` until the production domain replaces the project path.
6. Obtain brand approval for the compact masthead lockup, sampled palette and raster
   crest, or replace them with approved vector masters.
