import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { fixture } from '../../hooks/pageFixture';
import contextManager from '../../helper/context/contextManager';
import { Application } from '../../app';
import { getUser } from '../../helper/util/getUser';
import { IUsersConfig } from '../../test_data/users';

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

  await app.homePage.open();
  fixture.logger.info('Navigates to the application');
});

Given('User clicks on the login link', async function () {
  await app.homePage.header.clickLoginLink();
});

When('User enters the username as {string}', async function (username: string) {
  contextManager.set('username', username);
  await app.loginPage.enterUsername(username);
});

When('User enters the password as {string}', async function (password: string) {
  await app.loginPage.enterPassword(password);
});

When('User clicks on the login button', async function () {
  await app.loginPage.clickLoginButton();
});

When('User logs in as {string}', async function (user: keyof IUsersConfig) {
  const [username, password] = getUser(user);

  fixture.logger.info(`Username: ${username}`);
  fixture.logger.info(`Password: ${password}`);

  await app.loginPage.loginUser(username, password);
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
  await app.homePage.header.expectLoginSuccess(username);
});

When('Login should fail', async function () {
  await app.loginPage.expectErrorMessage('Username or Password is incorrect.');
});
