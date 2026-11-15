# Diet Code — three design directions

> **Superseded brief:** The user later clarified that OOTD is the only real project and that audio/DSP positioning is inappropriate. The previous AGENTS.md instructions were also revoked. See [round 2](round-2/README.md) for five new proposals grounded in the OOTD source. This first round is preserved as design history, not a current statement of studio work.

Prepared 14 November 2026. These are raster concept mockups created with the built-in imagegen tool, not screenshots of an implemented website. The bottle and capability specimens are generated concept imagery. Each board includes desktop and mobile heroes, three proposed follow-on sections, and four stop-motion storyboard frames. Storyboard FPS values are proposed animation cadence, not measured website performance.

## Confirmed brief

- Brand: **Diet Code**, never Diet Codebase.
- Rethink the whole journey; the earlier bottle/comic/vending sequence is not required.
- Neobrutalist design with a photographic, printed-halftone bottle cutout.
- Colour, typography and composition are open to art direction.
- Show three directions and wait for the user's choice before building.
- During implementation, use reviewers without conversation context to critique the actual site against an Awwwards-level rubric; aim for 9.5/10 and fix findings. These are subjective internal ratings, never official Awwwards scores.

## Directions

| Board | Visual system | Proposed journey | Bottle motion |
| --- | --- | --- | --- |
| [01 — Loud Print](01-loud-print.png) | Chartreuse, black, cream; extreme condensed typography; hard paper shadows | Studio statement → capability specimens → people → project enquiry | 8 fps paper replacement: rest, nudge, pop, settle |
| [02 — Studio Index](02-studio-index.png) | Cream and cobalt; oversized masthead; ruled editorial index | Choose a practice → detailed capability spread → people → enquiry | 6 fps printed contact-sheet turns linked to capability selection |
| [03 — Bottle Theatre](03-bottle-theatre.png) | Crimson, cream, black; monumental type; diagonal bottle stage | Interactive bottle introduction → WebGL specimen → sound/systems → enquiry | 10 fps anticipation, cap pop and landing; opt-in sound |

Recommended starting direction: **03 — Bottle Theatre**, for the strongest distinctive bottle interaction. **02 — Studio Index** offers the clearest service navigation. **01 — Loud Print** is the most direct expression of print-led neobrutalism.

## Composition research

Inspo was used for composition study. Principles carried forward: monumental masthead scale, deliberate negative space, a single focal object, and a clear contrast between display typography and functional interface text. No reference site's copy, images, code or signature effect was reused.

- [Poster](https://posterco.tv/) — monumental type and a single photographic focal point.
- [14islands](https://14islands.com/) — typography, negative space and studio positioning.
- [KVS Studio](https://kvs.services/) — halftone identity treatment and restrained framing; no entry gate or award badge borrowed.

The nine supplied project reference images were inspected and preserved without modification. Their source files and original mapping remain in the pre-redesign stash.

## Visual review and scope

- All three boards use the corrected name and show photographic green bottle cutouts with printed texture.
- Loud Print was refined to fit the complete bottle in desktop and mobile heroes.
- Studio Index was refined to make the paper-cut edge and halftone texture more explicit.
- Unconfirmed individual team-role descriptions were removed from the concept boards.
- Proposed layouts show readable hierarchy and separate content/control areas. Actual responsive layout, keyboard behaviour, animation, reduced motion, form delivery and performance require implementation and browser verification.
- No production code, dependency installation, deployment or push was performed. No implementation ticket is being marked complete. Build and visual-verifier checks are therefore pending implementation.

## Preserved previous work

Git stash: `1daf5749d7bd63c0a519bda6074f60c6d9f78fc4`, message `pre-neobrutalist-redesign-2026-11-14` on branch `overhaul`. It contains the prior source, references and verification screenshots. Dependency/build-output directories remained on disk. New mockup artifacts are separate from that stash.

The full generation prompts and two targeted refinement prompts are recorded in [prompts.json](prompts.json).
