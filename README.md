# The Harvard Caf?

A responsive brochure site for The Harvard Caf? at Rand Airport, built with React and Vite.

## Development

Use a Node.js version supported by the installed Vite release (Node 22.12+ recommended).

```sh
npm install
npm run dev
npm run lint
npm run build
```

Vite serves the demo at `/harvard-cafe-site/`. Production build output is in `dist/`.

```sh
npm run deploy
```

This explicitly publishes `dist/` to the GitHub Pages branch; its predeploy script builds first. See [deployment notes](docs/DEPLOYMENT.md). The Vite base is `/harvard-cafe-site/` and must remain unchanged for this demo.

## Site sections

Header/navigation, hero video, quick contact links, Why Visit cards, category menu previews and accessible modal, daily specials and cocktail happy hour, gallery with Food carousel, functions/events enquiries, airport history, contact details, trading hours and map.

Section navigation uses anchor hashes. `#/menu` retains the compact menu page for existing links; `#/` shows the full site.

## Content and media

- Menu category navigation: `src/data/menuPreview.js`.
- Menu descriptions, prices, options and eligibility tags: `src/data/menuSnippets.js`.
- Contact details and trading hours: `src/data/contact.js`.
- Special definitions: `src/data/dailySpecials.js`; calculations: `src/utils/menuPricing.js`; Johannesburg timing: `src/utils/specialsDate.js`. The take-away offer is rendered in `src/components/SpecialsSection.jsx`.
- Shared image mapping: `src/data/imageMap.js`; gallery entries: `src/data/galleryImages.js`. Carousel image lists live in their components.
- Styling and responsive rules: `src/styles/global.css`.

Import site images from `src/images` so Vite fingerprints them and respects the base path. Keep optimized WebP photos and only referenced media; do not store editing backups or duplicate originals in the application. Public files are copied verbatim into `dist/`; use `%BASE_URL%` in HTML for public asset links. See [media conventions](docs/IMAGE_USAGE.md).

Static search/social metadata lives in `index.html`. The canonical production URL is `https://cafeharvard.co.za/`; check the production hosting path and metadata when preparing a production release.
