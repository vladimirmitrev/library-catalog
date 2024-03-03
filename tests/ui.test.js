const { test, expect } = require('@playwright/test');
const homeURL = 'http://localhost:3000';

test('Verify "All Books" link is visible', async ({ page }) => {
    await page.goto(homeURL);
    await page.waitForSelector('nav.navbar');
    const allBooksLink = await page.$('a[href="/catalog"]');
    const isLinkVisible = await allBooksLink.isVisible();
    expect(isLinkVisible).toBe(true);
});