import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { fixture } from '../../hooks/pageFixture';
import baseConfig from '../../config/baseConfig';
import { type RegisterUser } from '../../helper/types/user';
import { Application } from '../../app';

let app: Application;

Given('I navigate to the register page', async function () {
  app = new Application(fixture.page);
  await app.register.open();
});

When('I create a new user', async function () {
  const user: RegisterUser = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    userName: `username_${Date.now().toString()}`,
    password: 'Qwerty123',
    confirmPassword: 'Qwerty123',
    gender: 'Male',
  };

  await app.register.registerUser(user);
});

Then('Registration should be success', async function () {
  await expect(fixture.page).toHaveURL(`${baseConfig.BASE_URL}/login`);
});
