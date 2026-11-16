import { chromium } from '@playwright/test';
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('http://127.0.0.1:4173/');
const content = await page.locator('body').innerText();
console.log(content);
for (const width of [320, 360, 768, 1024, 1440]) {
  await page.setViewportSize({ width, height: 1000 });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  console.log(JSON.stringify({ width, overflow }));
  if (overflow > 0) process.exitCode = 1;
}
await page.screenshot({ path: 'test-results/previews/dutch-desktop.png' });
await page.setViewportSize({ width: 390, height: 844 });
await page.screenshot({ path: 'test-results/previews/dutch-mobile.png' });
await browser.close();
