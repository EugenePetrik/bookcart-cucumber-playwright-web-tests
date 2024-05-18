import { transports, format } from 'winston';
import { join } from 'path';

export function options(scenarioName: string) {
  return {
    transports: [
      new transports.File({
        filename: join(
          process.cwd(),
          'test-results',
          'logs',
          `${scenarioName.toLowerCase().replaceAll(/[-,]/g, '').split(' ').join('_')}/log.log`,
        ),
        level: 'info',
        format: format.combine(
          format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
          format.align(),
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
        ),
      }),
    ],
  };
}
