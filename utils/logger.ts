import { configure, getLogger } from 'log4js';
import config from '../support/config';

configure({
  appenders: {
    console: { type: 'stdout', layout: { type: 'colored' } },
    dateFile: {
      type: 'dateFile',
      filename: `logs/${config.LOG_FILE}`,
      layout: { type: 'basic' },
      compress: true,
      numBackups: 14,
      keepFileExt: true
    }
  },
  categories: {
    default: { appenders: ['console', 'dateFile'], level: config.LOG_LEVEL }
  }
});

export const logger = getLogger();