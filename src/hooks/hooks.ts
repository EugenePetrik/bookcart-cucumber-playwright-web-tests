import { BeforeAll, AfterAll, Before, After, Status } from '@cucumber/cucumber';
import { type Browser, type BrowserContext, type Page } from '@playwright/test';
import { join } from 'path';
import { createLogger } from 'winston';
import { fixture } from './pageFixture';
import contextManager from '../helper/context/contextManager';
import { browserManager } from '../helper/browsers/browserManager';
import { getEnv } from '../helper/env/env';
import { options } from '../helper/util/logger';

let browser: Browser;
let context: BrowserContext;
let page: Page;

BeforeAll(async function () {
  getEnv();
  browser = await browserManager();
});

Before(async function ({ pickle }) {
  const scenarioName = `${pickle.name} ${pickle.id}`;
  context = await browser.newContext();
  page = await context.newPage();
  fixture.page = page;
  fixture.logger = createLogger(options(scenarioName));
});

After(async function ({ pickle, result }) {
  if (result.status !== Status.PASSED) {
    const screenshotsPath = join(
      process.cwd(),
      'test-results',
      'screenshots',
      `${pickle.name.toLowerCase().replaceAll(/[-,]/g, '').split(' ').join('_')}.png`,
    );

    const image = await fixture.page.screenshot({
      path: screenshotsPath,
      type: 'png',
    });

    this.attach(image, 'image/png');
  }

  await fixture.page.close();
  await context.close();
  contextManager.clear();
});

AfterAll(async function () {
  await browser.close();
  fixture.logger.close();
});
