# Diet Code independent live interaction review

Reviewed live at http://127.0.0.1:5173/ on 14 November 2026. Desktop 1440×900 and mobile 390×844, Chromium/Playwright; mobile touch via browser input emulation. Independent live-page assessment only: no repository source, project documentation, previous reviews, or other agents' findings were consulted. The review used visual screenshots, live DOM semantics/geometry, keyboard, wheel, touch, links, and reduced-motion emulation. No source edits were made.

## Verdict and fixed weighted rubric

**8.2/10 overall (8.215 unrounded).** A memorable, well-composed studio site with a distinctive print identity and unusually competent interaction fallbacks. The hero is closer to award-level craft than the body of work: the project section communicates a concept but never demonstrates the digital product or the studio's engineering ability. It is a strong portfolio introduction, with the biggest remaining gap being proof rather than more effects.

| Criterion | Weight | Score /10 | Weighted contribution |
| --- | ---: | ---: | ---: |
| Composition and typography | 25% | 8.5 | 2.125 |
| Identity and art direction | 25% | 8.8 | 2.200 |
| Motion and interaction | 20% | 8.0 | 1.600 |
| Mobile and accessibility | 20% | 8.2 | 1.640 |
| Content clarity | 10% | 6.5 | 0.650 |
| **Overall** | **100%** | **8.2** | **8.215** |

These are editorial scores against an Awwwards-level bar, not an official Awwwards assessment or WCAG conformance audit.

## What works

- **The first viewport feels authored.** Oversized black type, textured emerald bottle, vermilion paper, cream ground, torn edges and plain copy form one coherent identity. The studio description stays visible and the primary View OOTD action remains unmistakable. Desktop and mobile use different compositions without losing the concept. Evidence: `desktop-initial.png`, `mobile-initial.png`.
- **The motif has behavior.** Clicking the bottle or text action pops the cap; the action becomes “Pop it again,” with an updated accessible label and busy state. Space on the bottle button triggers the same response. The paper reveal reverses with native scrolling; it does not trap the user in a fake scroll track. Evidence: `desktop-bottle-pop.png`, `desktop-keyboard-bottle.png`, `desktop-tear-intermediate.png`, `desktop-behavior.json`, `edge-cases.json`.
- **Navigation and fallbacks are considered.** Work and View OOTD reveal the project, update the hash, focus the OOTD heading, and make the Inside the project link next in keyboard order. Mobile menu has large targets, a visible Close button in its settled state, a correct expanded state, keyboard focus cycling inside the menu, direct touch close, Escape dismissal, and focus return. Reduced motion has no active animations before or after the cap action and still exposes the work content. Evidence: `desktop-work-keyboard-focus.png`, `mobile-work-nav.png`, `mobile-menu-settled.png`, `mobile-open-menu-focus-3.png`, `reduced-390-work.png`.
- **The rest of the page is restrained and readable.** Strong type scale, generous margins, thin rules, and a controlled cream/black/red sequence give the team and contact sections continuity with the hero. The email is visible and usable as a mailto link. No horizontal overflow occurred at either specified size.

## Concrete issues and improvements

### P2 — Skip link does not skip header navigation

**Reproduction:** Fresh desktop page → Tab (Skip to content) → Enter → Tab. The hash becomes `#main`, scroll remains 0, and focus goes to “Diet Code home,” then through the header links. The skip target includes the header/hero navigation rather than providing a useful bypass. This is a real keyboard accessibility defect, even though the page is short.

**Evidence:** `edge-cases.json` → `skipNext` records focus on `<a class="brand" href="#top" aria-label="Diet Code home">...`; `desktop-behavior.json` → `skip-enter` records BODY focus at y=0.

**Improve:** Give the first meaningful content after the navigation a focusable target and move focus to it when activating the skip link. Verify that the next Tab reaches a content control, not the home or header links.

### P1 for portfolio credibility — OOTD shows wardrobe imagery, but not the app

**Observed:** View OOTD opens three garment photographs. Inside the project leads to a second editorial text block and metadata: iOS, Today/Wardrobe/Looks, In development. There is no visible app interface, interaction demonstration, prototype link, or explanation of a design/engineering decision anywhere in the reviewed full page.

**Evidence:** `desktop-work-nav.png`, `desktop-project-detail.png`, `mobile-work-nav.png`, `desktop-scroll-2.png`.

**Why it matters:** The opening promises creative engineering and digital products. The work section could currently belong to a clothing brand; it does not substantiate the software promise. This is the main reason the complete site scores below its hero.

**Improve:** Replace or complement part of the clothing composition with actual Today/Wardrobe/Looks screens or a short controllable prototype moment. Add one concrete product decision and the studio's contribution. Keep “In development”; no invented outcome metrics are needed.

### P2 — Team section supplies names without helping a prospective collaborator understand the team

**Observed:** The three rows contain names, aliases and an asterisk, while the introduction repeats the studio's broad positioning. No role, discipline, contribution, or relevant background distinguishes the people.

**Evidence:** `desktop-studio.png`, `mobile-touch-3.png`, `mobile-touch-7.png`.

**Improve:** Add one concise line per person stating what they do or own. Keep the visual treatment spare. This would add trust and useful specificity without turning the section into biography cards.

### P3 — Small supporting labels weaken mobile reading

**Observed:** On the mobile Work screen, the garment label and section/status microcopy are extremely small relative to the body and headline. Two garment photographs are overlapped by a foreground jeans photograph; only the first garment label is visible in the normal-motion mobile view. It remains visually attractive, but it asks visitors to treat the imagery as decoration rather than readable project evidence.

**Evidence:** `mobile-work-nav.png`, `reduced-390-work.png`.

**Improve:** If those labels carry meaning, increase their minimum size and present the three items in a consistent legible scheme. If decorative, remove the implied numbered inventory and use the space for real interface evidence.

## Interaction verification results

| Check | Observed result |
| --- | --- |
| Desktop wheel down / reverse | 650px increments reached bottom y=2783 and reversed to y=0; no scroll trap. |
| Mobile touch down / reverse | Touch gesture sequence reached bottom y=2527 and reversed to y=0; all major sections reachable. |
| PageDown / Home / End | PageDown reached y=836 then1672; Home y=0; End y=2783. |
| Bottle pointer / touch / keyboard | Visible cap response; Space activates; accessible busy/replay states observed. |
| Work navigation | Desktop y=540, mobile y=506 in normal motion; OOTD heading receives focus. |
| Work keyboard continuation | View OOTD + Enter + Tab focuses Inside the project. |
| Inside the project | Hash #ootd-details and visible project detail section. |
| Studio / Contact | Both anchor destinations visible and readable. |
| Back to top | Settled at y=0. A short observation during smooth scroll is not a failure. |
| Mobile menu | Settled Close × visible and touchable; Tab cycles Work→Studio→Contact→Close; Escape restores toggle focus. |
| Skip link | **Fails useful bypass:** Enter + Tab returns to home link. |
| Focus visibility | 3px contrasting outlines observed on the tested links/buttons. |
| Target sizes | Primary mobile controls inspected were at least44px high; menu links102px high. |
| Reduced motion | No active animations before/after cap action; immediate replay state; visible, reachable Work content. |
| Horizontal overflow | Document width1440 at desktop,390 at mobile. |
| Runtime errors | No pageerror events observed in the desktop/mobile runs. |

## Evidence and limitations

All evidence is under `/private/tmp/dietcode-interaction-review/`.

Primary screenshots: `desktop-initial.png`, `desktop-tear-intermediate.png`, `desktop-bottle-pop.png`, `desktop-keyboard-bottle.png`, `desktop-work-nav.png`, `desktop-project-detail.png`, `desktop-studio.png`, `desktop-contact.png`, `mobile-initial.png`, `mobile-work-nav.png`, `mobile-menu-settled.png`, `mobile-open-menu-focus-3.png`, `mobile-touch-7.png`, `reduced-1440-work.png`, `reduced-390-work.png`.

Behavior logs: `desktop-behavior.json`, `mobile-behavior.json`, `mobile-focus.json`, `edge-cases.json`, `final-confirm.json`. Reproduction scripts are retained alongside them.

An early350ms mobile menu capture omitted the close affordance and retained the old toggle label; a later repeated settled-state check showed a visible functional Close button and correct focus trap. The settled verified result is reported, not a persistent menu failure. The live server may also have changed during the review; no source was consulted to resolve that possibility.

This does not verify real iOS Safari, VoiceOver/NVDA, browser zoom/reflow beyond the specified viewports, an exhaustive color-contrast audit, or performance on a low-end physical phone. Contact was inspected as a mailto link; no message was sent. No source detector was used because this task explicitly required a live-only independent review. Questions skipped: this is a delegated review with a fixed rubric and no implementation authorization.
