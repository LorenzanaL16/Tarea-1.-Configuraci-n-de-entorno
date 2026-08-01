import { test, expect } from '@playwright/test';

test.describe('Clase 03 - Locators en DemoBlaze', () => {

  // TEST 1: Locator por texto
  test('Locator por texto: verificar elementos del menú', async ({ page }) => {
    await page.goto('/');

    const nav = page.locator('#navbarExample');

    await expect(nav.getByText('Home')).toBeVisible();
    await expect(nav.getByText('Contact')).toBeVisible();
    await expect(nav.getByText('About us')).toBeVisible();
    await expect(
      nav.getByText('Cart', { exact: true })
    ).toBeVisible();
  });

  // TEST 2: Locator por CSS
  test('Locator por CSS: productos en la página principal', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.card-title');

    const tarjetas = page.locator('.card');
    const cantidad = await tarjetas.count();

    expect(cantidad).toBeGreaterThan(0);

    const primerProducto = page.locator('.card-title a').first();
    const nombreProducto = await primerProducto.textContent();

    expect(nombreProducto).not.toBeNull();
  });

  // TEST 3: Locator por ID
  test('Locator por ID: campos del modal de login', async ({ page }) => {
    await page.goto('/');

    await page
      .locator('#navbarExample')
      .getByRole('link', { name: 'Log in', exact: true })
      .click();

    await page.waitForSelector('#logInModal', {
      state: 'visible'
    });

    await expect(page.locator('#loginusername')).toBeVisible();
    await expect(page.locator('#loginpassword')).toBeVisible();
  });

  // TEST 4: Locator por atributo
  test('Locator por atributo: imagen del primer producto', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.card-title');

    await page.locator('.card-title a').first().click();
    await page.waitForLoadState('domcontentloaded');

    const imagenProducto = page.locator('.product-image img');

    await expect(imagenProducto).toBeVisible();

    const srcImagen = await imagenProducto.getAttribute('src');

    expect(srcImagen).not.toBeNull();
  });

  // TEST 5: Locators encadenados
  test('Locators encadenados: precio dentro de una tarjeta', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.card-title');

    // Buscar únicamente dentro de la primera tarjeta
    const primeraTarjeta = page.locator('.card').first();
    const precio = primeraTarjeta.locator('h5');

    await expect(precio).toBeVisible();
  });

  // TEST 6: Negación
  test('Verificar que NO existe un elemento (negación)', async ({ page }) => {
    await page.goto('/');

    const mensajeVacio = page.getByText('No products found');

    await expect(mensajeVacio).not.toBeVisible();
  });

  // Clase 03: Agregar al carrito
  test('TAREA 03: agregar un producto al carrito desde detalle', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();

    page.once('dialog', async dialog => {
      expect(dialog.message()).toContain('Product added');
      await dialog.accept();
    });

    await page.getByRole('link', { name: 'Add to cart' }).click();
  });

  test('TAREA 03: verificar el producto agregado en el carrito', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();

    page.once('dialog', async dialog => {
      await dialog.accept();
    });

    await page.getByRole('link', { name: 'Add to cart' }).click();
    await page.getByRole('link', { name: 'Cart', exact: true }).click();

    await expect(page).toHaveURL(/cart\.html/);
    const filaProducto = page.locator('#tbodyid tr', { hasText: 'Samsung galaxy s6' });
    await expect(filaProducto).toBeVisible();
  });

  test('TAREA 03: eliminar producto del carrito', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();

    page.once('dialog', async dialog => {
      await dialog.accept();
    });

    await page.getByRole('link', { name: 'Add to cart' }).click();
    await page.getByRole('link', { name: 'Cart', exact: true }).click();

    await expect(page).toHaveURL(/cart\.html/);
    const filaProducto = page.locator('#tbodyid tr', { hasText: 'Samsung galaxy s6' });
    await expect(filaProducto).toBeVisible();

    await filaProducto.getByRole('link', { name: 'Delete' }).click();
    await expect(page.locator('#tbodyid tr', { hasText: 'Samsung galaxy s6' })).toHaveCount(0);
  });

});