# Diet Code live website review

Reviewed 14 November 2026 at http://127.0.0.1:5173/ in Chromium at 1440×900 desktop and 390×844 mobile. Only the rendered website, live DOM/accessibility properties, and actual browser interactions were inspected. No repository source, documentation, other reports, or other reviewers' conclusions were consulted.

## Verdict

**7.6 / 10 weighted overall.** A memorable, coherent studio identity with confident typography and unusually strong first-impression artwork. It reads as a designed studio site rather than a generic portfolio. It is not yet at a consistently award-ready level: a broken return interaction and thin evidence of the studio's work are the principal limits. The project idea is understandable; the studio's specific expertise and execution are harder to judge.

| Criterion | Weight | Score / 10 | Weighted points |
|---|---:|---:|---:|
| Composition and typography | 25% | 8.2 | 2.050 |
| Identity and art direction | 25% | 8.5 | 2.125 |
| Motion and interaction | 20% | 6.5 | 1.300 |
| Mobile and accessibility | 20% | 7.0 | 1.400 |
| Content clarity | 10% | 7.0 | 0.700 |
| **Overall** | **100%** | **7.6** | **7.575** |

## What works

- The oversized DIET CODE masthead, tactile green bottle, torn cream paper, red field, and terse label-like language form a recognizable identity. The cap interaction belongs to that identity rather than feeling bolted on. See desktop-top.png, desktop-pop.png, mobile-top.png.
- Cream/black/red section changes give the page a legible sequence. Strong margins and rules hold the much quieter OOTD and team sections together. Desktop project prose uses a good two-column hierarchy; mobile reflows it cleanly. See desktop-scroll-2.png and mobile-scroll-2.png.
- The hero states both category and basic offer: an independent creative engineering studio that designs and builds digital products. OOTD is explicitly presented as an iOS wardrobe app in development, avoiding an implication that it is already available.
- The email contact route is immediate and readable, with no form friction. Team names add a human presence. Mobile main copy remains comfortable, CTAs are large, and the 390px page has no horizontal overflow (document width and viewport width both 390px).
- Keyboard focus is visible. The skip link is the first focus target. The mobile menu cycles focus among its toggle and three links, Escape dismisses it, and selecting Studio closes it and scrolls to the correct section. Images have appropriate descriptive alt text for the bottle and clothes; the separate decorative cap image has empty alt text.

## Concrete findings and improvements

### 1. High: “Back to top” goes to the project, not the top

From the footer, click Back to top. Desktop moves from scrollY 2783 to **516**, mobile from 2527 to **482**. Both change the hash to #top and remain at those positions across four subsequent one-second checks. The result is an OOTD viewport; the studio hero and main navigation are still above the screen. Normal reverse scrolling reaches scrollY 0.

Evidence: 1440-back-to-top-result.png; 390-back-to-top-result.png. The defect was reproduced in separate passes at both sizes.

Improvement: make the destination correspond to the actual document start, including any scroll-driven hero treatment. Verify the final position, not merely the hash or that an animation runs. Check the footer home link as well because it advertises the same top destination.

### 2. High editorial priority: OOTD demonstrates a theme, not yet a product or the studio's execution

The project section shows a jacket, T-shirt and jeans, then the idea statement and three metadata rows: iOS, Today / Wardrobe / Looks, In development. That establishes the wardrobe concept but provides no actual app screen, interaction sequence, prototype preview, or account of the studio's design/engineering contribution. “View OOTD” and “Inside the project” promise more substance than the subsequent explanation delivers.

Evidence: desktop-scroll-1.png, desktop-scroll-2.png, mobile-scroll-1.png, mobile-scroll-2.png.

Improvement: retain the garments as an introduction, then show one real current app flow or development artifact, clearly labeled with its actual status. Explain what the studio is solving and what it has designed/built so far. Do not invent results, release status, clients, or metrics. If no artifact can yet be shared, add a precise, factual description of the current work and decisions instead of repeating the wardrobe premise.

### 3. Medium: the team section does not establish individual or collective expertise

Three names and aliases are provided, but no roles, capabilities, working method, or meaningful link for learning about their work. “We turn ideas into software, together” largely repeats the hero's offer. A prospective collaborator can understand that there are three people but cannot judge what they bring to a project.

Evidence: desktop-scroll-3.png; mobile-studio-nav.png.

Improvement: add one verified role or short expertise line per person and one concrete sentence about how the studio takes on work. Keep the large names and restrained layout. Facts must come from the people, not inference.

### 4. Medium: mobile editorial labels shrink beyond comfortable reading

Live computed styles at 390px show 8px type on the work/studio/contact section labels, status label, idea label, and several short taglines. Garment numbering is 7px; footer supporting copy is 9–10px. These details become decorative texture rather than useful wayfinding. The primary body copy and CTAs are substantially better.

Evidence: mobile-scroll-1.png, mobile-scroll-2.png, mobile-scroll-3.png, mobile-scroll-5.png. Sizes were measured from the rendered DOM, not source files. This is a usability finding, not a claim that a particular minimum-font WCAG rule was violated.

Improvement: raise informative labels toward 10–12px and simplify or wrap long section labels to preserve the same alignment. Keep touch target sizes, which are generally 44px or greater in the sampled links/buttons.

### 5. Low: mobile menu open state retains “Menu ＋”

The full-screen menu works, but its expanded toggle still reads Menu and shows a plus. In an early entrance frame (400ms screenshot), the header control was not visible; after settling it is visible and tappable. It successfully closes the menu, and Escape and focus cycling work. This is a state/affordance issue, not a permanently invisible or unusable close control.

Evidence: mobile-menu.png (early frame), mobile-menu-settled.png (settled state), mobile-menu-tab.png (visible focus).

Improvement: change the expanded label to Close and/or turn the plus into a clear close mark. Keep that affordance visible through the entrance.

### 6. Low: mobile garment collage weakens caption correspondence

The mobile overlap is more interesting than merely stacking the desktop grid, but the jeans sit over the lower middle of the two background garments. The visible caption structure no longer corresponds cleanly to all three images; the desktop's three-item inventory reads more clearly.

Evidence: mobile-scroll-1.png compared with desktop-scroll-1.png.

Improvement: preserve the overlap if it is part of the intended art direction, but either provide a clean shared caption or relocate all informative labels where the foreground image cannot cover them.

## Interaction and responsive checks

- Forward scroll across the complete page and reverse scroll inspected at both viewport sizes. Screenshots retained for successive positions and return journeys.
- Pop the cap clicked: the cap visibly separates from the bottle. See desktop-pop.png.
- Desktop Studio and Contact navigation exercised successfully. Mobile menu Studio, View OOTD, Inside the project, and Put us to work exercised successfully.
- Mobile menu opened, toggled closed, dismissed with Escape, and traversed with Tab. Focus cycles through the three links and toggle.
- Back to top failed as detailed above, reproducibly at both sizes.
- Skip-link focus visibly inspected on desktop. See desktop-focus.png.
- A reduced-motion browser session was opened and the cap interaction exercised; mobile-reduced-motion-pop.png records the result. No timing-based accessibility compliance conclusion is asserted from that still image.
- No page JavaScript exceptions were observed during the completed mobile pass or the final desktop contact/reverse-scroll pass.
- The email link is a mailto link to the displayed address. No email was sent. The review did not validate receipt or an external mail client.
- Mobile was emulated Chromium at the specified viewport, not physical-device Safari. This is an editorial and interaction review, not a full WCAG or cross-browser audit.

## Priority order

1. Correct Back to top and verify all top/home destinations at both sizes.
2. Add truthful product evidence and a specific account of the studio's contribution.
3. Add verified team expertise and a concrete description of the studio's offer.
4. Increase mobile microtype and clarify menu state.
5. Refine the garment-caption relationship without losing the collage character.

## Evidence

All files are in /private/tmp/dietcode-content-review/.

Primary desktop screenshots: desktop-top.png, desktop-pop.png, desktop-scroll-1.png, desktop-scroll-2.png, desktop-scroll-3.png, desktop-scroll-4.png, desktop-studio-nav.png, desktop-reverse.png, desktop-reverse-top.png, desktop-focus.png, 1440-back-to-top-result.png.

Primary mobile screenshots: mobile-top.png, mobile-menu.png, mobile-menu-settled.png, mobile-menu-tab.png, mobile-menu-escape.png, mobile-work-nav.png, mobile-studio-nav.png, mobile-scroll-1.png, mobile-scroll-2.png, mobile-scroll-3.png, mobile-scroll-4.png, mobile-scroll-5.png, mobile-reverse.png, mobile-reduced-motion-pop.png, 390-back-to-top-result.png.
