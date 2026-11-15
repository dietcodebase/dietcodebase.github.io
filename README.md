# Diet Code — Tear Open

A static studio website with a photographic halftone bottle, an interactive cap, and a native, reversible torn-paper transition into OOTD.

## Run locally

Requires Node20.19+ or22.12+ and Playwright Chromium (`npx playwright install chromium` if missing).

```sh
npm ci
npm run dev
```

## Verify

```sh
npm test
npm run build
npm run verify
node scripts/verify-built.mjs
node scripts/verify-preview.mjs
```

`verify` starts and closes its own Vite server and headless Chromium. It runs 122 acceptance checks across six viewports. It checks desktop/mobile, cap replay, pointer cancellation, native touch scrolling, equal forward/reverse paper poses, keyboard focus, reduced motion, no-JS flow, asset failure and visible team names. It saves screenshots, motion video and a JSON report to `screenshots/tear-open/`. The preview verifier adds 101 checks across five sizes for garment selection, variation, focus, saving, reload, reset and unavailable storage. Pure state helpers have 13 tests.

## Content and assets

OOTD is the only project, an iOS wardrobe app in development. Its garment imagery comes from the supplied WardrobeAI repository. No product interface or release claims are fabricated. The contact address is dietcode@sike.dev.

The case study contains a working, explicitly labelled idea study using six example garments. Visitors can lock a starting piece, vary the combination, and keep one look in this browser. Only validated example garment IDs are stored under `dietcode.ootd-preview.v1`; reset removes only that key. If storage is unavailable, the look lasts for the current visit. This study is separate from the native app, whose source is unchanged.

Asset sources and font licences are documented in `docs/assets/README.md`. The bottle's lettering is baked into the art and rotates with it. The body uses a matched open-mouth version of the master; the cap is clipped from the original, with the same registration. Production assets live in `public/assets/`; no user-home paths are used at runtime.

The motion system uses separate layers: native scroll controls the outer scene, while hover, drag and manually activated cap animation control inner layers. Scroll-owned poses depend only on current normalized scroll position. Reduced-motion and no-JS visitors get normal document flow.

## Design and review

Approved direction and implementation plan: `docs/superpowers/`. Review evidence: `docs/reviews/tear-open/`. Previous work is preserved in stash `1daf5749d7bd63c0a519bda6074f60c6d9f78fc4` and has not been restored.

Build output is `dist/` with relative asset paths, suitable for static hosting. Nothing is deployed by the build or verification commands.
