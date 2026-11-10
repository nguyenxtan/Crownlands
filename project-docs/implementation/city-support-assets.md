# City support assets · batch 01

User authorization: “ok tiếp đi” after the proposed four-building batch. Scope is four stage-v01 concepts and their integration into the existing city. Do not create resource-field art, new military rules, additional building levels or a new city layout in this batch.

| Asset ID | Role and silhouette | Runtime copy | City slot |
|---|---|---|---|
| city-warehouse-v01 | Wide materials storehouse, large loading door, crates/timber/ingots | city-warehouse.png | S02 (S12 reuses when built) |
| city-granary-v01 | Raised dry store and compact rounded grain bins | city-granary.png | S03 (S13 reuses when built) |
| city-rally-point-v01 | Open assembly court, small shelter, spear/shield racks and signal bell | city-rally-point.png | S04 |
| city-transport-depot-v01 | Low carriage shed, freight wagon and spare wheel | city-transport-depot.png | S07 |

Style references: approved hall proof-v02 and existing barracks proof-v01. Match southeast city camera, limestone/timber/slate, upper-left daylight, genuine alpha and ground anchor(0.5,0.78). Supporting structures remain subordinate to the hall. New images are drafts for review, not approved exports. Original references, hall/barracks and save format stay unchanged.

Execution:

- Four separate built-in image_gen calls, each with the two style references.
- Preserve source PNG, exact prompt and generation/hash record per asset.
- Normalize app-local copies through the existing asset pipeline; do not edit original images or promote to final export.
- Reuse the same building-art mapping in city buttons and detail panels.
- Inspect individual images and assembled city for clarity, alpha, sizing, occlusion and click targets.
- Run unit/browser regression, including a new real-browser test that each of the four own sprites loads in both views. This new test failed against the previous SVG stand-ins before integration.

Status: complete for this four-concept batch; awaiting user review of the artwork.

## Results

All four source images, exact prompts, generation records and512×512 RGBA runtime copies are saved. Transport depot uses proof-v02: the first image's steps across the wagon bay were corrected to a continuous vehicle ramp by a targeted built-in image_gen edit. Both source revisions are retained. The other three selected sources are proof-v01. [Generation index](../../assets/previews/city-support-v01/generation-record.json) lists all selected files and hashes; [review board](../../assets/previews/city-support-v01/index.html) shows individual concepts and the city composite.

`buildingArt` now supplies a shared image mapping for the city and detail panel. The new real-browser case first failed against the old SVG stand-ins and then passed when all four actual PNGs loaded in both views. Existing occupied/empty city buttons keep their anchor and selection behavior.

Final current-project verification: **23/23 unit tests and13/13 browser flows pass**. These are the whole current suites, including other changes already present in the shared workspace; this batch itself adds the four-sprite browser case. Built25 local files. Screenshots reviewed at1440×1000,1024×768 and390×1000, with no page errors, broken images or horizontal overflow. Initial screenshot capture before an image paint was settled by waiting for decode/two animation frames for final captures; actual image requests succeeded.

All14 runtime provenance entries validate; all10 pre-existing entries and images remain unchanged. Layout hash, seven reference documents and U08 remain unchanged. Only the four relevant manifest assets become draft: total189 entries, original two selected approvals unchanged. New artwork is not marked approved or exported. Original sources, including the first depot version, remain intact. Local server remains at http://127.0.0.1:4173; no service restart or save-schema migration was needed.
