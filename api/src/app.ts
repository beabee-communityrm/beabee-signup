import 'module-alias/register';

import express from 'express';

import * as db from '@core/database';
import { mainLogger } from '@core/logging';

const app = express();

const log = mainLogger.child({ app: 'server' });

app.get('/', (req, res) => {
  res.send('Hello world');
});

db.connect().then(() => {
  log.info('Starting server...');
  const server = app.listen(3000);

  process.on('SIGTERM', () => {
    log.debug('Waiting for server to shutdown');
    db.close();
    server.close(() => process.exit());
  });
});
