# City selection and main hall · 2026-11-10

User feedback: occupied buildings jump while pressed; the main hall is too small and does not read as the city's central building. Other buildings' art status also needs to be clear.

## Reproduced and fixed

The generic `button:active` rule replaced a placed building's `translate(-50%,-74%)` with `translateY(1px)`. At1440×1000, pressing S01 moved it57.2px horizontally and71.3px vertically, moving the hit target out from under the cursor. Scope that press transform to non-city buttons; city slots retain their ground anchor while pressed. A regression holds/releases every one of the14 slots and verifies both stable coordinates and selection of the intended slot. It failed before the fix and passed afterward.

## Visual revision

Built-in image_gen produced `assets/source/city-town-hall-v01/proof-v02.png`, with the exact sibling prompt and record. Original proof v01 remains unchanged. The new proof retains stone/timber/slate materials and adds a taller civic tower, two integrated wings, large entrance and broad stair. It remains a draft for user review, not a final approved export.

The hall's image draw box grows from132% to250% of the same button footprint, approximately1.9× the original rendered height; hit target size does not change. Gold title treatment and a ground pad distinguish the central building. To avoid covering the rear buildings, S01's presentation anchor moves from(0.5,0.47) to(0.5,0.56), recorded in city-layout revision2. No slot IDs,14/16 counts, resource rules or save schema change. Other nine runtime image entries and icon grain v2 stay byte-for-byte unchanged.

Only the main hall and barracks currently have dedicated building raster proofs. Warehouse, granary, rally point and transport depot are still simple SVG stand-ins; empty positions are selectable future slots. This change does not complete their concepts or the189-asset plan.

## Verification

19 unit cases and10 browser flows; new regression covers held clicks on all14 buildings, alongside all16 resource targets in the existing compact test. Reviewed new composites at1440,1024 and390px; no horizontal overflow. Runtime provenance10/10 valid, other nine image entries unchanged, old hall proof preserved, seven reference hashes and U08 unchanged. Coordinates remain in bounds and IDs unique.

Previews: [1440](../../assets/previews/city-hall-v02/city-1440.png), [1024](../../assets/previews/city-hall-v02/city-1024.png), [390](../../assets/previews/city-hall-v02/city-390.png).
