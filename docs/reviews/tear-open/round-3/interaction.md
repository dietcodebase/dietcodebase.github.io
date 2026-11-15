# Diet Code v3 — independent interaction and accessibility review

Target: http://127.0.0.1:5175/ · frozen page · 15 November 2026

Browser-only assessment in Playwright Chromium at 1440×900 desktop and 390×844 mobile. No repository source, project documentation, prior reports, or other reviewers were consulted. All files here are review evidence or test harnesses; no source changes were made.

## Score

| Category | Weight | Score /10 | Assessment |
|---|---:|---:|---|
| Composition / typography | 25% | 8.2 | Excellent first-screen hierarchy and confident scale. Clear gutters, ruled sections, strong black/cream/red rhythm. Later sections rely on the same heavy face and relatively familiar editorial arrangements. |
| Identity / art direction | 25% | 8.1 | The halftone green bottle, torn paper, red field, and uncap language form a coherent, memorable studio identity. The OOTD material is substantially less distinctive and does not show the actual software. |
| Motion / interaction | 20% | 7.8 | A real authored tear/reveal, reversible scroll, keyboard-operable bottle/replay, and useful project states. Reliable, restrained implementation in this run. Interaction depth peaks early and the remaining project experience is mostly a garment-image/content swap. |
| Mobile / accessibility | 20% | 8.4 | Strong mobile recomposition, generous targets, no horizontal overflow, correct menu trap/Escape/return focus, useful tab keyboard behavior, and respected reduced motion. One reproduced focus-visibility defect prevents a higher mark. |
| Content clarity | 10% | 7.2 | Visitors immediately understand studio type, OOTD purpose/status, team size, and contact path. The site provides little evidence of engineering capability, individual roles, or the app itself. |
| **Weighted overall** | **100%** | **8.03 → 8.0** | **Strong, distinctive professional work. Below the most accomplished Awwwards-level executions mainly in project proof and depth, rather than basic usability.** |

Calculation: 8.2×.25 + 8.1×.25 + 7.8×.20 + 8.4×.20 + 7.2×.10 = 8.03.

## Reproduced findings

1. **P2 — Selected project tab has no distinguishable keyboard focus ring on desktop.** Open `/#ootd-details`, click Wardrobe, press Tab into its panel, then Shift+Tab back. Wardrobe is keyboard-focused (`:focus-visible=true`) but appears the same as the pointer-selected state. The rendered outline is `3px solid rgb(244,241,234)` with `6px` offset, the same cream as the surrounding page. The black selected fill persists whether focused or not. Give focus a contrasting treatment distinct from selection. Evidence: `tab-pointer-focus.png`, `tab-keyboard-focus.png`, `observations-focus.json`. This is a visible-focus weakness, not a claim that the tab cannot be operated.

2. **P2 — The project presentation never demonstrates the software it describes.** Follow View OOTD → Inside the project; select Wardrobe, Today, and Looks. Each state shows one catalogue garment photo, slogan, short explanation, and a three-word process. There is no app screen, working flow, or interaction demonstration. The content explains the concept clearly, but leaves a prospective client unable to judge product/UI/engineering execution. This is the largest gap against an awards-level studio site. Evidence: `desktop-scroll-500.png`, `tab-Today.png`, `tab-Looks.png`, `mobile-tab-Today.png`.

3. **P3 — Desktop tab arrows imply navigation rather than local selection.** Wardrobe/Today/Looks each use the same up-right arrow vocabulary as contact/navigation actions, but activating one changes the adjacent panel. The active black fill makes state legible after use; a less navigational cue would make the first interaction clearer. Mobile removes these arrows, which is cleaner. Evidence: `tab-Today.png`, `mobile-scroll-1450.png`.

4. **P3 — Studio credibility is thin relative to its confident presentation.** The complete studio section gives three names/aliases and a broad shared statement, with no roles or concrete expertise. The contact action works, but deciding who can help with a specific product remains a leap. This is an editorial limitation, not a broken link or missing required feature. Evidence: `desktop-scroll-2500.png`, `mobile-scroll-2250.png`.

## Verified behavior

- Desktop full-page visual review used overlapping viewport captures from top to footer and back. Programmatic scroll positions covered 0→500→850→1100→1400→1750→2100→2500→2900→bottom, then reverse. Real mouse-wheel +700/−700 returned to the correct hero/work states. No trapped scrolling, residual blank scene, or broken reverse state was observed.
- Bottle activates by pointer and Enter; its accessible name changes from “Pop the Diet Code bottle cap” to “Replay the bottle cap pop.” Space replay also works. Both the large bottle hit area and labeled control are focusable. Evidence: `bottle-pop-450ms.png`, `bottle-popped.png`, `bottle-replay.png`, `observations-final.json`.
- A delayed complete desktop Tab sequence kept each focused control visible. Skip-to-content transferred focus to the hero H1. The initially hidden work scene is skipped in the initial Tab sequence, but activating View OOTD reveals it and moves focus to its H2.
- Project tabs implement roving tabindex, selected state, ArrowDown wraparound, ArrowRight/Left, Home, End, and a focusable associated tab panel. Distinct panel copy and artwork appeared for all three states.
- Mobile menu: opening sets `aria-expanded=true`; Tab cycles Work→Studio→Contact→Close→Work; Shift+Tab from Close wraps to Contact. Escape closes and returns focus to Menu. Wheel scroll stays at zero while open. Selecting Studio closes the menu and arrives at `#studio`.
- Mobile View OOTD reaches `#work` and focuses the OOTD H2. Mobile Today tab updates selection and panel.
- All inspected visible mobile links/buttons were at least 44px tall. The page measured 390px viewport and 390px document width, with no horizontal overflow. Main text remains readable and contact email stays within the viewport.
- Direct reloads of `#top`, `#work`, `#studio`, `#contact`, and `#ootd-details` arrived at the corresponding visible section. Inside the project reached `#ootd-details`. All rendered link destinations resolve to those local fragments or `mailto:dietcode@sike.dev`; no dead or placeholder href was found.
- Reduced-motion mobile context had zero active Web Animations at rest and after bottle/scroll interaction. Bottle moved directly to its opened/replay state and work content remained accessible. Evidence: `reduced-top.png`, `reduced-popped.png`, `reduced-work.png`, `observations-mobile.json`.
- All rendered images loaded with nonzero natural widths. Garment images have meaningful alt descriptions; the detached decorative cap has empty alt. No page JavaScript exception was recorded during the desktop sequence.

## Coverage limits

Chromium headless and touch emulation are not physical Safari/iOS or Android tests. No screen-reader speech session, automated contrast/axe audit, 200% zoom, slow network, GPU/frame-time benchmark, or email-client launch was performed. Reduced-motion checks cover rendered end states and active browser animation objects; they are not a complete trace of every transient style update. The initial full-page captures show a blank work area because that scene is reveal-driven at the top position; overlapping scrolled screenshots were used for the visual judgment, and this was not counted as a runtime defect. A few first harness attempts timed out because a control changed accessible name or a hidden scene had not yet been scrolled into view; corrected tests completed and those harness errors were not counted as site defects.

Questions skipped: this is an independent reviewer report for parent synthesis, with no implementation or user decision requested.
