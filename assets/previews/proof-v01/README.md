# Asset proof v01

Created2026-11-10 · **draft, not approved**.

[Open gallery](index.html): tabs for16 samples,32px world scale, city layout and cavalry branches. Click a card for a larger view; switch light/dark/checker background to inspect alpha. Source images are local and the gallery works without network.

15 raster sources were generated individually with built-in image_gen. Grain UI is an original SVG glyph. `generation-record.json` contains exact prompt set, input-reference paths and selected local source files. `thumbs/` contains display-only sips-resampled copies; original artwork stays intact in `assets/source/<asset-id>/`.

The first cavalryIII source had a clipped lance tip; revision2 fixes the framing and is the selected proof. Three cavalryIV variants use the first cavalry image as their style/pose reference. This is preserved as lineage, not silently replaced.

`board-preview.png`, `world-preview.png` and `city-preview.png` are browser-rendered composites made from these real sources. Map labels/owner marks/routes are HTML/canvas overlays, not baked asset art. City empty slots/resource plots/wall guide are placeholders from the canonical14/16 layout. Only the townhall and barracks are finished draft building sprites.

Quality still to approve: world camera is more oblique than the75degree target; raw source dimensions/padding differ from production contracts. Visual display normalizes alpha bounds but does not change originals. Final export sizing/anchors and terrain edge seams need a separate pass before approval; do not mark production assets complete from this gallery.
