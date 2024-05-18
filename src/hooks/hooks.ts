import { BeforeAll, AfterAll, Before, After, Status } from '@cucumber/cucumber';
import { type Browser, type BrowserContext, type Page, chromium } from '@playwright/test';
import { fixture } from './pageFixture';
import contextManager from '../helper/contextManager';

let browser: Browser;
let context: BrowserContext;
let page: Page;

BeforeAll(async function () {
  browser = await chromium.launch({ headless: false });
  fixture.browser = browser;
});

Before(async function () {
  context = await browser.newContext();
  page = await context.newPage();
  fixture.page = page;
});

After(async function ({ pickle, result }) {
  if (result.status !== Status.PASSED) {
    // screenshot
    const image = await fixture.page.screenshot({
      path: `./test-results/screenshots/${pickle.name.toLowerCase().replaceAll(/[-,]/g, '').split(' ').join('_')}.png`,
      type: 'png',
    });
    await this.attach(image, 'image/png');
  }

  await fixture.page.close();
  await context.close();
  contextManager.clear();
});

AfterAll(async function () {
  await browser.close();
});
