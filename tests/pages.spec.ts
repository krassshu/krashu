import { test, expect, type Page } from '@playwright/test';

const routes = [
  '/',
  '/architecture/',
  '/network/',
  '/documents/',
  '/roadmap/',
  '/en/',
  '/en/architecture/',
  '/en/network/',
  '/en/documents/',
  '/en/roadmap/',
];

const widths = [390, 430, 768, 1024, 1440];

/** Collect console errors and uncaught page errors for the lifetime of a page. */
function watchErrors(page: Page) {
  const errors: string[] = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(`console: ${msg.text()}`); });
  page.on('pageerror', err => { errors.push(`pageerror: ${err.message}`); });
  return errors;
}

for (const width of widths) {
  test.describe(`viewport ${width}px`, () => {
    test.use({ viewport: { width, height: 900 } });

    for (const route of routes) {
      test(`${route} renders cleanly`, async ({ page }) => {
        const errors = watchErrors(page);

        const response = await page.goto(route, { waitUntil: 'domcontentloaded' });
        expect(response, `no response for ${route}`).not.toBeNull();
        expect(response!.status(), `HTTP status for ${route}`).toBe(200);

        // Let hydration and any width-gated client widgets settle.
        await page.waitForLoadState('load');
        await page.locator('h1').first().waitFor({ state: 'attached' });

        // Exactly one h1 per page.
        await expect(page.locator('h1')).toHaveCount(1);

        // No horizontal overflow at this width.
        const overflow = await page.evaluate(() => {
          const el = document.documentElement;
          return { scrollWidth: el.scrollWidth, clientWidth: el.clientWidth };
        });
        expect(
          overflow.scrollWidth,
          `horizontal overflow on ${route} at ${width}px: scrollWidth ${overflow.scrollWidth} > clientWidth ${overflow.clientWidth}`,
        ).toBeLessThanOrEqual(overflow.clientWidth);

        expect(errors, `console/page errors on ${route} at ${width}px`).toEqual([]);
      });
    }
  });
}

test.describe('trailing slash redirects', () => {
  test('/en redirects to /en/ with 308', async ({ request }) => {
    const response = await request.get('/en', { maxRedirects: 0 });
    expect(response.status()).toBe(308);
    const location = response.headers()['location'];
    expect(location).toBeTruthy();
    expect(new URL(location, 'http://localhost:3113').pathname).toBe('/en/');
  });

  test('/en followed lands on /en/', async ({ page }) => {
    await page.goto('/en', { waitUntil: 'domcontentloaded' });
    expect(new URL(page.url()).pathname).toBe('/en/');
  });
});
