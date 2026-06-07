import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { validUser, invalidUser } from './fixtures/loginData';

test.describe('Login Page', () => {
  test('Scenario 1: Valid login with correct credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(validUser.email, validUser.password);

    await expect(loginPage.successMessage).toBeVisible();
  });

  test('Scenario 2: Invalid login with incorrect credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(invalidUser.email, invalidUser.password);

    await expect(loginPage.errorMessage).toBeVisible({ timeout: 10000 });
    await expect(page).toHaveURL('https://www.emra.chat/login');
  });
});
