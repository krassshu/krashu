import { test, expect, type Browser } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const targets = [
  { route: '/', width: 1440 },
  { route: '/en/', width: 1440 },
  { route: '/network/', width: 1440 },
  { route: '/documents/', width: 390 },
];

const BLOCKING = new Set(['serious', 'critical']);

async function scan(browser: Browser, route: string, width: number) {
  const context = await browser.newContext({ viewport: { width, height: width >= 1024 ? 900 : 844 } });
  const page = await context.newPage();
  try {
    await page.goto(route, { waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('load');
    // Give the width-gated React Flow canvas a chance to mount before scanning.
    if (width >= 1024 && await page.locator('.diagram-desktop').count() > 0) {
      await page.locator('.react-flow').first().waitFor({ state: 'visible', timeout: 15_000 }).catch(() => {});
    }
    return await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice'])
      .analyze();
  } finally {
    await context.close();
  }
}

for (const { route, width } of targets) {
  test(`a11y: ${route} at ${width}px has no serious or critical violations`, async ({ browser }) => {
    const results = await scan(browser, route, width);

    const blocking = results.violations.filter(v => BLOCKING.has(v.impact ?? ''));
    const other = results.violations.filter(v => !BLOCKING.has(v.impact ?? ''));

    if (other.length > 0) {
      console.log(`\n[a11y] ${route} @ ${width}px — non-blocking findings:`);
      for (const v of other) {
        console.log(`  · (${v.impact ?? 'unknown'}) ${v.id}: ${v.help} — ${v.nodes.length} node(s)`);
        for (const node of v.nodes.slice(0, 3)) console.log(`      ${node.target.join(' ')}`);
      }
    }

    const summary = blocking
      .map(v => `(${v.impact}) ${v.id}: ${v.help}\n    ${v.nodes.slice(0, 3).map(n => n.target.join(' ')).join('\n    ')}`)
      .join('\n  ');

    expect(blocking.length, `serious/critical axe violations on ${route} @ ${width}px:\n  ${summary}`).toBe(0);
  });
}
