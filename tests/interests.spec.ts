import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.beforeEach(async ({ page }) => {
  await page.route(/https:\/\/(?:www\.youtube-nocookie\.com|w\.soundcloud\.com)\//, route =>
    route.fulfill({ contentType: 'text/html', body: '<!doctype html><html lang="en"><title>Media preview</title><body><main><h1>Media preview</h1></main></body></html>' }));
});

test('only one interest opens at a time with mouse, keyboard and language switching', async ({ page }) => {
  await page.goto('./#about');
  const about = page.locator('#about');
  const music = about.getByRole('button', { name: 'Muziekproductie', exact: true });
  const psychology = about.getByRole('button', { name: 'Psychologie & filosofie', exact: true });
  await expect(about.locator('.interest-trigger')).toHaveCount(5);
  await expect(about.locator('.interest-trigger[aria-expanded="true"]')).toHaveCount(0);

  await psychology.click();
  await expect(psychology).toHaveAttribute('aria-expanded', 'true');
  await expect(about.getByRole('region', { name: 'Psychologie & filosofie', exact: true })).toContainText('hoe mensen denken');
  await music.click();
  await expect(music).toHaveAttribute('aria-expanded', 'true');
  await expect(psychology).toHaveAttribute('aria-expanded', 'false');
  await expect(about.locator('.interest-trigger[aria-expanded="true"]')).toHaveCount(1);

  await page.locator('app-language-select > button').click();
  await page.getByRole('menuitemradio', { name: 'English', exact: true }).click();
  const englishMusic = about.getByRole('button', { name: 'Music production', exact: true });
  await expect(englishMusic).toHaveAttribute('aria-expanded', 'true');
  await expect(about.getByRole('region', { name: 'Music production', exact: true })).toContainText('electronic music');
  await englishMusic.focus();
  await page.keyboard.press('Space');
  await expect(englishMusic).toHaveAttribute('aria-expanded', 'false');
  await expect(about.locator('.interest-trigger[aria-expanded="true"]')).toHaveCount(0);
  await page.keyboard.press('Enter');
  await expect(englishMusic).toHaveAttribute('aria-expanded', 'true');
  // Check the accordion itself rather than the mocked third-party player documents.
  await about.getByRole('button', { name: 'Psychology & philosophy', exact: true }).click();
  expect((await new AxeBuilder({ page }).include('#about').analyze()).violations).toEqual([]);
});

for (const motion of ['no-preference', 'reduce'] as const) {
  test(`interest opening and closing visibly animate for 750ms with ${motion} motion preference`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: motion });
    await page.goto('./#about');
    const trigger = page.getByRole('button', { name: 'Psychologie & filosofie', exact: true });
    const panelId = await trigger.getAttribute('aria-controls');
    const panel = page.locator('#' + panelId);
    expect(await panel.evaluate(element => element.getBoundingClientRect().height)).toBe(0);

    const sampleTransition = () => panel.evaluate(element => {
      const transition = element.getAnimations().find((animation): animation is CSSTransition =>
        animation instanceof CSSTransition && animation.transitionProperty === 'grid-template-rows');
      if (!transition) return null;
      transition.pause();
      const duration = Number(transition.effect!.getTiming().duration);
      transition.currentTime = 0;
      const start = element.getBoundingClientRect().height;
      transition.currentTime = duration / 2;
      const midpoint = element.getBoundingClientRect().height;
      transition.finish();
      const end = element.getBoundingClientRect().height;
      return { duration, start, midpoint, end };
    });

    await trigger.click();
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    const opening = await sampleTransition();
    expect(opening).not.toBeNull();
    expect(opening!.duration).toBe(750);
    expect(opening!.midpoint).toBeGreaterThan(opening!.start);
    expect(opening!.midpoint).toBeLessThan(opening!.end);
    await expect(panel).not.toHaveAttribute('inert', '');

    await trigger.click();
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await expect(panel).toHaveAttribute('inert', '');
    const closing = await sampleTransition();
    expect(closing).not.toBeNull();
    expect(closing!.duration).toBe(750);
    expect(closing!.midpoint).toBeLessThan(closing!.start);
    expect(closing!.midpoint).toBeGreaterThan(closing!.end);
    expect(closing!.end).toBe(0);
  });
}

test('collapsed interests do not load media or expose focusable content', async ({ page }) => {
  await page.goto('./#about');
  const about = page.locator('#about');
  const music = about.getByRole('button', { name: 'Muziekproductie', exact: true });
  const panel = about.locator('.interest-panel').first();
  await expect(about.locator('iframe[src]')).toHaveCount(0);
  await music.click();
  await expect(panel.locator('iframe[src]')).toHaveCount(3);
  await music.click();
  await expect(panel).toHaveAttribute('aria-hidden', 'true');
  await expect(panel).toHaveAttribute('inert', '');
  await expect(panel.locator('iframe[src]')).toHaveCount(0);
  await expect(about.locator('.interest-trigger[aria-expanded="true"]')).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

for (const motion of ['no-preference', 'reduce'] as const) {
  test(`opening a lower interest follows its heading while a taller panel collapses with ${motion} motion preference`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: motion });
    await page.goto('./#about');
    const music = page.getByRole('button', { name: 'Muziekproductie', exact: true });
    const next = page.getByRole('button', { name: 'Online gaming', exact: true });
    await music.click();
    await expect(music).toHaveAttribute('aria-expanded', 'true');
    await page.locator('.interest-panel').first().evaluate(element => {
      for (const animation of element.getAnimations()) animation.finish();
    });

    // Reproduce reading a long panel, then clicking the next heading below it.
    await next.evaluate(element => window.scrollTo({
      top: window.scrollY + element.getBoundingClientRect().top - window.innerHeight * 0.45,
      behavior: 'instant'
    }));
    const before = await page.evaluate(() => ({
      scrollY,
      historyLength: history.length,
      offset: parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0
    }));
    await next.click();
    await expect(next).toHaveAttribute('aria-expanded', 'true');
    await expect(music).toHaveAttribute('aria-expanded', 'false');
    const samples = await next.evaluate(element => new Promise<{ top: number; scrollY: number }[]>(resolve => {
      const samples: { top: number; scrollY: number }[] = [];
      const start = performance.now();
      const sample = () => {
        samples.push({ top: element.getBoundingClientRect().top, scrollY: window.scrollY });
        if (performance.now() - start < 1_000) requestAnimationFrame(sample);
        else resolve(samples);
      };
      requestAnimationFrame(sample);
    }));
    expect(Math.min(...samples.map(sample => sample.top))).toBeGreaterThanOrEqual(before.offset - 2);
    expect(Math.abs(samples.at(-1)!.top - before.offset)).toBeLessThanOrEqual(2);
    expect(samples.at(-1)!.scrollY).toBeLessThan(before.scrollY);
    expect(await page.evaluate(() => history.length)).toBe(before.historyLength);
  });
}
