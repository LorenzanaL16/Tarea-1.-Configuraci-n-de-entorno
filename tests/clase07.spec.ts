import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const SAUCE_URL = 'https://www.saucedemo.com';
const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';

test.describe('Clase 07 - Evidencias avanzadas', () => {
  test('Reto 1 - test.step()', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Navegar a Saucedemo', async () => {
      await loginPage.goto();
      await expect(page).toHaveURL(SAUCE_URL);
    });

    await test.step('Login con credenciales válidas', async () => {
      await loginPage.login(USERNAME, PASSWORD);
      await expect(page).toHaveURL(/inventory/);
    });

    await test.step('Verificar inventario cargado', async () => {
      await expect(page.locator('.inventory_container')).toBeVisible();
      await expect(page.locator('.inventory_item')).toHaveCount(6);
      await page.screenshot({ path: './evidencias/clase07/t01-inventario.png', fullPage: true });
    });
  });

  test('Reto 2 - testInfo.attach()', async ({ page }, testInfo) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(USERNAME, PASSWORD);

    const productCount = await page.locator('.inventory_item').count();
    const payload = [
      `URL: ${page.url()}`,
      `Fecha: ${new Date().toISOString()}`,
      `Cantidad de productos: ${productCount}`,
      `Usuario: ${USERNAME}`,
    ].join('\n');

    await testInfo.attach('datos-evidencia', {
      body: payload,
      contentType: 'text/plain',
    });

    await expect(page.locator('.inventory_container')).toBeVisible();
    await page.screenshot({ path: './evidencias/clase07/t02-datos-login.png', fullPage: true });
  });

  test('Reto 3 - toHaveScreenshot()', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(USERNAME, PASSWORD);

    await expect(page.locator('.inventory_container')).toBeVisible();
    await expect(page.locator('.inventory_list')).toHaveScreenshot('inventory-list.png');
  });
});