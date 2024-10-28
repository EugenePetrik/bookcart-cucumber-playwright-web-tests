import { hostname, type, platform, release } from 'os';
import { join } from 'path';
import baseConfig from '../../config/baseConfig';

// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-unsafe-assignment
const report = require('multiple-cucumber-html-reporter');

// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
report.generate({
  jsonDir: join(process.cwd(), 'test-results'),
  reportPath: join(process.cwd(), 'test-results', 'reports'),
  reportName: 'Playwright Automation Report',
  pageTitle: 'BookCart App Test Report',
  displayDuration: false,
  metadata: {
    browser: {
      name: baseConfig.BROWSER_NAME,
      version: 'Latest',
    },
    device: `${hostname()} - ${type()}`,
    platform: {
      name: platform(),
      version: release(),
    },
  },
  customData: {
    title: 'Test Info',
    data: [
      { label: 'Project', value: 'Book Cart Application' },
      { label: 'Release', value: '1.2.3' },
    ],
  },
});
