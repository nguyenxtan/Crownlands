# Perimeter visible in the playable city · 2026-11-10

After the image-first preview, user reported “chưa thấy thành”. The previous delivery had intentionally left the app's temporary ellipse and gate symbol unchanged. This follow-up integrates the actual stone wall, six watchtowers and two-tower gate into the playable city.

`app/assets/city-wall-v01.png` and `city-gate-v01.png` are unchanged copies of the generated source PNGs. Provenance now includes both entries; no source art is cropped/repainted or promoted to approved production export. `scripts/prepare-art.py` preserves the same copies on regeneration.

The temporary wall/gate elements in `app/index.html` are replaced by decorative image layers. CSS fits the sparse wall source to the existing scene at left7%,top−7.5%,width86%,height105%. The rear wall is behind the buildings; a duplicate clips the bottom30% of the source into the foreground. The gate is separately placed at left40.5%,top61.3%,width19%. These are presentation adjustments, not a change to any building/resource anchor or gameplay data. All perimeter layers ignore pointer input. Their original art stage remains provisional and formal2048×1536 export is pending.

The new browser regression failed before integration because there was no wall image. After integration it passes via both “Vào thành” and the left “Nội thành” menu and verifies both PNGs after offline reload. Full verification: `npm test`23/23, `npm run test:e2e`20/20, including all14 held building clicks and all16 resource targets. Build:33 local files, hash`7c5b83715abd9edd`. Inspected actual game screenshots at1440×1000,1024×768 and390×844; see [1440](../../assets/previews/city-perimeter-live-v01/city-1440.png), [1024](../../assets/previews/city-perimeter-live-v01/city-1024.png), [390](../../assets/previews/city-perimeter-live-v01/city-390.png).

The build is served at the existing http://127.0.0.1:4173 origin. Existing cached pages need “Cập nhật” or a reload before showing newly integrated art. Personal saves were not accessed; tests run in isolated browser contexts. Simulation, balance, layout IDs and save schema remain unchanged.
