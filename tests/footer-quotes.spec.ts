import { test, expect } from '@playwright/test';
import { footerQuotes } from '../src/app/content/footer-quotes';

const quoteInterval = 7_000;

test.beforeEach(async ({ page }) => {
  const time = new Date('2026-01-01T12:00:00Z');
  await page.clock.install({ time });
  await page.clock.pauseAt(time);
});

test('footer rotates through every quote at five-second intervals without moving the layout', async ({ page }) => {
  await page.goto('./');
  const active = page.locator('.footer-quote.is-active');
  const footer = page.locator('.site-footer');
  const first = await active.innerText();
  expect(footerQuotes).toContain(first);
  await expect(page.locator('.footer-quote[aria-hidden="true"]')).toHaveCount(footerQuotes.length - 1);
  const initialBounds = await footer.boundingBox();

  await page.clock.runFor(quoteInterval - 1);
  await expect(active).toHaveText(first);
  await page.clock.runFor(1);
  await page.clock.runFor(20); // Allow Angular to render on the next animation frame.
  await expect(active).not.toHaveText(first);

  const seen = new Set([first, await active.innerText()]);
  for (let index = 2; index < footerQuotes.length; index++) {
    await page.clock.fastForward(quoteInterval);
    await page.clock.runFor(20);
    await expect(active).toHaveCount(1);
    seen.add(await active.innerText());
    expect(await footer.boundingBox()).toEqual(initialBounds);
  }
  expect(seen.size).toBe(footerQuotes.length);
  await page.clock.fastForward(quoteInterval);
  await page.clock.runFor(20);
  await expect(active).toHaveText(first);
});

for (const motion of ['no-preference', 'reduce'] as const) {
  test(`quotes visibly crossfade with ${motion} motion preference`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: motion });
    await page.goto('./');
    const host = page.locator('app-footer-quotes');
    await host.scrollIntoViewIfNeeded();
    const active = host.locator('.is-active');
    const first = await active.innerText();
    await expect(active).toHaveCSS('opacity', '1');

    await page.clock.runFor(quoteInterval);
    await page.clock.runFor(20);
    await expect(active).not.toHaveText(first);

    // Inspect real CSS transitions at their midpoint rather than just the active class.
    const midpoint = await host.evaluate((element, previousQuote) => {
      const fades = element.getAnimations({ subtree: true })
        .filter((animation): animation is CSSTransition =>
          animation instanceof CSSTransition && animation.transitionProperty === 'opacity');
      for (const fade of fades) {
        fade.pause();
        fade.currentTime = Number(fade.effect!.getTiming().duration) / 2;
      }
      const previous = [...element.querySelectorAll('.footer-quote')]
        .find(quote => quote.textContent === previousQuote)!;
      const next = element.querySelector('.is-active')!;
      const previousStyle = getComputedStyle(previous);
      const nextStyle = getComputedStyle(next);
      const sample = {
        fades: fades.length,
        previousOpacity: Number(previousStyle.opacity),
        nextOpacity: Number(nextStyle.opacity),
        filters: [previousStyle.filter, nextStyle.filter],
        transforms: [previousStyle.transform, nextStyle.transform]
      };
      for (const fade of fades) fade.finish();
      return sample;
    }, first);

    expect(midpoint.fades).toBe(2);
    expect(midpoint.previousOpacity).toBeGreaterThan(0);
    expect(midpoint.previousOpacity).toBeLessThan(1);
    expect(midpoint.nextOpacity).toBeGreaterThan(0);
    expect(midpoint.nextOpacity).toBeLessThan(1);
    expect(midpoint.previousOpacity + midpoint.nextOpacity).toBeCloseTo(1);
    if (motion === 'reduce') {
      expect(midpoint.filters).toEqual(['none', 'none']);
      expect(midpoint.transforms).toEqual(['none', 'none']);
    }
    await expect(active).toHaveCSS('opacity', '1');
    await expect(host.locator('.footer-quote').filter({ hasText: first })).toHaveCSS('opacity', '0');
  });
}

test('refresh always selects a different quote, including after automatic rotation', async ({ page }) => {
  await page.goto('./');
  const active = page.locator('.footer-quote.is-active');
  let previous = await active.innerText();

  for (let refresh = 0; refresh < 4; refresh++) {
    await page.reload();
    await expect(active).not.toHaveText(previous);
    previous = await active.innerText();
  }

  await page.clock.fastForward(quoteInterval);
  await page.clock.runFor(20);
  previous = await active.innerText();
  await page.reload();
  await expect(active).not.toHaveText(previous);
});

test('quotes continue rotating when browser storage is unavailable', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => { throw new Error('Storage disabled'); };
    Storage.prototype.setItem = () => { throw new Error('Storage disabled'); };
  });
  await page.goto('./');
  const active = page.locator('.footer-quote.is-active');
  const first = await active.innerText();
  await page.clock.fastForward(quoteInterval);
  await page.clock.runFor(20);
  await expect(active).not.toHaveText(first);
  expect(errors).toEqual([]);
});

test('reduced-motion quotes keep a gentle fade and retain their wording across languages', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./');
  const active = page.locator('.footer-quote.is-active');
  const first = await active.innerText();
  await expect(page.locator('app-footer-quotes')).toHaveAttribute('lang', 'en');
  await expect(active).toHaveCSS('transition-property', 'opacity');
  await page.getByRole('combobox').selectOption('en');
  await expect(active).toHaveText(first);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});
