import { test, expect, type Page } from '@playwright/test';

/**
 * Client-side navigation must land every new route at the top. `page.goto()` cannot catch a
 * regression here, so these tests click real links in the running app.
 */
const HEADER = 80; // sticky header height, matches scroll-padding-top

const ready = async (page: Page, path: string) => {
  await page.goto(path, { waitUntil: 'domcontentloaded' });
  await page.locator('main').waitFor();
  await page.waitForTimeout(300);
};

const settle = async (page: Page, url: RegExp) => {
  await page.waitForURL(url);
  // long enough for any stray scroll animation to have finished and been noticed
  await page.waitForTimeout(1200);
};

type Hop = { from: string; link: string; to: RegExp };
const hops: Hop[] = [
  { from: '/', link: 'Dokumenty', to: /\/documents\/$/ },
  { from: '/documents/', link: 'Roadmapa', to: /\/roadmap\/$/ },
  { from: '/roadmap/', link: 'Architektura', to: /\/architecture\/$/ },
  { from: '/architecture/', link: 'Sieć', to: /\/network\/$/ },
  { from: '/network/', link: 'Dokumenty', to: /\/documents\/$/ },
  { from: '/documents/', link: 'Projekt', to: /\/$/ },
];
const hopsEn: Hop[] = [
  { from: '/en/', link: 'Documents', to: /\/en\/documents\/$/ },
  { from: '/en/documents/', link: 'Roadmap', to: /\/en\/roadmap\/$/ },
  { from: '/en/roadmap/', link: 'Network', to: /\/en\/network\/$/ },
];

test.describe('client-side navigation resets the scroll position', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  for (const startAt of [0, 200, 600]) {
    for (const { from, link, to } of [...hops, ...hopsEn]) {
      test(`${from} @${startAt}px → ${link}`, async ({ page }) => {
        await ready(page, from);
        await page.evaluate(y => window.scrollTo(0, y), startAt);
        await page.waitForTimeout(300);

        await page.locator('.desktop-nav a', { hasText: new RegExp(`^${link}$`) }).click();
        await settle(page, to);

        const scrollY = await page.evaluate(() => window.scrollY);
        expect(scrollY, `${from} → ${link} did not land at the top`).toBeLessThanOrEqual(1);

        // scrollY alone is not enough: the heading must actually be readable under the header
        const h1 = await page.locator('h1').boundingBox();
        expect(h1, 'no h1 on the new route').not.toBeNull();
        expect(h1!.y, 'h1 is hidden behind the sticky header').toBeGreaterThanOrEqual(HEADER);
      });
    }
  }
});

test.describe('anchor navigation', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test('"Zobacz model obiektów" opens the Object Engine section below the sticky header', async ({ page }) => {
    await ready(page, '/documents/');
    await page.getByRole('link', { name: /Zobacz model obiektów/ }).click();
    await settle(page, /\/architecture\/#object-engine$/);

    const heading = page.locator('#object-engine');
    await expect(heading).toBeVisible();
    const box = await heading.boundingBox();
    expect(box!.y, 'section heading sits under the sticky header').toBeGreaterThanOrEqual(HEADER - 2);
    expect(box!.y, 'section heading is pushed too far down').toBeLessThanOrEqual(HEADER + 40);
  });

  test('the skip link jumps straight to the content', async ({ page }) => {
    await ready(page, '/architecture/');
    await page.keyboard.press('Tab');
    const skip = page.locator('.skip-link');
    await expect(skip).toBeFocused();
    await skip.press('Enter');
    await page.waitForTimeout(400);
    await expect(page).toHaveURL(/#main$/);
    const main = await page.locator('#main').boundingBox();
    expect(main!.y, 'main content is hidden behind the header').toBeGreaterThanOrEqual(0);
  });
});

test.describe('history', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test('back and forward keep the browser to its own scroll restoration', async ({ page }) => {
    await ready(page, '/');
    await page.evaluate(() => window.scrollTo(0, 900));
    await page.waitForTimeout(300);
    const before = await page.evaluate(() => window.scrollY);
    expect(before).toBeGreaterThan(100);

    await page.locator('.desktop-nav a', { hasText: /^Dokumenty$/ }).click();
    await settle(page, /\/documents\/$/);
    expect(await page.evaluate(() => window.scrollY)).toBeLessThanOrEqual(1);

    await page.goBack();
    await page.waitForURL(/\/$/);
    await page.waitForTimeout(1200);
    const restored = await page.evaluate(() => window.scrollY);
    expect(restored, 'back should restore roughly where the page was left').toBeGreaterThan(100);

    await page.goForward();
    await page.waitForURL(/\/documents\/$/);
    await page.waitForTimeout(1200);
    const forward = await page.evaluate(() => window.scrollY);
    expect(forward, 'forward should return to the top of the document page').toBeLessThanOrEqual(1);
  });
});
