# City resource plots · batch 01

Authorization: user “ok làm đi” after the four-plot proposal. Generate wood, clay, iron and grain city plots, then replace the geometric stand-ins at all16 existing resource positions. This batch does not add walls/gates, military systems, resource rules, new levels or new plot IDs.

| Asset | Visual | Source / runtime |
|---|---|---|
| city-resource-wood-v01 | Rounded tree canopies, cut wood, small logging shelter | source proof-v01 / city-resource-wood.png |
| city-resource-clay-v01 | Red clay excavation, access slope, barrow | source proof-v01 / city-resource-clay.png |
| city-resource-iron-v01 | Gray iron-bearing outcrop and timbered adit | source proof-v01 / city-resource-iron.png |
| city-resource-grain-v01 | Golden crop rows, short fence and small field hut | source proof-v01 / city-resource-grain.png |

Use existing warehouse/granary images as material and city-camera references. Generate four separate transparent sprites with built-in image_gen, one per asset; retain exact prompts, source files and hashes. Normalize app-local512×512 copies using the existing ground anchor(0.5,0.78). The same art function serves plot buttons and detail panels. Stage-v01 is reused for both calibrated levels1–2, with actual level labels and economic state retained.

QA: source alpha/padding; recognition in the16-plot ring; image clicks and stable anchored buttons; upgrades/autosave/import/offline regression; desktop and compact screenshots. New assets remain drafts for review. Preserve other assets, references, current layout, S00 and save schema, including changes already present in the shared workspace.

Status: complete for the four-plot concept batch; artwork awaits user review.

## Delivered

Four separate built-in image_gen outputs, source PNGs, exact prompts and records are saved under `assets/source/city-resource-{wood,clay,iron,grain}-v01/`. [Generation index](../../assets/previews/city-resources-v01/generation-record.json) records selected sources, hashes and runtime copies; [review board](../../assets/previews/city-resources-v01/index.html) contains individual samples and the16-plot city composite. All four sources have real alpha; app copies are512×512 with ground anchor(0.5,0.78), safe padding and no baked labels.

`fieldArt` supplies the same per-resource PNG to all four matching plots and their detail panel. The image draw box is155% with top offset−30%, preserving the previous ground contact. Image pointer events allow pressing the illustration itself; anchored button transforms remain unchanged. The regression selects all16 plots through their pictures, including tree canopy points, and verifies the correct loaded detail image. It first failed against the SVG stand-ins, then passed after integration.

Final current-project checks: **23/23 unit tests,19/19 browser flows passed**; these are the whole current suites, including concurrent changes already present in the shared workspace. The field batch adds the16-image browser case. Visual review at1440×1000,1024×768 and390×1000 found no broken images or horizontal overflow. Gallery rendering waits for image decode and a settled frame.

All19 runtime provenance entries validate; all15 entries that existed at the start, including the already-present city-ground-v02, remain unchanged. Current layout and S00 hashes remain unchanged; seven reference sources and U08 are preserved. Only four resource manifest entries become draft. Manifest total189 and the original two selected approvals stay unchanged; no new export approval is inferred. Costs, rates, existing level state and save schema are not changed by this batch. Runtime remains at http://127.0.0.1:4173.
