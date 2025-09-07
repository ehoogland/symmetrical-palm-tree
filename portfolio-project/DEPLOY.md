Deployment notes: serving build with json-server

This project uses an in-browser mock server for development and `json-server` as
an easy-to-run API for persisted favorites/ingredients when running a local
static site.

Quick workflow to build and serve with `json-server`:

1. Install json-server globally (or ensure it's available in `../json-server`):

   npm install -g json-server

2. Build the React app and copy the `build/` output into the `json-server/public`
   folder. The project includes an npm script that does this automatically:

   npm run serve-with-json-server

   What this does:
   - Runs `npm run build` to create `build/`.
   - Copies the contents of `build/` into `../json-server/public/` (creating
     the folder if necessary).
   - Changes directory into `../json-server` and starts `json-server --watch db.json --public public`.

3. Open http://localhost:3000 (or the port printed by json-server) to view the
   static app served from the `public/` folder while json-server responds to
   API requests (e.g., `/favorites` and `/ingredients`).

Notes and cautions
- The in-browser mock server used in development is gated by
  `process.env.NODE_ENV === 'development'` and will not run in production
  builds.
- The `serve-with-json-server` script assumes your json-server folder is a
  sibling of this project at `../json-server`. Adjust the path if your
  layout differs.
- If you prefer, run json-server separately and only copy the build output to
  whichever static server or CDN you use.
