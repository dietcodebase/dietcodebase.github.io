# Independent live-site review

Reviewed only http://127.0.0.1:5177/ in Chromium at 1440×900 and 390×844. No source, project documents, previous reviews, or other reviewers were consulted.

## Score

| Category | Weight | Score /10 |
|---|---:|---:|
| Composition and typography | 25% | 8.3 |
| Identity and art direction | 25% | 8.5 |
| Motion and interaction | 20% | 7.7 |
| Mobile and accessibility | 20% | 8.0 |
| Content clarity | 10% | 7.4 |
| Weighted overall | 100% | **8.08 → 8.1** |

This is a convincingly art-directed studio site with a memorable opening. On an Awwwards-level rubric, it falls short of an exceptional whole-site experience chiefly in the depth of its product and studio evidence, rather than in basic visual polish. The hero is more distinctive than the case-study and team material that follows it.

## Editorial/product findings

1. The purpose is clear within the first screen: “Independent creative engineering studio. We design and build digital products.” The red paper, green bottle, cream label, enormous black title, and cap CTA form a coherent brand idea. “Let’s uncap it” pays that idea off at contact. The small sticker containing the actual studio description is readable but deliberately subordinate to the bottle; the brand image arrives before the explanation.
2. OOTD is honestly labeled “iOS · In development” and its promise is concrete: planning looks from clothes already owned. The three real tabs explain a useful sequence: import/review/search individual pieces; begin with a favourite and compose today’s outfit; save combinations for later. The specific “Indigo travel layers” example is more persuasive than generic marketing copy.
3. The important remaining gap is product proof. Every OOTD view shows garment photography and editorial diagrams; none shows an actual iOS screen or interaction. I can explain the idea after browsing, but cannot judge how the app itself looks, how quickly I could enter a wardrobe, or what the studio has engineered. The “Inside the project” destination promises more case-study depth than it currently provides. A single real screen sequence or short prototype demonstration would help more than additional explanatory prose.
4. Studio identity remains thin after the strong visual introduction. Three names and aliases communicate a small team, but no roles, distinctive expertise, or concrete contribution to OOTD. “We turn ideas into software, together” repeats the earlier offer rather than making the engineering capability more specific. Contact is very easy to find and the email action is unambiguous.

## Visual and interaction evidence

- Desktop composition has confident scale, consistent edges, restrained cream/black/red/green palette, carefully aligned rules, and coherent heavyweight typography. The OOTD still-life layout is spacious and legible. The black team section and red contact section create a clear progression.
- The pop action genuinely animates the cap away from the neck with a small graphic burst, and updates the text to “Pop it again.” Both desktop and mobile behaved correctly. Screenshots at 200 ms and 1000 ms record the intermediate/final states.
- The paper reveal and bottle transformation work in both scroll directions. Recorded 0→150→300→450→600→450→300→150→0 on both viewports. The return positions matched exactly: desktop Work top 900→654.5→409.1→163.6→−60 and back; mobile 844→613.8→383.6→153.5→−93.6 and back. No stuck reveal or accumulating offset observed.
- After the hero, the interaction vocabulary is useful but fairly familiar: anchors, a tabbed feature card, team rows, and mail links. The memorable motion is concentrated in the opening rather than developing a second product-specific interactive moment.
- Mobile is deliberately recomposed, including stacked DIET/CODE, a steep bottle diagonal, horizontal feature tabs, copy above tab imagery, a two-by-two saved-look grid, and a full-screen navigation overlay. Text, email, and controls remained within the viewport. The 390 px document width equaled the viewport width, as did the 1440 px desktop width.
- Mobile contact wraps “Let’s uncap it.” onto two lines, with “it.” isolated on the second. This is a small typographic weakness in an otherwise controlled mobile hierarchy; see mobile-down-3250.png.
- Both real tab clicks and ArrowRight keyboard activation changed the selected tab and focused the next tab. The skip link becomes clearly visible on first Tab. Mobile Menu opens with large, separated links; Escape closes it. Reduced-motion emulation reached the popped final state within 80 ms. Informative images inspected in the live DOM have descriptive alt text; the cap image has empty alt. These checks support a good accessibility baseline but are not an exhaustive audit.
- Studio and Contact navigation reached their destinations; Back to top returned to y=0 at both sizes. No uncaught browser page errors appeared in the check runs. Mailto destinations were inspected, not opened or sent.

## Testing limits

Headless Chromium only; no real iPhone, Safari, screen reader, automated contrast audit, performance trace, or network throttling. Screenshots establish spatial states and selected animation samples, not a measured continuous frame-rate guarantee. The first two broad capture scripts stopped on an incorrectly targeted Contact locator; a fresh-page navigation run using the actual accessible menu link passed at both sizes. This was an inspection-script selector issue, not evidence of a site failure. Hidden lazy-loaded tab imagery was not treated as broken; the Looks tab was selected and scrolled into view separately.

## Evidence

All evidence is in /private/tmp/dietcode-confirm-content/.
- desktop-top.png, mobile-top.png
- desktop-cap-200.png, desktop-cap-1000.png, mobile-cap-200.png, mobile-cap-1000.png
- desktop-down-*.png, desktop-up-*.png, mobile-down-*.png, mobile-up-*.png
- desktop-today.png, desktop-looks.png, mobile-today.png, mobile-looks.png, mobile-looks-full.png
- desktop-motion-*.png, mobile-motion-*.png, motion.json
- mobile-menu.png, desktop-studio-nav.png, mobile-studio-nav.png, desktop-contact-nav.png, mobile-contact-nav.png
- desktop-skip-focus.png, mobile-skip-focus.png, desktop-reduced-pop.png, mobile-reduced-pop.png
- checks.json (browser errors, document dimensions, actual link destinations, keyboard selected/focused tab results)
