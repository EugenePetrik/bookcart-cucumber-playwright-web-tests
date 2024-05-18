import * as dotenv from 'dotenv';
import { join } from 'path';

export const getEnv = () => {
  if (process.env.ENV) {
    dotenv.config({
      override: true,
      path: join(process.cwd(), 'src', 'helper', 'env', `.env.${process.env.ENV}`),
    });
  } else {
    console.error('NO ENV PASSED!');
  }
};
