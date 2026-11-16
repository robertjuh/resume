import { chromium } from '@playwright/test';
const browser = await chromium.launch();
const page = await browser.newPage();
const issues = [];
page.on('pageerror', error => issues.push(error.message));
page.on('response', response => { if (response.status() >= 400) issues.push(response.url() + ': ' + response.status()); });
for (const width of [320, 360, 768, 1024, 1440]) {
  await page.setViewportSize({ width, height: 1000 });
  await page.goto('http://127.0.0.1:4173/');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  console.log(JSON.stringify({ width, overflow }));
  if (overflow > 0) issues.push('Overflow at ' + width);
}
await page.screenshot({ path: 'test-results/previews/desktop-hero.png' });
await page.setViewportSize({ width: 390, height: 844 });
await page.goto('http://127.0.0.1:4173/');
await page.screenshot({ path: 'test-results/previews/mobile-hero.png' });
await browser.close();
console.log(JSON.stringify({ issues }));
if (issues.length) process.exitCode = 1;

