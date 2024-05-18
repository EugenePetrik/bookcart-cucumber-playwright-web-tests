import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { fixture } from '../../hooks/pageFixture';
import { Application } from '../../app';
import contextManager from '../../helper/context/contextManager';

setDefaultTimeout(60 * 1_000 * 2);

let app: Application;

Given('User search for a {string}', async function (bookName: string) {
  app = new Application(fixture.page);

  contextManager.set('bookName', bookName);
  fixture.logger.info(`Searching for a book: ${bookName}`);

  await app.home.header.selectBook(bookName);
});

When('User add the book to the cart', async function () {
  const bookName = contextManager.get('bookName') as string;
  await app.books.addBookToCart(bookName);
});

Then('The cart badge should get updated', async function () {
  await app.home.header.expectCartValueUpdated();
});
