# Diet Code — Tear Open design

Status: implementation authorized by the user on 14 November 2026. Built and locally verified on 15 November 2026; the independent9.5 design gate remains unmet. Original requirements retained below.

## Intent and confirmed scope

Build the selected [Tear Open concept](../../mockups/2026-11-14/round-2/04-tear-open.png) as an interactive studio website. Keep the cream masthead, vermilion torn-paper field, oversized photographic halftone bottle, and direct route to OOTD. The brand is **Diet Code**. OOTD is the only real project; no audio/DSP positioning, fictional work, invented team roles, client results, awards, or launch claims.

The previous AGENTS.md instructions were revoked by the user. The earlier 3D bottle/comic/vending architecture is not a requirement. Current source is a plain HTML/CSS site; the abandoned implementation remains in stash `1daf5749d7bd63c0a519bda6074f60c6d9f78fc4`. Do not apply or discard that stash.

## Label correction

Interpret the user's correction as physical label orientation: the printed label belongs to the bottle and rotates with it, rather than staying level with the screen. The bottle itself remains nearly horizontal on desktop, as selected. If the user instead intends an upright bottle, resolve that before implementation.

Create a single upright master bottle with a correctly wrapped cream label: vintage italic green “diet code”, wave underline, curved edges, and shading consistent with the glass. Include the label in the bottle-body image; never overlay screen-aligned DOM lettering. Photograph-style print, coarse 45-degree halftone, irregular paper silhouette and visible air gap remain.

For a desktop bottle whose neck points about 12 degrees above the horizontal, rotate the upright bottle artwork approximately 78 degrees clockwise. The label baseline therefore rotates approximately 78 degrees too. For mobile, use a more upright diagonal, about 38 degrees clockwise from upright. These are art-direction starting angles, adjustable for framing; body and label must always share their transform.

The cap is a separate matching transparent cutout, anchored to the bottle mouth. Its closed pose must align without seams. Do not regenerate inconsistent bottle designs across animation frames: reuse the same master art and transform it.

## Chosen approach and alternatives

**Recommended:** lightweight HTML/CSS/ES modules; transparent body/cap artwork; stepped transforms; an SVG paper-edge mask; native scroll and browser animation APIs. This supports tactile paper motion, actual pointer/touch/keyboard controls, and a static fallback without a WebGL scene.

A pre-rendered sprite or video can show handcrafted frames, but adds asset weight and makes direct manipulation harder. Use only if the transform prototype cannot achieve the intended cut-paper feel. Rebuilding a realtime 3D bottle adds rendering complexity and drifts from the chosen printed photographic aesthetic.

Use Vite for development and static output, Playwright for browser verification, and Node's built-in test runner for a small pure motion/state test suite. Reuse compatible tooling already installed; do not restore the old React/Three/Lenis application.

## Page and content

1. **Hero / tear scene:** cream wordmark, Work/Studio/Contact navigation, red tear, large sideways bottle, studio descriptor, “View OOTD”, and a discoverable “Pop the cap” control. No loader or entry gate.
2. **OOTD:** one case study, described as an iOS wardrobe app in development, for planning looks from clothes you own. Show real bundled garment imagery. Show genuine app captures only if available from an existing local app session; otherwise use a garment-led project plate, not an invented interface screenshot. Do not expand this task into building or repairing WardrobeAI.
3. **Studio:** clear short statement and a visible semantic member list: **Gowrish (gorix), Jeswin (jes), Sabi (sero)**. All three names must be readable in the actual desktop and mobile page, not only in artwork, hover states, metadata or an accessibility label. Preserve the existing handles and do not invent individual roles.
4. **Contact:** a real configured email/contact destination. The address is not in the supplied material, so this is a delivery dependency, not permission to invent an address or fake a send. Resolve it during implementation before the contact route can pass verification. Public copy must not expose backend setup instructions or a pretend submission flow.

Images, fonts and approved project imagery must live inside this repository. No references to home-directory paths at runtime. Use local licensed fonts: Archivo Black display, DM Sans body, and italic lettering inside the bottle artwork. Cream `#F4F1EA`, red `#E62E2D`, ink `#0E0E10`; emerald belongs principally to the bottle. Use flat colour, hard rules, deliberate whitespace and selective grain.

## Actual interactions and motion

| Trigger | Behaviour | Purpose and bounds |
| --- | --- | --- |
| First load | Bottle lands through 7–8 stepped poses over about 800ms; name/content remain readable from first paint | Establish paper stop motion without an intro delay |
| Fine-pointer hover | Bottle/shadow make a small stepped nudge, at most 2 degrees and 5px | Show that the bottle is interactive |
| Click/tap bottle or “Pop the cap”; Enter/Space | 900–1,100ms pop: anticipation, cap flight, tiny printed fizz, settle | Real stateful interaction; keeps visitor on the page |
| Fine-pointer drag of bottle | Bounded horizontal displacement at most 36px and rotation at most 6 degrees; 6-step settle on release | Tactile play; does not drag content or move navigation |
| Scroll from hero toward OOTD | The single red paper cover peels away in roughly 12 discrete poses; the bottle/cap group moves with it while OOTD is revealed | Every pose follows scroll position in both directions |
| Scroll back toward the hero | Retrace the same paper edge, bottle position/tilt/shadow and project-reveal poses, closing the tear and restoring the hero | No one-way reveal, restart, delayed catch-up or permanently opened flag |
| “View OOTD” / Work link | Runs or skips the same tear transition, reaches OOTD, and gives its heading focus | Direct, keyboard-accessible route to the actual project |
| Buttons/links | Small press, hard-shadow and underline responses | Clear interaction feedback |
| Replay after cap lands | Briefly reseats the same cap, then replays the pop | Explicit replay without permanent disabled controls |

Quantize authored object motion at 10 poses/second. This is animation styling, not a claim of 10fps browser rendering; scrolling and input remain responsive. No continuous bobbing, perpetual ticker, smooth 3D spin, background audiovisual effects or autoplay sound. No sound engine or sound toggle is included.

Cap state: `closed → popping → open`; activation from `open` goes through a short `resetting → popping` replay. Ignore duplicate activations while popping/resetting without losing focus or queuing multiple flights. Pointer drag beyond 8px suppresses the subsequent click; pointer cancellation releases capture and settles safely.

Implement one native-scroll scene approximately 160svh tall, with one 100svh sticky stage. Hero cover and the real OOTD introduction share that stage; OOTD details continue below in normal flow, so the project intro is not duplicated. The 60svh runway drives the paper reveal. Do not intercept wheel/touch scrolling or install a smooth-scroll library. Keep mask animation inside this scene and off the body text. Fit and test the actual artwork at each viewport rather than scaling an entire desktop screenshot.

**Reversibility is an acceptance requirement.** Every scroll-driven property must be a deterministic function of the current normalized scene progress, not a timed animation triggered by crossing a threshold. At the same viewport and scroll position, the same paper, bottle and project poses must render regardless of whether the visitor approached from above or below. Stopping mid-gesture holds the current pose; reversing immediately retraces it. Small repeated reversals, jumping over the scene, and returning through the Work link must all preserve this rule.

The first-load entrance and manually activated cap pop are separate, time-based gestures. Reverse scrolling retraces their parent scene pose; it does not unexpectedly trigger or replay a manual cap pop. Give local bottle interaction and scroll placement separate transform layers so neither overwrites the other's label/body geometry. Reduced motion still uses static flow and direct navigation.

Before JS enhancement, hero and project are ordinary flow sections, and links work as normal anchors. Enhance to the sticky scene only after the art is ready; no hidden content while assets load. Expose `#work` as the actual project section. Work navigation must coordinate reveal/scroll rather than landing behind an opaque cover.

## Mobile, access and failure behaviour

- Mobile retains cap tap and visible replay; dragging is desktop/fine-pointer only. Vertical touch scrolling always belongs to the page.
- At least 44px controls, visible keyboard focus, semantic headings and native button activation. No content needs hover or dragging.
- Bottle and cap never obscure navigation or project actions. Cap flight is contained within a safe part of its stage at 390px and 320px.
- The Work section remains in semantic document order even while its visual layer is covered. Keyboard focus entering Work immediately reveals it. Covered hero controls are inert; scroll reversal moves focus to a visible hero control. Deliberate Work activation focuses the revealed OOTD heading. Never leave focus behind a visual cover.
- With reduced motion: static correctly labelled bottle, instantaneous cap-state changes, ordinary hero/project flow and direct anchors; no sticky runway, drag tilt, parallax or tear animation.
- With JS unavailable, missing art, slow loading, or animation failure: readable studio/project content and usable anchors remain. A missing bottle displays a labelled fallback without reserving a dead full-screen scene.
- Pause active animation when the document is hidden; return in a coherent state. Resize/orientation changes must not reset a partly opened scene or move the label independently.

## Validation and review

First implementation deliverable is a corrected bottle-art proof at both desktop and mobile angles plus a short interaction capture. Compare the physical label, mouth/cap seam, silhouette, halftone and paper edge with the selected mockup before refining the rest.

Verify 1440×900 and 390×844, then 1024×768, 768×1024 and 320px width for reflow. Record actual motion in a short video/filmstrip; still images alone do not prove animation. Exercise cap click/tap, repeated replay, keyboard, cancelled drag, scroll/reverse scroll, Work navigation, menu, reduced motion and no-JS. Collect page/console/network errors, layout overflow and measured timing. Do not infer smoothness or 60fps from static screenshots.

Record matching forward and reverse checkpoints at 0%, 25%, 50%, 75% and 100% of the scene. With local interaction held constant, compare scroll-owned transform/mask values and the corresponding renders at each checkpoint. Include a down→up→down capture and explicit assertions that all three member names are visibly present at desktop and mobile widths.

During implementation, dispatch three independent reviewers with no conversation context using fresh `fork_turns: "none"` agents: one with an emphasis on visual craft and identity, one on interaction/accessibility, one on clarity of studio/project presentation. Every reviewer evaluates the full actual website. Give them only the running URL, public-facing content, instructions to inspect desktop/mobile and actual motion, and a fixed Awwwards-level rubric—not the target score, preferred verdict, conversation, design documents, previous scores or selected mockup. Score out of 10 with weights: composition/type 25%, identity/art 25%, motion/interaction 20%, mobile/accessibility 20%, content clarity 10%. They must report concrete defects with evidence.

The requested design-quality gate is **at least 9.5/10 from each independent overall assessment**, alongside passing functional checks and resolved material findings. A lower score requires another fix/review round, not a completion claim. Do not average away a failing review, coach a reviewer to the target, or erase unresolved criticism. A remaining material limitation must be reported honestly. These are subjective internal assessments, not official Awwwards ratings.

Implementation was subsequently authorized. Deployment, push, stash restoration and unrelated project modifications remain outside scope.

## Final implementation notes

Paper uses generated physical cutout alpha assets instead of a geometric SVG/clip-path contour. Its twelve poses remain determined by current scroll position, including bottle visibility and mask geometry. Phone descriptions precede the garment artwork; tabs use selection marks rather than external-link arrows, and an OOTD mail enquiry route is available. User retained the garment-led case and requested no specific member roles. Review scores and limits are recorded in docs/reviews/tear-open/validation.md.
