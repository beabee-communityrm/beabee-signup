import 'module-alias/register';

import express from 'express';
import { useExpressServer } from 'routing-controllers';

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
  });

  app.use(requestErrorLogger);

  const server = app.listen(3000);

  process.on('SIGTERM', () => {
    log.debug('Waiting for server to shutdown');
    db.close();
    server.close(() => process.exit());
  });
});
