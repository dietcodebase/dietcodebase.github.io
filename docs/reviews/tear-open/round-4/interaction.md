# Frozen site interaction review

Reviewed only the live build at http://127.0.0.1:5176/ in Chromium, at 1440×900 and 390×844. No source, project documentation, other reviews, or other reviewers were consulted. Browser screenshots and live DOM/accessibility state supplied the evidence.

**Weighted score: 8.52/10.** The brand and responsive execution are strong. This is a polished, coherent studio site; I would not rate it 9+ against an Awwwards-level bar because the product demonstration and interaction vocabulary are less distinctive than the opening artwork. No critical functional or keyboard blocker was found in the paths exercised.

| Category | Weight | Score /10 | Reason |
| --- | ---: | ---: | --- |
| Composition / typography | 25% | 8.7 | Oversized type, aligned edges, controlled cream/red/black fields and convincing mobile re-composition. Some of the lower page becomes conventional large-type editorial rows after the unusually strong opening. |
| Identity / art direction | 25% | 8.8 | The tactile green bottle, torn paper and red stock form an immediately memorable identity. Wardrobe flat-lays are cohesive, but the project portion has less ownable visual material than the brand hero. |
| Motion / interaction | 20% | 7.9 | Bottle pop/replay and reversible scroll reveal have a clear concept and work. Tabs are solid and purposeful. The experience has one dominant expressive gesture, followed by relatively familiar static layouts and tab changes. |
| Mobile / accessibility | 20% | 8.7 | Strong 390px layout, no horizontal document overflow, usable targets, visible focus, functional skip link, proper tab keyboard behavior, trapped menu focus and reduced-motion handling. Formal screen-reader and contrast audits were outside this review. |
| Content clarity | 10% | 8.1 | Studio purpose, product idea and development status are plain. The product story explains intent more than it demonstrates the actual iOS experience or engineering capability. |

Calculation: 8.7×.25 + 8.8×.25 + 7.9×.20 + 8.7×.20 + 8.1×.10 = **8.52**.

## Findings

1. **Product proof is weaker than the brand promise (award-readiness issue, medium).** “Inside the project” presents garments, possible combinations and explanatory copy across all three tabs. It makes OOTD understandable, but there is no actual app screen or concrete software interaction visible in this reviewed experience. For a creative engineering studio, one genuine product moment would give the project the same specificity as the bottle hero. The clearly displayed “In development” label is good and prevents this from being a misleading release claim. Evidence: [desktop Today](desktop-details-today.png), [desktop Looks](desktop-details-looks.png), [mobile Wardrobe](mobile-details-wardrobe.png).

2. **The Looks preview uses a dead outward-arrow affordance (minor).** The “Indigo travel layers” header has the same ↗ language used for actionable navigation elsewhere. Clicking that header produced no navigation, dialog, or visible content change; the live element was a noninteractive `strong`, with an automatic cursor. This is a small expectation mismatch, not a broken essential flow. Remove the arrow or give the preview a meaningful destination. Evidence: [Looks panel](desktop-details-looks.png), [observed click result](affordance-check.json).

3. **Mobile panel explanation sits beyond the immediate tab result (minor presentation refinement).** At 390×844, the details section spends the first screen on its introduction, tabs and clothing grid; the changed panel's explanatory title/body is below the initial viewport in Today and Looks. The selection and imagery do change clearly, so this is usable, but the immediate difference is mostly visual. Bringing a short panel explanation ahead of the grid would improve the payoff of each tab tap. Evidence: [mobile Today](mobile-details-today.png), [mobile Looks](mobile-details-looks.png). This is not a request for automatic scroll on tab changes.

## Interaction and accessibility evidence

- Scrolled the entire page forward and backward at both sizes, including real wheel scrolling. The OOTD reveal returned correctly on reverse scrolling. No blank section persisted during live scrolling. Full-page screenshots taken at the top omit the viewport-triggered OOTD content; use the dedicated work and wheel screenshots to judge that section, rather than treating that capture artifact as a site failure.
- Clicked View OOTD, Inside the project, mobile Studio menu navigation and Back to top. The work/details/studio destinations appeared; Back to top returned `scrollY` to 0 at both sizes.
- Bottle pop and replay worked through the visible CTA at both sizes. The bottle's keyboard Enter/Space path also worked. Accessible label changed from “Pop the Diet Code bottle cap” to “Replay the bottle cap pop”, and `aria-busy` returned to false.
- Activated all three project tabs at both sizes; content and `aria-selected` changed. ArrowRight moved focus/selection from Wardrobe to Today, and End moved both to Looks. Roving `tabindex` state matched the active tab.
- The initial skip link was visible on keyboard focus. Enter moved focus to the `H1` with id `hero-title`.
- Focus was visibly outlined. Keyboard progression from the hero to the selected project tab scrolled it into view at both sizes after the scrolling settled. [Desktop focus](desktop-keyboard-next.png), [mobile focus](mobile-keyboard-next.png).
- Mobile menu cycles Close → Work → Studio → Contact → Close with Tab. Escape closes it, restores focus to Menu and restores body scrolling. Selecting Studio also closed it and navigated to the section. [Open menu](mobile-menu.png), [keyboard observations](extra-checks.json).
- Mobile link/button targets measured at least 44px high in the exercised layout; tabs were approximately 115×58. Document width was 390 at a 390px viewport and 1440 at a 1440px viewport.
- Emulated `prefers-reduced-motion: reduce`: static hero remained composed, bottle pop/replay still changed state promptly, scrolling revealed the work as normal document content, and no running Web Animations were present in sampled settled states. The reduced-motion scroll differs from the default scroll treatment as expected. [Reduced-motion pop](mobile-reduce-keyboard-pop.png), [reduced-motion scroll](mobile-reduce-scroll.png), [measurements](reduced-checks.json).
- No page errors were recorded during the principal desktop/mobile runs.

## Coverage limits

This is a live Chromium review, not a source audit, automated WCAG certification, performance benchmark, real-device Safari test, or screen-reader session. Mailto destination was inspected (`dietcode@sike.dev`); no email was sent or external mail client opened. Reduced motion was exercised on the mobile viewport, with screenshots and live state checks; I did not instrument frame-by-frame JavaScript animation internals. All findings are confined to the two requested sizes and observed paths.

Full-page framing captures: [desktop](desktop-full.png), [mobile](mobile-full.png). Live project views: [desktop](desktop-work.png), [mobile](mobile-work.png). Raw observations: [desktop](desktop-observations.json), [mobile](observations.json).
