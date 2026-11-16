import { chromium } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
await mkdir('test-results/previews', { recursive: true });
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => { if(response.status() >= 400) errors.push(response.url() + ': ' + response.status()); });
  await page.goto('http://127.0.0.1:4173/');
  await page.locator('.hero-portrait img').evaluate(image => image.decode());
  await page.screenshot({ path: 'test-results/previews/portraits-desktop.png' });
  await page.locator('#about').scrollIntoViewIfNeeded();
  for (const image of await page.locator('.about-photos img').all()) await image.evaluate(image => image.decode());
  await page.screenshot({ path: 'test-results/previews/portraits-about.png' });
  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    if (overflow) errors.push('Overflow at ' + width + ': ' + overflow);
    console.log(JSON.stringify({ width, overflow }));
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://127.0.0.1:4173/');
  await page.locator('.hero-portrait img').evaluate(image => image.decode());
  await page.locator('.hero').screenshot({ path: 'test-results/previews/portraits-mobile.png' });
  await page.locator('#about').scrollIntoViewIfNeeded();
  for (const image of await page.locator('.about-photos img').all()) await image.evaluate(image => image.decode());
  await page.locator('.about-photos').screenshot({ path: 'test-results/previews/portraits-about-mobile.png' });
  const alts = await page.locator('.hero-portrait img, .about-photos img').evaluateAll(images => images.map(image => image.alt));
  console.log('Dutch alt text: ' + alts.join(' / '));
  await page.locator('app-language-select > button').click();
  await page.getByRole('menuitemradio', { name: 'English', exact: true }).click();
  await page.waitForFunction(() => document.querySelector('.hero-portrait img').alt === 'Portrait of Robert Walhout');
  console.log('English hero alt: ' + await page.locator('.hero-portrait img').getAttribute('alt'));
  console.log(JSON.stringify({ errors }));
  if (errors.length) process.exitCode = 1;
} finally { await browser.close(); }
