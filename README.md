# Mazen Eladawy Software Engineering Portfolio

An evidence-backed candidate portfolio built with React, TypeScript, Vite, Framer Motion, and Phosphor Icons. The site presents five featured projects as short technical briefings: contribution, technical decision, verified result, known limitation, and commit-pinned source evidence.

Production target: `https://tenkagoken.github.io/mazen-tamer-portfolio/`

## Candidate content

The canonical data in `src/data/portfolio.ts` contains seven selected public repositories:

- five featured, source-verified projects: Huffman Compression, Monoalphabetic Cipher, Examination Management System, Library Management System, and the C# Windows Forms Platformer;
- two archive projects: LeBaladna Survey Helper and CPU Scheduling Visualizer.

Repository URLs derive from the GitHub username and repository name. Featured evidence URLs derive from a reviewed 40-character commit and a validated repository-relative path. The data validator runs during tests and before every Vite build.

## Run locally

Requirements: Node.js 22 and npm.

```bash
npm ci
npm run dev
```

Vite serves the known repository base at `/mazen-tamer-portfolio/`. For the complete local candidate gate:

```bash
npm run lint
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

`npm run build` verifies the approved résumé SHA-256 before TypeScript or Vite runs. A changed PDF must be structurally and visually re-audited before its verification record is updated.

## Main source locations

- Identity, projects, claims, evidence, skills, the About engineering path, and exclusions: `src/data/portfolio.ts`
- GitHub URL and evidence path resolution: `src/lib/github.ts`
- Known Pages target and canonical URL: `src/config/site.ts`
- Recruiter-facing sections: `src/components/`
- Approved public résumé: `public/Mazen-Eladawy-Resume.pdf`
- Résumé approval record and release checklists: `artifacts/qa/`
- Résumé byte gate: `build/verify-resume.mjs`
- Chromium candidate smoke: `tests/e2e/candidate-smoke.spec.ts`

## Verification

The automated checks cover:

- exact featured/archive membership and permanent excluded-repository guards;
- claim coverage, evidence uniqueness, immutable commits, and safe GitHub paths;
- keyboard project tabs, modal focus trapping, Escape close, and body scroll lock;
- direct contact actions and manual copy recovery when the Clipboard API is unavailable or denied;
- document visibility lifecycle and reduced/offscreen animation composition;
- résumé audit flags and approved-byte hash matching;
- manual-only, commit-pinned GitHub Pages workflow configuration;
- a built-site Chromium smoke with section order, modal, contact, clipboard, résumé, and console checks.

## Deploy to GitHub Pages

Deployment is intentionally manual.

1. Push `main` to `tenkagoken/mazen-tamer-portfolio`.
2. In **Settings → Pages**, select **GitHub Actions** as the source.
3. Open **Actions → Deploy portfolio to GitHub Pages → Run workflow**.
4. The workflow installs dependencies, runs lint, unit/component tests, the résumé-gated build, and the Chromium candidate smoke before uploading only `dist`.
5. The deployment job runs only after the full build job passes.

All third-party Actions are pinned to full commit SHAs. Dependabot checks GitHub Action pins weekly. A failed candidate leaves the previous Pages release unchanged.
