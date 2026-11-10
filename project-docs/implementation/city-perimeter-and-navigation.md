# Perimeter concepts and city navigation · 2026-11-10

User requested perimeter images first and a fix for the left “Nội thành” entry behaving differently from “Vào thành”. Art preview and navigation debugging ran independently.

## Image deliverables

Built-in image_gen produced two separate transparent drafts: `assets/source/city-wall-v01/proof-v01.png` (six watchtowers) and `assets/source/city-gate-v01/proof-v01.png` (two flanking towers). Each has an exact sibling prompt and source/hash/alpha record. The [review board](../../assets/previews/city-perimeter-v01/index.html) includes raw images and a trial composition using the existing hall and ground. These images are preview only, without runtime integration or production approval. Final full-canvas perimeter alignment, camera fit, building occlusion and depth layers remain pending. See the [preview README](../../assets/previews/city-perimeter-v01/README.md).

Both PNGs have true transparent corners; the wall center and gate passage also have alpha0. All seven preview image references decode; card thumbnails fit their containers. Source images are preserved unchanged.

## Navigation evidence and changes

Fresh Chrome showed both original entry buttons already calling the same handler and displaying ground v02. The exact reported direct-click mismatch was not reproduced in a fresh context. A related reachable defect was reproduced: returning from the city to the world kept the city building/plot inspector and removed the site’s “Vào thành” action. Navigation state also lacked an accessible current-scene marker.

`setView` now restores the map-selected site on world entry, remembers the city selection, and synchronizes scene visibility, sidebar highlight and `aria-current`, including initial render. City/sidebar/keyboard/objective routes are covered together.

A separate real two-release fixture reproduced a stale-document issue after a new service worker activated: the old page remained on the previous image with no update action. New `app-updates.js` exposes “Cập nhật” when an existing controller is replaced, checkpoints before reloading, and keeps the current page/export accessible if saving fails. First offline installation does not display a needless update action. Existing historical JavaScript needs one manual reload to acquire this new handling.

Parent visual review found horizontal overflow at390px when the new action was visible. A real two-release mobile regression failed before the fix; CSS now places the update action below the topbar at widths≤700px. Update/save/help remain accessible without overlapping the title.

## Verification

Implementer verified five new navigation/update regressions RED→GREEN, `npm test` 23/23 and full Chrome suite 19/19. Final build:31 local files, hash `2a6723240e6fc030`. Parent inspected changed code, confirmed current main/update/index/style/resource files match `dist`, and independently exercised both city entry paths, world return, current sidebar state and visible-update layout at1440×1000,1024×768 and390×844 with no horizontal overflow or page errors. [Recorded browser checks](../../assets/previews/city-perimeter-v01/navigation-check.json) and screenshots sit with the preview.

The release fixture proves an active upgrade, speed/running state and four newly elapsed game seconds survive the update checkpoint. A separate failure case leaves the old page usable and permits JSON export. Tests use isolated browser contexts, preserving personal saves.

Seven source references, U08, all19 current runtime source/output pairs and both new source hashes were verified. Concurrent resource-art work was preserved and included in the integrated suite; this task did not author it. Simulation, balance and save schema are unchanged. The game's existing temporary perimeter remains until the requested image-first review leads to integration.
