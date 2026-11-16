import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('Dutch is the default throughout navigation, experience, projects and skills', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('html')).toHaveAttribute('lang', 'nl');
  await expect(page.getByRole('button', { name: 'Taal: Nederlands', exact: true })).toHaveAttribute('aria-expanded', 'false');
  await expect(page.getByRole('heading', { name: 'Mijn werkervaring:' })).toBeVisible();
  await expect(page.locator('#experience')).toContainText('voorraadprognoses');
  await page.getByRole('button', { name: 'Bekijk AI Campaign App', exact: true }).click();
  await page.getByRole('button', { name: 'Spelersacties', exact: true }).click();
  await expect(page.locator('.walkthrough-content')).toContainText('vrije tekst');
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: 'Symfony', exact: true }).click();
  await expect(page.locator('.skill-context')).toContainText('drie SymfonyCasts-cursussen');
  await expect(page.getByText('Print CV', { exact: true })).toHaveCount(0);
  await expect(page.locator('.site-shell')).not.toContainText('{{');
});

test('language dropdown switches all content and preserves the chosen language after refresh', async ({ page }) => {
  await page.goto('./');
  await page.locator('app-language-select > button').click();
  await page.getByRole('menuitemradio', { name: 'English', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.getByRole('heading', { name: "Where I've been:" })).toBeVisible();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.getByRole('button', { name: 'Language: English', exact: true })).toBeVisible();
  await page.locator('app-language-select > button').click();
  await page.getByRole('menuitemradio', { name: 'Nederlands', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Mijn werkervaring:' })).toBeVisible();
  await expect(page.locator('#about')).toContainText('Talen');
  await expect(page.locator('#contact')).toContainText('Op zoek naar een full-stack ontwikkelrol met TypeScript, Node.js of PHP.');
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test('CV downloads and hidden print-CV content are unavailable in both languages', async ({ page }) => {
  await page.goto('./');
  for (const language of ['nl', 'en'] as const) {
    await page.locator('app-language-select > button').click();
    await page.getByRole('menuitemradio', { name: language === 'nl' ? 'Nederlands' : 'English', exact: true }).click();
    await expect(page.locator('app-print-resume, .print-resume, a[href$=".pdf"]')).toHaveCount(0);
    const response = await page.request.get('cv/robert-walhout-' + language + '.pdf');
    expect(response.status()).toBe(404);
  }
});

test('language switching works when browser storage is unavailable', async ({ page }) => {
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => { throw new Error('Storage disabled'); };
    Storage.prototype.setItem = () => { throw new Error('Storage disabled'); };
  });
  await page.goto('./');
  await expect(page.locator('html')).toHaveAttribute('lang', 'nl');
  await page.locator('app-language-select > button').click();
  await page.getByRole('menuitemradio', { name: 'English', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Tools I work with.' })).toBeVisible();
});
