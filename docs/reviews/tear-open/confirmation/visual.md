# Independent visual confirmation review

Frozen site: http://127.0.0.1:5177/
Viewports: 1440 × 900 desktop; 390 × 844 phone.
No repository source, documentation, other reviews, or reviewer conversations were inspected. Browser-rendered content and DOM accessibility/geometry were inspected.

## Scores

| Criterion | Weight | Score / 10 |
| --- | ---: | ---: |
| Composition and typography | 25% | 8.3 |
| Identity and art direction | 25% | 8.7 |
| Motion and interaction | 20% | 7.7 |
| Mobile and accessibility | 20% | 8.0 |
| Content clarity | 10% | 7.8 |

Weighted overall: **8.195 / 10, rounded to 8.2 / 10**.

This reads as a deliberately authored independent studio site with a memorable first screen. It is strong portfolio work. Under an Awwwards-level standard, the middle of the page and the product evidence are less exceptional than the hero; I would not call it a fully resolved top-tier award experience yet.

## Strongest evidence

- The hero is distinctive at both sizes: oversized tightly set DIET CODE, saturated red torn paper, green halftone bottle, cream label, and cream studio-copy sticker form one clear physical collage. The bottle has materially richer texture and personality than a generic 3D object or gradient hero. Desktop and phone screenshots: desktop-top.png, phone-top.png.
- Desktop page structure is well aligned and readable. Work moves from large title to three flatlay garments; details use a disciplined left text/tab rail and right editorial panel; black team section resets the rhythm; red contact section returns to the opening identity. Consistent horizontal edges, fine rules, numbering, and repeated asterisk motif hold the page together. Evidence: desktop-down500.png, desktop-tab-Today.png, desktop-tab-Looks.png, desktop-down2000.png, desktop-contact.png.
- The phone is a considered composition, with a steeply angled bottle, stacked title, full-width primary action, staggered garment strip, horizontal project tabs, and genuinely rearranged details. Today/Looks switch to two-by-two garment grids, and descriptive copy precedes the visuals. Evidence: phone-top.png, phone-down500.png, phone-panel-Today.png, phone-panel-Looks.png.
- Interaction is real. The bottle cap separates and rotates away on click, with brief marks at the mouth and a changed “Pop it again” label. Scrolling lifts/rotates the bottle behind a torn cream edge as OOTD comes into view; upward wheel input restores the initial hero. Both down/up traversal and wheel inputs were exercised on desktop and phone. Evidence: desktop-cap180.png, desktop-cap980.png, phone-cap980.png, desktop-wheel-down0.png, desktop-wheel-up3.png, phone-wheel-down0.png, phone-wheel-up3.png.
- Wardrobe, Today, and Looks each expose distinct content and imagery. ArrowRight from Wardrobe focuses/selects Today; selected tabs have proper roving tabindex. Focus is clearly visible. The first Tab exposes Skip to content. All measured visible links/buttons had at least 44px height. Image alternatives were meaningful where relevant. Evidence: accessibility.json, phone-keyboard.png, phone-arrow-tab.png.
- Work, Studio, and Contact navigation worked at both sizes; phone menu closed after navigation. Back to top returned scroll position to 0. No page errors were logged during navigation. Document scroll width exactly matched viewport width (1440 and 390), so no horizontal page overflow occurred. Evidence: navigation.json and *-nav-*.png.

## Deductions and concrete opportunities

1. **The project presentation provides mood and concepts more than product proof.** The work overview looks like a clothing editorial and the default Wardrobe tab repeats the same jacket. Today/Looks are clear conceptual garment arrangements, but no actual iOS screen, working app interaction, or engineering outcome becomes visible. The “creative engineering studio” claim remains under-demonstrated. At this judging level, one real, carefully framed product view or concise interaction would deepen the middle of the site substantially. Evidence: desktop-viewootd.png, desktop-tab-Wardrobe.png, desktop-tab-Today.png, desktop-tab-Looks.png.
2. **The contact headline is not fully resolved on phone.** At 390px, “Let’s uncap it.” wraps into “Let’s uncap” and a solitary “it.”, giving the sentence a short third line and weakening the otherwise assured ending. Adjust the mobile font size, tracking, or deliberate line grouping. Evidence: phone-nav-Contact.png.
3. **The second half has less authored visual depth than the opening.** Team is a clean typographic roster of names/aliases with repeated red marks, but the three people have no roles, individual visual cues, or concrete studio point of view. The composition is professional; its expressive vocabulary is mainly the established bold type, rules, and asterisk. The intro is substantially more memorable. Evidence: desktop-down2000.png, phone-nav-Studio.png.
4. **Motion is concentrated in one signature moment.** The reversible bottle/tear and cap reaction are pleasing and coherent. Project tabs and later sections are competent, straightforward interactions rather than another equally surprising piece of visual storytelling. This is a high-bar craft deduction, not a functionality failure.
5. **Small secondary typography gets dense on phone.** The metadata, stamps, and garment labels are often around 11–12px, and headings such as “01 / CURRENTLY IN THE STUDIO” and “iOS · IN DEVELOPMENT” wrap across two lines. They remain legible in the captured viewport, but the poster-like main type is more polished than these compressed informational details. Evidence: phone-down500.png, phone-panel-Today.png.

## Limits

This is a visual and targeted interaction review, not a complete accessibility or performance audit. Browser motion was executed and inspected through timed rendered frames, wheel-step captures, and down/up traversal; no frame-rate measurement or real-device touch/performance test was performed. Reduced-motion mode produced a readable project section with no overflow (phone-reduced-scroll.png), but every possible animation was not independently audited under that preference. Mail links were inspected as destinations; no email was sent. Initial automation locator timeouts came from trying to access the hidden hero navigation after leaving the hero and from the mobile Menu button changing its accessible name to Close; corrected navigation checks passed. These are test-script assumptions, not reported site defects.
