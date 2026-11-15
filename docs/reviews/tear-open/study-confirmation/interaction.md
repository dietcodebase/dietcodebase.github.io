# Independent browser review — Diet Code

Reviewed http://127.0.0.1:5179/ on 15 November 2026. Browser-only assessment with no brief, repository source, project documents, or other reviewer reports. Actual Chromium renders and interaction tests at 1440×900, 390×844, and 375×667; reduced-motion browser context at 1440×900. No site edits. Owned browser closed after testing.

## Verdict

**8.1/10 weighted overall.** A strong, distinctive small studio site with a memorable opening and unusually solid interactive demo. It reads as authored work rather than a template. It is close to award-entry quality, but its lower sections and proof of the studio's work do not sustain the originality or substance of the bottle hero. I found no reproducible material functional or keyboard-accessibility failure in the journeys tested.

| Criterion | Weight | Score | Rationale |
|---|---:|---:|---|
| Composition / typography | 25% | 8.2 | Confident scale, disciplined content edges, good contrast of red/cream/black. The desktop hero is exceptionally clear. Lower sections rely on a narrower set of large sans headings, rules, and lists. |
| Identity / art direction | 25% | 8.2 | Bottle, halftone printing, paper cutouts, red ground, and uncap language create a memorable identity. OOTD and the team section are polished but less specific and less surprising. |
| Motion / interaction | 20% | 7.8 | Bottle action and tearing transition are coherent, navigation behaves well, and the wardrobe study actually works. Motion is purposeful rather than exceptional in range or choreography. |
| Mobile / accessibility | 20% | 8.5 | Good reflow, adequately sized tested targets, strong keyboard support, focus management, responsive tab orientation, reduced motion, and no horizontal overflow at tested sizes. Short-phone title overlap is a minor art-direction compromise. |
| Content clarity | 10% | 7.3 | Clear studio category, project premise, development status, demo scope, and contact. Limited evidence of expertise, team responsibilities, or project outcomes. |

Weighted calculation: 8.2×0.25 + 8.2×0.25 + 7.8×0.20 + 8.5×0.20 + 7.3×0.10 = **8.09**, reported **8.1**.

## Material defect finding

**No P1/P2 defects confirmed.** This is a positive result of the tested journeys, not a full WCAG conformance claim. No dead end, inaccessible tested control, data-loss defect, broken image, or clipped mobile action was established.

One initial automated attempt to click the hero CTA while the page was already partway through its tear transition reported that the CTA was inert. It was visibly absent at that scroll position. Scrolling back to the actual top restored it immediately. This is intentional hiding of unavailable hero controls, not a user-visible defect, and is excluded from findings.

## Prioritized quality improvements

1. **Carry the hero's specificity through the lower page.** Reproduce: load desktop → View OOTD → Inside the project → scroll to Studio. The bottle/paper/red composition is distinctive; the demo and team become rectangular panels, giant type, rules, names, and asterisks. Their craft is good, but the visual idea becomes less singular. Develop a second authored moment from the studio's real process or product material rather than adding decorative effects. Evidence: `desktop-top.png`, `desktop-demo-wardrobe.png`, `desktop-studio.png`.
2. **Add proof of what this crew can deliver.** Reproduce: read the OOTD study and team block. The study demonstrates a small selection/save flow and describes one product decision, but no real app screen, role allocation, shipped output, or concrete engineering/design evidence appears in the browser journey. The three people have names and aliases but no roles or links. With only an in-development product shown, a prospective client has little basis to judge the studio beyond visual taste. Add genuine evidence where available; do not invent achievements. Evidence: `desktop-demo-saved.png`, `desktop-studio.png`.
3. **Protect the short-phone display title a little more.** Reproduce: fresh load at 375×667. The bottle neck covers a substantial part of the final E in CODE, making the giant wordmark read less cleanly than at 390×844. The header brand and primary CTA remain clear, so this is a low-severity composition issue. A small position/scale adjustment at short heights could retain the overlap while restoring the letter. Evidence: `short-phone-top.png` versus `phone-top.png`.
4. **Reduce repeated explanatory weight around the demo.** Reproduce: view the mobile project section, select a garment, then keep it. The copy explains the same wardrobe/combination idea in the intro, tab panel, panel description, status line, and product decision. It remains understandable, but the mobile reading journey is longer than the actual interaction warrants. Tightening the overlap would give the useful demonstration more prominence. Evidence: `phone-demo-top.png`, `phone-demo-today.png`, `phone-demo-saved.png`.

## Verified interaction and accessibility behavior

- Desktop bottle button and visible Pop the cap action open the cap; the cap remains visually detached and a repeat action is offered. Phone touch on the bottle also opens it. Evidence: `desktop-cap-open.png`, `phone-cap-open.png`.
- Work, View OOTD, Inside the project, Studio, Contact, Put us to work, and Back to top anchors lead through the page. The contact link is a real `mailto:dietcode@sike.dev`; I did not send mail.
- Repeated wheel scrolling from top to bottom and back on desktop and phone returns to scrollY 0 with the hero restored. No duplicate/stuck scene or horizontal scrollbar observed. Phone document width equals viewport width 390; short-phone overflow check also false. Evidence: `desktop-return-top.png`, `phone-scroll-return.png`.
- All four garment starting choices were exercised across the two main viewports: Olive chore jacket, Indigo yukata jacket, Cream tee, and White linen guayabera. The chosen item remains in Today and is marked KEPT. Switching the starting piece works.
- Try another combination changes the other pieces while retaining the chosen item. Examples: Indigo jacket + cream tee changed to Indigo jacket + linen guayabera; Cream tee retained while outer jacket changed to Indigo.
- Keep this look moves to Looks, shows the chosen combination and a confirmation. Reload returns to Wardrobe, but opening Looks restores the saved combination. This was verified separately on desktop and phone. Local storage held only the saved example combination under `dietcode.ootd-preview.v1`.
- Reset preview removes stored state; after reload, Looks shows the explicitly labelled bundled example instead of the previous saved look. Reset confirmation is exposed in a polite status region.
- First keyboard Tab reveals a visible skip link at x16/y16, 146×53. Activating it moves focus to the H1. The next Tab reaches the bottle control, bypassing the header links.
- Desktop vertical tabs respond to ArrowDown and End, update selected state, and use one tabbable tab. Phone horizontal tabs respond to ArrowRight. `aria-orientation` correctly changes from vertical to horizontal at mobile width.
- Selecting a garment moves focus to its Today tabpanel. Save/change flows preserve a meaningful focus destination; status updates use role=status with aria-live=polite.
- Phone menu opens a full-screen navigation dialog, exposes expanded=true, cycles Tab among Work, Studio, Contact, and Close, and Escape closes it and restores focus to Menu. Menu/brand/Back to top targets are at least 44px high; the tested primary buttons and tab controls are larger.
- Tested reduced-motion context correctly reports the media preference, has no running browser Web Animations on initial load or cap activation, and retains readable project content and functional anchors. Evidence: `reduced-desktop-top.png`, `reduced-demo.png`.
- All rendered images inspected reported complete and nonzero natural width. Meaningful product imagery has descriptive alt text; decorative duplicates use empty alt. Heading hierarchy is H1 then H2/H3.

## Evidence and limits

PNG files in this directory are direct browser screenshots. No source code was read. Browser was headless Chromium with desktop and touch-mobile emulation; no native Safari, real screen reader, real device GPU, field performance, contrast audit, or email delivery test was performed. Screenshots were allowed to settle after interaction; immediate-frame blank garment captures were replaced by stable captures and are not reported as defects.
