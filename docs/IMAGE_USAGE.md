# Image Usage

## Storage location

The source image pack currently found in this workspace lives in:

```text
src/images/00_web_ready/
```

If a future pack is added at `src/images/web-ready/`, copy the web-ready image files into the public folder below before using them in the React site.

All images that the website serves in Vite must live in:

```text
public/assets/images/
```

The current React image mapping is defined in:

```text
src/data/imageMap.js
```

## Public image paths in Vite

Files placed inside `public/` are served from the site root. Do not import these images through JavaScript.

Use paths like:

```js
"/assets/images/hero_rand_airport_northwest_apron.webp"
```

This works in local Vite development and after the production build is uploaded to cPanel.

## Current image mapping

- Hero: `hero_rand_airport_northwest_apron.webp`
- Offerings: breakfast, burgers, coffee, shared table food, Harvard aircraft, and function table images.
- Menu: breakfast, burgers, steak, fish and chips, and coffee images assigned by item type.
- Daily specials: breakfast, burger, steak, and table food images.
- Functions: `function_elegant_dinner_table_placeholder.webp`
- Gallery: mixed food, aircraft, apron, event, Rand Airport, and aviation heritage placeholders.
- Rand Airport History: `rand_airport_sign_biplane.webp`
- Airshow / Events: `saaf_harvard_trainer_7024.webp`
- Contact / Location: `rand_airport_control_tower_landside.webp`

## Placeholder status

The current filenames are wired into the MVP, but final launch assets should replace them with official or approved photography:

- Harvard Cafe logo and official brand artwork.
- Real menu item photos.
- Apron seating and aircraft atmosphere photos.
- Restaurant interior and exterior photos.
- Rand Airport / SAA Museum / aviation heritage imagery with verified rights.
- Event and function photos from approved sources.

## Licence and source notes

Keep licence, source, photographer, and usage notes from the image pack with the project. Before launch, confirm that every image is original, licensed, client-approved, or otherwise safe to publish.
