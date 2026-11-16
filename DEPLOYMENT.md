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
4. Upload the **contents** of dist/resume/browser/ directly into resume/, preserving subdirectories. Include the hidden .htaccess file, index.html, matching hashed JS/CSS, favicon.svg and any real screenshot assets. Enable hidden files in your FTP client/file manager if necessary.
5. Upload index.html after its assets to reduce partial-update errors.
6. Keep the supplied .htaccess inside resume/. It sets UTF-8 for this app so the host's Windows-1252 default cannot corrupt link previews, and returns 404 for retired /resume/cv/ URLs. Leave sibling applications and root hosting settings unchanged. No DNS or rewrite changes are needed.
7. Remove the old **resume/cv/** directory and its PDF files from the host. Uploading a new archive does not remove old files. Keep any desired private backup outside the hosting web root.

```text
<actual domain web root>/
  <existing applications, unchanged>
  resume/
    .htaccess
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
- Check the HTML response's Content-Type contains charset=UTF-8, and confirm the shared link title displays its em dash correctly.
- Follow section links and refresh /resume/#projects.
- Check both language flags, persisted language choice, project filters, dialogs, keyboard Escape, campaign walkthrough and skills.
- Check narrow-screen navigation.
- Verify email, GitHub, LinkedIn and Bitcoin Index links.
- Confirm /resume/cv/robert-walhout-nl.pdf and /resume/cv/robert-walhout-en.pdf both return 404, with no CV download link or hidden print-CV content on the page.
- Check that sibling applications still work.
- Review public text and supply CONTENT_REVIEW.md items.

## Troubleshooting

**Blank/unstyled page:** Inspect browser Network and Console. Upload all files from one build. A new index.html with old/missing hashed assets fails. Confirm the base tag is /resume/.

**Assets load at the domain root:** Rebuild with npm run build:resume. Use relative paths such as assets/projects/example.webp, not /assets/example.webp.

**Extra directory level:** Upload the browser folder's contents directly into resume/. The URL should not include /browser/ or /resume/resume/.

**Refresh 404:** Use section fragments (/resume/#projects), not route paths (/resume/projects). No Angular Router or server rewrites are used.

**Old version:** Hard-refresh and check the HTML's asset hashes. Remove stale files only after confirming they belong to this application.

**Garbled characters in a shared link title (such as â€”):** The HTML is UTF-8, but the host was observed sending Content-Type: text/html; charset=windows-1252. That HTTP charset overrides the HTML's meta charset. Upload the supplied .htaccess into resume/, including when uploading the raw build; it is copied from public/.htaccess automatically. Verify the response header now uses UTF-8. If it still uses Windows-1252, ask the host to enable these per-directory charset settings. Existing link previews may remain cached until the sharing service refreshes them. See Apache's [AddDefaultCharset](https://httpd.apache.org/docs/2.4/mod/core.html#adddefaultcharset) and [AddCharset](https://httpd.apache.org/docs/2.4/mod/mod_mime.html#addcharset) documentation.

**External project unavailable:** Bitcoin Index is a separate app. Its availability does not affect this portfolio; its features and stack could not be inspected during this build.

## Prepared upload archive

artifacts/resume-webreus.zip contains the verified static build with index.html at the archive root. Extract its contents inside the domain's resume directory, not at the domain root. Recreate the archive from dist/resume/browser/ after any future rebuild.

## Retired CV downloads

The owner removed CV downloads and the separate print-CV view for privacy. No PDF files or cv/ directory belong in the build or upload archive. The original PDFs are retained privately in ignored artifacts/private-cv/, which must never be uploaded. The supplied .htaccess blocks legacy /resume/cv/ URLs even if an old PDF was left on the server. Delete the old hosted cv/ directory as part of this deployment and verify both former download URLs return 404. The live host remains unchanged until these files are uploaded and the old files removed.
