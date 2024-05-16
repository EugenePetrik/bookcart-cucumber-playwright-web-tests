import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { type Page, type Browser, expect } from '@playwright/test';

let browser: Browser;
let page: Page;

setDefaultTimeout(60 * 1000 * 2);

Given('user search for a {string}', async function (book) {
  await page.locator("input[type='search']").fill(book);
  await page.waitForTimeout(2000);
  await page.locator("mat-option[role='option'] span").click();
});

When('user add the book to the cart', async function () {
  await page.locator("//button[@color='primary']").click();
  const toast = page.locator("simple-snack-bar");
  await expect(toast).toBeVisible();
  await toast.waitFor({ state: "hidden" })
});

Then('the cart badge should get updated', async function () {
  const badgeCount = await page.locator("#mat-badge-content-0").textContent();
  expect(Number(badgeCount)).toBeGreaterThan(0);
});
