# Diet Code — independent live-site review

Reviewed http://127.0.0.1:5179/ on 15 November 2026. Browser-only, no brief, no repository source, project documents, or other reviewers' findings. One independent reviewer. Desktop 1440×900 and mobile 390×844, entire page forward and reverse; all browsers created for this review were closed. No website edits.

## Verdict

**7.9/10 weighted overall (7.87 unrounded).** A confident, memorable studio site with a particularly good first screen and an unusually honest, working product study. It is stronger as an identity presentation than as proof that this team can deliver software for someone else. I would shortlist the visual direction; I would not yet treat it as a complete Awwwards-level studio portfolio. This is a review judgment, not an official Awwwards score.

| Category | Weight | Score /10 | Weighted contribution |
|---|---:|---:|---:|
| Composition and typography | 25% | 7.9 | 1.975 |
| Identity and art direction | 25% | 8.3 | 2.075 |
| Motion and interaction | 20% | 7.7 | 1.540 |
| Mobile and accessibility | 20% | 8.0 | 1.600 |
| Content clarity and credibility | 10% | 6.8 | 0.680 |
| **Total** | **100%** | | **7.870** |

## What works

- The bottle, cream paper label, halftone image treatment, torn red ground, heavy masthead, and closing “uncap” line form a specific identity. It feels authored for Diet Code rather than reskinned from a studio template. The bottle leads without hiding the plain statement “We design and build digital products.”
- The layout handles contrast and type scale confidently. Full-width OOTD imagery, a quiet cream project section, the black team section, and the red contact ending provide clear chapters. Edges and rules are disciplined; body copy is comfortable at both tested sizes.
- OOTD is clearly an iOS app in development. The example wardrobe is named as an example, and the kept-look screen explicitly says that the preview is separate from the iOS app. This is valuable honesty, not an unfinished-state defect.
- The demo works. All four starting garments can be selected; each remains in the outfit while another garment changes. “Keep this look” switches to Looks, shows the saved combination, and the same kept look remains after reload. The mobile implementation is usable, with a large menu and readable controls. Keyboard tab navigation between Wardrobe, Today, and Looks uses arrow keys and updates selected/tabindex state; dynamic feedback has a polite live status. A visible skip link works once its navigation settles. Reduced-motion content remains usable.

## Priority improvements

### P1 — The studio claim needs evidence of the people doing the work

The studio section offers three first names and aliases, an asterisk per row, and “Small crew. Full of ideas.” It does not tell a prospective client who designs, who engineers, who leads an engagement, or what any of them have delivered. With a single in-development project elsewhere, this leaves the commercial trust question unanswered. The visual confidence is much higher than the substantiation.

**Improve:** add a concise, factual role and one useful credential or work link per person. If there is no previous client portfolio, explain the team's actual contribution to OOTD and show a concrete artifact. Name the kinds of engagement the studio accepts in one sentence. Do not invent clients, metrics, experience, or testimonials.

Evidence: `desktop-forward-2250.png`, `desktop-forward-3000.png`, `mobile-forward-2720.png`, `mobile-forward-3400.png`.

### P2 — The software case study is mostly an idea demonstration

A viewer understands the wardrobe concept and can try it, but sees no actual iOS interface, product capture, release milestone, or account of the team's design/build work. The clothing photographs initially read as a fashion editorial; the website interaction proves frontend craft but does not substantiate the iOS product. “Inside the project” promises more case-study depth than the short idea explanation supplies.

**Improve:** put one genuine iOS screen or prototype capture beside a short explanation of the user problem, what the team built, and the current stage. Label it accurately if it is a concept. Show one real design or engineering decision and its visible consequence. Preserve the existing browser study as the try-it component.

Evidence: `desktop-work-link.png`, `desktop-forward-1500.png`, `desktop-saved.png`.

### P2 — The mobile project flow puts explanation ahead of the primary action

At 390px the Wardrobe tab is followed by the entire “A place for every piece” explanation and process line before the wardrobe chooser. The reader is told to pick a starting piece, then must scroll through prose to reach the garments. In the saved state, the top-level tabs sit outside the visible panel after automatic positioning. It is usable, but the relationship between the three navigation tabs and their long panel is less immediate than on desktop.

**Improve:** on mobile lead each tab with its interactive/result area and put the supporting explanation below it, or shorten that explanation substantially. Keep the active tab visible when changing the study state so the transition remains legible. This is a pacing improvement, not a broken-flow claim.

Evidence: `mobile-forward-1360.png`, `mobile-forward-2040.png`, `mobile-indigo-selected.png`, `mobile-saved.png`.

### P2 — The distinctive visual idea does most of its work in the hero

The opening has a clear physical metaphor and delight. The rest is competent editorial layout: product photos, boxed study, name rows, oversized closing type. Brand color and stars maintain consistency, but there is no second comparably specific reveal of the studio's creative engineering abilities. Against an award-site standard, the experience peaks early and then becomes familiar.

**Improve:** invest in one product-grounded moment within the existing OOTD story: a genuine wardrobe-to-look composition, an actual app interaction, or a concise before/after design decision. Give that moment the same care as the cap. Avoid adding an unrelated animation merely to increase motion count.

Evidence: `desktop-top.png` compared with `desktop-forward-1500.png` and `desktop-forward-3000.png`.

### P3 — Translate the architecture paragraph into the user's benefit

“Available wardrobe items,” “optional AI ranking step,” and “locally built options” are relatively internal terms after otherwise simple copy. It is a worthwhile engineering decision, but its consequence takes more reading than necessary.

**Improve:** lead with the concrete benefit — suggestions are made from clothes in the wardrobe, and remain available if AI ranking is unavailable — then put the implementation detail in a short second sentence. This would retain the technical credibility while improving first-read clarity.

Evidence: `desktop-forward-2250.png`, `mobile-forward-2720.png`.

## Interaction checks and limits

- Cap: worked at both widths; the cap visibly separated from the bottle and action changed to “Pop it again.” The replay affordance remained available. Evidence: `desktop-cap-rest.png`, `mobile-cap-rest.png`.
- Work navigation and mobile menu: menu opened, navigation reached the work section. Evidence: `mobile-menu.png`, `desktop-work-link.png`.
- All four garments: tested selection, variation, return to wardrobe. The anchored garment remained. Text traces: `desktop-finished.txt`, `mobile-finished.txt`.
- Save: selected a white linen guayabera, varied the outer layer, kept the look, inspected result; reload retained it in the same context. Evidence: `desktop-saved.png`, `mobile-saved.png`, `desktop-reload-looks.png`, `mobile-reload-looks.png`.
- Forward/reverse scroll: all sections inspected at both sizes; explicit return to zero restored the hero without a stuck layer. Evidence: `desktop-returned-top.png`, `mobile-returned-top.png`. The earlier files named `*-reverse-top.png` are intermediate reverse-scroll captures, not the final zero position.
- No horizontal overflow at the tested viewport widths; the page reported 1440px and 390px scroll widths respectively. No missing image in the inspected DOM and no page error recorded during the selection/save runs.
- Keyboard and reduced motion: spot-checked skip link, visible focus, tab arrow navigation, and the example flow. Evidence: `a11y.json`, `desktop-keyboard-skip.png`, `mobile-keyboard-tab.png`. The initial immediate `secondFocus` trace in a11y.json predates settled skip navigation; a separate 700ms-settled check confirmed focus moves to the h1 and the next Tab goes to the bottle control. Do not interpret that initial trace as a skip-link bug.
- No formal screen-reader, contrast-ratio, performance, real-device, or network-throttling audit. Email links were inspected but no email was sent. No claims about production uptime or backend behavior.

The key next step is truthful product and team evidence. Preserve the visual identity and functioning study while making the studio's competence as concrete as its personality.

Questions skipped: independent assessment requested; no implementation scope or user decision needed.
