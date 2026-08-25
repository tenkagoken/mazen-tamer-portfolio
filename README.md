# Mazen Eladawy — Portfolio

A responsive, interaction-led software engineering portfolio built with React, TypeScript, Vite, Tailwind CSS, Framer Motion, and Phosphor Icons.

## Run locally

Requirements: Node.js 22 or a current Node.js LTS release supported by Vite.

```bash
npm install
npm run dev
```

Open the URL printed by Vite. For a production check:

```bash
npm run lint
npm run build
npm run preview
```

## Where to edit

- Personal information, email, education, languages, and social links: `src/data/portfolio.ts`
- Projects and their repository links: `src/data/portfolio.ts`
- Skill categories and project relationships: `src/data/portfolio.ts`
- Main accent colors and design tokens: the `:root` block in `src/index.css`
- Page title, metadata, Open Graph copy, and favicon references: `index.html`
- Hero copy and terminal scenes: `src/components/Hero.tsx`
- Contact form behavior: `src/components/Contact.tsx`

The verified LinkedIn URL and current education details are centralized in `profile`.

## Project structure

```text
src/
  components/
    About.tsx
    Contact.tsx
    Hero.tsx
    Journey.tsx
    Navbar.tsx
    ProjectModal.tsx
    Projects.tsx
    ProjectVisual.tsx
    SectionHeading.tsx
    SiteChrome.tsx
    Skills.tsx
  data/
    portfolio.ts
  App.tsx
  index.css
  main.tsx
public/
  favicon.svg
  og-placeholder.svg
```

## Deploy to Vercel

The simplest route is to push this folder to GitHub, import the repository in Vercel, and accept the detected Vite settings. The build command is `npm run build` and the output directory is `dist`.

CLI alternative:

```bash
npm i -g vercel
vercel
vercel --prod
```

Official references: [Vite deployment guide](https://vite.dev/guide/static-deploy) and [Vercel's Vite guide](https://vercel.com/docs/frameworks/frontend/vite).

## Deploy to GitHub Pages

A workflow is included at `.github/workflows/deploy.yml`.

1. Push the project to a GitHub repository with `main` as the production branch.
2. In the repository, open **Settings → Pages**.
3. Set **Build and deployment → Source** to **GitHub Actions**.
4. Push to `main` or run the workflow manually from the Actions tab.

The project uses relative asset paths, so it works at both a user site and a repository subpath without hardcoding the repository name.

Official reference: [Vite's GitHub Pages instructions](https://vite.dev/guide/static-deploy#github-pages).

## Content integrity

Portfolio copy combines verified CV facts with source-reviewed metadata from seven selected public repositories owned by `tenkagoken`. Repository descriptions, languages, file structures, and implementation details were checked before being summarized. Essential project content is static and does not depend on the GitHub API.

The project showcase intentionally includes every public repository while omitting projects explicitly excluded from the portfolio brief. The site does not expose a phone number; its LinkedIn URL comes from the supplied résumé.
