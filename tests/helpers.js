const { expect } = require('@playwright/test');
const { parse } = require('dotenv');

async function openLoginPage(page) {
  await page.goto('https://eventhub.rahulshettyacademy.com');
}

function getEmailField(page) {
  return page.getByPlaceholder('you@email.com').fill('shubham.k.pandya25@gmail.com');
} 

function getPasswordField(page) {
  return page.locator('#password').fill('Test@123');
} 


function getSignIn(page) {
return page.getByRole('button', {name: 'Sign In'}).click();
}

function eventHubHeading(page) {
  return page.getByRole('heading', { name: 'Sign in to EventHub' });
}

function browserEvent(page) {
return page.locator('span.items-center').first().click();
}


function upComingEventHeading(page) {
  return page.locator('main h1');
}

function searchBox(page) {
  return page.getByPlaceholder('Search events, venues…')
} 

function categoriesSelection(page) {
  return page.locator('div select').first();
}

function citySelection(page) {
  return page.locator('div select').last();
}

function getEventCard(page) {
  return page.locator('#event-card')
}

function eventCardHeading(page) {
  return page.getByRole('heading', { name: 'World Tech Summit' });
}

function parseSeatCount(text) {
  const match = text.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
}

module.exports = { openLoginPage, getEmailField, getSignIn, 
  eventHubHeading, getPasswordField, browserEvent, 
  upComingEventHeading, searchBox, categoriesSelection, 
  citySelection, getEventCard, eventCardHeading,
  parseSeatCount
 };