import { test, expect } from '@playwright/test';
import fs from 'fs';

// Crear carpeta para evidencia si no existe
test.beforeAll(() => {
  if (!fs.existsSync('evidencias')) {
    fs.mkdirSync('evidencias', { recursive: true });
  }
});

test.describe('clase 02 - Navegación y esperas en DemoBlaze', () => {
  test('navegar al carrito y regresar al inicio', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/STORE/);

    await page.screenshot({ path: 'evidencias/01-pagina-inicio.png', fullPage: true });

    await page.getByRole('link', { name: 'Cart', exact: true }).click();
    await expect(page).toHaveURL(/cart\.html/);
    await expect(page).toHaveTitle('STORE');

    await page.screenshot({ path: 'evidencias/02-carrito-vacio.png', fullPage: true });

    await page.goBack();
    await expect(page).toHaveTitle(/STORE/);
  });

  test('navegar a la categoria phones y ver un producto', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Phones' }).click();

    await page.waitForSelector('.card-title a');
    const productos = page.locator('.card-title a');
    const count = await productos.count();
    expect(count).toBeGreaterThan(0);

    await productos.first().click();
    await page.waitForLoadState('domcontentloaded');
    await page.screenshot({ path: 'evidencias/03-detalle-producto.png', fullPage: true });

    await expect(page).toHaveURL(/prod\.html/);
  });

  test('capturar el navbar y el footer por separado', async ({ page }) => {
    await page.goto('/');

    const navbar = page.locator('#navbarExample');
    await expect(navbar).toBeVisible();
    await navbar.screenshot({ path: 'evidencias/04-navbar.png' });

    const footer = page.locator('footer');
    if ((await footer.count()) > 0) {
      await footer.screenshot({ path: 'evidencias/05-footer.png' });
    } else {
      const bodyContainer = page.locator('div.container-fluid').last();
      await expect(bodyContainer).toBeVisible();
      await bodyContainer.screenshot({ path: 'evidencias/05-footer.png' });
    }
  });

  test('verificar tiempo de carga de la pagina', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('load');
    const loadTime = Date.now() - startTime;

    console.log(`Tiempo de carga: ${loadTime} ms`);
    expect(loadTime).toBeLessThan(10000);
  });
});