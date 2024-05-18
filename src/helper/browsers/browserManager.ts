import { type LaunchOptions, chromium, firefox, webkit } from '@playwright/test';
import baseConfig from '../../config/baseConfig';

const options: LaunchOptions = {
  headless: baseConfig.HEADLESS,
  slowMo: 50,
};

export const browserManager = () => {
  const browserType = baseConfig.BROWSER_NAME;

  switch (browserType) {
    case 'Chrome':
      return chromium.launch(options);
    case 'Firefox':
      return firefox.launch(options);
    case 'Safari':
      return webkit.launch(options);
    default:
      throw new Error('Please set the proper browser!');
  }
};
