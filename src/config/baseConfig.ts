import { config as dotenvConfig } from 'dotenv';
import { join } from 'path';

dotenvConfig({
  path: join(process.cwd(), 'src', 'helper', 'env', `.env.${process.env.ENV}`),
});

interface IBaseConfig {
  BROWSER_NAME: string;
  BASE_URL: string;
  HEADLESS: boolean;
  TAGS: string;
}

const baseConfig = {} as IBaseConfig;

baseConfig.BROWSER_NAME = process.env.BROWSER_NAME || 'Chrome';
baseConfig.BASE_URL = process.env.BASE_URL;
baseConfig.HEADLESS = !!process.env.CI;
baseConfig.TAGS = process.env.TAGS || '@regression';

export default baseConfig;
