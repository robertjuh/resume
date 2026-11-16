import { chromium } from '@playwright/test';
import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';

const port = '4174';
const server = spawn(process.execPath, ['scripts/preview.mjs'], {
  env: { ...process.env, PORT: port }, stdio: ['ignore', 'pipe', 'pipe']
});
let browser;
try {
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('CV preview server did not start.')), 10000);
    server.once('error', error => { clearTimeout(timeout); reject(error); });
    server.once('exit', code => { clearTimeout(timeout); reject(new Error('CV preview server exited: ' + code)); });
    server.stdout.on('data', chunk => {
      if (chunk.toString().includes('Static production preview:')) { clearTimeout(timeout); resolve(); }
    });
    server.stderr.on('data', chunk => process.stderr.write(chunk));
  });
  browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:' + port + '/resume/');
  for (const language of ['nl', 'en']) {
    await page.getByRole('combobox').selectOption(language);
    await page.waitForFunction(code => document.documentElement.lang === code, language);
    const bytes = await page.pdf({ format: 'A4', printBackground: false, preferCSSPageSize: true, tagged: true });
    for (const root of ['public/cv', 'dist/resume/browser/cv']) {
      await mkdir(root, { recursive: true });
      await writeFile(root + '/robert-walhout-' + language + '.pdf', bytes);
    }
    console.log('Generated ' + language.toUpperCase() + ' CV (' + bytes.length + ' bytes).');
  }
} finally {
  await browser?.close();
  server.kill();
}
