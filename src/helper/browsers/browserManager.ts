import { type LaunchOptions, chromium, firefox, webkit } from '@playwright/test';

const options: LaunchOptions = {
  headless: process.env.HEADLESS === 'true',
  slowMo: 50,
};

export const browserManager = () => {
  const browserType = process.env.BROWSER || 'chrome';

  switch (browserType) {
    case 'chrome':
      return chromium.launch(options);
    case 'firefox':
      return firefox.launch(options);
    case 'safari':
      return webkit.launch(options);
    default:
      throw new Error('Please set the proper browser!');
  }
}
