async function openLoginPage(page) {
  await page.goto('https://eventhub.rahulshettyacademy.com');
}
module.exports = { openLoginPage };