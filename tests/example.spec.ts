import { test, expect } from '@playwright/test';

test('the home page loads and shows featured products', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  await expect(page).toHaveTitle(/STORE/);
  await expect(page.getByRole('link', { name: 'PRODUCT STORE' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Phones' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Samsung galaxy s6' })).toBeVisible();
});

test('a user can open a product detail page', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();

  await expect(page).toHaveURL(/prod\.html\?idp_=1/);
  await expect(page.getByRole('heading', { name: 'Samsung galaxy s6' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Add to cart' })).toBeVisible();
});

test('a product can be added to the cart', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  await page.getByRole('link', { name: 'Samsung galaxy s6' }).click();

  page.once('dialog', async dialog => {
    expect(dialog.message()).toContain('Product added');
    await dialog.accept();
  });

  await page.getByRole('link', { name: 'Add to cart' }).click();
  await page.getByRole('link', { name: 'Cart', exact: true }).click();

  await expect(page).toHaveURL(/cart\.html/);
  await expect(page.getByRole('cell', { name: 'Samsung galaxy s6' })).toBeVisible();
});
