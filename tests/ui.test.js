const { test, expect } = require('@playwright/test');
const homeURL = 'http://localhost:3000/';
const randomNumber = Math.random();

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
test('Verify "My Books" link is visible after user login', async ({ page }) => {
    await page.goto(homeURL + 'login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');
    await page.waitForSelector('nav.navbar');
    const myBooksLink = await page.$('a[href="/profile"]');
    const isLinkVisible = await myBooksLink.isVisible();
    expect(isLinkVisible).toBe(true);
});
test('Verify "Add Book" link is visible after user login', async ({ page }) => {
    await page.goto(homeURL + 'login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');
    await page.waitForSelector('nav.navbar');
    const addBooksLink = await page.$('a[href="/create"]');
    const isLinkVisible = await addBooksLink.isVisible();
    expect(isLinkVisible).toBe(true);
});
test('Verify user email is visible after user login', async ({ page }) => {
    await page.goto(homeURL + 'login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');
    await page.waitForSelector('nav.navbar');
    const welcomeMessage = await page.$$eval('#user > span', 
    welcomeMessage => welcomeMessage.map(message => message.textContent));
    expect(welcomeMessage[0]).toContain('peter@abv.bg');
});
test('Login with valid credentials', async ({ page }) => {
    await page.goto(homeURL + 'login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');
    await page.waitForSelector('nav.navbar');
    await page.$('a[href="/catalog"]');
    expect(page.url()).toBe(homeURL + 'catalog');
});
test('Submit form with empty inputs show alert', async ({ page }) => {
    await page.goto(homeURL + 'login');
    await page.click('input[type="submit"]');
    page.on('dialog', async dialog => {
        expect(dialog.type().toContain('alert'));
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    await page.$('a[href="/login"]');
    expect(page.url()).toBe(homeURL + 'login');
});
test('Submit form with empty email show alert', async ({ page }) => {
    await page.goto(homeURL + 'login');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');
    page.on('dialog', async dialog => {
        expect(dialog.type().toContain('alert'));
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    await page.$('a[href="/login"]');
    expect(page.url()).toBe(homeURL + 'login');
});
test('Submit form with empty password show alert', async ({ page }) => {
    await page.goto(homeURL + 'login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.click('input[type="submit"]');
    page.on('dialog', async dialog => {
        expect(dialog.type().toContain('alert'));
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    await page.$('a[href="/login"]');
    expect(page.url()).toBe(homeURL + 'login');
});
test('Register with valid user and password', async ({ page }) => {
    await page.goto(homeURL + 'register');
    await page.fill('input[name="email"]', `ivan + ${randomNumber} + @abv.bg`); //using randomNumber every time for new email
    await page.fill('input[name="password"]', '123456');
    await page.fill('input[name="confirm-pass"]', '123456');
    await page.click('input[type="submit"]');
    await page.$('a[href="/catalog"]');
    expect(page.url()).toBe(homeURL + 'catalog');
});
test('Submit register form with empty inputs show alert', async ({ page }) => {
    await page.goto(homeURL + 'register');
    await page.click('input[type="submit"]');
    page.on('dialog', async dialog => {
        expect(dialog.type().toContain('alert'));
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    await page.$('a[href="/register"]');
    expect(page.url()).toBe(homeURL + 'register');
});
test('Submit register form with empty username show alert', async ({ page }) => {
    await page.goto(homeURL + 'register');
    await page.fill('input[name="password"]', '123456');
    await page.fill('input[name="confirm-pass"]', '123456');
    await page.click('input[type="submit"]');
    page.on('dialog', async dialog => {
        expect(dialog.type().toContain('alert'));
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    await page.$('a[href="/register"]');
    expect(page.url()).toBe(homeURL + 'register');
});
test('Submit register form with empty password show alert', async ({ page }) => {
    await page.goto(homeURL + 'register');
    await page.fill('input[name="email"]', `ivan + ${randomNumber} + @abv.bg`);
    await page.click('input[type="submit"]');
    page.on('dialog', async dialog => {
        expect(dialog.type().toContain('alert'));
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    await page.$('a[href="/register"]');
    expect(page.url()).toBe(homeURL + 'register');
});
test('Submit register form with empty confirm password show alert', async ({ page }) => {
    await page.goto(homeURL + 'register');
    await page.fill('input[name="email"]', `ivan + ${randomNumber} + @abv.bg`);
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');
    page.on('dialog', async dialog => {
        expect(dialog.type().toContain('alert'));
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    await page.$('a[href="/register"]');
    expect(page.url()).toBe(homeURL + 'register');
});
test('Submit register form with different passwords show alert', async ({ page }) => {
    await page.goto(homeURL + 'register');
    await page.fill('input[name="email"]', `ivan + ${randomNumber} + @abv.bg`);
    await page.fill('input[name="password"]', '123456');
    await page.fill('input[name="confirm-pass"]', '654321');
    await page.click('input[type="submit"]');
    page.on('dialog', async dialog => {
        expect(dialog.type().toContain('alert'));
        expect(dialog.message()).toContain("Passwords don't match!");
        await dialog.accept();
    });
    await page.$('a[href="/register"]');
    expect(page.url()).toBe(homeURL + 'register');
});