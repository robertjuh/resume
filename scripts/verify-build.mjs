import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, join } from 'node:path';
const root = resolve('dist/resume/browser');
const html = await readFile(join(root, 'index.html'), 'utf8');
assert.match(html, /<base href="\/">/);
assert.match(html, /<link rel="canonical" href="https:\/\/robertwalhout\.nl\/">/);
assert.match(html, /<meta property="og:url" content="https:\/\/robertwalhout\.nl\/">/);
for (const [, path] of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
  if (path === '/' || /^(https?:|mailto:|data:)/.test(path)) continue;
  assert.ok(!path.startsWith('/'), 'Assets must be relative: ' + path);
  assert.ok((await stat(join(root, path))).isFile(), 'Missing asset: ' + path);
}
const forbidden = [/PART C/, /EDITORIAL NOTES/, /6111545/, /33728000/, /Daily AI Coach/, /Leadsparker/, /TODO\(REVIEW\)/, /api\.openai\.com/, /api\.anthropic\.com/, /app-print-resume/, /print-resume/, /robert-walhout-(?:nl|en)\.pdf/, /listed in my resume/, /Specific workplace or project examples are not published here/, /The exact implementation is not described here/, /Screenshots to come/];
async function inspect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    assert.ok(!/\.md$|\.map$|\.env/.test(entry.name), 'Private/source file in output: ' + entry.name);
    assert.ok(!/\.pdf$/i.test(entry.name) && entry.name.toLowerCase() !== 'cv', 'CV/PDF asset in public output: ' + entry.name);
    if (entry.isDirectory()) { await inspect(path); continue; }
    if (/\.(js|html|css|json|txt|svg)$/.test(entry.name)) {
      const body = await readFile(path, 'utf8');
      for (const marker of forbidden) assert.ok(!marker.test(body), 'Private content in ' + entry.name + ': ' + marker);
    }
  }
}
await inspect(root);
console.log('Verified domain-root base, robertwalhout.nl metadata, referenced assets, absence of CV/PDF assets, hidden print CV, source maps/private content and inference endpoints.');

