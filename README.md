# Portfolio

A one-page portfolio built with Vue and Vite. A switch at the top flips it
between a clean modern design and a late-90s homepage.

## Edit

Your name, bio, contact info and projects are all in
[`src/content.js`](src/content.js). To use your own photo, put it in `public/`
(for example `public/me.jpg`) and set `photo: 'me.jpg'` in that file.

## Run locally

You need Node 24 or newer.

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

`npm run build` writes the site to `dist/` with relative paths, so it works from
any GitHub Pages folder. Pushing to `main` runs
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds and
publishes it. In the repo's **Settings → Pages**, set **Source** to
**GitHub Actions**.

Name the repo `<username>.github.io` to serve it at
`https://<username>.github.io/`, or anything else to serve it at
`https://<username>.github.io/<repo>/`.
