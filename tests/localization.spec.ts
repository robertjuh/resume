import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFile } from 'node:fs/promises';

test('Dutch is the default throughout navigation, experience, projects and skills', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('html')).toHaveAttribute('lang', 'nl');
  await expect(page.getByRole('combobox', { name: 'Taal', exact: true })).toHaveValue('nl');
  await expect(page.getByRole('heading', { name: 'Mijn werkervaring.' })).toBeVisible();
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
  await page.getByRole('combobox').selectOption('en');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.getByRole('heading', { name: "Where I've been." })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Download CV', exact: true }).first()).toHaveAttribute('download', 'Robert-Walhout-CV-EN.pdf');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.getByRole('combobox', { name: 'Language', exact: true })).toHaveValue('en');
  await page.getByRole('combobox').selectOption('nl');
  await expect(page.getByRole('heading', { name: 'Mijn werkervaring.' })).toBeVisible();
  await expect(page.locator('#about')).toContainText('Talen');
  await expect(page.locator('#contact')).toContainText('hybride of op afstand');
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test('each language downloads a real PDF CV from the deployment subpath', async ({ page }) => {
  await page.goto('./');
  for (const [language, code] of [['nl', 'NL'], ['en', 'EN']] as const) {
    await page.getByRole('combobox').selectOption(language);
    await page.emulateMedia({ media: 'print' });
    await expect(page.locator('.print-resume')).toContainText(code === 'NL' ? 'Profiel' : 'Profile');
    await expect(page.locator('.print-resume')).toContainText(code === 'NL' ? 'Goes, Zeeland, Nederland' : 'Goes, Zeeland, Netherlands');
    await page.emulateMedia({ media: 'screen' });
    const button = page.locator('.topbar').getByRole('link', { name: /Download cv/i });
    const [download] = await Promise.all([page.waitForEvent('download'), button.click()]);
    expect(download.suggestedFilename()).toBe('Robert-Walhout-CV-' + code + '.pdf');
    const path = await download.path();
    expect(path).toBeTruthy();
    const bytes = await readFile(path!);
    expect(bytes.subarray(0, 5).toString()).toBe('%PDF-');
    expect(bytes.length).toBeGreaterThan(10000);
  }
});

test('language switching works when browser storage is unavailable', async ({ page }) => {
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => { throw new Error('Storage disabled'); };
    Storage.prototype.setItem = () => { throw new Error('Storage disabled'); };
  });
  await page.goto('./');
  await expect(page.locator('html')).toHaveAttribute('lang', 'nl');
  await page.getByRole('combobox').selectOption('en');
  await expect(page.getByRole('heading', { name: 'Tools I work with.' })).toBeVisible();
});
