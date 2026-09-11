# Media conventions

Import runtime images from `src/images` in JSX or data modules. Vite resolves, fingerprints and prefixes imported URLs for the demo base. Shared mappings live in `src/data/imageMap.js` and `src/data/galleryImages.js`; components also import their own photos.

Keep the active videos:

- `src/videos/HarvardFlyby-web.mp4`: hero.
- `src/videos/FoodAndDrinks.mp4`: Why Visit food card.
- `src/images/ApronSideAtmosphere.mp4`: Why Visit apron card.

The hero retains its immediate loading and poster. Why Visit attaches video sources within 200px of the section, plays both together, and pauses them when substantially offscreen or the document is hidden. Reduced-motion preferences suppress their playback. The Functions card and Food gallery have independent 2000ms carousel timers.

Use optimized WebP photos. Keep originals, alternate encodes and editing backups outside the application repository. Before deleting any media, scan imports, CSS URLs, HTML, data modules and documentation; resolve full paths to distinguish duplicate filenames. Preserve every referenced image, including existing filenames containing `placeholder`.

`public/favicon.svg` is the active favicon. `public/social-preview.webp` is a deliberate copy of the existing NightGarden photograph for a stable social metadata URL. Other site photos belong in `src/images`; `public/` is copied in full to the build. Keep image source/licence information alongside any future approved media additions.
