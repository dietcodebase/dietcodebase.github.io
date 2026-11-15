# Independent live-site review

Reviewed http://127.0.0.1:5176/ in Chromium at 1440×900 and 390×844. This review uses only the rendered live site, rendered DOM accessibility information, and interactions. No repository source, documentation, earlier reviews, or other reviewers were consulted.

## Score

| Category | Weight | Score / 10 | Weighted contribution |
|---|---:|---:|---:|
| Composition and typography | 25% | 8.4 | 2.10 |
| Identity and art direction | 25% | 8.6 | 2.15 |
| Motion and interaction | 20% | 8.0 | 1.60 |
| Mobile and accessibility | 20% | 8.3 | 1.66 |
| Content clarity | 10% | 7.4 | 0.74 |
| **Overall** | **100%** | **8.25 / 10 (8.3 rounded)** | **8.25** |

A distinctive, coherent studio site with strong visual craft. The bottle, rough paper edges, saturated red, cream stock, condensed heavy headlines, and garment photography feel like one authored system. It is well above a routine portfolio. Against an Awwwards-level bar, its biggest limitation is the distance between the vivid brand presentation and the comparatively thin evidence of the studio's actual software and capabilities.

## What works

1. **A memorable opening, with enough functional clarity.** The giant DIET CODE wordmark, oblique green bottle, red paper field and small torn-paper introduction establish a recognisable identity immediately. “We design and build digital products” makes the abstract “creative engineering studio” understandable. The large View OOTD action is easy to identify. Evidence: desktop-top.png, mobile-top.png.
2. **Strong editorial hierarchy and coherent section changes.** The cream project section, black studio section and red contact section are easy to distinguish. Left and right edges remain orderly, the oversized names and headings are legible, and the red asterisk links the project and people sections. Evidence: desktop-down-1-600.png through desktop-down-5-2992.png.
3. **The product story is concrete at the task level.** Wardrobe describes photo/manual entry and review; Today starts from a favourite garment and composes a look; Looks explains saving combinations with a named example. “iOS · In development” prevents confusion about availability. Each tab changes the illustration and explanation, rather than merely repainting a selection. Evidence: desktop-tab-wardrobe.png, desktop-tab-today.png, desktop-tab-looks.png; rendered panel text in observations.json.
4. **Motion has a brand-specific purpose.** Clicking Pop the cap visibly separates and rotates the bottle cap; the label becomes “Pop it again.” Scroll progress carries the opening artwork behind a rough paper edge into the project. Scrolling upward reconstitutes the opening without a blank or stranded section in the tested run. Evidence: desktop-pop-080.png, desktop-pop-330.png, desktop-pop-1130.png, desktop-up-9-392.png, mobile-up-9-318.png. Recorded sessions are included as WebM files.
5. **Mobile is deliberately recomposed.** The wordmark stacks, the bottle rotates into a vertical diagonal, the primary CTA spans the content width, the product tabs become a usable horizontal strip, and garment combinations become two-column grids. The page is readable at 390px and its document width equals its viewport width. Evidence: mobile-top.png, mobile-tab-today.png, mobile-tab-looks.png, checks.json and observations.json.
6. **Useful accessibility behavior is present.** The visible-on-focus skip link moves focus to the H1. View OOTD moves focus to the project heading. Tabs expose tab/tabpanel roles, selected state, panel association and roving tabindex; ArrowRight selects Today from Wardrobe. The mobile menu is labelled as a modal Site navigation dialog, initially focuses Close, closes with Escape and restores Menu focus. Reduced-motion mode produced an immediate open-cap end state and no active Web Animations at the sampled moment. No page errors occurred in either recorded traversal. These are positive checks, not a full accessibility certification.

## Improvements, in priority order

### 1. Show one convincing piece of software evidence

**Finding:** The entire project is conveyed through garment photography, layouts of garments, and explanatory copy. Wardrobe says “Add clothes from a photo… Review the details,” but its visual is one jacket. Today and Looks show combinations, yet there is no visible app interface, captured flow, or engineering detail. Visitors understand the idea better than they understand the product or Diet Code's execution.

**Improvement:** Add one honest app-screen sequence, short interaction capture, or explicitly labelled prototype demonstrating photo → review → wardrobe, then use the beautiful garment compositions as supporting art. If no interface is ready to show, add a compact statement of the product work already done and what the team is testing. Preserve the current in-development disclosure. Evidence: all desktop-tab-*.png and mobile-panel-*-top.png.

### 2. Give the people section information only those people could provide

**Finding:** “Small crew. Full of ideas.” is followed by essentially the same studio description already supplied in the hero. Gowrish, Jeswin and Sabi are identified only by names and aliases. The section does not explain who designs, who engineers, how the team works, or what kind of commission fits them. The elegant large rows occupy substantial space without adding much decision-making information.

**Improvement:** Add a short role or particular strength to each person and one specific sentence about the studio's working scope/process. These can fit into the existing rows and editorial system; a new generic services grid is unnecessary. Evidence: desktop-down-4-2400.png, mobile-menu-studio-navigation.png.

### 3. Make in-place interaction cues less ambiguous

**Finding:** Desktop project tabs use the same northeast-arrow vocabulary as View OOTD and the email action. An additional northeast arrow appears inside the Looks illustration beside “Indigo travel layers,” although that graphic is not a link in the rendered control inventory. This suggests navigation or an opening action at several elements that simply select content or remain static.

**Improvement:** Keep the selected black tab treatment but use a neutral selection marker for the three tabs. Remove the static illustration arrow or make its role clear. Reserve the strongest arrow cue for actual actions. Evidence: desktop-tab-looks.png and control inventory in observations.json.

### 4. Increase the practical value of the smallest editorial text on phones

**Finding:** The mobile garment captions, section eyebrows and flow labels are much smaller than the main copy. Some of the product illustration labels become dense in the two-column compositions. The primary story remains readable, but the fine supporting layer is harder to read than the rest of the page.

**Improvement:** Increase the most informative captions and garment names modestly, allowing clean wrapping. Consider removing nonessential numbering before shrinking text. Keep the large headline scale. Evidence: mobile-down-1-600.png, mobile-panel-today-top.png, mobile-panel-looks-top.png.

### 5. Give interested OOTD readers a relevant next step

**Finding:** In-development status is clear, but the project narrative ends after the feature description and immediately becomes a studio/team pitch. There is no stated way to follow OOTD or express early interest; the only direct contact route is the general studio email much further down.

**Improvement:** If gathering product interest is desired, add a small, honest email-based early-interest action beside the development status. Otherwise use a sentence clarifying the current milestone and why the studio is sharing it now. Evidence: desktop-inside-project.png and the transition shown in mobile-panel-looks-bottom.png.

## Coverage and limits

- Traversed the full page downward and upward at both required viewports, including intermediate overlapping screenshots; desktop document height 3892px and mobile 3762px in the initial Wardrobe state.
- Clicked the cap interaction, inspected multiple timed frames and its changed label, captured real browser video, inspected scroll-dependent opening states in both directions, and tested reduced-motion end-state behavior.
- Selected Wardrobe, Today and Looks on desktop and mobile; inspected the top and bottom of the longer mobile Today and Looks panels; tested arrow-key tab selection.
- Tested View OOTD and Inside the project anchors, mobile menu opening and Studio navigation, Escape closure/focus restoration, and the skip link. Inspected the mailto destination but did not launch an email client or send anything.
- No source changes were made. No performance trace, network throttling, screen reader session, full contrast audit, real-device Safari/Chrome testing, 200% zoom testing, or validation of the app's underlying functionality was performed. Headless Chromium videos and frame samples show actual browser behavior but are not a perceptual frame-rate measurement.
- Evidence is local to /private/tmp/dietcode-final-content/. observations.json contains the rendered text, controls, selected tab states, viewport widths and console-error results; checks.json contains additional keyboard, navigation, image and reduced-motion checks. The .cjs files are review automation only and do not read application source.
