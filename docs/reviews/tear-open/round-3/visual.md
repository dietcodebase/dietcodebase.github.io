# Independent visual review — frozen live build

URL: http://127.0.0.1:5175/  
Reviewed: 15 November 2026  
Viewports: desktop 1440 × 900 and mobile 390 × 844.  
Basis: live rendered browser only. No repository source, repository documentation, previous reviews, or other reviewers were consulted. Skills were used only as a review checklist. No source changes were made.

## Verdict and scoring

**Weighted overall: 8.2 / 10 (8.205 unrounded).** This is an unusually strong small-studio identity with a memorable hero and a disciplined implementation. It is credible as a polished studio site. At an Awwwards-level craft standard, the hero is closer to the target than the project proof and the remainder of the page. The experience does not yet sustain its opening level of art direction and invention throughout.

| Category | Weight | Score / 10 | Reason |
|---|---:|---:|---|
| Composition and typography | 25% | 8.5 | Excellent large-scale type, assertive hierarchy, consistent edges, and a genuinely composed phone hero. Less typographic and compositional contrast in the latter half. |
| Identity and art direction | 25% | 8.8 | Halftone green bottle, warm paper, red texture, torn edges, script label and little asterisks form a coherent, recognizable identity. Project imagery is materially less ownable than the opening. |
| Motion and interaction | 20% | 7.7 | Cap opening, replay state, reversible paper transition, working tabs, and simple navigation are well considered. Motion’s expressive range is concentrated in the opening; project interaction is principally image-and-copy substitution. |
| Mobile and accessibility | 20% | 8.0 | Strong responsive layout, large controls, readable primary type, no horizontal document overflow at the tested size, functional full-screen menu, visible focus and keyboard tabs. Narrow garment crops and tiny secondary type reduce the phone’s editorial finesse. |
| Content clarity | 10% | 7.4 | Studio offering and project status are immediately understandable. OOTD’s three ideas are clear. Little evidence of the actual software, team responsibilities, or how the studio works makes the offer harder to assess. |

Calculation: 8.5 × .25 + 8.8 × .25 + 7.7 × .20 + 8.0 × .20 + 7.4 × .10 = 8.205.

## What is working particularly well

- **The opening is distinctive and confident.** The bottle is enormous, legible and tactile; its cream cut edge connects it to the torn service label rather than feeling like a stray decorative asset. It competes successfully with the enormous DIET CODE lettering. Desktop balance remains clear despite the deliberate overlap. [Desktop hero](desktop-hero.png).
- **The phone hero is designed, rather than merely stacked.** DIET / CODE becomes a compact block, the bottle steepens, the torn service card sits at its foot, and the project action spans the available width. All the key information fits in the first 844px screen. [Mobile hero](mobile-hero.png).
- **The restrained palette has conviction.** Cream, near-black, red and bottle green are enough to carry the whole experience. Repeated torn edges and asterisks connect the otherwise quieter project and team sections to the hero. The contact section provides a strong red closing beat. [Contact](desktop-scroll-06.png).
- **The scroll transition actually behaves well.** It covers and reveals the hero with an uneven paper edge; the bottle composition moves within the opening. Stepped forward and reverse wheel input restored the original top composition without an empty visual or stranded text. The opened cap state also survives the return. [Mid-transition](motion-400-2.png), [returned top](motion-0-11.png).
- **Controls have real behavior.** The cap separates visibly and the desktop action becomes “Pop it again.” OOTD tabs change the active row, image, colored ground, number, sticker, heading, body, and process labels. These are not dead affordances. [Opened cap](cap-650.png), [Today](tab-Today.png), [Looks](tab-Looks.png).

## Concrete weaknesses and improvements

1. **The project story shows clothes much more effectively than it shows a digital product.** The first OOTD screen has jacket / tee / jeans; each tab then repeats one of those exact garments. “Looks” explains keeping a combination but depicts a single pair of jeans. “Today” explains composing an outfit but depicts a single tee. That is a gap between the promise and the visual evidence, particularly for a creative engineering studio. It also makes the three tab compositions feel mechanically interchangeable. Evidence: [project overview](desktop-nav-work-settled.png), [Today](tab-Today.png), [Looks](tab-Looks.png). **Highest-value improvement:** use an actual screen, prototype, or short working interaction to demonstrate photo → review → wardrobe and piece → outfit → saved look. Keep garment imagery as material inside that demonstration. The current “in development” status is honest; retain it.

2. **The mobile project triptych sacrifices the images to preserve three columns.** At 390px, the jacket and tee live in roughly 109px-wide upright frames. Their sleeves are visibly cut, while the jeans remain almost whole. The resulting staggered slivers look less intentional and less premium than the generous desktop photos. Their small uppercase labels also demand close reading. Evidence: [settled mobile Work screen](mobile-nav-work-settled.png). **Improvement:** recompose the garment display specifically for the phone, with consistent full silhouettes and enough width for each item; do not simply retain desktop’s three-image scheme at this crop ratio.

3. **The lower half loses some of the opening’s particularity.** The team section is a familiar large heading plus ruled name rows; its supporting content gives aliases but no roles or distinctive contribution. The contact section repeats the very heavy headline treatment. Both are clean, but after the bottle and paper choreography they feel more like a competent studio template. Evidence: [team](nav-Studio.png), [mobile team](mobile-nav-studio.png), [contact](desktop-scroll-06.png). **Improvement:** give the team one ownable visual or interaction and concise role information, with a different typographic rhythm. A quiet typographic or photographic moment would be enough; more decorative animation is not automatically better.

4. **The mobile hero’s supporting text is markedly smaller than its primary statement.** The service sentence on the torn card and the two bottom micro-labels are readable in the screenshot but feel miniature beside the headline and large CTA. The paper card is narrow enough that this small size appears to be doing fit work. Evidence: [mobile hero](mobile-hero.png). **Improvement:** give the service sentence a little more width and a larger reading size, and reduce reliance on tiny uppercase labels for secondary instructions.

5. **The replay interaction is pleasant but still a small isolated flourish.** Cap lift / rotation and torn-paper scroll are memorable; the remaining project interaction changes a static card. An award-level motion score would benefit more from a useful and expressive product demonstration than from adding ambient motion to the team or footer. Evidence: cap sequence `cap-80.png`, `cap-250.png`, `cap-650.png`, `cap-1500.png`; tab screenshots. This is a craft ceiling, not a broken-functionality finding.

## Interaction and accessibility evidence

- Walked the entire page at both sizes using forward wheel input, then reversed through it and returned to the top. Inspected separate screenshots through the transition, rather than inferring motion from a full-page image.
- Opened the bottle using the visible action on desktop and mobile. Captured timed desktop states and the mobile opened state.
- Activated desktop Work, Studio and Contact navigation, View OOTD, Inside the project, and Back to top. Work’s settled landing correctly fills its screen at both sizes; an earlier screenshot during settling is not a clipping defect.
- Opened the mobile full-screen menu; selected Studio and Work; checked Escape. Escape closes the overlay and returns focus to the Menu button. The button exposes `aria-expanded` and `aria-controls`.
- Activated all three project tabs. ArrowRight moves from Wardrobe to Today and updates `aria-selected` on both desktop and mobile. The tab pattern uses a roving tab stop.
- First keyboard Tab reaches the visible Skip to content link. Continued keyboard traversal showed visible outlines on navigation, bottle, cap action, CTA and project controls. [Skip link screenshot](keyboard-skip.png).
- Checked the rendered reduced-motion hero: its bottle, headline, service copy and CTA remain present. Did not perform an exhaustive reduced-motion animation audit.
- Visible measured links and controls were at least 44px tall in both tested layouts. The mobile project tabs were 58px tall.
- Document widths were 1440px and 390px respectively, with no horizontal document overflow at those tested sizes. No uncaught page errors were recorded during the full-page initial passes.
- The email link uses `mailto:dietcode@sike.dev`. No email was sent.

## Limits

This is an independent visual and interaction critique, not a WCAG conformance certification or a performance benchmark. Testing used headless Chromium with an emulated touch viewport, not physical iOS hardware or Safari. No conclusions are claimed about real-device frame pacing, screen-reader output, image licensing, deployed hosting, all possible widths, or long-term browser compatibility. Only the requested 1440 × 900 and 390 × 844 sizes were judged. The video folder is supplemental; screenshot sequences and live interaction checks are the basis for the motion findings. The first combined automation script stopped because the reviewer queried an ARIA tab as a generic button; the corrected tab, menu, keyboard and navigation runs completed. That automation mismatch was not treated as a site defect.

## Saved evidence

All evidence and this report: `/private/tmp/dietcode-v3-visual/`.

Useful entry points:
- `desktop-hero.png`, `mobile-hero.png`
- `desktop-nav-work-settled.png`, `mobile-nav-work-settled.png`
- `tab-Wardrobe.png`, `tab-Today.png`, `tab-Looks.png`
- `nav-Studio.png`, `mobile-nav-studio.png`
- `desktop-scroll-06.png`, `mobile-scroll-05.png`
- `mobile-menu.png`, `keyboard-skip.png`, `reduced-motion-hero.png`
- `motion-*.png`, `cap-*.png`, `mobile-cap.png`
- `runtime.json`, `controls.json`, `a11y-nav.json` contain rendered-DOM observations and check results.
