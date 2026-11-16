import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { resolve, join } from 'node:path';
const root = resolve('dist/resume/browser');
const html = await readFile(join(root, 'index.html'), 'utf8');
assert.match(html, /<base href="\/resume\/">/);
for (const [, path] of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
  if (path === '/resume/' || /^(https?:|mailto:|data:)/.test(path)) continue;
  assert.ok(!path.startsWith('/'), 'Assets must be relative: ' + path);
  assert.ok((await stat(join(root, path))).isFile(), 'Missing asset: ' + path);
}
const forbidden = [/PART C/, /EDITORIAL NOTES/, /6111545/, /33728000/, /Daily AI Coach/, /Leadsparker/, /TODO\(REVIEW\)/, /api\.openai\.com/, /api\.anthropic\.com/];
async function inspect(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    assert.ok(!/\.md$|\.map$|\.env/.test(entry.name), 'Private/source file in output: ' + entry.name);
    if (entry.isDirectory()) { await inspect(path); continue; }
    if (/\.(js|html|css|json|txt|svg)$/.test(entry.name)) {
      const body = await readFile(path, 'utf8');
      for (const marker of forbidden) assert.ok(!marker.test(body), 'Private content in ' + entry.name + ': ' + marker);
    }
  }
}
await inspect(root);
console.log('Verified /resume/ base, referenced assets, absence of source maps/private content and inference endpoints.');

