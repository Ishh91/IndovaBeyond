# INDOVA BEYOND — React Website

A responsive dark corporate website built with React, Vite and CSS.

## Run locally

1. Install Node.js (18+ recommended).
2. Extract this ZIP.
3. Open the project folder in VS Code.
4. Open a terminal and run:

```bash
npm install
npm run dev
```

5. Open the local URL shown by Vite (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

## Customize

- Main website content: `src/App.jsx`
- Styling and responsive layout: `src/App.css`
- Night Earth transparent PNG: `src/assets/night-earth-globe.png`
- Change the email address `hello@indovabeyond.com` in `src/App.jsx` to your official email.
- The display font uses a Cinzel fallback with wide uppercase letter spacing. If you have a licensed Engrave Gothic font file, add it under `src/assets` and define it with `@font-face` in `src/App.css`.

The contact action currently opens an email draft; no backend or contact form API is connected.
