const { expect } = require('@playwright/test');

async function openLoginPage(page) {
  await page.goto('https://eventhub.rahulshettyacademy.com');
}

function getEmailField(page) {
  return page.getByPlaceholder('you@email.com');
} 

function getSignIn(page) {
return page.getByRole('button', {name: 'Sign In'});
}

function eventHubHeading(page) {
  return page.getByRole('heading', { name: 'Sign in to EventHub' });
}

module.exports = { openLoginPage, getEmailField, getSignIn, eventHubHeading };
