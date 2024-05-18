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

BeforeAll(async function () {
  getEnv();
  browser = await browserManager();
});

Before(async function ({ pickle }) {
  const scenarioName = `${pickle.name} ${pickle.id}`;

  context = await browser.newContext({
    recordVideo: {
      dir: join(process.cwd(), 'test-results', 'videos'),
    },
  });

  await context.tracing.start({
    name: scenarioName,
    title: pickle.name,
    sources: true,
    screenshots: true,
    snapshots: true,
  });

  const page = await context.newPage();
  fixture.page = page;
  fixture.logger = createLogger(options(scenarioName));
});

After(async function ({ pickle, result }) {
  const screenshotsPath = join(
    process.cwd(),
    'test-results',
    'screenshots',
    `${pickle.name.toLowerCase().replaceAll(/[-,]/g, '').split(' ').join('_')}.png`,
  );

  // const videoPath = await fixture.page.video().path();

  const tracePath = join(
    process.cwd(),
    'test-results',
    'trace',
    `${pickle.name.toLowerCase().replaceAll(/[-,]/g, '').split(' ').join('_')}.zip`,
  );
  const traceFileLink = `<a href="https://trace.playwright.dev/" target="_blank">Open ${tracePath}</a>`;

  const image: Buffer = await fixture.page.screenshot({
    path: screenshotsPath,
    type: 'png',
  });

  await context.tracing.stop({ path: tracePath });
  await fixture.page.close();
  await context.close();
  contextManager.clear();

  if (result.status !== Status.PASSED) {
    this.attach(image, 'image/png');
    // this.attach(readFileSync(videoPath), 'video/webm');
    this.attach(`Trace file: ${traceFileLink}`, 'text/html');
  }
});

AfterAll(async function () {
  await browser.close();
  fixture.logger.close();
});
