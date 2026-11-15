# Technical review — working tree

Reviewed `index.html`, `styles.css`, all `src/`, unit tests, `scripts/verify-visuals.mjs`, Vite configuration, and generated production asset paths. Source files were not modified. Browser reproductions used current working-tree Vite at `http://127.0.0.1:5173/` in headless Chromium. `npm test` passed 6/6; `npm run build` passed. The coordinating agent added compact-height flow during review; the former short-landscape enhancement issue is therefore excluded.

## User-visible defects

### [P2] Remounting bottle motion leaves a frozen pop and stale accessibility state

Location: `src/main.js:64–74` / `src/motion/bottle.js:227–231` (also initial state at bottle.js:11 and mount completion at :219).

Reproduction: at 1440×900, activate Pop the cap, wait ~350 ms, change prefers-reduced-motion to reduce, then restore no-preference. The existing animation is cancelled and a new controller begins internally in `closed`, but cap transform, fizz opacity, `data-cap-state`, labels, and aria-busy retain the prior controller’s state. Observed after both preference changes: cap frozen at `translate(-31.1111px, -53.8889px) rotate(-42.2222deg)`, fizz opacity `1`, data-cap-state `popping`, aria-busy `true` indefinitely. The new compact-height resize handler also remounts the bottle when crossing 650 px height, exposing the same defect on resize/rotation. Initialize or preserve a coherent state when remounting, including fizz and trigger attributes.

### [P2] Mobile navigation is clipped away during an unfinished tear

Location: `src/motion/tear.js:29` and `styles.css:984–995`; menu opens in `src/main.js:23–30`.

Reproduction: viewport 390×844, scroll natively to y=300 (progress .5929), then open the still-visible Menu button. The fixed navigation is a descendant of the clipped hero; its clip edge remains near 41% of the viewport. Work/Studio/Contact link centers lie at y≈355/457/559 and are clipped: elementFromPoint at each center returns `.scene-stage`, not the link. Body overflow is then hidden, so the user cannot scroll to correct the pose while the menu is open. Keyboard focus still enters these invisible links. The navigation needs to escape the clipped layer or opening it needs to restore a complete hero/menu viewport.

### [P2] Reverse scrolling drops mobile keyboard focus onto the document body

Location: `src/motion/tear.js:42–44`, with hidden mobile nav at `styles.css:981–983`.

Reproduction: viewport 390×844, activate View OOTD (focus is moved to #work-title), then reverse native scrolling to y=150 or y=300. When work becomes inert, the recovery selector chooses the first `[data-work-link]`, which is the Work link inside the mobile navigation with `display:none`. Its focus() cannot succeed, and activeElement becomes body rather than a visible hero control. Desktop recovery works, so the existing desktop assertion does not cover this. Focus a visible hero action such as `.button-dark`, or select a visible eligible recovery target.

### [P2] Same-document fragment navigation can leave the named destination inert

Location: `src/motion/tear.js:91–109` (only click handlers and one startup hash check; no hashchange reconciliation).

Reproduction: at 1440×900, activate View OOTD, then navigate within the current document to `#top` through the address bar / location.hash. Native fragment scrolling uses the sticky pane’s current rectangle; observed scrollY=516 and progress=.9556, with hero still inert despite hash `#top`. Change the fragment to `#work`; observed scrollY=492/progress=.9111 and work inert despite hash `#work`. The clicked site links work because their handlers explicitly map destinations to scene scroll coordinates; other fragment navigation does not. Fresh-load deep links #work, #top, #hero-title and #studio passed, so this is specifically same-document hash navigation. Reconcile supported scene fragments on hashchange (and relevant history traversal) using the same coordinate mapping.

## Test gaps, not additional confirmed defects

- `scripts/verify-visuals.mjs` checks initial reduced-motion mode, but never changes that preference on an existing controller and never checks the 650 px flow boundary.
- Reverse focus is asserted at desktop size only; mobile reversal and menus opened at partial scroll poses are absent.
- Only click-driven Work/Top navigation is exercised. Initial deep links and later hash/history navigation need distinct cases.
- No hidden-tab lifecycle case exists. The pause/resume timestamp adjustment is present in source; I did not confirm a defect in ordinary hidden-tab animation behavior.
- Frame interval samples are reported but have no acceptance threshold; they are diagnostic metrics, not a performance pass condition.
- Verification uses Vite development serving rather than a nested-path production build. Static inspection of the built output found relative JS/CSS/image/font URLs and all referenced production assets, so no production relative-path defect was identified.

## Positive technical checks

The scroll renderer derives poses directly from normalized native scroll position and has no independent scroll-direction state. Outer scroll transforms, local bottle motion, and cap transforms have separate DOM owners. Unit tests cover deterministic forward/reverse state calculations. The artwork decode gate, failed-art normal flow, no-JS product-panel fallback, ordinary reduced-motion flow, touch pan-y, duplicate activation gating, pointercancel and lostpointercapture handling are implemented. No additional important defect was found in those source paths.

Reproduction scripts: `/private/tmp/dietcode-review-checks.mjs`, `/private/tmp/dietcode-review-menu.mjs`, `/private/tmp/dietcode-review-deeplink.mjs`.
