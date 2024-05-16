import { BeforeAll, AfterAll, Before, After, Status } from '@cucumber/cucumber';
import { type Browser, type BrowserContext, type Page, chromium } from '@playwright/test';
import { fixture } from './pageFixture';

let browser: Browser;
let context: BrowserContext;
let page: Page;

BeforeAll(async function () {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  fixture.page = page;
});

AfterAll(async function () {
  await page.close();
  await browser.close();
});
