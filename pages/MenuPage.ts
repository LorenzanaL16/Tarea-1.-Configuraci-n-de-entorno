import { Page, Locator, expect } from '@playwright/test';

export class MenuPage {
    readonly page: Page;
    readonly hamburgerMenu: Locator;
    readonly menu: Locator;
    readonly logoutLink: Locator;
    readonly aboutLink: Locator;
    readonly allItemsLink: Locator;
    readonly resetAppLink: Locator;
    readonly closeMenuButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.hamburgerMenu = page.locator('#react-burger-menu-btn');
        this.menu = page.locator('.bm-menu');
        this.logoutLink = page.locator('#logout_sidebar_link');
        this.aboutLink = page.locator('#about_sidebar_link');
        this.allItemsLink = page.locator('#inventory_sidebar_link');
        this.resetAppLink = page.locator('#reset_sidebar_link');
        this.closeMenuButton = page.locator('#react-burger-cross-btn');
    }

    async openMenu() {
        await this.hamburgerMenu.click();
        await expect(this.menu).toBeVisible();
    }

    async closeMenu() {
        await this.closeMenuButton.click();
    }

    async logout() {
        await this.openMenu();
        await this.logoutLink.click();
    }

    async clickAbout() {
        await this.openMenu();
        await this.aboutLink.click();
    }

    async clickAllItems() {
        await this.openMenu();
        await this.allItemsLink.click();
    }

    async resetApp() {
        await this.openMenu();
        await this.resetAppLink.click();
    }

    async isMenuVisible(): Promise<boolean> {
        return await this.menu.isVisible();
    }
}
