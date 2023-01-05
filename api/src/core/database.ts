import 'reflect-metadata';

import { createConnection, getConnection } from 'typeorm';

import { mainLogger } from '@core/logging';

const log = mainLogger.child({ app: 'database' });

export async function connect(): Promise<void> {
  try {
    await createConnection();
    log.info('Connected to database');
  } catch (error) {
    log.error('Error connecting to database', error);
    process.exit(1);
  }
}

export async function close(): Promise<void> {
  await getConnection().close();
}
