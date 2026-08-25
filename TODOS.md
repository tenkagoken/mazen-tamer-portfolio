# Portfolio TODOs

## P2 editorial refinement

- **What:** Run `/design-consultation`, consolidate the approved private design plan and wireframe into a redaction-approved checked-in `DESIGN.md`, then implement the proof ledger, self-hosted IBM Plex fonts and license files, visited-link styling, mobile project-tab cue/snapping, and the accepted spacing/color refinements. Add archive no-match recovery only if P2 introduces a real search/filter state that can return zero results.
- **Why:** These changes strengthen editorial polish and browsing clarity, but they are not required for the P0/P1 candidate-readiness evidence chain.
- **Pros:** Gives future contributors a durable, reviewable visual specification and keeps refinement work cohesive.
- **Cons:** Adds font assets, visual QA, and a separate interaction-regression pass.
- **Context:** P1 must remain independently releasable. P2 may begin only after the repository redaction scanner can safely approve the design artifacts for check-in.
- **Depends on / blocked by:** Completed P0/P1 gates, successful redaction scanning, and `/design-consultation` output.

## P3 final-domain metadata and social preview

- **What:** Switch the P1 canonical and `og:url` values to the final production domain, create `public/og-portfolio.png` as the approved 1200×630 raster preview, emit its absolute HTTPS `og:image`, and verify the deployed HTML and image are publicly fetchable at their final URLs.
- **Why:** P1 intentionally supports direct application sharing without a placeholder image; broad social sharing needs final-domain metadata and a crawler-compatible raster asset.
- **Pros:** Shared portfolio links receive a consistent, branded preview and one canonical production identity.
- **Cons:** Requires a deployment follow-up, metadata fixtures, image inspection, and a final privacy/external-link sweep.
- **Context:** The raster preview should visually match the final Hero and include Mazen's name, role, and restrained editorial styling. P1 must omit the relative SVG placeholder rather than presenting it as finished social metadata.
- **Depends on / blocked by:** The final production domain, completed P0/P1 gates, and deployed image path.

## P3 project deep links and shareable briefings

- **What:** Add validated `#project=<id>` URLs, browser Back/Forward synchronization, Copy Project Link recovery, and a portaled/inert evidence modal with single-owner history and focus restoration.
- **Why:** Recruiters may eventually need to share or revisit one exact technical briefing instead of returning to the general Projects section.
- **Pros:** Enables project-specific sharing, reliable browser history, and a directly addressable evidence experience.
- **Cons:** Adds URL parsing, history ownership, focus restoration, portal lifecycle, clipboard recovery, and a substantial interaction-test matrix.
- **Context:** The candidate release intentionally keeps the existing accessible modal and shares the main portfolio URL. Begin this only if post-launch use shows that project-specific sharing is valuable; do not add hidden cross-section state as a shortcut.
- **Effort estimate:** M (human team) → S with Codex + gstack.
- **Priority:** P3.
- **Depends on / blocked by:** Completed candidate-ready release and evidence that direct project sharing is useful.
