import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly cartItems: Locator;
    readonly cartItem: Locator;
    readonly checkoutButton: Locator;
    readonly continueShoppingButton: Locator;
    readonly cartContainer: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartItems = page.locator('.cart_item');
        this.cartItem = page.locator('.cart_item');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
        this.cartContainer = page.locator('.cart_list');
    }

    async getCartItemCount(): Promise<number> {
        return await this.cartItems.count();
    }

    async checkout() {
        await this.checkoutButton.click();
    }

    async continueShopping() {
        await this.continueShoppingButton.click();
    }

    async removeItemByName(productName: string) {
        const item = this.page.locator('.cart_item', { has: this.page.locator(`.inventory_item_name:has-text("${productName}")`) });
        const removeButton = item.locator('button');
        await removeButton.click();
    }

    async isCartEmpty(): Promise<boolean> {
        return !(await this.cartContainer.isVisible());
    }

    async getCartItems(): Promise<string[]> {
        const items = await this.page.locator('.cart_item_label .inventory_item_name').allTextContents();
        return items;
    }
}
