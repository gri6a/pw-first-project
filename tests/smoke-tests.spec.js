const { test, expect } = require('@playwright/test');
const { url } = require('inspector');



test('Browser Context - First Playwright test', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/practice-project');
    await expect(page).toHaveURL('https://rahulshettyacademy.com/practice-project');
});

test('Page Playwright test', async ({ page }) => {
    // const context = await browser.newContext();
    // const page = await context.newPage();
    await page.goto('https://google.com');
    await expect(page).toHaveTitle('Google');
});

test('Login - valid credentials - Demo Bank', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/index.html');
    await expect(page).toHaveURL('https://demo-bank.vercel.app/index.html');
    await page.locator('#login_id').fill('uzytkown');
    await page.locator('#login_password').fill('password');
    await page.locator('#login-btn').click();
    await expect(page).toHaveURL('https://demo-bank.vercel.app/pulpit.html');
    await expect(page.locator('#user_name')).toContainText('Jan Demobankowy');
    
});

test('Login - invalid username - Demo Bank', async ({ page }) => {
    await page.goto('https://demo-bank.vercel.app/index.html');
    await expect(page).toHaveURL('https://demo-bank.vercel.app/index.html');
    await page.locator('#login_id').fill('uzyt');
    await page.locator('#login_password').fill('password');
    await page.locator('#login-btn').blur();
    await expect(page.locator('#error_login_id')).toContainText('identyfikator ma min. 8 znaków');
    console.log(await page.locator('#error_login_id').textContent());
});