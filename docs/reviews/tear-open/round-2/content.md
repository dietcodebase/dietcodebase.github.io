# Independent live-site review — Diet Code

Reviewed only http://127.0.0.1:5174/ in Chromium at **1440×900** and **390×844**, with the whole page traversed down and back up, plus its working controls. No repository source, project documentation, or other reviewers' reports informed this review. Screenshots and raw browser observations are in this directory.

**Weighted overall: 8.0/10 (8.04 unrounded).** A distinctive, accomplished studio introduction with a strong tactile identity. It leaves a clearer memory of the studio's personality than evidence of its product and engineering craft. The largest improvement is to make OOTD visibly demonstrate the claims the text already explains.

| Fixed category | Weight | Score /10 | Assessment |
|---|---:|---:|---|
| Composition and typography | 25% | **8.3** | Confident oversized type, disciplined outer edges, good light/dark/red sequencing, clear hierarchy. The desktop hero is particularly composed. Below it, the visual repertoire narrows to repeated garment images and very heavy headlines. |
| Identity and art direction | 25% | **8.5** | Bottle, halftone treatment, torn paper, red stamps, cream/black/red palette, and “uncap” language form one memorable world. The bottle is specific enough to carry the identity. The project section's art is less distinctive and less informative than the hero. |
| Motion and interaction | 20% | **7.6** | The cap responds, the opening peel is reversible, section links land correctly, and the story switches reliably. These are tasteful, intelligible moments. There is no comparably strong product interaction or demonstrative sequence after the opening; switching photographs is a modest second act at this bar. |
| Mobile and accessibility | 20% | **8.0** | The hero is intentionally recomposed, the menu is legible and generous, tabs remain usable, and no horizontal overflow appeared. Keyboard tab semantics and arrow navigation worked. Some supporting labels are very small; the mobile story separates its controls and explanatory copy by a tall photograph. Formal assistive-technology and contrast audits remain outside this review. |
| Content clarity | 10% | **7.4** | The studio category is explicit on screen one. OOTD is plainly described as an iOS wardrobe app in development, and each feature has understandable prose. The studio's actual contribution, distinctive capabilities, and the product's design decisions remain thinly evidenced. |

Calculation: 8.3×0.25 + 8.5×0.25 + 7.6×0.20 + 8.0×0.20 + 7.4×0.10 = 8.04.

## What is already working

- The opening is memorable and complete at both sizes. The studio descriptor and useful “View OOTD” action fit in the first viewport. The bottle reads as an intentional piece of art, rather than decoration added to a standard hero. Evidence: `desktop-top.png`, `mobile-top.png`.
- OOTD's premise is clear once reached: plan looks from clothes you already own. “iOS · In development” gives an honest status, and the site does not pretend the app can already be downloaded. Evidence: `desktop-work-nav.png`, `mobile-work-nav.png`.
- The project tabs have a real content model. Wardrobe covers adding/reviewing/searching pieces; Today explains choosing a starting piece and composing a look; Looks explains saving and revisiting combinations. This is meaningfully more informative than three empty feature slogans. Evidence: `desktop-story-wardrobe.png`, `desktop-story-today.png`, `desktop-story-looks.png`.
- Team and contact are easy to find. The email is written out, rather than hidden behind a vague CTA, and the visual tone stays consistent through the footer. Evidence: `desktop-down-2250.png`, `desktop-bottom.png`, `mobile-bottom.png`.

## Concrete shortcomings and improvements

### 1. High impact: product imagery does not demonstrate the product

The project introduction shows a jacket, a tee, and jeans. The three interactive story panels repeat those same single-garment photographs. In the Today panel, “build a look” is represented by a lone tee; in Looks, “Keep a good combination” is represented by lone jeans. The viewer understands the garment category, but cannot see a composition, a saved look, a review step, or a search result. There is no visible iOS interface in the full experience I reviewed.

This is the biggest gap between the quality of the branding and the evidence of a creative engineering studio. Keep the garment-led project opening, then use the story panels to show the relevant real product state or a clearly identified current prototype. Wardrobe could show photo → review → wardrobe; Today should show the starting piece and completed outfit; Looks should show a saved combination and its retrieval. Pair each with one actual design decision or constraint, rather than more aspirational copy. Do not invent shipped outcomes while the app is in development.

Evidence: `desktop-work-nav.png`, all three `desktop-story-*.png` files, `mobile-story-looks.png`.

### 2. Medium impact: the studio's capabilities are asserted more than explained

“We design and build digital products” and “We turn ideas into software, together” are clear category descriptions, but broad. The team section supplies names and aliases without roles, specialties, or links to work. After seeing the whole page, I know who is in the crew, but not how their skills combine, what part of OOTD they own, or what kind of project they are especially well suited to deliver.

Add a concise, factual role or specialty to each person and a short statement of the team's contribution to OOTD. One specific challenge and decision would do more for confidence than another broad studio promise. Preserve the spare layout; this does not need a long agency services catalogue.

Evidence: `desktop-studio-nav.png`, `mobile-down-4.png`, `mobile-down-5.png`.

### 3. Medium craft issue: mobile story feedback is visually distant from its explanation

At 390×844, the tabs sit above a roughly 310px garment image. Immediately after selecting Today or Looks, the explanatory paragraph is below the viewport; the Looks title itself reaches the bottom edge. The selection is visible, but the useful explanation requires another scroll. This is workable, yet weaker than desktop, where control, image, heading, and paragraph can be seen together.

Reduce the story image height on small screens, put the concise feature explanation before the image, or otherwise arrange the panel so the selected task and its first sentence appear in the same viewport as the tabs. Showing an actual small product interaction would also use this area more efficiently.

Evidence: `mobile-story-today.png`, `mobile-story-looks.png`, contrasted with `desktop-story-today.png`.

### 4. Low craft issue: the mobile project opening spends space on tiny supporting labels

The three narrow garment images remain in one row on mobile, with staggered lower edges and very small uppercase labels. They establish fashion direction, but the labels do little to explain the app. Meanwhile the clear one-sentence app description sits much lower in the section. A visitor scanning the first half of this section can briefly read it as apparel imagery rather than software.

Move the plain app description nearer the OOTD title, and give the narrow photographic row a simpler supporting role. Enlarge or simplify the labels rather than relying on tiny uppercase metadata. This is a refinement, not a broken layout.

Evidence: `mobile-work-nav.png`, `mobile-down-1.png`.

## Tested interactions and observations

- Scrolled the entire desktop and mobile page downward in increments and returned upward to the opening. The hero restored; no scroll trap or persistent missing section appeared. Desktop document width was 1440; mobile was 390, matching their viewports.
- Activated the bottle-cap action on both layouts; visible cap separation occurred. Evidence: `desktop-cap.png`, `mobile-cap.png`.
- Activated “View OOTD,” “Inside the project,” “Studio,” “Put us to work,” and “Back to top.” These reached the expected sections; desktop Back to top returned to scrollY 0. Evidence: `desktop-work-nav.png`, `desktop-studio-nav.png`, `desktop-contact-nav.png`, `desktop-back-top.png`, mobile equivalents.
- Opened the mobile menu and selected Studio. The menu closed on navigation. Escape also closed it; aria-expanded changed from true to false. Evidence: `mobile-menu.png`, `mobile-studio-nav.png`, `validation.json`.
- Selected all three story tabs on desktop and mobile and checked their changed headings, descriptions, image, and selected state. Keyboard ArrowRight moved from Wardrobe to Today and selected Today. Enter retained focus on the selected tab after settling. Tab roles, aria-selected, roving tabIndex, controls, and corresponding labelled panels were present. Evidence: `validation.json`, `keyboard.json`, `desktop-keyboard-confirmed.png`.
- Keyboard Tab first reached the visible skip link. After activation settled, focus was on the hero h1; the next Tab reached the cap control, skipping the navigation. Evidence: `desktop-keyboard-skip.png`, `keyboard.json`.
- Reduced-motion emulation displayed the content and replaced the opening peel with a normal vertical progression in the sampled view. Evidence: `desktop-reduced-motion.png`, `desktop-reduced-motion-work.png`.
- Sampled visible mobile controls measured at least 44px high. Main links and buttons were easy to target. Meaningful images had descriptive alt text; the cap fragment had an empty alt. No page JavaScript errors were recorded in the completed desktop/mobile checks.
- The contact control has `mailto:dietcode@sike.dev`. I inspected the destination and did not send mail or validate delivery.

## Limits

This is a design and interaction assessment of one local frozen build, not an accessibility certification, performance benchmark, or actual Awwwards jury result. Mobile used Chromium emulation with a 390×844 viewport and touch capabilities, not physical iPhone/Safari hardware. I did not test VoiceOver, NVDA, all contrast combinations, slow-network loading, browser zoom, older browsers, external mail delivery, or source correctness. Reduced motion was sampled at the opening and transition, not exhaustively measured frame by frame. Screenshots are static evidence of observed states, not motion recordings. An initially unvisited hidden lazy image reported incomplete in one DOM snapshot; it rendered when its tab was selected, so it is not reported as a broken image. No source changes were made.
