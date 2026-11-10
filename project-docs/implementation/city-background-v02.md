# City background v02 · 2026-11-10

User request: “làm background trong thành đi”. Created and integrated a new summer terrain plate using built-in image_gen, following the existing city art bible and layout. The previous ground is retained.

The new ground adds worn limestone paths, an open sandy civic yard, grass verges, corner trees, small rocks/flowers and a shallow creek at the bottom-left edge. Buildings, resource structures, wall/gate and labels remain separate. Existing 14 building anchors and 16 resource anchors are unchanged.

Source: `assets/source/city-ground-summer/proof-v02.png` (1448×1086). Exact prompt and generation/hash record are siblings `proof-v02-prompt.txt` and `proof-v02-record.json`. Runtime: `app/assets/city-ground-v02.webp`, converted with cwebp quality88, 398,986 bytes. This is a provisional runtime image, not a formally approved 2048×1536 production export.

`app/index.html` selects the versioned image. CSS displays the painting at its original colors, replaces the old strong oval mask with a narrow vertical edge fade and removes the wall's interior tint so the ground remains visible. Terrain ignores pointer events; all buttons retain their original placement. `scripts/prepare-art.py` can regenerate both the old ground and the new version with their separate provenance entries.

Verification: `npm run build` produced 26 local files, hash `9b0a85a3bd83df06`; `npm test` 23/23; `env -u NO_COLOR npm run test:e2e` 13/13. Real Chrome screenshots inspected at 1440×1000, 1024×768 and 390×844; new background decoded at every size, no horizontal overflow. Browser tests retain all 14 building click/press checks, all 16 plot targets at compact size, paid upgrade/save flows and offline reload with loaded images. Seven reference hashes, U08 and all 15 runtime-art source/output pairs match their manifests. Browser checks use isolated contexts, leaving personal saves untouched.

Previews: [1440](../../assets/previews/city-ground-v02/city-1440.png), [1024](../../assets/previews/city-ground-v02/city-1024.png), [390](../../assets/previews/city-ground-v02/city-390.png), [before](../../assets/previews/city-ground-v02/before-1440.png).
