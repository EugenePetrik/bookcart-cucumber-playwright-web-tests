import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { fixture } from '../../hooks/pageFixture';
import baseConfig from '../../config/baseConfig';
import { type IRegisterUser } from '../../helper/types/user';
import { Application } from '../../app';

setDefaultTimeout(60 * 1_000 * 2);

let app: Application;

Given('I navigate to the register page', async function () {
  app = new Application(fixture.page);
  await app.registerPage.open();
});

When('I create a new user', async function () {
  const user: IRegisterUser = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    userName: `username_${Date.now().toString()}`,
    password: 'Qwerty123',
    confirmPassword: 'Qwerty123',
    gender: 'Male',
  };

  await app.registerPage.registerUser(user);
});

Then('Registration should be success', async function () {
  await expect(fixture.page).toHaveURL(`${baseConfig.BASE_URL}/login`);
});
