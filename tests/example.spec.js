import { test, expect } from '@playwright/test';

test('Wikipedia search flow: text, interactive elements, and search form', async ({ page }) => {
  await page.goto('https://www.wikipedia.org/');
  await expect(page).toHaveTitle(/Wikipedia/i);
  await expect(page.getByRole('link', { name: 'Русский' })).toBeVisible();
  await expect(page.getByRole('button', { name: /Search|Найти/i })).toBeVisible();
  const searchInput = page.locator('#searchInput');
  await searchInput.waitFor({ state: 'visible', timeout: 10000 });
  await searchInput.fill('Playwright (software)');
  await searchInput.press('Enter');
  await expect(page).toHaveURL(/Playwright/i);
  await expect(page.locator('body')).toContainText(/Playwright/i);
  await expect(page.getByRole('searchbox')).toBeVisible();
});