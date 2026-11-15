# Independent interaction confirmation

Reviewed only the rendered frozen site at http://127.0.0.1:5177/ in Chromium, at 1440×900 and 390×844. No source, documentation, earlier reviews, or other reviewers were consulted. Evidence is in this directory. No site files were edited.

## Score

| Category | Weight | Score / 10 |
|---|---:|---:|
| Composition and typography | 25% | 8.6 |
| Identity and art direction | 25% | 8.9 |
| Motion and interaction | 20% | 8.0 |
| Mobile and accessibility | 20% | 8.2 |
| Content clarity | 10% | 7.4 |
| Weighted overall | 100% | **8.36 / 10 (8.4)** |

The distinctive halftone bottle, paper edge, tightly set oversized type, and red/cream/black system make this feel authored. The visual system survives mobile unusually well. It is polished enough to be credible in an awards context, but I would not honestly score it 9: the product evidence and interaction depth do not yet match the strength of the hero identity.

## Reproduced findings

1. **The initial OOTD overview is absent from the accessibility tree and keyboard route.** On a fresh load, rendered `#work` has `aria-hidden="true"` and `inert=true`. Consequently its OOTD heading, status, wardrobe-app summary, three figures, and Inside the project link are absent from the initial accessibility snapshot. Actual Tab traversal goes from View OOTD to the Wardrobe detail tab, skipping Inside the project. A native wheel scroll of 550px changes this to `aria-hidden="false"`, and the missing overview appears in the accessibility tree. Work/View OOTD activation also provides a successful way into it, so this is a conditional discoverability issue rather than an unreachable section. Exposing meaningful offscreen document content independently of the visual reveal would make the reading order more dependable. Evidence: accessibility-log.json, keyboard-motion-log.json, desktop-keyboard-settled.png.

2. **Product proof is thinner than the art direction.** All three OOTD tabs explain the concept with garment artwork and workflow words. None shows the actual iOS interface, a prototype, or a finished interaction. This is directly observable on desktop and mobile; the app is honestly labelled In development. For a studio claiming to design and build digital products, the case study remains a concept presentation. Evidence: desktop-today.png, desktop-looks.png, mobile-panel-today.png, mobile-panel-looks.png.

3. **The studio section names people without explaining their capabilities.** The three rows provide names and handles, then a general studio sentence. The handles are plain text; no role, expertise, biography, or linked work is presented. A prospective client can contact the team easily but has little evidence about who does what. Evidence: desktop-forward-2.png, mobile-forward-3.png, desktop-forward-4.png.

4. **Mobile closing typography has a less deliberate final line.** At 390px, “Let’s uncap it.” becomes “Let’s uncap” / “it.”, leaving a short isolated last word. It does not clip or overflow, but weakens an otherwise tightly composed closing section. Evidence: mobile-forward-5.png.

## Behaviors confirmed

- Native wheel forward scroll covers the whole document; reverse scroll returns to y=0 on both viewport sizes. No stuck scroll, persistent blank section, or horizontal document overflow reproduced. Document widths were exactly 1440 and 390 respectively. Desktop bottom was y=3002; mobile bottom y=3055.
- The torn-paper reveal progresses through small native 90px wheel increments and reverses. See desktop-tear-90.png, desktop-tear-270.png, desktop-tear-450.png and desktop-reverse-7.png.
- The bottle image and the Pop the cap text control both activate with click, Enter, and Space once the page has settled. Both update their accessible name to Replay the bottle cap pop and visible text to Pop it again. Clicking replay works. See bottle-repro-log.json, desktop-pop.png, desktop-replay.png and mobile-pop.png. An initial immediate-after-navigation keyboard probe returned no change; the repeated settled tests with both keys and both controls all passed, so I am not calling that a reproducible user-facing defect.
- Visible keyboard focus rings appear on links, bottle, selected tab and tabpanel. Offscreen focus scrolls into view after the smooth scroll settles. Initial focus measurement during the scroll transition was corrected by waiting; it is not a persistent hidden-focus bug. See desktop-keyboard-settled.png and extra-log.json.
- Skip to content focuses the H1. Back to top returns to y=0 and focuses the home link. View OOTD focuses the OOTD heading.
- Mobile Menu is a modal dialog with `aria-modal=true`, and the background main is inert. Focus cycles Work → Studio → Contact → Close → Work. Escape closes and restores Menu focus. Studio closes the dialog, scrolls to the studio and focuses its heading. See mobile-menu.png and mobile-log.json.
- Tabs use tablist/tab/tabpanel semantics and selected-state announcements. Right Arrow cycles Wardrobe → Today → Looks → Wardrobe; Home and End select the first and last tabs. Click activation works on desktop/mobile. Only the active panel appears in the accessibility snapshot. See desktop-log.json and the mobile panel screenshots.
- Reduced motion is respected in the sampled cap action: immediate and 900ms-later screenshots are byte-identical, and no browser animation was running. The cap switches directly to its open state. Reduced-motion View OOTD navigation reached and focused OOTD within the 100ms sample. See reduced-pop-immediate.png, reduced-pop-final.png, keyboard-motion-log.json and bottle-key-log.json.
- Contact and OOTD enquiry links expose the expected mailto destinations. No message was sent.

## Limits

Headless Chromium with viewport/touch emulation, not physical phone testing or VoiceOver/NVDA. Accessibility findings use actual keyboard behavior plus the rendered browser accessibility snapshot and attributes, not a complete screen-reader audit. Motion was inspected through timed interaction and screenshots, not a quantified frame-time or hardware performance test. No claims about other browsers, network extremes, actual mail client launch, or a deploy build.
