import { Browser, BrowserContext, Page, expect, test } from '@playwright/test';
import { loginAs, STANDARD_USER } from '../helpers/auth';

test.describe('Clase 08 - hooks y suites avanzados', () => {
  test.describe.configure({ mode: 'serial' });

  let browser: Browser;
  let context: BrowserContext;
  let page: Page;

  test.beforeAll(async ({ browser: browserFixture }) => {
    browser = browserFixture;
    context = await browser.newContext();
    page = await context.newPage();
    await loginAs(page);
    await expect(page).toHaveURL(/inventory/);
  });

  test.afterAll(async () => {
    await context.close();
  });

  test('Reto 1 - reutilizar una página en una suite serial', async () => {
    await expect(page.locator('.inventory_container')).toBeVisible();
    await expect(page.locator('.inventory_item')).toHaveCount(6);
  });

  test('Reto 2 - usuario con lentitud artificial', async () => {
    test.slow();

    await loginAs(page, 'performance_glitch_user');
    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('.inventory_container')).toBeVisible({ timeout: 30000 });

    await loginAs(page, STANDARD_USER);
  });

  test('Reto 3 - skip dinámico según una condición del entorno', async () => {
    const skipDynamicTest = process.env.SKIP_DYNAMIC_TEST === 'true';
    test.skip(skipDynamicTest, 'SKIP_DYNAMIC_TEST=true: prueba omitida por configuración del entorno');

    await expect(page.locator('.inventory_item')).toHaveCount(6);
  });
});