import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { MenuPage } from '../pages/MenuPage';

const SAUCE_URL = 'https://www.saucedemo.com';

test.describe('Clase 06 - Extender POM a nuevas áreas', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;
    let checkoutPage: CheckoutPage;
    let menuPage: MenuPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);
        menuPage = new MenuPage(page);

        // Login before each test
        await loginPage.goto();
        await loginPage.login();
        await expect(page).toHaveURL(/inventory/);
    });

    // Base tests (5)
    test('Base 1: Verificar que el inventario se carga correctamente', async ({ page }) => {
        await expect(inventoryPage.inventoryContainer).toBeVisible();
        const count = await inventoryPage.getProductCount();
        expect(count).toBe(6);
    });

    test('Base 2: Agregar producto al carrito', async ({ page }) => {
        await inventoryPage.addProductByName('Sauce Labs Backpack');
        const badge = await inventoryPage.getCartBadgeCount();
        expect(badge).toBe('1');
    });

    test('Base 3: Ir al carrito y verificar producto', async ({ page }) => {
        await inventoryPage.addProductByName('Sauce Labs Bolt T-Shirt');
        await inventoryPage.goToCart();
        await expect(page).toHaveURL(/cart/);
        const itemCount = await cartPage.getCartItemCount();
        expect(itemCount).toBe(1);
    });

    test('Base 4: Agregar múltiples productos al carrito', async ({ page }) => {
        await inventoryPage.addProductByName('Sauce Labs Backpack');
        await inventoryPage.addProductByName('Sauce Labs Bolt T-Shirt');
        const badge = await inventoryPage.getCartBadgeCount();
        expect(badge).toBe('2');
    });

    test('Base 5: Ordenar productos por precio (bajo a alto)', async ({ page }) => {
        const priceBefore = await inventoryPage.getFirstProductPrice();
        await inventoryPage.sortBy('lohi');
        const priceAfter = await inventoryPage.getFirstProductPrice();
        // Verify that dropdown has the correct value
        await expect(inventoryPage.sortDropdown).toHaveValue('lohi');
    });

    // Reto tests (3)
    test('Reto 1: Completar compra de principio a fin con CheckoutPage', async ({ page }) => {
        // Add product to cart
        await inventoryPage.addProductByName('Sauce Labs Backpack');
        await inventoryPage.goToCart();
        await expect(page).toHaveURL(/cart/);

        // Checkout
        await cartPage.checkout();
        await expect(page).toHaveURL(/checkout-step-one/);

        // Fill checkout form
        await checkoutPage.fillCheckoutForm('Juan', 'Pérez', '28001');
        await checkoutPage.continueCheckout();
        await expect(page).toHaveURL(/checkout-step-two/);

        // Finish purchase
        await checkoutPage.finishOrder();
        await expect(page).toHaveURL(/checkout-complete/);

        // Verify order completion
        const isComplete = await checkoutPage.isOrderComplete();
        expect(isComplete).toBe(true);
    });

    test('Reto 2: Probar flujo de logout con MenuPage', async ({ page }) => {
        // Verify we are on inventory page
        await expect(page).toHaveURL(/inventory/);

        // Open menu and logout
        await menuPage.logout();

        // Verify we are logged out (redirected to login page)
        await expect(page).toHaveURL(SAUCE_URL);
        await expect(loginPage.usernameInput).toBeVisible();
    });

    test('Reto 3: Quitar producto y verificar que badge desaparece', async ({ page }) => {
        // Add two products
        await inventoryPage.addProductByName('Sauce Labs Backpack');
        await inventoryPage.addProductByName('Sauce Labs Bolt T-Shirt');
        let badge = await inventoryPage.getCartBadgeCount();
        expect(badge).toBe('2');

        // Remove first product
        await inventoryPage.removeProductByName('Sauce Labs Backpack');
        badge = await inventoryPage.getCartBadgeCount();
        expect(badge).toBe('1');

        // Remove second product
        await inventoryPage.removeProductByName('Sauce Labs Bolt T-Shirt');

        // Verify badge is gone (cart is empty)
        const isBadgeVisible = await inventoryPage.isCartBadgeVisible();
        expect(isBadgeVisible).toBe(false);
    });
});
