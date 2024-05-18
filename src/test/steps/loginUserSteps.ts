import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { fixture } from '../../hooks/pageFixture';
import contextManager from '../../helper/context/contextManager';
import { Application } from '../../app';

setDefaultTimeout(60 * 1_000 * 2);

let app: Application;

const pendingRequests = new Set();

Given('User navigates to the application', async function () {
  app = new Application(fixture.page);

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

  await app.home.open();
  fixture.logger.info('Navigated to the application');
});

Given('User click on the login link', async function () {
  await app.home.header.clickLoginLink();
});

Given('User enter the username as {string}', async function (username: string) {
  contextManager.set('username', username);
  await app.login.enterUserName(username);
});

Given('User enter the password as {string}', async function (password: string) {
  await app.login.enterPassword(password);
});

When('User click on the login button', async function () {
  await app.login.clickLoginButton();
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

  const username = contextManager.get('username') as string;
  fixture.logger.info(`Username: ${username}`);
  await app.home.header.expectLoginSuccess(username);
});

When('Login should fail', async function () {
  await app.login.expectErrorMessage('Username or Password is incorrect.');
});
