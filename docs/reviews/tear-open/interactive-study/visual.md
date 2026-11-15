# Diet Code — independent live visual review

Target: http://127.0.0.1:5178/  
Reviewed: 15 November 2026  
Method: one independent critic, blind to the brief, repo source, documentation, and other reviews. Actual Chromium at desktop 1440×900 and mobile 390×844. Screenshots and live interactions; no website changes. This is a visual/interaction review, not a source or automated accessibility audit. Impeccable and design-taste criteria informed judgment; the full dual-agent Impeccable detector workflow was outside this deliberately independent assignment.

## Verdict and scores

**7.9 / 10 weighted overall.** Visually distinctive and professionally composed, with an unusually coherent soda-label metaphor. The hero is the memorable part. The body becomes a capable editorial studio site rather than sustaining the opening's invention. I would regard this as credible award-submission work with further craft potential, not an obvious top-tier Site of the Day on visual experience alone.

| Category | Weight | Score / 10 | Assessment |
|---|---:|---:|---|
| Composition / typography | 25% | 8.5 | Excellent scale, decisive weights, strong edges and confident negative space. The body repeats a fairly conventional heavy-heading/rule system. |
| Identity / art direction | 25% | 8.6 | Bottle, torn paper, cream/red/black, condensed spacing, asterisk and copy form a real identity. The wardrobe imagery is tidy but less distinctive. |
| Motion / interaction | 20% | 7.2 | Cap pop, replay, reversible scroll opening, functional project states and clear controls. The interactive wardrobe is more a content switcher than an exceptional expressive experience. |
| Mobile / accessibility | 20% | 7.5 | Hero recomposition is strong, menu is usable, no horizontal overflow, large targets and working keyboard tabs. Mobile demo ordering weakens immediate visual feedback. |
| Content clarity | 10% | 7.0 | Studio purpose and in-development status are clear. Cap metaphor is coherent, but the work and team provide limited concrete evidence of capabilities. |

Calculation: 8.5×.25 + 8.6×.25 + 7.2×.20 + 7.5×.20 + 7.0×.10 = **7.915**.

## What succeeds

- **The opening is genuinely authored.** The near-edge-to-edge DIET CODE typography, oversized tactile green bottle and ragged red ground create a strong silhouette. The small torn-paper studio description is an effective counterweight. It feels like one visual decision, not assembled effects. See `desktop-initial.png` and `mobile-initial.png`.
- **The metaphor continues into behavior and language.** Popping the cap reveals an open neck and lifted cap; the control becomes “Pop it again.” “Scroll to tear open,” “The people behind the label” and “Let’s uncap it” carry the idea without making the basic offer obscure.
- **The page has good tonal rhythm.** Cream work → black studio → red contact gives the long page distinct acts. The black studio section and giant final call to action feel deliberate; neither is filled with decorative filler.
- **It works as an interface.** The project is not a dead image. Wardrobe → Today → Looks changes the panel; choosing a garment preserves a marked starting piece; another combination changes the outfit; keeping produces a preview result; reset returns to Wardrobe. The demo is explicit about being separate from the iOS app.
- **Mobile is thoughtfully recomposed.** The stacked masthead and diagonal bottle retain the desktop identity at 390px. The full-screen text menu is legible, and its Studio link closes it and reaches the right section.

## Priorities: observable defects and strongest fixes

### P1 — Mobile demo presents actions before the outfit they act on

After selecting Cream tee, the 390×844 viewport begins with “Begin with a favourite,” a paragraph, a process strip, “Try another combination” and “Keep this look.” The outfit starts roughly halfway down the screen and continues below the fold. The user can act before seeing the complete generated result. The same explanation-first order makes the initial chooser take much more scrolling than its desktop equivalent. See `mobile-picked-cream.png` and `mobile-scroll-1800.png`.

**Strongest fix:** put the resulting outfit directly below the tabs/state title, then the two actions, then secondary explanation. Keep a compact visible indication of the chosen piece. On a phone, the selection should immediately reward the tap with the changed clothes in view.

### P2 — Desktop instruction points in the wrong direction

The Wardrobe panel says “Choose a jacket or a top below,” but the four garment controls are above that instruction on desktop. The direction is correct in the mobile order only. See `desktop-project-wardrobe.png`.

**Strongest fix:** use direction-free copy such as “Choose a jacket or top to start a look,” or position the instruction alongside the chooser consistently at both breakpoints.

### P2 — The studio section names the people but gives no reason to choose them

The three large rows contain first names, aliases and red asterisks. No visible roles, specialties, work evidence, portraits, or individual destinations appear. “We turn ideas into software, together” repeats the general studio claim rather than advancing it. See `desktop-scroll-2250.png` and `mobile-studio-nav.png`.

**Strongest fix:** turn each row into a short, specific proof point: what that person does, one meaningful detail, or a restrained reveal of their contribution. This could become the second distinctive interaction and make the section earn its scale. Use real facts; do not invent credentials.

### P2 — The only work shown does not yet demonstrate the craft of the software itself

OOTD is shown through flat-lay garments, process words and a browser concept demo. There is no visible iOS screen or concrete example of the studio's design/engineering decisions. “iOS · In development” is honest, but the page asks a prospective client to infer product execution from a concept. This is a content/proof limitation rather than a broken UI.

**Strongest fix:** add one polished, real product scene or focused case-study moment showing a difficult behavior/design decision. Keep the garment composition, but give the visitor evidence beyond the idea.

### P3 — The interaction peak arrives early

The cap and tear opening are the page's most distinctive behavior. The remaining sections use restrained state swaps, thin rules and large sans-serif typography. This restraint is tasteful, but the visual journey has no later event with comparable specificity. The final red contact section restores impact through scale, not a fresh piece of craft.

**Strongest fix:** develop one later moment tied to the subject: garments assembling into a look while retaining the selected piece, or a team reveal with authored imagery. Give it precise transitions and an excellent reduced-motion state. Do not add ambient motion everywhere.

## Interaction and accessibility observations

Tested successfully:

- Bottle pop and replay on desktop and mobile; cap remains visibly open after replay.
- Downward scroll through the full page and upward return to the hero; no permanent lost content observed.
- View OOTD, Inside the project, mobile Studio navigation, and Back to top.
- Wardrobe, Today and Looks tabs, choosing Olive chore jacket on desktop and Cream tee on mobile.
- Try another combination, Keep this look, Reset preview.
- Keyboard Tab initially reveals the skip link. ArrowDown from focused Wardrobe selects and focuses Today; tab state uses `aria-selected` and roving tabindex.
- Reset confirmation is exposed through a polite live status region.
- Mobile menu closes with Escape.
- Reduced-motion mobile initial state renders complete visible content.
- Measured document width equals viewport width: 1440/1440 desktop, 390/390 mobile. No measured visible link/button target below 44px high in the sampled control states.
- No JavaScript page errors during the initial full desktop interaction run; all sampled images were loaded.

Limits: this was Chromium emulation, not physical-device or screen-reader testing. Color contrast was visually assessed, not exhaustively measured. Email links were inspected but not sent. No external destinations were visited. No claim is made about performance on a low-end device. An early keyboard-only locator attempt could not reach Inside the project while the hero remained active; the documented visible View OOTD → Inside the project path worked. This is not counted as a confirmed defect without reproducing a user-facing keyboard failure.

## Evidence files

Primary viewport captures are the reliable visual evidence. The first `desktop-full.png` / `mobile-full.png` files were captured after scrolling and contain a blank hero region caused by the live scroll-dependent hero state; do not interpret that blank region as the initial user experience. Later `*-full-at-top.png` captures record the hero from its initial state, but the scroll-dependent OOTD introduction is then concealed. Both full-page capture sets have this browser-capture limitation; use the overlapping viewport sequence to judge the complete page, not either static full-page image alone.

- Desktop opening: `desktop-initial.png`
- Cap open: `desktop-cap-open.png`
- Reverse-scroll return: `desktop-up-0.png`
- Project initial/tabs: `desktop-project-wardrobe.png`, `desktop-tab-Today.png`, `desktop-tab-Looks.png`
- Project chosen/kept: `desktop-picked-olive.png`, `desktop-look-kept.png`
- Keyboard: `desktop-keyboard-skip.png`
- Mobile opening/menu: `mobile-initial.png`, `mobile-menu.png`
- Mobile project: `mobile-project-wardrobe.png`, `mobile-picked-cream.png`
- Reduced motion: `mobile-reduced-motion.png`
- Scroll sequence: `desktop-scroll-*.png`, `mobile-scroll-*.png`
- Raw observations: `observations.txt`, `control-checks.txt`, `control-checks.json`

All owned browser instances were closed in `finally` blocks. No server was started or stopped by this review. No website files were changed.

Questions skipped: this independent review assignment requests findings, not a new design decision or implementation.
