import { test, expect } from '@playwright/test';

const SAUCE_URL = 'https://www.saucedemo.com';

async function login(page: any, username = 'standard_user', password = 'secret_sauce') {
    await page.goto(SAUCE_URL);
    await page.locator('#user-name').fill(username);
    await page.locator('#password').fill(password);
    await page.locator('#login-button').click();
}

test.describe('Clase 05 - Casos base y retos', () => {
    test('CE valida: login exitoso', async ({ page }) => {
        await login(page);
        await expect(page).toHaveURL(/inventory/);
        await expect(page.locator('.inventory_container')).toBeVisible();
    });

    test('CE invalida: usuario no existe', async ({ page }) => {
        await login(page, 'usuario_invalido', 'secret_sauce');
        const errorMessage = page.locator('[data-test="error"]');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
    });

    test('CE invalida: usuario bloqueado', async ({ page }) => {
        await login(page, 'locked_out_user', 'secret_sauce');
        const errorMessage = page.locator('[data-test="error"]');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    });

    test('Valor en frontera: campos vacios', async ({ page }) => {
        await page.goto(SAUCE_URL);
        await page.locator('#login-button').click();
        const errorMessage = page.locator('[data-test="error"]');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText('Epic sadface: Username is required');
    });

    test('verificar que el inventario tiene exactamente 6 productos', async ({ page }) => {
        await login(page);
        const productos = page.locator('.inventory_item');
        await expect(productos).toHaveCount(6);
    });

    test('verificar el precio con una expresión regular', async ({ page }) => {
        await login(page);
        const textoPrecio = await page.locator('.inventory_item_price').first().textContent();
        expect(textoPrecio?.trim()).toMatch(/^\$\d+\.\d{2}$/);
    });

    test('agregar y quitar producto del carrito', async ({ page }) => {
        await login(page);
        const addBtn = page.locator('.inventory_item button').first();
        await addBtn.click();
        await expect(addBtn).toHaveText('Remove');
        await page.locator('.shopping_cart_link').click();
        await expect(page.locator('.cart_item')).toHaveCount(1);
    });

    test('navegar a detalle del producto', async ({ page }) => {
        await login(page);
        await page.locator('.inventory_item_name').first().click();
        await expect(page.locator('.inventory_details_name')).toBeVisible();
    });

    test('filtrar por nombre (A to Z) cambia el primer producto', async ({ page }) => {
        await login(page);
        const firstNameBefore = await page.locator('.inventory_item_name').first().textContent();
        const select = page.locator('[data-test="product_sort_container"], [data-test="product-sort-container"]');
        await select.selectOption('az');
        await expect(select).toHaveValue('az');
        const firstNameAfter = await page.locator('.inventory_item_name').first().textContent();
        expect(firstNameAfter).toBeTruthy();
    });

    // Reto 1 — toHaveValue(): Ordenar por precio y verificar value y nuevo primer precio
    test('Reto 1 - toHaveValue(): ordenar por precio y verificar value y primer precio', async ({ page }) => {
        await login(page);
        const firstPriceBeforeText = await page.locator('.inventory_item_price').first().textContent();
        const firstPriceBefore = parseFloat((firstPriceBeforeText || '').replace('$', '').trim());

        const select = page.locator('[data-test="product_sort_container"], [data-test="product-sort-container"]');
        await select.selectOption('lohi');
        await expect(select).toHaveValue('lohi');

        const firstPriceAfterText = await page.locator('.inventory_item_price').first().textContent();
        const firstPriceAfter = parseFloat((firstPriceAfterText || '').replace('$', '').trim());

        expect(firstPriceAfter).toBeLessThanOrEqual(firstPriceBefore);
    });

    // Reto 2 — toBeFocused(): hacer clic en el campo de usuario y verificar foco
    test('Reto 2 - toBeFocused(): el campo de usuario recibe el foco', async ({ page }) => {
        await page.goto(SAUCE_URL);
        const userField = page.locator('#user-name');
        await userField.click();
        await expect(userField).toBeFocused();
    });

    // Reto 3 — toHaveCSS(): verificar propiedad CSS computada del botón "Add to cart"
    test('Reto 3 - toHaveCSS(): el botón Add to cart tiene cursor pointer', async ({ page }) => {
        await login(page);
        const addBtn = page.locator('.inventory_item button').first();
        await expect(addBtn).toHaveCSS('cursor', 'pointer');
    });
});
