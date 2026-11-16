# Robert Walhout — portfolio & resume

Static Angular portfolio for https://www.freerunnl.nl/resume/. Angular 22 standalone components, strict TypeScript, signals, CSS and native dialogs/details. No backend, SSR, accounts, inference services or API keys.

## Run locally

Use Node.js 24.15+ (Node 24 recommended) and npm. From this directory:

```sh
nvm use
npm ci
npm start
```

Open the Local URL printed by Angular (normally http://localhost:4200). Node is a development/build tool only.

## Build and check

```sh
npm run typecheck
npm run build:resume
npm run verify:build
npx playwright install chromium
npm test
```

Production files: **dist/resume/browser/**. Preview the actual subdirectory deployment with `npm run preview` at http://localhost:4173/resume/. The preview returns 404 for unknown paths; no SPA fallback or rewrite rules.

Browser checks cover desktop/mobile navigation, filtering, project walkthroughs, keyboard dismissal/focus restoration, skill relationships, reduced motion, console errors, CV privacy and axe accessibility. Run `node scripts/capture-preview.mjs` with the preview running to capture screenshots locally.

## Content editing

**Primary reference: docs/ROBERT_WALHOUT_RESUME_CONTENT.md.** Use Part A for public copy. Part B needs review. Part C stays private.

| File | Purpose |
| --- | --- |
| src/app/models/content.ts | Typed project, screenshot, skill and experience interfaces |
| src/app/content/profile.ts | Identity, navigation and contact/social links |
| src/app/content/experience.ts | Jobs and earlier IT experience |
| src/app/content/projects.ts | Five projects, technical contributions and the AI campaign game-flow walkthrough |
| src/app/content/core-competencies.ts | Eight bilingual competency cards: six professional strengths, personal PHP/Symfony learning and AI-tool experiments |
| src/app/content/skills.ts | Three experience categories, AI tooling/learning copy and verified role/project links |
| src/app/content/engineering-notes.ts | Owner-written notes; empty until reviewed text is supplied |
| src/app/content/personal.ts | Education, certificates, languages, interests and the visible development philosophy/quote in About |
| src/app/components/ | Timeline, projects, dialog, gallery, skills and icons |
| src/app/app.html | Page sections and responsive navigation |
| src/styles.css | CSS layers, responsive layouts and reduced motion |

The app never imports or fetches the full Markdown source. Only public assets and compiled source enter the build. Do not place source documents or review notes in public/.

Add screenshots to `public/assets/projects/<project-id>/`, then populate a project's screenshots array:

```ts
screenshots: [{
  src: 'assets/projects/bitcoin-index/overview.webp',
  alt: 'Describe what the real screenshot shows.',
  caption: 'A factual caption.'
}]
```

Relative paths resolve under /resume/. Galleries expose previous/next controls only when multiple images exist. Empty galleries show a neutral placeholder. Covers are abstract CSS/SVG illustrations, not product screenshots.

Add projects through the typed projects array; update verified skill relationships separately. Populate technicalDetails only after review; empty technical sections stay hidden. Optional role, challenges, learnings and repositoryUrl fields render only when supplied.

Skills use Professional experience, Personal projects & tooling, and Exploring next. Angular is verified professional experience. Symfony remains personal project/course experience, with an interest in continued learning. React, Laravel, Vue, software design patterns and RAG are learning interests only, without employer or completed-project links. RAG reflects curiosity, without an experience or implementation claim. Economic Data Dashboard belongs to the Learning category, including its card, detail view, skill links and CV. Keep both language versions aligned with these distinctions.

To publish an Engineering Note, add a reviewed id, title, summary and paragraphs to src/app/content/engineering-notes.ts and translate the copy in nl.ts. The entire section stays hidden while the array is empty. Draft topics stay in CONTENT_REVIEW.md, outside public assets.

The site defaults to Dutch. The flag dropdown in the top bar switches all copy, accessible labels and metadata between Dutch and English. The choice is stored locally under portfolio-language; blocked storage does not prevent switching.

CV downloads and the separate print-CV component are removed at the owner's request. The former PDFs are retained only in ignored artifacts/private-cv/, outside public assets and the upload archive. The build audit rejects PDF/CV assets and hidden print-CV markup. Do not restore public CV files without the owner's instruction.

Translations live in src/app/i18n/nl.ts, keyed by the existing English Part A copy. Project/technology names and the supplied qualification wording are preserved. Add a Dutch translation when updating or adding English content; no live translation service is used.

The supplied .htaccess returns 404 for old /resume/cv/ URLs, including files left by an earlier upload. Delete the existing cv/ directory from the hosted resume folder when deploying this update; see DEPLOYMENT.md.

See [DEPLOYMENT.md](DEPLOYMENT.md), [CONTENT_REVIEW.md](CONTENT_REVIEW.md) and [WORK_LOG.md](WORK_LOG.md).

An upload-ready ZIP is available at artifacts/resume-webreus.zip. Extract its contents directly into the existing domain web root's resume folder. It contains only compiled public files.

## Developer photographs

The three owner-supplied photographs appear in the hero, sidebar and About section. Photo paths, responsive variants and alt text are centralized in src/app/content/profile.ts. Dutch alt translations live in src/app/i18n/nl.ts. Lightweight WebP variants are in public/assets/profile/; the originals are kept outside the public output in docs/source-photos/. Regenerate web variants with node scripts/prepare-profile-photos.mjs after replacing the source photos. This uses the existing Playwright Chromium installation, with no new runtime dependency. Cropping is controlled by CSS object-position.
