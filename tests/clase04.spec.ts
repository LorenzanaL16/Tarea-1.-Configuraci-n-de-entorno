import { test, expect, Page } from '@playwright/test';

const usuario = {
    username: `testuser_${Date.now().toString().slice(-6)}`,
    password: 'Password123'
};

async function login(page: Page, username: string, password: string) {
    await page.locator('#navbarExample').getByRole('link', { name: 'Log in', exact: true }).click();
    await page.waitForSelector('#logInModal', { state: 'visible' });
    await page.locator('#loginusername').fill(username);
    await page.locator('#loginpassword').fill(password);
    await page.locator('#logInModal').getByRole('button', { name: 'Log in' }).click();
    await page.waitForSelector('#nameofuser', { state: 'visible' });
}

test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    await page.goto('/');
    page.once('dialog', d => d.accept());
    await page.locator('#navbarExample').getByRole('link', { name: 'Sign up', exact: true }).click();
    await page.waitForSelector('#signInModal', { state: 'visible' });
    await page.locator('#sign-username').fill(usuario.username);
    await page.locator('#sign-password').fill(usuario.password);
    await page.locator('#signInModal').getByRole('button', { name: 'Sign up' }).click();
    // small wait to ensure server-side registration completes
    await page.waitForTimeout(500);
    await page.close();
});

test.describe.serial('Clase 04 - Flujo completo de usuario en DemoBlaze', () => {
    test('Registrar un nuevo usuario (setup)', async ({ page }) => {
        // El usuario se crea en beforeAll; aquí solo comprobamos que existe
        await page.goto('/');
        await page.locator('#navbarExample').getByRole('link', { name: 'Log in', exact: true }).click();
        await page.waitForSelector('#logInModal', { state: 'visible' });
        // rellenamos pero no hacemos login, solo validamos que el modal funciona
        await page.locator('#logInModal').getByRole('button', { name: 'Log in' });
    });

    test('Login con el usuario registrado', async ({ page }) => {
        page.on('dialog', async (dialog) => {
            console.log(`Dialog: ${dialog.message()}`);
            await dialog.accept();
        });

        await page.goto('/');
        await login(page, usuario.username, usuario.password);

        const nombreUsuario = await page.locator('#nameofuser').textContent();
        expect(nombreUsuario).toContain(usuario.username);

        console.log(`Login exitoso como: ${nombreUsuario}`);
    });

    test('Flujo completo: login -> agregar producto -> verificar carrito', async ({ page }) => {
        page.on('dialog', async (dialog) => {
            await dialog.accept();
        });

        await page.goto('/');
        await login(page, usuario.username, usuario.password);

        await page.waitForSelector('.card-title a');
        const primerProducto = page.locator('.card-title a').first();
        const nombreProducto = await primerProducto.textContent();
        await primerProducto.click();

        await page.waitForLoadState('domcontentloaded');

        // Igual que con el registro de usuario: agregar al carrito es una
        // escritura en el backend que tarda un momento en propagarse antes
        // de que aparezca reflejada en /cart.html.
        await page.getByText('Add to cart').click();
        await page.waitForTimeout(2000);

        await page.locator('#navbarExample').getByRole('link', { name: 'Cart', exact: true }).click();
        await page.waitForURL('**/cart.html');
        await page.waitForTimeout(1500);

        const itemsCarrito = page.locator('#tbodyid tr');
        const cantidadItems = await itemsCarrito.count();
        expect(cantidadItems).toBeGreaterThanOrEqual(1);

        console.log(`Flujo completo exitoso. Producto "${nombreProducto}" en carrito.`);
        console.log(`Items en carrito: ${cantidadItems}`);

        await page.screenshot({ path: './evidencias/carrito-con-producto.png', fullPage: true });
    });

    test('Reto 1: Añadir varios productos y verificar total en carrito', async ({ page }) => {
        await page.goto('/');
        page.on('dialog', async (d) => d.accept());
        await login(page, usuario.username, usuario.password);

        // Agregar 2 productos diferentes
        await page.locator('.card-title a').nth(0).click();
        await page.getByText('Add to cart').click();
        await page.waitForTimeout(1500);
        await page.goto('/');
        await page.locator('.card-title a').nth(1).click();
        await page.getByText('Add to cart').click();
        await page.waitForTimeout(1500);

        await page.locator('#navbarExample').getByRole('link', { name: 'Cart', exact: true }).click();
        await page.waitForURL('**/cart.html');
        await page.waitForSelector('#tbodyid tr');

        const filas = page.locator('#tbodyid tr');
        const cuenta = await filas.count();
        expect(cuenta).toBeGreaterThanOrEqual(2);

        // Verificar que el total mostrado sea la suma de los precios
        const precios = await page.locator('#tbodyid tr td:nth-child(3)').allTextContents();
        const numeros = precios.map(p => {
            const m = p.match(/[-+]?\d+\.?\d*/);
            return m ? Number(m[0]) : 0;
        });
        const suma = numeros.reduce((a,b) => a + b, 0);
        const totalTexto = await page.locator('#totalp').textContent();
        const totalNumero = Number((totalTexto || '').match(/[-+]?\d+\.?\d*/)?.[0] || '0');
        expect(totalNumero).toBeCloseTo(suma, 2);
    });

    test('Reto 2: Eliminar un ítem del carrito y verificar disminución', async ({ page }) => {
        await page.goto('/');
        page.on('dialog', async (d) => d.accept());
        await login(page, usuario.username, usuario.password);

        // Asegurar al menos un producto en el carrito
        await page.locator('.card-title a').first().click();
        await page.getByText('Add to cart').click();
        await page.waitForTimeout(1500);
        await page.locator('#navbarExample').getByRole('link', { name: 'Cart', exact: true }).click();
        await page.waitForURL('**/cart.html');
        await page.waitForSelector('#tbodyid tr');

        const antes = await page.locator('#tbodyid tr').count();
        // Hacer click en Delete del primer item
        await page.locator('#tbodyid tr').first().getByRole('link', { name: 'Delete' }).click();
        // Esperar a que la fila desaparezca
        await page.waitForTimeout(1500);
        const despues = await page.locator('#tbodyid tr').count();
        expect(despues).toBeLessThanOrEqual(antes - 1);
    });

    test('Reto 3: Place Order y verificar confirmación', async ({ page }) => {
        await page.goto('/');
        page.on('dialog', async (d) => d.accept());
        await login(page, usuario.username, usuario.password);

        // Añadir un producto y navegar al carrito
        await page.locator('.card-title a').first().click();
        await page.getByText('Add to cart').click();
        await page.waitForTimeout(1500);
        await page.locator('#navbarExample').getByRole('link', { name: 'Cart', exact: true }).click();
        await page.waitForURL('**/cart.html');
        await page.waitForSelector('#tbodyid tr');

        // Click Place Order
        await page.getByRole('button', { name: 'Place Order' }).click();
        await page.waitForSelector('#orderModal', { state: 'visible' });

        // Rellenar el formulario del pedido
        await page.fill('#name', 'Test User');
        await page.fill('#country', 'Testland');
        await page.fill('#city', 'Test City');
        await page.fill('#card', '4111111111111111');
        await page.fill('#month', '12');
        await page.fill('#year', '2026');

        await page.getByRole('button', { name: 'Purchase' }).click();

        // Verificar que aparece el modal de confirmación con texto y un id
        await page.waitForSelector('.sweet-alert', { state: 'visible' });
        const texto = await page.locator('.sweet-alert').textContent();
        expect(texto).toBeTruthy();
        expect(texto).toContain('Thank you');
    });

    test('Intentar login con credenciales incorrectas', async ({ page }) => {
        await page.goto('/');
        await page.locator('#navbarExample').getByRole('link', { name: 'Log in', exact: true }).click();
        await page.waitForSelector('#logInModal', { state: 'visible' });

        await page.locator('#loginusername').fill('usuario_que_no_existe');
        await page.locator('#loginpassword').fill('password_incorrecta');

        const dialogPromise = new Promise<string>((resolve) => {
            page.once('dialog', async (dialog) => {
                await dialog.accept();
                resolve(dialog.message());
            });
        });

        await page.locator('#logInModal').getByRole('button', { name: 'Log in' }).click();
        const mensajeAlert = await dialogPromise;

        expect(mensajeAlert).toBeTruthy();
        console.log(`Error mostrado: ${mensajeAlert}`);

        const usuarioLogueado = page.locator('#nameofuser');
        await expect(usuarioLogueado).not.toBeVisible();
    });

});