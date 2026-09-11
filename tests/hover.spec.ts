import { test, expect, type Locator, type Page } from '@playwright/test';

const routes = ['/', '/architecture/', '/network/', '/documents/', '/roadmap/'];

const selectors = ['.card', '.status-card', '.hero-module', '.stage', '.fnode', '.relation-node', '.button'];

const TOLERANCE = 0.5;
const MAX_PER_SELECTOR = 5;

type Box = { width: number; height: number; parentHeight: number };

async function measure(locator: Locator): Promise<Box> {
  return locator.evaluate(el => {
    const rect = el.getBoundingClientRect();
    const parent = el.parentElement?.getBoundingClientRect();
    return { width: rect.width, height: rect.height, parentHeight: parent ? parent.height : 0 };
  });
}

/**
 * The React Flow canvas mounts only at >= 1024px and only after hydration,
 * so `.fnode` does not exist until the canvas is up.
 */
async function settleDiagrams(page: Page) {
  const flow = page.locator('.react-flow').first();
  if (await page.locator('.diagram-desktop').count() === 0) return;
  await flow.waitFor({ state: 'visible', timeout: 15_000 }).catch(() => {});
  await page.locator('.fnode').first().waitFor({ state: 'visible', timeout: 10_000 }).catch(() => {});
}

test.describe('hover does not resize elements', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  for (const route of routes) {
    test(`${route} keeps layout stable on hover`, async ({ page }) => {
      await page.goto(route, { waitUntil: 'domcontentloaded' });
      await page.waitForLoadState('load');
      await settleDiagrams(page);

      const checked: string[] = [];

      for (const selector of selectors) {
        const all = page.locator(selector);
        const total = await all.count();
        if (total === 0) continue;

        const limit = Math.min(total, MAX_PER_SELECTOR);
        let measured = 0;

        for (let i = 0; i < limit; i++) {
          const el = all.nth(i);
          if (!(await el.isVisible().catch(() => false))) continue;

          const before = await measure(el);
          // Skip collapsed elements: a 0x0 box carries no useful signal.
          if (before.width === 0 && before.height === 0) continue;

          await el.hover({ force: true });
          await page.waitForTimeout(350);
          const after = await measure(el);

          expect(
            Math.abs(after.width - before.width),
            `${route} ${selector}[${i}] width changed on hover: ${before.width} -> ${after.width}`,
          ).toBeLessThanOrEqual(TOLERANCE);

          expect(
            Math.abs(after.height - before.height),
            `${route} ${selector}[${i}] height changed on hover: ${before.height} -> ${after.height}`,
          ).toBeLessThanOrEqual(TOLERANCE);

          expect(
            Math.abs(after.parentHeight - before.parentHeight),
            `${route} ${selector}[${i}] parent height changed on hover: ${before.parentHeight} -> ${after.parentHeight}`,
          ).toBeLessThanOrEqual(TOLERANCE);

          measured++;
        }

        if (measured > 0) checked.push(`${selector} x${measured}`);
      }

      // Not an assertion about the page, just a record of what the run actually covered.
      test.info().annotations.push({ type: 'hovered', description: checked.join(', ') || 'nothing visible' });
    });
  }
});
