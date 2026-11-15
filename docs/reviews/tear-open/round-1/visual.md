# Independent visual review — Diet Code

Reviewed live at http://127.0.0.1:5173/ on 2026-11-14 with headless Chromium, desktop 1440×900 and mobile 390×844, device scale 1. No repository source, repository documentation, earlier reviews, or creator background informed this review. This is a judgment of the rendered page, not an official Awwwards assessment.

## Score

| Category | Weight | Score /10 | Weighted contribution |
|---|---:|---:|---:|
| Composition / typography | 25% | 8.1 | 2.025 |
| Identity / art direction | 25% | 8.4 | 2.100 |
| Motion / interaction | 20% | 6.2 | 1.240 |
| Mobile / accessibility | 20% | 7.2 | 1.440 |
| Content clarity | 10% | 6.7 | 0.670 |
| **Overall** | **100%** | **7.48 /10** | **7.475** |

A distinctive, confidently designed small studio site. Its bottle-label metaphor, halftone illustration, torn-paper edges, emphatic type, and restrained three-color system create a memorable first impression. It is above ordinary portfolio quality. It falls short of an award-level complete experience because the strong opening does not develop into equally specific product evidence, the lower-page compositions lean heavily on repeated giant type, and return navigation has a reproducible functional defect.

## What works

- **The hero has an ownable visual idea.** The green bottle is large enough to be the subject, the black wordmark reads instantly, and the torn cream label gives the studio introduction its own place. Red and green feel intentional rather than decorative. See `desktop-top.png` and `mobile-top.png`.
- **The design survives mobile with real recomposition.** The bottle changes orientation, the title breaks into two lines, and the main action spans the content width. The cream/black/red sequence remains legible. No horizontal overflow was observed at either requested size.
- **Typography and edges are disciplined.** Shared left/right margins, narrow rules, consistent secondary metadata, and strong hierarchy give the page cohesion. The dark studio section is an effective change of ground.
- **The contact action is easy to find.** Its visible address is a real `mailto:` target. Main actions have generous targets. I did not send an email.
- **Basic keyboard support is present.** The first Tab exposes a visible skip link. Desktop navigation and primary controls show 3px focus outlines. Image alternatives describe the meaningful bottle and garments. The mobile menu's `aria-expanded` changed to true/false in the successful interaction sequence, Escape closed it, and selecting Studio closed it and navigated to the studio section.

## Concrete defects and opportunities

### 1. “Back to top” does not return to the hero — high priority

**Both viewports, repeatable.** Start at the hero, choose View OOTD, then Put us to work, then the footer Back to top. A longer sequence through Inside the project reproduced it too. The URL becomes `#top`, but after three seconds desktop stops at **scrollY 516** and mobile at **482**. The viewport shows OOTD, with the main navigation and hero missing. Manually scrolling back to 0 restores the hero.

Evidence: `desktop-back-top-3s.png`, `mobile-back-top-3s.png`, `desktop-after-back-top.png`, `final-check.json`, `interactions.json`. The `#top` element reports a viewport bounding rect beginning at y0 while the document remains scrolled; that is an observation, not a source-level diagnosis.

**Improve:** make every home/top link reliably restore the document to scrollY0 and fully reset the tear state. Test from the footer after the hero has completed its scroll transition, in both directions, and after clicking the cap. This defect materially reduces motion/interaction confidence.

### 2. The work presentation does not show the work as software — high priority

**Desktop Work and details anchors; mobile Work section.** The page promises a creative engineering studio and presents one in-development iOS wardrobe project. The visible product proof consists of three garment stills and explanatory copy. Following Inside the project reveals more copy plus Platform / Inside the app / Right now metadata; it does not reveal an app screen or a working interaction.

Evidence: `desktop-work-anchor.png`, `desktop-details-anchor.png`, `mobile-work-anchor.png`, `mobile-details-anchor.png`.

**Improve:** show a real OOTD interface or a clearly identified current prototype, at useful scale, with an actual wardrobe-to-look flow. Add a concise account of the design/engineering problem and the studio's specific decisions, using only real facts. The clothes can support that flow. At present they are the entire work visual, so the section can briefly read as fashion retail rather than software. The issue is missing visible evidence; no inference about the team's actual ability is intended.

### 3. Supporting mobile type is too small, and small contact copy lacks contrast — medium priority

**390×844.** Several section labels and status lines render at **8px**; garment numbers render at **7px**, and some other metadata at **9px**. These are deliberately restrained but difficult to read on a normal phone. The in-development status is useful information and deserves more prominence.

In the contact section, the small paragraph renders at **14px, weight400**, cream `rgb(244,241,234)` against red base `rgb(230,46,45)`. That pair computes to **3.88:1**, below the 4.5:1 normal-text target. The grain can vary local pixels, so this is a base-color measurement rather than an exhaustive pixel audit.

Evidence: `mobile-down-2.png`, `mobile-down-4.png`, `a11y.json`.

**Improve:** raise supporting mobile labels into a readable 10–12px range, important state labels higher; use dark text or a darker red behind normal-size cream contact text. Keep the large cream headlines if desired: their size supports their lower contrast better.

### 4. The cap animation exposes the flat cutout too plainly — medium priority, craft

**Both viewports after Pop the cap.** The interaction works and the label changes to Pop it again. In the settled pose the cap is a tilted flat image fragment and the bottle ends in a hard diagonal slice. The cream backing makes the cut conspicuous. It resembles separating two pieces of a paper collage more than popping a bottle. A collage interpretation is valid, but the cut and static hover-like resting position feel less resolved than the initial illustration.

Evidence: `desktop-cap-1080ms.png`, `mobile-cap-1080ms.png`, with initial and 180ms frames beside them.

**Improve:** art-direct a clean exposed neck and a cap asset with coherent thickness; give the cap a short convincing release and settle. If staying fully paper-like, make the torn/cut logic consistent with the rest of the brand. This is the page's principal playful action and merits the most finishing work.

### 5. The visual language becomes more conventional after the hero — medium priority, art direction

**Desktop details → studio → contact.** The opening has texture, object, cut paper, and large type in a specific relationship. The remainder becomes mostly giant heavy headings, a rules-based name list, and another giant two-line closing headline. It is clean, but the specificity drops. The team is names/aliases plus red asterisks, offering very little sense of how this particular trio works. The same extremely tight, heavy type treatment does a large share of the visual work in every section.

Evidence: `desktop-details-anchor.png`, `desktop-down-3.png`, `desktop-down-4.png`, `mobile-down-3.png`.

**Improve:** add one genuinely specific lower-page composition using real studio material or a real product workflow. Vary density and type scale; preserve the core label/rule system. A small, distinctive interaction tied to actual project content would do more than extra ambient animation. Do not invent roles, anecdotes, results, or studio photography to fill this gap.

### 6. Mobile project collage loses some editorial precision — lower priority, craft

**390×844 Work.** Two same-height garment rectangles are overlaid by a third jeans rectangle with its own background. The foreground jeans obscure significant parts of the other images and their lower caption area; only the first tiny caption is clearly readable in the reviewed composition. A relatively large gap separates the project strapline/stamp from the imagery. It reads as an assembled collage, but the pale rectangular grounds make the overlap feel boxy rather than naturally layered.

Evidence: `mobile-back-top-3s.png`, `mobile-down-1.png`, `mobile-work-anchor.png`.

**Improve:** decide whether the images are an editorial triptych or physical cutouts. If a collage, use consistent cutout edges/lighting and deliberate overlaps; if a triptych, let each item breathe. An actual app view would also provide a stronger organizing element.

## Interaction and coverage notes

- Scrolled through the complete page downward at both sizes, returned upward incrementally and directly, and captured every major section. Manual reverse scrolling restored the hero without observed persistent blank content.
- Exercised Pop the cap; captured initial, 180ms, and 1080ms states; followed work, project-details, studio, contact, and footer-top navigation. Mailto was inspected but not invoked.
- Tested desktop keyboard traversal, first-focus skip link, main visible focus outlines, mobile menu open, Escape close, and menu navigation close.
- Loaded the top of the site under reduced-motion preference at both sizes; the hero and its essential content remained visible. This was not a complete animation audit under that preference.
- Initial browser runs reported no page errors. No horizontal overflow was observed at 1440 or390.
- A fresh exploratory menu-focus script did not consistently open the menu before querying it, so its menu-focus list is **not** used as evidence of a focus-trapping failure. The separate successful menu test is recorded in `final-check.json`.
- No performance benchmark, screen-reader session, browser matrix, 200% zoom, 320px layout test, or production-network review was performed. The review is limited to the requested sizes and the local live build.

## Recommended order

1. Repair top/home navigation and confirm the scroll transition in both directions.
2. Replace the software-proof gap with the current real product UI/prototype and specific process evidence.
3. Fix small-text contrast and enlarge mobile metadata.
4. Finish the cap art/settle and tighten the mobile collage.
5. Develop one lower-page composition that carries the same level of identity as the hero.

The fastest route toward a genuinely stronger award-level experience is more specific product evidence and better interaction finishing, while retaining the bottle identity.
