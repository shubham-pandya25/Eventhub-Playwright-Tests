const{ test,expect } = require ('@playwright/test');
const { openLoginPage } = require('./helpers');


test ('EventHub login page loads', async({ page }) => {
    // Playwright actions (like goto and assertions) return promises,
  // so we must await them to prevent timing issues and flaky behavior
    await openLoginPage(page);
    await expect(page.getByPlaceholder('you@email.com')).toBeVisible();
    await expect(page.getByRole('button', {name: 'Sign In'})).toBeVisible();
});

test ('login page test', async({ page }) => {
    // Playwright actions (like goto and assertions) return promises,
  // so we must await them to prevent timing issues and flaky behavior
    await openLoginPage(page);
    await expect(page).toHaveURL(/\/login/);
    await expect(page.getByLabel('password')).toBeVisible();
    await expect(page.locator('.text-xl')).toBeVisible();
});

