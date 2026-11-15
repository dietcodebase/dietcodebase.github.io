# Diet Code — independent live visual review

Reviewed http://127.0.0.1:5179/ in actual Chromium, desktop 1440×900 and touch/mobile 390×844. No brief, repository source, project documentation, or other reviews were read. No site changes were made. This is an independent design judgment, not an official Awwwards result.

## Verdict

**8.1/10 weighted.** A polished, distinctive studio site with an excellent opening, a coherent graphic system, and unusually complete small-demo behavior. The hero feels close to an award-caliber experience. The middle of the page does not sustain that level of visual storytelling: it becomes a well-made explanatory widget, followed by a roster with little human or professional specificity. I would consider it a strong, credible portfolio submission; I would not yet call the entire journey outstanding enough for a top award.

| Category | Weight | Score / 10 | Weighted contribution |
|---|---:|---:|---:|
| Composition and typography | 25% | 8.3 | 2.075 |
| Identity and art direction | 25% | 8.6 | 2.150 |
| Motion and interaction | 20% | 7.6 | 1.520 |
| Mobile and accessibility | 20% | 8.0 | 1.600 |
| Content clarity | 10% | 7.2 | 0.720 |
| **Overall** | **100%** | **8.1** | **8.065** |

## What is already strong

- The first composition has authorship: extreme black type, the tactile green bottle, torn cream paper, and the red ground are memorable together. The bottle is large enough to be the subject rather than a small decorative illustration. The desktop and phone versions are separately composed and both work.
- The visual language persists through the page. Thin rules, tight heavy headings, black rectangular actions, red stars, small uppercase labels, and the final red contact block feel like one identity. The contact section closes the bottle metaphor cleanly.
- Product photography is clear, restrained, and consistent. The OOTD introduction has good scale and space; the jacket/tee/jeans set explains the product immediately.
- The interactive study genuinely demonstrates a rule: choose a starting garment, retain it while varying the supporting outfit, and keep the result. The visible starting-piece border and KEPT label make the behavior understandable.
- The preview is honest about scope: in development, example pieces, and a saved preview separate from the iOS app. It does not pretend to be a released application.
- The page remained usable in both directions. Returning to the hero preserved the popped bottle state. Replay worked. The mobile menu was full screen, named its open state, trapped keyboard focus, restored its close state with Escape, and successfully navigated to Contact.

## Material weaknesses and highest-value improvements

### 1. Mobile buries the actual demo after its invitation

**Observed:** At the mobile project anchor, the viewport shows the headline, explanatory copy, tabs, status, and the “A place for every piece” explanatory panel. The starting garment cards are below the 844px viewport. On desktop the interactive cards are the first content in the right column. The phone version therefore delays the action after “Try the idea.” Evidence: `mobile-project-anchor.png`, `mobile-scroll-1200.png`, `mobile-scroll-1800.png`.

**Why it matters:** The page asks for experimentation, then initially provides another block of reading. The most valuable interaction is less immediately discoverable on the device the product targets.

**Improve:** Place the compact starting-piece chooser immediately after the tabs on mobile, before the explanatory block. Keep one sentence of guidance above it. Let the action itself explain the concept, then show the supporting explanation below. Preserve the existing focus and scroll handling when advancing states.

### 2. The middle loses the tactile, authored quality of the opening

**Observed:** After the bottle and editorial garment introduction, the story is mostly a bordered demonstration panel, an abstract PHOTO → REVIEW → WARDROBE diagram, and several paragraphs. The same garment assets recur as small thumbnails. There is no view of the actual iOS interface, a real wardrobe capture, or another artifact showing the studio's craft. Evidence: `desktop-scroll-1300.png`, `desktop-build-indigo.png`, `desktop-scroll-1950.png`.

**Why it matters:** The hero promises a creative engineering studio with a point of view. The core case study proves the interaction rule but provides limited visual evidence of design or engineering depth. At award level, the central chapter should be as specific and authored as the wrapper.

**Improve:** Give the product chapter one powerful, substantive visual sequence: for example, a real garment-photo intake and reviewed wardrobe record leading into the retained-piece outfit. Show actual product work if available; keep an honest study label if it is still a concept. A focused UI close-up or documented design decision would be more valuable than another ornamental animation.

### 3. The studio chapter names people without revealing the team

**Observed:** Gowrish, Jeswin, and Sabi appear as large names and aliases with nearly identical rows and stars. The surrounding text says the team shapes ideas, designs interfaces, and builds software, but assigns no roles, individual perspectives, responsibilities, or evidence. Evidence: `desktop-scroll-2600.png`, `mobile-scroll-3000.png`.

**Why it matters:** This is visually clean but generic information. Visitors evaluating a small studio still cannot tell who does what or what working with the group feels like. Three large names occupy a major chapter without increasing understanding proportionally.

**Improve:** Add a short, factual role or contribution per person and one authentic studio artifact or portrait treatment where available. Keep the concise roster structure; make each row disclose a meaningful difference. Give the studio copy one concrete statement about the work it takes on.

### 4. The content repeats the premise while leaving service scope vague

**Observed:** “Your wardrobe,” “clothes you already own,” and “Made for what you already own” recur across adjacent sections. “In development” repeats. The “Real pieces first” paragraph explains optional AI ranking and fallback implementation, while the broader studio offering remains “design and build digital products.” Evidence: `desktop-scroll-650.png`, `desktop-scroll-1300.png`, `mobile-scroll-2400.png`.

**Why it matters:** There is more reiteration than new information in the product story, while a prospective client gets little guidance about relevant projects or the studio's contribution. The AI paragraph is credible, but reads closer to a product implementation note than a visual case-study payoff.

**Improve:** Cut one or two repeated premise statements. Use the recovered space for a concrete project question, a visible design decision, and the studio's actual contribution. Translate the technical fallback into its user consequence, with supporting detail available for readers who want it.

### 5. Motion is competent but the interaction hierarchy could be more expressive

**Observed:** The cap pop, replay, torn transition, hover/press treatments, and demo state updates work. The biggest motion event belongs to the brand metaphor. Varying an outfit is more visually modest, mostly a change in supporting garment and the panel state. Evidence: `desktop-02-pop.png`, `desktop-04-replay.png`, `desktop-variation.png`, `desktop-saved.png`, `mobile-variation.png`.

**Why it matters:** The playful brand action is more memorable than the product action. That is acceptable for a studio home page, but limits the narrative payoff at an award-level standard.

**Improve:** Give outfit recomposition one precise, brief movement that emphasizes “this piece stays, these pieces change.” Avoid increasing motion everywhere. The retained item should remain spatially stable while the changed piece resolves crisply; the existing reduced-motion behavior should continue to deliver an immediate readable result.

## Interaction and accessibility observations

Verified manually through Chromium interactions and rendered accessibility semantics:

- Desktop and mobile bottle pop and replay worked.
- Forward and reverse scroll, plus actual desktop wheel input, worked. The hero returned intact; no stuck transition or missing section was observed.
- View OOTD and Inside the project anchors worked. Mobile menu → Contact worked. Back to top worked.
- Indigo jacket and Cream tee were exercised on desktop; Olive jacket on mobile. Changing a supporting combination retained the selected starting garment. Saving moved to Looks and showed the selected combination. Trying another starting piece and resetting the preview worked.
- Mobile saving retained the scroll position at 1811px in the exercised flow. Focus moved into the updated preview region rather than being discarded on the document body.
- Desktop skip link appeared at the first Tab press. Activating it focused the H1; the next Tab reached the bottle control.
- OOTD tabs expose tablist/tab/tabpanel semantics, selection state, and support ArrowRight selection. A status region announced the preview change.
- Visible keyboard focus treatment was present. Buttons had accessible text or labels. Garment figures/images had meaningful names.
- Mobile menu focus cycled through its links and close control; Escape closed it.
- At 390px, measured horizontal overflow was 0px. No clipped main headings, blocked actions, or overlapping body content was observed in the captured journey.
- Reduced-motion media preference was exercised at 390×844: all content remained visible, the bottle changed to an open state, and `document.getAnimations()` returned an empty list after the pop.

No blocking interaction failure was found in the exercised paths. This was a visual/manual accessibility review, not a complete WCAG audit. No real iOS app was available for review. Mail links were inspected as mailto destinations; no email was sent. Saved-look behavior was evaluated within the current preview session, not as durable account storage.

## Evidence index

All images are in this directory.

- Desktop entry and brand action: `desktop-01-entry.png`, `desktop-02-pop.png`, `desktop-03-pop-rest.png`, `desktop-04-replay.png`.
- Desktop full-page journey: `desktop-scroll-650.png`, `desktop-scroll-1300.png`, `desktop-scroll-1950.png`, `desktop-scroll-2600.png`, `desktop-scroll-3309.png`.
- Reverse and wheel behavior: `desktop-reverse-top.png`, `desktop-wheel-tear.png`, `desktop-wheel-reverse.png`.
- Desktop anchors and workflow: `desktop-work-anchor.png`, `desktop-project-anchor.png`, `desktop-build-indigo.png`, `desktop-variation.png`, `desktop-saved.png`, `desktop-empty-looks.png`.
- Keyboard: `desktop-skip-focus.png`, `desktop-keyboard-focus.png`.
- Mobile entry/menu: `mobile-01-entry.png`, `mobile-menu.png`, `mobile-pop.png`, `mobile-replay.png`, `mobile-menu-contact.png`.
- Mobile full journey: `mobile-scroll-600.png`, `mobile-scroll-1200.png`, `mobile-scroll-1800.png`, `mobile-scroll-2400.png`, `mobile-scroll-3000.png`, `mobile-scroll-3535.png`, `mobile-reverse-top.png`.
- Mobile product flow: `mobile-project-anchor.png`, `mobile-build.png`, `mobile-variation.png`, `mobile-saved.png`.
- Reduced motion: `mobile-reduced-motion.png`, `mobile-reduced-pop.png`.

No automated design-skill gate was run because this assignment was a blind, read-only live review with explicit Playwright requirements rather than a site implementation or source audit.
