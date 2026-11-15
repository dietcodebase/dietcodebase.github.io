# Diet Code — Tear Open validation

Verified 15 November 2026. The implementation is locally usable and functionally verified. **The requested 9.5/10 independent design gate has not been achieved.**

## Current implementation

- Correct physically attached Diet Code label, matched open glass mouth and cap, photographic halftone cutout art.
- Stateful cap pop/replay, keyboard/touch activation, bounded desktop drag and stepped entrance.
- Native, reversible twelve-pose paper scene with real paper-alpha edges. Paper mask, bottle transform/visibility and work placement depend only on current scene progress.
- One project: OOTD, an iOS wardrobe app in development. Wardrobe/Today/Looks now include a working idea study using actual bundled garment imagery and the source-seeded “Indigo travel layers” example. Choose a piece, vary the other category, keep one example combination, reload and reset. This is visibly scoped as a separate website study; no app screenshot, AI output or release result is fabricated.
- Gowrish (gorix), Jeswin (jes), Sabi (sero) remain visible. User requested no specific roles.
- Real contact: dietcode@sike.dev. Project enquiry opens a draft with an OOTD subject; no email was sent.

## Verification evidence

- Clean `npm ci --ignore-scripts`: 66 packages installed, 67 audited, no reported vulnerabilities. Runtime framework dependencies removed.
- `npm run build`: passes. Static output about 2 MB; production JS 20.03 KB (7.27 KB gzip), CSS 35.69 KB (7.59 KB gzip).
- `npm test`: 13 state/progress tests pass. State helpers and late-exit regression observed RED before implementation/fix, then GREEN.
- `npm run verify`: **122 browser assertions pass**, no page/network errors.
- `node scripts/verify-preview.mjs`: **101 browser assertions pass**, zero errors. Covers five sizes, keyboard start/variation, preserved garment and focus, exact saved outfit, reload, reset with unrelated storage retained, denied storage, reduced motion and no-JS. [Preview report](preview-report.json).
- Viewports: 1440×900, 1024×768, 768×1024, 390×844, 320×844, 375×667. No horizontal overflow; names and contact route checked at every width.
- Actual browser forward/reverse masks, placements and visibility match at 0/25/50/75/100%. All five latest rendered checkpoint pairs are pixel-identical. Comparator allows tiny raster noise (<0.01% pixels, max channel delta12), but none occurred in this run.
- Rapid mixed reversal, partial-tear resize, Work focus, top/home/fragments, mobile modal focus cycles in both directions, cap replay/keyboard/touch/drag cancellation, hidden-document pause/resume, reduced motion, no-JS and failed-art fallback pass.
- Contact closing phrase fits a complete single line at every checked width, including phone sizes. Selected-tab focus contrast, mobile cap/navigation separation and project-specific draft destination are verified.
- `node scripts/verify-built.mjs`: passes under a nested `/diet-code/` static-hosting path, including fonts, paper assets, all tab images, enhancement and navigation.
- Measured cap pop: 1013.3 ms from actual state timestamps. Authored motion deliberately uses ten poses/sec.
- Latest headless down→up→down sample: 123 intervals, median 16.736 ms, p95 33.4 ms, max 50.0 ms. These are local recording measurements, **not a 60fps device guarantee**.

Machine-readable evidence: [browser-report.json](browser-report.json). Current captures: [desktop](final-desktop.png), [phone](final-mobile.png), [interactive project](preview-390-today.png), [kept look](preview-390-kept.png), [contact](final-contact-mobile.png). Actual motion: [MP4](tear-open-motion.mp4).

## Independent design reviews

Each visual/interaction/content reviewer started without conversation context and received only the frozen live URL, desktop/mobile sizes, and fixed rubric. No target score, prior score, mockup, plan or preferred verdict was provided. Weights: composition/type25%, identity/art25%, motion/interaction20%, mobile/accessibility20%, content clarity10%. These are subjective internal reviews, not official Awwwards ratings.

| Review | Visual | Interaction | Content |
|---|---:|---:|---:|
| Round1 | 7.475 | 8.215 | 7.575 |
| Round2 | 7.83 | 8.065 | 8.06 |
| Round3 | 8.205 | 8.035 | 8.0 |
| Outfit examples | 7.875 | 8.52 | 8.25 |
| Paper/material confirmation | 8.2 reported | 8.36 reported | 8.1 reported |
| Initial interactive study | 7.915 | 7.93 | 7.775 |

Original reports are retained in round-1/, round-2/, round-3/, round-4/ confirmation/ and interactive-study/. No score is averaged away or represented as a passing9.5. The final confirmation's phone-title defect was subsequently reproduced, fixed and verified across all six widths; scores were not inflated after that fix.

Material fixes driven by review include Back to top, menu close state and portal clipping, menu focus-cycle leakage, skip navigation, reverse-scroll focus, motion-preference remount, same-document fragments, mobile garment cropping, readable metadata, visible selected-tab focus, cap/navigation overlap, ambiguous outward arrows, early-exit bottle fragments and the orphaned contact phrase.

The initial interactive-study review found mobile output below introductory copy, a direction-dependent instruction, a clipped short-phone focus outline and Work content excluded from accessible document order. These defects were reproduced and fixed. Work now remains semantic content; keyboard entry reveals it immediately. Covered hero controls still leave Tab order, and reversal moves focus to a visible hero target. The phone result and actions now fit together, and remaining pieces assemble around a stationary chosen garment in five stepped poses.

The case study now includes a source-verified product decision: available-item candidates precede optional AI ranking and remain visible if ranking fails. The studio paragraph describes the collective product/interface/software scope without inventing roles. Genuine native app screens and individual expertise remain absent by user choice. These content constraints are recorded, not treated as a passing design score.

Latest cold reviews: visual8.065, content7.87. Interaction review found no material defect in its interim browser assessment, but its final response hit the account usage limit. Original report files are archived in study-confirmation/. The final mobile chooser was subsequently reordered image-first and repeated instructions removed;101 preview checks pass. The follow-up human confirmation also hit the usage limit. No score is inferred or inflated.

## Genuine app capture attempt

User authorized an unchanged OOTD Simulator capture attempt, then chose the garment-led case study for now. No runtime or Simulator devices were installed, no external volume was available, and free disk was insufficient. The temporary generic build was deliberately interrupted; it is **not a passing app build**. No app launch or screenshot occurred. Owned build/package scratch was removed. Before/after source status and diff matched (HEAD f37cde6911cfba5c25fa4373f2d1c8dbbcc794c4); no app source was modified. Small logs remain at `/private/tmp/dietcode-ootd-capture/`.

## Supplemental tools and limits

- **Taste GATE: ERROR** — its bundled browser scripts could not discover Chrome. This is not a gate pass. Installed Playwright Chromium performed the independent verification above.
- Direct copy lint:0 FAIL,1 WARN for editorial numbering, retained for section, garment and member identification.
- Initial Impeccable mechanical scan:21 warnings, archived in impeccable-detect.json. Small functional text, incidental tight tracking and geometric organic contours were addressed in the material/readability pass. Cream stock and the oversized masthead are deliberate selected-direction choices. No clean-detector or standalone critique claim is made.
- Chromium emulation, not physical-device Safari, Firefox or a screen-reader certification. No email delivery tested.
- No deployment or push. The original work remains preserved in stash1daf5749d7bd63c0a519bda6074f60c6d9f78fc4.

## Execution decisions

Chronological record; the final implementation above supersedes earlier intermediate choices.

- Ruling: use current overhaul checkout — user requested in-place restart, original source is preserved in stash; no new worktree needed.
- Ruling: matching cap and body use two CSS-clipped instances of the same transparent master — guarantees registration and keeps physical label intact; clipping seam must be visually tested.
- Ruling: custom chosen composition and motion override taste-skill template/deal defaults — user explicitly selected Tear Open; browser checks remain relevant.
- Ruling: garment derivatives use native JPEG compression, not semantic image edits — original PNGs remain in source assets; reduces transfer cost without changing artwork.
- Ruling: synthetic pointerdown cannot own pointer capture; verifier now starts a real mouse pointer before dispatching cancellation. Application behavior unchanged.
- Ruling: add source-based interactive product explainer, not fabricated phone UI — real features verified in ContentView.swift, actual UI unavailable in existing sessions (no booted Simulator). Website panels use editorial photographs with clear feature prose.
- Ruling: CSS polygon clips implement the planned paper mask instead of SVG — same deterministic12-pose geometry, fewer DOM layers; rasterization verified within declared tiny antialias tolerance.
- Ruling: strengthen garment-led product evidence with complete example outfits and actual seeded saved-look data, following reviewer alternative to missing screenshots — no native UI invented; source WardrobeSeed.swift confirms “Indigo travel layers” and its4 pieces. Today explicitly labelled one possible combination. Website-only content enhancement, no app changes.
