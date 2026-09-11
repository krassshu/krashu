import { test, expect, type Page, type Locator } from '@playwright/test';

/**
 * Diagram geometry: sibling nodes share one size, nothing inside a node escapes its card,
 * and hover only moves a node (translate) without resizing it.
 */
const ready = async (page: Page, path: string) => {
  await page.goto(path, { waitUntil: 'domcontentloaded' });
  await page.locator('main').waitFor();
};

type Box = { width: number; height: number };
const sizes = async (nodes: Locator): Promise<Box[]> => {
  const count = await nodes.count();
  const out: Box[] = [];
  for (let i = 0; i < count; i++) { const b = await nodes.nth(i).boundingBox(); if (b) out.push({ width: b.width, height: b.height }); }
  return out;
};
const expectSameSize = (boxes: Box[], label: string) => {
  expect(boxes.length, `${label}: no nodes found`).toBeGreaterThan(1);
  for (const b of boxes) {
    expect(Math.abs(b.width - boxes[0].width), `${label}: widths differ`).toBeLessThanOrEqual(1);
    expect(Math.abs(b.height - boxes[0].height), `${label}: heights differ`).toBeLessThanOrEqual(1);
  }
};
/** Every descendant with a box must sit inside the card (1px tolerance). Popover portals are excluded by construction. */
const expectContained = async (card: Locator, label: string) => {
  const overflowing = await card.evaluate((el) => {
    const r = el.getBoundingClientRect();
    const bad: string[] = [];
    el.querySelectorAll('*').forEach((child) => {
      if (child.classList.contains('fhandle') || child.classList.contains('visually-hidden')) return;
      const c = child.getBoundingClientRect();
      if (c.width === 0 && c.height === 0) return;
      if (c.left < r.left - 1 || c.right > r.right + 1 || c.top < r.top - 1 || c.bottom > r.bottom + 1) bad.push(`${child.tagName}.${child.className}`.slice(0, 60));
      if (child.children.length === 0 && (child as HTMLElement).scrollWidth > (child as HTMLElement).clientWidth + 1 && getComputedStyle(child).overflowX !== 'hidden') bad.push(`text overflow: ${child.textContent?.slice(0, 30)}`);
    });
    return bad;
  });
  expect(overflowing, `${label}: content escapes the card`).toEqual([]);
};

test.describe('diagram node geometry', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test('hero modules share one geometry and keep content inside', async ({ page }) => {
    await ready(page, '/');
    const modules = page.locator('.hero-module');
    await expect(modules).toHaveCount(4);
    for (const name of ['Dokumenty', 'Obiekty', 'Sieć', 'Automatyka']) await expect(page.locator('.hero-module', { hasText: name })).toHaveCount(1);
    expectSameSize(await sizes(modules), 'hero modules');
    for (const name of ['Dokumenty', 'Obiekty', 'Sieć', 'Automatyka']) {
      const el = page.locator('.hero-module', { hasText: name });
      const before = await el.boundingBox();
      await el.hover(); await page.waitForTimeout(300);
      const after = await el.boundingBox();
      expect(after?.width, `${name} width changed on hover`).toBeCloseTo(before!.width, 1);
      expect(after?.height, `${name} height changed on hover`).toBeCloseTo(before!.height, 1);
      await page.mouse.move(0, 0);
    }
    for (let i = 0; i < await modules.count(); i++) await expectContained(modules.nth(i), `hero module ${i}`);
    const before = await modules.first().boundingBox();
    await modules.first().hover(); await page.waitForTimeout(300);
    const after = await modules.first().boundingBox();
    expect(after!.width).toBeCloseTo(before!.width, 0);
    expect(after!.height).toBeCloseTo(before!.height, 0);
  });

  for (const path of ['/architecture/', '/network/', '/en/architecture/']) {
    test(`${path} React Flow nodes: equal siblings, contained content, stable on hover`, async ({ page }) => {
      await ready(page, path);
      await page.locator('.react-flow').first().waitFor({ state: 'visible' });
      await page.waitForTimeout(600);
      const nodes = page.locator('.fnode:not(.fnode-endpoint):not(.fnode-core)');
      const count = await nodes.count();
      expect(count).toBeGreaterThan(3);
      // widths may differ by role (switch/router are wider); heights must be identical within a tier
      for (const tier of ['service', 'leaf']) {
        const boxes = await sizes(page.locator(`.fnode[data-tier="${tier}"]`));
        for (const b of boxes) expect(Math.abs(b.height - boxes[0].height), `${tier} node heights differ`).toBeLessThanOrEqual(1);
      }
      for (let i = 0; i < count; i++) await expectContained(nodes.nth(i), `${path} node ${i}`);
      const first = nodes.first();
      const before = await first.boundingBox();
      await first.hover({ force: true }); await page.waitForTimeout(300);
      const after = await first.boundingBox();
      expect(after!.width).toBeCloseTo(before!.width, 0);
      expect(after!.height).toBeCloseTo(before!.height, 0);
    });
  }

  test('Object Engine nodes and roadmap stages keep content inside', async ({ page }) => {
    await ready(page, '/');
    const relation = page.locator('.relation .tab-panel:not([hidden]) .relation-node');
    for (let i = 0; i < await relation.count(); i++) await expectContained(relation.nth(i), `relation node ${i}`);
    const stages = page.locator('.timeline-track .stage');
    expectSameSize(await sizes(stages), 'roadmap stages');
    for (let i = 0; i < await stages.count(); i++) await expectContained(stages.nth(i), `stage ${i}`);
  });
});

test.describe('diagram nodes on narrow screens', () => {
  for (const [width, height] of [[390, 844], [430, 932], [768, 1024]] as const) {
    test(`hero modules at ${width}px form a grid of equal, contained cards`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      await ready(page, '/');
      const modules = page.locator('.hero-module');
      const boxes = await sizes(modules);
      expectSameSize(boxes, `hero modules @${width}`);
      expect(boxes[0].width).toBeGreaterThan(120);
      for (let i = 0; i < boxes.length; i++) await expectContained(modules.nth(i), `hero module ${i} @${width}`);
      // Object Engine nodes and roadmap stages must also keep their content inside on narrow screens
      const relation = page.locator('.relation .tab-panel:not([hidden]) .relation-node');
      for (let i = 0; i < await relation.count(); i++) await expectContained(relation.nth(i), `relation node ${i} @${width}`);
      const stages = page.locator('.timeline-track .stage');
      expectSameSize(await sizes(stages), `roadmap stages @${width}`);
      for (let i = 0; i < await stages.count(); i++) await expectContained(stages.nth(i), `stage ${i} @${width}`);
      // nothing scrolls sideways
      const sw = await page.evaluate(() => [document.documentElement.scrollWidth, window.innerWidth]);
      expect(sw[0]).toBeLessThanOrEqual(sw[1]);
    });
  }

  test('React Flow nodes at 1024×768 stay contained and equal per tier', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    for (const path of ['/architecture/', '/network/']) {
      await ready(page, path);
      await page.locator('.react-flow').first().waitFor({ state: 'visible' });
      await page.waitForTimeout(600);
      for (const tier of ['service', 'leaf']) {
        const boxes = await sizes(page.locator(`.fnode[data-tier="${tier}"]`));
        for (const b of boxes) expect(Math.abs(b.height - boxes[0].height), `${path} ${tier} heights differ @1024`).toBeLessThanOrEqual(1);
      }
      const nodes = page.locator('.fnode');
      for (let i = 0; i < await nodes.count(); i++) await expectContained(nodes.nth(i), `${path} node ${i} @1024`);
    }
  });
});
