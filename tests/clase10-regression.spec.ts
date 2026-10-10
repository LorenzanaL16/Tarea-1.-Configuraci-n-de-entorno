import { test, expect } from '@playwright/test';
import { loginAs } from '../helpers/auth';

test.describe('Clase 10 - Regression Tests - Sauce Demo', () => {
  test('Login con credenciales inválidas muestra error', { tag: ['@regression', '@auth'] }, async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
    await page.locator('#user-name').fill('invalid_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    await expect(page.locator('[data-test="error"]')).toContainText(/Username and password do not match/i);
  });

  test('Agregar producto al carrito y continuar al checkout', { tag: '@regression' }, async ({ page }) => {
    await loginAs(page, 'standard_user');
    await page.locator('.btn_inventory').first().click();
    await page.locator('.shopping_cart_link').click();

    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
    await page.locator('[data-test="checkout"]').click();
    await expect(page).toHaveURL(/checkout-step-one/);
  });
});
