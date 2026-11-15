# Independent live visual review — Diet Code

URL: http://127.0.0.1:5174/
Viewports: desktop 1440 × 900; mobile 390 × 844.
Method: Chromium/Playwright against the running production build only. No repository source, repository documentation, prior reviews, or other reviewers were consulted. No website source was changed.

## Verdict

**7.8 / 10 weighted overall.** A confident, memorable studio identity with a particularly strong opening screen. The paper, green bottle, vermilion field, dense black type, and small star details form a coherent visual language. It reads as a designed studio website. The biggest distance from an Awwwards-level result is the work itself: the sole project is presented through attractive garment imagery and prose, without a view of the actual digital product. The experience also has a keyboard-focus defect in its mobile menu and a less resolved intermediate state during the hero tear.

| Category | Weight | Score / 10 | Assessment |
|---|---:|---:|---|
| Composition / typography | 25% | 8.1 | Strong scales, crisp common edges, restrained layout system, well-controlled desktop and mobile headings. Some overlong intermediate scroll compositions and very small supporting labels. |
| Identity / art direction | 25% | 8.3 | The halftone bottle and cut-paper treatment are distinctive and repeat with purpose. The work presentation relies on the same three garment photographs, while the team section becomes conventional name rows. |
| Motion / interaction | 20% | 7.4 | Cap separation, airborne cap, settled state, replay label, reversible paper reveal, anchors, menu, and responsive tabs all provide real interaction. The hero-to-work handoff is visually congested in the middle, and the motion vocabulary becomes thin after the opening. |
| Mobile / accessibility | 20% | 7.8 | A considered mobile layout, no horizontal overflow at 390px, generous controls, readable body text, visible desktop focus, working skip link and keyboard tab selection. Mobile menu focus escapes its visible surface. Supporting copy reaches 9–10px. |
| Content clarity | 10% | 6.9 | Studio purpose, OOTD concept, development status, team names, and contact route are clear. Actual product behavior is described rather than demonstrated; team capability and the studio's specific contribution remain vague. |

Calculation: 8.1×0.25 + 8.3×0.25 + 7.4×0.20 + 7.8×0.20 + 6.9×0.10 = **7.83**, rounded to **7.8**.

## What is working

- The desktop hero is the strongest composition: full-width compressed black wordmark, generous cream perimeter, and an oversized diagonal green bottle against red. The small torn studio-description label balances the large CTA at the opposite corner. See `desktop-top.png`.
- The mobile hero is intentionally recomposed. The two-line title, steeper bottle angle, shorter paper label, and full-width project CTA fit in the requested 844px viewport. It does not feel like a desktop screenshot squeezed down. See `mobile-top.png`.
- Shared margins, hairline rules, tiny section identifiers, number treatment, and black/cream inversion tie the project, studio, and contact sections together. Contact returns to the opening red and the bottle metaphor without adding a separate visual system. See `desktop-y1450.png`, `desktop-y2200.png`, and `desktop-y2992.png`.
- The three project tabs change the garment, tint, stamp, section number, heading, description, and workflow. They work with pointer input and ArrowRight on the keyboard, and expose tab selection. See `desktop-tab-today.png`, `desktop-tab-looks.png`, and mobile equivalents.
- Popping the cap produces a visible separation/flight/settle response and changes the copy to “Pop it again.” Reversing the page scroll restores the hero composition without leaving an incomplete tear. See the cap and reverse-scroll screenshots.
- Work, Studio, Contact, Inside the project, and Back to top were exercised. Mobile menu selection closes the menu and unlocks body scrolling. Escape closes the mobile menu and restores focus to Menu.

## Evidenced defects and improvements

### 1. Mobile menu focus leaves the visible menu

**Priority: high accessibility fix.** At 390×844, opening Menu places focus on Close. Pressing Tab once leaves focus on BODY; pressing it again focuses the background “Skip to content” link, which is hidden behind the menu. Only later does focus enter Work → Studio → Contact → Close. The menu has no `role=dialog` / `aria-modal` surface in the inspected live DOM. Body scroll is locked, but the focused background skip link is not visually exposed.

Reproduced both with ordinary motion settings and with reduced motion emulated. Evidence: `final-check.json` (`menu.afterTwoTabs`), `accessibility.json` (`mobile.menuTabOrder`), and `mobile-menu-keyboard-escape.png` (menu visible while the hidden background link holds focus).

Improve by keeping focus within the open navigation surface, excluding the skip link/background from that focus cycle, and using semantics appropriate to the full-screen menu. Preserve the working Escape behavior and focus restoration.

### 2. The project promises software but never shows software

**Priority: high for visual credibility.** The top project area shows a jacket, tee, and jeans; each “Inside the project” tab shows one of those same garments again. The text explains wardrobe ingestion, outfit composition, and saving looks, but there is no visible app screen, prototype, interaction recording, interface detail, or concrete result. This is a design/engineering studio's only displayed project, so that absence materially limits both visual richness and proof of craft. It is clearly labeled in development, which is honest, but the site's presentation currently feels closer to a concept editorial than a product case study.

Evidence: `desktop-y750.png`, `desktop-tab-wardrobe.png`, `desktop-tab-today.png`, `desktop-tab-looks.png`.

Improve with one exceptionally presented, real product sequence showing those three actions. If no interface is ready, a precise interaction study or explicitly labeled prototype would add more evidence than another treatment of the garment photograph. Keep the strong editorial framing around it.

### 3. The middle of the tear transition loses hierarchy

**Priority: medium visual refinement.** In the forward scroll around 200–400px, the pinned DIET CODE hero and moving bottle continue to occupy the upper portion while garment imagery becomes visible beneath the rising torn edge. The OOTD heading is concealed or reduced to a clipped fragment during much of that handoff; at approximately 400px, fragments of the hero title, bottle, OOTD title, and “More possibilities” sit around the same edge. The motion is reversible, but this intermediate composition is more congested than either endpoint.

Evidence: `desktop-motion-200.png`, `desktop-motion-300.png`, `desktop-motion-400.png`, and `desktop-motion-reverse-300.png`.

Improve the reveal order or travel distances so the hero yields a clean reading area to the project name before the garment row becomes the main visible content. This is a staging issue, not a claim that the scroll is broken.

### 4. Mobile supporting type is too fine for the otherwise confident scale

**Priority: medium polish.** The garment captions, status labels, workflow labels, section identifiers, and hero slogan depend on 9–10px text at 390px. They are high contrast, but some require deliberate reading or zooming; the three narrow garment columns exaggerate the issue. Body text and main controls are comfortable.

Evidence: `mobile-y500.png`, `mobile-y1050.png`, `mobile-y1600.png`; live computed sizes in `live-details.json`.

Improve by lifting useful metadata toward 11–12px, simplifying low-value labels, and checking the three-column captions at actual handheld size. Avoid increasing all typography indiscriminately.

### 5. Studio content gives names without useful differentiation

**Priority: medium content/art direction.** The three people are represented by name, alias, number, and nearly identical red stars. No role, capability, short personal perspective, portrait, or link explains how this trio works together. The section is typographically clean, but it contributes less personality and confidence than its large footprint could.

Evidence: `desktop-y2200.png` and `mobile-y2150.png` / `mobile-y2700.png`.

Improve with one specific line of responsibility or viewpoint per person and one carefully chosen human detail. Keep the row system if desired; it does not need three cards or generic portraits.

## Test record and limits

- Inspected the full page at both requested viewports, including contact and footer.
- Captured forward and reverse scroll states. Desktop fine-step checks used real wheel events in 100px increments; other coverage used immediate scroll positioning followed by animation settling.
- Captured actual bottle animation at timed intervals and its settled/replay state. This was an observation of animated state changes, not a frame-rate benchmark.
- Exercised all three project tabs by pointer and verified ArrowRight moves focus and selection from Wardrobe to Today at both sizes.
- Verified desktop visible keyboard focus and the initial Skip to content stop. Verified mobile menu opening, selection, Escape, focus restoration, scroll locking, and the focus leak described above.
- Used reduced-motion emulation for keyboard checks and confirmed the tested content and tabs remain usable. This was not an exhaustive reduced-motion audit of every effect.
- Initial mobile page width was 390px, equal to viewport width. No horizontal overflow was observed.
- A fresh live load emitted no page JavaScript errors during the observation window. Visible initial images loaded. Inactive tab images were initially unloaded and appeared correctly when their tabs were selected; they were not treated as broken images.
- Chromium headless on macOS only. No Safari/iOS hardware, screen-reader, high zoom, 320px, landscape, coarse real-device performance, network-throttling, or color-vision testing. The mailto target was inspected; no email was sent.
- Some initial automation attempts used “button” selectors for controls whose accessible role is “tab,” and selected hidden/inert navigation links. These locator failures were corrected with the live roles/visible menu links; they are not reported as website defects.
- Recordings in `video-desktop/` and `video-mobile/` are supporting captures of initial runs. The screenshot series and JSON observations are the primary evidence; the browser sessions ended after automation locator timeouts, so recordings should not be read as complete end-to-end walkthroughs.

## Suggested order

1. Repair the mobile menu focus cycle.
2. Add a real OOTD interface or prototype sequence.
3. Refine the hero-to-project title handoff.
4. Enlarge selected mobile metadata and give each team member one meaningful differentiator.

The opening art direction is already a strong foundation. The next quality jump should come from more persuasive product evidence and tighter transitions, rather than more decorative effects.
