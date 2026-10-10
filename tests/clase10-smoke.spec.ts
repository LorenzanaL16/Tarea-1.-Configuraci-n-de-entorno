import { test, expect } from '@playwright/test';
import { loginAs } from '../helpers/auth';

// { tag: '@smoke' } habilita: npx playwright test --grep "@smoke"
test.describe('Clase 10 - Smoke Tests - Sauce Demo', () => {
  test('La página de login carga', { tag: '@smoke' }, async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await expect(page).toHaveTitle(/Swag Labs/);
    await expect(page.locator('#login-button')).toBeVisible();
  });

  test('Login con usuario estándar funciona', { tag: '@smoke' }, async ({ page }) => {
    await loginAs(page, 'standard_user');
    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  test('El inventario muestra productos', { tag: '@smoke' }, async ({ page }) => {
    await loginAs(page, 'standard_user');
    const items = page.locator('.inventory_item');
    await expect(items).toHaveCount(6);
  });

  test('El carrito es accesible', { tag: '@smoke' }, async ({ page }) => {
    await loginAs(page, 'standard_user');
    await page.locator('.shopping_cart_link').click();
    await expect(page).toHaveURL(/cart/);
  });

  test('El checkout inicia correctamente', { tag: '@smoke' }, async ({ page }) => {
    await loginAs(page, 'standard_user');
    await page.locator('.btn_inventory').first().click();
    await page.locator('.shopping_cart_link').click();
    await page.locator('[data-test="checkout"]').click();
    await expect(page).toHaveURL(/checkout-step-one/);
  });
});