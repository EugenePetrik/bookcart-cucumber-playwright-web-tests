import { type Page } from '@playwright/test';
import { type Logger } from 'winston';

export const fixture = {
  page: undefined as Page,
  logger: undefined as Logger,
};
