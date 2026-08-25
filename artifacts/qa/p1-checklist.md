# Candidate Release Checklist

Reviewed: 2026-08-25 (Africa/Cairo)

## Content and evidence

- [x] Canonical data contains six selected repositories: five featured and CPU Scheduler in the archive.
- [x] Examination Management System, Library Management System, and C# Windows Forms Platformer appear in both the featured workbench and all-public archive.
- [x] Knight's End and both LeBaladna survey-helper slug variants are guarded by tests and absent from rendered copy, skills, journey, and résumé text.
- [x] Skills reflect repository-backed C++, C#, .NET, JavaScript, MIPS Assembly, Windows Forms, GDI+, OOP, collections, generics, events/delegates, file and binary I/O, bit packing, collision, and state-machine work.
- [x] All five README upgrades are public at the verified commit.
- [x] All 15 commit-pinned README/source/project-file destinations opened successfully in the in-app browser.

## Résumé

- [x] Original `Mazen Tamer Latest Resume.pdf` remains unchanged.
- [x] Corrected public artifact is one page and removes the empty survey project and unsupported PHP/MySQL/GDScript/Godot/LibreSprite claims.
- [x] Current city, phone, email, GitHub, LinkedIn, education, GPA, graduation date, and full-name author metadata are retained.
- [x] Structural audit passed: no encryption, forms, attachments, JavaScript, open actions, page actions, or hidden out-of-bounds text; three intended URI link annotations are allowlisted.
- [x] Every page rendered at 180 DPI and was visually inspected for clipping, overlap, glyph defects, hierarchy, margins, and legibility.
- [x] SHA-256 approval record matches `public/Mazen-Eladawy-Resume.pdf` and `npm run verify:resume` passes.

## Application and interaction QA

- [x] Recruiter order is Hero → Projects → About → Skills → Journey → Contact.
- [x] Featured briefings render contribution → technical decision → verified result → known limitation → evidence.
- [x] Project tabs wrap with arrow keys; modal initial focus, focus trap, Escape close, backdrop close, body lock, and focus restoration pass component tests.
- [x] Email, LinkedIn, résumé, clipboard success, missing/denied clipboard manual recovery, and unexpected clipboard failures are covered.
- [x] App owns one Page Visibility subscription; hidden, visible, rapid transitions, cleanup, missing-document fallback, viewport, and reduced-motion composition are covered.
- [x] In-app browser desktop inspection passed for Hero, Projects, evidence modal, and source links.
- [x] 1440×1000, 768×1024, and 375×812 layouts were inspected. Document `scrollWidth` equaled `clientWidth` at all three sizes, with no console/page errors.

## Automated gates

- [x] `npm run lint`
- [x] `npm test` — 11 files / 39 tests
- [x] `npm run build` — known `/mazen-tamer-portfolio/` base, canonical metadata, approved résumé, and production bundle
- [x] `npm run test:e2e` — one Chromium candidate smoke, clean console, modal, direct contact, clipboard, and résumé response
- [x] GitHub Pages workflow is manual-only, uploads only `dist`, and pins all Actions to full commit SHAs.

## Remote release

- [ ] Create `tenkagoken/mazen-tamer-portfolio` after GitHub sign-in.
- [ ] Push `main`.
- [ ] Select GitHub Actions as the Pages source.
- [ ] Manually dispatch `Deploy portfolio to GitHub Pages`.
- [ ] Open the final HTTPS candidate URL and record the live smoke result.

Remote release remains intentionally blocked until the account owner signs in to GitHub. No Pages setting or workflow has been changed yet.
