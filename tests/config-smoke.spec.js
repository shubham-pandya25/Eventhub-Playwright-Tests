const{ test,expect } = require ('@playwright/test');
const { openLoginPage } = require('./helpers');
const { getEmailField } = require('./helpers');
const { getSignIn } = require('./helpers');


test ('smoke test', async({ page }) => {
    await openLoginPage(page);
    await getEmailField(page);
    await getSignIn(page);
    await expect(page).toHaveTitle(/EventHub/i);
});





