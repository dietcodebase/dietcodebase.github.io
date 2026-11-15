⚠️ DEGRADED: single-context (independent reviewer subtask; browser-only scope prohibits repository and prior-report inspection). This is a manual craft review using the Impeccable critique framework, not a full detector audit.

# Diet Code — independent interaction and content review

Target: http://127.0.0.1:5178/  
Reviewed: 2026-11-15  
Viewports: real headless Chromium at 1440×900 and touch-emulated 390×844, plus a reduced-motion keyboard pass. No source files, project documentation, or other reviewers’ reports were inspected. No website files were changed. All owned browsers were closed in `finally` cleanup.

## Verdict

**7.8/10 weighted overall. Strong authored identity; not yet Awwwards-level across the whole journey.**

The opening has unusually good presence: a huge, dense wordmark, convincing printed bottle cutout, rough paper edges, restrained cream/black/red palette, and a physical interaction that belongs to the brand. The site says what Diet Code does without requiring interpretation. OOTD’s purpose is also understandable, and its example wardrobe is genuinely interactive rather than a dead marketing mockup.

The experience loses some distinction after the opening. The studio is represented by three oversized names and a generic capability statement; visitors receive very little evidence about those people’s expertise or how the studio works. The product demonstration explains the idea, but does not show the actual iOS product or a meaningful design/engineering decision. On mobile, prose and controls precede the outfit output, weakening the direct cause-and-effect that should make the demo the second memorable moment.

| Category | Weight | Score | Contribution | Assessment |
|---|---:|---:|---:|---|
| Composition and typography | 25% | 8.2 | 2.050 | Strong scale, precise edges, confident typography, readable body copy. Less compositional variety and too much emphasis on names rather than evidence in the studio section. |
| Identity and art direction | 25% | 8.5 | 2.125 | Bottle/paper/red system is distinctive and coherent through the closing copy. Clothing art is consistent but the actual product is absent. |
| Motion and interaction | 20% | 7.6 | 1.520 | Reversible tear reveal, repeated bottle pop, good state handling and real demo actions. Output changes still feel like panel replacement; mobile feedback hierarchy needs work. |
| Mobile and accessibility | 20% | 7.2 | 1.440 | Strong fitting hero, working full-screen menu, visible keyboard focus, usable target sizes, arrow-key tabs, no overflow. Demo output follows a long prose/control block and can leave lower outfit pieces offscreen. |
| Content clarity and credibility | 10% | 6.4 | 0.640 | Studio and product categories are clear; development/preview limitations are honest. Skills, roles, process, actual app evidence and engagement expectations are thin. |
| **Overall** | **100%** | **7.775 → 7.8** | **7.775** | **Good studio site with a memorable opening; the middle needs stronger proof and mobile interaction craft.** |

These are absolute craft scores, not a claim about any awards jury’s result.

## What works

1. **The hero has an ownable visual idea.** The bottle looks like a printed artifact, not a generic 3D asset. Its condensation, paper edge, handwritten label and red ground work as one composition. “Independent creative engineering studio” and “We design and build digital products” keep the metaphor intelligible. The mobile composition is deliberately reworked rather than merely shrunk. Evidence: `desktop-01-top.png`, `mobile-01-top.png`.
2. **A physical opening and closing form a coherent journey.** “Pop the cap,” the moving cap, the paper reveal and “Let’s uncap it” are part of the same identity. The reveal is short, reversible and responsive to the actual scroll position. It does not trap the visitor in a long theatrical sequence. Evidence: `desktop-reverse-1-180.png` through `desktop-reverse-6-0.png`, equivalent mobile frames.
3. **The project preview has real state and honest language.** A selected starting item stays when trying another combination; keeping the look changes to Looks; the saved preview survives tab changes and reload; reset restores the initial wardrobe. Clear “In development,” “example wardrobe” and “separate from the iOS app” text avoids implying a shipped app or real account. Evidence: `desktop-complete-01-selected-tee.png`, `desktop-complete-02-rerolled.png`, `desktop-complete-03-kept.png`, `completion.json`.
4. **The accessibility basics received attention.** The skip link is first and becomes visible; interactive focus has a conspicuous ring; tabs have selected state, roving tabindex and ArrowRight behavior; the mobile menu responds to Escape and closes after navigation. The reduced-motion pass retained all content. No broken images or horizontal overflow were found at either requested viewport. All visible controls measured at least 44px high during the inspected default state.

## Prioritized improvements

### P1 — Give prospective collaborators concrete reasons to trust the studio

**Observed:** The studio section offers only three first names, nicknames, decorative asterisks and a restatement of the hero claim. There are no roles, backgrounds, relevant links, responsibilities or explanation of how three people divide the work. OOTD is the sole project and is still in development. A visitor can understand *what kind of company this is* but cannot assess *whether this team fits their project*.

**Why it matters:** The large typographic treatment implies that these people are the substance of the section, yet the content stops at their names. It is a clear drop from the specificity of the bottle art and wardrobe demo. A hiring visitor must send an email to discover basic suitability.

**Improve:** Add one factual responsibility/strength per person and a concise, truthful account of what the team takes from idea through launch. Where available, link real profiles or relevant shipped work. Use OOTD to show one actual tradeoff and who owned it. Keep the oversized names, but make those rows carry useful information. Do not invent experience, clients or outcomes.

**Evidence:** `desktop-scroll-02-2088.png`, `desktop-scroll-03-2808.png`, `mobile-scroll-03-2633.png`.

### P1 — Make the mobile wardrobe demo show the result before asking for the next action

**Observed:** At 390×844 the Today panel starts with the explanatory heading, paragraph, process line, two buttons, qualification and change-starting-piece control. Only then does the outfit grid appear. After selecting a piece, the browser aligns the panel at y≈1811: the controls are near the top, the outfit begins around the middle of the viewport, and the bottom pieces are at or below the lower edge. Changing tabs can instead leave the panel beneath the preceding section copy. The desktop layout shows the outfit first and lets users judge it before acting.

**Why it matters:** The central interaction is visual. Users should see what changed and judge the entire look before keeping it. On mobile, the actions visually precede the thing they act on, and outfit comparison competes with repeated explanatory content. This is friction, not a failure of the underlying state logic.

**Improve:** On phones, order the selected outfit first, followed by a compact action row, then the optional explanation. Keep the preserved item visibly identified. When a user selects a starting piece, bring the result heading and enough of the outfit into view without an abrupt jump. A compact 2×2 output and shorter copy can make the result and its primary controls fit within one screen. Keep focus and live announcements intact.

**Evidence:** `mobile-workflow-03-selected.png`, `mobile-complete-02-rerolled.png`, `mobile-complete-03-kept.png`, compared with `desktop-workflow-03-selected.png`.

### P2 — Show the actual product and one substantive making decision

**Observed:** The page explains an iOS app through garment photography and a website-specific example. There is no actual iOS interface, product screen, prototype capture or evidence of the engineering behind the claim. The same jacket/tee/jeans vocabulary appears in the overview and again in the demo, so the case study expands the concept more than it expands confidence in the makers.

**Why it matters:** The demo is useful as an idea study, but a studio portfolio needs proof of execution. At award-level craft, the middle should deliver another distinct piece of evidence or insight rather than only another layout of the same objects.

**Improve:** Include one real in-progress screen or native interaction, clearly labeled to match its actual status. Pair it with a concise making decision: for example, how clothing entry is reviewed, how a locked piece constrains a look, or how saved combinations are retrieved, but only if true. A small, excellent proof is preferable to more promotional sections. If the app UI is not ready to show, present an actual prototype artifact and its limitation honestly.

**Evidence:** `desktop-scroll-00-648.png`, `desktop-scroll-01-1368.png`, `desktop-workflow-03-selected.png`.

### P2 — Correct the demo’s directional instruction

**Observed:** In the desktop Wardrobe panel, the copy says “Choose a jacket or a top below,” but the selectable garments are **above** that sentence. On mobile the prose is above the grid, making “below” accurate. The shared instruction contradicts the desktop layout.

**Improve:** Use location-independent copy such as “Choose a jacket or a top to start a look.” This remains correct across layouts and avoids making the reader resolve a mismatch.

**Evidence:** `desktop-scroll-01-1368.png`, `mobile-scroll-01-1283.png`, `mobile-scroll-02-1958.png`.

### P2 — Build a second crafted moment out of the demo’s state transition

**Observed:** The opening interaction has physical personality, while choosing, rerolling and keeping a look mostly replace the panel content. The state works, but the motion language no longer carries the paper/wardrobe identity. The studio section then returns to a familiar oversized-type-and-rules composition.

**Improve:** Keep the selected item spatially stable while the other pieces change; give saving a restrained, legible transition into the kept look. Maintain the clothing grid’s geometry across states and support reduced motion with immediate equivalent changes. This would make the product explanation feel authored at the same level as the hero without adding scroll choreography to every section.

**Evidence:** `desktop-workflow-03-selected.png`, `desktop-complete-02-rerolled.png`, `desktop-complete-03-kept.png`.

### P3 — Make the contact handoff more informative

**Observed:** The email action is clear and large, but “Tell us what you’re thinking. We’ll take it from there” does not help a prospective client know what to include or what happens next.

**Improve:** If accurate, add one compact line about the kinds of projects you are open to and the useful details to include in an introduction. Availability or response expectations can help if the team can maintain them. Keep the direct email route.

**Evidence:** `desktop-end.png`, `mobile-end.png`.

## Journey verification

| Check | Observed result |
|---|---|
| Bottle | Both the bottle interaction and visible pop control are keyboard-addressable. Clicking moves the cap away; subsequent state reads “Pop it again.” The open state remains after returning to the top. |
| Forward/reverse tear | Sampled 0→180→360→540→360→180→0 at both sizes. Actual scroll matched every requested position. The reversed 180px frame returns to the same composition; the hero restores at 0. No blank seam or stuck overlay was seen. |
| Whole page | Hero → work overview → project demo → studio → contact/footer. No broken image or runtime page error was observed in the initial journey passes. |
| Back to top | Returned to scrollY 0 at both sizes and restored the complete hero. |
| Initial Today/Looks | Today shows a sample combination and a starting-piece route. Looks shows a clearly identified bundled example rather than a fake user save. |
| Select piece | Selecting jacket or tee activates Today, keeps that garment in the outfit and identifies it as KEPT. |
| Reroll | Replaced the other outfit piece while preserving the selected cream tee in both sizes. |
| Keep/revisit | Activated Looks with the generated combination. The saved result survived switching Wardrobe→Looks and a browser reload. |
| Reset | Returned to “Pick a starting piece”; the preview look was removed from the current workflow. |
| Mobile menu | Full-screen menu with large Work/Studio/Contact links. Escape dismisses. Selecting Studio dismisses and navigates to #studio. |
| Keyboard | First tab reveals Skip to content; following controls have visible outlines. ArrowRight moves selection and focus from Wardrobe to Today. |
| Reduced motion | Content and demo remained available in the reduced-motion context. This was a functional/content pass, not a full animation-timing audit. |
| Width and target size | document width matched viewport width at 1440 and 390. No inspected visible default control was under 44px high. |

## Evidence and limitations

Screenshots and browser-observed JSON are in this directory. Most useful evidence: `desktop-01-top.png`, `mobile-01-top.png`, `desktop-reverse-2-360.png`, `mobile-reverse-2-360.png`, `desktop-workflow-03-selected.png`, `mobile-workflow-03-selected.png`, `desktop-complete-03-kept.png`, `mobile-complete-03-kept.png`, `mobile-menu.png`, `keyboard-skip-focus.png`, `reduced-motion-demo.png`.

This review did not measure real-device performance, run a screen reader, audit every contrast pair, inspect source code, validate external email delivery, or run a deterministic detector. Native iOS behavior and actual app functionality are outside the evidence. Browser control sizes and semantics were read from the rendered DOM only. A sandbox launch failed before browser creation; subsequent explicitly escalated local Chromium runs completed and closed their owned browser processes. No server was started by this reviewer. Temporary review scripts/evidence were retained here deliberately.

Questions skipped: this is an independent reviewer subtask requesting a report, not an interactive choice of implementation work.
