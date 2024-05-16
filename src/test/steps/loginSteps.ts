import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { type Page, type Browser, chromium, expect } from '@playwright/test';

let browser: Browser;
let page: Page;

setDefaultTimeout(60 * 1000 * 2);

Given('User navigates to the application', async function () {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  await page.goto('https://bookcart.azurewebsites.net/');
});

Given('User click on the login link', async function () {
  await page.getByRole('button', { name: 'Login' }).click();
});

Given('User enter the username as {string}', async function (username) {
  await page.getByPlaceholder('Username').fill(username);
});

Given('User enter the password as {string}', async function (password) {
  await page.getByPlaceholder('Password').fill(password);
});

When('User click on the login button', async function () {
  await page.locator('mat-card').getByRole('button', { name: 'Login' }).click();
});

Then('Login should be success', async function () {
  await expect(page.locator('mat-toolbar .mdc-button__label').nth(1)).toHaveText('ortoni11');
  await browser.close();
});

When('Login should fail', async function () {
  await expect(page.locator('mat-error')).toHaveText('Username or Password is incorrect.');
  await browser.close();
});
