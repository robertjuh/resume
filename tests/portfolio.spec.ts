import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('portfolio-language', 'en'));
});

test('portfolio loads at the domain root without errors or private content', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('./');
  await expect(page.getByRole('heading', { name: 'Robert Walhout.', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'robertwalhout@gmail.com' })).toHaveAttribute('href', 'mailto:robertwalhout@gmail.com');
  await expect(page.locator('body')).not.toContainText(/PART C|TODO|6111545|Daily AI Coach|Leadsparker|33728000/);
  await expect(page.locator('base')).toHaveAttribute('href', '/');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://robertwalhout.nl/');
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', 'https://robertwalhout.nl/');
  expect(errors).toEqual([]);
});

test('project filtering and case study walkthrough work with keyboard dismissal', async ({ page }) => {
  await page.goto('./#projects');
  await page.getByRole('button', { name: 'Professional', exact: true }).click();
  await expect(page.locator('.project-card')).toHaveCount(2);
  await expect(page.locator('.project-card')).toContainText(['Colijn IT - Furniture ERP', 'Fresh-IQ / WDD - Business Applications']);
  await page.getByRole('button', { name: 'All projects', exact: true }).click();
  await expect(page.locator('.project-card')).toHaveCount(5);
  await page.getByRole('button', { name: 'Explore AI Campaign App' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByRole('button', { name: 'Player actions', exact: true }).click();
  await expect(page.locator('.walkthrough-content')).toContainText('free-text');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(page.getByRole('button', { name: 'Explore AI Campaign App' })).toBeFocused();
});

test('timeline and technology relationships reveal verified context', async ({ page }) => {
  await page.goto('./#experience');
  await page.getByText('View role details', { exact: true }).first().click();
  await expect(page.locator('#experience')).toContainText('Google Cloud');
  await page.getByRole('button', { name: 'Symfony', exact: true }).click();
  await expect(page.locator('.skill-context')).toContainText('three SymfonyCasts courses');
  await expect(page.locator('.skill-context')).toContainText('Economic Data Dashboard');
  await expect(page.locator('.skill-context')).not.toContainText('WDD');
});

test('navigation and responsive layout remain usable without a hidden print CV', async ({ page, isMobile }) => {
  await page.goto('./');
  if (isMobile) {
    await page.getByRole('button', { name: 'Open navigation' }).click();
    await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Projects' }).click();
    await expect(page.getByRole('button', { name: 'Open navigation' })).toHaveAttribute('aria-expanded', 'false');
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.emulateMedia({ media: 'print' });
  await expect(page.locator('app-print-resume, .print-resume')).toHaveCount(0);
  await expect(page.locator('.site-shell')).toBeVisible();
});

test('page and project dialog pass automated accessibility checks', async ({ page }) => {
  await page.goto('./');
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
  await page.getByRole('button', { name: 'Explore AI Campaign App' }).click();
  expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
});

test('hash navigation survives refresh and reduced motion disables animation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./#skills');
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Tools I work with.' })).toBeVisible();
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
});


test('AI tools, framework interests and actual experience stay distinct in both languages', async ({ page }) => {
  await page.goto('./#skills');
  await expect(page.getByRole('heading', { name: 'Frameworks & software design', exact: true })).toBeVisible();
  await expect(page.locator('#skills')).toContainText('professional experience with Angular');
  await expect(page.locator('#skills')).not.toContainText(/semantic search|semantisch zoeken|embeddings|vector databases|Context & retrieval/i);
  await page.getByRole('button', { name: 'Claude Code', exact: true }).click();
  await expect(page.locator('.skill-context')).toContainText('I have used and experimented with Claude Code');
  await expect(page.locator('.skill-context')).toContainText('Personal projects & tooling');

  const exploringGroup = page.locator('.skill-group').filter({ has: page.getByRole('heading', { name: 'Exploring next', exact: true }) });
  for (const name of ['React', 'Laravel', 'Vue', 'Software design patterns', 'RAG']) {
    await exploringGroup.getByRole('button', { name, exact: true }).click();
    await expect(page.locator('.skill-context')).toContainText('Interested in learning');
    await expect(page.locator('.skill-context .exploring-label')).toHaveText('Exploring');
    await expect(page.locator('.skill-context .context-link')).toHaveCount(0);
  }

  await page.getByRole('button', { name: 'Symfony', exact: true }).click();
  await expect(page.locator('.skill-context')).toContainText('three SymfonyCasts courses');
  await expect(page.locator('.skill-context')).toContainText('interested in learning more about Symfony');
  await expect(page.locator('.skill-context')).toContainText('Personal projects & tooling');
  await expect(page.locator('.skill-context .exploring-label')).toHaveCount(0);

  await page.getByRole('button', { name: 'Angular', exact: true }).click();
  await expect(page.locator('.skill-context')).toContainText('Professional experience');
  await expect(page.locator('.skill-context')).toContainText('WDD');
  await expect(page.locator('.skill-context')).toContainText('Colijn');

  await page.locator('app-language-select > button').click();
  await page.getByRole('menuitemradio', { name: 'Nederlands', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Frameworks & softwareontwerp', exact: true })).toBeVisible();
  await expect(page.locator('#skills')).toContainText('professionele ervaring met Angular');
  const dutchExploring = page.locator('.skill-group').filter({ has: page.getByRole('heading', { name: 'Verder verkennen', exact: true }) });
  for (const name of ['React', 'Laravel', 'Vue', 'Ontwerppatronen', 'RAG']) {
    await dutchExploring.getByRole('button', { name, exact: true }).click();
    await expect(page.locator('.skill-context')).toContainText('Ik wil');
    await expect(page.locator('.skill-context .exploring-label')).toHaveText('Aan het verkennen');
    await expect(page.locator('.skill-context .context-link')).toHaveCount(0);
  }
  await expect(page.locator('#skills')).not.toContainText(/semantic search|semantisch zoeken|embeddings|vectordatabases|Context & informatie ophalen/i);
});

test('personal filter includes all personal projects and dashboard technical details', async ({ page }) => {
  await page.goto('./#projects');
  await page.getByRole('button', { name: 'Personal', exact: true }).click();
  await expect(page.locator('.filters button')).toHaveText(['All projects', 'Personal', 'Professional']);
  await expect(page.locator('.project-card')).toHaveCount(3);
  await expect(page.locator('.project-card')).toContainText(['AI Campaign App', 'Bitcoin Index', 'Economic Data Dashboard']);
  const dashboard = page.locator('.project-card').filter({ has: page.getByRole('heading', { name: 'Economic Data Dashboard', exact: true }) });
  await expect(dashboard.locator('.project-kicker')).toContainText('Personal project');
  await expect(dashboard.locator('.project-label')).toHaveText('Independent project');
  await page.getByRole('button', { name: 'Explore Economic Data Dashboard', exact: true }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.getByRole('heading', { name: 'My role', exact: true })).toBeVisible();
  await expect(dialog.getByRole('heading', { name: 'Technical focus', exact: true })).toBeVisible();
  await expect(dialog).toContainText('Interactive news filtering with Stimulus.');
  await expect(dialog).toContainText('Monthly and yearly inflation change calculations.');
  await expect(dialog).toContainText('Market data persistence with Doctrine ORM.');
  await expect(dialog.getByRole('heading', { name: 'Challenges', exact: true })).toHaveCount(0);
  await expect(dialog.getByRole('heading', { name: 'What I learned', exact: true })).toHaveCount(0);
  await expect(dialog.getByRole('link', { name: 'View repository', exact: true })).toHaveCount(0);
  await expect(dialog).not.toContainText(/BigQuery|React|Next.js/);
  await expect(dialog).toContainText('personal learning project');
  await page.keyboard.press('Escape');
  await page.locator('app-language-select > button').click();
  await page.getByRole('menuitemradio', { name: 'Nederlands', exact: true }).click();
  await expect(page.locator('.filters button')).toHaveText(['Alle projecten', 'Persoonlijk', 'Professioneel']);
  await expect(page.getByRole('button', { name: 'Persoonlijk', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.project-card')).toHaveCount(3);
  await expect(dashboard.locator('.project-kicker')).toContainText('Eigen project');
  await expect(dashboard.locator('.project-label')).toHaveText('Zelfstandig project');
  await expect(dashboard).toContainText('PHP/Symfony-leerproject');
});
