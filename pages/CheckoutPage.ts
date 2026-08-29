import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueButton: Locator;
    readonly finishButton: Locator;
    readonly cancelButton: Locator;
    readonly errorMessage: Locator;
    readonly orderComplete: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.cancelButton = page.locator('[data-test="cancel"]');
        this.errorMessage = page.locator('[data-test="error"]');
        this.orderComplete = page.locator('.complete-header');
    }

    async fillCheckoutForm(firstName: string, lastName: string, postalCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async continueCheckout() {
        await this.continueButton.click();
    }

    async finishOrder() {
        await this.finishButton.click();
    }

    async cancelCheckout() {
        await this.cancelButton.click();
    }

    async completePurchase(firstName: string, lastName: string, postalCode: string) {
        await this.fillCheckoutForm(firstName, lastName, postalCode);
        await this.continueCheckout();
        await this.finishOrder();
    }

    async isOrderComplete(): Promise<boolean> {
        return await this.orderComplete.isVisible();
    }

    async getErrorMessage(): Promise<string> {
        return (await this.errorMessage.textContent()) ?? '';
    }

    async getOrderCompleteMessage(): Promise<string> {
        return (await this.orderComplete.textContent()) ?? '';
    }
}
