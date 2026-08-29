import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly inventoryContainer: Locator;
    readonly inventoryItems: Locator;
    readonly cartLink: Locator;
    readonly cartBadge: Locator;
    readonly sortDropdown: Locator;
    readonly hamburgerMenu: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inventoryContainer = page.locator('.inventory_container');
        this.inventoryItems = page.locator('.inventory_item');
        this.cartLink = page.locator('.shopping_cart_link');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.sortDropdown = page.locator('[data-test="product_sort_container"], [data-test="product-sort-container"]');
        this.hamburgerMenu = page.locator('#react-burger-menu-btn');
    }

    async addProductByName(productName: string) {
        const product = this.page.locator('.inventory_item', { has: this.page.locator(`.inventory_item_name:has-text("${productName}")`) });
        await product.locator('button').click();
    }

    async removeProductByName(productName: string) {
        const product = this.page.locator('.inventory_item', { has: this.page.locator(`.inventory_item_name:has-text("${productName}")`) });
        const button = product.locator('button');
        await button.click();
        await expect(button).toHaveText('Add to cart');
    }

    async goToCart() {
        await this.cartLink.click();
    }

    async openMenu() {
        await this.hamburgerMenu.click();
    }

    async isCartBadgeVisible(): Promise<boolean> {
        return await this.cartBadge.isVisible();
    }

    async getCartBadgeCount(): Promise<string> {
        return (await this.cartBadge.textContent()) ?? '';
    }

    async sortBy(value: string) {
        await this.sortDropdown.selectOption(value);
    }

    async getProductCount(): Promise<number> {
        return await this.inventoryItems.count();
    }

    async getFirstProductPrice(): Promise<string> {
        return (await this.page.locator('.inventory_item_price').first().textContent()) ?? '';
    }

    async clickFirstProduct() {
        await this.page.locator('.inventory_item_name').first().click();
    }
}
