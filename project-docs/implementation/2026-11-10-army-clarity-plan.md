# Army identity, phase and ration clarity

Goal: A player sees troop types/tier, current expedition phase, grain per soldier and unambiguous game/real travel duration before and after departure. User screenshot misread `8:00 · giờ game` as8hours; actual480simulation seconds is8minutes.

Scope: presentation only. Preserve60seconds/tile, all economy/training/rations rules, schema3, personal saves, assets and permanent URL127.0.0.1:4173. No new troop tiers, carrying-capacity rules, movement balance or online mode.

Approach: shared pure presentation helper; explicit Vietnamese duration units; selectable DOM army badges above Canvas using exact current positions; active-army detail within existing mine panel and richer field cards. Keep pointer gestures/site selection and focus stability from current code.

- [x] Test duration, composition and per-soldier ration projections against actual game objects; implement field-presentation.js.
- [x] Browser regression for8minutes vs8hours,1minute at8×,2grain per soldier from24/12; map select, mixed troop composition and outbound/working/return states. Implement logistics-view/world-map/main and CSS, keeping current form drafts stable.
- [x] Run full unit/browser suites, visually inspect desktop/mobile, build at same URL and record evidence. Independent targeted review after verification.
