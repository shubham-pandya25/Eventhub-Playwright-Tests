const { test, expect } = require('@playwright/test');
const {
  openLoginPage,
  getEmailField,
  getSignIn,
  eventHubHeading,
  getPasswordField,
  browserEvent,
  upComingEventHeading,
  searchBox,
  categoriesSelection,
  citySelection,
  getEventCard,
  eventCardHeading,
  parseSeatCount
} = require('./helpers');


async function loginAndBrowserEvents(page) {
  await openLoginPage(page);
  await getEmailField(page);
  await getPasswordField(page);
  await getSignIn(page);
  await browserEvent(page);
}


async function applyFilter(page) {
  const searchEvent = searchBox(page);
  await searchEvent.fill('World');
  const categoryDropdown = categoriesSelection(page);
  await categoryDropdown.selectOption('Conference');
  const cityDropdown = citySelection(page);
  await cityDropdown.selectOption('Hyderabad');
}

test('Login and open event page', async ({ page }) => {
  await loginAndBrowserEvents(page);
  const upComingEvent = upComingEventHeading(page);
  await expect(upComingEvent).toBeVisible();
});

test('Practice multiple locator strategies on the filter area', async ({ page }) => {
  await loginAndBrowserEvents(page);
  await applyFilter(page);
  const searchEvent = searchBox(page);
  const categoryDropdown = categoriesSelection(page);
  const cityDropdown = citySelection(page);
  await expect(searchEvent).toHaveValue('World');
  await expect(categoryDropdown).toHaveValue('Conference');
  await expect(cityDropdown).toHaveValue('Hyderabad');
});

test('Work with multiple matching event cards', async ({ page }) => {
  await loginAndBrowserEvents(page); 
  await applyFilter(page);
  const eventCards = getEventCard(page);
  const cardCount = await eventCards.count();
  expect(cardCount).toBeGreaterThanOrEqual(1);
  const worldTechSummitCard = eventCards.filter({ hasText: 'World Tech Summit' });
  await expect(worldTechSummitCard).toHaveCount(1);
  await expect(worldTechSummitCard).toBeVisible();
});

test(' Extract text and reuse it in assertions', async ({ page }) => {
  await loginAndBrowserEvents(page); 
  await applyFilter(page);
  const eventCards = getEventCard(page);
  const worldTechSummitCard = eventCards.filter({ hasText: 'World Tech Summit' });
  const eventTitle = await worldTechSummitCard.getByRole('heading').textContent();
  const eventPriceText = await worldTechSummitCard.getByText('$', { exact: false }).textContent();
  const eventSeatsText = await worldTechSummitCard.getByText(/seat/i).textContent();
  expect(eventTitle.trim()).toBe('World Tech Summit');
  expect(eventPriceText).toContain('$');
  const seatCount = parseSeatCount(eventSeatsText);
  expect(seatCount).toBeGreaterThan(0);
});


test('test 3: reuse login and filter steps', async ({ page }) => {
  await loginAndBrowserEvents(page); 
  await applyFilter(page); 
  const eventCards = getEventCard(page);
  const cardCount = await eventCards.count();
  expect(cardCount).toBeGreaterThanOrEqual(1);
  const worldTechSummitCard = eventCards.filter({ hasText: 'World Tech Summit' });
  await expect(worldTechSummitCard).toHaveCount(1);
  await expect(worldTechSummitCard).toBeVisible();
});
 
test('Reset filters and return to Events page', async ({ page }) => {
  await loginAndBrowserEvents(page);
  await applyFilter(page); 
  await page.waitForLoadState('networkidle');
  await page.goto('/events', { waitUntil: 'domcontentloaded' });
  const searchEvent = searchBox(page);
  await searchEvent.fill('');
  const categoryDropdown = categoriesSelection(page);
  await categoryDropdown.selectOption({ label: 'All Categories' });
  const cityDropdown = citySelection(page);
  await cityDropdown.selectOption({ label: 'All Cities' });
  const eventCards = getEventCard(page);
  const count = await eventCards.count();
  expect(count).toBeGreaterThanOrEqual(3);
});

test('Compare specific items from the list', async ({ page }) => {
  await loginAndBrowserEvents(page);
  const eventCards = getEventCard(page);
  const count = await eventCards.count();
  const firstTitle = await eventCards.first().getByRole('heading').textContent();
  await eventCards.last().scrollIntoViewIfNeeded();
  const lastTitle = await eventCards.last().getByRole('heading').textContent();
  const secondTitle = await eventCards.nth(1).getByRole('heading').textContent();
  expect(firstTitle.trim().length).toBeGreaterThan(0);
  expect(lastTitle.trim().length).toBeGreaterThan(0);
  expect(secondTitle.trim().length).toBeGreaterThan(0);
  expect(firstTitle.trim()).not.toBe(lastTitle.trim());
});