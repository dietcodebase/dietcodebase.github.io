⚠️ DEGRADED: single-context (assigned independent browser-only review; no repository reading, detector, or nested reviewers used).

# Independent interaction and design review

Target: http://127.0.0.1:5178/
Reviewed 2026-11-15 in real headless Chromium through Playwright at 1440×900, 390×844, and 375×667. No brief, repository source/docs, or other review was read. Browser interactions and the resulting live DOM were inspected. Screenshots are in this folder. This is a review, with no site edits.

## Verdict and weighted score

**7.9/10 (7.93 weighted).** This has an authored, memorable identity and a credible level of visual craft. It is above an ordinary studio portfolio. The hero is the strongest moment; the rest of the page is coherent but less surprising. It is close to the intended award-site standard visually, but the accessibility reveal and short-phone interaction composition keep it from feeling fully finished.

| Category | Weight | Score /10 | Reason |
|---|---:|---:|---|
| Composition and typography | 25% | 8.2 | Strong edges, confident scale, readable hierarchy, and clear cream/black/red chapter changes. Some mobile space is spent explaining the demo before showing its result. |
| Identity and art direction | 25% | 8.8 | The tactile green bottle, torn red sheet, large wordmark, and uncap language form a specific identity. The later clothing grids and team-name list are more conventional. |
| Motion and interaction | 20% | 7.8 | Cap pop and replay work; forward/reverse scrolling recovers; the wardrobe actually generates, varies, keeps, and resets looks. The small-phone result is separated from the action, and the demonstration alternates a small number of combinations. |
| Mobile and accessibility | 20% | 7.0 | Good tap sizes, no horizontal overflow at390px, a useful full-screen menu, working Escape/focus return, tab semantics and arrow navigation, and reduced-motion support. The hidden/inert work summary and clipped bottom focus outline are remaining issues. |
| Content clarity | 10% | 7.2 | The first screen clearly says what the studio does; OOTD is honestly labelled in development and the example is distinguished from the iOS app. Services, roles, delivery capability, and outcome proof stay thin. |

## What works

- The hero is recognisable without reading the studio name. Bottle artwork, paper texture, restrained palette, and oversized type support the same idea. Both desktop and mobile maintain that character.
- The OOTD interaction is functional rather than a static marketing mock. Selecting Cream tee keeps it in the generated outfit; varying changes the jacket; keeping opens a saved-preview state; reset returns to the wardrobe. The copy explains the preview’s scope.
- Basic access has received attention: the skip link appears first; controls have visible focus; tab buttons expose selected state; ArrowDown moves from Wardrobe to Today; menu expanded state is reported; Escape closes the mobile menu and restores its button’s focus. Reduced-motion view had no active animations and all inspected content rendered.

## Prioritized findings

### P1 — The work summary is removed from accessibility until its visual reveal

**Reproduction:** Fresh load at1440×900 or375×667. Tab through the hero without activating View OOTD. After View OOTD, the next Tab goes directly to the Wardrobe tab. It skips Inside the project. Live DOM inspection shows the ancestor `section#work` has `aria-hidden="true"` and `inert=true` at initial load. The project-summary link does not appear as an accessible link until work has been visually revealed by scrolling/navigation.

**Impact:** A keyboard or screen-reader visitor encounters the interactive detail without traversing its project overview. The available reading/navigation order depends on having triggered a decorative scrolling state. The link still works when reached through View OOTD, so this is a missing independent access path, not a universal navigation failure.

**Improve:** Keep project meaning and links available in normal document order. Apply visual concealment/reveal to decorative layers; avoid using `inert` and `aria-hidden` for an ordinary offscreen content section. Ensure a fresh-load keyboard sequence includes Inside the project.

**Evidence:** `targeted.json` → `initialProjectAncestors` and `keyboard`; `small-phone.json` → `keyboard`; `desktop-settled-key-9.png`.

### P2 — Mobile controls appear before the complete outfit they change

**Reproduction:** At375×667, View OOTD → Inside the project → select Cream tee. The newly focused panel begins near y24. Instructions and actions fill the upper395px. The outfit heading starts near y419, with the first garments at y516–627. Trousers and shoes are below the viewport. Try another combination stays around y241 while the changed jacket appears near the bottom. Keeping a look repeats the same pattern: confirmation/actions first, partial outfit below.

**Impact:** The action works, and the first changed jacket is visible; nevertheless, users must scroll to inspect the complete result before deciding whether to keep it. The control-to-result distance makes an otherwise simple, satisfying demo feel more like a long explanatory card. At390×844 it is better, but the full outfit still extends to the lower edge.

**Improve:** Put a compact outfit composition immediately after its short state heading on mobile. Place variation/keep actions directly beneath the composition, or show a small persistent overview beside them. Reduce repeated explanatory copy. When the state changes, focus a concise heading or result region that makes the new composition visible without hiding the action context.

**Evidence:** `small375-after-pick.png`, `small375-after-vary.png`, `small375-after-save.png`, `mobile-project-today.png`, `small-phone.json`.

### P2 — Positional instruction contradicts the desktop layout

**Reproduction:** On the desktop Wardrobe panel, read “Choose a jacket or a top below.” The selectable garments are above that copy. On mobile, the garments are below it.

**Impact:** A small but concrete mismatch in the demo’s guidance; it reads like mobile copy reused without checking the desktop order.

**Improve:** Use position-independent wording such as “Choose a jacket or a top to start your look.”

**Evidence:** `desktop-project-wardrobe.png` and `mobile-scroll-1500.png`.

### P3 — Lower focus outline is clipped on the short phone

**Reproduction:** At375×667, use Tab from fresh load at an ordinary pace. The Cream tee or White linen guayabera card lands at approximately y501 with height166px. The bottom edge is at the viewport boundary, so the focus outline extending beyond it is clipped. The label and action remain readable; focus is not lost.

**Improve:** Give focused controls enough scroll margin to expose their full outline, including its offset. Recheck forward and reverse Tab with the taller wardrobe card.

**Evidence:** `small375-keyboard-11.png`, `small375-keyboard-12.png`, `small-phone.json`.

## Award-level improvements after the functional fixes

1. Carry more of the bottle’s authored character into OOTD and the studio chapter. The current clothing photographs and names are orderly, but less distinctive than the opening. Give the project a recognisable app-specific visual composition and the people a little more individual expression.
2. Provide one concise proof of engineering/design capability: a real app screen, a concrete design decision, each person’s role, or the studio’s contribution to the project. The current interactive wardrobe explains the concept well, but reveals little about the actual iOS product or delivery craft.
3. Keep the playful cap interaction as a short optional delight. The existing direct path to View OOTD is useful; no extra gate is needed.

## Tested behavior and limits

- Full page covered by forward and reverse desktop scroll captures and mobile section captures; bottle remains present when returning to the hero and replay is offered after opening.
- Desktop Work and project anchors reached their intended chapters. Mobile menu Studio navigation worked and closed the menu.
- All measured visible controls outside the oversized artwork had heights of44px or more at390px. Page width matched viewport width:390px.
- At a settled700ms keyboard pace, desktop actions stayed in viewport. Very fast80ms tabbing temporarily outran smooth scrolling; this was not treated as a persistent offscreen-focus defect.
- Reduced-motion desktop had zero reported active animations, a rendered hero, work, and project content.
- No page errors were observed in the main run.
- This was browser emulation, not physical iOS testing or a full screen-reader/contrast/performance audit. Mailto destinations were inspected but no email was sent. All owned browser sessions have ended; the supplied server was left running.

Questions skipped: this is an assigned independent review artifact, with no implementation decision requested.
