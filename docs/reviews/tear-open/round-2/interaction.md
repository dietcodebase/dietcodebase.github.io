# Independent live review — Diet Code v2

Reviewed the frozen live site at http://127.0.0.1:5174/ in Chromium at 1440×900 and 390×844. Review was based on the rendered site and browser interaction only; repository source, project documents, other reviews, and other reviewers were not consulted. No site files were edited.

**Weighted overall: 8.1/10.** A memorable, coherent studio identity with a convincing hero and genuinely implemented interaction. It is stronger as a brand introduction than as evidence of creative engineering capability. One reproduced mobile keyboard-focus defect keeps the accessibility execution below the visual execution.

| Category | Weight | Score /10 | Judgment |
|---|---:|---:|---|
| Composition and typography | 25% | 8.7 | Confident oversized type, consistent edges, purposeful shifts of scale, and disciplined cream/red/black page rhythm. The mobile hero is recomposed well, rather than merely reduced. |
| Identity and art direction | 25% | 8.4 | Bottle photography, the printed label, torn paper edges, garment plates, and packaging-style stamps create a recognisable world. The hero is the strongest authored moment. Later sections lean more on large type and horizontal rules. |
| Motion and interaction | 20% | 8.0 | Both bottle controls work, repeat pop works, the tear reveal reverses, and the tab content changes are functional. The interaction reinforces the identity. Depth is modest after the opening scene, and the project panels illustrate garments rather than the software interaction being described. |
| Mobile and accessibility | 20% | 7.5 | Strong 390px composition, no horizontal overflow, adequate primary hit areas, functioning keyboard tabs, useful focus handoffs, and a clean reduced-motion fallback. The full-screen mobile menu leaks focus to a covered skip link. |
| Content clarity | 10% | 6.9 | Studio purpose, app premise, development status, people’s names, and contact route are clear. The page gives little evidence of the product itself, delivery capability, or each person’s contribution. |

Weighted calculation: 8.7×.25 + 8.4×.25 + 8.0×.20 + 7.5×.20 + 6.9×.10 = **8.065**, rounded to **8.1**.

## Reproduced defect

### P2 — Mobile menu lets keyboard focus leave the visible overlay

At 390×844:

1. Open Menu. Focus correctly moves to Close.
2. Press Tab once: browser/page focus leaves the menu controls.
3. Press Tab again: focus reaches the underlying “Skip to content” link.
4. The menu still fills the screen. The focused skip link is covered by the menu and has no visible focus indication in the displayed overlay.
5. Press Enter: the menu stays open and focus stays on that unusable skip link.

The sequence was reproduced twice, including a separate focused reproduction. The underlying main content is excluded while the overlay is open, but the skip link remains reachable outside that exclusion. Escape does close the menu and returns focus correctly to Menu; selecting Studio also closes it and focuses the Studio heading.

**Fix:** keep every focusable page element outside the open navigation out of the focus order, including the skip link. Keep Tab/Shift+Tab within the visible navigation and Close control, then restore focus to Menu when dismissed. Check that a screen reader receives appropriate overlay/navigation semantics as well; this review did not run one.

Evidence: `menu-repro.json`, `mobile-menu-tab-2.png`, `mobile-menu-skip-activated.png`, and `targeted-results.json` → `mobile.menuFocus`. The screenshots are intentionally visually similar to the normal menu: the defect is that the focused element is hidden behind it. The JSON records the focused element.

## Concrete improvements beyond the defect

1. **Show the app, not only its wardrobe subject.** “Wardrobe”, “Today”, and “Looks” each change the panel correctly, but the imagery remains a jacket, T-shirt, and jeans. The copy describes photo review, composing a look, and saving combinations; none of those flows can be seen. One authentic interface sequence, prototype capture, or carefully labelled in-development screen would make the project credible and give the second half of the page another distinctive moment. Evidence: `desktop-tab-End-settled.png`, `mobile-tab-End-settled.png`.
2. **Give the team a little more useful substance.** The Studio section presents three large names and aliases with the same star motif. It does not explain who designs, who engineers, or what their collaboration brings. A short contribution or specialty per person would improve hiring confidence without adding a large section. Evidence: `desktop-scroll-6-2200.png`, `mobile-scroll-6-2200.png`.
3. **Tune action icon meaning.** The same northeast arrow appears on “Pop the cap”, “View OOTD”, tabs, and email. Those produce replay, in-page navigation, panel selection, and external-app handoff respectively. It works as a graphic motif, but it conveys little action-specific feedback. A cap/replay gesture for the bottle and a selection cue for tabs would make interaction meaning as considered as the art direction. This is a usability/polish suggestion, not a broken-control finding.
4. **Carry the material identity one step farther into the project story.** The bottle and tear are memorable; the project details then become a conventional two-column tab panel, and the team becomes a text list. A purposeful product interaction or a small authored treatment of the team would close the gap between a striking opening and a quieter remainder. Avoid adding motion simply to fill this gap.

## Interaction verification

- **Bottle:** clicked the image control itself and the text control; each changes the bottle to a detached cap state. Space on the focused text button also activates it. Visible copy changes to “Pop it again” and the accessible label changes to “Replay the bottle cap pop”. Replay can be activated again on both viewport sizes. Two controls expose the same action; this is redundant but neither is a dead control.
- **Forward/reverse scroll:** inspected the whole page at multiple scroll positions, then reversed through the opening scene to the top. Also captured actual wheel input in 150px steps forward to 900px and back to 0. No persistent blank section or stranded overlay was reproduced. The bottle’s popped state persisting on return is consistent with its replay state.
- **Keyboard:** skip link focuses the H1. Main controls have visible focus treatment. A settled sequential Tab pass brings lower controls into view; rapid screenshot sampling before the smooth scroll settled initially looked offscreen, but the follow-up pass verified that this was timing, not a reproducible persistent focus failure.
- **Project tabs:** ArrowRight, ArrowLeft wrapping, Home and End update selected state, roving tabindex, visible panel, and focus on desktop and mobile. Home/End do not accidentally scroll the page after settling.
- **Fragments:** fresh loads of `#work`, `#ootd-details`, `#studio`, `#contact`, and `#top` produce the expected visible sections at both sizes. Clicking “View OOTD” focuses the OOTD heading; the following Tab reaches “Inside the project”. Mobile-menu Studio closes navigation and focuses the Studio heading. Contact/footer targets are naturally limited by the bottom of the document and remain visible.
- **Menu:** opening focus, Escape dismissal/return focus, and Studio selection pass. Focus containment fails as described above.
- **Reduced motion:** the reduced-motion media query was active, document scroll behavior was `auto`, and the browser reported no active Web Animations after load or cap activation. The cap changes state without a visible transition in the sampled reduced-motion screenshot; the project remains present and accessible. Evidence: `reduced-hero.png`, `reduced-pop.png`, `reduced-work.png`, `results.json` → `reduced`.
- **Layout/runtime:** viewport width equals document scroll width (1440 and 390 respectively); no horizontal overflow. No JavaScript page errors were emitted in either main review session. Mobile Menu and cap CTA measure 44px high; mobile tabs measure 58px high.

## Evidence and coverage limits

Primary evidence:

- `desktop-hero.png`, `mobile-hero.png` — opening composition.
- `desktop-bottle-click.png`, `mobile-bottle-click.png` — actual image-control activation.
- `desktop-bottle-scroll.webm`, `mobile-bottle-scroll.webm` — recorded cap interaction and wheel-based forward/reverse scroll.
- `desktop-wheel-forward-1.png`, `mobile-wheel-forward-1.png` — intermediate tear states.
- `desktop-wheel-reversed.png`, `mobile-wheel-reversed.png` — return to top.
- `desktop-tab-End-settled.png`, `mobile-tab-End-settled.png` — settled Looks state.
- `mobile-menu-open.png`, `mobile-menu-tab-2.png`, `mobile-menu-skip-activated.png` — menu focus reproduction.
- `results.json`, `targeted-results.json`, `menu-repro.json`, `settled-focus.json`, `bottle-scroll.json` — browser observations.

All evidence is in `/private/tmp/dietcode-v2-interaction/`. Supporting review scripts are included for reproducibility. Files named `*-recapped.png` are a harness naming artifact, not evidence of an actual recap/reset feature; they should not be used to infer one. `desktop-full.png` was captured before scroll reveal and omits the animated work section, so sectional viewport captures are the authoritative visual evidence.

Limits: Chromium headless only; no Safari/Firefox, real iOS hardware, screen-reader speech, browser zoom, contrast audit, network throttling, or performance profiling. Mobile includes emulated touch for the main review and pointer/keyboard checks for targeted tests, not a physical finger swipe. Wheel video and sampled screenshots establish reversal/function, not a claim of sustained 60fps on user hardware. The mailto destination was inspected but no mail was sent. No axe/WCAG conformance certification is implied.
