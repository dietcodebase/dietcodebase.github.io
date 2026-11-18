# Diet Code assets
- Bottle master: generated with OpenAI imagegen on 2026-11-14 for this project; original `/Users/jes/.codex/generated_images/01a1daf3-2bdd-7620-b4b2-9e266b690410/exec-c14560d6-e44e-4a45-912b-9b47cf283ecc.png`. Photographic halftone art, not a physical product claim. The original master supplies the cap clip; lettering is part of the body image. The matched open-mouth variant is documented below.
- OOTD garment photographs: copied from user-provided WardrobeAI repository `WardrobeAI/SeedAssets/`. Not actual app screenshots; no app UI is fabricated.
- Archivo Black and DM Sans: Google Fonts official github.com/google/fonts distributions, SIL Open Font License, licences adjacent in public/assets/fonts.
- Paper grain: inline SVG turbulence in CSS; no third-party raster textures.
- OOTD described as in development. No release, download or performance claims.
- Production bottle uses WebP at quality88, lossless alpha (356,620 bytes); original PNG archived in docs/assets/originals. Garments use 900px JPEG derivatives (combined 277KB), source PNGs remain in WardrobeAI. Format/size optimization only.
- Open-mouth body: imagegen surgical edit of bottle master on 2026-11-14, source archived as bottle-open-master.png. Production body.webp retains printed label and exposes a glass rim when original cap moves. Cap comes from original master.webp; no per-frame regenerated art.
- Product-story copy verified against WardrobeAI/ContentView.swift: wardrobe photo/manual entry and review, search; Today locks owned pieces and offers Save for later/Wear today; Looks saves combinations. Website panels explain these features editorially and are not labelled or framed as app screenshots.
- Additional genuine seed garments: indigo-yukata-jacket, white-guayabera, white-sneakers, JPEG derivatives from WardrobeAI/SeedAssets. The Looks panel reproduces the actual seeded combination “Indigo travel layers” from WardrobeSeed.swift (jacket, guayabera, straight jeans, white sneakers). The Today panel is explicitly labelled one possible combination from bundled pieces, not a captured app result or AI recommendation.
- Realistic paper materials generated with imagegen on15 November2026: red printed stock with diagonal torn edge and a cream torn strip. Production WebP files preserve true alpha; original PNGs archived in docs/assets/originals. These replace polygonal paper contours and procedural SVG grain. The same cream-paper matte supplies the scroll-owned edge and label backing.

## OOTD product-decision copy

The “Real pieces first” case note describes existing code at source HEAD `f37cde6911cfba5c25fa4373f2d1c8dbbcc794c4`: `WardrobeAI/OutfitRecommendations.swift:197–260` filters active owned items and generates bounded candidates; `WardrobeAI/ContentView.swift:454–478` displays local suggestions before optional ranking and retains them when ranking fails; `WardrobeAI/StylistChat.swift:185–220` accepts only existing candidate IDs and preserves locally formed explanations. No performance, blanket privacy/offline, or native-runtime verification claim is made.

## User-reference bottle revision,15 November

The user supplied the pixel-rendered bottle reference. `bottle-user-reference.png` is preserved verbatim. Its lossless WebP derivative is embedded in `public/assets/bottle/reference-master.svg`; a traced SVG clipping path isolates the bottle without regenerating its lettering or glass. Cap and body reuse the same URL with registered CSS crops, avoiding duplicate transfers. The silhouette mask is manually traced; no numerical99% fidelity claim is made. A generated bottle variant was rejected because it changed the source.

`torn-edge-v2.png` is an imagegen-created paper alpha asset, preserved here and encoded as WebP for the real fibrous section edges. Production motion is SVG/code-native liquid geometry, not a generated animation.

## Clean paper-rim bottle edit

The latest user correction requires neutral glass with no blue sky and a complete rounded cutout. `bottle-clean-rim-v3.png` and `bottle-open-rim-v3.png` preserve imagegen edits of the user reference. Their WebP derivatives are used for closed cap/open body; same1536px registration. The white paper outline is baked into the edited art. These supersede the traced original-pixel SVG at runtime. The edits change pixels to neutralize the blue; they are not represented as an exact original-pixel extraction. The surrounding transparency was inspected in-browser.

`milk-surface-v3.png` is a generated macro milk material, encoded as `public/assets/liquid/milk-surface.webp`. It is mapped inside the code-shaped stream, with a restrained cross-section shading overlay. The stream path, gravity/taper, advancing front, pool-volume integration, waves, splash particles and bubbles remain code-driven and scroll-reversible. It is a designed visual approximation, not footage or a certified fluid solver.

Performance pass: the macro milk material is resized to384px wide and encoded as WebP for its narrow on-screen stream. This is a format/size optimization of the same source image. The enhanced scene omits the live bottle cast-shadow filter because it caused frame stalls; the baked paper rim is unchanged.
