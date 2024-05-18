import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { fixture } from '../../hooks/pageFixture';
import contextManager from '../../helper/context/contextManager';
import baseConfig from '../../config/baseConfig';

setDefaultTimeout(60 * 1_000 * 2);

const pendingRequests = new Set();

Given('User navigates to the application', async function () {
  fixture.page.on('request', request => {
    if (request.resourceType() === 'xhr' || request.resourceType() === 'fetch') {
      pendingRequests.add(request);
    }
  });

  fixture.page.on('requestfinished', request => {
    pendingRequests.delete(request);
  });

  fixture.page.on('requestfailed', request => {
    pendingRequests.delete(request);
  });

  await fixture.page.goto(baseConfig.BASE_URL);
});

Given('User click on the login link', async function () {
  await fixture.page.getByRole('button', { name: 'Login' }).click();
});

Given('User enter the username as {string}', async function (username: string) {
  contextManager.set('username', username);
  await fixture.page.getByPlaceholder('Username').fill(username);
});

Given('User enter the password as {string}', async function (password: string) {
  await fixture.page.getByPlaceholder('Password').fill(password);
});

When('User click on the login button', async function () {
  const responsePromise = fixture.page.waitForResponse(`${baseConfig.BASE_URL}/**`);

  await fixture.page.locator('mat-card').getByRole('button', { name: 'Login' }).click();

  await responsePromise;
});

Then('Login should be success', async function () {
  await new Promise(resolve => {
    const checkPendingRequests = () => {
      if (pendingRequests.size === 0) {
        resolve('success');
      } else {
        setTimeout(checkPendingRequests, 500);
      }
    };
    checkPendingRequests();
  });

  const actualUser = contextManager.get('username') as string;
  await expect(fixture.page.locator('mat-toolbar .mdc-button__label').nth(1)).toHaveText(
    actualUser,
  );
});

When('Login should fail', async function () {
  await expect(fixture.page.locator('mat-error')).toHaveText(
    'Username or Password is incorrect.',
  );
});
