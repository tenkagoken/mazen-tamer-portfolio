# Candidate Release Checklist

Reviewed: 2026-08-25 (Africa/Cairo)

## Content and evidence

- [x] Canonical data contains seven selected, commit-verified repositories, all shown in both the animated verified-work section and project archive.
- [x] Examination Management System, Library Management System, and C# Windows Forms Platformer appear in both the featured workbench and all-public archive.
- [x] Knight's End remains guarded by tests and absent from rendered copy; the surviving `lebaladnas-survey-helper` repository is represented once.
- [x] Skills reflect repository-backed C++, C#, .NET, PHP, MySQL, JavaScript, MIPS Assembly, Windows Forms, GDI+, Chart.js, OOP, relational data modeling, role-based access control, CSRF protection, collections, generics, events/delegates, file and binary I/O, bit packing, collision, and state-machine work.
- [x] All five README upgrades are public at the verified commit.
- [x] All 23 commit-pinned README/source/project-file destinations resolve across the seven verified projects.

## Résumé

- [x] Original `Mazen Tamer Latest Resume.pdf` remains unchanged.
- [x] Corrected public artifact is one page and removes the empty survey project and unsupported PHP/MySQL/GDScript/Godot/LibreSprite claims.
- [x] Current city, phone, email, GitHub, LinkedIn, education, GPA, graduation date, and full-name author metadata are retained.
- [x] Structural audit passed: no encryption, forms, attachments, JavaScript, open actions, page actions, or hidden out-of-bounds text; three intended URI link annotations are allowlisted.
- [x] Every page rendered at 180 DPI and was visually inspected for clipping, overlap, glyph defects, hierarchy, margins, and legibility.
- [x] SHA-256 approval record matches `public/Mazen-Eladawy-Resume.pdf` and `npm run verify:resume` passes.

## Application and interaction QA

- [x] Recruiter order is Hero → Projects → About (including a staggered horizontal profile timeline) → Skills → Contact, with no standalone Journey or Engineering path section.
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

- [x] Created public repository `tenkagoken/mazen-tamer-portfolio` without generated starter files.
- [x] Pushed updated candidate commit `ce147b40d0516cb538df7b9d91e834bddee08970` to `main`.
- [x] Selected GitHub Actions as the Pages source with HTTPS enforced on the default domain.
- [x] Manually dispatched `Deploy portfolio to GitHub Pages`; [run #3](https://github.com/tenkagoken/mazen-tamer-portfolio/actions/runs/32894005074) completed successfully (build 1m 0s, deploy 9s).
- [x] Opened the [final HTTPS site](https://tenkagoken.github.io/mazen-tamer-portfolio/) and repeated the live smoke: the hero uses the requested semicolon; standalone Journey and Engineering path copy are absent; the seven-step horizontal profile timeline reveals progressively inside About; Languages spacing remains corrected; all seven repositories render in both Verified work and the archive; the LeBaladna and CPU Scheduler animations, detail dialogs, and four commit-pinned evidence links each pass; and the browser console remains clean.
