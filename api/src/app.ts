import 'module-alias/register';

import express, { ErrorRequestHandler } from 'express';
import { HttpError, useExpressServer } from 'routing-controllers';

import * as db from '@core/database';
import { mainLogger, requestErrorLogger, requestLogger } from '@core/logging';

import { OrganisationController } from './controllers/OrganisationController';

const app = express();
app.use(requestLogger);

const log = mainLogger.child({ app: 'server' });

db.connect().then(() => {
  log.info('Starting server...');

  useExpressServer(app, {
    controllers: [OrganisationController],
    routePrefix: '/1.0',
    validation: {
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      whitelist: true,
      validationError: {
        target: false,
        value: false,
      },
    },
    defaults: {
      paramOptions: {
        required: true,
      },
    },
  });

  app.use(function (err, req, res, next) {
    if (!(err instanceof HttpError)) {
      next(err);
    }
  } as ErrorRequestHandler);

  app.use(requestErrorLogger);

  const server = app.listen(3000);

  process.on('SIGTERM', () => {
    log.debug('Waiting for server to shutdown');
    db.close();
    server.close(() => process.exit());
  });
});
