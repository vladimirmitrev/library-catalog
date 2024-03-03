const { test, expect } = require('@playwright/test');
const homeURL = 'http://localhost:3000/';

test('Verify "All Books" link is visible', async ({ page }) => {
    await page.goto(homeURL);
    await page.waitForSelector('nav.navbar');
    const allBooksLink = await page.$('a[href="/catalog"]');
    const isLinkVisible = await allBooksLink.isVisible();
    expect(isLinkVisible).toBe(true);
});
test('Verify "Login" button is visible', async ({ page }) => {
    await page.goto(homeURL);
    await page.waitForSelector('nav.navbar');
    const loginButtonVisible = await page.$('a[href="/login"]');
    const isLoginButtonVisible = await loginButtonVisible.isVisible();
    expect(isLoginButtonVisible).toBe(true);
});
test('Verify "Register" button is visible', async ({ page }) => {
    await page.goto(homeURL);
    await page.waitForSelector('nav.navbar');
    const registerButtonVisible = await page.$('a[href="/register"]');
    const isRegisterButtonVisible = await registerButtonVisible.isVisible();
    expect(isRegisterButtonVisible).toBe(true);
});
test('Verify "All Books" link is visible after user login', async ({ page }) => {
    await page.goto(homeURL + 'login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');
    await page.waitForSelector('nav.navbar');
    const allBooksLink = await page.$('a[href="/catalog"]');
    const isLinkVisible = await allBooksLink.isVisible();
    expect(isLinkVisible).toBe(true);
});