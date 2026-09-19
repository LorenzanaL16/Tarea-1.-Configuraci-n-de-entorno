import { Page } from '@playwright/test';

export const SAUCE_URL = 'https://www.saucedemo.com';
export const STANDARD_USER = 'standard_user';
export const STANDARD_PASSWORD = 'secret_sauce';

export async function loginAs(
  page: Page,
  username = STANDARD_USER,
  password = STANDARD_PASSWORD,
): Promise<void> {
  await page.goto(SAUCE_URL);
  await page.locator('#user-name').fill(username);
  await page.locator('#password').fill(password);
  await page.locator('#login-button').click();
}