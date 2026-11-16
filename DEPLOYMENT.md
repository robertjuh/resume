# Deploy to WebReus

Expected live URL: **https://www.freerunnl.nl/resume/**.

Static client-side Angular application. No Node.js runtime, SSR, Docker, backend, database, API keys or rewrite rules are needed in production.

## Installation and build

Use Node 24.15+ (Node 24 recommended; .nvmrc selects it):

```sh
npm ci
npm run typecheck
npm run build:resume
npm run verify:build
```

The production command is `ng build --configuration production --base-href /resume/`.

**Verified upload directory: dist/resume/browser/**.

## FTP / file manager upload

1. Find the existing domain web root for www.freerunnl.nl in the WebReus account's FTP/control-panel configuration. Its directory name is account-specific; do not assume public_html.
2. If a resume directory already exists, back up that application's files first.
3. Create/open **resume** inside the existing domain web root.
4. Upload the **contents** of dist/resume/browser/ directly into resume/, preserving subdirectories. Include index.html, matching hashed JS/CSS, favicon.svg and any real screenshot assets.
5. Upload index.html after its assets to reduce partial-update errors.
6. Leave sibling applications and root hosting settings unchanged. No .htaccess, DNS or rewrite changes are needed.

```text
<actual domain web root>/
  <existing applications, unchanged>
  resume/
    index.html
    main-<hash>.js
    styles-<hash>.css
    favicon.svg
    <optional screenshot assets>
```

Do not upload source, docs, CONTENT_REVIEW.md, node_modules or the full content reference.

No FTP credentials were supplied; this build has not been uploaded to WebReus.

## Preview locally

```sh
npm run preview
```

Open http://localhost:4173/resume/. The preview serves the compiled app under the real deployment subpath and has no rewrite fallback.

For browser verification: `npx playwright install chromium`, then `npm test`. Linux systems may need Playwright browser system libraries if a missing-library error is reported.

## After-upload checklist

- Open https://www.freerunnl.nl/resume/ in a fresh tab.
- Confirm JS/CSS/favicon/screenshots load beneath /resume/ without 404s.
- Follow section links and refresh /resume/#projects.
- Check both language flags, persisted language choice, project filters, dialogs, keyboard Escape, campaign walkthrough and skills.
- Check narrow-screen navigation.
- Verify email, GitHub, LinkedIn and Bitcoin Index links.
- Download CV in each language and inspect the two PDF files.
- Check that sibling applications still work.
- Review public text and supply CONTENT_REVIEW.md items.

## Troubleshooting

**Blank/unstyled page:** Inspect browser Network and Console. Upload all files from one build. A new index.html with old/missing hashed assets fails. Confirm the base tag is /resume/.

**Assets load at the domain root:** Rebuild with npm run build:resume. Use relative paths such as assets/projects/example.webp, not /assets/example.webp.

**Extra directory level:** Upload the browser folder's contents directly into resume/. The URL should not include /browser/ or /resume/resume/.

**Refresh 404:** Use section fragments (/resume/#projects), not route paths (/resume/projects). No Angular Router or server rewrites are used.

**Old version:** Hard-refresh and check the HTML's asset hashes. Remove stale files only after confirming they belong to this application.

**External project unavailable:** Bitcoin Index is a separate app. Its availability does not affect this portfolio; its features and stack could not be inspected during this build.

## Prepared upload archive

artifacts/resume-webreus.zip contains the verified static build with index.html at the archive root. Extract its contents inside the domain's resume directory, not at the domain root. Recreate the archive from dist/resume/browser/ after any future rebuild.

## CV downloads

Include the cv/ directory and both PDF files when uploading. The download follows the selected language. After edits to resume copy or its print layout, run npx playwright install chromium and npm run generate:cv, then upload the refreshed browser output. PDFs are generated locally; production remains static.
