export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ENV: 'staging' | 'prod' | 'test';
      BASE_URL: string;
      BROWSER_NAME: 'Chrome' | 'Firefox' | 'Safari';
    }
  }
}
