# Deployment

The Harvard Caf? is a static React/Vite site.

1. Run `npm install` (or `npm ci` for a reproducible lockfile install).
2. Run `npm run lint` and `npm run build`.
3. Inspect `dist/` with `npm run preview` at `/harvard-cafe-site/`.
4. When publication is intended, run `npm run deploy`. This runs the build and publishes `dist/` using `gh-pages`. Configure GitHub Pages to serve that branch.

Keep `base: '/harvard-cafe-site/'` in `vite.config.js` for the GitHub Pages demo. Import source media through Vite and use base-aware public asset links. Hash navigation, including `#/menu`, requires no server-side route handling.

The canonical and social URLs target `https://cafeharvard.co.za/`. They identify the intended production site, rather than the demo. The current build expects assets under `/harvard-cafe-site/`; a production host must serve that asset path as well as the root page. Check those paths before a separate production release. The social preview uses the existing NightGarden image copied to `public/social-preview.webp` for a stable URL.

Contact information and structured data must stay synchronized with `src/data/contact.js`. No publication occurs during local lint/build checks.
