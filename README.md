# Biznora Solutions — Landing Page

A modern, animated agency landing page built with **React + Vite + Tailwind CSS**.

## Project structure

```
biznora/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── public/
└── src/
    ├── main.jsx        # React entry point
    ├── App.jsx         # All page sections (Navbar, Hero, Services, etc.)
    └── index.css       # Tailwind directives + base styles
```

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the dev server:

   ```bash
   npm run dev
   ```

   Then open the printed local URL (usually `http://localhost:5173`).

3. Build for production:

   ```bash
   npm run build
   ```

   Output goes to the `dist/` folder.

4. Preview the production build locally:

   ```bash
   npm run preview
   ```

## Notes

- Tailwind is fully configured via `tailwind.config.js` / `postcss.config.js` — no CDN script needed.
- The "Inter" font is loaded from Google Fonts in `index.html`.
- All icons are inline SVGs (no icon library dependency).
- The contact form is front-end only (simulated submit) — wire it up to your backend or a service like Formspree to receive real submissions.
