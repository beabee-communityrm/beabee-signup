import expressWinston from 'express-winston';
import winston from 'winston';

import config from '@config';

const appFormat = winston.format((info) => {
  const { app, ...rest } = info;
  return app ? { ...rest, message: `[${app}] ${rest.message}` } : info;
});

const logFormats = {
  json: winston.format.json(),
  simple: winston.format.combine(
    winston.format.colorize(),
    appFormat(),
    winston.format.simple()
  ),
} as const;

export const mainLogger = winston.createLogger({
  format: logFormats[config.logFormat],
  levels: winston.config.syslog.levels,
  transports: [new winston.transports.Console()],
});

export const requestLogger = expressWinston.logger({
  winstonInstance: mainLogger.child({ app: 'request' }),
  msg: '{{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
  requestFilter: (req, propName) => {
    if (propName === 'headers') {
      const { cookie, ...rest } = req.headers;
      return rest;
    } else {
      return req[propName];
    }
  },
});

export const requestErrorLogger = expressWinston.errorLogger({
  winstonInstance: mainLogger.child({ app: 'request-error' }),
});
