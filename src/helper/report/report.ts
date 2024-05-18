const report = require('multiple-cucumber-html-reporter');
const os = require('os');

report.generate({
  jsonDir: 'test-results',
  reportPath: 'test-results/reports/',
  reportName: 'Playwright Automation Report',
  pageTitle: 'BookCart App Test Report',
  displayDuration: false,
  metadata: {
    browser: {
      name: 'Chrome',
      version: 'Latest',
    },
    device: `${os.hostname()} - ${os.type()}`,
    platform: {
      name: os.platform(),
      version: os.release(),
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
