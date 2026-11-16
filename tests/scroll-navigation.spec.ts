import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('portfolio-language', 'en'));
});

test('scrolling keeps the URL and navigation aligned without growing history', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./?source=scroll-test#home');
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
  const initialHistoryLength = await page.evaluate(() => history.length);
  const ids = ['home', 'competencies', 'experience', 'projects', 'skills', 'about', 'contact'];
  for (const id of [...ids, ...ids.slice(0, -1).reverse()]) {
    await page.locator('#' + id).evaluate(element => element.scrollIntoView({ behavior: 'instant', block: 'start' }));
    await expect.poll(() => page.evaluate(() => location.hash)).toBe('#' + id);
    await expect(page.locator('nav a[href="#' + id + '"]')).toHaveAttribute('aria-current', 'location');
  }
  expect(await page.evaluate(() => history.length)).toBe(initialHistoryLength);
  expect(await page.evaluate(() => location.search)).toBe('?source=scroll-test');
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
});

test('direct anchors survive refresh and clicked links preserve Back and Forward', async ({ page, isMobile }) => {
  const waitForSection = async (id: string): Promise<void> => {
    await expect.poll(() => page.locator('#' + id).evaluate(element => {
      const padding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      const margin = parseFloat(getComputedStyle(element).scrollMarginTop) || 0;
      return Math.abs(element.getBoundingClientRect().top - padding - margin);
    })).toBeLessThan(2);
  };
  await page.goto('./#skills');
  await waitForSection('skills');
  await expect(page.locator('nav a[href="#skills"]')).toHaveAttribute('aria-current', 'location');
  await expect.poll(() => page.evaluate(() => location.hash)).toBe('#skills');
  await page.reload();
  await waitForSection('skills');
  await expect(page.locator('nav a[href="#skills"]')).toHaveAttribute('aria-current', 'location');
  await expect.poll(() => page.evaluate(() => location.hash)).toBe('#skills');
  if (isMobile) await page.getByRole('button', { name: 'Open navigation', exact: true }).click();
  await page.getByRole('navigation').getByRole('link', { name: 'Projects', exact: true }).click();
  await expect(page.locator('nav a[href="#projects"]')).toHaveAttribute('aria-current', 'location');
  await expect.poll(() => page.evaluate(() => location.hash)).toBe('#projects');
  await waitForSection('projects');
  await page.goBack();
  await waitForSection('skills');
  await expect.poll(() => page.evaluate(() => location.hash)).toBe('#skills');
  await expect(page.locator('nav a[href="#skills"]')).toHaveAttribute('aria-current', 'location');
  await page.goForward();
  await waitForSection('projects');
  await expect.poll(() => page.evaluate(() => location.hash)).toBe('#projects');
  await expect(page.locator('nav a[href="#projects"]')).toHaveAttribute('aria-current', 'location');
});

test('scrolling inside project details leaves the page URL on Projects', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./#projects');
  await page.getByRole('button', { name: 'Explore Economic Data Dashboard', exact: true }).click();
  const dialog = page.locator('.project-dialog');
  await expect(dialog).toBeVisible();
  await dialog.evaluate(element => { element.scrollTop = element.scrollHeight; });
  await expect.poll(() => page.evaluate(() => location.hash)).toBe('#projects');
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect.poll(() => page.evaluate(() => location.hash)).toBe('#projects');
});
