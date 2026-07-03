const{ test,expect } = require ('@playwright/test');
const { openLoginPage, getEmailField, getSignIn, eventHubHeading } = require('./helpers');


test('fixtures page email field accepts input', async ({page, browser}) => {

    await openLoginPage(page);
    const email = 'beginner@sample.com';
    const emailField = getEmailField(page);
    await emailField.fill(email);
    await expect(emailField).toHaveValue(email);
    await expect(emailField).toBeVisible();
});


/**
 * page fixture vs browser context:
 * - page fixture: Playwright gives each test one ready-to-use page automatically.
 * - browser context: a separate, manually-created browser session container
 *   that can open its own pages (context.newPage()).
 * - a fresh browser context always starts with isolated state (no cookies/storage
 *   carried over from other contexts or tests).
 */

test('Create the fresh browser context', async ({ browser }) => {
  const isolatedContext = await browser.newContext();
  const isolatedPage = await isolatedContext.newPage();

  await openLoginPage(isolatedPage);

  const signInHeading = eventHubHeading(isolatedPage);
  const emptyEmailField = getEmailField(isolatedPage);

  await expect(signInHeading).toBeVisible();
  await expect(emptyEmailField).toHaveValue('');

  await isolatedContext.close();
});




