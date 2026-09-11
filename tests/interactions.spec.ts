import { test, expect, type Page } from '@playwright/test';

async function ready(page: Page, route: string) {
  await page.goto(route, { waitUntil: 'domcontentloaded' });
  await page.waitForLoadState('load');
}

const relationHeight = (page: Page) =>
  page.locator('.relation').first().evaluate(el => el.getBoundingClientRect().height);

test.describe('desktop interactions', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test('/network/ switches between physical and logical topology', async ({ page }) => {
    await ready(page, '/network/');

    const logicalTab = page.getByRole('tab', { name: 'Logiczna', exact: true });
    const physicalTab = page.getByRole('tab', { name: 'Fizyczna', exact: true });
    await expect(physicalTab).toBeVisible();

    const logicalFigure = page.locator('figure').filter({ hasText: 'SEGMENTACJA LOGICZNA' });
    const physicalFigure = page.locator('figure').filter({ hasText: 'TOPOLOGIA FIZYCZNA' });

    await logicalTab.click();
    await expect(logicalFigure).toBeVisible();

    await physicalTab.click();
    await expect(physicalFigure).toBeVisible();
  });

  test('/ Object Engine switches chains without changing block height', async ({ page }) => {
    await ready(page, '/');

    const relation = page.locator('.relation').first();
    await expect(relation).toBeVisible();

    const personTab = relation.getByRole('tab', { name: 'Osoba', exact: true });
    await expect(personTab).toBeVisible();

    // Let the first chain finish its entry animation before measuring.
    await page.waitForTimeout(400);
    const before = await relationHeight(page);

    await personTab.click();
    // Every chain stays mounted; the previous panel keeps [hidden] off until its exit transition ends,
    // so first wait until exactly one panel is active, then read that one.
    const active = relation.locator('.tab-panel:not([hidden])');
    await expect(active).toHaveCount(1);
    await expect(active.locator('.relation-chain')).toContainText('Mieszkanie');
    // Wait out the 200ms swap transition plus a margin.
    await page.waitForTimeout(500);
    const after = await relationHeight(page);

    expect(
      Math.abs(after - before),
      `.relation height changed when switching tabs: ${before} -> ${after}`,
    ).toBeLessThanOrEqual(1);
  });

  test('language switch moves /network/ to /en/network/', async ({ page }) => {
    await ready(page, '/network/');

    await page.locator('.language-switch a[hreflang="en"]').click();
    await page.waitForURL('**/en/network/');
    expect(new URL(page.url()).pathname).toBe('/en/network/');
    await expect(page.locator('h1')).toHaveText('Home network');
  });

  test('theme toggle sets the documentElement theme', async ({ page }) => {
    await ready(page, '/');

    await page.getByRole('button', { name: 'Ciemny', exact: true }).click();
    await expect
      .poll(() => page.evaluate(() => document.documentElement.dataset.theme))
      .toBe('dark');

    await page.getByRole('button', { name: 'Jasny', exact: true }).click();
    await expect
      .poll(() => page.evaluate(() => document.documentElement.dataset.theme))
      .toBe('light');
  });
});

test.describe('mobile interactions', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('mobile menu navigates and closes', async ({ page }) => {
    await ready(page, '/');

    const nav = page.locator('.mobile-nav');
    await nav.locator('summary').click();
    await expect(nav).toHaveAttribute('open', /.*/);

    await nav.getByRole('link', { name: 'Sieć', exact: true }).click();
    await page.waitForURL('**/network/');
    expect(new URL(page.url()).pathname).toBe('/network/');

    await expect(page.locator('.mobile-nav')).not.toHaveAttribute('open', /.*/);
  });
});
