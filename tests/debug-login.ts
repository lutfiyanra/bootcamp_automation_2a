import { test } from '@playwright/test';

test('debug: capture page text after invalid login', async ({ page }) => {
  await page.goto('https://emra.chat/login');
  await page.getByRole('textbox', { name: 'Email' }).fill('wrong@example.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('WrongPassword123');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.waitForTimeout(3000);
  const bodyText = await page.locator('body').innerText();
  console.log('--- PAGE TEXT ---');
  console.log(bodyText);
  await page.screenshot({ path: 'test-results/debug-invalid-login.png', fullPage: true });
});
