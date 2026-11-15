# Independent live-site review — Diet Code v3

Reviewed only http://127.0.0.1:5175/ in Chromium at 1440×900 and 390×844. No source files, design documents, prior reviews, or other reviewers were consulted. No site changes made.

## Score

| Category | Weight | Score /10 | Weighted contribution |
|---|---:|---:|---:|
| Composition and typography | 25% | 8.3 | 2.075 |
| Identity and art direction | 25% | 8.5 | 2.125 |
| Motion and interaction | 20% | 7.6 | 1.520 |
| Mobile and accessibility | 20% | 8.0 | 1.600 |
| Content clarity | 10% | 6.8 | 0.680 |
| Overall | 100% | **8.0** | **8.000** |

Strong, memorable studio presentation. The textured green bottle, torn paper, cream/red/black palette, heavy type, stars, and contact language form a convincing identity. The page currently provides much more evidence of brand taste than of product design or engineering capability. On an Awwwards-level standard, that keeps it below exceptional, even though the basic execution is polished.

## What works

- The hero is an actual composition: enormous brand type, diagonally placed textured bottle, a smaller torn-paper studio statement, and a clear project link. It has a recognizable silhouette at both sizes. Mobile is deliberately recomposed with stacked DIET/CODE lettering and a steeper bottle, rather than simply shrinking the desktop.
- The visual system carries through the entire page. The red contact section and “Let’s uncap it” line resolve the bottle motif. The black studio section provides a useful tonal break. Side margins and section rules are consistent.
- The plain sentence “An iOS wardrobe app for planning looks from the clothes you already own” is clear. The in-development status is explicit rather than implying a shipped product.
- The three real project tabs work. Wardrobe changes to photo/review/wardrobe; Today explains choosing a piece and composing; Looks explains saving combinations. The copy is concise and readable. Selected state is obvious.
- ArrowRight moves keyboard focus and selection to Today; End moves to Looks. Roving tabIndex and aria-selected matched the actual state. The mobile tab row fits without overflow and each tab is about 115×58 pixels.
- Mobile menu focuses Close on opening, cycles through Work/Studio/Contact/Close, closes on Escape, and returns focus to Menu. The initial desktop keyboard stop reveals the skip link.
- No horizontal overflow at 390 pixels (document scrollWidth 390). Primary visible mobile controls measured at least 44 pixels high. Main prose remains readable. All imagery used by the visible states rendered successfully.
- Reduced-motion mobile presentation remained complete and readable. At the sampled end state document.getAnimations() returned no animations. This is a useful check, not a complete motion accessibility audit.
- Scrolling down and back up restored the hero and work content consistently. The bottle-cap interaction changes its label to “Pop it again” after settling. No runtime page errors were observed during the desktop and mobile interaction scripts.

## Main issues and concrete improvements

### 1. The project never shows the product — high editorial/product priority

Evidence: desktop-today.png, desktop-looks.png, mobile-today-panel.png, mobile-looks-panel.png. The feature cards change text, background, number, stamp, and garment, but Today is represented by a single tee and Looks by a single pair of jeans. Neither image demonstrates composing or saving a combination. The same three clothing images are introduced in the gallery and repeated in the detail tabs.

The text explains the intended jobs, but a prospective client still cannot assess the app’s interface, interaction design, or engineering. This is the largest obstacle to the page feeling like an outstanding creative engineering portfolio rather than an excellent identity exercise.

Improve by showing one honest in-development interface or prototype per tab: a garment capture/review state, an outfit composition, and a saved-look view. Label prototypes as such. If UI cannot be shown, use an actual multi-piece composition and an explicit flow diagram with a concrete design decision. Do not invent shipped results.

### 2. The studio section identifies names without explaining capability — high priority

Evidence: desktop-scroll-2100-5.png, mobile-scroll-2450.png. The studio paragraph largely repeats the hero’s studio definition. The three names and aliases have no role, area of expertise, project responsibility, or further context. The visitor learns who is present but not why this crew is appropriate for a project.

Improve with one useful line per person or one concise shared capabilities statement, plus a short indication of how the team works. Specific responsibilities on OOTD would connect people to the only presented work. A relevant profile or past-work link could add confidence where appropriate. Preserve the attractive name-row layout.

### 3. The project CTA asks for recognition before explaining OOTD — medium priority

Evidence: desktop-top.png and mobile-top.png. “View OOTD” is the dominant action, but no text in that first screen identifies OOTD as a wardrobe app. Its meaning only becomes clear in the work section, after a large clothing presentation. The hero studio label does clarify that Diet Code builds digital products, which helps, but the destination is still a proper noun without context.

Improve by adding a small “Our iOS wardrobe app” descriptor near the project action or by naming the destination more explicitly. Keep the short project name; supply just enough context for the click.

### 4. The mobile cap crosses the navigation label during the hero transition — medium polish priority

Evidence: mobile-scroll-400.png and mobile-up-400.png. After popping the cap and scrolling to approximately y=400, the detached green cap occupies the space directly behind/beneath the “Menu” text near the top-right. This is reproducible scrolling in either direction. The menu remains usable, but the collision muddies an otherwise precise composition.

Improve by constraining the cap’s scroll trajectory below the navigation safe area, fading it earlier during the tear transition, or clipping the animated layer before it reaches that label. Test this in both capped and uncapped states.

### 5. Mobile visual evidence is narrow and some editorial type is very small — medium/low priority

Evidence: mobile-scroll-750.png. The jacket and tee become tall narrow crops inside the three-column garment gallery. The arrangement is intentional and fits, but loses much of the garment silhouette while still consuming a substantial portion of the product introduction. Section labels are 11px; the hero slogan and tab numerals are 10px. Main text is comfortably larger, so this is a refinement rather than a blanket accessibility failure.

Improve the mobile gallery to preserve the important silhouette or replace part of it with useful product evidence. Raise essential metadata to roughly 12–13px where the layout permits, especially development status and orientation labels. Decorative numbering can remain quieter.

## Category rationale

- Composition/type 8.3: bold scale, coherent spacing, strong contrast, and convincing mobile recomposition. The large work gallery and repeated image card add length without equivalent new information; secondary labels become tiny.
- Identity/art 8.5: memorable tactile bottle and consistent packaging language. The work presentation shares that palette, but does not yet extend the identity into distinctive software evidence.
- Motion/interaction 7.6: real cap movement, scroll-linked bottle movement and tear reveal, reversible scrolling, and functioning tabs add delight. The mobile cap/navigation collision reduces finish. The content tabs are polished state swaps rather than a particularly revealing product interaction.
- Mobile/accessibility 8.0: no overflow, large controls, readable prose, workable menu focus handling, keyboard tab model, skip link, and complete reduced-motion rendering. Small editorial labels and the crowded cap/nav region prevent a higher score. Full assistive-technology and contrast conformance were not established.
- Content clarity 6.8: purpose, app concept, development stage, and contact route are understandable. Repeated general studio claims, absent software views, and missing expertise/responsibility context leave too much of the substantive story unproven.

## Verification and limits

Inspected the whole page at both requested sizes. Exercised all three project tabs at each size; tested desktop ArrowRight/End tab keys, the mobile menu focus cycle and Escape, bottle cap at both sizes, desktop incremental wheel scrolling in both directions, and stepped whole-page mobile scrolling in both directions. Sampled pointer positions over the desktop hero. Captured screenshots at intermediate states and local browser recordings.

This is a visual/editorial review of the frozen local build in headless Chromium, not a real-device Safari test, measured performance audit, screen-reader session, automated WCAG certification, or validation of product claims. Continuous desktop motion was sampled through incremental wheel events and screenshots; it was not assigned an FPS score. The mailto destination was inspected but no email was sent.

The initial full-page desktop screenshot contains a blank reveal-dependent work area because it was captured before scrolling; I did not count that capture artifact as a visible scrolling defect. Scrolled screenshots show the actual work section. Hidden lazy-loaded tab images were not treated as broken images.

## Evidence index

All files are in /private/tmp/dietcode-v3-content/.

- desktop-top.png — desktop hero
- mobile-top.png — mobile hero
- desktop-pop-100.png, desktop-pop-400.png, desktop-pop-900.png — cap motion samples
- mobile-pop.png, mobile-pop-settled.png — mobile cap states
- motion-down-1.png, motion-down-4.png, motion-down-7.png, motion-down-11.png — incremental wheel descent
- motion-up-1.png, motion-up-4.png, motion-up-7.png, motion-up-11.png — incremental wheel ascent
- desktop-scroll-1400-3.png — complete Wardrobe details composition
- desktop-today.png, desktop-looks.png — alternate desktop tabs
- mobile-today-at-click.png, mobile-today-panel.png, mobile-looks-at-click.png, mobile-looks-panel.png — alternate mobile tabs
- mobile-scroll-400.png, mobile-up-400.png — cap/menu overlap on descent and ascent
- desktop-scroll-2100-5.png, mobile-scroll-2450.png — studio content
- desktop-scroll-2992-7.png, mobile-scroll-3150.png — contact/footer
- mobile-menu.png — open menu
- desktop-focus-skip.png — keyboard skip link
- mobile-reduced-top.png, mobile-reduced-bottom.png — reduced-motion presentation
- desktop-interactions.json, mobile-interactions.json, motion-accessibility.json — observed state logs
- video/ — browser recordings
