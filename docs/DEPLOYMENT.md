# The Harvard Cafe MVP Deployment

## Run the frontend locally

1. Install dependencies if needed:
   ```bash
   npm install
   ```
2. Start Vite:
   ```bash
   npm run dev
   ```
3. Open the local URL Vite prints, usually `http://localhost:5173`.

The frontend uses `VITE_API_BASE` when provided. Without it, API requests go to `/api`.

## Build the frontend

```bash
npm run build
```

Vite will create a `dist/` folder.

## Upload to cPanel

1. Upload the contents of `dist/` into the public web root, usually `public_html/`.
2. Upload the PHP `api/` folder into `public_html/api/`.
3. Make sure `public_html/api/config.php` contains the production database credentials.
4. Upload real image assets into `public_html/assets/images/` using the placeholder filenames referenced by the React app.

## Database setup

1. In cPanel, create a MySQL database.
2. Create a MySQL user and assign it to the database with the needed privileges.
3. Import `database/schema.sql` using phpMyAdmin or the cPanel MySQL tools.
4. Import `database/seed.sql` after the schema is created.
5. Edit `api/config.php`:
   ```php
   define('DB_HOST', 'localhost');
   define('DB_NAME', 'your_database_name');
   define('DB_USER', 'your_database_user');
   define('DB_PASS', 'your_database_password');
   ```

## API base configuration

For normal cPanel deployment where the site and API share the same domain, leave the frontend default as `/api`.

For a separate API domain during local testing, create a `.env` file:

```bash
VITE_API_BASE=https://example.com/api
```

Then rebuild the frontend.

## Admin route

The hidden dashboard is available at:

```text
/admin
```

The current login is a placeholder local unlock and must be replaced with real authentication before launch.
