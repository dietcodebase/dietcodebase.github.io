# dietcode

A small, static landing page for dietcode. It uses plain HTML and CSS, with no build step or dependencies.

## Run locally

Open `index.html` in a browser, or serve this folder with any static file server.

## Publish with GitHub Pages

1. Push this repository to GitHub on the `main` branch.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select `main` and `/(root)`, then save.

GitHub Pages will publish the root `index.html`. The page and favicon use relative paths, so they work at a repository URL as well as a custom domain. See [GitHub Pages publishing source documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Bottle hero

The `codex/interactive-bottle` branch includes a Three.js printing scene. Serve the folder over HTTP (`python3 -m http.server 8000`) and open `http://localhost:8000`; browser ES modules require HTTP. Scroll through the opening section to scrub the bottle movement and logo transfer. Scroll backward to reverse it.

Three.js is vendored in `vendor/` with its MIT license. No package install or build step is required. Reduced-motion preferences show the resolved composition; WebGL creation failure removes the extended scroll stage.

The hero starts with visible copy and an outline wordmark, then fills the mark as the bottle crosses. The imprint uses `assets/wordmark.svg`; the bottle label uses a stacked wordmark matched to its typography. Rendering is event-driven and visibility-gated; cap ridges use instancing, shadows use a soft texture, and the imported bottle uses a lightweight glass and liquid material. Mobile render resolution is capped at 1.25×; desktop at 1.5×.


The supplied bottle model retains its original fitted label mesh. Its cap was simplified from 98,816 to 4,000 triangles, reducing the adapted model binary from about 3.1 MB to 405 KB.
