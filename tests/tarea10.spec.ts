import { expect, test } from '@playwright/test';
import { loginAs } from '../helpers/auth';

test.describe('Tarea 10 - Reto: tags, soft assertions y browserName', () => {
  test('Reto 1: tags múltiples + --grep-invert', { tag: ['@smoke', '@regression', '@critical'] }, async ({ page }) => {
    await loginAs(page, 'standard_user');
    await expect(page).toHaveURL(/inventory/);
  });

  test('Reto 2: expect.soft()', async ({ page }) => {
    await loginAs(page, 'standard_user');

    const product = page.locator('.inventory_item').first();
    await expect.soft(product.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');
    await expect.soft(product.locator('.inventory_item_desc')).toContainText(/carry.all/i);
    await expect.soft(product.locator('.inventory_item_price')).toHaveText('$29.99');
    await expect.soft(product.locator('.btn_inventory')).toHaveText('Add to cart');
  });

  test('Reto 3: aserción ajustada según browserName', async ({ page, browserName }) => {
    await loginAs(page, 'standard_user');

    const userAgent = await page.evaluate(() => navigator.userAgent);
    const engineUserAgent = {
      chromium: /Chrome|Chromium/,
      firefox: /Firefox/,
      webkit: /AppleWebKit/,
    }[browserName];

    await expect(userAgent, `El user agent debe corresponder a ${browserName}`).toMatch(engineUserAgent);
    await expect(page.locator('.inventory_list')).toBeVisible();

    const addToCartButton = page.locator('.btn_inventory').first();
    await addToCartButton.click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });
});
