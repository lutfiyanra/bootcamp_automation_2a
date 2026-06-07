import { test, expect } from '@playwright/test';

test('test valid login', async ({ page }) => {
  await page.goto('https://www.emra.chat/login');
  await page.getByRole('textbox', { name: 'Email' }).fill('lutfiyanra@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('Angkasatelit1.');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.getByText('Successfully logged in!')).toBeVisible();
});