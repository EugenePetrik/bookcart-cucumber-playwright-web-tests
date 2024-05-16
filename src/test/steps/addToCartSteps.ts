import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { fixture } from '../../hooks/pageFixture';

setDefaultTimeout(60 * 1_000 * 2);

Given('User search for a {string}', async function (book) {
  await fixture.page.locator('input[type="search"]').fill(book);
  await fixture.page.waitForTimeout(2000);
  await fixture.page.locator('mat-option .mdc-list-item__primary-text').click();
});

When('User add the book to the cart', async function () {
  const responsePromise = fixture.page.waitForResponse('https://bookcart.azurewebsites.net/**');

  await fixture.page.getByRole('button', { name: 'Add to Cart' }).click();
  const toast = fixture.page.locator('simple-snack-bar');
  await expect(toast).toBeVisible({ timeout: 3_000 });
  await expect(toast).not.toBeVisible({ timeout: 3_000 });

  await responsePromise;
});

Then('The cart badge should get updated', async function () {
  const badgeCount = await fixture.page.locator('[id^=mat-badge-content]').last().innerText();
  expect(Number(badgeCount)).toBeGreaterThan(0);
});
